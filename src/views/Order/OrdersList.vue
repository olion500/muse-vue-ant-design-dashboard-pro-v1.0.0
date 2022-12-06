<!--
	This is the Orders List page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>

	<div>

		<!-- Orders List card -->
		<a-card :bordered="false" class="header-solid mb-24" :bodyStyle="{padding: 0, paddingTop: '16px'}">

			<!-- Table search -->
			<div class="mx-25">
				<a-row type="flex" :gutter="24">
					<a-col :span="24" class="text-right">
    					<a-input-search placeholder="input search text" style="max-width: 200px;" v-model="query" @change="onSearchChange" />
					</a-col>
				</a-row>
			</div>
			<!-- / Table search -->

			<!-- Orders table -->
			<a-table class="mt-20"
				:row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
				:columns="columns"
				:data-source="data"
				:pagination="{pageSize: pageSize,}"
			>

				<template slot="id" slot-scope="id">#{{ id }}</template>

        <template slot="datetime" slot-scope="date">{{ formatDatetime(date) }}</template>

        <template slot="product" slot-scope="product">{{ product.name }}</template>

				<template slot="status" slot-scope="order">
    				<a-button v-if="order.status === 'completed'" shape="circle" size="small" class="btn-status border-success mr-5">
						<a-icon class="m-0 text-success" type="check" style="font-size: 10px;" />
					</a-button>
    				<a-button v-else-if="order.status === 'in_progress'" @click="showCompleteConfirm(order.id)" shape="circle" size="small" class="btn-status border-muted mr-5">
						<a-icon class="m-0 text-muted" type="undo" style="font-size: 10px;" />
					</a-button>
					<span style="vertical-align: middle;">{{ order.status === 'completed' ? "완료됨" : "생산중" }}</span>
				</template>

				<template slot="showBtn" slot-scope="row">
					<a-button type="primary" :data-id="row.key">
						도안보기
					</a-button>
				</template>

			</a-table>
			<!-- / Orders table -->

		</a-card>
		<!-- / Orders List card -->

	</div>

</template>

<script>
	import axios from "axios";
  import moment from "moment";
  import { Modal } from "ant-design-vue";

  // Sorting function for string attibutes.
  let stringSorter = function(a, b, attr) {
		if (a[attr] < b[attr])
			return -1;
		if ( a[attr] > b[attr])
			return 1;
		return 0;
	}

	// Table columns
	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
			sorter: (a, b) => a.key - b.key,
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'id' },
		},
		{
			title: '주문일',
			dataIndex: 'createdAt',
			sorter: (a, b) => a.date.length - b.date.length,
			sortDirections: ['descend', 'ascend'],
      scopedSlots: { customRender: 'datetime' },
		},
    {
      title: '주문자명',
      dataIndex: 'name',
      sorter: (a, b) => stringSorter(a, b, 'name'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '연락처',
      dataIndex: 'phone',
      sorter: (a, b) => stringSorter(a, b, 'phone'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '상품명',
      dataIndex: 'product',
      sorter: (a, b) => stringSorter(a, b, 'product'),
      sortDirections: ['descend', 'ascend'],
      scopedSlots: { customRender: 'product' }
    },
    {
      title: '도안보기',
      scopedSlots: { customRender: 'showBtn'},
      width: 50,
    },
    {
      title: '옵션정보',
      dataIndex: 'options',
      sorter: (a, b) => stringSorter(a, b, 'options'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '구매사이트',
      dataIndex: 'purchase_site',
      sorter: (a, b) => stringSorter(a, b, 'purchase_site'),
      sortDirections: ['descend', 'ascend'],
    },
		{
			title: '생산완료',
			sorter: (a, b) => stringSorter(a, b, 'status'),
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'status' },
		},
    {
      title: '생산완료시간',
      dataIndex: 'completedAt',
      sorter: (a, b) => a.date.length - b.date.length,
      sortDirections: ['descend', 'ascend'],
      scopedSlots: { customRender: 'datetime' },
    },
	];

	export default {
		data() {
			return {

				// Table columns
				columns,

				// Table rows
				data: [],

				// Table page size
				pageSize: 10,

				// Table search query
				query: '',

				// Table's selected rows
        selectedRowKeys: [],

			}
		},
    created() {
      // watch the params of the route to fetch the data again
      this.$watch(
          () => this.$route.params,
          () => {
            this.fetchData()
          },
          // fetch the data when the view is created and the data is
          // already being observed
          { immediate: true }
      )
    },
		computed: {

			// CSV data array
			csvData() {
				return this.data.map(item => ({
					"Id": "%23" + item.key,
					"Date": item.date,
					"Status": item.status,
					"Customer": item.customer.name,
					"Product": item.product,
					"Revenue": "$" + item.revenue,
				}));
			}

		},
		methods: {

      fetchData() {
        const url = `${process.env.VUE_APP_API_HOST}/orders`;
        axios.get(url)
            .then((res) => {
              this.data = res.data;
            });
      },

      formatDatetime(date) {
        if (!date) return '';
        return moment(date).format('YY/MM/DD HH:mm');
      },

      showCompleteConfirm(productId) {
        const self = this;
        Modal.confirm({
          title: () => '생산완료 하시겠습니까?',
          onOk() {
            const url = `${process.env.VUE_APP_API_HOST}/orders/${productId}/complete`;
            axios.patch(url)
                .then(() => {
                  self.fetchData();
                });
          },
          onCancel() {
            // do nothing
          },
        });
      },

			// Event listener for input change on table search field.
			onSearchChange() {
				if( this.query.length > 0 ) {
					this.data = data.filter( (row) => {
						for( const key in row ) {
							if( row[ key ]
								.toString()
								.toLowerCase()
								.includes( this.query.trim().toLowerCase() ) )
								return true;
						}
						return false;
					}) ;
				}
				else {
					this.data = data ;
				}
			},

			// Event listener for table row selection change.
			onSelectChange(selectedRowKeys) {
				this.selectedRowKeys = selectedRowKeys;
			},

			// Export table in CSV format.
			csvExport(arrData) {
				let csvContent = "data:text/csv;charset=utf-8,";
				csvContent += [
					Object.keys(arrData[0]).join("|"),
					...arrData.map(item => Object.values(item).join("|"))
				]
					.join("\n")
					.replace(/(^\[)|(\]$)/gm, "");

				const data = encodeURI(csvContent);
				const link = document.createElement("a");
				link.setAttribute("href", data);
				link.setAttribute("download", "muse-dashboard-csv.csv");
				link.click();
			}

		},
	}

</script>

<style lang="scss" scoped>
</style>
