<template>
  <!-- Basic Info card -->
  <a-card :bordered="false" id="basic-info" class="header-solid mb-24">
    <template #title>
      <h5 class="mb-0 font-semibold">Options</h5>
    </template>
    <template>
      <a-row>
        <a-col :md="6" class="mb-24">
          <ProductOption></ProductOption>
        </a-col>

        <a-col :md="6" class="mb-24">
          <ProductOption></ProductOption>
        </a-col>

        <a-col :md="6" class="mb-24">
          <ProductOption></ProductOption>
        </a-col>

        <a-col :md="6" class="mb-24">
          <ProductOption></ProductOption>
        </a-col>
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
  },
  data() {
    return {
      headers: {
        authorization: 'authorization-text',
      },
    };
  },
  methods: {
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  },
};
</script>
