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
  margin: 92rpx 0 48rpx;
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
</style>
