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
    var PrizeVO = (function (_super) {
        __extends(PrizeVO, _super);
        function PrizeVO() {
            return _super.call(this) || this;
        }
        PrizeVO.prototype.initialize = function (data, type) {
            if (type === void 0) { type = 0; }
            this._type = type;
            this.updateTemplate(data);
            this.state = item.StatePrize.CLOSE;
        };
        PrizeVO.prototype.updateTemplate = function (data) {
            if (data instanceof templates.dataSetting) {
                this._template = data;
                this.state = item.StatePrize.CLOSE;
                var array = this._template.value.split('&');
                this._mark = parseInt(array[0]);
                this.paserPrizeItems(array[1]);
                return;
            }
            if (data instanceof templates.rewardFightMore) {
                this._template = data;
                this._mark = this._template.kills;
                this.paserPrizeItems(this._template.rewards);
            }
            if (data instanceof templates.rankReward) {
                if (data.rewards) {
                    this.state = item.StatePrize.CLOSE;
                    this._template = data;
                    this.paserPrizeItems(data.rewards);
                }
            }
        };
        PrizeVO.prototype.paserPrizeItems = function (str) {
            this.initAndtoPool();
            var itemVo = [];
            var items = str.split(";");
            for (var i = 0; i < items.length; i++) {
                var data = items[i].split("_");
                itemVo.push(vo.fromPool(vo.ItemVO, parseInt(data[0])));
                itemVo[i].count = parseInt(data[1]);
            }
            this._items = itemVo;
        };
        PrizeVO.prototype.initAndtoPool = function () {
            if (!this._items)
                this._items = [];
            vo.toPoolList(this._items);
            this._items.length = 0;
        };
        PrizeVO.prototype.reset = function () {
            this._state = 0;
            this._template = null;
            vo.toPoolList(this._items);
            this._items = null;
        };
        Object.defineProperty(PrizeVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrizeVO.prototype, "items", {
            get: function () {
                return this._items;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrizeVO.prototype, "boxLv", {
            get: function () {
                if (this._template instanceof templates.rewardFightMore) {
                    return this._template.boxLv;
                }
                if (this._template instanceof templates.dataSetting) {
                    return this._template.order;
                }
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrizeVO.prototype, "boxStep", {
            get: function () {
                return (this._template instanceof templates.rewardFightMore) ? this._template.boxStep : 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrizeVO.prototype, "state", {
            /**奖励宝箱状态 */
            get: function () {
                return this._state;
            },
            set: function (value) {
                this._state = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrizeVO.prototype, "type", {
            /**奖励宝箱类型 */
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PrizeVO.prototype, "mark", {
            /**奖励宝箱刻度位置 */
            get: function () {
                return this._mark;
            },
            enumerable: true,
            configurable: true
        });
        return PrizeVO;
    }(vo.VOBase));
    vo.PrizeVO = PrizeVO;
    __reflect(PrizeVO.prototype, "vo.PrizeVO");
})(vo || (vo = {}));
