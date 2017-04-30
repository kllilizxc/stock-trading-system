<template>
  <md-card id="signup-card">
  <form id="signup-form" novalidate @submit.stop.prevent="">
    <span id="headline" class="md-headline">注册</span>
    <div v-for="field in fields">
      <md-input-container>
      <label>{{field.name}}</label>
      <md-input :required="field.required"></md-input>
    </md-input-container>
    </div>
    <md-button id="signup-button" class="md-raised md-primary">注册</md-button>
  </form>
</md-card>
</template>

<script>
  export default {
    name: 'Signup',
    data () {
      return {
        fields: [
          { name: '用户名', required: true },
          { name: '密码', required: true },
          { name: '重复密码', required: true },
          { name: 'Email', required: true },
          { name: '电话', required: true },
          { name: '姓名', required: true },
          { name: '性别', required: true },
          { name: '关注股票ID', required: true },
          { name: '证券账户', required: false },
          { name: '家庭地址', required: false }
        ]
      }
    }
  }
</script>

<style scoped>
  #signup-card {
    width: 500px;
    margin: 32px auto;
    padding: 24px 48px;
    margin-top: 32px;
  }
  #signup-button {
    margin: 16px 0;
  }
  #headline {
    margin-bottom: 16px;
  }
</style>
