<template>
    <div class="addRules">
        <div class="addRules_left">
            <div v-for="(item) in dataSheets" :key="item">
                <div class="dataSheet" @click="toggleExpand(item)">
                    <img src="../../../../assets/UserManagement/下(白)_down.png" alt="">
                    <img src="../../../../assets/UserManagement/文件夹_folder.png" alt="">
                    <span>{{ item.name }}</span>
                </div>
                <div class="field" v-for="(field) in item.fields" :key="field" draggable="true">
                    <div v-if="item.expand" class="field_item">
                        <img src="../../../../assets/UserManagement/编辑文件_file.png" alt="">
                        <span>{{ field }}</span>
                    </div>

                </div>
            </div>
        </div>
        <div class="addRules_center">
            <div class="addRules_top">
                <div class="center_title">
                    新建子规则
                </div>
                <div class="back_title">
                    请拖拽字段和关系符号至此
                </div>
                <div class="center_btn">
                    <button>添加</button>
                    <button>清除</button>
                </div>

            </div>
            <div class="addRules_bottom">
                <div class="center_title">
                    规则明细：
                    <span style="color:#edbd15 ;height: 50%;">(当前规则：XXX规则)</span>
                </div>
                <div class="center_table_box">
                    <table class="center_table">
                        <tr>
                            <th>子规则ID</th>
                            <th>子规则描述</th>
                            <th>匹配字段1</th>
                            <th>关系符</th>
                            <th>匹配字段2</th>
                            <th>匹配数值</th>
                            <th>操作</th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>匹配XXXXX</td>
                            <td>XXXX表，XXXX字段</td>
                            <td>&&(逻辑与)</td>
                            <td>XXXX表，XXXX字段</td>
                            <td>匹配数值</td>
                            <td>
                                <button>编辑</button>
                                <button>删除</button>
                            </td>
                        </tr>

                    </table>
                </div>
            </div>
        </div>

        <div class="addRules_right">
            <div class="symbol_box">
                <div class="symbol_title">匹配常量</div>
                <div class="symbols">
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>


                </div>
            </div>
            <div class="symbol_box">
                <div class="symbol_title">匹配字段</div>
                <div class="symbols">
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>


                </div>
            </div>
            <div class="symbol_box">
                <div class="symbol_title">汇总数量</div>
                <div class="symbols">
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>


                </div>
            </div>
            <div class="symbol_box">
                <div class="symbol_title">汇总合计</div>
                <div class="symbols">
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>


                </div>
            </div>
            <div class="symbol_box">
                <div class="symbol_title">字段比较</div>
                <div class="symbols">
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>


                </div>
            </div>
            <div class="symbol_box">
                <div class="symbol_title">筛选日期</div>
                <div class="symbols">
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>
                    <span class="symbol_constant" draggable="true"></span>


                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            dataSheets: [
                {
                    name: "数据表1",
                    fields: ["字段1", "字段2", "字段3"],
                    expand: false
                },
                {
                    name: "数据表2",
                    fields: ["字段1", "字段2", "字段3"],
                    expand: false
                },
                {
                    name: "数据表3",
                    fields: ["字段1", "字段2", "字段3"],
                    expand: false
                },
                {
                    name: "数据表4",
                    fields: ["字段1", "字段2", "字段3"],
                    expand: false
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
        toggleExpand(item) {
            item.expand = !item.expand;
        },
    }


}
</script>
<style>
/* 区域遮罩 */
.addRules {

    height: 100vh;
    /* padding-top: 10vh; */
    overflow: hidden;
    display: flex;
}

.addRules_left {
    position: relative;
    padding-top: 10vh;
    width: 14vw;
    height: 100%;
}

.addRules_left::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /* 遮罩层宽度与左侧导航相同 */
    height: 100%;
    /* 遮罩层高度与左侧导航相同 */
    background-color: rgba(166, 157, 157, 0.1);
    /* 半透明黑色背景 */
    z-index: 1;
    /* 确保遮罩层在左侧导航内容之上 */
    pointer-events: none;
    border-right: 1.5px solid #1e87f8;
}

