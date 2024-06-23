<template>
    <div>
        <el-container>
            <el-header>
                <div class="title_2">请选择要比对的字段</div>
                <el-row>
                    <el-button type="success" plain>增加字段</el-button>
                    <el-button type="danger" plain>删除字段</el-button>
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
                        <!-- <div class="illustrate_box">
                            <div class="illustrate" v-if="file.label === '主文件'">字段</div>
                        </div> -->
                        <div class="select_box">
                            <el-select v-model="fileArr.mainFile" placeholder="请选择字段" v-for="fileChild in file.children" :key="fileChild.label">{{ fileChild.label }}</el-select>
                          
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
export default {
    data() {
        return {
            fileArr: {
                mainFile: '',
            },
            fileNames: [
                {
                    label: '主文件',
                    draggable: false,

                    children: [
                        { label: '字段一', draggable: true, father: '公共库' },

                    ]
                },
                {
                    label: '副文件',
                    draggable: false,
                    children: [
                        { label: '字段一', draggable: true, father: '私有库' },
                        { label: '字段二', draggable: true, father: '私有库' },
              
               
                    ]
                },
                {
                    label: '副文件',
                    draggable: false,
                    children: [
                        { label: '字段一', draggable: true, father: '私有库' },
                        { label: '字段二', draggable: true, father: '私有库' },
                        { label: '字段二', draggable: true, father: '私有库' },
                        { label: '字段二', draggable: true, father: '私有库' },
               
                    ]
                },

            ]
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

        handleCompare() {
            this.$router.push({ name: 'ConpareFunction3' })
        }
    }


}
</script>
<style>
.title_2 {
    font-size: 1.6vw;
    color: #32FFF6;
}



.header_name {
  
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
    top:-90%;
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
