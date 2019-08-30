<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <user></user>
      </el-header>
      <el-container>
        <el-aside width="”200px”" class="side">
          <el-menu
            router
            :default-active="goodslist"
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
import user from "../components/User";

export default {
  data(){
    return{
      goodslist: '/goodslist'
    }
  },
  name: "home",
  components: { user },
  methods: {
  },
}
</script>
<style scoped>
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
  height: 734px;
}
</style>
