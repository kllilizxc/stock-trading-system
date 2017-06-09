<template>
  <md-card id="profile-card">
    <form id="profile-form" novalidate @submit.stop.prevent="update">
      <span id="headline" class="md-headline">个人资料</span>
      <!-- <md-avatar class="md-large">
        <img src="//placeimg.com/40/40/people/1" />
      </md-avatar> -->
      <md-layout :md-gutter="16">
        <md-layout>
          <md-input-container :class="{'md-input-invalid': errors.has('actualName')}">
            <label>{{actualName.name}}</label>
            <md-input data-vv-name="actualName" v-model="actualName.value" v-validate="'max:20'"></md-input>
            <span v-show="errors.has('actualName')" class="md-error">{{ errors.first('actualName') }}</span>
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container :class="{'md-input-invalid': errors.has('idNumber')}">
            <label>{{idNumber.name}}</label>
            <md-input data-vv-name="idNumber" v-model="idNumber.value" v-validate="'digits:18'"></md-input>
            <span v-show="errors.has('idNumber')" class="md-error">{{ errors.first('idNumber') }}</span>
          </md-input-container>
        </md-layout>
      </md-layout>
      <md-layout :md-gutter="16">
        <md-layout>
          <md-input-container :class="{'md-input-invalid': errors.has('phone')}">
            <label>{{phone.name}}</label>
            <md-input data-vv-name="phone" v-model="phone.value" v-validate data-vv-rules="max:20"></md-input>
            <span v-show="errors.has('phone')" class="md-error">{{ errors.first('phone') }}</span>
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container :class="{'md-input-invalid': errors.has('stockAccount')}">
            <label>{{stockAccount.name}}</label>
            <md-input data-vv-name="stockAccount" v-model="stockAccount.value" v-validate data-vv-rules="alpha_num|max:20|min:6"></md-input>
            <span v-show="errors.has('stockAccount')" class="md-error">{{ errors.first('stockAccount') }}</span>
          </md-input-container>
        </md-layout>
      </md-layout>
      <md-layout :md-gutter="16">
        <md-layout>
          <md-input-container :class="{'md-input-invalid': errors.has('familyAddress')}">
            <label>{{familyAddress.name}}</label>
            <md-input data-vv-name="familyAddress" v-model="familyAddress.value" v-validate data-vv-rules="max:20"></md-input>
            <span v-show="errors.has('familyAddress')" class="md-error">{{ errors.first('familyAddress') }}</span>
          </md-input-container>
        </md-layout>
      </md-layout>
    </md-layout>
    <md-layout :md-gutter="16">
      <md-layout>
        <md-input-container>
          <label>{{totalFund.name}}</label>
          <md-input v-model="totalFund.value" disabled></md-input>
        </md-input-container>
      </md-layout>
      <md-layout>
        <md-input-container>
          <label>{{totalStock.name}}</label>
          <md-input v-model="totalStock.value" disabled></md-input>
        </md-input-container>
      </md-layout>
    </md-layout>
    <md-button id="update-button" class="md-raised md-primary" type="submit">更新</md-button>
  </form>
</md-card>
</template>

<script>
  import $ from 'jquery'

  export default {
    name: 'Profile',
    data () {
      return {
        actualName: { name: '真实姓名', value: '' },
        idNumber: { name: '身份证', value: '' },
        phone: { name: '电话号码', value: '' },
        stockAccount: { name: '资金账户', value: '' },
        familyAddress: { name: '家庭住址', value: '' },
        totalFund: { name: '资金总额', value: 0 },
        totalStock: { name: '股票总额', value: 0 }
      }
    },
    methods: {
      update () {
        this.$validator.validateAll().then(() => {
          $.post('/userInfo', {
            name: this.actualName.value,
            idnum: this.idNumber.value,
            phone: this.phone.value,
            accountName: this.stockAccount.value,
            fmaddr: this.familyAddress.value
          }, function (result) {
            if (result.code) {
              alert('更新成功!')
            } else {
              alert('更新失败! 原因: ' + result.err)
            }
          })
        }).catch(() => {
          alert('表单填写不正确！')
        })
      }
    },
    created () {
      $.get('/userInfo', result => {
        if (result.code) {
          let info = result.result[0]

          this.stockAccount.value = info.accountname
          this.familyAddress.value = info.fmaddr
          this.idNumber.value = info.idnum
          this.actualName.value = info.name
          this.phone.value = info.phone
        } else {
          alert('Please login first!')
          this.$router.push({ name: 'SignIn' })
        }
      })
    }
  }
</script>

<style scoped>
  #profile-card {
    width: 100%;
    max-width: 500px;
    padding: 32px;
    margin: auto;
  }
  #headline {
    margin-bottom: 32px;
  }
</style>
