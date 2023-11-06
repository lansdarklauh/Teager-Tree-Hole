<template>
  <view class="content">
    <view class="text-area">
      <text class="title manager" @click="exitManager">管理树洞</text>
      <uni-datetime-picker type="date" class="timePicker" :border="false" v-model="datePick" @change="changeDate"/>
      <ShowMessage :message="message"></ShowMessage>
      <uni-data-checkbox class="message_tags"  mode="tag" multiple v-model="message.tag" :localdata="tags"></uni-data-checkbox>
      <!-- <view class="message_type">
        <label>负能量</label>
        <switch color="#2bb88a" :checked="!!message.type" style="transform:scale(0.7)"/>
        <label>正能量</label>
      </view> -->
      <!-- <view class="message_type">
        <label>是否匿名</label>
        <switch :checked="message.state === 2" color="#2bb88a" style="transform:scale(0.7)" @change="isHideName"/>
      </view> -->
      <view class="button_box">
        <button class="user_cancel" @click="abandonMessage">删除</button>
        <button class="user_confirm background_manager" @click="nextMessage">下一条</button>
      </view>
    </view>
    <tabBar class="tab_bar"></tabBar>
  </view>
</template>

<script>
import ShowMessage from '@/components/showMessage.vue';
import tabBar from '@/components/tabBar.vue';
import { useMessageStore } from '@/store/index'
const messageStore = useMessageStore()
import { getMessageList, updateMessage, deleteMessage } from '@/api/message'

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
      originMessage: {
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
      datePick: '2023-10-31',
      fetchFlag: false
    }
  },
  onLoad() {
    const date = new Date()
    this.datePick = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate()<10?'0'+date.getDate():date.getDate())
    getMessageList({time:this.datePick}).then(res => {
      if (res.data.data) {
        messageStore.setMessageList(res.data.data)
        this.message = messageStore.getMessageList(0) || {}
        this.originMessage = JSON.parse(JSON.stringify(this.message))
        this.fetchFlag = true
      } else {
        this.message = {}
        this.originMessage = {}
        this.fetchFlag = false
      }
    })
  },
  methods: {
    getMessage(time) {
      getMessageList({ time: time || this.datePick }).then(res => {
          if (res.data.data) {
            messageStore.setMessageList(res.data.data)
            this.message = messageStore.getMessageList(0) || {}
            this.originMessage = JSON.parse(JSON.stringify(this.message))
            this.fetchFlag = true
          } else {
            this.message = {}
            this.originMessage = {}
            this.fetchFlag = false
          }
        })
    },
    isHideName(e) {
      if (e.detail.value) {
        this.message.state = 2
      } else {
        this.message.state = 1
      }
    },
    changeDate(e) {
      this.getMessage(e)
    },
    compareArr(listA, listB) {
      return listA.length === listB.length && listA.every(a => listB.some(b => a === b)) && listB.every(_b => listA.some(_a => _a === _b));
    },
    nextMessage() {
      if (!this.fetchFlag) {
        this.getMessage()
      } else {
        if (this.originMessage.type !== this.message.type || this.originMessage.state !== this.message.state || !this.compareArr(this.originMessage.tag, this.message.tag)) {
          const obj = {
            id: this.message.id,
            state: this.message.state,
            time: this.message.time,
            tag: this.message.tag
          }
          updateMessage(obj).then((res) => {
            if (res.data.data) {
              messageStore.deleteMessage(this.message.id)
              if (messageStore.getMessagesListLength()) {
                this.message = messageStore.getMessageList(0) || {}
                this.originMessage = JSON.parse(JSON.stringify(this.message))
              } else {
                this.getMessage()
              }
            } else {
              uni.showToast({
              	title: res.data.msg,
              	icon: 'error',
              	duration: 2000
              })
            }
          })
        } else {
          messageStore.deleteMessage(this.message.id)
          if (messageStore.getMessagesListLength()) {
            this.message = messageStore.getMessageList(0) || {}
            this.originMessage = JSON.parse(JSON.stringify(this.message))
          } else {
            this.message = {}
            this.originMessage = {}
            this.fetchFlag = false
          }
        }
      }
    },
    abandonMessage() {
      if (!this.fetchFlag) {
        this.getMessage()
      } else {
        const obj = {
          time: this.message.time,
          state: this.message.state,
          id: this.message.id
        }
        deleteMessage(obj).then((res) => {
          if (res.data.data) {
              messageStore.deleteMessage(this.message.id)
              if (messageStore.getMessagesListLength()) {
                this.message = messageStore.getMessageList(0) || {}
                this.originMessage = JSON.parse(JSON.stringify(this.message))
              } else {
                this.getMessage()
              }
            } else {
              uni.showToast({
              	title: res.data.msg,
              	icon: 'error',
              	duration: 2000
              })
            }
        })
      }
    },
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
