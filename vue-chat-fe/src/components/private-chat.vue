<template>
  <el-main>
    <div
      v-for="(member, index) in privateChatMessages"
      :key="index">
      <div class="chat-other" v-if="user.name !== member.name">
        <div class="chat-time">{{ member.chat_time | date }}</div>
        <div class="chat-section">
          <img :src="member.avatar" alt="">
          <div>
            <div style="font-size: 12px; color: #888;">
              {{ member.name }}
            </div>
            <div class="chat-msg">{{ member.content }}</div>
          </div>
        </div>
      </div>
      <div class="chat-self" v-else>
        <div class="chat-time">{{ member.chat_time | date }}</div>
        <div class="chat-section">
          <img :src="member.avatar" alt="">
          <div>
            <div style="font-size: 12px; color: #888; text-align: right;">
              {{ member.name }}
            </div>
            <div class="chat-msg">{{ member.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PrivateChat',

  props: {
    privateChatMessages: { type: Array, default: () => [] },
    parent: { type: Object, default: () => ({}) },
  },

  computed: {
    ...mapState(['user']),
  },

  watch: {
    privateChatMessages: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.parent.scrollToBottom();
        });
      },
    },
  },
};
</script>

<style lang="scss">
.chat-other {
  margin-top: 16px;

  .chat-time {
    font-size: 12px;
    color: #888;
  }

  .chat-section {
    display: flex;

    img {
      width: 50px;
      height: 50px;
    }

    .chat-msg {
      min-width: 20px;
      max-width: 500px;
      margin-top: 6px;
      padding: 10px 10px 4px;
      background: #fff;
      border-radius: 4px;
      font-size: 14px;
      bottom: -16px;
      left: 48px;
      word-wrap: break-word;
      word-break: break-all;
      min-height: 25px;
    }
  }
}

.chat-self {
  margin-top: 16px;

  .chat-time {
    font-size: 12px;
    color: #888;
    text-align: right;
  }

  .chat-section {
    display: flex;
    flex-direction: row-reverse;

    img {
      width: 50px;
      height: 50px;
    }

    .chat-msg {
      min-width: 20px;
      max-width: 500px;
      margin-top: 6px;
      padding: 10px 10px 4px;
      background: #b2e281;
      border-radius: 4px;
      font-size: 14px;
      bottom: -16px;
      left: 48px;
      word-wrap: break-word;
      word-break: break-all;
      min-height: 25px;
    }
  }
}
</style>
