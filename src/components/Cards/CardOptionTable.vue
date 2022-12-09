<template>
  <!-- Card Option table card -->
  <a-card :bordered="false" id="basic-info" class="header-solid mb-24">
    <template #title>
      <h5 class="mb-0 font-semibold">{{ optionGroup.name || '옵션을 선택해주세요' }}</h5>
    </template>
    <a-form
        :hideRequiredMark="true"
    >

      <a-row :gutter="[24]">
        <a-col>
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

            <template slot="action" slot-scope="option">
              <a-button type="danger" @click="openDeleteModal(option)">
                삭제하기
              </a-button>
              <a-modal
                  ref="modalRef"
                  v-model:visible="deleteModalVisible"
                  :wrap-style="{ overflow: 'hidden' }"
                  @ok="deleteOption(selectedOption)"
              />
            </template>

          </a-table>
          <!-- / Stock table -->
        </a-col>
      </a-row>
    </a-form>
  </a-card>
  <!-- / Card Option Table card -->
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
    title: '옵션값',
    dataIndex: 'name',
    sorter: (a, b) => stringSorter(a, b, 'name'),
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '재고',
    dataIndex: 'count',
    sorter: (a, b) => a - b,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: '삭제',
    sortDirections: ['descend', 'ascend'],
    scopedSlots: { customRender: 'editCount'},
  },
];

export default {
  props: {
    optionGroup: {
      type: Object,
    },
  },
  data() {
    return {
      // Table columns
      columns,

      // Table rows
      data: this.optionData,

      // Table page size
      pageSize: 10,

      // Table search query
      query: '',

      // Table's selected rows
      selectedRowKeys: [],

      deleteModalVisible: false,
      selectedOption: null,
    };
  },
  computed: {
    optionData() {
      return this.optionGroup.options;
    },
  },
  methods: {
    openDeleteModal(option) {
      this.deleteModalVisible = true;
      this.selectedOption = option;
    },

    deleteOption(option) {
      console.log(option);
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
  },
};
</script>
