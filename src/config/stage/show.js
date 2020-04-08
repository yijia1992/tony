const showRouter = {
    route: null,
    name: null,
    title: '信息查询',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-smile',
    filePath: 'views/show/', // 文件路径
    order: null,
    inNav: true,
    permission: ['查询自己信息'],
    children: [
        {
            title: '出账情况',
            type: 'view',
            name: 'billList',
            route: '/show/bill',
            filePath: 'views/show/BillPanel.vue',
            inNav: true,
            icon: 'iconfont icon-wangwang',
        },
        {
            title: '个人中心',
            type: 'view',
            name: 'infoCenter',
            route: '/show/person',
            filePath: 'views/show/PersonPanel.vue',
            inNav: true,
            icon: 'iconfont icon-wangwang',
        }


    ]
}

export default showRouter
