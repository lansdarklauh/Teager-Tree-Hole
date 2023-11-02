<template>
  <view>
    <textarea class="message_content" v-model="content" :maxlength="200" placeholder="跟树洞倾诉你想对其他人说的东西吧" />
    <input class="message_author" :maxlength="16" placeholder="告诉我你的名字，昵称也行" />
    <uni-data-checkbox class="message_tags" mode="tag" multiple v-model="checkedTags" :localdata="tags"></uni-data-checkbox>
    <view class="message_type">
      <label>负能量</label>
      <switch checked color="#409EFF" style="transform:scale(0.7)"/>
      <label>正能量</label>
    </view>
  </view>
</template>

<script>
  export default {
    name: "enterMessage",
    props: {},
    data() {
      return {
        content: '',
        author: '',
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
        checkedTags: [],
        type: 0
      }
    },
    computed: {},
    methods: {
      
    },
    watch: {},
  
    // 组件周期函数--监听组件挂载完毕
  mounted() {},
    // 组件周期函数--监听组件数据更新之前
    beforeUpdate() {},
    // 组件周期函数--监听组件数据更新之后
    updated() {},
    // 组件周期函数--监听组件激活(显示)
    activated() {},
    // 组件周期函数--监听组件停用(隐藏)
    deactivated() {},
    // 组件周期函数--监听组件销毁之前
    beforeDestroy() {},
  }
</script>

<style lang="scss" scoped>
.message_content{
  box-sizing: border-box;
  margin-bottom: 16rpx;
  width: 640rpx;
  height: 320rpx;
  border-radius: 8rpx;
  border: 2rpx solid #DCDFE6;
  padding:16rpx 32rpx;
}
.message_author{
  box-sizing: content-box;
  border-radius: 8rpx;
  border: 2rpx solid #DCDFE6;
  padding:16rpx 32rpx;
  margin-bottom: 16rpx;
}
.message_type{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:16rpx
}
</style>
    
      