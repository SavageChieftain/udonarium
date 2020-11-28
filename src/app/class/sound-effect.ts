import { ChatMessage } from './chat-message'
import { AudioFile } from './core/file-storage/audio-file'
import { AudioPlayer } from './core/file-storage/audio-player'
import { AudioStorage } from './core/file-storage/audio-storage'
import { SyncObject } from './core/synchronize-object/decorator'
import { GameObject } from './core/synchronize-object/game-object'
import { ObjectStore } from './core/synchronize-object/object-store'
import { EventSystem } from './core/system'

export class PresetSound {
  static dicePick = ''

  static dicePut = ''

  static diceRoll1 = ''

  static diceRoll2 = ''

  static cardDraw = ''

  static cardPick = ''

  static cardPut = ''

  static cardShuffle = ''

  static piecePick = ''

  static piecePut = ''

  static blockPick = ''

  static blockPut = ''

  static lock = ''

  static unlock = ''

  static sweep = ''
}

@SyncObject('sound-effect')
export class SoundEffect extends GameObject {
  static play(identifier: string)
  static play(audio: AudioFile)
  static play(arg: any) {
    let identifier = ''
    if (typeof arg === 'string') {
      identifier = arg
    } else {
      identifier = arg.identifier
    }
    SoundEffect._play(identifier)
  }

  private static _play(identifier: string) {
    EventSystem.call('SOUND_EFFECT', identifier)
  }

  // GameObject Lifecycle
  onStoreAdded() {
    super.onStoreAdded()
    EventSystem.register(this)
      .on<string>('SOUND_EFFECT', (event) => {
        AudioPlayer.play(AudioStorage.instance.get(event.data), 0.5)
      })
      .on('SEND_MESSAGE', (event) => {
        const chatMessage = ObjectStore.instance.get<ChatMessage>(event.data.messageIdentifier)
        if (!chatMessage || !chatMessage.isSendFromSelf || !chatMessage.isDicebot) return
        if (Math.random() < 0.5) {
          SoundEffect.play(PresetSound.diceRoll1)
        } else {
          SoundEffect.play(PresetSound.diceRoll2)
        }
      })
  }

  // GameObject Lifecycle
  onStoreRemoved() {
    super.onStoreRemoved()
    EventSystem.unregister(this)
  }

  play(identifier: string)
  play(audio: AudioFile)
  play(arg: any) {
    SoundEffect.play(arg)
  }
}
