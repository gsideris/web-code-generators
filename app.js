var html2jquery = require('html2jquery');
var js2coffee = require('js2coffee');
var html2jade = require('html2jade');


/*
 * Module dependencies
 */

var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')


var app = express()
app.use(express.bodyParser());
app.use(express.cookieParser());


function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

app.get('/', 
    function (req, res) {
        res.render('tools',
              { title : 'Home' }
        )
    })

app.get('/tools', 
    function (req, res) {
        res.render('tools',
              { title : 'Home' }
        )
    })


app.get('/html2jquery', 
    function (req, res) {
        res.render('html2jquery',
              { title : 'html2jquery' }
        )
    })
app.get('/js2coffee', 
    function (req, res) {
        res.render('js2coffee',
              { title : 'js2coffee' }
        )
    })

app.get('/dialog2coffee', 
    function (req, res) {
        res.render('dialog2coffee',
              { title : 'dialog2coffee' }
        )
    })

app.get('/html2coffee', 
    function (req, res) {
        res.render('html2coffee',
              { title : 'html2coffee' }
        )
    })

app.get('/brand2less', 
    function (req, res) {
        res.render('brand2less',
              { title : 'brand2less' }
        )
    })


app.get('/html2jade', 
    function (req, res) {
        res.render('html2jade',
              { title : 'html2jade' }
        )
    })

app.post('/html2jquery.do',
    function (req,res) { 
        var name = req.body.preText
        var jqCode = html2jquery(name);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ result : jqCode[0] }));
    })
    
app.post('/js2coffee.do',
    function (req,res) { 
        var name = req.body.preText
        coffee = js2coffee.build(name);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ result : coffee}));
    })
    
app.post('/dialog2coffee.do',
    function (req,res) { 
        var name = req.body.name
        var title= req.body.title
        var ok = req.body.ok

        var template = "<div class='modal fade' id='modal-container-" + name + "' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>  <div class='modal-dialog'><div class='modal-content'> <div class='modal-header'> <button type='button' class='close' data-dismiss='modal' aria-hidden='true'> × </button><h4 class='modal-title' id='myModalLabel'>" + title + "</h4></div> <div class='modal-body-" + name + "'></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary'>" + ok + "</button></div></div></div></div>";
        coffee = js2coffee.build( html2jquery(template)[0]);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ result : coffee}));
    })
    

app.post('/html2coffee.do',
    function (req,res) { 
        var name = req.body.preText

        coffee = js2coffee.build( html2jquery(name)[0]);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ result : coffee}));
    })
    
app.post('/brand2less.do',
    function (req,res) { 
        var brand = req.body.name;
        var color = req.body.color;

        var template = " @brand-" + brand + " : " + color + ";\n @btn-" + brand + "-color : white;\n @btn-" + brand + "-bg : @brand-" + brand + ";\n @btn-" + brand + "-border : darken(@btn-" + brand + "-bg, 5%);\n @state-" + brand + "-text : @brand-" + brand + ";\n @state-" + brand + "-bg : lighten(@brand-" + brand + ", 20%);\n @state-" + brand + "-border : darken(spin(@state-" + brand + "-bg, -10), 5%);\n @label-" + brand + "-bg : @brand-" + brand + ";\n @alert-" + brand + "-bg : @state-" + brand + "-bg;\n @alert-" + brand + "-text : @state-" + brand + "-text;\n @alert-" + brand + "-border : @state-" + brand + "-border;\n @progress-bar-" + brand + "-bg : @brand-" + brand + ";\n @panel-" + brand + "-text : @state-" + brand + "-text;\n @panel-" + brand + "-border : @state-" + brand + "-border;\n @panel-" + brand + "-heading-bg : @state-" + brand + "-bg;\n";

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ result : template}));
    })
    



app.listen(app.get('port'), function() {
  console.log('Running on port', app.get('port'));
});
