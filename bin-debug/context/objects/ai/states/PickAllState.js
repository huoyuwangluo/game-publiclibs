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
    var PickAllState = (function (_super) {
        __extends(PickAllState, _super);
        function PickAllState() {
            return _super.call(this, TypeState.PICK) || this;
        }
        PickAllState.prototype.createAction = function () {
            this._action = new s.PickAction();
        };
        PickAllState.prototype.initialize = function (body, job) {
            _super.prototype.initialize.call(this, body, job);
        };
        PickAllState.prototype.check = function () {
            var that = this;
            var body = that._body;
            if (body.stateDead)
                return false;
            if (!body.isTeamLeader())
                return false;
            if (body.master == null || body.master.pickUpOneByOne)
                return false;
            if (body.target && body.target.type == TypeActor.DROP) {
                //if((body.tileNode as any).drop){
                if (body.tileNode == body.target.tileNode) {
                    return true;
                }
            }
            return false;
        };
        PickAllState.prototype.start = function (timer) {
            //this._endTime=egret.getTimer()+2000;
            //utils.timer.once(1000,this._action,this._action.start);
            this._endTime = egret.getTimer() + 1000;
            this._action.start();
            return _super.prototype.start.call(this);
        };
        PickAllState.prototype.end = function () {
            //utils.timer.clear(this._action,this._action.start);
            _super.prototype.end.call(this);
        };
        PickAllState.prototype.tweenPickItems = function () {
            var body = this._body;
            var items = body.scene.drops;
            var maxTime = 0;
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                var distance = utils.MathUtil.getDistance(body.tileX, body.tileY, item.tileX, item.tileY);
                var time = distance * 100;
                maxTime = Math.max(time, maxTime);
                egret.Tween.get(item).to({ x: body.x, y: body.y, alpha: 0 }, time, utils.Ease.backInOut);
            }
            this._endTime = egret.getTimer() + maxTime;
            var scene = body.scene;
            var drops = [];
            for (var _a = 0, _b = scene.drops; _a < _b.length; _a++) {
                var item = _b[_a];
                if (!item.isMoney) {
                    drops.push(item.itemVO);
                }
            }
            GameModels.chapter.requestPick(drops);
            scene.removeAllDrop(true);
            if (body.target && body.target.type == TypeActor.DROP)
                body.target = null;
        };
        PickAllState.prototype.updateRender = function (timeStamp) {
            if (!this._runing)
                return true;
            var that = this;
            if (that._action.runing) {
                that._action.updateRender(timeStamp);
                if (!that._action.runing) {
                    that.tweenPickItems();
                }
            }
            else if (timeStamp > that._endTime) {
                that.end();
            }
            return true;
        };
        return PickAllState;
    }(s.StateBase));
    s.PickAllState = PickAllState;
    __reflect(PickAllState.prototype, "s.PickAllState");
})(s || (s = {}));
