export function noop () {
};

export function extendIfUndefined (_obj, _obj2) {
  var prop;

  for (prop in _obj2) {
    var objProp  = _obj[prop],
        obj2Prop = _obj2[prop];

    if (!objProp) {
      _obj[prop] = obj2Prop;

      continue;
    }

    if (typeof objProp === 'object') {
      if (objProp instanceof window.Array) {
        continue;
      }

      extendIfUndefined(objProp, obj2Prop);
    }
  }

  return _obj;
}

export function emptyElement (_element) {
  _element.childNodes.forEach(_element.removeChild);
}

export function attachEvents (_el, _events) {
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

export function attachEvent (_el, _event, _eventObj) {
  _el.addEventListener(_event, _eventObj.handler, _eventObj.options);
}

export function deattachEvents (_el, _events) {
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

export function deattachEvent (_el, _event, _eventObj) {
  _el.removeEventListener(_event, _eventObj.handler);
}

export function elementHandleStyling (_el, _options) {
  extendIfUndefined(_el.style, _options.style);

  if (_options.class) {
    _el.classList.add(_options.class);
  }

  return _el;
}