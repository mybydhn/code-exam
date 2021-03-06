const nodemailer = require('nodemailer');

const send = (to, title, body) => {

  return new Promise( (resolve, reject) => {

    const transporter = nodemailer.createTransport({
      host : 'smtp.mxhichina.com',
      port: 465, // SMTP 端口
      secureConnection: true, // 使用 SSL
      auth: {
        user: 'art@weavinghorse.com',
        //这里密码不是qq密码，是你设置的smtp密码
        pass: process.env.EMAIL_PASSWD
      }
    })

    const mailOptions = {
      from: 'art@weavinghorse.com', // 发件地址
      to: to, // 收件列表
      subject: title, // 标题
      //text和html两者只支持一种
      text: title, // 标题
      html: body // html 内容
    };

    transporter.sendMail(mailOptions, function(error, response){
      if(error){
        console.log("main send fail")
        reject(error)
      }else{
        console.log("Message sent: " + response.message);
        resolve(true)
      }
      transporter.close(); // 如果没用，关闭连接池
    });
  })

}

const TPL_REG = (activation_code) => {
  return `
        <p>您好！</p>
        <p>&nbsp;&nbsp;您的算法课程帐号需要激活。</p>
        <p>&nbsp;&nbsp;请去<a href="http://www.weavinghorse.test/activation?code=${activation_code}">点击此处激活</a></p>
        <p>谢谢！</p>
`
}

const TPL_FORGET = (activation_code) => {
  return `
        <p>您好！</p>
        <p>&nbsp;&nbsp;您的在（<a http://www.weavinghorse.com>Weaving Horse程序之路</a>)申请了找回密码。</p>
        <p>&nbsp;&nbsp;请前往Weaving Horse完成密码重置:<a href="http://www.weavinghorse.com/reset?code=${activation_code}">点击此处前往重置</a></p>
        <p>谢谢！</p>
`
}


module.exports = {
  send,
  TPL_REG,
  TPL_FORGET
}
