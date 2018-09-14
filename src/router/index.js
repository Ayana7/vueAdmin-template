import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import mumberAdd from '../views/manager/mumber/mumber-add'
import roleAdd from '../views/role/role-add'
import orgAdd from  '../views/manager/organization/org-add'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/manager',
    name: '组织成员管理',
    hidden: true,
    children: [{
      path: 'manager',
      meta: { title: '组织成员管理', icon: 'table' },
      component: () => import('@/views/manager/index/index')
    },
    {
      path: 'role',
      meta: { title: '角色设置', icon: 'table' },
      component: () => import('@/views/role/index/index')
    }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/manager',
    component: Layout,
    name: 'manager',
    meta: { title: '组织成员管理', icon: 'example' },
    children: [
      {
        hidden: true,
        path: 'manager',
        component: () => import('@/views/manager/index/index')
      },
      {
        path: 'mumber/add',
        name: 'mumber-add',
        component: { ...mumberAdd },
        meta: { title: '新建组织页面', icon: 'table' }
      },
      {
        path: 'mumber/edit',
        name: 'mumber-edit',
        // component: () => import('@/views/manager/mumber/mumber-add'),
        component: { ...mumberAdd },

        meta: { title: '编辑组织页面', icon: 'table' }
      },
      {
        path: 'organization/add',
        name: 'org-add',
        // component: () => import('@/views/manager/organization/org-add'),
        component: { ...orgAdd },
        meta: { title: '新建成员', icon: 'table' }
      },
      {
        path: 'organization/edit',
        name: 'org-edit',
        // component: () => import('@/views/manager/organization/org-edit'),
        component: { ...orgAdd },
        meta: { title: '修改成员', icon: 'table' }
      }
    ]
  },
  {
    path: '/role',
    component: Layout,
    name: 'role',
    meta: { title: '角色设置', icon: 'example' },
    children: [
      {
        hidden: true,
        path: 'role',
        component: () => import('@/views/role/index/index')
      },
      {
        path: 'role/add',
        name: 'add',
        // component: () => import('@/views/role/role-add'),
        component: { ...roleAdd },
        meta: { title: '新增角色', icon: 'table' }
      },
      {
        path: 'role/edit',
        name: 'edit',
        // component: () => import('@/views/role/role-edit'),
        component: { ...roleAdd },
        meta: { title: '编辑角色', icon: 'table' }
      }
    ]
  },
  /* {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree', roles: ['admin'] }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'nested',
    meta: {
      title: 'nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'menu1',
        meta: { title: 'menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'menu1-1',
            meta: { title: 'menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'menu1-2',
            meta: { title: 'menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'menu1-2-1',
                meta: { title: 'menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'menu1-2-2',
                meta: { title: 'menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'menu1-3',
            meta: { title: 'menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  }, */

  { path: '*', redirect: '/404', hidden: true }
]
