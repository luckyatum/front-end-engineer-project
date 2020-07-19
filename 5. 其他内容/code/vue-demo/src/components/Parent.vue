<template>
  <div class="parent">
    <div class="title">我是父组件，目前Count: {{getCount}}</div>
    <Son />
  </div>
</template>

<script>
import Son from './Son';
import { mapGetters } from 'vuex'

export default {
  name: 'Parent',
  computed: {
    ...mapGetters([ 'getCount' ])
  },
  components: {
    Son
  }
}
</script>