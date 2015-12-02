angular.module('starter.services', ['ngResource'])

.factory('Session', function ($resource) {
    return $resource('http://boiling-temple-6174.herokuapp.com/sessions/:sessionId');
});