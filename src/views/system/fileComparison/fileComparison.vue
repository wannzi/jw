<template>
	<div class="fileComparison">
		<div class="fileComparison_left">
			<span class="left_head">
				<img src="../../../assets/UserManagement/汉堡图标_hamburger.png" alt="">
				<div>文件目录</div>
			</span>

			<!-- 文件树 -->
			<el-tree :data="fileData" node-key="label" :highlight-current="false" :render-content="renderContent"
				:allow-drop="() => false" :allow-drag="allowDrag" draggable @node-drag-start="handleDragStart">
			</el-tree>
		</div>

		<div class="fileComparison_right">
			<el-tabs @tab-click="handleClick" class="right_head">
				<el-tab-pane label="导入" name="upload">
					<span slot="label">
						<img src="../../../assets/UserManagement/传入(白)_afferent.png" alt="" v-if="uploadImg">
						<img src="../../../assets/UserManagement/传入(绿)_afferent.png" v-else>
						<el-dropdown :class="{ 'change_color': !uploadImg }" @command="handleCommand" trigger="click">
							<div>
								导入
								<i class="el-icon-arrow-down"></i>
							</div>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="online">导入在线文件</el-dropdown-item>
								<el-dropdown-item command="local">导入本地文件</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</span>
				</el-tab-pane>

				<el-tab-pane label="导出" name="export">
					<span slot="label"> <img src="../../../assets/UserManagement/传入(白)_afferent.png" v-if="exportImg"
							style="transform: scaleX(-1);">
						<img src="../../../assets/UserManagement/传入(绿)_afferent.png" style="transform: scaleX(-1);"
							v-else>
						导出</span>
				</el-tab-pane>

				<el-tab-pane label="保存" name="save" :disabled="!isSave">保存
					<span slot="label">
						<img src="../../../assets/UserManagement/保存(灰)_save.png" alt="" v-if="!isSave">
						<img src="../../../assets/UserManagement/保存_save.png" alt="" v-else-if="isSave && !saveVisible">
						<img src="../../../assets/UserManagement/保存(绿)_save.png" alt="" v-else>
						保存
					</span>
				</el-tab-pane>


				<el-tab-pane label="删除" name="delete">
					<span slot="label"><img src="../../../assets/UserManagement/删除_delete.png" alt="" v-if="deleteImg">
						<img src="../../../assets/UserManagement/删除(绿)_delete.png" v-else>
						删除</span>
				</el-tab-pane>

				<el-tab-pane label="检索" name="search">
					<span slot="label"><img src="../../../assets/UserManagement/查找_find.png" alt="" v-if="searchImg">
						<img src="../../../assets/UserManagement/查找(绿)_find.png" v-else>
						检索</span>
				</el-tab-pane>

				<el-tab-pane label="比对" name="compare">
					<span slot="label" class="last_icon"><img src="../../../assets/UserManagement/对比_contrast.png"
							v-if="compareImg">
						<img src="../../../assets/UserManagement/对比(绿)_contrast.png" v-else>
						比对</span>
				</el-tab-pane>
			</el-tabs>

			<div class="right_title" v-if="this.$route.path === '/fileComparison' && !fileContent">
				<div>查看: 双击打开左侧文件树中的文件</div>
				<div>导入: 将本地或在线文件导入到私有库</div>
				<div>导出: 将单个文件导出到本地</div>
				<div>保存: 修改文件后保存</div>
				<div>删除: 将私有库或结果库文件删除</div>
				<div>检索: 在单个文件中检索内容</div>
				<div>对比: 将多个文件进行内容比对</div>
			</div>

			<!-- 弹窗 -->
			<!-- <el-dialog title="上传文件" :visible.sync="uploadFilesVisible" width="30%">
				<el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple :before-upload="beforeUpload">
					<i class="el-icon-upload"></i>
					<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-dialog> -->

			<!-- 上传文件弹窗 -->
			<el-dialog :visible.sync="uploadVisible" title="上传文件" :modal-append-to-body="false" width="40%">
				<el-upload  :file-list="fileList"
					style="border: 1px solid lightgrey; padding: 30px; margin-top: -10px;">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">请上传excel文件或数据库文件</div>
				</el-upload>

				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="uploadVisible = false">关 闭</el-button>
				</div>
			</el-dialog>

			<!-- 导入在线文件弹窗 -->
			<el-dialog :visible.sync="onlineVisible" title="请勾选要导入的在线文件" :modal-append-to-body="false" width="50%">
				<el-checkbox-group v-model="selectedOnlineFiles"
					style="list-style:none; margin-top:-10px; overflow:auto; border:1px solid lightgrey; padding:10px 0 0 10px; text-align:left;">
					<el-checkbox v-for="(item) in onlineFiles" :key="item.id" :label="item.id"
						style="height:30px; width:22%; margin:0 19px 15px 0; float:left;">
						<i class="el-icon-document"></i>
						{{ item.name }}
					</el-checkbox>
				</el-checkbox-group>

				<div slot="footer" class="dialog-footer">
					<el-button @click="onlineVisible = false">取 消</el-button>
					<el-button type="primary" @click="importOnlineFiles()">导 入</el-button>
				</div>
			</el-dialog>


			<div class="box" v-if="fileContent && this.$route.path === '/fileComparison'">
				<!-- <div> -->
				<SpreadSheet @data-changed="handleDataChanged" :exceldata="yourExcelData" :mergecell="yourMergeCells"
					:readOnly="false"  />
				<!-- </div> -->
			</div>

			<!-- 保存弹窗 -->
			<el-dialog :visible.sync="saveVisible" title="文件保存" :modal-append-to-body="false" width="20%">
				<h2>是否需要保存修改</h2>
				<el-button @click="saveFile">保存修改</el-button>
			</el-dialog>

			<router-view class="child_view">
			</router-view>
		</div>
	</div>
