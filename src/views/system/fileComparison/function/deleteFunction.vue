<template>
    <div>
        <div class="intoFile" @dragover.prevent="handleDragOver" @drop.prevent="handleFileDrop">

            <div v-if="!files.length">
                <div class="intoFile_title_1">+</div>
                <div class="intoFile_title_2">请将删除文件从目录拖拽到此</div>
            </div>


            <!-- 文件列表展示 -->
            <el-tooltip :key="tag" v-for="tag in files" :content="tag.father + '/' + tag.label">
                <el-tag closable :disable-transitions="false" type="success" @close="handleClose(tag)">
                    <img src="../../../../assets/UserManagement/文件-excel_file-excel.png" alt=""
                        style="width: 50px; height: 50px; vertical-align: middle; margin-right: 5px;">

                    {{  formatLabel(tag.label) }}

                </el-tag>
            </el-tooltip>

        </div>

        <div class="ctrl_btn">
            <el-button type="primary" :disabled="btnDisabled" @click="deleteFiles">删除</el-button>

            <el-button type="danger" @click="clearFiles" :disabled="btnDisabled">清空</el-button>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            files: [],
            btnDisabled: true,
        }
    },
    activated() {
    },
    watch: {
        files: {
            handler(val) {
                if (val.length) {
                    this.btnDisabled = false;
                } else {
                    this.btnDisabled = true;
                }
            }
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        formatLabel(label) {
            if (label.length > 6) {
                return label.substring(0, 5) + '...'; // 截取前10个字符并添加省略号
            }
            return label; // 如果不超过10个字符，直接返回原文本
        },
        handleDragOver() {

        },
        //处理拖拽并获取文件tag
        handleFileDrop(event) {
            const data = event.dataTransfer.getData('application/json');

            if (data) {
                const file = JSON.parse(data);
                console.log(file);
                if(file.father ==='公共库') {
                    this.$message.error('不能删除公共库文件');
                }else if(this.files.some(item => item.id === file.id)){
                    this.$message.error('不能重复选择文件');
                }else {
                    this.files.push(file);
                }
                

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
    font-size: 14px;
    /* 添加元素时候左侧排列 */
    float: left;
    margin: 15px 40px 15px 0;
    width: 100px;

}

::v-deep .el-tag.el-tag--success {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67c23a;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px;
    flex-direction: column;
}

::v-deep .el-tag.el-tag--success {
    position: relative;
}

::v-deep .el-tag.el-tag--success .el-tag__close {
    position: absolute;
    transform: translate(45%, -45%);
    background-color: #67c23a;
    color: #FFF;
}
</style>
<style>
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
