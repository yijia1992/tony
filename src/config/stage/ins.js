const insRouter = {
    route: null,
    name: null,
    title: '医保管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-smile',
    filePath: 'views/ins/', // 文件路径
    order: null,
    inNav: true,
    permission: ['社区管理'],
    children: [
        {
            title: '添加账户',
            type: 'view',
            name: 'addins',
            route: '/ins/add',
            filePath: 'views/ins/InsAdd.vue',
            inNav: true,
            icon: 'iconfont icon-smile',
        },
        {
            title: '医保账户',
            type: 'view',
            name: 'insList',
            route: '/ins/list',
            filePath: 'views/ins/InsList.vue',
            inNav: true,
            icon: 'iconfont icon-wangwang',
        },
    ],
}

export default insRouter