</template>
<script>
import SpreadSheet from '../../../components/SpreadSheet.vue';
import {
	getTree,
	openFile,
	saveFile
} from '@/api/fileComparison';
// import * as XLSX from 'xlsx/xlsx.mjs'
import Cookies from 'js-cookie'

export default {
	data() {
		return {
			yourExcelData: [
				['姓名', '年龄', '性别', '手机号'],
				['张三', 20, '男', '13812345678'],
				['李四', 25, '女', '13812345679']
			],
			yourMergeCells: {},
			fileList: [],
			fileData: [
				{
					label: '公共库',
					draggable: false,
					children: [
						{
							id: '1',
							label: '文件一',
							draggable: true,
							father: '公共库'
						},
						{
							id: '2',
							label: '市公安局所属信息文件',
							draggable: true,
							father: '公共库'
						}
					]
				},
				{
					label: '私有库',
					draggable: false,
					children: [
						{
							id: '3',
							label: '文件一',
							draggable: true,
							father: '私有库'
						},
						{
							id: '4',
							label: '公务人员信息文件',
							draggable: true,
							father: '私有库'
						}
					]
				},
				{
					label: '结果库',
					draggable: false,
					children: [
						{
							id: '5',
							label: '文件一',
							draggable: true,
							father: '结果库'
						},
						{
							id: '6',
							label: '文件二',
							draggable: true,
							father: '结果库',
							children: [{
								label: 'sheet1',
								draggable: false,
								father: '文件二',
							}]
						},
						{
							id: '7',
							label: '文件二',
							draggable: true,
							father: '结果库',
							children: [{
								label: 'sheet1',
								draggable: false,
								father: '文件二',
							}]
						},
					]
				}
			],
			publicListIsShow: false,
			privateListIsShow: false,
			resultsListIsShow: false,
			saveVisible: false,
			isSave: false,
			saveStatic: false,
			fileContent: '1',
			files: [], // 用于存储文件内容
			changeData: [], // 用于存储修改的数据
			uploadVisible: false,
			onlineVisible: false,
			selectedFiles: [], // 用于存储选中的文件信息
			onlineFiles: [{
				id: "1",
				name: "党员信息文件"
			},
			{
				id: "2",
				name: "公务人员信息文件"
			},
			{
				id: "3",
				name: "公务人员信息文件"
			},
			{
				id: "4",
				name: "公务人员信息文件"
			},
			{
				id: "5",
				name: "公务人员信息文件4"
			},
			{
				id: "6",
				name: "公务人员信息文件5"
			}
			],
			selectedOnlineFiles: [],
			//标签状态
			uploadImg: true,
			exportImg: true,
			deleteImg: true,
			searchImg: true,
			compareImg: true,
		}
	},

	activated() { },
	watch: {
		yourExcelData: {
			handler(newVal) {
				this.$nextTick(() => {
					if (this.$refs.spreadSheet) {
						this.$refs.spreadSheet.reloadData(newVal); // SpreadSheet 组件有一个 reloadData 方法
					}
				});
			},
			deep: true
		}
	},
	components: {
		SpreadSheet
	},
	created() {
		//文件树
		this.getTree();
	},
	mounted() { },
	methods: {
		calculateColumnWidth(colIndex) {
			// 根据内容长度动态计算表格列宽度
			const maxWidth = 400; // 最大宽度
			const cellContent = this.files.map(item => item[colIndex]);
			const contentLengths = cellContent.map(item => String(item).length * 15); // 15px 占一个字符的宽度
			const maxContentLength = Math.max(...contentLengths);
			return maxContentLength < maxWidth ? maxContentLength + 'px' : maxWidth + 'px';
		},
		//蠢但是好用
		handleClick(tab) {

			if (tab.name === 'upload') {
				// this.showUpLoadView();
				this.uploadImg = false;
				this.exportImg = true;
				this.deleteImg = true;
				this.searchImg = true;
				this.compareImg = true;
				this.isSave = false;
			} else if (tab.name === 'export') {
				this.$router.push({
					name: 'ExportFunction'
				});
				this.exportImg = false;
				this.uploadImg = true;
				this.deleteImg = true;
				this.searchImg = true;
				this.compareImg = true;
				this.isSave = false;
			} else if (tab.name === 'delete') {
				this.$router.push({
					name: 'DeleteFunction'
				});
				this.deleteImg = false;
				this.uploadImg = true;
				this.exportImg = true;
				this.searchImg = true;
				this.compareImg = true;
				this.isSave = false;
			} else if (tab.name === 'search') {
				this.$router.push({
					name: 'SearchFunction'
				});
				this.searchImg = false;
				this.uploadImg = true;
				this.exportImg = true;
				this.deleteImg = true;
				this.compareImg = true;
				this.isSave = false;
			} else if (tab.name === 'compare') {
				this.$router.push({
					name: 'CompareFunction'
				});
				this.compareImg = false;
				this.uploadImg = true;
				this.exportImg = true;
				this.deleteImg = true;
				this.searchImg = true;
				this.isSave = false;
			} else {
				this.uploadImg = true;
				this.exportImg = true;
				this.deleteImg = true;
				this.searchImg = true;
				this.compareImg = true;
				this.isSave = true;
				this.saveVisible = true;
			}
		},
		//下拉
		handleCommand(command) {
			if (command === 'online') {
				this.onlineVisible = true;
			} else if (command === 'local') {
				this.showUpLoadView();
			}
		},



		// 展示上传页面
		showUpLoadView() {
			this.uploadVisible = true;
		},

		//测试上传，测试文件导入问题
		// beforeUpload(file) {
		// 	const fileReader = new FileReader();
		// 	fileReader.onload = (e) => {
		// 		const data = new Uint8Array(e.target.result);
		// 		const workbook = XLSX.read(data, { type: 'array' });

		// 		const fileInfo = {
		// 			label: file.name,
		// 			draggable: true,
		// 			father: '私有库'
		// 		};

		// 		const sheets = [];
		// 		workbook.SheetNames.forEach(sheetName => {
		// 			const worksheet = workbook.Sheets[sheetName];
		// 			const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

		// 			sheets.push({
		// 				label: sheetName,
		// 				draggable: false,
		// 				father: file.name,
		// 				content: json // 存储 sheet 的内容
		// 			});
		// 		});

		// 		fileInfo.children = sheets;

		// 		// 找到私有库的索引
		// 		const privateLibraryIndex = this.fileData.findIndex(item => item.label === '私有库');
		// 		console.log(privateLibraryIndex);
		// 		if (privateLibraryIndex !== -1) {
		// 			this.fileData[privateLibraryIndex].children.push(fileInfo);
		// 		}

		// 		this.$message({
		// 			type: 'success',
		// 			message: '文件预处理成功!'
		// 		});
		// 	};
		// 	fileReader.readAsArrayBuffer(file);
		// 	return false;
		// },

		// 上传文件
		// uploadFiles() {
		// 	// 这里假设上传成功
		// 	this.fileData[1].children.push(...this.selectedFiles.map(file => ({
		// 		label: file.name,
		// 		path: '',
		// 		file: file,
		// 		draggable: true
		// 	})));
		// 	this.selectedFiles = [];
		// 	this.closePopup(); // 可以选择在上传后关闭弹窗
		// },



		//拖动文件的两个方法
		handleDragStart(node, event) {
			console.log(node, event);
			if (node.data.draggable) { // 拖拽只能是可以拖拽的元素
				event.dataTransfer.setData('application/json', JSON.stringify(node.data));
				event.dataTransfer.effectAllowed = 'move';
			} else {
				event.preventDefault(); // 阻止非叶子节点的拖拽
			}
		},
		handleFileDrop(event) {
			const data = event.dataTransfer.getData('application/json');
			if (data) {
				const file = JSON.parse(data);
				this.files.push(file);
				this.dynamicTags.push(file.label); // 确保这里使用的属性与设置的一致
				console.log('Dropped files:', this.files);
			}
		},
		//返回是否可拖拽
		allowDrag(node) {
			return node.data.draggable;
		},

		// 添加draggable属性
		addDraggableProperty(data) {
			if (Array.isArray(data)) {
				return data.map(item => {
					if (item.label === '公共库' || item.label === '私有库' || item.label === '结果库') {
						item.draggable = false; // 三个大的库不可拖拽
					} else if (item.father && (item.father === '公共库' || item.father === '私有库' || item.father === '结果库')) {
						item.draggable = true; // 库下面的文件可以拖拽
					} else {
						item.draggable = false; // 文件下面的内容不可拖拽
					}
					if (item.children) {
						item.children = this.addDraggableProperty(item.children);
					}
					return item;
				});
			} else if (typeof data === 'object' && data !== null) {
				const newData = {};
				for (const key in data) {
					if (Object.prototype.hasOwnProperty.call(data, key)) {
						newData[key] = this.addDraggableProperty(data[key]);
					}
				}
				return newData;
			} else {
				return data;
			}
		},
		// 移除 __ob__ 属性
		removeObserverProperties(data) {
			if (Array.isArray(data)) {
				return data.map(item => this.removeObserverProperties(item));
			} else if (typeof data === 'object' && data !== null) {
				const newData = {};
				for (const key in data) {
					if (key !== '__ob__' && Object.prototype.hasOwnProperty.call(data, key)) {
						newData[key] = this.removeObserverProperties(data[key]);
					}
				}
				return newData;
			} else {
				return data;
			}
		},

		//渲染图标
		renderContent(h, { node }) {
			// 决定使用哪个图标
			const iconName = node.childNodes.length != 0 ? 'el-icon-folder-opened' : 'el-icon-document';
			// 渲染内容时，对二级节点添加tooltip
			if (node.childNodes.length === 0) {
				return (
					<div style="display: flex; align-items: center;"
						onDblclick={
							() => this.handleDoubelclick(node)
						} >
						<el-icon class={iconName} style="margin-right: 10px;" > </el-icon>
						<el-tooltip class="item" content={node.label} placement="top-start" effect="dark">
							<span> {node.label} </span>
						</el-tooltip>
					</div>
				);
			} else {
				return (
					<div style="display: flex; align-items: center;" >
						<el-icon class={iconName} style="margin-right: 10px;"></el-icon>
						<span> {node.label} </span> </div>
				)
			}
		},

		//双击预览(测试使用的方法)
		handleDoubelclick(node) {
			console.log('双击节点信息：', node);
			console.log(node.data.id);
			if (!node.data) {
				this.$message.error('文件内容未找到！');
				return;
			}

			// this.$message.success('正在打开文件...');
			this.openFile(node.data.id);
			// this.$router.push({
			// 	path: '/fileComparison',
			// 	query: {
			// 		fileId: node.data.father,
			// 		filename: node.data.label
			// 	}
			// });



			// if (node.data.father.endsWith('.xlsx') || node.data.father.endsWith('.xls')) {
			// 	this.$message.success('正在打开文件...');
			// 	this.$router.push({
			// 		path: '/fileComparison',
			// 		query: {
			// 			fileId: node.data.father,
			// 			filename: node.data.label
			// 		}
			// 	});

			// 	// 直接从 fileData 中获取 sheet 的内容
			// 	const sheetContent = this.fileData.find(item => item.label === '私有库')
			// 		.children.find(file => file.label === node.data.father)
			// 		.children.find(sheet => sheet.label === node.data.label)
			// 		.content;

			// 	// 更新 yourExcelData
			// 	this.yourExcelData = sheetContent;
			// 	this.files = sheetContent.map((row) => {
			// 		return row.reduce((acc, curr, idx) => {
			// 			acc[`column${idx}`] = curr;
			// 			return acc;
			// 		}, {});
			// 	});
			// 	this.fileContent = true;


			// } else {
			// 	this.$message.error('请选择一个Excel文件！');
			// }
		},
		//数据改变的时候监听
		handleDataChanged(data) {
			this.isSave = true;
			this.saveStatic = true;
			// this.changeStatus();
			//用于接口使用
			this.changeData = data;

		},
		// changeStatus() {
		// 	if (this.saveStatic) {
		// 		this.$route.meta.requiresConfirm = true; // 设置标志
		// 		console.log(this.$route.meta.requiresConfirm);
		// 	}else {
		// 		this.$route.meta.requiresConfirm = false; // 清除标志
		// 		console.log(this.$route.meta.requiresConfirm);
		// 	}
		// },

		//打开文件接口
		async openFile(fileId) {
			const userInfo = Cookies.get('userInfo');
			console.log(userInfo, fileId);
			const res = await openFile(Number(userInfo), Number(fileId));
			console.log(res);
			if (res) {
				this.$message.success('文件打开成功！');
				this.$router.push({ path: '/fileComparison', query: { fileId: fileId } })
				console.log(this.yourExcelData);
				console.log(res.data.data.excelData);
				this.yourExcelData = res.data.data.excelData;
				console.log(this.yourExcelData);
			} else {
				this.$message.error('文件打开失败！');
			}

		},
		// 保存接口
		async saveFile() {
			//改变的数据
			console.log(this.changeData);

			if (this.changeData.length > 0) {
				this.$message({
					type: 'success',
					message: '文件保存成功!'
				});
				this.isSave = false;
			} else {
				// this.$message.error('文件保存失败！');
			}
			this.saveVisible = false;
			this.saveStatic = false;
			this.changeStatus();
			const res = await saveFile(this.changeData);
			console.log(res);
		},
		// 获取文件树
		async getTree() {
			const res = await getTree();
			console.log(res);
			this.fileData = res.data.data;
			if (Array.isArray(res.data.data)) {
				const processedData = this.addDraggableProperty(res.data.data);
				this.fileData = this.removeObserverProperties(processedData);
				console.log(this.fileData);
			} else {
				console.error('接口返回的数据不是数组:', res);
			}

		},

	},
	
	

}
</script>



