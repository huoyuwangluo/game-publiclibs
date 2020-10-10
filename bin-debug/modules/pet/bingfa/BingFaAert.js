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
var tipUps;
(function (tipUps) {
    var BingFaAert = (function (_super) {
        __extends(BingFaAert, _super);
        /**state1 基础属性，没有技能
         * state2 基础属性 特殊属性，没有技能
         * state3 基础属性 特殊属性，有技能1
         * state4 基础属性，有技能1
         * state5 基础属性 特殊属性，有技能1 有技能2
         * state6 基础属性，有技能1 有技能2
         */
        //355 400 510 465 570 525
        function BingFaAert() {
            var _this = _super.call(this) || this;
            _this._count = 0;
            _this._angle = 0;
            return _this;
        }
        Object.defineProperty(BingFaAert.prototype, "data", {
            set: function (data) {
                if (data.hasOwnProperty("tabIndex")) {
                    this.show(data.data, data.petVo, data.tabIndex);
                }
                else {
                    this.show(data);
                }
            },
            enumerable: true,
            configurable: true
        });
        BingFaAert.prototype.show = function (data, vo, pos) {
            if (vo === void 0) { vo = null; }
            if (pos === void 0) { pos = -1; }
            this._vo = vo;
            this._pos = pos;
            this._data = data;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnHeCheng.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnTiHuan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnXieXia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnZhongZhu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.imgSkillPreView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSkillPreview, this);
            this.showView();
        };
        BingFaAert.prototype.showView = function () {
            if (this._data.bingFaSkillList.length == 0) {
                if (this._data.specialBingFaProp.length > 0) {
                    this.currentState = "state2";
                    this.imgBg.height = 400;
                }
                else {
                    this.currentState = "state1";
                    this.imgBg.height = 355;
                }
            }
            else if (this._data.bingFaSkillList.length == 1) {
                if (this._data.specialBingFaProp.length > 0) {
                    this.currentState = "state3";
                    this.imgBg.height = 510;
                }
                else {
                    this.currentState = "state4";
                    this.imgBg.height = 465;
                }
            }
            else {
                if (this._data.specialBingFaProp.length > 0) {
                    this.currentState = "state5";
                    this.imgBg.height = 570;
                }
                else {
                    this.currentState = "state6";
                    this.imgBg.height = 525;
                }
            }
            this.invalidateProperties();
        };
        BingFaAert.prototype.commitProperties = function () {
            _super.prototype.commitProperties.call(this);
            if (this._data instanceof vo.GamePetBingFaVO && this._vo) {
                this.addChild(this.group);
            }
            else {
                if (this.group.parent)
                    this.removeChild(this.group);
                this.imgBg.height = this.imgBg.height - this.group.height;
            }
            this.imgClose.y = this.imgBg.height;
            this.x = mg.stageManager.stageWidth / 2 - this.width / 2;
            this.y = mg.stageManager.stageHeight / 2 - this.height / 2;
            this.updata();
        };
        BingFaAert.prototype.updata = function () {
            this.imgQuality.source = ResPath.getQuality(this._data.quality);
            this.imgIcon.source = this._data.icon;
            this.labName.text = this._data.name;
            this.labName.textColor = TypeQuality.getQualityColor(this._data.quality);
            this.labAtts1.text = this._data.baseBingFaProp[0] ? TypeProperty.getChineseByPropertyValue(this._data.baseBingFaProp[0].strText) : "";
            this.labAtts2.text = this._data.specialBingFaProp[0] ? TypeProperty.getChineseByPropertyValue(this._data.specialBingFaProp[0].strText) : "";
            this.labAtts3.text = this._data.specialBingFaProp[1] ? TypeProperty.getChineseByPropertyValue(this._data.specialBingFaProp[1].strText) : "";
            this.skill1.dataSource = this._data.bingFaSkillList[0] ? this._data.bingFaSkillList[0] : null;
            this.skill2.dataSource = this._data.bingFaSkillList[1] ? this._data.bingFaSkillList[1] : null;
            this.labName1.text = this._data.bingFaSkillList[0] ? this._data.bingFaSkillList[0].name : "";
            this.labName2.text = this._data.bingFaSkillList[1] ? this._data.bingFaSkillList[1].name : "";
            this.labDes1.text = this._data.bingFaSkillList[0] ? this._data.bingFaSkillList[0].desc : "";
            this.labDes2.text = this._data.bingFaSkillList[1] ? this._data.bingFaSkillList[1].desc : "";
        };
        BingFaAert.prototype.onTabClick = function (e) {
            switch (e.currentTarget) {
                case this.btnClose:
                    mg.TipUpManager.instance.removeBlack();
                    this.removeSelf();
                    break;
                case this.btnHeCheng:
                    mg.uiManager.show(dialog.bag.BagDialog, { tabIndex: 4 });
                    mg.TipUpManager.instance.removeBlack();
                    this.removeSelf();
                    break;
                case this.btnTiHuan:
                    mg.uiManager.show(dialog.list.BingFaList, this._vo, this._pos);
                    mg.TipUpManager.instance.removeBlack();
                    this.removeSelf();
                    break;
                case this.btnXieXia:
                    GameModels.pet.petUnDressBingFa(this._vo.uid, this._pos, utils.Handler.create(this, function () {
                        mg.TipUpManager.instance.removeBlack();
                        this.removeSelf();
                    }));
                    break;
                case this.btnZhongZhu:
                    mg.uiManager.show(BingFaZhongZhu, this._vo, this._pos);
                    mg.TipUpManager.instance.removeBlack();
                    this.removeSelf();
                    break;
            }
        };
        BingFaAert.prototype.showSkillPreview = function (e) {
            mg.alertManager.showAlert(dialog.list.BingFaSkillPreview, true, true);
            mg.TipUpManager.instance.removeBlack();
            this.removeSelf();
        };
        BingFaAert.prototype.removeSelf = function () {
            mg.TipUpManager.instance.setCurrent();
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnHeCheng.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnTiHuan.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnXieXia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnZhongZhu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.imgSkillPreView.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showSkillPreview, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return BingFaAert;
    }(ui.BingFaAertSkin));
    tipUps.BingFaAert = BingFaAert;
    __reflect(BingFaAert.prototype, "tipUps.BingFaAert", ["ITipLogic", "egret.DisplayObject"]);
})(tipUps || (tipUps = {}));
