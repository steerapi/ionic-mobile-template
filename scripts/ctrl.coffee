'use strict'

EventEmitter = require('events').EventEmitter
event = new EventEmitter()
_ = require "lodash"

class Ctrl
  @include: (obj) ->
    throw('include(obj) requires obj') unless obj
    for key, value of obj.prototype when key not in moduleKeywords
        @::[key] = value

    included = obj.included
    included.apply(this) if included
    @
  constructor: (@scope) ->    
    for k in _.functions @
      @scope[k] = @[k] if k!="constructor"
    @event = event
    @scope.$on "$destroy", =>
      @destroy()

module.exports = Ctrl