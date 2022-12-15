<template>
  <a-col>
    <h5 class="mb-0 font-semibold">옵션이름</h5>
    <a-tree
        v-model:checkedKeys="checkedKeys"
        checkable
        defaultExpandAll
        :tree-data="treeData"
    >
      <template #title="{ title, key }">
        <span>{{ title }}</span>
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
  },
  data() {
    return {
      treeData,
      checkedKeys: [],
    };
  },
  methods: {
  },
};
</script>
