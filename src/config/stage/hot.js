const birthRouter = {
    route: null,
    name: null,
    title: '出行分析',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-smile',
    filePath: 'views/ashin-hot/', // 文件路径
    order: null,
    inNav: true,
    permission: [],
    children: [
        {
            title: '路径分析',
            type: 'view',
            name: 'PathAna',
            route: '/ashin/path',
            filePath: 'views/ashin-hot/Path.vue',
            inNav: true,
            icon: 'iconfont icon-wangwang',
        },
        {
            title: '热力分析',
            type: 'view',
            name: 'hotAna',
            route: '/ashin/hot',
            filePath: 'views/ashin-hot/Hot.vue',
            inNav: true,
            icon: 'iconfont icon-wangwang',
        },
        {
            title: '通勤距离',
            type: 'view',
            name: 'DisAna',
            route: '/ashin/dis',
            filePath: 'views/ashin-hot/Dis.vue',
            inNav: true,
            icon: 'iconfont icon-wangwang',
        },
        {
            title: '人流量',
            type: 'view',
            name: 'FlowAna',
            route: '/ashin/flow',
            filePath: 'views/ashin-hot/Flow.vue',
            inNav: true,
            icon: 'iconfont icon-wangwang',
        },
        {
            title: '出行方式',
            type: 'view',
            name: 'TypeAna',
            route: '/ashin/type',
            filePath: 'views/ashin-hot/Type.vue',
            inNav: true,
            icon: 'iconfont icon-wangwang',
        },

        // ,
        // {
        //     title: '添加计生活动',
        //     type: 'view',
        //     name: 'addins',
        //     route: '/act/add',
        //     filePath: 'views/birth/BirthActAdd.vue',
        //     inNav: true,
        //     icon: 'iconfont icon-smile',
        // },
        // {
        //     title: '计生活动列表',
        //     type: 'view',
        //     name: 'actList',
        //     route: '/act/list',
        //     filePath: 'views/birth/ActList.vue',
        //     inNav: true,
        //     icon: 'iconfont icon-smile',
        // },

    ],
}

export default birthRouter
