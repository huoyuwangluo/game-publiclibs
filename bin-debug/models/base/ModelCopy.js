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
var mo;
(function (mo) {
    /**副本*/
    var ModelCopy = (function (_super) {
        __extends(ModelCopy, _super);
        function ModelCopy() {
            return _super.call(this) || this;
        }
        ModelCopy.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._typelist = {};
            this._steplist = {};
            this._stepMin = this._stepMax = 1;
            n.net.onRoute(n.MessageMap.G2C_PUBLIC_BOSS_NOTIFY_SHIELD_REWARD, utils.Handler.create(this, this.shieldReward, null, false));
        };
        ModelCopy.prototype.initializeData = function (types) {
            var copyVO;
            var copytemplates = Templates.getList(templates.Map.OTHERCHAPTER);
            for (var _i = 0, copytemplates_1 = copytemplates; _i < copytemplates_1.length; _i++) {
                var template = copytemplates_1[_i];
                var type = template.type;
                if (template.type != mo.ModelGameMaterial.COPY_MINGHUN && template.type != mo.ModelGameMaterial.COPY_TEAM && template.type != mo.ModelGameMaterial.COPY_MAIGU) {
                    var step = template.step;
                }
                var has = false;
                for (var _a = 0, types_1 = types; _a < types_1.length; _a++) {
                    var t = types_1[_a];
                    if (type == t) {
                        has = true;
                        break;
                    }
                }
                if (has) {
                    copyVO = new vo.CopyVO().initialize(template, 0);
                    if (!this._typelist[type])
                        this._typelist[type] = [];
                    this._typelist[type].push(copyVO);
                    if (template.type != mo.ModelGameMaterial.COPY_MINGHUN && template.type != mo.ModelGameMaterial.COPY_TEAM && template.type != mo.ModelGameMaterial.COPY_MAIGU) {
                        if (!this._steplist[step])
                            this._steplist[step] = [];
                        this._steplist[step].push(copyVO);
                        this._stepMin = Math.min(this._stepMin, step);
                        this._stepMax = Math.max(this._stepMax, step);
                    }
                }
            }
        };
        ModelCopy.prototype.shieldReward = function (data) {
            var items = [];
            for (var i = 0; i < data.Rewards.length; i++) {
                var itemVo = vo.fromPool(vo.ItemVO, parseInt(data.Rewards[i].Id));
                if (itemVo) {
                    itemVo.count = data.Rewards[i].Count;
                    items.push(itemVo);
                }
            }
            if (items.length > 0) {
                tips.GetBossShieldTip.instance.show(items);
            }
        };
        /**
         * 获得該类型所有副本
         * @param type 副本类型
         * @param sortType 排序类型 0 不排序 1 升序 2 降序
         * @param sortRemind isRemind字段是否参与排序
         */
        ModelCopy.prototype.getCopyList = function (type, sortType, sortRemind) {
            if (sortType === void 0) { sortType = 0; }
            if (sortRemind === void 0) { sortRemind = false; }
            if (sortType > 0) {
                var isUp = sortType == 1;
                this._typelist[type].sort(function (a, b) {
                    if (sortRemind) {
                        if (a.isRemind && !b.isRemind)
                            return isUp ? -1 : 1;
                        else if (!a.isRemind && b.isRemind)
                            return isUp ? 1 : -1;
                    }
                    return isUp ? (a.step < b.step ? -1 : 1) : (a.step < b.step ? 1 : -1);
                });
            }
            return this._typelist[type];
        };
        // public getCopyListByStep(step: number): vo.CopyVO[] {
        //     return this._steplist[step];
        // }
        ModelCopy.prototype.getHongYanBossMatchingMySelf = function () {
            var copyArr = GameModels.copyBoss.getCopyList(mo.ModelGameBoss.COPY_HONGYAN_BOSS, 1, true);
            var fightValue = GameModels.hongYan.fightValue;
            for (var i = 0; i < copyArr.length; i++) {
                if (i == copyArr.length - 1) {
                    if (fightValue > copyArr[i].template.needCE) {
                        return 0;
                    }
                    else {
                        return copyArr[i].template.step;
                    }
                }
                else {
                    if (fightValue > copyArr[i].template.needCE && fightValue < copyArr[i + 1].template.needCE) {
                        return copyArr[i + 1].template.step;
                    }
                }
            }
        };
        ModelCopy.prototype.getVOByStep = function (type, step) {
            var list = this._typelist[type];
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var vo = list_1[_i];
                if (vo.step == step) {
                    return vo;
                }
            }
            return null;
        };
        ModelCopy.prototype.getVOById = function (type, id) {
            var list = this._typelist[type];
            for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
                var vo = list_2[_i];
                if (vo.id == id) {
                    return vo;
                }
            }
            return null;
        };
        Object.defineProperty(ModelCopy.prototype, "stepMin", {
            get: function () {
                return this._stepMin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelCopy.prototype, "stepMax", {
            get: function () {
                return this._stepMax;
            },
            enumerable: true,
            configurable: true
        });
        // /**请求副本通关奖励 */
        // public requestPass<Z>(caller: Z, method: (this: Z, ...args) => void);
        // public requestPass(caller: any, method: Function) {
        //     this.request(n.MessageMap.C2G_COPY_PASS, n.MessagePool.from(n.C2G_Copy_Pass), utils.Handler.create(this, function (data: n.G2C_Copy_Pass) {
        //         method.call(caller, data.Stars, vo.parseItems(data.DropItems));
        //     }));
        // }
        /**请求扫荡*/
        ModelCopy.prototype.requestQuickPass = function (copyId, callback, count) {
            var cmd = n.MessagePool.from(n.C2G_Copy_QuickPass);
            cmd.CopyId = copyId;
            if (count && count > 0) {
                cmd.Count = count;
            }
            this.request(n.MessageMap.C2G_COPY_QUICKPASS, cmd, callback);
        };
        return ModelCopy;
    }(mo.ModelBase));
    mo.ModelCopy = ModelCopy;
    __reflect(ModelCopy.prototype, "mo.ModelCopy");
})(mo || (mo = {}));
