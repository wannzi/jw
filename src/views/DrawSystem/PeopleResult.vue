<template>
    <div class='app'>
        <div class="head">
            <div class="title">
                大数据中心研判业务
            </div>
        </div>
        <div style="width: 100%;height: 100%  ;display: flex;position: relative; ">
            <div class="left" style="width: 13vw;background-color: rgba(64, 149, 229, 0.2);display: flex;position: relative">
                <div style="color: lightgrey;margin-top:11vh;margin-left: 1.5vw;font-size: 20px">
					<i class="el-icon-search" style="margin-right: 0.5vw"/>搜索结果</div>
            </div>

            <div class= 'center' style="margin-left: 1vw; width: 85vw;height: 100%;display: flex;position: relative;flex-direction: column">
                <div style="width: 85vw;height: 42vh; background-color: rgba(64, 149, 229, 0.2);;margin-top: 10vh; font-size: 12px;">
                    <div style="color: #32fff6;display: flex;flex-direction: row;justify-content: left;margin:0.8vw;font-weight: bold;font-size: 28px;font-family: youshe;font-weight: lighter;">基本信息</div>
                     <div style="display: flex;flex-direction: row;">
                         <div  class="bigDiv" >
                             <div class="divOne" >姓名</div>
                             <div class="divTwo" >路六</div>
                         </div>
                         <div  class="bigDiv" >
                             <div class="divOne" >联系电话</div>
                             <div class="divTwo" >18844568659</div>
                         </div>
                         <div  class="bigDiv" >
                             <div class="divOne" >工作单位</div>
                             <div class="divTwo" >xxxx街道</div>
                         </div>
                         <div  class="bigDiv" >
                             <div class="divOne" >政治面貌</div>
                             <div class="divTwo" >中共党员</div>
                         </div>

                     </div>
                    <div style="display: flex;flex-direction: row;">
                        <div  class="bigDiv" >
                            <div class="divOne" >性别</div>
                            <div class="divTwo" >男</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >婚姻状况</div>
                            <div class="divTwo" >已婚</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >单位地址</div>
                            <div class="divTwo" >xxxx街道xxx号</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >入党时间</div>
                            <div class="divTwo" >2025.12.15</div>
                        </div>

                    </div>
                    <div style="display: flex;flex-direction: row;">
                        <div  class="bigDiv" >
                            <div class="divOne" >出生年月</div>
                            <div class="divTwo" >1990.10.25</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >家庭住址</div>
                            <div class="divTwo" >无锡市梁溪区xxx小区</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >行政职务</div>
                            <div class="divTwo" >科员</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >党组织关系</div>
                            <div class="divTwo" >xxx党支部</div>
                        </div>

                    </div>
                    <div style="display: flex;flex-direction: row;">
                        <div  class="bigDiv" >
                            <div class="divOne" >身份证号</div>
                            <div class="divTwo" >450225520055598</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >最高学历</div>
                            <div class="divTwo" >硕士研究生</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >入职时间</div>
                            <div class="divTwo" >2010.10.12</div>
                        </div>

                    </div>
                </div>
                <div style="width: 85vw;height: 60vh; margin-top:2vh; background-color: rgba(64, 149, 229, 0.2);padding: 1vw;">
                    <div style="width: 30%; display: flex; flex-direction: row">
                        <div class="myTabs" @click="updateTab(1)">
                            家庭关系
							<!-- <div class="horizontal-line"></div> -->
                        </div>
                        <div class="vertical-line"></div>

                        <div class="myTabs">
                            资产信息
                            <!-- <div class="horizontal-line"></div> -->
                        </div>
                        <div class="vertical-line"></div>
                        <div class="myTabs">
                            投资关系
                            <!-- <div class="horizontal-line"></div> -->
                        </div>
                    </div>
                    <div style="display: flex;flex-direction: row;justify-content: left">
                    <div>
                        <img src="../../assets/DrawSystem/img.png" style="width: 20vw;height: 35vh;">
                    </div>
                    <div>
                        <table style="margin-left: 5vw; width: 55vw">
                            <thead style="color: #32fff6">
                            <tr>
                                <th>关系</th>
                                <th>姓名</th>
                                <th>身份证号</th>
                                <th>工作单位</th>
                            </tr>
                            </thead>
                            <tbody style="color: rgb(193, 197, 201)">
                            <tr>
                                <td>数据1</td>
                                <td>数据2</td>
                                <td>数据3</td>
                                <td>数据3</td>
                            </tr>
                            <tr>
                                <td>数据4</td>
                                <td>数据5</td>
                                <td>数据6</td>
                                <td>数据6</td>
                            </tr>
                            <tr>
                                <td>数据7</td>
                                <td>数据8</td>
                                <td>数据9</td>
                                <td>数据9</td>
                            </tr>
                            <tr>
                                <td>数据7</td>
                                <td>数据8</td>
                                <td>数据9</td>
                                <td>数据9</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>

// import router from "@/router";
import Vue from "vue";
export default class SelectDraw extends Vue {
    data() {
        return {
            tabIndex: 0
        }
    }
    methods = {
        updateTab(newTabs) {
            this.tabIndex = newTabs
            console.log("update")
        }
    }
    watch = {
        tabIndex: {
            immediate: true,
            handler(newValue) {
                console.log("标签选项：", newValue)
            }
        }
    }

}
// export default {
//     data() {
//         return {
//             tableData: [{
//                 date: '2016-05-02',
//                 name: '王小虎',
//                 address: '上海市普陀区金沙江路 1518 弄'
//             }, {
//                 date: '2016-05-04',
//                 name: '王小虎',
//                 address: '上海市普陀区金沙江路 1517 弄'
//             }, {
//                 date: '2016-05-01',
//                 name: '王小虎',
//                 address: '上海市普陀区金沙江路 1519 弄'
//             }, {
//                 date: '2016-05-03',
//                 name: '王小虎',
//                 address: '上海市普陀区金沙江路 1516 弄'
//             }]
//         }
//     }
// }


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
		position: fixed;
		background-image: url('../../assets/UserManagement/head.png');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		height: 50px;
		width: 100%;
		color: #32FFF6;
		z-index: 10;
		padding-top: 8px;
		font-size: 2vw;
		/* 默认字体大小 */
	}

.head .title {
	font-family: youshe;
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
.bigDiv{
    display: flex;
    flex-direction: row;
    margin: 1vh 1vw 1vh 1vw;
}
.divOne{
    width: 80px;
    color: white;
    height: 30px;
    text-align: center;
    display:flex;
    justify-content: center;
    align-items:center;
    background-color:rgb(41, 107, 172);
    border: 2px solid rgb(31, 136, 247)
}
.divTwo{
    width: 160px;
    color:#32fff6 ;
    height: 30px;
    text-align: center;
    display:flex;
    justify-content: center;
    align-items:center;
    background: none;
    border: 2px solid rgb(31, 136, 247);
    border-left: none;
}

.myTabs {
    color: rgb(193, 197, 201);
    font-size: 18px;
    margin: 10px;
    /*background-color: #67c23a;*/

}

.vertical-line {
    width: 1.5px;
    height: 20px;
    margin-top: 13px;
    background-color: rgb(193, 197, 201);
}

.horizontal-line {
    height: 1.5px;
    margin-top: 3px;
    /*background-color: transparent;*/
    background-color: red;
}

table {
    border-collapse: collapse;
    background-color: transparent;
}

th {
    font-weight: bold;
}

td {
    border-top: 1px solid #ccc;
    padding: 8px;
}
</style>