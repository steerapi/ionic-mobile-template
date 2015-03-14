"use strict"

# Init the application configuration module for AngularJS application
ApplicationConfiguration = (->
  
  # Init module configuration options
  applicationModuleName = "app"
  applicationModuleVendorDependencies = [
    "ionic"
    "LocalStorageModule"
    "angular.filter"
    "ngCordova"
  ]
  
  # Add a new vertical module
  registerModule = (moduleName, dependencies) ->
    
    # Create angular module
    angular.module moduleName, dependencies or []
    
    # Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push moduleName
    return

  applicationModuleName: applicationModuleName
  applicationModuleVendorDependencies: applicationModuleVendorDependencies
  registerModule: registerModule
)()

module.exports = ApplicationConfiguration