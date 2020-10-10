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
    var ZhanLingVO = (function (_super) {
        __extends(ZhanLingVO, _super);
        function ZhanLingVO() {
            return _super.call(this) || this;
        }
        ZhanLingVO.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._level = this._reward1State = this._reward2State = 0;
            this._zhanlingTemp = null;
        };
        ZhanLingVO.prototype.reset = function () {
            this._zhanlingTemp = null;
        };
        ZhanLingVO.prototype.decode = function (data) {
            this._zhanlingTemp = Templates.getTemplateByTwoProperty(templates.Map.BATTLEPASS, "level", data.Level, "season", GameModels.zhanling.seaon);
            this._level = data.Level;
            this._reward1State = data.Reward1;
            this._reward2State = data.Reward2;
        };
        Object.defineProperty(ZhanLingVO.prototype, "template", {
            get: function () {
                return this._zhanlingTemp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZhanLingVO.prototype, "level", {
            get: function () {
                return this._level;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZhanLingVO.prototype, "reward1State", {
            /**精英战令奖励是否领取 */
            get: function () {
                return this._reward1State;
            },
            set: function (v) {
                this._reward1State = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZhanLingVO.prototype, "reward2State", {
            /**进阶战令奖励是否领取 */
            get: function () {
                return this._reward2State;
            },
            set: function (v) {
                this._reward2State = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ZhanLingVO.prototype, "state", {
            /**1可领取 2是未达成，3是已领取 */
            get: function () {
                if (this._reward1State > 0 && this._reward2State > 0)
                    return 3;
                var aB = GameModels.zhanling.currTemp.id >= this._level && this._reward1State <= 0;
                var bB = GameModels.zhanling.currTemp.id >= this._level && this._reward2State <= 0 && GameModels.zhanling.stepOpen > 0;
                if (aB || bB)
                    return 1;
                return 2;
            },
            enumerable: true,
            configurable: true
        });
        return ZhanLingVO;
    }(vo.VOBase));
    vo.ZhanLingVO = ZhanLingVO;
    __reflect(ZhanLingVO.prototype, "vo.ZhanLingVO");
})(vo || (vo = {}));
