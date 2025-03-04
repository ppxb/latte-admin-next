declare namespace NaiveUI{
  type ThemeColor = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'

  type Align = 'stretch' | 'baseline' | 'start' | 'end' | 'center' | 'flex-end' | 'flex-start'

  type DataTableBaseColumn<T> = import('naive-ui').DataTableBaseColumn<T>
  type DataTableExpandColumn<T> = import('naive-ui').DataTableExpandColumn<T>
  type DataTableSelectionColumn<T> = import('naive-ui').DataTableSelectionColumn<T>
  type TableColumnGroup<T> = import('naive-ui/es/data-table/src/interface').TableColumnGroup<T>
  type PaginationProps = import('naive-ui').PaginationProps
  type TableColumnCheck = import('~/hooks/use-hook-table').TableColumnCheck
  type TableDataWithIndex<T> = import('~/hooks/use-hook-table').TableDataWithIndex<T>

  type CustomColumnKey = 'operate'

  type SetTableColumnKey<C, T> = Omit<C, 'key'> & { key: keyof T | CustomColumnKey }

  type TableData = Api.Common.CommonRecord<object>

  type TableColumnWithKey<T> = SetTableColumnKey<DataTableBaseColumn<T>, T> | SetTableColumnKey<TableColumnGroup<T>, T>

  type TableColumn<T> = TableColumnWithKey<T> | DataTableSelectionColumn<T> | DataTableExpandColumn<T>

  type TableApiFn<T = any, R = Api.Common.CommonSearchParams> = (
    params: R
  ) => Promise<Api.Res<Api.Common.PaginatingQueryRecord<T>>>

  type TableOperateType = 'add' | 'edit'

  type GetTableData<A extends TableApiFn> = A extends TableApiFn<infer T> ? T : never

  type NaiveTableConfig<A extends TableApiFn> = Pick<
    import('~/hooks/use-hook-table').TableConfig<A, GetTableData<A>, TableColumn<TableDataWithIndex<GetTableData<A>>>>,
    'apiFn' | 'apiParams' | 'columns' | 'immediate'
  > & {
    showTotal?: boolean
  }
}
