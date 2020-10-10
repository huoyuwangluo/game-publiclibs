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
var mo;
(function (mo) {
    /**分享 */
    var ModelShare = (function (_super) {
        __extends(ModelShare, _super);
        function ModelShare() {
            return _super.call(this) || this;
        }
        ModelShare.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._firstShareStatus = 0;
            this._firendList = [];
            this._firendRewardList = [];
            this._loginStatus = 0;
            this._loginToday = 0;
            this._data = null;
            this.requestGetFirstShareStatus();
            this.requestGetShareFirendInfo();
            this.onRoute(n.MessageMap.NOTIFYSHAREFRIENDINFO, utils.Handler.create(this, this.updataShareFriendInfo, null, false));
        };
        Object.defineProperty(ModelShare.prototype, "firstShareStatus", {
            /**0：未达成，1：可领取，2：已领取 */
            get: function () {
                return this._firstShareStatus;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelShare.prototype, "loginStatus", {
            /**今天奖励状态，0：可领取，1：已领取*/
            get: function () {
                return this._loginStatus;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelShare.prototype, "loginToday", {
            /**已领取N天登录奖励 */
            get: function () {
                return this._loginToday;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelShare.prototype, "firendList", {
            get: function () {
                this._firendList.sort(function (a, b) {
                    return b.Level - a.Level;
                });
                return this._firendList;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelShare.prototype, "firendRewardList", {
            //0：未达成，1：可领取，2：已领取
            get: function () {
                this._firendRewardList.sort(function (a, b) {
                    if (a.older == b.older) {
                        return a.key - b.key;
                    }
                    else {
                        return a.older - b.older;
                    }
                });
                return this._firendRewardList;
            },
            enumerable: true,
            configurable: true
        });
        //获取首次分享奖励状态
        ModelShare.prototype.requestGetFirstShareStatus = function (complete) {
            var _this = this;
            this.request(n.MessageMap.C2G_SHAREFRIEND_GETFIRSTSHARESTATUS, n.MessagePool.from(n.C2G_ShareFriend_GetFirstShareStatus), utils.Handler.create(this, function (data) {
                _this._firstShareStatus = data.Status;
                if (complete)
                    complete.runWith(data);
                GameModels.state.updateState(GameRedState.SHARE);
            }));
        };
        //设置完成首次分享
        ModelShare.prototype.requestSetFirstShareStatus = function (complete) {
            var _this = this;
            this.request(n.MessageMap.C2G_SHAREFRIEND_SETFIRSTSHARE, n.MessagePool.from(n.C2G_ShareFriend_SetFirstShare), utils.Handler.create(this, function (data) {
                _this._firstShareStatus = data.Status;
                if (complete)
                    complete.runWith(data);
                GameModels.state.updateState(GameRedState.SHARE);
                _this.dispatchEventWith(mo.ModelShare.FIRSTREWARD_UPDATA);
            }));
        };
        //领取首次分享奖励
        ModelShare.prototype.requestGetFirstShareReward = function (complete) {
            var _this = this;
            this.request(n.MessageMap.C2G_SHAREFRIEND_GETFIRSTSHAREREWARD, n.MessagePool.from(n.C2G_ShareFriend_GetFirstShareReward), utils.Handler.create(this, function (data) {
                _this._firstShareStatus = data.Status;
                if (complete)
                    complete.runWith(data);
                var dataSet = GameModels.dataSet.getDataSettingValueById(910001);
                if (dataSet) {
                    var str = dataSet.split(";");
                    mg.alertManager.showAlert(UsePropGetGift, true, true, str);
                }
                GameModels.state.updateState(GameRedState.SHARE);
                _this.dispatchEventWith(mo.ModelShare.FIRSTREWARD_UPDATA);
            }));
        };
        //获取分享好友信息
        ModelShare.prototype.requestGetShareFirendInfo = function () {
            var cmd = n.MessagePool.from(n.C2G_ShareFriend_Info);
            this.notify(n.MessageMap.C2G_SHAREFRIEND_INFO, cmd);
        };
        ModelShare.prototype.updataShareFriendInfo = function (data) {
            if (this._firendList) {
                for (var _i = 0, _a = this._firendList; _i < _a.length; _i++) {
                    var item = _a[_i];
                    n.MessagePool.to(item);
                }
                this._firendList = [];
            }
            if (this._data) {
                n.MessagePool.to(this._data);
                this._data = null;
            }
            this._data = data;
            this._data.autoRecover = false;
            this._firendList = this._data.ShareFriendList;
            this._firendRewardList = [];
            for (var i = 0; i < this._data.RewardList.length; i++) {
                var listVo = vo.fromPool(vo.ProtoPairIntIntVO, this._data.RewardList[i]);
                this._firendRewardList.push(listVo);
            }
            this._loginStatus = this._data.TodayLoginRewardStatus;
            this._loginToday = this._data.LoginDaysIndex;
            GameModels.state.updateState(GameRedState.UNION_SHARE);
            this.dispatchEventWith(mo.ModelShare.LOGINREWARD_UPDATA);
        };
        //领取分享好友达标奖励
        ModelShare.prototype.requestGetTargetReward = function (id, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_ShareFriend_GetTargetReward);
            msg.RewardId = id;
            this.request(n.MessageMap.C2G_SHAREFRIEND_GETTARGETREWARD, msg, utils.Handler.create(this, function (data) {
                for (var i = 0; i < data.RewardList.length; i++) {
                    for (var j = 0; j < _this._firendRewardList.length; j++) {
                        if (data.RewardList[i].RewardId == _this._firendRewardList[j].key) {
                            _this._firendRewardList[j].value = data.RewardList[i].Status;
                        }
                    }
                }
                GameModels.state.updateState(GameRedState.UNION_SHARE);
                _this.dispatchEventWith(mo.ModelShare.LOGINREWARD_UPDATA);
                if (complete)
                    complete.runWith(data);
            }));
        };
        //领取登录奖励
        ModelShare.prototype.requestGetLoginReward = function () {
            var _this = this;
            this.request(n.MessageMap.C2G_SHAREFRIEND_GETLOGINREWARD, n.MessagePool.from(n.C2G_ShareFriend_GetLoginReward), utils.Handler.create(this, function (data) {
                _this._loginStatus = data.TodayLoginRewardStatus;
                _this._loginToday = data.LoginDaysIndex;
                var dataSet = GameModels.dataSet.getDataSettingValueById(920001);
                if (dataSet) {
                    var str = dataSet.split(";");
                    mg.alertManager.showAlert(UsePropGetGift, true, true, str);
                }
                GameModels.state.updateState(GameRedState.UNION_SHARE);
                _this.dispatchEventWith(mo.ModelShare.LOGINREWARD_UPDATA);
            }));
        };
        ModelShare.prototype.checkShareRedPoint = function () {
            if (platform.sdk && platform.sdk.type == "wx") {
                if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.share))
                    return false;
                if (this._firstShareStatus == 1)
                    return true;
            }
            return false;
        };
        ModelShare.prototype.checkFriendShareRedPoint = function () {
            if (platform.sdk && platform.sdk.type == "wx") {
                if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.shareFriend))
                    return false;
                if (this._loginStatus == 0)
                    return true;
                for (var _i = 0, _a = this._firendRewardList; _i < _a.length; _i++) {
                    var reward = _a[_i];
                    if (reward.value == 1) {
                        return true;
                    }
                }
            }
            return false;
        };
        ModelShare.LOGINREWARD_UPDATA = "LOGINREWARD_UPDATA";
        ModelShare.FIRSTREWARD_UPDATA = "FIRSTREWARD_UPDATA";
        return ModelShare;
    }(mo.ModelBase));
    mo.ModelShare = ModelShare;
    __reflect(ModelShare.prototype, "mo.ModelShare");
})(mo || (mo = {}));
