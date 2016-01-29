angular.module('starter.controllers', ['ngOpenFB', 'ngMap', 'ngCordova'])


.controller('AppCtrl', function($scope, $ionicModal, $timeout, ngFB) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  $scope.fbLogin = function () {
    ngFB.login({scope: 'email,publish_actions'}).then(
      function (response) {
        if (response.status === 'connected') {
            console.log('Facebook login succeeded');
            $scope.closeLogin();
        } else {
            alert('Facebook login failed');
        }
      });
  };
})

.controller('SpeakersCtrl', function($scope, SpeakersService, ngFB) {
  $scope.speakers = SpeakersService.getSpeakers();
})

.controller('SessionsCtrl', function($scope, SessionsService, $ionicModal, ngFB) {
  $scope.sessions = SessionsService.getSessions();
  
  ngFB.api({
      path: '/me',
      params: {fields: 'id,name'}
  }).then(
    function (user) {
        $scope.user = user;
    },
    function (error) {
        alert('Facebook error: ' + error.error_description);
    });
    
  //init the modal
  $ionicModal.fromTemplateUrl('templates/newSession.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  
  // function to open the modal
  $scope.openModal = function () {
    $scope.modal.show();
  };
  
  // function to close the modal
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
  
  //function to add items to the existing list
  $scope.AddItem = function (data) {
    $scope.sessions.$add({
      title: data.title,
      description: data.description, 
      speaker: $scope.user.name, 
      time: data.time, 
      pic: 'http://graph.facebook.com/' + $scope.user.id + '/picture?width=100&height=100', 
      votes: 0, 
      comments: {}
    });
    data.title = '';
    data.speaker = '';
    data.time = '';
    $scope.closeModal();
  };
})

.controller('SessionCtrl', function($scope, $stateParams, SessionsService, ngFB, $ionicModal, $ionicPopup) {
  $scope.session = SessionsService.getSession($stateParams.id);
  
  // An alert dialog
  $scope.showAlert = function(message) {
   var alertPopup = $ionicPopup.alert({
     title: 'Message',
     template: message
   });
   alertPopup.then(function(res) {
     console.log(message);
   });
  };

  //init the modal
  $ionicModal.fromTemplateUrl('templates/newComment.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal;
  });
  
  // function to open the modal
  $scope.openModal = function () {
    $scope.modal.show();
  };
  
  // function to close the modal
  $scope.closeModal = function () {
    $scope.modal.hide();
  };
  
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });
  
  $scope.share = function (event) {
    console.log('sharing...');
    ngFB.api({
      method: 'POST',
      path: '/me/feed',
      params: {
          message: "I'll be attending: '" + $scope.session.title + "' by " +
          $scope.session.speaker
      }
    }).then(
      function () {
          $scope.showAlert('The session was shared on Facebook');
      },
      function () {
          $scope.showAlert('An error occurred while sharing this session on Facebook');
      });
  };
  
  $scope.vote = function (event) {
    $scope.session.votes++;
    var result = SessionsService.vote($stateParams.id, $scope.session.votes);
    
    $scope.showAlert('Thank you for voting!');
  };
  
  //function to add comments to the existing list
  $scope.comment = function (data) {
    console.log('commenting...');
    console.log(data.title);
    
    //FIX HERE
    if ($scope.session.comments) {
      //$scope.session
    }
    else
    {
      $scope.session.comments.$add({
        title: data.title
      });
    }
    data.title = '';
    $scope.closeModal();
    
    console.log($scope.session.comments);
  };
})

.controller('ProfileCtrl', function ($scope, ngFB, $ionicPlatform, $cordovaGeolocation) {
  
    // Getting FB profile info
    ngFB.api({
        path: '/me',
        params: {fields: 'id,name'}
    }).then(
      function (user) {
          $scope.user = user;
      },
      function (error) {
          alert('Facebook error: ' + error.error_description);
      });
      
      
// Show Current Location on a Map
    $ionicPlatform.ready(function() {
    
      $scope.$on('mapInitialized', function(event, map) {
        $scope.map = map;
      });
      
      $scope.positions = [];

      var posOptions = {
            enableHighAccuracy: false,
            timeout: 50000,
            maximumAge: 0
        };
          
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        $scope.positions.push({lat: pos.k,lng: pos.B});
        
        // Set map position
        $scope.map.setCenter(pos);
        $scope.map.setZoom(14);
        
        var marker = new google.maps.Marker({
          position: pos,
          map: $scope.map,
          title: 'You are here!'
        });
        
      });
    })
})

.controller('EventCtrl', function ($scope, $stateParams, EventService, ngFB, $ionicModal, $ionicLoading, $compile) {
    $scope.event = EventService.getEvent($stateParams.id);
    
    $scope.share = function (event) {
      ngFB.api({
        method: 'POST',
        path: '/me/feed',
        params: {
            message: "I'll be attending: '" + $scope.event.title + "' at " +
            $scope.event.place + "' on " + $scope.event.date
        }
      }).then(
        function () {
            alert('The event was shared on Facebook');
        },
        function () {
            alert('An error occurred while sharing this event on Facebook');
        });
    };
})