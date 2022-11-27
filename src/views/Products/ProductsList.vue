<!--
	This is the Billing page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>

    <a-row type="flex" :gutter="24">

      <!-- Invoices Column -->
      <a-col :span="24" :md="8" class="mb-24">
        <p>{{selectedProduct}}</p>

        <!-- Invoices Card -->
        <CardProduct
            :data="productData"
        ></CardProduct>
        <!-- / Invoices Card -->


      </a-col>
      <!-- / Invoices Column -->

      <!-- Billing Info Column -->
      <a-col :span="24" :md="16">
        <a-row type="flex" :gutter="24">
          <a-col :span="24" class="mb-24">

            <CardProductBasicInfo
              :data="{title: 'asdf', description: 'fdsa'}"></CardProductBasicInfo>

          </a-col>
          <a-col :span="24" class="mb-24">

            <!-- Payment Methods Card -->
            <CardPaymentMethods></CardPaymentMethods>
            <!-- Payment Methods Card -->

          </a-col>
        </a-row>
      </a-col>
      <!-- / Billing Info Column -->



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
] ;

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
    }
  },
})

</script>

<style lang="scss">
</style>
