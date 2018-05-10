import * as Utils from './Utils';

export function table (_cfg) {
  var calendar = _cfg.outer.element = _cfg.outer.element || window.document.createElement('div');

  calendar.classList.add(_cfg.outer.class);

  calendar.insertAdjacentElement('afterbegin', content(_cfg));
  calendar.insertAdjacentElement('afterbegin', stickyContent(_cfg));
  calendar.insertAdjacentElement('afterbegin', header(_cfg));

  return calendar;
}

export function stickyContent (_cfg) {
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

export function stickyInner (_cfg) {
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

export function content (_cfg) {
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

export function header (_cfg) {
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

export function column (_cfg, _rows) {
  var columnEl = window.document.createElement('div');
  columnEl.classList.add(_cfg.column.class);

  for (var i = 0, len = _rows.length; i < len; ++i) {
    if (_rows[i] === void 0) {
      continue;
    }
    var rowEl = row(_cfg, _rows[i])
    rowEl.classList.add(_cfg.row.class + '-' + (i + 1));

    columnEl.appendChild(rowEl);
  }

  return columnEl;
}

export function row (_cfg, rowEl) {
  if (!(rowEl instanceof HTMLElement)) {
    var rowHTML     = rowEl;
    rowEl           = window.document.createElement('div');
    rowEl.innerHTML = rowHTML || '&nbsp;';
    rowEl.setAttribute('title', rowEl.innerText);
  }

  rowEl.classList.add(_cfg.row.class);

  return rowEl;
}