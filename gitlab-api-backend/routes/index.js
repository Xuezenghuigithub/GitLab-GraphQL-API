var express = require('express');
var router = express.Router();
const rp = require('request-promise');

const APP_ID = "cc808af84f3e3f42e997f953a0e1a7c64056307336be4bf7cb3aeeb22262446d";
const SECRET = "7deff313e01caee09ca60aca99009cabe9b1b32d456d983a0eddc939dc0c0095";
const REDIRECT_URI = "http://localhost:8080/data";
const STATE = "Zander";
const SCOPE = "api";
const url = "https://git.belstar.com.cn/oauth/token";

/* GET 授权 URL */
router.get('/codeRequestUrl', (req, res) => {
  if (req.query.state !== STATE) {
    return res.json({
      status: 501,
      msg: "非法访问"
    });
  }

  const url = `https://git.belstar.com.cn/oauth/authorize?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${req.query.state}&scope=${SCOPE}`
  res.json({
    status: 200,
    result: url
  })
})


router.post('/token', async (req, res) => {
  const code = req.body.code;
  const bodyData = {
    client_id: APP_ID,
    client_secret: SECRET,
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URI
  }
  const options = {
    url: url,
    method: "POST",
    headers: { //设置请求头
      "content-type": "application/json",
    },
    body: bodyData,
    json: true
  }
  rp(options)
    .then(data => {
      return res.json({
        status: 200,
        result: data
      });
    })
    .catch(err => {
      return res.json({
        status: 501,
        msg: err.message || '请求出错'
      })
    })
});

module.exports = router;