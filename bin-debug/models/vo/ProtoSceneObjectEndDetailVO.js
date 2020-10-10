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
    var ProtoSceneObjectEndDetailVO = (function (_super) {
        __extends(ProtoSceneObjectEndDetailVO, _super);
        function ProtoSceneObjectEndDetailVO() {
            return _super.call(this) || this;
        }
        ProtoSceneObjectEndDetailVO.prototype.initialize = function (data) {
            this._petId = data.PetId;
            this._petStar = data.PetStar;
            this._dmg = data.Dmg;
            this._heal = data.Heal;
            this._hurt = data.Hurt;
        };
        ProtoSceneObjectEndDetailVO.prototype.reset = function () {
            this._petId = 0;
            this._petStar = 0;
            this._dmg = 0;
            this._heal = 0;
            this._hurt = 0;
        };
        Object.defineProperty(ProtoSceneObjectEndDetailVO.prototype, "petId", {
            get: function () {
                return this._petId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoSceneObjectEndDetailVO.prototype, "petStar", {
            get: function () {
                return this._petStar;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoSceneObjectEndDetailVO.prototype, "dmg", {
            /**伤害量  */
            get: function () {
                return this._dmg;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoSceneObjectEndDetailVO.prototype, "heal", {
            /**治疗 */
            get: function () {
                return this._heal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProtoSceneObjectEndDetailVO.prototype, "hurt", {
            /**承受量 */
            get: function () {
                return this._hurt;
            },
            enumerable: true,
            configurable: true
        });
        return ProtoSceneObjectEndDetailVO;
    }(vo.VOBase));
    vo.ProtoSceneObjectEndDetailVO = ProtoSceneObjectEndDetailVO;
    __reflect(ProtoSceneObjectEndDetailVO.prototype, "vo.ProtoSceneObjectEndDetailVO");
})(vo || (vo = {}));
