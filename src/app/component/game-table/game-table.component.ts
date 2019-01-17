import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { Card } from '@udonarium/card';
import { CardStack } from '@udonarium/card-stack';
import { ImageFile } from '@udonarium/core/file-storage/image-file';
import { ImageStorage } from '@udonarium/core/file-storage/image-storage';
import { GameObject } from '@udonarium/core/synchronize-object/game-object';
import { EventSystem } from '@udonarium/core/system';
import { DiceSymbol, DiceType } from '@udonarium/dice-symbol';
import { GameCharacter } from '@udonarium/game-character';
import { FilterType, GameTable, GridType } from '@udonarium/game-table';
import { GameTableMask } from '@udonarium/game-table-mask';
import { PeerCursor } from '@udonarium/peer-cursor';
import { PresetSound, SoundEffect } from '@udonarium/sound-effect';
import { TableSelecter } from '@udonarium/table-selecter';
import { Terrain } from '@udonarium/terrain';
import { TextNote } from '@udonarium/text-note';

import { GameCharacterSheetComponent } from 'component/game-character-sheet/game-character-sheet.component';
import { GameTableSettingComponent } from 'component/game-table-setting/game-table-setting.component';
import { ContextMenuService } from 'service/context-menu.service';
import { ModalService } from 'service/modal.service';
import { PanelOption, PanelService } from 'service/panel.service';
import { PointerCoordinate, PointerDeviceService } from 'service/pointer-device.service';
import { TabletopService } from 'service/tabletop.service';

