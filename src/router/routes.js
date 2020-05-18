import homeRouter from './home-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/admin/user/list',
    component: () => import('@/views/home/Home'),
    children: [...homeRouter],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login'),
  },
  {
    redirect: '/404',
    path: '*',
  },
]

export default routes
