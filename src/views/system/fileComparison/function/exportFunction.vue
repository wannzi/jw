<template>
    <div>
        <div class="intoFile" @dragover.prevent="handleDragOver" @drop.prevent="handleFileDrop">
            <div v-if="!files.length">
                <div class="intoFile_title_1">+</div>
                <div class="intoFile_title_2">请将导出文件从目录拖拽到此</div>
            </div>


            <!-- 文件列表展示 -->


            <el-tooltip :key="tag" v-for="tag in files" :content="tag.father + '/' + tag.label">
                <el-tag closable :disable-transitions="false" type="success" @close="handleClose(tag)">
                    <img src="../../../../assets/UserManagement/文件-excel_file-excel.png" alt=""
                        style="width: 50px; height: 50px; vertical-align: middle; margin-right: 5px;">

                    {{ formatLabel(tag.label) }}

                </el-tag>
            </el-tooltip>





        </div>

        <div class="ctrl_btn">
            <el-button type="primary" @click="exportFile">导出</el-button>
            <el-button type="danger" @click="clearFiles">清空</el-button>
        </div>
    </div>
</template>
<script>
import { exportFile } from '@/api/fileComparison';

export default {
    data() {
        return {
            files: [

            ],//存放拖拽的文件

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
        formatLabel(label) {
            if (label.length > 10) {
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

        removeFile(index) {
            this.files.splice(index, 1);

        },
        //导出文件接口
        async exportFile() {
            const userId = this.$store.state.user.userId;
            const res = await exportFile(userId, this.files);
            console.log(res);
        }

    }



}
</script>
<style scoped>
.el-tag {
    font-size: 14px;
    /* 添加元素时候左侧排列 */
    float: left;
    margin-top: 10px;
    margin-right: 20px;

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
    margin-top: 2vh;
    right: 3vw;
}
</style>
