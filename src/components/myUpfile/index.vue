<template>
    <div>
        <div 
                 class="popBox" v-show="visible">
            <div>
                <div class="disCC center">
                    <div class="disRow">
                        <span class="line"></span>
                        <span class="title">导入                          
                        </span>
                    </div>
                    <span class="icon iconfont pointer"
                          style="font-size:12px;color:#858585"
                          @click="handleCancel">&#xe871;</span>
                </div>
                <div class="tips m-t-20">
                    <span class="icon iconfont "
                          style="color:#029A5F">&#xe605;</span>
                    <span class="m-l-10 tipTitle">请导入打开或拖拽先关内容，</span>
                </div>
            </div>
            <div class="addBox m-t-20"
                 id="drop">
                <img src="~@/assets/image/addImg.png"
                     class="m-t-30" />
                <p class="tipTitle m-t-20">将文件拖拽至此区域，或选择文件上传</p>
                <p class="tipTitle">支持：XLSX、XLS,文件大小不超过50M</p>
                <div class="uploadBox"
                     @mouseenter="isOnChange = true">
                    <input type="file"
                           class="changeImg"
                           @change="changeImg($event)"
                           v-if="isOnChange" />
                </div>
            </div>
            <ul style="margin-top: 10px"
                class="imgList">
                <li v-for="(item, index) in fileList"
                    v-if="fileList.length > 0"
                    style="line-height: 25.6px; margin-top: 5px">

                    <div class="images"
                         v-viewer
                         v-if="item.fileType == 'img'">
                        <img style="width: 200px;height: 50px;padding: 0px;opacity: 0;display: block;"
                             :src="item.viewSrc" />
                    </div>
                    <div class="liBox"
                         @click="downLoad(item)">
                        <div class="disStart">
                            <img src="~@/assets/image/pdf.png"
                                 class="imgBox"
                                 v-if="item.fileType == 'pdf'" />
                            <img src="~@/assets/image/word.png"
                                 class="imgBox"
                                 v-if="item.fileType == 'doc'" />
                            <img src="~@/assets/image/xls.png"
                                 class="imgBox"
                                 v-if="item.fileType == 'xls'" />
                            <img src="~@/assets/image/jpg.png"
                                 class="imgBox"
                                 v-if="item.fileType == 'img'" />
                            <img src="~@/assets/image/other.png"
                                 class="imgBox"

                                 v-if="item.fileType == 'other'" />

                            <div class="disColumn">

                                <span class="imgTitle">{{item.fileName}}</span>
                                <span class="subTitle">{{item.fileSize}}</span>
                            </div>
                        </div>
                        <!-- <a-progress type="circle"
                                    :percent="item.percent"
                                    :width="32"
                                    class="circleBox"
                                    :strokeWidth="12"
                                    :stroke-color="{
        from: '#1FCE9C',
        to: '#1FCE9C',
      }">
                            <template #format="percent">
                                <span style="color: #1FCE9C;font-size:12px"
                                      v-if="percent==100">
                                    <a-icon type="check"
                                            style="color: #1FCE9C;font-size:14px" />
                                </span>
                                <span style="color: #1FCE9C;font-size:12px"
                                      v-else>{{ percent }}%</span>
                            </template>
                        </a-progress> -->
                        <span style="color: #1FCE9C;font-size:12px"
                                      >{{ item.percent }}%</span>

                    </div>
                    <div>
                        <div class="imgClose"
                             @click="delList(index)">
                            <span class="icon iconfont "
                                  style="color:#AFAFAF;font-size:16px">&#xe6c5;</span>
                        </div>
                    </div>

                </li>
            </ul>
            <div class=" m-t-10" style="color:red">{{error}}</div>
            <div class="footerBtn"
                     v-show="fileList.length>0">

                    <div 
                              type="primary"
                              
                              @click="handleOk" class="btns">
                        确定
                    </div>
                    <div 
                              @click="handleCancel" class="btns">
                        取消
                    </div>
                </div>
               
 
            
        </div>
         
           <div class="mask"></div>
    </div>

