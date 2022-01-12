<template>
  <div>
    <h1 @click="add">{{count}}</h1>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
let count = ref(1)
const add = () => {
  count.value ++
}
</script>
<style scoped>
h1 {
  color: red;
}
</style>