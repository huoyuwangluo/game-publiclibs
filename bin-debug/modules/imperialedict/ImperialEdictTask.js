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
    var imperialEdict;
    (function (imperialEdict) {
        var ImperialEdictTask = (function (_super) {
            __extends(ImperialEdictTask, _super);
            function ImperialEdictTask() {
                var _this = _super.call(this) || this;
                _this._btnArr = [_this.btn0, _this.btn1, _this.btn2, _this.btn3, _this.btn4];
                _this._labArr = [_this.lab0, _this.lab1, _this.lab2, _this.lab3, _this.lab4];
                _this._iconArr = [_this.icon, _this.icon0, _this.icon1];
                _this._starArr = [_this.star, _this.star0, _this.star1];
                _this._needUnionArr = [_this.imgNeedItem1, _this.imgNeedItem2];
                _this._rwards = [_this.reward0, _this.reward1, _this.reward2];
                _this._qualityArr = [_this.quality, _this.quality0, _this.quality1];
                _this._selectedArr = [_this.imgSelected1, _this.imgSelected2];
                _this._index = 0;
                _this._petArr = [];
                _this._petRefIdArr = [];
                _this._petUidArr = [];
                _this._type = [5, 1, 2, 3, 4];
                _this._isHasPet = false;
                return _this;
            }
            ImperialEdictTask.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            ImperialEdictTask.prototype.enter = function (data) {
                this._data = data;
                this._clickOneKey = false;
                if (!this._data)
                    return;
                if (this.scroller.verticalScrollBar) {
                    this.scroller.verticalScrollBar.autoVisibility = false;
                    this.scroller.verticalScrollBar.visible = false;
                }
                this.list.dataProvider = this._listCollection = new eui.ArrayCollection([]);
                this._petArr = GameModels.pet.allPetVOList;
                this._petArr.sort(function (a, b) {
                    return b.star - a.star;
                });
                var tempStar = this._data.star;
                if (tempStar < 3)
                    tempStar = 3;
                this.imgNeedItem0.source = "imperialedict_json.img_Level_" + tempStar;
                this.imgSelected0.visible = false;
                var unionList = this._data.unionList;
                for (var i = 0; i < this._needUnionArr.length; i++) {
                    if (unionList[i]) {
                        this._needUnionArr[i].source = "common_json.img_union_point" + unionList[i] + "_png";
                    }
                    else {
                        this._needUnionArr[i].source = "";
                    }
                    this._selectedArr[i].visible = false;
                }
                var rewards = this._data.shengZhiTemp.rewards.split(";");
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
                var item = Templates.getTemplateById(templates.Map.ITEM, "701");
                this.imgDaoJu.source = item.icon;
                this.labProValue.text = GameModels.user.player.liangcao + "/" + 24000;
                this.expProgress.noTweenValue = GameModels.user.player.liangcao / 24000;
                var time = this._data.shengZhiSetting.duration;
                if (GameModels.activitySummer.isOpenActivitySummerList(game.sgActivitysummerType.szkh)) {
                    time = Math.ceil(time / 2);
                }
                this.labCount.text = utils.DateUtil.formatTimeLeft(time);
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].currentState = this._index == i ? "down" : "up";
                    this._labArr[i].textColor = this._index == i ? 0xc4c4c5 : 0x545458;
                }
                this.showListView();
                this.showSelectedPet();
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                for (var i = 0; i < this._iconArr.length; i++) {
                    this._iconArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
                }
                this.list.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRemoveView, this);
                this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRemoveView, this);
                this.btnRefresh0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.taskWork, this);
                this.btnRefresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onekeyClick, this);
            };
            ImperialEdictTask.prototype.showListView = function () {
                var petArr = [];
                var anyArr = [];
                var type = this._type[this._index];
                for (var i = 0; i < this._petArr.length; i++) {
                    if (this._petArr[i].refId == "13000") {
                        continue;
                    }
                    if (type == 5) {
                        if (petArr.indexOf(this._petArr[i]) == -1) {
                            petArr.push(this._petArr[i]);
                        }
                    }
                    else {
                        if (this._petArr[i].template.country == type) {
                            if (petArr.indexOf(this._petArr[i]) == -1) {
                                petArr.push(this._petArr[i]);
                            }
                        }
                    }
                }
                for (var j = 0; j < petArr.length; j++) {
                    var obj = { id: null, selected: false, istask: false, type: 1 };
                    if (petArr[j].state == 1) {
                        obj.istask = true;
                    }
                    else {
                        obj.istask = false;
                    }
                    if (this._petUidArr.indexOf(petArr[j].uid) != -1) {
                        obj.selected = true;
                    }
                    else {
                        obj.selected = false;
                    }
                    obj.id = petArr[j];
                    anyArr.push(obj);
                }
                if (!this._listCollection) {
                    this._listCollection = new eui.ArrayCollection(anyArr);
                }
                else {
                    this._listCollection.source = anyArr;
                }
            };
            ImperialEdictTask.prototype.onBtnClick = function (e) {
                this._index = this._btnArr.indexOf(e.currentTarget);
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].currentState = this._index == i ? "down" : "up";
                    this._labArr[i].textColor = this._index == i ? 0xCCC6BA : 0x969696;
                }
                this.showListView();
            };
            ImperialEdictTask.prototype.onListClick = function (e) {
                var item = this.list.selectedItem;
                if (!item)
                    return;
                var petvo = item.id;
                if (petvo.state == 1) {
                    mg.alertManager.tip(Language.C_CWJZAZXRWZ);
                    return;
                }
                else {
                    if (!item.selected) {
                        if (this._petRefIdArr.length < 3) {
                            if (this._petRefIdArr.indexOf(petvo.refId) == -1) {
                                this._petRefIdArr.push(petvo.refId);
                                this._petUidArr.push(petvo.uid);
                                item.selected = true;
                            }
                            else {
                                mg.alertManager.tip(Language.C_XTWJBKZXTYRW);
                                return;
                            }
                        }
                        else {
                            mg.alertManager.tip(Language.C_YXZZGWJ);
                            return;
                        }
                    }
                    else {
                        this._petRefIdArr.splice(this._petRefIdArr.indexOf(petvo.refId), 1);
                        this._petUidArr.splice(this._petUidArr.indexOf(petvo.uid), 1);
                        if (this._data.unionList.indexOf(petvo.template.country) != -1) {
                            this._selectedArr[this._data.unionList.indexOf(petvo.template.country)].visible = false;
                        }
                        if (petvo.star >= this._data.star) {
                            this.imgSelected0.visible = false;
                            this._isHasPet = false;
                        }
                        item.selected = false;
                    }
                }
                this._listCollection.replaceAll(this._listCollection.source);
                this.showSelectedPet();
            };
            ImperialEdictTask.prototype.showSelectedPet = function () {
                for (var i = 0; i < this._iconArr.length; i++) {
                    if (this._petUidArr[i]) {
                        var pet = GameModels.pet.getAllPetVOByUid(this._petUidArr[i]);
                        this._iconArr[i].source = ResPath.getItemIconKey(pet.refId);
                        this._qualityArr[i].source = ResPath.getPetQualityByStar(pet.star, pet.isHashFourSkill);
                        this._starArr[i].source = "tujian_json.img_star" + pet.star;
                        if (this._data.unionList.indexOf(pet.template.country) != -1) {
                            this._selectedArr[this._data.unionList.indexOf(pet.template.country)].visible = true;
                        }
                        if (pet.star >= this._data.star) {
                            this.imgSelected0.visible = true;
                            this._isHasPet = true;
                        }
                    }
                    else {
                        this._starArr[i].source = "";
                        this._iconArr[i].source = "";
                        this._qualityArr[i].source = "qualityBg_json.img_qlt_1_png";
                    }
                }
            };
            ImperialEdictTask.prototype.onIconClick = function (e) {
                var index = this._iconArr.indexOf(e.currentTarget);
                if (this._petUidArr[index]) {
                    for (var i = 0; i < this._listCollection.source.length; i++) {
                        if (this._listCollection.source[i].id.uid == this._petUidArr[index]) {
                            var pet = GameModels.pet.getAllPetVOByUid(this._petUidArr[index]);
                            this._listCollection.source[i].selected = false;
                            this._petRefIdArr.splice(index, 1);
                            this._petUidArr.splice(index, 1);
                            this._listCollection.replaceAll(this._listCollection.source);
                            if (this._data.unionList.indexOf(pet.template.country) != -1) {
                                this._selectedArr[this._data.unionList.indexOf(pet.template.country)].visible = false;
                            }
                            if (pet.star >= this._data.star) {
                                this.imgSelected0.visible = false;
                                this._isHasPet = false;
                            }
                            this.showSelectedPet();
                            break;
                        }
                    }
                }
            };
            ImperialEdictTask.prototype.taskWork = function (e) {
                var _this = this;
                if (!this._isHasPet) {
                    mg.alertManager.tip(Language.getExpression(Language.E_QPQPZZGDWJ, this._data.star));
                    return;
                }
                var selectedUnion = [];
                for (var i = 0; i < this._petUidArr.length; i++) {
                    var petItem = GameModels.pet.getAllPetVOByUid(this._petUidArr[i]);
                    selectedUnion.push(petItem.template.country);
                }
                for (var j = 0; j < this._data.unionList.length; j++) {
                    if (selectedUnion.indexOf(this._data.unionList[j]) == -1) {
                        mg.alertManager.tip(Language.getExpression(Language.E_QPQYW1GWJ, TypeUnionName.getLeginId(this._data.unionList[j])));
                        return;
                    }
                }
                if (GameModels.guide.guideType == mo.ModelGuide.guideType10) {
                    GameModels.guide.requestGuideDone(mo.ModelGuide.guideType10);
                    mg.StoryManager.instance.startBigStory(129, this, null);
                }
                var petId = this._petUidArr.concat();
                GameModels.shengzhi.requestCarryOutShengZhiTask(this._data.taskId, petId, utils.Handler.create(this, function () {
                    mg.alertManager.tip(Language.C_PQCG);
                    mg.uiManager.remove(_this);
                    var view = mg.uiManager.getView(pet.PetGroupMain);
                    if (view) {
                        view.shengzhiView.refreshListRenderer();
                        view.shengzhiView.refreshItemCount();
                    }
                }));
            };
            ImperialEdictTask.prototype.onekeyClick = function (e) {
                if (this._petUidArr.length > 0) {
                    for (var z = this._petUidArr.length - 1; z >= 0; z--) {
                        if (this._petUidArr[z]) {
                            for (var i = 0; i < this._listCollection.source.length; i++) {
                                if (this._listCollection.source[i].id.uid == this._petUidArr[z]) {
                                    var petitem = GameModels.pet.getAllPetVOByUid(this._petUidArr[z]);
                                    this._listCollection.source[i].selected = false;
                                    this._petRefIdArr.splice(z, 1);
                                    this._petUidArr.splice(z, 1);
                                    this._listCollection.replaceAll(this._listCollection.source);
                                    if (this._data.unionList.indexOf(petitem.template.country) != -1) {
                                        this._selectedArr[this._data.unionList.indexOf(petitem.template.country)].visible = false;
                                    }
                                    if (petitem.star >= this._data.star) {
                                        this.imgSelected0.visible = false;
                                        this._isHasPet = false;
                                    }
                                }
                            }
                        }
                    }
                    this.showSelectedPet();
                }
                var needUnionList = this._data.unionList;
                needUnionList.sort(function (a, b) {
                    return a - b;
                });
                var petArr1 = [];
                for (var _i = 0, _a = this._petArr; _i < _a.length; _i++) {
                    var petVo = _a[_i];
                    if (petVo.refId != "13000") {
                        petArr1.push(petVo);
                    }
                }
                petArr1.sort(function (a, b) {
                    return a.star - b.star;
                });
                var selectedCounty = [];
                var hasQuitlyPet = false;
                for (var i = 0; i < needUnionList.length; i++) {
                    for (var p = 0; p < petArr1.length; p++) {
                        if (petArr1[p].state == 1)
                            continue;
                        if (needUnionList[i] == petArr1[p].template.country && selectedCounty.indexOf(petArr1[p].template.country) == -1) {
                            selectedCounty.push(petArr1[p].template.country);
                            if (petArr1[p].star >= this._data.star) {
                                hasQuitlyPet = true;
                            }
                            if (this._petRefIdArr.length < 3) {
                                if (this._petRefIdArr.indexOf(petArr1[p].refId) == -1) {
                                    this._petRefIdArr.push(petArr1[p].refId);
                                    this._petUidArr.push(petArr1[p].uid);
                                }
                            }
                        }
                    }
                }
                for (var c = this._petUidArr.length - 1; c >= 0; c--) {
                    if (!hasQuitlyPet) {
                        var petVo = GameModels.pet.getAllPetVOByUid(this._petUidArr[c]);
                        var petVo1 = this.getSameCountry(petArr1, petVo, this._data.star);
                        if (petVo1) {
                            hasQuitlyPet = true;
                            this._petRefIdArr.splice(c, 1, petVo1.refId);
                            this._petUidArr.splice(c, 1, petVo1.uid);
                        }
                    }
                }
                if (!hasQuitlyPet) {
                    for (var b = 0; b < petArr1.length; b++) {
                        if (petArr1[b].state == 1)
                            continue;
                        if (petArr1[b].star >= this._data.star) {
                            selectedCounty.push(petArr1[b].template.country);
                            if (this._petRefIdArr.length < 3) {
                                if (this._petRefIdArr.indexOf(petArr1[b].refId) == -1) {
                                    this._petRefIdArr.push(petArr1[b].refId);
                                    this._petUidArr.push(petArr1[b].uid);
                                    break;
                                }
                            }
                        }
                    }
                }
                for (var j = 0; j < this._petUidArr.length; j++) {
                    for (var z = 0; z < this._listCollection.source.length; z++) {
                        if (this._listCollection.source[z].id.uid == this._petUidArr[j]) {
                            this._listCollection.source[z].selected = true;
                        }
                    }
                }
                if (selectedCounty.length <= 0) {
                    mg.alertManager.tip(Language.C_MYPPWJ);
                    return;
                }
                this._listCollection.replaceAll(this._listCollection.source);
                this.showSelectedPet();
                this._clickOneKey = true;
                var view = mg.uiManager.getView(pet.PetGroupMain);
                if (view)
                    view.updataChange();
            };
            /**获取相同国家更高品质武将 */
            ImperialEdictTask.prototype.getSameCountry = function (petArr, petVo, needQuality) {
                var hashPet = null;
                for (var i = 0; i < petArr.length; i++) {
                    if (petArr[i].state == 1) {
                        continue;
                    }
                    else {
                        if (petArr[i].template.country == petVo.template.country && petArr[i].star >= needQuality) {
                            hashPet = petArr[i];
                            break;
                        }
                    }
                }
                return hashPet;
            };
            Object.defineProperty(ImperialEdictTask.prototype, "clickOneKey", {
                get: function () {
                    return this._clickOneKey;
                },
                enumerable: true,
                configurable: true
            });
            ImperialEdictTask.prototype.onRemoveView = function (e) {
                mg.uiManager.remove(this);
            };
            ImperialEdictTask.prototype.exit = function () {
                this._petArr = [];
                this._petRefIdArr = [];
                this._petUidArr = [];
                this._data = null;
                this._isHasPet = false;
                for (var i = 0; i < this._btnArr.length; i++) {
                    this._btnArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClick, this);
                }
                for (var i = 0; i < this._iconArr.length; i++) {
                    this._iconArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onIconClick, this);
                }
                this.list.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onListClick, this);
                this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRemoveView, this);
                this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRemoveView, this);
                this.btnRefresh0.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.taskWork, this);
                this.btnRefresh.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onekeyClick, this);
            };
            return ImperialEdictTask;
        }(ui.ImperialEdictTaskSkin));
        imperialEdict.ImperialEdictTask = ImperialEdictTask;
        __reflect(ImperialEdictTask.prototype, "dialog.imperialEdict.ImperialEdictTask");
    })(imperialEdict = dialog.imperialEdict || (dialog.imperialEdict = {}));
})(dialog || (dialog = {}));
