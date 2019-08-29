<template>
  <div class="container">
    WSLL后台管理系统
    <div class="user">
      <el-dropdown :hide-on-click="false" @command="handleCommand">
        <span class="el-dropdown-link">
          {{username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>个人空间</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: window.localStorage
        .getItem("username")
        .replace('"', "")
        .replace('"', ""),
      password: "passWord"
    };
  },
  methods: {
    handleCommand: function(command) {
      switch (command) {
        case "logout":
          this.logout();
          this.$message("注销成功");
          break;
      }
    },
    logout: function() {
      console.log("Logout");
      var self = this;
      window.localStorage.clear();
      self.$router.push("/");
    }
  }
};
</script>

<style scoped>
.container {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user {
  flex: 1;
  text-align: right;
}
.username {
  float: right;
}
.el-dropdown-link {
  cursor: pointer;
  color: black;
}
.el-icon-arrow-down {
  font-size: 19px;
}
</style>