<template>
  <md-card id="deal-card">
    <span class="title md-title md-primary">交易</span>
    <form novalidate id="deal-form">
      <md-input-container>
        <label for="type">交易类型</label>
        <md-select name="type" required>
          <md-option value="0">限价申报</md-option>
          <md-option value="1">撤销申报</md-option>
          <md-option value="2">转限申报</md-option>
        </md-select>
      </md-input-container>
      <md-input-container>
        <label for="action">买/卖</label>
        <md-select name="action" required>
          <md-option value="0">买</md-option>
          <md-option value="1">卖</md-option>
          <md-option value="2">买/卖</md-option>
        </md-select>
      </md-input-container>
      <md-input-container>
        <label for="count">数量</label>
        <md-input type="number" name="count" required></md-input>
      </md-input-container>
      <md-input-container>
        <label for="price">价格</label>
        <md-input type="number" name="price"></md-input>
      </md-input-container>
      <md-input-container>
        <label for="user-id">用户 ID</label>
        <md-input name="user-id" required></md-input>
      </md-input-container>
      <md-input-container>
        <label for="stock-id">股票 ID</label>
        <md-input name="stock-id" required></md-input>
      </md-input-container>
      <md-button class="md-primary md-raised">提交</md-button>
    </form>
  </md-card>
</template>

<script></script>

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
