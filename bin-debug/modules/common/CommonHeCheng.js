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
var components;
(function (components) {
    var CommonHeCheng = (function (_super) {
        __extends(CommonHeCheng, _super);
        function CommonHeCheng() {
            return _super.call(this) || this;
        }
        CommonHeCheng.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            // Mediator.getMediator(this).onAdd(this, this.enter);
            // Mediator.getMediator(this).onRemove(this, this.exit);
            this._btnTypeArr = [this.btnTalent, this.btnJiuXing, this.btnLiuDao];
            this._changePropArr = [this.reward1, this.reward2, this.reward3, this.reward4, this.reward5];
        };
        CommonHeCheng.prototype.enter = function (index) {
            if (index === void 0) { index = 0; }
            this._index = index;
            this.list.dataProvider = this._listData = new eui.ArrayCollection();
            this.listDown.dataProvider = this._listDownData = new eui.ArrayCollection();
            for (var i = 0; i < this._changePropArr.length; i++) {
                this._changePropArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.showInfoClick, this);
            }
            for (var i = 0; i < this._btnTypeArr.length; i++) {
                if (i == index) {
                    this._btnTypeArr[i].currentState = "down";
                }
                else {
                    this._btnTypeArr[i].currentState = "up";
                }
            }
            this.initializeHeChengItem();
            this.showType(this._index);
            this.btnJiuXing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this.btnLiuDao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this.btnTalent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
            this.listDown.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListDownClick, this);
            this.btnPutIn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOneKeyClick, this);
            this.btnHeCheng.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHeChengClick, this);
            this.btnSkillPreview.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSkillPreview, this);
        };
        CommonHeCheng.prototype.exit = function () {
            this._index = 0;
            utils.timer.clearAll(this);
            for (var i = 0; i < this._changePropArr.length; i++) {
                this._changePropArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showInfoClick, this);
            }
            this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
            this.listDown.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListDownClick, this);
            this.btnJiuXing.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this.btnLiuDao.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this.btnTalent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this.btnPutIn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnOneKeyClick, this);
            this.btnHeCheng.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnHeChengClick, this);
            this.btnSkillPreview.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showSkillPreview, this);
        };
        CommonHeCheng.prototype.initializeHeChengItem = function () {
            this._changePropData = [];
            this.showSelecdProp();
        };
        CommonHeCheng.prototype.btnClick = function (evt) {
            this.initializeHeChengItem();
            var index = this._btnTypeArr.indexOf(evt.currentTarget);
            this._index = index;
            for (var i = 0; i < this._btnTypeArr.length; i++) {
                if (i == index) {
                    this._btnTypeArr[i].currentState = "down";
                }
                else {
                    this._btnTypeArr[i].currentState = "up";
                }
            }
            this.showType(index);
        };
        CommonHeCheng.prototype.showType = function (index) {
            switch (index) {
                case 0:
                    this._type = TypeItem.BINGFA_BOOK;
                    this.imgBg.source = "bag_heChengBg1_jpg";
                    break;
                case 1:
                    this._type = TypeEquip.JIUQU_EQIUP;
                    this.imgBg.source = "bag_heChengBg_jpg";
                    break;
                case 2:
                    this._type = TypeEquip.LIUDAO_EQIUP;
                    this.imgBg.source = "bag_heChengBg_jpg";
                    break;
            }
            this.showListView(index);
        };
        CommonHeCheng.prototype.onListClick = function (e) {
            this.list.selectedIndex = this._selectIndex = e.itemIndex;
            this.initializeHeChengItem();
            this.showView();
        };
        CommonHeCheng.prototype.showListView = function (index) {
            this._selectIndex = 0;
            this.list.selectedIndex = this._selectIndex;
            this._listData.source = GameModels.hecheng.getJiuXingEquipStep(this._index);
            this.scroller.anchorOffsetX = this.scroller.width / 2;
            this.scroller.anchorOffsetY = this.scroller.height / 2;
            for (var i = 0; i < this._btnTypeArr.length; i++) {
                if (i > index) {
                    if (i - 1 == index) {
                        this._btnTypeArr[i].y = this.scroller.y + this.scroller.height / 2 + this._btnTypeArr[i].height / 2 + 2;
                    }
                    else {
                        this._btnTypeArr[i].y = this._btnTypeArr[i - 1].y + this._btnTypeArr[i - 1].height + 2;
                    }
                }
                else if (i == index) {
                    for (var j = 0; j <= index; j++) {
                        if (j > 0) {
                            this._btnTypeArr[j].y = this._btnTypeArr[j - 1].y + this._btnTypeArr[j - 1].height + 2;
                        }
                    }
                    this.scroller.x = this._btnTypeArr[index].x;
                    this.scroller.y = this._btnTypeArr[index].y + this._btnTypeArr[index].height / 2 + this.scroller.height / 2;
                }
            }
            this.showView();
        };
        CommonHeCheng.prototype.showView = function () {
            this.updataRedPoint();
            this.btnSkillPreview.visible = this._type == TypeItem.BINGFA_BOOK;
            var isEqiup = this._type != TypeItem.BINGFA_BOOK;
            var propIdArr = [];
            var num = 0;
            if (isEqiup) {
                propIdArr = GameModels.hecheng.getItemsByTypeAndStep(this._type, this._selectIndex + 1, isEqiup);
            }
            else {
                propIdArr = GameModels.hecheng.getItemsByTypeAndStep(this._type, this._selectIndex + 2, isEqiup);
            }
            this._itemArr = [];
            for (var i = 0; i < propIdArr.length; i++) {
                var tempData = { id: 0, count: 0, isCanClick: true };
                tempData.id = parseInt(propIdArr[i]);
                if (isEqiup) {
                    num = GameModels.bag.getEquipCountById(propIdArr[i]);
                    if (this._changePropData[0] && this._changePropData[0].id != propIdArr[i]) {
                        tempData.isCanClick = false;
                    }
                }
                else {
                    num = GameModels.bag.getBingFaCountById(propIdArr[i]);
                    tempData.isCanClick = true;
                }
                for (var j = 0; j < this._changePropData.length; j++) {
                    if (this._changePropData[j].id == propIdArr[i]) {
                        num--;
                    }
                }
                if (num <= 0)
                    continue;
                tempData.count = num;
                this._itemArr.push(tempData);
            }
            this._listDownData.source = this._itemArr;
            this.labHave.visible = this._itemArr.length <= 0;
            // this.LabDes.text = isEqiup ? Language.J_GYJZB : Language.J_GYJTF;
        };
        CommonHeCheng.prototype.onListDownClick = function (e) {
            var index = this._type == TypeItem.BINGFA_BOOK ? 5 : 3;
            if (this._changePropData.length >= index) {
                mg.alertManager.tip(Language.C_CLYM);
                return;
            }
            this._changePropData.push(this.listDown.selectedItem);
            this.showSelecdProp();
            this.showView();
        };
        CommonHeCheng.prototype.showSelecdProp = function () {
            var index = this._type == TypeItem.BINGFA_BOOK ? 5 : 3;
            for (var i = 0; i < 5; i++) {
                if (this._changePropData[i]) {
                    this._changePropArr[i].visible = true;
                    this._changePropArr[i].data = this._changePropData[i];
                    this._changePropArr[i].labCount.text = "";
                }
                else {
                    this._changePropArr[i].visible = false;
                    this._changePropArr[i].data = null;
                }
            }
            if (this._changePropData.length != index) {
                this.reward0.data = null;
                this.reward0.visible = false;
            }
            else {
                var itemId = 0;
                if (this._type == TypeItem.BINGFA_BOOK) {
                    itemId = 800000 + (this._selectIndex + 2);
                }
                else {
                    if (this._changePropArr[0]) {
                        var temp = Templates.getTemplateById(templates.Map.EQUIP, this._changePropArr[0].data.id);
                        itemId = temp ? parseInt(temp.nextId) : 0;
                    }
                }
                var tempData = { id: itemId, count: 0, isCanClick: true };
                this.reward0.data = tempData;
                this.reward0.visible = true;
            }
        };
        CommonHeCheng.prototype.showInfoClick = function (evt) {
            var index = this._changePropArr.indexOf(evt.currentTarget);
            if (this._changePropData[index]) {
                this._changePropData.splice(index, 1);
            }
            this.showSelecdProp();
            this.showView();
        };
        CommonHeCheng.prototype.btnOneKeyClick = function (evt) {
            if (this._type != TypeItem.BINGFA_BOOK) {
                var temp = [];
                var propIdArr = GameModels.hecheng.getItemsByTypeAndStep(this._type, this._selectIndex + 1, true);
                for (var i = 0; i < propIdArr.length; i++) {
                    if (GameModels.bag.getEquipCountById(propIdArr[i]) >= 3) {
                        temp.push(propIdArr[i]);
                    }
                }
                if (temp.length > 0) {
                    this.initializeHeChengItem();
                    for (var i = 0; i < 3; i++) {
                        var tempData = { id: temp[0], count: 0, isCanClick: true };
                        this._changePropData.push(tempData);
                    }
                    this.showSelecdProp();
                    this.showView();
                }
                else {
                    mg.alertManager.tip(Language.C_MYZGCL);
                }
            }
            else {
                //天赋一键放入
                var allPropIdArr = [];
                var propIdArr = GameModels.hecheng.getItemsByTypeAndStep(this._type, this._selectIndex + 2, false);
                for (var i = 0; i < propIdArr.length; i++) {
                    var count = GameModels.bag.getBingFaCountById(propIdArr[i]);
                    for (var j = 0; j < count; j++) {
                        allPropIdArr.push(propIdArr[i]);
                    }
                }
                if (allPropIdArr.length >= 5) {
                    this.initializeHeChengItem();
                    for (var i = 0; i < 5; i++) {
                        var tempData = { id: allPropIdArr[i], count: 0, isCanClick: true };
                        this._changePropData.push(tempData);
                    }
                    this.showSelecdProp();
                    this.showView();
                }
                else {
                    mg.alertManager.tip(Language.C_MYZGCL);
                }
            }
        };
        CommonHeCheng.prototype.btnHeChengClick = function (evt) {
            if (this._changePropData.length < 3)
                return;
            if (this._type != TypeItem.BINGFA_BOOK) {
                var refDate = this.reward0.data;
                if (refDate) {
                    GameModels.hecheng.requesHeChengNewEquips(parseInt(refDate.id), utils.Handler.create(this, this.showAwardView));
                }
                else {
                    mg.alertManager.tip(Language.J_QFRZGWP);
                }
            }
            else {
                //天赋合成
                var refDate = this.reward0.data;
                if (refDate) {
                    var id = this._selectIndex + 11;
                    var idArr = [];
                    for (var i = 0; i < this._changePropData.length; i++) {
                        idArr.push(this._changePropData[i].id);
                    }
                    GameModels.hecheng.itemCompose(id, idArr, utils.Handler.create(this, this.showAwardView));
                }
                else {
                    mg.alertManager.tip(Language.J_QFRZGWP);
                }
            }
        };
        CommonHeCheng.prototype.updataRedPoint = function () {
            this.btnJiuXing.isWarn = GameModels.common.checkJiuXingHeChengRedPoint();
            this.btnLiuDao.isWarn = GameModels.common.checkLiuFDaoHeChengRedPoint();
            this.btnTalent.isWarn = GameModels.common.checkBingFaHeChengRedPoint();
        };
        CommonHeCheng.prototype.showAwardView = function (data) {
            var vos = [];
            var itemVO = null;
            if (data instanceof n.G2C_NewEquip_HeCheng) {
                itemVO = vo.fromPool(vo.ItemVO, data.TargetRefId);
            }
            else {
                itemVO = vo.fromPool(vo.ItemVO, data.NewItemId);
            }
            vos.push(itemVO);
            if (vos && vos.length > 0) {
                this.initializeHeChengItem();
                this.showView();
                if (this._listData)
                    this._listData.replaceAll(GameModels.hecheng.getJiuXingEquipStep(this._index));
                mg.alertManager.showAlert(ChestPreviewAlert, true, true, vos, null, null, null, false, false, null, Language.J_ZCHD);
            }
        };
        CommonHeCheng.prototype.showSkillPreview = function (e) {
            mg.alertManager.showAlert(dialog.list.BingFaSkillPreview, true, true);
        };
        CommonHeCheng.prototype.btnIconClick = function (e) {
            mg.uiManager.remove(this);
        };
        return CommonHeCheng;
    }(ui.CommonHeChengSkin));
    components.CommonHeCheng = CommonHeCheng;
    __reflect(CommonHeCheng.prototype, "components.CommonHeCheng");
})(components || (components = {}));
