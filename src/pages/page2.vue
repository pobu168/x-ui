<template>
  <div>{{yy}}</div>
  <div>{{yy1.msg}}</div>
  <div>{{yy2}}</div>
  <div @click="onChange">按钮yy</div>
  <div @click="onChange1">按钮yy1</div>
  <div @click="onChange2">按钮yy2</div>
</template>
 
 
<script lang="ts">
import { ref, defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    let yy = ref('研究setup');
    let yy1 = reactive({msg:'研究setup'});
    let yy2 = '研究setup';
    console.log(yy.value);
    console.log(yy1.msg);
    console.log(yy2);
    function onChange()
{
      yy.value = 'yy';
      console.log(yy.value);
      
    }
    function onChange1()
{
      yy1.msg = 'yy1'
      console.log(yy1.msg);
      
    }
    function onChange2()
{
      yy2 = '哈哈'
      console.log(yy2);
      
    }
    return {yy,yy1,yy2,onChange ,onChange1,onChange2}
  }
})
</script>
 
 
<style scoped>
a {
  color: #42b983;
}
 
 
label {
  margin: 0 0.5em;
  font-weight: bold;
}
 
 
code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
 
 