</template>
<script>
// import { postAction, getAction } from '../../api/manage'
export default {
	data() {
		return {
			actionName: '',
			visible: true,
			isOnChange: false,
			formData: {},
			fileList: [],
			url: {
				upimg: 'https://test.lingwww.com/rpv4-test/sys/common/upload',
				medicareExamineImport2: 'https://test.lingwww.com/rpv4-test' + '/news/newsV3ResultSolr/medicareExamineImport2'
			},
			loading: false,
			error: '',
			dropActive: false
		}
	},

	methods: {
		show(name) {
             this.isOnChange = false
			this.error = ''
			this.fileList = []
			this.actionName = name
			this.visible = true
			this.$nextTick(() => {
			
				let drop = document.getElementById('drop')
				drop.addEventListener('drop', this.dropEvent, false)
				drop.addEventListener('dragleave', e => {
					e.stopPropagation()
					e.preventDefault()
					this.dropActive = false
				})
				drop.addEventListener('dragenter', e => {
					e.stopPropagation()
					e.preventDefault()
					this.dropActive = true
				})
				drop.addEventListener('dragover', e => {
					e.stopPropagation()
					e.preventDefault()
					this.dropActive = true
				})
			})
		},
		async changeImg(e) {
			// if (this.fileList.length >= 1) {
			// 	this.$message.warning('只能上传1个附件！')
			// 	return
			// }
			this.errorMsg = ''
			let file = e.target.files
			let formData = new FormData()
			let fileName = JSON.parse(JSON.stringify(file[0].name))
			let fileArray = fileName.split('.')
			let fileObj = {
				fileName: file[0].name,
				fileSize: (file[0].size / 1024).toFixed(2) + 'kb',
				percent: 0,
				fileType: null,
				index: this.fileList.length
			}
			// if (fileArray[fileArray.length - 1] !== 'xlsx' && fileArray[fileArray.length - 1] !== 'xls') {
			// 	this.$message.warn('请选择一个“xls、xlsx”文件')
			// 	return
			// }
			if (fileArray[fileArray.length - 1] == 'jpg' || fileArray[fileArray.length - 1] == 'png') {
				fileObj.fileType = 'img'
			} else if (fileArray[fileArray.length - 1] == 'pdf') {
				fileObj.fileType = 'pdf'
			} else if (fileArray[fileArray.length - 1] == 'xls' || fileArray[fileArray.length - 1] !== 'xlsx') {
				fileObj.fileType = 'xls'
			} else if (fileArray[fileArray.length - 1] == 'docx' || fileArray[fileArray.length - 1] !== 'doc') {
				fileObj.fileType = 'doc'
			} else {
				fileObj.fileType = 'other'
			}
			this.fileName = file[0].name
			formData.append('file', file[0])
			formData.append('index', this.fileList.length)
			this.formData = formData
			this.uploading = false
			this.isUpShow = true
			if (file[0].size / 1024 / 1024 > 10) {
				console.log('size,', fileObj.fileSize)
                       let notice = this.$message({      
                         message:"文件大小不能超过10M"
            })
      notice.open()
				
				return
			}
			this.fileList.push(fileObj)
			let result = await this.upload(this.url.upimg, formData)
			console.log('result,', result)
			this.fileList.forEach(e => {
				if (e.index == result.index) {
					e.downloadUrl = 'https://test.lingwww.com/rpv4-test' + '/sys/common/download/' + result.message
					e.src = result.message
					e.fileUrl = result.message
					e.viewSrc = 'https://test.lingwww.com/rpv4-test' + '/sys/common/view/' + result.message
					// e.viewSrc = 'https://test.lingwww.com/rpv4-test/sys/common/view/' + result.message
				}
			})
			this.$forceUpdate()
		},
		async dropEvent(e) {
			this.dropActive = false
			e.stopPropagation()
			e.preventDefault()
			console.log(e.dataTransfer.files)
			// if (this.fileList.length >= 1) {
			// 	this.$message.warning('只能上传1个附件！')
			// 	return
			// }
			this.errorMsg = ''
			let file = e.dataTransfer.files
			let formData = new FormData()
			let fileName = JSON.parse(JSON.stringify(file[0].name))
			let fileArray = fileName.split('.')
			let fileObj = {
				fileName: file[0].name,
				fileSize: (file[0].size / 1024).toFixed(2) + 'kb',
				percent: 0,
				fileType: null,
				index: this.fileList.length
			}
			// if (fileArray[fileArray.length - 1] !== 'xlsx' && fileArray[fileArray.length - 1] !== 'xls') {
			// 	this.$message.warn('请选择一个“xls、xlsx”文件')
			// 	return
			// }
			if (fileArray[fileArray.length - 1] == 'jpg') {
				fileObj.fileType = 'img'
			} else if (fileArray[fileArray.length - 1] == 'pdf') {
				fileObj.fileType = 'pdf'
			} else if (fileArray[fileArray.length - 1] == 'xls' || fileArray[fileArray.length - 1] == 'xlsx') {
				fileObj.fileType = 'xls'
			} else if (fileArray[fileArray.length - 1] == 'docx' || fileArray[fileArray.length - 1] == 'doc') {
				fileObj.fileType = 'doc'
			} else {
				fileObj.fileType = 'other'
			}
			this.fileName = file[0].name
			formData.append('file', file[0])
			formData.append('index', this.fileList.length)
			this.formData = formData
			this.uploading = false
			this.isUpShow = true

			this.fileList.push(fileObj)
			let result = await this.upload(this.url.upimg, formData)
			console.log('result,', result)
			this.fileList.forEach(e => {
				if (e.index == result.index) {
					e.downloadUrl = this.$baseUrl + '/sys/common/download/' + result.message
					e.src = result.message
					e.fileUrl = result.message
					// e.viewSrc =  this.$baseUrl + '/sys/common/view/' + result.message
					e.viewSrc = 'https://test.lingwww.com/rpv4-test/sys/common/view/' + result.message
				}
			})
			this.$forceUpdate()
		},
		upload(url, formData) {
			console.log('formData,', formData)
			const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxMDAzOTYsInVzZXJuYW1lIjoiemh1amwifQ.rH130zJ4yMYFzvmZqJbgWx_IbbpV5jCsRDDoWUvDtgs'
			// document.body.querySelector('.myProcess').style.display = 'block'
			return new Promise(resolve => {
				let xmlHttp = new XMLHttpRequest()
				xmlHttp.upload.onprogress = evt => {
					console.log(evt.loaded / evt.total * 100 + '%')
					console.log(evt)
					this.fileList[this.fileList.length - 1].percent = evt.loaded / evt.total * 100
					this.$forceUpdate()
					// document.body.querySelector('.plain').style.width = (evt.loaded / evt.total) * 100 + '%'
					// document.body.querySelector('.plainInt').innerHTML = parseInt((evt.loaded / evt.total) * 100) + '%'
				}
				xmlHttp.onload = () => {
					let obj = JSON.parse(xmlHttp.responseText)
					obj.index = formData.get('index')
					resolve(obj)
				}
				xmlHttp.open('post', url, true)
				xmlHttp.setRequestHeader('X-Access-Token', token)
				xmlHttp.send(formData)
			})
		},
	async handleOk() {
             if (this.fileList.length == 0) {
                        let notice = this.$message({      
                         message:"请至少上传一个问题件"
            })
      notice.open()
				return
			}
		let params={
            filePath:this.fileList[0].fileUrl,
           
        }
		//    let params = '?filePath='+this.fileList[0].fileUrl+"&wgxwName="+this.actionName
        //    let message = await this.sendData(this.url.medicareExamineImport2,params)
        this.$emit("getData",params)
			// getAction(this.url.medicareExamineImport2, params).then(res => {
			// 	this.loading = false
			// 	if (res.success) {
			// 		this.$message.success('上传成功，请稍后刷新列表！')
			// 		this.visible = false
			// 	} else {
			// 		this.error = res.message
			// 	}
			// })
		},
        // sendData(url,params){
        //   const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDAxMDAzOTYsInVzZXJuYW1lIjoiemh1amwifQ.rH130zJ4yMYFzvmZqJbgWx_IbbpV5jCsRDDoWUvDtgs'
		// 	// document.body.querySelector('.myProcess').style.display = 'block'
		// 	return new Promise(resolve => {
		// 		let xmlHttp = new XMLHttpRequest()
			
		// 		xmlHttp.onload = () => {
		// 			let obj = JSON.parse(xmlHttp.responseText)					
		// 			resolve(obj)
		// 		}
		// 		xmlHttp.open('get', url+params, true)
		// 		xmlHttp.setRequestHeader('X-Access-Token', token)
		// 		xmlHttp.send()
		// 	})
        // },
		delList(index) {
			this.fileList.splice(index, 1)
			this.$forceUpdate()
		},
		downLoad(item) {
			if (item.fileType !== 'img') {
				window.open(item.downloadUrl)
			}
		},
		handleCancel() {
			this.visible = false
		}
	}
}
</script>
<style scoped>
.popBox  {
    width: 400px;
    /* height: 360px; */
	padding: 34px 24px 10px 24px;
    position: fixed;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -180px;
    background: #fff;
    z-index: 999;
}
.disCC{
    display: flex;
    justify-content: space-between
}
.disRow{
    display: flex;
    flex-direction: row
}
.close {
	position: absolute;
	top: 8px;
	right: 0;
	z-index: 10;
	padding: 10px;
	color: #fd5451;
	font-weight: 700;
	line-height: 1;
	text-decoration: none;
	background: transparent;
	border: 0;
	outline: 0;
	cursor: pointer;
	transition: color 0.3s;
}
.popBox >>> .ant-modal-footer {
	border-top: none;
}
.line {
	width: 3px;
	height: 20px;
	background: #029a5f;
	display: block;
	margin-right: 16px;
}
.title {
	font-size: 18px;
	font-family: 'Adobe Heiti Std';
	font-weight: bold;
	color: #27313e;
	line-height: 20px;
}
.formBox >>> .ant-form-item-label {
	text-align: left;
	margin-left: 19px;
}
.uploadBox {
	position: absolute;
	width: 100%;
	height: 100%;
    
}
.changeImg {
	opacity: 0;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 33;
	cursor: pointer;
	position: absolute;
}
.imgBtn {
	position: absolute;
	left: 0;
	top: 0;
	z-index: 22;
	cursor: pointer;
}
.imgList li {
	height: 58px;
	width: 100%;
	line-height: 58px;
	align-items: center;
	position: relative;
	cursor: pointer;
	margin-bottom: 10px;
}
.liBox {
	width: 100%;
	/* border: 1px solid #dddddd; */
	line-height: 36px;
	align-items: center;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 12px 27px 12px 20px;
	border-radius: 4px;
	box-shadow: -1px 0 6px rgba(125, 125, 125, 0.1), /*左边阴影*/ 1px 0 6px rgba(125, 125, 125, 0.1),
		/*右边阴影*/ 0 -1px 6px rgba(125, 125, 125, 0.1), /*顶部阴影*/ 0 1px 6px rgba(125, 125, 125, 0.1); /*底边阴影*/
	/* 2px 2px 2px 2px rgba(125, 125, 125, 0.1); */
}
.circleBox >>> .ant-progress-text {
	font-size: 10px;
}
.imgBox {
	width: 28px;
	height: 32px;
	display: block;
	margin-right: 12px;
	margin-top: 2px;
}
.imgTitle {
	font-size: 14px;
	font-family: Adobe Heiti Std;
	font-weight: bold;
	color: #060606;
	line-height: 24px;
}
.subTitle {
	font-size: 12px;
	color: #999;
	line-height: 12px;
}
.imgClose {
	position: absolute;
	right: -8px;
	top: -12px;
	cursor: pointer;
}
.images {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}
.content {
	color: #27313e;
	font-size: 16px;
}
.footerBtn {
	width: 180px;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	justify-content: space-around;
	padding-bottom: 20px;
    margin-top:20px
}
.tips {
	line-height: 28px;
	background: #e0f3ec;
	border-radius: 3px;
	padding-left: 16px;
}
.tipTitle {
	color: #999999;
	font-size: 12px;
}
.addBox {
	border: 1px dashed #029a5f;
	border-radius: 5px;
	height: 166px;
	width: 100%;
	display: flex;
	flex-flow: column;
	align-items: center;
	position: relative;
}
.mask{
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    width:100%;
    height: 100%;
    z-index: 666;
}
ul, li { margin:0; padding:0; list-style:none; } 
.m-t-20{
    margin-top:20px
}
.m-t-30{
    margin-top:30px
}
.disStart{
    display:flex;
    justify-content: start;
}
.btns{
    width:50px;
    line-height:30px;
    border-radius: 6px;
    background:#029a5f;
    color:#fff
}
</style>
