var express = require('express');
var router = express.Router();
const proxyAddr = require('proxy-addr');
const useragent = require('express-useragent');
router.use(useragent.express());


router.get('/', (req, res) => {
  res.send(`redirect to /ip_add`);
});


router.get('/ip_add', (req, res) => {
  const ip = 
        request.headers['cf-connecting-ip'] ||  
        request.headers['x-real-ip'] ||
        request.headers['x-forwarded-for'] ||
        request.socket.remoteAddress || '';
  res.send(`Your IP address is: ${ip}`);
});



module.exports = router;
