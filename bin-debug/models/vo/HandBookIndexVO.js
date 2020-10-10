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
    var HandBookIndexVO = (function (_super) {
        __extends(HandBookIndexVO, _super);
        function HandBookIndexVO() {
            return _super.call(this) || this;
        }
        HandBookIndexVO.prototype.initialize = function () {
            this._handbookId = 0;
            this._status = 0;
        };
        HandBookIndexVO.prototype.reset = function () {
            this._handbookId = 0;
            this._status = 0;
        };
        HandBookIndexVO.prototype.decode = function (data) {
            this._handbookId = data.HandbookId;
            this._status = data.Status;
            this._templates = Templates.getTemplateById(templates.Map.HANDBOOK, this._handbookId);
            this._generalTemps = Templates.getTemplateById(templates.Map.GENERAL, this._templates.general);
            if (this._generalTemps.country == 4) {
                this._type = 1;
            }
            else if (this._generalTemps.country == 2) {
                this._type = 2;
            }
            else if (this._generalTemps.country == 3) {
                this._type = 3;
            }
            else {
                this._type = 4;
            }
        };
        Object.defineProperty(HandBookIndexVO.prototype, "type", {
            /**1群 2蜀 3吴 4魏 */
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HandBookIndexVO.prototype, "handbookId", {
            get: function () {
                return this._handbookId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HandBookIndexVO.prototype, "status", {
            /**图鉴可激活状态 */
            get: function () {
                return this._status;
            },
            /**0--未激活1--已激活 */
            set: function (v) {
                this._status = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HandBookIndexVO.prototype, "templates", {
            /**将星配置 */
            get: function () {
                return this._templates;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HandBookIndexVO.prototype, "stepTemp", {
            /**将星进阶基础配置 */
            get: function () {
                return this._stepTemp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HandBookIndexVO.prototype, "braekTemp", {
            /**将星突破配置 */
            get: function () {
                return this._breakTemp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HandBookIndexVO.prototype, "generalTemps", {
            get: function () {
                return this._generalTemps;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HandBookIndexVO.prototype, "general", {
            get: function () {
                return this._templates.general;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HandBookIndexVO.prototype, "maxLv", {
            get: function () {
                return this._templates.maxLv;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HandBookIndexVO.prototype, "basePro", {
            get: function () {
                return this._breakTemp.generalPro;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(HandBookIndexVO.prototype, "generalQuaitly", {
            get: function () {
                if (!this._templates)
                    return 0;
                var general = Templates.getTemplateById(templates.Map.GENERAL, this._templates.general);
                return general.quality;
            },
            enumerable: true,
            configurable: true
        });
        return HandBookIndexVO;
    }(vo.VOBase));
    vo.HandBookIndexVO = HandBookIndexVO;
    __reflect(HandBookIndexVO.prototype, "vo.HandBookIndexVO");
})(vo || (vo = {}));
