// 单向链表类
class VNode {
  constructor (vNode) {
    this.vNodeHead = vNode
    this.vNodeHead.next = null
    this.vNodeFoot = this.vNodeHead
    console.log(`初始化链表成功，当前链表结构如下：${JSON.stringify(this.vNodeHead, null, 2)}`)
  }

  // 增加
  add (vNode) {
    this.vNodeFoot.next = vNode
    // 更新链表尾部
    this.vNodeFoot = this.vNodeFoot.next
    console.log(`添加节点 ${vNode.name} 成功，当前链表结构如下：${JSON.stringify(this.vNodeHead, null, 2)}`)
  }

  // 删除
  del (vNode) {
    const target = this.find(vNode)

    const pre = this.findPreVNode(target)

    if (pre) {
      console.log(`删除节点 ${pre.next.name} 成功，当前链表结构如下：${JSON.stringify(this.vNodeHead, null, 2)}`)
      pre.next = pre.next.next
    }
  }

  // 查找
  find (vNode) {
    const pre = this.findPreVNode(vNode)
    return pre ? pre.next : null
  }

  // 查找vNode的上一级节点
  findPreVNode (vNode) {
    let cur = this.vNodeHead
    let pre = null
    while (cur && cur.name !== vNode.name) {
      pre = cur
      cur = cur.next
    }
    return cur ? pre : null
  }
}

// 使用
// 新建一个链表实例
const vNodeList = new VNode({ name: '第一节点' })

vNodeList.add({ name: '第二节点' })
vNodeList.add({ name: '第三节点' })

const findRes = vNodeList.find({ name: '第三节点' })
console.log('查找第三节点结果：', findRes)

vNodeList.del({ name: '第二节点' })
console.log('查找第二节点结果：', vNodeList.find({ name: '第二节点' }))
console.log('查找第三节点结果：', vNodeList.find({ name: '第三节点' }))
