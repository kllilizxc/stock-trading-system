<template>
	<md-card id="signin-card">
	<form id="signin-form" novalidate @submit.stop.prevent="">
		<span id="headline" class="md-headline">登陆</span>
		<md-input-container>
			<label>用户名</label>
			<md-input required></md-input>
		</md-input-container>
		<md-input-container>
			<label>密码</label>
			<md-input required></md-input>
		</md-input-container>
		<md-button class="md-raised md-primary">登陆</md-button>
	</form>
</md-card>
</template>

<script>
	export default {
	}
</script>

<style scoped>
	#signin-card {
		width: 50%;
		min-width: 280px;
		margin: auto;
		padding: 32px;
		margin-top: 32px;
	}
	#signin-form {
	}
	#headline {
		margin-bottom: 16px;
	}
</style>
