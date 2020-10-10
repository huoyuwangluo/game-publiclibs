// module pet {
// 	export class PetBodyAndBingFa extends ui.PetBodyAndBingFaSkin {
// 		private _listCollection: eui.ArrayCollection;
// 		private _data: vo.GamePetVO;
// 		private _bingFaArr: Array<item.PetSKillAndTalent>;
// 		private _bingFaOpenLab: eui.Label[];
// 		protected initialize() {
// 			super.initialize();
// 			this.list.dataProvider = this._listCollection = new eui.ArrayCollection([]);
// 			this._bingFaArr = [this.bingFa0, this.bingFa1];
// 			this._bingFaOpenLab = [this.labOpen1, this.labOpen2];
// 		}
// 		public init(data: any = null): void {
// 			var upVoArr: vo.GamePetVO[] = GameModels.pet.formatUpVOList;
// 			var downVoArr: vo.GamePetVO[] = GameModels.pet.formatDownVOList;
// 			downVoArr.sort(function (a: vo.GamePetVO, b: vo.GamePetVO) {
// 				if (a.quality != b.quality) {
// 					return b.quality - a.quality;
// 				} else {
// 					return b.star - a.star;
// 				}
// 			})
// 			var vo: vo.GamePetVO[] = upVoArr.concat(downVoArr);
// 			this._listCollection.source = vo;
// 			if (data) {
// 				let petArr: Array<vo.GamePetVO> = this._listCollection.source;
// 				for (var i = 0; i < petArr.length; i++) {
// 					if (petArr[i].uid == data) {
// 						this.list.selectedIndex = i;
// 						this.viewToFollow();
// 						break;
// 					}
// 				}
// 			} else {
// 				this.list.selectedIndex = 0;
// 			}
// 			this._data = this.list.selectedItem;
// 			this.initDisplay();
// 			for (var i = 0; i < this._bingFaArr.length; i++) {
// 				this._bingFaArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeShuTalentIconClick, this);
// 				this._bingFaArr[i].dataSource = null;
// 			}
// 			this.shenBingGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShenBingTalentClick, this);
// 			this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
// 			GameModels.pet.addEventListener(mo.ModelPet.BINGFA_CHANGE, this.initDisplay, this);
// 			GameModels.upStar.addEventListener(mo.ModelUpStar.PET_CHANGE, this.updatePetInfo, this);
// 			GameModels.petChoose.addEventListener(mo.ModelPetChoose.PET_CHANGE, this.updatePetInfo, this);
// 		}
// 		public getCanUseListItem(index: number = 0): eui.Image {
// 			this.list.validateNow();
// 			if (this._listCollection.source[index]) {
// 				return (this.list.getChildAt(index) as renderer.AchievementTuJianPetRenderer).imgQuality;
// 			}
// 			return null;
// 		}
// 		private updatePetInfo(): void {
// 			var upVoArr: vo.GamePetVO[] = GameModels.pet.formatUpVOList;
// 			var downVoArr: vo.GamePetVO[] = GameModels.pet.formatDownVOList;
// 			downVoArr.sort(function (a: vo.GamePetVO, b: vo.GamePetVO) {
// 				if (a.quality != b.quality) {
// 					return b.quality - a.quality;
// 				} else {
// 					return b.star - a.star;
// 				}
// 			})
// 			var vo: vo.GamePetVO[] = upVoArr.concat(downVoArr);
// 			this._listCollection.source = vo;
// 			let petArr: Array<vo.GamePetVO> = this._listCollection.source;
// 			for (var i = 0; i < petArr.length; i++) {
// 				if (petArr[i].uid == this._data.uid) {
// 					this.list.selectedIndex = i;
// 					this.viewToFollow();
// 					break;
// 				}
// 			}
// 			this._data = this.list.selectedItem;
// 			this.initDisplay();
// 		}
// 		private initDisplay() {
// 			if (!this._data) return;
// 			this._listCollection.replaceAll(this._listCollection.source);
// 			this.body.setPetBody(this._data.template.model);
// 			this.showShenBingTalent();
// 			this.showBingFa();
// 			for (var z = this.starGroup.numChildren; z >= 0; z--) {
// 				var imgs: eui.Image = this.starGroup.getChildAt(z) as eui.Image;
// 				if (imgs) {
// 					this.starGroup.removeChildAt(z);
// 				}
// 			}
// 			if (this._data.star <= 5) {
// 				for (var i = 0; i < this._data.star; i++) {
// 					var img: eui.Image = new eui.Image();
// 					img.source = "tujian_json.img_tujianStars";
// 					this.starGroup.addChild(img);
// 				}
// 			}
// 			else if (this._data.star > 5 && this._data.star <= 10) {
// 				for (var i = 6; i <= 10; i++) {
// 					var img: eui.Image = new eui.Image();
// 					if (this._data.star >= i) {
// 						img.source = "tujian_json.img_tujianStars1";
// 					}
// 					else {
// 						img.source = "tujian_json.img_tujianStars";
// 					}
// 					this.starGroup.addChild(img);
// 				}
// 			}
// 			else {
// 				for (var i = 11; i <= 15; i++) {
// 					var img: eui.Image = new eui.Image();
// 					if (this._data.star >= i) {
// 						img.source = "tujian_json.img_tujianStars2";
// 					}
// 					else {
// 						img.source = "tujian_json.img_tujianStars1";
// 					}
// 					this.starGroup.addChild(img);
// 				}
// 			}
// 		}
// 		private showBingFa(): void {
// 			for (var i = 0; i < this._bingFaArr.length; i++) {
// 				var listVo: vo.GamePetBingFaVO = this._data.getBingFaVOListByPos(i);
// 				if (listVo) {
// 					this._bingFaArr[i].imgQuality.source = ResPath.getQuality(listVo.quality);
// 					this._bingFaArr[i].imgIcon.source = listVo.icon;
// 					this._bingFaArr[i].labName.text = "";
// 					this._bingFaArr[i].imgRed.visible = false;
// 					this._bingFaOpenLab[i].text = "";
// 				}
// 				else {
// 					if (this._data.generalBraekTmp.bingfaOpen > i) {
// 						this._bingFaArr[i].imgQuality.source = "qualityBg_json.img_qlt_1_png";
// 						this._bingFaArr[i].imgIcon.source = "tujian_json.img_addIcon";
// 						this._bingFaArr[i].labName.text = "";
// 						this._bingFaArr[i].imgRed.visible = GameModels.bag.bingFa.source.length > 0;
// 						this._bingFaOpenLab[i].text = "";
// 					}
// 					else {
// 						this._bingFaArr[i].imgQuality.source = "qualityBg_json.img_qlt_1_png";
// 						this._bingFaArr[i].labName.text = "";
// 						this._bingFaArr[i].imgRed.visible = false;
// 						var star: number = this.data.getOpenBingFaStar(this.data.quality, i + 1);
// 						if (star > 0) {
// 							this._bingFaArr[i].imgIcon.source = "tujian_json.img_lockIcon";
// 							this._bingFaOpenLab[i].text = Language.getExpression(Language.E_1XJS, star);
// 						} else {
// 							this._bingFaArr[i].imgIcon.source ="common_json.img_skill_wu_png";
// 							this._bingFaOpenLab[i].text = "";
// 						}
// 					}
// 				}
// 			}
// 		}
// 		private showShenBingTalent(): void {
// 			if (this._data.shenBingId != 0) {
// 				this.shenBingGroup.visible = true;
// 				var shenbingVo: vo.ShenBingVO = GameModels.shenbing.getShenBingVoByRefid(this._data.shenBingId);
// 				this.imgIcon.source = this._data.shenBingSkill.icon;
// 				this.imgIcon.filters = this._data.shenBingLv >= 1 && this._data.generalBraekTmp.shenbingOpen > 0 ? null : utils.filterUtil.grayFilters;
// 			} else {
// 				this.shenBingGroup.visible = false;
// 			}
// 		}
// 		private onListClick(e: eui.ItemTapEvent): void {
// 			this.list.selectedIndex = e.itemIndex;
// 			this._data = this.list.selectedItem;
// 			GameModels.pet.selectedPetUid = this._data.uid;
// 			this.initDisplay();
// 			GameModels.pet.updataPetChange();
// 		}
// 		private onTeShuTalentIconClick(e: egret.TouchEvent): void {
// 			for (var i = 0; i < this._bingFaArr.length; i++) {
// 				if (e.currentTarget == this._bingFaArr[i]) {
// 					var listVo: vo.GamePetBingFaVO = this._data.getBingFaVOListByPos(i);
// 					if (listVo) {
// 						var obj: any = { data: listVo, petVo: this._data, tabIndex: i }
// 						mg.TipUpManager.instance.showTip(tipUps.BingFaAert, obj);
// 					}
// 					else {
// 						if (this._data.generalBraekTmp.bingfaOpen > i) {
// 							mg.uiManager.show(dialog.list.BingFaList, this._data, i);
// 						}
// 						else {
// 							var star: number = this.data.getOpenBingFaStar(this.data.quality, i + 1);
// 							if (star > 0) {
// 								mg.alertManager.tip(Language.getExpression(Language.E_1DD2JJSBF, star));
// 							} else {
// 								mg.alertManager.tip(Language.J_GWJWZMYTSTF);
// 							}
// 						}
// 					}
// 				}
// 			}
// 		}
// 		private onShenBingTalentClick(e: egret.TouchEvent): void {
// 			mg.TipUpManager.instance.showTip(tipUps.PetSkillDetailsTips, this._data.shenBingSkill);
// 		}
// 		private alertPropView() {
// 			var id: string = "290000";
// 			mg.alertManager.showAlert(PropOfSourceAlert, true, true, id);
// 		}
// 		public get data(): vo.GamePetVO {
// 			return this._data;
// 		}
// 		private viewToFollow() {
// 			if (this.scroller == null) {
// 				return;
// 			}
// 			/**视图跟随并居中锁定
// 			 * itemWidth 单个呈现项的宽度
// 			 *  */
// 			let listSH: number = this.list.scrollH;//可视区域位置
// 			let sWidth: number = this.scroller.width;//滚动轴宽度
// 			let listCWidth: number = this.list.contentWidth;//数据总长度
// 			this.list.validateNow();
// 			let itemWidth = this.list.getChildAt(0).width;
// 			let width = (itemWidth + 6) * this.list.selectedIndex;
// 			if (width >= sWidth) {
// 				width = width - sWidth + itemWidth;
// 			}
// 			else {
// 				width = 0;
// 			}
// 			this.list.scrollH = width;//显示视图的数量*列间距
// 			egret.Tween.get(this.list).to({ scrollH: width }, 200);
// 		}
// 		public reset() {
// 			this._data = null;
// 			egret.Tween.removeTweens(this.list);
// 			this.shenBingGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShenBingTalentClick, this);
// 			this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListClick, this);
// 			for (var i = 0; i < this._bingFaArr.length; i++) {
// 				this._bingFaArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTeShuTalentIconClick, this);
// 				this._bingFaArr[i].dataSource = null;
// 			}
// 			GameModels.upStar.removeEventListener(mo.ModelUpStar.PET_CHANGE, this.updatePetInfo, this);
// 			GameModels.petChoose.removeEventListener(mo.ModelPetChoose.PET_CHANGE, this.updatePetInfo, this);
// 			GameModels.pet.removeEventListener(mo.ModelPet.BINGFA_CHANGE, this.initDisplay, this);
// 		}
// 	}
// } 
