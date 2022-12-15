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
            title="상품선택"
            :isAddButtonVisible='true'
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

import CardProduct from "../../components/Cards/CardProducts"
import CardProductBasicInfo from "../../components/Cards/CardProductBasicInfo"
import axios from "axios";

let selectedProduct = {
  title: '',
  description: ''
};

export default ({
  components: {
    CardProduct,
    CardProductBasicInfo,
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
  data() {
    return {
      productData: [],
      selectedProduct
    }
  },
  methods: {
    fetchData() {
      const url = `${process.env.VUE_APP_API_HOST}/products`;
      axios.get(url)
          .then((res) => {
            this.productData= res.data;
          });
    },
    selectProduct(item) {
      this.selectedProduct = item;
    }
  }
})

</script>

<style lang="scss">
</style>
