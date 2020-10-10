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
var MaiGuLukyBossRewardAlert = (function (_super) {
    __extends(MaiGuLukyBossRewardAlert, _super);
    function MaiGuLukyBossRewardAlert() {
        var _this = _super.call(this) || this;
        _this._props = [_this.box1, _this.box2, _this.box3, _this.box4];
        return _this;
    }
    MaiGuLukyBossRewardAlert.prototype.show = function (itemVOs, handler, time) {
        if (time === void 0) { time = 5; }
        if (handler)
            this._handler = handler;
        this._items = itemVOs;
        this.showDrops(this._items);
        this._leftTime = time;
        utils.timer.countdown(this._leftTime, this, this.showTime, this.timeOver);
    };
    MaiGuLukyBossRewardAlert.prototype.hide = function () {
        utils.timer.clearAll(this);
        if (this._handler) {
            this._handler.recover();
            this._handler = null;
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    /**倒计时结束 */
    MaiGuLukyBossRewardAlert.prototype.timeOver = function () {
        utils.timer.clearAll(this);
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    /**进行倒计时 */
    MaiGuLukyBossRewardAlert.prototype.updateTime = function () {
        utils.timer.countdown(this._leftTime, this, this.showTime, this.timeOver);
    };
    /**显示倒计时*/
    MaiGuLukyBossRewardAlert.prototype.showTime = function () {
        this._leftTime--;
    };
    MaiGuLukyBossRewardAlert.prototype.showDrops = function (drops) {
        if (!drops || !drops.length)
            return;
        var len = drops.length <= 4 ? drops.length : 4;
        for (var i = 0; i < this._props.length; i++) {
            if (i < len) {
                this._props[i].visible = true;
                this._props[i].dataSource = drops[i];
            }
            else {
                this._props[i].visible = false;
            }
        }
        this.flyIcons(drops);
    };
    MaiGuLukyBossRewardAlert.prototype.flyIcons = function (drops) {
        var flyItem = new s.FlyIconsEffect();
        flyItem.initialize(drops, this._props[0].localToGlobal(45, 45), mg.layerManager.top);
        flyItem.start();
    };
    return MaiGuLukyBossRewardAlert;
}(ui.MaiGuLukyBossRewardAlertSkin));
__reflect(MaiGuLukyBossRewardAlert.prototype, "MaiGuLukyBossRewardAlert", ["IAlert", "egret.DisplayObject"]);
