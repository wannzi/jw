<template>
	<div class="login-container">
		<div class="login-title"></div>
		<div class="login-form">
			<div class="login-input" style="margin-top: 15%;">
				<div class="icon icon-name"></div>
				<input class="base-input" type="text" placeholder="请输入账号" v-model="username" />
			</div>
			<div class="login-input">
				<div class="icon icon-password"></div>
				<input class="base-input" type="password" placeholder="请输入密码" v-model="password" />
			</div>
			<!-- <input type="password" class="login-input" placeholder="请输入密码" v-model="password" /> -->
			<button class="login-button" @click="login">登入</button>
		</div>
	</div>
</template>

<style scoped>
	.login-container {
		background: url('@/assets/login/bg0.png');
		height: 100vh;
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.login-title {
		background: url('@/assets/login/logintitle.png');
		background-repeat: no-repeat;
		background-position: center;
		background-size: contain;
		width: 700px;
		height: 200px;
		margin-top: 3%;
		margin-bottom: 3%;
		box-sizing: border-box;
	}

	.login-form {
		/* 本图片比例1.94 */
		background: url('@/assets/login/logininput.png');
		background-repeat: no-repeat;
		background-size: contain;
		width: 585px;
		height: 300px;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;

	}

	.login-input {
		background: url('@/assets/login/input01.png');
		background-repeat: no-repeat;
		background-size: contain;
		margin-left: 20%;
		margin-right: 20%;
		height: 15%;
		margin-bottom: 2%;
	}

	.icon {
		height: 50%;
		width: 7%;
		margin: 3%;
		background-size: contain !important;
		background-repeat: no-repeat !important;
		display: inline-block;
		float: left;
	}

	.icon-name {
		background: url('@/assets/login/icon-name.png');
	}

	.icon-password {
		background: url('@/assets/login/icon-password.png');
	}

	.base-input {
		display: inline-block;
		height: 100%;
		background-color: transparent;
		border: none;
		outline: none;
		/* 在将元素display设置为inline-block的时候，元素即同时具有内联元素和块级元素的属性，既排列在同一行又可以设置宽高。
对于内联元素，都具有vertical-align属性，那这里就牵涉到vertical-align的默认对齐方式。 它的默认方式是baseline，基线对齐。基线指内容的下边缘 */
		vertical-align: top;
		float: left;
		width: 280px;
		color: #32FFF6;
		letter-spacing: 1px;
	}


	.login-button {
		background: url('@/assets/login/loginbtn.png');
		background-size: contain;
		background-repeat: no-repeat;
		width: 50%;
		height: 15%;
		margin-top: 3% !important;
		margin: 0 auto;
		border: none;
		color: #FFFFFFA0;
		font-size: 18px;
		font-weight: bold;
		letter-spacing: 4px;
		padding-bottom: 10px;
	}

	.login-button:hover {
		cursor: pointer;
	}

	input::-webkit-input-placeholder {
		color: #32FFF660;
	}
</style>
<script>
	export default {
		data() {
			return {
				username: '',
				password: ''
			};
		},
		methods: {
			login() {
				this.$axios.post("users/login", {
					username: this.username,
					password: this.password
				}).then(res => {
					if (res.data.code == "200") {
						this.$cookie.set("userInfo", JSON.stringify(res.data.data));
						if (res.data.data.auth[0] == 1) {
							this.$router.push("/dashboard/UserManagement")
						} else {
							this.$router.push("/home");
						}
					} else {
						this.$message.error("登录失败，账号或密码错误！")
						this.username = '';
						this.password = '';
					}
				})
			}
		}
	};
</script>
