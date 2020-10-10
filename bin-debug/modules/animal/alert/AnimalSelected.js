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
    var AnimalSelected = (function (_super) {
        __extends(AnimalSelected, _super);
        function AnimalSelected() {
            var _this = _super.call(this) || this;
            _this._isCleckSure = false;
            _this._nameArr = [Language.C_YLLS, Language.C_XYLS, Language.C_SSLS, Language.C_SHLS, Language.C_CSLS];
            return _this;
        }
        AnimalSelected.prototype.show = function (animal) {
            this._animal = animal;
            this._isCleckSure = false;
            this.showList();
            this.showConsumeGroup();
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
            this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
        };
        AnimalSelected.prototype.showConsumeGroup = function () {
            this.itemGroup.removeChildren();
            var selectredArr = GameModels.animal.selectedAnimal;
            var needCount = this._animal.otherConsumeCount;
            var strArr = this._animal.templateNextLvs.consume1_Item.split(";");
            var item = Templates.getTemplateById(templates.Map.ITEM, strArr[0]);
            for (var i = 0; i < needCount; i++) {
                var obj = { item: null, selected: false };
                var animal = new renderer.AnimalItem();
                if (selectredArr[i]) {
                    var temp = Templates.getTemplateById(templates.Map.ITEM, selectredArr[i]);
                    obj.item = temp;
                    animal.data = obj;
                }
                else {
                    obj.item = ResPath.getQuality(item.quality) + ";" + "animal_json.img_animalWho_" + item.quality + ";" + this._nameArr[item.quality - 3];
                    animal.data = obj;
                }
                animal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAnimalClick, this);
                this.itemGroup.addChild(animal);
            }
            this.labCount.text = "(" + GameModels.animal.selectedAnimal.length + "/" + this._animal.otherConsumeCount + ")";
            this.labCount.textColor = GameModels.animal.selectedAnimal.length >= this._animal.otherConsumeCount ? TypeColor.GREEN1 : TypeColor.RED1;
        };
        AnimalSelected.prototype.showList = function () {
            var anyArr = [];
            var strArr = this._animal.templateNextLvs.consume1_Item.split(";");
            var item = Templates.getTemplateById(templates.Map.ITEM, strArr[0]);
            var animalArr = GameModels.bag.getItemsByTypeAndQuality(TypeItem.ANIMAL_ONE, item.quality);
            for (var i = 0; i < animalArr.length; i++) {
                for (var c = 0; c < animalArr[i].count; c++) {
                    if (GameModels.animal.selectedAnimal.length < this._animal.otherConsumeCount)
                        GameModels.animal.selectedAnimal.push(animalArr[i].id);
                }
            }
            for (var j = 0; j < animalArr.length; j++) {
                var obj = { item: null, selected: false, count: 0 };
                obj.item = animalArr[j];
                obj.count = this.getSameNum(animalArr[j].id, GameModels.animal.selectedAnimal);
                anyArr.push(obj);
            }
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(anyArr);
            }
            else {
                this._listData.source = anyArr;
            }
            this.list.dataProvider = this._listData;
            this.labNo.visible = anyArr.length <= 0;
        };
        AnimalSelected.prototype.getSameNum = function (val, arr) {
            var processArr = [];
            processArr = arr.filter(function (value) {
                return value == val;
            });
            return processArr.length;
        };
        AnimalSelected.prototype.onAnimalClick = function (e) {
            var target = e.currentTarget;
            if (target.data) {
                var data = target.data.item;
                if (data && data.id) {
                    if (GameModels.animal.selectedAnimal.indexOf(data.id.toString()) != -1) {
                        GameModels.animal.selectedAnimal.splice(GameModels.animal.selectedAnimal.indexOf(data.id.toString()), 1);
                        for (var _i = 0, _a = this._listData.source; _i < _a.length; _i++) {
                            var vo_1 = _a[_i];
                            if (vo_1.item.id == data.id) {
                                vo_1.count--;
                            }
                        }
                        this._listData.replaceAll(this._listData.source);
                    }
                    this.showConsumeGroup();
                }
                else {
                    mg.alertManager.tip(Language.C_DJXFXZCL);
                }
            }
        };
        AnimalSelected.prototype.onListClick = function (e) {
            var animal = this.list.selectedItem;
            if (!animal)
                return;
            var itemVo = animal.item;
            if (itemVo.count - animal.count <= 0)
                return;
            animal.count++;
            if (GameModels.animal.selectedAnimal.length < this._animal.otherConsumeCount) {
                GameModels.animal.selectedAnimal.push(itemVo.id);
            }
            else {
                for (var _i = 0, _a = this._listData.source; _i < _a.length; _i++) {
                    var vo_2 = _a[_i];
                    if (vo_2.item.id == GameModels.animal.selectedAnimal[GameModels.animal.selectedAnimal.length - 1]) {
                        vo_2.count--;
                    }
                }
                GameModels.animal.selectedAnimal.splice(GameModels.animal.selectedAnimal.length - 1, 1, itemVo.id);
            }
            this._listData.replaceAll(this._listData.source);
            this.showConsumeGroup();
        };
        AnimalSelected.prototype.onBtnClick = function (e) {
            this._isCleckSure = true;
            GameModels.animal.updataAnimalView();
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        AnimalSelected.prototype.clickHandler = function (e) {
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        AnimalSelected.prototype.hide = function () {
            if (!this._isCleckSure) {
                GameModels.animal.clearSelectedArr();
            }
            this._animal = null;
            this.clearList(this.list);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
            this.btnSure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return AnimalSelected;
    }(ui.AnimalSelectedSkin));
    animal_1.AnimalSelected = AnimalSelected;
    __reflect(AnimalSelected.prototype, "animal.AnimalSelected", ["IAlert", "egret.DisplayObject"]);
})(animal || (animal = {}));
