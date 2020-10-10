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
    var GamePetBingFaVO = (function (_super) {
        __extends(GamePetBingFaVO, _super);
        function GamePetBingFaVO() {
            return _super.call(this) || this;
        }
        GamePetBingFaVO.prototype.initialize = function (data) {
            this._bingFaSkillList = [];
            this._baseBingFaProp = [];
            this._specialBingFaProp = [];
            this._pos = -1;
            this._bingFaCfgId = 0;
            if (data) {
                this._pos = data.Pos;
                this._bingFaCfgId = data.BingFaCfgId;
                this._itemTemp = Templates.getTemplateById(templates.Map.ITEM, this._bingFaCfgId);
                for (var i = 0; i < data.BingFaProp.length; i++) {
                    var listVo = vo.fromPool(vo.ProtoPairIntIntVO, data.BingFaProp[i]);
                    if (TypeProperty.baseProperties.indexOf(listVo.key) != -1) {
                        this._baseBingFaProp.push(listVo);
                    }
                    else {
                        this._specialBingFaProp.push(listVo);
                    }
                }
                for (var i = 0; i < data.BingFaSkillList.length; i++) {
                    if (data.BingFaSkillList[i]) {
                        var skillVO = vo.fromPool(vo.SkillVO);
                        skillVO.initialize(Templates.getTemplateById(templates.Map.SKILLNEW, data.BingFaSkillList[i]), 0);
                        this._bingFaSkillList.push(skillVO);
                    }
                }
            }
        };
        GamePetBingFaVO.prototype.reset = function () {
            this._bingFaSkillList = [];
            this._baseBingFaProp = [];
            this._specialBingFaProp = [];
            this._pos = -1;
            this._bingFaCfgId = 0;
        };
        Object.defineProperty(GamePetBingFaVO.prototype, "pos", {
            /**兵法位置*/
            get: function () {
                return this._pos;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetBingFaVO.prototype, "bingFaCfgId", {
            /**兵法配置id*/
            get: function () {
                return this._bingFaCfgId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetBingFaVO.prototype, "baseBingFaProp", {
            /**兵法基础属性 */
            get: function () {
                return this._baseBingFaProp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetBingFaVO.prototype, "specialBingFaProp", {
            /**兵法特殊属性 */
            get: function () {
                return this._specialBingFaProp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetBingFaVO.prototype, "bingFaSkillList", {
            /**兵法技能列表 */
            get: function () {
                return this._bingFaSkillList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetBingFaVO.prototype, "price", {
            get: function () {
                var templa = Templates.getTemplateByProperty(templates.Map.BINGFA, "quality", this._itemTemp.quality);
                return parseInt(templa.consume.split("_")[1]);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetBingFaVO.prototype, "baoDiCnt", {
            get: function () {
                var templa = Templates.getTemplateByProperty(templates.Map.BINGFA, "quality", this._itemTemp.quality);
                return templa.baodiTimes;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetBingFaVO.prototype, "icon", {
            get: function () {
                return this._itemTemp.icon;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetBingFaVO.prototype, "quality", {
            get: function () {
                return this._itemTemp.quality;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetBingFaVO.prototype, "name", {
            get: function () {
                return this._itemTemp.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePetBingFaVO.prototype, "itemTemp", {
            get: function () {
                return this._itemTemp;
            },
            enumerable: true,
            configurable: true
        });
        return GamePetBingFaVO;
    }(vo.VOBase));
    vo.GamePetBingFaVO = GamePetBingFaVO;
    __reflect(GamePetBingFaVO.prototype, "vo.GamePetBingFaVO");
})(vo || (vo = {}));
