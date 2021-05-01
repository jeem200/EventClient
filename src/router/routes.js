import Home from '../modules/Home.vue'
import Vendor from '../modules/Vendor/Vendor.vue'
import VendorList from '../modules/Vendor/VendorList.vue'
import ServiceAddForm from '../modules/Vendor/ServiceAddForm.vue'
import Customer from '../modules/Customer/Customer.vue'
import ServiceList from '../modules/Vendor/ServiceList'



const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/vendor',
      name: 'Vendor',
      component:Vendor
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
     // component: () => import(/* webpackChunkName: "about" */ '../modules/About.vue')
    },
    {
      path: '/vendor/list',
      name: 'Vendor',
      component:VendorList
    },
    {
      path: '/vendor/item',
      name: 'Vendor',
      component:ServiceAddForm
    },
    {
        path:'/customer',
        name:'Customer',
        component:Customer
    },

    {
      path:'/service/list',
      name:'ServiceList',
      component:ServiceList
    }
  ]


  export default routes