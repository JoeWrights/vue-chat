<template>
  <div class="container">
    <div class="login-box">
      <img src="http://pr2l68ies.bkt.clouddn.com/people-talking-illustration-vector.png" alt="" />
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick">
        <el-tab-pane
          label="登录"
          name="first">
          <el-form
            :model="loginForm"
            status-icon
            :rules="loginRules"
            ref="loginForm"
            label-width="100px"
            label-position="left">
            <el-form-item
              label="用户名"
              prop="name">
              <el-input
                type="text"
                v-model="loginForm.name"
                @keyup.enter.native="submitForm('loginForm')"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password">
              <el-input
                type="password"
                v-model="loginForm.password"
                @keyup.enter.native="submitForm('loginForm')"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('loginForm')">
                登录
              </el-button>
              <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="注册"
          name="second">
          <el-form
            :model="registerForm"
            status-icon
            :rules="registerRules"
            ref="registerForm"
            label-width="100px"
            label-position="left">
            <el-form-item
              label="用户名"
              prop="name">
              <el-input
                type="text"
                v-model="registerForm.name"
                @keyup.enter.native="submitForm('registerForm')"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password">
              <el-input
                type="password"
                v-model="registerForm.password"
                @keyup.enter.native="submitForm('registerForm')"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item
              label="确认密码"
              prop="checkPass">
              <el-input
                type="password"
                v-model="registerForm.checkPass"
                @keyup.enter.native="submitForm('registerForm')"
                autocomplete="off">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm('registerForm')">
                注册
              </el-button>
              <el-button @click="resetForm('registerForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script src="./login.js"></script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: url('http://pr2l68ies.bkt.clouddn.com/people-talking-illustration-vector.png') no-repeat center;

  .login-box{
    width: 300px;
    padding: 30px;
     display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 6px;
    background: #fff;

    img {
      width: 243px;
      height: 200px;
    }
  }
}
</style>
