<template>
  <div id="app">
    <!-- <img src="./assets/logo.png">
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <router-view />
  </div>
</template>

<script>

export default {
  name: "app",
  components: {
  }
};
</script>

<style>
#app {
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
}
#header {
  background-color: red;
}
body .el-table th.gutter{
    display: table-cell!important;
}
</style>
