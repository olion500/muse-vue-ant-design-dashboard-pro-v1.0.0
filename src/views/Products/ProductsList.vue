<!--
	This is the Product page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>

    <a-row type="flex" :gutter="24">

      <!-- Product Column -->
      <a-col :span="24" :md="8" class="mb-24">

        <!-- Products Card -->
        <CardProduct
            :data="productData"
            v-on:selected="(item) => selectProduct(item)"
        ></CardProduct>
        <!-- / Products Card -->


      </a-col>
      <!-- / Products Column -->

      <!-- Product Info Column -->
      <a-col :span="24" :md="16">
        <a-row type="flex" :gutter="24">
          <a-col :span="24" class="mb-24">

            <CardProductBasicInfo
              :product="this.selectedProduct"></CardProductBasicInfo>

          </a-col>
          <a-col :span="24" class="mb-24">

          </a-col>
        </a-row>
      </a-col>
      <!-- / Product Info Column -->



    </a-row>
  </div>
</template>

<script>

import CardCredit from "../../components/Cards/CardCredit"
import WidgetSalary from "../../components/Widgets/WidgetSalary"
import CardPaymentMethods from "../../components/Cards/CardPaymentMethods"
import CardProduct from "../../components/Cards/CardProducts"
import CardProductBasicInfo from "../../components/Cards/CardProductBasicInfo"
import CardBillingInfo from "../../components/Cards/CardBillingInfo"
import CardTransactions from "../../components/Cards/CardTransactions"

// "Product" list data.
const productData = [
  {
    title: "산책와펜",
    description: "이것이 설명"
  },
  {
    title: "편안한인식표",
    description: "이것은 설명 2"
  },
];

let selectedProduct = {
  title: '',
  description: ''
};

export default ({
  components: {
    CardCredit,
    WidgetSalary,
    CardPaymentMethods,
    CardProduct,
    CardProductBasicInfo,
    CardBillingInfo,
    CardTransactions,
  },
  data() {
    return {
      productData,
      selectedProduct
    }
  },
  methods: {
    selectProduct(item) {
      this.selectedProduct = item;
    }
  }
})

</script>

<style lang="scss">
</style>
