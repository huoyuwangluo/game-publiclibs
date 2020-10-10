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
        /**game.sgActivityType.haohuajiangchi*/
        var HaoHuaJiangChi = (function (_super) {
            __extends(HaoHuaJiangChi, _super);
            function HaoHuaJiangChi() {
                return _super.call(this) || this;
            }
            HaoHuaJiangChi.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._labNameArr = [this.labName1, this.labName2, this.labName3];
                this._labPlayerArr = [this.imgPlayer1, this.imgPlayer2, this.imgPlayer3];
                this._reward = [this.reward1, this.reward2, this.reward3];
            };
            HaoHuaJiangChi.prototype.addPlayerAvatar = function () {
                this._playerShowAvatar = [];
                if (!this._secondplayerShowAvatar) {
                    this._secondplayerShowAvatar = new components.PlayerShowAvatar();
                }
                this.addChildAt(this._secondplayerShowAvatar, 2);
                this._secondplayerShowAvatar.x = 105;
                this._secondplayerShowAvatar.y = 310;
                this._secondplayerShowAvatar.scaleX = this._secondplayerShowAvatar.scaleY = 0.6;
                if (!this._thirdplayerShowAvatar) {
                    this._thirdplayerShowAvatar = new components.PlayerShowAvatar();
                }
                this.addChildAt(this._thirdplayerShowAvatar, 3);
                this._thirdplayerShowAvatar.x = 495;
                this._thirdplayerShowAvatar.y = 310;
                this._thirdplayerShowAvatar.scaleX = this._thirdplayerShowAvatar.scaleY = 0.6;
                if (!this._firstplayerShowAvatar) {
                    this._firstplayerShowAvatar = new components.PlayerShowAvatar();
                }
                this.addChildAt(this._firstplayerShowAvatar, 4);
                this._firstplayerShowAvatar.x = 300;
                this._firstplayerShowAvatar.y = 320;
                this._playerShowAvatar.push(this._firstplayerShowAvatar);
                this._playerShowAvatar.push(this._secondplayerShowAvatar);
                this._playerShowAvatar.push(this._thirdplayerShowAvatar);
            };
            HaoHuaJiangChi.prototype.enter = function (data) {
                var _this = this;
                if (data === void 0) { data = null; }
                this.addPlayerAvatar();
                this._vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.haohuajiangchi);
                if (!this._vo)
                    return;
                this.labTime.text = utils.DateUtil.formatDateInChinese(new Date(this._vo.endTime * 1000), false);
                GameModels.sgActivity.requestSGGetActivityRank(this._vo.actCfgId, utils.Handler.create(this, function () {
                    _this.showUpView();
                }));
                this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankClick, this);
            };
            HaoHuaJiangChi.prototype.exit = function () {
                this._playerShowAvatar.length = 0;
                if (this._firstplayerShowAvatar) {
                    this._firstplayerShowAvatar.reset();
                    this._firstplayerShowAvatar = null;
                }
                if (this._secondplayerShowAvatar) {
                    this._secondplayerShowAvatar.reset();
                    this._secondplayerShowAvatar = null;
                }
                if (this._thirdplayerShowAvatar) {
                    this._thirdplayerShowAvatar.reset();
                    this._thirdplayerShowAvatar = null;
                }
                this.btnRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRankClick, this);
            };
            HaoHuaJiangChi.prototype.showUpView = function () {
                if (this._vo) {
                    var rewardListVo = this._vo.actRewardListVO;
                    var rankListVo = GameModels.sgActivity.actRankListVo;
                    for (var i = 0; i < 3; i++) {
                        var rewards = rewardListVo[i].templateRewards.split(";");
                        this._reward[i].dataSource = rewards.length > 0 && rewards[1] ? rewards[1] : null;
                        if (rankListVo[i]) {
                            this._labNameArr[i].text = rankListVo[i].playerName;
                            this._playerShowAvatar[i].visible = true;
                            this._labPlayerArr[i].visible = false;
                            var c = Templates.getTemplateById(templates.Map.GAMEFASHION, rankListVo[i].clothViewId);
                            var w = Templates.getTemplateById(templates.Map.GAMEFASHION, rankListVo[i].weaponViewId);
                            this._playerShowAvatar[i].clothResId = c ? c.modelId : rankListVo[i].clothViewId;
                            this._playerShowAvatar[i].weaponResId = w ? w.modelId : rankListVo[i].weaponViewId;
                        }
                        else {
                            this._labNameArr[i].text = Language.C_XWYD;
                            this._playerShowAvatar[i].visible = false;
                            this._labPlayerArr[i].visible = true;
                        }
                    }
                }
            };
            HaoHuaJiangChi.prototype.onRankClick = function (e) {
                mg.uiManager.show(dialog.activity.HaoHuaJiangChiRank);
            };
            return HaoHuaJiangChi;
        }(ui.HaoHuaJiangChiSkin));
        activity.HaoHuaJiangChi = HaoHuaJiangChi;
        __reflect(HaoHuaJiangChi.prototype, "view.activity.HaoHuaJiangChi", ["IModuleView", "egret.DisplayObject"]);
    })(activity = view.activity || (view.activity = {}));
})(view || (view = {}));
