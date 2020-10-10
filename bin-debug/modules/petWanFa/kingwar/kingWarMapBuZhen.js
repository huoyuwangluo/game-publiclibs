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
/**国战编辑界面 */
var kingWarMapBuZhen = (function (_super) {
    __extends(kingWarMapBuZhen, _super);
    function kingWarMapBuZhen() {
        var _this = _super.call(this) || this;
        _this._headArr = [_this.head0, _this.head1, _this.head2, _this.head3, _this.head4];
        _this._skillIconList = [_this.skill1, _this.skill2, _this.skill3];
        _this._skillLockList = [_this.skillLock1, _this.skillLock2, _this.skillLock3];
        _this._btnArr = [_this.btn0, _this.btn1, _this.btn2, _this.btn3, _this.btn4];
        _this._labArr = [_this.lab0, _this.lab1, _this.lab2, _this.lab3, _this.lab4];
        return _this;
    }
    kingWarMapBuZhen.prototype.show = function (dataType) {
        var _this = this;
        this._dataType = dataType;
        this._currSelecdIndex = 0;
        TypeFormation.CURR_ZHENYING_TYPE = this._dataType;
        GameModels.pet.headSelfArr = this._headArr;
        this.labDes.text = Language.J_ZSWJHJYWJKSZ;
        this.labJuYi.textFlow = utils.htmlUtil.getUnderlineFormat(Language.J_QWJY);
        this.labDes.x = 42;
        GameModels.pet.petGetFormationData(this._dataType, utils.Handler.create(this, function () {
            _this.registerMoveItem();
            _this.showView();
            _this.updataInfo();
            _this.updataList();
            _this.showBtnView();
        }));
        this.skill1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.skill2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.skill3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
        this.labJuYi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        for (var i = 0; i < this._headArr.length; i++) {
            this._headArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadClick, this);
        }
        this.btnSave.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnClick, this);
        for (var i = 0; i < this._btnArr.length; i++) {
            this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTableClick, this);
        }
    };
    kingWarMapBuZhen.prototype.updataInfo = function () {
        this.skill1.source = "legionSkill_json.img_legionSkill_601101";
        this.skill2.source = "legionSkill_json.img_legionSkill_601201";
        this.skill3.source = "legionSkill_json.img_legionSkill_601301";
        if (GameModels.pet.getLegionSkillByGameType(TypeGame.KING_WAR)) {
            var strArr = GameModels.pet.getLegionSkillByGameType(TypeGame.KING_WAR).skill.split(";");
            for (var i = 0; i < this._skillIconList.length; i++) {
                if (strArr[i]) {
                    this._skillLockList[i].visible = false;
                    this._skillIconList[i].source = "legionSkill_json.img_legionSkill_" + strArr[i];
                    this._skillIconList[i].filters = null;
                }
                else {
                    this._skillLockList[i].visible = true;
                    this._skillIconList[i].filters = utils.filterUtil.grayFilters;
                }
            }
        }
        else {
            this.skill1.filters = this.skill2.filters = this.skill3.filters = utils.filterUtil.grayFilters;
        }
    };
    kingWarMapBuZhen.prototype.registerMoveItem = function () {
        var _this = this;
        var drags = this._headArr;
        var puts = this._headArr;
        this.moveItem.register(this, drags, function (index) {
            _this._touchIndex = index;
            logger.log("dragHandler" + index);
            _this._headArr[_this._touchIndex].visible = false;
            return true;
        }, puts, function (index) {
            _this._endIndex = index;
            logger.log("putHandler" + index);
            _this._headArr[_this._touchIndex].visible = true;
            if (_this._endIndex == 9999) {
                _this.resetPetPosData();
                return false;
            }
            if (_this._endIndex == -1) {
                _this.resetPetPosData();
                return false;
            }
            if (_this._touchIndex < 3 && _this._endIndex >= 3) {
                mg.alertManager.tip(Language.J_QPWJZNBZQP);
                _this.resetPetPosData();
                return false;
            }
            if (_this._touchIndex >= 3 && _this._endIndex < 3) {
                mg.alertManager.tip(Language.J_HPWJZNBZHP);
                _this.resetPetPosData();
                return false;
            }
            var touchVo = _this._headArr[_this._touchIndex].vo;
            var endVo = _this._headArr[_this._endIndex].vo;
            if (endVo) {
                _this._headArr[_this._touchIndex].data = endVo;
            }
            else {
                _this._headArr[_this._touchIndex].data = null;
            }
            _this._headArr[_this._endIndex].data = touchVo;
            _this.resetPetPosData();
            return true;
        }, function (index) {
            if (index < 0)
                return false;
            _this._headArr[index].visible = false;
            _this._headArr[index].data = null;
            _this.resetPetPosData();
            return true;
        });
        this.moveItem.getSourceMethod = function (selectItem, index) {
            return selectItem.vo;
        };
    };
    kingWarMapBuZhen.prototype.resetPetPosData = function () {
        var _this = this;
        this._petUid = [];
        for (var i = 0; i < this._headArr.length; i++) {
            this._petUid.push(this._headArr[i].petUid);
        }
        GameModels.pet.petSetFormationDataLinShi(this._petUid, utils.Handler.create(this, function () {
            _this.showView();
            _this.updataList();
            _this.updataInfo();
        }));
    };
    kingWarMapBuZhen.prototype.showView = function () {
        var formationData = GameModels.pet.formationDataLinShi;
        //this.btnSave.visible = GameModels.pet.hashFormationLinShiData;
        for (var i = 0; i < this._headArr.length; i++) {
            this._headArr[i].filters = null;
            if (formationData[i]) {
                this._headArr[i].visible = true;
                var vo = GameModels.pet.getAllPetVOByUid(formationData[i]);
                this._headArr[i].data = vo;
            }
            else {
                this._headArr[i].data = null;
            }
        }
    };
    kingWarMapBuZhen.prototype.onHeadClick = function (e) {
        logger.log("111111111111111");
        for (var i = 0; i < this._headArr.length; i++) {
            if (e.currentTarget == this._headArr[i]) {
                this._headArr[i].visible = false;
                this._headArr[i].data = null;
                this.resetPetPosData();
                break;
            }
        }
    };
    kingWarMapBuZhen.prototype.updataList = function () {
        var petVoArr1 = GameModels.pet.formatUpVOList.concat(GameModels.pet.gongMingPetList);
        var petVoArr = [];
        for (var i = 0; i < petVoArr1.length; i++) {
            if (this._currSelecdIndex == 0) {
                petVoArr.push(petVoArr1[i]);
            }
            else {
                if (petVoArr1[i].template.country == this._currSelecdIndex) {
                    petVoArr.push(petVoArr1[i]);
                }
            }
        }
        if (petVoArr.length > 0) {
            this.labNo.visible = false;
            this.labHide.visible = true;
            petVoArr.sort(function (a, b) {
                return b.star - a.star;
            });
            if (petVoArr) {
                if (!this._listData) {
                    this._listData = new eui.ArrayCollection(petVoArr);
                }
                else {
                    this._listData.replaceAll(petVoArr);
                }
            }
            this.list.dataProvider = this._listData;
        }
        else {
            this.labNo.visible = true;
            this.labHide.visible = false;
            if (!this._listData) {
                this._listData = new eui.ArrayCollection([]);
            }
            else {
                this._listData.replaceAll([]);
            }
            this.list.dataProvider = this._listData;
        }
    };
    kingWarMapBuZhen.prototype.getState = function (uid) {
        var voList = GameModels.kingwar.kingWarArmyVOArr;
        if (this._dataType == TypeFormation.UP_FORMATION_KINGWAR1) {
            if ((voList[1] && voList[1].kingWarPetUidVOArr.indexOf(uid) != -1) || (voList[2] && voList[2].kingWarPetUidVOArr.indexOf(uid) != -1)) {
                return true;
            }
        }
        else if (this._dataType == TypeFormation.UP_FORMATION_KINGWAR2) {
            if ((voList[0] && voList[0].kingWarPetUidVOArr.indexOf(uid) != -1) || (voList[2] && voList[2].kingWarPetUidVOArr.indexOf(uid) != -1)) {
                return true;
            }
        }
        else {
            if ((voList[0] && voList[0].kingWarPetUidVOArr.indexOf(uid) != -1) || (voList[1] && voList[1].kingWarPetUidVOArr.indexOf(uid) != -1)) {
                return true;
            }
        }
        return false;
    };
    kingWarMapBuZhen.prototype.onListClick = function (e) {
        var item = this.list.selectedItem;
        if (!item)
            return;
        if (this.getState(item.uid)) {
            mg.alertManager.tip(Language.J_GWJYZQTBDZ);
            return;
        }
        var formationData = GameModels.pet.formationDataLinShi;
        if (formationData.indexOf(item.uid) == -1 && GameModels.pet.formationPetRefIdDataLinShi.indexOf(item.refId) != -1) {
            mg.alertManager.tip(Language.J_TYZWJZNSZYG);
            return;
        }
        if (formationData.indexOf(item.uid) != -1) {
            for (var i = 0; i < this._headArr.length; i++) {
                if (this._headArr[i].data == item) {
                    this._headArr[i].visible = false;
                    this._headArr[i].data = null;
                    this.resetPetPosData();
                    break;
                }
            }
            return;
        }
        var isBool = false;
        if (item.template.corps <= 3) {
            for (var i = 0; i < 3; i++) {
                if (!this._headArr[i].data) {
                    this._headArr[i].visible = true;
                    this._headArr[i].data = item;
                    isBool = true;
                    break;
                }
            }
        }
        else {
            for (var i = 3; i < 5; i++) {
                if (!this._headArr[i].data) {
                    this._headArr[i].visible = true;
                    this._headArr[i].data = item;
                    isBool = true;
                    break;
                }
            }
        }
        if (!isBool) {
            mg.alertManager.tip(item.template.corps <= 3 ? Language.J_MYKSZQPWZ : Language.J_MYKSZHPWZ);
            return;
        }
        this.resetPetPosData();
    };
    kingWarMapBuZhen.prototype.onBtnClick = function (e) {
        var _this = this;
        if (e.currentTarget == this.btnSave) {
            this._petUid = [];
            for (var i = 0; i < this._headArr.length; i++) {
                this._petUid.push(this._headArr[i].petUid);
            }
            GameModels.pet.petSetFormationData(this._dataType, this._petUid, utils.Handler.create(this, function () {
                _this.dispatchEventWith(egret.Event.CLOSE);
                mg.alertManager.showAlert(dialog.kingwar.kingWarMapArmyInfo, true, true);
            }));
        }
        else if (e.currentTarget == this.skill1) {
            mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: 1, config: null });
        }
        else if (e.currentTarget == this.skill2) {
            mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: 2, config: null });
        }
        else if (e.currentTarget == this.skill3) {
            mg.TipManager.instance.showTip(tips.BuZhenAlert, { skillId: 3, config: null });
        }
        else if (e.currentTarget == this.labJuYi) {
            this.dispatchEventWith(egret.Event.CLOSE);
            mg.uiManager.show(pet.PetGongMingMain);
        }
    };
    kingWarMapBuZhen.prototype.onClose = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    kingWarMapBuZhen.prototype.onTableClick = function (e) {
        this._currSelecdIndex = this._btnArr.indexOf(e.currentTarget);
        this.scroller.viewport.scrollV = 0;
        this.updataList();
        this.showBtnView();
    };
    kingWarMapBuZhen.prototype.showBtnView = function () {
        for (var i = 0; i < this._btnArr.length; i++) {
            if (i == this._currSelecdIndex) {
                this._btnArr[i].currentState = "down";
                this._labArr[i].textColor = 0xCCC6BA;
            }
            else {
                this._btnArr[i].currentState = "up";
                this._labArr[i].textColor = 0x969696;
            }
        }
    };
    kingWarMapBuZhen.prototype.hide = function () {
        TypeFormation.CURR_ZHENYING_TYPE = 0;
        GameModels.pet.headSelfArr = [];
        this.moveItem.reset();
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.btnSave.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBtnClick, this);
        this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
        for (var i = 0; i < this._headArr.length; i++) {
            this._headArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHeadClick, this);
            this._headArr[i].data = null;
        }
        for (var i = 0; i < this._btnArr.length; i++) {
            this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTableClick, this);
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return kingWarMapBuZhen;
}(ui.kingWarMapBuZhenSkin));
__reflect(kingWarMapBuZhen.prototype, "kingWarMapBuZhen", ["IAlert", "egret.DisplayObject"]);