@Component({
  selector: 'game-table',
  templateUrl: './game-table.component.html',
  styleUrls: ['./game-table.component.css'],
  providers: [
    TabletopService,
  ],
})
export class GameTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('root') rootElementRef: ElementRef;
  @ViewChild('gameTable') gameTable: ElementRef;
  @ViewChild('gameObjects') gameObjects: ElementRef;
  @ViewChild('gridCanvas') gridCanvas: ElementRef;

  get tableSelecter(): TableSelecter { return this.tabletopService.tableSelecter; }
  get gameTableObject(): GameTable { return this.tabletopService.currentTable; }

  get bgImage(): ImageFile {
    let file: ImageFile = ImageStorage.instance.get(this.gameTableObject.imageIdentifier);
    return file ? file : ImageFile.Empty;
  }

  get distanceviewImage(): ImageFile {
    let file: ImageFile = ImageStorage.instance.get(this.gameTableObject.distanceviewImageIdentifier);
    return file ? file : ImageFile.Empty;
  }

  get distanceviewFilterType(): FilterType {
    return this.gameTableObject.distanceViewFilterType
  }

  private isTransformMode: boolean = false;

  private mouseDownPositionX: number = 0;
  private mouseDownPositionY: number = 0;

  get isPointerDragging(): boolean { return this.pointerDeviceService.isDragging; }

  private viewPotisonX: number = 100;
  private viewPotisonY: number = 0;
  private viewPotisonZ: number = 0;

  private viewRotateX: number = 50;
  private viewRotateY: number = 0;
  private viewRotateZ: number = 10;

  private callbackOnMouseDown = (e) => this.onMouseDown(e);
  private callbackOnMouseUp = (e) => this.onMouseUp(e);
  private callbackOnMouseMove = (e) => this.onMouseMove(e);
  private callbackOnContextMenu = (e) => this.onContextMenu(e);

  private buttonCode: number = 0;

  get tabletopCharacters(): GameCharacter[] { return this.tabletopService.characters; }
  get gameTableMasks(): GameTableMask[] { return this.tabletopService.tableMasks; }
  get cards(): Card[] { return this.tabletopService.cards; }
  get cardStacks(): CardStack[] { return this.tabletopService.cardStacks; }
  get terrains(): Terrain[] { return this.tabletopService.terrains; }
  get textNotes(): TextNote[] { return this.tabletopService.textNotes; }
  get diceSymbols(): DiceSymbol[] { return this.tabletopService.diceSymbols; }
  get peerCursors(): PeerCursor[] { return this.tabletopService.peerCursors; }

  constructor(
    private ngZone: NgZone,
    private contextMenuService: ContextMenuService,
    private elementRef: ElementRef,
    private pointerDeviceService: PointerDeviceService,
    private tabletopService: TabletopService,
    private modalService: ModalService,
    private panelService: PanelService
  ) { }

  ngOnInit() {
    console.log('きどう');

    EventSystem.register(this)
      .on('UPDATE_GAME_OBJECT', -1000, event => {
        if (event.data.identifier !== this.gameTableObject.identifier && event.data.identifier !== this.tableSelecter.identifier) return;
        console.log('UPDATE_GAME_OBJECT GameTableComponent ' + this.gameTableObject.identifier);

        this.setGameTableGrid(this.gameTableObject.width, this.gameTableObject.height, this.gameTableObject.gridSize, this.gameTableObject.gridType, this.gameTableObject.gridColor);
      })
      .on('DRAG_LOCKED_OBJECT', event => {
        this.isTransformMode = true;
        this.pointerDeviceService.isDragging = false;
        let opacity: number = this.tableSelecter.gridShow ? 1.0 : 0.0;
        this.gridCanvas.nativeElement.style.opacity = opacity;
      });
    this.tabletopService.makeDefaultTable();
    this.tabletopService.makeDefaultTabletopObjects();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.addEventListener('mousedown', this.callbackOnMouseDown, true);
    this.setGameTableGrid(this.gameTableObject.width, this.gameTableObject.height, this.gameTableObject.gridSize, this.gameTableObject.gridType, this.gameTableObject.gridColor);
    this.setTransform(0, 0, 0, 0, 0, 0);
    this.tabletopService.dragAreaElement = this.gameObjects.nativeElement;
  }

  ngOnDestroy() {
    EventSystem.unregister(this);
    this.removeMouseEventListeners();
    this.elementRef.nativeElement.removeEventListener('mousedown', this.callbackOnMouseDown, true);
  }

  onMouseDown(e: any) {
    this.mouseDownPositionX = this.pointerDeviceService.pointerX;
    this.mouseDownPositionY = this.pointerDeviceService.pointerY;

    if (e.target.contains(this.gameObjects.nativeElement) || e.button === 1 || e.button === 2) {
      this.isTransformMode = true;
      e.preventDefault();
    } else {
      this.isTransformMode = false;
      this.pointerDeviceService.isDragging = true;
      this.gridCanvas.nativeElement.style.opacity = 1.0;
    }

    this.buttonCode = e.button;

    if (!document.activeElement.contains(e.target)) {
      this.removeSelectionRanges();
      this.removeFocus();
    }
    this.addMouseEventListeners();
  }

  onMouseUp(e: any) {
    this.pointerDeviceService.isDragging = false;
    let opacity: number = this.tableSelecter.gridShow ? 1.0 : 0.0;
    this.gridCanvas.nativeElement.style.opacity = opacity;

    this.removeMouseEventListeners();
  }

  onMouseMove(e: any) {
    let x = this.pointerDeviceService.pointerX;
    let y = this.pointerDeviceService.pointerY;

    if (this.isTransformMode) {
      let transformX = 0;
      let transformY = 0;
      let transformZ = 0;

      let rotateX = 0;
      let rotateY = 0;
      let rotateZ = 0;

      if (this.buttonCode === 2) {
        rotateZ = (this.mouseDownPositionX - x) / 5;
        rotateX = (this.mouseDownPositionY - y) / 5;
      } else {
        let scale = (1000 + Math.abs(this.viewPotisonZ)) / 1000;
        transformX = -(this.mouseDownPositionX - x) * scale;
        transformY = -(this.mouseDownPositionY - y) * scale;
      }

      if (!this.pointerDeviceService.isAllowedToOpenContextMenu && this.contextMenuService.isShow) {
        this.ngZone.run(() => { this.contextMenuService.close(); });
      }

      this.mouseDownPositionX = x;
      this.mouseDownPositionY = y;

      this.setTransform(transformX, transformY, transformZ, rotateX, rotateY, rotateZ);
      return;
    }
  }

  @HostListener('wheel', ['$event'])
  onWheel(e: WheelEvent) {
    console.log('onWheel', e.deltaY);
    let transformX = 0;
    let transformY = 0;
    let transformZ = 0;

    let rotateX = 0;
    let rotateY = 0;
    let rotateZ = 0;

    if (e.deltaY < 0) {
      transformZ = 150;
    } else if (0 < e.deltaY) {
      transformZ = -150;
    }

    this.setTransform(transformX, transformY, transformZ, rotateX, rotateY, rotateZ);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    console.log('onKeydown', e.keyCode);
    if (document.body !== document.activeElement) return;
    let transformX = 0;
    let transformY = 0;
    let transformZ = 0;

    let rotateX = 0;
    let rotateY = 0;
    let rotateZ = 0;

    if (e.keyCode === 37) {//←
      if (e.shiftKey) {
        rotateZ = -2;
      } else {
        transformX = 10;
      }
    }
    if (e.keyCode === 38) {//↑
      if (e.shiftKey) {
        rotateX = -2;
      } else {
        transformY = 10;
      }
    }
    if (e.keyCode === 39) {//→
      if (e.shiftKey) {
        rotateZ = 2;
      } else {
        transformX = -10;
      }
    }
    if (e.keyCode === 40) {//↓
      if (e.shiftKey) {
        rotateX = 2;
      } else {
        transformY = -10;
      }
    }
    this.setTransform(transformX, transformY, transformZ, rotateX, rotateY, rotateZ);
  }

  @HostListener('contextmenu', ['$event'])
  onContextMenu(e: any) {
    if (!document.activeElement.contains(this.gameObjects.nativeElement)) return;
    console.log('onContextMenu');
    e.stopPropagation();
    e.preventDefault();

    if (this.pointerDeviceService.isAllowedToOpenContextMenu) {
      let potison = this.pointerDeviceService.pointers[0];
      console.log('mouseCursor A', potison);
      this.contextMenuService.open(potison, [
        {
          name: 'キャラクターを作成', action: () => {
            this.createGameCharacter(potison);
            SoundEffect.play(PresetSound.put);
          }
        },
        {
          name: 'マップマスクを作成', action: () => {
            this.createGameTableMask(potison);
            SoundEffect.play(PresetSound.put);
          }
        },
        {
          name: '地形を作成', action: () => {
            this.createTerrain(potison);
            SoundEffect.play(PresetSound.lock);
          }
        },
        {
          name: '共有メモを作成', action: () => {
            this.createTextNote(potison);
            SoundEffect.play(PresetSound.put);
          }
        },
        {
          name: 'トランプの山札を作成', action: () => {
            this.createTrump(potison);
            SoundEffect.play(PresetSound.cardPut);
          }
        },
        {
          name: 'ダイスを作成', action: null, subActions: [
            {
              name: 'D4', action: () => {
                this.createDiceSymbol(potison, 'D4', DiceType.D4, '4_dice');
                SoundEffect.play(PresetSound.put);
              }
            },
            {
              name: 'D6', action: () => {
                this.createDiceSymbol(potison, 'D6', DiceType.D6, '6_dice');
                SoundEffect.play(PresetSound.put);
              }
            },
            {
              name: 'D8', action: () => {
                this.createDiceSymbol(potison, 'D8', DiceType.D8, '8_dice');
                SoundEffect.play(PresetSound.put);
              }
            },
            {
              name: 'D10', action: () => {
                this.createDiceSymbol(potison, 'D10', DiceType.D10, '10_dice');
                SoundEffect.play(PresetSound.put);
              }
            },
            {
              name: 'D10 (00-90)', action: () => {
                this.createDiceSymbol(potison, 'D10', DiceType.D10_10TIMES, '100_dice');
                SoundEffect.play(PresetSound.put);
              }
            },
            {
              name: 'D12', action: () => {
                this.createDiceSymbol(potison, 'D12', DiceType.D12, '12_dice');
                SoundEffect.play(PresetSound.put);
              }
            },
            {
              name: 'D20', action: () => {
                this.createDiceSymbol(potison, 'D20', DiceType.D20, '20_dice');
                SoundEffect.play(PresetSound.put);
              }
            }

          ]
        },
        {
          name: 'テーブル設定', action: () => {
            this.modalService.open(GameTableSettingComponent);
          }
        }
      ], this.gameTableObject.name);
    }
  }

  createGameCharacter(potison: PointerCoordinate) {
    console.log('mouseCursor B', potison);
    let gameObject = GameCharacter.createGameCharacter('新しいキャラクター', 1, '');
    let pointer = PointerDeviceService.convertToLocal(potison, this.gameObjects.nativeElement);
    gameObject.location.x = pointer.x - 25;
    gameObject.location.y = pointer.y - 25;
    gameObject.update();
    this.showDetail(gameObject);
  }

  private showDetail(gameObject: GameCharacter) {
    console.log('onSelectedGameObject <' + gameObject.aliasName + '>', gameObject.identifier);
    EventSystem.trigger('SELECT_TABLETOP_OBJECT', { identifier: gameObject.identifier, className: gameObject.aliasName });
    let option: PanelOption = { left: 0, top: 0, width: 800, height: 600 };
    let component = this.panelService.open<GameCharacterSheetComponent>(GameCharacterSheetComponent, option);
    component.tabletopObject = gameObject;
  }

  createGameTableMask(potison: PointerCoordinate) {
    console.log('createGameTableMask A');
    let viewTable = this.tableSelecter.viewTable;
    if (!viewTable) return;

    let tableMask = GameTableMask.create('マップマスク', 5, 5, 100);
    viewTable.appendChild(tableMask);

    let pointer = PointerDeviceService.convertToLocal(potison, this.gameObjects.nativeElement);
    console.log('createGameTableMask B', pointer);
    tableMask.location.x = pointer.x - 25;
    tableMask.location.y = pointer.y - 25;
    tableMask.update();
  }

  createTerrain(potison: PointerCoordinate) {
    console.log('createTerrain');

    let url: string = './assets/images/tex.jpg';
    let image: ImageFile = ImageStorage.instance.get(url)
    if (!image) image = ImageStorage.instance.add(url);

    let viewTable = this.tableSelecter.viewTable;
    if (!viewTable) return;

    let terrain = Terrain.create('地形', 2, 2, 2, image.identifier, image.identifier);
    viewTable.appendChild(terrain);

    let pointer = PointerDeviceService.convertToLocal(potison, this.gameObjects.nativeElement);
    terrain.location.x = pointer.x - 50;
    terrain.location.y = pointer.y - 50;
    terrain.update();
  }

  createTextNote(potison: PointerCoordinate) {
    console.log('createTextNote');
    let textNote = TextNote.create('共有メモ', 'テキストを入力してください', 5, 4, 3);

    let pointer = PointerDeviceService.convertToLocal(potison, this.gameObjects.nativeElement);
    textNote.location.x = pointer.x;
    textNote.location.y = pointer.y;
    textNote.update();
  }

  createDiceSymbol(potison: PointerCoordinate, name: string, diceType: DiceType, imagePathPrefix: string) {
    console.log('createDiceSymbol');
    let diceSymbol = DiceSymbol.create(name, diceType, 1);
    let image: ImageFile = null;

    diceSymbol.faces.forEach(face => {
      let url: string = `./assets/images/dice/${imagePathPrefix}/${imagePathPrefix}[${face}].png`;
      image = ImageStorage.instance.get(url)
      if (!image) { image = ImageStorage.instance.add(url); }
      diceSymbol.imageDataElement.getFirstElementByName(face).value = image.identifier;
    });

    let pointer = PointerDeviceService.convertToLocal(potison, this.gameObjects.nativeElement);
    diceSymbol.location.x = pointer.x - 25;
    diceSymbol.location.y = pointer.y - 25;
    diceSymbol.update();
  }

  setTransform(transformX: number, transformY: number, transformZ: number, rotateX: number, rotateY: number, rotateZ: number) {
    this.viewRotateX += rotateX;
    this.viewRotateY += rotateY;
    this.viewRotateZ += rotateZ;

    this.viewPotisonX += transformX;
    this.viewPotisonY += transformY;
    this.viewPotisonZ += transformZ;

    this.gameTable.nativeElement.style.transform = 'translateZ(' + this.viewPotisonZ + 'px) translateY(' + this.viewPotisonY + 'px) translateX(' + this.viewPotisonX + 'px) rotateY(' + this.viewRotateY + 'deg) rotateX(' + this.viewRotateX + 'deg) rotateZ(' + this.viewRotateZ + 'deg) ';
  }

  private setGameTableGrid(width: number, height: number, gridSize: number = 50, gridType: GridType = GridType.SQUARE, gridColor: string = '#000000e6') {
    this.gameTable.nativeElement.style.width = width * gridSize + 'px';
    this.gameTable.nativeElement.style.height = height * gridSize + 'px';

    let canvasElement: HTMLCanvasElement = this.gridCanvas.nativeElement;
    canvasElement.width = width * gridSize;
    canvasElement.height = height * gridSize;
    let context: CanvasRenderingContext2D = canvasElement.getContext('2d');
    context.strokeStyle = gridColor;
    context.fillStyle = context.strokeStyle;
    context.lineWidth = 1;

    // 座標描画用font設定
    let fontSize: number = Math.floor(gridSize / 5);
    context.font = 'bold ' + fontSize + 'px sans-serif';
    context.textBaseline = 'top';
    context.textAlign = 'center';

    let gx: number; // グリッド用Rect描画開始位置(x)
    let gy: number; // 同上(y)

    let calcGridPosition: { (w: number, h: number): void };

    switch (gridType) {
      case GridType.HEX_VERTICAL: // ヘクス縦揃え
        calcGridPosition = (w, h) => {
          if ((w % 2) === 1) {
            gx = w * gridSize;
            gy = h * gridSize;
          } else {
            gx = w * gridSize;
            gy = h * gridSize + (gridSize / 2);
          }
        }
        break;
      case GridType.HEX_HORIZONTAL: // ヘクス横揃え(どどんとふ互換)
        calcGridPosition = (w, h) => {
          if ((h % 2) === 1) {
            gx = w * gridSize;
            gy = h * gridSize;
          } else {
            gx = w * gridSize + (gridSize / 2);
            gy = h * gridSize;
          }
        }
        break;
      default: // スクエア(default)
        calcGridPosition = (w, h) => {
          gx = w * gridSize;
          gy = h * gridSize;
        }
        break;
    }

    for (let h = 0; h <= height; h++) {
      for (let w = 0; w <= width; w++) {
        calcGridPosition(w, h);
        context.beginPath();
        context.strokeRect(gx, gy, gridSize, gridSize);
        context.fillText((w + 1).toString() + '-' + (h + 1).toString(), gx + (gridSize / 2), gy + (gridSize / 2));
      }
    }

    let opacity: number = this.tableSelecter.gridShow ? 1.0 : 0.0;
    this.gridCanvas.nativeElement.style.opacity = opacity;
  }

  private createTrump(potison: PointerCoordinate) {
    let pointer = PointerDeviceService.convertToLocal(potison, this.gameObjects.nativeElement);
    let cardStack = CardStack.create('トランプ山札');
    cardStack.location.x = pointer.x - 25;
    cardStack.location.y = pointer.y - 25;
    cardStack.update();

    let back: string = './assets/images/trump/z02.gif';
    if (!ImageStorage.instance.get(back)) {
      ImageStorage.instance.add(back);
    }

    let names: string[] = ['c', 'd', 'h', 's'];

    for (let name of names) {
      for (let i = 1; i <= 13; i++) {
        let trump: string = name + (('00' + i).slice(-2));
        let url: string = './assets/images/trump/' + trump + '.gif';
        if (!ImageStorage.instance.get(url)) {
          ImageStorage.instance.add(url);
        }
        let card = Card.create('サンプルカード', url, back);
        cardStack.putOnBottom(card);

      }
    }

    for (let i = 1; i <= 2; i++) {
      let trump: string = 'x' + (('00' + i).slice(-2));
      let url: string = './assets/images/trump/' + trump + '.gif';
      if (!ImageStorage.instance.get(url)) {
        ImageStorage.instance.add(url);
      }
      let card = Card.create('サンプルカード', url, back);
      cardStack.putOnBottom(card);
    }
  }

  private removeSelectionRanges() {
    let selection = window.getSelection();
    if (!selection.isCollapsed) {
      selection.removeAllRanges();
    }
  }

  private removeFocus() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  private addMouseEventListeners() {
    document.body.addEventListener('mouseup', this.callbackOnMouseUp, false);
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('mousemove', this.callbackOnMouseMove, true);
      document.body.addEventListener('touchmove', this.callbackOnMouseMove, true);
    });
  }

  private removeMouseEventListeners() {
    document.body.removeEventListener('mouseup', this.callbackOnMouseUp, false);
    document.body.removeEventListener('mousemove', this.callbackOnMouseMove, true);
    document.body.removeEventListener('touchmove', this.callbackOnMouseMove, true);
  }

  trackByGameObject(index: number, gameObject: GameObject) {
    return gameObject.identifier;
  }
}
