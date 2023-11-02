<template>
  <view class="content">
    <view class="text-area">
      <text class="title">待审核列表</text>
      <ShowMessage :message="message"></ShowMessage>
      <text class="tags">{{ message.tag.join('，') }}</text>
      <view class="like_flag" @click="likeClick">
        <uni-icons type="heart" size="30" v-show="!likeFlag"></uni-icons>
        <uni-icons type="heart-filled" class="hearted" size="30" v-show="likeFlag"></uni-icons><br />
        <br />
        <text class="like_num" v-show="likeFlag" :style="{'color':'#FF005C'}">{{ message.like }}</text>
        <text class="like_num" v-show="!likeFlag" :style="{'color':'#000000'}">{{ message.like }}</text>
      </view>
      <button class="user_confirm">下一条</button>
    </view>
    <tabBar class="tab_bar"></tabBar>
  </view>
</template>

<script>
import ShowMessage from '@/components/showMessage.vue';
import tabBar from '@/components/tabBar.vue';

export default {
  components: {
    ShowMessage,
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
.content{
  flex-wrap: wrap;
  .tab_bar{
    position: absolute;
    bottom: 0;
    width:100%
  }
}
.text-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:640rpx;
  .tags{
    margin-top: 32rpx;
    color: #409EFF;
    text-align: center;
    font-size: 32rpx;
    font-style: normal;
    font-weight: 500;
    line-height: 64rpx;
  }
  .like_flag{
    margin: 16px 0 24px;
    width: 100%;
    text-align: center;
    .hearted text{
      color:#FF005C !important;
    }
  }
}
</style>
