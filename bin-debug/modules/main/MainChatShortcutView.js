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
var main;
(function (main) {
    var MainChatShortcutView = (function (_super) {
        __extends(MainChatShortcutView, _super);
        function MainChatShortcutView() {
            var _this = _super.call(this) || this;
            _this._quicklanguage = [Language.J_QL1, Language.J_QL2, Language.J_QL3,
                Language.J_QL5, Language.J_QL6];
            return _this;
        }
        MainChatShortcutView.prototype.init = function () {
            this._parent = this.parent;
            if (!this._listData) {
                this._listData = new eui.ArrayCollection(this._quicklanguage);
            }
            else {
                this._listData.source = this._quicklanguage;
            }
            this.list.dataProvider = this._listData;
            this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
            this.hide();
        };
        MainChatShortcutView.prototype.showView = function (bol) {
            this.visible = bol;
        };
        MainChatShortcutView.prototype.hide = function () {
            this.visible = false;
        };
        MainChatShortcutView.prototype.onListClick = function (e) {
            if (GameModels.task.hasTask && GameModels.task.curTask.type == TypeTask.CHAT) {
                GameModels.task.curTask.clientTaskType = true;
                // var mainView: main.MainUIView = mg.uiManager.getView(s.UserfaceName.main) as main.MainUIView;
                // if (mainView && mainView.chat) {
                // 	mainView.chat.closeHandler();
                // }
            }
            var quicklanguage = this.list.selectedItem;
            GameModels.chat.sendChatMessage(quicklanguage);
            this.hide();
            GameModels.chat.changeQuickLan();
        };
        MainChatShortcutView.prototype.getCanUseListItem = function () {
            this.list.validateNow();
            var array = this._quicklanguage;
            if (array && array[0]) {
                return this.list.getChildAt(0);
            }
            return null;
        };
        return MainChatShortcutView;
    }(ui.ChatShortcutSkin));
    main.MainChatShortcutView = MainChatShortcutView;
    __reflect(MainChatShortcutView.prototype, "main.MainChatShortcutView");
})(main || (main = {}));
