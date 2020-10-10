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
var RankChapterRewardTitle = (function (_super) {
    __extends(RankChapterRewardTitle, _super);
    function RankChapterRewardTitle() {
        var _this = _super.call(this) || this;
        _this._rewardtitle = [_this.imgTitle_0, _this.imgTitle_1, _this.imgTitle_2];
        _this._wuGuanTitle = [_this.imgWuGuanTitle0, _this.imgWuGuanTitle1, _this.imgWuGuanTitle2];
        _this._labName = [_this.labname0, _this.labname1, _this.labname2];
        _this._rankImg = [_this.imgRanking0, _this.imgRanking1, _this.imgRanking2];
        _this._rankName = [_this.labRanking0, _this.labRanking1, _this.labRanking2];
        _this._rankReward = [_this.reward0, _this.reward1, _this.reward2];
        _this._guanZhi = [_this.labGuanZhi0, _this.labGuanZhi1, _this.labGuanZhi2];
        _this._playerShowAvatar0 = new components.PlayerShowAvatar();
        _this._playerShowAvatar0.scaleX = _this._playerShowAvatar0.scaleY = 0.8;
        _this.addChild(_this._playerShowAvatar0);
        _this._playerShowAvatar0.x = 290;
        _this._playerShowAvatar0.y = 310;
        _this._playerShowAvatar1 = new components.PlayerShowAvatar();
        _this._playerShowAvatar1.scaleX = _this._playerShowAvatar1.scaleY = 0.65;
        _this.addChild(_this._playerShowAvatar1);
        _this._playerShowAvatar1.x = 100;
        _this._playerShowAvatar1.y = 300;
        _this._playerShowAvatar2 = new components.PlayerShowAvatar();
        _this._playerShowAvatar2.scaleX = _this._playerShowAvatar2.scaleY = 0.65;
        _this.addChild(_this._playerShowAvatar2);
        _this._playerShowAvatar2.x = 480;
        _this._playerShowAvatar2.y = 300;
        _this._playerArr = [_this._playerShowAvatar0, _this._playerShowAvatar1, _this._playerShowAvatar2];
        return _this;
    }
    RankChapterRewardTitle.prototype.show = function () {
        var _this = this;
        this._index = -1;
        GameModels.ranking.requestRanking(109, utils.Handler.create(this, function (data) {
            if (!GameModels.ranking.onePlayerData)
                return;
            var playerVo = GameModels.ranking.laterPlayerData;
            for (var i = 0; i < 3; i++) {
                if (playerVo[i]) {
                    _this._wuGuanTitle[i].visible = true;
                    _this._rankImg[i].visible = true;
                    _this._playerArr[i].visible = true;
                    if (playerVo[i].playerData.WuGuanId <= 3) {
                        _this._guanZhi[i].text = "";
                        _this._wuGuanTitle[i].source = "military_json.military_title_" + playerVo[i].playerData.WuGuanId;
                    }
                    else {
                        _this._wuGuanTitle[i].source = null;
                        var wuguandata = Templates.getTemplateByProperty(templates.Map.CAMPWU, "step", playerVo[i].playerData.WuGuanId);
                        if (wuguandata)
                            _this._guanZhi[i].text = wuguandata.name;
                    }
                    _this._labName[i].text = playerVo[i].playerData.PlayerName;
                    _this._rankName[i].text = playerVo[i].playerData.PlayerName;
                    GameModels.ranking.requestPlayerData(playerVo[i].playerData.PlayerId, utils.Handler.create(_this, function (data) {
                        _this.refreshModel(data.PlayerData.PlayerClothViewId, data.PlayerData.PlayerWeaponViewId, data.PlayerData.PlayerWingViewId, data.PlayerData.PlayerHeadViewId, data.PlayerData.PlayerShoeViewId);
                    }));
                }
                else {
                    _this._wuGuanTitle[i].visible = false;
                    _this._labName[i].text = Language.C_XWYD;
                    _this._rankImg[i].visible = false;
                    _this._rankName[i].text = Language.C_XWYD;
                    _this._playerArr[i].visible = false;
                    _this._guanZhi[i].text = "";
                }
            }
        }));
        var temps = Templates.getTemplatesByProperty(templates.Map.RANKREWARD, "type", 1);
        for (var i = 0; i < temps.length; i++) {
            if (temps[i].rewards) {
                var titleTemp = Templates.getTemplateById(templates.Map.GAMEFASHION, temps[i].rewards.split("_")[0]);
                if (titleTemp) {
                    this._rewardtitle[i].source = ResPath.getShowTitlePath(titleTemp.modelId);
                    this._rewardtitle[i].scaleX = this._rewardtitle[i].scaleY = 0.8;
                }
                this._rankReward[i].dataSource = temps[i].rewards;
                this._rankReward[i].labName.text = "";
            }
            else {
                this._rewardtitle[i].source = null;
                this._rankReward[i].dataSource = null;
            }
        }
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
    };
    RankChapterRewardTitle.prototype.refreshModel = function (clothId, weaponId, wingId, headId, shoe) {
        this._index++;
        if (this._playerArr[this._index])
            this._playerArr[this._index].reset();
        var c = Templates.getTemplateById(templates.Map.GAMEFASHION, clothId);
        var w = Templates.getTemplateById(templates.Map.GAMEFASHION, weaponId);
        if (!!c) {
            clothId = c.modelId;
        }
        if (!!w) {
            weaponId = w.modelId;
        }
        if (this._playerArr[this._index]) {
            this._playerArr[this._index].clothResId = clothId;
            this._playerArr[this._index].weaponResId = weaponId;
            if (parseInt(wingId) > 0) {
                this._playerArr[this._index].wingResId = wingId;
            }
            if (parseInt(headId) > 0) {
                this._playerArr[this._index].playHat(parseInt(headId));
            }
        }
    };
    RankChapterRewardTitle.prototype.hide = function () {
        for (var i = 0; i < 3; i++) {
            this._playerArr[i].reset();
        }
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    RankChapterRewardTitle.prototype.onClose = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return RankChapterRewardTitle;
}(ui.RankChapterRewardTitleSkin));
__reflect(RankChapterRewardTitle.prototype, "RankChapterRewardTitle", ["IAlert", "egret.DisplayObject"]);
