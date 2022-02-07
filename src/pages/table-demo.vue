<template>
  <a-input
    v-model:value="filters.tagName"
    style="width: 200px"
    :placeholder="$t('displayName')" />
  <a-button type="primary" @click="getTableData">{{$t('btnSearch')}}</a-button>

  <div class="container">
    <div class="con-item">
      <a-button type="primary" ghost @click="addRows">{{$t('btnAdd')}}</a-button>
    </div>
    <div class="con-item">
      <a-button type="primary" ghost :disabled="btnState.edit" @click="editRows">{{$t('btnEdit')}}</a-button>
    </div>
    <div class="con-item">
      <a-button type="primary" ghost :disabled="btnState.enable" @click="changeStatus('enable')">{{$t('btnDisable')}}</a-button>
    </div>
    <div class="con-item">
      <a-button type="primary" ghost :disabled="btnState.disable" @click="changeStatus('disable')">{{$t('btnEnable')}}</a-button>
    </div>
    <div class="con-item">
      <a-button danger ghost :disabled="btnState.delete"  @click="deleteRows">{{$t('btnDelete')}}</a-button>
    </div>
    <div class="con-item">
      <a-upload
        name="filename"
        :action="uploadUrl"
        headers="headers"
        @change="uploadChange"
        :showUploadList="false"
      >
        <a-button type="primary" ghost>
          <upload-outlined></upload-outlined>
          {{$t('btnUpload')}}
        </a-button>
      </a-upload>
    </div>
    <!-- <div class="con-item">
      <a-button danger ghost :disabled="btnState.download"  @click="downloadRows">{{$t('btnDownload')}}</a-button>
    </div> -->
  </div>
  <a-table
    :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }"
    :dataSource="dataSource.data"
    :pagination="pagination"
    :columns="columns"
    rowKey="tagId"
    :ellipsis="true"
    @change="handleTableChange"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'status'">
        {{record.status === 0 ? $t('btnDisable') : $t('btnEnable')}}
      </template>
    </template>
  </a-table>

  <a-modal
    v-model:visible="modalConfig.visible"
    :title="modalConfig.isAdd ? $t('btnAdd') : $t('btnEdit') + modalConfig.title"
    :ok-text="$t('btnConfirm')"
    :width="800"
    size="small"
    :cancel-text="$t('btnCancel')"
    @ok="addOk"
    @cancel="addCancel">
    <a-table :columns="calcCols()" :data-source="modalConfig.rows" :pagination="false" bordered>
      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.type === 'Input'">
          <div>
            <a-input
              v-model:value="modalConfig.rows[index][column.dataIndex]"
            />
          </div>
        </template>
      </template>
    </a-table>
  </a-modal>
</template>

