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
var mg;
(function (mg) {
    var DebugManager = (function () {
        function DebugManager() {
            this._testSoundIndex = 0;
        }
        DebugManager.prototype.DebugManager = function () {
        };
        Object.defineProperty(DebugManager, "instance", {
            get: function () {
                if (!DebugManager._instance) {
                    DebugManager._instance = new DebugManager();
                }
                return DebugManager._instance;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugManager.prototype, "isShow", {
            get: function () {
                return this._view.parent != null;
            },
            enumerable: true,
            configurable: true
        });
        DebugManager.prototype.initialize = function (stage) {
            this._stage = stage;
            this._view = new LoggerPanel();
            this.hide();
            switch (egret.Capabilities.runtimeType) {
                case egret.RuntimeType.NATIVE:
                    break;
                case egret.RuntimeType.WEB:
                    mg.keyBoardManager.onKeyDown(this, this.keyHandler);
                    break;
            }
            stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
        };
        DebugManager.prototype.touchHandler = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    if (e.stageY < 38) {
                        utils.timer.once(1000, this, this.updateDisplay);
                    }
                    this._stage.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    break;
                case egret.TouchEvent.TOUCH_END:
                    this._stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
                    utils.timer.clear(this, this.updateDisplay);
                    break;
            }
        };
        DebugManager.prototype.updateDisplay = function () {
            this.isShow ? this.hide() : this.show();
        };
        DebugManager.prototype.keyHandler = function (keyCode) {
            if (keyCode == mg.Keyboard.F7) {
                this.isShow ? this.hide() : this.show();
            }
        };
        DebugManager.prototype.show = function () {
            this._view.add();
            this._view.activeFocus();
            this._view.onCommmand(this, this.commandHandler);
            // this.commandHandler("reslook");
            // this.commandHandler("testsound");
        };
        DebugManager.prototype.hide = function () {
            this._view.offCommand();
            this._view.clear();
            this._view.remove();
        };
        DebugManager.prototype.commandHandler = function (command) {
            var _this = this;
            if (!command)
                return;
            var commands = command.split(" ");
            for (var i = 0; i < commands.length; i++) {
                if (!utils.StringUtil.delSpace(commands[i])) {
                    commands.splice(i, 1);
                }
            }
            var tempCommand = commands.shift();
            command = tempCommand.toLowerCase();
            switch (command) {
                case "testsound":
                    utils.timer.loop(500, this, function () {
                        mg.soundManager.playSound("test_" + _this._testSoundIndex);
                        _this._testSoundIndex++;
                        if (_this._testSoundIndex > 189) {
                            _this._testSoundIndex = 0;
                        }
                    });
                    break;
                case "pool":
                    var list = utils.ObjectPool.getInfo();
                    this._view.appendText("------------------ObjectPool---------------");
                    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                        var object = list_1[_i];
                        this._view.appendText("name:" + object.name + "  total:" + object.total);
                    }
                    break;
                case "poolmsg":
                    this._view.appendText("------------------MessagePool---------------");
                    var msgPool = n.MessagePool.getPool();
                    var total = 0;
                    for (var name in msgPool) {
                        var array = msgPool[name];
                        if (array.length > 1)
                            this._view.appendText("name:" + name + "  total:" + array.length);
                        total++;
                    }
                    this._view.appendText("------------------TotalPool:" + total + "---------------");
                    break;
                case 'statis':
                    var list = GameStatistics.getAnimationStatistics();
                    this._view.appendText("------------------Statis---------------");
                    var space = '								';
                    this._view.appendText("resId" + space + "playing" + space + "parent" + space + "parent.parent.parent" + space + "className");
                    this._view.appendText("");
                    for (var _a = 0, list_2 = list; _a < list_2.length; _a++) {
                        var data = list_2[_a];
                        this._view.appendText("" + data.resId + space + data.playing + space + (data.parent ? data.parent : 'noparent') + space + (data.parentparent ? data.parentparent : 'NONE') + space + space + data.className + space);
                        //this._view.appendText("name:"+data.hash[name].res+"parent:"+name+"  total:"+data.hash[name].count+"  touchEnabled:"+data.hash[name].touchEnabled+' parent:'+data.hash[name].parent+','+data.hash[name].parentparent);
                    }
                    this._view.appendText("------------------Statis---------------");
                    break;
                case "reslist":
                    this._view.appendText("------------------reslist---------------");
                    var cnt = 0;
                    logger.log("------------------reslist _animalib---------------");
                    for (var type in mg.assetsManager._animalib) {
                        logger.log("type------------------" + type);
                        cnt = 0;
                        for (var name in mg.assetsManager._animalib[type]) {
                            logger.log("name=" + name);
                            cnt++;
                        }
                        this._view.appendText("_animalib::type=" + type + ";cnt=" + cnt);
                    }
                    logger.log("------------------reslist _iconLib---------------");
                    cnt = 0;
                    for (var name in mg.assetsManager._iconLib) {
                        logger.log(name);
                        cnt++;
                    }
                    this._view.appendText("_iconLib::cnt=" + cnt);
                    logger.log("------------------reslist _iconDropLib---------------");
                    cnt = 0;
                    for (var name in mg.assetsManager._iconDropLib) {
                        logger.log(name);
                        cnt++;
                    }
                    this._view.appendText("_iconDropLib::cnt=" + cnt);
                    logger.log("------------------reslist MapResCache---------------");
                    cnt = 0;
                    for (var url in s.MapRes.getCache()) {
                        logger.log(url);
                        cnt++;
                    }
                    this._view.appendText("MapResCache::cnt=" + cnt);
                    logger.log("------------------end reslist---------------");
                    this._view.appendText("------------------end reslist---------------");
                    break;
                case "reslook":
                    utils.timer.loop(2000, this, function () {
                        var str = "";
                        var cnt = 0;
                        str += "_animalib::";
                        for (var type in mg.assetsManager._animalib) {
                            cnt = 0;
                            for (var name in mg.assetsManager._animalib[type]) {
                                cnt++;
                            }
                            //str += type + "=" + cnt + ",";
                        }
                        cnt = 0;
                        for (var name in mg.assetsManager._iconLib) {
                            cnt++;
                        }
                        //str += "_iconLib::" + cnt + ",";
                        cnt = 0;
                        for (var name in mg.assetsManager._iconDropLib) {
                            cnt++;
                        }
                        //str += "_iconDropLib::" + cnt + ",";
                        cnt = 0;
                        for (var url in s.MapRes.getCache()) {
                            cnt++;
                        }
                        //str += "MapResCache::" + cnt + ",";
                        cnt = 0;
                        for (var name in mg.soundManager._lib) {
                            cnt++;
                        }
                        str += "sound::" + cnt + ",";
                        GameModels.chat.sendDebugMessage(str);
                    });
                    break;
                case "exit":
                    this.hide();
                    break;
                case "help":
                    if (commands.length && commands[0] == "server") {
                        this._view.appendText("------------------Help Server---------------");
                        this._view.appendText("		addItem:加物品  [param]:	物品id 数量");
                        this._view.appendText("		addExp:加经验   [param]:	经验数");
                        this._view.appendText('		addMoney:加钱   [param]:  	<数量>, "加货币 后面三个参数依次: 1为银两 2为绑定元宝 3为元宝", "示例1:addMoney 1000 1000 1000"\n');
                        return;
                    }
                    this._view.appendText("------------------Help---------------");
                    this._view.appendText("		exit:退出控制台");
                    this._view.appendText("		pool:查看缓存池");
                    this._view.appendText("		poolmsg:查看消息缓存池");
                    this._view.appendText("		statis:查看动画对象统计信息");
                    this._view.appendText("		msg:向服务器发送消息");
                    this._view.appendText("		send:向服务器发送命令");
                    this._view.appendText("		exit:退出控制台");
                    break;
                case "send":
                    var cmd = n.MessagePool.from(n.C2G_Debug_Event);
                    cmd.CommandStr = commands.join(" ");
                    n.net.request(n.MessageMap.C2G_DEBUG_EVENT, cmd, utils.Handler.create(this, function (data) {
                        this._view.appendText(data ? ("command:" + data.Command + "+result:" + data.Result) : "有返回,无内容");
                    }));
                    break;
                case "msg":
                    if (commands.length < 2)
                        break;
                    try {
                        var msgName = commands[0].toLocaleUpperCase();
                        var object = JSON.parse(commands[1]);
                        var msgRouteId = this.getMsgRouteId(msgName);
                        var msgClass = n.MessageMap.getMessage(msgRouteId);
                        if (msgClass) {
                            var msg = n.MessagePool.from(msgClass);
                            for (var property in object) {
                                if (object[property] instanceof Array) {
                                    var childMsgClass = n.MessageMap.getMessage(this.getMsgRouteId(msgName.toLocaleUpperCase()));
                                    var childMsg = n.MessagePool.from(childMsgClass);
                                    for (var _b = 0, _c = object[property]; _b < _c.length; _b++) {
                                        var item = _c[_b];
                                        for (var childProperty in item) {
                                            childMsg[childProperty] = item[childProperty];
                                        }
                                        if (!msg[property]) {
                                            msg[property] = [];
                                        }
                                        msg[property].push(childMsg);
                                    }
                                }
                                else {
                                    msg[property] = object[property];
                                }
                            }
                            n.net.request(msgRouteId, msg, utils.Handler.create(this, function (data) {
                                this._view.appendText("消息返回:");
                                this._view.appendText(JSON.stringify(data));
                            }));
                        }
                    }
                    catch (e) {
                        logger.error(e);
                        this._view.appendText(e.toString());
                    }
                    // let cmd:n.C2G_Debug_Event = n.MessagePool.from(n.C2G_Debug_Event) as n.C2G_Debug_Event;
                    // cmd.CommandStr = commands.join(" ");
                    // n.net.request(n.MessageMap.C2G_DEBUG_EVENT, cmd, utils.Handler.create(this, function(data:n.G2C_Debug_Event){
                    // 	this._view.appendText(data?(`command:${data.Command}+result:${data.Result}`):"有返回,无内容");
                    // }));
                    break;
                case "full":
                    this._view.full();
                    break;
                case "test":
                    var horseId = commands[0];
                    var resId2 = commands[1];
                    var resId3 = commands[2];
                    var resId4 = commands[3];
                    if (horseId > 0) {
                        s.GameManager.instance.view.scene.manager.player.showHorse(horseId);
                    }
                    if (resId2 != "" && resId2 != "0") {
                        s.GameManager.instance.view.scene.manager.player.showTestWing(resId2);
                    }
                    if (resId3 != "" && resId3 != "0") {
                        s.GameManager.instance.view.scene.manager.player.bodyResId = resId3;
                    }
                    if (resId4 != "" && resId4 != "0") {
                        s.GameManager.instance.view.scene.manager.player.weaponResId = resId4;
                    }
                    break;
                case "battle":
                    //var chapterId: number = <number>commands[0];
                    app.gameContext.enterGameTopBattleRoom("aaa");
                    // app.gameContext.enterExpedition();
                    break;
                case "story":
                    var storyId = commands[0];
                    mg.StoryManager.instance.startBigStory(storyId);
                    break;
                case "bc":
                    var petId = commands[0];
                    copy.CopyMainView.instance.showBossComming(petId);
                    break;
                case "testtitle":
                    var testId = commands[0];
                    s.GameManager.instance.view.scene.manager.player.updateMarktitle(testId.toString());
                    break;
                case "speed":
                    var spd = commands[0];
                    s.TimerLine.FRAME_CURRENT_SPEED = spd;
                    break;
                case "clz":
                    var activityId = commands[0];
                    app.gameContext.enterCampBattleWar(activityId);
                    break;
                case "road":
                    GameModels.scene.getPlayerVOBySceneFlag(commands[0]);
                    break;
                case "showbuff":
                    var open = commands[0];
                    s.TitleObject.SHOW_DEBUG_BUFF = (open > 0);
                    break;
                case "setfunid":
                    var testId = commands[0];
                    mg.uiManager.showByName(testId);
                    break;
                case "openouyuxianren":
                    this.commandHandler("send setTask 100210");
                    this.commandHandler("send setWenGuan 102");
                    this.commandHandler("send setWenGuanTaskStatus 10201 1");
                    this.commandHandler("send setWenGuanTaskStatus 10202 1");
                    break;
                case "sb":
                    var skillId = commands[0];
                    battle.manager.showSkillName(app.gameContext.gameCurrent.player, skillId);
                    break;
                case "setlv":
                    var testId1 = parseInt(commands[0]);
                    var testId2 = parseInt(commands[1]);
                    GameModels.common.showUpLvDragonBone(testId1, testId2);
                    break;
                case "showchapterguodueff":
                    GameModels.chapter.showChapterGuoDuEff();
                    break;
                default:
                    break;
            }
        };
        DebugManager.prototype.getMsgRouteId = function (msgName) {
            for (var key in n.MessageMap) {
                if (key == msgName) {
                    return n.MessageMap[key];
                }
            }
            return 0;
        };
        DebugManager.prototype.setMsgValue = function (msg, property, value) {
            if (value == 'true' || value == 'false') {
                msg[property] = value == 'true';
            }
            else if (parseInt(value) != undefined) {
                msg[property] = parseInt(value);
            }
            else {
                msg[property] = value;
            }
        };
        return DebugManager;
    }());
    mg.DebugManager = DebugManager;
    __reflect(DebugManager.prototype, "mg.DebugManager");
    var LoggerPanel = (function (_super) {
        __extends(LoggerPanel, _super);
        function LoggerPanel() {
            var _this = _super.call(this) || this;
            _this._history = [];
            _this._historyMax = 20;
            _this._historyIndex = 0;
            _this._lock = false;
            _this._fulled = false;
            _this.touchEnabled = true;
            _this.createChildren();
            return _this;
        }
        LoggerPanel.prototype.createChildren = function () {
            this._size = new egret.Rectangle(0, 0, 600, 200);
            this._back = new egret.Shape();
            this.addChild(this._back);
            this._output = new egret.TextField();
            this._output.type = egret.TextFieldType.INPUT;
            this._output.fontFamily = "";
            this._output.size = 14;
            this._output.textColor = 0xffffff;
            this.addChild(this._output);
            this._output.wordWrap = true;
            this._output.multiline = true;
            //this._output.touchEnabled=false;
            this._input = new egret.TextField();
            this._input.type = egret.TextFieldType.INPUT;
            this._input.fontFamily = "";
            this._input.size = 14;
            this._input.textColor = 0xccffcc;
            this.addChild(this._input);
            this._input.wordWrap = false;
            this._btnSend = new egret.Sprite();
            this._btnSend.graphics.beginFill(0x333333, 1);
            this._btnSend.graphics.drawRect(0, 0, 60, 30);
            this._btnSend.graphics.endFill();
            this._btnSend.touchEnabled = true;
            this.addChild(this._btnSend);
            this._btnSendLabel = new egret.TextField();
            this._btnSendLabel.type = egret.TextFieldType.DYNAMIC;
            this._btnSendLabel.fontFamily = "";
            this._btnSendLabel.size = 14;
            this._btnSendLabel.textColor = 0xffffff;
            this.addChild(this._btnSendLabel);
            this._btnSendLabel.text = Language.J_FS;
            this._btnSendLabel.width = this._btnSendLabel.textWidth;
            this._btnSendLabel.height = this._btnSendLabel.textHeight;
            this._btnSendLabel.touchEnabled = false;
        };
        LoggerPanel.prototype.activeFocus = function () {
            this._input.text = "";
        };
        LoggerPanel.prototype.clear = function () {
            this._output.text = "";
            this._input.text = "";
            this._historyIndex = 0;
            this._fulled = false;
        };
        LoggerPanel.prototype.add = function () {
            mg.layerManager.log.addChild(this);
            switch (egret.Capabilities.runtimeType) {
                case egret.RuntimeType.NATIVE:
                    break;
                case egret.RuntimeType.WEB:
                    mg.keyBoardManager.onKeyDown(this, this.keyHandler);
                    break;
            }
            this._btnSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
            mg.stageManager.onResize(this, this.resize, true);
        };
        LoggerPanel.prototype.remove = function () {
            if (this.parent) {
                this.parent.removeChild(this);
            }
            switch (egret.Capabilities.runtimeType) {
                case egret.RuntimeType.NATIVE:
                    break;
                case egret.RuntimeType.WEB:
                    mg.keyBoardManager.offKeyDown(this, this.keyHandler);
                    break;
            }
            this._btnSend.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
            mg.stageManager.onResize(this, this.resize, true);
        };
        Object.defineProperty(LoggerPanel.prototype, "lock", {
            get: function () {
                return this._lock;
            },
            set: function (value) {
                this._lock = value;
            },
            enumerable: true,
            configurable: true
        });
        LoggerPanel.prototype.onCommmand = function (caller, method) {
            this.offCommand();
            this._commandHandler = utils.Handler.create(caller, method, null, false);
        };
        LoggerPanel.prototype.offCommand = function () {
            if (this._commandHandler) {
                this._commandHandler.recover();
                this._commandHandler = null;
            }
        };
        /**
         * 加入文本到尾部
         * @param text
         * @param color
         * @param wordWrap
         *
         */
        LoggerPanel.prototype.appendText = function (text, wordWrap) {
            if (wordWrap === void 0) { wordWrap = true; }
            this._output.appendText(text + (wordWrap ? "\n" : ""));
            //this._output.text+=(text+(wordWrap?"\n":""));
            this._output.scrollV = this._output.maxScrollV;
        };
        /**
         * 加入HTML文本到尾部
         * @param text
         * @param color
         * @param wordWrap
         *
         */
        LoggerPanel.prototype.appendHTMLText = function (text, color, wordWrap) {
            if (color === void 0) { color = 0xFFFFFF; }
            if (wordWrap === void 0) { wordWrap = true; }
            //outTf.htmlText+=("<font color='#"+color.toString(16)+"'>"+text+(wordWrap?"\n":"")+"</font>");
            //outTf.scrollV=outTf.maxScrollV;
        };
        LoggerPanel.prototype.full = function () {
            this._fulled = true;
            mg.stageManager.resize(this, this.resize);
        };
        LoggerPanel.prototype.cancelfull = function () {
            this._fulled = false;
            mg.stageManager.resize(this, this.resize);
        };
        LoggerPanel.prototype.keyHandler = function (keyCode) {
            if (keyCode == mg.Keyboard.ENTER) {
                this.enterHandler();
                return;
            }
            if (keyCode == mg.Keyboard.UP) {
                if (!this._history.length)
                    return;
                this._input.text = this._history[this._historyIndex];
                this._historyIndex--;
                if (this._historyIndex < 0) {
                    this._historyIndex = this._history.length - 1;
                }
                this._input.$setSelection(this._input.text.length - 1, this._input.text.length - 1);
                return;
            }
            if (keyCode == mg.Keyboard.DOWN) {
                if (!this._history.length)
                    return;
                this._historyIndex++;
                if (this._historyIndex >= this._history.length) {
                    this._historyIndex = 0;
                }
                this._input.text = this._history[this._historyIndex];
                this._input.$setSelection(this._input.text.length, this._input.text.length);
                return;
            }
        };
        LoggerPanel.prototype.sendClickHandler = function (e) {
            this.enterHandler();
        };
        LoggerPanel.prototype.enterHandler = function () {
            if (!this._input.text)
                return;
            this._history.push(this._input.text);
            if (this._history.length > this._historyMax) {
                this._history.shift();
            }
            this.appendText(">>" + this._input.text);
            if (this._commandHandler)
                this._commandHandler.runWith(this._input.text);
            this._output.scrollV = this._output.maxScrollV;
            this._historyIndex = this._history.length - 1;
            this._input.text = "";
        };
        LoggerPanel.prototype.resize = function (stageWdith, stageHeight) {
            this._size.width = stageWdith;
            this._size.height = stageHeight * (this._fulled ? 1 : 0.3);
            // var scale:Number=(stageWdith/512)
            // this._outTf.size=this._inTf.size=(12*this.scale)>>0;
            this._back.graphics.clear();
            this._back.graphics.beginFill(0x0, 0.8);
            this._back.graphics.drawRect(0, 0, this._size.width, this._size.height);
            this._back.graphics.endFill();
            var lineY = this._size.height - 30;
            this._back.graphics.lineStyle(1, 0x444444);
            this._back.graphics.moveTo(0, lineY);
            this._back.graphics.lineTo(this._size.width, lineY);
            this._back.graphics.endFill();
            this._back.alpha = 0.8;
            this._output.width = this._size.width - 10;
            this._output.height = this._size.height - 40;
            this._output.x = this._output.y = 5;
            this._input.width = this._size.width - 50;
            this._input.height = 20;
            this._input.x = 5;
            this._input.y = this._size.height - 25;
            this._btnSend.x = this._size.width - this._btnSend.width;
            this._btnSend.y = this._size.height - 30;
            this._btnSend.height = 30;
            this._btnSendLabel.x = this._btnSend.x + this._btnSend.width / 2 - this._btnSendLabel.width / 2;
            this._btnSendLabel.y = this._btnSend.y + this._btnSendLabel.height / 2 - this._btnSendLabel.height / 2 + 10;
            egret.callLater(this.updateOutTextFiled, this);
        };
        //延迟刷新ScrollV
        LoggerPanel.prototype.updateOutTextFiled = function () {
            this._output.scrollV = this._output.maxScrollV;
        };
        Object.defineProperty(LoggerPanel.prototype, "input", {
            get: function () {
                return this._input;
            },
            enumerable: true,
            configurable: true
        });
        return LoggerPanel;
    }(egret.Sprite));
    mg.LoggerPanel = LoggerPanel;
    __reflect(LoggerPanel.prototype, "mg.LoggerPanel");
})(mg || (mg = {}));
