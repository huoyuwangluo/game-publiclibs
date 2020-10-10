var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var luckyTurnTable = (function () {
        function luckyTurnTable() {
        }
        Object.defineProperty(luckyTurnTable.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(luckyTurnTable.prototype, "time", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(luckyTurnTable.prototype, "consume", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(luckyTurnTable.prototype, "multiple", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(luckyTurnTable.prototype, "itemLootId", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        luckyTurnTable.prototype.decode = function (data) {
            this._data = data;
        };
        return luckyTurnTable;
    }());
    templates.luckyTurnTable = luckyTurnTable;
    __reflect(luckyTurnTable.prototype, "templates.luckyTurnTable");
})(templates || (templates = {}));
