<template>

	<!-- Main Sidebar -->
	<a-layout-sider
		collapsible
		class="sider-primary"
		breakpoint="lg"
		collapsed-width="0"
		width="250px"
		:collapsed="sidebarCollapsed"
		@collapse="$emit('toggleSidebar', ! sidebarCollapsed)"
		:trigger="null"
		:class="['ant-layout-sider-' + sidebarColor, 'ant-layout-sider-' + sidebarTheme]"
		theme="light"
		:style="{ backgroundColor: 'transparent',}">
			<div class="brand"><img src="images/logo-ct-black.png" alt=""> <span>Muse Dashboard</span></div>
			<hr>

			<!-- Sidebar Navigation Menu -->
			<a-menu theme="light" mode="inline"
      			:open-keys="openKeys"
				@openChange="onOpenChange">
        <a-sub-menu key="orders" style="padding: 0;">
					<span slot="title">
						<span class="icon">
							<a-icon type="dashboard" theme="filled" class="m-0" />
						</span>
						<span class="label">주문</span>
					</span>
          <a-menu-item-group>
            <a-menu-item>
              <router-link to="/orders/orders-list">
                <span class="label">주문관리</span>
              </router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="products" style="padding: 0;">
					<span slot="title">
						<span class="icon">
							<a-icon type="dollar-circle" theme="filled" class="m-0" />
						</span>
						<span class="label">상품</span>
					</span>
          <a-menu-item-group>
            <a-menu-item>
              <router-link to="/products/products-list">
                <span class="label">상품관리</span>
              </router-link>
            </a-menu-item>
          </a-menu-item-group>
          <a-menu-item-group>
            <a-menu-item>
              <router-link to="/products/options-list">
                <span class="label">옵션관리</span>
              </router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="stock" style="padding: 0;">
					<span slot="title">
						<span class="icon">
							<a-icon type="reconciliation" theme="filled" class="m-0" />
						</span>
						<span class="label">재고</span>
					</span>
          <a-menu-item-group>
            <a-menu-item>
              <router-link to="/stock/stock-list">
                <span class="label">재고관리</span>
              </router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="estimate-sheet" style="padding: 0;">
					<span slot="title">
						<span class="icon">
							<a-icon type="reconciliation" theme="filled" class="m-0" />
						</span>
						<span class="label">견적</span>
					</span>
          <a-menu-item-group>
            <a-menu-item>
              <router-link to="/estimate/estimate-sheet-list">
                <span class="label">견적관리</span>
              </router-link>
            </a-menu-item>
            <a-menu-item>
              <router-link to="/estimate/new-estimate-sheet">
                <span class="label">견적추가</span>
              </router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
        <a-sub-menu key="system" style="padding: 0;">
					<span slot="title">
						<span class="icon">
							<a-icon type="sliders" theme="filled" class="m-0" />
						</span>
						<span class="label">시스템</span>
					</span>
          <a-menu-item-group>
            <a-menu-item>
              <router-link to="/system/health">
                <span class="label">데이터 전송</span>
              </router-link>
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
			</a-menu>
			<!-- / Sidebar Navigation Menu -->
	</a-layout-sider>
	<!-- / Main Sidebar -->

</template>

<script>

	export default ({
		props: {
			// Sidebar collapsed status.
			sidebarCollapsed: {
				type: Boolean,
				default: false,
			},

			// Main sidebar color.
			sidebarColor: {
				type: String,
				default: "primary",
			},

			// Main sidebar theme : light, white, dark.
			sidebarTheme: {
				type: String,
				default: "light",
			},
		},
		data() {
			return {
      			rootSubmenuKeys: ['dashboards', 'pages', 'applications', 'ecommerce', 'authentication', 'basic', 'components', 'changelog'],
				openKeys: this.$route.meta.sidebarMap,
			}
		},
		methods: {
			onOpenChange(openKeys)
			{
				const latestOpenKey = openKeys.find( key => this.openKeys.indexOf( key ) === -1) ;

				if ( this.rootSubmenuKeys.indexOf( latestOpenKey ) === -1 )
				{
					this.openKeys = openKeys;
				}
				else
				{
					this.openKeys = latestOpenKey ? [ latestOpenKey ] : [] ;
				}
			},
		},
	})

</script>
