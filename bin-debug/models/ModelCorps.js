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
    var ModelCorps = (function (_super) {
        __extends(ModelCorps, _super);
        function ModelCorps() {
            return _super.call(this) || this;
        }
        ModelCorps.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._isOpenView = false;
            this.requestCorpsInfo();
        };
        ModelCorps.prototype.initCorpsInfo = function (data) {
            this._corpsVO = [];
            for (var i = 0; i < data.length; i++) {
                var cropsVo = vo.fromPool(vo.CropsVo);
                cropsVo.decode(data[i]);
                this._corpsVO.push(cropsVo);
            }
        };
        ModelCorps.prototype.updataCorpsInfo = function (data) {
            if (this._corpsVO) {
                for (var i = 0; i < this._corpsVO.length; i++) {
                    if (this._corpsVO[i].type == data.CorpsType) {
                        this._corpsVO[i].level = data.Level;
                        this._corpsVO[i].decode(data);
                        break;
                    }
                }
            }
        };
        ModelCorps.prototype.getCorpsVoByType = function (type) {
            if (this._corpsVO) {
                for (var i = 0; i < this._corpsVO.length; i++) {
                    if (this._corpsVO[i].type == type) {
                        return this._corpsVO[i];
                    }
                }
            }
        };
        Object.defineProperty(ModelCorps.prototype, "cropsVo", {
            get: function () {
                return this._corpsVO;
            },
            enumerable: true,
            configurable: true
        });
        //请求兵种信息
        ModelCorps.prototype.requestCorpsInfo = function (complete) {
            var _this = this;
            this.request(n.MessageMap.C2G_CORPS_GETINFO, n.MessagePool.from(n.C2G_Corps_GetInfo), utils.Handler.create(this, function (data) {
                _this.initCorpsInfo(data.List);
                GameModels.state.updateState(GameRedState.UNION_FULI_BINGZHONG);
                if (complete)
                    complete.runWith(data);
            }));
        };
        //请求升级兵种
        ModelCorps.prototype.requestUpCorps = function (type, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Corps_Upgrade);
            msg.CorpsType = type;
            this.request(n.MessageMap.C2G_CORPS_UPGRADE, msg, utils.Handler.create(this, function (data) {
                _this.updataCorpsInfo(data.Info);
                GameModels.state.updateState(GameRedState.UNION_FULI_BINGZHONG);
                if (complete)
                    complete.runWith(data);
            }));
        };
        //请求重置兵种
        ModelCorps.prototype.requestResetCorps = function (type, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Corps_Reset);
            msg.CorpsType = type;
            this.request(n.MessageMap.C2G_CORPS_RESET, msg, utils.Handler.create(this, function (data) {
                _this.updataCorpsInfo(data.Info);
                GameModels.state.updateState(GameRedState.UNION_FULI_BINGZHONG);
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelCorps.prototype, "isOpenView", {
            get: function () {
                return this._isOpenView;
            },
            set: function (value) {
                this._isOpenView = value;
                GameModels.state.updateState(GameRedState.UNION_FULI_BINGZHONG);
            },
            enumerable: true,
            configurable: true
        });
        /**红点 */
        ModelCorps.prototype.checkAllLegoinCorps = function () {
            if (this._isOpenView)
                return false;
            for (var i = 0; i < 5; i++) {
                if (this.checkLegoinCorps(i + 1)) {
                    return true;
                }
            }
            return false;
        };
        ModelCorps.prototype.checkLegoinCorps = function (index) {
            if (!GameModels.user.player.legionId)
                return false;
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.legioncorps))
                return false;
            var corpsVo = GameModels.corps.getCorpsVoByType(index);
            if (!corpsVo)
                return false;
            var needCount = parseInt(corpsVo.cropsTemp.consume.split("_")[1]);
            if (corpsVo.cropsTemp.nextId != -1 && GameModels.user.player.getProperty(TypeProperty.UnionGongXian) >= needCount) {
                return true;
            }
            return false;
        };
        return ModelCorps;
    }(mo.ModelBase));
    mo.ModelCorps = ModelCorps;
    __reflect(ModelCorps.prototype, "mo.ModelCorps");
})(mo || (mo = {}));
