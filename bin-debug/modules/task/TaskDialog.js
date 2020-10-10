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
var dialog;
(function (dialog) {
    var task;
    (function (task) {
        var TaskDialog = (function (_super) {
            __extends(TaskDialog, _super);
            function TaskDialog() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TaskDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                // this._effect = new s.AnimationSprite();
                // this.addChild(this._effect);
                // this._effect.x = this.btnOk.x;
                // this._effect.y = this.btnOk.y;
                this.touchEnabled = true;
                this.parent.touchEnabled = true;
                this._boxes = [this.box1, this.box2, this.box3];
                this._pool = new utils.Pool(egret.getQualifiedClassName(components.ItemBox), components.ItemBox);
                Mediator.getMediator(this).onAdd(this, function (npcId, isNpcTarget) {
                    if (isNpcTarget === void 0) { isNpcTarget = 0; }
                    this._isNpcTarget = isNpcTarget;
                    this.btnOk.once(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
                    // if (this.parent) {
                    //     this.parent.once(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
                    // }
                    mg.stageManager.stage.once(egret.TouchEvent.TOUCH_END, this.tapHandler, this);
                    if (this._isNpcTarget == 201005) {
                        this.labName.text = Language.C_GYP;
                    }
                    else if (this._isNpcTarget == 102011) {
                        this.labName.text = Language.C_SL1;
                    }
                    else {
                        this.labName.text = Templates.getTemplateById(templates.Map.TASKNPC, npcId).name;
                    }
                    this.labContent.text = GameModels.task.curTask.template.des;
                    var items = GameModels.task.curTask.items;
                    for (var i = 0; i < this._boxes.length; i++) {
                        var itemVO = i < items.length ? items[i] : null;
                        if (itemVO) {
                            this._boxes[i].visible = true;
                            this._boxes[i].data = itemVO;
                        }
                        else {
                            this._boxes[i].visible = false;
                        }
                    }
                    this._totalTime = 5;
                    utils.timer.loop(1000, this, this.timeHandler);
                    this.timeHandler();
                    // this._effect.resId = TypeEffectId.BUTTON_EFF_BIG_RED;
                    // this._effect.play();
                });
                Mediator.getMediator(this).onRemove(this, function () {
                    for (var i = 0; i < this._boxes.length; i++) {
                        this._boxes[i].data = null;
                        this._boxes[i].visible = false;
                    }
                    this.btnOk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tabHandler, this);
                    mg.stageManager.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.tapHandler, this);
                    // if (this.parent) {
                    //     this.parent.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tapHandler, this);
                    // }
                    utils.timer.clear(this, this.timeHandler);
                    // this._effect.stop();
                });
            };
            TaskDialog.prototype.timeHandler = function () {
                if (this._totalTime <= 0) {
                    this.tapHandler(null);
                    return;
                }
                this.labelTip.text = Language.getExpression(Language.E_1MHZDTJ, this._totalTime);
                this._totalTime--;
            };
            TaskDialog.prototype.tapHandler = function (e) {
                mg.soundManager.playSound('ButtonClick_1');
                for (var i = 0; i < this._boxes.length; i++) {
                    if (!this._boxes[i].visible)
                        continue;
                    if (this._boxes[i].data.id == "101") {
                        var targetPos = mg.uiManager.getView(main.MainUIView).getMoneyPostion(true);
                        mg.effectManager.flyEffects("6160", 10, this._boxes[i].localToGlobal(45, 45), targetPos, mg.layerManager.top);
                        continue;
                    }
                    if (this._boxes[i].data.id == "301") {
                        var targetPos = mg.uiManager.getView(main.MainUIView).getRolePostion(true);
                        mg.effectManager.flyEffects("6161", 1, this._boxes[i].localToGlobal(45, 45), targetPos, mg.layerManager.top);
                        continue;
                    }
                    if (this._boxes[i].data.id == "201") {
                        var targetPos = mg.uiManager.getView(main.MainUIView).getDiamondPostion(true);
                        mg.effectManager.flyEffects("6199", 10, this._boxes[i].localToGlobal(45, 45), targetPos, mg.layerManager.top);
                        continue;
                    }
                    var flyBox = this._pool.from();
                    flyBox.data = this._boxes[i].data.clone();
                    mg.layerManager.top.addChild(flyBox);
                    var point = this._boxes[i].localToGlobal(0, 0);
                    flyBox.anchorOffsetX = flyBox.width / 2;
                    flyBox.anchorOffsetY = flyBox.height / 2;
                    flyBox.x = point.x + flyBox.width / 2;
                    flyBox.y = point.y + flyBox.height / 2;
                    var bagPosition = mg.uiManager.getView(main.MainUIView).getBagPostion(true);
                    egret.Tween.get(flyBox).to({ x: bagPosition.x, y: bagPosition.y, scaleX: 0.5, scaleY: 0.5 }, 1000, utils.Ease.cubicInOut).call(this.flyOverHandler, this, [flyBox]);
                }
                mg.uiManager.remove(TaskDialog);
                if (this._isNpcTarget > 0) {
                    if (this._isNpcTarget == 201005) {
                        app.gameContext.exitToMainGame();
                    }
                    else if (this._isNpcTarget == 102011) {
                        app.gameContext.enterChapterBoss("");
                    }
                    else {
                    }
                    // mg.uiManager.show(dialog.role.RoleMainDialog, { tabIndex: 2});
                    // // var mainUIView: main.MainUIView = (mg.uiManager.getView(s.UserfaceName.main) as main.MainUIView);
                    // // if (mainUIView && mainUIView.parent) {
                    // //     if (mainUIView.dock && mainUIView.dock.btnBack && mainUIView.dock.btnBack.visible) {
                    // //         mg.guideManager.guideImmediately(mainUIView.dock.btnBack, Language.C_HDGJ);
                    // //     }
                    // // }
                }
            };
            TaskDialog.prototype.flyOverHandler = function (flyBox) {
                if (flyBox.parent) {
                    flyBox.parent.removeChild(flyBox);
                    flyBox.scaleX = flyBox.scaleY = 1;
                    vo.toPool(flyBox.data);
                    this._pool.to(flyBox, false);
                }
            };
            return TaskDialog;
        }(ui.TaskDialogSkin));
        task.TaskDialog = TaskDialog;
        __reflect(TaskDialog.prototype, "dialog.task.TaskDialog");
    })(task = dialog.task || (dialog.task = {}));
})(dialog || (dialog = {}));
