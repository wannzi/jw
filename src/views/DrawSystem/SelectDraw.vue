<template>
    <div class='app'>
        <div class="head">
            <div class="title">
                大数据中心研判业务
            </div>
        </div>

        <div class="zhisou">
            <img src="../../assets/UserManagement/zhisou.png">
            <span >精准画图系统</span>
        </div>

        <div  class="SelectDraw" >
            <div style="display: flex; flex-direction: row; margin-top: 1vh;">
                <select style="background-color: transparent; font-weight: bold; width: 6vw; color: white; border-radius: 5px 0 0 5px; border-color: rgb(50, 255, 246); text-align: center; height: 100%; display: flex; justify-content: center; align-items: center">
                    <option value="">个人</option>
                </select>
                <input placeholder="请输入人员姓名或身份证号" style="width: 400px;height: 40px; border-color: rgb(50, 255, 246); background-color: transparent; color: white">
                <div style="background-color: #32fff6;width: 7vw;font-size: 18px; text-align: center; height: 100%; border-radius: 0 5px 5px 0; display: flex; justify-content: center; align-items: center"><i class="el-icon-search" style="margin-right: 6px"/>搜索</div>
            </div>
            <div style="display: flex; flex-direction: row; margin-top: 15vh;">
                <select style="background-color: transparent; font-weight: bold; width: 6vw; color: white; border-radius: 5px 0 0 5px; border-color: rgb(50, 255, 246); text-align: center; height: 100%; display: flex; justify-content: center; align-items: center">
                    <option value="">单位</option>
                </select>
                <input placeholder="请输入单位名称或统一社会信用代码" style="width: 400px;height: 40px; border-color: rgb(50, 255, 246); background-color: transparent; color: white">
                <div style="background-color: #32fff6;width: 7vw;font-size: 18px; text-align: center; height: 100%; border-radius: 0 5px 5px 0; display: flex; justify-content: center; align-items: center"><i class="el-icon-search" style="margin-right: 6px"/>搜索</div>
            </div>
        </div>
    </div>
</template>
<script>

// import router from "@/router";
import Vue from "vue";
// import {Component} from "vue-class-component";
//
// @Component({
//     methods: {
//         router() {
//             return router
//         }
//     }
// })
export default class SelectDraw extends Vue {
}

</script>
<style>
.app {
    background-image: url('../../assets/UserManagement/background.png');
    /*display: flex;*/
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;

}
button {
    border-radius:4px;
}

.head {
    /* display: flex; */

    position: fixed;
    background-image: url('../../assets/UserManagement/head.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 70px;
    width: 100%;
    color: #32fff6;
    z-index: 10;

    padding-top: 8px;
    font-size: 2vw; /* 默认字体大小 */



}

.head .title {
    padding-top: 8px;

}
.el-input__inner {
    background-color: transparent !important;
}

/deep/ .el-select {
    background: none;
    background-color: transparent !important;

}

.left-nav button {
    width: 7vw;
    height:4.3vh;
    margin-bottom: 39px;
    color: #b4fdff;
    background-color: #075a9a;
    border: 1px;
    display: block;
    margin-left: 15%;
}

.zhisou{
    display: flex;
    flex-direction: row;
    align-items: center;
    /*justify-content: center;*/
    /*text-align: center;*/
    margin-top: 12vh;
    margin-left: 38vw;
}
.zhisou>img{
    width: 180px;
    height: 180px;
}
.zhisou>span{
    color: #32fff6;
    font-size: 2.5vw;
    margin-top: 5vh;
    margin-left: 1vw;
    font-weight: 900;
    font-style: italic;
    /*background-color: red;*/

}


.SelectDraw{
    flex-direction: column;
    width: 50vw;
    height: 50vh;
    /*background-color: #32fff6;*/
    margin-top: 10px;
    margin-left: 25vw;
    display: flex;
    /*justify-content: center;*/
    align-items: center;
}

.input-with-select {
    width: 30vw;
    border-color: #32fff6;
    border-radius: 4px;
    /*margin-top: 0px;*/
}




</style>
<style>
.container {
    display: flex;
    align-items: center;
    border-color: #32fff6;
}

.container select,
.container input,
.container button {
    margin: 0;
    padding: 0;
    border-color: #5cbee0;
    background: none;
    outline: none;
    height: 40px;
}

.container select {
    flex: 0.1;
    border-radius: 5px 0 0 5px;
    color: white;
}

.container input {
    flex: 0.8;
}

.container button {
    flex: 0.2;
}

</style>