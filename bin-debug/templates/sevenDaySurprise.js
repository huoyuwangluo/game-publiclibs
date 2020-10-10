var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var sevenDaySurprise = (function () {
        function sevenDaySurprise() {
        }
        sevenDaySurprise.prototype.decode = function (data) {
            this._data = data;
        };
        return sevenDaySurprise;
    }());
    templates.sevenDaySurprise = sevenDaySurprise;
    __reflect(sevenDaySurprise.prototype, "templates.sevenDaySurprise");
})(templates || (templates = {}));
