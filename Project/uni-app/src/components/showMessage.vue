<template>
  <div class="showMessage">
    <div class="message-content">{{ message.content }}</div>
    <div class="message-author">{{ message.author }}</div>
  </div>
</template>

<script>
  export default{
    name: "showMessage",
    props: {
      message: {
        type: Object,
        default:{
          content: '只有在自己醒来之后才会发现自己做了一个梦',
          author: '梦游君'
        }
      },
    },
    data() {
      return {}
    },
    computed: {},
    methods: {},
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

<style lang="scss" scoped >
.showMessage{
  margin-top: 48rpx;
  width: 640rpx;
  .message-content{
    display: flex;
    height: 320rpx;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #000;
    text-align: center;
    font-size: 48rpx;
    font-style: normal;
    font-weight: 500;
    line-height: 64rpx;
  }
  .message-author{
    display: flex;
    width: 640rpx;
    height: 128rpx;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: #005CB8;
    text-align: center;
    font-size: 48rpx;
    font-style: normal;
    font-weight: 500;
    line-height: 64rpx;
  }
}
</style>