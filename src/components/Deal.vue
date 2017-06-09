<template>
  <md-card id="deal-card">
    <span class="title md-title md-primary">交易</span>
    <form novalidate id="deal-form" @submit.stop.prevent="deal">
      <md-input-container>
        <label for="type">交易类型</label>
        <md-select name="type" v-model="type" required>
          <md-option value="0">限价申报</md-option>
          <md-option value="1">撤销申报</md-option>
          <md-option value="2">转限申报</md-option>
        </md-select>
      </md-input-container>
      <md-input-container>
        <label for="action">买/卖</label>
        <md-select name="action" v-model="action" required>
          <md-option value="0">买</md-option>
          <md-option value="1">卖</md-option>
          <md-option value="2">买/卖</md-option>
        </md-select>
      </md-input-container>
      <md-input-container>
        <label for="count">数量</label>
        <md-input type="number" name="count" v-model="count" required></md-input>
      </md-input-container>
      <md-input-container>
        <label for="price">价格</label>
        <md-input type="number" v-model="price" name="price"></md-input>
      </md-input-container>
      <md-input-container>
        <label for="user-id">用户 ID</label>
        <md-input name="user-id" v-model="userId" required></md-input>
      </md-input-container>
      <md-input-container>
        <label for="stock-id">股票 ID</label>
        <md-input name="stock-id" v-model="stockId" required></md-input>
      </md-input-container>
      <md-button class="md-primary md-raised" type="submit">提交</md-button>
    </form>
  </md-card>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'Deal',
    data () {
      return {
        type: 0,
        action: 0,
        count: 0,
        price: 0,
        userId: '',
        stockId: ''
      }
    },
    methods: {
      deal () {
        $.post('/deal', {
          type: this.type,
          action: this.action,
          count: this.count,
          price: this.price,
          userId: this.userId,
          stockId: this.stockId
        }, result => {
          if (result.code) {
            alert('Deal Success!')
            this.$router.push({ name: 'Record' })
          } else {
            alert('Deal Failed! Reason: ' + result.err)
          }
        })
      }
    },
    mounted () {
      $.get('/userInfo', result => {
        if (result.code) {
          // let info = result.result[0]
        } else {
          alert('Please login first!')
          this.$router.push({ name: 'SignIn' })
        }
      })
    }
  }
</script>

<style scoped>
  .title {
    margin-bottom: 16px;
  }
  #deal-card {
    max-width: 400px;
    width: 100%;
    margin: auto;
    padding: 32px;
  }
</style>
