<template>
  <div class="son">
    <div class="title">我是子组件一</div>
    <button @click="$store.dispatch('increment')">点击count+1</button>
  </div>
</template>

<script>

export default {
  name: 'Son',
}
</script>