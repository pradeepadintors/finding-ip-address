var express = require('express');
var router = express.Router();
const proxyAddr = require('proxy-addr');
const useragent = require('express-useragent');
router.use(useragent.express());


router.get('/', (req, res) => {
  const deviceName = req.useragent.source;
  res.send(`Your device name is: ${deviceName}`);
});



// Custom middleware to get the client's IP address
router.use((req, res, next) => {
  const ipAddress = proxyAddr(req, 'uniquelocal');
  req.clientIP = ipAddress;
  next();
});

router.get('/ip_add', (req, res) => {
  const ipAddress = req.clientIP;
  res.send(`Your IP address is: ${ipAddress}`);
});



module.exports = router;
