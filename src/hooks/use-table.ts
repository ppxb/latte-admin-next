import type { PaginationProps } from 'naive-ui'

import { cloneDeep } from 'lodash-es'
import { isMobile } from '~/utils'
import useBoolean from './use-boolean'
import useHookTable from './use-hook-table'

type TableData = NaiveUI.TableData

type GetTableData<A extends NaiveUI.TableApiFn> = NaiveUI.GetTableData<A>

type TableColumn<T> = NaiveUI.TableColumn<T>

export function useTable<A extends NaiveUI.TableApiFn>(config: NaiveUI.NaiveTableConfig<A>){
  const scope = effectScope()

  const { apiFn, apiParams, immediate, showTotal } = config

  const SELECTION_KEY = '__selection__'

  const EXPAND_KEY = '__expand__'

  const {
    loading,
    empty,
    data,
    columns,
    columnChecks,
    searchParams,
    getData,
    updateSearchParams,
    reloadColumns,
    resetSearchParams,
  } = useHookTable<A, GetTableData<A>, TableColumn<NaiveUI.TableDataWithIndex<GetTableData<A>>>>({
    apiFn,
    apiParams,
    columns: config.columns,
    transformer: res => {
      const { list = [], page = 1, size = 10, total = 0 } = res.data || {}
      const pageSize = size <= 0 ? 10 : size

      const listWithIndex = list.map((item, index) => {
        return {
          ...item,
          index: (page - 1) * pageSize + index + 1,
        }
      })

      return {
        data: listWithIndex,
        pageNum: page,
        pageSize,
        total,
      }
    },
    getColumnChecks: cols => {
      const checks: NaiveUI.TableColumnCheck[] = []

      cols.forEach(column => {
        if (isTableColumnHasKey(column)){
          checks.push({
            key: column.key as string,
            title: column.title as string,
            checked: true,
          })
        }
        else if (column.type === 'selection'){
          checks.push({
            key: SELECTION_KEY,
            title: '勾选',
            checked: true,
          })
        }
        else if (column.type === 'expand'){
          checks.push({
            key: EXPAND_KEY,
            title: '展开列',
            checked: true,
          })
        }
      })
      return checks
    },
    getColumns: (cols, checks) => {
      const columnMap = new Map<string, TableColumn<GetTableData<A>>>()

      cols.forEach(column => {
        if (isTableColumnHasKey(column)){
          columnMap.set(column.key as string, column)
        }
        else if (column.type === 'selection'){
          columnMap.set(SELECTION_KEY, column)
        }
        else if (column.type === 'expand'){
          columnMap.set(EXPAND_KEY, column)
        }
      })

      const filteredColumns = checks
        .filter(item => item.checked)
        .map(check => columnMap.get(check.key) as TableColumn<GetTableData<A>>)
      return filteredColumns
    },
    onFetched: async transformed => {
      const { pageNum, pageSize, total } = transformed

      updatePagination({
        page: pageNum,
        pageSize,
        itemCount: total,
      })
    },
    immediate,
  })

  const pagination: PaginationProps = reactive({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    itemCount: 0,
    pageSizes: [10, 15, 20, 25, 30],
    onUpdatePage: async (page: number) => {
      pagination.page = page

      updateSearchParams({
        page,
        size: pagination.pageSize!,
      })

      getData()
    },
    onUpdatePageSize: async (pageSize: number) => {
      pagination.pageSize = pageSize
      pagination.page = 1

      updateSearchParams({
        page: pagination.page,
        size: pageSize,
      })

      getData()
    },
    ...(showTotal
      ? {
          prefix: page => `共 ${page.itemCount} 条`,
        }
      : {}
    ),
  })

  const mobilePagination = computed(() => {
    const p: PaginationProps = {
      ...pagination,
      pageSlot: isMobile() ? 3 : 9,
      prefix: !isMobile() && showTotal ? pagination.prefix : undefined,
    }
    return p
  })

  const updatePagination = (update: Partial<PaginationProps>) => {
    Object.assign(pagination, update)
  }

  const getDataByPage = async (pageNum: number = 1) => {
    updatePagination({
      page: pageNum,
    })

    updateSearchParams({
      page: pageNum,
      size: pagination.pageSize!,
    })

    await getData()
  }

  onScopeDispose(() => {
    scope.stop()
  })

  return {
    loading,
    empty,
    data,
    columns,
    columnChecks,
    reloadColumns,
    mobilePagination,
    pagination,
    updatePagination,
    getData,
    getDataByPage,
    searchParams,
    updateSearchParams,
    resetSearchParams,
  }
}

export function useTableOperate<T extends TableData>(data: Ref<T[]>, getData: () => Promise<void>){
  const { bool: drawerVisible, setTrue: openDrawer, setFalse: closeDrawer } = useBoolean()

  const operateType = ref<NaiveUI.TableOperateType>('add')

  const handleAdd = () => {
    operateType.value = 'add'
    openDrawer()
  }

  const editingData: Ref<T | null> = ref(null)

  const handleEdit = (id: T['id']) => {
    operateType.value = 'edit'
    const findItem = data.value.find(item => item.id === id) || null
    editingData.value = cloneDeep(findItem)
    openDrawer()
  }

  const checkedRowKeys = ref<string[]>([])

  const onBatchDeleted = async () => {
    window.$message?.success('删除成功')
    checkedRowKeys.value = []
    await getData()
  }

  const onDeleted = async () => {
    window.$message?.success('删除成功')
    await getData()
  }

  return {
    drawerVisible,
    openDrawer,
    closeDrawer,
    operateType,
    handleAdd,
    editingData,
    handleEdit,
    checkedRowKeys,
    onBatchDeleted,
    onDeleted,
  }
}

function isTableColumnHasKey<T>(column: TableColumn<T>): column is NaiveUI.TableColumnWithKey<T>{
  return Boolean((column as NaiveUI.TableColumnWithKey<T>).key)
}
