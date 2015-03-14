"use strict"

ApplicationConfiguration = require "./config"

#Start by defining the main module and adding the module dependencies
window.app = angular.module ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies

# Setting HTML5 Location Mode
window.app
.run [
  "$ionicPlatform"
  "$cordovaKeyboard"
  "$cordovaStatusbar"
  ($ionicPlatform,$cordovaKeyboard, $cordovaStatusbar) ->
    $ionicPlatform.ready ->
      if cordova?.plugins?
        $cordovaKeyboard.hideAccessoryBar true
        $cordovaKeyboard.disableScroll true
        $cordovaStatusbar.style(1);
      return
    return
]
.config [
  "$locationProvider"
  "localStorageServiceProvider"
  "$urlRouterProvider"
  ($locationProvider,localStorageServiceProvider,$urlRouterProvider) ->
    
    $urlRouterProvider.otherwise "home"
]

window.app
.run (localStorageService,$state)->
  
  return

# inject:controllers

require "./modules/home/home.controller.coffee"

require "./modules/home/home.config.coffee"

# endinject


#Then define the init function for starting up the application
angular.element(document).ready ->
  
  #Fixing facebook bug with redirect
  # window.location.hash = "#!"  if window.location.hash is "#_=_"
  
  #Then init the app
  
  angular.bootstrap document, [ApplicationConfiguration.applicationModuleName]
  
  return