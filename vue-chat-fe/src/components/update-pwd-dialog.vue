<template>
  <el-dialog
    title="修改密码"
    :visible.sync="dialogFormVisible"
    width="36%"
    style="text-align: center;">
    <el-form
      :model="passwordForm"
      ref="passwordForm"
      :rules="updatePwdRule">
      <el-form-item
        label="密码"
        :label-width="formLabelWidth"
        prop="originPassword">
        <el-input
          type="password"
          show-password
          v-model="passwordForm.originPassword"
          autocomplete="off"
          size="small"
          style="width: 200px;">
        </el-input>
      </el-form-item>
      <el-form-item
        label="新密码"
        prop="password"
        :label-width="formLabelWidth">
        <el-input
          type="password"
          show-password
          v-model="passwordForm.password"
          autocomplete="off"
          size="small"
          style="width: 200px;">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="updatePwd">修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'UpdatePwdDialog',

  data() {
    const validateOriginPwd = (rule, value, callback) => { // eslint-disable-line
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else if (value.length > 16 || value.length < 6) {
        callback(new Error('密码长度必须在6-16内'));
      } else if (this.passwordForm.originPassword !== '') {
        this.$refs.passwordForm.validateField('originPassword');
      } else {
        callback();
      }
    };

    const validateNewPwd = (rule, value, callback) => { // eslint-disable-line
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else if (value.length > 16 || value.length < 6) {
        callback(new Error('密码长度必须在6-16内'));
      } else if (this.passwordForm.password !== '') {
        this.$refs.passwordForm.validateField('password');
      } else {
        callback();
      }
    };

    return {
      formLabelWidth: '80px',
      dialogFormVisible: false,
      passwordForm: {
        originPassword: '',
        password: '',
      },
      updatePwdRule: {
        originPassword: [
          { validator: validateOriginPwd, trigger: 'blur' },
        ],

        password: [
          { validator: validateNewPwd, trigger: 'blur' },
        ],
      },
    };
  },

  methods: {
    closeDialog() {
      this.dialogFormVisible = false;
      this.passwordForm.originPassword = '';
      this.passwordForm.password = '';
    },

    updatePwd() {
      this.$emit('update', this.passwordForm);
    },
  },
};
</script>

<style>

</style>
