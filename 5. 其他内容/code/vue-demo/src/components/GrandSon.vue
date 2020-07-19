<template>
  <div class="grand-son">
    <div class="title">我是孙组件，爸爸组件说：{{parentMsg}}</div>
  </div>
</template>

<script>
export default {
  name: 'GrandSon',
  inject: [ 'parentMsg' ]
}
</script>