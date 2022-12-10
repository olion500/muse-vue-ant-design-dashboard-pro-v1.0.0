<!--
	This is the new option page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>

  <div class="mx-auto mt-50" style="max-width: 800px;">

    <div class="mb-24">
      <a-card :bordered="false" class="header-solid" :bodyStyle="{paddingTop: 0 }" :headStyle="{paddingBottom: '0' }">
        <template #title>
          <h5 class="mb-0">옵션 추가</h5>
        </template>
        <a-form
            :form="form"
            @submit="handleSubmit"
            :hideRequiredMark="true"
        >
          <a-row :gutter="[24]">
            <a-col :span="24">
              <a-form-item class="mb-10" label="옵션명" :colon="false">
                <a-input v-model="name"/>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item class="mb-10" label="사진" :colon="false">
                <template>
                  <a-upload
                      v-model:file-list="fileList"
                      name="avatar"
                      list-type="picture-card"
                      class="avatar-uploader"
                      :show-upload-list="false"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :before-upload="beforeUpload"
                      @change="handleImageChange"
                  >
                    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
                    <div v-else>
                      <a-icon v-if="loading" type="loading" theme="outlined" />
                      <a-icon v-else type="plus" theme="outlined" />
                      <div class="ant-upload-text">Upload</div>
                    </div>
                  </a-upload>
<!--                  <a-upload-->
<!--                      name="file"-->
<!--                      :multiple="false"-->
<!--                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"-->
<!--                      :before-upload="beforeUpload"-->
<!--                      @remove="handleRemove">-->
<!--                  </a-upload>-->
                </template>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="[24]">
            <a-col :span="12">
            </a-col>
            <a-col :span="12" class="text-right">
              <a-button type="primary" html-type="submit" class="px-25">제출</a-button>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
    </div>

  </div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fileList: undefined,
      loading: false,
      imageUrl: undefined,

      name: '',
    }
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this);
  },
  methods: {
    // Handles input validation after submission.
    handleSubmit(e) {
      e.preventDefault();
      const data = {
        estimateNo: this.estimateNo,
        name: this.name,
        estimatedAt: this.estimatedAt,
        companyName: this.companyName,
        companyId: this.companyId,
        companyCEO: this.companyCEO,
        totalCost: Number(this.totalCost),
        url: this.url,
      };

      const optionId = this.$router.currentRoute.params.id;
      const url = `${process.env.VUE_APP_API_HOST}/options/${optionId}`;
      const bodyFormData = new FormData();
      bodyFormData.append('image', this.file);
      bodyFormData.append('name', this.name);
      axios.post(url, bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data'},
      })
      .then((res) => {
        if (res.status === 201) {
          this.$router.push('/products/options-list');
        }
      });
    },

    getBase64(img, callback) {
      const reader = new FileReader();
      reader.addEventListener('load', () => callback(reader.result));
      reader.readAsDataURL(img);
    },

    handleImageChange(info) {
      if (info.file.status === 'uploading') {
        this.loading = true;
        return;
      }
      if (info.file.status === 'done') {
        this.file = info.file.originFileObj;
        // Get this url from response in real world.
        this.getBase64(info.file.originFileObj, (base64Url) => {
          this.imageUrl = base64Url;
          this.loading = false;
        });
      }
      if (info.file.status === 'error') {
        this.loading = false;
      }
    },

    beforeUpload(file) {
      // this.file = file;
      return true;
    },
  },
}

</script>

<style lang="scss">
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
