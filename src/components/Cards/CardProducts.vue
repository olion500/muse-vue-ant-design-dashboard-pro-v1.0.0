<template>

  <!-- Product Card -->
  <a-card :bordered="false" class="header-solid h-full" :bodyStyle="{paddingTop: 0, paddingBottom: '16px' }">
    <template #title>
      <h6 class="font-semibold m-0">상품선택</h6>
    </template>
    <template slot="extra" class="mb-0">
      <a-button type="primary">
        추가하기
      </a-button>
    </template>
    <a-list
        class="invoice-list"
        item-layout="horizontal"
        :split="false"
        :data-source="data"
    >
      <a-list-item @click="select(item)" slot="renderItem" slot-scope="item">
        <a-button slot="actions" type="link">
          <a-icon type="edit" theme="outlined" fill="#111827"/>
          수정
        </a-button>
        <a-list-item-meta
            :title="item.title"
        ></a-list-item-meta>
      </a-list-item>
    </a-list>
  </a-card>
  <!-- / Invoices Card -->

</template>

<script>

export default ({
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['selected'],
  data() {
    return {
      selectedItem: null
    }
  },
  methods: {
    select(item) {
      this.selectedItem = item;
      this.$emit('selected', item);
    }
  }
})

</script>
