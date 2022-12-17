<template>
  <!-- Basic Info card -->
  <a-card :bordered="false" id="basic-info" class="header-solid mb-24">
    <template #title>
      <h5 class="mb-0 font-semibold">Basic Info</h5>
    </template>
    <a-form
        :hideRequiredMark="true"
    >
      <a-row :gutter="[24]">
        <a-col :span="16">
          <a-form-item class="mb-10" label="상품명" :colon="false">
            <a-input v-model="name" @input="emitBasicInfo"></a-input>
          </a-form-item>
          <a-form-item class="mb-10" label="상품설명" :colon="false">
            <a-textarea v-model="description" @input="emitBasicInfo" :rows="6" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item class="mb-10" label="사진" :colon="false">
            <a-avatar :size="200" shape="square" :src="product.image" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
  <!-- / Basic Info card -->
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
    },
  },
  watch: {
    product: function (newProduct) {
      this.name = newProduct.name;
      this.description = newProduct.description
    }
  },
  data() {
    return {
      name: '',
      description: '',
    };
  },
  emits: ['basicinfo'],
  methods: {
    emitBasicInfo() {
      this.$emit('basicinfo', {
        name: this.name,
        description: this.description
      });
    },
  },
};
</script>
