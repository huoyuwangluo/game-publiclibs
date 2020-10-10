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
var vo;
(function (vo) {
    var GamePlayerXpVO = (function (_super) {
        __extends(GamePlayerXpVO, _super);
        function GamePlayerXpVO() {
            var _this = _super.call(this) || this;
            _this._value = 0;
            _this._maxValue = 3000;
            _this._valueSpeed = 100;
            _this._upTimeId = 0;
            _this._maxUseTime = 20;
            _this._curUseTime = 0;
            _this._fulled = false;
            _this._actived = false;
            return _this;
        }
        GamePlayerXpVO.prototype.initialize = function (body) {
            this._state = TypeXpUp.AUTO_UP_AUTO_ACTIVE;
            this._body = body;
            this._body.onPropertyChange(TypeProperty.XPTimePer, this, this.xPDurationChangeHandler);
            // this._body.onPropertyChange(TypeProperty.ZhuanShenLevel,this,this.updateLevel);
            // this._body.onPropertyChange(TypeProperty.XPAngerPer,this,this.updateLevel);
            this.xPDurationChangeHandler();
            // this.updateLevel();  
        };
        GamePlayerXpVO.prototype.reset = function () {
            if (this._body) {
                this._body.offPropertyChange(TypeProperty.XPTimePer, this, this.xPDurationChangeHandler);
                // this._body.offPropertyChange(TypeProperty.ZhuanShenLevel,this,this.updateLevel);
                // this._body.offPropertyChange(TypeProperty.XPAngerPer,this,this.updateLevel);
                //this._body=null;
            }
            this.value = 0;
            this.clearUpInterval();
            this.clearUseInterval();
            this._curUseTime = 0;
            this._fulled = false;
            this._actived = false;
        };
        GamePlayerXpVO.prototype.resetState = function () {
            switch (this._state) {
                case TypeXpUp.STOP:
                    this.reset();
                    break;
                case TypeXpUp.AUTO_UP_AUTO_ACTIVE:
                case TypeXpUp.AUTO_UP:
                    this.startUpHandler();
                    break;
                case TypeXpUp.FOREVER:
                    this.value = this._maxValue;
                    this._fulled = true;
                    this._actived = true;
                    break;
            }
            this.dispatchEventWith(GamePlayerXpVO.ACTIVE_CHANGE);
        };
        Object.defineProperty(GamePlayerXpVO.prototype, "state", {
            get: function () {
                return this._state;
            },
            // private updateLevel(){
            //     var template:templates.heroRevive=Templates.getTemplateByProperty(templates.Map.HEROREVIVE,"powerLv",this._body.getProperty(TypeProperty.ZhuanShenLevel)) as templates.heroRevive;
            //     this._maxValue=template.angerMax;
            //     this._valueSpeed=(template.angerRecover*(1+this._body.getProperty(TypeProperty.XPAngerPer)/10000))>>0;
            // }
            /**Xp值自动叠加开关 */
            set: function (value) {
                if (this._state != value) {
                    this._state = value;
                    this.resetState();
                }
            },
            enumerable: true,
            configurable: true
        });
        GamePlayerXpVO.prototype.xPDurationChangeHandler = function () {
            // this._maxUseTime=5*(1+this._body.getProperty(TypeProperty.XPTimePer)/10000);
        };
        GamePlayerXpVO.prototype.startUpHandler = function () {
            this.clearUpInterval();
            if (this._state == TypeXpUp.AUTO_UP) {
                //this._value=0;
                this._upTimeId = egret.setInterval(this.upValueHandler, this, 1000);
            }
        };
        GamePlayerXpVO.prototype.clearUpInterval = function () {
            if (this._upTimeId) {
                egret.clearInterval(this._upTimeId);
                this._upTimeId = 0;
            }
        };
        GamePlayerXpVO.prototype.upValueHandler = function () {
            if (this._body && this._body.stateDead) {
                this.value = 0;
                if (this._fulled) {
                    this._fulled = false;
                    this.dispatchEventWith(GamePlayerXpVO.ACTIVE_CHANGE);
                }
                return;
            }
            if (this._actived)
                return;
            //if(this._value==this._maxValue) return;
            this.value += this._valueSpeed;
            if (this.value > this._maxValue) {
                this.value = this._maxValue;
            }
            if (this.value == this._maxValue && !this._fulled) {
                this._fulled = true;
                if (this._state == TypeXpUp.AUTO_UP_AUTO_ACTIVE) {
                    this.active();
                }
                this.dispatchEventWith(GamePlayerXpVO.ACTIVE_CHANGE);
            }
        };
        /**当前Xp值设置成最大值的3/4 */
        GamePlayerXpVO.prototype.setValue3_4 = function () {
            this.value = this._maxValue - this._valueSpeed * 8;
        };
        /**当前Xp值设置成最大值的3/4 */
        GamePlayerXpVO.prototype.setValue1_2 = function () {
            this.value = this._maxValue - this._valueSpeed * 10;
        };
        /**当前Xp值设置成最大值 */
        GamePlayerXpVO.prototype.setValueMax = function () {
            this.value = this._maxValue - this._valueSpeed;
        };
        Object.defineProperty(GamePlayerXpVO.prototype, "value", {
            /**当前Xp值 */
            get: function () {
                return this._value;
            },
            set: function (v) {
                if (this._value == v)
                    return;
                this._value = v;
                this.dispatchEventWith(GamePlayerXpVO.VALUE_CHANGE);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerXpVO.prototype, "maxValue", {
            /**最大Xp值 */
            get: function () {
                return this._maxValue;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerXpVO.prototype, "progress", {
            get: function () {
                return this._value / this._maxValue;
            },
            enumerable: true,
            configurable: true
        });
        /**使用Xp值 */
        GamePlayerXpVO.prototype.active = function () {
            this.clearUseInterval();
            this._curUseTime = this._maxUseTime;
            utils.timer.loop(1000, this, this.useHandler);
            this._actived = true;
            this._fulled = false;
            this.dispatchEventWith(GamePlayerXpVO.ACTIVE_CHANGE);
        };
        GamePlayerXpVO.prototype.stop = function () {
            this.clearUseInterval();
            this._actived = false;
            this._fulled = false;
            this.value = 0;
            this.startUpHandler();
            this.dispatchEventWith(GamePlayerXpVO.ACTIVE_CHANGE);
        };
        GamePlayerXpVO.prototype.clearUseInterval = function () {
            utils.timer.clear(this, this.useHandler);
        };
        GamePlayerXpVO.prototype.useHandler = function () {
            this._curUseTime--;
            if (this._curUseTime <= 0) {
                this.stop();
            }
            this.dispatchEventWith(GamePlayerXpVO.USETIME_CHANGE);
        };
        Object.defineProperty(GamePlayerXpVO.prototype, "fulled", {
            get: function () {
                return this._fulled;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerXpVO.prototype, "actived", {
            get: function () {
                return this._actived;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerXpVO.prototype, "maxUseTime", {
            get: function () {
                return this._maxUseTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GamePlayerXpVO.prototype, "lastUseTime", {
            /**Xp值使用剩余秒数 */
            get: function () {
                return this._curUseTime;
            },
            enumerable: true,
            configurable: true
        });
        GamePlayerXpVO.VALUE_CHANGE = "value_change";
        GamePlayerXpVO.USETIME_CHANGE = "usetime_change";
        GamePlayerXpVO.ACTIVE_CHANGE = "active_change";
        return GamePlayerXpVO;
    }(vo.VOBase));
    vo.GamePlayerXpVO = GamePlayerXpVO;
    __reflect(GamePlayerXpVO.prototype, "vo.GamePlayerXpVO");
})(vo || (vo = {}));
