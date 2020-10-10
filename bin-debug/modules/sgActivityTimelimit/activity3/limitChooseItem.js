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
var limitChooseItem = (function (_super) {
    __extends(limitChooseItem, _super);
    function limitChooseItem() {
        return _super.call(this) || this;
    }
    /**0道具 1武将 2宠物 3神兵 */
    limitChooseItem.prototype.show = function (vo) {
        this._vo = vo;
        var voList = [];
        if (vo.templactExchange.costType == 1) {
            voList = GameModels.pet.getFormatDownVOListByQuality(parseInt(vo.templactExchange.consume));
        }
        else if (vo.templactExchange.costType == 2) {
            voList = GameModels.bag.getItemsByTypeAndQuality(TypeItem.ANIMAL_ONE, parseInt(vo.templactExchange.consume));
        }
        else if (vo.templactExchange.costType == 3) {
            voList = GameModels.bag.getItemsByTypeAndQuality(TypeItem.SHENBIN_PROP, parseInt(vo.templactExchange.consume));
        }
        else {
        }
        if (voList) {
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(voList);
            }
            else {
                this._listData.source = voList;
            }
        }
        else {
            if (!this._listData) {
                this._listData = new eui.ArrayCollection([]);
            }
            else {
                this._listData.source = [];
            }
        }
        this.list.selectedIndex = 0;
        this.list.dataProvider = this._listData;
        this.labNo.visible = voList.length <= 0;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        //this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.listHandler, this);
        this.btnSure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sureHandler, this);
    };
    limitChooseItem.prototype.sureHandler = function () {
        // var item: vo.GamePetVO | vo.ItemVO = this.list.selectedItem;
        // var id: string = (item instanceof vo.GamePetVO) ? item.uid : item.id;
        // GameModels.sgActivity.setSelecdItemByShopId(this._vo.key, id);
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    // private listHandler(): void {
    // 	var item: vo.GamePetVO | vo.ItemVO = this.list.selectedItem;
    // }
    limitChooseItem.prototype.hide = function () {
        var item = this.list.selectedItem;
        GameModels.sgActivity.setSelecdItemByShopId(this._vo.key, item);
        this.clearList(this.list);
        this.btnSure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sureHandler, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    limitChooseItem.prototype.onClick = function (e) {
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    return limitChooseItem;
}(ui.limitChooseItemSkin));
__reflect(limitChooseItem.prototype, "limitChooseItem", ["IAlert", "egret.DisplayObject"]);
