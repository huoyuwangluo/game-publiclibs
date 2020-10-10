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
var renderer;
(function (renderer) {
    var TeamPlayerRendererCell = (function (_super) {
        __extends(TeamPlayerRendererCell, _super);
        function TeamPlayerRendererCell() {
            var _this = _super.call(this) || this;
            _this.touchEnabled = false;
            return _this;
        }
        TeamPlayerRendererCell.prototype.dataChanged = function () {
            if (this.data) {
                var data = this.data.playerInfo;
                this.imgTitle.source = (data.Position == 0 ? "explore_json.img_teamcopy_dzx" : "common_json.img_xiaobiao_png");
                this.labType.text = (data.Position == 0 ? Language.C_DZ : Language.C_DY);
                this.btnout.visible = (data.PlayerId != GameModels.copyMaterial.createId()) && (GameModels.copyMaterial.createId() == GameModels.user.player.uid);
                this.labName.text = data.PlayerName;
                this.labName.textColor = (data.PlayerId == GameModels.user.player.uid) ? 0x44c305 : 0x31A3E5;
                this.haveMc.visible = (data.PlayerId != "" ? true : false);
                this.notHaveMc.visible = (data.PlayerId != "" ? false : true);
                if (data.PlayerId != "") {
                    this.upPlayerShow(data.PlayerView);
                }
                else {
                    if (this._playerShowAvatar) {
                        this._playerShowAvatar.reset();
                        this.removeChild(this._playerShowAvatar);
                        this._playerShowAvatar = null;
                    }
                }
                this.btnout.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            }
            else {
                this.btnout.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                this.btnAdd.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
                if (this._playerShowAvatar) {
                    this._playerShowAvatar.reset();
                    this.removeChild(this._playerShowAvatar);
                    this._playerShowAvatar = null;
                }
            }
        };
        TeamPlayerRendererCell.prototype.clickHandler = function (e) {
            switch (e.currentTarget) {
                case this.btnout:
                    GameModels.copyMaterial.sendTeamKickOut(this.data.playerInfo.Position);
                    break;
                case this.btnAdd:
                    var copyVO = GameModels.copyMaterial.getTypelistVOById(mo.ModelGameMaterial.COPY_TEAM, this.data.copyId);
                    mg.alertManager.showAlert(TeamCopyInviteAlert, false, true, copyVO);
                    break;
            }
        };
        TeamPlayerRendererCell.prototype.upPlayerShow = function (data) {
            if (!data.ClothViewId || !data.WeaponViewId)
                return;
            var clothId = data.ClothViewId;
            var weaponId = data.WeaponViewId;
            var c = Templates.getTemplateById(templates.Map.GAMEFASHION, clothId);
            var w = Templates.getTemplateById(templates.Map.GAMEFASHION, weaponId);
            if (!!c) {
                clothId = c.modelId;
            }
            if (!!w) {
                weaponId = w.modelId;
            }
            if (!this._playerShowAvatar) {
                this._playerShowAvatar = new components.PlayerShowAvatar();
            }
            this.addChildAt(this._playerShowAvatar, 2);
            this._playerShowAvatar.scaleX = this._playerShowAvatar.scaleY = 0.8;
            this._playerShowAvatar.x = 107;
            this._playerShowAvatar.y = 280;
            this._playerShowAvatar.clothResId = clothId;
            this._playerShowAvatar.weaponResId = weaponId;
            if (parseInt(data.WingViewId) > 0) {
                this._playerShowAvatar.wingResId = data.WingViewId;
            }
            if (parseInt(data.HeadViewId) > 0) {
                this._playerShowAvatar.playHat(parseInt(data.HeadViewId));
            }
            // if (parseInt(data.ShoeViewId) > 0) {
            // 	this._playerShowAvatar.bottomResId = "1097";
            // }
        };
        return TeamPlayerRendererCell;
    }(ui.TeamPlayerRendererSkin));
    renderer.TeamPlayerRendererCell = TeamPlayerRendererCell;
    __reflect(TeamPlayerRendererCell.prototype, "renderer.TeamPlayerRendererCell");
})(renderer || (renderer = {}));
