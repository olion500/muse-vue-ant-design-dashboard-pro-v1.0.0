<!--
	This is the Orders List page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>

	<div>

		<!-- Orders List header -->
		<a-row type="flex" :gutter="24">
			<a-col :span="12" class="mb-24">
				<a-button type="primary" hidden>NEW ORDER</a-button>
			</a-col>
			<a-col :span="12" class="mb-24 text-right">
				<a-button @click="csvExport(csvData)" class="ml-15">
					<i class="ni ni-archive-2 mr-5"></i> EXPORT CSV
				</a-button>

			</a-col>
		</a-row>
		<!-- / Orders List header -->

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

				<template slot="status" slot-scope="status">
    				<a-button v-if="status == 'Complete'" shape="circle" size="small" class="btn-status border-success mr-5">
						<a-icon class="m-0 text-success" type="check" style="font-size: 10px;" />
					</a-button>
    				<a-button v-else-if="status == 'InProgress'" shape="circle" size="small" class="btn-status border-muted mr-5">
						<a-icon class="m-0 text-muted" type="undo" style="font-size: 10px;" />
					</a-button>
					<span style="vertical-align: middle;">{{ status === 'Complete' ? "완료됨" : "생산중" }}</span>
				</template>

				<template slot="customer" slot-scope="customer">
					<div class="table-avatar-info">
						<div class="avatar-info">
							<p class="mb-0 text-dark">{{ customer.name }}</p>
						</div>
					</div>
				</template>

				<template slot="revenue" slot-scope="revenue">${{ revenue }}</template>

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
			dataIndex: 'key',
			sorter: (a, b) => a.key - b.key,
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'id' },
		},
		{
			title: '주문일',
			dataIndex: 'createdAt',
			sorter: (a, b) => a.date.length - b.date.length,
			sortDirections: ['descend', 'ascend'],
		},
    {
      title: '주문자명',
      dataIndex: 'customer',
      sorter(a, b, attr) {
        if (a.customer.name < b.customer.name)
          return -1;
        if ( a.customer.name > b.customer.name)
          return 1;
        return 0;
      },
      sortDirections: ['descend', 'ascend'],
      scopedSlots: { customRender: 'customer' },
    },
    {
      title: '상품명',
      dataIndex: 'product',
      sorter: (a, b) => stringSorter(a, b, 'product'),
      sortDirections: ['descend', 'ascend'],
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
			dataIndex: 'status',
			sorter: (a, b) => stringSorter(a, b, 'status'),
			sortDirections: ['descend', 'ascend'],
			scopedSlots: { customRender: 'status' },
		},
    {
      title: '생산완료시간',
      dataIndex: 'completedAt',
      sorter: (a, b) => a.date.length - b.date.length,
      sortDirections: ['descend', 'ascend'],
    },
	];

	// Table rows
	const data = [
		{
			"key": 10421,
			"createdAt": "1 Nov, 10:20 AM",
			"status": "Complete",
			"customer": {
				"name": "Orlando Imieto",
				"avatar": "images/team-2.jpg",
			},
			"product": "Nike Sport V2",
      "options": "앞: 베로, 410160011241118",
      "purchase_site": "네이버자사몰",
      "completedAt": "1 Nov, 10:20 AM",
		},
		{
			"key": 10422,
			"createdAt": "1 Nov, 10:53 AM",
			"status": "Complete",
			"customer": {
				"name": "Alice Murinho",
				"avatar": "images/team-1.jpg",
			},
			"product": "Valvet T-shirt",
      "options": "앞: 베로, 410160011241118",
      "purchase_site": "네이버자사몰",
      "completedAt": "1 Nov, 10:20 AM",
    },
		{
			"key": 10423,
			"createdAt": "1 Nov, 11:13 AM",
			"status": "InProgress",
			"customer": {
				"name": "Michael Mirra",
			},
			"product": "Leather Wallet",
      "options": "앞: 베로, 410160011241118",
      "purchase_site": "네이버자사몰",
      "completedAt": "",
    },
		{
			"key": 10424,
			"createdAt": "1 Nov, 12:20 PM",
			"status": "Complete",
			"customer": {
				"name": "Andrew Nichel",
				"avatar": "images/team-3.jpg",
			},
			"product": "Bracelet Onu-Lino",
      "options": "앞: 베로, 410160011241118",
      "purchase_site": "네이버자사몰",
      "completedAt": "1 Nov, 10:20 AM",
    },
		{
			"key": 10426,
			"createdAt": "1 Nov, 2:19 AM",
			"status": "Complete",
			"customer": {
				"name": "Laur Gilbert",
			},
			"product": "Backpack Niver",
      "options": "앞: 베로, 410160011241118",
      "purchase_site": "네이버자사몰",
      "completedAt": "1 Nov, 10:20 AM",
    },
		{
			"key": 10427,
			"createdAt": "1 Nov, 3:42 AM",
			"status": "Complete",
			"customer": {
				"name": "Iryna Innda",
			},
			"product": "Adidas Vio",
      "options": "앞: 베로, 410160011241118",
      "purchase_site": "네이버자사몰",
      "completedAt": "1 Nov, 10:20 AM",
    },
		{
			"key": 10428,
			"createdAt": "2 Nov, 9:32 AM",
			"status": "Complete",
			"customer": {
				"name": "Arrias Liunda",
			},
			"product": "Airpods 2 Gen",
      "options": "앞: 베로, 410160011241118",
      "purchase_site": "네이버자사몰",
      "completedAt": "1 Nov, 10:20 AM",
    },
		{
			"key": 10429,
			"createdAt": "2 Nov, 10:14 AM",
			"status": "Complete",
			"customer": {
				"name": "Rugna Ilpio",
				"avatar": "images/team-5.jpg",
			},
			"product": "Bracelet Warret",
      "options": "앞: 베로, 410160011241118",
      "purchase_site": "네이버자사몰",
      "completedAt": "1 Nov, 10:20 AM",
    },
		{
			"key": 10430,
			"createdAt": "2 Nov, 12:56 PM",
			"status": "InProgress",
			"customer": {
				"name": "Anna Landa",
				"avatar": "images/ivana-squares.jpg",
			},
			"product": "Watter Bottle India",
      "options": "앞: 베로, 410160011241118",
      "purchase_site": "네이버자사몰",
      "completedAt": "",
    },
		{
			"key": 10431,
			"createdAt": "2 Nov, 3:12 PM",
			"status": "Complete",
			"customer": {
				"name": "Karl Innas",
			},
			"product": "Kitchen Gadgets",
      "options": "앞: 베로, 410160011241118",
      "purchase_site": "네이버자사몰",
      "completedAt": "1 Nov, 10:20 AM",
    },
		{
			"key": 10432,
			"createdAt": "2 Nov, 5:12 PM",
			"status": "Complete",
			"customer": {
				"name": "Oana Kilas",
			},
			"product": "Office Papers",
      "options": "앞: 베로, 410160011241118",
      "purchase_site": "네이버자사몰",
      "completedAt": "1 Nov, 10:20 AM",
    },
	];

	export default {
		data() {
			return {

				// Table columns
				columns,

				// Table rows
				data,

				// Table page size
				pageSize: 10,

				// Table search query
				query: '',

				// Table's selected rows
        selectedRowKeys: [],

			}
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
	.table-avatar-info {
		display: flex;
		align-items: center;
	}
	.table-avatar-info .ant-avatar {
		margin-right: 8px;
	}

	// Using vuejs "Deep Selectors"
	.table-avatar-info::v-deep .ant-avatar-string {
		font-size: 12px;
	}
	.btn-status::v-deep .anticon {
		line-height: 0;
	}
</style>
