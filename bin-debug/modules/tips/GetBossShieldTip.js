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
var tips;
(function (tips) {
    var GetBossShieldTip = (function (_super) {
        __extends(GetBossShieldTip, _super);
        function GetBossShieldTip() {
            return _super.call(this) || this;
        }
        Object.defineProperty(GetBossShieldTip, "instance", {
            get: function () {
                if (!GetBossShieldTip._instance) {
                    GetBossShieldTip._instance = new GetBossShieldTip();
                    GetBossShieldTip._instance.touchEnabled = GetBossShieldTip._instance.touchChildren = false;
                }
                return GetBossShieldTip._instance;
            },
            enumerable: true,
            configurable: true
        });
        GetBossShieldTip.prototype.show = function (items, handler) {
            this.labTitle.text = Language.J_HDHDJL;
            this._items = [];
            if (items.length > 3) {
                for (var i = 0; i < 3; i++) {
                    this._items.push(items[i]);
                }
            }
            else {
                this._items = items;
            }
            mg.layerManager.top.addChild(this);
            if (!this._dropArr)
                this._dropArr = [this.drop0, this.drop1, this.drop2];
            if (items[0])
                this.drop0.dataSource = items[0];
            if (items[1])
                this.drop1.dataSource = items[1];
            if (items[2])
                this.drop2.dataSource = items[2];
            this.showIconPosition(this._items.length);
            this.anchorOffsetX = 263;
            this.anchorOffsetY = 84;
            this.x = mg.stageManager.stageWidth * .5;
            this.y = mg.stageManager.stageHeight - 320;
            this.scaleX = this.scaleY = 1.4;
            this.alpha = .5;
            egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 300, utils.Ease.quadInOut).wait(1500).call(function () {
                this.hide();
                if (handler) {
                    handler.run();
                }
            }, this);
        };
        GetBossShieldTip.prototype.hide = function () {
            if (this._items) {
                var icon = void 0;
                for (var i = 0; i < this._items.length; i++) {
                    var drop = this._dropArr[i];
                    if (drop && drop.dataSource) {
                        icon = utils.ObjectPool.from(components.Icon);
                        icon.source = this._dropArr[i].dataSource.icon;
                        mg.layerManager.top.addChild(icon);
                        var point = this._dropArr[i].localToGlobal(0, 0);
                        icon.anchorOffsetX = icon.width / 2;
                        icon.anchorOffsetY = icon.height / 2;
                        icon.x = point.x + icon.width / 2;
                        icon.y = point.y + icon.height / 2;
                        var bagPosition = mg.uiManager.getView(main.MainUIView).getBagPostion(true);
                        egret.Tween.get(icon).to({ x: bagPosition.x, y: bagPosition.y, scaleX: 0.5, scaleY: 0.5 }, 1000, utils.Ease.cubicInOut).call(this.flyOverHandler, this, [icon]);
                    }
                }
            }
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({ alpha: 0 }, 300, utils.Ease.cubicIn).call(function () {
                if (this.parent) {
                    if (this._items) {
                        this._items.length = 0;
                        this._items = null;
                    }
                    if (this.drop0 && this.drop0.dataSource)
                        this.drop0.dataSource = null;
                    if (this.drop1 && this.drop1.dataSource)
                        this.drop1.dataSource = null;
                    if (this.drop2 && this.drop2.dataSource)
                        this.drop2.dataSource = null;
                    this.parent.removeChild(this);
                }
            });
        };
        GetBossShieldTip.prototype.flyOverHandler = function (icon) {
            if (icon.parent) {
                icon.parent.removeChild(icon);
                icon.scaleX = icon.scaleY = 1;
                utils.ObjectPool.to(icon, true);
            }
        };
        //根据长度显示多少个装备
        GetBossShieldTip.prototype.showIconPosition = function (num) {
            for (var i = 0; i < 3; i++) {
                if (i < num) {
                    this._dropArr[i].visible = true;
                }
                else {
                    this._dropArr[i].visible = false;
                }
            }
            switch (num) {
                case 1:
                    if (this.drop0)
                        this.drop0.x = 218;
                    break;
                case 2:
                    if (this.drop0)
                        this.drop0.x = 160;
                    if (this.drop1)
                        this.drop1.x = 280;
                    break;
                case 3:
                    if (this.drop0)
                        this.drop0.x = 98;
                    if (this.drop1)
                        this.drop1.x = 218;
                    if (this.drop2)
                        this.drop2.x = 338;
                    break;
                default:
                    break;
            }
        };
        return GetBossShieldTip;
    }(ui.GetSpuerEquitmentSkin));
    tips.GetBossShieldTip = GetBossShieldTip;
    __reflect(GetBossShieldTip.prototype, "tips.GetBossShieldTip");
})(tips || (tips = {}));
