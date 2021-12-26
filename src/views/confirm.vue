<template>
  <div class="hello">
    <button @click="toggleModal">打开对话框</button>
    <myConfirm v-show="showModal" v-on:closeme="closeme"></myConfirm>
  </div>
</template>
 
<script>

import myConfirm from "@/components/myConfirm/index";
export default {
  name: 'HelloWorld',
  data () {
    return {
      showModal:false
    }
  },
  components:{
    myConfirm
  },
  methods:{
    toggleModal:function(){
      this.showModal = !this.showModal;
    },
    closeme:function(){
      this.showModal = !this.showModal;
    }
  }
}
</script>
 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>