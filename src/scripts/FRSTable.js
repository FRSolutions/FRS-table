import Box from './Box.js';
import * as Utils from './Utils.js';
import * as Generate from './ElementGenerators.js';

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
    place   : Box.place,
    generate: Box.generate,
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
FRSTable.Box      = Box;

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


