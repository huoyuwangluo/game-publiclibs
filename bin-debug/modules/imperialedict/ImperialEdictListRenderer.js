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
    var ImperialEdictListRenderer = (function (_super) {
        __extends(ImperialEdictListRenderer, _super);
        function ImperialEdictListRenderer() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward3, _this.reward0, _this.reward1];
            _this._countryArr = [_this.imgCountry0, _this.imgCountry1];
            return _this;
        }
        ImperialEdictListRenderer.prototype.reset = function () {
            utils.timer.clear(this, this.refreshLastTime);
        };
        ImperialEdictListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.reset();
            if (this.data) {
                this.expProgress.visible = false;
                this.labTime.text = "";
                this._lastTime = 0;
                var vo = this.data;
                this._shengZhiVo = vo;
                this.labName.visible = vo.status != 3;
                this.imgMoShi.visible = vo.status != 3;
                this.labDiamonds.visible = vo.status != 3;
                this.labTaskName.text = vo.shengZhiTemp.name;
                this.img_levelBg.source = "imperialedict_json.img_LevelBg_" + vo.shengZhiTemp.quality;
                var rewards = vo.shengZhiTemp.rewards.split(";");
                for (var i = 0; i < 3; i++) {
                    var iconBox = this._rwards[i];
                    iconBox.labName.stroke = 1;
                    if (i < rewards.length) {
                        iconBox.dataSource = rewards[i];
                        iconBox.labName.text = "";
                        this.boxGroup.addChild(iconBox);
                    }
                    else {
                        if (iconBox.parent) {
                            iconBox.parent.removeChild(iconBox);
                        }
                    }
                }
                for (var j = 0; j < 2; j++) {
                    var icon = this._countryArr[j];
                    if (j < vo.petList.length) {
                        var pet = Templates.getTemplateById(templates.Map.GENERAL, vo.petList[j]);
                        icon.source = "common_json.img_union_point" + pet.country + "_png";
                        this.countryGroup.addChild(icon);
                    }
                    else {
                        if (icon.parent) {
                            icon.parent.removeChild(icon);
                        }
                    }
                }
                if (vo.status == 1) {
                    this.btnRefresh.skinName = "skins.SnapSmallButton4Skin";
                    this.btnRefresh.label = Language.J_JQ;
                    var value = GameModels.dataSet.getDataSettingValueById(540001);
                    var liangCao = Templates.getTemplateById(templates.Map.ITEM, "701");
                    this.labName.text = liangCao.name + ":";
                    this.imgMoShi.source = liangCao.icon;
                    this.labDiamonds.text = value.split("_")[1];
                }
                else if (vo.status == 2) {
                    this.btnRefresh.skinName = "skins.SnapSmallButton3Skin";
                    this.btnRefresh.label = Language.C_JS1;
                    var gold = Templates.getTemplateById(templates.Map.ITEM, 201);
                    this.labName.text = Language.C_XH + ":";
                    this.imgMoShi.source = gold.icon;
                    this.labDiamonds.text = (Math.floor((Math.floor(vo.leftTime / 3600) + 1) / 2) * 10).toString();
                    this._lastTime = vo.leftTime;
                    if (this._lastTime > 0) {
                        this.expProgress.visible = true;
                        this.expProgress.noTweenValue = (vo.shengZhiSetting.duration - this._lastTime) / vo.shengZhiSetting.duration;
                        utils.timer.loop(1000, this, this.refreshLastTime);
                        this.labTime.text = utils.DateUtil.formatTimeLeft(this._lastTime);
                    }
                }
                else if (vo.status == 3) {
                    this.btnRefresh.skinName = "skins.SnapSmallButton5Skin";
                    this.btnRefresh.label = Language.C_LQ;
                }
            }
            else {
                utils.timer.clear(this, this.refreshLastTime);
            }
        };
        ImperialEdictListRenderer.prototype.refreshLastTime = function () {
            if (this.data.status == 2) {
                if (this._lastTime <= 0) {
                    utils.timer.clear(this, this.refreshLastTime);
                    this.labTime.text = "";
                    this.expProgress.visible = false;
                    if (mg.uiManager.isOpen(pet.PetGroupMain)) {
                        var view = mg.uiManager.getView(pet.PetGroupMain);
                        if (view && view.shengzhiView)
                            view.shengzhiView.refreshListRenderer();
                    }
                    return;
                }
                this.expProgress.noTweenValue = (this._shengZhiVo.shengZhiSetting.duration - this._lastTime) / this._shengZhiVo.shengZhiSetting.duration;
                this.labTime.text = utils.DateUtil.formatTimeLeft(this._lastTime);
                this._lastTime--;
            }
            else {
                this.labTime.text = "";
                this.expProgress.visible = false;
            }
        };
        return ImperialEdictListRenderer;
    }(ui.ImperialEdictListRendererSkin));
    renderer.ImperialEdictListRenderer = ImperialEdictListRenderer;
    __reflect(ImperialEdictListRenderer.prototype, "renderer.ImperialEdictListRenderer");
})(renderer || (renderer = {}));
