<template>
   <div>
       <div class="intoFile">
           <div class="intoFile_title_1">+</div>
           <div class="intoFile_title_2">请将删除文件从目录拖拽到此</div>
       </div>

       <div class="ctrl_btn">

           <button class="ge_btn1">导出</button>
           <button class="ge_btn2">清空</button>
       </div>
   </div>
</template>
<script>
export default {
   data() {
       return {
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
   }


}
</script>
<style>
.intoFile {
   width: 73vw;
   height: 40vh;
   border: 3px dashed #6f86a0;
   position: relative;
}

.intoFile_title_1 {
   position: absolute;
   top: 35%;
   left: 50%;
   transform: translate(-50%, -50%);
   font-size: 4vw;
   color: #4e749e;
}



.intoFile_title_2 {
   position: absolute;
   top: 65%;
   left: 50%;
   transform: translate(-50%, -50%);
   font-size: 2vw;
   color: #4e749e;
}
</style>

<style>
.ctrl_btn {
   position: absolute;
   right: 1.8vw;
}


.ctrl_btn button {
   font-size: 1vw;
   font-weight: bold;

}

.ge_btn1 {
   background-color: #409eff;
   color: #ffffff;
   border: none;
   width: 94px;
   height: 37px;
   margin-right: 18px;
   margin-top: 2vw;
}

.ge_btn2 {
   background-color: #f56c6c;
   color: #ffffff;
   border: none;
   width: 94px;
   height: 37px;
   margin-right: 18px;
   margin-top: 2vw;
}
</style>
