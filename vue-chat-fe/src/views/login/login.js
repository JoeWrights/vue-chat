import Vue from 'vue';
import AuthService from '@/core/services/auth.service';

export default {
  name: 'Login',

  data() {
    const validatePass = (rule, value, callback) => { // eslint-disable-line
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (value.length > 16 || value.length < 6) {
        callback(new Error('密码长度必须在6-16内'));
      } else {
        if (this.registerForm.checkPass !== '') {
          this.$refs.registerForm.validateField('checkPass');
        }
        callback();
      }
    };

    const validatePass2 = (rule, value, callback) => { // eslint-disable-line
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value.length > 16 || value.length < 6) {
        callback(new Error('密码长度必须在6-16内'));
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    const validateUserName = (rule, value, callback) => { // eslint-disable-line
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else if (value.length <= 1) {
        callback(new Error('用户名必须包含2个字符'));
      } else if (value.length > 16) {
        callback(new Error('用户名不能超过16个字符'));
      } else {
        callback();
      }
    };

    return {
      activeName: 'first',
      loginForm: {
        name: '',
        password: '',
      },
      registerForm: {
        name: '',
        password: '',
        checkPass: '',
      },
      loginRules: {
        password: [
          { validator: validatePass, trigger: 'blur' },
        ],

        name: [
          { validator: validateUserName, trigger: 'blur' },
        ],
      },
      registerRules: {
        password: [
          { validator: validatePass, trigger: 'blur' },
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' },
        ],
        name: [
          { validator: validateUserName, trigger: 'blur' },
        ],
      },
    };
  },

  watch: {
    activeName(activeName) {
      if (activeName === 'first') {
        this.registerForm = {};
      } else {
        this.loginForm = {};
      }
    },
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === 'loginForm') {
            this.userLogin();
          } else {
            this.userRegister();
          }
        }
        return false;
      });
    },

    userLogin() {
      AuthService.userLogin(this.loginForm).then((res) => {
        // 拿到 token 存入 store
        if (res.token) {
          const { token, user } = res;
          this.$store.dispatch('userLogin', token);
          this.$store.dispatch('userInfo', user);
          Vue.noty.success('登录成功');
          this.$router.push({ name: 'home' });
        }
      });
    },

    userRegister() {
      AuthService.userRegister(this.registerForm).then((res) => {
        if (res.uid) {
          Vue.noty.success('注册成功');
          this.activeName = 'first';
        } else {
          Vue.noty.error('注册失败');
        }
      });
    },

    resetForm(formName) {
      if (formName === 'loginForm') {
        this.loginForm.name = '';
        this.loginForm.password = '';
      } else {
        this.registerForm.name = '';
        this.registerForm.password = '';
        this.registerForm.checkPass = '';
      }
    },
  },
};
