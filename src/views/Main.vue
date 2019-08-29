<template>
  <div class="home">
    <el-container>
      <el-header class="header">WSLL后台管理系统</el-header>
      <el-container>
        <el-aside width="”200px”" class="side">
          <el-menu
            router
            :default-active="this.$router.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="/goodslist">
              <i class="el-icon-goods"></i>
              <span slot="title">商品管理</span>
            </el-menu-item>
            <el-menu-item index="/cardslist">
              <i class="el-icon-goods"></i>
              <span slot="title">订单管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {}
};
</script>
<style>
.home {
  /* height: 1000px; */
  /* background-color:red; */
}
.header {
  background-color: #409eff;
  text-align: center;
}
.side {
  background-color: #a4caf6;
  /* height: 400px; */
  min-height: 600px;
}
.main {
  /* background-color: #3080db; */
}
</style>
