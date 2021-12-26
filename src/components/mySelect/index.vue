<template>
<div>
    <div  :style="{width:width,height:height}" class="bigOut" @mouseleave="outSelect" >
       
            <div @click="changeOption" style="text-align:left;width:100%" :class="[isOverFlow?'isOutBox':'outBox']">
                 <div class="innerBox">
                   <span v-for="(item,index) in selectOptions" :key="index" class="oneItem">{{item.label|filterLabel}}<span class="icon iconfont">&#xeca0;</span></span>
                </div>
                <div v-if="numTotal !== 0">...+{{numTotal}}</div>
                 <span class="icon iconfont arrowUp" v-if="!isShow">&#xe600;</span>
        <span class="icon iconfont arrowDown" v-else>&#xe601;</span>       
        
        </div>        
        <div class="optionLabel" v-show="isShow" :style="{top:isOverFlow?'65px':'33px'}">
            <p v-for="(selectItem,indexLocal) in list" :class="[selectItem.isSelect?'isActive':'li']" :key="selectItem.value" @click="clickOption(selectItem,indexLocal)"><span>{{selectItem.label}}</span><span class="icon iconfont" v-if="selectItem.isSelect" style="color:#26bd65">&#xe610;</span><span class="icon iconfont hoverIcon">&#xe610;</span></p>
        </div>
    </div>
    </div>
    
</template>
<script>
export default {
    props:{
      list:{
          type:Array,
          default:[]
      },
      width:{
            type:String,
          default:'280px'
      }
    },
    filters:{
      filterLabel(v){
          if(v.length>5){
             return v.slice(0,5)+"..."
          }else{
              return v
          }
         
      }
    },
    data(){
        return{
           selectOptions:[],
           isShow:false,
           isOverFlow:false,
           optionOver:false,
           height:null,
           numTotal:0
        }
    },
    beforeMount(){
         this.list.forEach(e=>{
             e.isSelect = false
         })
    },
    methods:{
        changeOption(){
          this.isShow = !this.isShow
          if(this.isShow && this.optionOver){
              this.isOverFlow = true
          }else{
              this.isOverFlow = false
          }

        },
        clickOption(item,indexLocal){
          let flag = null         
          if(this.selectOptions.length !==0){
              this.selectOptions.forEach((e,index) => {
                  if(e.value == item.value){
                     flag = index                        
                  }
              });
           
              if(flag !==null){
                this.selectOptions.splice(flag,1)  
              this.list[indexLocal].isSelect = false  
              }else{
                 this.selectOptions.push(item)
                       this.list[indexLocal].isSelect = true
              }
               
          }else{
              this.selectOptions.push(item)
              this.list[indexLocal].isSelect = true 
              this.$forceUpdate()
          }              
              this.values = this.selectOptions.map(e=>{
                 return e.value
              })
           
          this.$emit("change",this.values)
          let doc = document.body.querySelectorAll(".oneItem")      
        
          this.$nextTick(()=>{
                   let width = doc[0]?doc[0].offsetWidth*doc.length:0                   
                    if(width>Number(this.width.split("px")[0])){
                        this.optionOver = true
                    }else{
                        this.optionOver = false
                       
                    }
                    if(this.isShow && this.optionOver){
                        this.isOverFlow = true
                    }else{
                        this.isOverFlow = false
                    }
                    if(doc.length>0){
                        for(var i=0;i<doc.length+1;i++){
                            console.log((doc[0].offsetWidth)*(i+1))
                        if(doc[0].offsetWidth*(i+1)>Number(this.width.split("px")[0])*0.75){
                           console.log(doc.length-i+1)
                           this.numTotal = ( this.selectOptions.length-i)
                           return 
                        }
                    }
                    }
                  
                    if(width<Number(this.width.split("px")[0])){
                        this.numTotal = 0
                    }
          })
        
        },
        outSelect(){
            // debugger
            this.isShow = false
            this.isOverFlow = false
        },
        enterSelect(){
            
        }
    }
}
</script>
<style>
.bigOut{
position: relative;
/* min-height: 32px */
}
.outBox{
 border: 1px solid #d9d9d9;
 height: 32px;
 overflow: hidden;
 line-height: 32px;
 /* position: absolute; */
 display: flex;
 justify-content: space-between;
 padding: 0 10px;
 box-sizing: border-box

}
.isOutBox{
     border: 1px solid #d9d9d9;
 height: 64px;
 overflow-y: auto;
 line-height: 32px;
 position: absolute;
     display: flex;
    justify-content: space-between;
}
.optionLabel{
    position: absolute;
    top: 33px;
    left: 0;
    width: 100%;
    text-align: left;
    background: #fff;
        box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
        max-height: 320px;
        overflow-y: auto

}
.optionLabel p{
    margin: 0;
   position: relative;
    padding: 0 10px;
    font-size: 14px
}
.optionLabel p .iconfont{
  position: absolute;
  right: 10px;
  z-index: 888;

}
.optionLabel p .hoverIcon{
   display: none;
     position: absolute;
  right: 10px;
  z-index: 666;
}
.optionLabel p:hover{
    background: #cce3d6
}
.optionLabel p:hover .hoverIcon{
   display: inline-block;
  
  
}
.optionLabel  .isActive{
  background-color: #fafafa;
  line-height: 32px
}
.li{
    line-height: 32px
}
.oneItem{
        color: #21bb6e;
        border: 1px solid #21bb6e;
        border-radius: 18px;
        font-size: 14px;
        line-height: 20px;
        display: inline-block;
        padding: 0 8px;
        text-align: left
}
.innerBox{
  width: 75%
}
</style>

