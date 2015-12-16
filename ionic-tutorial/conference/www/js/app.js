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
              pic: 'http://ioconf.herokuapp.com/pics/jasonweathersby.jpeg', 
              votes: 0, 
              comments: [
                { title: 'Hope can attend!' }, 
                { title: 'Do I need to bring my laptop? Thank you for covering such an interesting topic!'}
              ]
            }, 
            { 
              id: 2, 
              title: 'Apps installing channels on TVs', 
              description: 'TV Input Framework enables your app to install channels on TVs that blend in seamlessly with traditional linear channels. This talk will cover an overview of creating an TV input plugin inside your app and best practices for handling media playback, program guide, overlay, setup and more. We will also present upcoming changes in the framework and new features.', 
              time: '6:00 PM - 6:30 PM', 
              speaker: 'Jae Seo', 
              pic: 'http://ioconf.herokuapp.com/pics/mwbrooks.jpeg', 
              votes: 0, 
              comments: []
            }, 
            { 
              id: 3, 
              title: 'Fingerprint and Payments APIs', 
              description: 'Numerous new APIs for app payments and fingerprint integration are being introduced in M. This will enable enhanced UX and security for retail payments, banking and online purchasing. We will also have partners integrated with these new capabilities that we want to highlight at IO.', 
              time: '7:00 PM - 7:30 PM', 
              speaker: 'Maya Ben-Ari', 
              pic: 'http://ioconf.herokuapp.com/pics/joe_bowser.jpg', 
              votes: 0, 
              comments: []
            }, 
            { 
              id: 4, 
              title: 'Growing games with Google', 
              description: 'The games industry has never been more promising and full of opportunities. In addition to consoles, PC, and browser gaming, as well as phone and tablet games, there are emerging fields including virtual reality and mobile games in the living room. This talk covers how Google is helping developers across this broad range of platforms.', 
              time: '8:00 PM - 9:00 PM', 
              speaker: 'Nathan Camarillo', 
              pic: 'http://ioconf.herokuapp.com/pics/christophe.jpg', 
              votes: 0, 
              comments: []
            }, 
            { 
              id: 5, 
              title: 'Mobilizing the Maps Data APIs', 
              description: 'Geo web services let developers create compelling location based apps on mobile, such as snapping your car’s location to roads, auto-completing an address, or displaying directions from A to B on a map. This talk will tackle several challenges that developers face in working with web services for mobile, in particular key security, how to share context between different APIs and conserving battery life.', 
              time: '7:30 PM - 8:00 PM', 
              speaker: 'Elena Kelareva', 
              pic: 'http://ioconf.herokuapp.com/pics/holly.jpg', 
              votes: 0, 
              comments: []
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
  $urlRouterProvider.otherwise('/app/sessions');
});
