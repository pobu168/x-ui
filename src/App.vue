<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal">
    <a-menu-item key="mail">
      首页
    </a-menu-item>
    <a-sub-menu>
      <template #title>子菜单</template>
      <a-menu-item> 子菜单1 </a-menu-item>
      <a-menu-item> 子菜单2 </a-menu-item>
    </a-sub-menu>
  </a-menu> 
  <HelloWorld/>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import HelloWorld from './components/HelloWorld.vue'
  export default defineComponent({
    setup() {
      const current = ref<string[]>(['mail']);
      return {
        current,
      };
    },
  });
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
