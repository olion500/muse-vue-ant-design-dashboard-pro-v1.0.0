<template>
  <a-col>
    <h5 class="mb-0 font-semibold">{{ this.option.option.name }}</h5>
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

      <template #switcherIcon="{ dataRef, defaultIcon }">
        <span style="display: none;"></span>
      </template>
    </a-tree>
  </a-col>
</template>

<script>
const treeData = [
  {
    title: 'parent 0',
    key: '0',
  },
  {
    title: 'parent 1',
    key: '1',
  },
  {
    title: 'parent 2',
    key: '2',
  },
  {
    title: 'parent 3',
    key: '3',
  },
  {
    title: 'parent 4',
    key: '4',
  },
];

export default {
  props: {
    option: {},
  },
  data() {
    return {
      checkedKeys: [],
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
</style>
