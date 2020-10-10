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
var egret;
(function (egret) {
    var RichTextField = (function (_super) {
        __extends(RichTextField, _super);
        /**
        * 富文本
        * @param emoji 表情插件
        */
        function RichTextField(emoji) {
            var _this = _super.call(this) || this;
            _this._textfiled = new eui.Label();
            _this.addChild(_this._textfiled);
            _this._emojiplugin = emoji;
            _this._emojisMcs = [];
            return _this;
        }
        Object.defineProperty(RichTextField.prototype, "emojiPlugin", {
            get: function () {
                return this._emojiplugin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "textField", {
            get: function () {
                return this._textfiled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "width", {
            get: function () {
                return this._textfiled.width;
            },
            set: function (value) {
                this._textfiled.width = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "height", {
            get: function () {
                return this._textfiled.height;
            },
            set: function (value) {
                this._textfiled.height = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "textWidth", {
            get: function () {
                return this._textfiled.textWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "textHeight", {
            get: function () {
                return this._textfiled.textHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "text", {
            get: function () {
                return this._textfiled.text;
            },
            set: function (value) {
                this._matchWidth = egret.sys.measureText(this._emojiplugin.match, this.fontFamily, this.size, this.bold, this.italic);
                this._richText = this._emojiplugin.parser(value);
                this._textfiled.text = this._richText.result;
                egret.callLater(this.updateEmojis, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "textFlow", {
            get: function () {
                return this._textfiled.textFlow;
            },
            set: function (v) {
                this._matchWidth = egret.sys.measureText(this._emojiplugin.match, this.fontFamily, this.size, this.bold, this.italic);
                this._richText = { result: '', emojis: [] };
                var length = 0;
                for (var _i = 0, v_1 = v; _i < v_1.length; _i++) {
                    var element = v_1[_i];
                    var object = this._emojiplugin.parser(element.text);
                    element.text = object.result;
                    this._richText.result += object.result;
                    for (var _a = 0, _b = object.emojis; _a < _b.length; _a++) {
                        var emoji = _b[_a];
                        emoji.index += length;
                        this._richText.emojis.push(emoji);
                    }
                    length += element.text.length;
                }
                this._textfiled.textFlow = v;
                egret.callLater(this.updateEmojis, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "textAlign", {
            get: function () {
                return this._textfiled.textAlign;
            },
            set: function (value) {
                this._textfiled.textAlign = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "size", {
            get: function () {
                return this._textfiled.size;
            },
            set: function (value) {
                this._textfiled.size = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "textColor", {
            get: function () {
                return this._textfiled.textColor;
            },
            set: function (value) {
                this._textfiled.textColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "stroke", {
            get: function () {
                return this._textfiled.stroke;
            },
            set: function (value) {
                this._textfiled.stroke = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "strokeColor", {
            get: function () {
                return this._textfiled.strokeColor;
            },
            set: function (value) {
                this._textfiled.strokeColor = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "lineSpacing", {
            get: function () {
                return this._textfiled.lineSpacing;
            },
            set: function (value) {
                this._textfiled.lineSpacing = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "bold", {
            get: function () {
                return this._textfiled.bold;
            },
            set: function (value) {
                this._textfiled.bold = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "italic", {
            get: function () {
                return this._textfiled.italic;
            },
            set: function (value) {
                this._textfiled.italic = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "fontFamily", {
            get: function () {
                return this._textfiled.fontFamily;
            },
            set: function (value) {
                this._textfiled.fontFamily = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RichTextField.prototype, "emojis", {
            set: function (value) {
                if (!this._richText) {
                    this._richText = { result: '', emojis: null };
                }
                this._richText.emojis = value;
                egret.callLater(this.updateEmojis, this);
            },
            enumerable: true,
            configurable: true
        });
        RichTextField.prototype.add = function (value) {
            if (!this._richText) {
                this._richText = { result: '', emojis: [] };
            }
            this._richText.emojis.push(value);
            egret.callLater(this.updateEmojis, this);
        };
        RichTextField.prototype.remove = function (value) {
            var that = this;
            if (that._richText && that._richText.emojis && that._richText.emojis.length) {
                for (var i = 0; i < that._richText.emojis.length; i++) {
                    if (that._richText.emojis[i].index == value.index && that._richText.emojis[i].key == value.key) {
                        that._richText.emojis.splice(i, 1);
                        break;
                    }
                }
                egret.callLater(that.updateEmojis, that);
            }
        };
        RichTextField.prototype.clearEmojis = function () {
            while (this._emojisMcs.length) {
                var object = this._emojisMcs.pop();
                this._emojiplugin.toEmoji(object.key, object.emoji);
            }
        };
        RichTextField.prototype.updateEmojis = function () {
            var that = this;
            var textfiled = that._textfiled;
            var plugin = that._emojiplugin;
            var mcs = that._emojisMcs;
            var fontFamily = that.fontFamily;
            var size = that.size;
            var bold = that.bold;
            var italic = that.italic;
            that.clearEmojis();
            var lines = textfiled.$getLinesArr();
            var matchLength = (plugin.match.length / 2) >> 0;
            var lineHeight = (textfiled.textHeight + textfiled.lineSpacing) / textfiled.numLines;
            for (var _i = 0, _a = that._richText.emojis; _i < _a.length; _i++) {
                var data = _a[_i];
                var emoji = plugin.fromEmoji(data.key);
                that.addChild(emoji);
                var frontText = that._richText.result.substring(0, data.index + matchLength);
                var lineIndex = 0;
                var charNum = 0;
                for (var i = 0; i < lines.length; i++) {
                    var charLength = lines[i].elements[0].text.length;
                    if (frontText.length < (charNum + charLength)) {
                        lineIndex = i;
                        break;
                    }
                    charNum += charLength;
                }
                emoji.y = lineIndex * lineHeight + plugin.offY;
                // frontText = frontText.substring(charNum, frontText.length);
                frontText = frontText.substring(0, frontText.length);
                emoji.x = egret.sys.measureText(frontText, fontFamily, size, bold, italic) + plugin.offX - that._matchWidth / 2;
                mcs.push({
                    key: data.key,
                    emoji: emoji
                });
            }
        };
        return RichTextField;
    }(egret.DisplayObjectContainer));
    egret.RichTextField = RichTextField;
    __reflect(RichTextField.prototype, "egret.RichTextField");
    var EmojiConfig = (function () {
        function EmojiConfig(value, offx, offy) {
            this.value = value;
            this.offx = offx;
            this.offy = offy;
        }
        return EmojiConfig;
    }());
    egret.EmojiConfig = EmojiConfig;
    __reflect(EmojiConfig.prototype, "egret.EmojiConfig");
    var EmojiAnimationConfig = (function () {
        /**
         * @param value 动画表情配置集合
         * {key} 表情置换唯一键值
         * {res} 资源描述 {tag 当前表情标识 sheet 当前表情图集 } 表情资源的命名规则:{{tag}_{...}_{oreder}.png
         * @param offX 表情实际显示的偏移位置X
         * @param offY 表情实际显示的偏移位置Y
         */
        function EmojiAnimationConfig(value, offx, offy) {
            this.value = value;
            this.offx = offx;
            this.offy = offy;
        }
        return EmojiAnimationConfig;
    }());
    egret.EmojiAnimationConfig = EmojiAnimationConfig;
    __reflect(EmojiAnimationConfig.prototype, "egret.EmojiAnimationConfig");
    var EmojiPlugin = (function () {
        /**
         * 表情管理插件 当前类需要以单例形式处理
         * @param config 表情配置 key:唯一数字标识 res:表情资源
         * @param match 占位符 通常情况可设置为2个空格 具体视表情资源尺寸而定
         */
        function EmojiPlugin(config, matchtotal) {
            if (matchtotal === void 0) { matchtotal = -1; }
            //符号开始
            this._symbolBegin = '[';
            //符号结束
            this._symbolEnd = ']';
            this._config = config;
            if (matchtotal != -1) {
                this._match = this.getMatchChar(matchtotal);
            }
            else {
                this._match = this.getMatchChar((config instanceof EmojiAnimationConfig) ? 2 : 1);
            }
            this._pool = [];
            this._emojiClazz = (config instanceof EmojiAnimationConfig) ? EmojiAnimation : EmojiBitmap;
            for (var _i = 0, _a = this._config.value; _i < _a.length; _i++) {
                var v = _a[_i];
                v.symbol = "" + this._symbolBegin + v.key + this._symbolEnd;
            }
        }
        EmojiPlugin.prototype.getMatchChar = function (total) {
            var result = '';
            while (total--) {
                result += String.fromCharCode(12288);
            }
            return result;
        };
        Object.defineProperty(EmojiPlugin.prototype, "offX", {
            get: function () {
                return this._config.offx;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmojiPlugin.prototype, "offY", {
            get: function () {
                return this._config.offy;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(EmojiPlugin.prototype, "match", {
            get: function () {
                return this._match;
            },
            enumerable: true,
            configurable: true
        });
        EmojiPlugin.prototype.getSymbol = function (key) {
            for (var _i = 0, _a = this._config.value; _i < _a.length; _i++) {
                var object = _a[_i];
                if (object.key == key)
                    return object.symbol;
            }
        };
        EmojiPlugin.prototype.search = function (text) {
            var index = -1;
            for (var _i = 0, _a = this._config.value; _i < _a.length; _i++) {
                var object = _a[_i];
                var i = text.indexOf(object.symbol);
                if (i >= 0) {
                    if (index == -1) {
                        index = i;
                    }
                    else {
                        index = Math.min(i, index);
                    }
                }
            }
            return index;
        };
        /**解析文本 */
        EmojiPlugin.prototype.parser = function (text) {
            var emojis = [];
            while (true) {
                var index = this.search(text);
                if (index == -1) {
                    break;
                }
                var symbol = text.substring(index, text.indexOf(this._symbolEnd, index) + 1);
                var key = symbol.substring(1, symbol.length - 1);
                text = text.replace(symbol, this._match);
                emojis.push({
                    // key: parseInt(key),
                    key: key,
                    symbol: symbol,
                    index: index
                });
            }
            return {
                result: text,
                emojis: emojis
            };
        };
        EmojiPlugin.prototype.getConfig = function (key) {
            for (var _i = 0, _a = this._config.value; _i < _a.length; _i++) {
                var object = _a[_i];
                if (object.key == key)
                    return object;
            }
            return null;
        };
        /**表情缓存出池 */
        EmojiPlugin.prototype.fromEmoji = function (key) {
            var config = this.getConfig(key);
            if (this._pool.length) {
                return this._pool.pop().initialize(config.res);
            }
            return new (this._emojiClazz)().initialize(config.res, this);
        };
        /**表情缓存入池 */
        EmojiPlugin.prototype.toEmoji = function (key, emoji) {
            emoji.reset();
            if (emoji.parent) {
                emoji.parent.removeChild(emoji);
            }
            this._pool.push(emoji);
        };
        /**注册表情渲染触发器 */
        EmojiPlugin.prototype.register = function (ticker) {
            this._ticker = ticker;
        };
        EmojiPlugin.prototype.getTicker = function () {
            return this._ticker;
        };
        return EmojiPlugin;
    }());
    egret.EmojiPlugin = EmojiPlugin;
    __reflect(EmojiPlugin.prototype, "egret.EmojiPlugin");
    var Emoji = (function (_super) {
        __extends(Emoji, _super);
        /**
         * 当前表情显示对象 如有需要可扩展成动态表情显示
         * @param res 表情资源
         */
        function Emoji() {
            return _super.call(this, null) || this;
        }
        Emoji.prototype.initialize = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return this;
        };
        Emoji.prototype.reset = function () {
            return this;
        };
        return Emoji;
    }(egret.Bitmap));
    egret.Emoji = Emoji;
    __reflect(Emoji.prototype, "egret.Emoji");
    var EmojiBitmap = (function (_super) {
        __extends(EmojiBitmap, _super);
        /**
         * 当前表情显示对象 如有需要可扩展成动态表情显示
         * @param res 表情资源
         */
        function EmojiBitmap() {
            return _super.call(this) || this;
        }
        EmojiBitmap.prototype.initialize = function (res) {
            var _this = this;
            var texture;
            if (res instanceof egret.Texture) {
                this.texture = res;
            }
            if (!texture) {
                RES.getResAsync(res, function (texture) {
                    _this.texture = texture;
                }, this);
            }
            return this;
        };
        EmojiBitmap.prototype.reset = function () {
            this.texture = null;
            return this;
        };
        return EmojiBitmap;
    }(Emoji));
    egret.EmojiBitmap = EmojiBitmap;
    __reflect(EmojiBitmap.prototype, "egret.EmojiBitmap");
    var EmojiAnimation = (function (_super) {
        __extends(EmojiAnimation, _super);
        /**
         * 当前表情显示对象 如有需要可扩展成动态表情显示
         * @param res 表情资源
         */
        function EmojiAnimation() {
            var _this = _super.call(this) || this;
            _this.scaleX = _this.scaleY = 1.2;
            return _this;
        }
        EmojiAnimation.prototype.initialize = function (res, plugin) {
            var _this = this;
            this._plugin = plugin;
            res.sheet.getFramesAsync(res.tag, function (frames) {
                _this.texture = frames[0];
                _this._frames = frames;
                _this._index = 0;
                _this.play();
            });
            return this;
        };
        EmojiAnimation.prototype.reset = function () {
            this.stop();
            this._plugin = null;
            return this;
        };
        EmojiAnimation.prototype.play = function () {
            if (this._plugin && this._plugin.getTicker()) {
                this._plugin.getTicker().add(this, this.render, 12);
                return;
            }
            this._intervalId = egret.setInterval(this.render, this, 1000 / 12);
        };
        EmojiAnimation.prototype.stop = function () {
            if (this._plugin && this._plugin.getTicker()) {
                this._plugin.getTicker().remove(this, this.render);
                return;
            }
            if (this._intervalId) {
                egret.clearInterval(this._intervalId);
                this._intervalId = 0;
            }
        };
        EmojiAnimation.prototype.render = function () {
            this._index++;
            if (this._index >= this._frames.length) {
                this._index = 0;
            }
            this.texture = this._frames[this._index];
        };
        return EmojiAnimation;
    }(Emoji));
    egret.EmojiAnimation = EmojiAnimation;
    __reflect(EmojiAnimation.prototype, "egret.EmojiAnimation");
    var EmojiSpriteSheet = (function () {
        function EmojiSpriteSheet(sheetname) {
            var _this = this;
            RES.getResAsync(sheetname, function (res) {
                var map = {};
                var textures = res._textureMap;
                for (var key in textures) {
                    var array = key.split('_');
                    var tag = array[0];
                    var tail = array[array.length - 1];
                    if (!map[tag]) {
                        map[tag] = [];
                    }
                    map[tag].push({ order: _this.getOrder(tail), texture: textures[key] });
                }
                _this._map = {};
                for (var tag in map) {
                    var frames = map[tag];
                    frames.sort(function (a, b) {
                        return a.order > b.order ? 1 : -1;
                    });
                    _this._map[tag] = [];
                    frames.forEach(function (v) {
                        _this._map[tag].push(v.texture);
                    });
                }
                _this._spritesheet = res;
                if (_this._completes) {
                    for (var _i = 0, _a = _this._completes; _i < _a.length; _i++) {
                        var object = _a[_i];
                        object.method(_this.getFrames(object.tag));
                    }
                    _this._completes.length = 0;
                }
            }, this);
        }
        EmojiSpriteSheet.prototype.getOrder = function (name) {
            var end = name.length - 1;
            var start = 0;
            var i = end;
            while (i >= 0) {
                if (isNaN(parseInt(name.charAt(i)))) {
                    i++;
                    break;
                }
                start = i;
                i--;
            }
            return parseInt(name.substring(start, end + 1));
        };
        EmojiSpriteSheet.prototype.getFrames = function (tag) {
            return this._map[tag];
        };
        EmojiSpriteSheet.prototype.getFramesAsync = function (tag, method) {
            if (!!this._map) {
                method(this.getFrames(tag));
                return;
            }
            if (!this._completes) {
                this._completes = [];
            }
            this._completes.push({ tag: tag, method: method });
        };
        return EmojiSpriteSheet;
    }());
    egret.EmojiSpriteSheet = EmojiSpriteSheet;
    __reflect(EmojiSpriteSheet.prototype, "egret.EmojiSpriteSheet");
})(egret || (egret = {}));
