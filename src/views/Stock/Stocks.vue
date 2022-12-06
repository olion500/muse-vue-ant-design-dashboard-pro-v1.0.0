<!--
	This is the Stock page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>

	<div>

		<!-- Stock List card -->
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

			<!-- Stock table -->
			<a-table class="mt-20"
				:row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
				:columns="columns"
				:data-source="data"
				:pagination="{pageSize: pageSize,}"
        rowKey="id"
			>

        <template slot="editCount" slot-scope="option">
          <a-button type="primary" @click="openEditCount(option)">
            입력하기
          </a-button>
        </template>

        <template slot="status" slot-scope="option">
          <div v-if="option.count >= 40">여유</div>
          <div v-else-if="option.count >= 20">재고부족</div>
          <div v-else>재고경고</div>
        </template>

			</a-table>
			<!-- / Stock table -->

		</a-card>
		<!-- / Stock card -->

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
			title: '옵션명',
			dataIndex: 'optionGroup',
			sorter: (a, b) => stringSorter(a, b, 'optionGroup'),
			sortDirections: ['descend', 'ascend'],
		},
		{
			title: '옵션값',
			dataIndex: 'name',
			sorter: (a, b) => stringSorter(a, b, 'name'),
			sortDirections: ['descend', 'ascend'],
		},
    {
      title: '재고값',
      dataIndex: 'count',
      sorter: (a, b) => a - b,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '일평균소진',
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '소진예상일',
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '입고입력',
      sortDirections: ['descend', 'ascend'],
      scopedSlots: { customRender: 'editCount'},
    },
    {
      title: '재고상태',
      sortDirections: ['descend', 'ascend'],
      scopedSlots: { customRender: 'status'},
    },
	];

  const data =  [
    {
      "id": 65,
      "name": "노랑",
      "optionGroup": "배경색상",
      "image": "http://3.39.241.52:3000/media/options/ae2473c1-7189-49b9-92a4-10440a8564fd.png",
      "count": 0,
      "createdAt": "2022-12-05T13:20:39.293Z",
      "updatedAt": "2022-12-05T13:20:39.313Z"
    },
    {
      "id": 66,
      "name": "보라",
      "optionGroup": "배경색상",
      "image": "http://3.39.241.52:3000/media/options/d0fccedc-c1db-4f26-a60f-0ed77524ab6d.png",
      "count": 0,
      "createdAt": "2022-12-05T13:20:49.729Z",
      "updatedAt": "2022-12-05T13:20:49.738Z"
    },
    {
      "id": 67,
      "name": "빨강",
      "optionGroup": "배경색상",
      "image": "http://3.39.241.52:3000/media/options/d3e14bc7-6bc3-402f-9cb1-9fe950635fc9.png",
      "count": 0,
      "createdAt": "2022-12-05T13:20:59.347Z",
      "updatedAt": "2022-12-05T13:20:59.356Z"
    },
    {
      "id": 68,
      "name": "파랑",
      "optionGroup": "배경색상",
      "image": "http://3.39.241.52:3000/media/options/6f9612eb-4d3b-4bb6-9c4d-a79a34ebc493.png",
      "count": 0,
      "createdAt": "2022-12-05T13:21:11.950Z",
      "updatedAt": "2022-12-05T13:21:11.959Z"
    },
    {
      "id": 69,
      "name": "흰색",
      "optionGroup": "배경색상",
      "image": "http://3.39.241.52:3000/media/options/f18576ad-fa8e-4977-92ca-bef2acc27151.png",
      "count": 0,
      "createdAt": "2022-12-05T13:21:21.094Z",
      "updatedAt": "2022-12-05T13:21:21.103Z"
    }
  ];


	export default {
		data() {
			return {

        rotateRates: [],

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
    created() {
      // watch the params of the route to fetch the data again
      this.$watch(
          () => this.$route.params,
          () => {
            this.fetchData();
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
        const url = `${process.env.VUE_APP_API_HOST}/options`;
        axios.get(url)
            .then((res) => {
              this.data = [];
              for (const group of res.data) {
                for (const option of group.options) {
                  this.data.push({
                    ...option,
                    'id': option.id.toString(),
                    'optionGroup': group.name
                  });
                }
              }
            });
      },

      openEditCount(option) {

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
		},
	}

</script>

<style lang="scss" scoped>
</style>
