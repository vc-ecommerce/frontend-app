import AttributeList from '@/components/pages/catalogs/attributes/AttributeList'
import AttributeCreate from '@/components/pages/catalogs/attributes/AttributeCreate'
//import AttributeEdit from '@/components/pages/catalogs/attributes/AttributeEdit'

export const attributes = [
  {
    path: '/catalogs/attributes',
    name: 'catalogs.attributes.list',
    component: AttributeList
  },
  {
    path: '/catalogs/attributes/create',
    name: 'catalogs.attributes.create',
    component: AttributeCreate
  }
  // {
  //   path: '/catalogs/attributes/:id/edit',
  //   name: 'catalogs.attributes.edit',
  //   component: AttributeEdit
  // }
];
