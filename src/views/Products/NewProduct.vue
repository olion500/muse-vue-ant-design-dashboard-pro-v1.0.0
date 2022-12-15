<!--
	This is the new product page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>

  <div class="mx-auto mt-50" style="max-width: 800px;">

    <div class="mb-24">
      <a-card :bordered="false" class="header-solid" :bodyStyle="{paddingTop: 0 }" :headStyle="{paddingBottom: '0' }">
        <template #title>
          <h5 class="mb-0">상품 추가</h5>
        </template>
        <a-form
            :form="form"
            @submit="handleSubmit"
            :hideRequiredMark="true"
        >
          <a-row :gutter="[24]">
            <a-col :span="24">
              <a-form-item class="mb-10" label="상품명" :colon="false">
                <a-input v-model="name"/>
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item class="mb-10" label="상품 설명" :colon="false">
                <a-textarea v-model="description" :rows="6" />
              </a-form-item>
            </a-col>
            <a-col :span="24">
              <a-form-item class="mb-10" label="사진" :colon="false">
                <template>
                  <a-upload
                      name="avatar"
                      list-type="picture-card"
                      class="avatar-uploader"
                      :show-upload-list="false"
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
                </template>
              </a-form-item>
            </a-col>
          </a-row>

          <a-row :gutter="[24]">
            <a-col :span="8">
              <a-form-item>
                <a-select v-model="productType" placeholder="상품 종류 선택">
                  <a-select-option value="wapen">인식표</a-select-option>
                  <a-select-option value="tag">목걸이</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item>
                <a-select v-model="option1" placeholder="옵션 1 선택">
                  <a-select-option v-for="option in optionData" :value="option.id">{{ option.name }}</a-select-option>>
                </a-select>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item>
                <a-select v-model="option2" placeholder="옵션 2 선택">
                  <a-select-option v-for="option in optionData" :value="option.id">{{ option.name }}</a-select-option>>
                </a-select>
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
      optionData: [],

      file: undefined,
      loading: false,
      imageUrl: undefined,

      name: '',
      description: '',
      productType: undefined,
      designType: 'text_3line',
      option1: undefined,
      option2: undefined,
    }
  },
  beforeCreate() {
    // Creates the form and adds to it component's "form" property.
    this.form = this.$form.createForm(this);
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
      const notShowingList = ['글자색상', '글씨체'];
      const url = `${process.env.VUE_APP_API_HOST}/options`;
      axios.get(url)
          .then((res) => {
            console.log(res.data);
            this.optionData = res.data.filter(option => !notShowingList.includes(option.name));
          });
    },

    // Handles input validation after submission.
    handleSubmit(e) {
      e.preventDefault();

      const url = `${process.env.VUE_APP_API_HOST}/products`;
      const bodyFormData = new FormData();
      bodyFormData.append('image', this.file);
      bodyFormData.append('name', this.name);
      bodyFormData.append('description', this.description);
      bodyFormData.append('option1', this.option1);
      bodyFormData.append('option2', this.option2);
      bodyFormData.append('designType', this.designType);
      bodyFormData.append('productType', this.productType);
      axios.post(url, bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data'},
      })
      .then((res) => {
        if (res.status === 201) {
          this.$router.push('/products/products-list');
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

      this.file = info.file.originFileObj;
      this.getBase64(info.file.originFileObj, (base64Url) => {
        this.imageUrl = base64Url;
        this.loading = false;
      });
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
