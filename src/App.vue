<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" theme="dark">
    <a-menu-item key="mail">
      首页
    </a-menu-item>
    <a-sub-menu>
      <template #title>子菜单</template>
      <a-menu-item> 子菜单1 </a-menu-item>
      <a-menu-item> 子菜单2 </a-menu-item>
    </a-sub-menu>
  </a-menu>
  <div class="lang-zone">
    <a-dropdown>
      <a class="ant-dropdown-link" @click.prevent>
        <GlobalOutlined />
        {{$t('lang')}}
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <a href="javascript:;" @click="changeLang('cn')">中文</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;" @click="changeLang('en')">English</a>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
  <!-- <HelloWorld/> -->
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { GlobalOutlined } from '@ant-design/icons-vue';
  import HelloWorld from './components/HelloWorld.vue'
  const current = ref<string[]>(['']);
  import { useI18n } from 'vue-i18n'
  const { locale } = useI18n()
  // 语言切换
  const changeLang = (lang: string) => {
    // 切换语言 值要对应上面index中导出的名字  要一致  第四步
    locale.value = lang
    // 缓存到localStorage中下次进来还是切换后的语言  如果不需要可以删除下面代码
    localStorage.setItem('lang', lang)
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.lang-zone {
  position: absolute;
  top: 12px;
  right: 40px;
}
</style>
