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
    var ModelHores = (function (_super) {
        __extends(ModelHores, _super);
        function ModelHores() {
            return _super.call(this) || this;
        }
        ModelHores.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._dataSetZhiLing = GameModels.dataSet.getDataSettingById(413001);
            this._dataSetFeiShengDan = GameModels.dataSet.getDataSettingById(414001);
            this.requestHoresinfo();
            n.net.onRoute(n.MessageMap.G2C_ZHANQI_SENDINFO, utils.Handler.create(this, this.updateInfo, null, false));
        };
        ModelHores.prototype.updateInfo = function (data) {
            if (this._currVo) {
                this._currVo.decode(data.Info);
            }
        };
        Object.defineProperty(ModelHores.prototype, "dataSetZhiLing", {
            get: function () {
                return this._dataSetZhiLing;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelHores.prototype, "dataSetFeiShengDan", {
            get: function () {
                return this._dataSetFeiShengDan;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelHores.prototype, "currVo", {
            get: function () {
                return this._currVo;
            },
            enumerable: true,
            configurable: true
        });
        ModelHores.prototype.setHoresUpgrade = function (id, value) {
            this._currVo.refId = id;
            this._currVo.wishvalue = value;
        };
        ModelHores.prototype.requestHoresinfo = function (complete) {
            var msg = n.MessagePool.from(n.C2G_ZhanQi_Info);
            this.request(n.MessageMap.C2G_ZHANQI_INFO, msg, utils.Handler.create(this, function (data) {
                if (this._currVo) {
                    vo.toPool(this._currVo);
                    this._currVo = null;
                }
                this._currVo = vo.fromPool(vo.GameHoresVO);
                this._currVo.decode(data.Info);
                GameModels.state.updateState(GameRedState.BAOWU_ZUOQI);
                if (complete) {
                    complete.run();
                }
            }));
        };
        //请求战骑升级
        ModelHores.prototype.requestHoresUpgrade = function (type, complete, onerr) {
            var msg = n.MessagePool.from(n.C2G_ZhanQi_Upgrade);
            msg.Type = type;
            this.request(n.MessageMap.C2G_ZHANQI_UPGRADE, msg, utils.Handler.create(this, function (data) {
                if (data.State == 2) {
                    mg.alertManager.tip(Language.getExpression(Language.E_JJSBZFZZK, data.AddWishes));
                }
                this.setHoresUpgrade(data.Info.RefId, data.Info.WishValue);
                // this.dispatchEventWith(ModelHores.HORES_DATA_CHANGE);
                this.dispatchEventWith(ModelHores.HORES_RENPOINT_CHANGE);
                GameModels.state.updateState(GameRedState.BAOWU_ZUOQI);
                if (data.IsFree == 1) {
                    this.dispatchEventWith(ModelHores.LUCK_HORES);
                }
                if (complete)
                    complete.runWith(data);
            }));
            n.net.onError(n.MessageMap.C2G_ZHANQI_UPGRADE, utils.Handler.create(this, function (data) {
                if (onerr)
                    onerr.runWith(data);
            }));
        };
        //请求战骑出战
        ModelHores.prototype.requestHoresBattle = function (step, complete) {
            var msg = n.MessagePool.from(n.C2G_ZhanQi_Dress);
            msg.Step = step;
            this.request(n.MessageMap.C2G_ZHANQI_DRESS, msg, utils.Handler.create(this, function (data) {
                if (complete) {
                    complete.run();
                }
            }));
        };
        ModelHores.prototype.checkCanUpgrade = function () {
            var hashAct = false;
            var infos = GameModels.fashion.getFashionData(TypeFashion.MOUNTS);
            for (var i = 0; i < infos.length; i++) {
                if (infos[i].isActived) {
                    hashAct = true;
                    break;
                }
            }
            if (!this._currVo)
                return false;
            var config = this._currVo.templatesHores;
            if (hashAct && config && config.nextId > 0)
                return true;
            return false;
        };
        ModelHores.prototype.getHashRedPointIndex = function () {
            var infos = GameModels.fashion.getFashionData(TypeFashion.MOUNTS);
            for (var i = 0; i < infos.length; i++) {
                if (infos[i].isActived == false) {
                    var activeItem = infos[i].template.consume.split("_");
                    var count = GameModels.bag.getItemCountById(activeItem[0]);
                    if (count >= parseInt(activeItem[1]))
                        return i;
                }
            }
            return 0;
        };
        ModelHores.prototype.hashActHorse = function () {
            var infos = GameModels.fashion.getFashionData(TypeFashion.MOUNTS);
            for (var i = 0; i < infos.length; i++) {
                if (infos[i].isActived) {
                    return true;
                }
            }
            return false;
        };
        ModelHores.prototype.checkHoresRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.baowu, 2))
                return false;
            if (!this.hashActHorse())
                return false;
            if (!this._currVo)
                return false;
            var config = this._currVo.templatesHores;
            var hashAnimal = false;
            var yaoHuanimal = GameModels.animal.getAnimalBuyType(20); //妖虎
            if (yaoHuanimal && yaoHuanimal.isAct && yaoHuanimal.step >= 4) {
                hashAnimal = true;
            }
            if (config && config.nextId > 0) {
                var item = Templates.getTemplateById(templates.Map.ITEM, parseInt(config.consume.split("_")[0]));
                var bagCount = GameModels.bag.getItemCountById(item.id);
                var needCount = hashAnimal ? Math.floor(parseInt(config.consume.split("_")[1]) / 2) : parseInt(config.consume.split("_")[1]);
                if (bagCount >= needCount && GameModels.user.player.level >= config.allLv) {
                    return true;
                }
            }
            return false;
        };
        /**战骑数据变化 */
        ModelHores.HORES_DATA_CHANGE = "HORES_DATA_CHANGE";
        // /**战骑红点变化 */
        ModelHores.HORES_RENPOINT_CHANGE = "HORES_RENPOINT_CHANGE";
        // /**幸运战骑 */
        ModelHores.LUCK_HORES = "LUCK_HORES";
        return ModelHores;
    }(mo.ModelBase));
    mo.ModelHores = ModelHores;
    __reflect(ModelHores.prototype, "mo.ModelHores");
})(mo || (mo = {}));
