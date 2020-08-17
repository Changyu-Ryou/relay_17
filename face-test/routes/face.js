const express = require('express');
const router = express.Router();
const request = require('request');
const multer = require('multer');
const upload = multer({ dest: __dirname })
const fs = require('fs');

const headers = {
  'Content-Type' : 'multipart/form-data', 
  'X-NCP-APIGW-API-KEY-ID' : 'voaskj42xf',
  'X-NCP-APIGW-API-KEY' : 'ptjOnLbK48L6HO3Ynjsd02UIOjRuDpVq1113iTZ8'
};

const faceApiUrl = 'https://naveropenapi.apigw.ntruss.com/vision/v1/face';

router.post('/', upload.single('image'), function(req, res) {
  const imgStream = fs.createReadStream(req.file.path);
  const _req =
  request.post(
    {
      url:faceApiUrl, 
      formData: {image : imgStream}, 
      headers : headers
    }).on('response', function(response) {
      console.log(response.statusCode) // 200
      console.log(response.headers['content-type'])
    }).pipe(res);
});

module.exports = router;
