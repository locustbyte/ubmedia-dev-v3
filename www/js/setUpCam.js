var setUpCamTimer;
var URL;
var img;
var canvas;
var ctx;
var url;
var getX;
var getY;
var getWidth;
var getHeight;
var deviceWidth;
var ratioY;
var ratioX;
var imgW;
var imgH;
var firstpass = 0;
var jcrop_api;
var imageCal;
var context;
var canvasToThumb;

var $reset      = $('#resetbtn');
var $vintage    = $('#vintage');
var $lomo      = $('#lomo');
var $clarity   = $('#clarity');
var $sinCity      = $('#sinCity');
var $sunrise       = $('#sunrise');
var $crossProcess       = $('#crossProcess');
var $orangePeel       = $('#orangePeel');
var $love       = $('#love');
var $grungy       = $('#grungy');
var $jarques       = $('#jarques');
var $pinhole       = $('#pinhole');
var $oldBoot       = $('#oldBoot');
var $glowingSun       = $('#glowingSun');
var $hazyDays       = $('#hazyDays');

function setupButtons(){
  $('#inputImage').on( "mousedown", function( event ) {
      handleFiles(event)
    });
}

function setUpCam() {
  console.log("called")
    URL = window.webkitURL || window.URL;
    img = new Image();
    canvas=document.getElementById('maincanvas');
    ctx= canvas.getContext('2d');
    
    $('#inputImage').on( "mousedown", function( event ) {
      handleFiles(event)
    });

    var input = document.getElementById('inputImage');
    input.addEventListener('change', handleFiles, false);
    console.log('adding interaction');

    if ( $("#canvasToThumb").attr('src') == '' || $("#canvasToThumb").attr('src') == undefined ) {
      $('#capture-button').removeClass('capOn');
    } else {
      $('#capture-button').addClass('capOn')
    }

    $('#inputImage').on( "mousedown", function( event ) {
      handleFiles($(this))
    });

    // $("#filters li a").click(function(){
    //   Caman('#maincanvas', img.src, function(){
    //     this.render();
    //   })
    // })


// http://stackoverflow.com/a/6722031/477958

      
}

