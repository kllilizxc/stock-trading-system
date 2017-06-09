<template>
  <md-card id="signin-card">
    <form id="signin-form" novalidate @submit.stop.prevent="signin">
      <span id="headline" class="md-headline">登陆</span>
      <md-input-container :class="{'md-input-invalid': errors.has('username')}">
        <label>用户名</label>
        <md-input name="username" data-vv-name="username" v-model="username" v-validate data-vv-rules="required|alpha_num|max:20|min:6"></md-input>
        <span v-show="errors.has('username')" class="md-error">{{ errors.first('username') }}</span>
      </md-input-container>
      <md-input-container :class="{'md-input-invalid': errors.has('password')}">
        <label>密码</label>
        <md-input required data-vv-name="password" v-model="password" type="password" v-validate data-vv-rules="required|max:32|min:6"></md-input>
        <span v-show="errors.has('password')" class="md-error">{{ errors.first('password') }}</span>
      </md-input-container>
      <router-link to="/SignUp">
        <md-button id="signup-button" class="md-raised md-primary">注册</md-button>
      </router-link>
      <md-button id="signin-button" class="md-raised md-primary" type="signin-button">登陆</md-button>
    </form>
  </md-card>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'SignIn',
    data () {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      signin () {
        this.$validator.validateAll().then(() => {
          $.post('/signin/' + this.username + '/' + this.password, data => {
            if (data.code || data.result.length === 0) {
              alert('登录成功!')
              this.$root.$emit('update-user')
              this.$router.push({ name: 'Welcome' })
            } else {
              alert('登录失败! 原因: ' + data.err)
            }
          })
        }).catch(() => {
          alert('表单填写不正确！')
        })
      }
    }
  }
</script>

<style scoped>
  #signin-card {
    width: 320px;
    margin: 32px auto;
    padding: 24px 48px;
  }
  #signin-button, #signup-button {
    margin: 16px 8px;
  }
  #headline {
    margin-bottom: 16px;
  }
</style>
