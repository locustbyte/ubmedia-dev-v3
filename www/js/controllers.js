angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.listView = true;
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('startCtrl', function($scope, $stateParams, $ionicSlideBoxDelegate, $http, getCategories, $localStorage, $state) {
  
  //lets grab some categories
  // var tan = {};

  //   google.load("feeds", "1");

  //   function initialize() {
  //     var feed = new google.feeds.Feed("http://www.theguardian.com/technology/apple/rss");
  //     feed.setNumEntries(100);
  //     feed.setResultFormat(google.feeds.Feed.JSON_FORMAT);
  //     feed.load(function(result) {
  //       if (!result.error) {
  //         // alert(result)
  //         var i = 0;
  //         tan = result.feed.entries;
  //         console.log(tan);
  //         var jsonObj = [];
  //         for( i = 0; i<tan.length; i++){
  //             jsonObj.push(tan[i].categories);
  //         }
  //         console.log(jsonObj);
  //         var fullCategories = [].concat.apply([], jsonObj);
  //         console.log(fullCategories);

  //         var container = document.getElementById("feed");
  //         for ( i = 0; i < result.feed.entries.length; i++) {
  //           var entry = result.feed.entries[i];
  //           var div = document.createElement("div");
  //           div.appendChild(document.createTextNode(entry.title));
  //           container.appendChild(div);
  //         }
  //       }
  //     });
  //   }
  //   google.setOnLoadCallback(initialize);

  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.getIn = function() {
    $state.go('tab.record');
  };

  $http.get('http://www.youbmedia.com/php/getCategories.php').success(function(response){ //make a get request to mock json file.
      $scope.items = response; //Assign data received to $scope.data
      console.log(response);
      catItems = response;
  })
  .error(function(err){
      //handle error
  });

  $scope.clicked = function (member) {

    // console.log(member);
      var index = catSelected.indexOf(member);
      if (index > -1) {
          catSelected.splice(index, 1);
          member.selected = false;
          //console.log(catSelected);
      } else {
          catSelected.push(member);
          member.selected = true;

          $scope.$storage = $localStorage.$default({
            x: catSelected
          });
          console.log(catSelected);
      }

      if ( catSelected.length > 0 ) {
        $ionicSlideBoxDelegate.enableSlide( true );
      } else {
        $ionicSlideBoxDelegate.enableSlide( false );
        showAddCat();
      }
  };

})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.listView = false;
})


.controller('LoginCtrl', function(store, $scope, $location, auth) {
  $scope.login = function() {
    auth.signin({
      authParams: {
        scope: 'openid offline_access',
        device: 'Mobile device'
      }
    }, function(profile, token, accessToken, state, refreshToken) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      store.set('refreshToken', refreshToken);
      $location.path('/');
    }, function() {
      // Error callback
    });
  };
})

.controller('UserInfoCtrl', function($scope, auth) {
  $scope.auth = auth;
})

.controller('TabsCtrl', function($scope, $rootScope, $state, auth) {
  $scope.startCapture = function(){
    $state.go('tab.record');
    $rootScope.grabImage();

  };
})




