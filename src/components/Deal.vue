<template>
  <md-card id="deal-card">
    <span class="title md-title md-primary">交易</span>
    <form novalidate id="deal-form" @submit.stop.prevent="deal">
      <md-input-container :class="{'md-input-invalid': errors.has('type')}">
        <label for="type">交易类型</label>
        <md-select data-vv-name="type" v-model="type" v-validate data-vv-rules="required" required>
          <md-option value="0">限价申报</md-option>
          <md-option value="1">撤销申报</md-option>
          <md-option value="2">转限申报</md-option>
        </md-select>
        <span v-show="errors.has('type')" class="md-error">{{ errors.first('type') }}</span>
      </md-input-container>
      <md-input-container :class="{'md-input-invalid': errors.has('action')}">
        <label for="action">买/卖</label>
        <md-select data-vv-name="action" v-model="action" v-validate data-vv-rules="required" required>
          <md-option value="0">买</md-option>
          <md-option value="1">卖</md-option>
          <md-option value="2">买/卖</md-option>
        </md-select>
        <span v-show="errors.has('action')" class="md-error">{{ errors.first('action') }}</span>
      </md-input-container>
      <md-input-container :class="{'md-input-invalid': errors.has('count')}">
        <label for="count">数量</label>
        <md-input type="number" data-vv-name="count" v-model="count" v-validate data-vv-rules="required|numeric|min_value:0"></md-input>
        <span v-show="errors.has('count')" class="md-error">{{ errors.first('count') }}</span>
      </md-input-container>
      <md-input-container :class="{'md-input-invalid': errors.has('price')}">
        <label for="price">价格</label>
        <md-input type="number" v-model="price" v-validate data-vv-rules="required|decimal|min_value:0" data-vv-name="price"></md-input>
        <span v-show="errors.has('price')" class="md-error">{{ errors.first('price') }}</span>
      </md-input-container>
      <md-input-container :class="{'md-input-invalid': errors.has('user-id')}">
        <label for="user-id">用户 ID</label>
        <md-input data-vv-name="user-id" v-model="userId" v-validate data-vv-rules="required|alpha_num|min:6|max:20" required></md-input>
        <span v-show="errors.has('user-id')" class="md-error">{{ errors.first('user-id') }}</span>
      </md-input-container>
      <md-input-container :class="{'md-input-invalid': errors.has('stock-id')}">
        <label for="stock-id">股票 ID</label>
        <md-input data-vv-name="stock-id" v-model="stockId" v-validate data-vv-rules="required|digits:6" required></md-input>
        <span v-show="errors.has('stock-id')" class="md-error">{{ errors.first('stock-id') }}</span>
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
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      deal () {
        this.$validator.validateAll().then(() => {
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
        }).catch(() => {
          alert('表单填写不正确！')
        })
      },
      fetchData () {
        console.log(this.$route.params)
        this.stockId = this.$route.params.stockId
      }
    },
    created () {
      $.get('/userInfo', result => {
        if (result.code) {
          let info = result.result[0]
          this.userId = info.accountName
        } else {
          alert('Please login first!')
          this.$router.push({ name: 'SignIn' })
        }
      })

      this.fetchData()
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
