<template>
    <div>
        <el-container>
            <el-header>
                <div class="title_2">请选择要比对的字段</div>
                <el-row>
                    <el-button :disabled="addDisabled" type="success" plain @click="addField">增加字段</el-button>
                    <el-button type="danger" plain @click="deleteField">删除字段</el-button>
                </el-row>
            </el-header>




            <el-main>

                <!-- <div class="main_file">
                    <div v-for="(fileName, index) in fileNames" :key="index">{{ fileName.label }}</div>

                </div>
                <div class="field">
                    <div class="compare_file" v-for="(file, index) in fileNames" :key="index">
                        <div class="compare_box" v-for="(item, index) in file.children" :key="index">
                            <div class="compare_file_name">{{ item.label }}</div>
                            <el-select v-for="file2 in fileNames" :key="file2.label" placeholder="请选择字段"></el-select>

                        </div>

                    </div>

                </div> -->

                <div class="field_box">

                    <div class="group" v-for="(file, index) in fileNames" :key="index">
                        <div class="header_name">{{ file.label }}</div>

                        <div class="select_box">

                            <el-select v-for="(item, index) in selectArr" :key="index" placeholder="请选择字段"
                                @focus="showOptions(file.id, file.selectedField)" v-model="file.selectedField[index]">
                                <el-option v-for="item in fieldChange" :key="item.value" :label="item.label"
                                    :value="item.value">

                                </el-option>
                            </el-select>

                        </div>
                    </div>


                </div>

            </el-main>





            <el-footer>
                <el-button type="primary" @click="handleCompare">下一步</el-button>
            </el-footer>
        </el-container>
    </div>
</template>
<script>
import { getFileids } from '@/api/fileComparison';

export default {
    data() {
        return {
            // fileArr: {
            //     mainFile: '',
            // },
            //储存字段，接口传入的字段将放置在这
            fieidArr: [
                {
                    id: "1",
                    label: '文件一',
                    draggable: false,
                    options: [
                        {
                            value: '字段一',
                            label: '字段一'
                        },
                        {
                            value: '字段一',
                            label: '字段一'
                        },
                        {
                            value: '字段一',
                            label: '字段一'
                        },
                    ]
                },
                {
                    id: "2",
                    label: '文件二',
                    draggable: false,
                    options: [
                        { label: '字段一', value: '字段一' },
                        { label: '字段一', value: '字段一' },
                        { label: '字段一', value: '字段一' },

                    ]
                },
                {
                    id: "4",
                    label: '文件二',
                    draggable: false,
                    options: [
                        { label: '字段超级测试仪', value: '字段超级测试仪' },
                        { label: '字段1', value: '字段1' },
                        { label: '字', value: '字' },
                    ]
                },
            ],
            //相同的id展示相同字段，此处用于存储，动态渲染选择器
            fieldChange: [],
            //添加选择器保存，用于添加字段
            selectArr: [''],


            //储存文件，也就是上一个页面拖入的文件
            fileNames: [
                // {
                //     id: 1,
                //     label: '文件一',
                //     draggable: false,

                // },
                // {
                //     id: 2,
                //     label: '文件二',
                //     draggable: false,

                // },
                // {
                //     id: 3,
                //     label: '文件三',
                //     draggable: false,

                // },

            ],
            addDisabled: false,
            deleteDisabled: false,

        }
    },
    activated() {
    },
    watch: {
    },
    created() {
        // this.getFields();
        //接收传入的文件
        const filesMainStr = this.$route.params.filesMain;
        const filesMain = JSON.parse(filesMainStr);
        filesMain.forEach(file => {
            this.fileNames.push({
                id: file.id,
                label: file.label,
                draggable: false,
                // 设置选择长度

                selectedField: [''],
            })
        });
        console.log(this.fileNames);




    },
    mounted() {
    },
    methods: {

        handleCompare() {
            if (!this.fileNames.every(file => file.selectedField.every(field => field))) {
                this.$message.error('请选择字段');
            } else {
                this.$router.push({
                    name: 'CompareFunction3',
                    params: {
                        fileNames: JSON.stringify(this.fileNames),
                    }
                });
            }
        },
        //字段选择
        showOptions(id, selectedField) {
            console.log(id, selectedField);
            let found = false;
            this.fieidArr.forEach(item => {
                if (item.id === id) {
                    this.fieldChange = item.options;
                    console.log(this.fieldChange);
                    found = true;
                }
            });
            if (!found) {
                this.fieldChange = [];
            }
        },

        //增加字段
        addField() {
            //判断最小的字段数量，如果小于数组中最小的字段数量，则不允许增加
            //选择出文件当中最小的options数组
            const minArr = this.fieidArr.map(item => item.options.length).sort((a, b) => a - b)[0];

            if (this.selectArr.length < minArr) {
                this.selectArr.push('');
                this.fileNames.forEach(file => {
                    file.selectedField.push('');
                });

            } else {
                this.$message.error('当前文件最多只能选择' + minArr + '个字段');

            }

        },
        //删除最后一个字段
        deleteField() {
            if (this.selectArr.length > 1) {
                this.selectArr.pop();
                this.fileNames.forEach(file => {
                    file.selectedField.pop();
                });
            } else {
                this.$message.error('当前文件最少需要选择一个字段');
            }

        },
        //获取文件字段
        async getFields() {
            const res = await getFileids();

            console.log(res);
        },


    }


}
</script>
<style>
.title_2 {
    font-size: 1.6vw;
    color: #32FFF6;
}



.header_name {

    height: 20px;
    color: white;
    border-bottom: rgb(170, 162, 162) solid 1px;



}

.field_box {

    display: flex;
    justify-content: center;

}

.group {
    border-top: rgb(170, 162, 162) solid 1px;
    border-bottom: rgb(170, 162, 162) solid 1px;

}

.group div {
    padding-top: 10px;
    padding-bottom: 5px;

}

.illustrate {
    position: absolute;
    top: -90%;
    left: -30%;

    color: white;
}

.illustrate_box {
    position: relative;
}

.select_box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    flex-direction: column;
}
</style>

<style scoped>
.el-button--success.is-plain {
    background-color: transparent;
}

.el-button--danger.is-plain {
    background-color: transparent;
}

.field {
    height: 40vh;
    overflow-y: auto;
}

.el-select {
    padding-left: 10px;
    padding-right: 10px;
}
</style>
