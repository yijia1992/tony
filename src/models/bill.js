/* eslint-disable class-methods-use-this */
import _axios, { get, put, _delete, post } from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Bill {
  // constructor() {}


  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象


  async getBillsByType(type) {
    const res = await get(`v1/bill/${type}`)
    return res
  }

  async getBills() {
    const res = await get(`v1/bill`)
    return res
  }
  async pay(id) {
    const res = await get(`v1/bill/pay/${id}`)
    return res
  }

  async getMyBillsByType(uid,type) {
    const res = await get(`v1/bill/${uid}/${type}`)
    return res
  }


  //修改家庭关系用
  async getRelation(id) {
    const res = await get(`v1/resident/family/${id}`)
    return res
  }

  //用于展示家庭关系看板

}

export default new Bill()
