<!--
	This is the SystemHealth page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>

  <div>

    <a-row type="flex" :gutter="[12,12,12]">

      <a-col :span="8">

        <!-- System Level 1 Card -->
        <a-card :bordered="false" class="header-solid mb-24" :bodyStyle="{paddingTop: '12px',}">
          <template #title>
            <h6>시스템 가동여부 전송</h6>
          </template>
          <template>
            <a-form :form="formLevel1" @submit="handleSubmitLevel1">
              <a-form-item label="발생일자">
                <a-input v-model="level1_createdAt" placeholder="YYYYMMDD" />
              </a-form-item>
              <a-form-item label="전송일시">
                <a-input v-model="level1_sentAt" placeholder="YYYYMMDD" />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit">
                  시스템 가동여부 전송
                </a-button>
              </a-form-item>
            </a-form>
          </template>
        </a-card>
        <!-- / System Level 1 Card -->

      </a-col>

      <a-col :span="8" >

        <!-- System Level 2 Card -->
        <a-card :bordered="false" class="header-solid mb-24" :bodyStyle="{paddingTop: '12px',}">
          <template #title>
            <h6>LEVEL2 성과물전송</h6>
          </template>
          <template>
            <a-form :form="formLevel2" @submit="handleSubmitLevel2">
              <a-form-item label="발생일자">
                <a-input placeholder="YYYYMMDD" />
              </a-form-item>
              <a-form-item label="전송일시">
                <a-input placeholder="YYYYMMDD" />
              </a-form-item>
              <a-form-item label="지표1 : 맞춤형 주문 생산 가능 수량">
                <a-input />
              </a-form-item>
              <a-form-item label="지표2 : 신규 제품 출시 수">
                <a-input />
              </a-form-item>
              <a-form-item label="지표3 : 고객의 상담 대기시간">
                <a-input />
              </a-form-item>
              <a-form-item label="지표4 : B2B 견적 시간">
                <a-input />
              </a-form-item>
              <a-form-item label="지표5 : 인건비 원가 비중">
                <a-input />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit">
                  지표전송 v2
                </a-button>
              </a-form-item>
            </a-form>
          </template>
        </a-card>
        <!-- / System Level 2 Card -->
      </a-col>

      <a-col :span="8">

        <!-- System Level 3 Card -->
        <a-card :bordered="false" class="header-solid mb-24" :bodyStyle="{paddingTop: '12px',}">
          <template #title>
            <h6>LEVEL3 일일 지표값 전송</h6>
          </template>
          <template>
            <a-form :form="formLevel3" @submit="handleSubmitLevel3">
              <a-form-item label="발생일자">
                <a-input placeholder="YYYYMMDD" />
              </a-form-item>
              <a-form-item label="전송일시">
                <a-input placeholder="YYYYMMDD" />
              </a-form-item>
              <a-form-item label="지표1 : 맞춤형 주문 생산 가능 수량">
                <a-input />
              </a-form-item>
              <a-form-item label="지표2 : 신규 제품 출시 수">
                <a-input />
              </a-form-item>
              <a-form-item label="지표3 : 고객의 상담 대기시간">
                <a-input />
              </a-form-item>
              <a-form-item label="지표4 : B2B 견적 시간">
                <a-input />
              </a-form-item>
              <a-form-item label="지표5 : 인건비 원가 비중">
                <a-input />
              </a-form-item>
              <a-form-item>
                <a-button type="primary" html-type="submit">
                  지표전송 v3
                </a-button>
              </a-form-item>
            </a-form>
          </template>
        </a-card>
        <!-- / System Level 2 Card -->

      </a-col>

    </a-row>

  </div>

</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      level1_createdAt: '',
      level1_sentAt: '',
    };
  },
  beforeCreate() {
    this.formLevel1 = this.$form.createForm(this);
    this.formLevel2 = this.$form.createForm(this);
    this.formLevel3 = this.$form.createForm(this);
  },
  methods: {
    handleSubmitLevel1(e) {
      e.preventDefault();

      const data = {
        'KPILEVEL1': [
              {
                kpiCertKey: process.env.VUE_APP_KPI_CERT_KEY,
                ocrDttm: this.level1_createdAt,
                systmOprYn: 'Y',
                trsDttm: this.level1_sentAt,
             }
            ]
      };
      console.log(JSON.stringify(data));
      axios.post('/kpiLv1/kpiLv1InsertTst', data).then((res) => {
        console.log(res.status);
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss">
</style>
