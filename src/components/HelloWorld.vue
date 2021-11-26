<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
const count = ref(0)

onMounted(async () => {
  // await getFissionCourseList().then((res: any) => {
  //   console.log(res);
  // });
    axios({
      method: 'post',
      url: '/taskman/entities/request/query',
      params: {
      },
    }).then(res => {
      console.log(res);
    });
    axios({
      method: 'get',
      url: '/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0',
      params: {
      },
    }).then(res => {
      console.log(res);
    });
  });
</script>

<template>
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
