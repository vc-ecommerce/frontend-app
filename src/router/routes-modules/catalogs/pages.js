import PageList from '@/domains/catalogs/pages/PageList'
import PageCreate from '@/domains/catalogs/pages/PageCreate'
import PageEdit from '@/domains/catalogs/pages/PageEdit'

export const pages = [
  {
    path: '/catalogs/pages',
    name: 'catalogs.pages.list',
    component: PageList
  },
  {
    path: '/catalogs/pages/create',
    name: 'catalogs.pages.create',
    component: PageCreate
  },
  {
    path: '/catalogs/pages/:id/edit',
    name: 'catalogs.pages.edit',
    component: PageEdit
  }
];
