const birthRouter = {
    route: null,
    name: null,
    title: '驻留分析',
    type: 'folder', // 类型: folder, tab, view
    icon: 'iconfont icon-smile',
    filePath: 'views/ashin-hot/', // 文件路径
    order: null,
    inNav: true,
    permission: [],
    children: [
        {
            title: '驻留点图',
            type: 'view',
            name: 'StayAna',
            route: '/ashin/stay',
            filePath: 'views/ashin-stay/Stay.vue',
            inNav: true,
            icon: 'iconfont icon-wangwang',
        },
        {
            title: '职住点图',
            type: 'view',
            name: 'WorkHomeAna',
            route: '/ashin/workhome',
            filePath: 'views/ashin-stay/WorkHome.vue',
            inNav: true,
            icon: 'iconfont icon-wangwang',
        }
        // {
        //     title: '热力分析',
        //     type: 'view',
        //     name: 'hotAna',
        //     route: '/ashin/hot',
        //     filePath: 'views/ashin-hot/Hot.vue',
        //     inNav: true,
        //     icon: 'iconfont icon-wangwang',
        // }
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
