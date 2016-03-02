// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngOpenFB', 'firebase', 'ngMap'])

.run(function($ionicPlatform, ngFB) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    
    ngFB.init({appId: '461719550703347'});
    
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.factory("SessionsService", function($firebaseArray) {
  var url = "https://sweltering-fire-327.firebaseio.com/";
  var sessionsRef = new Firebase(url + "sessions");
  var sessions = $firebaseArray(sessionsRef);
  
  return {
		getSessions: function(){
      return sessions;
		},
		getSession: function(id){
		  return sessions.$getRecord(id);
		}, 
		vote: function(id, votes){
		  var ref = new Firebase(url + "sessions/" + id);
		  ref.update({
        votes: votes
      });
		}
	}
})

.factory('EventService', function($firebaseArray, $firebaseObject) {
  var url = "https://sweltering-fire-327.firebaseio.com/";
  var eventsRef = new Firebase(url + "events");
  var events = $firebaseArray(eventsRef);

	return {
		getEvents: function(){
      return events;
		},
		getEvent: function(id){
		  return $firebaseObject(eventsRef.child(id));
		}
	}
})

.factory('SpeakersService', function($firebaseArray) {
  var url = "https://sweltering-fire-327.firebaseio.com/";
  var speakersRef = new Firebase(url + "speakers");
  var speakers = $firebaseArray(speakersRef);

	return {
		getSpeakers: function(){
      return speakers;
		},
		getSpeaker: function(id){
		  return speakers.$getRecord(id);
		}
	}
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
  .state('app.home', {
      url: "/home",
      views: {
        'menuContent': {
          templateUrl: "templates/home.html"
        }
      }
    })
  
  .state('app.faq', {
    url: '/faq',
    views: {
      'menuContent': {
        templateUrl: 'templates/faq.html'
      }
    }
  })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.speakers', {
      url: '/speakers',
      views: {
        'menuContent': {
          templateUrl: 'templates/speakers.html', 
          controller: 'SpeakersCtrl'
        }
      }
    })
    .state('app.event', {
      url: '/events/:id',
      views: {
        'menuContent': {
          templateUrl: 'templates/event.html',
          controller: 'EventCtrl'
        }
      }
    })
    .state('app.sessions', {
      url: '/sessions',
      views: {
        'menuContent': {
          templateUrl: 'templates/sessions.html',
          controller: 'SessionsCtrl'
        }
      }
    })
    
    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent': {
          templateUrl: "templates/profile.html",
          controller: "ProfileCtrl"
        }
      }
    })

  .state('app.session', {
    url: '/sessions/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/session.html',
        controller: 'SessionCtrl'
      }
    }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
