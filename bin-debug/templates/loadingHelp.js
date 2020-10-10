var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var loadingHelp = (function () {
        function loadingHelp() {
        }
        Object.defineProperty(loadingHelp.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(loadingHelp.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(loadingHelp.prototype, "minLv", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(loadingHelp.prototype, "maxLv", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(loadingHelp.prototype, "helpContents", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        loadingHelp.prototype.decode = function (data) {
            this._data = data;
        };
        return loadingHelp;
    }());
    templates.loadingHelp = loadingHelp;
    __reflect(loadingHelp.prototype, "templates.loadingHelp");
})(templates || (templates = {}));
