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
    var LadderRankingCell1Skin = (function (_super) {
        __extends(LadderRankingCell1Skin, _super);
        function LadderRankingCell1Skin() {
            var _this = _super.call(this) || this;
            _this.skinName = 'renderer.LadderRankingCell1Skin';
            return _this;
        }
        return LadderRankingCell1Skin;
    }(base.ItemRenderer));
    ui.LadderRankingCell1Skin = LadderRankingCell1Skin;
    __reflect(LadderRankingCell1Skin.prototype, "ui.LadderRankingCell1Skin");
})(ui || (ui = {}));
