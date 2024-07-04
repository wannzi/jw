<template>
    <div>
        <el-main>
            <div class="compare_tag" v-for="(item, index) in FileList" :key="index">
                <div>
                    {{ item.name }}
                </div>
                <div class="compare_tag_box">
                    <el-tag v-for="(tag, index) in tags" :key="index" draggable="true"
                        @dragstart.native="handleDragStart(tag)" >
                        {{ tag.name }}
                    </el-tag>
                </div>
            </div>



        </el-main>
        <el-footer>

            <div class="intoFile" @dragover.prevent @drop.prevent="handleDrop">
                <div v-if="droppedTags.length === 0">
                    <div class="intoFile_title_2">请把保留到结果文件的字段按顺序拖拽至此</div>
                </div>
                <div v-for="(droppedTag, droppedIndex) in droppedTags" :key="droppedIndex">
                    <el-tag :key="droppedIndex" closable @close="handleClose(droppedIndex)" :disable-transitions="false">{{ droppedTag.name }}</el-tag>
                </div>
            </div>
            <el-button type="primary">正向对比</el-button>
            <el-button type="warning">反向对比</el-button>

        </el-footer>
    </div>
</template>

<script>
export default {
    props: {

    },
    components: {

    },
    data() {
        return {
            tags: [
                { name: '姓名', color: '#32FFF6' },
                { name: '测试', color: '#32FFF6' },
                { name: '身份证', color: '#32FFF6' },
                { name: '测试二', color: '#32FFF6' },
            ],
            FileList: [
                { name: '文件一', color: '#32FFF6' },
                { name: '文件二', color: '#32FFF6' },
                { name: '文件三', color: '#32FFF6' },
            ],
            draggedTag: null,
            droppedTags: []

        }
    },
    methods: {
        handleDragStart(tag) {
           
            this.draggedTag = tag;
            console.log('开始拖拽');
        },
        handleDrop() {
            if (this.draggedTag) {
                this.droppedTags.push(this.draggedTag);
                this.draggedTag = null;
                this.$message.success('拖拽成功');
            }else {
                this.$message.error('请先选择一个标签');
            }
        },
        handleClose(index) {
            this.droppedTags.splice(index, 1);
            this.$message.success('标签已关闭');
        }

    }
}
</script>

<style>
.compare_tag {
    color: white;
    text-align: left;
    font-size: 20px;
}

.compare_tag_box {
    border: 2px solid #32FFF6;
    height: 5vh;
    padding: 10px;
    text-align: left;
    margin-bottom: 3vh;
    margin-top: 2vh;
}
</style>

<style scoped>
.el-main {
    height: 45vh;
    margin-bottom: 2vh;
}

.intoFile_title_2 {
    top: 45%;
}

.intoFile {
    height: 20vh;
    margin-bottom: 2vh;
    text-align: left;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
}

.el-tag {
    margin-right: 10px;
}
</style>