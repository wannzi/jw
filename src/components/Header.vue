<template>
	<div class="head">
		<div class="title">
			{{title}}
		</div>
	
		<!-- 右侧用户 -->
		<div class="right-user" v-if="isUser && userInfo">
			<div>
				<img src="../assets/UserManagement/我的_me.png" alt="">
			</div>
			<el-dropdown @command="handleCommand" trigger="click">
				<span style="cursor: pointer; color: #32FFF6">
					{{userInfo.realName}}
					<i class="el-icon-arrow-down"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="editUserInfo" v-if="userInfo.userName != 'admin'">修改资料</el-dropdown-item>
					<el-dropdown-item command="updatePwd">修改密码</el-dropdown-item>
					<el-dropdown-item command="loginOut">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		
		<el-dialog title="编辑资料" :visible.sync="editUserInfoVisible" :lock-scroll="false" width="450px">
			<el-form ref="editForm" :model="editForm" :rules="editRules" size="small">				
				<el-form-item prop="userName" label="账号" :label-width="labelWidth">
					<el-input v-model="editForm.userName" disabled autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="realName" label="姓名" :label-width="labelWidth">
					<el-input v-model="editForm.realName" autocomplete="off"></el-input>
				</el-form-item>					
				<el-form-item prop="dept" label="部门" :label-width="labelWidth">
					<el-select v-model="editForm.dept" style="width: 100%;">
						<el-option
							v-for="item in deptOptions"
							:key="item.deptId"
							:label="item.deptLabel"
							:value="item.deptId">
						</el-option>
					</el-select>					
				</el-form-item>
				<el-form-item prop="duties" label="职务" :label-width="labelWidth">
					<el-input v-model="editForm.duties" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item prop="phone" label="电话" :label-width="labelWidth">
					<el-input v-model="editForm.phone" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editUserInfoVisible = false">取 消</el-button>
				<el-button type="primary" @click="updateUserInfo">确 定</el-button>
			</div>
		</el-dialog>
		
		<el-dialog title="修改密码" :visible.sync="updatePwdVisible" :lock-scroll="false" width="450px">
			<el-form ref="pwdForm" :model="pwdForm" :rules="updateRules" size="small">				
				<el-form-item label="原密码" :label-width="labelWidth" prop="oldPwd">
					<el-input type="password" v-model="pwdForm.oldPwd" autocomplete="off" placehoder="请输入原密码"></el-input>
				</el-form-item>
				<el-form-item label="新密码" :label-width="labelWidth" prop="newPwd">
					<el-input type="password" v-model="pwdForm.newPwd" autocomplete="off" placehoder="请输入新密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" :label-width="labelWidth" prop="confPwd">
					<el-input type="password" v-model="pwdForm.confPwd" autocomplete="off" placehoder="请输入确认密码"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="updatePwdVisible = false">取 消</el-button>
				<el-button type="primary" @click="updataPwd">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		name:'PageHeader',
		data() {
			return {
				title: "大数据业务研判中心",
				deptOptions:[{deptId:"1",deptLabel:"技术部"}],
				editUserInfoVisible:false,
				updatePwdVisible: false,
				labelWidth: "80px",	
				editForm: {userId:undefined,userName:undefined,realName:undefined,dept:"0",duties:undefined,phone:undefined},
				pwdForm: {userId: undefined, oldPwd: undefined, newPwd: undefined, confPwd: undefined},
				editRules:{
					userName: [{required: true}],
					realName: [{required: true, trigger: "blur", message: "请输入您的姓名"}],
				},
				updateRules: {
					oldPwd: [{required: true, trigger: "blur", message: "请输入您的旧密码"}],
					newPwd: [{required: true, trigger: "blur", message: "请输入您的新密码"},
							{required: true, trigger: "blur", min: 6, message: "密码长度不能少于6位"}],
					confPwd: [{required: true, trigger: "blur",	message: "请输入您的确认密码"},
						{validator: (rules, value, callback) => {
								if (value !== this.form.newPwd) callback(new Error('确认密码与新密码不一致'))
								callback()
							}, trigger: 'blur'}]
				}
			}
		},
		props: ["isUser","userInfo"],
		created() {},
		methods:{
			handleCommand(command){
				if(command === "editUserInfo"){
					// this.$emit('editUserInfo',true);
					this.editUserInfoVisible = true;
					this.getUserInfo(this.userInfo.userId);
					this.getDeptList();
				}
				else if(command === "updatePwd")
				{
					// this.$emit('updatePwdShow',true);
					this.updatePwdVisible = true;
				}else if(command === "loginOut")
				{
					this.$cookie.remove("userInfo");
					this.$router.push("/login");
				}
			},
			getUserInfo(id){
				// this.$axios.get(`getMyInfo/${id}`).then(res=>{					
				// 	this.editForm = res.data.data;
				// })
				console.log(id);
				this.editForm = {userId:"1",userName:"111",realName:"张三丰",dept:"1",duties:"主任",phone:"15312345678"}
			},
			getDeptList(){
				this.$axios.get('getDeptList').then(res=>{
					this.deptOptions = [];
					for (var i = 0; i < res.data.data.length; i++) {						
						this.deptOptions.push({
							"deptId": res.data.data[i].deptId,
							"deptLabel": res.data.data[i].deptLabel
						})												
					}					
				}).catch(err=>{
					this.$message.error("请求部门数据失败" + err);					
				})
			},			
			updateUserInfo(){				
				this.$refs.editForm.validate(valid => {
					if(valid){						
						this.$axios.post('updateMyInfo',{userInfo:this.editForm}).then(res=>{
							this.$message.success('修改资料成功');
							this.editUserInfoVisible = false;
							console.log(res);
						}).catch(err => {
							this.$message.error('修改资料失败' + err);
						})
					}					
				})
			},			
			updataPwd(){
				this.$refs.pwdForm.validate(valid => {
					if(valid){
						this.$axios.post('updateMyPwd',{pwdInfo:this.pwdForm}).then(res=>{
							this.$message.success('修改密码成功');
							this.updatePwdVisible = false;
							console.log(res);
						}).catch(err => {
							this.$message.error('修改密码失败' +err);
						})
					}					
				})
			},
		}
	}
</script>

<style scoped>
	.head {
		position: fixed;
		top: 0;
		background-image: url('../assets/UserManagement/head.png');
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
	
	.head .title{
		font-family: youshe;
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
</style>
