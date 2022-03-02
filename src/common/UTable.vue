<script setup>
const props = defineProps({
  data: {
    type: Array
  },
  columns: {
    type: Array
  },
  selectable: {
    type: Boolean,
    default: false
  }
});
</script>

<script>
export default {
  emits: ["select", "current"],
  data() {
    return {
      height: 300
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.height = this.$refs.table.offsetHeight;
    });
  },
  methods: {
    handleSelectionChange(value) {
      this.$emit("select", value);
    },
    handleCurrentChange(value) {
      this.$emit("current", value);
    }
  }
};
</script>

<template>
  <div ref="table">
    <ElTable
      :data="data"
      border
      row-key="id"
      :height="height"
      class="inner-table"
      highlight-current-row
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
    >
      <el-table-column v-if="selectable" type="selection" width="55" />
      <template v-for="col in columns">
        <ElTableColumn
          v-if="col.slot"
          :key="col.slot"
          :label="col.title"
          :width="col.width || ''"
          :fixed="col.fixed || false"
        >
          <template #default="{row, $index}">
            <div>
              <slot :name="col.slot" :row="row" :index="$index" />
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn
          v-else
          :key="col.key"
          :prop="col.key"
          :label="col.title"
          :width="col.width || ''"
          :fixed="col.fixed || false"
        >
        </ElTableColumn>
      </template>
    </ElTable>
  </div>
</template>

<style scoped>
.inner-table {
  height: 100%;
}
</style>
