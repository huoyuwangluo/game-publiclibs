var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var vo;
(function (vo) {
    var AttackerVO = (function () {
        function AttackerVO() {
            this.autoRecover = true;
            this.toPoolTime = 0;
            this._isAttacking = true;
        }
        AttackerVO.fromPool = function (playerVO) {
            return utils.ObjectPool.from(AttackerVO, true, playerVO);
        };
        AttackerVO.toPool = function (attackVO) {
            utils.ObjectPool.to(attackVO, true);
        };
        AttackerVO.destoryPool = function () {
            utils.ObjectPool.destroy(AttackerVO);
        };
        AttackerVO.prototype.initialize = function (playerVO) {
            this._playerVO = playerVO;
            this._isAttacking = this._playerVO.target == GameModels.user.player;
        };
        AttackerVO.prototype.reset = function () {
            this._playerVO = null;
            this.offStateChanageAll();
        };
        AttackerVO.prototype.updateState = function () {
            var state = this._playerVO.target == GameModels.user.player;
            if (this._isAttacking != state) {
                this._isAttacking = state;
                if (this._stateHandlers) {
                    this._stateHandlers.run();
                }
            }
        };
        Object.defineProperty(AttackerVO.prototype, "isAttacking", {
            get: function () {
                return this._isAttacking;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AttackerVO.prototype, "playerVO", {
            get: function () {
                return this._playerVO;
            },
            enumerable: true,
            configurable: true
        });
        AttackerVO.prototype.onStateChanage = function (caller, method) {
            if (!this._stateHandlers) {
                this._stateHandlers = new utils.Handlers(false);
            }
            this._stateHandlers.add(caller, method, null, false);
        };
        AttackerVO.prototype.offStateChanage = function (caller, method) {
            if (this._stateHandlers)
                this._stateHandlers.remove(caller, method);
        };
        AttackerVO.prototype.offStateChanageAll = function () {
            if (this._stateHandlers)
                this._stateHandlers.clear();
        };
        return AttackerVO;
    }());
    vo.AttackerVO = AttackerVO;
    __reflect(AttackerVO.prototype, "vo.AttackerVO", ["utils.IPool"]);
})(vo || (vo = {}));
