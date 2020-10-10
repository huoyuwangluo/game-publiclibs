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
    var TipUpManager = (function (_super) {
        __extends(TipUpManager, _super);
        function TipUpManager() {
            var _this = _super.call(this) || this;
            _this.SHOW_DELAY = 200;
            _this._enabled = true;
            _this._tips = {};
            _this._targets = {};
            return _this;
        }
        Object.defineProperty(TipUpManager, "instance", {
            get: function () {
                if (!mg.TipUpManager._instance) {
                    mg.TipUpManager._instance = new mg.TipUpManager();
                    mg.TipUpManager._instance.initialize();
                }
                return mg.TipUpManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        TipUpManager.prototype.initialize = function () {
            mg.layerManager.tipUp.addChild(this);
            this._black = new egret.Sprite();
            this._black.touchEnabled = true;
            this.registerTip(tipUps.BingFaAert); //兵法tips
            this.registerTip(tipUps.PetSkillDetailsTips); //技能详情tips
            this.registerTip(tipUps.PetNextSkillDetailsTips); //下一级技能详情tips
            this.registerTip(tipUps.PropertyTips); //武将属性tips
            this.registerTip(dialog.kingwar.kingWarMapArmyBuBing);
            this.registerTip(kingWarMapBuZhen1);
            this.registerTip(tipUps.AnimalSkillTips); //宠物技能
            this.registerTip(tipUps.CommenGetRewardTips); //宠物技能
        };
        /**注册Tip */
        TipUpManager.prototype.registerTip = function (tipclass) {
            var name = egret.getQualifiedClassName(tipclass);
            if (!this._tips[name]) {
                this._tips[name] = { clazz: tipclass, instance: null };
            }
            return name;
        };
        /**取出Tip单例 */
        TipUpManager.prototype.reciveTip = function (name) {
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
        TipUpManager.prototype.unRegisterTip = function (name) {
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
        TipUpManager.prototype.hasTipReference = function (name) {
            for (var _i = 0, _a = this._targets; _i < _a.length; _i++) {
                var object = _a[_i];
                if (object.tipName == name) {
                    return true;
                }
            }
            return false;
        };
        // /**
        //  * 绑定Tip 对应的调用unBind进行解绑 不推荐在IitemRenderer实现类中使用此方法
        //  * @param target
        //  * @param data
        //  */
        // public bind(node: egret.DisplayObject, tipClass: any, data: Object): void {
        // 	var tipName: string = this.registerTip(tipClass)
        // 	if (!this._targets[node.hashCode]) {
        // 		this._targets[node.hashCode] = { tipName: tipName, data: data };
        // 		node.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        // 	}
        // }
        // /**
        //  * 解绑Tip 
        //  * @param target
        //  */
        // public unBind(node: egret.DisplayObject): void {
        // 	if (this._targets[node.hashCode]) {
        // 		if (this._currentTarget == node) {
        // 			this.hideTipHandler();
        // 		}
        // 		node.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        // 		var tipName: string = this._targets[node.hashCode].tipName;
        // 		this._targets[node.hashCode] = null;
        // 		delete this._targets[node.hashCode];
        // 		if (!this.hasTipReference(tipName)) {
        // 			this.unRegisterTip(tipName);
        // 		}
        // 	}
        // }
        // private onTouchHandler(e: egret.TouchEvent): void {
        // 	let data: any = this._targets[e.target.hashCode];
        // 	if (data) {
        // 		this.showTipHandler(e.target, this.reciveTip(data.tipName), data.data);
        // 	}
        // }
        TipUpManager.prototype.showTip = function (tipClass, data) {
            this.hideTipHandler();
            if (!tipClass)
                tipClass = tips.PropTip;
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
        TipUpManager.prototype.showTipHandler = function (node, tip, data) {
            this._currentTarget = node;
            this._currentTip = tip;
            if (data.mainType == TypeItem.EQUIP) {
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
            this.dispatchEventWith(mg.TipUpManager.SHOW_OR_HIED_TIP);
            this._currentTip.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this._currentTip.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.showBlack();
        };
        /**
         * 隐藏tip操作
         */
        TipUpManager.prototype.hideTipHandler = function () {
            this.removeBlack();
            if (this._currentTip) {
                this._currentTip.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this._currentTip.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                if (this._currentTip.parent)
                    this._currentTip.removeSelf();
                this._currentTip = null;
                this.dispatchEventWith(mg.TipUpManager.SHOW_OR_HIED_TIP);
            }
            this._currentTarget = null;
        };
        TipUpManager.prototype.onClose = function (e) {
            this.hideTipHandler();
        };
        TipUpManager.prototype.showBlack = function () {
            this.addChildAt(this._black, 0);
            this.resizeBlack();
            egret.Tween.removeTweens(this._black);
            egret.Tween.get(this._black).to({ alpha: 0.9 }, 300);
            this._black.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        };
        TipUpManager.prototype.removeBlack = function (force) {
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
        TipUpManager.prototype.resizeBlack = function () {
            this._black.graphics.clear();
            this._black.graphics.beginFill(0x0, 0.8);
            this._black.graphics.drawRect(0, 0, mg.stageManager.stageWidth, mg.stageManager.stageHeight);
            this._black.graphics.endFill();
        };
        Object.defineProperty(TipUpManager.prototype, "current", {
            get: function () {
                return this._currentTip;
            },
            enumerable: true,
            configurable: true
        });
        TipUpManager.prototype.setCurrent = function () {
            this._currentTip = null;
        };
        TipUpManager.SHOW_OR_HIED_TIP = "SHOW_OR_HIED_TIP";
        return TipUpManager;
    }(egret.Sprite));
    mg.TipUpManager = TipUpManager;
    __reflect(TipUpManager.prototype, "mg.TipUpManager");
})(mg || (mg = {}));
