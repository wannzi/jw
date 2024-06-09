<template>
    <div>
        <div class="intoFile" @dragover.prevent="handleDragOver" @drop.prevent="handleFileDrop">
            <div v-if="!files.length">
                <div class="intoFile_title_1">+</div>
                <div class="intoFile_title_2">请将导出文件从目录拖拽到此</div>
            </div>

            <!-- 文件列表展示 -->
            <ul class="file-list" v-if="files.length">
                <li v-for="(file, index) in files" :key="index" class="file-item">
                    {{ file.name }}
                    <span class="delete-btn" @click="removeFile(index)">×</span>
                </li>
            </ul>
        </div>

        <div class="ctrl_btn">
            <el-button type="primary" @click="exportFiles">导出</el-button>
            <el-button type="danger" @click="clearFiles">清空</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            files: [{name:"wenjian1"}],//存放拖拽的文件
        }
    },
    activated() {
    },
    watch: {
    },
    created() {
    },
    mounted() {
    },
    methods: {
        handleDragOver(event) {
            event.dataTransfer.dropEffect = 'copy';  // 显示复制效果
        },

        handleFileDrop(event) {
            event.preventDefault();
            const data = event.dataTransfer.getData('application/json');
            const item = JSON.parse(data);
            this.files.push(item); // 假设处理的是文件列表
            console.log(this.files); // 查看更新后的文件数组
        },
        exportFiles() {
            // 实现文件的导出逻辑
        },
        clearFiles() {
            this.files = [];
        },
        removeFile(index) {
            this.files.splice(index, 1); // 移除指定索引的文件
        }
    }
}
</script>
<style>
.intoFile {
    width: 79vw;
    height: 36vh;
    border: 3px dashed #6f86a0;
    position: relative;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    /* 超过高度时显示滚动条 */
    overflow-y: auto;
}

.file-list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    margin: 0;    
}

.file-item {
	width: 100px;
	height: 20px;
    background-color: #f0f8ff80;
	color: white;
    margin: 4px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    position: relative;
}

.delete-btn {
    position: absolute;
    top: -10px;
    right: -10px;
    cursor: pointer;
    background-color: #ff6666;
    /* 红色背景 */
    color: white;
    font-weight: bold;
    border-radius: 50%;
    /* 右上角圆角 */
    padding: 2px 6px;
}

.intoFile_title_1 {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4vw;
    color: #4e749e;
}



.intoFile_title_2 {
    position: absolute;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2vw;
    color: #4e749e;
}
</style>

<style>
.ctrl_btn {
    position: absolute;
    right: 1.8vw;
}


.ctrl_btn button {
    font-size: 1vw;
    font-weight: bold;
	margin-top: 5vh;
}

</style>
