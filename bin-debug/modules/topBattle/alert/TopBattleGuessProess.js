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
var item;
(function (item) {
    var TopBattleGuessProess = (function (_super) {
        __extends(TopBattleGuessProess, _super);
        function TopBattleGuessProess() {
            return _super.call(this) || this;
        }
        TopBattleGuessProess.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        TopBattleGuessProess.prototype.show = function (type, value, max) {
            var targetWidth = max <= 0 ? 200 : (value / max) * 400;
            if (type == 1) {
                this.thumb1.width = Math.floor(targetWidth);
            }
            else {
                this.thumb2.width = Math.floor(targetWidth);
            }
            this.imgTitle.x = this.thumb1.width;
        };
        return TopBattleGuessProess;
    }(ui.TopBattleGuessProessSkin));
    item.TopBattleGuessProess = TopBattleGuessProess;
    __reflect(TopBattleGuessProess.prototype, "item.TopBattleGuessProess");
})(item || (item = {}));
