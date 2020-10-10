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
    var goddie;
    (function (goddie) {
        var GodDieBossView = (function (_super) {
            __extends(GodDieBossView, _super);
            function GodDieBossView() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._type = 0;
                return _this;
            }
            GodDieBossView.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._tabBtnList = [this.tabBtn0, this.tabBtn1, this.tabBtn2];
                this._bossItemList = [this.bossItem0, this.bossItem1, this.bossItem2, this.bossItem3, this.bossItem4, this.bossItem5];
                this._rewards = [this.reward0, this.reward1, this.reward2, this.reward3, this.reward4];
            };
            GodDieBossView.prototype.destory = function () {
                _super.prototype.destory.call(this);
            };
            GodDieBossView.prototype.enter = function (data) {
                for (var i = 0; i < this._tabBtnList.length; i++) {
                    this._tabBtnList[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                }
                this.btnCompose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterGameClick, this);
                this.btnGetDebris.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddClick, this);
                this.imgHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
                GameModels.sceneGodDie.addEventListener(mo.ModelSceneGodDie.GET_INFO, this.refreshInfo, this);
                GameModels.sceneGodDie.getDieBossInfo();
            };
            GodDieBossView.prototype.exit = function () {
                for (var i = 0; i < this._tabBtnList.length; i++) {
                    this._tabBtnList[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                }
                this.btnGetDebris.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAddClick, this);
                this.btnCompose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onEnterGameClick, this);
                GameModels.sceneGodDie.removeEventListener(mo.ModelSceneGodDie.GET_INFO, this.refreshInfo, this);
                this.imgHelp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openHelp, this);
            };
            GodDieBossView.prototype.openHelp = function (e) {
                mg.alertManager.showAlert(HelpAlert, true, true, Templates.getTemplateById(templates.Map.SYSRULE, 2901).des);
            };
            GodDieBossView.prototype.onAddClick = function (e) {
                // var tmp: templates.dataSetting = GameModels.dataSet.getDataSettingById(1202001);
                // mg.alertManager.showAlert(PromptAlert, false, true, Language.getExpression(Language.E_SFXH1MSGMTZJH, tmp.value.split("_")[1]), TypeBtnLabel.OK, null, utils.Handler.create(this, function () {
                //     GameModels.sceneGodDie.addGodDieCount();
                // }), null, true)
            };
            GodDieBossView.prototype.onEnterGameClick = function (e) {
                // GameModels.sceneGodDie.addGodDieCount();
                var id = GameModels.sceneGodDie.bossList[this._type * 6].CopyId;
                var copyData = GameModels.sceneGodDie.getCopyData(id);
                var mylv = convert.getFormulaLevel(GameModels.user.player.zhuanShenLevel, GameModels.user.player.level);
                // if (copyData.openLv > mylv||GameModels.activity.kaifuDay < GameModels.funcs.getConfig(4015).openDay) {
                //     mg.alertManager.tip(Language.getExpression(Language.E_KFD1TB2KF,GameModels.funcs.getConfig(4015).openDay,convert.getLevelName(copyData.openLv), 0xff0000));
                //     return;
                // }
                app.gameContext.enterGodDie(GameModels.sceneGodDie.bossList[this._type * 6].CopyId.toString());
            };
            GodDieBossView.prototype.onTabClick = function (e) {
                var index;
                if (e && e.target) {
                    index = this._tabBtnList.indexOf(e.target);
                }
                if (index != -1) {
                    for (var i = 0; i < this._tabBtnList.length; i++) {
                        if (i == index) {
                            this._tabBtnList[i].source = "goddie_json.goddie_page_" + i + "1";
                        }
                        else {
                            this._tabBtnList[i].source = "goddie_json.goddie_page_" + i + "0";
                        }
                    }
                    this._type = index;
                    this.refreshInfo();
                }
            };
            GodDieBossView.prototype.refreshInfo = function () {
                var roleArr = GameModels.sceneGodDie.bossList;
                for (var i = 0; i < this._bossItemList.length; i++) {
                    this._bossItemList[i].initializeData(roleArr[i + this._type * 6]);
                }
                var copyData = GameModels.sceneGodDie.getCopyData(roleArr[this._type * 6].CopyId);
                this.labCount.text = '000000';
                var list = copyData.dropShow.split(";");
                for (var i = 0; i < this._rewards.length; i++) {
                    if (list[i]) {
                        this._rewards[i].dataSource = (list[i] + "_" + 0);
                        this._rewards[i].visible = true;
                    }
                    else {
                        this._rewards[i].visible = false;
                    }
                }
            };
            return GodDieBossView;
        }(ui.GodDieSkin));
        goddie.GodDieBossView = GodDieBossView;
        __reflect(GodDieBossView.prototype, "dialog.goddie.GodDieBossView");
    })(goddie = dialog.goddie || (dialog.goddie = {}));
})(dialog || (dialog = {}));
