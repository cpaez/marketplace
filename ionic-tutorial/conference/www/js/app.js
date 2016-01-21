// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngOpenFB', 'firebase'])

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
  var sessionsRef = new Firebase("https://sweltering-fire-327.firebaseio.com/sessions");
  var sessions = $firebaseArray(sessionsRef);
  
  return {
		getSessions: function(){
      return sessions;
		},
		getSession: function(id){
		  return sessions.$getRecord(id);
		}
	}
})

.factory('EventService', function() {
  var events = [
            { 
              id: 1, 
              title: 'Google I/O', 
              description: 'Google I/O 2015 brings together developers for an immersive, two-day experience focused on exploring the next generation of technology, mobile and beyond.', 
              date: 'May 28 - 29, 2016', 
              place: 'Moscone Center West, San Francisco, CA', 
              pic: 'http://phandroid.s3.amazonaws.com/wp-content/uploads/2013/02/google-io-2013-logo.png'
            }
        ];

	return {
		getEvents: function(){
      return events;
		},
		getEvent: function(id){
			for(i=0;i<events.length;i++){
				if(events[i].id == id){
					return events[i];
				}
			}
			return null;
		}
	}
})

.factory('SpeakersService', function() {
  var speakers = [
            { 
              id: 1, 
              name: 'Krispy Uccello', 
              country: 'United States',
              pic: 'http://ioconf.herokuapp.com/pics/jasonweathersby.jpeg'
            }, 
            { 
              id: 2, 
              name: 'Jae Seo', 
              country: 'United Kingdom',
              pic: 'http://ioconf.herokuapp.com/pics/mwbrooks.jpeg'
            }, 
            { 
              id: 3, 
              name: 'Maya Ben-Ari', 
              country: 'Ireland',
              pic: 'http://ioconf.herokuapp.com/pics/joe_bowser.jpg', 
            }, 
            { 
              id: 4, 
              name: 'Nathan Camarillo', 
              country: 'France',
              pic: 'http://ioconf.herokuapp.com/pics/christophe.jpg', 
            },
        ];

	return {
		getSpeakers: function(){
      return speakers;
		},
		getSpeaker: function(id){
			for(i=0;i<speakers.length;i++){
				if(speakers[i].id == id){
					return speakers[i];
				}
			}
			return null;
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
