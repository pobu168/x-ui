<template>
  <a-input
    v-model:value="displayName"
    style="width: 200px"
    :placeholder="$t('displayName')" />
  <a-button type="primary">{{$t('btnSearch')}}</a-button>

  <div class="container">
    <div class="con-item">
      <a-button type="primary" ghost @click="addRows">{{$t('btnAdd')}}</a-button>
    </div>
    <div class="con-item">
      <a-button type="primary" ghost :disabled="btnState.edit" @click="editRows">{{$t('btnEdit')}}</a-button>
    </div>
    <div class="con-item">
      <a-button type="primary" ghost :disabled="btnState.enable">{{$t('btnEnable')}}</a-button>
    </div>
    <div class="con-item">
      <a-button type="primary" ghost :disabled="btnState.disable">{{$t('btnDisable')}}</a-button>
    </div>
    <div class="con-item">
      <a-button danger ghost :disabled="btnState.delete">{{$t('btnDelete')}}</a-button>
    </div>
    <div class="con-item">
      <a-upload
        name="file"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        headers="headers"
      >
        <a-button type="primary" ghost>
          <upload-outlined></upload-outlined>
          {{$t('btnUpload')}}
        </a-button>
      </a-upload>
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

  <a-modal
    v-model:visible="modalConfig.visible"
    :title="modalConfig.isAdd ? $t('btnAdd') : $t('btnEdit') + modalConfig.title"
    :ok-text="$t('btnConfirm')"
    :width="500"
    size="middle"
    :cancel-text="$t('btnCancel')"
    @ok="addOk"
    @cancel="addCancel">
    <a-table :columns="columns" :data-source="modalConfig.rows" :pagination="false" bordered>
      <template #bodyCell="{ column, text, record }">
      {{record.id}}
        <!-- <template v-if="column.type === 'Input'">
          <div>
            <a-input
              v-model:value="record[column.key]"
            />
          </div>
        </template> -->
      </template>
    </a-table>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive, onMounted, computed, watch } from 'vue'
  import { UploadOutlined } from '@ant-design/icons-vue';
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
      edit: false,
      add: false
    },
    {
      title: t('displayName'),
      dataIndex: 'name',
      key: 'name',
      edit: true,
      add: true,
      type: 'Input'
    },
    {
      title: t('state'),
      dataIndex: 'state',
      key: 'state',
      edit: true,
      add: true,
      type: 'Input'
    },
    {
      title: t('delete'),
      dataIndex: 'xaxab',
      key: 'xaxab',
      edit: true,
      add: true,
      type: 'Input'
    }
  ]
  let displayName = ref<string>('')
  // btn控制-开始
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
      state.selectedRowKeys = selectedRowKeys;
    };
    let btnState = reactive({ edit: true, enable: true, disable: true, delete: true })
    watch(
      () => state.selectedRowKeys,
      (count) => {
        if (count.length === 0) {
          btnState.edit = true
          btnState.enable = true
          btnState.disable = true
          btnState.delete = true
          return
        }
        btnState.edit = false
        btnState.delete = false
        const selectedRow = dataSource.data.filter(d => count.includes(d.id))
        const findEnableRow = selectedRow.every(r => r.state !== 'enable')
        btnState.enable = !findEnableRow
        btnState.disable = !selectedRow.every(r => r.state !== 'disable')
      }
    )
  // btn控制-结束

  // 模态框-开始
  const modalConfig = reactive<{
    visible: boolean,
    isAdd: boolean,
    title: string,
    rows: any
  }>({
    visible: false,
    isAdd: true,
    title: t('tag'),
    rows: []
  })
  const addRows = () => {
    modalConfig.visible = true
    modalConfig.isAdd = true
  }
  const addOk = () => {
    console.log(modalConfig.rows)
    modalConfig.visible = false
  }
  const addCancel = () => {
    modalConfig.visible = false
    modalConfig.isAdd = true
  }
  const editRows = () => {
    getRowsData()
    modalConfig.visible = true
    modalConfig.isAdd = false
  }
  // 模态框-结束
  const getRowsData = () => {
    console.log(state.selectedRowKeys)
    const selectedRow = dataSource.data.filter(d => state.selectedRowKeys.includes(d.id))
    console.log(selectedRow)
    modalConfig.rows = selectedRow
  }
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