<style>
.el-table .cell {
	line-height: none;
}
</style>

<style>
.fileComparison {
	padding-top: 9vh;
	padding-left: 1vw;
	display: flex;
	flex-direction: row;
	height: 89vh;
}

.fileComparison_left {
	position: relative;
	width: 17vw;
	height: 100%;
}

.fileComparison_left::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	/* 遮罩层宽度与左侧导航相同 */
	height: 100%;
	/* 遮罩层高度与左侧导航相同 */
	background-color: rgba(64, 149, 229, 0.2);
	/* 半透明黑色背景 */
	z-index: 1;
	/* 确保遮罩层在左侧导航内容之上 */
	pointer-events: none;
}

.fileComparison_right {
	position: relative;
	width: 80vw;
	height: 100%;
	margin-left: 1vw;
}

.fileComparison_right::before {
	content: "";
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	/* 遮罩层宽度与左侧导航相同 */
	height: 100%;
	/* 遮罩层高度与左侧导航相同 */
	background-color: rgba(64, 149, 229, 0.2);
	/* 半透明黑色背景 */
	z-index: 1;
	/* 确保遮罩层在左侧导航内容之上 */
	pointer-events: none;
}
</style>

<!-- 树组件样式 -->
<style scoped>
.el-tree>>>.el-tree-node__content:hover {
	background-color: #2969a9;
}

