<template>
  <div>
    <p>{{ count }}</p>
    <button @click="count++">+1</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);
</script>
