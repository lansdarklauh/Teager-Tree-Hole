<template>
  <view class="content">
    <view class="text-area">
      <text class="title">我需要确认一下</text>
      <uni-forms class="form_content" ref="form" :modelValue="formData" :rules="rules">
			  <uni-forms-item label="帐号" name="account" required>
			  	<uni-easyinput type="text" v-model="formData.account" placeholder="4-16位英文字符" :maxlength="16"/>
			  </uni-forms-item>
			  <uni-forms-item label="密码" name="password" required>
			  	<uni-easyinput type="password" v-model="formData.password" placeholder="8-16位英文与数字" :maxlength="16"/>
			  </uni-forms-item>
		  </uni-forms>
      <button class="user_confirm" @click="login">登录</button>
    </view>
  </view>
</template>

<script>
import md5 from 'md5'
import { login } from '@/api/manager'
import { useManagerStore } from '@/store/index'
const managerStore = useManagerStore()

export default {
  components: {

  },
  data() {
    return {
      title: '登录',
      formData: {
        account: '',
        password: ''
      },
      rules: {
        account: {
          rules: [
            {
              required: true,
              errMessage: '请填写帐号'
            },
            {
              minLength: 4,
              maxLength: 16,
              errMessage: '请输入4-16位英文字符'
            },
            {
              validateFunction:function(rule, value, data, callback) {
					    	let accountReg = /^[A-Za-z]+$/
					    	if (!accountReg.test(value)) {
					    		callback('请输入英文字符')
					    	}
					    	return true
					    }
            }

          ]
        },
        password: {
          rules: [
            {
              required: true,
              errMessage: '请填写密码'
            },
            {
              minLength: 4,
              maxLength: 16,
              errMessage: '请输入8-16位英文字符或数字'
            },
            {
              validateFunction:function(rule, value, data, callback) {
					    	let passwordReg = /^[A-Za-z0-9]+$/
					    	if (!passwordReg.test(value)) {
					    		callback('请输入英文字符或数字')
					    	}
					    	return true
					    }
            }
          ]
        },
      }
    }
  },
  onReady() {
    this.$refs.form.setRules(this.rules)
  },
  methods: {
    login() {
      this.$refs.form.validate().then(res=>{
        const obj = {
          name: this.formData.account,
          password:md5(this.formData.password)
        }
        return login(obj)
      }).then((res) => {
        if (res.data.data) {
          managerStore.setToken(res.data.data)
          uni.setStorageSync('accessToken', res.data.data)
          uni.switchTab({
            url:'/pages/check/index'
          })
        } else {
          return Promise.reject(res.data.msg)
        }
      }).catch(err =>{
				uni.showToast({
        	title: err,
        	icon: 'error',
        	duration: 2000
        })
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
}
</style>
