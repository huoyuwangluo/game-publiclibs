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
var main;
(function (main) {
    var MainEmojiView = (function (_super) {
        __extends(MainEmojiView, _super);
        function MainEmojiView() {
            return _super.call(this) || this;
        }
        MainEmojiView.prototype.init = function () {
            this._parent = this.parent;
            this.icon1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon7.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon8.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon9.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon10.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon11.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon12.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon13.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon14.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon15.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon16.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon17.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.icon18.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
            this.hide();
        };
        MainEmojiView.prototype.onTap = function (e) {
            this.hide();
            if (this._selectChangeHandler) {
                var key = TypeChatEmoji.getEmojiKeyOfName(e.target.name);
                if (key == "")
                    return;
                this._selectChangeHandler.runWith(key);
            }
        };
        MainEmojiView.prototype.showView = function (bol) {
            this.visible = bol;
        };
        MainEmojiView.prototype.show = function () {
            this.visible = true;
        };
        MainEmojiView.prototype.hide = function () {
            this.visible = false;
        };
        MainEmojiView.prototype.onSelectChangeHandler = function (caller, method) {
            this.offSelectChangeHandler();
            this._selectChangeHandler = utils.Handler.create(caller, method, null, false);
        };
        MainEmojiView.prototype.offSelectChangeHandler = function () {
            if (this._selectChangeHandler) {
                this._selectChangeHandler.recover();
                this._selectChangeHandler = null;
            }
        };
        return MainEmojiView;
    }(ui.EmojiSkin));
    main.MainEmojiView = MainEmojiView;
    __reflect(MainEmojiView.prototype, "main.MainEmojiView");
})(main || (main = {}));
