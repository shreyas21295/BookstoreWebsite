<script setup lang="ts">
import { defineProps, Ref } from "vue";
import { Validation } from "@vuelidate/core";

const props = defineProps<{
  fieldName: string;
  validator: Ref<Validation>;
}>();
</script>

<style scoped>
/*form > .error {*/
/*  color: red;*/
/*  text-align: right;*/
/*}*/
.error {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  font-size: 0.8em;
  color: red;
  margin-top: 0.3em;
  /*margin-bottom: 0.3em;*/
}
</style>

<template>
  <template v-if="validator[fieldName].$error">
    <span
      class="error"
      v-for="error of validator[fieldName].$errors"
      :key="error.$uid"
      >{{ error.$message }}</span
    >
  </template>
</template>
