angular.module('starter.controllers', ['ngOpenFB'])


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

.controller('SessionsCtrl', function($scope, SessionService, $ionicModal) {
  $scope.sessions = SessionService.getSessions();
  
  // array list which will contain the items added
  //$scope.toDoListItems = [];
  
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
    $scope.sessions.push({
      id: 6,
      title: data.title,
      description: data.description, 
      speaker: data.speaker, 
      time: data.time, 
      pic: 'http://ioconf.herokuapp.com/pics/mwbrooks.jpeg', 
      votes: 0, 
      comments: []
    });
    data.title = '';
    //data.description = '';
    data.speaker = '';
    data.time = '';
    $scope.closeModal();
  };
})

.controller('SessionCtrl', function($scope, $stateParams, SessionService, ngFB, $ionicModal) {
  $scope.session = SessionService.getSession($stateParams.id);
  
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
          alert('The session was shared on Facebook');
      },
      function () {
          alert('An error occurred while sharing this session on Facebook');
      });
  };
  
  $scope.vote = function (event) {
    console.log('voting...');
    
    $scope.session.votes++;
    
    console.log('votes: ' + $scope.session.votes);
  };
  
  //function to add comments to the existing list
  $scope.comment = function (data) {
    console.log('commenting...');
    console.log(data.title);
    
    $scope.session.comments.push({
      title: data.title
    });
    data.title = '';
    $scope.closeModal();
    
    console.log($scope.session.comments);
  };
})

.controller('ProfileCtrl', function ($scope, ngFB) {
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
});