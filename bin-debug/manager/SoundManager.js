var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
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
var mg;
(function (mg) {
    var SoundManager = (function () {
        function SoundManager() {
            this._enabled = true;
            this._enabledBackGround = true;
            this._enabledEffect = true;
            this._actived = true;
            /**播放界面长音效,并且只播放一次 */
            this._className = [];
            this._lib = {};
        }
        Object.defineProperty(SoundManager, "instance", {
            get: function () {
                if (!SoundManager._instance) {
                    SoundManager._instance = new SoundManager();
                }
                return SoundManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        SoundManager.prototype.initialize = function (stage) {
            var _this = this;
            game.state.onState(TypeSetting.SOUND_ENABLED, this, function (e) {
                this.enabled = e.data;
            });
            if (game.state.getState(TypeSetting.SOUND_ENABLED) == undefined) {
                this.enabled = true;
            }
            else {
                this.enabled = game.state.getState(TypeSetting.SOUND_ENABLED);
            }
            if (Audio == undefined) {
                this.enabled = false;
            }
            //this.enabled = false;
            ///this._enabledBackGround = false;
            //this._enabledEffect = false;
            stage.addEventListener(egret.Event.ACTIVATE, this.activeHandler, this);
            stage.addEventListener(egret.Event.DEACTIVATE, this.deactiveHandler, this);
            if (platform.sdk && platform.sdk.type == platform.WB) {
                if (platform.sdk instanceof platform.SdkWanBa) {
                    platform.sdk.onWebViewVisibleChange(this, function () {
                        if (platform.sdk.getWebViewVisible()) {
                            _this.activeHandler(null);
                        }
                        else {
                            _this.deactiveHandler(null);
                        }
                    });
                }
            }
            //触摸一下IOS播放声音
            stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.initSound, this);
        };
        SoundManager.prototype.initSound = function (e) {
            mg.stageManager.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.initSound, this);
            this.playSound("IosAutoPlay", 0);
        };
        SoundManager.prototype.load = function (names, caller, method) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, names_1, name;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _i = 0, names_1 = names;
                            _a.label = 1;
                        case 1:
                            if (!(_i < names_1.length)) return [3 /*break*/, 4];
                            name = names_1[_i];
                            return [4 /*yield*/, this.loadSoundItem(name)];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4:
                            if (method)
                                method.call(caller);
                            return [2 /*return*/];
                    }
                });
            });
        };
        SoundManager.prototype.loadSoundItem = function (name) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (reslove, reject) {
                            if (!_this._lib[name]) {
                                var item = utils.ObjectPool.from(game.SoundItem, true, name);
                                _this._lib[name] = item;
                                //this._lib[name].onDestory(this, this.destoryHandler);
                                item.addEventListener(egret.Event.COMPLETE, function () {
                                    reslove();
                                }, _this);
                            }
                            else {
                                reslove();
                            }
                        })];
                });
            });
        };
        SoundManager.prototype.activeHandler = function (e) {
            this._actived = true;
            this.updateState();
        };
        SoundManager.prototype.deactiveHandler = function (e) {
            this._actived = false;
            this.updateState();
        };
        Object.defineProperty(SoundManager.prototype, "enabled", {
            get: function () {
                return this._enabled;
            },
            /**声音开关 */
            set: function (value) {
                //value = false; //先不播声音
                if (this._enabled != value) {
                    this._enabled = value;
                    this.updateState();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "enabledBackGround", {
            get: function () {
                return this._enabledBackGround;
            },
            /**背景音乐开关 */
            set: function (value) {
                if (this._enabledBackGround != value) {
                    this._enabledBackGround = value;
                    this.updateState();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SoundManager.prototype, "enabledEffect", {
            get: function () {
                return this._enabledEffect;
            },
            /**音效开关 */
            set: function (value) {
                if (this._enabledEffect != value) {
                    this._enabledEffect = value;
                    this.updateState();
                }
            },
            enumerable: true,
            configurable: true
        });
        SoundManager.prototype.updateState = function () {
            if (Audio == undefined) {
                this._enabled = false;
            }
            if (this.checkBackGroundPlay() || this.checkBackGround2Play()) {
                this.replayBackGround();
            }
            else {
                if (this._backSound) {
                    this._backSound.pause();
                }
            }
            if (!this.checkEffectPlay()) {
                for (var name in this._lib) {
                    this._lib[name].stop();
                }
            }
        };
        /**检查背景音乐是否可以播放 */
        SoundManager.prototype.checkBackGroundPlay = function () {
            if (!this._actived)
                return false;
            if (!this._enabled || !this._enabledBackGround)
                return false;
            //if (GameModels.user.player&&GameModels.user.player.level >= 80) return false;//界面音效在80级之后不再播放
            //if (!this._backGroundName) return false;
            return true;
        };
        /**检查临时背景音乐是否可以播放 */
        SoundManager.prototype.checkBackGround2Play = function () {
            if (!this._actived)
                return false;
            if (!this._enabled || !this._enabledBackGround)
                return false;
            if (!this._backGroundName2)
                return false;
            return true;
        };
        /**检查音效是否可以播放 */
        SoundManager.prototype.checkEffectPlay = function () {
            if (!this._actived)
                return false;
            if (!this._enabled || !this._enabledEffect)
                return false;
            return true;
        };
        /**播放背景音乐 */
        SoundManager.prototype.playBackGround = function (name, force) {
            //if(this._backSound && this._backSound.name == name && this._backSound.isPlay) return; //不重播
            if (force === void 0) { force = false; }
            //if (!force && this._backGroundName == name) return;
            if (!this.checkBackGroundPlay())
                return;
            var oldSound = this._lib[this._backGroundName];
            if (oldSound) {
                oldSound.stop();
            }
            if (name) {
                if (!this._lib[name]) {
                    this._lib[name] = utils.ObjectPool.from(game.SoundItem, true, name, egret.Sound.MUSIC);
                    //this._lib[name].onDestory(this, this.destoryHandler);
                }
                var sound = this._lib[name];
                sound.play(true, 1.0);
            }
            this._backGroundName = name;
            /*this.stopBackGround();
            this._backGroundName = name;
            if (!this._backSound) {
                this._backSound = new game.SoundItem();
                this._backSound.initialize("bgm_tianti", egret.Sound.MUSIC);
            }
            //this._backSound.initialize(name, egret.Sound.MUSIC);
            //if (!this.checkBackGroundPlay()) return;
            this._backSound.play(true, 1.0);
            */
        };
        SoundManager.prototype.clearBackGround = function () {
            this.stopBackGround();
            this._backGroundName = "";
        };
        /**关闭播放背景音乐 */
        SoundManager.prototype.stopBackGround = function () {
            var sound = this._lib[this._backGroundName];
            if (sound)
                sound.stop();
            /*this._backGroundName = null;
            if (this._backSound) {
                this._backSound.stop();
            }*/
        };
        SoundManager.prototype.replayBackGround = function () {
            this.playBackGround(this._backGroundName, true);
            /*if (this._backSound) {
                this._backSound.stop();
                this._backSound.play(false, 1.0);
            }*/
        };
        // public get backGoundName(): string {
        //     return this._backSound ? this._backSound.name : null;
        // }
        /**播放音效 */
        SoundManager.prototype.playSound = function (name, volume, stopLast, immediately) {
            if (volume === void 0) { volume = 1; }
            if (stopLast === void 0) { stopLast = true; }
            if (immediately === void 0) { immediately = true; }
            if (!name || !this.checkEffectPlay())
                return;
            //if (name != "GameStart") return;
            if (!this._lib[name]) {
                this._lib[name] = utils.ObjectPool.from(game.SoundItem, true, name, egret.Sound.EFFECT);
                if (name.indexOf("JuQing") > -1 || name.indexOf("SoundJM") > -1 || name.indexOf("Story") > -1) {
                    this._lib[name].onDestory(this, this.destoryHandler);
                }
            }
            var sound = this._lib[name];
            if (immediately || sound.isLoaded) {
                if (stopLast) {
                    sound.stop();
                }
                if (!sound.isPlay)
                    sound.play(false, volume);
            }
        };
        /**随机播放声音，声音串用分号隔开 */
        SoundManager.prototype.playRandomSound = function (randomStr, volume, stopLast, immediately) {
            if (volume === void 0) { volume = 1; }
            if (stopLast === void 0) { stopLast = false; }
            if (immediately === void 0) { immediately = true; }
            if (!randomStr)
                return;
            var randnomArr = randomStr.split(";");
            var index = Math.floor(Math.random() * randnomArr.length);
            this.playSound(randnomArr[index], volume, stopLast, immediately);
        };
        SoundManager.prototype.destoryHandler = function (item) {
            var name = item.name;
            if (this._lib[name]) {
                var sound = this._lib[name];
                this._lib[name] = null;
                delete this._lib[name];
                utils.ObjectPool.to(sound, true);
            }
        };
        SoundManager.prototype.playViewLongSound = function (name, viewName) {
            if (this._oldSound != name) {
                var sound = this._lib[this._oldSound];
                if (sound)
                    sound.stop();
                this._oldSound = name;
            }
            if (this._className.indexOf(viewName) == -1) {
                this.playSound(name, 1, false, true);
                this._className.push(viewName);
            }
        };
        SoundManager.prototype.clearLongSoundClassName = function (name) {
            for (var i = this._className.length - 1; i >= 0; i--) {
                if (this._className[i] == name) {
                    this._className.splice(i, 1);
                    break;
                }
            }
        };
        SoundManager.prototype.playSoundStopLast = function (name, volume, stopLast) {
            if (volume === void 0) { volume = 1; }
            if (stopLast === void 0) { stopLast = true; }
            if (!name || !this.checkEffectPlay())
                return;
            if (this._lastSound != name) {
                var soundOld = this._lib[this._lastSound];
                if (soundOld)
                    soundOld.stop();
                this._lastSound = name;
            }
            this.playSound(name, volume);
        };
        return SoundManager;
    }());
    mg.SoundManager = SoundManager;
    __reflect(SoundManager.prototype, "mg.SoundManager");
})(mg || (mg = {}));
