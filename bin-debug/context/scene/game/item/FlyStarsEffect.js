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
    var FlyStar = (function (_super) {
        __extends(FlyStar, _super);
        function FlyStar() {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            return _this;
        }
        FlyStar.prototype.initialize = function () {
            this.texture = RES.getRes('common_json.common_6131_png');
        };
        FlyStar.prototype.reset = function () {
            utils.TweenUtil.killBezier(this);
            if (this.parent) {
                this.parent.removeChild(this);
            }
            this.texture = null;
        };
        FlyStar.prototype.start = function (layer, start, end, caller, method) {
            this.x = start.x;
            this.y = start.y;
            this.rotation = 0;
            layer.addChild(this);
            utils.TweenUtil.bezier(this, 1000, end.x, end.y, start.x - 100, start.y + 200, 180 + Math.random() * 100, 1, caller, method);
        };
        FlyStar.to = function (layer, startPoint, endPoint) {
            utils.ObjectPool.from(FlyStar, true).start(layer, startPoint, endPoint, this, function (item) {
                utils.ObjectPool.to(item, true);
            });
        };
        return FlyStar;
    }(egret.Bitmap));
    s.FlyStar = FlyStar;
    __reflect(FlyStar.prototype, "s.FlyStar", ["utils.IPool"]);
    // export class FlyStars{
    //     private _stars:FlyStar[];
    //     private _startPoint:egret.Point;
    //     private _endPoint:egret.Point;
    //     public constructor(){
    //         this._stars=[];
    //     }
    //     public initialize(total:number,startPoint:egret.Point){
    // 		while(total--){
    // 			var flyStar:FlyStar=utils.ObjectPool.from(s.FlyStar,true) as s.FlyStar;
    // 			this._stars.push(flyStar);
    // 		}
    //         this._startPoint=startPoint;
    //         this._endPoint=(mg.uiManager.getView(main.MainUIView) as main.MainUIView).getBossProgressPostion();
    //         this.handler();
    //     }
    //     public reset(){
    //         while(this._stars.length){
    //             utils.ObjectPool.to(this._stars.pop(),true);
    //         }
    //         this._startPoint=this._endPoint=null;
    //         utils.timer.clearAll(this);
    //     }
    //     private handler(){
    //         if(this._stars.length){
    //             (this._stars.pop() as FlyStar).start(mg.layerManager.uiEffect,this._startPoint,this._endPoint,this,this.handlerOver);
    //         }
    //         if(this._stars.length){
    //             utils.timer.once(100,this,this.handler);
    //         }else{
    //             this._startPoint=null;
    //             this._endPoint=null;
    //         }
    //     }
    //     private handlerOver(star:FlyStar){
    //         utils.ObjectPool.to(star,true);
    //     }
    //}
})(s || (s = {}));
