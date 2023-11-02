<template>
  <view class="content">
    <view class="text-area">
      <text class="title manager" @click="exitManager">管理树洞</text>
      <uni-datetime-picker class="timePicker" :border="false" v-model="single" />
      <ShowMessage :message="message"></ShowMessage>
      <uni-data-checkbox class="message_tags"  mode="tag" multiple v-model="message.tag" :localdata="tags"></uni-data-checkbox>
      <view class="message_type">
        <label>负能量</label>
        <switch color="#2bb88a" :checked="!!message.type" style="transform:scale(0.7)"/>
        <label>正能量</label>
      </view>
      <view class="message_type">
        <label>是否匿名</label>
        <switch checked color="#2bb88a" style="transform:scale(0.7)"/>
      </view>
      <view class="button_box">
        <button class="user_cancel">未通过</button>
        <button class="user_confirm background_manager">通过</button>
      </view>
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
      title: '管理',
      message: {
        id: '123456',
        content: '只有在自己醒来之后才会发现自己做了一个梦',
        author: '梦游君',
        like: 16,
        state: 0,
        type: 1,
        tag: ['文学', '人生'],
        time: '2023/10/30'
      },
      tags: [
          {
            text: '文学',
            value: '文学',
            disable: false
          },
          {
            text: '人生',
            value: '人生',
            disable: false
          },
          {
            text: '社会',
            value: '社会',
            disable: false
          },
          {
            text: '幽默',
            value: '幽默',
            disable: false
          }
      ],
      datePick: '2023-10-31'
    }
  },
  methods: {
    exitManager() {
      uni.setStorageSync('accessToken', 'false')
      uni.switchTab({
        url:'/pages/index/index',
      })
    }
  },
}
</script>

<style lang="scss">
.content{
  flex-wrap: wrap;
  .manager{
    color:#2bb88a
  }
  .background_manager{
    background-color: #2bb88a;
  }
  .tab_bar{
    position: absolute;
    bottom: 0;
    width:100%
  }
  .button_box{
    width: 100%;
    margin-top:16rpx;
    display: flex;
    flex-wrap: nowrap;
  }
  .timePicker{
    transform: scale(0.7);
  }
}
.text-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width:640rpx;
  .message_type{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:16rpx
  }
}
</style>
