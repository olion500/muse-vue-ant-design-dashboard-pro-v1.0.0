<template>
  <a-col>
    <a-row class="mb-24">
      <a-checkbox v-model:checked="enabled">
        <h5 class="font-semibold"> {{ this.option.option.name }} </h5>
      </a-checkbox>
    </a-row>

    <a-tree
        v-model:checkedKeys="checkedKeys"
        checkable
        defaultExpandAll
        :selectable="false"
        :tree-data="treeData"
    >
      <template #title="{ title, key }">
        <span>{{ title }}</span>
      </template>

    </a-tree>

    <a-form-item class="mb-10 mt-10" label="1 구매시 사용량" :colon="false">
      <a-input v-model="consume"></a-input>
    </a-form-item>

  </a-col>
</template>

<script>
import axios from "axios";

export default {
  props: {
    option: {},
    bus: {
      type: Object,
      required: true,
    }
  },
  watch: {
    option: function (newOption) {
      this.checkedKeys = newOption.enabledOptions;
      this.consume = newOption.consume;
      this.enabled = newOption.enabled;
    }
  },
  created() {
    this.bus.$on('save', () => {
      const url = `${process.env.VUE_APP_API_HOST}/products/options/${this.option.id}`;
      const data = {
        "consume": this.consume,
        "enabled": this.enabled,
        "enabledOptions": this.checkedKeys,
      };

      axios.patch(url, data)
          .then((res) => {
            console.log('product option updated');
          });
    });
  },
  data() {
    return {
      checkedKeys: this.option.enabledOptions,
      consume: this.option.consume,
      enabled: this.option.enabled,
    };
  },
  computed: {
    treeData() {
        return this.option.option.options.map(option => {
          return { title: option.name, key: option.id };
          });
    },
  },
  methods: {
  },
};
</script>

<style lang="scss">
.ant-tree-switcher {
  display: none !important;
}

h5 {
  display: inline;
}
</style>
