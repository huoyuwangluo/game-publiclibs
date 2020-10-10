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
var mg;
(function (mg) {
    var XyCustomerServiceManager = (function (_super) {
        __extends(XyCustomerServiceManager, _super);
        function XyCustomerServiceManager() {
            var _this = _super.call(this) || this;
            _this._domWidth = 0.82;
            _this._domHeight = 0.74;
            _this._megin = 8;
            _this.skinName = 'base.FloatSkin';
            _this.back = new egret.Shape();
            return _this;
        }
        Object.defineProperty(XyCustomerServiceManager, "instance", {
            get: function () {
                if (!mg.XyCustomerServiceManager._instance) {
                    mg.XyCustomerServiceManager._instance = new mg.XyCustomerServiceManager();
                }
                return mg.XyCustomerServiceManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        XyCustomerServiceManager.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.btnClose.sound = "ui_click_close";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        };
        XyCustomerServiceManager.prototype.initialize = function (stage) {
            this._stage = stage;
        };
        XyCustomerServiceManager.prototype.add = function () {
            this._stage.addChild(this.back);
            this._stage.addChild(this);
            this._stage.addEventListener(egret.Event.RESIZE, this.resizeHandler, this);
            this.resizeHandler(null);
            this.addWebView();
        };
        XyCustomerServiceManager.prototype.remove = function () {
            if (this.back.parent) {
                this.back.parent.removeChild(this.back);
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this._stage.removeEventListener(egret.Event.RESIZE, this.resizeHandler, this);
            this.removeWebView();
        };
        XyCustomerServiceManager.prototype.addWebView = function () {
            try {
                var mainDom = document.getElementById('main');
                if (!this._mydom) {
                    this._mydom = document.createElement("div");
                    this._mydom.style.position = 'absolute';
                    this._mydom.style.width = (this._domWidth * 100) + '%';
                    this._mydom.style.height = (this._domHeight * 100) + '%';
                    this._mydom.style.top = '50%';
                    this._mydom.style.left = '50%';
                    this._mydom.style.transform = "translate(-50%,-50%)";
                    mainDom.appendChild(this._mydom);
                    this._myWebView = document.createElement("iframe");
                    this._myWebView.id = 'page';
                    this._myWebView.width = '100%';
                    this._myWebView.height = '100%';
                    this._myWebView.scrolling = 'auto';
                    this._myWebView.style.border = "0px #000000 solid";
                    this._myWebView.src = (window.config.ssl ? 'https' : 'http') + "://www.xy.com/kfsys?type=h5&uid=" + platform.sdk.roleId + "&gid=" + platform.sdk.appId + "&sid=" + GameModels.login.serverList.selected.sid + "&rolename=" + GameModels.user.player.name + "&roleid=" + GameModels.user.player.uid;
                    this._mydom.appendChild(this._myWebView);
                }
            }
            catch (e) {
                alert(e);
            }
        };
        XyCustomerServiceManager.prototype.removeWebView = function () {
            if (this._mydom) {
                if (this._myWebView) {
                    this._mydom.removeChild(this._myWebView);
                }
                var mainDom = document.getElementById('main');
                mainDom.removeChild(this._mydom);
            }
            this._mydom = this._myWebView = null;
        };
        XyCustomerServiceManager.prototype.resizeHandler = function (e) {
            var w = this._stage.stageWidth;
            var h = this._stage.stageHeight;
            this.back.graphics.clear();
            this.back.graphics.beginFill(0x0, 0.6);
            this.back.graphics.drawRect(0, 0, w, h);
            this.back.graphics.endFill();
            this.width = ((w * this._domWidth) >> 0) + this._megin * 2;
            this.height = ((h * this._domHeight) >> 0) + this._megin * 2 + 50;
            this.x = w / 2 - this.width / 2;
            this.y = h / 2 - this.height / 2 - 25;
        };
        XyCustomerServiceManager.prototype.closeHandler = function (e) {
            this.remove();
        };
        return XyCustomerServiceManager;
    }(eui.Component));
    mg.XyCustomerServiceManager = XyCustomerServiceManager;
    __reflect(XyCustomerServiceManager.prototype, "mg.XyCustomerServiceManager");
})(mg || (mg = {}));
