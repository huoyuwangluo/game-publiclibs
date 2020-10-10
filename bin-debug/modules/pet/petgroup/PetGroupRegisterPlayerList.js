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
var pet;
(function (pet) {
    var PetGroupRegisterPlayerList = (function (_super) {
        __extends(PetGroupRegisterPlayerList, _super);
        function PetGroupRegisterPlayerList() {
            return _super.call(this) || this;
        }
        PetGroupRegisterPlayerList.prototype.show = function (petGroupVo) {
            var _this = this;
            this.list.dataProvider = this._listData = new eui.ArrayCollection([]);
            GameModels.petGroup.requestetRegisterPlayerList(petGroupVo.id, utils.Handler.create(this, function (data) {
                if (data.PlayerList) {
                    _this.labNo.visible = data.PlayerList.length <= 0;
                    var anyArr = [];
                    for (var _i = 0, _a = data.PlayerList; _i < _a.length; _i++) {
                        var player = _a[_i];
                        player.autoRecover = false;
                        var obj = { name: null, time: 0 };
                        obj.name = player.Key;
                        obj.time = player.Value;
                        anyArr.push(obj);
                    }
                    if (!_this._listData) {
                        _this._listData = new eui.ArrayCollection(anyArr);
                    }
                    else {
                        _this._listData.source = anyArr;
                    }
                    var leftCount = petGroupVo.count - data.PlayerList.length;
                    if (leftCount < 0)
                        leftCount = 0;
                    _this.Count.text = Language.getExpression(Language.E_WJSCSL, petGroupVo.count, leftCount);
                    var hashAnimal = false;
                    var animal = GameModels.animal.getAnimalBuyType(18);
                    if (animal.isAct) {
                        _this.Count.text = "";
                    }
                }
            }));
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        };
        PetGroupRegisterPlayerList.prototype.clickHandler = function (e) {
            this.dispatchEventWith(egret.Event.CLOSE);
        };
        PetGroupRegisterPlayerList.prototype.hide = function () {
            this.clearList(this.list);
            this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
        };
        return PetGroupRegisterPlayerList;
    }(ui.PetGroupRegisterPlayerListSkin));
    pet.PetGroupRegisterPlayerList = PetGroupRegisterPlayerList;
    __reflect(PetGroupRegisterPlayerList.prototype, "pet.PetGroupRegisterPlayerList", ["IAlert", "egret.DisplayObject"]);
})(pet || (pet = {}));
