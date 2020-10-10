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
var s;
(function (s) {
    var PickSigleState = (function (_super) {
        __extends(PickSigleState, _super);
        function PickSigleState() {
            return _super.call(this, TypeState.PICK) || this;
        }
        PickSigleState.prototype.createAction = function () {
            this._action = new s.PickAction();
        };
        PickSigleState.prototype.initialize = function (body, job) {
            _super.prototype.initialize.call(this, body, job);
        };
        PickSigleState.prototype.check = function () {
            var that = this;
            var body = that._body;
            if (body.stateDead)
                return false;
            if (!body.isTeamLeader())
                return false;
            if (body.master == null || !body.master.pickUpOneByOne)
                return false;
            if (body.target && body.target.type == TypeActor.DROP) {
                //if((body.tileNode as any).drop){
                if (body.tileNode == body.target.tileNode) {
                    return true;
                }
            }
            return false;
        };
        PickSigleState.prototype.start = function (timer) {
            this._action.start();
            this.requestPick();
            return _super.prototype.start.call(this);
        };
        PickSigleState.prototype.requestPick = function () {
            var drops = [];
            for (var _i = 0, _a = this._body.scene.drops; _i < _a.length; _i++) {
                var item = _a[_i];
                if (!item.isMoney) {
                    drops.push(item.itemVO);
                }
            }
            GameModels.chapter.requestPick(drops);
        };
        PickSigleState.prototype.updateRender = function (timeStamp) {
            if (!this._runing)
                return true;
            var that = this;
            if (that._action.runing) {
                that._action.updateRender(timeStamp);
                if (!that._action.runing) {
                    that._body.scene.removeDrop(that._body.target);
                    that._body.target = null;
                    that.end();
                }
            }
            return true;
        };
        return PickSigleState;
    }(s.StateBase));
    s.PickSigleState = PickSigleState;
    __reflect(PickSigleState.prototype, "s.PickSigleState");
})(s || (s = {}));
