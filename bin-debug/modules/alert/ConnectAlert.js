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
var ConnectAlert = (function (_super) {
    __extends(ConnectAlert, _super);
    function ConnectAlert() {
        return _super.call(this) || this;
        /*this.skinName = `<?xml version="1.0" encoding="utf-8"?>
<e:Skin class="skin.ConnectTip" width="524" height="270" currentState="warn" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" xmlns:components="components.*" states="warn,connecting,connectfail">
    <e:Image width="100%" height="100%" x="0" y="0" anchorOffsetX="0" anchorOffsetY="0" source="img_prompt_bg_png" scale9Grid="168,68,110,31"/>
    <components:SnapButton id="btnReconnect" label="登录" anchorOffsetX="83" anchorOffsetY="33" horizontalCenter="120" label.warn="开始重连" horizontalCenter.warn="0" height.warn="69" y.warn="166" includeIn="warn" bottom="35" skinName="skins.SnapTipButton1Skin" width="159" height="54">
    </components:SnapButton>
    <components:SnapButton id="btnRefesh" label="刷新页面" anchorOffsetX="83" width="159" anchorOffsetY="33" height="54" horizontalCenter="-117" y.connecting="187" includeIn="connectfail" horizontalCenter.connectfail="0" horizontalCenter.warn="-117" bottom.connectfail="35" bottom.warn="35" bottom="35" skinName="skins.SnapTipButton2Skin">
    </components:SnapButton>
    <e:Label text="正在重新连接....." x.connectfail="162" x.connecting="175" y="105" size="20" textColor="0xc6b59e" y.connecting="135" y.warn="106" text.warn="帐号已在其他地方登陆，点击可重连" horizontalCenter.warn="0" y.connectfail="112" text.connectfail="连接失败，请点击刷新" x="188" text.connecting="正在连接服务器....."/>
    <e:Label text="重新连接" y="20" size="20" horizontalCenter="0" textColor="0xfddfa1"/>
</e:Skin>`*/
    }
    ConnectAlert.prototype.initialize = function () {
    };
    //public show(caller: any, connectMethod: Function, refeshMethod: Function, state: string = 'netError'): void {
    ConnectAlert.prototype.show = function (caller, refeshMethod, state) {
        if (state === void 0) { state = 'netError'; }
        this._caller = caller;
        //this._connectMethod = connectMethod;
        this._refeshMethod = refeshMethod;
        //this.btnReconnect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        this.btnRefesh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        switch (state) {
            case "otherPlayerLogin":
                this.helpLabel.text = Language.J_ZHZQTDFDL;
                break;
            case "serverClose":
                this.helpLabel.text = Language.J_WLCC;
                break;
            default:
                this.helpLabel.text = Language.J_WLCC;
                break;
        }
        //this.currentState = state ? state : 'warn';
        //'connecting'
        //'connectfail';
    };
    ConnectAlert.prototype.hide = function () {
        this._caller = null;
        //this._connectMethod = null;
        this._refeshMethod = null;
        //this.btnReconnect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        this.btnRefesh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    ConnectAlert.prototype.tapHandler = function (e) {
        switch (e.currentTarget) {
            //case this.btnReconnect:
            //	if (this._connectMethod) this._connectMethod.call(this._caller);
            //	this.currentState = 'connecting';
            //	break;
            case this.btnRefesh:
                if (this._refeshMethod)
                    this._refeshMethod.call(this._caller);
                break;
        }
    };
    return ConnectAlert;
}(ui.ConnectTip));
__reflect(ConnectAlert.prototype, "ConnectAlert");
