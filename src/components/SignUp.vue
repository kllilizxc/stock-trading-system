<template>
  <md-card id="signup-card">
    <form id="signup-form" novalidate @submit.stop.prevent="signup">
      <span id="headline" class="md-headline">注册</span>
      <div v-for="info in infos" :key="info.name">
        <md-input-container :class="{'md-input-invalid': errors.has(info.name)}">
          <label>{{info.name}}</label>
          <md-input :required="info.required" :data-vv-name="info.name" v-model="info.value" v-validate :data-vv-rules="info.validate" type="info.type"></md-input>
          <span v-show="errors.has(info.name)" class="md-error">{{ errors.first(info.name) }}</span>
        </md-input-container>
      </div>
      <md-button id="signup-button" class="md-raised md-primary" type="submit">注册</md-button>
    </form>
  </md-card>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'SignUp',
    data () {
      return {
        infos: [
        { name: '用户名', type: 'text', required: true, value: '', validate: 'required|alpha_num|max:20|min:6' },
        { name: '密码', type: 'password', required: true, value: '', validate: 'required|max:32|min:6' },
        { name: '重复密码', type: 'password', required: true, value: '', validate: 'required|max:32|min:6' },
        { name: 'Email', type: 'email', required: true, value: '', validate: 'required|email|max:20' },
        { name: '电话', type: 'phone', required: true, value: '', validate: 'required' },
        { name: '姓名', type: 'text', required: true, value: '' },
        { name: '性别', type: 'text', required: true, value: '', validate: 'max:20' },
        { name: '资金账户', type: 'text', required: false, value: '', validate: 'alpha_num|max:20|min:6' },
        { name: '家庭地址', type: 'text', required: false, value: '', validate: 'max:20' }
        ]
      }
    },
    computed: {
      username () { return this.infos[0].value },
      password () { return this.infos[1].value },
      passwordRepeat () { return this.infos[2].value },
      email () { return this.infos[3].value },
      phone () { return this.infos[4].value },
      realName () { return this.infos[5].value },
      sex () { return this.infos[6].value },
      accountName () { return this.infos[7].value },
      familyAddr () { return this.infos[8].value }
    },
    methods: {
      signup () {
        this.$validator.validateAll().then(() => {
          if (this.password !== this.passwordRepeat) {
            alert('两次输入的密码不相等！')
            return
          }
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
              this.$root.$emit('update-user')
              this.$router.push({ name: 'Profile' })
            } else {
              alert('注册失败！ 原因: ' + data.err)
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
  #signup-card {
    width: 460px;
    margin: 32px auto;
    padding: 24px 48px;
    margin-top: 32px;
  }
  #info.name[1]{
    width: 230px;
  }
  #signup-button {
    margin: 16px 0;
  }
  #headline {
    margin-bottom: 16px;
  }
</style>
