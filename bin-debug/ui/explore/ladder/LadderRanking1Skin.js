var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var ui;
(function (ui) {
    var LadderRanking1Skin = (function (_super) {
        __extends(LadderRanking1Skin, _super);
        function LadderRanking1Skin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'LadderRanking1Skin';
            return _this;
        }
        return LadderRanking1Skin;
    }(base.View));
    ui.LadderRanking1Skin = LadderRanking1Skin;
    __reflect(LadderRanking1Skin.prototype, "ui.LadderRanking1Skin");
})(ui || (ui = {}));
