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
    var bag;
    (function (bag) {
        var BagRecycleDialog = (function (_super) {
            __extends(BagRecycleDialog, _super);
            function BagRecycleDialog() {
                return _super.call(this) || this;
            }
            BagRecycleDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this.labNoDec.text = Language.J_DQMYKHSDYGZB;
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                this.list.dataProvider = this._listData = new eui.ArrayCollection();
            };
            BagRecycleDialog.prototype.enter = function () {
                this.labHide.visible = GameModels.platform.isPay && GameModels.user.player.vip < 1;
                this.btnRecycle.label = GameModels.user.player.vip >= 1 ? Language.C_YJRL : Language.C_RL;
                this._eqiup = GameModels.bag.isCanHuiShouequips;
                this.showView();
                this.btnRecycle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRecycleChange, this);
            };
            BagRecycleDialog.prototype.exit = function () {
                utils.timer.clear(this);
                this.clearList(this.list);
                this.btnRecycle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRecycleChange, this);
            };
            BagRecycleDialog.prototype.showView = function () {
                this._listData.source = this._eqiup;
                this.labNoDec.visible = this._eqiup.length <= 0;
                this._lenth = this._eqiup.length > 20 ? 20 : this._eqiup.length;
            };
            BagRecycleDialog.prototype.onRecycleChange = function () {
                var refId = [];
                var list = this._listData.source;
                for (var i = list.length - 1; i >= 0; i--) {
                    if (list[i]) {
                        if (GameModels.user.player.vip < 1) {
                            if (refId.length < 20) {
                                refId.push(list[i].index);
                                list.splice(i, 1);
                            }
                        }
                        else {
                            refId.push(list[i].index);
                            list.splice(i, 1);
                        }
                    }
                }
                if (refId.length <= 0) {
                    mg.alertManager.tip(Language.J_MYXZHSZB);
                    return;
                }
                utils.timer.clear(this);
                var fromPoint = new egret.Point(mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2);
                GameModels.equip.requesHuiShouNewEquips(TypeSplit.HUISHOU, refId, utils.Handler.create(this, function () {
                    mg.soundManager.playSoundStopLast("HuiShou", 1, true);
                    mg.alertManager.tip(Language.J_HSCG);
                    var moneyPoint = mg.uiManager.getView(main.MainUIView).getMoneyPostion(true);
                    mg.effectManager.flyEffects("6160", 10, fromPoint, moneyPoint, mg.layerManager.top);
                    // var flyItem: s.FlyIconsEffect = new s.FlyIconsEffect();
                    // flyItem.initializeConfigStr("210401", fromPoint, mg.layerManager.top);
                    // flyItem.start();
                    this.nMeltingBack();
                }));
            };
            BagRecycleDialog.prototype.nMeltingBack = function () {
                for (var i = 0; i < this._lenth; i++) {
                    var x = this.scroller.x + 55 + (i % 4) * 135;
                    var y = this.scroller.y + 40 + Math.floor(i / 4) * 144;
                    mg.effectManager.playEffectOnce("30004", x, y, this);
                }
                this.showView();
                // for (var i = 0; i < this._lenth; i++) {
                // 	var data: any = this._listData.source[i];
                // 	if (data) {
                // 		if (this.list.getChildAt(i)) {
                // 			var itemrenderer: renderer.BagRecycleRenderer = this.list.getChildAt(i) as renderer.BagRecycleRenderer;
                // 			if (itemrenderer) mg.effectManager.playEffectOnce("30004", 54, 40, itemrenderer);
                // 		}
                // 	}
                // }
                // utils.timer.once(300, this, this.showView, false);
            };
            return BagRecycleDialog;
        }(ui.BagRecycleSkin));
        bag.BagRecycleDialog = BagRecycleDialog;
        __reflect(BagRecycleDialog.prototype, "dialog.bag.BagRecycleDialog");
    })(bag = dialog.bag || (dialog.bag = {}));
})(dialog || (dialog = {}));
