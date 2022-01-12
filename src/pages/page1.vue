<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { taskManInfo, movie } from '../server/request'
import axios from 'axios'
let count = reactive({})
onMounted(async () => {
  const yy = await taskManInfo()
  count = yy
  console.log(count)
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
  <div>
    page1 - {{count}}
  </div>
</template>
