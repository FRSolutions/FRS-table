import {extendIfUndefined, elementHandleStyling} from './Utils.js';

Box.place    = place;
Box.generate = generate;

//

export default function Box (_window, _cfg, _options) {

}

function place (_el, _options) {
  var _cfg = this._internal;

  var column = _cfg.content.element
                   .getElementsByClassName(_cfg.column.class)[_options.x];

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

  box.innerText  = _options.text;
  _options.style = extendIfUndefined(_options.style || {}, cfg.box.style);

  return elementHandleStyling(box, _options);
}