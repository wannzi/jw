<template>
	<div class="app">
		<div class="head">
			<div class="title">
				{{title}}
			</div>
			
			<!-- 右侧用户 -->
			<div class="right-user">
				<div>
					<img src="../../assets/UserManagement/我的_me.png" alt="">
				</div>
				<el-dropdown @command="handleCommand" trigger="click">
					<span style="cursor: pointer; color: #32FFF6">
						{{ name }}
						<i class="el-icon-arrow-down"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="editUserInfo">修改资料</el-dropdown-item>
						<el-dropdown-item command="updatePwd">修改密码</el-dropdown-item>
						<el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>	
		
		
		<div class="childView">
			<router-view></router-view>
		</div>		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title:"大数据业务研判中心",
				name: "admin",
				editUserInfoVisible:false
			}
		},
		activated() {},
		watch: {},
		created() {},
		mounted() {},
		methods: {}
	}
</script>
<style>
	#app {
		background-image: url('../../assets/UserManagement/background.png');
		height: 100vh;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		z-index: 0;
		overflow: hidden;
	}

	.head {
		position: fixed;
		background-image: url('../../assets/UserManagement/head.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		height: 50px;
		width: 100%;
		color: #32FFF6;
		z-index: 10;

		padding-top: 8px;
		font-size: 2vw;
		/* 默认字体大小 */
	}

	.right-user {
		position: fixed;
		top: 12px;
		right: 10px;
		display: flex;
		align-items: center;
		font-size: 14px;
		/* overflow: hidden; */
	}

	.right-user .operate img {
		width: 1vw;
		height: 1vw;
		margin-top: 5px;
	}

	.right-user img {
		width: 2vw;
		height: 2vw;
		margin-right: 0.6vw;
	}

	.head .title {
		//padding-top: 5px; //font-weight: bold; //font-style: italic; font-family: youshe;
	}
</style>
