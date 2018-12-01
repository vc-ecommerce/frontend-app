import PageList from '@/components/domains/catalogs/pages-info/PageList'
import PageCreate from '@/components/domains/catalogs/pages-info/PageCreate'
import PageEdit from '@/components/domains/catalogs/pages-info/PageEdit'

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
