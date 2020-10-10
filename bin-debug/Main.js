//////////////////////////////////////////////////////////////////////////////////////
//
//   Copyright (c) 2014-present, Egret Technology.
//   All rights reserved.
//   Redistribution and use in source and binary forms, with or without
//   modification, are permitted provided that the following conditions are met:
// 
//      * Redistributions of source code must retain the above copyright
//        notice, this list of conditions and the following disclaimer.
//      * Redistributions in binary form must reproduce the above copyright
//        notice, this list of conditions and the following disclaimer in the
//        documentation and/or other materials provided with the distribution.
//      * Neither the name of the Egret nor the
//        names of its contributors may be used to endorse or promote products
//        derived from this software without specific prior written permission.
// 
//   THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//   OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//   OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//   IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//   INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//   LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//   OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//   EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
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
    var LogLogingType = (function () {
        function LogLogingType() {
        }
        LogLogingType.CONFIG_START = 11; //开始加载游戏配置
        LogLogingType.LOGIN_START = 12; //开始登陆游戏
        LogLogingType.LOAD_GAME_RES = 13; //加载游戏资源
        return LogLogingType;
    }());
    game.LogLogingType = LogLogingType;
    __reflect(LogLogingType.prototype, "game.LogLogingType");
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            var _this = _super.call(this) || this;
            /**更新进度显示 */
            _this._lastLogLoadingTime = 0;
            egret.ImageLoader.crossOrigin = "anonymous";
            GameModels.initializeLogin(window.config.logindata);
            game.resourceConfig = window.config.resourceConfig;
            if (window.config.logindata) {
                delete window.config.logindata;
                _this.initialize();
                return _this;
            }
            alert(Language.J_MYRHSJ);
            return _this;
        }
        Main.prototype.getLogLoadingURL = function () {
            return (window.config.ssl ? 'https' : 'http') + "://" + window.config.ip + "/" + window.config.platform + "/logLoading.php";
        };
        Main.prototype.logLoading = function (roleId, step, total) {
            if (total === void 0) { total = 0; }
            if (roleId == "" || roleId == undefined)
                return;
            var logStr = this.getLogLoadingURL() + "?roleId=" + roleId + "&step=" + step + "&total=" + total;
            n.http.request(logStr, null, null);
        };
        Main.prototype.initialize = function () {
            return __awaiter(this, void 0, void 0, function () {
                var t;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            logger.log('检查到登录数据,开始登录游戏....');
                            app.initialize(window.config.stage);
                            try {
                                window.shell.ShellLoading.instance.tag = Language.J_ZZCSH;
                            }
                            catch (e) { }
                            ;
                            try {
                                mg.layerManager.initializeSdkLayer(window.shell.layerManager.sdk);
                            }
                            catch (e) { }
                            ;
                            RES.registerVersionController(game.versionControl);
                            game.versionControl.init();
                            //RES.setMaxLoadingThread(2);
                            this.logLoading(GameModels.login.accountName, LogLogingType.CONFIG_START);
                            return [4 /*yield*/, this.loadFirst()];
                        case 1:
                            _a.sent();
                            t = egret.getTimer();
                            return [4 /*yield*/, mg.assetsManager.initialize(window.config.stage)];
                        case 2:
                            _a.sent();
                            logger.log((egret.getTimer() - t) / 1000 + "S");
                            mg.dialogManager.initialize(window.config.stage);
                            try {
                                window.removeLogo();
                            }
                            catch (e) { }
                            ;
                            try {
                                window.shell.ShellLoading.instance.showTip(Language.J_ZZLJFWQ);
                            }
                            catch (e) { }
                            ;
                            this.logLoading(GameModels.login.accountName, LogLogingType.LOGIN_START);
                            if (GameModels.login.serverList) {
                                logger.log("initialize111111111111111");
                                GameModels.login.onLoginSuccess(this, this.loginSuccessHandler);
                                GameModels.login.enter(utils.Handler.create(this, function () {
                                    logger.log("initialize22222222222222222222");
                                    try {
                                        logger.log("initialize33333333333333333333333333", window.shell)(window).shell.ShellLoading.instance.hide;
                                    }
                                    catch (e) { }
                                    ;
                                }), utils.Handler.create(this, function () {
                                    logger.log("initialize444444444444444444444");
                                    try {
                                        logger.log("initialize555555555555555555")(window).shell.ShellLoading.instance.hide();
                                    }
                                    catch (e) { }
                                    ;
                                    /**特殊处理先打攻城战 后弹创建角色界面 */
                                    this.createPlayer();
                                    // mg.uiManager.register(s.UserfaceName.createactor, login.CreateActorView, 0, null, TypePop.POP, 999);
                                    // mg.uiManager.show(login.CreateActorView);
                                }));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        Main.prototype.createPlayer = function () {
            var name = GameModels.login.randomName(true);
            GameModels.login.createCharActor(true, 1, name, utils.Handler.create(this, function (data) {
                GameModels.platform.uploadCreateRole(data.CharId, name);
                logger.log('登录角色....', data.CharId);
                GameModels.login.charActorLogin(data.CharId, utils.Handler.create(this, function () {
                    mg.uiManager.removeAllDialogs();
                }));
            }));
            n.net.onError(n.MessageMap.C2G_CHARACTERCREATE, utils.Handler.create(this, function (data) {
                mg.alertManager.tip(data.CodeMsg, 0xff0000);
            }));
        };
        Main.prototype.loadFirst = function (caller, method) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (reslove, reject) {
                            game.queueLoader.add(game.TypeLoader.TEXT, game.GameConfig.resource_path + "/config/name.json", _this, function (nameLib) {
                                logger.log('名称库加载完毕....');
                                GameModels.login.parseNameonfig(nameLib);
                            }, true);
                            game.queueLoader.add(game.TypeLoader.TEXT, game.GameConfig.resource_path + "/config/sensitive1.txt", _this, function (sensitiveTxt) {
                                logger.log('敏感字库加载完毕....');
                                GameModels.login.parseSensitiveConfig(sensitiveTxt);
                            });
                            game.queueLoader.onEndOnce(_this, function () {
                                if (method)
                                    method.call(caller);
                                reslove();
                            });
                        })];
                });
            });
        };
        Main.prototype.loginSuccessHandler = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            GameModels.login.offLoginSuccess();
                            // mg.uiManager.unRegister(login.CreateActorView);
                            GameModels.timer.start();
                            data.autoRecover = false;
                            logger.log('开始加载资源...');
                            Loading.instance.add();
                            return [4 /*yield*/, mg.assetsManager.loadPreRes(this, this.updateProgressMain, this.updateProgress)];
                        case 1:
                            _a.sent();
                            logger.log('资源加载完成...,准备进入游戏...');
                            try {
                                window.shell.ShellLoading.instance.hide();
                            }
                            catch (e) { }
                            ;
                            GameModels.user.initializeData(data);
                            GameModels.equip.initializeData();
                            GameModels.initialize(data);
                            Loading.instance.remove();
                            data.reset();
                            app.start();
                            mg.assetsManager.loadGroup('scene');
                            return [2 /*return*/];
                    }
                });
            });
        };
        Main.prototype.updateProgressMain = function (value) {
            Loading.instance.updateProgressMain(value);
            var now = egret.getTimer();
            if (now - this._lastLogLoadingTime > 3000 || value >= 1) {
                if (this._lastLogLoadingTime > 0 || value >= 1) {
                    this.logLoading(GameModels.login.accountName, LogLogingType.LOAD_GAME_RES, Math.floor(value * 100));
                }
                this._lastLogLoadingTime = now;
            }
        };
        Main.prototype.updateProgress = function (value) {
            Loading.instance.updateProgress(value);
        };
        return Main;
    }(egret.DisplayObjectContainer));
    game.Main = Main;
    __reflect(Main.prototype, "game.Main");
})(game || (game = {}));
