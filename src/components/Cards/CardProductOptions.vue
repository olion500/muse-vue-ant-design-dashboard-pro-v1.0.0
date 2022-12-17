<template>
  <!-- Basic Info card -->
  <a-card :bordered="false" id="basic-info" class="header-solid mb-24">
    <template #title>
      <h5 class="mb-0 font-semibold">Options</h5>
    </template>
    <template>
      <a-row>
        <template v-for="option in product.productOptions">
          <a-col :md="6" class="mb-24">
            <ProductOption
              :option="option"
              :bus="bus"
            ></ProductOption>
          </a-col>
        </template>
      </a-row>
    </template>
  </a-card>
  <!-- / Basic Info card -->
</template>

<script>
import ProductOption from "@/components/Cards/ProductOption";

export default {
  components: { ProductOption },
  props: {
    product: {
      type: Object,
    },
    bus: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {

    };
  },
  methods: {
  },
};
</script>
