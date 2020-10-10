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
var mg;
(function (mg) {
    var UIManager = (function (_super) {
        __extends(UIManager, _super);
        function UIManager() {
            var _this = _super.call(this) || this;
            _this._userfaces = {};
            _this._showList = [];
            _this._closePres = {};
            return _this;
        }
        Object.defineProperty(UIManager, "instance", {
            get: function () {
                if (!UIManager._instance) {
                    UIManager._instance = new UIManager();
                }
                return UIManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        UIManager.prototype.initialize = function (stage) {
            mg.stageManager.onResize(this, this.resizeHandler, false);
        };
        /**
         * 注册界面
         * @param name 界面名称
         * @param viewClass 界面类
         * @param aglin	对齐方式
         * @param offRatio	偏移位置
         * @param popType	界面弹出类型
         * @param level	是否为弹出界面
         * @param destoryTime 销毁时间
         * 						-1：	不销毁视图(但会销毁已经标记过的单个Image资源)
         * 						0：	退出时立即销毁视图（销毁标记过的单个Image资源和图集文件）
         * 						>0:	按照给定秒数后销毁视图
         * @return
         */
        UIManager.prototype.register = function (name, viewClass, aglin, offRatio, popType, level, destoryTime) {
            if (offRatio === void 0) { offRatio = null; }
            if (level === void 0) { level = 0; }
            if (destoryTime === void 0) { destoryTime = 0; }
            if (!this._userfaces[name]) {
                var structer = new UIStructer(name, viewClass, aglin, popType, offRatio, level, destoryTime);
                this._userfaces[name] = structer;
            }
            return this._userfaces[name];
        };
        UIManager.prototype.unRegister = function (view) {
            var name;
            if (typeof view == 'string') {
                name = view;
            }
            else if (view) {
                name = this.getStructerName(view);
            }
            if (this._userfaces[name]) {
                var structer = this._userfaces[name];
                this._userfaces[name] = null;
                delete this._userfaces[name];
                structer.destory();
            }
        };
        UIManager.prototype.getStructerName = function (view) {
            var className = egret.getQualifiedClassName(view);
            for (var name in this._userfaces) {
                if (this._userfaces[name].className == className) {
                    return this._userfaces[name].name;
                }
            }
            return "";
        };
        UIManager.prototype.getStructer = function (view) {
            var className = egret.getQualifiedClassName(view);
            for (var name in this._userfaces) {
                if (this._userfaces[name].className == className) {
                    return this._userfaces[name].name;
                }
            }
            return null;
        };
        /**从 gameFunctions 表读取配置信息 并打开对应界面*/
        UIManager.prototype.showByName = function (funcId, param, guideOrWenGuan) {
            if (param === void 0) { param = null; }
            if (guideOrWenGuan === void 0) { guideOrWenGuan = null; }
            if (funcId == TypeFunOpen.GONGCHENG || funcId == TypeFunOpen.ZHENGSHOU || funcId == TypeFunOpen.QIANGZHENG /**攻城和强征 征收特殊处理*/) {
                mg.alertManager.closeALert();
                mg.uiManager.removeAllDialogs();
                if (funcId == TypeFunOpen.GONGCHENG) {
                    if (GameModels.scene.getjoinSceneListByType(TypeGame.CHAPTER_BOSS)) {
                        app.gameContext.enterChapterBoss("");
                        return;
                    }
                    if (GameModels.scene.getjoinSceneListByType(TypeGame.DOOR_BOSS)) {
                        app.gameContext.enterChapterCity("");
                        return;
                    }
                }
                if (app.gameContext.typeGame == TypeGame.CITY) {
                    app.gameContext.exitToMainGame();
                }
                if (funcId == TypeFunOpen.QIANGZHENG) {
                    mg.uiManager.show(MainChapterCityReward1);
                }
                return;
            }
            if (TypeFunOpen.checkFuncOpenById(funcId)) {
                var tempData = TypeFunOpen.getClassNameAndTabIndexById(funcId, null, null);
                if (!tempData) {
                    logger.log("找不到功能开放注册关系");
                    mg.alertManager.tip(Language.J_ZSMYKDAJM);
                    return;
                }
                if (tempData.mainFunName == s.UserfaceName.material) {
                    param = tempData.tabIndex;
                }
                this.show(tempData.mainFunName, { tabIndex: tempData.tabIndex < 0 ? 0 : tempData.tabIndex, param: param, guideData: guideOrWenGuan });
            }
        };
        UIManager.prototype.getClassName = function (view) {
            return egret.getQualifiedClassName(view);
        };
        /**
         * 显示界面
         * @param viewClass
         * @param data
         */
        UIManager.prototype.show = function (view) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var name = (typeof view == "string") ? view : this.getStructerName(view);
            if (!GameModels.platform.isPay && (name == s.UserfaceName.firstRecharge ||
                name == s.UserfaceName.zhuanshuGift ||
                name == s.UserfaceName.xianshilibao ||
                name == s.UserfaceName.zhugeliang ||
                name == s.UserfaceName.zhuanshuTeQuan ||
                name == s.UserfaceName.sevenDayTask ||
                name == s.UserfaceName.xianshiGift ||
                name == s.UserfaceName.juebanGift ||
                name == s.UserfaceName.timePickGift ||
                name == s.UserfaceName.vipTeQuan ||
                name == s.UserfaceName.oneYuanBuy ||
                name == s.UserfaceName.sgDaily ||
                name == s.UserfaceName.LegionZhenQi ||
                name == s.UserfaceName.legionBuy ||
                name == s.UserfaceName.legionRedPacket)) {
                return;
            }
            if (!this._userfaces[name])
                return null;
            var index = -1;
            if (args[0] && args[0].hasOwnProperty("tabIndex")) {
                index = args[0].tabIndex;
            }
            var item = this._userfaces[name];
            if (GameModels.funcs) {
                if (!TypeFunOpen.checkFuncOpen(name, index, true))
                    return item.view;
            }
            if (item.popType == TypePop.FLOAT) {
                this.removeDialogsByLevel(item.level, TypePop.FLOAT);
            }
            else {
                this.removeDialogsByLevel(item.level, TypePop.POP);
                this.removePopDialogs(TypePop.FLOAT);
            }
            mg.soundManager.playSound('ButtonClick_1');
            if (item.add.apply(item, args)) {
                if (this._showList.indexOf(item) < 0) {
                    this._showList.push(item);
                }
                this.dispatchEventWith(mg.UIManager.ADD_NEW_VIEW);
                this.dispatchEventWith(egret.Event.ADDED, false, item.clazz);
                this.dispatchEventWith(egret.Event.CHANGE);
            }
            else {
                item.update.apply(item, args);
            }
            if (app.gameContext)
                app.gameContext.setSceneLayerRenderEnabled(!this.hasPopFloat);
            return item.view;
        };
        UIManager.prototype.switchUI = function (view) {
            if (this.isOpen(view)) {
                this.remove(view);
            }
            else {
                this.show(view);
            }
        };
        /**监听界面的预备关闭事件 */
        UIManager.prototype.onClosePre = function (view, caller, method) {
            if (this._closePres)
                this._closePres = {};
            var name = this.getStructerName(view);
            if (!name)
                return;
            this._closePres[name] = utils.Handler.create(caller, method, null, false);
        };
        /**移除监听界面的预备关闭事件 */
        UIManager.prototype.offClosePre = function (view) {
            var name = this.getStructerName(view);
            if (!name)
                return;
            if (this._closePres && this._closePres[name]) {
                this._closePres[name].recover();
                this._closePres[name] = null;
            }
        };
        /**
         * 移除界面
         * @param viewClass
         */
        UIManager.prototype.remove = function (view) {
            this.removeByName((typeof view == "string") ? view : this.getStructerName(view));
        };
        UIManager.prototype.removeByName = function (name) {
            if (this._closePres[name]) {
                this._closePres[name].run();
                return;
            }
            if (!this._userfaces[name])
                return;
            var item = this._userfaces[name];
            mg.soundManager.playSound('ButtonClose_1');
            if (item.remove()) {
                var index = this._showList.indexOf(item);
                if (index >= 0)
                    this._showList.splice(index, 1);
                this.dispatchEventWith(egret.Event.REMOVED, false, item.clazz);
                this.dispatchEventWith(egret.Event.CHANGE);
            }
            if (app.gameContext)
                app.gameContext.setSceneLayerRenderEnabled(!this.hasPopFloat);
        };
        UIManager.prototype.update = function (view) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var name = (typeof view == "string") ? view : this.getStructerName(view);
            if (!this._userfaces[name])
                return null;
            var item = this._userfaces[name];
            if (item) {
                item.update.apply(item, args);
            }
        };
        UIManager.prototype.isOpen = function (view) {
            if (typeof view == "string") {
                for (var _i = 0, _a = this._showList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item.name == view) {
                        return !!item.view.parent;
                    }
                }
            }
            else {
                for (var _b = 0, _c = this._showList; _b < _c.length; _b++) {
                    var item = _c[_b];
                    if (item.clazz == view) {
                        return !!item.view.parent;
                    }
                }
            }
            return false;
        };
        Object.defineProperty(UIManager.prototype, "hasView", {
            get: function () {
                for (var _i = 0, _a = this._showList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (!TypePop.isPopOrFloat(item.popType))
                        return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIManager.prototype, "hasPopFloat", {
            get: function () {
                for (var _i = 0, _a = this._showList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (TypePop.isPopOrFloat(item.popType))
                        return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIManager.prototype, "hasPopDialog", {
            get: function () {
                for (var _i = 0, _a = this._showList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (TypePop.isPop(item.popType))
                        return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIManager.prototype, "hasDialog", {
            get: function () {
                return mg.dialogManager.hasDialog;
            },
            enumerable: true,
            configurable: true
        });
        UIManager.prototype.removeLastDialog = function () {
            var list = this._showList;
            var total = list.length;
            for (var i = total - 1; i > 0; i--) {
                var item = list[i];
                if (TypePop.isPopOrFloat(item.popType)) {
                    this.removeByName(item.name);
                    break;
                }
            }
        };
        UIManager.prototype.removePopDialogs = function (type) {
            var list = this._showList;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (item.popType == type) {
                    item.remove();
                    list.splice(i, 1);
                    i--;
                    continue;
                }
            }
            this.dispatchEventWith(egret.Event.CHANGE);
        };
        UIManager.prototype.removeDialogsByLevel = function (level, type) {
            var list = this._showList;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (item.popType == type && item.level == level) {
                    item.remove();
                    list.splice(i, 1);
                    i--;
                    continue;
                }
            }
            this.dispatchEventWith(egret.Event.CHANGE);
            if (app.gameContext)
                app.gameContext.setSceneLayerRenderEnabled(!this.hasPopFloat);
        };
        UIManager.prototype.removeAllDialogs = function () {
            var list = this._showList;
            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (TypePop.isPopOrFloat(item.popType)) {
                    item.remove();
                    list.splice(i, 1);
                    i--;
                    continue;
                }
            }
            this.dispatchEventWith(egret.Event.CHANGE);
            if (app.gameContext)
                app.gameContext.setSceneLayerRenderEnabled(!this.hasPopFloat);
        };
        UIManager.prototype.getView = function (view) {
            var name = (typeof view == "string") ? view : this.getStructerName(view);
            if (!this._userfaces[name])
                return null;
            var item = this._userfaces[name];
            return item.view;
        };
        UIManager.prototype.getDialog = function () {
            if (this.hasDialog) {
                return mg.dialogManager.getDialog(0);
            }
            return null;
        };
        UIManager.prototype.resizeHandler = function (w, h) {
            for (var _i = 0, _a = this._showList; _i < _a.length; _i++) {
                var item = _a[_i];
                //item.view.scaleX=item.view.scaleY=item.popType!=TypePop.RESIDENT?game.GameConfig.UI_POP_SCALE:1;
                if (!item.aglin)
                    continue;
                var point = utils.AlignUtil.getAreaAglinPoint(item.aglin, w, h, item.view, item.offRatio ? item.offRatio.x : 0, item.offRatio ? item.offRatio.y : 0);
                item.view.x = point.x;
                item.view.y = point.y;
            }
        };
        UIManager.ADD_NEW_VIEW = "ADD_NEW_VIEW";
        return UIManager;
    }(egret.EventDispatcher));
    mg.UIManager = UIManager;
    __reflect(UIManager.prototype, "mg.UIManager");
})(mg || (mg = {}));
