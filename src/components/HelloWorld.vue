<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { taskManInfo, movie } from '../server/request'
import axios from 'axios'
const count = ref(0)

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
