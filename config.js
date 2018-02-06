/**
 * 小程序网络配置文件
 */
var host = "https://www.playgo.xin" //正式环境
//var host = "http://localhost:9099"//测试环境

var config = {
  host,
  // 测试接口
  test: `${host}/rzht/test`,
  // 上传图片及表单
  uploadImageUrl: `${host}/rzht/uploadImage`,
  // 登录地址，用于建立会话
  loginUrl: `${host}/login`,
  // 测试的请求地址，用于测试会话
  getUser: `${host}/rzht/getUser`,
  // 头像照片
  getHeaderImg: `${host}/`,
  // 用code换取openId
  openIdUrl: `${host}/rzht/openid`,
  // 测试的信道服务接口
  tunnelUrl: `${host}/tunnel`,
  // 生成支付订单的接口
  paymentUrl: `${host}/ml/payment`,
  // 发送模板消息接口
  templateMessageUrl: `${host}/templateMessage`,
  // 上传文件接口
  uploadFileUrl: `${host}/upload`,
  // 下载示例图片接口
  downloadExampleUrl: `${host}/static/weapp.jpg`
};

module.exports = config
