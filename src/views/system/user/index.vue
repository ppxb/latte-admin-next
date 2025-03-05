<script setup lang="tsx">
import { NButton, NIcon, NPopconfirm, NTag } from 'naive-ui'

import { fetchGetUserList } from '~/apis/system'
import SvgIcon from '~/components/common/svg-icon.vue'
import TagGroup from '~/components/TagGroup.vue'
import { useTable, useTableOperate } from '~/hooks/use-table'

import UserOperateDrawer from './components/UserOperateDrawer.vue'
import UserSearch from './components/UserSearch.vue'
import { isMobile } from '~/utils'

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
      fixed: 'left',
    },
    {
      key: 'index',
      title: '序号',
      width: 64,
      fixed: 'left',
      align: 'center',
    },
    {
      key: 'nickname',
      title: '昵称',
      minWidth: 140,
      align: 'center',
      fixed: 'left',
    },
    {
      key: 'username',
      title: '用户名',
      align: 'center',
      minWidth: 140,
    },
    {
      key: 'status',
      title: '状态',
      align: 'center',
      minWidth: 140,
      render: row => {
        const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
          1: 'success',
          2: 'warning',
        }

        const label = row.status === 1 ? '启用' : '禁用'

        return (
          <NTag
            round
            bordered={false}
            type={tagMap[row.status]}
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
      minWidth: 180,
    },
    {
      key: 'roleNames',
      title: '角色',
      minWidth: 120,
      align: 'center',
      render: row => (
        <TagGroup tags={row.roleNames} />
      ),
    },
    {
      key: 'phone',
      title: '手机号',
      align: 'center',
      minWidth: 170,
    },
    {
      key: 'email',
      title: '邮箱',
      align: 'center',
      minWidth: 170,
    },
    {
      key: 'description',
      title: '描述',
      align: 'center',
      minWidth: 130,
    },
    {
      key: 'createTime',
      title: '创建时间',
      align: 'center',
      width: 200,
    },
    {
      key: 'operate',
      title: '操作',
      align: 'center',
      width: 160,
      fixed: 'right',
      render: row => (
        <div class="flex items-center justify-center gap-2">
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
  onBatchDeleted()
}

function handleDelete(id: Api.Common.CommonId) {
  onDeleted()
}

function edit(id: Api.Common.CommonId) {
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
      <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template>
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        :scroll-x="1800"
        :loading="loading"
        :row-key="row => row.id"
        :pagination="mobilePagination"
        size="small"
        remote
        class="sm:h-full"
      />
      <UserOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>
