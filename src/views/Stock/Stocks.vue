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
          <a-modal
              ref="modalRef"
              v-model:visible="editModalVisible"
              :wrap-style="{ overflow: 'hidden' }"
              @ok="updateCount(selectedOption)"
          >
            <a-form-item class="mb-10" label="입고수량입력" :colon="false">
              <a-input v-model="newCount"/>
            </a-form-item>
          </a-modal>
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
      dataIndex: 'dailyConsumeAvg',
      sorter: (a, b) => a - b,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: '소진예상일',
      dataIndex: 'expectedFinalConsume',
      sorter: (a, b) => a - b,
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

	export default {
		data() {
			return {

        rotateRates: [],

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

        editModalVisible: false,
        selectedOption: null,
        newCount: '',

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
		methods: {

      fetchData() {
        const url = `${process.env.VUE_APP_API_HOST}/orders/stocks`;
        axios.get(url)
            .then((res) => {
              this.data = res.data.map((option) => {
                return {
                  ...option,
                  optionGroup: option.optionGroup.name,
                }
              });
            });
      },

      openEditCount(option) {
        this.editModalVisible = true;
        this.selectedOption = option;
      },

      updateCount(option) {
        const self = this;
        const url = `${process.env.VUE_APP_API_HOST}/options/${option.id}`;

        axios.patch(url, {
          count: Number(this.newCount)
        })
        .then((res) => {
          this.editModalVisible = false;
          this.selectedOption = null;
          self.fetchData();
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
		},
	}

</script>

<style lang="scss" scoped>
</style>
