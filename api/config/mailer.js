'use strict';

const nodemailer = require('nodemailer');

const bunyan = require('bunyan');

let logger = bunyan.createLogger({
  name: 'nodemailer'  
});
logger.level('trace');

module.exports = nodemailer.createTransport(
  {
    host: "smtp-mail.outlook.com",
    secureConnection: false,
    port: 587,
    tls: {
      ciphers: 'SSLv3'
    },
    auth: {
      user: 'themerchantshop@hotmail.com',
      pass: 'Merchant2022'
    }
  },
  {
    from: 'The Merchant Shop <themerchantshop@hotmail.com>',
    headers: {}
  }
);

