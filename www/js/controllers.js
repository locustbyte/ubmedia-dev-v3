angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, $ionicLoading, pouchBindingSimple, pouchCollection, $sce, $ionicScrollDelegate, $ionicSlideBoxDelegate) {
    
    $scope.show = function() {
        $ionicLoading.show({
            //template: '<div class="load"><div class="dot"></div><div class="outline"><span></span></div></div>',
            template: '<div class="loader"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>',
            duration: 220000
        }).then(function(){
            console.log("The loading indicator is now displayed");
        });
    };
    $scope.hide = function(){
        $ionicLoading.hide().then(function(){
            console.log("The loading indicator is now hidden");
        });
    };
    $scope.show()
    $ionicSlideBoxDelegate.update();
    $scope.onUserDetailContentScroll = onUserDetailContentScroll
    $scope.like = like

    $scope.slideHasChanged = function(index){
        $ionicScrollDelegate.scrollTop({"shouldAnimate": true});
    }
    function like(){
        $scope.liked = true
    }

    function onUserDetailContentScroll(){
        var scrollDelegate = $ionicScrollDelegate.$getByHandle('userDetailContent');
        var scrollView = scrollDelegate.getScrollView();
        $scope.$broadcast('userDetailContent.scroll', scrollView);
    }
    vm = $scope
    $scope.listView = true;

    $scope.item = {};

    $scope.items = [];

    

    var dbLocal = new PouchDB('ubmedia-mediadb');
    var dbRemote = new PouchDB('http://localhost:5984/ubmedia-mediadb');

    dbLocal.allDocs({
      include_docs: true
    }).then(function (result) {
        //console.log('re var dbLocal = new s is',result.rows);
        for(var i=0;i<result.rows.length;i++){
            //console.log(result.rows[i].doc)
            var obj = result.rows[i].doc
            $scope.items.push(obj);
            $scope.$apply();
        }
        console.log($scope.items)
        //console.log($scope.items);
    }).catch(function (err) {
      console.log(err);
    });

    
    dbLocal.replicate.to(dbRemote,{live:true},function(err){
        console.log(err);
    });
    

    $scope.viewStory = function(story) {
        console.log(story)
    }

    angular.element(document).ready(function () {
             $scope.hide();
          });
    $scope.$on("$ionicView.loaded", function(event, data){
       // handle event
       //$ionicLoading.hide();
    });


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

.controller('imageController', function($scope, $cordovaCamera, $cordovaFile) {
        // 1
        $scope.images = [];

        $scope.addImage = function() {
            // 2
            var options = {
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA, // Camera.PictureSourceType.PHOTOLIBRARY
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                popoverOptions: CameraPopoverOptions,
            };

            // 3
            $cordovaCamera.getPicture(options).then(function(imageData) {

                // 4
                onImageSuccess(imageData);

                function onImageSuccess(fileURI) {
                    createFileEntry(fileURI);
                }

                function createFileEntry(fileURI) {
                    window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
                }

                // 5
                function copyFile(fileEntry) {
                    var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
                    var newName = makeid() + name;

                    window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
                            fileEntry.copyTo(
                                fileSystem2,
                                newName,
                                onCopySuccess,
                                fail
                            );
                        },
                        fail);
                }

                // 6
                function onCopySuccess(entry) {
                    $scope.$apply(function() {
                        $scope.images.push(entry.nativeURL);
                    });
                }

                function fail(error) {
                    console.log("fail: " + error.code);
                }

                function makeid() {
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                    for (var i = 0; i < 5; i++) {
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    }
                    return text;
                }

            }, function(err) {
                console.log(err);
            });
        }
    })
    .controller('startCtrl', function($scope, $rootScope, $stateParams, $ionicSlideBoxDelegate, $http, getCategories, $localStorage, $state) {

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

        



        // $rootScope.remoteCategoriesDB.query('fetchCategories').then(function(result) {
        //  $scope.items = result.rows;
        //  console.log($scope.items)
        // });






        //   $rootScope.localCategoriesDB.put(designDoc).then(function (info) {
        //  // design doc created
        // }).catch(function (err) {
        //   // if err.name === 'conflict', then
        //   // design doc already exists
        // });

        // $rootScope.remoteCategoriesDB.allDocs({
        //   include_docs: true,
        //   attachments: true
        // }).then(function (result) {
        //   console.log(result.rows)
        //   $scope.items = result.rows
        //   catItems = result.rows
        // }).catch(function (err) {
        //   console.log(err);
        // });

        // $http.get('http://www.youbmedia.com/php/getCategories.php').success(function(response){ //make a get request to mock json file.
        //     $scope.items = response; //Assign data received to $scope.data
        //     console.log(response);
        //     catItems = response;
        // })
        // .error(function(err){
        //     //handle error
        // });

        $scope.clicked = function(member) {

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

            if (catSelected.length > 0) {
                $ionicSlideBoxDelegate.enableSlide(true);
            } else {
                $ionicSlideBoxDelegate.enableSlide(false);
                showAddCat();
            }

            var userSelectedCategory = {
                "_id": new Date().valueOf().toString(),
                "CategoryName": catSelected[0].key
            };
            $rootScope.localCategoriesDB.put(userSelectedCategory).then(function() {
                console.log(catSelected);
            });
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
    $scope.startCapture = function() {
        $state.go('tab.record');
        $rootScope.grabImage();

    };
})


// .controller('App', function($scope, pouchBindingSimple, pouchCollection) {
//     $scope.books = pouchCollection('books');
//     $scope.userInfo = {
//     firstName: 'Jo', lastName: 'Bloggs'
//   };
//   pouchBindingSimple('user-info', $scope, 'userInfo');

//   $scope.online = false;
//   $scope.toggleOnline = function() {
//     $scope.online = !$scope.online;
//     if ($scope.online) {  // Read http://pouchdb.com/api.html#sync
//       $scope.sync =  $scope.books.$db.replicate.sync('http://127.0.0.1:5984/books', {live: true})
//         .on('error', function (err) {
//           console.log("Syncing stopped");
//           $scope.online = false;
//           console.log(err);
//         });
//     } else {
//       $scope.sync.cancel();
//     }
//   };
// })


////// RECORD CONTROLLER //////
.controller('RecordCtrl', function($scope, $http, $rootScope, $timeout, $state, $ionicModal, $sessionStorage, $ionicSlideBoxDelegate, $cordovaGeolocation, pouchBindingSimple, pouchCollection) {

    vm = $scope;
    //GEO Location for post
    vm.lat = undefined;
    vm.long = undefined;
    vm.address = undefined;
    var posOptions = { timeout: 20000, enableHighAccuracy: true }
    $cordovaGeolocation.getCurrentPosition(posOptions)
        .then(function(position) {
            vm.lat = position.coords.latitude
            vm.long = position.coords.longitude
            console.log('lat', vm.lat);
            console.log('long', vm.long);

            //now get address
            $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=51.4855489,-0.3394781&key=AIzaSyBjo19dIlVDEx1Lx2_vH5l8WvU_DQM36PI")
                .then(function(response) {
                    vm.address = response.data.results[4].formatted_address;
                });
        }, function(error) {
            console.log('error:', error);
        });



    vm.currentSlide = 0;
    vm.theNewPostInfo = newPost = {
        newPost: {
            mediaType: '',
            mediaURL: '',
            title: '',
            summary: '',
            story: ''
        }
    };

    console.log(vm.theNewPostInfo)

    // var getNextNewID = $http({
    //     method: "post",
    //     //url: window.location.href + "php/test.php",
    //     url: "http://nonsecure.teststuff.local/ubmedia-php/news_getNextID.php",
    //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    // });

    // // var startNewNewsItem = $http({
    // //     method: "post",
    // //     //url: window.location.href + "php/test.php",
    // //     url: "http://nonsecure.teststuff.local/ubmedia-php/news_getNextID.php",
    // //     data: $.param({'title' : "this"}),
    // //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    // // });

    // getNextNewID.success(function (data) {

    //     $sessionStorage.nextNewsID = data.nextID;
    //     console.log($sessionStorage.nextNewsID);

    // });

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });


    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
        // Execute action
    });

    $scope.slideHasChanged = function(index) {
        console.log(index)
        vm.currentSlide = $ionicSlideBoxDelegate.currentIndex();
        console.log(vm.currentSlide)
    }

    $scope.saveDetails = function() {

        var newsData = { "title": $("#news_title").val(), "summary": $("#news_summary").val(), "story": $("#news_detail").val() }

        newPost.newPost.title = $("#news_title").val();
        newPost.newPost.summary = $("#news_summary").val();
        newPost.newPost.story = $("#news_detail").val();

        $rootScope.infoCheck = true;

        console.log(vm.theNewPostInfo)

        $ionicSlideBoxDelegate.next();
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

    $scope.fileUpload = function() {



    }



    $scope.publishNewsItem = function() {

        $scope.newsItem = pouchCollection('ubmedia-mediadb');
        $scope.newsItem.$add({
            mediaType: vm.theNewPostInfo.newPost.mediaType,
            mediaURL: vm.theNewPostInfo.newPost.mediaURL,
            title: vm.theNewPostInfo.newPost.title,
            summary: vm.theNewPostInfo.newPost.summary,
            story: vm.theNewPostInfo.newPost.story,
            latitude: vm.lat,
            longitude: vm.long,
            location: vm.address
        })

        //
        // IMPORTANT CODE STARTS HERE
        //
        // var inputFile = document.querySelector('#mask-load-file');
        // var imageMetaData = document.querySelector('#img_meta_data');
        // var getFile;



        // getFile = inputFile.files[0];
        // // getFile is now a Blob

        // // Destroy the database before doing anything, because I want 
        // // you to see the same thing if you reload.
        // // Ignore the man behind the curtain!
        // //
        // // IMPORTANT CODE STARTS HERE
        // //
        // $rootScope.localMediaDB.put({
        //   _id: 'image3', 
        //   mediaType: vm.theNewPostInfo.newPost.mediaType,
        //   mediaURL: vm.theNewPostInfo.newPost.mediaURL,
        //   title: vm.theNewPostInfo.newPost.title,
        //   summary: vm.theNewPostInfo.newPost.summary,
        //   story: vm.theNewPostInfo.newPost.story,
        //   latitude: vm.lat,
        //   longitude: vm.long,
        //   location: vm.address,
        //   _attachments: {
        //     "file": {
        //       type: getFile.type,
        //       data: getFile
        //     }
        //   }
        // }).then(function () {
        //   return $rootScope.localMediaDB.getAttachment('image3', 'file');
        // }).then(function (blob) {
        //   var url = URL.createObjectURL(blob);
        //   var img = document.createElement('img');
        //   img.src = url;
        //   document.body.appendChild(img);

        //   var fileSize = JSON.stringify(Math.floor(blob.size/1024));
        //   var contentType = JSON.stringify(blob.type);

        //  // imageMetaData.innerText = 'Filesize: ' + fileSize + 'KB, Content-Type: ' + contentType;
        // }).catch(function (err) {
        //   console.log(err);
        // });
        //
        // IMPORTANT CODE ENDS HERE
        //



        // $rootScope.localMediaDB.put(newMedia).then(function() {
        //     $state.go('tab.dash');
        // });

        //sync media dbs
        $rootScope.localMediaDB.sync($rootScope.remoteMediaDB, {
            live: true,
            retry: true
        }).on('change', function(change) {
            console.log("yo, something changed!")
        }).on('paused', function(info) {
            // replication was paused, usually because of a lost connection
        }).on('active', function(info) {
            // replication was resumed
        }).on('error', function(err) {
            // totally unhandled error (shouldn't happen)
        });
    }

    $scope.uploadFile = function() {


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


                if (camNewsActionFile[0].type == "image/png" || camNewsActionFile[0].type == "image/jpg" || camNewsActionFile[0].type == "image/jpeg") {
                    $rootScope.$apply(function() { // 3
                        $rootScope.mediaCheck = 'image';
                    });

                    $(".mediaActionImageStore").attr("src", e.target.result);
                    $(".slider-slide").addClass("active");
                    $(".shadow, .typeImage").css("width", $(window).width());
                    $(".shadow, .typeImage").css("height", $(window).width());
                    vm.theNewPostInfo.newPost.mediaType = "Image";
                    vm.theNewPostInfo.newPost.mediaURL = e.target.result;
                    $ionicSlideBoxDelegate.next();

                } else {
                    $rootScope.$apply(function() { // 3
                        $rootScope.mediaCheck = 'video';
                    });
                    $("#mediaActionVideoStore").attr("src", e.target.result)
                    $(".slider-slide").addClass("active");
                    vm.theNewPostInfo.newPost.mediaType = "Video";
                    vm.theNewPostInfo.newPost.mediaURL = e.target.result;
                    $ionicSlideBoxDelegate.next();

                }


            };

        }

    };

    angular.element(document).ready(function() {



    })

    $scope.$on('$ionicView.loaded', function() {

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
            { value: 'Gear', label: '<i class="fa fa-gear m-r-sm"></i> Gear' },
            { value: 'Globe', label: '<i class="fa fa-globe m-r-sm"></i> Globe' },
            { value: 'Heart', label: '<i class="fa fa-heart m-r-sm"></i> Heart' },
            { value: 'Camera', label: '<i class="fa fa-camera m-r-sm"></i> Camera' }
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