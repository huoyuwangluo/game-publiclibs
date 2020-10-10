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
var mo;
(function (mo) {
    /**
     * 数据模型基类 该类一旦被初始化，通常不需要对其进行销毁和回收
     * @author Administrator
     */
    var ModelBase = (function (_super) {
        __extends(ModelBase, _super);
        function ModelBase() {
            var _this = _super.call(this) || this;
            /**
             * 发送消息
             * @param routeId 路由信息
             * @param msg 消息体（参见MessageMap）
             */
            _this.notify = function (routeId, msg, logEnabled) {
                if (logEnabled === void 0) { logEnabled = false; }
                n.net.notify(routeId, msg, logEnabled);
            };
            _this.initialize();
            return _this;
        }
        /**
         * 初始化Model
         */
        ModelBase.prototype.initialize = function () { };
        /**
         * 通常不需要对其进行销毁
         */
        ModelBase.prototype.destroy = function () { };
        /**
         * 请求消息
         * @param routeId 路由信息
         * @param msg 消息体（参见MessageMap）
         * @param handler 消息回调
         * @param recorverMsg 消息回收
         */
        ModelBase.prototype.request = function (routeId, msg, handler, logEnabled) {
            if (handler === void 0) { handler = null; }
            if (logEnabled === void 0) { logEnabled = false; }
            n.net.request(routeId, msg, handler, logEnabled);
        };
        /**
         * 监听消息
         * @param routeId 路由信息
         * @param handler 消息回调
         */
        ModelBase.prototype.onRoute = function (routeId, handler) {
            n.net.onRoute(routeId, handler);
        };
        ModelBase.prototype.offRoute = function (routeId) {
            n.net.offRoute(routeId);
        };
        ModelBase.prototype.onError = function (routeId, handler, stopError) {
            if (stopError === void 0) { stopError = true; }
            n.net.onError(routeId, handler, stopError);
        };
        ModelBase.prototype.offError = function (routeId) {
            n.net.offError(routeId);
        };
        return ModelBase;
    }(egret.EventDispatcher));
    mo.ModelBase = ModelBase;
    __reflect(ModelBase.prototype, "mo.ModelBase");
})(mo || (mo = {}));
