var express = require('express');
var icu = require('../bin/pinyin');

var app = express();

app.get('/pinyin/:src', function(req, res){
  res.set({
       'Access-Control-Allow-origin' : '*',
       'Access-Control-Allow-Headers' : 'X-Requested-With',
       'Access-Control-Allow-Methods' : 'GET'
   }) ;

  console.log("req in , param is " + req.params.src);
  var pinyin = icu.transliterate(req.params.src)
  res.send(pinyin);
  console.log("res is " + pinyin);
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}