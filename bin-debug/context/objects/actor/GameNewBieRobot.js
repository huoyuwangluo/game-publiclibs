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
var s;
(function (s) {
    var GameNewBieRobot = (function (_super) {
        __extends(GameNewBieRobot, _super);
        function GameNewBieRobot() {
            var _this = _super.call(this, TypeActor.ROBOT) || this;
            _this._startId = 100050;
            _this._endId = 100110;
            return _this;
        }
        GameNewBieRobot.prototype.initialize = function (vo) {
            _super.prototype.initialize.call(this, vo);
            this.autoAttack = false;
        };
        GameNewBieRobot.prototype.reset = function () {
            this.stopTask();
            _super.prototype.reset.call(this);
        };
        GameNewBieRobot.prototype.startTask = function (taskStart, taskEnd) {
            switch (taskStart.type) {
                case TypeTask.DIALOG:
                    var npcData = this._scene.data.getNpcDataById(parseInt(taskStart.target));
                    this.setBorn(npcData.node);
                    break;
                case TypeTask.MONSTER:
                    var monsterData = this._scene.data.getRandomMonsterDataById(parseInt(taskStart.target));
                    this.setBorn(battle.manager.getAroundRandomNode(this._scene, monsterData.node));
                    break;
            }
            this._curTask = taskEnd;
            this.updateState();
        };
        GameNewBieRobot.prototype.nextTaskHandler = function () {
            if (this._curTask.id == this._endId) {
                this._curTask = Templates.getTemplateById(templates.Map.TASKNEWBIE, this._startId);
                this.setBorn(this._scene.data.born);
            }
            else {
                this._curTask = Templates.getTemplateById(templates.Map.TASKNEWBIE, this._curTask.nextId);
            }
            this.updateState();
        };
        GameNewBieRobot.prototype.updateState = function () {
            var taskTemplate = this._curTask;
            switch (taskTemplate.type) {
                case TypeTask.MONSTER:
                    this.startKillMonster(parseInt(taskTemplate.target), taskTemplate.needTimes);
                    break;
                case TypeTask.DIALOG:
                    this.startFindNpc(parseInt(taskTemplate.target));
                    break;
            }
        };
        GameNewBieRobot.prototype.stopTask = function () {
            this.stopFindNpc();
            this.stopKillMonster();
        };
        GameNewBieRobot.prototype.startKillMonster = function (configId, times) {
            this._killTimes = times;
            this._killMonsterId = configId;
            this.killMonsterHandler();
        };
        GameNewBieRobot.prototype.stopKillMonster = function () {
            if (this.target)
                this.target.offDead(this, this.monsterDeadHandler);
        };
        GameNewBieRobot.prototype.killMonsterHandler = function () {
            var total = this._scene ? this._scene.getMonsterCountByConfigId(this._killMonsterId) : 0;
            var excepts = [];
            var monster;
            while (total--) {
                monster = this._scene.getMinMonsterByConfigId(this, this._killMonsterId, excepts);
                if (monster.target) {
                    excepts.push(monster);
                    continue;
                }
                break;
            }
            this.target = monster;
            if (!this.target && this._scene) {
                this._scene.getMinMonsterByConfigId(this, this._killMonsterId, null);
            }
            this.target.onDead(this, this.monsterDeadHandler);
        };
        GameNewBieRobot.prototype.monsterDeadHandler = function () {
            this.target.offDead(this, this.monsterDeadHandler);
            this._killTimes--;
            if (this._killTimes > 0) {
                this.killMonsterHandler();
                return;
            }
            this.nextTaskHandler();
        };
        ///////////////////////////FIND NPC//////////////////////////////////
        GameNewBieRobot.prototype.startFindNpc = function (npcConfigId) {
            var npcData = this._scene.data.getNpcDataById(npcConfigId);
            var node = battle.manager.getAroundEmptyNode(this._scene, npcData.node, this.tileNode);
            if (Math.abs(this.tileX - node.x) < 2 && Math.abs(this.tileY - node.y) < 2) {
                utils.timer.once(2000, this, this.nextTaskHandler);
                return;
            }
            this.movePathTo(node.x, node.y);
            this.onStateChange(this, function (state) {
                if (state == TypeState.IDEL) {
                    this.offStateChange();
                    utils.timer.once(2000, this, this.nextTaskHandler);
                }
            });
        };
        GameNewBieRobot.prototype.stopFindNpc = function () {
            utils.timer.clear(this, this.nextTaskHandler);
            this.offStateChange();
        };
        return GameNewBieRobot;
    }(s.GamePlayer));
    s.GameNewBieRobot = GameNewBieRobot;
    __reflect(GameNewBieRobot.prototype, "s.GameNewBieRobot");
})(s || (s = {}));
