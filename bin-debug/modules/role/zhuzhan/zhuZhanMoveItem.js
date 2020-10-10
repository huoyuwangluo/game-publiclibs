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
var common;
(function (common) {
    var zhuZhanMoveItem = (function (_super) {
        __extends(zhuZhanMoveItem, _super);
        function zhuZhanMoveItem() {
            var _this = _super.call(this) || this;
            _this._dragIndex = -1; //dragHandler的回调参数
            _this._putIndex = -1; //putHandler的回调参数
            _this._collision_Range = 80 * 80; //碰撞范围的平方值,默认40*40
            return _this;
        }
        zhuZhanMoveItem.prototype.initialize = function (data) {
            if (data === void 0) { data = null; }
            _super.prototype.initialize.call(this, data);
            this.anchorOffsetX = 40; //this.width/2;
            this.anchorOffsetY = 51.5; //this.height/2;
            //this.imgQuality.visible = false;
            this.source = data;
            this._sourceMethodCaller = this;
        };
        zhuZhanMoveItem.prototype.reset = function () {
            this._source = null;
            this.imgHead.source = null;
            this._sourceMethodCaller = null;
            this._drags = null;
            this._puts = null;
            this.clearData();
            if (this._caller) {
                this._caller.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
                this._caller.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
            }
            if (this.stage)
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveHandler, this);
            if (this.stage)
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.moveEndHandler, this);
            egret.Tween.removeTweens(this);
        };
        /**
         * 注册拖动
         * @param caller 调用对象
         * @param drags 可拖动对象数组
         * @param dragHandler 选中拖动对象回调
         * @param puts 可放置对象数组(应设置锚点在中间位置)
         * @param putHandler 放置拖动对象回调
         * @param time 长按几秒后拖动对象
         */
        zhuZhanMoveItem.prototype.register = function (caller, drags, dragHandler, puts, putHandler, clickHandler) {
            if (dragHandler === void 0) { dragHandler = null; }
            if (putHandler === void 0) { putHandler = null; }
            if (clickHandler === void 0) { clickHandler = null; }
            this.registerInfo(caller, drags, dragHandler, puts, putHandler, clickHandler);
        };
        Object.defineProperty(zhuZhanMoveItem.prototype, "collision_Range", {
            /**设置碰撞范围的平方值,默认40*40 */
            set: function (value) {
                this._collision_Range = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(zhuZhanMoveItem.prototype, "getSourceMethod", {
            set: function (method) {
                if (method) {
                    this._getSourceMethod = method;
                    this._sourceMethodCaller = this._caller;
                }
            },
            enumerable: true,
            configurable: true
        });
        zhuZhanMoveItem.prototype._getSourceMethod = function (selectItem, dragIndex) {
            if (dragIndex === void 0) { dragIndex = -1; }
            if (selectItem)
                return selectItem;
            return null;
        };
        Object.defineProperty(zhuZhanMoveItem.prototype, "source", {
            get: function () {
                return this._source;
            },
            set: function (data) {
                if (!data) {
                    this.visible = false;
                    this.imgHead.source = null;
                    this.imgStar.source = null;
                    this.imgQuality.source = null;
                    this.labLockLv.text = "";
                    this.imgPetJob.source = null;
                    this._source = null;
                }
                else {
                    this._source = data;
                    this.visible = true;
                    this.labLockLv.text = "";
                    var petId = 0;
                    var elements = [];
                    if (data instanceof vo.GamePetVO) {
                        petId = parseInt(data.refId);
                        this.imgHead.source = ResPath.getPetIconSmall(data.headIcon);
                        this.imgPetJob.source = "common_json.img_pet_job" + data.template.corps + "_png";
                        this.imgStar.source = "tujian_json.img_star" + data.star;
                    }
                    else if (data instanceof templates.general) {
                        petId = data.id;
                        this.imgHead.source = ResPath.getPetIconSmall(data.model);
                        this.imgPetJob.source = "common_json.img_pet_job" + data.corps + "_png";
                        this.imgStar.source = "tujian_json.img_star" + data.star;
                    }
                    this.imgQuality.source = ResPath.getLingXingQualityByStar(data.star, GameModels.pet.isHashFourSkill(petId));
                }
            },
            enumerable: true,
            configurable: true
        });
        zhuZhanMoveItem.prototype.registerInfo = function (caller, drags, dragHandler, puts, putHandler, clickHandler) {
            if (dragHandler === void 0) { dragHandler = null; }
            if (putHandler === void 0) { putHandler = null; }
            if (clickHandler === void 0) { clickHandler = null; }
            this._caller = caller;
            this._drags = drags;
            this._puts = puts;
            this._dragHandler = dragHandler;
            this._putHandler = putHandler;
            this._clickHandler = clickHandler;
            this._isMove = false;
            if (!this._caller || !this._drags || !this._puts)
                return;
            this._caller.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBeginHandler, this);
            this._caller.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEndHandler, this);
        };
        zhuZhanMoveItem.prototype.touchBeginHandler = function (e) {
            logger.log("开始点击。。。。。。。");
            this.clearData();
            if (this._drags instanceof eui.List) {
                this._dragIndex = this._drags.getChildIndex(e.target);
            }
            else if (this._drags.length > 0) {
                for (var i = 0; i < this._drags.length; i++) {
                    if (this._drags[i] == e.target) {
                        this._dragIndex = i;
                        break;
                    }
                }
            }
            if (this._dragIndex >= 0) {
                if (this._dragHandler) {
                    if (this._dragHandler.call(this._caller, this._dragIndex))
                        this.startmove(e);
                }
                else
                    this.startmove(e);
            }
        };
        zhuZhanMoveItem.prototype.touchEndHandler = function (e) {
            logger.log("结束点击。。。。。。。");
        };
        zhuZhanMoveItem.prototype.startmove = function (e) {
            logger.log("开始移动。。。。。。。");
            egret.Tween.removeTweens(this);
            var selectItem;
            if (this._drags instanceof eui.List) {
                selectItem = this._drags.getChildAt(this._dragIndex);
            }
            else {
                selectItem = this._drags[this._dragIndex];
            }
            if (!this._sourceMethodCaller)
                this._sourceMethodCaller = this;
            this.source = this._getSourceMethod.call(this._sourceMethodCaller, selectItem, this._dragIndex);
            if (!this.source) {
                console.log("未获取到拖动资源");
                return;
            }
            // this._startPosPoint = this.parent.globalToLocal(e.stageX, e.stageY);
            // this.x = this._startPosPoint.x;
            // this.y = this._startPosPoint.y;
            this.x = selectItem.x - 11;
            this.y = selectItem.y - 8.5;
            if (this.stage)
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveHandler, this);
            if (this.stage)
                this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.moveEndHandler, this);
        };
        zhuZhanMoveItem.prototype.moveHandler = function (e) {
            logger.log("开始移动11111。。。。。。。");
            this._isMove = true;
            var point = this.parent.globalToLocal(e.stageX, e.stageY);
            if (point.x > 30 && point.x < this.parent.width - 30 && point.y > 30 && point.y < this.parent.height - 30) {
                this.x = point.x;
                this.y = point.y;
            }
        };
        zhuZhanMoveItem.prototype.moveEndHandler = function (e) {
            var _this = this;
            logger.log("结束移动11111。。。。。。。");
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.moveHandler, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.moveEndHandler, this);
            this._putIndex = this.touchTestPointIndex();
            egret.Tween.removeTweens(this);
            if (this._putIndex >= 0) {
                //放置成功
                egret.Tween.get(this).to({ x: this._puts[this._putIndex].x - 11, y: this._puts[this._putIndex].y - 8.5 }, 200, utils.Ease.cubicInOut).call(function () {
                    // this.source = null;
                    egret.Tween.removeTweens(_this);
                    var isSuccess = false;
                    if (_this._putHandler)
                        isSuccess = _this._putHandler.call(_this._caller, _this._isMove ? _this._putIndex : 9999);
                    if (!isSuccess) {
                        _this.tweenBack(); //放置后(条件不满足,飞回原位置)
                    }
                    else {
                        _this.source = null;
                    }
                }, this);
            }
            else {
                //放置失败,飞回原位置
                this.tweenBack();
            }
        };
        //飞回原位置
        zhuZhanMoveItem.prototype.tweenBack = function () {
            var _this = this;
            if (!this._isMove) {
                this.source = null;
                egret.Tween.removeTweens(this);
                // this._putHandler.call(this._caller, -1);
                if (this._clickHandler)
                    this._clickHandler.call(this._caller, this._dragIndex);
                return;
            }
            var point;
            if (this._drags instanceof eui.List) {
                var selectItem = this._drags.getChildAt(this._dragIndex);
            }
            else {
                selectItem = this._drags[this._dragIndex];
            }
            if (!selectItem) {
                this.source = null;
                egret.Tween.removeTweens(this);
                this._putHandler.call(this._caller, -1);
                //if (!this._isMove) this._clickHandler.call(this._caller, this._dragIndex);
                return;
            }
            var selectPoint = selectItem.parent.localToGlobal(selectItem.x + (selectItem.anchorOffsetX ? 0 : (selectItem.width / 2)), selectItem.y + (selectItem.anchorOffsetY ? 0 : (selectItem.height / 2)));
            point = this.parent.globalToLocal(selectPoint.x, selectPoint.y);
            var time = Math.min(500, (Math.abs(this.x - point.x) + Math.abs(this.y - point.y)));
            egret.Tween.get(this).to({ x: point.x, y: point.y }, time, utils.Ease.cubicInOut).call(function () {
                _this.source = null;
                egret.Tween.removeTweens(_this);
                _this._putHandler.call(_this._caller, -1);
                //if (!this._isMove) this._clickHandler.call(this._caller, this._dragIndex);
            }, this);
        };
        zhuZhanMoveItem.prototype.touchTestPointIndex = function () {
            var disArray = [];
            for (var i = 0; i < this._puts.length; i++) {
                var disX = Math.abs(this.x - this._puts[i].x);
                var disY = Math.abs(this.y - this._puts[i].y);
                var dis = disX * disX + disY * disY;
                disArray.push(dis);
            }
            var minDis = 2 * this._collision_Range;
            var putIndex = -1;
            for (var i = 0; i < disArray.length; i++) {
                if (minDis > disArray[i] && disArray[i] <= this._collision_Range) {
                    minDis = disArray[i];
                    putIndex = i;
                }
            }
            return putIndex;
        };
        zhuZhanMoveItem.prototype.clearData = function () {
            this._dragIndex = -1;
            this._putIndex = -1;
            this._isMove = false;
        };
        return zhuZhanMoveItem;
    }(ui.HeadInfo2Skin));
    common.zhuZhanMoveItem = zhuZhanMoveItem;
    __reflect(zhuZhanMoveItem.prototype, "common.zhuZhanMoveItem");
})(common || (common = {}));
