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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var game;
(function (game) {
    var TextureBaseLoader = (function (_super) {
        __extends(TextureBaseLoader, _super);
        function TextureBaseLoader(retryCount) {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            _this._retryCount = 1;
            if (retryCount)
                _this._retryCount = retryCount;
            return _this;
        }
        TextureBaseLoader.prototype.initialize = function (jsonURl, pngURl) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this._pngURl = pngURl;
            this._textLoader = utils.ObjectPool.from(game.TextBaseLoader, true, jsonURl, true, 0);
        };
        TextureBaseLoader.prototype.reset = function () {
            if (this._textLoader) {
                utils.ObjectPool.to(this._textLoader, true);
                this._textLoader = null;
            }
            this._json = null;
            this._pngURl = '';
            this.removeEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            this._caller = null;
            this._complete = null;
        };
        TextureBaseLoader.prototype.start = function (caller, method) {
            this._caller = caller;
            this._complete = method;
            this._times = 0;
            this._isLoading = true;
            this._textLoader.start(this, this.textLoadedHandler);
        };
        TextureBaseLoader.prototype.textLoadedHandler = function (json) {
            this._json = json;
            _super.prototype.load.call(this, game.versionControl.getVirtualUrl(this._pngURl));
            this.addEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
        };
        TextureBaseLoader.prototype.completeHandler = function (e) {
            this.removeEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            var texture = new egret.Texture();
            if (this.data)
                texture._setBitmapData(this.data);
            this.data = null;
            this._isLoading = false;
            if (this._complete)
                this._complete.call(this._caller, this._json, texture);
        };
        TextureBaseLoader.prototype.errorHandler = function (e) {
            if (this._times >= this._retryCount) {
                this._isLoading = false;
                this.removeEventListener(egret.Event.COMPLETE, this.completeHandler, this);
                this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
                if (this._complete)
                    this._complete.call(this._caller, null, null);
                return;
            }
            this._times++;
            _super.prototype.load.call(this, game.versionControl.getVirtualUrl(this._pngURl));
        };
        Object.defineProperty(TextureBaseLoader.prototype, "isLoading", {
            get: function () {
                return this._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        return TextureBaseLoader;
    }(egret.ImageLoader));
    game.TextureBaseLoader = TextureBaseLoader;
    __reflect(TextureBaseLoader.prototype, "game.TextureBaseLoader", ["game.IBaseLoader", "utils.IPool"]);
})(game || (game = {}));
var utils;
(function (utils) {
    /**
     * <p><code>Handler</code> 是事件处理器类。</p>
     * <p>推荐使用 Handler.create() 方法从对象池创建，减少对象创建消耗。创建的 Handler 对象不再使用后，可以使用 Handler.recover() 将其回收到对象池，回收后不要再使用此对象，否则会导致不可预料的错误。</p>
     * <p><b>注意：</b>由于鼠标事件也用本对象池，不正确的回收及调用，可能会影响鼠标事件的执行。</p>
     */
    var Handler = (function () {
        /**
         * 根据指定的属性值，创建一个 <code>Handler</code> 类的实例。
         * @param	caller 执行域。
         * @param	method 处理函数。
         * @param	args 函数参数。
         * @param	once 是否只执行一次。
         */
        function Handler(caller, method, args, once) {
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            if (args === void 0) { args = null; }
            if (once === void 0) { once = false; }
            /** 表示是否只执行一次。如果为true，回调后执行recover()进行回收，回收后会被再利用，默认为false 。*/
            this.once = false;
            /**@private */
            this._id = 0;
            this.setTo(caller, method, args, once);
        }
        /**
         * 设置此对象的指定属性值。
         * @param	caller 执行域(this)。
         * @param	method 回调方法。
         * @param	args 携带的参数。
         * @param	once 是否只执行一次，如果为true，执行后执行recover()进行回收。
         * @return  返回 handler 本身。
         */
        Handler.prototype.setTo = function (caller, method, args, once) {
            this._id = Handler._gid++;
            this.caller = caller;
            this.method = method;
            this.args = args;
            this.once = once;
            return this;
        };
        /**
         * 执行处理器。
         */
        Handler.prototype.run = function () {
            if (this.method == null)
                return null;
            var id = this._id;
            var result = this.method.apply(this.caller, this.args);
            this._id === id && this.once && this.recover();
            return result;
        };
        /**
         * 执行处理器，携带额外数据。
         * @param	data 附加的回调数据，可以是单数据或者Array(作为多参)。
         */
        Handler.prototype.runWith = function () {
            var array = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                array[_i] = arguments[_i];
            }
            if (this.method == null)
                return null;
            var id = this._id;
            var result;
            if (!array || !array.length)
                result = this.method.apply(this.caller, this.args);
            else if (!this.args)
                result = this.method.apply(this.caller, array);
            else if (this.args)
                result = this.method.apply(this.caller, this.args.concat(array));
            else
                result = this.method.apply(this.caller, array);
            this._id === id && this.once && this.recover();
            return result;
        };
        /**
         * 清理对象引用。
         */
        Handler.prototype.clear = function () {
            this.caller = null;
            this.method = null;
            this.args = null;
            return this;
        };
        /**
         * 清理并回收到 Handler 对象池内。
         */
        Handler.prototype.recover = function () {
            if (this._id > 0) {
                this._id = 0;
                Handler._pool.push(this.clear());
            }
        };
        Object.defineProperty(Handler.prototype, "id", {
            /**唯一Id */
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 从对象池内创建一个Handler，默认会执行一次并立即回收，如果不需要自动回收，设置once参数为false。
         * @param	caller 执行域(this)。
         * @param	method 回调方法。
         * @param	args 携带的参数。
         * @param	once 是否只执行一次，如果为true，回调后执行recover()进行回收，默认为true。
         * @return  返回创建的handler实例。
         */
        //public static create<Z>(caller: Z, method: (this:Z) => void, args?: any[], once?: boolean): Handler;
        Handler.create = function (caller, method, args, once) {
            if (args === void 0) { args = null; }
            if (once === void 0) { once = true; }
            if (Handler._pool.length)
                return Handler._pool.pop().setTo(caller, method, args, once);
            return new Handler(caller, method, args, once);
        };
        /*[DISABLE-ADD-VARIABLE-DEFAULT-VALUE]*/
        /**@private handler对象池*/
        Handler._pool = [];
        /**@private */
        Handler._gid = 1;
        return Handler;
    }());
    utils.Handler = Handler;
    __reflect(Handler.prototype, "utils.Handler");
})(utils || (utils = {}));
var game;
(function (game) {
    var ResData = (function () {
        function ResData() {
            this.autoRecover = true;
            this.toPoolTime = 0;
        }
        ResData.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        ResData.prototype.reset = function () {
            this.destory();
        };
        ResData.prototype.destory = function () {
            this.stopDelayDestory();
            this.offDestory();
            this.offAllComplete();
            this._data = null;
            this._name = "";
            this._path = "";
        };
        ResData.prototype.onDestory = function (caller, method) {
            this.offDestory();
            this._destoryHandler = utils.Handler.create(caller, method, null, false);
        };
        ResData.prototype.offDestory = function () {
            if (this._destoryHandler) {
                this._destoryHandler.recover();
                this._destoryHandler = null;
            }
        };
        /**开始延迟释放 */
        ResData.prototype.startDelayDestory = function () {
            this.stopDelayDestory();
            this._delayId = egret.setTimeout(this.destoyHandler, this, 60000);
        };
        /**停止延迟释放 */
        ResData.prototype.stopDelayDestory = function () {
            if (this._delayId) {
                egret.clearTimeout(this._delayId);
                this._delayId = 0;
            }
        };
        ResData.prototype.destoyHandler = function () {
            if (this._destoryHandler) {
                this._destoryHandler.runWith(this);
            }
        };
        Object.defineProperty(ResData.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResData.prototype, "resType", {
            get: function () {
                return this._resType;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResData.prototype, "isLoaded", {
            get: function () {
                return this._data != null;
            },
            enumerable: true,
            configurable: true
        });
        /**持有引用 */
        ResData.prototype.holdReference = function (caller, method) {
            this.holdReferenceHandler(caller);
            if (this._data) {
                method.call(caller, this._data);
                return;
            }
            this.onComplete(caller, method);
            this.load();
        };
        /**清除引用 */
        ResData.prototype.offReference = function (caller, method) {
            this.offReferenceHandler(caller);
            this.offComplete(caller, method);
        };
        ResData.prototype.holdReferenceHandler = function (caller) {
            if (!this._references) {
                this._references = [];
            }
            if (this._references.indexOf(caller) < 0) {
                this._references.push(caller);
            }
            this.stopDelayDestory();
        };
        ResData.prototype.offReferenceHandler = function (caller) {
            if (this._references) {
                var i = this._references.indexOf(caller);
                if (i >= 0) {
                    this._references.splice(i, 1);
                }
                if (!this._references.length) {
                    this.startDelayDestory();
                }
            }
        };
        ResData.prototype.load = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        //---------------------------------------------------------
        ResData.prototype.onComplete = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._completeHandlers) {
                this._completeHandlers = [];
            }
            this._completeHandlers.push(game.ResHandler.create(caller, method, args, true));
        };
        ResData.prototype.offComplete = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._completeHandlers)
                return;
            var index = this.getCompleteHandlerIndex(caller, method);
            if (index >= 0) {
                var handler = this._completeHandlers[index];
                handler.recover();
                this._completeHandlers.splice(index, 1);
            }
        };
        ResData.prototype.offAllComplete = function () {
            if (!this._completeHandlers)
                return;
            for (var _i = 0, _a = this._completeHandlers; _i < _a.length; _i++) {
                var handler = _a[_i];
                handler.recover();
            }
            this._completeHandlers.length = 0;
        };
        ResData.prototype.getCompleteHandlerIndex = function (caller, method) {
            var list = this._completeHandlers;
            if (list && list.length) {
                for (var i = 0; i < list.length; i++) {
                    var handler = list[i];
                    if (handler.caller == caller && handler.method == method) {
                        return i;
                    }
                }
            }
            return -1;
        };
        /**回调 */
        ResData.prototype.callComplete = function () {
            if (this._completeHandlers) {
                for (var _i = 0, _a = this._completeHandlers; _i < _a.length; _i++) {
                    var handler = _a[_i];
                    handler.runWith(this._data);
                }
                this._completeHandlers.length = 0;
            }
        };
        return ResData;
    }());
    game.ResData = ResData;
    __reflect(ResData.prototype, "game.ResData", ["utils.IPool"]);
})(game || (game = {}));
var game;
(function (game) {
    var TextBaseLoader = (function (_super) {
        __extends(TextBaseLoader, _super);
        function TextBaseLoader() {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            _this._retryCount = 1;
            return _this;
        }
        TextBaseLoader.prototype.initialize = function (url, isJson, retryCount) {
            if (isJson === void 0) { isJson = true; }
            if (retryCount === void 0) { retryCount = 1; }
            this._cururl = url;
            this._isJson = isJson;
            this._retryCount = retryCount;
            if (this._isJson) {
                var name = game.getName(this._cururl);
                if (name.indexOf('_') > 0) {
                    var arr = name.split('_');
                    for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                        var str = arr_1[_i];
                        if (!utils.StringUtil.delSpace(str)) {
                            console.error('无效的URL:', this._cururl);
                            break;
                        }
                    }
                }
            }
        };
        TextBaseLoader.prototype.reset = function () {
            this._cururl = '';
            this._retryCount = 1;
            this.removeEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            this._caller = null;
            this._complete = null;
            //this.response=null;
        };
        TextBaseLoader.prototype.start = function (caller, complete) {
            if (caller === void 0) { caller = null; }
            if (complete === void 0) { complete = null; }
            if (caller)
                this._caller = caller;
            if (complete)
                this._complete = complete;
            this.responseType = egret.HttpResponseType.TEXT;
            this._times = 0;
            this._isLoading = true;
            this.starLoad();
            return this;
        };
        TextBaseLoader.prototype.starLoad = function () {
            var _url_ = game.versionControl.getVirtualUrl(this._cururl);
            this.open(_url_, egret.HttpMethod.GET);
            this.setRequestHeader("Content-Type", "text/plain");
            this.addEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            this.send();
        };
        TextBaseLoader.prototype.completeHandler = function (e) {
            this.removeEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            var content;
            if (this._isJson) {
                try {
                    content = JSON.parse(this.response);
                }
                catch (e) {
                    console.log('JSON Parser Error!');
                }
            }
            else {
                content = this.response;
            }
            //this.response="";
            this._isLoading = false;
            this._complete.call(this._caller, content);
        };
        TextBaseLoader.prototype.errorHandler = function (e) {
            console.log('加载失败:', this._cururl);
            if (this._times >= this._retryCount) {
                this._isLoading = false;
                this.removeEventListener(egret.Event.COMPLETE, this.completeHandler, this);
                this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
                this._complete.call(this._caller, null);
                return;
            }
            this._times++;
            console.log('正在重试:', this._cururl);
            this.starLoad();
        };
        Object.defineProperty(TextBaseLoader.prototype, "isLoading", {
            get: function () {
                return this._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        return TextBaseLoader;
    }(egret.HttpRequest));
    game.TextBaseLoader = TextBaseLoader;
    __reflect(TextBaseLoader.prototype, "game.TextBaseLoader", ["game.IBaseLoader", "utils.IPool"]);
})(game || (game = {}));
var game;
(function (game) {
    var ImageBaseLoader = (function (_super) {
        __extends(ImageBaseLoader, _super);
        function ImageBaseLoader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            _this._retryCount = 1;
            return _this;
        }
        ImageBaseLoader.prototype.initialize = function (url) {
            this._url = url;
            return this;
        };
        ImageBaseLoader.prototype.reset = function () {
            this._url = '';
            this.removeEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
            this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            this._caller = null;
            this._method = null;
        };
        ImageBaseLoader.prototype.start = function (caller, method) {
            this._isLoading = true;
            this._caller = caller;
            this._method = method;
            this._times = 0;
            _super.prototype.load.call(this, game.versionControl.getVirtualUrl(this._url));
            this.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
            this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
        };
        ImageBaseLoader.prototype.onLoadFinish = function (e) {
            this.removeEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
            this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            var texture = new egret.Texture();
            if (this.data)
                texture._setBitmapData(this.data);
            this.data = null;
            this._isLoading = false;
            if (this._method)
                this._method.call(this._caller, texture);
        };
        ImageBaseLoader.prototype.errorHandler = function (e) {
            console.log('加载失败:', this._url);
            if (this._times >= this._retryCount) {
                this._isLoading = false;
                this.removeEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
                this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
                if (this._method)
                    this._method.call(this._caller, null);
                return;
            }
            console.log('正在重试:', this._url);
            this._times++;
            _super.prototype.load.call(this, game.versionControl.getVirtualUrl(this._url));
        };
        Object.defineProperty(ImageBaseLoader.prototype, "isLoading", {
            get: function () {
                return this._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        return ImageBaseLoader;
    }(egret.ImageLoader));
    game.ImageBaseLoader = ImageBaseLoader;
    __reflect(ImageBaseLoader.prototype, "game.ImageBaseLoader", ["game.IBaseLoader", "utils.IPool"]);
})(game || (game = {}));
var game;
(function (game) {
    var SheetBaseLoader = (function (_super) {
        __extends(SheetBaseLoader, _super);
        function SheetBaseLoader() {
            return _super.call(this) || this;
        }
        SheetBaseLoader.prototype.initialize = function (jsonURl, pngURL, type) {
            this._type = type;
            _super.prototype.initialize.call(this, jsonURl, pngURL);
        };
        SheetBaseLoader.prototype.reset = function () {
            this._type = null;
            _super.prototype.reset.call(this);
        };
        SheetBaseLoader.prototype.start = function (caller, method) {
            _super.prototype.start.call(this, this, function (json, png) {
                if (!json || !png) {
                    logger.error('未加载到动画资源:' + this._name);
                    if (method)
                        method.call(caller, null);
                    return;
                }
                if (!method)
                    return;
                var data;
                switch (this._type) {
                    case "sheet":
                        data = this.parseSpriteSheet(png, json);
                        break;
                    case "font":
                        data = this.parserFont(png, json);
                        break;
                }
                method.call(caller, json, png, data);
            });
        };
        /**解析 */
        SheetBaseLoader.prototype.parseSpriteSheet = function (texture, data) {
            var frames = data.frames;
            if (!frames) {
                return null;
            }
            var spriteSheet = new egret.SpriteSheet(texture);
            var textureMap = {};
            for (var subkey in frames) {
                var config = frames[subkey];
                var texture_1 = spriteSheet.createTexture(subkey, config.x, config.y, config.w, config.h, config.offX, config.offY, config.sourceW, config.sourceH);
                textureMap[subkey] = texture_1;
            }
            return textureMap;
        };
        /**解析 */
        SheetBaseLoader.prototype.parserFont = function (texture, config) {
            return new egret.BitmapFont(texture, config);
        };
        return SheetBaseLoader;
    }(game.TextureBaseLoader));
    game.SheetBaseLoader = SheetBaseLoader;
    __reflect(SheetBaseLoader.prototype, "game.SheetBaseLoader");
})(game || (game = {}));
var game;
(function (game) {
    var GameConfig = (function () {
        function GameConfig() {
        }
        GameConfig.getEngienVersions = function (level) {
            if (!this._engienVersions) {
                this._engienVersions = [];
                var array = egret.Capabilities.engineVersion.split('.');
                for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                    var v = array_1[_i];
                    this._engienVersions.push(parseInt(v));
                }
            }
            if (level >= this._engienVersions.length)
                return 0;
            return this._engienVersions[level];
        };
        Object.defineProperty(GameConfig, "ip", {
            /**内网还是外网*/
            get: function () {
                return window.config.ip;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "platform", {
            get: function () {
                return window.config.platform;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "debug", {
            /**是否为调试模式*/
            get: function () {
                return window.config.debug;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "cmd", {
            /**是否启动命令工具*/
            get: function () {
                return window.config.cmd;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "logourl", {
            /**logourl*/
            get: function () {
                return window.config.logourl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "ssl", {
            /**ssl*/
            get: function () {
                return window.config.ssl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "logenabled", {
            get: function () {
                return window.config.logenabled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "noticepop", {
            get: function () {
                return window.config.noticepop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "configloadtype", {
            get: function () {
                return window.config.configloadtype;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "firstautoenter", {
            get: function () {
                return window.config.firstautoenter;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "incrementalupdate", {
            /**增量更新 */
            get: function () {
                return window.config.incrementalupdate;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "resource_path", {
            /**资源文件夹 */
            get: function () {
                return window.config.resource_path;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "resource_other", {
            /**其他资源文件夹 */
            get: function () {
                return window.config.resource_other;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "version", {
            /**版本控制*/
            get: function () {
                return window.config.version;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "version_assets", {
            //===================资源版本==========================
            get: function () {
                return window.config.version_assets;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "version_assetscript", {
            get: function () {
                return window.config.version_assetscript;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "isMobile", {
            //===================机型状态==========================
            get: function () {
                return egret.Capabilities.isMobile;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "isPC", {
            get: function () {
                return !egret.Capabilities.isMobile;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "isWindowPC", {
            get: function () {
                return egret.Capabilities.os == 'Windows PC';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "isIOS", {
            get: function () {
                return egret.Capabilities.os == 'iOS';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "isAndroid", {
            get: function () {
                return egret.Capabilities.os == 'Android';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "isWindowsPhone", {
            get: function () {
                return egret.Capabilities.os == 'Windows Phone';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "isMacOs", {
            get: function () {
                return egret.Capabilities.os == 'Mac OS';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameConfig, "isUnknown", {
            get: function () {
                return egret.Capabilities.os == 'Unknown';
            },
            enumerable: true,
            configurable: true
        });
        //===================基本设置==========================
        GameConfig.DEFAULT_FONT_NAME = "黑体";
        GameConfig.UI_POP_SCALE = 1;
        return GameConfig;
    }());
    game.GameConfig = GameConfig;
    __reflect(GameConfig.prototype, "game.GameConfig");
})(game || (game = {}));
var game;
(function (game) {
    var GameState = (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._stateHandlers = {};
            return _this;
        }
        Object.defineProperty(GameState, "instance", {
            get: function () {
                if (!GameState._instance) {
                    GameState._instance = new GameState();
                }
                return GameState._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**设置状态 */
        GameState.prototype.setState = function (name, state) {
            this[name] = state;
            GameState.instance.dispatchEventWith(name, false, state);
        };
        /**取得状态 */
        GameState.prototype.getState = function (name) {
            return this[name];
        };
        /**监听状态 */
        GameState.prototype.onState = function (name, caller, method) {
            GameState.instance.addEventListener(name, method, caller);
        };
        GameState.prototype.offState = function (name, caller, method) {
            GameState.instance.removeEventListener(name, method, caller);
        };
        //===================本地存储==========================
        GameState.prototype.setItem = function (uid, key, v) {
            try {
                var typeName = typeof v;
                switch (typeName) {
                    case 'number':
                        egret.localStorage.setItem(uid + "_" + key, 'number|' + v + "");
                        break;
                    case 'boolean':
                        egret.localStorage.setItem(uid + "_" + key, 'boolean|' + (v ? 'true' : 'false'));
                        break;
                    case 'array':
                        egret.localStorage.setItem(uid + "_" + key, 'array|' + v.join(','));
                        break;
                    default:
                        egret.localStorage.setItem(uid + "_" + key, 'string|' + v);
                        break;
                }
            }
            catch (e) {
                logger.log('egret.localStorage本地存储错误....');
            }
        };
        GameState.prototype.getItem = function (uid, key) {
            var object;
            try {
                object = egret.localStorage.getItem(uid + "_" + key);
            }
            catch (e) {
                logger.log('egret.localStorage本地存储错误....');
            }
            if (!object)
                return null;
            var i = object.indexOf('|');
            var typeName = object.substring(0, i);
            var value = object.substring(i + 1, object.length);
            switch (typeName) {
                case 'number':
                    return Number(value);
                case 'boolean':
                    return value == 'true';
                case 'array':
                    return value.split(',');
                default:
                    return value;
            }
        };
        return GameState;
    }(egret.EventDispatcher));
    game.GameState = GameState;
    __reflect(GameState.prototype, "game.GameState");
    game.state = GameState.instance;
})(game || (game = {}));
var game;
(function (game) {
    var GameVersionController = (function () {
        function GameVersionController() {
            this._isInitialize = false;
        }
        GameVersionController.prototype.init = function () {
            if (this._isInitialize)
                return Promise.resolve();
            this._isInitialize = true;
            //RES.registerVersionController(this);
            var config = window.config;
            this._versionMain = config.version ? (config.version + '/') : "";
            this._versionControl = config.version_assets ? config.version_assets : '';
            return Promise.resolve();
        };
        GameVersionController.prototype.getVirtualUrl = function (url, versionControl) {
            if (!url)
                return url;
            if (!!this._versionMain && url.indexOf(game.GameConfig.resource_other) == -1) {
                if (url.indexOf(this._versionMain) != 0) {
                    url = this._versionMain + url;
                }
            }
            if (url.indexOf('?') == -1)
                url += ("?" + (versionControl ? versionControl : this._versionControl));
            return url;
        };
        return GameVersionController;
    }());
    game.GameVersionController = GameVersionController;
    __reflect(GameVersionController.prototype, "game.GameVersionController", ["RES.VersionController", "RES.IVersionController"]);
    game.versionControl = new GameVersionController();
})(game || (game = {}));
var logger;
(function (logger) {
    var Logger = (function () {
        function Logger() {
            this._history = [];
        }
        Object.defineProperty(Logger, "instance", {
            get: function () {
                if (!Logger._instance) {
                    Logger._instance = new Logger();
                }
                return Logger._instance;
            },
            enumerable: true,
            configurable: true
        });
        Logger.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!game.GameConfig.logenabled)
                return;
            egret.log.apply(egret, ['[LOG]'].concat(args));
        };
        Logger.prototype.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!game.GameConfig.logenabled)
                return;
            egret.log.apply(egret, ['[INFO]'].concat(args));
        };
        Logger.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!game.GameConfig.logenabled)
                return;
            egret.warn.apply(egret, ['[WARN]'].concat(args));
        };
        Logger.prototype.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!game.GameConfig.logenabled)
                return;
            egret.log.apply(egret, ['[DEBUG]'].concat(args));
        };
        Logger.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!game.GameConfig.logenabled)
                return;
            egret.error.apply(egret, ['[ERROR]'].concat(args));
        };
        return Logger;
    }());
    logger.Logger = Logger;
    __reflect(Logger.prototype, "logger.Logger");
    logger.log = Logger.instance.log;
    logger.info = Logger.instance.info;
    logger.warn = Logger.instance.warn;
    logger.debug = Logger.instance.debug;
    logger.error = Logger.instance.error;
})(logger || (logger = {}));
var n;
(function (n) {
    var ByteArrayPool = (function () {
        function ByteArrayPool() {
        }
        /**
         * 从缓存池取出
         * @param data
         * @return
         */
        ByteArrayPool.from = function () {
            if (this._pool.length)
                return this._pool.pop();
            return new egret.ByteArray();
        };
        /**
         * 存入缓存池
         * @param object
         */
        ByteArrayPool.to = function (bytes) {
            bytes.clear();
            if (this._pool.indexOf(bytes) < 0) {
                this._pool.push(bytes);
            }
        };
        ByteArrayPool._pool = [];
        return ByteArrayPool;
    }());
    __reflect(ByteArrayPool.prototype, "ByteArrayPool");
    var Package = (function () {
        function Package() {
        }
        ;
        //	[parker]	length	|	body
        //	[body]		requestId	|	routeId	|	message
        //	[message]	length	|	body
        Package.encode = function (reqId, routeId, msg, logEnabled) {
            var bytesBody = ByteArrayPool.from();
            bytesBody.writeUnsignedShort(reqId);
            bytesBody.writeUnsignedShort(routeId);
            bytesBody = msg.encode(bytesBody);
            bytesBody.position = 0;
            if (logEnabled) {
                console.log('消息体长度:' + bytesBody.length + ":" + bytesBody.bytesAvailable);
            }
            var bytesPacker = ByteArrayPool.from();
            bytesPacker.writeUnsignedShort(bytesBody.length);
            bytesPacker.writeBytes(bytesBody);
            bytesPacker.position = 0;
            if (logEnabled) {
                console.log('消息包长度Before:' + bytesPacker.length + ":" + bytesPacker.bytesAvailable);
            }
            ByteArrayPool.to(bytesBody);
            if (logEnabled) {
                console.log('消息包长度After:' + bytesPacker.length + ":" + bytesPacker.bytesAvailable);
            }
            return bytesPacker;
        };
        Package.decode = function (bytesPacker) {
            var length = bytesPacker.readUnsignedShort();
            var bytesBody = ByteArrayPool.from();
            bytesPacker.readBytes(bytesBody, 0, length);
            if (bytesPacker.bytesAvailable) {
                logger.error('出现包体未读取完的情况，可能出现粘包....');
            }
            //ByteArrayPool.to(bytesPacker);
            var reqId = bytesBody.readUnsignedShort();
            var routeId = bytesBody.readUnsignedShort();
            //logger.log('recive Message:',routeId);
            var MessageClazz = n.MessageMap.getMessage(routeId);
            var message;
            if (MessageClazz) {
                message = n.MessagePool.from(MessageClazz);
                message.reset();
                message.decode(bytesBody);
                if (bytesBody.bytesAvailable) {
                    logger.error('解析异常,包体未解析完成....', "reqId:", reqId, "routeId:", routeId, "lastLength:", bytesBody.bytesAvailable);
                }
            }
            ByteArrayPool.to(bytesBody);
            return { reqId: reqId, routeId: routeId, message: message };
        };
        return Package;
    }());
    n.Package = Package;
    __reflect(Package.prototype, "n.Package");
    var Net = (function (_super) {
        __extends(Net, _super);
        function Net() {
            var _this = _super.call(this) || this;
            _this._reqId = 100;
            _this._reqReqIdHandlers = {};
            _this._routeCallBacks = {};
            _this._errorCallBacks = {};
            /**
             * 发送消息
             * @param routeId 路由信息
             * @param msg 消息体（参见MessageMap）
             */
            _this.notify = function (routeId, msg, logEnabled) {
                if (logEnabled === void 0) { logEnabled = false; }
                this.sendMessage(0, routeId, msg, logEnabled);
            };
            _this._timesLib = {};
            return _this;
        }
        Net.prototype.initialize = function (tipManager) {
            this._tipManager = tipManager;
            n.MessageMap.initialize();
        };
        Object.defineProperty(Net.prototype, "connected", {
            get: function () {
                return this._socket && this._socket.connected;
            },
            enumerable: true,
            configurable: true
        });
        Net.prototype.onSocketConnect = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offSocketConnect();
            this._socketConnectHandler = utils.Handler.create(caller, method, args, false);
        };
        Net.prototype.offSocketConnect = function () {
            if (this._socketConnectHandler) {
                this._socketConnectHandler.recover();
                this._socketConnectHandler = null;
            }
        };
        Net.prototype.onSocketClose = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offSocketClose();
            this._socketCloseHandler = utils.Handler.create(caller, method, args, false);
        };
        Net.prototype.offSocketClose = function () {
            if (this._socketCloseHandler) {
                this._socketCloseHandler.recover();
                this._socketCloseHandler = null;
            }
        };
        Net.prototype.onSocketError = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offSocketError();
            this._socketErrorHandler = utils.Handler.create(caller, method, args, false);
        };
        Net.prototype.offSocketError = function () {
            if (this._socketErrorHandler) {
                this._socketErrorHandler.recover();
                this._socketErrorHandler = null;
            }
        };
        Net.prototype.offSocketAll = function () {
            this.offSocketConnect();
            this.offSocketClose();
            this.offSocketError();
        };
        Net.prototype.connect = function (host, port) {
            if (this._socket && this._socket.connected) {
                if (this._host == host && this._port == port) {
                    if (this._socketConnectHandler)
                        this._socketConnectHandler.run();
                    return;
                }
                this.close();
            }
            this._host = host;
            this._port = port;
            //创建 WebSocket 对象
            if (!this._socket) {
                this._socket = new egret.WebSocket();
                this._socket.type = egret.WebSocket.TYPE_BINARY;
            }
            this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.messageHandler, this);
            this._socket.addEventListener(egret.Event.CONNECT, this.openHandler, this);
            this._socket.addEventListener(egret.Event.CLOSE, this.closeHandler, this);
            this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            if (game.GameConfig.ssl) {
                this._socket.connectByUrl("wss://" + host + ":" + port);
                logger.log('正在连接:', "wss://" + host + ":" + port);
            }
            else {
                this._socket.connect(host, port);
                logger.log('正在连接:', host, port);
            }
        };
        Net.prototype.reconnect = function (connectHandler, errorHandler, closeHandler) {
            if (connectHandler === void 0) { connectHandler = null; }
            if (errorHandler === void 0) { errorHandler = null; }
            if (closeHandler === void 0) { closeHandler = null; }
            this._socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.messageHandler, this);
            this._socket.addEventListener(egret.Event.CONNECT, this.openHandler, this);
            this._socket.addEventListener(egret.Event.CLOSE, this.closeHandler, this);
            this._socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            if (game.GameConfig.ssl) {
                this._socket.connectByUrl("wss://" + this._host + ":" + this._port);
                logger.log('正在重新连接:', "wss://" + this._host + ":" + this._port);
            }
            else {
                this._socket.connect(this._host, this._port);
                logger.log('正在重新连接:', this._host, this._port);
            }
        };
        Net.prototype.close = function (immediately) {
            if (immediately === void 0) { immediately = false; }
            if (this._socket) {
                if (immediately) {
                    this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.messageHandler, this);
                    this._socket.removeEventListener(egret.Event.CONNECT, this.openHandler, this);
                    this._socket.removeEventListener(egret.Event.CLOSE, this.closeHandler, this);
                    this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
                }
                this._socket.close();
                if (immediately)
                    this._socket = null;
            }
        };
        Net.prototype.openHandler = function (e) {
            logger.log('已经连接... ');
            if (this._socketConnectHandler) {
                this._socketConnectHandler.run();
            }
        };
        Net.prototype.closeHandler = function (e) {
            logger.warn('连接断开... ');
            this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.messageHandler, this);
            this._socket.removeEventListener(egret.Event.CONNECT, this.openHandler, this);
            this._socket.removeEventListener(egret.Event.CLOSE, this.closeHandler, this);
            this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            if (this._socketCloseHandler) {
                this._socketCloseHandler.run();
            }
        };
        Net.prototype.errorHandler = function (e) {
            logger.error('连接错误...');
            this._socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.messageHandler, this);
            this._socket.removeEventListener(egret.Event.CONNECT, this.openHandler, this);
            this._socket.removeEventListener(egret.Event.CLOSE, this.closeHandler, this);
            this._socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            if (this._socketErrorHandler) {
                this._socketErrorHandler.run();
            }
        };
        Net.prototype.messageHandler = function (e) {
            var bytes = ByteArrayPool.from();
            this._socket.readBytes(bytes);
            var data = Package.decode(bytes);
            ByteArrayPool.to(bytes);
            if (data.reqId == 0) {
                this.callRoute(data.routeId, data.message);
                // if ((data.message as n.Message).autoRecover) {
                // 	n.MessagePool.to(data.message, true);
                // }
                data.reqId = data.routeId = undefined;
                data.message = null;
            }
            else if (this.hasRequestReqId(data.reqId)) {
                if (data.message instanceof n.ResultEvent) {
                    var routeId = data.message.MsgId;
                    this.removeRequestHandler(data.reqId);
                    if (this.callError(routeId, data.message)) {
                        if (data.message.autoRecover) {
                            n.MessagePool.to(data.message, true);
                        }
                        data.reqId = data.routeId = undefined;
                        data.message = null;
                        return;
                    }
                    if (!!this._tipManager) {
                        this._tipManager.tip(data.message.CodeMsg, 0xFF0000);
                    }
                    n.MessagePool.to(data.message, true);
                    data.reqId = data.routeId = undefined;
                    data.message = null;
                    return;
                }
                this.callRequestHandler(data.reqId, data.message);
                if (data.message.autoRecover) {
                    n.MessagePool.to(data.message, true);
                }
                data.reqId = data.routeId = undefined;
                data.message = null;
            }
        };
        Net.prototype.getMsgName = function (routeId) {
            var name = "";
            for (var key in n.MessageMap) {
                if (n.MessageMap[key] == routeId) {
                    name = key;
                    break;
                }
            }
            return name;
        };
        /**
         * 请求消息
         * @param routeId 路由信息
         * @param msg 消息体（参见MessageMap）
         * @param handler 消息回调
         * @param recorverMsg 消息回收
         */
        Net.prototype.request = function (routeId, msg, handler, logEnabled) {
            if (logEnabled === void 0) { logEnabled = false; }
            if (!routeId)
                return;
            // if(this.hasRequestRoute(routeId)){
            // 	logger.error('该请求已经在执行,请等待该请求返回在请求....',this.getMsgName(routeId));
            // 	return;
            // }
            this._reqId++;
            this.addRequestHandler(this._reqId, routeId, handler);
            //logger.log(`[${utils.DateUtil.formatTimeFromMilliseconds(egret.getTimer(),':')}]发出请求:${this.getMsgName(routeId)}:${this._reqId}`);
            this.sendMessage(this._reqId, routeId, msg, logEnabled);
        };
        Net.prototype.addRequestHandler = function (reqId, routeId, handler) {
            var reqeust = NetRequest.fromPool(handler, true);
            reqeust.reqId = reqId;
            reqeust.routeId = routeId;
            this._reqReqIdHandlers[reqId] = reqeust;
            // reqeust.onInvalid(600000,this,this.invalidHandler);
        };
        Net.prototype.invalidHandler = function (request) {
            this.removeRequestHandler(request.reqId);
        };
        Net.prototype.removeRequestHandler = function (reqId, recorver) {
            if (recorver === void 0) { recorver = true; }
            if (!!this._reqReqIdHandlers[reqId]) {
                var request = this._reqReqIdHandlers[reqId];
                this._reqReqIdHandlers[reqId] = null;
                delete this._reqReqIdHandlers[reqId];
                if (recorver)
                    request.recover();
            }
        };
        Net.prototype.callRequestHandler = function (reqId, msg) {
            //logger.log(`[${utils.DateUtil.formatTimeFromMilliseconds(egret.getTimer(),':')}]请求回来:${reqId}`);
            if (!!this._reqReqIdHandlers[reqId]) {
                var reqeust = this._reqReqIdHandlers[reqId];
                this.removeRequestHandler(reqeust.reqId, false);
                reqeust.runWith(msg);
                reqeust.recover();
            }
        };
        Net.prototype.hasRequestReqId = function (reqId) {
            return !!this._reqReqIdHandlers[reqId];
        };
        /**
         * 监听消息
         * @param routeId 路由信息
         * @param handler 消息回调
         */
        Net.prototype.onRoute = function (routeId, handler) {
            this.offRoute(routeId);
            this._routeCallBacks[routeId] = NetRequest.fromPool(handler, false);
        };
        /**取消监听消息 */
        Net.prototype.offRoute = function (routeId) {
            if (!!this._routeCallBacks[routeId]) {
                this._routeCallBacks[routeId].recover();
                this._routeCallBacks[routeId] = null;
            }
        };
        Net.prototype.callRoute = function (routeId, data) {
            if (!!this._routeCallBacks[routeId]) {
                var reqeust = this._routeCallBacks[routeId];
                if (reqeust.once) {
                    this._routeCallBacks[routeId] = null;
                    delete this._routeCallBacks[routeId];
                }
                reqeust.runWith(data);
                return;
            }
        };
        /**
         * 监听错误消息
         * @param routeId 路由信息
         * @param handler 消息回调
         * @param stopErrMsg 是否阻止错误提示 默认为true
         */
        Net.prototype.onError = function (routeId, handler, stopErrMsg) {
            if (stopErrMsg === void 0) { stopErrMsg = true; }
            this.offError(routeId);
            var reqeust = NetRequest.fromPool(handler, handler.once);
            reqeust.stopErrMsg = stopErrMsg;
            this._errorCallBacks[routeId] = reqeust;
        };
        /**取消监听错误消息 */
        Net.prototype.offError = function (routeId) {
            if (!!this._errorCallBacks[routeId]) {
                var reqeust = this._errorCallBacks[routeId];
                reqeust.recover();
                this._errorCallBacks[routeId] = null;
            }
        };
        Net.prototype.callError = function (routeId, data) {
            if (!!this._errorCallBacks[routeId]) {
                var reqeust = this._errorCallBacks[routeId];
                var stopErrMsg = reqeust.stopErrMsg;
                if (reqeust.once) {
                    this._errorCallBacks[routeId] = null;
                    delete this._errorCallBacks[routeId];
                }
                reqeust.runWith(data);
                return stopErrMsg;
            }
            return false;
        };
        Net.prototype.sendMessage = function (reqId, routeId, msg, logEnabled) {
            if (logEnabled === void 0) { logEnabled = false; }
            var that = this;
            if (!that._timesLib[routeId]) {
                that._timesLib[routeId] = { times: 0, lasttime: egret.getTimer() };
            }
            var info = that._timesLib[routeId];
            info.times++;
            if (info.times >= 10) {
                if ((egret.getTimer() - info.lasttime) < 1000) {
                    console.log('1秒内已超过10次,已自动过滤消息：' + routeId);
                    return;
                }
                info.times = 0;
                info.lasttime = egret.getTimer();
            }
            that.send(Package.encode(reqId, routeId, msg, logEnabled), logEnabled);
            if (msg.autoRecover) {
                msg.reset();
                n.MessagePool.to(msg);
            }
        };
        Net.prototype.send = function (byte, logEnabled) {
            if (logEnabled === void 0) { logEnabled = false; }
            if (!this._socket || !this._socket.connected) {
                console.warn('Socket已关闭或者未连接...不能发送数据...');
                return;
            }
            if (logEnabled) {
                console.log('准备发送字节... 长度:' + byte.length + ':' + byte.bytesAvailable);
            }
            this._socket.writeBytes(byte, 0, byte.bytesAvailable);
            this._socket.flush();
            ByteArrayPool.to(byte);
        };
        return Net;
    }(egret.EventDispatcher));
    n.Net = Net;
    __reflect(Net.prototype, "n.Net");
    var NetRequest = (function () {
        function NetRequest() {
        }
        NetRequest.fromPool = function (handler, once) {
            var request;
            if (NetRequest._pool.length) {
                request = NetRequest._pool.pop();
            }
            else {
                request = new NetRequest();
            }
            request.init(handler, once);
            return request;
        };
        NetRequest.toPool = function (reuest) {
            NetRequest._pool.push(reuest);
        };
        NetRequest.prototype.init = function (handler, once) {
            this._handler = handler;
            this._handler.once = once;
            return this;
        };
        NetRequest.prototype.reset = function () {
            this._handler.recover();
            this._handler = null;
            return this;
        };
        NetRequest.prototype.recover = function () {
            NetRequest.toPool(this.reset());
        };
        Object.defineProperty(NetRequest.prototype, "once", {
            get: function () {
                return this._handler.once;
            },
            enumerable: true,
            configurable: true
        });
        NetRequest.prototype.run = function () {
            this._handler.run();
        };
        NetRequest.prototype.runWith = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._handler.runWith.apply(this._handler, args);
        };
        /**@private handler对象池*/
        NetRequest._pool = [];
        return NetRequest;
    }());
    __reflect(NetRequest.prototype, "NetRequest");
    n.net = new Net();
    var Http = (function () {
        function Http() {
        }
        Http.prototype.request = function (url, complete, requestMethod, data) {
            if (requestMethod === void 0) { requestMethod = egret.URLRequestMethod.POST; }
            if (data === void 0) { data = null; }
            new HttpRequest().request(url, complete, requestMethod, data);
        };
        return Http;
    }());
    n.Http = Http;
    __reflect(Http.prototype, "n.Http");
    n.http = new Http();
    var HttpRequest = (function (_super) {
        __extends(HttpRequest, _super);
        function HttpRequest() {
            return _super.call(this) || this;
        }
        HttpRequest.prototype.request = function (url, complete, requestMethod, data) {
            if (data === void 0) { data = null; }
            this._url = url;
            this._complete = complete;
            this.dataFormat = egret.URLLoaderDataFormat.TEXT;
            var urlRequest = new egret.URLRequest(url);
            urlRequest.method = requestMethod;
            if (data) {
                var str = "";
                for (var key in data) {
                    str += (key + '=' + data[key] + '&');
                }
                var variables = new egret.URLVariables(str);
                urlRequest.data = variables;
            }
            this.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            this.load(urlRequest);
        };
        HttpRequest.prototype.onLoadComplete = function (e) {
            this.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            if (!this._complete)
                return;
            this._complete.runWith(JSON.parse(this.data));
            this._complete = null;
        };
        HttpRequest.prototype.onLoadError = function (e) {
            this.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            logger.error("Http错误:", this._url);
        };
        return HttpRequest;
    }(egret.URLLoader));
    __reflect(HttpRequest.prototype, "HttpRequest");
    var ZipLoader = (function (_super) {
        __extends(ZipLoader, _super);
        function ZipLoader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ZipLoader.prototype.load = function (url, complete, progress) {
            if (progress === void 0) { progress = null; }
            this._complete = complete;
            this._progress = progress;
            this.responseType = egret.HttpResponseType.ARRAY_BUFFER;
            this.once(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.once(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            if (this._progress)
                this.addEventListener(egret.ProgressEvent.PROGRESS, this.onLoadProgress, this);
            this.open(url, egret.HttpMethod.GET);
            this.send();
        };
        ZipLoader.prototype.clear = function () {
            this.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this.removeEventListener(egret.ProgressEvent.PROGRESS, this.onLoadProgress, this);
            this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
            if (this._complete) {
                this._complete.recover();
                this._complete = null;
            }
            if (this._progress) {
                this._progress.recover();
                this._progress = null;
            }
        };
        ZipLoader.prototype.onLoadComplete = function (e) {
            if (!this._complete) {
                this.clear();
                return;
            }
            var request = e.currentTarget;
            this._complete.runWith(request.response);
            this.clear();
        };
        ZipLoader.prototype.onLoadProgress = function (e) {
            this._progress.runWith(e.bytesLoaded / e.bytesTotal);
        };
        ZipLoader.prototype.onLoadError = function (e) {
            this.clear();
            logger.error("[ZipLoader]错误!");
        };
        return ZipLoader;
    }(egret.HttpRequest));
    n.ZipLoader = ZipLoader;
    __reflect(ZipLoader.prototype, "n.ZipLoader");
})(n || (n = {}));
var game;
(function (game) {
    var SoundItem = (function (_super) {
        __extends(SoundItem, _super);
        function SoundItem() {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            return _this;
        }
        SoundItem.prototype.initialize = function (name, type) {
            if (this._sound) {
                this._sound.close();
                this._sound.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
                this._sound = null;
            }
            this._position = 0;
            this._isLoaded = false;
            this._isPlay = false;
            this._isPause = false;
            this._isLoop = false;
            if (!name || name == '')
                return;
            this._name = name;
            this._sound = new egret.Sound();
            this._sound.type = type;
            //添加加载完成侦听
            this._sound.once(egret.Event.COMPLETE, this.onLoadComplete, this);
            //开始加载
            this._sound.load(game.versionControl.getVirtualUrl(game.GameConfig.resource_other + "/sound/" + this._name + ".mp3"));
        };
        SoundItem.prototype.reset = function () {
            this.stopDelayDestory();
            if (this._channel) {
                this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.soundComplete, this);
                this._channel.stop();
                this._channel = null;
            }
            if (this._sound) {
                this._sound.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
                this._sound.close();
                this._sound = null;
            }
            this._position = 0;
            this._isLoaded = false;
            this._isPlay = false;
            this._isPause = false;
            this._isLoop = false;
            this._destoryCaller = this._destoryMethod = null;
        };
        SoundItem.prototype.onLoadComplete = function (event) {
            this._sound.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
            this._isLoaded = true;
            this.dispatchEventWith(egret.Event.COMPLETE);
            this.updatePlayState();
        };
        SoundItem.prototype.play = function (loop, volume) {
            if (loop === void 0) { loop = false; }
            if (volume === void 0) { volume = 1; }
            if (!this._isPause && this._isPlay)
                return;
            this._isLoop = loop;
            this._isPlay = true;
            this._isPause = false;
            this._volume = volume;
            this.updatePlayState();
            this.stopDelayDestory();
        };
        SoundItem.prototype.pause = function () {
            if (!this._isPlay)
                return;
            if (this._isPause)
                return;
            this._isPause = true;
            if (this._channel) {
                this._position = this._channel.position;
                this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.soundComplete, this);
                this._channel.stop();
                this._channel = null;
            }
        };
        SoundItem.prototype.stop = function () {
            if (!this._isPlay)
                return;
            this._isPlay = false;
            this._isPause = false;
            this._position = 0;
            if (this._channel) {
                this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.soundComplete, this);
                this._channel.stop();
                this._channel = null;
            }
            this.startDelayDestory();
        };
        SoundItem.prototype.updatePlayState = function () {
            if (!this._isPlay || !this._isLoaded || this._isPause)
                return;
            if (this._channel) {
                this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.soundComplete, this);
                this._channel.stop();
                this._channel = null;
            }
            //播放音乐
            this._channel = this._sound.play(this._position, this._isLoop ? 0 : 1);
            this._channel.volume = this._volume;
            if (!this._isLoop) {
                this._channel.once(egret.Event.SOUND_COMPLETE, this.soundComplete, this);
            }
        };
        SoundItem.prototype.soundComplete = function (e) {
            this._channel.removeEventListener(egret.Event.SOUND_COMPLETE, this.soundComplete, this);
            this._channel.stop();
            this._channel = null;
            this._isPlay = false;
            this.dispatchEventWith(egret.Event.SOUND_COMPLETE);
            this.startDelayDestory();
        };
        /**开始延迟释放 */
        SoundItem.prototype.startDelayDestory = function () {
            if (this._destoryMethod)
                this._delayId = egret.setTimeout(this._destoryMethod, this._destoryCaller, 15000, this);
        };
        /**停止延迟释放 */
        SoundItem.prototype.stopDelayDestory = function () {
            if (this._delayId) {
                egret.clearTimeout(this._delayId);
                this._delayId = 0;
            }
        };
        SoundItem.prototype.onDestory = function (destoryCaller, destoryMethod) {
            this._destoryCaller = destoryCaller;
            this._destoryMethod = destoryMethod;
        };
        Object.defineProperty(SoundItem.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundItem.prototype, "isPlay", {
            get: function () {
                return this._isPlay;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundItem.prototype, "isPause", {
            get: function () {
                return this._isPause;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundItem.prototype, "isLoop", {
            get: function () {
                return this._isLoop;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundItem.prototype, "isLoaded", {
            get: function () {
                return this._isLoaded;
            },
            enumerable: true,
            configurable: true
        });
        return SoundItem;
    }(egret.EventDispatcher));
    game.SoundItem = SoundItem;
    __reflect(SoundItem.prototype, "game.SoundItem", ["utils.IPool"]);
})(game || (game = {}));
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var AssetAdapter = (function () {
    function AssetAdapter() {
        this._uiResLib = {};
    }
    /**
     * @language zh_CN
     * 解析素材
     * @param source 待解析的新素材标识符
     * @param compFunc 解析完成回调函数，示例:callBack(content:any,source:string):void;
     * @param thisObject callBack的 this 引用
     */
    AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
        // var source:string=source.indexOf('.')>0?res.ResUIData.getStringTail(source):source;
        // var resInfo:any=res.uiConfig.getResource(source);
        // if(resInfo){
        //     if(!this._uiResLib[resInfo.name]){
        //         this._uiResLib[resInfo.name]=utils.ObjectPool.from(res.ResUIData,true,resInfo.name);
        //     }
        //     var resdata:res.ResUIData=this._uiResLib[resInfo.name]
        //     resdata.holdReference(this,function(){
        //         compFunc.call(thisObject,resdata.getRes(source));
        //     });
        // }
        function onGetRes(data) {
            compFunc.call(thisObject, data, source);
        }
        if (RES.hasRes(source)) {
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        }
        else {
            RES.getResByUrl(source, onGetRes, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    return AssetAdapter;
}());
__reflect(AssetAdapter.prototype, "AssetAdapter", ["eui.IAssetAdapter"]);
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var ThemeAdapter = (function () {
    function ThemeAdapter() {
    }
    /**
     * 解析主题
     * @param url 待解析的主题url
     * @param compFunc 解析完成回调函数，示例:compFunc(e:egret.Event):void;
     * @param errorFunc 解析失败回调函数，示例:errorFunc():void;
     * @param thisObject 回调的this引用
     */
    ThemeAdapter.prototype.getTheme = function (url, compFunc, errorFunc, thisObject) {
        game.queueLoader.add(game.TypeLoader.TEXT, url, thisObject, compFunc);
        // function onGetRes(e:string):void {
        //     compFunc.call(thisObject, e);
        // }
        // function onError(e:RES.ResourceEvent):void {
        //     if(e.resItem.url == url) {
        //         RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onError, null);
        //         errorFunc.call(thisObject);
        //     }
        // }
        // RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onError, null);
        // RES.getResByUrl(url, onGetRes, this, RES.ResourceItem.TYPE_TEXT);
    };
    return ThemeAdapter;
}());
__reflect(ThemeAdapter.prototype, "ThemeAdapter", ["eui.IThemeAdapter"]);
var game;
(function (game) {
    /**
     * @class RES.ResourceConfig
     * @classdesc
     * @private
     */
    var UIConfig = (function () {
        function UIConfig() {
            /**
             * 一级键名字典
             */
            this.keyMap = {};
            /**
             * 加载组字典
             */
            this.groupDic = {};
        }
        UIConfig.prototype.initialize = function (data, folder) {
            this.parseConfig(data, folder);
        };
        /**
         * 解析一个配置文件
         * @method RES.ResourceConfig#parseConfig
         * @param data {any} 配置文件数据
         * @param folder {string} 加载项的路径前缀。
         */
        UIConfig.prototype.parseConfig = function (data, folder) {
            if (!data)
                return;
            var resources = data["resources"];
            if (resources) {
                var length_1 = resources.length;
                for (var i = 0; i < length_1; i++) {
                    var item = resources[i];
                    var url = item.url;
                    if (url && url.indexOf("://") == -1)
                        item.url = folder + url;
                    this.addItemToKeyMap(item);
                }
            }
            var groups = data["groups"];
            if (groups) {
                var length_2 = groups.length;
                for (var i = 0; i < length_2; i++) {
                    var group = groups[i];
                    var list = [];
                    var keys = group.keys.split(",");
                    var l = keys.length;
                    for (var j = 0; j < l; j++) {
                        var name_1 = keys[j].trim();
                        var item = this.keyMap[name_1];
                        if (item && list.indexOf(item) == -1) {
                            list.push(item);
                        }
                    }
                    this.groupDic[group.name] = list;
                }
            }
        };
        /**
         * 添加一个加载项数据到列表
         */
        UIConfig.prototype.addItemToKeyMap = function (item) {
            if (!this.keyMap[item.name])
                this.keyMap[item.name] = item;
            if (item.hasOwnProperty("subkeys")) {
                var subkeys = (item.subkeys).split(",");
                item.subkeys = subkeys;
                var length_3 = subkeys.length;
                for (var i = 0; i < length_3; i++) {
                    var key = subkeys[i];
                    if (this.keyMap[key] != null)
                        continue;
                    this.keyMap[key] = item;
                }
            }
        };
        /**
        * 根据组名获取原始的组加载项列表
        * @method RES.ResourceConfig#getRawGroupByName
        * @param name {string} 组名
        * @returns {any[]}
        */
        UIConfig.prototype.getGroup = function (name) {
            if (this.groupDic[name])
                return this.groupDic[name];
            return [];
        };
        UIConfig.prototype.getResource = function (key) {
            return this.keyMap[key];
        };
        return UIConfig;
    }());
    game.UIConfig = UIConfig;
    __reflect(UIConfig.prototype, "game.UIConfig");
    game.uiConfig = new UIConfig();
})(game || (game = {}));
var game;
(function (game) {
    var Speed = (function () {
        function Speed() {
            this._x = 0;
            this._y = 0;
        }
        Object.defineProperty(Speed.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Speed.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });
        Speed.prototype.setTo = function (x, y) {
            this._x = x;
            this._y = y;
        };
        return Speed;
    }());
    game.Speed = Speed;
    __reflect(Speed.prototype, "game.Speed");
})(game || (game = {}));
var game;
(function (game) {
    var ResAnimationData = (function (_super) {
        __extends(ResAnimationData, _super);
        function ResAnimationData() {
            return _super.call(this) || this;
        }
        ResAnimationData.prototype.initialize = function (type, name) {
            this._type = type;
            this._name = name;
            switch (this._type) {
                case game.TypeAnimaAsset.ACTOR_ACTION_5:
                case game.TypeAnimaAsset.ACTOR_ACTION_2:
                case game.TypeAnimaAsset.ACTOR_DIRECT_5:
                case game.TypeAnimaAsset.ACTOR_DIRECT_2:
                    this._path = game.GameConfig.resource_other + "/actor/" + this._name;
                    break;
                case game.TypeAnimaAsset.EFFECT_NORMAL:
                case game.TypeAnimaAsset.EFFECT_DIRECT_5:
                case game.TypeAnimaAsset.EFFECT_DIRECT_2:
                    this._path = game.GameConfig.resource_other + "/effect/" + this._name;
                    break;
            }
            this._completeHandlers = [];
        };
        ResAnimationData.prototype.reset = function () {
            this.destory();
        };
        ResAnimationData.prototype.destory = function () {
            logger.log('释放资源:', this._path);
            this.stopDelayDestory();
            this.offDestory();
            this.offAllComplete();
            if (this._dataFactory) {
                game.toMovieFactory(this._dataFactory);
                this._dataFactory = null;
            }
            this._data = null;
            this._config = null;
            if (this._texture) {
                this._texture.dispose();
                this._texture = null;
            }
            game.animationLoader.remove(this._path);
            this._name = "";
            this._path = "";
            this._type = 0;
        };
        Object.defineProperty(ResAnimationData.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResAnimationData.prototype, "data", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        ResAnimationData.prototype.getDirectData = function (direct) {
            return this._data ? this._data[direct] : null;
        };
        /**持有引用 */
        ResAnimationData.prototype.holdReference = function (caller, method, requestDirect) {
            if (requestDirect === void 0) { requestDirect = 0; }
            this.holdReferenceHandler(caller);
            if (this._data) {
                switch (this._type) {
                    case game.TypeAnimaAsset.ACTOR_DIRECT_5:
                    case game.TypeAnimaAsset.ACTOR_DIRECT_2:
                    case game.TypeAnimaAsset.EFFECT_NORMAL:
                        method.call(caller, this._data, this._name);
                        break;
                    case game.TypeAnimaAsset.ACTOR_ACTION_5:
                    case game.TypeAnimaAsset.ACTOR_ACTION_2:
                    case game.TypeAnimaAsset.EFFECT_DIRECT_5:
                    case game.TypeAnimaAsset.EFFECT_DIRECT_2:
                        method.call(caller, this.getDirectData(requestDirect), this._name, requestDirect);
                        break;
                }
                return;
            }
            this.onComplete(caller, method, requestDirect);
            this.load(requestDirect);
        };
        ResAnimationData.prototype.offReference = function (caller, method) {
            _super.prototype.offReference.call(this, caller, method);
        };
        ResAnimationData.prototype.load = function (requestDirect) {
            if (requestDirect === void 0) { requestDirect = 0; }
            if (game.animationLoader.has(this._path)) {
                game.animationLoader.update(this._path, this, this.loadedHandler);
                return;
            }
            game.animationLoader.add(this._path, this._type, this._name, this, this.loadedHandler);
        };
        ResAnimationData.prototype.loadedHandler = function (config, texture, data, dataFactory) {
            this._config = config;
            this._texture = texture;
            this._data = data;
            this._dataFactory = dataFactory;
            this.callComplete();
        };
        ResAnimationData.prototype.onComplete = function (caller, method, requestDirect) {
            if (requestDirect === void 0) { requestDirect = 0; }
            var args = [];
            for (var _i = 3; _i < arguments.length; _i++) {
                args[_i - 3] = arguments[_i];
            }
            if (!this._completeHandlers) {
                this._completeHandlers = [];
            }
            var index = this.getCompleteHandlerIndex(caller, method);
            if (index >= 0) {
                var handler = this._completeHandlers[index];
                handler.requestDirect = requestDirect;
                return;
            }
            this._completeHandlers.push(game.ResHandler.create(caller, method, args, true, requestDirect));
        };
        ResAnimationData.prototype.offComplete = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._completeHandlers)
                return;
            var index = this.getCompleteHandlerIndex(caller, method);
            if (index >= 0) {
                var handler = this._completeHandlers[index];
                handler.recover();
                this._completeHandlers.splice(index, 1);
            }
        };
        ResAnimationData.prototype.offAllComplete = function () {
            if (this._completeHandlers) {
                var list = this._completeHandlers;
                if (list && list.length) {
                    for (var i = 0; i < list.length; i++) {
                        var handler = list[i];
                        handler.recover();
                    }
                    list.length = 0;
                }
            }
            this._completeHandlers = null;
        };
        ResAnimationData.prototype.getCompleteHandlerIndex = function (caller, method) {
            var list = this._completeHandlers;
            if (list && list.length) {
                for (var i = 0; i < list.length; i++) {
                    var handler = list[i];
                    if (handler.caller == caller && handler.method == method) {
                        return i;
                    }
                }
            }
            return -1;
        };
        /**回调 */
        ResAnimationData.prototype.callComplete = function () {
            var list = this._completeHandlers;
            if (list && list.length) {
                switch (this._type) {
                    case game.TypeAnimaAsset.ACTOR_DIRECT_5:
                    case game.TypeAnimaAsset.ACTOR_DIRECT_2:
                    case game.TypeAnimaAsset.EFFECT_NORMAL:
                        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                            var handler = list_1[_i];
                            handler.runWith(this._data, this._name);
                        }
                        break;
                    case game.TypeAnimaAsset.ACTOR_ACTION_5:
                    case game.TypeAnimaAsset.ACTOR_ACTION_2:
                    case game.TypeAnimaAsset.EFFECT_DIRECT_5:
                    case game.TypeAnimaAsset.EFFECT_DIRECT_2:
                        for (var _a = 0, list_2 = list; _a < list_2.length; _a++) {
                            var handler = list_2[_a];
                            handler.runWith(this.getDirectData(handler.requestDirect), this._name, handler.requestDirect);
                        }
                        break;
                }
            }
            this.offAllComplete();
        };
        return ResAnimationData;
    }(game.ResData));
    game.ResAnimationData = ResAnimationData;
    __reflect(ResAnimationData.prototype, "game.ResAnimationData");
})(game || (game = {}));
var game;
(function (game) {
    var ResIconData = (function (_super) {
        __extends(ResIconData, _super);
        function ResIconData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResIconData.prototype.initialize = function (id) {
            this._id = id;
            this._path = game.GameConfig.resource_path + "/icon/item/" + id + ".png";
        };
        ResIconData.prototype.reset = function () {
            game.iconLoader.remove(this._path);
            _super.prototype.reset.call(this);
        };
        Object.defineProperty(ResIconData.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        ResIconData.prototype.load = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (game.iconLoader.has(this._path)) {
                game.iconLoader.update(this._path, this, this.loadedhandler);
                return;
            }
            game.iconLoader.add(this._path, this, this.loadedhandler);
        };
        ResIconData.prototype.loadedhandler = function (data) {
            this._data = data;
            this.callComplete();
        };
        return ResIconData;
    }(game.ResData));
    game.ResIconData = ResIconData;
    __reflect(ResIconData.prototype, "game.ResIconData");
    var ResDropIconData = (function (_super) {
        __extends(ResDropIconData, _super);
        function ResDropIconData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResDropIconData.prototype.initialize = function (id) {
            this._id = id;
            this._path = game.GameConfig.resource_path + "/icon/drop/drop_" + id + ".png";
        };
        ResDropIconData.prototype.reset = function () {
            game.iconLoader.remove(this._path);
            _super.prototype.reset.call(this);
        };
        Object.defineProperty(ResDropIconData.prototype, "id", {
            get: function () {
                return this._id;
            },
            enumerable: true,
            configurable: true
        });
        ResDropIconData.prototype.load = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (game.dropIconLoader.has(this._path)) {
                game.dropIconLoader.update(this._path, this, this.loadedhandler);
                return;
            }
            game.dropIconLoader.add(this._path, this, this.loadedhandler);
        };
        ResDropIconData.prototype.loadedhandler = function (data) {
            this._data = data;
            this.callComplete();
        };
        return ResDropIconData;
    }(game.ResData));
    game.ResDropIconData = ResDropIconData;
    __reflect(ResDropIconData.prototype, "game.ResDropIconData");
})(game || (game = {}));
var game;
(function (game) {
    var ResUIData = (function (_super) {
        __extends(ResUIData, _super);
        function ResUIData() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResUIData.prototype.initialize = function (id) {
            this._info = game.uiConfig.getResource(id);
        };
        ResUIData.prototype.reset = function () {
            switch (this._info.type) {
                case 'image':
                    if (this._data)
                        this._data.dispose();
                    game.imageLoader.remove(this._info.url);
                    return;
                case 'json':
                    game.textLoader.remove(this._info.url);
                    return;
                case 'sheet':
                    if (this._data) {
                        for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                            var texture = _a[_i];
                            texture.dispose();
                        }
                    }
                    game.uiSheetLoader.remove(this._info.url + '.json');
                    return;
                case 'font':
                    if (this._data) {
                        this._data.dispose();
                    }
                    game.uiSheetLoader.remove(this._info.url + '.fnt');
                    return;
            }
            _super.prototype.reset.call(this);
            this._info = null;
            if (this._png) {
                this._png.dispose();
            }
        };
        Object.defineProperty(ResUIData.prototype, "id", {
            get: function () {
                return this._info.name;
            },
            enumerable: true,
            configurable: true
        });
        ResUIData.prototype.load = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._data) {
                this.onComplete(caller, method);
                switch (this._info.type) {
                    case 'image':
                        if (game.imageLoader.has(this._info.url)) {
                            game.imageLoader.update(this._info.url, this, this.loadedhandler);
                            return;
                        }
                        game.imageLoader.add(this._info.url, this, this.loadedhandler);
                        return;
                    case 'json':
                        if (game.textLoader.has(this._info.url)) {
                            game.textLoader.update(this._info.url, this, this.loadedhandler);
                            return;
                        }
                        game.textLoader.add(this._info.url, this, this.loadedhandler);
                        return;
                    case 'sheet':
                        if (game.uiSheetLoader.has(this._info.url)) {
                            game.uiSheetLoader.update(this._info.url, this, this.loadedhandler);
                            return;
                        }
                        game.uiSheetLoader.add(this._info.url, this._info.url.substring(0, this._info.url.lastIndexOf('.')) + '.png', 'sheet', this, this.sheetloadedhandler);
                        return;
                    case 'font':
                        if (game.uiSheetLoader.has(this._info.url)) {
                            game.uiSheetLoader.update(this._info.url, this, this.loadedhandler);
                            return;
                        }
                        game.uiSheetLoader.add(this._info.url, this._info.url.substring(0, this._info.url.lastIndexOf('.')) + '.png', 'font', this, this.sheetloadedhandler);
                        return;
                }
                return;
            }
            method.call(caller, this._data);
        };
        ResUIData.prototype.loadedhandler = function (data) {
            this._data = data;
            this.callComplete();
        };
        ResUIData.prototype.sheetloadedhandler = function (json, png, data) {
            this._data = data;
            this._png = this._png;
            this.callComplete();
        };
        ResUIData.prototype.getRes = function (subKey) {
            if (subKey === void 0) { subKey = ''; }
            switch (this._info.type) {
                case 'image': return this._data;
                case 'json': return this._data;
                case 'sheet': return this._data ? this._data[subKey] : null;
                case 'font': return this._data;
            }
        };
        /**
         * 读取一个字符串里第一个点之前的内容。
         * @param name {string} 要读取的字符串
         */
        ResUIData.getStringPrefix = function (name) {
            if (!name) {
                return "";
            }
            var index = name.indexOf(".");
            if (index != -1) {
                return name.substring(0, index);
            }
            return "";
        };
        /**
         * 读取一个字符串里第一个点之后的内容。
         * @param name {string} 要读取的字符串
         */
        ResUIData.getStringTail = function (name) {
            if (!name) {
                return "";
            }
            var index = name.indexOf(".");
            if (index != -1) {
                return name.substring(index + 1);
            }
            return "";
        };
        return ResUIData;
    }(game.ResData));
    game.ResUIData = ResUIData;
    __reflect(ResUIData.prototype, "game.ResUIData");
})(game || (game = {}));
// namespace RES {
//     /**
//      * SpriteSheet解析器
//      * @private
//      */
//     export class SheetAnalyzer extends BinAnalyzer {
//         public constructor() {
//             super();
//             this._dataFormat = egret.HttpResponseType.TEXT;
//         }
//         public getRes(name:string):any {
//             let res:any = this.fileDic[name];
//             if (!res) {
//                 res = this.textureMap[name];
//             }
//             if (!res) {
//                 let prefix:string = RES.AnalyzerBase.getStringPrefix(name);
//                 res = this.fileDic[prefix];
//                 if (res) {
//                     let tail:string = RES.AnalyzerBase.getStringTail(name);
//                     res = (<egret.SpriteSheet> res).getTexture(tail);
//                 }
//             }
//             return res;
//         }
//         /**
//          * 一项加载结束
//          */
//         public onLoadFinish(event:egret.Event):void {
//             let request = event.target;
//             let data:any = this.resItemDic[request.$hashCode];
//             delete this.resItemDic[request.hashCode];
//             let resItem:ResourceItem = data.item;
//             let compFunc:Function = data.func;
//             resItem.loaded = (event.type == egret.Event.COMPLETE);
//             if (resItem.loaded) {
//                 if (request instanceof egret.HttpRequest) {
//                     resItem.loaded = false;
//                     let imageUrl:string = this.analyzeConfig(resItem, request.response);
//                     if (imageUrl) {
//                         this.loadImage(imageUrl, data);
//                         this.recycler.push(request);
//                         return;
//                     }
//                 }
//                 else {
//                     let texture:egret.Texture = new egret.Texture();
//                     texture._setBitmapData(request.data);
//                     this.analyzeBitmap(resItem, texture);
//                 }
//             }
//             if (request instanceof egret.HttpRequest) {
//                 this.recycler.push(request);
//             }
//             else {
//                 this.recyclerIamge.push(request);
//             }
//             compFunc.call(data.thisObject, resItem);
//         }
//         public sheetMap:any = {};
//         private textureMap:any = {};
//         /**
//          * 解析并缓存加载成功的配置文件
//          */
//         public analyzeConfig(resItem:ResourceItem, data:string):string {
//             let name:string = resItem.name;
//             let config:any;
//             let imageUrl:string = "";
//             try {
//                 let str:string = <string> data;
//                 config = JSON.parse(str);
//             }
//             catch (e) {
//                 egret.$warn(1017, resItem.url, data);
//             }
//             if (config) {
//                 this.sheetMap[name] = config;
//                 imageUrl = this.getRelativePath(resItem.url, config["file"]);
//             }
//             return imageUrl;
//         }
//         /**
//          * 解析并缓存加载成功的位图数据
//          */
//         public analyzeBitmap(resItem:ResourceItem, texture:egret.Texture):void {
//             let name:string = resItem.name;
//             if (this.fileDic[name] || !texture) {
//                 return;
//             }
//             let config:any = this.sheetMap[name];
//             delete this.sheetMap[name];
//             let targetName:string = resItem.data && resItem.data.subkeys ? "" : name;
//             let spriteSheet:egret.SpriteSheet  = this.parseSpriteSheet(texture, config, targetName);
//             this.fileDic[name] = spriteSheet;
//         }
//         /**
//          * 获取相对位置
//          */
//         public getRelativePath(url:string, file:string):string {
//             url = url.split("\\").join("/");
//             let params = url.match(/#.*|\?.*/);
//             let paramUrl = "";
//             if (params) {
//                 paramUrl = params[0];
//             }
//             let index:number = url.lastIndexOf("/");
//             if (index != -1) {
//                 url = url.substring(0, index + 1) + file;
//             }
//             else {
//                 url = file;
//             }
//             return url + paramUrl;
//         }
//         protected parseSpriteSheet(texture:egret.Texture, data:any, name:string):egret.SpriteSheet  {
//             let frames:any = data.frames;
//             if(!frames){
//                 return null;
//             }
//             let spriteSheet:egret.SpriteSheet = new egret.SpriteSheet(texture);
//             let textureMap:any = this.textureMap;
//             for(let subkey in frames){
//                 let config:any = frames[subkey];
//                 let texture:egret.Texture = spriteSheet.createTexture(subkey,config.x,config.y,config.w,config.h,config.offX, config.offY,config.sourceW,config.sourceH);
//                 if(config["scale9grid"]){
//                     let str:string = config["scale9grid"];
//                     let list:string[] = str.split(",");
//                     texture["scale9Grid"] = new egret.Rectangle(parseInt(list[0]),parseInt(list[1]),parseInt(list[2]),parseInt(list[3]));
//                 }
//                 if(textureMap[subkey]==null){
//                     textureMap[subkey] = texture;
//                     if(name){
//                         this.addSubkey(subkey,name);
//                     }
//                 }
//             }
//             return spriteSheet;
//         }
//         public destroyRes(name:string):boolean {
//             let sheet:any = this.fileDic[name];
//             if (sheet) {
//                 delete this.fileDic[name];
//                 let texture;
//                 for (let subkey in sheet._textureMap) {
//                     if (texture == null) {
//                         texture = sheet._textureMap[subkey];
//                         this.onResourceDestroy(texture);
//                         texture = null;
//                     }
//                     delete this.textureMap[subkey];
//                 }
//                 if(sheet.dispose) {
//                     sheet.dispose();
//                 }
//                 return true;
//             }
//             return false;
//         }
//         /**
//          * ImageLoader对象池
//          */
//         private recyclerIamge:egret.ImageLoader[] = [];
//         private loadImage(url:string, data:any):void {
//             let loader = this.getImageLoader();
//             this.resItemDic[loader.hashCode] = data;
//             loader.load($getVirtualUrl(url));
//         }
//         private getImageLoader():egret.ImageLoader {
//             let loader = this.recyclerIamge.pop();
//             if (!loader) {
//                 loader = new egret.ImageLoader();
//                 loader.addEventListener(egret.Event.COMPLETE, this.onLoadFinish, this);
//                 loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this);
//             }
//             return loader;
//         }
//         protected onResourceDestroy(texture:any) {
//             if (texture) {
//                 texture.dispose();
//             }
//         }
//     }
// } 
var utils;
(function (utils) {
    /**
     * |为富文本分隔符,&为样式分隔符,:为样式值分隔符
     *
     * 样式符:
     * T:基础文本内容
     * C:文本颜色值16进制值     Example:0xFFFFFF
     * S:文本字号              Example:16
     * N:换行符                可不填值
     * U:下划线                可不填值
     * H:超链接                Example:www.163.com
     */
    var TextFlowMaker = (function () {
        function TextFlowMaker() {
        }
        /**
         * "你好|S:18&C:0xffff00&T:带颜色字号|S:50&T:大号字体|C:0x0000ff&T:带色字体";
         * @param sourceText
         * @returns {Array}
         */
        TextFlowMaker.generateTextFlow = function (sourceText) {
            if (!sourceText)
                return [{ style: {}, text: '' }];
            if (sourceText.indexOf('T:') == -1 && sourceText.indexOf('&') == -1)
                return [{ style: {}, text: sourceText }];
            var textArr = sourceText.split("|");
            var result = [];
            for (var i = 0, len = textArr.length; i < len; i++) {
                result.push(this.getSingleTextFlow(textArr[i]));
            }
            return result;
        };
        // %1$s成功锻造出了魔龙装备%2$s，离魔域王者又进了一步！|C:0x34e22c&U:&H:7007&T:我也要
        // this.labContent.textFlow = new Array<egret.ITextElement>({ text: "京东方卡萨丁发了多少" }, {
        // 				text: "这段文字有链接",
        // 				style: { textColor: 0x2B8C25, underline: true, "href": "event:text event triggered" }
        // 			});
        TextFlowMaker.getSingleTextFlow = function (text) {
            var textArr = text.split("&");
            var tempArr;
            var textFlow = { style: {} };
            for (var i = 0, len = textArr.length; i < len; i++) {
                var filed = textArr[i];
                var title = filed.charAt(0);
                var content = filed.substring(filed.indexOf(':') + 1, filed.length);
                switch (title) {
                    case TextFlowMaker.PROP_TEXT:
                        textFlow.text = content;
                        break;
                    case TextFlowMaker.STYLE_SIZE:
                        textFlow.style.size = parseInt(content);
                        break;
                    case TextFlowMaker.STYLE_COLOR:
                        textFlow.style.textColor = parseInt(content);
                        break;
                    case TextFlowMaker.NEW_LINE:
                        textFlow.text = "\n";
                        break;
                    case TextFlowMaker.STYLE_UNDERLINE:
                        textFlow.style.underline = true;
                        break;
                    case TextFlowMaker.STYLE_HREF:
                        textFlow.style.href = "event:" + content;
                        break;
                    default:
                        textFlow.text = filed;
                        break;
                }
            }
            return textFlow;
        };
        TextFlowMaker.htmlParser = function (htmlStr) {
            return this._htmlParserinstance.parser(htmlStr);
        };
        TextFlowMaker.STYLE_COLOR = "C";
        TextFlowMaker.STYLE_SIZE = "S";
        TextFlowMaker.PROP_TEXT = "T";
        TextFlowMaker.NEW_LINE = "N";
        TextFlowMaker.STYLE_UNDERLINE = "U";
        TextFlowMaker.STYLE_HREF = "H";
        TextFlowMaker._htmlParserinstance = new egret.HtmlTextParser();
        return TextFlowMaker;
    }());
    utils.TextFlowMaker = TextFlowMaker;
    __reflect(TextFlowMaker.prototype, "utils.TextFlowMaker");
})(utils || (utils = {}));
var utils;
(function (utils) {
    /**@private */
    var _gid = 1;
    /**@private */
    var _pi = 180 / Math.PI;
    /**@private */
    var _pi2 = Math.PI / 180;
    /**@private */
    var _extReg = /\.(\w+)\??/g;
    /**
     * 角度转弧度。
     * @param	angle 角度值。
     * @return	返回弧度值。
     */
    function toRadian(angle) {
        return angle * _pi2;
    }
    utils.toRadian = toRadian;
    /**
     * 弧度转换为角度。
     * @param	radian 弧度值。
     * @return	返回角度值。
     */
    function toAngle(radian) {
        return radian * _pi;
    }
    utils.toAngle = toAngle;
    /**
     * 将传入的 uint 类型颜色值转换为字符串型颜色值。
     * @param color 颜色值。
     * @return 字符串型颜色值。
     */
    function toHexColor(color) {
        if (color < 0 || isNaN(color))
            return null;
        var str = color.toString(16);
        while (str.length < 6)
            str = "0" + str;
        return "#" + str;
    }
    utils.toHexColor = toHexColor;
    /**获取一个全局唯一ID。*/
    function getGID() {
        return _gid++;
    }
    utils.getGID = getGID;
    /**
     * 将字符串解析成 XML 对象。
     * @param value 需要解析的字符串。
     * @return js原生的XML对象。
     */
    utils.parseXMLFromString = function (value) {
        var rst;
        value = value.replace(/>\s+</g, '><');
        rst = (new DOMParser()).parseFromString(value, 'text/xml');
        if (rst.firstChild.textContent.indexOf("This page contains the following errors") > -1) {
            throw new Error(rst.firstChild.firstChild.textContent);
        }
        return rst;
    };
    /**
     * @private
     * <p>连接数组。和array的concat相比，此方法不创建新对象</p>
     * <b>注意：</b>若 参数 a 不为空，则会改变参数 source 的值为连接后的数组。
     * @param	source 待连接的数组目标对象。
     * @param	array 待连接的数组对象。
     * @return 连接后的数组。
     */
    function concatArray(source, array) {
        if (!array)
            return source;
        if (!source)
            return array;
        var i, len = array.length;
        for (i = 0; i < len; i++) {
            source.push(array[i]);
        }
        return source;
    }
    utils.concatArray = concatArray;
    /**
     * @private
     * 清空数组对象。
     * @param	array 数组。
     * @return	清空后的 array 对象。
     */
    function clearArray(array) {
        if (!array)
            return array;
        array.length = 0;
        return array;
    }
    utils.clearArray = clearArray;
    /**
     * @private
     * 清空source数组，复制array数组的值。
     * @param	source 需要赋值的数组。
     * @param	array 新的数组值。
     * @return 	复制后的数据 source 。
     */
    function copyArray(source, array) {
        source || (source = []);
        if (!array)
            return source;
        source.length = array.length;
        var i, len = array.length;
        for (i = 0; i < len; i++) {
            source[i] = array[i];
        }
        return source;
    }
    utils.copyArray = copyArray;
    /**
     * 指定函数回调时传递参数
     * @param	fun 函数对象。
     * @param	args 需要传递的参数
     * @return
     */
    function bind(fun) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (function (fun1) {
            var args1 = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args1[_i - 1] = arguments[_i];
            }
            var resultFunction = function () {
                var args2 = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args2[_i] = arguments[_i];
                }
                fun1.apply(void 0, args1.concat(args2));
            };
            return resultFunction;
        }).apply(void 0, [fun].concat(args));
    }
    utils.bind = bind;
    /**
     * @private
     * 批量移动点坐标。
     * @param points 坐标列表。
     * @param x x轴偏移量。
     * @param y y轴偏移量。
     */
    function transPointList(points, x, y) {
        var i, len = points.length;
        for (i = 0; i < len; i += 2) {
            points[i] += x;
            points[i + 1] += y;
        }
    }
    utils.transPointList = transPointList;
    /**@private */
    function getFileExtension(path) {
        _extReg.lastIndex = path.lastIndexOf(".");
        var result = _extReg.exec(path);
        if (result && result.length > 1) {
            return result[1].toLowerCase();
        }
        return null;
    }
    /**
     * 拷贝字节数组
     * dest 目标数组
     * doffset 目标数组指针位置
     * src 源数组
     * soffset 源数组指针位置
     * length 长度
     */
    function copyBytesArray(dest, doffset, src, soffset, length) {
        for (var index = 0; index < length; index++) {
            dest[doffset++] = src[soffset++];
        }
    }
    utils.copyBytesArray = copyBytesArray;
    /**
     * 字符串转字节
     * str 字符串;
     * return Uint8Array
     */
    function stringEncode(str) {
        var byteArray = new Uint8Array(str.length * 3);
        var offset = 0;
        for (var i = 0; i < str.length; i++) {
            var charCode = str.charCodeAt(i);
            var codes = null;
            if (charCode <= 0x7f) {
                codes = [charCode];
            }
            else if (charCode <= 0x7ff) {
                codes = [0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f)];
            }
            else {
                codes = [0xe0 | (charCode >> 12), 0x80 | ((charCode & 0xfc0) >> 6), 0x80 | (charCode & 0x3f)];
            }
            for (var j = 0; j < codes.length; j++) {
                byteArray[offset] = codes[j];
                ++offset;
            }
        }
        var _buffer = new Uint8Array(offset);
        copyBytesArray(_buffer, 0, byteArray, 0, offset);
        return _buffer;
    }
    utils.stringEncode = stringEncode;
    /**
     * 字节转字符串
     * buffer 字节流
     * return string
     */
    function stringDecode(buffer) {
        var bytes = new Uint8Array(buffer);
        var array = [];
        var offset = 0;
        var charCode = 0;
        var end = bytes.length;
        while (offset < end) {
            if (bytes[offset] < 128) {
                charCode = bytes[offset];
                offset += 1;
            }
            else if (bytes[offset] < 224) {
                charCode = ((bytes[offset] & 0x3f) << 6) + (bytes[offset + 1] & 0x3f);
                offset += 2;
            }
            else {
                charCode = ((bytes[offset] & 0x0f) << 12) + ((bytes[offset + 1] & 0x3f) << 6) + (bytes[offset + 2] & 0x3f);
                offset += 3;
            }
            array.push(charCode);
        }
        return String.fromCharCode.apply(null, array);
    }
    utils.stringDecode = stringDecode;
    function arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return "data:image/png;base64," + window.btoa(binary);
    }
    utils.arrayBufferToBase64 = arrayBufferToBase64;
    function base64ToTexture(base64str, caller, method) {
        if (caller === void 0) { caller = null; }
        if (method === void 0) { method = null; }
        var texture = new Image();
        texture.onload = function () {
            var bitmap = new egret.Texture();
            bitmap._setBitmapData(texture);
            if (method)
                method.call(caller, bitmap);
        };
        texture.src = base64str;
    }
    utils.base64ToTexture = base64ToTexture;
    function bufferToTexture(buffer, caller, method) {
        if (caller === void 0) { caller = null; }
        if (method === void 0) { method = null; }
        return base64ToTexture(arrayBufferToBase64(buffer), caller, method);
    }
    utils.bufferToTexture = bufferToTexture;
})(utils || (utils = {}));
var utils;
(function (utils) {
    var Ease = (function () {
        function Ease() {
        }
        /**
         * 定义无加速持续运动。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.linearNone = function (t, b, c, d) {
            return c * t / d + b;
        };
        /**
         * 定义无加速持续运动。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.linearIn = function (t, b, c, d) {
            return c * t / d + b;
        };
        /**
         * 定义无加速持续运动。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.linearInOut = function (t, b, c, d) {
            return c * t / d + b;
        };
        /**
         * 定义无加速持续运动。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.linearOut = function (t, b, c, d) {
            return c * t / d + b;
        };
        /**
         * 方法以零速率开始运动，然后在执行时加快运动速度。
         * 它的运动是类似一个球落向地板又弹起后，几次逐渐减小的回弹运动。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.bounceIn = function (t, b, c, d) {
            return c - this.bounceOut(d - t, 0, c, d) + b;
        };
        /**
         * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
         * 它的运动是类似一个球落向地板又弹起后，几次逐渐减小的回弹运动。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.bounceInOut = function (t, b, c, d) {
            if (t < d * 0.5)
                return this.bounceIn(t * 2, 0, c, d) * .5 + b;
            else
                return this.bounceOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
        };
        /**
         * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
         * 它的运动是类似一个球落向地板又弹起后，几次逐渐减小的回弹运动。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.bounceOut = function (t, b, c, d) {
            if ((t /= d) < (1 / 2.75))
                return c * (7.5625 * t * t) + b;
            else if (t < (2 / 2.75))
                return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
            else if (t < (2.5 / 2.75))
                return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
            else
                return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        };
        /**
         * 开始时往后运动，然后反向朝目标移动。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @param	s 指定过冲量，此处数值越大，过冲越大。
         * @return 指定时间的插补属性的值。
         */
        Ease.backIn = function (t, b, c, d, s) {
            if (s === void 0) { s = 1.70158; }
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        };
        /**
         * 开始运动时是向后跟踪，再倒转方向并朝目标移动，稍微过冲目标，然后再次倒转方向，回来朝目标移动。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @param	s 指定过冲量，此处数值越大，过冲越大。
         * @return 指定时间的插补属性的值。
         */
        Ease.backInOut = function (t, b, c, d, s) {
            if (s === void 0) { s = 1.70158; }
            if ((t /= d * 0.5) < 1)
                return c * 0.5 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
        };
        /**
         * 开始运动时是朝目标移动，稍微过冲，再倒转方向回来朝着目标。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @param	s 指定过冲量，此处数值越大，过冲越大。
         * @return 指定时间的插补属性的值。
         */
        Ease.backOut = function (t, b, c, d, s) {
            if (s === void 0) { s = 1.70158; }
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        };
        /**
         * 方法以零速率开始运动，然后在执行时加快运动速度。
         * 其中的运动由按照指数方式衰减的正弦波来定义。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @param	a 指定正弦波的幅度。
         * @param	p 指定正弦波的周期。
         * @return 指定时间的插补属性的值。
         */
        Ease.elasticIn = function (t, b, c, d, a, p) {
            if (a === void 0) { a = 0; }
            if (p === void 0) { p = 0; }
            /*[DISABLE-ADD-VARIABLE-DEFAULT-VALUE]*/
            var s;
            if (t == 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (!p)
                p = d * .3;
            if (!a || (c > 0 && a < c) || (c < 0 && a < -c)) {
                a = c;
                s = p / 4;
            }
            else
                s = p / this.PI2 * Math.asin(c / a);
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * this.PI2 / p)) + b;
        };
        /**
         * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
         * 其中的运动由按照指数方式衰减的正弦波来定义。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @param	a 指定正弦波的幅度。
         * @param	p 指定正弦波的周期。
         * @return 指定时间的插补属性的值。
         */
        Ease.elasticInOut = function (t, b, c, d, a, p) {
            if (a === void 0) { a = 0; }
            if (p === void 0) { p = 0; }
            /*[DISABLE-ADD-VARIABLE-DEFAULT-VALUE]*/
            var s;
            if (t == 0)
                return b;
            if ((t /= d * 0.5) == 2)
                return b + c;
            if (!p)
                p = d * (.3 * 1.5);
            if (!a || (c > 0 && a < c) || (c < 0 && a < -c)) {
                a = c;
                s = p / 4;
            }
            else
                s = p / this.PI2 * Math.asin(c / a);
            if (t < 1)
                return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * this.PI2 / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * this.PI2 / p) * .5 + c + b;
        };
        /**
         * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
         * 其中的运动由按照指数方式衰减的正弦波来定义。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @param	a 指定正弦波的幅度。
         * @param	p 指定正弦波的周期。
         * @return 指定时间的插补属性的值。
         */
        Ease.elasticOut = function (t, b, c, d, a, p) {
            if (a === void 0) { a = 0; }
            if (p === void 0) { p = 0; }
            /*[DISABLE-ADD-VARIABLE-DEFAULT-VALUE]*/
            var s;
            if (t == 0)
                return b;
            if ((t /= d) == 1)
                return b + c;
            if (!p)
                p = d * .3;
            if (!a || (c > 0 && a < c) || (c < 0 && a < -c)) {
                a = c;
                s = p / 4;
            }
            else
                s = p / this.PI2 * Math.asin(c / a);
            return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * this.PI2 / p) + c + b);
        };
        /**
         * 以零速率开始运动，然后在执行时加快运动速度。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.strongIn = function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        };
        /**
         * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.strongInOut = function (t, b, c, d) {
            if ((t /= d * 0.5) < 1)
                return c * 0.5 * t * t * t * t * t + b;
            return c * 0.5 * ((t -= 2) * t * t * t * t + 2) + b;
        };
        /**
         * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.strongOut = function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        };
        /**
         * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
         * Sine 缓动方程中的运动加速度小于 Quad 方程中的运动加速度。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.sineInOut = function (t, b, c, d) {
            return -c * 0.5 * (Math.cos(Math.PI * t / d) - 1) + b;
        };
        /**
         * 以零速率开始运动，然后在执行时加快运动速度。
         * Sine 缓动方程中的运动加速度小于 Quad 方程中的运动加速度。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.sineIn = function (t, b, c, d) {
            return -c * Math.cos(t / d * this.HALF_PI) + c + b;
        };
        /**
         * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
         * Sine 缓动方程中的运动加速度小于 Quad 方程中的运动加速度。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.sineOut = function (t, b, c, d) {
            return c * Math.sin(t / d * this.HALF_PI) + b;
        };
        /**
         * 以零速率开始运动，然后在执行时加快运动速度。
         * Quint 缓动方程的运动加速大于 Quart 缓动方程。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.quintIn = function (t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        };
        /**
         * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
         * Quint 缓动方程的运动加速大于 Quart 缓动方程。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.quintInOut = function (t, b, c, d) {
            if ((t /= d * 0.5) < 1)
                return c * 0.5 * t * t * t * t * t + b;
            return c * 0.5 * ((t -= 2) * t * t * t * t + 2) + b;
        };
        /**
         * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
         * Quint 缓动方程的运动加速大于 Quart 缓动方程。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.quintOut = function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        };
        /**
         * 方法以零速率开始运动，然后在执行时加快运动速度。
         * Quart 缓动方程的运动加速大于 Cubic 缓动方程。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.quartIn = function (t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        };
        /**
         * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
         * Quart 缓动方程的运动加速大于 Cubic 缓动方程。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.quartInOut = function (t, b, c, d) {
            if ((t /= d * 0.5) < 1)
                return c * 0.5 * t * t * t * t + b;
            return -c * 0.5 * ((t -= 2) * t * t * t - 2) + b;
        };
        /**
         * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
         * Quart 缓动方程的运动加速大于 Cubic 缓动方程。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.quartOut = function (t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        };
        /**
         * 方法以零速率开始运动，然后在执行时加快运动速度。
         * Cubic 缓动方程的运动加速大于 Quad 缓动方程。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.cubicIn = function (t, b, c, d) {
            return c * (t /= d) * t * t + b;
        };
        /**
         * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
         * Cubic 缓动方程的运动加速大于 Quad 缓动方程。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.cubicInOut = function (t, b, c, d) {
            if ((t /= d * 0.5) < 1)
                return c * 0.5 * t * t * t + b;
            return c * 0.5 * ((t -= 2) * t * t + 2) + b;
        };
        /**
         * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
         * Cubic 缓动方程的运动加速大于 Quad 缓动方程。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.cubicOut = function (t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        };
        /**
         * 方法以零速率开始运动，然后在执行时加快运动速度。
         * Quad 缓动方程中的运动加速度等于 100% 缓动的时间轴补间的运动加速度，并且显著小于 Cubic 缓动方程中的运动加速度。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.quadIn = function (t, b, c, d) {
            return c * (t /= d) * t + b;
        };
        /**
         * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
         * Quad 缓动方程中的运动加速度等于 100% 缓动的时间轴补间的运动加速度，并且显著小于 Cubic 缓动方程中的运动加速度。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.quadInOut = function (t, b, c, d) {
            if ((t /= d * 0.5) < 1)
                return c * 0.5 * t * t + b;
            return -c * 0.5 * ((--t) * (t - 2) - 1) + b;
        };
        /**
         * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
         * Quad 缓动方程中的运动加速度等于 100% 缓动的时间轴补间的运动加速度，并且显著小于 Cubic 缓动方程中的运动加速度。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.quadOut = function (t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        };
        /**
         * 方法以零速率开始运动，然后在执行时加快运动速度。
         * 其中每个时间间隔是剩余距离减去一个固定比例部分。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.expoIn = function (t, b, c, d) {
            return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b - c * 0.001;
        };
        /**
         * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
         * 其中每个时间间隔是剩余距离减去一个固定比例部分。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.expoInOut = function (t, b, c, d) {
            if (t == 0)
                return b;
            if (t == d)
                return b + c;
            if ((t /= d * 0.5) < 1)
                return c * 0.5 * Math.pow(2, 10 * (t - 1)) + b;
            return c * 0.5 * (-Math.pow(2, -10 * --t) + 2) + b;
        };
        /**
         * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
         * 其中每个时间间隔是剩余距离减去一个固定比例部分。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.expoOut = function (t, b, c, d) {
            return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        };
        /**
         * 方法以零速率开始运动，然后在执行时加快运动速度。
         * 缓动方程的运动加速会产生突然的速率变化。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.circIn = function (t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        };
        /**
         * 开始运动时速率为零，先对运动进行加速，再减速直到速率为零。
         * 缓动方程的运动加速会产生突然的速率变化。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.circInOut = function (t, b, c, d) {
            if ((t /= d * 0.5) < 1)
                return -c * 0.5 * (Math.sqrt(1 - t * t) - 1) + b;
            return c * 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        };
        /**
         * 以较快速度开始运动，然后在执行时减慢运动速度，直至速率为零。
         * 缓动方程的运动加速会产生突然的速率变化。
         * @param	t 指定当前时间，介于 0 和持续时间之间（包括二者）。
         * @param	b 指定动画属性的初始值。
         * @param	c 指定动画属性的更改总计。
         * @param	d 指定运动的持续时间。
         * @return 指定时间的插补属性的值。
         */
        Ease.circOut = function (t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        };
        /**@private */
        Ease.HALF_PI = Math.PI * 0.5;
        /**@private */
        Ease.PI2 = Math.PI * 2;
        return Ease;
    }());
    utils.Ease = Ease;
    __reflect(Ease.prototype, "utils.Ease");
    Ease.backIn = egret.Ease.backIn;
    Ease.backOut = egret.Ease.backOut;
    Ease.backInOut = egret.Ease.backInOut;
    Ease.bounceIn = egret.Ease.bounceIn;
    Ease.bounceOut = egret.Ease.bounceOut;
    Ease.bounceInOut = egret.Ease.bounceInOut;
    Ease.circIn = egret.Ease.circIn;
    Ease.circOut = egret.Ease.circOut;
    Ease.circInOut = egret.Ease.circInOut;
    Ease.cubicIn = egret.Ease.cubicIn;
    Ease.cubicOut = egret.Ease.cubicOut;
    Ease.cubicInOut = egret.Ease.cubicInOut;
    Ease.elasticIn = egret.Ease.elasticIn;
    Ease.elasticOut = egret.Ease.elasticOut;
    Ease.elasticInOut = egret.Ease.elasticInOut;
})(utils || (utils = {}));
///////////////////////////////////
// -------------------------------
// @author:Kevin.Chen
// @date:2016-5-17下午3:03:35
// @email:kevin-chen@foxmail.com
// -------------------------------
///////////////////////////////////
var utils;
(function (utils) {
    var ArrayUtil = (function () {
        function ArrayUtil() {
        }
        /**
         * 搜索  source集合 的子集是否有 指定当前键位的元素，有则返回第一个符合条件的子集
         * @param source
         * @param key
         * @param value
         * @return
         *
         */
        ArrayUtil.find = function (source, key, value) {
            if (source != null) {
                for (var _i = 0, source_1 = source; _i < source_1.length; _i++) {
                    var target = source_1[_i];
                    if (target[key] == value) {
                        return target;
                    }
                }
            }
            return null;
        };
        /**
         * 搜索  source集合 的子集是否有 指定当前键位的元素，返回所有符合条件的子集
         * @param source
         * @param key
         * @param value
         * @return
         *
         */
        ArrayUtil.findArray = function (source, key, value) {
            var results = [];
            if (source != null) {
                for (var _i = 0, source_2 = source; _i < source_2.length; _i++) {
                    var target = source_2[_i];
                    if (target[key] == value) {
                        results.push(target);
                    }
                }
            }
            return results;
        };
        /**
         * 搜索  source集合 的子集是否有 指定当前键位的元素，返回符合条件的对象
         * @param source
         * @param keys
         * @param value
         * @return
         *
         */
        ArrayUtil.findElement = function (source, keys, value) {
            if (!(source == null) && !(keys == null) && (keys.length > 0)) {
                for (var _i = 0, source_3 = source; _i < source_3.length; _i++) {
                    var target = source_3[_i];
                    for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                        var key = keys_1[_a];
                        if (target[key] == value) {
                            return target;
                        }
                    }
                }
            }
            return null;
        };
        ArrayUtil.equalElements = function (array1, array2) {
            var count1 = 0;
            var count2 = 0;
            for (var _i = 0, array1_1 = array1; _i < array1_1.length; _i++) {
                var element1 = array1_1[_i];
                count1++;
                var has = false;
                count2 = 0;
                for (var _a = 0, array2_1 = array2; _a < array2_1.length; _a++) {
                    var element2 = array2_1[_a];
                    if (element1 == element2) {
                        has = true;
                    }
                    count2++;
                }
                if (!has) {
                    return false;
                }
            }
            return count1 == count2;
        };
        /**
         * 搜索  source集合 的子集是否有 指定当前键位的元素，返回所有符合条件的对象
         * @param source
         * @param keys
         * @param value
         * @return
         *
         */
        ArrayUtil.findElementsArray = function (source, keys, value) {
            var results = [];
            if (!(source == null) && !(keys == null) && (keys.length > 0)) {
                for (var _i = 0, source_4 = source; _i < source_4.length; _i++) {
                    var target = source_4[_i];
                    for (var _a = 0, keys_2 = keys; _a < keys_2.length; _a++) {
                        var key = keys_2[_a];
                        if (target[key] == value) {
                            results.push(target);
                            break;
                        }
                    }
                }
            }
            return results;
        };
        /**
         * 搜索  source集合 的子集是否有 指定当前键位的元素，返回所有符合条件的对象
         * @param source
         * @param keys
         * @param value
         * @return
         *
         */
        ArrayUtil.findElementsVector = function (source, keys, value) {
            var target = null;
            var key = null;
            var results = [];
            if (!(source == null) && !(keys == null) && (keys.length > 0)) {
                for (var _i = 0, source_5 = source; _i < source_5.length; _i++) {
                    var target = source_5[_i];
                    for (var _a = 0, keys_3 = keys; _a < keys_3.length; _a++) {
                        var key = keys_3[_a];
                        if (target[key] == value) {
                            results.push(target);
                            break;
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            ;
            return results;
        };
        ArrayUtil.findElement2 = function (source, keys, values) {
            var length;
            var index;
            if (source == null || keys == null || values == null) {
                return null;
            }
            if (keys.length != values.length) {
                throw (new Error("Key's length must equal value's length!"));
            }
            for (var _i = 0, source_6 = source; _i < source_6.length; _i++) {
                var target = source_6[_i];
                length = keys.length;
                index = 0;
                while (index < length) {
                    if (target[keys[index]] != values[index])
                        break;
                    if (index == (length - 1)) {
                        return target;
                    }
                    index++;
                }
            }
            return null;
        };
        /**
         * 从集合中随机取一个元素
         * @param source
         * @return
         *
         */
        ArrayUtil.getRandomItem = function (source) {
            var index = utils.MathUtil.randRange(0, (source.length - 1));
            return source[index];
        };
        ArrayUtil.arrayToObject = function (source, key) {
            if (source == null)
                return null;
            var result = {};
            for (var _i = 0, source_7 = source; _i < source_7.length; _i++) {
                var target = source_7[_i];
                result[target[key]] = target;
            }
            return result;
        };
        ArrayUtil.arrayToObjectMultiKey = function (source, keys, separator) {
            if (separator === void 0) { separator = "_"; }
            var key = null;
            var length;
            var index;
            if (source == null) {
                return null;
            }
            var result = {};
            for (var _i = 0, source_8 = source; _i < source_8.length; _i++) {
                var target = source_8[_i];
                key = "";
                length = keys.length;
                index = 0;
                while (index < length) {
                    key += target[keys[index]];
                    if (index != (length - 1)) {
                        key += separator;
                    }
                    index++;
                }
                result[key] = target;
            }
            return result;
        };
        /**
         * 释放集合
         * @param source
         *
         */
        ArrayUtil.dispose = function (source) {
            source.length = 0;
        };
        /**
         * 添加元素到集合
         * @param source
         * @param _args
         *
         */
        ArrayUtil.addElements = function (source) {
            var _args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                _args[_i - 1] = arguments[_i];
            }
            var index;
            if (source == null) {
                return;
            }
            for (var _a = 0, _args_1 = _args; _a < _args_1.length; _a++) {
                var target = _args_1[_a];
                index = source.indexOf(target);
                if (index == -1) {
                    source.push(target);
                }
            }
        };
        /**
         * 从集合移除元素
         * @param source
         * @param _args
         *
         */
        ArrayUtil.removeElements = function (source) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var index;
            if (source == null) {
                return;
            }
            for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                var arg = args_1[_a];
                index = source.indexOf(arg);
                if (index != -1) {
                    source.splice(index, 1);
                }
            }
        };
        /**
         * 打乱集合
         * @param source
         *
         */
        ArrayUtil.shuffle = function (source) {
            source = source;
            source.sort(function () {
                var value = (Math.random() - 0.5);
                if (value > 0) {
                    return 1;
                }
                ;
                return -1;
            });
        };
        /**
         * 从字符串中提取元素，覆盖到原始集合
         * @param source 原始集合
         * @param content 带数据分隔符的字符串
         * @param separator 分隔符
         * @param forceTypeClass 强制转换类引用
         * @return
         *
         */
        ArrayUtil.copyAndFill = function (source, content, separator, forceTypeClass) {
            if (separator === void 0) { separator = ","; }
            if (forceTypeClass === void 0) { forceTypeClass = null; }
            var index;
            var value = null;
            if (!forceTypeClass) {
                forceTypeClass = Number;
            }
            var result = source.concat();
            var stringArray = content.split(separator);
            var _local_8 = Math.min(result.length, stringArray.length);
            index = 0;
            while (index < _local_8) {
                value = stringArray[index];
                result[index] = forceTypeClass((value == "true") ? true : (value == "false" ? false : value));
                index++;
            }
            return result;
        };
        /**
         * 字符串解析为数组(按"&","|",",",":"顺序来分隔)
         * @param value
         * @return
         */
        ArrayUtil.parseString = function (value) {
            var ary = [];
            if (value) {
                var temp1 = value.split("&");
                var len = temp1.length;
                for (var i = 0; i < len; i++) {
                    var str = temp1[i];
                    if (str.indexOf("|") >= 0) {
                        var temp2 = str.split("|");
                        var n = utils.MathUtil.randRange(0, temp2.length - 1);
                        str = temp2[n];
                    }
                    temp2 = str.split(",");
                    for (var _i = 0, temp2_1 = temp2; _i < temp2_1.length; _i++) {
                        var item = temp2_1[_i];
                        ary.push(item.split(":"));
                    }
                }
            }
            for (var _a = 0, ary_1 = ary; _a < ary_1.length; _a++) {
                var item2 = ary_1[_a];
                len = item2.length;
                for (i = 0; i < len; i++) {
                    item2[i] = parseInt(item2[i]);
                }
            }
            return ary;
        };
        return ArrayUtil;
    }());
    utils.ArrayUtil = ArrayUtil;
    __reflect(ArrayUtil.prototype, "utils.ArrayUtil");
})(utils || (utils = {}));
var utils;
(function (utils) {
    var BezierUtil = (function () {
        function BezierUtil() {
        }
        /**
         * 二次贝塞尔曲线
         * @param ratio 比率因子 0 - 1 之间的值
         * @param sx 开始X坐标
         * @param sy 开始坐标
         * @param cx 控制点X坐标
         * @param cy 控制点Y坐标
         * @param ex 结束X坐标
         * @param ey 结束Y坐标
         */
        BezierUtil.quadratic = function (ratio, sx, sy, cx, cy, ex, ey, cache) {
            cache = cache ? cache : (new egret.Point());
            cache.setTo(this.quadraticX(ratio, sx, cx, ex), this.quadraticY(ratio, sy, cy, ey));
            return cache;
        };
        BezierUtil.quadraticX = function (ratio, sx, cx, ex) {
            return Math.pow((1 - ratio), 2) * sx + 2 * ratio * (1 - ratio) * cx + Math.pow(ratio, 2) * ex;
        };
        BezierUtil.quadraticY = function (ratio, sy, cy, ey) {
            return Math.pow((1 - ratio), 2) * sy + 2 * ratio * (1 - ratio) * cy + Math.pow(ratio, 2) * ey;
        };
        /**
         * 三次贝塞尔曲线
         * @param ratio 比率因子 0 - 1 之间的值
         * @param sx 开始X坐标
         * @param sy 开始坐标
         * @param c1x 控制1点X坐标
         * @param c1y 控制1点Y坐标
         * @param c2x 控制2点X坐标
         * @param c2y 控制2点Y坐标
         * @param ex 结束X坐标
         * @param ey 结束Y坐标
         */
        BezierUtil.cubic = function (ratio, sx, sy, c1x, c1y, c2x, c2y, ex, ey, cache) {
            cache = cache ? cache : (new egret.Point());
            cache.setTo(this.cubicX(ratio, sx, c1x, c2x, ex), this.cubicY(ratio, sy, c1y, c2y, ey));
            return cache;
        };
        BezierUtil.cubicX = function (ratio, sx, c1x, c2x, ex) {
            return Math.pow((1 - ratio), 3) * sx + 3 * c1x * ratio * (1 - ratio) * (1 - ratio) + 3 * c2x * ratio * ratio * (1 - ratio) + ex * Math.pow(ratio, 3);
        };
        BezierUtil.cubicY = function (ratio, sy, c1y, c2y, ey) {
            return Math.pow((1 - ratio), 3) * sy + 3 * c1y * ratio * (1 - ratio) * (1 - ratio) + 3 * c2y * ratio * ratio * (1 - ratio) + ey * Math.pow(ratio, 3);
        };
        return BezierUtil;
    }());
    utils.BezierUtil = BezierUtil;
    __reflect(BezierUtil.prototype, "utils.BezierUtil");
})(utils || (utils = {}));
///////////////////////////////////
// -------------------------------
// @author:Kevin.Chen
// @date:2016-5-17下午3:03:35
// @email:kevin-chen@foxmail.com
// -------------------------------
///////////////////////////////////
var utils;
(function (utils) {
    var ColorUtil = (function () {
        function ColorUtil() {
        }
        /**
         * 颜色变亮
         * @return
         *
         */
        ColorUtil.toBright = function (color, brightOff) {
            if (brightOff === void 0) { brightOff = 0x66; }
            var list = this.extract(color);
            return this.merge(list[0] + brightOff, list[1] + brightOff, list[2] + brightOff);
        };
        /**
         * 颜色变暗
         * @return
         *
         */
        ColorUtil.toDark = function (color, darkOff) {
            if (darkOff === void 0) { darkOff = 0x66; }
            var list = this.extract(color);
            return this.merge(list[0] - darkOff, list[1] - darkOff, list[2] - darkOff);
        };
        /**
         * 从颜色值中提取三原色
         * @param color
         * @return
         *
         */
        ColorUtil.extract = function (color) {
            //			var R:number=color>>16;
            //			var G:number=(color>>8)-(R<<8);
            //			var B:number=color-(R<<16)-(G<<8);
            var R = color >> 16;
            var G = (color >> 8) & 0x00FF;
            var B = color << 24 >> 24;
            return [R, G, B];
        };
        /**
         * 将三原色合并
         * @param r
         * @param g
         * @param b
         * @return
         */
        ColorUtil.merge = function (r, g, b) {
            //return (r<<16)+(g<<8)+b;
            if (r > 0xFF)
                r = 0xFF;
            if (g > 0xFF)
                g = 0xFF;
            if (b > 0xFF)
                b = 0xFF;
            if (r < 0)
                r = 0;
            if (g < 0)
                g = 0;
            if (b < 0)
                b = 0;
            return r << 16 | (g << 8) | b;
        };
        /**
         * 从32位颜色值中提取三原色
         * @param color
         * @return
         *
         */
        ColorUtil.extract32 = function (color) {
            var A = color >> 24 & 0xFF;
            var R = color >> 16 & 0xFF << 8 >> 8;
            var G = (color >> 8) & 0x00FF;
            var B = color << 24 >> 24;
            return [A, R, G, B];
        };
        /**
         * 将带有通道信息的三原色合并
         * @param r
         * @param g
         * @param b
         * @return
         */
        ColorUtil.merge32 = function (a, r, g, b) {
            if (a > 0xFF)
                a = 0xFF;
            if (r > 0xFF)
                r = 0xFF;
            if (g > 0xFF)
                g = 0xFF;
            if (b > 0xFF)
                b = 0xFF;
            if (a < 0)
                a = 0;
            if (r < 0)
                r = 0;
            if (g < 0)
                g = 0;
            if (b < 0)
                b = 0;
            return (a << 24) | (r << 16) | (g << 8) | b;
        };
        /**
         * 颜色相加
         * @param color
         * @param arg 其他颜色
         * @return
         */
        ColorUtil.add = function (color) {
            var colors = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                colors[_i - 1] = arguments[_i];
            }
            var list = null;
            list = this.extract(color);
            var R = list[0];
            var G = list[1];
            var B = list[2];
            for (var _a = 0, colors_1 = colors; _a < colors_1.length; _a++) {
                var temColor = colors_1[_a];
                list = this.extract(temColor);
                R += list[0];
                G += list[1];
                B += list[2];
            }
            return this.merge(R, G, B);
        };
        /**
         * 颜色相减
         * @param color
         * @param other
         * @return
         */
        ColorUtil.sub = function (color) {
            var colors = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                colors[_i - 1] = arguments[_i];
            }
            var list = null;
            list = this.extract(color);
            var R = list[0];
            var G = list[1];
            var B = list[2];
            for (var _a = 0, colors_2 = colors; _a < colors_2.length; _a++) {
                var temColor = colors_2[_a];
                list = this.extract(temColor);
                R -= list[0];
                G -= list[1];
                B -= list[2];
            }
            return this.merge(R, G, B);
        };
        /**
         * 从32位颜色中提取透明通道的值
         * @param color
         * @return
         */
        ColorUtil.extractAlphaFrom32 = function (color) {
            return color >> 24;
        };
        return ColorUtil;
    }());
    utils.ColorUtil = ColorUtil;
    __reflect(ColorUtil.prototype, "utils.ColorUtil");
})(utils || (utils = {}));
///////////////////////////////////
// -------------------------------
// @author:Kevin.Chen
// @date:2016-5-17下午3:03:35
// @email:kevin-chen@foxmail.com
// -------------------------------
///////////////////////////////////
var utils;
(function (utils) {
    var DateUtil = (function () {
        function DateUtil() {
        }
        /**
         * 格式化成显示的字符串
         * @param dateString 形式如 2017-06-02T04:04:49.129Z
         * @return
         */
        DateUtil.formateToString = function (dateObject) {
            if (typeof dateObject == 'string') {
                //2017-06-02T04:04:49.129Z
                var result = dateObject.replace(/T/, " ");
                return result.substring(0, result.lastIndexOf("."));
            }
            else if (typeof dateObject == 'number') {
                return this.formatDateFromSeconds((dateObject / 1000) >> 0);
            }
            return undefined;
        };
        /**
         * 前位补0 (例:digit(2,10)="02",digit(13,1000)="0013")
         * @param value
         * @param digit 需要补全的位数，默认为2位数
         * @return
         */
        DateUtil.addZero = function (value, digit) {
            if (digit === void 0) { digit = 10; }
            return (value < digit ? "0" : "") + value;
        };
        /**
         * 将日期转换为文本表现形式
         * @param target 目标日期
         * @param excludedDetail 是否排除 小时及以下的细节时间内容
         * @param dateSeparator 日期分隔符
         * @param timeSeparator 时间分隔符
         * @return 结果
         *
         */
        DateUtil.formatDate = function (target, excludedDetail, dateSeparator, timeSeparator) {
            if (excludedDetail === void 0) { excludedDetail = false; }
            if (dateSeparator === void 0) { dateSeparator = "-"; }
            if (timeSeparator === void 0) { timeSeparator = ":"; }
            var fullyear = this.addZero(this.UTCEnabled ? target.getUTCFullYear() : target.getFullYear());
            var month = this.addZero((this.UTCEnabled ? target.getUTCMonth() : target.getMonth()) + 1);
            var date = this.addZero(this.UTCEnabled ? target.getUTCDate() : target.getDate());
            var hours = this.addZero(this.UTCEnabled ? target.getUTCHours() : target.getHours());
            var minutes = this.addZero(this.UTCEnabled ? target.getUTCMinutes() : target.getMinutes());
            var seconds = this.addZero(this.UTCEnabled ? target.getUTCSeconds() : target.getSeconds());
            var result = "";
            result = result + fullyear + dateSeparator + month + dateSeparator + date;
            if (!excludedDetail) {
                result = result + " " + hours + timeSeparator + minutes + timeSeparator + seconds;
            }
            return result;
        };
        /**
         * 传递总秒数 格式化日期
         * @param seconds 总秒数
         * @param excludedDetail 是否排除 小时及以下的细节时间内容
         * @param dateSeparator 日期分隔符
         * @param timeSeparator 时间分隔符
         * @return
         *
         */
        DateUtil.formatDateFromSeconds = function (seconds, excludedDetail, dateSeparator, timeSeparator) {
            if (excludedDetail === void 0) { excludedDetail = false; }
            if (dateSeparator === void 0) { dateSeparator = "-"; }
            if (timeSeparator === void 0) { timeSeparator = ":"; }
            return this.formatDateFromMilliseconds(seconds * 1000, excludedDetail, dateSeparator, timeSeparator);
        };
        DateUtil.formatDateFromMilliseconds = function (milliseconds, excludedDetail, dateSeparator, timeSeparator) {
            if (excludedDetail === void 0) { excludedDetail = false; }
            if (dateSeparator === void 0) { dateSeparator = "-"; }
            if (timeSeparator === void 0) { timeSeparator = ":"; }
            return this.formatDate(new Date(milliseconds), excludedDetail, dateSeparator, timeSeparator);
        };
        /**
         * 传递总秒数 格式化时间
         * @param value 总秒数
         * @param timeSeparator 时间分隔符
         * @return
         */
        DateUtil.formatTimeFromSeconds = function (seconds, timeSeparator, fix) {
            if (timeSeparator === void 0) { timeSeparator = ":"; }
            if (fix === void 0) { fix = true; }
            return this.formatTimeFromMilliseconds(seconds * 1000, timeSeparator, fix);
        };
        DateUtil.formatTimeFromMilliseconds = function (milliseconds, timeSeparator, fix) {
            if (timeSeparator === void 0) { timeSeparator = ":"; }
            if (fix === void 0) { fix = true; }
            var date = new Date(milliseconds);
            var hoursString = this.addZero(this.UTCEnabled ? date.getUTCHours() : date.getHours());
            var minutesString = this.addZero(this.UTCEnabled ? date.getUTCMinutes() : date.getMinutes());
            var secondsString = this.addZero(this.UTCEnabled ? date.getUTCSeconds() : date.getSeconds());
            if (!fix || hoursString) {
                return hoursString + timeSeparator + minutesString + timeSeparator + secondsString;
            }
            return minutesString + timeSeparator + secondsString;
        };
        /**
         * 用中文格式化日期
         * @param target 目标日期
         * @param excludedDetail 是否排除 小时及以下的细节时间内容
         * @return
         */
        DateUtil.formatDateInChinese = function (target, excludedDetail) {
            if (excludedDetail === void 0) { excludedDetail = false; }
            var year = this.UTCEnabled ? target.getUTCFullYear() : target.getFullYear();
            var month = (this.UTCEnabled ? target.getUTCMonth() : target.getMonth()) + 1;
            var date = this.UTCEnabled ? target.getUTCDate() : target.getDate();
            var hoursString = this.addZero(this.UTCEnabled ? target.getUTCHours() : target.getHours());
            var minutesString = this.addZero(this.UTCEnabled ? target.getUTCMinutes() : target.getMinutes());
            var secondsString = this.addZero(this.UTCEnabled ? target.getUTCSeconds() : target.getSeconds());
            var result = year + this.date_year + month + this.date_month + date + this.date_day;
            if (!excludedDetail) {
                result = result + " " + hoursString + ":" + minutesString + ":" + secondsString;
            }
            return result;
        };
        /**
         * 传入秒数用中文格式化日期
         * @param seconds 总秒数
         * @param excludedDetail 是否排除 小时及以下的细节时间内容
         * @return
         *
         */
        DateUtil.formatDateFromSecondsInChinese = function (seconds, excludedDetail) {
            if (excludedDetail === void 0) { excludedDetail = false; }
            return this.formatDateInChinese(new Date(seconds * 1000), excludedDetail);
        };
        /**
         * 格式化时间 (形如:06:34:56)
         * @param seconds
         * @param separator
         * @return
         *
         */
        DateUtil.formatTimeLeft = function (seconds, separator, fix) {
            if (separator === void 0) { separator = ":"; }
            if (fix === void 0) { fix = true; }
            var time = seconds;
            var hours = time / 3600 >> 0;
            var hoursString = this.addZero(hours);
            time = (time % 3600);
            var minutes = this.addZero(time / 60 >> 0);
            time = (time % 60);
            var second = this.addZero(time);
            if (fix || hours) {
                return hoursString + separator + minutes + separator + second;
            }
            return minutes + separator + second;
        };
        /**
         * 格式化时间用中文  (形如:1天4小时36分3秒)
         * @param seconds 总秒数
         * @param hasDay 是否含有天数
         * @param hasHour 是否含有小时数
         * @param hasMinutes 是否含有 分钟数
         * @param hasSecond 是否含有秒数
         * @param returnMax 是否只返回最大单位
         * @return
         */
        DateUtil.formatTimeLeftInChinese = function (seconds, hasDay, hasHour, hasMinutes, hasSecond, returnMax) {
            if (hasDay === void 0) { hasDay = true; }
            if (hasHour === void 0) { hasHour = true; }
            if (hasMinutes === void 0) { hasMinutes = true; }
            if (hasSecond === void 0) { hasSecond = true; }
            if (returnMax === void 0) { returnMax = false; }
            var time = seconds;
            if (time <= 0)
                return "";
            var day = time / 86400 >> 0;
            time = time % 86400;
            var hours = time / 3600 >> 0;
            time = time % 3600;
            var minutes = time / 60 >> 0;
            time = time % 60;
            var second = time;
            var result = "";
            if (hasDay && (day > 0)) {
                result = result + day + this.time_day;
                if (returnMax)
                    return result;
            }
            if (hasHour && (hours > 0)) {
                result = result + hours + this.time_hour;
                if (returnMax)
                    return result;
            }
            if (((hasMinutes) && ((minutes > 0)))) {
                result = result + minutes + this.time_minute;
                if (returnMax)
                    return result;
            }
            if (((hasSecond) && ((second > 0)))) {
                result = result + second + this.time_second;
                if (returnMax)
                    return result;
            }
            return result;
        };
        DateUtil.getZeroTime = function (seconds) {
            var date = new Date(seconds * 1000);
            return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() * 0.001;
        };
        /**
         * 格式化时间
         * @param seconds 给定秒数
         * @param format 格式
         * @return
         *
         */
        DateUtil.formatTime = function (seconds, format) {
            if (format === void 0) { format = "YYYY-MM-DD hh:mm:ss"; }
            format = format || "YYYY-MM-DD hh:mm:ss";
            this.tempDate = new Date(seconds * 1000);
            return format.replace(/YYYY|EMM|EM|MM|DD|hh|mm|ss|EWW|EW|CW|CYYYY|CMM|CDD|Chh|Cmm|Css/g, this.matchTime);
        };
        /**
         * 保留给定长度的，不足补0
         * @param value 给定值
         * @param len 长度
         * @return string
         *
         */
        DateUtil.uintToFixed = function (value, len) {
            var index;
            len = len || 1;
            this.tempZeros.length = 0;
            index = 0;
            while (index < len) {
                this.tempZeros[index] = 0;
                index++;
            }
            return (this.tempZeros.join("") + value.toString()).slice(-len);
        };
        /**
         * 输出一种匹配的日期/时间格式
         * @param _args
         * @return
         */
        DateUtil.matchTime = function (type) {
            var result = "";
            switch (type) {
                case "YYYY":
                    result = (this.UTCEnabled ? this.tempDate.getUTCFullYear() : this.tempDate.getFullYear()).toString();
                    break;
                case "EMM":
                    result = this.month1[this.UTCEnabled ? this.tempDate.getUTCMonth() : this.tempDate.getMonth()];
                    break;
                case "EM":
                    result = this.month2[this.UTCEnabled ? this.tempDate.getUTCMonth() : this.tempDate.getMonth()];
                    break;
                case "MM":
                    result = this.uintToFixed(((this.UTCEnabled ? this.tempDate.getUTCMonth() : this.tempDate.getMonth()) + 1), 2);
                    break;
                case "DD":
                    result = this.uintToFixed(this.UTCEnabled ? this.tempDate.getUTCDate() : this.tempDate.getDate(), 2);
                    break;
                case "hh":
                    result = this.uintToFixed(this.UTCEnabled ? this.tempDate.getUTCHours() : this.tempDate.getHours(), 2);
                    break;
                case "mm":
                    result = this.uintToFixed(this.UTCEnabled ? this.tempDate.getUTCMinutes() : this.tempDate.getMinutes(), 2);
                    break;
                case "ss":
                    result = this.uintToFixed(this.UTCEnabled ? this.tempDate.getUTCSeconds() : this.tempDate.getSeconds(), 2);
                    break;
                case "EWW":
                    result = this.week1[this.UTCEnabled ? this.tempDate.getUTCDay() : this.tempDate.getDay()];
                    break;
                case "EW":
                    result = this.week2[this.UTCEnabled ? this.tempDate.getUTCDay() : this.tempDate.getDay()];
                    break;
                case "CW":
                    result = this.week3[this.UTCEnabled ? this.tempDate.getUTCDay() : this.tempDate.getDay()];
                    break;
                case "CYYYY":
                    result = (this.UTCEnabled ? this.tempDate.getUTCFullYear() : this.tempDate.getUTCFullYear()) + this.date_year;
                    break;
                case "CMM":
                    result = this.uintToFixed(((this.UTCEnabled ? this.tempDate.getUTCMonth() : this.tempDate.getUTCMonth()) + 1), 2) + this.date_month;
                    break;
                case "CDD":
                    result = this.uintToFixed(this.UTCEnabled ? this.tempDate.getUTCDate() : this.tempDate.getUTCDate(), 2) + this.date_day;
                    break;
                case "Chh":
                    result = this.uintToFixed(this.UTCEnabled ? this.tempDate.getUTCHours() : this.tempDate.getUTCHours(), 2) + this.date_hour;
                    break;
                case "Cmm":
                    result = this.uintToFixed(this.UTCEnabled ? this.tempDate.getUTCMinutes() : this.tempDate.getUTCMinutes(), 2) + this.date_minute;
                    break;
                case "Css":
                    result = this.uintToFixed(this.UTCEnabled ? this.tempDate.getUTCSeconds() : this.tempDate.getUTCSeconds(), 2) + this.date_second;
            }
            return result;
        };
        /**
         * 获得离线时间状态
         * @param offlineSpan
         * @return
         *
         */
        DateUtil.getOffLineTimeState = function (offlineSpan) {
            var day = (offlineSpan / 86400);
            var str = "";
            if (day > 180) {
                str = "半年前";
            }
            else if (day > 90) {
                str = "三个月前";
            }
            else if (day > 60) {
                str = "两个月前";
            }
            else if (day > 30) {
                str = "一个月前";
            }
            else if (day > 14) {
                str = "两周前";
            }
            else if (day > 7) {
                str = "一周前";
            }
            else if (day > 2) {
                str = day + "天前";
            }
            else if (offlineSpan < 60) {
                str = "小于一分钟";
            }
            else {
                str = this.formatTimeLeftInChinese(offlineSpan, true, true, true, false);
            }
            return str;
        };
        DateUtil.UTCEnabled = false;
        DateUtil.date_year = "年";
        DateUtil.date_month = "月";
        DateUtil.date_day = "日";
        DateUtil.date_hour = "时";
        DateUtil.date_minute = "分";
        DateUtil.date_second = "秒";
        DateUtil.time_day = "天";
        DateUtil.time_hour = "小时";
        DateUtil.time_minute = "分钟";
        DateUtil.time_second = "秒";
        DateUtil.tempZeros = [];
        DateUtil.week1 = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        DateUtil.week2 = ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."];
        DateUtil.week3 = ["日", "一", "二", "三", "四", "五", "六"];
        DateUtil.month1 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        DateUtil.month2 = ["Jan.", "Feb.", "Mar.", "Apr.", "Ma.", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."];
        return DateUtil;
    }());
    utils.DateUtil = DateUtil;
    __reflect(DateUtil.prototype, "utils.DateUtil");
})(utils || (utils = {}));
///////////////////////////////////
// -------------------------------
// @author:Kevin.Chen
// @date:2016-5-17下午3:03:35
// @email:kevin-chen@foxmail.com
// -------------------------------
///////////////////////////////////
var utils;
(function (utils) {
    var DisplayUtil = (function () {
        function DisplayUtil() {
        }
        DisplayUtil.gray = function (target, isGray) {
            if (isGray === void 0) { isGray = true; }
            if (isGray) {
                this.addFilter(target, this.GRAY_FILTER);
            }
            else {
                this.removeFilter(target, egret.ColorMatrixFilter);
            }
        };
        /**
         * 获取该颜色的矩阵
         * @param color
         * @param alpha
         * @return
         */
        DisplayUtil.getColorFilter = function (color, alpha) {
            var list = utils.ColorUtil.extract(color);
            var r = list[0];
            var g = list[1];
            var b = list[2];
            return this.getColorMatrixFilter(r, g, b, alpha);
        };
        /**
         * 获取该颜色的矩阵
         * @param r
         * @param g
         * @param b
         * @param alpha
         * @return
         */
        DisplayUtil.getColorMatrixFilter = function (r, g, b, alpha) {
            this.gMatrixArray = [alpha, 0, 0, 0, r, 0, alpha, 0, 0, g, 0, 0, alpha, 0, b, 0, 0, 0, 1, 0];
            return new egret.ColorMatrixFilter(this.gMatrixArray);
        };
        /**
         * 移除
         * @param parent
         * @param child
         * @param dispose
         */
        DisplayUtil.removeChild = function (parent, child, dispose) {
            if (dispose === void 0) { dispose = false; }
            if (!(parent == null) && !(child == null)) {
                if (parent.contains(child)) {
                    parent.removeChild(child);
                    if (dispose) {
                        if (!!child["destroy"]) {
                            child["destroy"]();
                        }
                        else if (!!child["dispose"]) {
                            child["dispose"]();
                        }
                    }
                }
            }
        };
        /**
         * 移除所有子项
         * @param container
         * @param dispose
         *
         */
        DisplayUtil.removeAllChildren = function (container, dispose) {
            if (dispose === void 0) { dispose = false; }
            var total;
            if (container != null) {
                total = container.numChildren - 1;
                while (total > -1) {
                    this.removeChild(container, container.getChildAt(total), dispose);
                    total--;
                }
            }
        };
        /**
         * 居中
         * @param target
         * @param offsetX
         * @param offsetY
         *
         */
        DisplayUtil.center = function (target, offsetX, offsetY) {
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            var tx = ((target.stage.stageWidth - target.width) * 0.5);
            var ty = ((target.stage.stageHeight - target.height) * 0.5);
            tx += offsetX;
            ty += offsetY;
            target.x = tx;
            target.y = ty;
        };
        /**
         * 相对于父级居中
         * @param target
         * @param offsetX
         * @param offsetY
         *
         */
        DisplayUtil.centerToParent = function (target, offsetX, offsetY) {
            if (offsetX === void 0) { offsetX = 0; }
            if (offsetY === void 0) { offsetY = 0; }
            var tx;
            var ty;
            var parent = target.parent;
            if (parent != null) {
                tx = ((parent.width - target.width) * 0.5);
                ty = ((parent.height - target.height) * 0.5);
                tx += offsetX;
                ty += offsetY;
                target.x = tx;
                target.y = ty;
            }
        };
        /**
         * 添加滤镜
         * @param target
         * @param filter
         *
         */
        DisplayUtil.addFilter = function (target, filter) {
            var filters = target.filters || [];
            filters.push(filter);
            target.filters = filters;
        };
        /**
         * 移除滤镜
         * @param target
         * @param filterType
         */
        DisplayUtil.removeFilter = function (target, filterClass, property, propertyValue) {
            if (property === void 0) { property = null; }
            if (propertyValue === void 0) { propertyValue = null; }
            var filter = null;
            var index;
            var filters = target.filters;
            if (!filters)
                return;
            var total = filters.length;
            if (total > 0) {
                index = (total - 1);
                while (index >= 0) {
                    filter = filters[index];
                    if (filter instanceof filterClass) {
                        if ((!!property && !!propertyValue && !!filter[property] && filter[property] == propertyValue) || !property) {
                            filters.splice(index, 1);
                        }
                    }
                    index--;
                }
                target.filters = filters;
            }
        };
        DisplayUtil.getFilter = function (target, filterClass) {
            var filter = null;
            var index;
            var filters = target.filters;
            var total = filters.length;
            if (total > 0) {
                index = (total - 1);
                while (index >= 0) {
                    filter = filters[index];
                    if (filter instanceof filterClass) {
                        return filter;
                    }
                    index--;
                }
            }
            return null;
        };
        //黑白颜色矩阵
        DisplayUtil.GRAY_FILTER = new egret.ColorMatrixFilter([
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0
        ]);
        //黑白颜色矩阵
        DisplayUtil.BLACK_FILTER = new egret.ColorMatrixFilter([
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0
        ]);
        //高亮
        DisplayUtil.HIGHT_LIGHT_FILTER = new egret.ColorMatrixFilter([1, 0, 0, 0, 128, 0, 1, 0, 0, 128, 0, 0, 1, 0, 128, 0, 0, 0, 1, 0]);
        //黑白颜色矩阵
        DisplayUtil.SHADOW_FILTER = new egret.GlowFilter(0x0, 4, 3, 3);
        DisplayUtil.gMatrixArray = [];
        DisplayUtil.gMatrix = new egret.Matrix();
        DisplayUtil.gRect = new egret.Rectangle();
        DisplayUtil.gPoint = new egret.Point();
        return DisplayUtil;
    }());
    utils.DisplayUtil = DisplayUtil;
    __reflect(DisplayUtil.prototype, "utils.DisplayUtil");
})(utils || (utils = {}));
///////////////////////////////////
// -------------------------------
// @author:Kevin.Chen
// @date:2016-5-17下午3:03:35
// @email:kevin-chen@foxmail.com
///////////////////////////////////
var game;
(function (game) {
    /**
     * <code>Vector2D</code>类向量类
     * <p>
     * <code>Vector2D</code>类用于向量计算
     * </p>
     * <p><b>注意: </b>本类不同于Point类</p>
     * <b>你还可以查看</b>
     * @see Point
     * @since ButterFlyEngine 杭州智玩科技   陈南    邮箱:kevin-chen[at]foxmail.com
     * @author Kevin.Chen
     * @date 2016-5-20
     **/
    var Vector2D = (function () {
        function Vector2D(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this._x = 0;
            this._y = 0;
            this._x = x;
            this._y = y;
        }
        /**转为字符串输出**/
        Vector2D.prototype.toString = function () {
            var rx = Math.round(this._x * 1000) / 1000;
            var ry = Math.round(this._y * 1000) / 1000;
            return ("[" + rx + ", " + ry + "]");
        };
        /**重设向量**/
        Vector2D.prototype.reset = function (x, y) {
            this._x = x;
            this._y = y;
        };
        /**拷贝向量**/
        Vector2D.prototype.copy = function (v) {
            this._x = v.x;
            this._y = v.y;
        };
        Object.defineProperty(Vector2D.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (v) {
                this._y = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Vector2D.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (v) {
                this._x = v;
            },
            enumerable: true,
            configurable: true
        });
        /**克隆向量**/
        Vector2D.prototype.clone = function () {
            return new Vector2D(this._x, this._y);
        };
        /**比较向量是否相等**/
        Vector2D.prototype.equals = function (v) {
            return (this._x == v._x && this._y == v._y);
        };
        /**向量求逆**/
        Vector2D.prototype.negate = function () {
            this._x = -this._x;
            this._y = -this._y;
        };
        /**向量求逆(返回新对象)**/
        Vector2D.prototype.negateNew = function (v) {
            return new Vector2D(-this._x, -this._y);
        };
        /**向量缩放 (当前向量)**/
        Vector2D.prototype.scale = function (s) {
            this._x *= s;
            this._y *= s;
        };
        /**向量缩放 (返回新对象)**/
        Vector2D.prototype.scaleNew = function (s) {
            return new Vector2D(this._x * s, this._y * s);
        };
        /**设置向量的模(即大小)（方式2）**/
        Vector2D.prototype.setLength2 = function (len) {
            var r = this.getLength();
            if (r) {
                this.scale(len / r);
            }
            else {
                this._x = len;
            }
        };
        /**设置向量的模(即大小)（方式1）**/
        Vector2D.prototype.setLength = function (value) {
            var a = this.getAngleR();
            this._x = Math.cos(a) * value;
            this._y = Math.sin(a) * value;
        };
        /**获得向量的角度**/
        Vector2D.prototype.getAngle = function () {
            return Vector2D.atan2D(this._y, this._x);
        };
        /**获得向量的角度(弧度)**/
        Vector2D.prototype.getAngleR = function () {
            return Math.atan2(this._y, this._x);
        };
        /**设置向量的角度(传入角度) **/
        Vector2D.prototype.setAngle = function (angle) {
            var r = this.getLength();
            this._x = r * Vector2D.cosD(angle);
            this._y = r * Vector2D.sinD(angle);
        };
        /**设置向量的角度(传入弧度)**/
        Vector2D.prototype.setAngleR = function (value) {
            var len = this.getLength();
            this._x = Math.cos(value) * len;
            this._y = Math.sin(value) * len;
        };
        /**获取向量大小的平方**/
        Vector2D.prototype.getLengthSQ = function () {
            return this._x * this._x + this._y * this._y;
        };
        /**获取向量的模(即大小)(经典的勾股定理)**/
        Vector2D.prototype.getLength = function () {
            return Math.sqrt(this.getLengthSQ());
        };
        /**向量旋转**/
        Vector2D.prototype.rotate = function (angle) {
            var ca = Vector2D.cosD(angle);
            var sa = Vector2D.sinD(angle);
            var rx = this._x * ca - this._y * sa;
            var ry = this._x * sa + this._y * ca;
            this._x = rx;
            this._y = ry;
        };
        /**向量旋转(返回新对象)**/
        Vector2D.prototype.rotateNew = function (angle) {
            var v = new Vector2D(this._x, this._y);
            v.rotate(angle);
            return v;
        };
        /**点积**/
        Vector2D.prototype.dot = function (v) {
            return (this._x * v._x + this._y * v._y);
        };
        /**法向量，刚体碰撞的基础公式**/
        Vector2D.prototype.getNormal = function () {
            return new Vector2D(-this._y, this._x);
        };
        /**垂直验证**/
        Vector2D.prototype.isPerpTo = function (v) {
            return this.dot(v) == 0;
        };
        /**向量的夹角**/
        Vector2D.prototype.angleBetween = function (v) {
            var dp = this.dot(v);
            var cosAngle = dp / (this.getLength() * v.getLength());
            return Vector2D.acosD(cosAngle);
        };
        /**位置归零**/
        Vector2D.prototype.zero = function () {
            this._x = 0;
            this._y = 0;
            return this;
        };
        /**是否在零位置**/
        Vector2D.prototype.isZero = function () {
            return this._x == 0 && this._y == 0;
        };
        /**截断向量(设置向量模最大值)**/
        Vector2D.prototype.truncate = function (max) {
            this.setLength(Math.min(max, this.getLength()));
            return this;
        };
        /**交换x,y坐标**/
        Vector2D.prototype.reverse = function () {
            this._x = -this._x;
            this._y = -this._y;
            return this;
        };
        /**向量加法(返回新对象)**/
        Vector2D.prototype.plus = function (v) {
            this._x += v._x;
            this._y += v._y;
        };
        /**向量加法(返回新对象)**/
        Vector2D.prototype.plusNew = function (v) {
            return new Vector2D(this._x + v._x, this._y + v._y);
        };
        /**向量减法**/
        Vector2D.prototype.subtract = function (v) {
            this._x -= v._x;
            this._y -= v._y;
        };
        /**向量减法(返回新对象)**/
        Vector2D.prototype.subtractNew = function (v) {
            return new Vector2D(this._x - v._x, this._y - v._y);
        };
        /**向量模的乘法运算**/
        Vector2D.prototype.multiply = function (value) {
            this._x *= value;
            this._y *= value;
        };
        /**向量模的乘法运算**/
        Vector2D.prototype.multiplyNew = function (value) {
            return new Vector2D(this._x * value, this._y * value);
        };
        /**向量模的除法运算**/
        Vector2D.prototype.divide = function (value) {
            this._x /= value;
            this._y /= value;
        };
        /**向量模的除法运算**/
        Vector2D.prototype.divideNew = function (value) {
            return new Vector2D(this._x / value, this._y / value);
        };
        /**单位化向量(即设置向量的模为1，不过这里用了一种更有效率的除法运算，从而避免了lengh=1带来的三角函数运算)**/
        Vector2D.prototype.normalize = function () {
            var len = this.getLength();
            if (len == 0) {
                this._x = 1;
                return this;
            }
            //建议大家画一个基本的3,4,5勾股定理的直角三角形即可明白下面的代码
            this._x /= len;
            this._y /= len;
            return this;
        };
        /**判定向量是否为单位向量**/
        Vector2D.prototype.isNormalized = function () {
            return this.getLength() == 1.0;
        };
        /**点乘(即向量的点积)**/
        Vector2D.prototype.dotProd = function (v2) {
            return this._x * v2._x + this._y * v2._y;
        };
        /**叉乘(即向量的矢量积)**/
        Vector2D.prototype.crossProd = function (v2) {
            return this._x * v2._y - this._y * v2._x;
        };
        /**返回二个向量之间的夹角**/
        Vector2D.angleBetween = function (v1, v2) {
            if (!v1.isNormalized()) {
                v1 = v1.clone().normalize();
            }
            if (!v2.isNormalized()) {
                v2 = v2.clone().normalize();
            }
            return Math.acos(v1.dotProd(v2)); //建议先回顾一下http://www.cnblogs.com/yjmyzz/archive/2010/06/06/1752674.html中提到的到夹角公式
        };
        /**判定给定的向量是否在本向量的左侧或右侧，左侧返回-1，右侧返回1**/
        Vector2D.prototype.sign = function (v2) {
            return this.perp.dotProd(v2) < 0 ? -1 : 1;
        };
        Object.defineProperty(Vector2D.prototype, "perp", {
            /**返回与本向量垂直的向量(即自身顺时针旋转90度，得到一个新向量)**/
            get: function () {
                return new Vector2D(-this._y, this._x); //建议回顾一下"坐标旋转"
            },
            enumerable: true,
            configurable: true
        });
        /**返回二个矢量末端顶点之间的距离平方**/
        Vector2D.prototype.distSQ = function (v2) {
            var dx = v2._x - this._x;
            var dy = v2._y - this._y;
            return dx * dx + dy * dy;
        };
        /**返回二个矢量末端顶点之间的距离**/
        Vector2D.prototype.dist = function (v2) {
            return Math.sqrt(this.distSQ(v2));
        };
        /////////////////////////////////////////////
        //
        // static
        //
        /////////////////////////////////////////////
        /**
         * 改造SIN方法 （直接传入角度，改造前传入的是弧度）
         * @param angle 角度
         * @return
         */
        Vector2D.sinD = function (angle) {
            return Math.sin(angle * Math.PI / 180);
        };
        /**
         * 改造COS方法 （直接传入角度，改造前传入的是弧度）
         * @param angle 角度
         * @return
         */
        Vector2D.cosD = function (angle) {
            return Math.cos(angle * Math.PI / 180);
        };
        /**
         * 改造反余弦acos方法 （直接传入角度，改造前传入的是弧度）
         * @param angle 角度
         * @return
         */
        Vector2D.acosD = function (angle) {
            return Math.acos(angle) * 180 / Math.PI;
        };
        /**
         * 直接算角度的方法 （直接返回角度，改造前返回的是弧度）
         * @param y
         * @param x
         * @return 角度
         */
        Vector2D.atan2D = function (y, x) {
            var angle = Math.atan2(-y, x) * (180 / Math.PI);
            angle *= -1;
            return this.validAngle(angle);
        };
        /**
         * 将角度固定在360度内
         * @param angle
         * @return
         */
        Vector2D.validAngle = function (angle) {
            angle %= 360;
            if (angle < 0) {
                return angle + 360;
            }
            else {
                return angle;
            }
        };
        return Vector2D;
    }());
    game.Vector2D = Vector2D;
    __reflect(Vector2D.prototype, "game.Vector2D");
})(game || (game = {}));
///////////////////////////////////
// -------------------------------
// @author:Kevin.Chen
// @date:2016-5-17下午3:03:35
// @email:kevin-chen@foxmail.com
// -------------------------------
///////////////////////////////////
var utils;
(function (utils) {
    var MathUtil = (function () {
        function MathUtil() {
        }
        /**
         * 对sin函数的二次封装，降低sin函数的cpu消耗
         * @param angle
         * @return
         *
         */
        MathUtil.sin = function (angle) {
            angle = angle >> 0;
            angle = this.toLAngle(angle);
            if (!this.sinCache[angle]) {
                this.sinCache[angle] = Math.sin(this.angleToRadian(angle));
            }
            return this.sinCache[angle];
        };
        /**
         * 对cos函数的二次封装，降低cos函数的cpu消耗
         * @param angle
         * @return
         */
        MathUtil.cos = function (angle) {
            angle = angle >> 0;
            angle = this.toLAngle(angle);
            if (!this.cosCache[angle]) {
                this.cosCache[angle] = Math.cos(this.angleToRadian(angle));
            }
            return this.cosCache[angle];
        };
        /**
         * 角度转弧度
         * @param angle
         * @return
         *
         */
        MathUtil.angleToRadian = function (angle) {
            return (angle * Math.PI) / 180;
        };
        /**
         * 弧度转角度
         * @param radian
         * @return
         */
        MathUtil.radianToAngle = function (radian) {
            return Math.round((radian * 180) / Math.PI);
        };
        /**
         * 范围随机取整
         * @param min
         * @param max
         * @return
         */
        MathUtil.randRange = function (min, max) {
            return (Math.random() * (max - min + 1) + min) >> 0;
        };
        /**
         * 范围随机 取浮点数
         * @param min
         * @param max
         * @return
         */
        MathUtil.randRangeFloat = function (min, max) {
            return (Math.random() * (max - min)) + min;
        };
        /**
         * 舍去浮点值的位数，最后一位四舍五入
         * @param value
         * @param dot
         * @return
         */
        MathUtil.roundFixed = function (value, dot) {
            dot = this.rangeLimit(dot, 0, 16);
            if (dot == 0)
                return value;
            var range = Math.pow(10, dot);
            return Math.round((value * range)) / range;
        };
        /**
         * 舍去浮点值的位数，并保留浮点精度
         * @param value
         * @param dot
         * @return
         *
         */
        MathUtil.floorFixed = function (value, dot) {
            dot = this.rangeLimit(dot, 0, 16);
            if (dot == 0)
                return value;
            var range = Math.pow(10, dot);
            return (Math.round((value * range) - ((value >> 0) * range))) / range;
        };
        /**
         * 取弧度值
         * @param x
         * @param y
         * @return
         *
         */
        MathUtil.getRadian = function (x, y) {
            return Math.atan2(y, x);
        };
        /**
         * 取角度值
         * @param x
         * @param y
         * @return
         */
        MathUtil.getAngle = function (x, y) {
            return this.radianToAngle(this.getRadian(x, y));
        };
        /**
         * 取角度值 (精确)
         * @param x
         * @param y
         * @return
         */
        MathUtil.getAngleExact = function (x, y) {
            return (this.getRadian(x, y) * 180) / Math.PI;
        };
        /**
         * 取角度值 ，并 区间化0-360
         * @param x
         * @param y
         * @return
         *
         */
        MathUtil.getLAngle = function (x, y) {
            return this.toLAngle(this.radianToAngle(this.getRadian(x, y)));
        };
        /**
         *
         * 获取以 上 为开始方向的方向
         * @param x
         * @param y
         * @return
         *
         */
        MathUtil.getUAngle = function (x, y) {
            var angle = this.radianToAngle(this.getRadian(x, y));
            if (angle < 0) {
                angle += 360;
            }
            angle += 90;
            angle %= 360;
            return angle >> 0;
        };
        /**
         * 对角度区间化，返回的角度值 一定会是 0-360之间的数字
         * @param angle
         * @return
         *
         */
        MathUtil.toLAngle = function (angle) {
            if ((angle > -1) && (angle < 360)) {
                return angle;
            }
            angle = angle % 360;
            if (angle < 0) {
                angle = angle + 360;
            }
            return angle;
        };
        /**
         * 限定值在区间内
         * @param value
         * @param minValue
         * @param maxValue
         * @return
         *
         */
        MathUtil.rangeLimit = function (value, minValue, maxValue) {
            if (minValue === void 0) { minValue = NaN; }
            if (maxValue === void 0) { maxValue = NaN; }
            if (!isNaN(minValue) && (value < minValue))
                value = minValue;
            if (!isNaN(maxValue) && (value > maxValue))
                value = maxValue;
            return value;
        };
        /**
         * 取得两点间的弧度
         * @param x1
         * @param y1
         * @param x2
         * @param y2
         * @return
         *
         */
        MathUtil.getTwoPointRadian = function (x1, y1, x2, y2) {
            var offx = (x2 - x1);
            var offy = (y2 - y1);
            return this.getRadian(offx, offy);
        };
        /**
         * 取两点间的角度
         * @param x1
         * @param y1
         * @param x2
         * @param y2
         * @return
         *
         */
        MathUtil.getTwoPointAngle = function (x1, y1, x2, y2) {
            return this.radianToAngle(this.getTwoPointRadian(x1, y1, x2, y2));
        };
        /**
         * 获取两点的距离
         * @param x1
         * @param y1
         * @param x2
         * @param y2
         * @return
         *
         */
        MathUtil.getDistance = function (x1, y1, x2, y2) {
            var offx = (x2 - x1);
            var offy = (y2 - y1);
            return Math.sqrt((offx * offx) + (offy * offy));
        };
        /**
         * 根据两个点，长度，确定 横穿两点射线上任意点的位置 （算角度方式）
         * @param x1
         * @param y1
         * @param x2
         * @param y2
         * @param length
         * @return
         */
        MathUtil.getRightAngleSide = function (x1, y1, x2, y2, length) {
            var angle = this.getTwoPointAngle(x1, y1, x2, y2);
            var vx = length * this.cos(angle);
            var vy = length * this.sin(angle);
            return new egret.Point(vx, vy);
        };
        /**
         * 根据两个点，长度，确定 横穿两点射线上任意点的位置 （直接算距离）
         * @param x1
         * @param y1
         * @param x2
         * @param y2
         * @param length
         * @return
         *
         */
        MathUtil.getLinePoint = function (x1, y1, x2, y2, length) {
            var distance = this.getDistance(x1, y1, x2, y2);
            if (distance == 0 || distance == length)
                return new egret.Point(x2, y2);
            var off = length / (distance - length);
            var result = new egret.Point();
            result.x = (x1 + (x2 * off)) / (1 + off);
            result.y = (y1 + (y2 * off)) / (1 + off);
            return result;
        };
        /**
         * 根据角度，长度，获取目标点  //oldName:getLinePoint2
         * @param x
         * @param y
         * @param length
         * @param angle
         * @return
         */
        MathUtil.getLinePointByAngle = function (x, y, length, angle, cache) {
            if (cache === void 0) { cache = null; }
            var vx = x + (length * this.cos(angle));
            var vy = y + (length * this.sin(angle));
            if (!!cache) {
                cache.x = vx;
                cache.y = vy;
                return cache;
            }
            return new egret.Point(vx, vy);
        };
        /**
         * 根据角度，长度，获取目标点  (精确)
         * @param x
         * @param y
         * @param length
         * @param angle
         * @return
         */
        MathUtil.getLinePointByAngleExact = function (x, y, length, angle) {
            var vx = x + (length * Math.cos(this.angleToRadian(angle)));
            var vy = y + (length * Math.sin(this.angleToRadian(angle)));
            return new egret.Point(vx, vy);
        };
        /**
         * 转换为16进制格式的颜色值
         * @param value
         * @return
         *
         */
        MathUtil.toHex = function (value) {
            return "#" + value.toString(16);
        };
        /**
         * 直接转换
         * @param num 值
         * @param unit 单位换算倍率
         * @param unitString 单位名称
         * @return
         */
        MathUtil.convertUnits = function (num, unit, unitString) {
            if (unit == 0)
                return num + unitString;
            return (num / unit) + unitString;
        };
        MathUtil.currencyFormat = function (value, n) {
            if (n === void 0) { n = 3; }
            var str = (value >> 0) + "";
            var len = str.length;
            if (len <= 3)
                return str;
            var index = ((len - 1) / 3) >> 0;
            var temp = len - index * 3;
            if (temp == 3)
                return str.substr(0, temp) + this.formatUnitArray[index - 1];
            return str.substr(0, temp) + "." + str.substr(temp, n - temp) + this.formatUnitArray[index - 1];
        };
        /**
         * 货币格式化(加入分隔符)
         * @param value
         * @return
         *
         */
        MathUtil.currencyFormat2 = function (value) {
            var valueString = value.toString();
            var index = valueString.length;
            var result = [];
            while (index >= 3) {
                result.unshift(valueString.substr(index - 3, 3));
                index = index - 3;
            }
            ;
            if (index > 0) {
                result.unshift(valueString.substr(0, index));
            }
            ;
            return result.join(",");
        };
        /**
         * 取整 相当于 Math.round(v);
         * @param v
         * @return
         */
        MathUtil.floor = function (v) {
            return v >> 0;
        };
        /**
         * 取绝对值 相当于Math.abs(v);
         * @param v
         * @return
         *
         */
        MathUtil.abs = function (v) {
            return (v ^ (v >> 31)) - (v >> 31);
        };
        /**
         * 检查number是否为偶数 相当于 i%2==0
         * @param v
         * @return
         *
         */
        MathUtil.isEven = function (v) {
            return (v & 1) == 0;
        };
        /**
         * 取反 相当于 v=-v;
         * @param v
         * @return
         *
         */
        MathUtil.flip = function (v) {
            return ~v + 1;
        };
        /**
         * 从一个区间内取出随机且不重复的指定数量的值集合
         * @param min 区间最小值
         * @param max 区间最大值
         * @param total 需要取出的值集合长度
         */
        MathUtil.getRandomArray = function (min, max, total) {
            var list = [];
            for (var i = min; i < max; i++) {
                list.push(i);
            }
            var results = [];
            while (total--) {
                var index = (Math.random() * list.length) >> 0;
                results.push(list.splice(index, 1)[0]);
            }
            return results;
        };
        /**
         * 获取符号返回1，0，－1
         */
        MathUtil.sign = function (val) {
            if (val > 0)
                val = 1;
            if (val < 0)
                val = -1;
            return val;
        };
        MathUtil.sinCache = [];
        MathUtil.cosCache = [];
        /**
         * 货币格式化 (位数+单位)
         * @param 数值，显示位数
         * @return
         */
        MathUtil.formatUnitArray = ["k", "m", "b"]; //千   百万   十亿     以一千倍计数
        return MathUtil;
    }());
    utils.MathUtil = MathUtil;
    __reflect(MathUtil.prototype, "utils.MathUtil");
})(utils || (utils = {}));
///////////////////////////////////
// -------------------------------
// @author:Kevin.Chen
// @date:2016-5-17下午3:03:35
// @email:kevin-chen@foxmail.com
// -------------------------------
///////////////////////////////////
var utils;
(function (utils) {
    var ObjectPool = (function () {
        function ObjectPool() {
        }
        /**
         * 生成缓存池
         * @param clazz 缓存的对象类引用
         * @param pool 指定缓存池
         * @return
         */
        ObjectPool.create = function (clazz, pool) {
            if (pool === void 0) { pool = null; }
            var clazzName = egret.getQualifiedClassName(clazz);
            var oldPool = ObjectPool.pools[clazzName];
            if (oldPool && !pool) {
                return oldPool;
            }
            var newPool = pool ? pool : (new Pool(clazzName, clazz));
            ObjectPool.pools[clazzName] = newPool;
            if (oldPool) {
                for (var _i = 0, _a = oldPool.pool; _i < _a.length; _i++) {
                    var object = _a[_i];
                    newPool.to(object);
                }
                oldPool.pool.length = 0;
            }
            return ObjectPool.pools[clazzName];
        };
        ObjectPool.getPool = function (clazz) {
            for (var key in ObjectPool.pools) {
                var pool = ObjectPool.pools[key];
                if (pool.clazz == clazz) {
                    return pool;
                }
            }
            return null;
        };
        ObjectPool.getPoolByName = function (clazzName) {
            for (var key in ObjectPool.pools) {
                var pool = ObjectPool.pools[key];
                if (pool.name == clazzName) {
                    return pool;
                }
            }
            return null;
        };
        /**
         * 从缓存取出
         * @param clazz
         * @param initialize需要初始化函数名称
         * @param data
         * @return
         */
        ObjectPool.from = function (clazz, autoInitialize) {
            if (autoInitialize === void 0) { autoInitialize = false; }
            var data = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                data[_i - 2] = arguments[_i];
            }
            var clazzName = egret.getQualifiedClassName(clazz);
            if (!ObjectPool.pools[clazzName]) {
                ObjectPool.pools[clazzName] = new Pool(clazzName, clazz);
            }
            var pool = ObjectPool.pools[clazzName];
            data.unshift(autoInitialize);
            return pool.from.apply(pool, data);
        };
        /**
         * 回收单位
         * @param object
         */
        ObjectPool.to = function (object, autoReset) {
            if (autoReset === void 0) { autoReset = true; }
            if (!object)
                return;
            if (!object.autoRecover)
                return;
            var clazzName = egret.getQualifiedClassName(object);
            if (clazzName == "undefined") {
                throw ("[ObjectPool] Is not a valid pool type!");
            }
            var pool = ObjectPool.pools[clazzName];
            if (pool) {
                pool.to(object, autoReset);
            }
        };
        /**
         * 回收整个集合
         * @param list
         */
        ObjectPool.listTo = function (list) {
            if (!list)
                return;
            for (var _i = 0, list_3 = list; _i < list_3.length; _i++) {
                var object = list_3[_i];
                var clazzName = egret.getQualifiedClassName(object);
                var pool = ObjectPool.pools[clazzName];
                if (!pool)
                    continue;
                pool.to(object);
            }
        };
        /**
         * 销毁缓存池
         * @param clazz
         */
        ObjectPool.destroy = function (clazz) {
            var clazzName = egret.getQualifiedClassName(clazz);
            var pool = ObjectPool.pools[clazzName];
            if (pool) {
                pool.destroy();
            }
        };
        /**
         * 销毁过期的对象
         */
        ObjectPool.destroyExpiredObjects = function () {
            for (var clazzName in ObjectPool.pools) {
                var pool = ObjectPool.pools[clazzName];
                if (pool) {
                    pool.destroyExpiredObjects();
                }
            }
        };
        /**
         * 创建实例（通常在动态创建对象的情况下，可能会调用此类）
         * @param targetClass
         * @param args
         * @return
         *
         */
        ObjectPool.createNewInstance = function (targetClass) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (args == null) {
                return new targetClass();
            }
            switch (args.length) {
                case 0:
                    return new targetClass();
                case 1:
                    return new targetClass(args[0]);
                case 2:
                    return new targetClass(args[0], args[1]);
                case 3:
                    return new targetClass(args[0], args[1], args[2]);
                case 4:
                    return new targetClass(args[0], args[1], args[2], args[3]);
                case 5:
                    return new targetClass(args[0], args[1], args[2], args[3], args[4]);
                case 6:
                    return new targetClass(args[0], args[1], args[2], args[3], args[4], args[5]);
                case 7:
                    return new targetClass(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
                case 8:
                    args;
                    return new targetClass(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
                default:
                    throw new Error("Unsupported number of Constructor args: " + args.length);
            }
        };
        ObjectPool.getInfo = function () {
            var list = [];
            for (var name in ObjectPool.pools) {
                var pool = ObjectPool.pools[name];
                list.push({ name: name, total: ((pool && pool.pool) ? pool.pool.length : "none") });
            }
            return list;
        };
        ObjectPool.addPool = function (v) {
            ObjectPool.pools[v.name] = v;
        };
        /**检查间隔 */
        ObjectPool.CHECK_INTERVAL = 10000;
        /** 过期时间*/
        ObjectPool.EXPIRE_TIME = 30000;
        ObjectPool.pools = {};
        return ObjectPool;
    }());
    utils.ObjectPool = ObjectPool;
    __reflect(ObjectPool.prototype, "utils.ObjectPool");
    var Pool = (function () {
        function Pool(clazzName, clazz) {
            this._clazz = clazz;
            this._clazzName = clazzName;
            this._pool = [];
        }
        Object.defineProperty(Pool.prototype, "name", {
            /**
             * 缓存池名称
             * @return
             *
             */
            get: function () {
                return this._clazzName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pool.prototype, "clazz", {
            /**
             * 缓存源
             * @return
             *
             */
            get: function () {
                return this._clazz;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pool.prototype, "pool", {
            get: function () {
                return this._pool;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pool.prototype, "max", {
            /**
             * 限定的最大个数
             * @return
             *
             */
            get: function () {
                return this.pool.length;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 从缓存池取出
         * @param data
         * @return
         */
        Pool.prototype.from = function (autoInitialize) {
            if (autoInitialize === void 0) { autoInitialize = false; }
            var data = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                data[_i - 1] = arguments[_i];
            }
            var poolObject;
            if (this.pool.length) {
                poolObject = this.pool.pop();
            }
            else {
                poolObject = ObjectPool.createNewInstance(this.clazz);
            }
            poolObject.toPoolTime = 0;
            if (autoInitialize) {
                poolObject.initialize.apply(poolObject, data);
            }
            return poolObject;
        };
        /**
         * 存入缓存池
         * @param object
         */
        Pool.prototype.to = function (object, autoReset) {
            if (autoReset === void 0) { autoReset = true; }
            if ((object instanceof egret.DisplayObject)) {
                if (object.parent) {
                    object.parent.removeChild(object);
                }
                object.blendMode = egret.BlendMode.NORMAL;
                object.alpha = 1;
                object.scaleX = object.scaleY = 1;
                object.skewX = object.skewY = 0;
                egret.Tween.removeTweens(object);
                object.x = object.y = 0;
                object.rotation = 0;
                object.visible = true;
                object.mask = null;
                object.matrix.identity();
            }
            if (autoReset)
                object.reset();
            if (this.pool.indexOf(object) < 0) {
                object.toPoolTime = egret.getTimer();
                this.pool.push(object);
            }
        };
        /**
         *  销毁缓存池
         */
        Pool.prototype.destroy = function () {
            for (var _i = 0, _a = this.pool; _i < _a.length; _i++) {
                var object = _a[_i];
                if (object instanceof egret.DisplayObject) {
                    if (object.parent)
                        object.parent.removeChild(object);
                }
                if (!!object['destroy']) {
                    object["destroy"]();
                }
            }
            this.pool.length = 0;
        };
        Pool.prototype.destroyExpiredObjects = function () {
            var now = egret.getTimer();
            for (var i = 0; i < this.pool.length; i++) {
                var object = this.pool[i];
                if (now - object.toPoolTime > ObjectPool.EXPIRE_TIME) {
                    if (object instanceof egret.DisplayObject) {
                        if (object.parent)
                            object.parent.removeChild(object);
                    }
                    if (!!object['destroy']) {
                        object["destroy"]();
                    }
                    this.pool.splice(i, 1);
                    i--;
                }
            }
        };
        return Pool;
    }());
    utils.Pool = Pool;
    __reflect(Pool.prototype, "utils.Pool", ["utils.ICachePool"]);
})(utils || (utils = {}));
///////////////////////////////////
// -------------------------------
// @author:Kevin.Chen
// @date:2016-5-17下午3:03:35
// @email:kevin-chen@foxmail.com
// -------------------------------
///////////////////////////////////
var utils;
(function (utils) {
    var StageUtil = (function () {
        function StageUtil() {
        }
        StageUtil.baseFramesToRealFrames = function (frame) {
            return frame * this.fpsMultiple;
        };
        StageUtil.baseIntervalToRealInterval = function (interval) {
            return interval * this.fpsMultiple;
        };
        StageUtil.timeToFrames = function (time) {
            return this.baseFramesToRealFrames(time / this.baseInterval);
        };
        StageUtil.framesToTime = function (frametotal) {
            return this.framesToTimeSecond(frametotal) * 1000;
        };
        StageUtil.framesToTimeSecond = function (frametotal) {
            return frametotal / this.baseFps;
        };
        StageUtil.fpsMultiple = 1;
        StageUtil.fps = 30;
        StageUtil.baseFps = 30;
        StageUtil.interval = 33;
        StageUtil.baseInterval = 33;
        return StageUtil;
    }());
    utils.StageUtil = StageUtil;
    __reflect(StageUtil.prototype, "utils.StageUtil");
})(utils || (utils = {}));
///////////////////////////////////
// -------------------------------
// @author:Kevin.Chen
// @date:2016-5-17下午3:03:35
// @email:kevin-chen@foxmail.com
// -------------------------------
///////////////////////////////////
var utils;
(function (utils) {
    var StringUtil = (function () {
        function StringUtil() {
        }
        /**
         * 获得字符串的所占字节的长度
         * @param value
         * @return
         *
         */
        StringUtil.getCharsLength = function (value) {
            this.gBytes.clear();
            while (this.gBytes.length) {
                this.gBytes.readByte();
            }
            this.gBytes.writeUTFBytes(value);
            return this.gBytes.length;
        };
        /**
         * 修剪字符串两边的空白区域
         * @param str
         * @return
         *
         */
        StringUtil.trim = function (str) {
            var front;
            while (this.isWhitespace(str.charAt(front))) {
                front++;
            }
            ;
            var back = (str.length - 1);
            while (this.isWhitespace(str.charAt(back))) {
                back--;
            }
            ;
            if (back >= front) {
                return (str.slice(front, (back + 1)));
            }
            ;
            return "";
        };
        /**
         * 以分隔符为单位，修剪字符串两边的空白区域
         * @param value
         * @param delimiter 分隔符
         * @return
         *
         */
        StringUtil.trimArrayElements = function (value, delimiter) {
            var list = null;
            var length;
            var index;
            if (value != "" && value != null) {
                list = value.split(delimiter);
                length = list.length;
                index = 0;
                while (index < length) {
                    list[index] = this.trim(list[index]);
                    index++;
                }
                if (length > 0) {
                    value = list.join(delimiter);
                }
            }
            return value;
        };
        /**
         * 是否为空白字符
         * @param character
         * @return
         *
         */
        StringUtil.isWhitespace = function (character) {
            switch (character) {
                case " ":
                case "\t":
                case "\r":
                case "\n":
                case "\f":
                    return true;
                default:
                    return false;
            }
        };
        /**
         * 替换文本  (形如:substitute(‘aa-{0}-bb-{1}-cc-{2}-dd’,11,22,33)=‘aa-{11}-bb-{22}-cc-{33}-dd’)
         * @param str 原始文本
         * @param _args 需要替换的值
         * @return
         */
        StringUtil.substitute = function (str) {
            var _args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                _args[_i - 1] = arguments[_i];
            }
            var list = null;
            var index;
            var paramLength = _args.length;
            if (paramLength == 1 && _args[0] instanceof Array) {
                list = _args[0];
                paramLength = list.length;
            }
            else {
                list = _args;
            }
            ;
            index = 0;
            while (index < paramLength) {
                str = str.replace(new RegExp(("\\{" + index + "\\}"), "g"), list[index]);
                index++;
            }
            ;
            return str;
        };
        /**
         * 比较前缀
         * @param begin
         * @param str
         * @return
         */
        StringUtil.equalBegin = function (begin, str) {
            return begin == str.substring(0, begin.length);
        };
        /**
         * 比较后缀
         * @param end
         * @param str
         * @return
         *
         */
        StringUtil.equalEnd = function (end, str) {
            return end == str.substring(str.length - end.length);
        };
        /**
         * 输出矩形的缩略信息
         * @param rect
         * @return
         *
         */
        StringUtil.rectToString = function (rect) {
            if (rect) {
                return rect.x + "," + rect.y + "," + rect.width + "," + rect.height;
            }
            return "";
        };
        StringUtil.delSpace = function (str) {
            return str.replace(/ /g, "");
        };
        StringUtil.delEnter = function (str) {
            if (str.indexOf("\n") >= 0)
                str = str.replace(/\n/g, "");
            if (str.indexOf("\r") >= 0)
                str = str.replace(/\r/g, "");
            return str;
        };
        StringUtil.gBytes = new egret.ByteArray();
        return StringUtil;
    }());
    utils.StringUtil = StringUtil;
    __reflect(StringUtil.prototype, "utils.StringUtil");
})(utils || (utils = {}));
var game;
(function (game) {
    function getName(url) {
        var i = url.indexOf('?');
        if (i > 0) {
            url = url.substring(0, i);
        }
        return url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
    }
    game.getName = getName;
})(game || (game = {}));
var game;
(function (game) {
    var ConfigParser = (function () {
        function ConfigParser() {
        }
        ConfigParser.paser = function (input, totalfile, caller, complete, progress) {
            if (progress === void 0) { progress = null; }
            var uint8Array;
            var deplain;
            var newDeplain;
            var bytes;
            var result;
            var index = 0;
            function handler() {
                var name = bytes.readUTF();
                var content = JSON.parse(bytes.readUTFBytes(bytes.readUnsignedInt()));
                result[name] = content;
                index++;
                if (progress) {
                    progress.call(caller, (((index / totalfile) * 10) >> 0) / 10);
                }
                if (bytes.bytesAvailable) {
                    this.callLater(this, handler);
                }
                else {
                    end();
                }
            }
            function end() {
                uint8Array = null;
                deplain = null;
                newDeplain = null;
                bytes.clear();
                bytes = null;
                complete.call(caller, result);
            }
            uint8Array = new Uint8Array(input);
            //console.log('decode:',input.length);
            //zlib解压缩
            var inflate = new Zlib.Inflate(uint8Array);
            deplain = inflate.decompress();
            newDeplain = new Uint8Array(deplain.length);
            for (var i = 0; i < deplain.length; i++) {
                newDeplain[i] = deplain[i];
            }
            bytes = new egret.ByteArray(newDeplain.buffer);
            bytes.position = 0;
            result = {};
            this.callLater(this, handler);
        };
        ConfigParser.callLater = function (caller, method) {
            egret.setTimeout(method, caller, 1000 / 30);
        };
        return ConfigParser;
    }());
    game.ConfigParser = ConfigParser;
    __reflect(ConfigParser.prototype, "game.ConfigParser");
})(game || (game = {}));
var game;
(function (game) {
    var ResHandler = (function (_super) {
        __extends(ResHandler, _super);
        function ResHandler(caller, method, args, once, requestDirect) {
            if (caller === void 0) { caller = null; }
            if (method === void 0) { method = null; }
            if (args === void 0) { args = null; }
            if (once === void 0) { once = false; }
            if (requestDirect === void 0) { requestDirect = 0; }
            var _this = _super.call(this, caller, method, args, once) || this;
            _this._requestDirect = 0;
            _this._requestDirect = requestDirect;
            return _this;
        }
        Object.defineProperty(ResHandler.prototype, "requestDirect", {
            get: function () {
                return this._requestDirect;
            },
            set: function (v) {
                this._requestDirect = v;
            },
            enumerable: true,
            configurable: true
        });
        ResHandler.prototype.recover = function () {
            if (this._id > 0) {
                this._id = 0;
                this._requestDirect = 0;
                ResHandler._mypool.push(this.clear());
            }
        };
        ResHandler.create = function (caller, method, args, once, requestDirect) {
            if (args === void 0) { args = null; }
            if (once === void 0) { once = true; }
            if (requestDirect === void 0) { requestDirect = 0; }
            if (ResHandler._mypool.length) {
                var resHandler = ResHandler._mypool.pop();
                resHandler.setTo(caller, method, args, once);
                resHandler._requestDirect = requestDirect;
                return resHandler;
            }
            return new ResHandler(caller, method, args, once);
        };
        ResHandler._mypool = [];
        return ResHandler;
    }(utils.Handler));
    game.ResHandler = ResHandler;
    __reflect(ResHandler.prototype, "game.ResHandler");
})(game || (game = {}));
var game;
(function (game) {
    var GroupLoader = (function () {
        function GroupLoader() {
            this.autoRecover = true;
            this.toPoolTime = 0;
            this.retryCount = 1;
            this._progress = null;
        }
        GroupLoader.prototype.initialize = function (name) {
            this._name = name;
            return this;
        };
        GroupLoader.prototype.reset = function () {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this._name = null;
            this._caller = null;
            this._complete = null;
            this._progress = null;
        };
        GroupLoader.prototype.start = function (caller, complete, progress) {
            if (caller === void 0) { caller = null; }
            if (complete === void 0) { complete = null; }
            if (progress === void 0) { progress = null; }
            this._caller = caller;
            this._complete = complete;
            this._progress = progress;
            this._isLoading = true;
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup(this._name);
        };
        GroupLoader.prototype.callComplete = function () {
            if (this._complete) {
                this._complete.call(this._caller);
            }
            this.reset();
        };
        /**
         * preload资源组加载完成
         * Preload resource group is loaded
         */
        GroupLoader.prototype.onResourceLoadComplete = function (event) {
            this._isLoading = false;
            if (event.groupName == this._name) {
                this.callComplete();
            }
        };
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        GroupLoader.prototype.onItemLoadError = function (event) {
            this._isLoading = false;
            egret.warn("Url:" + event.resItem.url + " has failed to load");
        };
        /**
         * 资源组加载出错
         * The resource group loading failed
         */
        GroupLoader.prototype.onResourceLoadError = function (event) {
            //TODO
            egret.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            if (this.retryCount > 0) {
                this.retryCount--;
                RES.loadGroup(this._name);
                return;
            }
            this._isLoading = false;
            if (event.groupName == this._name) {
                this.callComplete();
            }
        };
        /**
         * preload资源组加载进度
         * Loading process of preload resource group
         */
        GroupLoader.prototype.onResourceProgress = function (event) {
            if (event.groupName == this._name && this._progress) {
                if (this._progress) {
                    this._progress.call(this._caller, event.itemsLoaded / event.itemsTotal);
                }
            }
        };
        Object.defineProperty(GroupLoader.prototype, "isLoading", {
            get: function () {
                return this._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        return GroupLoader;
    }());
    game.GroupLoader = GroupLoader;
    __reflect(GroupLoader.prototype, "game.GroupLoader", ["game.IBaseLoader", "utils.IPool"]);
})(game || (game = {}));
var game;
(function (game) {
    var BytesBaseLoader = (function (_super) {
        __extends(BytesBaseLoader, _super);
        function BytesBaseLoader() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            _this._retryCount = 1;
            return _this;
        }
        BytesBaseLoader.prototype.initialize = function (url) {
            this._url = url;
            return this;
        };
        BytesBaseLoader.prototype.reset = function () {
            this._url = '';
            this.removeEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            this._caller = null;
            this._complete = null;
            this._prorgress = null;
            //this.response=null;
        };
        BytesBaseLoader.prototype.start = function (caller, complete, progress) {
            if (caller === void 0) { caller = null; }
            if (complete === void 0) { complete = null; }
            if (progress === void 0) { progress = null; }
            if (caller)
                this._caller = caller;
            if (complete)
                this._complete = complete;
            if (progress)
                this._prorgress = progress;
            this._isLoading = true;
            this.responseType = egret.HttpResponseType.ARRAY_BUFFER;
            this._times = 0;
            //设置为 GET 请求
            this.open(game.versionControl.getVirtualUrl(this._url), egret.HttpMethod.GET);
            //this.setRequestHeader("Content-Type", "application/octet-stream");
            this.addEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.addEventListener(egret.ProgressEvent.PROGRESS, this.progressHandler, this);
            this.addEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            this.send();
            return this;
        };
        BytesBaseLoader.prototype.completeHandler = function (e) {
            this._isLoading = false;
            this.removeEventListener(egret.ProgressEvent.PROGRESS, this.progressHandler, this);
            this.removeEventListener(egret.Event.COMPLETE, this.completeHandler, this);
            this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
            this._complete.call(this._caller, this.response);
        };
        BytesBaseLoader.prototype.progressHandler = function (e) {
            if (this._prorgress) {
                this._prorgress.call(this._caller, (((e.bytesLoaded / e.bytesTotal) * 10) >> 0) / 10);
            }
        };
        BytesBaseLoader.prototype.errorHandler = function (e) {
            console.log('加载失败:', this._url);
            if (this._times >= this._retryCount) {
                this._isLoading = false;
                this.removeEventListener(egret.ProgressEvent.PROGRESS, this.progressHandler, this);
                this.removeEventListener(egret.Event.COMPLETE, this.completeHandler, this);
                this.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.errorHandler, this);
                this._complete.call(this._caller, null);
                return;
            }
            this._times++;
            console.log('正在重试:', this._url);
            this.open(game.versionControl.getVirtualUrl(this._url), egret.HttpMethod.GET);
            this.setRequestHeader("Content-Type", "application/octet-stream");
            this.send();
        };
        Object.defineProperty(BytesBaseLoader.prototype, "isLoading", {
            get: function () {
                return this._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        return BytesBaseLoader;
    }(egret.HttpRequest));
    game.BytesBaseLoader = BytesBaseLoader;
    __reflect(BytesBaseLoader.prototype, "game.BytesBaseLoader", ["game.IBaseLoader", "utils.IPool"]);
})(game || (game = {}));
var game;
(function (game) {
    var TypeAlign;
    (function (TypeAlign) {
        TypeAlign[TypeAlign["TOP"] = 1] = "TOP";
        TypeAlign[TypeAlign["TOP_LEFT"] = 2] = "TOP_LEFT";
        TypeAlign[TypeAlign["TOP_RIGHT"] = 3] = "TOP_RIGHT";
        TypeAlign[TypeAlign["BOTTOM"] = 4] = "BOTTOM";
        TypeAlign[TypeAlign["BOTTOM_LEFT"] = 5] = "BOTTOM_LEFT";
        TypeAlign[TypeAlign["BOTTOM_RIGHT"] = 6] = "BOTTOM_RIGHT";
        TypeAlign[TypeAlign["LEFT"] = 7] = "LEFT";
        TypeAlign[TypeAlign["RIGHT"] = 8] = "RIGHT";
        TypeAlign[TypeAlign["CENTER"] = 9] = "CENTER";
        TypeAlign[TypeAlign["TOP_AUTO"] = 10] = "TOP_AUTO";
        TypeAlign[TypeAlign["BOTTOM_AUTO"] = 11] = "BOTTOM_AUTO";
    })(TypeAlign = game.TypeAlign || (game.TypeAlign = {}));
    function getAlignName(type) {
        switch (type) {
            case TypeAlign.TOP: return "top";
            case TypeAlign.TOP_LEFT: return "topLeft";
            case TypeAlign.TOP_RIGHT: return "topRight";
            case TypeAlign.BOTTOM: return "bottom";
            case TypeAlign.BOTTOM_LEFT: return "bottomLeft";
            case TypeAlign.BOTTOM_RIGHT: return "bottomRight";
            case TypeAlign.LEFT: return "left";
            case TypeAlign.RIGHT: return "right";
            case TypeAlign.CENTER: return "center";
            case TypeAlign.TOP_AUTO: return "topAuto";
            case TypeAlign.BOTTOM_AUTO: return "bottomAuto";
        }
        return "";
    }
    game.getAlignName = getAlignName;
})(game || (game = {}));
var game;
(function (game) {
    var TypeGridState;
    (function (TypeGridState) {
        TypeGridState[TypeGridState["WALK"] = 0] = "WALK";
        TypeGridState[TypeGridState["UNWALK"] = 1] = "UNWALK";
    })(TypeGridState = game.TypeGridState || (game.TypeGridState = {}));
})(game || (game = {}));
var game;
(function (game) {
    var TypeAnimaAsset = (function () {
        function TypeAnimaAsset() {
        }
        TypeAnimaAsset.getTotalDirect = function (type) {
            switch (type) {
                case TypeAnimaAsset.ACTOR_ACTION_5: return 5;
                case TypeAnimaAsset.ACTOR_ACTION_2: return 2;
                case TypeAnimaAsset.ACTOR_DIRECT_5: return 5;
                case TypeAnimaAsset.ACTOR_DIRECT_2: return 2;
                case TypeAnimaAsset.EFFECT_DIRECT_5: return 5;
                case TypeAnimaAsset.EFFECT_DIRECT_2: return 2;
            }
            return 0;
        };
        /**普通特效资源*/
        TypeAnimaAsset.EFFECT_NORMAL = 1;
        /**（按动作打包）五方向角色资源*/
        TypeAnimaAsset.ACTOR_ACTION_5 = 2;
        /**（按动作打包）二方向角色资源*/
        TypeAnimaAsset.ACTOR_ACTION_2 = 3;
        /**（按方向打包）五方向角色资源*/
        TypeAnimaAsset.ACTOR_DIRECT_5 = 4;
        /**（按方向打包）二方向角色资源*/
        TypeAnimaAsset.ACTOR_DIRECT_2 = 5;
        /**五方向特效资源*/
        TypeAnimaAsset.EFFECT_DIRECT_5 = 6;
        /**二方向特效资源*/
        TypeAnimaAsset.EFFECT_DIRECT_2 = 7;
        return TypeAnimaAsset;
    }());
    game.TypeAnimaAsset = TypeAnimaAsset;
    __reflect(TypeAnimaAsset.prototype, "game.TypeAnimaAsset");
})(game || (game = {}));
var game;
(function (game) {
    var _poolfactory = [];
    function fromMovieFactory(json, png) {
        var factory;
        if (_poolfactory.length) {
            factory = _poolfactory.pop();
            factory.mcDataSet = json;
            factory.texture = png;
        }
        else {
            factory = new egret.MovieClipDataFactory(json, png);
        }
        return factory;
    }
    function toMovieFactory(factory) {
        var index = _poolfactory.indexOf(factory);
        if (index == -1) {
            factory.clearCache();
            factory.mcDataSet = null;
            if (factory.texture) {
                factory.texture.dispose();
                factory.texture = null;
            }
            _poolfactory.push(factory);
        }
    }
    game.toMovieFactory = toMovieFactory;
    var AnimaBaseLoader = (function (_super) {
        __extends(AnimaBaseLoader, _super);
        function AnimaBaseLoader(retryCount) {
            return _super.call(this, retryCount) || this;
        }
        AnimaBaseLoader.prototype.initialize = function (jsonURl, pngURL, type, name) {
            this._type = type;
            this._name = name;
            _super.prototype.initialize.call(this, jsonURl, pngURL);
        };
        AnimaBaseLoader.prototype.reset = function () {
            this._type = 0;
            this._name = "";
            _super.prototype.reset.call(this);
        };
        AnimaBaseLoader.prototype.start = function (caller, method) {
            _super.prototype.start.call(this, this, function (json, png) {
                if (!json || !png) {
                    egret.error('未加载到动画资源:' + this._name);
                    if (method)
                        method.call(caller, null);
                    return;
                }
                if (!method)
                    return;
                var mcFactory = fromMovieFactory(json, png);
                var data;
                switch (this._type) {
                    case game.TypeAnimaAsset.ACTOR_ACTION_5:
                        data = this.parserDirectAnimation(mcFactory, 5);
                        break;
                    case game.TypeAnimaAsset.ACTOR_ACTION_2:
                        data = this.parserDirectAnimation(mcFactory, 2);
                        break;
                    case game.TypeAnimaAsset.ACTOR_DIRECT_5:
                        data = this.parserSignAnimation(mcFactory);
                        break;
                    case game.TypeAnimaAsset.ACTOR_DIRECT_2:
                        data = this.parserSignAnimation(mcFactory);
                        break;
                    case game.TypeAnimaAsset.EFFECT_NORMAL:
                        data = this.parserSignAnimation(mcFactory);
                        break;
                    case game.TypeAnimaAsset.EFFECT_DIRECT_5:
                        data = this.parserDirectAnimation(mcFactory, 5);
                        break;
                    case game.TypeAnimaAsset.EFFECT_DIRECT_2:
                        data = this.parserDirectAnimation(mcFactory, 2);
                        break;
                }
                method.call(caller, json, png, data, mcFactory);
            });
        };
        /**解析带方向素材包 */
        AnimaBaseLoader.prototype.parserDirectAnimation = function (mcFactory, totalDirect) {
            var directMovieDataList = [];
            var list = [];
            for (var key in mcFactory.$mcDataSet.mc) {
                list.push(key.toString());
            }
            for (var direct = 0; direct < totalDirect; direct++) {
                var movieData = mcFactory.generateMovieClipData(direct.toString());
                if (movieData) {
                    //if (movieData.frames.length == 0)
                    //    console.error("\u5E27\u6570\u4E0D\u5BF9:" + this._pngURl + ",\u8BE5\u5730\u5740\u89E3\u6790\u4E0D\u51FA\u6765" + totalDirect + "\u65B9\u5411\u8D44\u6E90...");
                    movieData.scale = mcFactory.mcDataSet.scale;
                    directMovieDataList.push(movieData);
                }
                else {
                    egret.log("error parserAnimation :" + direct);
                }
            }
            return directMovieDataList;
        };
        /**解析单一动画资源*/
        AnimaBaseLoader.prototype.parserSignAnimation = function (mcFactory) {
            var movieData = mcFactory.generateMovieClipData(this._name);
            movieData.width = mcFactory.mcDataSet.width ? mcFactory.mcDataSet.width : 600;
            movieData.height = mcFactory.mcDataSet.height ? mcFactory.mcDataSet.height : 600;
            movieData.scale = mcFactory.mcDataSet.scale ? mcFactory.mcDataSet.scale : 0.8;
            return movieData;
        };
        return AnimaBaseLoader;
    }(game.TextureBaseLoader));
    game.AnimaBaseLoader = AnimaBaseLoader;
    __reflect(AnimaBaseLoader.prototype, "game.AnimaBaseLoader");
})(game || (game = {}));
var game;
(function (game) {
    var TextLoader = (function (_super) {
        __extends(TextLoader, _super);
        function TextLoader() {
            var _this = _super.call(this) || this;
            _this._queue = [];
            _this._isLoading = false;
            return _this;
        }
        Object.defineProperty(TextLoader.prototype, "isLoading", {
            get: function () {
                return this._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TextLoader.prototype, "length", {
            get: function () {
                return this._queue.length;
            },
            enumerable: true,
            configurable: true
        });
        TextLoader.prototype.add = function (url, caller, complete, isJson) {
            if (isJson === void 0) { isJson = false; }
            this._retryCount = TextLoader.RETRY_COUNT;
            this._queue.push({ url: url, caller: caller, complete: complete, isJson: isJson });
            this.next();
        };
        TextLoader.prototype.remove = function (url) {
            var index = this.getIndex(url);
            if (index >= 0) {
                this._queue.splice(index, 1);
            }
            if (this._cur && this._cur.url == url) {
                this._cur = null;
            }
        };
        TextLoader.prototype.has = function (url) {
            if (this._cur && this._cur.url == url)
                return true;
            return this.getIndex(url) != -1;
        };
        TextLoader.prototype.update = function (url, caller, complete) {
            var info;
            if (this._cur && this._cur.url == url) {
                info = this._cur;
            }
            else {
                var index = this.getIndex(url);
                if (index >= 0) {
                    info = this._queue[index];
                }
            }
            if (info) {
                info.caller = caller;
                info.complete = complete;
                return true;
            }
            return false;
        };
        TextLoader.prototype.getIndex = function (url) {
            var index = 0;
            for (var _i = 0, _a = this._queue; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.url == url) {
                    return index;
                }
                index++;
            }
            return -1;
        };
        TextLoader.prototype.clear = function () {
            this._queue.length = 0;
            this._cur = 0;
            this._isLoading = false;
        };
        TextLoader.prototype.next = function () {
            if (!this._queue.length || this._isLoading) {
                if (this._endMethod) {
                    this._endMethod.call(this._endCaller);
                }
                return;
            }
            this._isLoading = true;
            this._cur = this._queue.shift();
            _super.prototype.initialize.call(this, this._cur.url, this._cur.isJson);
            _super.prototype.start.call(this, this, this.itemLoadedHandler);
        };
        TextLoader.prototype.itemLoadedHandler = function (content) {
            this._isLoading = false;
            if (!this._cur) {
                return;
            }
            this._cur.complete.call(this._cur.caller, content, this._cur.url);
            this.next();
        };
        TextLoader.prototype.onEnd = function (caller, method) {
            this._endCaller = caller;
            this._endMethod = method;
        };
        TextLoader.RETRY_COUNT = 1;
        return TextLoader;
    }(game.TextBaseLoader));
    game.TextLoader = TextLoader;
    __reflect(TextLoader.prototype, "game.TextLoader", ["game.ILoader"]);
    game.textLoader = new TextLoader();
})(game || (game = {}));
var game;
(function (game) {
    var ImageLoader = (function (_super) {
        __extends(ImageLoader, _super);
        function ImageLoader() {
            var _this = _super.call(this) || this;
            _this._queue = [];
            _this._isLoading = false;
            return _this;
        }
        Object.defineProperty(ImageLoader.prototype, "isLoading", {
            get: function () {
                return this._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageLoader.prototype, "length", {
            get: function () {
                return this._queue.length;
            },
            enumerable: true,
            configurable: true
        });
        ImageLoader.prototype.add = function (url, caller, method) {
            this._retryCount = ImageLoader.RETRY_COUNT;
            this._queue.push({ url: url, caller: caller, complete: method });
            this.next();
        };
        ImageLoader.prototype.remove = function (url) {
            var index = this.getIndex(url);
            if (index >= 0) {
                this._queue.splice(index, 1);
            }
            if (this._cur && this._cur.url == url) {
                this._cur = null;
            }
        };
        ImageLoader.prototype.has = function (url) {
            if (this._cur && this._cur.url == url)
                return true;
            return this.getIndex(url) != -1;
        };
        ImageLoader.prototype.update = function (url, caller, complete) {
            var info;
            if (this._cur && this._cur.url == url) {
                info = this._cur;
            }
            else {
                var index = this.getIndex(url);
                if (index >= 0) {
                    info = this._queue[index];
                }
            }
            if (info) {
                info.caller = caller;
                info.complete = complete;
                return true;
            }
            return false;
        };
        ImageLoader.prototype.getIndex = function (url) {
            var index = 0;
            for (var _i = 0, _a = this._queue; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.url == url) {
                    return index;
                }
                index++;
            }
            return -1;
        };
        ImageLoader.prototype.next = function () {
            if (!this._queue.length || this._isLoading) {
                if (this._endMethod) {
                    this._endMethod.call(this._endCaller);
                }
                return;
            }
            this._isLoading = true;
            this._cur = this._queue.shift();
            _super.prototype.initialize.call(this, this._cur.url);
            _super.prototype.start.call(this, this, this.itemLoadedHandler);
        };
        ImageLoader.prototype.itemLoadedHandler = function (texture) {
            this._isLoading = false;
            if (!this._cur) {
                if (texture)
                    texture.dispose();
            }
            else {
                if (this._cur) this._cur.complete.call(this._cur.caller, texture);
            }
            this.next();
        };
        ImageLoader.prototype.clear = function () {
            if (this._queue.length) {
                this._queue.length = 0;
            }
            this._cur = null;
            this._isLoading = false;
        };
        ImageLoader.prototype.onEnd = function (caller, method) {
            this._endCaller = caller;
            this._endMethod = method;
        };
        ImageLoader.RETRY_COUNT = 1;
        return ImageLoader;
    }(game.ImageBaseLoader));
    game.ImageLoader = ImageLoader;
    __reflect(ImageLoader.prototype, "game.ImageLoader", ["game.ILoader"]);
    game.imageLoader = new ImageLoader();
    game.iconLoader = new ImageLoader();
    game.dropIconLoader = new ImageLoader();
})(game || (game = {}));
var game;
(function (game) {
    var SheetLoader = (function (_super) {
        __extends(SheetLoader, _super);
        function SheetLoader() {
            var _this = _super.call(this) || this;
            _this._queue = [];
            _this._isLoading = false;
            return _this;
        }
        Object.defineProperty(SheetLoader.prototype, "isLoading", {
            get: function () {
                return this._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SheetLoader.prototype, "length", {
            get: function () {
                return this._queue.length;
            },
            enumerable: true,
            configurable: true
        });
        SheetLoader.prototype.add = function (jsonurl, pngurl, type, caller, complete) {
            this._retryCount = SheetLoader.RETRY_COUNT;
            this._queue.push({ jsonurl: jsonurl, pngurl: pngurl, type: type, caller: caller, complete: complete });
            this.next();
        };
        SheetLoader.prototype.remove = function (jsonurl) {
            var index = this.getIndex(jsonurl);
            if (index >= 0) {
                this._queue.splice(index, 1);
            }
            if (this._cur && this._cur.jsonurl == jsonurl) {
                this._cur = null;
            }
        };
        SheetLoader.prototype.has = function (jsonurl) {
            if (this._cur && this._cur.jsonurl == jsonurl)
                return true;
            return this.getIndex(jsonurl) != -1;
        };
        SheetLoader.prototype.update = function (jsonurl, caller, complete) {
            var info;
            if (this._cur && this._cur.jsonurl == jsonurl) {
                info = this._cur;
            }
            else {
                var index = this.getIndex(jsonurl);
                if (index >= 0) {
                    info = this._queue[index];
                }
            }
            if (info) {
                info.caller = caller;
                info.complete = complete;
                return true;
            }
            return false;
        };
        SheetLoader.prototype.getIndex = function (jsonurl) {
            var index = 0;
            for (var _i = 0, _a = this._queue; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.jsonurl == jsonurl) {
                    return index;
                }
                index++;
            }
            return -1;
        };
        SheetLoader.prototype.clear = function () {
            this._queue.length = 0;
            this._cur = 0;
            this._isLoading = false;
        };
        SheetLoader.prototype.next = function () {
            if (!this._queue.length || this._isLoading) {
                if (this._endMethod) {
                    this._endMethod.call(this._endCaller);
                }
                return;
            }
            this._isLoading = true;
            this._cur = this._queue.shift();
            _super.prototype.initialize.call(this, this._cur.jsonurl, this._cur.pngurl, this._cur.type);
            _super.prototype.start.call(this, this, this.itemLoadedHandler);
        };
        SheetLoader.prototype.itemLoadedHandler = function (json, png, data) {
            this._isLoading = false;
            if (!this._cur) {
                if (png)
                    png.dispose();
                return;
            }
            this._cur.complete.call(this._cur.caller, json, png, data);
            this.next();
        };
        SheetLoader.prototype.onEnd = function (caller, method) {
            this._endCaller = caller;
            this._endMethod = method;
        };
        SheetLoader.RETRY_COUNT = 1;
        return SheetLoader;
    }(game.SheetBaseLoader));
    game.SheetLoader = SheetLoader;
    __reflect(SheetLoader.prototype, "game.SheetLoader", ["game.ILoader", "game.IBaseLoader", "utils.IPool"]);
    game.uiSheetLoader = new SheetLoader();
})(game || (game = {}));
var game;
(function (game) {
    var AnimationLoader = (function () {
        function AnimationLoader() {
            this._maxThead = 5;
            this._queue = [];
            this._isLoading = false;
            this._theads = [];
            for (var i = 0; i < this._maxThead; i++) {
                this._theads.push(new game.AnimaBaseLoader(AnimationLoader.RETRY_COUNT));
            }
        }
        AnimationLoader.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
        };
        AnimationLoader.prototype.reset = function () {
            if (this._queue.length) {
                this._queue.length = 0;
            }
            this._isLoading = false;
        };
        AnimationLoader.prototype.start = function (caller, method, progress) {
            this._endCaller = caller;
            this._endMethod = method;
        };
        Object.defineProperty(AnimationLoader.prototype, "isLoading", {
            get: function () {
                return this._isLoading;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AnimationLoader.prototype, "length", {
            get: function () {
                return this._queue.length;
            },
            enumerable: true,
            configurable: true
        });
        AnimationLoader.prototype.add = function (url, type, name, caller, complete) {
            this._queue.push({ url: url, type: type, name: name, caller: caller, complete: complete });
            this.next();
        };
        AnimationLoader.prototype.remove = function (url) {
            var index = this.getIndex(url);
            if (index >= 0) {
                this._queue.splice(index, 1);
            }
            if (this._cur && this._cur.url == url) {
                this._cur = null;
            }
        };
        AnimationLoader.prototype.has = function (url) {
            if (this._cur && this._cur.url == url)
                return true;
            return this.getIndex(url) != -1;
        };
        AnimationLoader.prototype.update = function (url, caller, complete) {
            var info;
            if (this._cur && this._cur.url == url) {
                info = this._cur;
            }
            else {
                var index = this.getIndex(url);
                if (index >= 0) {
                    info = this._queue[index];
                }
            }
            if (info) {
                info.caller = caller;
                info.complete = complete;
                return true;
            }
            return false;
        };
        AnimationLoader.prototype.getIndex = function (url) {
            var index = 0;
            for (var _i = 0, _a = this._queue; _i < _a.length; _i++) {
                var obj = _a[_i];
                if (obj.url == url) {
                    return index;
                }
                index++;
            }
            return -1;
        };
        AnimationLoader.prototype.clear = function () {
            this._queue.length = 0;
            this._cur = 0;
            this._isLoading = false;
        };
        AnimationLoader.prototype.next = function () {
            var thead = this.getThead();
            if (!thead)
                return;
            if (!this._queue.length || this._isLoading) {
                if (this._endMethod) {
                    this._endMethod.call(this._endCaller);
                }
                return;
            }
            this._isLoading = true;
            this._cur = this._queue.shift();
            thead.initialize(this._cur.url + '.json', this._cur.url + '.png', this._cur.type, this._cur.name);
            thead.start(this, this.itemLoadedHandler);
        };
        AnimationLoader.prototype.itemLoadedHandler = function (json, png, data, mcFactory) {
            this._isLoading = false;
            if (!this._cur) {
                if (png)
                    png.dispose();
                game.toMovieFactory(mcFactory);
                return;
            }
            this._cur.complete.call(this._cur.caller, json, png, data, mcFactory);
            this.next();
        };
        AnimationLoader.prototype.onEnd = function (caller, method) {
            this._endCaller = caller;
            this._endMethod = method;
        };
        AnimationLoader.prototype.getThead = function () {
            for (var _i = 0, _a = this._theads; _i < _a.length; _i++) {
                var thead = _a[_i];
                if (!thead.isLoading) {
                    return thead;
                }
            }
            return null;
        };
        AnimationLoader.RETRY_COUNT = 1;
        return AnimationLoader;
    }());
    game.AnimationLoader = AnimationLoader;
    __reflect(AnimationLoader.prototype, "game.AnimationLoader", ["game.ILoader", "game.IBaseLoader", "utils.IPool"]);
    game.animationLoader = new AnimationLoader();
})(game || (game = {}));
var game;
(function (game) {
    var MapConfig = (function () {
        function MapConfig() {
        }
        Object.defineProperty(MapConfig, "BLOCK_PATH", {
            get: function () {
                return game.GameConfig.resource_other + "/map/";
            },
            enumerable: true,
            configurable: true
        });
        MapConfig.getTileX = function (pixelX) {
            return Math.round((pixelX - MapConfig.TILE_WIDTH_HALF) / MapConfig.TILE_WIDTH);
        };
        MapConfig.getTileY = function (pixelY) {
            return Math.round((pixelY - MapConfig.TILE_HEIGHT_HALF) / MapConfig.TILE_HEIGHT);
        };
        MapConfig.getReaX = function (x) {
            return (x * MapConfig.TILE_WIDTH + MapConfig.TILE_WIDTH_HALF);
        };
        MapConfig.getReaY = function (y) {
            return (y * MapConfig.TILE_HEIGHT + MapConfig.TILE_HEIGHT_HALF);
        };
        MapConfig.BLOCK_SIZE = 256;
        return MapConfig;
    }());
    game.MapConfig = MapConfig;
    __reflect(MapConfig.prototype, "game.MapConfig");
})(game || (game = {}));
var game;
(function (game) {
    var ResourceConfig = (function () {
        function ResourceConfig() {
        }
        ResourceConfig.prototype.initialize = function (version, method, caller) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            if (!game.GameConfig.incrementalupdate) {
                                if (method) {
                                    method.call(caller);
                                }
                                return [2 /*return*/, Promise.resolve()];
                            }
                            _a = this;
                            return [4 /*yield*/, this.loadConfig('manifest' + (version ? ('_' + version) : '') + '.json')];
                        case 1:
                            _a._manifest = (_c.sent());
                            _b = this;
                            return [4 /*yield*/, this.loadConfig('resource' + (version ? ('_' + version) : '') + '.json')];
                        case 2:
                            _b._resource = (_c.sent());
                            if (method) {
                                method.call(caller);
                            }
                            return [2 /*return*/, Promise.resolve()];
                    }
                });
            });
        };
        ResourceConfig.prototype.loadConfig = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (r1, r2) {
                            var xhr = new XMLHttpRequest();
                            xhr.open('GET', "./" + name, true);
                            xhr.addEventListener("load", function () {
                                xhr.removeEventListener('load', arguments.callee, false);
                                r1(JSON.parse(xhr.response.toString()));
                            });
                            xhr.send(null);
                        })];
                });
            });
        };
        Object.defineProperty(ResourceConfig.prototype, "manifest", {
            get: function () {
                return this._manifest;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ResourceConfig.prototype, "resource", {
            get: function () {
                return this._resource;
            },
            enumerable: true,
            configurable: true
        });
        return ResourceConfig;
    }());
    game.ResourceConfig = ResourceConfig;
    __reflect(ResourceConfig.prototype, "game.ResourceConfig");
    game.resourceConfig = new ResourceConfig();
})(game || (game = {}));
var game;
(function (game) {
    var TypeLoader;
    (function (TypeLoader) {
        TypeLoader[TypeLoader["IMAGE"] = 0] = "IMAGE";
        TypeLoader[TypeLoader["TEXT"] = 1] = "TEXT";
        TypeLoader[TypeLoader["SHEET"] = 2] = "SHEET";
        TypeLoader[TypeLoader["ANIMATION"] = 3] = "ANIMATION";
    })(TypeLoader = game.TypeLoader || (game.TypeLoader = {}));
    var QueueLoader = (function () {
        function QueueLoader() {
            this._max = 3;
            this._queue = [];
            this._indexes = [];
        }
        Object.defineProperty(QueueLoader.prototype, "max", {
            get: function () {
                return this._max;
            },
            set: function (v) {
                this._max = v;
            },
            enumerable: true,
            configurable: true
        });
        QueueLoader.prototype.getLoaderClazz = function (type) {
            switch (type) {
                case TypeLoader.IMAGE: return game.ImageLoader;
                case TypeLoader.TEXT: return game.TextLoader;
                case TypeLoader.SHEET: return game.SheetLoader;
                case TypeLoader.ANIMATION: return game.AnimationLoader;
            }
            return null;
        };
        /**
         * SheetLoader:(TypeLoader.SHEET,jsonurl:string,caller:any,complete:Function,pngurl:string,type:string)
         * AnimationLoader:(TypeLoader.ANIMATION,url:string,caller:any,complete:Function,type: number, name: string)
         */
        QueueLoader.prototype.add = function (type, url, caller, method) {
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            if (!this._queue[type]) {
                this._queue[type] = [];
                this._indexes[type] = 0;
            }
            var index = this._indexes[type];
            var loader;
            if (!this._queue[type][index]) {
                var clazz = this.getLoaderClazz(type);
                this._queue[type][index] = new clazz();
                this._queue[type][index].onEnd(this, this.loaderEndHandler);
            }
            loader = this._queue[type][index];
            switch (type) {
                case TypeLoader.IMAGE:
                    loader.add(url, caller, method);
                    break;
                case TypeLoader.TEXT:
                    loader.add(url, caller, method, args[0]);
                    break;
                case TypeLoader.SHEET:
                    loader.add(url, args[0], args[1], caller, method);
                    break;
                case TypeLoader.ANIMATION:
                    loader.add(url, args[0], args[1], caller, method);
                    break;
            }
            this._indexes[type]++;
            if (this._indexes[type] >= this._max) {
                this._indexes[type] = 0;
            }
        };
        QueueLoader.prototype.clear = function () {
            for (var _i = 0, _a = this._queue; _i < _a.length; _i++) {
                var loaders = _a[_i];
                if (!loaders)
                    continue;
                for (var _b = 0, loaders_1 = loaders; _b < loaders_1.length; _b++) {
                    var loader = loaders_1[_b];
                    loader.clear();
                }
            }
        };
        QueueLoader.prototype.loaderEndHandler = function () {
            for (var _i = 0, _a = this._queue; _i < _a.length; _i++) {
                var loaders = _a[_i];
                if (!loaders)
                    continue;
                for (var _b = 0, loaders_2 = loaders; _b < loaders_2.length; _b++) {
                    var loader = loaders_2[_b];
                    if (loader.isLoading || loader.length) {
                        return;
                    }
                }
            }
            if (this._endHandler) {
                var once = this._endHandler.once;
                var handler = this._endHandler;
                if (once) {
                    this._endHandler = null;
                }
                handler.run();
            }
        };
        QueueLoader.prototype.onEnd = function (caller, method) {
            this.offEnd();
            this._endHandler = utils.Handler.create(caller, method, null, false);
        };
        QueueLoader.prototype.onEndOnce = function (caller, method) {
            this.offEnd();
            this._endHandler = utils.Handler.create(caller, method, null, true);
        };
        QueueLoader.prototype.offEnd = function () {
            if (this._endHandler) {
                this._endHandler.recover();
                this._endHandler = null;
            }
        };
        return QueueLoader;
    }());
    game.QueueLoader = QueueLoader;
    __reflect(QueueLoader.prototype, "game.QueueLoader");
    game.queueLoader = new QueueLoader();
})(game || (game = {}));
var mg;
(function (mg) {
    var AssetsManager = (function () {
        function AssetsManager() {
            this._mapConfigs = {};
            //////////////////////////////////////////////////////
            //	
            //////////////////////////////////////////////////////
            this._animalib = {};
            this._iconLib = {};
            this._iconDropLib = {};
        }
        Object.defineProperty(AssetsManager, "instance", {
            get: function () {
                if (!AssetsManager._instance) {
                    AssetsManager._instance = new AssetsManager();
                }
                return AssetsManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 加载基本资源配置
         */
        AssetsManager.prototype.initialize = function (stage, caller, method) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._stage = stage;
                            //注入自定义的素材解析器
                            egret.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
                            egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
                            return [4 /*yield*/, this.loadResConfig()];
                        case 1:
                            _a.sent();
                            if (!game.GameConfig.debug) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.loadTheme()];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            if (method)
                                method.call(caller);
                            return [2 /*return*/];
                    }
                });
            });
        };
        AssetsManager.prototype.loadPreRes = function (caller, progressMain, progressChild, complete) {
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var loadTemplateFunction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            game.TextLoader.RETRY_COUNT = 3;
                            game.AnimationLoader.RETRY_COUNT = 3;
                            if (progressMain)
                                progressMain.call(caller, 0.1);
                            // await this.loadTheme(this, function (v: number) {
                            // 	if(progressChild) progressChild.call(caller,v);
                            // });
                            if (progressMain)
                                progressMain.call(caller, 0.2);
                            return [4 /*yield*/, this.loadGroupSync('preload', this, function (v) {
                                    if (progressChild)
                                        progressChild.call(caller, v);
                                    if (progressMain)
                                        progressMain.call(caller, 0.2 + 0.1 * v);
                                })];
                        case 1:
                            _a.sent();
                            if (progressMain)
                                progressMain.call(caller, 0.3);
                            return [4 /*yield*/, this.loadMap(this, function (v) {
                                    if (progressChild)
                                        progressChild.call(caller, v);
                                    if (progressMain)
                                        progressMain.call(caller, 0.3 + 0.2 * v);
                                })];
                        case 2:
                            _a.sent();
                            if (progressMain)
                                progressMain.call(caller, 0.5);
                            switch (game.GameConfig.configloadtype) {
                                case 'json':
                                    loadTemplateFunction = this.loadTemplates;
                                    break;
                                case 'zlib':
                                    loadTemplateFunction = this.loadTemplatesZlib;
                                    break;
                                case 'amf':
                                    loadTemplateFunction = this.loadTemplatesAMF;
                                    break;
                            }
                            return [4 /*yield*/, loadTemplateFunction(this, function (v) {
                                    if (progressChild)
                                        progressChild.call(caller, v);
                                    if (progressMain)
                                        progressMain.call(caller, 0.5 + 0.5 * v);
                                })];
                        case 3:
                            _a.sent();
                            if (progressMain)
                                progressMain.call(caller, 1);
                            game.TextLoader.RETRY_COUNT = 1;
                            game.AnimationLoader.RETRY_COUNT = 1;
                            if (complete)
                                complete.call.apply(complete, [caller].concat(args));
                            return [2 /*return*/];
                    }
                });
            });
        };
        AssetsManager.prototype.loadResConfig = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, function () {
                                resolve();
                            }, this);
                            RES.loadConfig(game.GameConfig.resource_path + "/default.res.json?" + game.GameConfig.version_assets, game.GameConfig.resource_path + "/");
                        })];
                });
            });
        };
        AssetsManager.prototype.loadTheme = function (caller, progress) {
            if (caller === void 0) { caller = null; }
            if (progress === void 0) { progress = null; }
            return __awaiter(this, void 0, void 0, function () {
                var i, id, that;
                return __generator(this, function (_a) {
                    i = 0;
                    id = setInterval(function () {
                        i += 2;
                        if (progress)
                            progress.call(caller, i / 100);
                        if (i == 100) {
                            clearInterval(id);
                        }
                    }, 1000 / 30);
                    that = this;
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
                            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
                            var theme = new eui.Theme(game.GameConfig.resource_path + "/default.thm.json?" + game.GameConfig.version_assets, that._stage);
                            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                                clearInterval(id);
                                resolve();
                            }, that);
                        })];
                });
            });
        };
        /**
         * 加载地图全局配置
         */
        AssetsManager.prototype.loadMap = function (caller, progress) {
            if (progress === void 0) { progress = null; }
            return __awaiter(this, void 0, void 0, function () {
                var that;
                return __generator(this, function (_a) {
                    that = this;
                    return [2 /*return*/, new Promise(function (r1, r2) {
                        var time = egret.getTimer();
                        logger.log('加载地图...');
                        var textLoader = utils.ObjectPool.from(game.TextBaseLoader, true, game.versionControl.getVirtualUrl(game.GameConfig.resource_other + "/map/config.json", window.config.version_config), true, 3);
                        textLoader.start(that, function (data) {
                            game.MapConfig.BLOCK_SIZE = data.blockSize;
                            game.MapConfig.TILE_WIDTH = 50;
                            game.MapConfig.TILE_HEIGHT = data.tileHeight;
                            game.MapConfig.TILE_WIDTH_HALF = game.MapConfig.TILE_WIDTH / 2;
                            game.MapConfig.TILE_HEIGHT_HALF = game.MapConfig.TILE_HEIGHT / 2;
                            for (var _i = 0, _a = data.maps; _i < _a.length; _i++) {
                                var map = _a[_i];
                                that._mapConfigs[map.id] = map;
                            }
                            logger.log('加载地图完成,耗时:', (egret.getTimer() - time) / 1000 + "S");
                            progress.call(caller, 1);
                            utils.ObjectPool.to(textLoader, true);
                            r1();
                        });
                    })];
                });
            });
        };
        /**
         * 加载配置文件
         */
        AssetsManager.prototype.loadTemplates = function (caller, progress) {
            if (progress === void 0) { progress = null; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (r1, r2) {
                            var time = egret.getTimer();
                            logger.log('加载配置包...');
                            var names = templates.Map.getNames();
                            var objects = {};
                            var total = 0;
                            for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
                                var name = names_1[_i];
                                game.queueLoader.add(game.TypeLoader.TEXT, game.versionControl.getVirtualUrl(game.GameConfig.resource_path + "/data/" + name + ".json", window.config.version_config), this, utils.bind(function (name, data, url) {
                                    objects[name] = data;
                                    progress.call(caller, total / names.length);
                                    total++;
                                }, name), true);
                                // objects[name] = await getText(`resource/data/${name}.json`);
                                // progress.call(caller, total / names.length);
                                // total++;
                            }
                            game.queueLoader.onEndOnce(this, function () {
                                Templates.initialize(objects);
                                logger.log('加载配置包完成,耗时:', (egret.getTimer() - time) / 1000 + "S");
                                r1();
                            });
                        })];
                });
            });
        };
        AssetsManager.prototype.loadTemplatesZlib = function (caller, progress) {
            if (progress === void 0) { progress = null; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (r1, r2) {
                            logger.log('加载配置包...');
                            new game.BytesBaseLoader().initialize(game.versionControl.getVirtualUrl(game.GameConfig.resource_path + "/data/config.nncc", window.config.version_config)).start(this, function (arrayBuff) {
                                logger.log('开始解码配置....');
                                //Loading.instance.updateProgress(0);
                                var total = templates.Map.getNames().length;
                                var loaded = 0;
                                var lib = {};
                                decoder.zlibDecoder.decode(arrayBuff, this, function (name, content) {
                                    if (name.indexOf('.') > 0) {
                                        name = name.substring(0, name.lastIndexOf('.'));
                                    }
                                    lib[name] = JSON.parse(content);
                                    logger.log('已解压..', name);
                                    loaded++;
                                    if (progress)
                                        progress(loaded / total);
                                }, function () {
                                    Templates.initialize(lib);
                                    logger.log('配置解压完成.');
                                    r1();
                                });
                            });
                        })];
                });
            });
        };
        AssetsManager.prototype.loadTemplatesAMF = function (caller, progress) {
            if (progress === void 0) { progress = null; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (r1, r2) {
                            logger.log('加载配置包...');
                            new game.BytesBaseLoader().initialize(game.versionControl.getVirtualUrl(game.GameConfig.resource_path + "/data/config.nncc", window.config.version_config)).start(this, function (arrayBuff) {
                                logger.log('开始解码配置....');
                                var object = decoder.amfDecoder.decode(arrayBuff);
                                Templates.initialize(object);
                                r1();
                            }, progress);
                        })];
                });
            });
        };
        AssetsManager.prototype.loadGroup = function (name, caller, complete, progress) {
            if (caller === void 0) { caller = null; }
            if (complete === void 0) { complete = null; }
            if (progress === void 0) { progress = null; }
            (new game.GroupLoader()).initialize(name).start(caller, complete, progress);
        };
        AssetsManager.prototype.loadGroupSync = function (name, caller, progress) {
            if (caller === void 0) { caller = null; }
            if (progress === void 0) { progress = null; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (r1, r2) {
                            (new game.GroupLoader()).initialize(name).start(caller, r1, progress);
                        })];
                });
            });
        };
        /**取动画资源 */
        AssetsManager.prototype.reciveAnimationData = function (type, name) {
            if (!this._animalib[type]) {
                this._animalib[type] = {};
            }
            if (!this._animalib[type][name]) {
                var resData = utils.ObjectPool.from(game.ResAnimationData);
                resData.initialize(type, name);
                resData.onDestory(this, this.animationDestoryHandler);
                this._animalib[type][name] = resData;
            }
            return this._animalib[type][name];
        };
        AssetsManager.prototype.animationDestoryHandler = function (resData) {
            var type = resData.type;
            var name = resData.name;
            this.destoryAnimationData(type, name);
        };
        AssetsManager.prototype.destoryAnimationData = function (type, name) {
            var lib = this._animalib[type];
            if (lib && lib[name]) {
                var resData = lib[name];
                utils.ObjectPool.to(resData, true);
                lib[name] = null;
                delete lib[name];
            }
        };
        /**取物品图标资源数据 */
        AssetsManager.prototype.getIconData = function (id) {
            if (!id)
                return null;
            if (!this._iconLib[id]) {
                var resData = utils.ObjectPool.from(game.ResIconData);
                resData.initialize(id);
                resData.onDestory(this, this.iconDestoryHandler);
                this._iconLib[id] = resData;
            }
            return this._iconLib[id];
        };
        AssetsManager.prototype.iconDestoryHandler = function (resData) {
            var id = resData.id;
            if (this._iconLib[id]) {
                utils.ObjectPool.to(resData, true);
                this._iconLib[id] = null;
                delete this._iconLib[id];
            }
        };
        /**取掉落物图标资源数据 */
        AssetsManager.prototype.getDropIconData = function (id) {
            if (!this._iconDropLib[id]) {
                var resData = utils.ObjectPool.from(game.ResDropIconData);
                resData.initialize(id);
                resData.onDestory(this, this.dropIconDestoryHandler);
                this._iconDropLib[id] = resData;
            }
            return this._iconDropLib[id];
        };
        AssetsManager.prototype.dropIconDestoryHandler = function (resData) {
            var id = resData.id;
            if (this._iconDropLib[id]) {
                utils.ObjectPool.to(resData, true);
                this._iconDropLib[id] = null;
                delete this._iconDropLib[id];
            }
        };
        AssetsManager.prototype.getRes = function (key) {
            return RES.getRes(key);
        };
        AssetsManager.prototype.getResMap = function (id) {
            return this._mapConfigs[id.toString()];
        };
        return AssetsManager;
    }());
    mg.AssetsManager = AssetsManager;
    __reflect(AssetsManager.prototype, "mg.AssetsManager");
})(mg || (mg = {}));
////////////////////////////////////
// -------------------------------
// @author:Kevin.Chen
// @date:2016-5-17下午3:03:35
// @email:kevin-chen@foxmail.com
// -------------------------------
///////////////////////////////////
var mg;
(function (mg) {
    var StageManager = (function () {
        function StageManager() {
            this._isActive = true;
            this._nextTicks = [];
            this._lastTime = 0;
            this._passedTime = 0;
            if (StageManager._instance)
                throw ("");
        }
        Object.defineProperty(StageManager, "instance", {
            get: function () {
                if (!StageManager._instance) {
                    StageManager._instance = new StageManager();
                }
                return StageManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        StageManager.prototype.initialize = function (stage) {
            if (!this._stage) {
                this._stage = stage;
                stage.addEventListener(egret.Event.RESIZE, this.updateResizeHandler, this);
                this._whRatio_design = this.designWidth / this.designHeight;
                this._ticks = [];
                this._moveticks = [];
                //egret.startTick(this.updateTick, this);
                this.frameRate = this._stage.frameRate;
                stage.addEventListener(egret.Event.ENTER_FRAME, this.enterFrame, this);
                this._isActive = true;
                stage.addEventListener(egret.Event.ACTIVATE, this.activateHandler, this);
                stage.addEventListener(egret.Event.DEACTIVATE, this.activateHandler, this);
                // egret.lifecycle.addLifecycleListener((context:egret.lifecycle.LifecycleContext) => {
                // 	// custom lifecycle plugin
                // 	document.addEventListener("qbrowserVisibilityChange", function (e: any) {
                // 		if (e.hidden) {
                // 			context.pause();
                // 		}else {
                // 			context.resume();
                // 		};
                // 	});
                // 	context.onUpdate = this.enterFrame.bind(this);
                // });
                // egret.lifecycle.onPause = () => {
                // 	this._isActive = false;
                // 	if (this._deactiveHandlers) {
                // 		this._deactiveHandlers.run();
                // 	}
                // 	egret.ticker.pause();
                // }
                // egret.lifecycle.onResume = () => {
                // 	this._isActive = true;
                // 	if (this._activeHandlers) {
                // 		this._activeHandlers.run();
                // 	}
                // 	egret.ticker.resume();
                // }
                this._timeStamp = egret.getTimer();
                utils.timer.initialize();
            }
        };
        Object.defineProperty(StageManager.prototype, "frameRate", {
            get: function () {
                return this._frameRate;
            },
            set: function (v) {
                this._frameRate = v;
                this._interval = (1000 / this._frameRate) >> 0;
                this._stage.frameRate = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "interval", {
            get: function () {
                return this._interval;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "stage", {
            get: function () {
                return this._stage;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "designWidth", {
            get: function () {
                return 600;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "designHeight", {
            get: function () {
                return 1080;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "whRatio_design", {
            /**设计宽高比 */
            get: function () {
                return this._whRatio_design;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "whRatio_current", {
            /**当前宽高比 */
            get: function () {
                return this._whRatio_current;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "stageWidth", {
            get: function () {
                return this._stage.stageWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "stageHeight", {
            get: function () {
                return this._stage.stageHeight;
            },
            enumerable: true,
            configurable: true
        });
        StageManager.prototype.updateResizeHandler = function (event) {
            this._whRatio_current = this.stageWidth / this.stageHeight;
            if (this._resizeHandlers)
                this._resizeHandlers.runWith(this.stageWidth, this.stageHeight);
        };
        /**
         * 监听对象边界外触发的点击事件
         * @param caller egret.DisplayObject 监听的显示对象以及作为回调作用域
         * @param method Function 回调的函数
         * @param limiteRect egret.Rectangle 可选,用于计算的矩形区域用于代替显示对象的矩形框
         */
        StageManager.prototype.onTapOut = function (caller, method, limiteRect) {
            if (limiteRect === void 0) { limiteRect = null; }
            if (!this._tapOutHandlerts)
                this._tapOutHandlerts = new utils.Handlers(false);
            this._tapOutHandlerts.add(caller, method, limiteRect ? [limiteRect] : null, false);
            if (!this._stage.hasEventListener(egret.TouchEvent.TOUCH_END)) {
                this._stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stageTapHandler, this);
            }
        };
        /**移除监听对象边界外触发的点击事件 */
        StageManager.prototype.offTapOut = function (caller, method) {
            if (method === void 0) { method = null; }
            if (!this._tapOutHandlerts)
                return;
            if (method) {
                this._tapOutHandlerts.remove(caller, method);
            }
            else {
                this._tapOutHandlerts.removeAll(caller);
            }
            if (!this._tapOutHandlerts.length) {
                this._stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stageTapHandler, this);
            }
        };
        StageManager.prototype.stageTapHandler = function (e) {
            var length = this._tapOutHandlerts.length;
            var list = [];
            for (var i = 0; i < length; i++) {
                var handler = this._tapOutHandlerts.getHandlerAt(i);
                if (handler.args && handler.args.length) {
                    var rect = handler.args[0];
                    if (!rect.contains(e.stageX, e.stageY)) {
                        list.push(handler);
                    }
                }
                else if (!handler.caller.hitTestPoint(e.stageX, e.stageY)) {
                    list.push(handler);
                }
            }
            for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
                var handler = list_4[_i];
                handler.run();
            }
            list.length = 0;
        };
        StageManager.prototype.activateHandler = function (e) {
            var bool = e.type == egret.Event.ACTIVATE;
            this._isActive = bool;
            if (this._isActive) {
                if (this._activeHandlers) {
                    this._activeHandlers.run();
                }
                //this._stage.addEventListener(egret.Event.ENTER_FRAME,this.enterFrame,this);
            }
            else {
                if (this._deactiveHandlers) {
                    this._deactiveHandlers.run();
                }
                //this._stage.removeEventListener(egret.Event.ENTER_FRAME,this.enterFrame,this);
            }
        };
        /**焦点激活监听 */
        StageManager.prototype.onActivate = function (caller, func, runNow) {
            if (runNow === void 0) { runNow = false; }
            if (!this._activeHandlers)
                this._activeHandlers = new utils.Handlers(false);
            var handler = this._activeHandlers.add(caller, func, null, false);
            if (runNow) {
                handler.run();
            }
        };
        /**取消焦点激活监听 */
        StageManager.prototype.offActivate = function (caller, func) {
            if (!this._activeHandlers)
                return;
            this._activeHandlers.remove(caller, func);
        };
        /**失去焦点激活监听 */
        StageManager.prototype.onDeactivate = function (caller, func, runNow) {
            if (runNow === void 0) { runNow = false; }
            if (!this._deactiveHandlers)
                this._deactiveHandlers = new utils.Handlers(false);
            var handler = this._deactiveHandlers.add(caller, func, null, false);
            if (runNow) {
                handler.run();
            }
        };
        /**取消失去焦点激活监听 */
        StageManager.prototype.offDeactivate = function (caller, func) {
            if (!this._deactiveHandlers)
                return;
            this._deactiveHandlers.remove(caller, func);
        };
        /**
         * 监听尺寸改变
         */
        StageManager.prototype.onResize = function (caller, func, runNow) {
            if (runNow === void 0) { runNow = false; }
            if (!this._resizeHandlers)
                this._resizeHandlers = new utils.Handlers(false);
            var handler = this._resizeHandlers.add(caller, func, null, false);
            if (runNow) {
                handler.runWith(this.stageWidth, this.stageHeight);
            }
        };
        /**
         * 解除监听尺寸
         */
        StageManager.prototype.offResize = function (caller, func) {
            if (!this._resizeHandlers)
                return;
            this._resizeHandlers.remove(caller, func);
        };
        StageManager.prototype.offResizeAll = function (caller) {
            if (!this._resizeHandlers)
                return;
            this._resizeHandlers.removeAll(caller);
        };
        /**
         * 立即执行尺寸改变
         */
        StageManager.prototype.resize = function (caller, method) {
            method.call(caller, this.stageWidth, this.stageHeight);
        };
        Object.defineProperty(StageManager.prototype, "timeStamp", {
            /**当前时间戳 */
            get: function () {
                return this._timeStamp;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(StageManager.prototype, "passedTime", {
            /**逝去的时间*/
            get: function () {
                return this._passedTime;
            },
            enumerable: true,
            configurable: true
        });
        StageManager.prototype.enterFrame = function () {
            var stamp = egret.getTimer();
            var self = this;
            self._timeStamp = stamp;
            for (var _i = 0, _a = self._ticks; _i < _a.length; _i++) {
                var tick = _a[_i];
                if (stamp >= tick.nexttime) {
                    tick.method.call(tick.caller, stamp);
                    tick.nexttime = stamp + tick.interval;
                }
            }
            var nextTicks = self._nextTicks;
            if (!!nextTicks && nextTicks.length) {
                while (nextTicks.length) {
                    var args = nextTicks.pop();
                    var method = nextTicks.pop();
                    var caller = nextTicks.pop();
                    method.call.apply(method, [caller].concat(args));
                }
            }
            var advancedTime = (stamp - self._lastTime);
            self._lastTime = stamp;
            var frameIntervalTime = self._interval;
            var currentTime = self._passedTime + advancedTime;
            self._passedTime = (currentTime % frameIntervalTime) >> 0;
            var num = (currentTime / frameIntervalTime) >> 0;
            if (num < 1) {
                return;
            }
            for (var _b = 0, _c = self._moveticks; _b < _c.length; _b++) {
                var moveTick = _c[_b];
                moveTick.method.call(moveTick.caller, num);
            }
        };
        /**添加移动渲染*/
        StageManager.prototype.addFrameTick = function (caller, method, priority) {
            if (priority === void 0) { priority = false; }
            var index = this.getFrameTickIndex(caller, method);
            if (index == -1) {
                if (priority) {
                    this._moveticks.unshift(utils.ObjectPool.from(TickMethod, true, caller, method, this._stage.frameRate));
                }
                else {
                    this._moveticks.push(utils.ObjectPool.from(TickMethod, true, caller, method, this._stage.frameRate));
                }
            }
        };
        /**移除移动渲染*/
        StageManager.prototype.removeFrameTick = function (caller, method) {
            var index = this.getFrameTickIndex(caller, method);
            if (index >= 0) {
                var moveTick = this._moveticks[index];
                this._moveticks.splice(index, 1);
                utils.ObjectPool.to(moveTick, true);
            }
        };
        StageManager.prototype.getFrameTickIndex = function (caller, method) {
            var i = 0;
            var total = this._moveticks.length;
            for (i = 0; i < total; i++) {
                var moveTick = this._moveticks[i];
                if (moveTick.caller == caller && moveTick.method == method) {
                    return i;
                }
            }
            return -1;
        };
        /**添加渲染 */
        StageManager.prototype.addTick = function (caller, method, fps, priority) {
            if (priority === void 0) { priority = false; }
            var index = this.getTickIndex(caller, method);
            if (index == -1) {
                if (priority) {
                    this._ticks.unshift(utils.ObjectPool.from(TickMethod, true, caller, method, fps));
                }
                else {
                    this._ticks.push(utils.ObjectPool.from(TickMethod, true, caller, method, fps));
                }
            }
        };
        /**移除渲染 */
        StageManager.prototype.removeTick = function (caller, method) {
            var index = this.getTickIndex(caller, method);
            if (index >= 0) {
                var tick = this._ticks[index];
                this._ticks.splice(index, 1);
                utils.ObjectPool.to(tick, true);
            }
        };
        StageManager.prototype.getTickIndex = function (caller, method) {
            var i = 0;
            var total = this._ticks.length;
            for (i = 0; i < total; i++) {
                var tick = this._ticks[i];
                if (tick.caller == caller && tick.method == method) {
                    return i;
                }
            }
            return -1;
        };
        /**一次渲染 */
        StageManager.prototype.onceTick = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            if (!this._nextTicks) {
                this._nextTicks = [];
            }
            this._nextTicks.push(caller, method, args);
        };
        StageManager.prototype.callLater = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.onceTick.apply(this, [caller, method].concat(args));
        };
        return StageManager;
    }());
    mg.StageManager = StageManager;
    __reflect(StageManager.prototype, "mg.StageManager");
    var TickMethod = (function () {
        function TickMethod() {
            this.autoRecover = true;
            this.toPoolTime = 0;
        }
        TickMethod.prototype.initialize = function (caller, method, fps) {
            this.caller = caller;
            this.method = method;
            this.interval = (1000 / fps) >> 0;
            this.nexttime = egret.getTimer() + this.interval;
        };
        TickMethod.prototype.reset = function () {
            this.caller = null;
            this.method = null;
        };
        return TickMethod;
    }());
    __reflect(TickMethod.prototype, "TickMethod", ["utils.IPool"]);
})(mg || (mg = {}));
var GameTheme = (function () {
    /**
     * Create an instance of Theme
     * @param configURL the external theme path. if null, you need to register the default skin name with
     * mapSkin() manually.
     * @param stage current stage.
     * If null, you need to register with egret.registerImplementation("eui.Theme",theme)
     * manually.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 创建一个主题实例
     * @param configURL 要加载并解析的外部主题配置文件路径。若传入 null，将不进行配置文件加载，
     * 之后需要在外部以代码方式手动调用 mapSkin() 方法完成每条默认皮肤名的注册。
     * @param stage 当前舞台引用。
     * 若传入null，需要在外部手动调用 egret.registerImplementation("eui.Theme",theme) 来完成主题的注册。
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    function GameTheme() {
        /**
         * @private
         */
        this.skinMap = {};
        /**
         * @private
         * styles 配置信息
         */
        this.$styles = {};
        egret.registerImplementation("eui.Theme", this);
    }
    GameTheme.prototype.parserConfig = function (data, caller, callBack) {
        if (caller === void 0) { caller = null; }
        if (data && data.skins) {
            var skinMap = this.skinMap;
            var skins = data.skins;
            var keys = Object.keys(skins);
            var length_4 = keys.length;
            for (var i = 0; i < length_4; i++) {
                var key = keys[i];
                if (!skinMap[key]) {
                    this.mapSkin(key, skins[key]);
                }
            }
        }
        if (data.styles) {
            this.$styles = data.styles;
        }
        else if (data.exmls[0]['gjs']) {
            data.exmls.forEach(function (exml) { return EXML.$parseURLContentAsJs(exml.path, exml.gjs, exml.className); });
        }
        else if (data.exmls[0]['content']) {
            data.exmls.forEach(function (exml) { return EXML.$parseURLContent(exml.path, exml.content); });
            callBack.call(caller);
        }
        else {
            EXML.$loadAll(data.exmls, callBack, caller, true);
        }
    };
    /**
     * According to the host component to get the default skin name.
     * Search rules are as follows:
     * <li>1. Use the <code>hostComponentKey</code> of client to search.</li>
     * <li>2. Use the class name of client to search.</li>
     * <li>3. Use the parent class name of client to search.</li>
     * <li>4. Repeat step 3 until find the skin name or the parent is <code>eui.Component</code>.</li>
     * @param client the component need to get the default skin.
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 根据主机组件，获取对应的默认皮肤名。查询规则如下：
     * <li>1.使用client的hostComponentKey作为键查询默认皮肤名。</li>
     * <li>2.使用client的类名作为键查询默认皮肤名。</li>
     * <li>3.使用client的父类名作为键查询默认皮肤名。</li>
     * <li>4.不断重复3直到查询到皮肤名或父类为eui.Component时停止。</li>
     * @param client 要获取默认皮肤的组件。
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    GameTheme.prototype.getSkinName = function (client) {
        var skinMap = this.skinMap;
        var skinName = skinMap[client.hostComponentKey];
        if (!skinName) {
            skinName = this.findSkinName(client);
        }
        return skinName;
    };
    /**
     * @private
     */
    GameTheme.prototype.findSkinName = function (prototype) {
        if (!prototype) {
            return "";
        }
        var key = prototype["__class__"];
        if (key === void 0) {
            return "";
        }
        var skinName = this.skinMap[key];
        if (skinName || key == "eui.Component") {
            return skinName;
        }
        return this.findSkinName(Object.getPrototypeOf(prototype));
    };
    /**
     * Map a default skin for the specified host component.
     * @param hostComponentKey the name of host component, such as "eui.Button".
     * @param skinName the name of skin, such as "app.MyButtonSkin".
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language en_US
     */
    /**
     * 为指定的主机组件映射一个默认皮肤。
     * @param hostComponentKey 主机组件名称，例如：“eui.Button”。
     * @param skinName 皮肤名称 例如："app.MyButtonSkin"。
     * @version Egret 2.4
     * @version eui 1.0
     * @platform Web,Native
     * @language zh_CN
     */
    GameTheme.prototype.mapSkin = function (hostComponentKey, skinName) {
        if (true) {
            if (!hostComponentKey) {
                egret.$error(1003, "hostComponentKey");
            }
            if (!skinName) {
                egret.$error(1003, "skinName");
            }
        }
        this.skinMap[hostComponentKey] = skinName;
    };
    GameTheme.prototype.$getStyleConfig = function (style) {
        return this.$styles[style];
    };
    return GameTheme;
}());
__reflect(GameTheme.prototype, "GameTheme");
var utils;
(function (utils) {
    var FilterUtil = (function () {
        function FilterUtil() {
            this.brightFilters = [new egret.ColorMatrixFilter([1, 0, 0, 0, 120,
                    0, 1, 0, 0, 120,
                    0, 0, 1, 0, 120,
                    0, 0, 0, 1, 0])];
            this.sideFilters = [new egret.GlowFilter(0x0, 1, 2, 2, 3, 2, false, false)];
            this.grayFilters = [new egret.ColorMatrixFilter([0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0.3, 0.6, 0, 0, 0, 0, 0, 0, 1, 0])];
        }
        return FilterUtil;
    }());
    utils.FilterUtil = FilterUtil;
    __reflect(FilterUtil.prototype, "utils.FilterUtil");
    utils.filterUtil = new FilterUtil();
})(utils || (utils = {}));
var utils;
(function (utils) {
    var Handlers = (function () {
        function Handlers(once) {
            if (once === void 0) { once = false; }
            this._list = [];
            this._once = once;
        }
        Handlers.prototype.add = function (caller, method, args, once) {
            if (args === void 0) { args = null; }
            if (once === void 0) { once = undefined; }
            if (once == undefined)
                once = this._once;
            var handler;
            var index = this.indexOf(caller, method);
            if (index >= 0) {
                handler = this._list[index];
                handler.args = args;
                handler.once = once;
            }
            else {
                handler = utils.Handler.create(caller, method, args, once);
                this._list.push(handler);
            }
            return handler;
        };
        /**添加优先回调 */
        Handlers.prototype.addPriority = function (caller, method, args, once) {
            if (args === void 0) { args = null; }
            if (once === void 0) { once = undefined; }
            if (once == undefined)
                once = this._once;
            var handler;
            var index = this.indexOf(caller, method);
            if (index >= 0) {
                handler = this._list[index];
                handler.args = args;
                handler.once = once;
                this._list.splice(index, 1);
                this._list.unshift(handler);
            }
            else {
                handler = utils.Handler.create(caller, method, args, once);
                this._list.unshift(handler);
            }
            return handler;
        };
        Handlers.prototype.remove = function (caller, method) {
            var index = this.indexOf(caller, method);
            if (index >= 0) {
                var handler = this._list[index];
                this._list.splice(index, 1);
                handler.recover();
            }
        };
        Handlers.prototype.removeAll = function (caller) {
            for (var i = 0; i < this._list.length; i++) {
                var handler = this._list[i];
                if (handler.caller == caller) {
                    this._list.splice(i, 1);
                    handler.recover();
                    i--;
                }
            }
        };
        Handlers.prototype.clear = function (compel) {
            if (compel === void 0) { compel = false; }
            if (compel) {
                for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                    var handler = _a[_i];
                    handler.recover();
                }
                this._list.length = 0;
                return;
            }
            mg.StageManager.instance.callLater(this, function (list) {
                for (var _i = 0, list_5 = list; _i < list_5.length; _i++) {
                    var handler = list_5[_i];
                    handler.recover();
                }
            }, this._list.concat());
            this._list.length = 0;
        };
        Handlers.prototype.run = function () {
            var that = this;
            var list = that._list.concat();
            for (var i = 0; i < that._list.length; i++) {
                var handler = that._list[i];
                if (handler.once) {
                    that._list.splice(i, 1);
                    i--;
                }
            }
            for (var _i = 0, list_6 = list; _i < list_6.length; _i++) {
                var handler = list_6[_i];
                handler.run();
            }
        };
        Handlers.prototype.runWith = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var that = this;
            var list = that._list.concat();
            for (var i = 0; i < that._list.length; i++) {
                var handler = that._list[i];
                if (handler.once) {
                    that._list.splice(i, 1);
                    i--;
                }
            }
            for (var _a = 0, list_7 = list; _a < list_7.length; _a++) {
                var handler = list_7[_a];
                handler.runWith.apply(handler, args);
            }
        };
        Handlers.prototype.indexOf = function (caller, method) {
            var list = this._list;
            var total = list.length;
            var index = -1;
            for (var i = 0; i < total; i++) {
                var handler = list[i];
                if (handler.caller == caller && handler.method == method) {
                    index = i;
                    break;
                }
            }
            return index;
        };
        Handlers.prototype.getHandlerAt = function (index) {
            return this._list[index];
        };
        Object.defineProperty(Handlers.prototype, "length", {
            get: function () {
                return this._list.length;
            },
            enumerable: true,
            configurable: true
        });
        return Handlers;
    }());
    utils.Handlers = Handlers;
    __reflect(Handlers.prototype, "utils.Handlers");
})(utils || (utils = {}));
var utils;
(function (utils) {
    var TimerHandler = (function () {
        function TimerHandler() {
            this.needTime = 0;
        }
        TimerHandler.prototype.TimerHandler = function () {
            this._uid = ++TimerHandler.UID;
        };
        Object.defineProperty(TimerHandler.prototype, "uid", {
            get: function () {
                return this._uid;
            },
            enumerable: true,
            configurable: true
        });
        TimerHandler.prototype.initialize = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this._caller = caller;
            this._method = method;
            this._args = args;
            this.needTime = 0;
            this._stageManager = mg.StageManager.instance;
            return this;
        };
        TimerHandler.prototype.reset = function () {
            this._caller = null;
            this._method = null;
            this._args = null;
            this._stageManager = null;
            this.needTime = 0;
            this.endTime = 0;
        };
        Object.defineProperty(TimerHandler.prototype, "caller", {
            get: function () {
                return this._caller;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimerHandler.prototype, "method", {
            get: function () {
                return this._method;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TimerHandler.prototype, "args", {
            get: function () {
                return this._args;
            },
            set: function (args) {
                this._args = args;
            },
            enumerable: true,
            configurable: true
        });
        TimerHandler.prototype.update = function (timeStamp) {
            if (timeStamp >= this.endTime) {
                this._loop ? this.loopOver() : this.onceOver();
            }
        };
        /**暂停 */
        TimerHandler.prototype.pause = function () {
            if (!this._paused) {
                this.needTime = (this.endTime - this._stageManager.timeStamp);
                if (this.needTime < 0)
                    this.needTime = 0;
                this._paused = true;
            }
        };
        /**恢复 */
        TimerHandler.prototype.resume = function () {
            if (this._paused) {
                this._paused = false;
                this.endTime = egret.getTimer() + this.needTime;
                this.needTime = 0;
            }
        };
        TimerHandler.prototype.once = function (time) {
            this._loop = false;
            this.endTime = this._stageManager.timeStamp + time;
            this.needTime = time;
            return this;
        };
        TimerHandler.prototype.onceOver = function () {
            var method = this._method;
            var caller = this._caller;
            var args = this._args;
            this._completeMethod.call(this._completeCaller, this);
            method.apply(caller, args);
        };
        TimerHandler.prototype.loop = function (time, total) {
            if (total === void 0) { total = 0; }
            this._loop = true;
            this._interval = time;
            this.startTime = this._stageManager.timeStamp;
            this.endTime = this.startTime + this._interval;
            this._totaltimes = total;
            this._times = 0;
            return this;
        };
        TimerHandler.prototype.loopOver = function () {
            if (this._method)
                this._method.apply(this._caller, this._args);
            this._times++;
            if (this._totaltimes && this._times >= this._totaltimes) {
                this._completeArgs.unshift(this);
                this._completeMethod.apply(this._completeCaller, this._completeArgs);
                return;
            }
            if (this._stageManager)
                this.endTime = this.startTime + (this._times + 1) * this._interval;
        };
        TimerHandler.prototype.call = function (caller, complete) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this._completeCaller = caller;
            this._completeMethod = complete;
            this._completeArgs = args;
        };
        TimerHandler.UID = 0;
        return TimerHandler;
    }());
    utils.TimerHandler = TimerHandler;
    __reflect(TimerHandler.prototype, "utils.TimerHandler");
    var _timerHandlerPool = [];
    function toTimerHandlerPool(handler) {
        handler.reset();
        _timerHandlerPool.push(handler);
    }
    function fromTimerHandlerPool(caller, method) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var handler;
        args.unshift(caller, method);
        if (_timerHandlerPool.length) {
            handler = _timerHandlerPool.pop();
            return handler.initialize.apply(handler, args);
        }
        handler = new TimerHandler();
        return handler.initialize.apply(handler, args);
    }
    var TimerUtils = (function () {
        function TimerUtils() {
            this._handlers = [];
        }
        Object.defineProperty(TimerUtils, "instance", {
            get: function () {
                if (!TimerUtils._instance) {
                    TimerUtils._instance = new TimerUtils();
                }
                return TimerUtils._instance;
            },
            enumerable: true,
            configurable: true
        });
        TimerUtils.prototype.initialize = function () {
            this._stageManager = mg.StageManager.instance;
            this._stageManager.addTick(this, function (timeStamp) {
                for (var _i = 0, _a = this._handlers; _i < _a.length; _i++) {
                    var handler = _a[_i];
                    handler.update(timeStamp);
                }
            }, 30);
        };
        /**
         * 执行一次计时器
         * @param time 毫秒数
         * @param caller this指向
         * @param method 回调函数
         * @param cover 是否覆盖之前的回调
         * @param args 传递参数
         */
        TimerUtils.prototype.once = function (time, caller, method, cover) {
            if (cover === void 0) { cover = true; }
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            if (time <= 0) {
                method.apply(caller, args);
                return;
            }
            var handler;
            if (cover) {
                var index = this.getIndex(caller, method);
                if (index >= 0) {
                    handler = this._handlers[index];
                    handler.args = args;
                    handler.once(time).call(this, this.onceOver);
                    return;
                }
            }
            handler = fromTimerHandlerPool.apply(void 0, [caller, method].concat(args));
            handler.once(time).call(this, this.onceOver);
            this._handlers.push(handler);
            return handler;
        };
        TimerUtils.prototype.onceOver = function (handler) {
            var index = this._handlers.indexOf(handler);
            toTimerHandlerPool(this._handlers.splice(index, 1)[0]);
        };
        /**
         * 按照间隔执行计时器
         * @param time 毫秒数
         * @param caller this指向
         * @param method 回调函数
         * @param cover 是否覆盖之前的回调
         * @param args 传递参数
         */
        TimerUtils.prototype.loop = function (time, caller, method, cover) {
            if (cover === void 0) { cover = true; }
            var args = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                args[_i - 4] = arguments[_i];
            }
            var handler;
            if (cover) {
                var index = this.getIndex(caller, method);
                if (index >= 0) {
                    handler = this._handlers[index];
                    handler.loop(time);
                    return;
                }
            }
            handler = fromTimerHandlerPool.apply(void 0, [caller, method].concat(args));
            handler.loop(time);
            this._handlers.push(handler);
            return handler;
        };
        /**
         * 按照1秒间隔执行倒计时器
         * @param times 倒计时次数
         * @param caller this指向
         * @param interval 间隔回调函数
         * @param complete 完成回调函数
         * @param cover 是否覆盖之前的回调
         * @param args 传递参数
         */
        TimerUtils.prototype.countdown = function (times, caller, interval, complete, cover) {
            if (caller === void 0) { caller = null; }
            if (interval === void 0) { interval = null; }
            if (cover === void 0) { cover = true; }
            var args = [];
            for (var _i = 5; _i < arguments.length; _i++) {
                args[_i - 5] = arguments[_i];
            }
            var handler;
            if (cover) {
                var index = this.getIndex(caller, interval);
                if (index >= 0) {
                    handler = this._handlers[index];
                    handler.loop(1000, times);
                }
            }
            if (!handler) {
                handler = fromTimerHandlerPool.apply(void 0, [caller, interval].concat(args));
                handler.loop(1000, times);
                this._handlers.push(handler);
            }
            handler.call(this, function (handler, complete) {
                var caller = handler.caller;
                this.onceOver(handler);
                if (complete)
                    complete.call(caller);
            }, complete);
            return handler;
        };
        /**
         * 清除指定计时器
         * @param caller this指向
         * @param method 回调函数
         */
        TimerUtils.prototype.clear = function (caller, method) {
            if (method === void 0) { method = null; }
            if (caller instanceof TimerHandler) {
                this.clearHandler(caller);
                return;
            }
            if (!method) {
                this.clearAll(caller);
                return;
            }
            while (true) {
                var index = this.getIndex(caller, method);
                if (index >= 0) {
                    var handler = this._handlers[index];
                    toTimerHandlerPool(handler);
                    this._handlers.splice(index, 1);
                    continue;
                }
                break;
            }
        };
        TimerUtils.prototype.clearHandler = function (handler) {
            var index = this._handlers.indexOf(handler);
            if (index >= 0) {
                this._handlers.splice(index, 1);
                toTimerHandlerPool(handler);
            }
        };
        /**
         * 清除对象上所有计时器
         * @param caller this指向
         */
        TimerUtils.prototype.clearAll = function (caller) {
            for (var i = 0; i < this._handlers.length; i++) {
                if (this._handlers[i].caller == caller) {
                    var handler = this._handlers[i];
                    this._handlers.splice(i, 1);
                    toTimerHandlerPool(handler);
                    i--;
                }
            }
        };
        TimerUtils.prototype.getIndex = function (caller, method) {
            var total = this._handlers.length;
            for (var i = 0; i < total; i++) {
                var handler = this._handlers[i];
                if (handler.caller == caller && handler.method == method) {
                    return i;
                }
            }
            return -1;
        };
        Object.defineProperty(TimerUtils.prototype, "timeStamp", {
            /**时间戳 */
            get: function () {
                return this._stageManager.timeStamp;
            },
            enumerable: true,
            configurable: true
        });
        return TimerUtils;
    }());
    utils.TimerUtils = TimerUtils;
    __reflect(TimerUtils.prototype, "utils.TimerUtils");
    utils.timer = TimerUtils.instance;
})(utils || (utils = {}));
