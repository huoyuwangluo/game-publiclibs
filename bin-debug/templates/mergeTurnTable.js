var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var mergeTurnTable = (function () {
        function mergeTurnTable() {
        }
        Object.defineProperty(mergeTurnTable.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mergeTurnTable.prototype, "time", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mergeTurnTable.prototype, "consume", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mergeTurnTable.prototype, "multiple", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(mergeTurnTable.prototype, "itemLootId", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        mergeTurnTable.prototype.decode = function (data) {
            this._data = data;
        };
        return mergeTurnTable;
    }());
    templates.mergeTurnTable = mergeTurnTable;
    __reflect(mergeTurnTable.prototype, "templates.mergeTurnTable");
})(templates || (templates = {}));
