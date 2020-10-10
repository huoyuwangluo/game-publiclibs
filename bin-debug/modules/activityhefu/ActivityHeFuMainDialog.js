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
    var activity;
    (function (activity) {
        var ActivityHeFuMainDialog = (function (_super) {
            __extends(ActivityHeFuMainDialog, _super);
            function ActivityHeFuMainDialog() {
                return _super.call(this) || this;
            }
            ActivityHeFuMainDialog.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                this._selected = -1;
                this.btnClose.sound = null;
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
                function getButton(imgIcon) {
                    var btn = new renderer.ActivityTabButton();
                    btn.setImgIcon = imgIcon;
                    return btn;
                }
                this._tabs = [];
                this._tabs[game.TypeHeFuActivity.HEFU_DENGLU] = getButton("activityHefu_json.btn_hefu_dl");
                this._tabs[game.TypeHeFuActivity.HEFU_LEICHONG] = getButton("activityHefu_json.btn_hefu_lc");
                this._tabs[game.TypeHeFuActivity.HEFU_TEHUI] = getButton("activityHefu_json.btn_hefu_th");
                this._tabs[game.TypeHeFuActivity.HEFU_LIBAO] = getButton("activityHefu_json.btn_hefu_lb");
                this._tabs[game.TypeHeFuActivity.HEFU_FANBEI] = getButton("activityHefu_json.btn_hefu_fb");
                this._tabs[game.TypeHeFuActivity.HEFU_JUNTUAN] = getButton("activityHefu_json.btn_hefu_jtzb");
                this._tabs[game.TypeHeFuActivity.HEFU_QM_BOSS] = getButton("activityHefu_json.btn_hefu_qmboss");
                // this._tabs[t.TypeHeFuActivity.HEFU_MOSHI] = getButton("activityHefu_json.btn_hefu_mszp");
                // this._tabs[t.TypeHeFuActivity.HEFU_BOSS] = getButton("activityHefu_json.btn_hefu_boss");
                this._tabs[game.TypeHeFuActivity.HEFU_XIAOHAO_FANLI] = getButton("activityHefu_json.btn_hefu_xffl");
                this._tabs[game.TypeHeFuActivity.HEFU_XIAOHAO_PAIHANG] = getButton("activityHefu_json.btn_hefu_xfpl");
                this._tabs[game.TypeHeFuActivity.HEFU_LIANCHONG_FANLI] = getButton("activityHefu_json.btn_hefu_lchl");
                // this._tabs[t.TypeHeFuActivity.HEFU_DUIHUAN] = getButton("activityHefu_json.btn_hefu_dh");
                this._views = [];
                this._views[game.TypeHeFuActivity.HEFU_DENGLU] = new view.activity.HeFuDengLu();
                this._views[game.TypeHeFuActivity.HEFU_LEICHONG] = new view.activity.HeFuLeiChong();
                this._views[game.TypeHeFuActivity.HEFU_TEHUI] = new view.activity.HeFuTeHui();
                this._views[game.TypeHeFuActivity.HEFU_LIBAO] = new view.activity.HeFuLiBao();
                this._views[game.TypeHeFuActivity.HEFU_FANBEI] = new view.activity.HeFuFanBei();
                this._views[game.TypeHeFuActivity.HEFU_JUNTUAN] = new view.activity.HeFuLegionZhan();
                this._views[game.TypeHeFuActivity.HEFU_QM_BOSS] = new view.activity.HeFuQMBoss();
                // this._views[t.TypeHeFuActivity.HEFU_MOSHI] = new view.activity.HeFuZhuanPan();
                // this._views[t.TypeHeFuActivity.HEFU_JUNTUAN] = new view.activity.HeFuZhuanPan();
                this._views[game.TypeHeFuActivity.HEFU_XIAOHAO_FANLI] = new view.activity.HeFuXiaoHaoFanLi();
                this._views[game.TypeHeFuActivity.HEFU_XIAOHAO_PAIHANG] = new view.activity.HeFuXiaoFeiPaiHang();
                this._views[game.TypeHeFuActivity.HEFU_LIANCHONG_FANLI] = new view.activity.HeFuLianChongHaoLi();
                // this._views[t.TypeHeFuActivity.HEFU_DUIHUAN] = new view.activity.HeFuLegionZhan();
                this._curstack = new eui.ViewStack();
                this._curstack.touchEnabled = false;
                this.group.addChild(this._curstack);
            };
            ActivityHeFuMainDialog.prototype.enter = function (data) {
                this.updateView(data);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
                this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
                this.tabGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                this.scrollerTab.viewport.scrollH = 0;
                GameModels.activityHeFu.addEventListener(mo.ModelActivityHeFu.ACTIVITY_HEFU_UPDATA, this.openView, this);
            };
            ActivityHeFuMainDialog.prototype.exit = function () {
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                this.btnLeft.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeftClick, this);
                this.btnRight.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRightClick, this);
                this.tabGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTabClick, this);
                if (this._curstack.selectedChild)
                    this._curstack.selectedChild.exit();
                GameModels.activityHeFu.removeEventListener(mo.ModelActivityHeFu.ACTIVITY_HEFU_UPDATA, this.openView, this);
            };
            ActivityHeFuMainDialog.prototype.openView = function () {
                if (GameModels.activityHeFu.hefuOpenActivityList.length <= 0) {
                    mg.uiManager.remove(this);
                }
            };
            ActivityHeFuMainDialog.prototype.updateView = function (data) {
                this.clear();
                //-----------------------刷新页签
                var openList = GameModels.activityHeFu.hefuActivityTemplates;
                if (openList.length == 0) {
                    return;
                }
                this._curtabs = [];
                for (var i = 0; i < openList.length; i++) {
                    if (this._tabs[openList[i].type]) {
                        var btn = this._tabs[openList[i].type];
                        btn.x = i * 121;
                        this.tabGroup.addChild(btn);
                        this._curtabs.push(btn);
                    }
                }
                if (!this._curviews)
                    this._curviews = [];
                var childIndex = 0;
                for (var i = 0; i < openList.length; i++) {
                    if (GameModels.activityHeFu.isOpenActivityHeFuList(openList[i].type)) {
                        this._curviews.push(this._curstack.addChild(this._views[openList[i].type]));
                        if (openList[i].type == game.TypeHeFuActivity.HEFU_DENGLU) {
                            //GameModels.state.registerWarnTarget(GameRedState.HEFU_ACTIVITY_HFDL, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
                        }
                        else if (openList[i].type == game.TypeHeFuActivity.HEFU_LEICHONG) {
                            //GameModels.state.registerWarnTarget(GameRedState.HEFU_ACTIVITY_HFLC, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
                        }
                        else if (openList[i].type == game.TypeHeFuActivity.HEFU_QM_BOSS) {
                            //GameModels.state.registerWarnTarget(GameRedState.HEFU_ACTIVITY_QUANMIN, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
                        }
                        else if (openList[i].type == game.TypeHeFuActivity.HEFU_XIAOHAO_FANLI) {
                            //GameModels.state.registerWarnTarget(GameRedState.HEFU_ACTIVITY_XHFL, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
                        }
                        else if (openList[i].type == game.TypeHeFuActivity.HEFU_LIANCHONG_FANLI) {
                            //GameModels.state.registerWarnTarget(GameRedState.HEFU_ACTIVITY_LIANCHONG, utils.Handler.create(this, this.updateRedState, [childIndex++], false));
                        }
                        else {
                            childIndex++;
                        }
                    }
                }
                this.onSelectChange(data && data.hasOwnProperty("tabIndex") ? data.tabIndex : 0);
            };
            ActivityHeFuMainDialog.prototype.updateRedState = function (index, value) {
                this._curtabs[index].imgRed.visible = value;
            };
            ActivityHeFuMainDialog.prototype.onTabClick = function (e) {
                var index = this._curtabs.indexOf(e.target.parent);
                if (index != -1) {
                    this.onSelectChange(index);
                }
            };
            ActivityHeFuMainDialog.prototype.onLeftClick = function (e) {
                if (this.scrollerTab.viewport.scrollH > 0) {
                    this.scrollerTab.viewport.scrollH = Math.max(0, this.scrollerTab.viewport.scrollH - 121);
                }
            };
            ActivityHeFuMainDialog.prototype.onRightClick = function (e) {
                this.tabGroup.validateNow();
                var width = this.tabGroup.contentWidth - this.scrollerTab.width;
                if (this.scrollerTab.viewport.scrollH < width) {
                    this.scrollerTab.viewport.scrollH = Math.min(width, this.scrollerTab.viewport.scrollH + 121);
                }
            };
            ActivityHeFuMainDialog.prototype.clear = function () {
                //---------------清空页面
                if (this._selected != -1) {
                    this._curtabs[this._selected].currentState = "up";
                    this._selected = -1;
                }
                for (var _i = 0, _a = this._tabs; _i < _a.length; _i++) {
                    var btn = _a[_i];
                    if (btn && btn.parent) {
                        btn.parent.removeChild(btn);
                    }
                }
                if (this._curtabs)
                    this._curtabs.length = 0;
                for (var _b = 0, _c = this._views; _b < _c.length; _b++) {
                    var view = _c[_b];
                    if (view && view.parent) {
                        view.parent.removeChild(view);
                    }
                }
                if (this._curviews)
                    this._curviews.length = 0;
                this._curstack.selectedIndex = 0;
            };
            ActivityHeFuMainDialog.prototype.onSelectChange = function (index) {
                if (this._curstack.selectedChild)
                    this._curstack.selectedChild.exit();
                if (!this._curviews[index])
                    return;
                this._curstack.selectedIndex = index;
                this._curviews[index].enter(null, null);
                if (this._selected != -1) {
                    this._curtabs[this._selected].currentState = "up";
                }
                this._selected = index;
                this._curtabs[index].currentState = "down";
            };
            ActivityHeFuMainDialog.prototype.onClose = function (e) {
                mg.uiManager.remove(this);
            };
            return ActivityHeFuMainDialog;
        }(ui.ActivityHeFuMainDialogSkin));
        activity.ActivityHeFuMainDialog = ActivityHeFuMainDialog;
        __reflect(ActivityHeFuMainDialog.prototype, "dialog.activity.ActivityHeFuMainDialog");
    })(activity = dialog.activity || (dialog.activity = {}));
})(dialog || (dialog = {}));
