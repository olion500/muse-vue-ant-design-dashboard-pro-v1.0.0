<!--
	This is the new estimate page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>

  <div class="mx-auto mt-50" style="max-width: 800px;">

    <div class="mb-24">
      <!-- Step 1 -->
      <a-card :bordered="false" class="header-solid" :bodyStyle="{paddingTop: 0 }" :headStyle="{paddingBottom: '0' }">
        <template #title>
          <h5 class="mb-0">견적서 추가</h5>
        </template>
        <a-form
            :form="form"
            @submit="handleSubmit"
            :hideRequiredMark="true"
        >
          <a-row :gutter="[24]">
            <a-col :span="12">
              <a-form-item class="mb-10" label="견적번호" :colon="false">
                <a-input />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="견적제품" :colon="false">
                <a-input />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="견적일" :colon="false">
                <a-input />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="상호" :colon="false">
                <a-input />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="사업자등록번호" :colon="false">
                <a-input />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="대표자" :colon="false">
                <a-input />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="견적총액" :colon="false">
                <a-input />
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="견적서 링크" :colon="false">
                <a-input placeholder="http://..."/>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="[24]">
            <a-col :span="12">
            </a-col>
            <a-col :span="12" class="text-right">
              <a-button type="primary" class="px-25">제출</a-button>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
    </div>

  </div>

</template>

<script>

export default {
  data() {
    return {
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
      this.form.validateFields((err, values) => {
        if ( !err ) {
          console.log('Received values of form: ', values) ;
        }
      });
    },
  },
}

</script>

<style lang="scss">
</style>
