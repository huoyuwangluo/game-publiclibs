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
    var setting;
    (function (setting) {
        var SettingDialog = (function (_super) {
            __extends(SettingDialog, _super);
            function SettingDialog() {
                return _super.call(this) || this;
            }
            SettingDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                var soundEnabled = game.state.getItem(GameModels.user.player.uid, TypeSetting.SOUND_ENABLED);
                this.toggleSound.selected = (soundEnabled == true || soundEnabled == null);
                var hightRenderEnabled = game.state.getItem(GameModels.user.player.uid, TypeSetting.HIGHT_RENDER);
                this.toggleHightRender.selected = (hightRenderEnabled == true || hightRenderEnabled == null);
                var openModel = game.state.getItem(GameModels.user.player.uid, TypeSetting.OPEN_MODELS);
                this.toggleAllOpen.selected = (openModel == true);
                var openRechage = game.state.getItem(GameModels.user.player.uid, TypeSetting.OPEN_RECHAGE);
                this.toggleAllOpen0.selected = (openRechage == true);
            };
            SettingDialog.prototype.toggleOpenRechageHandler = function (e) {
                game.state.setItem(GameModels.user.player.uid, TypeSetting.OPEN_RECHAGE, this.toggleAllOpen0.selected);
                game.state.setState(TypeSetting.OPEN_RECHAGE, this.toggleAllOpen0.selected);
            };
            SettingDialog.prototype.toggleAllOpenHandler = function (e) {
                game.state.setItem(GameModels.user.player.uid, TypeSetting.OPEN_MODELS, this.toggleAllOpen.selected);
                game.state.setState(TypeSetting.OPEN_MODELS, this.toggleAllOpen.selected);
            };
            SettingDialog.prototype.enter = function (data) {
                this.head.registerWarn(GameRedState.MAIN_SET_HEAD);
                this.toggleAllOpen.visible = window.config.debug;
                this.labOpen.visible = window.config.debug;
                this.toggleAllOpen0.visible = window.config.debug;
                this.labOpen0.visible = window.config.debug;
                this.labName.text = Language.C_MZ + GameModels.user.player.name;
                this.labFightValue.text = Language.P_ZL + GameModels.user.player.totalFightValue;
                this.toggleSound.selected = game.state.getState(TypeSetting.SOUND_ENABLED);
                this.updataPlayerHead();
                this.toggleAllOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleAllOpenHandler, this);
                this.toggleAllOpen0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleOpenRechageHandler, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
                this.toggleHightRender.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleHightRenderHandler, this);
                this.toggleSound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleSoundHandler, this);
                this.btnSwitch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changePlayerHead, this);
                GameModels.user.player.onPropertyChange(TypeProperty.HEADICON, this, this.updataPlayerHead);
            };
            SettingDialog.prototype.exit = function () {
                GameModels.user.player.offPropertyChange(TypeProperty.HEADICON, this, this.updataPlayerHead);
                this.toggleSound.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleSoundHandler, this);
                this.toggleHightRender.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleHightRenderHandler, this);
                this.toggleAllOpen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleAllOpenHandler, this);
                this.toggleAllOpen0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleOpenRechageHandler, this);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
                this.btnSwitch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changePlayerHead, this);
            };
            SettingDialog.prototype.updataPlayerHead = function () {
                this.head.setHeadInfo(GameModels.user.player.headIcon, GameModels.user.player.level);
            };
            SettingDialog.prototype.toggleSoundHandler = function (e) {
                game.state.setState(TypeSetting.SOUND_ENABLED, this.toggleSound.selected);
                game.state.setItem(GameModels.user.player.uid, TypeSetting.SOUND_ENABLED, this.toggleSound.selected);
            };
            SettingDialog.prototype.toggleHightRenderHandler = function (e) {
                game.state.setState(TypeSetting.HIGHT_RENDER, this.toggleHightRender.selected);
                game.state.setItem(GameModels.user.player.uid, TypeSetting.HIGHT_RENDER, this.toggleHightRender.selected);
                mg.stageManager.frameRate = this.toggleHightRender.selected ? 60 : 30;
            };
            SettingDialog.prototype.closeHandler = function (e) {
                mg.uiManager.remove(this);
            };
            SettingDialog.prototype.switchUser = function (e) {
                if (platform.sdk && (platform.sdk.type == platform.TW || platform.sdk.type == platform.GR || platform.sdk.type == platform.GRH5)) {
                    platform.sdk.switchUser();
                }
            };
            SettingDialog.prototype.formatGold = function (value) {
                if (value >= 100000000) {
                    return Math.floor(value / 100000000) + Language.Z_YI;
                }
                else if (value >= 10000) {
                    return Math.floor(value / 10000) + Language.Z_WAN;
                }
                else {
                    return value.toString();
                }
            };
            SettingDialog.prototype.changePlayerHead = function (evt) {
                mg.alertManager.showAlert(dialog.setting.ChangePlayerHead, true, true);
            };
            return SettingDialog;
        }(ui.SettingSkin));
        setting.SettingDialog = SettingDialog;
        __reflect(SettingDialog.prototype, "dialog.setting.SettingDialog");
    })(setting = dialog.setting || (dialog.setting = {}));
})(dialog || (dialog = {}));
