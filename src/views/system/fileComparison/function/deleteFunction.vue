<template>
    <div>
        <div class="intoFile" @dragover.prevent="handleDragOver" @drop.prevent="handleFileDrop">

            <div v-if="!files.length">
                <div class="intoFile_title_1">+</div>
                <div class="intoFile_title_2">请将删除文件从目录拖拽到此</div>
            </div>


            <!-- 文件列表展示 -->
            <el-tooltip :key="tag" v-for="tag in files" :content="tag.father">
                <el-tag closable :disable-transitions="false" type="success"  @close="handleClose(tag)">
                    {{ tag.label }}

                </el-tag>
            </el-tooltip>

        </div>

        <div class="ctrl_btn">
            <el-button type="primary">删除</el-button>

            <el-button type="danger">清空</el-button>
            
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            files: []
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
        handleDragOver() {

        },
        //处理拖拽并获取文件tag
        handleFileDrop(event) {
            const data = event.dataTransfer.getData('application/json');

            if (data) {
                const file = JSON.parse(data);
                console.log(file);
                this.files.push(file);

                console.log('Dropped files:', this.files);
            }
        },

        handleClose(tag) {
            const index = this.files.indexOf(tag);
            if (index !== -1) {

                this.files.splice(index, 1);
            }
        },
        clearFiles() {
            this.files = [];

        },
        deleteFiles() {
            // 实现文件的导出逻辑
        },
        
        removeFile(index) {
            this.files.splice(index, 1); // 移除指定索引的文件
        }
    }


}
</script>
<style scoped>
.el-tag {
    font-size: 18px;
    /* 添加元素时候左侧排列 */
    float: left;
    margin-top: 10px;
    margin-right: 10px;     

}
</style>
<style>
.intoFile {
    width: 73vw;
    height: 40vh;
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
    background-color: #f0f8ff;
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

}

.ge_btn1 {
    background-color: #409eff;
    color: #ffffff;
    border: none;
    width: 94px;
    height: 37px;
    margin-right: 18px;
    margin-top: 2vw;
}

.ge_btn2 {
    background-color: #f56c6c;
    color: #ffffff;
    border: none;
    width: 94px;
    height: 37px;
    margin-right: 18px;
    margin-top: 2vw;
}
</style>