<script lang="ts" setup>
  import type { UnwrapRef } from 'vue'
  import { ref, reactive, onMounted, computed, watch } from 'vue'
  import { UploadOutlined } from '@ant-design/icons-vue'
  import { Modal, message } from 'ant-design-vue'
  import { cloneDeep } from 'lodash-es'
  import { getTags, editTag, addTags, deleteTag, enableTags, disableTags } from '../server/request'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
  let dataSource = reactive({data: [], total: 0})
  const pageSize = reactive([10,20,30])
  onMounted(async () => {
    type YY = {
      errorCode: any,
      data: any
    }
    getTableData()
  });
  const columns = [
    {
      title: t('id'),
      dataIndex: 'tagId',
      key: 'tagId',
      edit: false,
      add: false
    },
    {
      title: t('displayName'),
      dataIndex: 'tagName',
      key: 'tagName',
      edit: true,
      add: true,
      type: 'Input'
    },
    {
      title: t('description'),
      dataIndex: 'description',
      key: 'description',
      edit: true,
      add: true,
      type: 'Input'
    },
    {
      title: t('userCount'),
      dataIndex: 'userCount',
      key: 'userCount',
      edit: false,
      add: false
    },
    {
      title: t('status'),
      dataIndex: 'status',
      key: 'status',
      edit: false,
      add: false
    },
    {
      title: t('version'),
      dataIndex: 'version',
      key: 'version',
      edit: false,
      add: false
    }
  ]
  const emptyRow = {}
  columns.forEach(c => {
    if (c.add) {
      emptyRow[c.key] = ''
    }
  })
  let pagination = reactive({
    total: 0,
    current: 0,
    pageSize: 10,
  })
  const filters = reactive({tagName: ''})
  const handleTableChange = (pag: any) => {
    pagination.current = pag.current
    pagination.pageSize = pag.pageSize
    getTableData()
  }
  const getTableData = async () => {
    clearAllSelect()
    const params = {
      paging: pagination,
      filters: []
    }
    Object.keys(filters).forEach(k => {
      params.filters.push(
        {
          name: k,
          operator: 'contains',
          value: filters[k]
        }
      )
    })
    const res = await getTags(params)
    if (res.errorCode === 0) {
      dataSource.data = res.data.result
      pagination.total = res.data.pageInfo.total
    }
  }
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
    }
    const clearAllSelect = () => {
      state.selectedRowKeys = []
    }
    let btnState = reactive({ edit: true, enable: true, disable: true, delete: true, download: true })
    watch(
      () => state.selectedRowKeys,
      (count) => {
        if (count.length === 0) {
          btnState.edit = true
          btnState.enable = true
          btnState.disable = true
          btnState.delete = true
          btnState.download = true
          return
        }
        btnState.edit = false
        btnState.delete = false
        btnState.download = false
        const selectedRow = dataSource.data.filter(d => count.includes(d.tagId))
        const findEnableRow = selectedRow.every(r => r.status !== 0)
        btnState.enable = !findEnableRow
        btnState.disable = !selectedRow.every(r => r.status !== 1)
      }
    )
    const uploadUrl = '/customer/tags/upload'
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
  const calcCols = () => {
    if (modalConfig.isAdd) {
      return columns.filter(c => {
        if (c.add) {
          return c
        }
      })
    } else {
      return columns.filter(c => {
        if (c.add) {
          return c
        }
      })
    }
  }
  const addRows = () => {
    modalConfig.rows.push(emptyRow)
    modalConfig.visible = true
    modalConfig.isAdd = true
  }
  const addOk = async () => {
    modalConfig.visible = false
    const method = modalConfig.isAdd ? addTags : editTag
    const res = await method(modalConfig.rows)
    if (res.errorCode === 0) {
      message.success(res.errorMessage)
      getTableData()
      clearAllSelect()
    }
  }
  const addCancel = () => {
    modalConfig.visible = false
    modalConfig.isAdd = true
    getTableData()
  }
  const editRows = () => {
    getRowsData()
    modalConfig.visible = true
    modalConfig.isAdd = false
  }
  // 模态框-结束
  const getRowsData = () => {
    const selectedRow = dataSource.data.filter(d => state.selectedRowKeys.includes(d.tagId))
    modalConfig.rows = JSON.parse(JSON.stringify(selectedRow))
  }
  const deleteRows = () => {
    Modal.confirm({
      title: t('btnDelete'),
      content: t('deleteTip'),
      async onOk() {
        const keys = state.selectedRowKeys.map(key => key)
        const res = await deleteTag(keys)
        if (res.errorCode === 0) {
          message.success(res.errorMessage)
          getTableData()
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onCancel() {
        clearAllSelect()
      },
    })
  }

  const changeStatus = (status: string) => {
    Modal.confirm({
      title: t('btnDelete'),
      content: t('deleteTip'),
      async onOk() {
        const method = status === 'enable' ? disableTags: enableTags
        const keys = state.selectedRowKeys.map(key => key)
        const res = await method(keys)
        if (res.errorCode === 0) {
          message.success(res.errorMessage)
          getTableData()
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onCancel() {
        clearAllSelect()
      },
    })
  }

  const uploadChange = (res:any) => {
    if (res.file.response.errorCode === 0) {
      message.success(res.file.response.errorMessage)
      getTableData()
    } else {
      message.error(res.file.response.errorMessage)
    }
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
