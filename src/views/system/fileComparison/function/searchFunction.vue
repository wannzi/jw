<template>
    <div>

        <div class="search_input">
            <input type="text" placeholder="请输入检索关键词" v-model="searchContent">


            <button>
                <img src="@/assets/UserManagement/搜索(黑)_search.png" alt="">
                <span>检索</span>
            </button>


        </div>

        <div class="intoFile" @dragover.prevent="handleDragOver" @drop.prevent="handleFileDrop">

            <div v-if="!files.length">
                <div class="intoFile_title_1">+</div>
                <div class="intoFile_title_2">请将检索文件从目录拖拽到此</div>
            </div>


            <!-- 文件列表展示 -->
            <el-tooltip :key="tag" v-for="tag in files" :content="tag.father + '/' + tag.label">
                <el-tag closable :disable-transitions="false" type="success"  @close="handleClose(tag)">
                    <img src="../../../../assets/UserManagement/文件-excel_file-excel.png" alt="" style="width: 50px; height: 50px; vertical-align: middle; margin-right: 5px;">

                    {{ formatLabel(tag.label) }}

                </el-tag>
            </el-tooltip>

        </div>
    </div>
</template>
<script>
import { queryFile } from '@/api/fileComparison';

export default {
    data() {
        return {
            files: [],
            searchContent: ''
        
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
       
        deleteFiles() {
            // 实现文件的导出逻辑
        },

        removeFile(index) {
            this.files.splice(index, 1); // 移除指定索引的文件
        },
        //检索内容接口
        async queryFile(){
            const res = await queryFile(this.searchContent);
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
.search_input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 40vw;
    height: 6vh;
    border: 2px solid #32fff6;
    border-radius: 15px;
    /* 添加圆角 */
    padding-left: 1vw;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 5vw;
    margin-bottom: 5vw;


}

.search_input img {
    width: 1.5vw;
}


.search_input input {
    width: 85%;
    height: 100%;
    background-color: transparent;
    border: none;
    font-size: 1vw;
    color: azure;
}

.search_input input:focus {
    outline: none;
}

.search_input button {
    width: 15%;
    height: 100%;
    border: none;
    font-size: 1vw;
    background-color: #32fff6;
    border-radius: 0;
    display: flex;
    justify-content: center;
    align-items: center
}
</style>


<style>


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
