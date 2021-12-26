<template>
    <mySelect :list="list"  @change="changeList"></mySelect>
    
</template>
<script>
import mySelect from "@/components/mySelect/index";
export default {
    data(){
        return{
            list:[{
              label:'测试测试测试测试测试测试1',
              value:1
            },{
              label:'测试测试测试测试测试测试2',
              value:2
            },{
              label:'测试测试测试测试测试测试3',
              value:3
            },{
              label:'测试测试测试测试测试测试4',
              value:4
            },{
              label:'测试测试测试测试测试测试5',
              value:5
            },]
        }
    },
    components:{
        mySelect
    },
    methods:{
        changeList(){

        }
    }
}
</script>


