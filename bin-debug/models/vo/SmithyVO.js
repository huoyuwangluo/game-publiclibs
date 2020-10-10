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
var vo;
(function (vo) {
    var SmithyVO = (function (_super) {
        __extends(SmithyVO, _super);
        function SmithyVO() {
            return _super.call(this) || this;
        }
        SmithyVO.prototype.initialize = function (data) {
            this._data = data;
            this._data.autoRecover = false;
        };
        SmithyVO.prototype.reset = function () {
            if (this._data) {
                n.MessagePool.to(this._data);
                this._data = null;
            }
        };
        Object.defineProperty(SmithyVO.prototype, "playerId", {
            /**成员ID*/
            get: function () {
                return this._data.PlayerId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmithyVO.prototype, "playerName", {
            /**成员名称*/
            get: function () {
                return this._data.PlayerName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmithyVO.prototype, "headIcon", {
            /**成员头像*/
            get: function () {
                return this._data.HeadIcon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmithyVO.prototype, "level", {
            /**成员等级*/
            get: function () {
                return this._data.Level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmithyVO.prototype, "vipLevel", {
            /**成员vip等级*/
            get: function () {
                return this._data.VipLevel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmithyVO.prototype, "unionId", {
            /**成员阵营*/
            get: function () {
                return this._data.UnionId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SmithyVO.prototype, "leftTimes", {
            /**剩余协助次数 */
            get: function () {
                return this._data.LeftTimes;
            },
            enumerable: true,
            configurable: true
        });
        return SmithyVO;
    }(vo.VOBase));
    vo.SmithyVO = SmithyVO;
    __reflect(SmithyVO.prototype, "vo.SmithyVO");
})(vo || (vo = {}));
