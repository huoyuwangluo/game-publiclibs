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
    var role;
    (function (role) {
        var chengzhuang;
        (function (chengzhuang) {
            var ChengZhuangSplictDialog = (function (_super) {
                __extends(ChengZhuangSplictDialog, _super);
                function ChengZhuangSplictDialog() {
                    return _super.call(this) || this;
                }
                ChengZhuangSplictDialog.prototype.initialize = function () {
                    _super.prototype.initialize.call(this);
                    Mediator.getMediator(this).onAdd(this, this.enter);
                    Mediator.getMediator(this).onRemove(this, this.exit);
                };
                ChengZhuangSplictDialog.prototype.enter = function (data, propId) {
                    if (data === void 0) { data = null; }
                    var bagEquips = GameModels.bag.getChengZhuangEquips();
                    if (!this._listData) {
                        this._listData = new eui.ArrayCollection(bagEquips);
                    }
                    else {
                        this._listData.source = bagEquips;
                    }
                    this.list.dataProvider = this._listData;
                    this.labNo.visible = bagEquips.length <= 0;
                    var links = Templates.getTemplatesByProperty(templates.Map.ITEMWAY, "itemId", propId);
                    var items = [];
                    for (var _i = 0, links_1 = links; _i < links_1.length; _i++) {
                        var link = links_1[_i];
                        var gameItem = Templates.getTemplateById(templates.Map.GAMEFUNCTIONS, link.functionId);
                        if (!gameItem)
                            return;
                        if (link.functionId == 5006 && this.checkIsUnion(link.functionId) == false) {
                            continue;
                        }
                        var openlevel = 0;
                        if (gameItem.openLv > 1000) {
                            openlevel = Math.floor(gameItem.openLv / 1000);
                            if (GameModels.user.player.zhuanShenLevel < openlevel) {
                                continue;
                            }
                        }
                        else {
                            openlevel = gameItem.openLv;
                            if (GameModels.user.player.level < openlevel) {
                                continue;
                            }
                        }
                        if (link.type == 1) {
                            items.push({ des: link.des /*utils.htmlUtil.getUnderlineFormat(link.des)*/, funcId: link.functionId });
                        }
                    }
                    if (!this._itemWaylistData) {
                        this._itemWaylistData = new eui.ArrayCollection();
                    }
                    this._itemWaylistData.source = items;
                    this.listSource.dataProvider = this._itemWaylistData;
                    this.listSource.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
                    this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                    this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                    this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnListClick, this);
                };
                ChengZhuangSplictDialog.prototype.exit = function () {
                    this.clearList(this.list);
                    this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                    this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
                    this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnListClick, this);
                };
                ChengZhuangSplictDialog.prototype.checkIsUnion = function (funId) {
                    if (GameModels.user.player.legionId) {
                        return true;
                    }
                    return false;
                };
                ChengZhuangSplictDialog.prototype.onItemTap = function (e) {
                    var gameItem = Templates.getTemplateById(templates.Map.GAMEFUNCTIONS, e.item.funcId);
                    mg.uiManager.showByName(e.item.funcId);
                    this.dispatchEventWith(egret.Event.CLOSE);
                };
                ChengZhuangSplictDialog.prototype.btnCloseClick = function (e) {
                    mg.uiManager.remove(this);
                };
                ChengZhuangSplictDialog.prototype.btnListClick = function (e) {
                    if (e.target instanceof components.SnapButton) {
                        var data = this.list.selectedItem;
                        GameModels.equip.requesHuiShouNewEquips(TypeSplit.FENJIE, [data.index], utils.Handler.create(this, function () {
                            this._listData.replaceAll(GameModels.bag.getChengZhuangEquips());
                        }));
                    }
                };
                return ChengZhuangSplictDialog;
            }(ui.ChengZhuangSplictDialogSkin));
            chengzhuang.ChengZhuangSplictDialog = ChengZhuangSplictDialog;
            __reflect(ChengZhuangSplictDialog.prototype, "dialog.role.chengzhuang.ChengZhuangSplictDialog");
        })(chengzhuang = role.chengzhuang || (role.chengzhuang = {}));
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));
