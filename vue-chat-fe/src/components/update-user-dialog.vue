<template>
  <el-dialog
    title="个人信息"
    :visible.sync="dialogFormVisible"
    width="36%"
    style="text-align: center;">
    <el-form :model="profileForm">
      <div style="height: 50px; margin-left: 20px; display: flex;">
        <img :src="user.avatar" alt="" style="height: 50px;">
        <svg class="icon" v-if="user.gender === 'male'">
          <use xlink:href="#icon_male"></use>
        </svg>
        <svg class="icon" v-else>
          <use xlink:href="#icon_female"></use>
        </svg>
      </div>
      <el-form-item
        label="加入于"
        :label-width="formLabelWidth">
        <span>{{ user.register_at | date }}</span>
      </el-form-item>
      <el-form-item
        label="用户名"
        :label-width="formLabelWidth">
        <el-input
          disabled
          v-model="profileForm.name"
          autocomplete="off"
          size="small"
          style="width: 200px;"
          suffix-icon="el-icon-user">
        </el-input>
      </el-form-item>
      <el-form-item
        label="性别"
        :label-width="formLabelWidth">
        <el-radio-group v-model="profileForm.gender" size="mini">
          <el-radio label="male" border>男</el-radio>
          <el-radio label="female" border>女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="地址"
        :label-width="formLabelWidth">
        <el-input
          v-model="profileForm.addr"
          autocomplete="off"
          size="small"
          style="width: 200px;"
          suffix-icon="el-icon-office-building">
        </el-input>
      </el-form-item>
      <el-form-item
        label="手机"
        :label-width="formLabelWidth">
        <el-input
          v-model="profileForm.phone"
          autocomplete="off"
          size="small"
          style="width: 200px;"
          suffix-icon="el-icon-phone-outline">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="updateUser">修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex';
import { cloneDeep } from 'lodash';

export default {
  name: 'UpdateUserDialog',

  props: {
    parent: { type: Object, default: () => ({}) },
  },

  data() {
    return {
      formLabelWidth: '80px',
      dialogFormVisible: false,
      profileForm: {
        name: '',
        addr: '',
        phone: '',
        gender: 'male',
      },
    };
  },

  computed: {
    ...mapState(['user']),
  },

  watch: {
    dialogFormVisible(visible) {
      if (visible) this.profileForm = cloneDeep(this.user);
    },
  },

  methods: {
    closeDialog() {
      this.dialogFormVisible = false;
    },

    updateUser() {
      this.$emit('update', this.profileForm);
    },
  },
};
</script>

<style>

</style>
