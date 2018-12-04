import BrandList from '@/domains/catalogs/brands/BrandList'
import BrandCreate from '@/domains/catalogs/brands/BrandCreate'
import BrandEdit from '@/domains/catalogs/brands/BrandEdit'

export const brands = [
  {
    path: '/catalogs/brands',
    name: 'catalogs.brands.list',
    component: BrandList
  },
  {
    path: '/catalogs/brands/create',
    name: 'catalogs.brands.create',
    component: BrandCreate
  },
  {
    path: '/catalogs/brands/:id/edit',
    name: 'catalogs.brands.edit',
    component: BrandEdit
  }
];
