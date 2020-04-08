const billRouter = {
    route: null,
    name: null,
    title: '水电燃气',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-smile',
    filePath: 'views/bill/', // 文件路径
    order: null,
    inNav: true,
    permission: ['社区管理'],
    children: [
        {
            title: '出账情况',
            type: 'view',
            name: 'billList',
            route: '/bill/list',
            filePath: 'views/bill/BillList.vue',
            inNav: true,
            icon: 'iconfont icon-wangwang',
        }


    ]
}

export default billRouter
