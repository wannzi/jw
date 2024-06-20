<template>
    <div class='app'>
        <div class="head">
            <div class="title">
                大数据中心研判业务
            </div>
        </div>
        <div style="width: 100%;height: 100%  ;display: flex;position: relative; ">
            <div class="left" style="width: 15vw;background-color: rgba(64, 149, 229, 0.2);display: flex;position: relative;flex-direction: column">
                <div style="color: lightgrey;margin-top:11vh;font-size: 20px;display: flex;justify-content: flex-start">
                    <i class="el-icon-search" style="margin-right: 0.5vw"/>搜索结果
                </div>
                <div style="color: #32FFF6;">
                    <p v-for="person in searchResults" :key="person.id" style="font-size:1vw;display: flex;justify-content: flex-start;margin-left: 0.5vw ">{{ person.name }} ({{ person.id }})</p>
                </div>
            </div>

            <div class= 'center' style="margin-left: 1vw; width: 85vw;height: 100%;display: flex;position: relative;flex-direction: column">
                <div style="width: 83vw;height: 42vh; background-color: rgba(64, 149, 229, 0.2);;margin-top: 10vh; font-size: 12px;">
                    <div style="color: #32fff6;display: flex;flex-direction: row;justify-content: left;margin:0.8vw;font-weight: bold;font-size: 28px;font-family: youshe;font-weight: lighter;">基本信息</div>
                    <div style="display: flex;flex-direction: row;">
                        <div  class="bigDiv" >
                            <div class="divOne" >公司名称</div>
                            <div class="divTwo" >路六</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >经营状态</div>
                            <div class="divTwo" >18844568659</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >企业类型</div>
                            <div class="divTwo" >xxxx街道</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >营业期限</div>
                            <div class="divTwo" >中共党员</div>
                        </div>

                    </div>
                    <div style="display: flex;flex-direction: row;">
                        <div  class="bigDiv" >
                            <div class="divOne" >信用代码</div>
                            <div class="divTwo" >男</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >成立日期</div>
                            <div class="divTwo" >已婚</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >所属行业</div>
                            <div class="divTwo" >xxxx街道xxx号</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >参保人数</div>
                            <div class="divTwo" >2025.12.15</div>
                        </div>

                    </div>
                    <div style="display: flex;flex-direction: row;">
                        <div  class="bigDiv" >
                            <div class="divOne" >法人代表</div>
                            <div class="divTwo" >1990.10.25</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >注册资本</div>
                            <div class="divTwo" >无锡市梁溪区xxx小区</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >纳税人资质</div>
                            <div class="divTwo" >科员</div>
                        </div>
                        <div  class="bigDiv" >
                            <div class="divOne" >注册地址</div>
                            <div class="divTwo" >xxx党支部</div>
                        </div>

                    </div>
                    <div style="display: flex;flex-direction: row;">
                        <div  class="bigDiv" >
                            <div class="divOne" >经营范围</div>
                            <div class="divTwo" style="width: 71.5vw">450225520055598</div>
                        </div>

                    </div>
                </div>
                <div style="width: 81vw;height: 60vh; margin-top:2vh; background-color: rgba(64, 149, 229, 0.2);padding: 1vw;">
                    <div style="width: 30%; display: flex; flex-direction: row">
                        <div class="myTabs" @click="updateTab(1)">
                            股东信息
                            <!-- <div class="horizontal-line"></div> -->
                        </div>
                        <div class="vertical-line"></div>

                        <div class="myTabs">
                            经营状况
                            <!-- <div class="horizontal-line"></div> -->
                        </div>
                        <div class="vertical-line"></div>
                        <div class="myTabs">
                            知识产权
                            <!-- <div class="horizontal-line"></div> -->
                        </div>
                    </div>
                    <div style="margin-top: 2vh">
                        <table style="width: 100%; background-color: transparent !important; color: white; border-collapse: collapse;">
                            <thead>
                            <tr style="height:8vh">
                                <th style="width: 5vw; border: 1px solid  slategray;">序号</th>
                                <th style="width: 15vw; border: 1px solid slategray;">股东名称</th>
                                <th style="width: 180px; border: 1px solid slategray;">持股比例</th>
                                <th style="border: 1px solid slategray;">认缴出资额</th>
                                <th style="border: 1px solid slategray;">认缴出资日期</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="item in tableData" :key="item.date" style="height:5vh; border: 1px solid slategray;">
                                <td style="border: 1px solid slategray;">{{ item.date }}</td>
                                <td style="border: 1px solid slategray;">{{ item.date }}</td>
                                <td style="border: 1px solid slategray;">{{ item.name }}</td>
                                <td style="border: 1px solid slategray;">{{ item.address }}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style>

.el-table {
    background: none;
    background-color: transparent !important;
}

.el-table th {
    background: none;
    background-color: transparent !important;
}

.el-table td {
    background-color: transparent !important;
}
</style>
<script>

export default  {
    data() {
        return {
            tabIndex: 0,
            searchResults: [
                { id: '450889966523562358', name: '陆六' },
                { id: '450889966523562358', name: '张三' },
                { id: '450889966523562358', name: '李四' }
            ]
            ,
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]

        }
    },
    methods:{
        updateTab(newTabs) {
            this.tabIndex = newTabs
            console.log("update")
        }
    },
    watch: {
        tabIndex: {
            immediate: true,
            handler(newValue) {
                console.log("标签选项：", newValue)
            }
        }
    }

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
    width: 100px;
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
    width: 200px;
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

</style>