.el-tree>>>.el-tree-node:focus>.el-tree-node__content {
	background-color: transparent;
}

.el-tree {
	color: white;
	background-color: transparent;
	font-size: 0.9vw;
	padding-left: 5%;
	padding-right: 5%;
}

/* /deep/.el-tree-node__content {
	height: 30px;
} */
v-deep .el-tree-node__content {
	height: 30px;
}

/* /deep/.el-tree-node.is-current>.el-tree-node__content {
	color: #32FFF6;
	font-weight: bold;
} */

v-deep .el-tree-node.is-current>.el-tree-node__content {
	color: #32FFF6;
	font-weight: bold;
}

/* /deep/.el-tree-node__content:hover {
	background-color: #f5f7fa40;
} */

v-deep .el-tree-node__content:hover {
	background-color: #f5f7fa40;
}

.el-tabs {
	height: 20px;
}

/*去下划线 */
::v-deep .el-tabs__nav-wrap::after {
	position: static !important;
}

.el-tabs>>>.el-tabs__content {
	display: none !important;
	pointer-events: none !important;
}

.el-tabs>>>span {
	display: flex;
	align-items: center;
}

.el-tabs>>>.last_icon {
	border-right: none !important;
}

.el-tabs>>>.el-tabs__item {
	line-height: 0;
	height: 0px;
	color: white;
}

