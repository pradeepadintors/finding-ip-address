var express = require('express');
var router = express.Router();
const axios = require('axios');
const proxyAddr = require('proxy-addr');
const useragent = require('express-useragent');
const geoip = require('geoip-lite');


router.use(useragent.express());




router.get('/ip_add', async(req, res) => {
  const Data = await axios.get('https://ipapi.co/json');
  res.send({
    ip_address: Data.data.ip,
    country_name: Data.data.country_name,
    country_Code: Data.data.country_code
  });
});



router.get('/api/ip', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  res.json({ ip });
});

router.get('/login', (req, res) => {
  // Extract user agent information from the request
  const userAgent = req.useragent;

  // Get browser and device information
  const browser = userAgent.browser;
  const device = userAgent.platform;

  // Get the client's IP address
  const ip = req.ip;

  // Use the IP address to determine the location
  const geo = geoip.lookup(ip);
  const location = geo ? `${geo.city}, ${geo.country}` : 'Unknown';

  // Store the information in a database or any other storage mechanism
  // For simplicity, we'll just log the information to the console here
  const lastLoginTime = new Date();
  console.log(`Browser: ${browser} on ${device}`);
  console.log(`Location: ${location}`);
  console.log(`Last Login Time: ${lastLoginTime}`);

  // Send a response back to the client
  res.send('Login successful!');
});

module.exports = router;