function loadUpCaman(imgsrc){



console.log(imgsrc)
console.log('caman up')

$reset      = $('#resetbtn');
$vintage    = $('#vintage');
$lomo      = $('#lomo');
$clarity   = $('#clarity');
$sinCity      = $('#sinCity');
$sunrise       = $('#sunrise');
$crossProcess       = $('#crossProcess');
$orangePeel       = $('#orangePeel');
$love       = $('#love');
$grungy       = $('#grungy');
$jarques       = $('#jarques');
$pinhole       = $('#pinhole');
$oldBoot       = $('#oldBoot');
$glowingSun       = $('#glowingSun');
$hazyDays       = $('#hazyDays');
//var canvas = $('#maincanvas');
//var ctx    = canvas[0].getContext("2d");


// var $herMajesty       = $('#herMajesty');
// var $nostalgia  = $('#nostalgia');
// var $hemingway       = $('#hemingway');
// var $concentrate       = $('#concentrate');

$reset.on('click', function(e){
  e.preventDefault();
  var img = new Image();
  img.src = img.src;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  ctx.drawImage(img, 0, 0);
  Caman('#maincanvas', img.src, function(){
    this.revert(false);
    this.render();
  });
});

$vintage.on('click', function(e){
  e.preventDefault();

  Caman('#maincanvas', img.src, function(){
    this.revert(false);
    
    this.greyscale();
    this.contrast(5);
    this.noise(3);
    this.sepia(100);
    this.channels({
      red: 8,
      blue: 2,
      green: 4
    });
    this.gamma(0.87);
    this.render(function(){
      // some callback function after rendering
    });
  });
});

$lomo.on('click', function(e){
  e.preventDefault();
  Caman('#maincanvas', img.src, function(){
    this.revert(false);

    this.brightness(15);
    this.exposure(15);
    this.curves('rgb', [0, 0], [200, 0], [155, 255], [255, 255]);
    this.saturation(-20);
    this.gamma(1.8);
    this.render(function(){
      
      
    });
  });
});

$clarity.on('click', function(e){
  e.preventDefault();
  Caman('#maincanvas', img.src, function(){
    this.revert(false);

    this.vibrance(20);
    this.curves('rgb', [5, 0], [130, 150], [190, 220], [250, 255]);
    this.render();
  });
});

$sinCity.on('click', function(e){
  e.preventDefault();
  Caman('#maincanvas', img.src, function(){
    this.revert(false);

    this.contrast(100);
    this.brightness(15);
    this.exposure(10);
    this.clip(30);
    this.greyscale();
    this.render();
  });
});

$sunrise.on('click', function(e){
  e.preventDefault();
  Caman('#maincanvas', img.src, function(){
    this.revert(false);

    this.exposure(3.5);
    this.saturation(-5);
    this.vibrance(50);
    this.sepia(60);
    this.colorize("#e87b22", 10);
    this.channels({
      red: 8,
      blue: 8
    });
    this.contrast(5);
    this.gamma(1.2);
    // alternative syntax
    // this.colorize(60, 105, 218, 10);
    this.render();
  });
});

$crossProcess.on('click', function(e){
  e.preventDefault();
  Caman('#maincanvas', img.src, function(){
    this.revert(false);

    this.exposure(5);
    this.colorize("#e87b22", 4);
    this.sepia(20);
    this.channels({
      blue: 8,
      red: 3
    });
    this.curves('b', [0, 0], [100, 150], [180, 180], [255, 255]);
    this.contrast(15);
    this.vibrance(75);
    this.render();
  });
});

$orangePeel.on('click', function(e){
  e.preventDefault();
  Caman('#maincanvas', img.src, function(){
    this.revert(false);

    this.curves('rgb', [0, 0], [100, 50], [140, 200], [255, 255]);
    this.vibrance(-30);
    this.saturation(-30);
    this.colorize('#ff9000', 30);
    this.contrast(-5);
    this.render();
  });
});

$love.on('click', function(e){
  e.preventDefault();
  Caman('#maincanvas', img.src, function(){
    this.revert(false);

    this.brightness(5);
    this.exposure(8);
    this.contrast(4);
    this.colorize('#c42007', 30);
    this.vibrance(50);
    this.render();
  });
});

$grungy.on('click', function(e){
  e.preventDefault();
  Caman('#maincanvas', img.src, function(){
    this.revert(false);

    this.gamma(1.5);
    this.clip(25);
    this.saturation(-60);
    this.contrast(5);
    this.noise(5);
    this.render();
  });
});

$jarques.on('click', function(e){
  e.preventDefault();
  Caman('#maincanvas', img.src, function(){
    this.revert(false);

    this.saturation(-35);
    this.curves('b', [20, 0], [90, 120], [186, 144], [255, 230]);
    this.curves('r', [0, 0], [144, 90], [138, 120], [255, 255]);
    this.curves('g', [10, 0], [115, 105], [148, 100], [255, 248]);
    this.curves('rgb', [0, 0], [120, 100], [128, 140], [255, 255]);
    this.render();
  });
});

$pinhole.on('click', function(e){
  e.preventDefault();
  Caman('#maincanvas', img.src, function(){
    this.revert(false);

    this.greyscale();
    this.sepia(10);
    this.exposure(10);
    this.contrast(15);
    this.render();
  });
});

$oldBoot.on('click', function(e){
  e.preventDefault();
  Caman('#maincanvas', img.src, function(){
    this.revert(false);

    this.saturation(-20);
    this.vibrance(-50);
    this.gamma(1.1);
    this.sepia(30);
    this.channels({
      red: -10,
      blue: 5
    });
    this.curves('rgb', [0, 0], [80, 50], [128, 230], [255, 255]);
    this.render();
  });
});

$glowingSun.on('click', function(e){
  e.preventDefault();
  Caman('#maincanvas', img.src, function(){
    this.revert(false);

    this.gamma(0.8);
    this.contrast(50);
    this.render();
  });
});





$reset.click()

}
function handleFiles(e) {
  console.log(e)
  $('#maincanvas').removeClass("hide")
  //setUpCam();
  //console.log('called')
    url = URL.createObjectURL(e.target.files[0]);
    console.log(url)
    
    img.onload = function() {
      //console.log('now')
      var canvas = ctx.canvas ;
      var hRatio = canvas.width  / img.width    ;
      var vRatio =  canvas.width / img.width  ;
      var ratio  = Math.min ( hRatio, vRatio );
      var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
      var centerShift_y = ( canvas.width - img.width*ratio ) / 2;  


      imageCal = new Image();
      imageCal.id = "pic"
      imageCal.src = canvas.toDataURL();
      //console.log(imageCal.src)
      $('#canvasToThumb').attr('src',img.src);
      $('#canvasToThumb').next().find('img').attr('src',img.src);
      $('#maincanvas').css({
        "position": "absolute",
        "top": "0px",
        "width": $(window).width(),
        "height": $(window).width()
      })

      $('#maincanvas').css({
        "height":'auto',
        "margin-top": "-20%"
      })

      // $('#filters li a').css({
      //   "background": "url('"+img.src+"')",
      //   "background-size": "100%",
      //   "background-position-y": "center"
      // })
      console.log(img.src)

      //loadUpCaman(img.src)
      //$("#filterContainer").removeClass("hide")

      // $(".jcrop-holder").width( $(window).width() )
      // $(".jcrop-holder").height( $(window).width() )
       
       //croppit();
        if ( $("#canvasToThumb").attr('src') == '' || $("#canvasToThumb").attr('src') == undefined || $("#canvasToThumb").attr('src') == null ) {
          $('#capture-button').removeClass('capOn');
          $('.record-view').addClass("active-recording")
          $('.scroll-content').css("background-color","inherit")
        } else {
          $('#capture-button').addClass('capOn')
          $('.record-view').removeClass("active-recording")
          $('.scroll-content').css("background-color","black")
        }

       $('.frame-square').css("width", $(window).width() ).css("height",$(window).width())
       $('.filters').removeClass("hide")

      


      ctx.clearRect(0,0,canvas.width, canvas.height);
      ctx.drawImage(img, 0,0, img.width, img.height,centerShift_x,centerShift_y,img.width*ratio, 'auto');  
    }
    img.src = url;
    
}



function gearUpCam() {
    setUpCamTimer = setTimeout(setupButtons, 3000);
}