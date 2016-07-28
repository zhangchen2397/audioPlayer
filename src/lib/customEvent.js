import $ from './zepto.js';

/**
* Bind an event to an object instead of a DOM Node
```
$.bind(this,'event',function(){});
```
* @param {Object} object
* @param {String} event name
* @param {Function} function to execute
* @title $.bind(object,event,function);
*/
$.bind = function(obj, ev, f){
  if(!obj.__events) obj.__events = {};
  if(!$.isArray(ev)) ev = [ev];
  for(var i=0; i<ev.length; i++){
      if(!obj.__events[ev[i]]) obj.__events[ev[i]] = [];
      obj.__events[ev[i]].push(f);
  }
};

/**
* Trigger an event to an object instead of a DOM Node
```
$.trigger(this,'event',arguments);
```
* @param {Object} object
* @param {String} event name
* @param {Array} arguments
* @title $.trigger(object,event,argments);
*/
$.trigger = function(obj, ev, args){
  var ret = true;
  if(!obj.__events) return ret;
  if(!$.isArray(ev)) ev = [ev];
  if(!$.isArray(args)) args = [];
  for(var i=0; i<ev.length; i++){
      if(obj.__events[ev[i]]){
          var evts = obj.__events[ev[i]];
          for(var j = 0; j<evts.length; j++)
              if($.isFunction(evts[j]) && evts[j].apply(obj, args)===false)
                  ret = false;
      }
  }
  return ret;
};
/**
* Unbind an event to an object instead of a DOM Node
```
$.unbind(this,'event',function(){});
```
* @param {Object} object
* @param {String} event name
* @param {Function} function to execute
* @title $.unbind(object,event,function);
*/
$.unbind = function(obj, ev, f){
  if(!obj.__events) return ret;
  if(!$.isArray(ev)) ev = [ev];
  for(var i=0; i<ev.length; i++){
      if(obj.__events[ev[i]]){
          var evts = obj.__events[ev[i]];
          for(var j = 0; j<evts.length; j++){
              if(f==undefined)
                  delete evts[j];
              if(evts[j]==f) {
                  evts.splice(j,1);
                  break;
              }
          }
      }
  }
};