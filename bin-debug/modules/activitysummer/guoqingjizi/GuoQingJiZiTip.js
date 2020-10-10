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
var view;
(function (view) {
    var activity;
    (function (activity) {
        var GuoQingJiZiTip = (function (_super) {
            __extends(GuoQingJiZiTip, _super);
            function GuoQingJiZiTip() {
                return _super.call(this) || this;
            }
            Object.defineProperty(GuoQingJiZiTip, "instance", {
                get: function () {
                    if (!GuoQingJiZiTip._instance) {
                        GuoQingJiZiTip._instance = new GuoQingJiZiTip();
                        GuoQingJiZiTip._instance.touchEnabled = GuoQingJiZiTip._instance.touchChildren = false;
                    }
                    return GuoQingJiZiTip._instance;
                },
                enumerable: true,
                configurable: true
            });
            GuoQingJiZiTip.prototype.show = function (item) {
                this.anchorOffsetX = 255;
                this.anchorOffsetY = 84;
                this.imgQuality.source = ResPath.getQuality(item.quality);
                this.labName.text = item.name;
                this.labName.textColor = TypeQuality.getQualityColor(item.quality);
                this.imgIcon.source = item.icon;
                mg.layerManager.tip.addChild(this);
                this.x = mg.stageManager.stageWidth * .5;
                this.y = mg.stageManager.stageHeight * .5 - 200;
                this.scaleX = this.scaleY = 1.4;
                this.alpha = .5;
                egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 300, utils.Ease.quadInOut).wait(1000).call(function () {
                    this.hide();
                }, this);
            };
            GuoQingJiZiTip.prototype.hide = function () {
                egret.Tween.removeTweens(this);
                egret.Tween.get(this).to({ alpha: 0, }, 300, utils.Ease.cubicIn).call(function () {
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                });
                var img = utils.ObjectPool.from(components.Icon);
                img.initialize(this.imgIcon.texture);
                mg.layerManager.top.addChild(img);
                var point = this.imgIcon.localToGlobal(0, 0);
                img.anchorOffsetX = img.width / 2;
                img.anchorOffsetY = img.height / 2;
                img.x = point.x + img.width / 2;
                img.y = point.y + img.height / 2;
                var bagPosition = mg.uiManager.getView(main.MainUIView).getBagPostion(true);
                egret.Tween.get(img).to({ x: bagPosition.x, y: bagPosition.y, scaleX: 0.5, scaleY: 0.5 }, 1000, utils.Ease.cubicInOut).call(this.flyOverHandler, this, [img]);
            };
            GuoQingJiZiTip.prototype.flyOverHandler = function (img) {
                if (img.parent) {
                    img.parent.removeChild(img);
                    img.scaleX = img.scaleY = 1;
                }
                this.imgIcon.source = null;
            };
            return GuoQingJiZiTip;
        }(ui.GuoQingJiZiTipSkin));
        activity.GuoQingJiZiTip = GuoQingJiZiTip;
        __reflect(GuoQingJiZiTip.prototype, "view.activity.GuoQingJiZiTip");
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
