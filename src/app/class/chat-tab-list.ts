import { ChatTab } from './chat-tab'
import { SyncObject } from './core/synchronize-object/decorator'
import { ObjectNode } from './core/synchronize-object/object-node'
import { InnerXml } from './core/synchronize-object/object-serializer'

@SyncObject('chat-tab-list')
export class ChatTabList extends ObjectNode implements InnerXml {
  private static _instance: ChatTabList

  static get instance(): ChatTabList {
    if (!ChatTabList._instance) {
      ChatTabList._instance = new ChatTabList('ChatTabList')
      ChatTabList._instance.initialize()
    }
    return ChatTabList._instance
  }

  get chatTabs(): ChatTab[] {
    return this.children as ChatTab[]
  }

  addChatTab(chatTab: ChatTab)
  addChatTab(tabName: string, identifier?: string)
  addChatTab(...args: any[]) {
    let chatTab: ChatTab = null
    if (args[0] instanceof ChatTab) {
      ;[chatTab] = args
    } else {
      const tabName: string = args[0]
      const identifier: string = args[1]
      chatTab = new ChatTab(identifier)
      chatTab.name = tabName
      chatTab.initialize()
    }
    this.appendChild(chatTab)
  }

  parseInnerXml(element: Element) {
    // XMLからの新規作成を許可せず、既存のオブジェクトを更新する
    ChatTabList.instance.children.forEach((child) => {
      child.destroy()
    })

    const context = ChatTabList.instance.toContext()
    context.syncData = this.toContext().syncData
    ChatTabList.instance.apply(context)
    ChatTabList.instance.update()

    super.parseInnerXml.apply(ChatTabList.instance, [element])
    this.destroy()
  }
}
