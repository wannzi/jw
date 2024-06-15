<template>
  <div id="app">
    <router-view></router-view>
    <!-- <div>
      <SpreadSheet :exceldata="yourExcelData" :mergecell="yourMergeCells" :readOnly="false" />
    </div> -->
  </div>
</template>

<script>
// import SpreadSheet from '../src/components/SpreadSheet.vue';

export default {
  name: 'App',
  components: {
    // SpreadSheet
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */

}

body {
  margin: 0;
}
</style>
