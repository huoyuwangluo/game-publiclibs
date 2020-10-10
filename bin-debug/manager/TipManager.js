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
    var TipManager = (function (_super) {
        __extends(TipManager, _super);
        function TipManager() {
            var _this = _super.call(this) || this;
            _this.SHOW_DELAY = 200;
            _this._enabled = true;
            _this._tips = {};
            _this._targets = {};
            return _this;
        }
        Object.defineProperty(TipManager, "instance", {
            get: function () {
                if (!mg.TipManager._instance) {
                    mg.TipManager._instance = new mg.TipManager();
                    mg.TipManager._instance.initialize();
                }
                return mg.TipManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        TipManager.prototype.initialize = function () {
            mg.layerManager.tip.addChild(this);
            this._black = new egret.Sprite();
            this._black.touchEnabled = true;
            this.registerTip(tips.PropTip); //道具tips
            this.registerTip(tips.EquipTip); //装备tips
            this.registerTip(tips.RoleInfoTip); //角色属性tips
            this.registerTip(tips.GeneralInfoTip); //武将tips
            this.registerTip(tips.CommonUnLockItem); //解锁个人boss和解锁人物模型tips
            this.registerTip(tips.BuZhenAlert); //布阵信息
            this.registerTip(tips.CheckTip); //布阵信息
            this.registerTip(tips.AncientPetTuJianTeamTips); //推荐阵容详情
            this.registerTip(tips.LegionBattleHelp); //阵营求助
            this.registerTip(tips.SelectedBoxTip); //任选宝箱
            this.registerTip(tips.ShenMoJiangPropTip); //神魔将抽奖
            this.registerTip(tips.ShenMoPetGetTip); //神魔将抽奖
            this.registerTip(dialog.kingwar.kingWarMapChooseArmy);
        };
        /**注册Tip */
        TipManager.prototype.registerTip = function (tipclass) {
            var name = egret.getQualifiedClassName(tipclass);
            if (!this._tips[name]) {
                this._tips[name] = { clazz: tipclass, instance: null };
            }
            return name;
        };
        /**取出Tip单例 */
        TipManager.prototype.reciveTip = function (name) {
            if (!this._tips[name])
                return null;
            var object = this._tips[name];
            if (!object.instance) {
                var tipClazz = object.clazz;
                object.instance = new tipClazz();
            }
            return object.instance;
        };
        /**反注册Tip */
        TipManager.prototype.unRegisterTip = function (name) {
            if (this._tips[name]) {
                try {
                    if (this._tips[name].instance) {
                        this._tips[name].instance.destory();
                    }
                }
                catch (e) {
                    logger.error(e);
                }
                // this._tips[name]=null;
                // delete this._tips[name];
            }
        };
        /**该Tip是否还有对象引用 */
        TipManager.prototype.hasTipReference = function (name) {
            for (var _i = 0, _a = this._targets; _i < _a.length; _i++) {
                var object = _a[_i];
                if (object.tipName == name) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 绑定Tip 对应的调用unBind进行解绑 不推荐在IitemRenderer实现类中使用此方法
         * @param target
         * @param data
         */
        TipManager.prototype.bind = function (node, tipClass, data) {
            var tipName = this.registerTip(tipClass);
            if (!this._targets[node.hashCode]) {
                this._targets[node.hashCode] = { tipName: tipName, data: data };
                node.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
        };
        /**
         * 解绑Tip
         * @param target
         */
        TipManager.prototype.unBind = function (node) {
            if (this._targets[node.hashCode]) {
                if (this._currentTarget == node) {
                    this.hideTipHandler();
                }
                node.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                var tipName = this._targets[node.hashCode].tipName;
                this._targets[node.hashCode] = null;
                delete this._targets[node.hashCode];
                if (!this.hasTipReference(tipName)) {
                    this.unRegisterTip(tipName);
                }
            }
        };
        TipManager.prototype.onTouchHandler = function (e) {
            var data = this._targets[e.target.hashCode];
            if (data) {
                if (data.tipName == "tips.SelectedBoxTip") {
                    mg.alertManager.showAlert(tips.SelectedBoxTip, true, true, data.data);
                }
                else if (data.tipName == "tips.ShenMoJiangPropTip") {
                    mg.alertManager.showAlert(tips.ShenMoJiangPropTip, true, true);
                }
                else {
                    this.showTipHandler(e.target, this.reciveTip(data.tipName), data.data);
                }
            }
        };
        /**勾选记录提示，勾选记录状态后同时存在确认和取消方法默认执行确认*/
        TipManager.prototype.showCheckAlert = function (labContent, type, selectType, cancelHandler, okHandler, bol, data, isTextFlow, hideClose, handlerClose) {
            if (cancelHandler === void 0) { cancelHandler = null; }
            if (okHandler === void 0) { okHandler = null; }
            if (bol === void 0) { bol = false; }
            if (data === void 0) { data = null; }
            if (isTextFlow === void 0) { isTextFlow = false; }
            if (hideClose === void 0) { hideClose = false; }
            if (handlerClose === void 0) { handlerClose = true; }
            var currentType = 0;
            if (typeof (selectType) == "number") {
                currentType = selectType;
            }
            else {
                TypeCheck.updateCheckTypeListStr(selectType);
                currentType = parseInt(selectType.split("_")[0]);
            }
            if (!TypeCheck.getCheckType(currentType)) {
                var data1 = [labContent, type, currentType, okHandler, cancelHandler, bol, data, isTextFlow, handlerClose, hideClose];
                mg.TipManager.instance.showTip(tips.CheckTip, data1);
            }
            else {
                if (okHandler)
                    okHandler.once = true;
                if (okHandler) {
                    okHandler.runWith(data);
                    okHandler = null;
                    return;
                }
                if (cancelHandler)
                    cancelHandler.once = true;
                if (cancelHandler) {
                    cancelHandler.run();
                    cancelHandler = null;
                }
            }
        };
        TipManager.prototype.showTip = function (tipClass, data) {
            this.hideTipHandler();
            if (!tipClass) {
                tipClass = tips.PropTip;
            }
            if (tipClass == tips.PropTip) {
                if (data instanceof templates.item) {
                    if (data.type == TypeItem.PET_TYPE) {
                        var pet = Templates.getTemplateById(templates.Map.GENERAL, data.id);
                        if (pet) {
                            tipClass = tips.GeneralInfoTip;
                            data = pet;
                        }
                    }
                }
                else {
                    if (data.templateProp.type == TypeItem.PET_TYPE) {
                        var pet = Templates.getTemplateById(templates.Map.GENERAL, data.templateProp.id);
                        if (pet) {
                            tipClass = tips.GeneralInfoTip;
                            data = pet;
                        }
                    }
                }
            }
            this.registerTip(tipClass);
            var tip = this.reciveTip(egret.getQualifiedClassName(tipClass));
            if (!tip)
                return;
            this.showTipHandler(null, tip, data);
        };
        /**
         * 显示Tip操作
         *
         */
        TipManager.prototype.showTipHandler = function (node, tip, data) {
            // if(data==null) return ;
            this._currentTarget = node;
            this._currentTip = tip;
            if (data && data.mainType == TypeItem.EQUIP) {
                if (data instanceof vo.EquipVO) {
                    this._currentTip.data = data;
                }
                else {
                    var equip = Templates.getTemplateById(templates.Map.EQUIP, data.id);
                    this._currentTip.data = equip;
                }
            }
            else {
                this._currentTip.data = data;
            }
            this._currentTip.scaleX = this._currentTip.scaleY = game.GameConfig.UI_POP_SCALE;
            this._currentTip.x = (mg.stageManager.stageWidth - tip.width * this._currentTip.scaleX) * .5;
            this._currentTip.y = (mg.stageManager.stageHeight - tip.height * this._currentTip.scaleY) * .5;
            this.addChild(this._currentTip);
            this.dispatchEventWith(mg.TipManager.SHOW_OR_HIED_TIP);
            this._currentTip.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this._currentTip.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.showBlack();
        };
        /**
         * 隐藏tip操作
         */
        TipManager.prototype.hideTipHandler = function () {
            this.removeBlack();
            if (this._currentTip) {
                this._currentTip.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this._currentTip.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                if (this._currentTip.parent)
                    this._currentTip.removeSelf();
                this._currentTip = null;
                this.dispatchEventWith(mg.TipManager.SHOW_OR_HIED_TIP);
            }
            this._currentTarget = null;
        };
        TipManager.prototype.onClose = function (e) {
            this.hideTipHandler();
        };
        TipManager.prototype.showBlack = function () {
            this.addChildAt(this._black, 0);
            this.resizeBlack();
            egret.Tween.removeTweens(this._black);
            egret.Tween.get(this._black).to({ alpha: 0.9 }, 300);
            this._black.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        };
        TipManager.prototype.removeBlack = function (force) {
            if (force === void 0) { force = false; }
            this._black.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            egret.Tween.removeTweens(this._black);
            if (force) {
                if (this._black.parent) {
                    this._black.parent.removeChild(this._black);
                }
                return;
            }
            egret.Tween.get(this._black).to({ alpha: 0 }, 300 / 2).call(function () {
                egret.Tween.removeTweens(this._black);
                if (this._black.parent) {
                    this._black.parent.removeChild(this._black);
                }
            }, this);
        };
        TipManager.prototype.resizeBlack = function () {
            this._black.graphics.clear();
            this._black.graphics.beginFill(0x0, 0.8);
            this._black.graphics.drawRect(0, 0, mg.stageManager.stageWidth, mg.stageManager.stageHeight);
            this._black.graphics.endFill();
        };
        Object.defineProperty(TipManager.prototype, "current", {
            get: function () {
                return this._currentTip;
            },
            enumerable: true,
            configurable: true
        });
        TipManager.prototype.setCurrent = function () {
            this._currentTip = null;
            this.dispatchEventWith(mg.TipManager.SHOW_OR_HIED_TIP);
        };
        TipManager.SHOW_OR_HIED_TIP = "SHOW_OR_HIED_TIP";
        return TipManager;
    }(egret.Sprite));
    mg.TipManager = TipManager;
    __reflect(TipManager.prototype, "mg.TipManager");
})(mg || (mg = {}));
