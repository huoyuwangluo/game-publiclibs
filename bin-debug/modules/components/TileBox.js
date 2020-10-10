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
var main;
(function (main) {
    var TileBox = (function (_super) {
        __extends(TileBox, _super);
        function TileBox() {
            var _this = _super.call(this) || this;
            _this._childs = [];
            _this._isHide = false;
            _this._iconContainer = new egret.DisplayObjectContainer();
            _this.addChild(_this._iconContainer);
            _this._effectContainer = new egret.DisplayObjectContainer();
            _this.addChild(_this._effectContainer);
            return _this;
        }
        Object.defineProperty(TileBox.prototype, "iconContainer", {
            get: function () {
                return this._iconContainer;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileBox.prototype, "effectContainer", {
            get: function () {
                return this._effectContainer;
            },
            enumerable: true,
            configurable: true
        });
        TileBox.prototype.reset = function () {
        };
        Object.defineProperty(TileBox.prototype, "isHide", {
            set: function (value) {
                if (this._isHide != value) {
                    this._isHide = value;
                    for (var _i = 0, _a = this._childs; _i < _a.length; _i++) {
                        var c = _a[_i];
                        c.visible = !value || !c.isHide;
                    }
                    egret.callLater(this.updateDisplayLayout, this, value ? 122 : 42);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileBox.prototype, "padding", {
            set: function (value) {
                if (this._padding != value) {
                    this._padding = value;
                    egret.callLater(this.updateDisplayLayout, this);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileBox.prototype, "isVertical", {
            set: function (value) {
                this._isVertical = value;
                egret.callLater(this.updateDisplayLayout, this);
            },
            enumerable: true,
            configurable: true
        });
        TileBox.prototype.addElement = function (item) {
            if (this._childs.indexOf(item) < 0) {
                this._childs.push(item);
                this._childs.sort(function (a, b) {
                    if (a.index > b.index)
                        return 1;
                    else if (a.index < b.index)
                        return -1;
                    else
                        return 0;
                });
                item.add(this);
                item.visible = !item.isHide || !this._isHide;
                egret.callLater(this.updateDisplayLayout, this);
            }
        };
        TileBox.prototype.removeElement = function (item) {
            item.remove();
            for (var i = 0; i < this._childs.length; i++) {
                var t = this._childs[i];
                if (t == item) {
                    t.effectEnabled = false;
                    this._childs.splice(i, 1);
                    break;
                }
            }
            egret.callLater(this.updateDisplayLayout, this);
        };
        TileBox.prototype.updateDisplayLayout = function (value) {
            if (value === void 0) { value = 42; }
            if (this._childs.length == 0)
                return;
            this._nowY = value;
            this._cellH = 80;
            if (this._isVertical) {
                for (var _i = 0, _a = this._childs; _i < _a.length; _i++) {
                    var c = _a[_i];
                    if (this._isHide == false || c.isHide == false) {
                        c.y = this._nowY;
                        c.x = 42;
                        this._nowY += this._cellH + this._padding;
                    }
                }
            }
            else {
                for (var _b = 0, _c = this._childs; _b < _c.length; _b++) {
                    var c = _c[_b];
                    if (this._isHide == false || c.isHide == false) {
                        c.x = this._nowY;
                        c.y = 42;
                        this._nowY += this._cellH + this._padding;
                    }
                }
            }
        };
        TileBox.prototype.addChild = function (child) {
            if (child instanceof s.AnimationSprite) {
                for (var _i = 0, _a = this._childs; _i < _a.length; _i++) {
                    var c = _a[_i];
                    c.visible = !this._isHide || !c.isHide;
                }
            }
            return _super.prototype.addChild.call(this, child);
        };
        return TileBox;
    }(eui.Component));
    main.TileBox = TileBox;
    __reflect(TileBox.prototype, "main.TileBox");
    var TileBoxItem = (function () {
        function TileBoxItem(name, skin, index, isHide) {
            this._name = name;
            this._skin = skin;
            this.index = index;
            this.isHide = isHide;
        }
        Object.defineProperty(TileBoxItem.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileBoxItem.prototype, "skin", {
            get: function () {
                return this._skin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileBoxItem.prototype, "name", {
            get: function () {
                return this._name;
            },
            enumerable: true,
            configurable: true
        });
        TileBoxItem.prototype.add = function (parent) {
            this._parent = parent;
            parent.iconContainer.addChild(this._skin);
            if (this._effectEnabled && this._effectKey && this._effect) {
                if (this._parent) {
                    this._parent.effectContainer.addChild(this._effect);
                    this._effect.play();
                }
            }
        };
        TileBoxItem.prototype.remove = function () {
            if (this._skin.parent) {
                this._skin.parent.removeChild(this._skin);
            }
            if (this._effect) {
                this._effect.stop();
                if (this._effect.parent) {
                    this._effect.parent.removeChild(this._effect);
                }
            }
            this._parent = null;
        };
        TileBoxItem.prototype.destory = function () {
        };
        Object.defineProperty(TileBoxItem.prototype, "x", {
            get: function () {
                return this._skin.x;
            },
            set: function (value) {
                this._skin.x = value;
                if (this._effect) {
                    this._effect.x = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileBoxItem.prototype, "y", {
            get: function () {
                return this._skin.y;
            },
            set: function (value) {
                this._skin.y = value;
                if (this._effect) {
                    this._effect.y = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileBoxItem.prototype, "visible", {
            get: function () {
                return this._skin.visible;
            },
            set: function (value) {
                this._skin.visible = value;
                if (this._effect) {
                    this._effect.visible = value;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileBoxItem.prototype, "effectKey", {
            set: function (value) {
                this._effectKey = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(TileBoxItem.prototype, "effectEnabled", {
            set: function (value) {
                if (this._effectEnabled != value) {
                    this._effectEnabled = value;
                    if (this._effectEnabled && this._effectKey) {
                        if (!this._effect) {
                            this._effect = utils.ObjectPool.from(s.AnimationSprite);
                            ;
                            this._effect.frameRate = 8;
                            this._effect.touchEnabled = false;
                            this._effect.touchChildren = false;
                        }
                        this._effect.resId = this._effectKey;
                        this._effect.x = this._skin.x;
                        this._effect.y = this._skin.y;
                        if (this._parent) {
                            this._parent.effectContainer.addChild(this._effect);
                            this._effect.play();
                        }
                    }
                    else {
                        if (this._effect) {
                            this._effect.stop();
                            if (this._effect.parent) {
                                this._effect.parent.removeChild(this._effect);
                            }
                            this._effect.offAllComplete();
                            utils.ObjectPool.to(this._effect, true);
                            this._effect = null;
                        }
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        return TileBoxItem;
    }());
    main.TileBoxItem = TileBoxItem;
    __reflect(TileBoxItem.prototype, "main.TileBoxItem");
})(main || (main = {}));
