<template>
  <view class="content">
    <view class="text-area">
      <text class="title">倾听你的碎碎念</text>
      <enterMessage ref="enterMessage"></enterMessage>
      <button class="user_confirm custom_button" @click="shareMessage">分享</button>
      <navigator
        url="/pages/login/login"
        open-type="navigate"
        hover-class="navigator-hover"
        class="manager_login_entry"
      >
        <text>或者，你是树洞的管理者？</text>
      </navigator>
    </view>
    <tabBar class="tab_bar"></tabBar>
  </view>
</template>

<script>
import enterMessage from '@/components/enterMessage.vue';
import tabBar from '@/components/tabBar.vue';
import { addMessage } from '@/api/message'

export default {
  components: {
    enterMessage,
    tabBar
},
  data() {
    return {
      title: '发表',
      message: {},
    }
  },
  onLoad() {},
  methods: {
    shareMessage() {
      const enter = this.$refs.enterMessage.$data
      if (enter.content && enter.author && enter.checkedTags.length) {
        const message = {
          type: enter.type,
          tag: enter.checkedTags,
          author: enter.author,
          content: enter.content
        }
        addMessage(message).then(res => {
          if (res.data.data) {
            uni.showToast({
            	title: '分享成功！',
            	icon: 'success',
            	duration: 2000
            })
            this.$refs.enterMessage.resetMessage()
          } else {
            uni.showToast({
            	title: '分享失败！',
            	icon: 'error',
            	duration: 2000
            })
          }
        })
      } else {
        uni.showToast({
        	title: '请检查各项语句信息是否完整填写！',
        	icon: 'none',
        	duration: 2000
        })
      }
    }
  },
}
</script>

<style lang="scss">
  .text-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width:640rpx;
  }
  .custom_button{
    margin-top: 64rpx;
  }
  .manager_login_entry{
    margin-top: 32rpx;
    color: #409EFF;
    text-align: center;
    font-size: 28rpx;
  }
</style>
