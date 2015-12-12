// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngOpenFB'])

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

.factory('SessionService', function() {
  var sessions = [
            { 
              id: 1, 
              title: 'Gaming on Android TV', 
              description: 'Android is in the living room, through Android TV. Players are finding that their familiar consumer electronics devices, from cable boxes, to media players, to televisions, now give them easy access to great games. With the Nearby Connections API we introduced at GDC, developers can now bring second screen experiences to Android TV too. This talk discusses how to easily adapt games to Android TV.', 
              time: '5:00 PM - 5:30 PM', 
              speaker: 'Krispy Uccello', 
              votes: 0
            }, 
            { 
              id: 2, 
              title: 'Apps installing channels on TVs', 
              description: 'TV Input Framework enables your app to install channels on TVs that blend in seamlessly with traditional linear channels. This talk will cover an overview of creating an TV input plugin inside your app and best practices for handling media playback, program guide, overlay, setup and more. We will also present upcoming changes in the framework and new features.', 
              time: '6:00 PM - 6:30 PM', 
              speaker: 'Jae Seo', 
              votes: 0
            }, 
            { 
              id: 3, 
              title: 'Fingerprint and Payments APIs', 
              description: 'Numerous new APIs for app payments and fingerprint integration are being introduced in M. This will enable enhanced UX and security for retail payments, banking and online purchasing. We will also have partners integrated with these new capabilities that we want to highlight at IO.', 
              time: '7:00 PM - 7:30 PM', 
              speaker: 'Maya Ben-Ari', 
              votes: 0
            }, 
            { 
              id: 4, 
              title: 'Growing games with Google', 
              description: 'The games industry has never been more promising and full of opportunities. In addition to consoles, PC, and browser gaming, as well as phone and tablet games, there are emerging fields including virtual reality and mobile games in the living room. This talk covers how Google is helping developers across this broad range of platforms.', 
              time: '8:00 PM - 9:00 PM', 
              speaker: 'Nathan Camarillo', 
              votes: 0
            }, 
            { 
              id: 5, 
              title: 'Mobilizing the Maps Data APIs', 
              description: 'Geo web services let developers create compelling location based apps on mobile, such as snapping your car’s location to roads, auto-completing an address, or displaying directions from A to B on a map. This talk will tackle several challenges that developers face in working with web services for mobile, in particular key security, how to share context between different APIs and conserving battery life.', 
              time: '7:30 PM - 8:00 PM', 
              speaker: 'Elena Kelareva', 
              votes: 0
            }
        ];

	return {
		getSessions: function(){
      return sessions;
		},
		getSession: function(id){
			for(i=0;i<sessions.length;i++){
				if(sessions[i].id == id){
					return sessions[i];
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
          templateUrl: 'templates/speakers.html'
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
  $urlRouterProvider.otherwise('/app/sessions');
});
