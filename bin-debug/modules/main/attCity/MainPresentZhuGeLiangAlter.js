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
var MainPresentZhuGeLiangAlter = (function (_super) {
    __extends(MainPresentZhuGeLiangAlter, _super);
    function MainPresentZhuGeLiangAlter() {
        return _super.call(this) || this;
    }
    MainPresentZhuGeLiangAlter.prototype.initialize = function () {
        _super.prototype.initialize.call(this);
        Mediator.getMediator(this).onAdd(this, this.enter);
        Mediator.getMediator(this).onRemove(this, this.exit);
    };
    MainPresentZhuGeLiangAlter.prototype.enter = function (isPlay) {
        var _this = this;
        if (isPlay === void 0) { isPlay = false; }
        if (GameModels.clientTag.tagCountSByType(1, TypeClientTag.CLIENT_TYPE1_13) <= 0) {
            mg.StoryManager.instance.startBigStory(133, this, null);
            GameModels.clientTag.clientAddTag(1, TypeClientTag.CLIENT_TYPE1_13);
        }
        this._isPlay = isPlay;
        GameModels.limitTarget.requestLimitTargetInfo(utils.Handler.create(this, function () {
            _this.updata();
        }));
        this.updata();
        this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        GameModels.limitTarget.addEventListener(mo.ModelLimitTargetTask.LIMITTARGET_GET_SAMLL_REWARD, this.updata, this);
        GameModels.limitTarget.addEventListener(mo.ModelLimitTargetTask.CHANGE_LIMITTARGET_INFO, this.updata, this);
    };
    MainPresentZhuGeLiangAlter.prototype.updata = function () {
        if (!GameModels.limitTarget || !GameModels.limitTarget.templates) {
            mg.alertManager.tip(Language.J_YWCSYRW);
            mg.uiManager.remove(this);
            return;
        }
        if (GameModels.limitTarget.templates.id == 100) {
            this.imgBg.source = "img_chapaterMap_zhugeliang_bg1_png";
        }
        else if (GameModels.limitTarget.templates.id == 101) {
            this.imgBg.source = "img_chapaterMap_zhugeliang_bg2_png";
        }
        else if (GameModels.limitTarget.templates.id == 102) {
            this.imgBg.source = "img_chapaterMap_zhugeliang_bg3_png";
        }
        if (!this._listData) {
            this._listData = new eui.ArrayCollection(GameModels.limitTarget.limitTaskVo);
        }
        else {
            this._listData.source = GameModels.limitTarget.limitTaskVo;
        }
        this.list.dataProvider = this._listData;
    };
    MainPresentZhuGeLiangAlter.prototype.exit = function () {
        this._isPlay = false;
        this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnCloseClick, this);
        GameModels.limitTarget.removeEventListener(mo.ModelLimitTargetTask.LIMITTARGET_GET_SAMLL_REWARD, this.updata, this);
        GameModels.limitTarget.removeEventListener(mo.ModelLimitTargetTask.CHANGE_LIMITTARGET_INFO, this.updata, this);
    };
    MainPresentZhuGeLiangAlter.prototype.onListClick = function (e) {
        if (e.target instanceof components.SnapButton) {
            var item = this.list.selectedItem;
            if (item.state == 1) {
                if (utils.CheckUtil.checkBagSmelting())
                    return;
                GameModels.limitTarget.requestLimitTargetGetTaskSamllReward(item.taskId, utils.Handler.create(this, this.getRewardCallback, [e.target.parent.localToGlobal(35, 55)]));
            }
            else if (item.state == 0) {
                if (item.templates.type == 1) {
                    mg.alertManager.tip(Language.J_WCLBXFSYRKLQ);
                    return;
                }
                if (item.templates.type == 11) {
                    var mainView = mg.uiManager.getView(s.UserfaceName.main);
                    if (mainView && mainView.chat) {
                        mainView.chat.add(true);
                        GameModels.chat.channelType = TypeChatChannel.WORLD;
                        mainView.chat.openHandler();
                    }
                    mg.uiManager.remove(this);
                    return;
                }
                if (item.templates.type == 9) {
                    this.openRechargeDialog();
                    return;
                }
                mg.uiManager.showByName(item.templates.functionId, item.templates.functionParams, [item.templates.type, 2]);
            }
        }
    };
    MainPresentZhuGeLiangAlter.prototype.openRechargeDialog = function () {
        mg.uiManager.remove(s.UserfaceName.sgDaily);
        var voMRCZ = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.mrcz);
        if (voMRCZ && !voMRCZ.hashYYQGAndMRCZReceive) {
            mg.uiManager.show(dialog.activity.sgDailyActivityMainDialog, { tabIndex: game.sgActivityType.mrcz });
        }
        else {
            mg.uiManager.show(MallScene);
        }
    };
    MainPresentZhuGeLiangAlter.prototype.getRewardCallback = function (fromPoint) {
        var item = this.list.selectedItem;
        if (item && item.templates.rewards) {
            var rewards = item.templates.rewards.split(";");
            mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
        }
        this.updata();
    };
    MainPresentZhuGeLiangAlter.prototype.btnCloseClick = function (e) {
        if (this._isPlay) {
            mg.uiManager.remove(this);
            var view = mg.uiManager.getView(main.MainUIView);
            if (view) {
                view.upDataPresentZhuGeLiang();
            }
            var img = utils.ObjectPool.from(components.Icon);
            img.initialize("chapterMap_json.btn_map_zhugeliang");
            mg.layerManager.top.addChild(img);
            var point = new egret.Point(mg.stageManager.stageWidth / 2, mg.stageManager.stageHeight / 2);
            img.anchorOffsetX = img.width / 2;
            img.anchorOffsetY = img.height / 2;
            img.x = point.x + img.width / 2;
            img.y = point.y + img.height / 2;
            var position = mg.uiManager.getView(main.MainUIView).getZhuGeLiangPostion(true);
            egret.Tween.get(img).to({ x: position.x, y: position.y, scaleX: 0.5, scaleY: 0.5 }, 1000, utils.Ease.cubicInOut).call(this.flyOverHandler, this, [img]);
        }
        else {
            mg.uiManager.remove(this);
        }
    };
    MainPresentZhuGeLiangAlter.prototype.flyOverHandler = function (img) {
        if (img) {
            img.alpha = 1;
            img.parent.removeChild(img);
            utils.ObjectPool.to(img, true);
        }
    };
    return MainPresentZhuGeLiangAlter;
}(ui.MainPresentZhuGeLiangAlterSkin));
__reflect(MainPresentZhuGeLiangAlter.prototype, "MainPresentZhuGeLiangAlter");
