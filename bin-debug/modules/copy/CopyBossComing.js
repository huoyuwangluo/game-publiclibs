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
var bossComing;
(function (bossComing) {
    var CopyBossComing = (function (_super) {
        __extends(CopyBossComing, _super);
        function CopyBossComing() {
            return _super.call(this) || this;
        }
        CopyBossComing.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        CopyBossComing.prototype.show = function (data, isMuMing) {
            if (isMuMing === void 0) { isMuMing = false; }
            this.showView(data, isMuMing);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
            this.btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextClick, this);
            this.btnJemo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
        };
        CopyBossComing.prototype.showView = function (data, isMuMing) {
            if (isMuMing === void 0) { isMuMing = false; }
            if (isMuMing) {
                this.img_title.source = "common_comeon_title_png";
            }
            else {
                this.img_title.source = "common_get_title_png";
            }
            this._data = data;
            this.body.setPetBody(data.avatarId, false, true, true);
            this.imgXiYouPet.visible = data.isHashFourSkill;
            this.imgXiYouPet.source = data.quality == 8 ? "smokePet_json.img_smokepet_chuanshuo" : "smokePet_json.img_smokepet_xiyou";
            this.imgStar.source = "pet_json.img_petStar" + data.star + "_png";
            var dataModel = Templates.getTemplateByProperty(templates.Map.DATAMODEL, "resId", data.template.model);
            mg.soundManager.playSoundStopLast(dataModel.getSound, 1, true);
            if (data) {
                var skillList = data.skillList.list;
                this.baseSkill.show(1, skillList);
            }
            var shenBingVo = Templates.getTemplateByProperty(templates.Map.SMITHYSHENBING, "general", data.refId);
            var talentId = "";
            if (shenBingVo) {
                this.shenBingSkill.visible = true;
                var talentArr = shenBingVo.starTalent.split(";");
                if (data) {
                    var sbLv = data.shenBingLv < 1 ? 1 : data.shenBingLv;
                    for (var i = 0; i < talentArr.length; i++) {
                        if (sbLv >= parseInt(talentArr[i].split("_")[0])) {
                            talentId = talentArr[i].split("_")[1];
                        }
                    }
                }
                else {
                    talentId = talentArr[0].split("_")[1];
                }
                var sBSkillVO = vo.fromPool(vo.SkillVO);
                sBSkillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, talentId), 0);
                this.shenBingSkill.show(2, [sBSkillVO]);
            }
            else {
                this.shenBingSkill.visible = false;
            }
            if (data.isFirst) {
                this._startMovie = new s.DragonBoneMovieClip(s.DragonBoneMovieClip.ARMATURE);
                this._startMovie.resId = "xihuoxinmengjiang";
                this._startMovie.x = 300;
                this._startMovie.y = 350;
                this.addChild(this._startMovie);
                this._startMovie.playOnce("newAnimation");
                this._startMovie.onCompleteOnce(this, function () {
                    this._startMovie.stop();
                });
            }
            if (GameModels.user.player.level < 25) {
                this.btnNext.visible = false;
                this.btnJemo.visible = false;
            }
            else {
                this.btnNext.visible = true;
                this.btnJemo.visible = true;
            }
            // if (this._data.refId == "13002" && GameModels.user.player.level < 5) {
            // 	utils.timer.clearAll(this);
            // 	utils.timer.once(400, this, function () {
            // 		mg.guideManager.guideImmediately(this.btnBack, Language.J_DJGB, TypeDirection.RIGHT);
            // 	});
            // }
        };
        CopyBossComing.prototype.nextClick = function () {
            mg.uiManager.show(dialog.role.RoleMainDialog, { tabIndex: 0, param: 1 });
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        CopyBossComing.prototype.hide = function () {
            this._data = null;
            utils.timer.clearAll(this);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
            this.btnNext.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.nextClick, this);
            this.btnJemo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeClick, this);
            if (this._startMovie) {
                this._startMovie.stop();
                if (this._startMovie.parent) {
                    this._startMovie.parent.removeChild(this._startMovie);
                }
            }
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        CopyBossComing.prototype.closeClick = function (evt) {
            if (!this._data)
                return;
            if (evt.currentTarget == this.btnJemo) {
                mg.TipManager.instance.showTip(tips.GeneralInfoTip, this._data);
            }
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        return CopyBossComing;
    }(ui.CopyBossComingSkin));
    bossComing.CopyBossComing = CopyBossComing;
    __reflect(CopyBossComing.prototype, "bossComing.CopyBossComing", ["IAlert", "egret.DisplayObject"]);
})(bossComing || (bossComing = {}));
