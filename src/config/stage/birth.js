const birthRouter = {
    route: null,
    name: null,
    title: '计生管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-smile',
    filePath: 'views/birth/', // 文件路径
    order: null,
    inNav: true,
    permission: ['社区管理'],
    children: [
        {
            title: '生育情况',
            type: 'view',
            name: 'insList',
            route: '/birth/list',
            filePath: 'views/birth/BirthList.vue',
            inNav: true,
            icon: 'iconfont icon-wangwang',
        },
        {
            title: '添加计生活动',
            type: 'view',
            name: 'addins',
            route: '/act/add',
            filePath: 'views/birth/BirthActAdd.vue',
            inNav: true,
            icon: 'iconfont icon-smile',
        },
        {
            title: '计生活动列表',
            type: 'view',
            name: 'actList',
            route: '/act/list',
            filePath: 'views/birth/ActList.vue',
            inNav: true,
            icon: 'iconfont icon-smile',
        },

    ],
}

export default birthRouter