.addRules_center {
    width: 73vw;
    margin-top: 9vh;
    margin-left: 1vw;
}

.addRules_center .addRules_top {
    position: relative;
    height: 44vh;
}

.addRules_center .addRules_top::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /* 遮罩层宽度与左侧导航相同 */
    height: 100%;
    /* 遮罩层高度与左侧导航相同 */
    background-color: rgba(166, 157, 157, 0.1);
    /* 半透明黑色背景 */
    z-index: 1;
    /* 确保遮罩层在左侧导航内容之上 */
    pointer-events: none;
    border: 1.5px solid #1e87f8;
}

.addRules_center .addRules_bottom {
    position: relative;
    height: 44vh;
    margin-top: 1.5vh;

}

.addRules_center .addRules_bottom::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /* 遮罩层宽度与左侧导航相同 */
    height: 100%;
    /* 遮罩层高度与左侧导航相同 */
    background-color: rgba(166, 157, 157, 0.1);
    /* 半透明黑色背景 */
    z-index: 1;
    /* 确保遮罩层在左侧导航内容之上 */
    pointer-events: none;
    border: 1.5px solid #1e87f8;

}

.addRules_right {
    position: relative;
    padding-top: 10vh;
    margin-left: 1vw;
    width: 12vw;
}

.addRules_right::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    /* 遮罩层宽度与左侧导航相同 */
    height: 100%;
    /* 遮罩层高度与左侧导航相同 */
    background-color: rgba(166, 157, 157, 0.1);
    /* 半透明黑色背景 */
    z-index: 1;
    /* 确保遮罩层在左侧导航内容之上 */
    pointer-events: none;
    border-left: 1.5px solid #1e87f8;

}
</style>
<!-- 左侧 -->
<style>
.addRules_left {
    color: #e1e4e8;
    font-size: 1.1vw;
}
</style>
<style>
.center_title {
    font-size: 1.4vw;
    color: #32fff6;
    position: absolute;
    left: 1vw;
    top: 1vh;
}

.back_title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2vw;
    color: #4e749e;
}

.center_btn {
    position: absolute;
    bottom: 2vh;
    right: 1vw;
    margin-left: 2vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
<!-- 右侧 -->
<style>
.symbol_box {
    margin-bottom: 1vw;
    display: flex;
    flex-direction: column;
    /* justify-content: flex-start; */
    align-items: baseline;
}

.symbol_box .symbol_title {
    font-size: 1.2vw;
    color: #f5c106;

}

.symbols {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    /* margin-top: 1vw; */
    margin-left: 2vw;
}

.symbol_constant {
    font-size: 1.5vw;
    width: 1.6vw;
    height: 1.6vw;
    display: inline-block;
    background-color: #88acdb;
    border-radius: 10%;
    margin-right: 0.5vw;
    margin-top: 0.4vw;
    color: #fff;
    text-align: center;
}
</style>
<!-- 中间表格 -->
<style>
.center_table_box {

    margin-left: 3vw;
    padding-top: 7vh;
}

.center_table {
    width: 67vw;
    border-collapse: collapse;
    color: aliceblue;
    font-size: 1vw;
}

.center_table th {
    border: 2px solid #c7bdbd;

    height: 5vh;
    padding-left: 1.5vw;
    padding-right: 1.5vw;

}

.center_table td {
    border: 2px solid #c7bdbd;
    height: 5vh;
    padding-left: 1.5vw;
    padding-right: 1.5vw;
}
</style>

<style>
.dataSheet  {
    display: flex;
    margin-left: 3vw;
    align-items: center;
}
.field_item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0.3vw;
    margin-bottom: 0.3vw;
}

.dataSheet img {
    width: 1vw;
    height: 1vw;
    margin-right: 0.4vw;
}
.field img {
    width: 1vw;
    height: 1vw;
    margin-right: 0.4vw;
}

</style>
