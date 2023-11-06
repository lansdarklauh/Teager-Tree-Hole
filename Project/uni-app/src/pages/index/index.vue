<template>
  <view class="content">
    <view class="text-area">
      <text class="title">树洞里的碎碎念</text>
      <ShowMessage :message="message"></ShowMessage>
      <text class="tags">{{ message.tag.join('，') }}</text>
      <view class="like_flag" v-if="fetchFlag" @click="likeClick">
        <uni-icons type="heart" size="30" v-show="!likeFlag"></uni-icons>
        <uni-icons type="heart-filled" class="hearted" size="30" v-show="likeFlag"></uni-icons><br />
        <br />
        <text class="like_num" v-show="likeFlag" :style="{'color':'#FF005C'}">{{ message.like }}</text>
        <text class="like_num" v-show="!likeFlag" :style="{'color':'#000000'}">{{ message.like }}</text>
      </view>
      <button class="user_confirm" @click="nextMessage">下一条</button>
    </view>
    <tabBar class="tab_bar"></tabBar>
  </view>
</template>

<script>
import ShowMessage from '@/components/showMessage.vue';
import tabBar from '@/components/tabBar.vue';
import { getMessage, updateMessageLike } from '@/api/message'
import { useManagerStore } from '@/store/index'
const managerStore = useManagerStore()

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
      likeFlag: false,
      fetchFlag: false
    }
  },
  onLoad() {
    uni.setStorageSync('accessToken', '')
    managerStore.setToken('')
    getMessage().then(res => {
      if (res.data.data) {
        this.message = res.data.data
        this.fetchFlag = true
      } else {
        this.fetchFlag = false
      }
    })
  },
  methods: {
    likeClick() {
      const obj = {
        id: this.message.id,
        like:this.likeFlag? this.message.like -1: this.message.like + 1,
        time: this.message.time  
      }
      updateMessageLike(obj).then(res => {
        if (res.data.data) {
          if(this.likeFlag){
            this.message.like--
          } else {
            this.message.like++ 
          }
          this.likeFlag = !this.likeFlag
        }
      })
    },
    nextMessage() {
      this.likeFlag = false
      getMessage().then(res => {
        if (res.data.data) {
          this.message = res.data.data
          this.fetchFlag = true
        } else {
          this.fetchFlag = false
        }
      })
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
      margin: 32rpx 0 48rpx;
      width: 100%;
      text-align: center;
      .hearted text{
        color:#FF005C !important;
      }
    }
  }
</style>
