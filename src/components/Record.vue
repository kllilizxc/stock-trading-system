<template>
  <md-card id="record-card">
    <span class="title md-title md-primary">流水记录</span>
    <md-table v-once>
      <md-table-header>
        <md-table-row>
          <md-table-head v-for="field in fields">{{ field }}</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="row in rows">
          <md-table-cell v-for="col in row">{{ col }}</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </md-card>
</template>

<script>
  export default {
    name: 'record',
    data () {
      return {
        fields: [ '交易类型', '买/卖', '数量', '价格', '用户 ID', '股票 ID' ],
        rows: [
        [ '限价申报', '买', 1000, 100, 3213, 213432 ],
        [ '限价申报', '买', 1000, 100, 3213, 213432 ],
        [ '限价申报', '买', 1000, 100, 3213, 213432 ],
        [ '限价申报', '买', 1000, 100, 3213, 213432 ],
        [ '限价申报', '买', 1000, 100, 3213, 213432 ],
        [ '限价申报', '买', 1000, 100, 3213, 213432 ],
        [ '限价申报', '买', 1000, 100, 3213, 213432 ]
        ]
      }
    }
  }
</script>

<style scoped>
  .title {
    margin-bottom: 16px;
  }
  #record-card {
    padding: 32px;
    max-width: 800px;
    width: 100%;
    margin: auto;
  }
</style>
