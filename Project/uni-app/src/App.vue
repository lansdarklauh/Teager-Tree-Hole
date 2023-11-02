<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
.title {
  margin: 48rpx 0 32rpx;
  color: #409EFF;
  text-align: center;
  font-size: 64rpx;
  font-weight: 700;
  line-height: 64rpx;
}
.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.user_confirm{
  width: 256rpx;
  background-color: #409EFF;
  color: #ffffff;
  font-size: 28rpx;
}
.user_cancel{
  width: 256rpx;
  background-color: #ffffff;
  color: #000000;
  font-size: 28rpx;
}
.uni-data-checklist .checklist-group{
  justify-content:center;
}
.content{
  flex-wrap: wrap;
}
.tab_bar{
    position: absolute;
    bottom: 0;
    width:100%
  }
</style>
