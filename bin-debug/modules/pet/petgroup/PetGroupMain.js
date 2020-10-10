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
    var PetGroupMain = (function (_super) {
        __extends(PetGroupMain, _super);
        function PetGroupMain() {
            var _this = _super.call(this) || this;
            _this._seleceIndex = -1;
            return _this;
        }
        PetGroupMain.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._tabBtns = [this.btnShengZhi, this.btnMingJiang, this.btnPetGroup];
            this._modules = [];
            this._stack = new eui.ViewStack();
            this._stack.touchEnabled = false;
            this._modules[0] = this._stack.addChild(new dialog.imperialEdict.ImperialEdict());
            this._modules[1] = this._stack.addChild(new pet.MingJiangTask());
            this._modules[2] = this._stack.addChild(new pet.PetGroup());
            this.addChild(this._stack);
            Mediator.getMediator(this).onAdd(this, this.enter);
            Mediator.getMediator(this).onRemove(this, this.exit);
            GameModels.state.registerWarnTarget(GameRedState.SHENGZHI, this.btnShengZhi);
            GameModels.state.registerWarnTarget(GameRedState.WANJIANGGUIXIN, this.btnPetGroup);
            GameModels.state.registerWarnTarget(GameRedState.MINGJIANGTASK, this.btnMingJiang);
        };
        PetGroupMain.prototype.destory = function () {
            _super.prototype.destory.call(this);
            this._tabBtns.length = 0;
            for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
                var moduleView = _a[_i];
                moduleView.destory();
            }
            this._modules.length = 0;
            this._stack.removeChildren();
            this._stack = null;
        };
        PetGroupMain.prototype.enter = function (data) {
            if (data === void 0) { data = null; }
            this.group.removeChildren();
            if (GameModels.platform.isPay) {
                this.group.addChild(this.btnShengZhi);
                this.group.addChild(this.btnMingJiang);
                this.group.addChild(this.btnPetGroup);
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
            }
            else {
                this.group.addChild(this.btnShengZhi);
                this.group.addChild(this.btnPetGroup);
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex == 1 ? 0 : data.tabIndex : 0);
            }
            this.btnShengZhi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnMingJiang.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnPetGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
        };
        PetGroupMain.prototype.exit = function () {
            var oldIndex = this._stack.selectedIndex;
            this._modules[oldIndex].exit();
            this.btnShengZhi.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnMingJiang.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this.btnPetGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
            this._seleceIndex = -1;
        };
        Object.defineProperty(PetGroupMain.prototype, "shengzhiView", {
            get: function () {
                return this._modules[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroupMain.prototype, "mingjiangTaskView", {
            get: function () {
                return this._modules[1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PetGroupMain.prototype, "wanjiangGuixinView", {
            get: function () {
                return this._modules[2];
            },
            enumerable: true,
            configurable: true
        });
        PetGroupMain.prototype.updataChange = function () {
            this.dispatchEventWith(PetGroupMain.CHANG_TAL);
        };
        PetGroupMain.prototype.refreshMarkImagesDisplay = function () {
            for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
                var moduleView = _a[_i];
                moduleView.refreshMarkImagesDisplay();
            }
        };
        PetGroupMain.prototype.onTabClick = function (e) {
            var index = this._tabBtns.indexOf(e.target);
            if (index != -1) {
                this.onSelectChange(index);
            }
        };
        PetGroupMain.prototype.onSelectChange = function (index) {
            if (index != this._seleceIndex) {
                if (TypeFunOpen.checkFuncOpen(this, index, true)) {
                    var oldIndex = this._stack.selectedIndex;
                    this._tabBtns[oldIndex].currentState = "up";
                    this._modules[oldIndex].exit();
                    this._seleceIndex = this._stack.selectedIndex = index;
                    this._tabBtns[index].currentState = "down";
                    this._modules[index].enter(null, null);
                    this.updataChange();
                }
            }
        };
        Object.defineProperty(PetGroupMain.prototype, "tabIndex", {
            get: function () {
                return this._seleceIndex;
            },
            enumerable: true,
            configurable: true
        });
        /**标签改变 */
        PetGroupMain.CHANG_TAL = "CHANG_TAL";
        return PetGroupMain;
    }(ui.PetGroupMainSkin));
    pet.PetGroupMain = PetGroupMain;
    __reflect(PetGroupMain.prototype, "pet.PetGroupMain");
})(pet || (pet = {}));
