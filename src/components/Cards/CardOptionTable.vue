<template>
  <!-- Card Option table card -->
  <a-card :bordered="false" id="basic-info" class="header-solid mb-24">
    <template #title>
      <a-row justify="space-between">
        <a-col :span="16">
          <h5 class="mb-0 font-semibold">{{ optionGroup.name || '옵션을 선택해주세요' }}</h5>
        </a-col>
        <a-col v-if="optionGroup.id !== 0" :span="1">
          <router-link :to="{ name: 'New option', params: { id: optionGroup.id } }" custom v-slot="{ navigate }">
            <a-button type="primary" @click="navigate">추가하기</a-button>
          </router-link>
        </a-col>
      </a-row>
    </template>
    <a-form
        :hideRequiredMark="true"
    >

      <a-row :gutter="[24]">
        <a-col>
          <!-- Stock table -->
          <a-table class="mt-20"
                   :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
                   :columns="columns"
                   :data-source="options"
                   :pagination="{pageSize: pageSize,}"
                   rowKey="id"
          >

            <template slot="action" slot-scope="option">
              <a-button type="danger" @click="openDeleteModal(option)">
                삭제하기
              </a-button>
              <a-modal
                  title="삭제"
                  ref="modalRef"
                  v-model:visible="deleteModalVisible"
                  :wrap-style="{ overflow: 'hidden' }"
                  @ok="deleteOption(selectedOption)"
              >
              <p>삭제하시겠습니까?</p>
              </a-modal>
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
import axios from "axios";

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
    scopedSlots: { customRender: 'action'},
  },
];

export default {
  props: {
    optionGroup: {
      type: Object,
    },
    options: {
      type: Array,
    }
  },
  data() {
    return {
      // Table columns
      columns,

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

  methods: {
    openDeleteModal(option) {
      this.deleteModalVisible = true;
      this.selectedOption = option;
    },

    deleteOption(option) {
      const url = `${process.env.VUE_APP_API_HOST}/options/${option.id}`;
      axios.delete(url)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$router.go(0);
            }
          });
    },

    // Event listener for table row selection change.
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
  },
};
</script>
