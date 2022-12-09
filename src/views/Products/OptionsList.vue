<!--
	This is the Option page, it uses the dashboard layout in:
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>

    <a-row type="flex" :gutter="24">

      <!-- Option Column -->
      <a-col :span="24" :md="8" class="mb-24">

        <!-- Products Card -->
        <CardProduct
            :data="optionData"
            title="옵션선택"
            :isAddButtonVisible='false'
            v-on:selected="(item) => selectOptionGroup(item)"
        ></CardProduct>
        <!-- / Products Card -->


      </a-col>
      <!-- / Products Column -->

      <!-- Product Info Column -->
      <a-col :span="24" :md="16">
        <a-row type="flex" :gutter="24">
          <a-col :span="24" class="mb-24">

            <CardOptionTable
                :optionGroup="this.selectedOptionGroup"
                :options="this.selectedOptionGroup.options"
            ></CardOptionTable>

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
import CardOptionTable from "../../components/Cards/CardOptionTable"
import axios from "axios";

let selectedOptionGroup = {
  id: 0,
  name: '',
  options: [],
};

export default ({
  components: {
    CardProduct,
    CardOptionTable,
  },
  data() {
    return {
      optionData: [],
      selectedOptionGroup
    }
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
      const url = `${process.env.VUE_APP_API_HOST}/options`;
      axios.get(url)
      .then((res) => {
        this.optionData = res.data;
      });
    },
    selectOptionGroup(item) {
      this.selectedOptionGroup = item;
    }
  }
})

</script>

<style lang="scss">
</style>
