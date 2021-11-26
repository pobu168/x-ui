<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { taskManInfo, movie } from '../server/request'
import axios from 'axios'
import { useI18n } from 'vue-i18n'
const { locale } = useI18n()
// 语言切换
const changeLang = (lang: string) => {
  // 切换语言 值要对应上面index中导出的名字  要一致  第四步
  locale.value = lang
  // 缓存到localStorage中下次进来还是切换后的语言  如果不需要可以删除下面代码
  localStorage.setItem('lang', lang)
}
onMounted(async () => {
  const yy = await taskManInfo()
  console.log(yy)
  const params = {
    params: {
      search: '.',
      search_type: 'endpoint'
    }
  }
  const xx = await movie(params)
  console.log(xx)
});
</script>

<template>
  <a-button type="link">Link Button</a-button>
  <div>{{$t('lang')}}</div>
</template>

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
