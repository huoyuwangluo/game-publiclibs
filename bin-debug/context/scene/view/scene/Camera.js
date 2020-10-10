var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var Camera = (function () {
        function Camera() {
            this._lastTargeX = -1;
            this._lastTargeY = -1;
            this._fellowSpeed = 8;
            this._x = 0;
            this._y = 0;
            this._z = 0;
            this._minZ = -100;
            this._maxZ = 500;
            this._factor = 1;
            this._minFactor = 0;
            this._maxFactor = 1;
            this._tweenEnabled = false;
            this._tweenSpeedEase = 10;
            this._sceneRect = new egret.Rectangle();
            this._viewPort = new s.ViewPort();
        }
        Camera.prototype.initialize = function (sceneWidth, sceneHeight) {
            this._sceneRect.width = sceneWidth;
            this._sceneRect.height = sceneHeight;
            this.updateViewPortHandler();
        };
        Camera.prototype.reset = function () {
        };
        Camera.prototype.updateViewPort = function (width, height) {
            this._viewPort.width = width;
            this._viewPort.height = height;
            this.updateViewPortHandler();
        };
        Camera.prototype.updateViewPortHandler = function () {
            if (this._sceneRect.width > 0 && this._sceneRect.height > 0) {
                this.setMinFactor(Math.max(this._viewPort.width / this._sceneRect.width, this._viewPort.height / this._sceneRect.height));
            }
        };
        Object.defineProperty(Camera.prototype, "viewPort", {
            get: function () {
                return this._viewPort;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "sceneX", {
            get: function () {
                return this._sceneRect.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "sceneY", {
            get: function () {
                return this._sceneRect.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "fcous", {
            /**
             * 焦距
             * @return
             */
            get: function () {
                return Camera.FCOUS;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "y", {
            get: function () {
                return this._y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "x", {
            /*
                    public set y(value: number) {
                        if (this._y != value) {
                            this._y = value;
                            this.bounce(this._x, this._y);
                        }
                    }
            */
            get: function () {
                return this._x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "z", {
            /*
                    public set x(value: number) {
                        if (this._x != value) {
                            this._x = value;
                            this.bounce(this._x, this._y);
                        }
                    }
            */
            get: function () {
                return this._z;
            },
            set: function (value) {
                if (value > this._maxZ) {
                    value = this._maxZ;
                }
                if (this._z != value) {
                    var f = Camera.FCOUS / (Camera.FCOUS + value);
                    if (f >= this._minFactor) {
                        this._z = value;
                        this._factor = f;
                        //this.bounce(this._x, this._y);
                    }
                    else {
                        if (value < this._z)
                            this._z = value;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "minZ", {
            get: function () {
                return this._minZ;
            },
            set: function (v) {
                this._minZ = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "maxZ", {
            get: function () {
                return this._maxZ;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Camera.prototype, "factor", {
            get: function () {
                return this._factor;
            },
            enumerable: true,
            configurable: true
        });
        Camera.prototype.setMinFactor = function (value) {
            if (this._minFactor != value) {
                this._minFactor = value;
                this._minFactor = 0.4;
                this._maxZ = (Camera.FCOUS - this._minFactor * Camera.FCOUS) / this._minFactor;
                //this._maxZ = 300;
            }
        };
        Camera.prototype.lookAt = function (target, forceFellow) {
            this._target = target;
            if (forceFellow) {
                if (target.x > 0 && target.y > 0) {
                    this._lastTargeX = target.x;
                    this._lastTargeY = target.y;
                }
            }
        };
        Object.defineProperty(Camera.prototype, "target", {
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });
        Camera.prototype.updateRender = function () {
            if (!this._target)
                return;
            if (this._target.x <= 0 || this._target.y <= 0)
                return;
            var tx = this._lastTargeX > -1 && this.z >= 0 ? this._lastTargeX : this._target.x;
            var ty = this._lastTargeY > -1 && this.z >= 0 ? this._lastTargeY : this._target.y;
            var fastSpeed = this._fellowSpeed;
            if (tx > this._target.x + this._fellowSpeed) {
                fastSpeed = (tx - this._target.x) / 30;
                if (fastSpeed > this._fellowSpeed) {
                    tx -= fastSpeed;
                }
                else {
                    tx -= this._fellowSpeed;
                }
            }
            else if (tx < this._target.x - this._fellowSpeed) {
                fastSpeed = (this._target.x - tx) / 30;
                if (fastSpeed > this._fellowSpeed) {
                    tx += fastSpeed;
                }
                else {
                    tx += this._fellowSpeed;
                }
            }
            else {
                tx = this._target.x;
            }
            if (ty > this._target.y + this._fellowSpeed) {
                fastSpeed = (ty - this._target.y) / 30;
                if (fastSpeed > this._fellowSpeed) {
                    ty -= fastSpeed;
                }
                else {
                    ty -= this._fellowSpeed;
                }
            }
            else if (ty < this._target.y - this._fellowSpeed) {
                fastSpeed = (this._target.y - ty) / 30;
                if (fastSpeed > this._fellowSpeed) {
                    ty += fastSpeed;
                }
                else {
                    ty += this._fellowSpeed;
                }
            }
            else {
                ty = this._target.y;
            }
            this._lastTargeX = tx;
            this._lastTargeY = ty;
            this.bounce(tx, ty);
        };
        Camera.prototype.bounce = function (tx, ty) {
            //			var sceneWidth:number=_sceneRect.width*_factor;
            //			var sceneHeight:number=_sceneRect.height*_factor;
            //			_x=Math.min(sceneWidth-_viewPort.halfWidth,Math.max(_viewPort.halfWidth,tx));
            //			_y=Math.min(sceneHeight-_viewPort.halfHeight,Math.max(_viewPort.halfHeight,ty));
            //			_viewPort.x=_x-_viewPort.halfWidth;
            //			_viewPort.y=_y-_viewPort.halfHeight;
            //			_sceneRect.x=-_viewPort.x;
            //			_sceneRect.y=-_viewPort.y;
            //this._x = utils.MathUtil.rangeLimit(tx, this._viewPort.halfWidth / this._factor, this._sceneRect.width - this._viewPort.halfWidth / this._factor);
            //this._y = utils.MathUtil.rangeLimit(ty - 50, this._viewPort.halfHeight / this._factor, this._sceneRect.height - this._viewPort.halfHeight / this._factor); 
            //if (TypeGame.isFormationGame()) {
            //    this._x = tx;
            //    this._y = ty;
            //}
            //else {
            //var minX: number = this._viewPort.halfWidth / this._factor;
            //var maxX: number = this._sceneRect.width - this._viewPort.halfWidth / this._factor;
            //this._x = utils.MathUtil.rangeLimit(tx, minX, maxX);
            //this._x = utils.MathUtil.rangeLimit(tx, -1000, 2000);
            //this._y = utils.MathUtil.rangeLimit(ty - 50, this._viewPort.halfHeight / this._factor, this._sceneRect.height - this._viewPort.halfHeight / this._factor);
            //}
            var minX = this._viewPort.halfWidth / this._factor;
            var maxX = this._sceneRect.width - minX;
            if (minX >= maxX) {
                minX = maxX = this._sceneRect.width / 2;
            }
            var minY = this._viewPort.halfHeight / this._factor;
            var maxY = this._sceneRect.height - minY;
            this._x = utils.MathUtil.rangeLimit(tx, minX, maxX);
            this._y = utils.MathUtil.rangeLimit(ty - 50, minY, maxY);
            this._sceneRect.x = Math.floor(this._viewPort.halfWidth - this._x * this._factor);
            this._sceneRect.y = Math.floor(this._viewPort.halfHeight - this._y * this._factor);
            //this._viewPort.x = utils.MathUtil.rangeLimit(tx * this.factor, this._viewPort.halfWidth, this._sceneRect.width * this._factor - this._viewPort.halfWidth) - this._viewPort.halfWidth;
            //this._viewPort.y = utils.MathUtil.rangeLimit(ty * this.factor, this._viewPort.halfHeight, this._sceneRect.height * this._factor - this._viewPort.halfHeight) - this._viewPort.halfHeight;
            //if (this._viewPort.x < 0)
            //    this._viewPort.x = 0;
            //if (this._viewPort.y < 0)
            //    this._viewPort.y = 0;
            //this._sceneRect.x = -this._viewPort.x;
            //this._sceneRect.y = -this._viewPort.y;
        };
        Camera.FCOUS = 200;
        return Camera;
    }());
    s.Camera = Camera;
    __reflect(Camera.prototype, "s.Camera");
})(s || (s = {}));
