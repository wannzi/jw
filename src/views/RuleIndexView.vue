<template>
  <div class="container">
    
    <div class="pub">
      <!-- left -->
       <div class="rule-ctr">
          <div class="rule-head">
            <img src="../assets/Rule/pub-folder.svg" width="50" height="50">
            <span class="rulebox-title">公共规则库</span>
          </div>
          <div class="rule-main-ctr">
            <div class="rule-instance">
              <div class="rule-instance-icon">
                <img src="../assets/Rule/rule-ico1.svg" width="50" height="50">
                <span class="rule-instance-font">招投标违规</span>
              </div>
              <div>
                查看
              </div>
            </div>
            <div class="rule-instance">
              <div class="rule-instance-icon">
                <img src="../assets/Rule/rule-ico1.svg" width="50" height="50">
                <span class="rule-instance-font">招投标违规</span>
              </div>
              <div>
                查看
              </div>
            </div>
            <div class="rule-instance">
              <div class="rule-instance-icon">
                <img src="../assets/Rule/rule-ico1.svg" width="50" height="50">
                <span class="rule-instance-font">招投标违规</span>
              </div>
              <div>
                查看
              </div>
            </div>
            <div class="rule-instance">
              <div class="rule-instance-icon">
                <img src="../assets/Rule/rule-ico1.svg" width="50" height="50">
                <span class="rule-instance-font">招投标违规</span>
              </div>
              <div>
                查看
              </div>
            </div>
            <div class="rule-instance">
              <div class="rule-instance-icon">
                <img src="../assets/Rule/rule-ico1.svg" width="50" height="50">
                <span class="rule-instance-font">招投标违规</span>
              </div>
              <div>
                查看
              </div>
            </div>
            <div class="rule-instance">
              <div class="rule-instance-icon">
                <img src="../assets/Rule/rule-ico1.svg" width="50" height="50">
                <span class="rule-instance-font">招投标违规</span>
              </div>
              <div>
                查看
              </div>
            </div>
            <div class="rule-instance">
              <div class="rule-instance-icon">
                <img src="../assets/Rule/rule-ico1.svg" width="50" height="50">
                <span class="rule-instance-font">招投标违规</span>
              </div>
              <div>
                查看
              </div>
            </div>
            <div class="rule-instance">
              <div class="rule-instance-icon">
                <img src="../assets/Rule/rule-ico1.svg" width="50" height="50">
                <span class="rule-instance-font">招投标违规</span>
              </div>
              <div>
                查看
              </div>
            </div>
           
          </div>
          
       </div>
      
       
    </div>
    <div class="pri">
      right
    </div>
  </div>
</template>
<script setup>

// const rawRuleData=[
//   {
//     id:0,
//     name:'招投标违规'
//   },
//   {
//     id:2,
//     name:'医保资金套现'
//   },
//   {
//     id:3,
//     name:'违规领取补贴'
//   },

// ]

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  /* background-color: aqua; */

  /* 留出标题部分的空间 */
  padding-top: 50px;
  box-sizing: border-box;
}
.pub {
  flex: 1;
  /* background-color: red; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pri {
  flex: 1;
  background-color: blue;
}

.rule-ctr{
  /* margin-top: 400px; */
  /* background-color: green; */
  width: 80%;
  height: 80%;

  display: flex;
  flex-direction: column;

}

.rule-head{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}

.rulebox-title{
  font-family: youshe;
  color: #32FFF6;
  font-size: 2vw;
  margin-left: 20px;
  /* margin-bottom: ; */
}


.rule-main-ctr{
  background-color: rgba(0, 0, 0, 0.2);

  /* opacity: 0.2; */
  border-radius: 2px;
  display: grid;

  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(130px, 1fr));

  flex-grow: 1;

  /* margin: 20px; */
  padding: 20px;
}
.rule-instance{



  /* box-sizing: border-box; */
  /* margin: 20px; */



  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.rule-instance-icon{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #88acdb;
  border-radius: 10px;

  height: 100px;
  width: 100px;

}
.rule-instance-font{
  font-family: youshe;
  color: #FFFFFF;
  font-size: 1vw;
}
</style>