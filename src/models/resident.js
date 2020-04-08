/* eslint-disable class-methods-use-this */
import _axios, { get, put, _delete, post } from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Resident {
  // constructor() {}

  // 类中的方法可以代表一个用户行为
  async addBook(data) {
    return _axios({
      method: 'post',
      url: 'v1/book',
      data,
      handleError: true,
    })
  }

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象

  //居民id
  async getResident(id) {
    const res = await get(`v1/resident/${id}`)
    return res
  }
  //通过系统用户id查询居民资料
  async getResidentById(id) {
    const res = await get(`v1/resident/info/${id}`)
    return res
  }

  async getFamilies() {
    const res = await get(`v1/resident/family`)
    return res
  }

  async getWomen(isTemp) {
    const res = await get(`v1/resident/women/${isTemp}`)
    return res
  }

  //修改家庭关系用
  async getRelation(id) {
    const res = await get(`v1/resident/family/${id}`)
    return res
  }

  //用于展示家庭关系看板
  async getPanel(id) {
    const res = await get(`v1/resident/family/panel/${id}`)
    return res
  }

  async editResidents(id, info) {
    const res = await post(`v1/resident`, info)
    return res
  }

  async editRelation(id, info) {
    const res = await post(`v1/resident/family`, info)
    return res
  }

  async delectBook(id) {
    const res = await _delete(`v1/book/${id}`)
    return res
  }

  async getResidents() {
    return _axios({
      method: 'get',
      url: 'v1/resident',
      handleError: true,
    })
  }
}

export default new Resident()
