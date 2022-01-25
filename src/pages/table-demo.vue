<template>
  <a-input
    v-model:value="displayName"
    style="width: 200px"
    :placeholder="$t('displayName')" />
  <a-button type="primary">{{$t('btnSearch')}}</a-button>

  <div class="container">
    <div class="con-item">
      <a-button type="primary" ghost>{{$t('btnAdd')}}</a-button>
    </div>
    <div class="con-item">
      <a-button type="primary" ghost :disabled="btnState.edit">{{$t('btnEdit')}}</a-button>
    </div>
    <div class="con-item">
      <a-button type="primary" ghost :disabled="btnState.enable">{{$t('btnEnable')}}</a-button>
    </div>
    <div class="con-item">
      <a-button type="primary" ghost :disabled="btnState.disable">{{$t('btnDisable')}}</a-button>
    </div>
  </div>
  <a-table
    :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
    :dataSource="dataSource.data"
    :columns="columns"
    rowKey="id"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'xaxab'">
        {{record.delete ? 'Yes' : 'No'}}
      </template>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted, computed, watch } from 'vue'
  import { taskManInfo } from '../server/request'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  let dataSource = reactive({data: []})
  onMounted(async () => {
    type YY = {
      status: any,
      data: any
    }
      dataSource.data = [
        {
          id: '12',
          name: 'aa',
          state: 'enable',
          delete: true
        },
        {
          id: '123',
          name: 'bb',
          state: 'disable',
          delete: false
        },
        {
          id: '1234',
          name: 'cc',
          state: 'enable',
          delete: false
        },
        {
          id: '12345',
          name: 'dd',
          state: 'disable',
          delete: false
        }
      ]
  });
  const columns = [
    {
      title: t('id'),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('displayName'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('state'),
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: t('delete'),
      dataIndex: 'xaxab',
      key: 'xaxab',
    }
  ]
  let displayName = ref<string>('')

  type Key = string | number;
  const state = reactive<{
      selectedRowKeys: Key[];
      loading: boolean;
    }>({
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
    });
    const hasSelected = computed(() => state.selectedRowKeys.length > 0);
    const onSelectChange = (selectedRowKeys: Key[]) => {
      // console.log('selectedRowKeys changed: ', selectedRowKeys);
      state.selectedRowKeys = selectedRowKeys;
    };
    let btnState = reactive({ edit: true, enable: true, disable: true })
    watch(
      () => state.selectedRowKeys,
      (count) => {
        if (count.length === 0) {
          btnState.edit = true
          btnState.enable = true
          btnState.disable = true
          return
        }
        btnState.edit = false
        const selectedRow = dataSource.data.filter(d => count.includes(d.id))
        const findEnableRow = selectedRow.every(r => r.state !== 'enable')
        btnState.enable = !findEnableRow
        btnState.disable = !selectedRow.every(r => r.state !== 'disable')
      }
    )
</script>

<style scoped lang="scss">
.container {
  display: inline-block;
}
.con-item {
  padding: 4px;
  display: inline-block;
}
</style>
