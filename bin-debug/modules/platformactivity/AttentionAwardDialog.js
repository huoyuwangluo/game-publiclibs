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
    var platformactivity;
    (function (platformactivity) {
        var AttentionAwardDialog = (function (_super) {
            __extends(AttentionAwardDialog, _super);
            function AttentionAwardDialog() {
                return _super.call(this) || this;
            }
            AttentionAwardDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._rewards = [this.reward0, this.reward1, this.reward2];
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            AttentionAwardDialog.prototype.enter = function () {
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnReceive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceive, this);
                this.refeshData();
            };
            AttentionAwardDialog.prototype.exit = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnReceive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onReceive, this);
            };
            AttentionAwardDialog.prototype.refeshData = function () {
                var list = [{ id: 201, count: 500 }, { id: 211001, count: 20 }, { id: 210101, count: 30 }];
                for (var i = 0; i < 3; i++) {
                    if (list[i]) {
                        this._rewards[i].dataSource = (list[i].id + "_" + list[i].count);
                    }
                    else {
                        this._rewards[i].visible = false;
                    }
                }
            };
            AttentionAwardDialog.prototype.onReceive = function (e) {
                if (!GameModels.platformActivity.focusState) {
                    //已领取
                    return;
                }
                GameModels.platformActivity.showFocus();
                mg.uiManager.remove(this);
            };
            AttentionAwardDialog.prototype.onClose = function (e) {
                mg.uiManager.remove(this);
            };
            return AttentionAwardDialog;
        }(ui.AttentionAwardSkin));
        platformactivity.AttentionAwardDialog = AttentionAwardDialog;
        __reflect(AttentionAwardDialog.prototype, "dialog.platformactivity.AttentionAwardDialog");
    })(platformactivity = dialog.platformactivity || (dialog.platformactivity = {}));
})(dialog || (dialog = {}));
