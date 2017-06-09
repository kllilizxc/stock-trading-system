<template>
  <md-card id="signup-card">
  <form id="signup-form" novalidate @submit.stop.prevent="signup">
    <span id="headline" class="md-headline">注册</span>
    <div v-for="field in fields">
      <md-input-container>
      <label>{{field.name}}</label>
      <md-input :required="field.required" v-model="field.value"></md-input>
    </md-input-container>
    </div>
    <md-button id="signup-button" class="md-raised md-primary" type="submit">注册</md-button>
  </form>
</md-card>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'Signup',
    data () {
      return {
        fields: [
          { name: '用户名', required: true, value: '' },
          { name: '密码', required: true, value: '' },
          { name: '重复密码', required: true, value: '' },
          { name: 'Email', required: true, value: '' },
          { name: '电话', required: true, value: '' },
          { name: '姓名', required: true, value: '' },
          { name: '性别', required: true, value: '' },
          { name: '资金账户', required: false, value: '' },
          { name: '家庭地址', required: false, value: '' }
        ]
      }
    },
    computed: {
      username () { return this.fields[0].value },
      password () { return this.fields[1].value },
      passwordRepeat () { return this.fields[2].value },
      email () { return this.fields[3].value },
      phone () { return this.fields[4].value },
      realName () { return this.fields[5].value },
      sex () { return this.fields[6].value },
      accountName () { return this.fields[7].value },
      familyAddr () { return this.fields[8].value }
    },
    methods: {
      signup () {
        $.post('/signup', {
          username: this.username,
          password: this.password,
          email: this.email,
          phone: this.phone,
          realName: this.realName,
          sex: this.sex,
          accountName: this.accountName,
          familyAddr: this.familyAddr
        }, data => {
          if (data.code) {
            alert('注册成功!')
            this.$router.push({ name: 'Profile' })
          } else {
            alert('注册失败！ 原因: ' + data.err)
          }
        })
      }
    }
  }
</script>

<style scoped>
  #signup-card {
    width: 460px;
    margin: 32px auto;
    padding: 24px 48px;
    margin-top: 32px;
  }
  #field.name[1]{
  width: 230px;
  }
  #signup-button {
    margin: 16px 0;
  }
  #headline {
    margin-bottom: 16px;
  }
</style>
