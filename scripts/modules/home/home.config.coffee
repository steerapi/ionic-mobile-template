"use strict"

# Setting up route
angular.module("app").config [
  "$stateProvider"
  "$urlRouterProvider"
  ($stateProvider, $urlRouterProvider) ->
    
    # Ionic uses AngularUI Router which uses the concept of states
    # Learn more here: https://github.com/angular-ui/ui-router
    # Set up the various states which the app can be in.
    # Each state's controller can be found in controllers.js

    # setup an abstract state for the tabs directive

    # Each tab has its own nav history stack:
    $stateProvider.state("home",
      url: "/home"
      views:
        "main-view":
          templateUrl: "templates/home/views/home.html"
          controller: "HomeCtrl"
    )

    return
]