var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var SceneManager = (function () {
        function SceneManager(scene) {
            this._scene = scene;
            this._scene.touchChildren = false;
            this._scene.touchEnabled = true;
            this._scene.initialize(new s.MapData());
        }
        SceneManager.prototype.initialize = function () {
            if (!this._player) {
                this._player = new s.GamePlayer();
                this._player.aiClass = s.AIPlayer;
                this._player.isuser = true;
                //this._player.enableMoveFiveDirect();
            }
            this._monsters = [];
            this._monsterTotal = 0;
        };
        SceneManager.prototype.clear = function () {
            for (var _i = 0, _a = this._monsters; _i < _a.length; _i++) {
                var monster = _a[_i];
                monster.offDeadAll();
                egret.Tween.removeTweens(monster);
                this._scene.removeMonster(monster);
                utils.ObjectPool.to(monster, true);
            }
            this._monsters.length = 0;
            this.offMonsterDead();
            this.offMonsterRemove();
            this._monsterTotal = 0;
        };
        Object.defineProperty(SceneManager.prototype, "player", {
            get: function () {
                return this._player;
            },
            enumerable: true,
            configurable: true
        });
        /**刷怪*/
        SceneManager.prototype.refreshMonster = function (node, monsterVO, total, range, autoStart, autoAttack) {
            if (total === void 0) { total = 20; }
            if (range === void 0) { range = 4; }
            if (autoStart === void 0) { autoStart = true; }
            if (autoAttack === void 0) { autoAttack = false; }
            if (!node || !node.walkable) {
                logger.error('目标点不可行走,刷怪失败');
                return null;
            }
            return this.refreshHandler(node, monsterVO, total, range, autoStart, autoAttack);
        };
        /**刷BOSS */
        SceneManager.prototype.refreshBoss = function (node, monsterVO, autoStart, autoAttack) {
            if (autoStart === void 0) { autoStart = true; }
            if (autoAttack === void 0) { autoAttack = false; }
            var boss = this.addMonster(node, TypeActor.BOSS, monsterVO);
            boss.autoAttack = autoAttack;
            if (autoStart)
                boss.start();
            return boss;
        };
        /**刷精英怪 */
        SceneManager.prototype.refreshMonsterElite = function (node, monsterVO, autoStart, autoAttack) {
            if (autoStart === void 0) { autoStart = true; }
            if (autoAttack === void 0) { autoAttack = false; }
            if (!node || !node.walkable) {
                logger.error('目标点不可行走,刷怪失败');
                return null;
            }
            var monster = this.addMonster(node, TypeActor.MONSTERELITE, monsterVO);
            monster.aiClass = s.AIMonster;
            monster.autoAttack = autoAttack;
            if (autoStart)
                monster.start();
            return monster;
        };
        /**刷新一只漫游怪物 */
        SceneManager.prototype.refreshMonsterWander = function (node, monsterVO, autoStart, autoAttack) {
            if (autoStart === void 0) { autoStart = true; }
            if (autoAttack === void 0) { autoAttack = false; }
            if (!node || !node.walkable) {
                logger.error('目标点不可行走,刷怪失败');
                return null;
            }
            var monster = this.addMonster(node, TypeActor.MONSTER, monsterVO);
            monster.aiClass = s.AIMonster;
            monster.autoAttack = autoAttack;
            if (autoStart)
                monster.start();
            return monster;
        };
        /**该出生点是否被占用 */
        SceneManager.prototype.isOccupyBorn = function (node) {
            for (var _i = 0, _a = this._scene.monsters; _i < _a.length; _i++) {
                var monster = _a[_i];
                if (!monster.stateDead) {
                    if (monster.bornTile == node)
                        return true;
                }
            }
            return false;
        };
        /**是否有精英怪 */
        SceneManager.prototype.hasMonsterElite = function (node) {
            for (var _i = 0, _a = this._scene.monsters; _i < _a.length; _i++) {
                var monster = _a[_i];
                if (!monster.stateDead) {
                    if (monster.type == TypeActor.MONSTERELITE)
                        return true;
                }
            }
            return false;
        };
        SceneManager.prototype.killAllMonsters = function () {
            for (var _i = 0, _a = this._scene.monsters; _i < _a.length; _i++) {
                var monster = _a[_i];
                if (!monster.stateDead) {
                    monster.hpHurted(monster.vo.hp);
                    this.removeMonster(monster, this._player.vo, false);
                }
            }
        };
        SceneManager.prototype.refreshHandler = function (node, monsterVO, total, range, autoStart, autoAttack) {
            if (autoStart === void 0) { autoStart = true; }
            if (autoAttack === void 0) { autoAttack = true; }
            if (!node || !node.walkable) {
                logger.error('目标点不可行走,刷怪失败');
                return null;
            }
            //this._player.targetTile=node;
            var sx = node.x - range;
            var ex = node.x + range;
            var sy = node.y - range;
            var ey = node.y + range;
            var nodes = [];
            for (var b = sy; b < ey; b++) {
                for (var a = sx; a < ex; a++) {
                    var _node = this._mapData.getNode(a, b);
                    if (_node && _node.walkable && _node != node) {
                        nodes.push(_node);
                    }
                }
            }
            if (!nodes.length) {
                //this._player.targetTile=node;
                logger.log("没有可用的位置... 生成怪物失败...", node.x, node.y);
                return node;
            }
            var index = 0;
            while (index < total && nodes.length) {
                var monster = this.addMonster(nodes.splice((Math.random() * nodes.length) >> 0, 1)[0], TypeActor.MONSTER, monsterVO);
                monster.autoAttack = autoAttack;
                if (autoStart)
                    monster.start();
                index++;
            }
            if (index > 0 && this._scene.monsters.length == 0) {
                logger.error("怪物生成失败!!!!");
            }
            return node;
        };
        SceneManager.prototype.onMonsterDead = function (caller, method) {
            this.offMonsterDead();
            this._monsterDeadHandler = utils.Handler.create(caller, method, null, false);
        };
        SceneManager.prototype.offMonsterDead = function () {
            if (this._monsterDeadHandler) {
                this._monsterDeadHandler.recover();
                this._monsterDeadHandler = null;
            }
        };
        SceneManager.prototype.onMonsterRemove = function (caller, method) {
            this.offMonsterRemove();
            this._monsterRemoveHandler = utils.Handler.create(caller, method, null, false);
        };
        SceneManager.prototype.offMonsterRemove = function () {
            if (this._monsterRemoveHandler) {
                this._monsterRemoveHandler.recover();
                this._monsterRemoveHandler = null;
            }
        };
        SceneManager.prototype.startMonster = function (autoAttack) {
            for (var _i = 0, _a = this._monsters; _i < _a.length; _i++) {
                var monster = _a[_i];
                if (monster.stateDead)
                    continue;
                monster.autoAttack = autoAttack;
                monster.start();
            }
        };
        Object.defineProperty(SceneManager.prototype, "isAllMonsterDead", {
            get: function () {
                return this._scene.deadAllMonster;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SceneManager.prototype, "monsterTotal", {
            get: function () {
                return this._monsterTotal;
            },
            enumerable: true,
            configurable: true
        });
        SceneManager.prototype.addMonster = function (node, type, monsterVO) {
            if (!node) {
                logger.error("Node不能为空!");
                return null;
            }
            var MonsterClass;
            switch (type) {
                case TypeActor.MONSTER:
                    MonsterClass = s.GameMonster;
                    break;
                case TypeActor.MONSTERELITE:
                    MonsterClass = s.GameMonsterElite;
                    break;
                case TypeActor.BOSS:
                    MonsterClass = s.GameBoss;
                    break;
            }
            var monster = utils.ObjectPool.from(MonsterClass);
            monster.aiClass = s.AIMonster;
            monster.initialize(monsterVO);
            monster.effectEnabled = true;
            monster.focusMode = false;
            monster.damgeEnabled = true;
            monster.actionTo(TypeAction.IDLE, (Math.random() * 8) >> 0);
            monster.onDead(this, this.removeMonster, monster);
            this._scene.addMonster(monster);
            monster.setTile(node);
            this._monsters.push(monster);
            this.updateMonsterTotal();
            return monster;
        };
        SceneManager.prototype.removeMonster = function (monster, killerVO, dispatchDead) {
            if (dispatchDead === void 0) { dispatchDead = true; }
            monster.stop();
            monster.offDead(this, this.removeMonster);
            /*
            egret.Tween.removeTweens(monster);
            var killer: s.SmartObject = this._scene.getActorByVO(killerVO);
            if (killer && killer != monster) {
                var angle: number = utils.MathUtil.getLAngle(monster.x - killer.x, monster.y - killer.y);
                var point: egret.Point = utils.MathUtil.getLinePointByAngle(monster.x, monster.y, 150, angle)
                egret.Tween.get(monster).to({ x: point.x, y: point.y }, 500, utils.Ease.quadOut);
            }
            var type: number = monster.type;
            var node: PF.Node = monster.tileNode;
            egret.Tween.get(monster).to({ alpha: 0 }, 500, utils.Ease.linearNone).call(this.onMonsterRemoveHandler, this, [monster]);
            */
            var killer = this._scene.getActorByVO(killerVO);
            var type = monster.type;
            var node = monster.tileNode;
            egret.Tween.get(monster).to({}, 500, utils.Ease.linearNone).call(this.onMonsterRemoveHandler, this, [monster]);
            this.updateMonsterTotal();
            if (dispatchDead && this._monsterDeadHandler) {
                this._monsterDeadHandler.runWith(monster.vo, type, node, killer);
            }
        };
        SceneManager.prototype.onMonsterRemoveHandler = function (monster) {
            var index = this._monsters.indexOf(monster);
            if (index >= 0)
                this._monsters.splice(index, 1);
            monster.offDeadAll();
            egret.Tween.removeTweens(monster);
            this._scene.removeMonster(monster);
            if (this._monsterRemoveHandler) {
                this._monsterRemoveHandler.runWith(monster);
            }
            monster.reset();
            utils.ObjectPool.to(monster);
        };
        SceneManager.prototype.updateMonsterTotal = function () {
            this._monsterTotal = 0;
            for (var _i = 0, _a = this._monsters; _i < _a.length; _i++) {
                var monster = _a[_i];
                if (!monster.stateDead) {
                    this._monsterTotal++;
                }
            }
        };
        SceneManager.prototype.dropItems = function (node, drops, showMoney, showDiamend) {
            if (showMoney === void 0) { showMoney = true; }
            if (showDiamend === void 0) { showDiamend = false; }
            logger.log("掉落的道具====", drops);
            var items = [];
            var dropObject;
            for (var _i = 0, drops_1 = drops; _i < drops_1.length; _i++) {
                var drop = drops_1[_i];
                dropObject = utils.ObjectPool.from(s.GameDropObject);
                dropObject.initialize(drop);
                items.push(dropObject);
            }
            if (showMoney) {
                //掉银两
                var moneyTotal = ((Math.random() * 3) >> 0) + 1;
                while (moneyTotal--) {
                    dropObject = utils.ObjectPool.from(s.GameDropObject);
                    dropObject.initialize(101);
                    items.push(dropObject);
                }
            }
            if (showDiamend) {
                //掉元宝
                dropObject = utils.ObjectPool.from(s.GameDropObject);
                dropObject.initialize(201);
                items.push(dropObject);
            }
            if (items.length && !node.drop)
                this._scene.addDrop(items.pop()).setTile(node);
            if (!items.length)
                return;
            var bodyNode = node;
            var around = 1;
            var node;
            while (items.length) {
                var i;
                var start;
                var end;
                start = bodyNode.x - around;
                end = bodyNode.x + around;
                for (i = start; i < end; i++) {
                    node = this._scene.getWalkableNode(i, bodyNode.y - around);
                    if (node && !node.drop && items.length)
                        this._scene.addDrop(items.pop()).setTile(node);
                }
                start = bodyNode.y - around;
                end = bodyNode.y + around;
                for (i = start; i < end; i++) {
                    node = this._scene.getWalkableNode(bodyNode.x + around, i);
                    if (node && !node.drop && items.length)
                        this._scene.addDrop(items.pop()).setTile(node);
                }
                start = bodyNode.x + around;
                end = bodyNode.x - around;
                for (i = start; i > end; i--) {
                    node = this._scene.getWalkableNode(i, bodyNode.y + around);
                    if (node && !node.drop && items.length)
                        this._scene.addDrop(items.pop()).setTile(node);
                }
                start = bodyNode.y + around;
                end = bodyNode.y - around;
                for (i = start; i > end; i--) {
                    node = this._scene.getWalkableNode(bodyNode.x - around, i);
                    if (node && !node.drop && items.length)
                        this._scene.addDrop(items.pop()).setTile(node, true);
                }
                around++;
            }
        };
        return SceneManager;
    }());
    s.SceneManager = SceneManager;
    __reflect(SceneManager.prototype, "s.SceneManager");
})(s || (s = {}));
