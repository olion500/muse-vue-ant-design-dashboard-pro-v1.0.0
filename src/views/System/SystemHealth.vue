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
                <a-input v-model="level2_createdAt" placeholder="YYYYMMDD" />
              </a-form-item>
              <a-form-item label="전송일시">
                <a-input v-model="level2_sentAt" placeholder="YYYYMMDD" />
              </a-form-item>
              <a-form-item label="지표1 : 맞춤형 주문 생산 가능 수량">
                <a-input v-model="level2_figure1"/>
              </a-form-item>
              <a-form-item label="지표2 : 신규 제품 출시 수">
                <a-input v-model="level2_figure2"/>
              </a-form-item>
              <a-form-item label="지표3 : 고객의 상담 대기시간">
                <a-input v-model="level2_figure3"/>
              </a-form-item>
              <a-form-item label="지표4 : B2B 견적 시간">
                <a-input v-model="level2_figure4"/>
              </a-form-item>
              <a-form-item label="지표5 : 인건비 원가 비중">
                <a-input v-model="level2_figure5"/>
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
                <a-input v-model="level3_createdAt" placeholder="YYYYMMDD" />
              </a-form-item>
              <a-form-item label="전송일시">
                <a-input v-model="level3_sentAt" placeholder="YYYYMMDD" />
              </a-form-item>
              <a-form-item label="지표1 : 맞춤형 주문 생산 가능 수량">
                <a-input v-model="level3_figure1"/>
              </a-form-item>
              <a-form-item label="지표2 : 신규 제품 출시 수">
                <a-input v-model="level3_figure2"/>
              </a-form-item>
              <a-form-item label="지표3 : 고객의 상담 대기시간">
                <a-input v-model="level3_figure3"/>
              </a-form-item>
              <a-form-item label="지표4 : B2B 견적 시간">
                <a-input v-model="level3_figure4"/>
              </a-form-item>
              <a-form-item label="지표5 : 인건비 원가 비중">
                <a-input v-model="level3_figure5"/>
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

      level2_createdAt: '',
      level2_sentAt: '',
      level2_figure1: '',
      level2_figure2: '',
      level2_figure3: '',
      level2_figure4: '',
      level2_figure5: '',

      level3_createdAt: '',
      level3_sentAt: '',
      level3_figure1: '',
      level3_figure2: '',
      level3_figure3: '',
      level3_figure4: '',
      level3_figure5: '',
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
      const url = `${process.env.VUE_APP_API_HOST}/system/kpi1`;

      axios.post(url, data).then((res) => {
        console.log(res.status);
      });
    },
    handleSubmitLevel2(e) {
      e.preventDefault();

      const data = {
        'KPILEVEL2': [
          {
            kpiCertKey: process.env.VUE_APP_KPI_CERT_KEY,
            ocrDttm: this.level2_createdAt,
            kpiFldCd: 'P',
            kpiDtlCd: 'B',
            kpiDtlNm: '맞춤형 주문 생산 가능 수량',
            achrt: this.level2_figure1,
            trsDttm: this.level2_sentAt,
          },
          {
            kpiCertKey: process.env.VUE_APP_KPI_CERT_KEY,
            ocrDttm: this.level2_createdAt,
            kpiFldCd: 'P',
            kpiDtlCd: 'E',
            kpiDtlNm: '신규 제품 출시 수',
            achrt: this.level2_figure2,
            trsDttm: this.level2_sentAt,
          },
          {
            kpiCertKey: process.env.VUE_APP_KPI_CERT_KEY,
            ocrDttm: this.level2_createdAt,
            kpiFldCd: 'Q',
            kpiDtlCd: 'Z',
            kpiDtlNm: '고객의 상담 대기시간',
            achrt: this.level2_figure3,
            trsDttm: this.level2_sentAt,
          },
          {
            kpiCertKey: process.env.VUE_APP_KPI_CERT_KEY,
            ocrDttm: this.level2_createdAt,
            kpiFldCd: 'D',
            kpiDtlCd: 'Z',
            kpiDtlNm: 'B2B 견적 시간',
            achrt: this.level2_figure4,
            trsDttm: this.level2_sentAt,
          },
          {
            kpiCertKey: process.env.VUE_APP_KPI_CERT_KEY,
            ocrDttm: this.level2_createdAt,
            kpiFldCd: 'C',
            kpiDtlCd: 'H',
            kpiDtlNm: '인건비 원가 비중',
            achrt: this.level2_figure5,
            trsDttm: this.level2_sentAt,
          },
        ]
      };
      const url = `${process.env.VUE_APP_API_HOST}/system/kpi2`;

      axios.post(url, data).then((res) => {
        console.log(res.status);
      });
    },

    handleSubmitLevel3(e) {
      e.preventDefault();

      const data = {
        'KPILEVEL3': [
          {
            kpiCertKey: process.env.VUE_APP_KPI_CERT_KEY,
            ocrDttm: this.level3_createdAt,
            kpiFldCd: 'P',
            kpiDtlCd: 'B',
            kpiDtlNm: '맞춤형 주문 생산 가능 수량',
            msmtVl: this.level3_figure1,
            unt: '수량',
            trsDttm: this.level3_sentAt,
          },
          {
            kpiCertKey: process.env.VUE_APP_KPI_CERT_KEY,
            ocrDttm: this.level3_createdAt,
            kpiFldCd: 'P',
            kpiDtlCd: 'E',
            kpiDtlNm: '신규 제품 출시 수',
            msmtVl: this.level3_figure2,
            unt: '수량',
            trsDttm: this.level3_sentAt,
          },
          {
            kpiCertKey: process.env.VUE_APP_KPI_CERT_KEY,
            ocrDttm: this.level3_createdAt,
            kpiFldCd: 'Q',
            kpiDtlCd: 'Z',
            kpiDtlNm: '고객의 상담 대기시간',
            msmtVl: this.level3_figure3,
            unt: '분',
            trsDttm: this.level3_sentAt,
          },
          {
            kpiCertKey: process.env.VUE_APP_KPI_CERT_KEY,
            ocrDttm: this.level3_createdAt,
            kpiFldCd: 'D',
            kpiDtlCd: 'Z',
            kpiDtlNm: 'B2B 견적 시간',
            msmtVl: this.level3_figure4,
            unt: '일',
            trsDttm: this.level3_sentAt,
          },
          {
            kpiCertKey: process.env.VUE_APP_KPI_CERT_KEY,
            ocrDttm: this.level3_createdAt,
            kpiFldCd: 'C',
            kpiDtlCd: 'H',
            kpiDtlNm: '인건비 원가 비중',
            msmtVl: this.level3_figure5,
            unt: '%',
            trsDttm: this.level3_sentAt,
          },
        ]
      };
      const url = `${process.env.VUE_APP_API_HOST}/system/kpi3`;

      axios.post(url, data).then((res) => {
        console.log(res.status);
      });
    },
  },
};
</script>

<style lang="scss">
</style>
