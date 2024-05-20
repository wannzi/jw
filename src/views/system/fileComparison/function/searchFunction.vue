<template>
    <div>

        <div class="search_input">
            <input type="text" placeholder="请输入检索关键词">


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
            <ul class="file-list" v-if="files.length">
                <li v-for="(file, index) in files" :key="index" class="file-item">
                    {{ file.name }}
                    <span class="delete-btn" @click="removeFile(index)">×</span>
                </li>
            </ul>

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
        handleDragOver(event) {
            event.dataTransfer.dropEffect = 'copy';  // 显示复制效果
        },


        handleFileDrop(event) {
            event.preventDefault();
            const data = event.dataTransfer.getData('application/json');
            const item = JSON.parse(data);
            this.files.push(item); // 假设处理的是文件列表
            
        },
        deleteFiles() {
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
.intoFile {
    width: 73vw;
    height: 40vh;
    border: 3px dashed #6f86a0;
    position: relative;
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
