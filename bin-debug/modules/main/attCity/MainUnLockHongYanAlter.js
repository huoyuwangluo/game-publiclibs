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
var MainUnLockHongYanAlter = (function (_super) {
    __extends(MainUnLockHongYanAlter, _super);
    function MainUnLockHongYanAlter() {
        return _super.call(this) || this;
    }
    MainUnLockHongYanAlter.prototype.show = function () {
        this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
    };
    MainUnLockHongYanAlter.prototype.onBtnClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
        // this.wenguanSongHongYan();
    };
    MainUnLockHongYanAlter.prototype.wenguanSongHongYan = function () {
        var img = utils.ObjectPool.from(components.Icon);
        img.initialize("chapterMap_json.img_map_giveHongYan");
        mg.layerManager.top.addChild(img);
        var point = new egret.Point(mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2);
        img.anchorOffsetX = img.width / 2;
        img.anchorOffsetY = img.height / 2;
        img.x = point.x + img.width / 2;
        img.y = point.y + img.height / 2;
        var position = mg.uiManager.getView(main.MainUIView).geWenGuanSongHongYanPostion(true);
        egret.Tween.get(img).to({ x: position.x, y: position.y, scaleX: 0.5, scaleY: 0.5 }, 1000, utils.Ease.cubicInOut).call(this.flyOverHandler, this, [img]);
    };
    MainUnLockHongYanAlter.prototype.flyOverHandler = function (img) {
        var view = mg.uiManager.getView(main.MainUIView);
        if (view && view.city && view.city.parent) {
            // view.city.updataHongYan();
            view.city.btnGiveHongYan.visible = true;
        }
        if (img) {
            img.alpha = 1;
            img.parent.removeChild(img);
            utils.ObjectPool.to(img, true);
        }
    };
    MainUnLockHongYanAlter.prototype.hide = function () {
        this.btnSure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        var view = mg.uiManager.getView(main.MainUIView);
        if (view && view.city && view.city.parent && !view.city.btnGiveHongYan.visible) {
            this.wenguanSongHongYan();
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return MainUnLockHongYanAlter;
}(ui.MainUnLockHongYanAlterSkin));
__reflect(MainUnLockHongYanAlter.prototype, "MainUnLockHongYanAlter", ["IAlert", "egret.DisplayObject"]);
