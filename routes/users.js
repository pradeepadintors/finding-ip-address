var express = require('express');
var router = express.Router();
const axios = require('axios');
const proxyAddr = require('proxy-addr');
const useragent = require('express-useragent');
const geoip = require('geoip-lite');
const dns = require('dns');


router.use(useragent.express());




router.get('/ip_add', async(req, res) => {
  // const Data = await axios.get('https://ipapi.co/json');
  // const ipAddress = Data.data.ip;
  const ipAddress =
    req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  // Extract the first private IP address from the list
  const privateIp =
    ipAddress && ipAddress.includes(',') ? ipAddress.split(',')[0] : ipAddress;
    dns.reverse(ipAddress, (err, hostnames) => {
      if (err) {
        console.error('Error retrieving hostname:', err);
        return;
      }
      if (hostnames.length > 0) {
        console.log("entered")
        const hostname = hostnames[0];
        res.send({
          ip_address:privateIp,
          deviceName: hostname
        });
      } else {
        res.send({
          ip_address:privateIp,
          deviceName: "unknown"
        });
      }
    });
});



router.get('/api/ip', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.json({ ip });
});

module.exports = router;
