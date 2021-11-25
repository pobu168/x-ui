<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
const count = ref(0)
onMounted(async () => {
      // await getFissionCourseList().then((res: any) => {
      //   console.log(res);
      // });
      axios({
        method: 'get',
        url: '/j/search_subjects',
        params: {
          type: 'movie',
          tag: '热门',
          page_limit: 50,
          page_start: 0,
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
