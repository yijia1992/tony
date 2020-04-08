const residentRouter = {
    route: null,
    name: null,
    title: '居民管理',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-smile',
    filePath: 'views/resident/', // 文件路径
    order: null,
    inNav: true,
    permission: ['社区管理'],
    children: [
        {
            title: '居民列表',
            type: 'view',
            name: 'residentList',
            route: '/resident/list',
            filePath: 'views/resident/ResidentList.vue',
            inNav: true,
            icon: 'iconfont icon-smile',
        },
        {
            title: '家庭关系',
            type: 'view',
            name: 'familyList',
            route: '/family/list',
            filePath: 'views/resident/FamilyList.vue',
            inNav: true,
            icon: 'iconfont icon-wangwang',
        },
    ],
}

export default residentRouter
