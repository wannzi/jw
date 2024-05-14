<template>
    <div class="addRules">
        <div class="addRules_left">


            <div v-for="(item) in dataSheets" :key="item">
                <div class="dataSheet" @click="toggleExpand(item)">
                    <span></span>
                    <span></span>
                    <span>{{ item.name }}</span>
                </div>
                <div class="field" v-for="(field) in item.fields" :key="field" v-if="item.expand" draggable="true">
                    <span></span>
                    <span>{{ field }}</span>
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
                </div>
                <div class="cemter_table">
                    <table>

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
    font-size: 1.2vw;
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
