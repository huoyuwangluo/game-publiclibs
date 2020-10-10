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
var animal;
(function (animal_1) {
    var AnimalFree = (function (_super) {
        __extends(AnimalFree, _super);
        function AnimalFree() {
            return _super.call(this) || this;
        }
        AnimalFree.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
        };
        AnimalFree.prototype.enter = function () {
            this.textInputNum.text = "0";
            this.itemGroup.visible = false;
            this._item = null;
            this.showView();
            this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
            this.btnFree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnMin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnJia.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnJian.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.textInputNum.addEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
        };
        AnimalFree.prototype.showView = function () {
            var anyArr = [];
            var animalArr = GameModels.bag.getItemsByType(TypeItem.ANIMAL_ONE);
            for (var j = 0; j < animalArr.length; j++) {
                var obj = { item: null, selected: false, count: 0 };
                obj.item = animalArr[j];
                if (this._item && animalArr[j].id == this._item.id) {
                    obj.count = Number(this.textInputNum.text);
                }
                anyArr.push(obj);
            }
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(anyArr);
            }
            else {
                this._listData.source = anyArr;
            }
            this.list.dataProvider = this._listData;
            this.showItemGroup();
        };
        AnimalFree.prototype.showItemGroup = function () {
            if (this._item) {
                this.itemGroup.visible = true;
                var obj = { item: null, selected: false, count: 0 };
                obj.item = this._item;
                obj.count = this._item.count - 1;
                this.item.data = obj;
                this.textInputNum.text = "1";
                this.showGetReward();
            }
            else {
                this.itemGroup.visible = false;
            }
        };
        AnimalFree.prototype.showGetReward = function () {
            if (!this._item)
                return;
            var str = this._item.templateProp.split.split("|");
            var itemArr = str[1].split("_");
            var item = Templates.getTemplateById(templates.Map.ITEM, itemArr[0]);
            this.labCount.text = Language.C_KHD + ":" + item.name + "X" + Number(this.textInputNum.text) * parseInt(itemArr[1]);
        };
        AnimalFree.prototype.OnCharactorChange = function (event) {
            if (!this._item)
                return;
            var num = Number(this.textInputNum.text);
            if (num > this._item.count) {
                num = this._item.count;
            }
            for (var _i = 0, _a = this._listData.source; _i < _a.length; _i++) {
                var vo_1 = _a[_i];
                if (vo_1.item.id == this._item.id) {
                    vo_1.count = num;
                }
            }
            this._listData.replaceAll(this._listData.source);
            this.textInputNum.text = String(num);
            this.item.labCount.text = num.toString();
            this.showGetReward();
        };
        AnimalFree.prototype.onListClick = function (e) {
            var animal = this.list.selectedItem;
            if (!animal)
                return;
            var itemVo = animal.item;
            if (itemVo.count - animal.count <= 0)
                return;
            this._item = animal.item;
            this.textInputNum.text = "1";
            this.showView();
            this.showItemGroup();
        };
        AnimalFree.prototype.onClick = function (e) {
            var _this = this;
            var num = Number(this.textInputNum.text);
            switch (e.target) {
                case this.btnFree:
                    GameModels.bag.requestResovle(2, this._item.index, num, utils.Handler.create(this, function () {
                        _this._item = null;
                        mg.alertManager.tip(Language.C_FSCG);
                        _this.showView();
                    }));
                    break;
                case this.btnMax:
                    num = this._item.count;
                    break;
                case this.btnMin:
                    num = 1;
                    break;
                case this.btnJia:
                    num = num + 1;
                    break;
                case this.btnJian:
                    num = num - 1;
                    break;
            }
            if (this.textInputNum.text == "" || num < 1) {
                this.textInputNum.text = "1";
                num = 1;
            }
            if (num > this._item.count) {
                num = this._item.count;
                mg.alertManager.tip(Language.C_YDCYSX);
            }
            this.textInputNum.text = String(num);
            for (var _i = 0, _a = this._listData.source; _i < _a.length; _i++) {
                var vo_2 = _a[_i];
                if (vo_2.item.id == this._item.id) {
                    vo_2.count = num;
                }
            }
            this._listData.replaceAll(this._listData.source);
            this.item.labCount.text = num.toString();
            this.showGetReward();
        };
        AnimalFree.prototype.exit = function () {
            this.clearList(this.list);
            this.itemGroup.visible = false;
            this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
            this.btnFree.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnMax.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnMin.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnJia.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.btnJian.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.textInputNum.removeEventListener(egret.Event.CHANGE, this.OnCharactorChange, this);
        };
        return AnimalFree;
    }(ui.AnimalFreeSkin));
    animal_1.AnimalFree = AnimalFree;
    __reflect(AnimalFree.prototype, "animal.AnimalFree");
})(animal || (animal = {}));
