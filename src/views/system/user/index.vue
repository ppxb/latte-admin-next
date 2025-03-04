<script setup lang="tsx">
import { NButton, NIcon, NPopconfirm, NTag } from 'naive-ui'

import { fetchGetUserList } from '~/apis/system'
import SvgIcon from '~/components/common/svg-icon.vue'
import { useTable, useTableOperate } from '~/hooks/use-table'

import UserSearch from './components/user-search.vue'

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  searchParams,
  mobilePagination,
  resetSearchParams,
} = useTable({
  apiFn: fetchGetUserList,
  showTotal: true,
  apiParams: {
    page: 1,
    size: 10,
    description: null,
    status: null,
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48,
    },
    {
      key: 'index',
      title: '序号',
      align: 'center',
      width: 64,
    },
    {
      key: 'nickname',
      title: '昵称',
      align: 'center',
      minWidth: 100,
    },
    {
      key: 'username',
      title: '用户名',
      align: 'center',
      minWidth: 100,
    },
    {
      key: 'status',
      title: '状态',
      align: 'center',
      width: 100,
      render: row => {
        if (row.status === null){
          return null
        }

        const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
          0: 'warning',
          1: 'success',
        }

        const label = row.status === 1 ? '启用' : '禁用'

        return (
          <NTag
            round
            bordered={false}
            type={tagMap[row.status as Api.Common.EnableStatus]}
            v-slots={{
              icon: () => (
                <NIcon size={16}>
                  <SvgIcon icon="carbon:checkmark-filled" />
                </NIcon>
              ),
            }}
          >
            {label}
          </NTag>
        )
      },
    },
    {
      key: 'deptName',
      title: '所属部门',
      align: 'center',
      minWidth: 120,
    },
    {
      key: 'phone',
      title: '手机号',
      align: 'center',
      width: 120,
    },
    {
      key: 'email',
      title: '邮箱',
      align: 'center',
      width: 200,
    },
    {
      key: 'description',
      title: '描述',
      align: 'center',
      minWidth: 100,
    },
    {
      key: 'createTime',
      title: '创建时间',
      align: 'center',
      minWidth: 200,
    },
    {
      key: 'operate',
      title: '操作',
      align: 'center',
      width: 130,
      render: row => (
        <div class="flex items-center gap-2">
          <NButton type="primary" ghost size="small" onClick={() => edit(row.id)}>
            编辑
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => '确认要删除吗',
              trigger: () => (
                <NButton type="error" ghost size="small">
                  删除
                </NButton>
              ),
            }}
          </NPopconfirm>
        </div>
      ),
    },
  ],
})

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted,
} = useTableOperate(data, getData)

async function handleBatchDelete() {
  console.log(checkedRowKeys.value)

  onBatchDeleted()
}

function handleDelete(id: number) {
  console.log(id)
  onDeleted()
}

function edit(id: number) {
  handleEdit(id)
}

function resetSearch() {
  resetSearchParams()
  getDataByPage()
}
</script>

<template>
  <div class="min-h-500px flex flex-col items-stretch gap-4 overflow-hidden lt-sm:overflow-auto">
    <UserSearch v-model:model="searchParams" @reset="resetSearch" @search="getDataByPage" />
    <NCard title="用户管理" :bordered="false" size="small" class="sm:(flex-1 overflow-hidden) rounded-2">
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        :scroll-x="962"
        :loading="loading"
        :row-key="row => row.id"
        :pagination="mobilePagination"
        size="small"
        remote
        class="sm:h-full"
      />
    </NCard>
  </div>
</template>
