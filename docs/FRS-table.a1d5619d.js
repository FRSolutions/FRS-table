// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire     = typeof require === 'function' && require;

  function newRequire (name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err  = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire (x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve (x) {
      return modules[name][1][x] || x;
    }
  }

  function Module (moduleName) {
    this.id      = moduleName;
    this.bundle  = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module          = Module;
  newRequire.modules         = modules;
  newRequire.cache           = cache;
  newRequire.parent          = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({
  11                                                                      : [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });

    var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' :
             typeof obj;
    };

    exports.noop                 = noop;
    exports.extendIfUndefined    = extendIfUndefined;
    exports.emptyElement         = emptyElement;
    exports.attachEvents         = attachEvents;
    exports.attachEvent          = attachEvent;
    exports.deattachEvents       = deattachEvents;
    exports.deattachEvent        = deattachEvent;
    exports.elementHandleStyling = elementHandleStyling;

    function noop () {
    };

    function extendIfUndefined (_obj, _obj2) {
      var prop;

      for (prop in _obj2) {
        var objProp  = _obj[prop],
            obj2Prop = _obj2[prop];

        if (!objProp) {
          _obj[prop] = obj2Prop;

          continue;
        }

        if ((typeof objProp === 'undefined' ? 'undefined' : _typeof(objProp)) === 'object') {
          if (objProp instanceof window.Array) {
            continue;
          }

          extendIfUndefined(objProp, obj2Prop);
        }
      }

      return _obj;
    }

    function emptyElement (_element) {
      _element.childNodes.forEach(_element.removeChild);
    }

    function attachEvents (_el, _events) {
      if (!_events) {
        return false;
      }

      for (var event in _events) {
        var eventObj = _events[event];

        for (var i = 0, len = eventObj.length; i < len; ++i) {
          attachEvent(_el, event, eventObj[i]);
        }
      }

      return _el;
    }

    function attachEvent (_el, _event, _eventObj) {
      _el.addEventHandler(_event, _eventObj.handler, _eventObj.options);
    }

    function deattachEvents (_el, _events) {
      if (!_events) {
        return false;
      }

      for (var event in _events) {
        var eventObj = _events[event];

        for (var i = 0, len = eventObj.length; i < len; ++i) {
          deattachEvent(_el, event, eventObj[i]);
        }
      }
    }

    function deattachEvent (_el, _event, _eventObj) {
      _el.removeEventHandler(_event, _eventObj.handler);
    }

    function elementHandleStyling (_el, _options) {
      extendIfUndefined(_el.style, _options.style);

      if (_options.class) {
        _el.classList.add(_options.class);
      }

      return _el;
    }
  }, {}], 12                                                              : [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports.default = Box;

    var _Utils = require('./Utils.js');

    Box.place    = place;
    Box.generate = generate;

//

    function Box (_window, _cfg, _options) {
    }

    function place (_el, _options) {
      var _cfg = this._internal;

      var column = _cfg.content.element.getElementsByClassName(_cfg.column.class)[_options.x];

      column.insertAdjacentElement('afterbegin', _el);

      var rows       = column.getElementsByClassName(_cfg.row.class);
      var sizeFactor = 100 / rows.length;

      _el.style.top    = _options.y * sizeFactor + '%';
      _el.style.height = _options.size * sizeFactor + '%';

      return _el;
    }

    function generate (_options) {
      var cfg = this._internal;
      var box = window.document.createElement('div');
      box.classList.add(cfg.box.class);

      box.innerHTML  = _options.html;
      _options.style = (0, _Utils.extendIfUndefined)(_options.style || {}, cfg.box.style);

      return (0, _Utils.elementHandleStyling)(box, _options);
    }
  }, {'./Utils.js': 11}], 13                                              : [function (require, module, exports) {
    'use strict';

    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    exports.table         = table;
    exports.stickyContent = stickyContent;
    exports.stickyInner   = stickyInner;
    exports.content       = content;
    exports.header        = header;
    exports.column        = column;
    exports.row           = row;

    var _Utils = require('./Utils');

    var Utils = _interopRequireWildcard(_Utils);

    function _interopRequireWildcard (obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              newObj[key] = obj[key];
            }
          }
        }
        newObj.default = obj;
        return newObj;
      }
    }

    function table (_cfg) {
      var calendar = _cfg.outer.element = _cfg.outer.element || window.document.createElement('div');

      calendar.classList.add(_cfg.outer.class);

      calendar.insertAdjacentElement('afterbegin', content(_cfg));
      calendar.insertAdjacentElement('afterbegin', stickyContent(_cfg));
      calendar.insertAdjacentElement('afterbegin', header(_cfg));

      return calendar;
    }

    function stickyContent (_cfg) {
      var sticky = window.document.querySelector(_cfg.sticky.class);

      if (sticky === null) {
        sticky = window.document.createElement('div');
        sticky.classList.add(_cfg.sticky.class);
      } else {
        Utils.emptyElement(sticky);
      }

      _cfg.sticky.element = sticky;

      var stickyInnerEl = stickyInner(_cfg);

      sticky.appendChild(stickyInnerEl);

      for (var i = 0, len = _cfg.column.data.length; i < len; ++i) {
        if (_cfg.column.data[i].sticky !== true) {
          continue;
        }
        var columnEl = column(_cfg, _cfg.column.data[i].row);
        columnEl.classList.add(_cfg.column.class + '-' + (i + 1));

        stickyInnerEl.appendChild(columnEl);
      }

      return sticky;
    }

    function stickyInner (_cfg) {
      var stickyInnerEl = window.document.querySelector(_cfg.sticky.inner.class);

      if (stickyInnerEl === null) {
        stickyInnerEl = window.document.createElement('div');

        stickyInnerEl.classList.add(_cfg.sticky.inner.class);
      } else {
        Utils.emptyElement(stickyInnerEl);
      }

      _cfg.sticky.inner.element = stickyInnerEl;

      return stickyInnerEl;
    }

    function content (_cfg) {
      var content = window.document.querySelector(_cfg.content.class);

      if (content === null) {
        content = window.document.createElement('div');

        content.classList.add(_cfg.content.class);
      } else {
        Utils.emptyElement(content);
      }

      _cfg.content.element = content;

      for (var i = 0, len = _cfg.column.data.length; i < len; ++i) {
        if (_cfg.column.data[i].sticky === true) {
          continue;
        }
        var columnEl = column(_cfg, _cfg.column.data[i].row);
        columnEl.classList.add(_cfg.column.class + '-' + (i + 1));

        content.appendChild(columnEl);
      }

      Utils.attachEvents(content, _cfg.content.events);

      return content;
    }

    function header (_cfg) {
      var header = window.document.querySelector(_cfg.header.class);

      if (header === null) {
        header = window.document.createElement('div');

        header.classList.add(_cfg.header.class);
      } else {
        Utils.emptyElement(header);
      }

      _cfg.header.element = header;

      for (var i = 0, len = _cfg.column.data.length; i < len; ++i) {
        var columnEl = column(_cfg, [_cfg.column.data[i].label]);
        columnEl.classList.add(_cfg.column.class + '-' + (i + 1));

        header.appendChild(columnEl);
      }

      return header;
    }

    function column (_cfg, _rows) {
      var columnEl = window.document.createElement('div');
      columnEl.classList.add(_cfg.column.class);

      for (var i = 0, len = _rows.length; i < len; ++i) {
        if (_rows[i] === void 0) {
          continue;
        }
        var rowEl = row(_cfg, _rows[i]);
        rowEl.classList.add(_cfg.row.class + '-' + (i + 1));

        columnEl.appendChild(rowEl);
      }

      return columnEl;
    }

    function row (_cfg, rowEl) {
      if (!(rowEl instanceof HTMLElement)) {
        var rowHTML     = rowEl;
        rowEl           = window.document.createElement('div');
        rowEl.innerHTML = rowHTML || '&nbsp;';
        rowEl.setAttribute('title', rowEl.innerText);
      }

      rowEl.classList.add(_cfg.row.class);

      return rowEl;
    }
  }, {'./Utils': 11}], 6                                                  : [function (require, module, exports) {
    'use strict';

    var _Box = require('./Box.js');

    var _Box2 = _interopRequireDefault(_Box);

    var _Utils = require('./Utils.js');

    var Utils = _interopRequireWildcard(_Utils);

    var _ElementGenerators = require('./ElementGenerators.js');

    var Generate = _interopRequireWildcard(_ElementGenerators);

    function _interopRequireWildcard (obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};
        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              newObj[key] = obj[key];
            }
          }
        }
        newObj.default = obj;
        return newObj;
      }
    }

    function _interopRequireDefault (obj) {
      return obj && obj.__esModule ? obj : {default: obj};
    }

    var DEFAULTS = {
      outer  : {
        class: 'frs-table'
      },
      header : {
        class: 'frs-table-header'
      },
      column : {
        class: 'frs-table-col',
        data : []
      },
      row    : {
        class: 'frs-table-row'
      },
      content: {
        class : 'frs-table-static',
        events: []
      },
      sticky : {
        class: 'frs-table-sticky',
        inner: {
          class: 'frs-table-sticky-inner'
        }
      },
      box    : {
        events  : {},
        class   : 'frs-table-box',
        place   : _Box2.default.place,
        generate: _Box2.default.generate,
        elements: [],
        style   : {
          background: 'rgba(33,33,33,.7)'
        }
      }
    };
