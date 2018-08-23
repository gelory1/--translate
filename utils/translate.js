import md5 from './md5.min.js'

const appID = '20180822000197674';
const key = '2U0ibp3jsdBjJzZhpnEP';

function translate(q,{from='auto',to='auto'} = {from:'auto',to:'auto'}){
  return new Promise(( resolve,reject)=>{
    const salt = Date.now
    let sign = md5(`${appID}${q}${salt}${key}`);
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      dataType: 'json',
      data: {
        q: q,
        appid: appID,
        salt: salt,
        from: from,
        to: to,
        sign: sign
      },
      success(res){
        if (res.data && res.data.trans_result){
          resolve(res.data)
        }else{
          reject({status:'error',msg:'翻译失败'})
          wx.showToast({
            title:'翻译失败',
            icon:'none'
          })
        }
      },
      fail(){
        reject({ status: 'error', msg: '翻译失败' })
        wx.showToast({
          title: '翻译失败',
          icon: 'none'
        })
      }
    })
  })
 
}
module.exports.translate = translate
