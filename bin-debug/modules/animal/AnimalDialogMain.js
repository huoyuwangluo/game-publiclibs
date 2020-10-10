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
(function (animal) {
    var AnimalDialogMain = (function (_super) {
        __extends(AnimalDialogMain, _super);
        function AnimalDialogMain() {
            var _this = _super.call(this) || this;
            _this._seleceIndex = -1;
            return _this;
        }
        AnimalDialogMain.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._tabBtns = [this.btnAnimal, this.btnFaery, this.btnForest, this.btnFree];
            this.initStack();
            GameModels.state.registerWarnTarget(GameRedState.ANIMAL_UPGRADE, this.btnAnimal);
            GameModels.state.registerWarnTarget(GameRedState.ANIMAL_REWAED, this.btnFaery);
            GameModels.state.registerWarnTarget(GameRedState.ANIMAL_CHOUJIANG, this.btnForest);
            Mediator.getMediator(this).onAdd(this, this.enter);
            Mediator.getMediator(this).onRemove(this, this.exit);
        };
        AnimalDialogMain.prototype.initStack = function () {
            this._modules = [];
            this.stack = new eui.ViewStack();
            this.stack.touchEnabled = false;
            this._modules[0] = this.stack.addChild(new animal.AnimalMain());
            this._modules[1] = this.stack.addChild(new animal.AnimalFaery());
            this._modules[2] = this.stack.addChild(new animal.AnimalForest());
            this._modules[3] = this.stack.addChild(new animal.AnimalFree());
            this.addChild(this.stack);
        };
        AnimalDialogMain.prototype.enter = function (data) {
            this.group.removeChildren();
            if (GameModels.serverTime && GameModels.serverTime.kaifuDay >= 8) {
                this.group.addChild(this.btnAnimal);
                this.group.addChild(this.btnFaery);
                this.group.addChild(this.btnForest);
                this.group.addChild(this.btnFree);
            }
            this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
            this.btnAnimal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnFaery.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnForest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnFree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
        };
        AnimalDialogMain.prototype.exit = function () {
            this.btnAnimal.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnFaery.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnForest.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnFree.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this._seleceIndex = -1;
            for (var i = 0; i < this._modules.length; i++) {
                this._modules[i].exit();
            }
        };
        AnimalDialogMain.prototype.onTabClick = function (e) {
            var index = this._tabBtns.indexOf(e.target);
            if (index != -1) {
                this.onSelectChange(index);
            }
        };
        Object.defineProperty(AnimalDialogMain.prototype, "animalView", {
            get: function () {
                return this._modules[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalDialogMain.prototype, "faeryView", {
            get: function () {
                return this._modules[1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalDialogMain.prototype, "forestView", {
            get: function () {
                return this._modules[2];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalDialogMain.prototype, "freeView", {
            get: function () {
                return this._modules[3];
            },
            enumerable: true,
            configurable: true
        });
        AnimalDialogMain.prototype.updataChange = function () {
            this.dispatchEventWith(AnimalDialogMain.CHANG_TAL);
        };
        AnimalDialogMain.prototype.onSelectChange = function (index) {
            if (index != this._seleceIndex) {
                if (TypeFunOpen.checkFuncOpen(this, index, true)) {
                    var oldIndex = this.stack.selectedIndex;
                    this._tabBtns[oldIndex].currentState = "up";
                    this._modules[oldIndex].exit();
                    this._seleceIndex = this.stack.selectedIndex = index;
                    this._tabBtns[index].currentState = "down";
                    this._modules[index].enter(null, null);
                    this.updataChange();
                }
            }
        };
        AnimalDialogMain.prototype.refreshMarkImagesDisplay = function () {
            for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
                var moduleView = _a[_i];
                moduleView.refreshMarkImagesDisplay();
            }
        };
        AnimalDialogMain.prototype.destory = function () {
            for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
                var moduleView = _a[_i];
                moduleView.destory();
            }
        };
        Object.defineProperty(AnimalDialogMain.prototype, "selectedIndex", {
            get: function () {
                return this._seleceIndex;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimalDialogMain.prototype, "tabIndex", {
            get: function () {
                return this._seleceIndex;
            },
            enumerable: true,
            configurable: true
        });
        /**标签改变 */
        AnimalDialogMain.CHANG_TAL = "CHANG_TAL";
        return AnimalDialogMain;
    }(ui.AnimalDialogMainSkin));
    animal.AnimalDialogMain = AnimalDialogMain;
    __reflect(AnimalDialogMain.prototype, "animal.AnimalDialogMain");
})(animal || (animal = {}));
