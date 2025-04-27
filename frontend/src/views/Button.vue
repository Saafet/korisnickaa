<template>
  <button :class="['btn', type]" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  }
};
</script>

<style scoped>
.btn {
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px;
}
.primary {
  background: blue;
  color: white;
}
.secondary {
  background: white;
  color: blue;
  border: 2px solid blue;
}
</style>
