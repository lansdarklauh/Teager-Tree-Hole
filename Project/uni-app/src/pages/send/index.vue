<template>
  <view class="content">
    <view class="text-area">
      <text class="title">倾听你的碎碎念</text>
      <enterMessage></enterMessage>
      <button class="user_confirm custom_button">分享</button>
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

export default {
  components: {
    enterMessage,
    tabBar
},
  data() {
    return {
      title: '发表',
      message: {
        id: '123456',
        content: '只有在自己醒来之后才会发现自己做了一个梦',
        author: '梦游君',
        like: 16,
        state: 0,
        type: 0,
        tag: ['文学', '人生'],
        time: '2023/10/30'
      },
      likeFlag:false
    }
  },
  onLoad() {},
  methods: {
    likeClick() {
      if (this.likeFlag) {
        this.message.like--
      } else {
        this.message.like++
      }
      this.likeFlag = !this.likeFlag
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
