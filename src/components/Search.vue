<template>
  <div>
    <md-card v-if="username !== ''" id="fund-card">
      <span class="title md-title md-primary">你好! {{ username }}</span>
      <md-layout :md-gutter="16">
        <md-layout>
          <md-input-container>
            <label>资金总额</label>
            <md-input v-model="totalFund" disabled></md-input>
          </md-input-container>
        </md-layout>
        <md-layout>
          <md-input-container>
            <label>股票总额</label>
            <md-input v-model="totalStock" disabled></md-input>
          </md-input-container>
        </md-layout>
      </md-layout>
    </md-card>
    <br>
    <br>
    <md-card id="search-card">
      <span class="title md-title md-primary">股票信息</span>
      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head v-for="info in infos" :key="info">{{ info }}</md-table-head>
          </md-table-row>
        </md-table-header>
        <md-table-body>
          <md-table-row v-for="row in rows" :key="row[0]">
            <md-table-cell v-for="col in row" :key="col">{{ col }}</md-table-cell>
            <router-link :to="{ path: '/Deal/' + row[0] }">
              <md-button class="md-raised md-primary">交易</md-button>
            </router-link>
          </md-table-row>
        </md-table-body>
      </md-table>
    </md-card>
    <br>
    <br>
    <router-view></router-view>
  </div>
</template>
<script>
  import $ from 'jquery'

  export default {
    name: 'Search',
    data () {
      return {
        totalFund: 0,
        totalStock: 0,
        username: '',
        infos: [ '代码', '名称', '涨跌额', '涨跌幅', '现价', '今日成交', '换手', '流通', '买价', '卖价', '最高', '最低' ],
        rows: [
        [ '000001', '平安银行', '5.43', '0.69', '13.39↑', '0', '-', '40236393', '-', '-', '13.47', '12.63' ],
        [ '600001', '中国石油', '2.10', '10.00%', '23.10↑', '100', '-', '40236393', '-', '-', '23.10', '22.58' ]
        ]
      }
    },
    created () {
      $.get('/userInfo', result => {
        if (result.code) {
          console.log(result.result)
          this.username = result.result.usrname
          this.$router.push({ name: 'Welcome' })
        }
      })
      $.get('/stockInfo', data => {
        if (data.code) {
          console.log(data.result)
          // this.rows.push(data.result) TODDO
        }
      })
    }
  }
</script>
<style scoped>
  .title {
    margin-bottom: 16px;
  }
  #fund-card {
    padding: 32px;
    max-width: 400px;
    width: 100%;
    margin: auto;
  }
  #search-card {
    padding: 32px;
    max-width: 1300px;
    width: 100%;
    margin: auto;
  }
</style>
