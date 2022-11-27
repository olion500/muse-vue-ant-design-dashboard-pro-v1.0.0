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
            <a-input></a-input>
          </a-form-item>
          <a-form-item class="mb-10" label="상품설명" :colon="false">
            <a-textarea :rows="6" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item class="mb-10" label="사진" :colon="false">
            <a-avatar :size="200" shape="square" src="images/face-1.jpg" />
            <template>
              <a-upload
                  name="file"
                  :multiple="true"
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  :headers="headers"
                  @change="handleChange"
              >
                <a-button> <a-icon type="upload" /> Click to Upload </a-button>
              </a-upload>
            </template>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
  <!-- / Basic Info card -->
</template>

<script>
export default {
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
