<template>
    <div>
        <el-main>
            <div class="compare_tag" v-for="(item, index) in FileList" :key="index">
                <div>
                    {{ item.name }}
                </div>
                <div class="compare_tag_box">
                    <el-tag v-for="(tag, tagIndex) in item.tags" :key="tagIndex" draggable="true"
                        @dragstart.native="handleDragStart(tag)">
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
                    <el-tag :key="droppedIndex" closable @close="handleClose(droppedIndex)"
                        :disable-transitions="false">
                        {{ droppedTag.name }}
                    </el-tag>
                </div>
            </div>
            <el-button type="primary" @click="compare(1)">正向对比</el-button>
            <el-button type="warning" @click="compare(2)">反向对比</el-button>
        </el-footer>
    </div>
</template>

<script>
import { compareFile } from '@/api/fileComparison';

export default {
    props: {},
    components: {},
    created() {
        const fileNameStr = this.$route.params.fileNames;
        const fileName = JSON.parse(fileNameStr);
        // 获取传入的文件长度
        const fileLength = fileName.length;

        console.log(fileLength);
        for (let i = 0; i < fileLength; i++) {
            const file = { name: fileName[i].label, tags: [] };
            for (let j = 0; j < fileName[i].selectedField.length; j++) {
                file.tags.push({ name: fileName[i].selectedField[j], id: fileName[i].id });
            }
            this.FileList.push(file);
        }

        console.log(fileName);
    },
    data() {
        return {
            FileList: [
                // { 
                //     name: '文件1', 
                //     tags: [
                //         { name: '字段1', id: 1 },
                //         { name: '字段2', id: 2 }, 
                //         { name: '字段3', id: 3 }
                //     ] 
                // },
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
                // this.$message.success('拖拽成功');
            } else {
                this.$message.error('请先选择一个标签');
            }
        },
        handleClose(index) {
            this.droppedTags.splice(index, 1);
            // this.$message.success('标签已关闭');
        },
        //对比按钮点击事件
        async compare(type) {
            console.log(this.FileList);
            console.log(this.droppedTags);
            const res = await compareFile(this.FileList, this.droppedTags, type);
            console.log(res);
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
    font-size: 1.9vw;
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
