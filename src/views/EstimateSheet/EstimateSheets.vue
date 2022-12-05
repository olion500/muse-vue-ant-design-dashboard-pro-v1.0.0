<!--
	This is the Estimate Sheet page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>

	<div>

		<!-- Estimate Sheet List header -->
		<a-row type="flex" :gutter="24">
			<a-col :span="12" class="mb-24">
        <router-link to="/estimate/new-estimate-sheet" custom v-slot="{ navigate }">
          <a-button type="primary" @click="navigate">견적서 추가</a-button>
        </router-link>
			</a-col>
			<a-col :span="12" class="mb-24 text-right" hidden>
				<a-button @click="csvExport(csvData)" class="ml-15">
					<i class="ni ni-archive-2 mr-5"></i> EXPORT CSV
				</a-button>

			</a-col>
		</a-row>
		<!-- / Estimate Sheet List header -->

		<!-- Estimate Sheet List card -->
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

			<!-- Estimate Sheet table -->
			<a-table class="mt-20"
				:row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
				:columns="columns"
				:data-source="data"
				:pagination="{pageSize: pageSize,}"
			>


				<template slot="estimateSheet" slot-scope="row">
					<a-button type="primary" @click="openEstimateSheet(row.url)">
						다운로드
					</a-button>
				</template>

        <template slot="totalCost" slot-scope="totalCost">{{ totalCost.toLocaleString() }}</template>

			</a-table>
			<!-- / Estimate Sheet table -->

		</a-card>
		<!-- / Estimate Sheet card -->

	</div>

</template>

<script>
	import axios from "axios";

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
			title: '견적번호',
			dataIndex: 'estimateNo',
			sorter: (a, b) => stringSorter(a, b, 'esitmateNo'),
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: '견적제품',
			dataIndex: 'name',
			sorter: (a, b) => stringSorter(a, b, 'name'),
			sortDirections: ['descend', 'ascend'],
		},
    {
      title: '견적일',
      dataIndex: 'estimatedAt',
      sorter: (a, b) => stringSorter(a, b, 'estimatedAt'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '상호',
      dataIndex: 'companyName',
      sorter: (a, b) => stringSorter(a, b, 'companyName'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '사업자등록번호',
      dataIndex: 'companyId',
      sorter: (a, b) => stringSorter(a, b, 'companyId'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '대표자',
      dataIndex: 'companyCEO',
      sorter: (a, b) => stringSorter(a, b, 'companyCEO'),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '견적총액',
      dataIndex: 'totalCost',
      sorter: (a, b) => stringSorter(a, b, 'totalCost'),
      sortDirections: ['descend', 'ascend'],
      scopedSlots: { customRender: 'totalCost'},
    },
    {
      title: '견적서받기',
      scopedSlots: { customRender: 'estimateSheet'},
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
			},
		},
		methods: {

      fetchData() {
        axios.get('/estimate-sheets')
            .then((res) => {
              this.data = res.data;
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
			},

      openEstimateSheet(url) {
        let httpUrl = url;
        if (!httpUrl.startsWith('http')) {
          httpUrl = 'http://' + httpUrl;
        }

        const link = document.createElement("a");
        link.setAttribute("href", httpUrl);
        link.setAttribute("target", '_blank');
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