.el-tabs>>>.el-tabs__item.is-disabled {
	color: #7691af;
}

.el-tabs>>>.el-tabs__item.is-active {
	color: #7af0f3;
}

/* 隐藏选中标签下方的指示条 */
.el-tabs>>>.el-tabs__active-bar {
	height: 0;
}
</style>

<style scoped>
::v-deep .jexcel {
	width: 100%;
	font-size: 12px;
	overflow: auto;
}

.box {
	margin: 0 auto;
	overflow-x: auto;
	overflow-y: auto;
}

.el-dropdown {
	color: white;
}

.change_color {
	color: #7af0f3;
}
</style>

<style>
.left_head {
	font-size: 1.6vw;
	color: #32FFF6;
	font-family: youshe;
	/* //font-weight: bold;
   //font-style: italic; */
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 1vw;
	margin-bottom: 1vw;
}

.left_head img {
	width: 2vw;
	height: 2vw;
	margin-right: 0.7vw;
}
</style>

<style>
.right_title {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	position: absolute;
	line-height: 40px;
	opacity: 0.7;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.right_title div {
	font-size: 1.4vw;
	color: #8498ae;
	margin-top: 0.7vw;
	margin-bottom: 0.7vw;
}

.right_head {
	display: flex;
	color: #efefef;
	/* height: 4vh; */
	padding: 0.7vw;
	font-size: 1vw;
	background-color: rgba(64, 149, 229, 0.2);
	box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
	cursor: pointer;
	/* 设置鼠标悬停时的光标为手指指针 */
}

.right_head img {
	width: 1.2vw;
	height: 1.2vw;
	margin-right: 0.5vw;
}
</style>

<style>
.child_view {
	margin-top: 2vw;
	margin-left: 2vw;
}
</style>
