<template>
  <div class="son">
    <div class="title">我是子组件二</div>
  </div>
</template>

<script>
import Bus from '@/lib/bus.js';

export default {
  name: 'Son2',
  mounted() {
    Bus.$emit('onSon', 'hello！我是Son2');
  }
}
</script>