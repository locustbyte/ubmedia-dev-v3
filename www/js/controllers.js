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
    $state.go('tab.dash');
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
.controller('RecordCtrl', function($scope, $http, $rootScope, $timeout, $ionicModal, $sessionStorage) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.theNewPostInfo = [];

  
  var getNextNewID = $http({
      method: "post",
      //url: window.location.href + "php/test.php",
      url: "http://nonsecure.teststuff.local/ubmedia-php/news_getNextID.php",
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });

  // var startNewNewsItem = $http({
  //     method: "post",
  //     //url: window.location.href + "php/test.php",
  //     url: "http://nonsecure.teststuff.local/ubmedia-php/news_getNextID.php",
  //     data: $.param({'title' : "this"}),
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  // });

  getNextNewID.success(function (data) {
      
      $sessionStorage.nextNewsID = data.nextID;
      console.log($sessionStorage.nextNewsID);

  });

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.slideHasChanged = function(index){
    console.log(index)
  }

  $scope.saveDetails = function(){

    var newsData = {"title": $("#news_title").val(),"summary": $("#news_summary").val(), "detail": $("#news_detail").val()}

    $scope.theNewPostInfo.push({newsData})
    console.log($scope.theNewPostInfo)
    // var saveNewsPostInfo = $http({
    //     method: "post",
    //     //url: window.location.href + "php/test.php",
    //     url: "http://nonsecure.teststuff.local/ubmedia-php/news_saveNewStoryDetails.php",
    //     data: $.param({
    //       "id": $sessionStorage.nextNewsID,
    //       "title": $("#news_title").val(),
    //       "summary": $("#news_summary").val(),
    //       "detail": $("#news_detail").val()
    //     }),
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    // });

    // saveNewsPostInfo.success(function (data) {
        
    //     console.log(data);

    // });
  }
  $scope.createContact = function(u) {        
    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
    $scope.modal.hide();
  };

  $scope.publishNewsItem = function(){
    var saveNewsPostInfo = $http({
        method: "post",
        //url: window.location.href + "php/test.php",
        url: "http://nonsecure.teststuff.local/ubmedia-php/news_saveNewStoryDetails.php",
        data: $.param({
          "media": $("#news_title").val(),
          "media_Type": $("#news_title").val(),
          "title": $("#news_title").val(),
          "summary": $("#news_summary").val(),
          "detail": $("#news_detail").val()
        }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    saveNewsPostInfo.success(function (data) {
        
        console.log(data);

    });
  }

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
                $(".slider-slide").addClass("active");
                $scope.theNewPostInfo.themedia.push(e.target.result);
                console.log($scope.theNewPostInfo)
              } else {
                $rootScope.$apply(function () {               // 3
                  $rootScope.mediaCheck = 'video';
                });
                console.log("video")
                $("#mediaActionVideoStore").attr("src",e.target.result)
                $(".slider-slide").addClass("active");
                $scope.theNewPostInfo.themedia = e.target.result;
                console.log($scope.theNewPostInfo)
              }

              
          };

          

            
            


         
      }

      

  };

  angular.element(document).ready(function () {
            
    

  })

  $scope.$on('$ionicView.loaded', function(){
    
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