import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
	{
		// will match everything
		path: '*',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/orders/orders-list',
	},
	{
		path: '/orders/orders-list',
		name: 'Orders List',
		layout: "dashboard",
		meta: {
			title: 'Orders List',
			sidebarMap: ['order', 'orders-list'],
			breadcrumbs: ['Orders', 'Orders List'],
		},
		component: () => import('../views/Order/OrdersList.vue'),
	},
	{
		path: '/products/products-list',
		name: 'Products List',
		layout: "dashboard",
		meta: {
			title: 'Products List',
			sidebarMap: ['product', 'product-list'],
			breadcrumbs: ['Products', 'Products List'],
		},
		component: () => import('../views/Products/ProductsList.vue'),
	},
	{
		path: '/estimate/estimate-sheet-list',
		name: 'Estimate Sheet List',
		layout: "dashboard",
		meta: {
			title: 'Estimate Sheet List',
			sidebarMap: ['estimate', 'estimate-sheet-list'],
			breadcrumbs: ['Estimate', 'Estimate-sheet-list'],
		},
		component: () => import('../views/EstimateSheet/EstimateSheets.vue'),
	},
	{
		path: '/estimate/new-estimate-sheet',
		name: 'New Estimate Sheet',
		layout: "dashboard",
		meta: {
			title: 'New Estimate Sheet',
			sidebarMap: ['estimate', 'new-estimate-sheet'],
			breadcrumbs: ['Estimate', 'new-estimate-sheet'],
		},
		component: () => import('../views/EstimateSheet/NewEstimateSheet.vue'),
	},
	{
		path: '/stock/stock-list',
		name: 'Stock List',
		layout: "dashboard",
		meta: {
			title: 'Stock List',
			sidebarMap: ['stock', 'stock-list'],
			breadcrumbs: ['Stock', 'Stock-List'],
		},
		component: () => import('../views/Stock/Stocks.vue'),
	},
	{
		path: '/system/health',
		name: 'System health',
		layout: "dashboard",
		meta: {
			title: 'System health',
			sidebarMap: ['system', 'health'],
			breadcrumbs: ['System', 'Health'],
		},
		component: () => import('../views/System/SystemHealth.vue'),
	},
	{
		path: '/layout',
		name: 'Layout',
		layout: "dashboard",
		component: () => import('../views/Layout.vue'),
	},
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;
	
	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		if ( to.hash ) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
})

export default router
