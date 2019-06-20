<template>
  <div class="container">
    <div class="warp">
      <el-container>
        <div class="aside">
          <div class="sub-aside">
            <div class="user-info-card">
              <div class="user-header">
                <div class="user-avatar">
                  <img :src="user.avatar" />
                  <span>{{ user.name }}</span>
                </div>
                <el-dropdown
                  trigger="click"
                  @command="handleCommands">
                  <i class="el-icon-setting" style="margin-left: 26px;"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="profile">个人信息</el-dropdown-item>
                    <el-dropdown-item command="updatePwd">修改密码</el-dropdown-item>
                    <el-dropdown-item command="userLogout">退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <div class="search-input">
                <el-input
                  size="small"
                  v-model="filters.keyword"
                  style="width: 208px;"
                  clearable
                  prefix-icon="el-icon-search">
                </el-input>
                <div class="tabs">
                  <div
                    class="tab"
                    v-for="(tab, index) in tabs"
                    :key="index"
                    @click="selectTab(index)">
                    <span v-if="index === 'message' && notificationCount !== 0">
                      {{ notificationCount }}
                    </span>
                    <svg
                      class="icon"
                      :class="{ 'active': index === selected }">
                      <use :xlink:href="tab"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style="overflow: auto; height: 82%;"
            v-if="selected === 'chat'">
            <div
              class="chat-item"
              :class="[listIndex === 99999 ? 'active' : '']"
              @click="groupChat">
              <div class="friend-info">
                <div class="friend-avatar">
                  <img src="http://pr2l68ies.bkt.clouddn.com/icons8-red-short-hair-lady-in-yellow-shirt.png" />
                  <span style="vertical-align: top;">群聊</span>
                </div>
              </div>
            </div>
            <div
              class="chat-item"
              :class="[listIndex === index ? 'active' : '']"
              v-for="(friend, index) in friends"
              :key="index"
              @click="chatWith(friend, index)">
              <div class="friend-info">
                <div class="friend-avatar">
                  <img :src="friend.favatar" />
                  <span style="vertical-align: top;">{{ friend.fname }}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            style="overflow: auto; height: 82%;"
            v-if="selected === 'search'">
            <div
              class="chat-item"
              v-for="(user, index) in users"
              :key="index">
              <div class="friend-info">
                <div class="friend-avatar">
                  <img :src="user.avatar" />
                  <span style="vertical-align: top;">{{ user.name }}</span>
                  <div class="add-friend" @click="askToMyFriend(user)">
                    <svg class="icon">
                      <use xlink:href="#icon_add"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style="overflow: auto; height: 82%;"
            v-if="selected === 'message'">
            <div
              class="chat-item"
              v-for="(notification, index) in notifications"
              :key="index">
              <div class="friend-info">
                <div class="friend-avatar">
                  <img :src="notification.avatar" />
                  <span style="vertical-align: top;">{{ notification.name }}</span>
                  <div class="add-friend notification">
                    <svg class="icon" @click="addToMyFriend(notification)">
                      <use xlink:href="#icon_add"></use>
                    </svg>
                    <svg class="icon delete" @click="ignoreNotification(index)">
                      <use xlink:href="#icon_delete"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-container>
          <el-header>
            <div @click="toggleFriendList" style="cursor: pointer; font-size: 14px;">
              {{ (friend.fname && listIndex !== 99999) ? friend.fname : '群聊' }}
              <i :class="toggle ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            </div>
          </el-header>
          <transition name="appear">
            <div
              class="friend-drop"
              :class="{ 'toggle': toggle }">
              <div
                class="friend-avatar"
                v-if="listIndex !== 99999">
                <img :src="friend.favatar" />
                <div>{{ friend.fname }}</div>
              </div>
              <div class="chat-members" v-else>
                <div
                  class="friend-avatar"
                  v-for="(member, index) in chatMembers"
                  :key="index">
                  <img :src="member.avatar" />
                  <div class="member-name">{{ member.name }}</div>
                </div>
              </div>
            </div>
          </transition>
          <div
            class="chat-body"
            ref="chatBody"
            @click="toggle = false">
            <el-main v-if="listIndex === 99999">
              <div
                v-for="(member, index) in groupChatMembers"
                :key="index">
                <div class="chat-other" v-if="user.name !== member.name">
                  <div class="chat-time">{{ member.chat_time | date }}</div>
                  <div class="chat-section">
                    <img :src="member.avatar" alt="">
                    <div>
                      <div style="font-size: 12px; color: #888;">
                        {{ member.name }}
                      </div>
                      <div class="chat-msg">{{ member.message }}</div>
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
                      <div class="chat-msg">{{ member.message }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </el-main>
            <private-chat
              :friend="friend"
              :list-index="listIndex"
              :private-chat-messages="privateChatMessages"
              :parent="this"
              v-else>
            </private-chat>
          </div>
          <el-footer>
            <div class="send-option">
              <span style="margin-right: 20px;"><i class="el-icon-document"></i></span>
              <span style="margin-right: 20px;"><i class="el-icon-share"></i></span>
              <el-popover
                placement="top"
                width="100"
                trigger="click">
                <div class="emoji-list">
                  <span
                    style="cursor: pointer;"
                    v-for="(emoji, index) in emojiList"
                    :key="index"
                    @click="getEmoji(emoji)">
                      {{ emoji }}
                    </span>
                </div>
                <span slot="reference" style="cursor: pointer;">😃</span>
              </el-popover>
            </div>
            <textarea
              class="input-area"
              rows="9"
              v-model="message"
              @keyup.ctrl.enter="sendMessage"
              placeholder="请输入内容">
            </textarea>
            <span class="prompt-info">ctrl + enter 发送</span>
            <el-button class="send-btn" @click="sendMessage">发送</el-button>
          </el-footer>
        </el-container>
      </el-container>
      <update-user-dialog
        ref="updateUserDialog"
        @update="updateUser"
        :parent="this">
      </update-user-dialog>
      <update-pwd-dialog
        ref="updatePwdDialog"
        @update="updatePwd">
      </update-pwd-dialog>
    </div>
  </div>
</template>

<script src="./home.js"></script>

<style lang="scss">
@import './home.scss';
</style>
