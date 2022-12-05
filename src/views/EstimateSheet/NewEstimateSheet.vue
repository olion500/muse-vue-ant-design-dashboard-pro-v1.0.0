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
                <a-input v-model="estimateNo"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="견적제품" :colon="false">
                <a-input v-model="name"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="견적일" :colon="false">
                <a-input v-model="estimatedAt"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="상호" :colon="false">
                <a-input v-model="companyName"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="사업자등록번호" :colon="false">
                <a-input v-model="companyId"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="대표자" :colon="false">
                <a-input v-model="companyCEO"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="견적총액" :colon="false">
                <a-input v-model="totalCost"/>
              </a-form-item>
            </a-col>
            <a-col :span="12">
              <a-form-item class="mb-10" label="견적서 링크" :colon="false">
                <a-input v-model="url" placeholder="http://..."/>
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
      estimateNo: '',
      name: '',
      estimatedAt: '',
      companyName: '',
      companyId: '',
      companyCEO: '',
      totalCost: 0,
      url: '',
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

      axios.post('/estimate-sheets', data)
          .then((res) => {
            if (res.status === 201) {
               this.$router.push('/estimate/estimate-sheet-list')
            }
          });
    },
  },
}

</script>

<style lang="scss">
</style>
