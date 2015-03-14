"use strict"

Ctrl = require "../../ctrl.coffee"
async = require "async"
_ = require "lodash"

class HomeCtrl extends Ctrl
  @$inject: ['$scope', '$stateParams', '$state', "localStorageService"]
  constructor: (@scope, @stateParams, @state, @localStorageService) ->

angular.module('app').controller('HomeCtrl', HomeCtrl)
