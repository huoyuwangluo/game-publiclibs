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
    var ProtoSceneObjectEndInfoVO = (function (_super) {
        __extends(ProtoSceneObjectEndInfoVO, _super);
        function ProtoSceneObjectEndInfoVO() {
            return _super.call(this) || this;
        }
        ProtoSceneObjectEndInfoVO.prototype.initialize = function (data) {
            this._name = data.TeamName;
            this._voList = [];
            for (var i = 0; i < data.List.length; i++) {
                var endVo = vo.fromPool(vo.ProtoSceneObjectEndDetailVO, data.List[i]);
                this._voList.push(endVo);
            }
        };
        ProtoSceneObjectEndInfoVO.prototype.reset = function () {
            this._voList = [];
            this._name = null;
        };
        Object.defineProperty(ProtoSceneObjectEndInfoVO.prototype, "voList", {
            get: function () {
                return this._voList;
            },
            enumerable: true,
            configurable: true
        });
        ProtoSceneObjectEndInfoVO.prototype.getVoListByType = function (type) {
            if (this._voList) {
                if (type == 0) {
                    this._voList.sort(function (a, b) {
                        return b.dmg - a.dmg;
                    });
                }
                else if (type == 1) {
                    this._voList.sort(function (a, b) {
                        return b.hurt - a.hurt;
                    });
                }
                else {
                    this._voList.sort(function (a, b) {
                        return b.heal - a.heal;
                    });
                }
            }
            return this._voList;
        };
        Object.defineProperty(ProtoSceneObjectEndInfoVO.prototype, "name", {
            /**名字 */
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        return ProtoSceneObjectEndInfoVO;
    }(vo.VOBase));
    vo.ProtoSceneObjectEndInfoVO = ProtoSceneObjectEndInfoVO;
    __reflect(ProtoSceneObjectEndInfoVO.prototype, "vo.ProtoSceneObjectEndInfoVO");
})(vo || (vo = {}));
