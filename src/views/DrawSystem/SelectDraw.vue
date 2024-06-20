<template>
	<div class='app'>
		<div class="head">
			<div class="title">
				大数据业务研判中心
			</div>
		</div>

		<div class="zhisou">
			<img src="../../assets/UserManagement/zhisou.png">
			<span>精准画像</span>
		</div>

		<div class="SelectDraw">
			<div style="display: flex; flex-direction: row; margin-top: 1vh;">
				<el-input :placeholder="placeholder" v-model="keyWord" class="input-with-select" >
					<el-select v-model="select" slot="prepend" placeholder="请选择" style="width: 7vw"   @change="updatePlaceholder">
						<el-option label="个人" value="1"></el-option>
						<el-option label="单位" value="2"></el-option>
					</el-select>
					<el-button slot="append" icon="el-icon-search" style="background-color: #32FFF6;color: #2c3e50" @click="search">搜索</el-button>
				</el-input>
			</div>			
		</div>
	</div>
</template>

<script>
import { getData } from "../../api/SelectDraw/index"; // 导入接口函数
	export default {
		name: 'SelectDraw',
		data() {
			return {
				placeholder: "请输入人员姓名和身份证号",
				keyWord: "",
				select: {
					value: ""
				}

			}
		}
		, watch: {
			select(newVal) {
				if (newVal === "1") {
					this.placeholder = "请输入人员姓名和身份证号";
				} else if (newVal === "2") {
					this.placeholder = "请输入单位名称或统一社会信用代码";
				}
			}
		},
		methods: {
			updatePlaceholder() {
				if (this.select === "1") {
					this.placeholder = "请输入人员姓名和身份证号";
				} else if (this.select === "2") {
					this.placeholder = "请输入单位名称或统一社会信用代码";
				}
			},
			search() {
				// 调用接口函数发送请求
				const type = this.select.value;
				const keyWord = this.keyword;
				getData(type,keyWord).then((response) => {
							// 处理返回的数据
							console.log(response.data);
							if (this.select === "1") {
								this.$router.push("/PeopleResult");
							} else if (this.select === "2") {
								this.$router.push("/WorkResult");
							}
						})
						.catch((error) => {
							// 处理请求错误
							console.error(error);
						});
			},
		},

	}
</script>

<style>
	.app {
		background-image: url('../../assets/UserManagement/background.png');
		/*display: flex;*/
		position: fixed;
		height: 100vh;
		width: 100vw;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		z-index: 0;

	}

	button {
		border-radius: 4px;
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

	.head .title {
		font-family: youshe;
	}

	.el-input__inner {
		background-color: transparent !important;
	}

	.el-select {
		background: none;
		background-color: transparent !important;

	}

	.left-nav button {
		width: 7vw;
		height: 4.3vh;
		margin-bottom: 39px;
		color: #b4fdff;
		background-color: #075a9a;
		border: 1px;
		display: block;
		margin-left: 15%;
	}

	.zhisou {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		margin-top: 20vh;
	}

	.zhisou>img {
		width: 180px;
		height: 180px;
	}

	.zhisou>span {
		color: #32fff6;
		font-size: 2.5vw;
		margin-top: 5vh;
		margin-left: 1vw;
		font-family: youshe;
		font-size: 64px;
		//font-weight: 900;
		//font-style: italic;
		/*background-color: red;*/

	}

	.SelectDraw {
		flex-direction: column;
		width: 50vw;
		height: 50vh;
		/*background-color: #32fff6;*/
		margin-top: 10px;
		margin-left: 25vw;
		display: flex;
		/*justify-content: center;*/
		align-items: center;
	}

	.input-with-select {
		width: 30vw;
		border-color: #32fff6;
		border-radius: 4px;
		/*margin-top: 0px;*/
	}
</style>

<style>
	.container {
		display: flex;
		align-items: center;
		border-color: #32fff6;
	}

	.container select,
	.container input,
	.container button {
		margin: 0;
		padding: 0;
		border-color: #5cbee0;
		background: none;
		outline: none;
		height: 40px;
	}

	.container select {
		flex: 0.1;
		border-radius: 5px 0 0 5px;
		color: white;
	}

	.container input {
		flex: 0.8;
	}

	.container button {
		flex: 0.2;
	}

	.input-with-select {
		width: 620px;
	}

	.input-with-select .el-input__inner {
		height: 50px;
		border: 2px solid #32FFF6;
		color: white;
		font-size: 16px;
	}

	.input-with-select .el-input-group__prepend {
		width: 45px;
		background-color: transparent;
		border: 2px solid #32FFF6;
	}
	
	.input-with-select .el-input-group__append{
		border: 2px solid #32FFF6;
		margin-left: 20px;
	}

	.input-with-select .el-input-group__append .el-button{
		font-size: 20px;
		height: 50px;
		}

</style>
