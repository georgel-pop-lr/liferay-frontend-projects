!function(){var global={};global.__CONFIG__=window.__CONFIG__,function(e,t){"use strict";var n=t(e);"object"==typeof module&&module&&(module.exports=n),"function"==typeof define&&define.amd&&define(t),e.EventEmitter=n}("undefined"!=typeof global?global:this,function(e){"use strict";function t(){this._events={}}return t.prototype={constructor:t,on:function(e,t){var n=this._events[e]=this._events[e]||[];n.push(t)},off:function(e,t){var n=this._events[e];if(n){var o=n.indexOf(t);o>-1?n.splice(o,1):console.warn("Off: callback was not removed: "+t.toString())}else console.warn("Off: there are no listeners for event: "+e)},emit:function(e,t){var n=this._events[e];if(n){n=n.slice(0);for(var o=0;o<n.length;o++){var r=n[o];r.call(r,t)}}else console.warn("No listeners for event: "+e)}},t}),function(e,t){"use strict";var n=t(e);"object"==typeof module&&module&&(module.exports=n),"function"==typeof define&&define.amd&&define(t),e.ConfigParser=n}("undefined"!=typeof global?global:this,function(e){"use strict";function t(e){this._config={},this._modules={},this._conditionalModules={},this._parseConfig(e)}var n=Object.prototype.hasOwnProperty;return t.prototype={constructor:t,addModule:function(e){this._modules[e.name]=e,this._registerConditionalModule(e)},getConfig:function(){return this._config},getConditionalModules:function(){return this._conditionalModules},getModules:function(){return this._modules},_parseConfig:function(e){for(var t in e)n.call(e,t)&&("modules"===t?this._parseModules(e[t]):this._config[t]=e[t]);return this._config},_parseModules:function(e){for(var t in e)if(n.call(e,t)){var o=e[t];o.name=t,this.addModule(o)}return this._modules},_registerConditionalModule:function(e){if(e.condition){var t=this._conditionalModules[e.condition.trigger];t||(this._conditionalModules[e.condition.trigger]=t=[]),t.push(e.name)}}},t}),function(e,t){"use strict";var n=t(e);"object"==typeof module&&module&&(module.exports=n),"function"==typeof define&&define.amd&&define(t),e.DependencyBuilder=n}("undefined"!=typeof global?global:this,function(global){"use strict";function DependencyBuilder(e){this._configParser=e,this._result=[]}var hasOwnProperty=Object.prototype.hasOwnProperty;return DependencyBuilder.prototype={constructor:DependencyBuilder,resolveDependencies:function(e){this._queue=e.slice(0);var t;try{this._resolveDependencies(),t=this._result.reverse().slice(0)}finally{this._cleanup()}return t},_cleanup:function(){var e=this._configParser.getModules();for(var t in e)if(hasOwnProperty.call(e,t)){var n=e[t];n.conditionalMark=!1,n.mark=!1,n.tmpMark=!1}this._queue.length=0,this._result.length=0},_processConditionalModules:function(e){var t=this._configParser.getConditionalModules()[e.name];if(t&&!e.conditionalMark){for(var n=this._configParser.getModules(),o=0;o<t.length;o++){var r=n[t[o]];-1===this._queue.indexOf(r.name)&&this._testConditionalModule(r.condition.test)&&this._queue.push(r.name)}e.conditionalMark=!0}},_resolveDependencies:function(){for(var e=this._configParser.getModules(),t=0;t<this._queue.length;t++){var n=e[this._queue[t]];n.mark||this._visit(n)}},_testConditionalModule:function(testFunction){return"function"==typeof testFunction?testFunction():eval("false || "+testFunction)()},_visit:function(e){if(e.tmpMark)throw new Error("Error processing module: "+e.name+". The provided configuration is not Directed Acyclic Graph.");if(this._processConditionalModules(e),!e.mark){e.tmpMark=!0;for(var t=this._configParser.getModules(),n=0;n<e.dependencies.length;n++){var o=e.dependencies[n];if("exports"!==o){var r=t[o];if(!r)throw new Error("Cannot resolve module: "+e.name+" due to not yet registered or wrongly specified dependency: "+o);this._visit(r,t)}}e.mark=!0,e.tmpMark=!1,this._result.unshift(e.name)}},_queue:[]},DependencyBuilder}),function(e,t){"use strict";var n=t(e);"object"==typeof module&&module&&(module.exports=n),"function"==typeof define&&define.amd&&define(t),e.URLBuilder=n}("undefined"!=typeof global?global:this,function(e){"use strict";function t(e){this._configParser=e}var n=/^https?:\/\/|\/\/|www\./;return t.prototype={constructor:t,build:function(e){var t=[],o=[],r=this._configParser.getModules(),i=this._configParser.getConfig(),s=i.basePath;"/"!==s.charAt(s.length-1)&&(s+="/");for(var u=0;u<e.length;u++){var a=r[e[u]];if(a.fullPath)o.push(a.fullPath);else{var l=this._getModulePath(a);n.test(l)?o.push(l):i.combine?t.push(this._getModulePath(a)):o.push(i.url+s+l)}a.requested=!0}return t.length&&(o.push(i.url+s+t.join("&"+s)),t.length=0),o},_getModulePath:function(e){var t=e.path||e.name,o=this._configParser.getConfig().map;for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t=t.replace(new RegExp("(^|/)("+r+")($|/)","g"),"$1"+o[r]+"$3"));return n.test(t)||t.indexOf(".js")===t.length-3||(t+=".js"),t}},t}),function(e,t){"use strict";var n=t(e);"object"==typeof module&&module&&(module.exports=n),"function"==typeof define&&define.amd&&define(t),e.Loader=new n,e.require=e.Loader.require.bind(e.Loader),e.define=e.Loader.define.bind(e.Loader)}("undefined"!=typeof global?global:this,function(e){"use strict";function t(n){t.superclass.constructor.apply(this,arguments),this._config=n||e.__CONFIG__,this._modulesMap={}}function n(e,t,n){if(!t||!e)throw"extend failed, verify dependencies";var r=t.prototype,i=Object.create(r);return e.prototype=i,i.constructor=e,e.superclass=r,t!=Object&&r.constructor==Object.prototype.constructor&&(r.constructor=t),n&&o(i,n),e}function o(e,t){var n=Object.prototype.hasOwnProperty;for(var o in t)n.call(t,o)&&(e[o]=t[o]);return e}return n(t,e.EventEmitter,{define:function(e,t,n,o){var r=o||{};r.name=e,r.dependencies=t,r.pendingImplementation=n;var i=this._getConfigParser();i.addModule(r),this._modulesMap[r.name]||(this._modulesMap[r.name]=!0),this.emit("moduleRegister",r)},getConditionalModules:function(){return this._getConfigParser().getConditionalModules()},getModules:function(){return this._getConfigParser().getModules()},require:function(){var e,t,n,o=this,r=Array.isArray?Array.isArray(arguments[0]):"[object Array]"===Object.prototype.toString.call(arguments[0]);if(r)t=arguments[0],n="function"==typeof arguments[1]?arguments[1]:null,e="function"==typeof arguments[2]?arguments[2]:null;else{t=[];for(var i=0;i<arguments.length;++i)if("string"==typeof arguments[i])t[i]=arguments[i];else if("function"==typeof arguments[i]){n=arguments[i],e="function"==typeof arguments[++i]?arguments[i]:null;break}}o._resolveDependencies(t).then(function(e){return o._loadModules(e)}).then(function(e){var r=o._getModuleImplementations(t);n&&n.apply(n,r)},function(t){e&&e.call(e,t)})},_createModulePromise:function(e){var t=this;return new Promise(function(n,o){var r=function(o){o.name===e&&(t.off("moduleRegister",r),t._modulesMap[e]=!0,n(e))};t.on("moduleRegister",r)})},_getConfigParser:function(){return this._configParser||(this._configParser=new e.ConfigParser(this._config)),this._configParser},_getDependencyBuilder:function(){return this._dependencyBuilder||(this._dependencyBuilder=new e.DependencyBuilder(this._getConfigParser())),this._dependencyBuilder},_getModuleImplementations:function(e){for(var t=[],n=this._getConfigParser().getModules(),o=0;o<e.length;o++){var r=n[e[o]];t.push(r?r.implementation:void 0)}return t},_getURLBuilder:function(){return this._urlBuilder||(this._urlBuilder=new e.URLBuilder(this._getConfigParser())),this._urlBuilder},_filterNotRequestedModules:function(e){for(var t=[],n=this._getConfigParser().getModules(),o=0;o<e.length;o++){var r=n[e[o]];"exports"===r||r&&r.requested||t.push(e[o])}return t},_loadModules:function(e){var t=this;return new Promise(function(n,o){var r=t._filterNotRequestedModules(e);if(r.length){for(var i=t._getURLBuilder().build(r),s=[],u=0;u<i.length;u++)s.push(t._loadScript(i[u]));Promise.all(s).then(function(n){return t._waitForModules(e)}).then(function(e){n(e)})["catch"](function(e){o(e)})}else t._waitForModules(e).then(function(e){n(e)})["catch"](function(e){o(e)})})},_loadScript:function(e){return new Promise(function(t,n){var o=document.createElement("script");o.src=e,o.onload=o.onreadystatechange=function(){this.readyState&&"complete"!==this.readyState&&"load"!==this.readyState||(o.onload=o.onreadystatechange=null,t(o))},o.onerror=function(){document.body.removeChild(o),n(o)},document.body.appendChild(o)})},_resolveDependencies:function(e){var t=this;return new Promise(function(n,o){try{for(var r=t._getConfigParser().getModules(),i=[],s=0;s<e.length;s++)r[e[s]]&&i.push(e[s]);var u=t._getDependencyBuilder().resolveDependencies(i);n(u)}catch(a){o(a)}})},_setModuleImplementation:function(e){for(var t=this._getConfigParser().getModules(),n=0;n<e.length;n++){var o=e[n];if(!o.implementation){for(var r,i=[],s=0;s<o.dependencies.length;s++){var u,a=o.dependencies[s];if("exports"===a)r={},i.push(r);else{var l=t[a];u=l.implementation,i.push(u)}}var d=o.pendingImplementation.apply(o.pendingImplementation,i);o.implementation=d||r}}},_waitForModule:function(e){var t=this,n=t._modulesMap[e];return n||(n=t._createModulePromise(e),t._modulesMap[e]=n),n},_waitForModules:function(e){var t=this;return new Promise(function(n,o){for(var r=[],i=0;i<e.length;i++)r.push(t._waitForModule(e[i]));Promise.all(r).then(function(o){for(var r=t._getConfigParser().getModules(),i=[],s=0;s<e.length;s++)i.push(r[e[s]]);t._setModuleImplementation(i),n(i)})})}}),t}),window.Loader=global.Loader,window.require=global.require,window.define=global.define}();