// ilosc dni wyswietlanych pod sobą
// today
// wyświetlaj/ukryj kontrolki do przesuwania daty
// dodawanie/usuwanie klasy disabled w oparciu o fn filtrującą
// weekday row (e.g. Pn, 13 maja 2018)

// 3 tygodnie do przodu (max)
// nie można cofać się przed today
// datepicker
// overlay
    FRSTable.prototype.getElement = getElement;
    FRSTable.prototype.boxAdd     = boxAdd;
    FRSTable.prototype.destroy    = destroy;

    FRSTable.DEFAULTS = DEFAULTS;
    FRSTable.Utils    = Utils;
    FRSTable.Box      = _Box2.default;

    window.FRSTable = FRSTable;

//

    function FRSTable (_cfg) {
      _cfg = Utils.extendIfUndefined(_cfg || {}, DEFAULTS);

      Generate.table(_cfg);

      this._internal = _cfg;
    }

    function getElement (_type) {
      return this._internal[_type || 'outer'].element;
    }

    function boxAdd (_options) {
      var _cfg = this._internal;
      var box  = _cfg.box.element = _cfg.box.generate.call(this, _options);

      box = _cfg.box.place.call(this, box, _options);

      Utils.attachEvents(box, _options.events || _cfg.box.events);

      return box;
    }

    function destroy () {
      removeEvents(this._internal.events);
    }
  }, {'./Box.js': 12, './Utils.js': 11, './ElementGenerators.js': 13}], 19: [function (require, module, exports) {
    var bundleURL = null;

    function getBundleURLCached () {
      if (!bundleURL) {
        bundleURL = getBundleURL();
      }

      return bundleURL;
    }

    function getBundleURL () {
      // Attempt to find the URL of the current script and use that as the base URL
      try {
        throw new Error();
      } catch (err) {
        var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
        if (matches) {
          return getBaseURL(matches[0]);
        }
      }

      return '/';
    }

    function getBaseURL (url) {
      return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
    }

    exports.getBundleURL = getBundleURLCached;
    exports.getBaseURL   = getBaseURL;
  }, {}], 17                                                              : [function (require, module, exports) {
    var bundle = require('./bundle-url');

    function updateLink (link) {
      var newLink    = link.cloneNode();
      newLink.onload = function () {
        link.remove();
      };
      newLink.href   = link.href.split('?')[0] + '?' + Date.now();
      link.parentNode.insertBefore(newLink, link.nextSibling);
    }

    var cssTimeout = null;

    function reloadCSS () {
      if (cssTimeout) {
        return;
      }

      cssTimeout = setTimeout(function () {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for (var i = 0; i < links.length; i++) {
          if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
            updateLink(links[i]);
          }
        }

        cssTimeout = null;
      }, 50);
    }

    module.exports = reloadCSS;
  }, {'./bundle-url': 19}], 7                                             : [function (require, module, exports) {

    var reloadCSS = require('_css_loader');
    module.hot.dispose(reloadCSS);
    module.hot.accept(reloadCSS);

  }, {'_css_loader': 17}], 4                                              : [function (require, module, exports) {
    require('./scripts/FRSTable.js');
    require('./styles/FRSTable.scss');
  }, {'./scripts/FRSTable.js': 6, './styles/FRSTable.scss': 7}], 20       : [function (require, module, exports) {
    var global     = arguments[3];
    var OVERLAY_ID = '__parcel__error__overlay__';

    var OldModule = module.bundle.Module;

    function Module (moduleName) {
      OldModule.call(this, moduleName);
      this.hot = {
        data             : module.bundle.hotData,
        _acceptCallbacks : [],
        _disposeCallbacks: [],
        accept           : function (fn) {
          this._acceptCallbacks.push(fn || function () {
          });
        },
        dispose          : function (fn) {
          this._disposeCallbacks.push(fn);
        }
      };

      module.bundle.hotData = null;
    }

    module.bundle.Module = Module;

    var parent = module.bundle.parent;
    if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
      var hostname = '' || location.hostname;
      var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
      var ws       = new WebSocket(protocol + '://' + hostname + ':' + '51669' + '/');
      ws.onmessage = function (event) {
        var data = JSON.parse(event.data);

        if (data.type === 'update') {
          data.assets.forEach(function (asset) {
            hmrApply(global.parcelRequire, asset);
          });

          data.assets.forEach(function (asset) {
            if (!asset.isNew) {
              hmrAccept(global.parcelRequire, asset.id);
            }
          });
          // Clear the console after HMR
          console.clear();
        }

        if (data.type === 'reload') {
          ws.close();
          ws.onclose = function () {
            location.reload();
          };
        }

        if (data.type === 'error-resolved') {
          console.log('[parcel] ✨ Error resolved');

          removeErrorOverlay();
        }

        if (data.type === 'error') {
          console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

          removeErrorOverlay();

          var overlay = createErrorOverlay(data);
          document.body.appendChild(overlay);
        }
      };
    }

    function removeErrorOverlay () {
      var overlay = document.getElementById(OVERLAY_ID);
      if (overlay) {
        overlay.remove();
      }
    }

    function createErrorOverlay (data) {
      var overlay = document.createElement('div');
      overlay.id  = OVERLAY_ID;

      // html encode message and stack trace
      var message          = document.createElement('div');
      var stackTrace       = document.createElement('pre');
      message.innerText    = data.error.message;
      stackTrace.innerText = data.error.stack;

      overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' +
                          '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' +
                          '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' +
                          '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML +
                          '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

      return overlay;
    }

    function getParents (bundle, id) {
      var modules = bundle.modules;
      if (!modules) {
        return [];
      }

      var parents = [];
      var k, d, dep;

      for (k in modules) {
        for (d in modules[k][1]) {
          dep = modules[k][1][d];
          if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
            parents.push(+k);
          }
        }
      }

      if (bundle.parent) {
        parents = parents.concat(getParents(bundle.parent, id));
      }

      return parents;
    }

    function hmrApply (bundle, asset) {
      var modules = bundle.modules;
      if (!modules) {
        return;
      }

      if (modules[asset.id] || !bundle.parent) {
        var fn            = new Function('require', 'module', 'exports', asset.generated.js);
        asset.isNew       = !modules[asset.id];
        modules[asset.id] = [fn, asset.deps];
      } else if (bundle.parent) {
        hmrApply(bundle.parent, asset);
      }
    }

    function hmrAccept (bundle, id) {
      var modules = bundle.modules;
      if (!modules) {
        return;
      }

      if (!modules[id] && bundle.parent) {
        return hmrAccept(bundle.parent, id);
      }

      var cached     = bundle.cache[id];
      bundle.hotData = {};
      if (cached) {
        cached.hot.data = bundle.hotData;
      }

      if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
        cached.hot._disposeCallbacks.forEach(function (cb) {
          cb(bundle.hotData);
        });
      }

      delete bundle.cache[id];
      bundle(id);

      cached = bundle.cache[id];
      if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        cached.hot._acceptCallbacks.forEach(function (cb) {
          cb();
        });
        return true;
      }

      return getParents(global.parcelRequire, id).some(function (id) {
        return hmrAccept(global.parcelRequire, id);
      });
    }
  }, {}]
}, {}, [20, 4], null)
//# sourceMappingURL=/FRS-table.a1d5619d.map