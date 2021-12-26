<template>
    <div>
        <myUpfile @getData="getParams"></myUpfile>
    </div>
</template>
<script>
import myUpfile from "@/components/myUpfile/index";
export default {
    data(){
        return{

        }
    },
    components:{
myUpfile
    },
    methods:{
        getParams(obj){
            
        }
    }
}
</script>

