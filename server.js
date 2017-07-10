
var bodyParser = require('body-parser');

var port = 8080,
    express = require('express'),
    app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use('/',express.static(__dirname));
    app.listen(port);

    app.post('/cart/list',function(req,res){

      setTimeout(() => {

        res.send([{
          id:1001,
          img:'https://fuss10.elemecdn.com/8/ce/e734859b730d81d70aa61a554110cjpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/',
          name:'沙棘果汁',
          price:11
        },{
          id:1002,
          img:'https://fuss10.elemecdn.com/7/84/3743c2b620592e990a2d9a330ef93jpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/',
          name:'百事可乐',
          price:8
        },{
          id: 1003,
          img:'https://fuss10.elemecdn.com/3/8b/fdb7d1706a10fd25dc817e818640djpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/',
          name:'热豆浆',
          price:7
        },{
          id: 1004,
          img:'https://fuss10.elemecdn.com/1/2c/9263a39354f4974bfdb6a7bdcf9aajpeg.jpeg?imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/',
          name:'四季猪骨汤',
          price:14
        }])


      },800)

    })
console.log('Now Serving http://localhost:'+port+'/index.html');
