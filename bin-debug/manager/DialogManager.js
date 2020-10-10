var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var mg;
(function (mg) {
    var DialogManager = (function () {
        function DialogManager() {
            this._duration = 300;
        }
        Object.defineProperty(DialogManager, "instance", {
            get: function () {
                if (!DialogManager._instance) {
                    DialogManager._instance = new DialogManager();
                }
                return DialogManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        DialogManager.prototype.initialize = function (stage) {
            this._showList = [];
            mg.stageManager.onResize(this, this.onResize);
            this._black = new eui.Image();
            this._black.source = 'uiMain_json.img_main_graybg';
            this._black.scale9Grid = new egret.Rectangle(8, 8, 8, 8);
        };
        DialogManager.prototype.register = function (group) {
            base.Dialog.instance.register(group);
        };
        DialogManager.prototype.pop = function (item) {
            if (this._showList.length) {
                var last = this._showList[this._showList.length - 1];
                if (last.view.parent) {
                    last.view.parent.removeChild(last.view);
                }
            }
            this.updatePosition(item);
            item.view.x = item.position.x;
            item.view.y = item.position.y + 10;
            TypePop.getLayer(item.popType).addChild(item.view);
            if (this._showList.indexOf(item) < 0) {
                this._showList.push(item);
            }
            this.updateFloatBlack();
        };
        DialogManager.prototype.show = function (item) {
            if (this._showList.length) {
                var last = this._showList[this._showList.length - 1];
                if (last.view.parent) {
                    last.view.parent.removeChild(last.view);
                }
            }
            var index = this._showList.indexOf(item);
            if (index >= 0) {
                this._showList.splice(index, 1);
                this._showList.push(item);
                TypePop.getLayer(item.popType).addChild(item.view);
            }
            this.updateFloatBlack();
        };
        DialogManager.prototype.close = function (item) {
            var index = this._showList.indexOf(item);
            if (index >= 0)
                this._showList.splice(index, 1);
            if (item.view.parent) {
                item.view.parent.removeChild(item.view);
            }
            if (this._showList.length) {
                var last = this._showList[this._showList.length - 1];
                if (!last.view.parent) {
                    TypePop.getLayer(item.popType).addChild(last.view);
                    if (last.popType == TypePop.POP)
                        base.Dialog.instance.update(last);
                }
            }
            this.updateFloatBlack();
        };
        Object.defineProperty(DialogManager.prototype, "hasDialog", {
            get: function () {
                return this._showList && this._showList.length > 0;
            },
            enumerable: true,
            configurable: true
        });
        DialogManager.prototype.getDialog = function (index) {
            return this._showList[index];
        };
        DialogManager.prototype.getLowDialog = function () {
            for (var _i = 0, _a = this._showList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.level == 0) {
                    return item;
                }
            }
            return null;
        };
        DialogManager.prototype.updatePosition = function (item) {
            item.view.scaleX = item.view.scaleY = TypePop.isPopOrFloat(item.popType) ? game.GameConfig.UI_POP_SCALE : 1;
            var p = utils.AlignUtil.getAreaAglinPoint(item.aglin, mg.stageManager.stageWidth, mg.stageManager.stageHeight, item.view, item.offRatio ? item.offRatio.x : 0, item.offRatio ? item.offRatio.y : 0, item.position);
            item.view.x = p.x;
            item.view.y = p.y;
        };
        DialogManager.prototype.clossAll = function () {
            for (var _i = 0, _a = this._showList; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.view.parent) {
                    egret.Tween.removeTweens(item.view);
                    item.view.parent.removeChild(item.view);
                }
            }
            this._showList.length = 0;
            this.updateFloatBlack();
        };
        DialogManager.prototype.resizeList = function () {
            if (!this._showList.length)
                return;
            var item = this._showList[this._showList.length - 1];
            this.updatePosition(item);
            item.view.x = item.position.x;
            item.view.y = item.position.y;
        };
        DialogManager.prototype.updateFloatBlack = function () {
            if (!this._showList.length) {
                base.Dialog.instance.remove();
                this.hideFloatBlack();
                return;
            }
            var lastItem = this._showList[this._showList.length - 1];
            if (lastItem.popType == TypePop.FLOAT) {
                base.Dialog.instance.remove();
                this.showFloatBlack();
            }
            else {
                this.hideFloatBlack();
                if (lastItem.level < 10) {
                    base.Dialog.instance.add(lastItem);
                }
            }
        };
        DialogManager.prototype.showFloatBlack = function () {
            if (this._black) {
                this._black.width = mg.stageManager.stageWidth;
                this._black.height = mg.stageManager.stageHeight;
                var item = this._showList[this._showList.length - 1];
                var layer = TypePop.getLayer(TypePop.FLOAT);
                var index = layer.getChildIndex(item.view) - 1;
                if (index < 0)
                    index = 0;
                layer.addChildAt(this._black, index);
            }
        };
        DialogManager.prototype.hideFloatBlack = function () {
            if (this._black) {
                if (this._black.parent) {
                    this._black.parent.removeChild(this._black);
                }
            }
        };
        DialogManager.prototype.onResize = function (w, h) {
            this.resizeList();
            if (this._black && this._black.parent) {
                this._black.width = mg.stageManager.stageWidth;
                this._black.height = mg.stageManager.stageHeight;
            }
        };
        return DialogManager;
    }());
    mg.DialogManager = DialogManager;
    __reflect(DialogManager.prototype, "mg.DialogManager");
})(mg || (mg = {}));
