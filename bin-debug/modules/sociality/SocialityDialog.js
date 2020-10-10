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
    var sociality;
    (function (sociality) {
        var SocialityDialog = (function (_super) {
            __extends(SocialityDialog, _super);
            function SocialityDialog() {
                var _this = _super.call(this) || this;
                _this._seleceIndex = -1;
                return _this;
            }
            SocialityDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._tabBtns = [this.btnRank, this.btnFriend];
                this.initStack();
                GameModels.state.registerWarnTarget(GameRedState.SOCIALITY_FRIENDS, this.btnFriend);
                this.btnGroup.visible = false;
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            SocialityDialog.prototype.initStack = function () {
                this._modules = [];
                this.stack = new eui.ViewStack();
                this.stack.touchEnabled = false;
                this._modules[0] = this.stack.addChild(new dialog.sociality.friend.FriendsDialog());
                this.addChild(this.stack);
            };
            SocialityDialog.prototype.enter = function (data) {
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
            };
            SocialityDialog.prototype.exit = function () {
                var oldIndex = this.stack.selectedIndex;
                this._modules[oldIndex].exit();
                this._seleceIndex = -1;
            };
            SocialityDialog.prototype.refreshMarkImagesDisplay = function () {
                for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
                    var moduleView = _a[_i];
                    moduleView.refreshMarkImagesDisplay();
                }
            };
            SocialityDialog.prototype.destory = function () {
                for (var _i = 0, _a = this._modules; _i < _a.length; _i++) {
                    var moduleView = _a[_i];
                    moduleView.destory();
                }
            };
            SocialityDialog.prototype.onTabClick = function (e) {
                var index = this._tabBtns.indexOf(e.target);
                if (index != -1) {
                    mg.soundManager.playSound('ButtonClick_1');
                    this.onSelectChange(index);
                }
            };
            SocialityDialog.prototype.onSelectChange = function (index) {
                if (index != this._seleceIndex) {
                    if (TypeFunOpen.checkFuncOpen(this, index, true)) {
                        var oldIndex = this.stack.selectedIndex;
                        this._tabBtns[oldIndex].currentState = "up";
                        this._modules[oldIndex].exit();
                        this._seleceIndex = this.stack.selectedIndex = index;
                        this._tabBtns[index].currentState = "down";
                        this._modules[index].enter(null, null);
                    }
                }
            };
            Object.defineProperty(SocialityDialog.prototype, "tabIndex", {
                get: function () {
                    return this._seleceIndex;
                },
                enumerable: true,
                configurable: true
            });
            /**标签改变 */
            SocialityDialog.CHANG_TAL = "CHANG_TAL";
            return SocialityDialog;
        }(ui.SocialityDialogSkin));
        sociality.SocialityDialog = SocialityDialog;
        __reflect(SocialityDialog.prototype, "dialog.sociality.SocialityDialog");
    })(sociality = dialog.sociality || (dialog.sociality = {}));
})(dialog || (dialog = {}));
