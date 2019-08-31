<template>
  <div class="body">
    <vue-particles
      color="#030513"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="circle"
      :particleSize="4"
      linesColor="#203c77"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="100"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
    ></vue-particles>
    <div class="main-title">
      <h3>WSLL</h3>
    </div>
    <div class="container">
      <div class="loginBox">
        <div class="username">
          <input class="input" placeholder="用户名" v-model="username" />
        </div>
        <div class="password">
          <input type="password" class="input" placeholder="密码" v-model="password" />
        </div>
        <el-button class="loginButton" @click="login">登录</el-button>
        <!-- <input class="sub" value="登录" /> -->
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
        url: "/loginAdmin",
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
            window.localStorage["username"] = JSON.stringify(self.username);
            // localStorage.setItem(
            //   'token',
            //   JSON.stringify(response.data.token)
            // );
            // self.$axios.defaults.headers.common['token'] = response.data.token;
            self.$router.push("/goodslist");
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

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.lizi {
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.body {
  height: 100%;
  width: 100%;
  position: fixed;
  background: #409eff;
  overflow: hidden;
  text-align: center;
}
.main-title {
  font-size: 7rem;
  font-family: Teko, sans-serif;
  text-shadow: 8px 8px #000;
  text-transform: uppercase;
  position: absolute;
  margin: 0;
  left: 0;
  right: 0;
}
.container {
  /* height: 400px; */
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 5px solid;*/
}
.loginBox {
  width: 400px;
  height: 300px;
  border-radius: 25px;
  box-shadow: 0 -15px 30px #0F1CEF;
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
  width:60%;
}
.loginInput {
  display: inline-block;
  width: 50%;
}
.input {
  font-size: 14px;
  height: 26px;
  line-height: 26px;
  padding: 8px 5%;
  width: 90%;
  text-indent: 2em;
  border: none;
  background: #8B92F5;
  color: white;
}
.password {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: inline-block;
  width:60%;
}
.loginButton {
  display: block;
  transform: translate(33%, 450%);
  width: 60%;
  height: 42px;
  border: none;
  font-size: 16px;
  background: #1B34F0;
  color: #f8f8f8;
}
</style>
