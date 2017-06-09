<template>
  <md-card id="search-card">
    <span class="title md-title md-primary">股票信息</span>
    <md-table v-once>
      <md-table-header>
        <md-table-row>
          <md-table-head v-for="field in fields">{{ field }}</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="row in rows">
          <md-table-cell v-for="col in row">{{ col }}</md-table-cell>
          <md-button class="md-raised md-primary">交易</md-button>
        </md-table-row>
      </md-table-body>
    </md-table>
  </md-card>
</template>
<script>
  export default {
    name: 'search',
    data () {
      return {
        fields: [ '代码', '名称', '涨跌额', '涨跌幅', '现价', '今日成交', '换手', '流通', '买价', '卖价', '最高', '最低' ],
        rows: [
        [ '000001', '平安银行', '5.43', '0.69', '13.39↑', '0', '-', '40236393', '-', '-', '13.47', '12.63' ],
        [ '600001', '中国石油', '2.10', '10.00%', '23.10↑', '100', '-', '40236393', '-', '-', '23.10', '22.58' ]
        ]
      }
    }
  }
</script>
</script>
<style scoped>
  .title {
    margin-bottom: 16px;
  }
  #search-card {
    padding: 32px;
    max-width: 1300px;
    width: 100%;
    margin: auto;
  }
</style>
