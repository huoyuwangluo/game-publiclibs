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
var dialog;
(function (dialog) {
    var battlefield;
    (function (battlefield) {
        var BattlefieldMain = (function (_super) {
            __extends(BattlefieldMain, _super);
            function BattlefieldMain() {
                return _super.call(this) || this;
            }
            BattlefieldMain.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            BattlefieldMain.prototype.enter = function (data) {
                mg.soundManager.playViewLongSound("SoundJM_14", "SPORTS");
                this.updataList();
            };
            BattlefieldMain.prototype.updataList = function () {
                var anyArr = [5, 1, 2, 3, 4];
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(anyArr);
                }
                else {
                    this._listData.source = anyArr;
                }
                this.list.dataProvider = this._listData;
            };
            BattlefieldMain.prototype.exit = function () {
                this.clearList(this.list);
            };
            return BattlefieldMain;
        }(ui.BattlefieldMainSkin));
        battlefield.BattlefieldMain = BattlefieldMain;
        __reflect(BattlefieldMain.prototype, "dialog.battlefield.BattlefieldMain");
    })(battlefield = dialog.battlefield || (dialog.battlefield = {}));
})(dialog || (dialog = {}));
