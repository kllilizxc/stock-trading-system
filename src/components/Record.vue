<template>
  <md-card id="record-card">
    <span class="title md-title md-primary">流水记录</span>
    <md-table>
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
  import $ from 'jquery'

  export default {
    name: 'record',
    username: '',
    data () {
      return {
        fields: [ '交易类型', '买/卖', '数量', '价格', '用户 ID', '股票 ID' ],
        rows: []
      }
    },
    methods: {
      getActionType (action) {
        return action === '0' ? '买'
        : action === '1' ? '卖'
        : '买/卖'
      },

      getTypeType (type) {
        return type === '0' ? '限价申报'
        : type === '1' ? '撤销申报'
        : '转限申报'
      }
    },
    // computed: {
    //   rows () {
    //     let _rows = []
    //     $.get('/records/' + this.username, result => {
    //       if (result.code === 1) {
    //         let records = result.result

    //         if (!records) {
    //           return
    //         }
    //         for (let i = 0; i < records.length; i++) {
    //           let _row = []

    //           for (let field in records[i]) {
    //             _row.push(records[i][field])
    //           }
    //           _rows.push(_row)
    //           console.log(_rows)
    //           return _rows
    //         }
    //       } else {
    //         alert('Fail to load records from server! reason: ' + result.err)
    //         return []
    //       }
    //     })
    //   }
    // },
    mounted () {
      $.get('/userInfo', result => {
        if (result.code) {
          let info = result.result[0]
          console.log(info)
          this.username = info.usrname
        } else {
          alert('Please login first!')
          this.$router.push({ name: 'SignIn' })
        }
      })
    },
    created () {
      $.get('/records/' + this.username, result => {
        if (result.code === 1) {
          let records = result.result

          if (!records) {
            return
          }
          for (let i = 0; i < records.length; i++) {
            let record = records[i];
            this.rows.push([
              this.getTypeType(record.type), this.getActionType(record.action), record.count, record.price, record.userId, record.stockId
            ])
          }
        } else {
          alert('Fail to load records from server! reason: ' + result.err)
        }
      })
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
