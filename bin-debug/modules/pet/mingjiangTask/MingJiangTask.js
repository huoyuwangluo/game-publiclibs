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
var pet;
(function (pet) {
    var MingJiangTask = (function (_super) {
        __extends(MingJiangTask, _super);
        function MingJiangTask() {
            return _super.call(this) || this;
        }
        MingJiangTask.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._rwards = [this.reward1, this.reward2, this.reward3];
            this._btnArr = [this.btn0, this.btn1, this.btn2, this.btn3];
            this.labGo.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_CKXQ);
            this.labClue.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_XIANS);
            this.labShare.textFlow = utils.htmlUtil.getUnderlineFormat(Language.C_FX);
        };
        MingJiangTask.prototype.enter = function () {
            this.list0.dataProvider = this._listCollection = new eui.ArrayCollection([]);
            GameModels.mingJiangTask.isOpenView = true;
            this._selecdIndex = 0;
            GameModels.mingJiangTask.getTaskInfo(utils.Handler.create(this, function () {
                this.updataList(GameModels.mingJiangTask.petId);
            }));
            this.list0.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
            this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.labGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.labClue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.labShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            for (var i = 0; i < this._btnArr.length; i++) {
                this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTouchHandler, this);
            }
        };
        MingJiangTask.prototype.exit = function () {
            this.clearList(this.list0);
            this.list0.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
            this.btnGet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.labGo.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.labClue.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            this.labShare.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
            for (var i = 0; i < this._btnArr.length; i++) {
                this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTouchHandler, this);
            }
            for (var i = 0; i < this._rwards.length; i++) {
                this._rwards[i].dataSource = null;
            }
        };
        MingJiangTask.prototype.updataList = function (index) {
            for (var i = 0; i < this._btnArr.length; i++) {
                if (i == this._selecdIndex) {
                    this._btnArr[i].currentState = "down";
                }
                else {
                    this._btnArr[i].currentState = "up";
                }
            }
            var voArr = GameModels.mingJiangTask.getMingjiangTaskVoArr(this._selecdIndex);
            this._listCollection.source = voArr;
            var currIndex = index;
            if (index > 0) {
                for (var j = 0; j < voArr.length; j++) {
                    if (voArr[j].temp.general == index) {
                        currIndex = j;
                        GameModels.mingJiangTask.petId = 0;
                        break;
                    }
                }
            }
            this.list0.selectedIndex = currIndex;
            this._vo = this.list0.selectedItem;
            this.viewToFollow();
            this.showView();
        };
        MingJiangTask.prototype.viewToFollow = function () {
            if (this.scroller == null) {
                return;
            }
            /**视图跟随并居中锁定
             * itemWidth 单个呈现项的宽度
             *  */
            var listSH = this.list0.scrollH; //可视区域位置
            var sWidth = this.scroller.width; //滚动轴宽度
            var listCWidth = this.list0.contentWidth; //数据总长度
            this.list0.validateNow();
            if (!this.list0.getChildAt(0))
                return;
            var itemWidth = this.list0.getChildAt(0).width;
            if (!itemWidth)
                return;
            var width = (itemWidth + 6) * (this.list0.selectedIndex + 1);
            if (width >= sWidth) {
                width = width - sWidth;
            }
            else {
                width = 0;
            }
            this.list0.scrollH = width; //显示视图的数量*列间距
            egret.Tween.get(this.list0).to({ scrollH: width }, 200);
        };
        MingJiangTask.prototype.btnTouchHandler = function (e) {
            for (var i = 0; i < this._btnArr.length; i++) {
                if (e.currentTarget == this._btnArr[i]) {
                    if (GameModels.mingJiangTask.getMingjiangTaskVoArr(i).length <= 0) {
                        mg.alertManager.tip(Language.J_MYKCZDWJ);
                        return;
                    }
                    this._selecdIndex = i;
                    this.updataList(0);
                }
            }
        };
        MingJiangTask.prototype.onListClick = function (e) {
            this.list0.selectedIndex = e.itemIndex;
            this._vo = this.list0.selectedItem;
            this.showView();
        };
        MingJiangTask.prototype.showView = function () {
            this._listCollection.itemUpdated(this._vo);
            if (this._vo) {
                this.labCount.textFlow = utils.TextFlowMaker.htmlParser(Language.getExpression(Language.E_YY1RWCBWT, this._vo.finishCount));
                this.body.setPetBody(this._vo.generalTemp.model);
                this.imgXiYouPet.visible = false;
                if (this._vo.generalTemp.id != 13000 && GameModels.pet.isHashFourSkill(this._vo.generalTemp.id)) {
                    this.imgXiYouPet.visible = true;
                    this.imgXiYouPet.source = this._vo.generalTemp.quality == 8 ? "smokePet_json.img_smokepet_chuanshuo" : "smokePet_json.img_smokepet_xiyou";
                }
                this.labDesc.text = this._vo.generalTemp.name + Language.J_DWT;
                if (this._vo.state == 0) {
                    this.labShare.visible = false;
                    this.labClue.visible = false;
                    this.labWeiDuo.text = Language.J_MJRWBCFCNJSWT;
                    this.labTiaoJian.text = Language.J_WZKYXWCRWZX;
                    this.labWeiDuo.textColor = this.labTiaoJian.textColor = 0xff0000;
                    var huDieanimal = GameModels.animal.getAnimalBuyType(14); //蝶恋花
                    if (huDieanimal.isAct && huDieanimal.step >= 4 && this._vo.generalTemp.country == 4) {
                        this.labTiaoJian.text = this._vo.temp.des1 + "(" + Language.C_WCF + ")";
                    }
                    var longMaanimal = GameModels.animal.getAnimalBuyType(18); //龙马
                    if (longMaanimal.isAct && longMaanimal.step >= 2 && this._vo.generalTemp.country == 2) {
                        this.labTiaoJian.text = this._vo.temp.des1 + "(" + Language.C_WCF + ")";
                    }
                    var tianFenganimal = GameModels.animal.getAnimalBuyType(19); //天凤
                    if (tianFenganimal.isAct && tianFenganimal.step >= 2 && this._vo.generalTemp.country == 1) {
                        this.labTiaoJian.text = this._vo.temp.des1 + "(" + Language.C_WCF + ")";
                    }
                    var yaoHuanimal = GameModels.animal.getAnimalBuyType(20); //妖虎
                    if (yaoHuanimal.isAct && yaoHuanimal.step >= 2 && this._vo.generalTemp.country == 3) {
                        this.labTiaoJian.text = this._vo.temp.des1 + "(" + Language.C_WCF + ")";
                    }
                }
                else {
                    this.labShare.visible = true;
                    this.labClue.visible = this._vo.temp.clue > 0 && this._vo.state == 3;
                    this.labWeiDuo.text = this._vo.temp.des2;
                    this.labTiaoJian.text = this._vo.temp.des1;
                    this.labWeiDuo.textColor = this.labTiaoJian.textColor = 0x00ff00;
                }
                var rewards = this._vo.temp.rewards.split(";");
                for (var i = 0; i < 3; i++) {
                    var iconBox = this._rwards[i];
                    iconBox.labName.stroke = 1;
                    if (i < rewards.length) {
                        iconBox.dataSource = rewards[i];
                        this.boxGroup.addChild(iconBox);
                    }
                    else {
                        if (iconBox.parent) {
                            iconBox.parent.removeChild(iconBox);
                        }
                    }
                }
                this.btnGet.visible = this._vo.state == 2;
                if (this._vo.temp.course && this._vo.state == 1) {
                    this.labPro.text = this._vo.cond1 + "/" + this._vo.temp.course;
                    this.labPro.textColor = this._vo.cond1 >= this._vo.temp.course ? 0x00ff00 : 0xff0000;
                    this.labDesc.validateNow();
                    this.labPro.x = this.labDesc.x + this.labDesc.width + 10;
                }
                else {
                    this.labPro.text = "";
                }
            }
        };
        MingJiangTask.prototype.onBtnClick = function (e) {
            if (e.currentTarget == this.btnGet) {
                GameModels.mingJiangTask.getTaskReward(this._vo.taskId, utils.Handler.create(this, this.getRewardCallback));
            }
            else if (e.currentTarget == this.labGo) {
                GameModels.mingJiangTask.getTaskPlayerLis(this._vo.taskId, utils.Handler.create(this, function () {
                    mg.alertManager.showAlert(pet.MingJiangTaskList, true, true);
                }));
            }
            else if (e.currentTarget == this.labShare) {
                if (this._vo.state == 0)
                    return;
                if (GameModels.timer.getPastSecond() - GameModels.mingJiangTask.refreshTime > 60) {
                    GameModels.mingJiangTask.refreshTime = GameModels.timer.getPastSecond();
                }
                else {
                    mg.alertManager.tip(Language.getExpression(Language.E_1MHKZCFX, (60 - (GameModels.timer.getPastSecond() - GameModels.mingJiangTask.refreshTime))));
                    return;
                }
                mg.alertManager.tip(Language.J_FSCG);
                var str = Language.getExpression(Language.E_1CFTJS2, this._vo.generalTemp.name, this._vo.temp.des1);
                GameModels.chat.sendHandler(TypeChatChannel.WORLD, str);
            }
            else if (e.currentTarget == this.labClue) {
                if (this._vo.temp.clue <= 0 || this._vo.state != 3)
                    return;
                mg.StoryManager.instance.startBigStory(this._vo.temp.completeTalk, this, null);
            }
        };
        MingJiangTask.prototype.getRewardCallback = function () {
            this.showView();
            var rewards = this._vo.temp.rewards.split(";");
            mg.alertManager.showAlert(UsePropGetGift, true, true, rewards);
        };
        return MingJiangTask;
    }(ui.MingJiangTaskSkin));
    pet.MingJiangTask = MingJiangTask;
    __reflect(MingJiangTask.prototype, "pet.MingJiangTask", ["IModuleView", "egret.DisplayObject"]);
})(pet || (pet = {}));
