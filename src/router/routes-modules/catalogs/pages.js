import PageList from '@/components/pages/catalogs/pages-info/PageList'
import PageCreate from '@/components/pages/catalogs/pages-info/PageCreate'
import PageEdit from '@/components/pages/catalogs/pages-info/PageEdit'

export const pages = [
  {
    path: '/catalogs/pages',
    name: 'pages.list',
    component: PageList
  },
  {
    path: '/catalogs/pages/create',
    name: 'pages.create',
    component: PageCreate
  },
  {
    path: '/catalogs/pages/:id/edit',
    name: 'pages.edit',
    component: PageEdit
  }
];
