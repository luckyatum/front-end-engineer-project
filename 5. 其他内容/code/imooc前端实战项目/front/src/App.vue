<template>
  <div id="app">
    <div class="layui-container">
      <form class="layui-form layui-form-pane" action>
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="title"
              required
              v-model="name"
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <div class="layui-input-block">
            <input
              type="password"
              name="title"
              v-model="password"
              required
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="title"
              v-model="code"
              required
              lay-verify="required"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="layui-form-mid svg"
          @click="getCaptcha()"
          v-html="svg">图片</div>
        </div>
        <button type="button" class="layui-btn" @click="checkForm">提交按钮</button>
        <a class="imooc-link" href="http://www.layui.com">忘记密码</a>
      </form>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      svg: '',
      name: '',
      password: '',
      code: '',
      errorMsg: []
    }
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    getCaptcha () {
      Axios.get('http://localhost:3000/getCaptcha').then(res => {
        if (res.status === 200) {
          const obj = res.data
          if (obj.code === 200) {
            this.svg = obj.msg
          }
        }
        console.log(res)
      })
    },
    checkForm () {
      this.errorMsg = []

      if (!this.name) {
        this.errorMsg.push('登录名为空!')
      }
      if (!this.password()) {
        this.errorMsg.push('密码不得为空!')
      }
      if (!this.code) {
        this.errorMsg.push('验证码为空!')
      }
    }
  }
}
</script>
>

<style lang="scss" scoped>
#app {
  background-color: #f2f2f2;
}
.layui-container {
  background-color: #fff;
}

input {
  width: 190px;
}
.imooc-link {
  margin-left: 10px;
  &:hover {
    color: #009688;
  }
}
.svg {
  position: relative;
  top: -15px;
}
</style>
