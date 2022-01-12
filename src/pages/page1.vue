<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { taskManInfo, movie } from '../server/request'
let res = reactive({data: []})
onMounted(async () => {
  type YY = {
    status: any,
    data: any
  }
  const {status, data}:YY = await taskManInfo()
  if (status === 'OK') {
    res.data = data
    console.log(data)
  }
  // console.log(status, data)
  // const params = {
  //   params: {
  //     search: '.',
  //     search_type: 'endpoint'
  //   }
  // }
  // const xx = await movie(params)
  // console.log(xx)
});
</script>

<template>
  <div>
    page1 - {{res}}
  </div>
</template>
