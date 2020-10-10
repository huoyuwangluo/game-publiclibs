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
var dialog;
(function (dialog) {
    var list;
    (function (list) {
        var BingFaList = (function (_super) {
            __extends(BingFaList, _super);
            function BingFaList() {
                return _super.call(this) || this;
            }
            BingFaList.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this.list.dataProvider = this._listData = new eui.ArrayCollection([]);
            };
            BingFaList.prototype.enter = function (vo, pos) {
                GameModels.bag.isOpenBingFa = true;
                this._vo = vo;
                this._pos = pos;
                var volist = GameModels.bag.baseBingFa;
                this._listData.source = volist;
                this.labNo.visible = volist.length <= 0;
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            };
            BingFaList.prototype.exit = function () {
                this.clearList(this.list);
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBuyClick, this);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                this.btnGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
            };
            BingFaList.prototype.btnCloseClick = function (e) {
                if (e.currentTarget == this.btnGo) {
                }
                else {
                    mg.uiManager.remove(this);
                }
            };
            BingFaList.prototype.onBuyClick = function (e) {
                if (e.target instanceof components.SnapButton) {
                    var item = this.list.selectedItem;
                    GameModels.pet.petDressBingFa(this._vo.uid, this._pos, item.index, utils.Handler.create(this, function () {
                        if (GameModels.guide.guideTypeClinte == mo.ModelGuide.guideType50000) {
                            GameModels.guide.stopClinteGuide();
                            GameModels.guide.clinetPetId = parseInt(this._vo.refId);
                            mg.StoryManager.instance.startBigStory(119, this, null);
                        }
                        mg.uiManager.remove(this);
                    }));
                }
            };
            BingFaList.prototype.getCanUseListItem = function () {
                this.list.validateNow();
                var array = GameModels.bag.baseBingFa;
                if (array[0]) {
                    return this.list.getChildAt(0).btnWeak;
                }
                return null;
            };
            return BingFaList;
        }(ui.BingFaListSkin));
        list.BingFaList = BingFaList;
        __reflect(BingFaList.prototype, "dialog.list.BingFaList");
    })(list = dialog.list || (dialog.list = {}));
})(dialog || (dialog = {}));
