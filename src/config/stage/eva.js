const evaRouter = {
  route: null,
  name: null,
  title: '评测系统',
  type: 'folder',
  icon: 'iconfont icon-huiyuanguanli',
  filePath: 'views/eva/',
  order: 20,
  inNav: true,
  // permission: ['超级管理员独有权限'],
  children: [{
      title: '评测记录',
      type: 'view',
      name: 'evaRecord',
      route: '/eva/record',
      filePath: 'views/eva/record/record.vue',
      inNav: true,
      icon: 'iconfont icon-huiyuanguanli',
      // permission: ['超级管理员独有权限'],
    },
    // {
    //   title: '评测分析',
    //   type: 'view',
    //   inNav: true,
    //   route: '/eva/analyze',
    //   icon: 'iconfont icon-add',
    //   name: 'evaAnalyze',
    //   filePath: 'views/eva/analyze/analyze.vue',
    //   // permission: ['超级管理员独有权限'],
    // },
  ]
}

export default evaRouter