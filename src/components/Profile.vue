<template>
  <md-card id="profile-card">
    <form id="profile-form" novalidate @submit.stop.prevent="update">
      <span id="headline" class="md-headline">个人资料</span>
      <!-- <md-avatar class="md-large">
        <img src="//placeimg.com/40/40/people/1" />
      </md-avatar> -->
      <md-layout :md-gutter="16">
        <md-layout>
          <md-input-container>
            <label>{{actualName.name}}</label>
            <md-input v-model="actualName.value"></md-input>
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container>
            <label>{{idNumber.name}}</label>
            <md-input v-model="idNumber.value"></md-input>
          </md-input-container>
        </md-layout>
      </md-layout>
      <md-layout :md-gutter="16">
        <md-layout>
          <md-input-container>
            <label>{{phone.name}}</label>
            <md-input v-model="phone.value"></md-input>
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container>
            <label>{{stockAccount.name}}</label>
            <md-input v-model="stockAccount.value"></md-input>
          </md-input-container>
        </md-layout>
      </md-layout>
      <md-layout :md-gutter="16">
        <md-layout>
            <md-input-container>
              <label>{{familyAddress.name}}</label>
              <md-input v-model="familyAddress.value"></md-input>
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
      }
    },
    mounted () {
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
