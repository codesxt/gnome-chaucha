const St = imports.gi.St;
const Main = imports.ui.main;
const Soup = imports.gi.Soup;
const Lang = imports.lang;
const Mainloop = imports.mainloop;
const Clutter = imports.gi.Clutter;
const PanelMenu = imports.ui.panelMenu;

const QUERY_URL = 'https://api.orionx.io/graphql';

let _httpSession;
const GnomeChaucha = new Lang.Class({
  Name: 'GnomeChaucha',
  Extends: PanelMenu.Button,

  _init: function () {
    this.parent(0.0, "Gnome Chaucha", false);
    this.buttonText = new St.Label({
      text: _("Cargando..."),
      y_align: Clutter.ActorAlign.CENTER
    });
    this.actor.add_actor(this.buttonText);
    this._refresh();
  },

  _refresh: function () {
    this._loadData(this._refreshUI);
    this._removeTimeout();
    this._timeout = Mainloop.timeout_add_seconds(10, Lang.bind(this, this._refresh));
    return true;
  },

  _loadData: function () {
    let params = {
      query: '{marketOrderBook(marketCode:"CHACLP",limit:1){buy{limitPrice}sell{limitPrice}}}'

    };
    _httpSession = new Soup.Session();
    let message = Soup.form_request_new_from_hash('GET', QUERY_URL, params);
    _httpSession.queue_message(message, Lang.bind(this, function (_httpSession, message) {
          if (message.status_code !== 200)
            return;
          let json = JSON.parse(message.response_body.data);
          this._refreshUI(json);
        }
      )
    );
  },

  _refreshUI: function (data) {
    let buy  = data.data.marketOrderBook.buy[0].limitPrice;
    let sell = data.data.marketOrderBook.sell[0].limitPrice;
    txt = "CHA Venta: " + buy + ", Compra: " + sell;
    this.buttonText.set_text(txt);
  },

  _removeTimeout: function () {
    if (this._timeout) {
      Mainloop.source_remove(this._timeout);
      this._timeout = null;
    }
  },

  stop: function () {
    if (_httpSession !== undefined)
      _httpSession.abort();
    _httpSession = undefined;

    if (this._timeout)
      Mainloop.source_remove(this._timeout);
    this._timeout = undefined;

    this.menu.removeAll();
  }
});

let twMenu;

function init() {
}

function enable() {
	twMenu = new GnomeChaucha;
	Main.panel.addToStatusArea('cha-indicator', twMenu);
}

function disable() {
	twMenu.stop();
	twMenu.destroy();
}
