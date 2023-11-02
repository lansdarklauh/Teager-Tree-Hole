<template>
  <view class="tab_content">
    <view
        v-for="item in list" :key="item.pagePath"
        class="tab_element"
        @click="changeActive(item)"
      >
      <img class="icon" :src="item.pagePath.indexOf(this.current.route) > -1 ? item.selectedIconPath:item.iconPath">
      <text class="text" :style="{'color':item.pagePath.indexOf(this.current.route) > -1 ? item.selectedColor:'#000000'}">{{ item.text }}</text>
  </view>
  </view>
</template>

<script>
  import tabType from './tabType'
  export default {
    name:"tabBar",
    data() {
      return {
        list: [
          {
            pagePath: "/pages/check/index",
            text: "审核",
            iconPath: "/static/DocumentChecked.png",
            selectedIconPath: "/static/DocumentChecked_selected.png",
            selectedColor: "#2bb88a",
          },
          {
            pagePath: "/pages/send/index",
            text: "发表",
            iconPath: "/static/Memo.png",
            selectedIconPath: "/static/Memo_selected.png",
            selectedColor: "#2bb88a",
          }
        ],
        current:''
      };
  },
  mounted() {
    const token = uni.getStorageSync('accessToken')
    if (token === 'true') {
      this.list = tabType.managerTab
    } else {
      this.list = tabType.userTab
    }
    this.current = getCurrentPages()[0]
  },
    methods: {
      changeActive(item) {
        uni.switchTab({
          url:item.pagePath
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tab_content{
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 96rpx;
    padding-top:16rpx;
    border-top: 2rpx solid #cccccc;
    .tab_element{
      display: flex;
      flex-wrap: wrap;
      width: 48rpx;
      justify-content: center;
      .icon{
        width:48rpx;
        height: 48rpx;
      }
      .text{
        font-size: 24rpx;
      }
    }
  }
</style>
    
      