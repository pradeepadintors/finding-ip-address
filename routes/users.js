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
  const ipAddress = req.connection.remoteAddress;
  res.json({ ipAddress });
    // dns.reverse(ipAddress, (err, hostnames) => {
    //   if (err) {
    //     console.error('Error retrieving hostname:', err);
    //     return;
    //   }
    //   if (hostnames.length > 0) {
    //     console.log("entered")
    //     const hostname = hostnames[0];
    //     res.send({
    //       ip_address: Data.data.ip,
    //       country_name: Data.data.country_name,
    //       country_Code: Data.data.country_code,
    //       region:Data.data.region,
    //       deviceName: hostname
    //     });
    //   } else {
    //     res.send({
    //       ip_address: ipAddress,
    //       country_name: Data.data.country_name,
    //       country_Code: Data.data.country_code,
    //       region:Data.data.region,
    //       deviceName: "unknown"
    //     });
    //   }
    // });
});



router.get('/api/ip', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.json({ ip });
});

module.exports = router;