////// RECORD CONTROLLER //////
.controller('RecordCtrl', function($scope, $rootScope, $timeout) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.uploadFile = function(){
      var camNewsActionFile = event.target.files
      var filename = event.target.files[0].name;
      // alert('file was selected: ' + filename);
      

      var file = $("#mask-load-file")[0].files[0];

      if (file) {

          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function(e) {
              // browser completed reading file - display it
              //alert(e.target.result);
              console.log(e.target.result)

              if (camNewsActionFile[0].type == "image/png" || camNewsActionFile[0].type == "image/jpg" || camNewsActionFile[0].type == "image/jpeg") {
                $rootScope.$apply(function () {               // 3
                  $rootScope.mediaCheck = 'image';
                });
                console.log($rootScope.mediaCheck)
                $(".mediaActionImageStore").attr("src",e.target.result);
                $(".controlPrompt").addClass("active");
              } else {
                $rootScope.$apply(function () {               // 3
                  $rootScope.mediaCheck = 'video';
                });
                console.log("video")
                $("#mediaActionVideoStore").attr("src",e.target.result)
                $(".controlPrompt").addClass("active");
              }

              
          };

          

            
            


      

          


     
          // var image=$('#mediaActionImageStore');

          // image.cropper({
          //     aspectRatio: 1 / 1,
          //     background:false,
          //     guides: false,
          //     highlight: false,
          //     dragCrop: false,
          //     movable: false,
          //     resizable: false,
          //     mouseWheelZoom: false,
          //     touchDragZomm:false,
          //     autoCrop: true,
          //     built: function () {
          //       //alert(1);
          //       // $(this).cropper('setData', 0, 0, 675, 1080,90);
          //       // $(this).cropper('setCropBoxData', 0, 0, 1920, 1080);
          //       image.cropper('setCanvasData', {top: 0, left: 0, width: 100, height: 100});
          //       //                $image.cropper('setCropBoxData', 0, 0, 50, 50);
          //       image.cropper("setCropBoxData", { top: 0, left: 0, width: 150, height: 150 });

          //     }
          // });

         
      }

      // if (camNewsActionFile[0].type == "image/png" || camNewsActionFile[0].type == "image/jpg" || camNewsActionFile[0].type == "image/jpeg") {
      //       console.log("image")
      //       setTimeout(function() {


      //         var canvas = 0;
      //         theCropImage = $('#mediaActionImageStore'),
      //             $dataRotate = $('#dataRotate'),
      //             options = {
      //                 // modal: true,
      //                 // guides: true,
      //                 autoCrop: true,
      //                 // dragCrop: true,
      //                 aspectRatio: 1 / 1,
      //                 // movable: true,
      //                 resizable: true,
      //                 zoomable: true,
      //                 // touchDragZoom: false,
      //                 // mouseWheelZoom: false,
      //                 // viewMode: 3,
      //                 autoCropArea: 0.5,
      //                 preview: '.preview',
      //                 crop: function(data) {
      //                     $dataRotate.val(Math.round(data.rotate));
      //                 },
      //                 built: function () {
      //                   theCropImage.cropper('move', 1),
      //                   theCropImage.cropper('setCanvasData', {
      //                     left: 0,
      //                     top: 0, 
      //                     width: window.innerWidth,
      //                     height: window.innerWidth
      //                   }),
      //                   theCropImage.cropper('setCropBoxData', {
      //                     left: 0, 
      //                     top: 0, 
      //                     width: 400,
      //                     height: 400
      //                   }),

      //                   theCropPreview = $(".preview"),
      //                   width = theCropPreview.width()

      //                 }
      //             };

      //         theCropPreview = $(".preview"),
      //             width = theCropPreview.width();

      //         theCropImage.cropper(options);
      //         $(document.body).on('click', '[data-method]', function() {
      //             var data = $(this).data(),
      //                 $target = 0,
      //                 result;

      //             if (data.method) {
      //                 data = $.extend({}, data); // Clone a new one

      //                 if (typeof data.target !== 'undefined') {
      //                     $target = $(data.target);

      //                     if (typeof data.option === 'undefined') {
      //                         try {
      //                             data.option = JSON.parse($target.val());
      //                         } catch (e) {
      //                             console.log(e.message);
      //                         }
      //                     }
      //                 }

      //                 result = theCropImage.cropper(data.method, data.option);
      //                 if (data.method === 'getCroppedCanvas') {
      //                     canvas = result;
      //                     $('#mediaActionImageFiltered').html(result);
      //                 }

      //                 if ($.isPlainObject(result) && $target) {
      //                     try {
      //                         $target.val(JSON.stringify(result));
      //                     } catch (e) {
      //                         console.log(e.message);
      //                     }
      //                 }

      //             }
      //         });

      //       //   console.log("hidi")
      //       // //(function() {
      //       //     var canvas = 0;
      //       //     var $image = $('#mediaActionImageStore'),
      //       //         $dataRotate = $('#dataRotate'),
      //       //         options = {
      //       //             modal: true,
      //       //             guides: true,
      //       //             aspectRatio: 1 / 1,
      //       //             autoCrop: false,
      //       //             dragCrop: true,
      //       //             movable: true,
      //       //             resizable: true,
      //       //             zoomable: false,
      //       //             touchDragZoom: false,
      //       //             mouseWheelZoom: false,
      //       //             viewMode: 3,
      //       //             checkOrientation: 1,
      //       //             rotatable: true,
      //       //             preview: '.preview',
      //       //             crop: function(data) {
      //       //                 $dataRotate.val(Math.round(data.rotate));
      //       //             },
      //       //             built: function () {
      //       //               // this.cropper[method](argument1, , argument2, ..., argumentN);
      //       //               $image.on().cropper({move: 1});
      //       //               $image.on().cropper.setCropBoxData({
      //       //                 width: window.innerWidth - 40,
      //       //                 left: 20,  
      //       //                 top: 20
      //       //               });

      //       //               // Allows chain composition
      //       //               //this.cropper.move(1, -1).rotate(45).scale(1, -1);
      //       //             }
      //       //         };

                

      //       //     $("#sendToServer").click(function() {
      //       //         var croppedImageBase64 = canvas.toDataURL();
      //       //         var mainImage = $('img[alt="mainImage"]').attr('src');
      //       //         $.ajax({
      //       //             url: 'ImageServlet',
      //       //             type: 'POST',
      //       //             data: { mainImage: mainImage, croppedImage: croppedImageBase64 },
      //       //             error: function() {

      //       //             },
      //       //             success: function(data) {

      //       //             }
      //       //         });
      //       //     });



      //           //this.zone.run(() => {
      //               //this.startImageCrop;
      //           //});
      //         // $('#image').cropper({
      //         //   aspectRatio: 16 / 9,
      //         //   crop: function(e) {
      //         //     // Output the result data for cropping image.
      //         //     console.log(e.x);
      //         //     console.log(e.y);
      //         //     console.log(e.width);
      //         //     console.log(e.height);
      //         //     console.log(e.rotate);
      //         //     console.log(e.scaleX);
      //         //     console.log(e.scaleY);
      //         //   }
      //         // });

                  // theCropImage = $('#mediaActionImageStore');
                  // theCropImage.cropper({
                  //   aspectRatio: 1 / 1,
                  //   preview: ".preview",
                  //   viewMode: 3,
                  //   checkOrientation: 1,
                  //   rotatable: true,
                  //   crop: function (data) {
                  //     $dataRotate.val(Math.round(data.rotate));
                  //   },
                  //   built: function () {
                  //     theCropImage.cropper('move', 1);
                  //     theCropImage.cropper('setCanvasData', 0, 0, 1920, 1080);

                  //     theCropPreview = $(".preview"),
                  //     width = theCropPreview.width();

                  //   }

                  // });

      //             // $(document.body).on('click', '[data-method]', function() {
      //             //     var data = $(this).data(),
      //             //         $target = 0,
      //             //         result;

      //             //     if (data.method) {
      //             //         data = $.extend({}, data); // Clone a new one

      //             //         if (typeof data.target !== 'undefined') {
      //             //             $target = $(data.target);

      //             //             if (typeof data.option === 'undefined') {
      //             //                 try {
      //             //                     data.option = JSON.parse($target.val());
      //             //                 } catch (e) {
      //             //                     console.log(e.message);
      //             //                 }
      //             //             }
      //             //         }

      //             //         result = theCropImage.cropper(data.method, data.option);
      //             //         if (data.method === 'getCroppedCanvas') {
      //             //             canvas = result;
      //             //             $('#croppedImage').html(result);
      //             //         }

      //             //         if ($.isPlainObject(result) && $target) {
      //             //             try {
      //             //                 $target.val(JSON.stringify(result));
      //             //             } catch (e) {
      //             //                 console.log(e.message);
      //             //             }
      //             //         }

      //             //     }
      //             // });

      //       }, 2000);
      //       // cropper.move(1);

      //       this.isVideo = false;
      //   } else {
      //       this.isVideo = true;
      //   }

  };

  angular.element(document).ready(function () {
            
    

  })

  $scope.$on('$ionicView.loaded', function(){
    //setTimeout(setUpCam(), 2000);
  });

  
})

////// SEARCH CONTROLLER //////
.controller('SearchCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  function SelectCtrl($scope) {
    $scope.selectedIcon = '';
    $scope.selectedIcons = ['Globe', 'Heart'];
    $scope.icons = [
      {value: 'Gear', label: '<i class="fa fa-gear m-r-sm"></i> Gear'},
      {value: 'Globe', label: '<i class="fa fa-globe m-r-sm"></i> Globe'},
      {value: 'Heart', label: '<i class="fa fa-heart m-r-sm"></i> Heart'},
      {value: 'Camera', label: '<i class="fa fa-camera m-r-sm"></i> Camera'}
    ];

    $scope.selectedMonth = 0;
    $scope.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
})

////// ACTIVITY CONTROLLER //////
.controller('ActivityCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});