<template>
  <div style="margin-left:40px">
    <div class="container">
      <div class="loginBox">
        <div class="username">
          <el-input placeholder="请输入用户名" v-model="username" />
        </div>
        <div class="password">
          <el-input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <el-button class="loginButton" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      id: 0
    };
  },
  methods: {
    axiosNoPara: function() {
      this.$http.get(this.GLOBAL.globalURL + "/test2").then(
        response => {
          console.log(response.data);
        },
        err => {
          console.log(err);
        }
      );
    },
    axiosId: function() {
      this.$http({
        method: "get",
        url: this.GLOBAL.globalURL + "/axiosId",
        params: {
          id: this.id
        }
      }).then(function(response) {
        alert(response.data);
      });
    },
    login: function() {
      var self = this;
      //判断输入框的值
      if (this.username == "") {
        alert("Please input username!");
        return;
      }
      if (this.password == "") {
        alert("Please input password!");
        return;
      }
      this.$http({
        method: "post",
        url: "/login",
        params: {
          username: this.username,
          password: this.password
        }
      })
        .then(function(response) {
          console.log("Login:", response.data);
          if (response.data.code == 200) {
            self.$message.success(response.data.message, 3);
            window.localStorage["token"] = JSON.stringify(response.data.token);
            // localStorage.setItem(
            //   'token',
            //   JSON.stringify(response.data.token)
            // );
            // self.$axios.defaults.headers.common['token'] = response.data.token;
            self.$router.push("/main");
          } else {
            self.$message.error(response.data.message, 3);
          }
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error);
        });
    }
  }
};
</script>

<style>
#axiosNoPara {
  margin: 30px;
}
.container {
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 5px solid;*/
}
.loginBox {
  width: 400px;
  height: 300px;
  border-radius: 25px;
  box-shadow: black 0px 0px 10px;
  text-align: center;
  position: relative;
}
.username {
  display: block;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
}
.loginInput {
  display: inline-block;
  width: 50%;
}
.password {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
}
.loginButton {
  display: block;
  /* top: 100%; */
  left: 0%;
  /* -webkit-transform: translate(0%, -50%); */
  transform: translate(230%, 500%);
}
</style>
