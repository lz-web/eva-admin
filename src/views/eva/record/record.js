import Utils from '@/lin/utils/util'
import Admin from '@/lin/models/admin'
import LinTable from '@/components/base/table/lin-table'

export default {
  components: {
    LinTable,
  },
  data() {
    return {
      htmlTitle: '页面导出PDF文件名',
      total_nums: 0, // 分组内的用户总数
      currentPage: 1, // 默认获取第一页的数据
      pageCount: 10, // 每页10条数据
      tableData: [{
          prop: 'id',
          label: '序号'
        },
        {
          prop: 'user_name',
          label: '姓名'
        },
        {
          prop: 'medical_name',
          label: '药物'
        },
        {
          prop: 'personak_score',
          label: '自测得分'
        },
        {
          prop: 'industry_score',
          label: '行业得分'
        },
        {
          prop: 'download_count',
          label: '下载次数'
        },
        {
          prop: 'create_at',
          label: '评测时间'
        },
      ], // 表格数据
      operate: [], // 表格数据
      tableColumn: [], // 表头数据
      loading: false,
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
    }
  },
  methods: {
    async handleDetail(val) {
      console.log('handleDetail')
    },
    async handleDownload(val) {
      console.log('handleDownload')
    },
    async getEvaRecord() {
      await Admin.getEvaRecord({
        page_size: this.pageCount,
        page_no: this.currentPage
      }).then((res) => {
        if (res.code == 10000) {
          this.tableData = res.result.rows;
          this.total_nums = res.result.count;
          this.$message({
            type: 'success',
            message: res.msg
          })
        } else {
          this.$message({
            type: 'error',
            message: res.msg
          })
        }
        console.log(res)
      })
    },

    currentPageFnc(page_no) {
      this.currentPage = page_no
      this.getEvaRecord()
    }
  },
  async created() {
    this.tableColumn = [{
        prop: 'id',
        label: '序号'
      },
      {
        prop: 'user_name',
        label: '姓名'
      },
      {
        prop: 'medical_name',
        label: '药物'
      },
      {
        prop: 'personal_score',
        label: '自测得分'
      },
      {
        prop: 'industry_score',
        label: '行业得分'
      },
      {
        prop: 'download_count',
        label: '下载次数'
      },
      {
        prop: 'create_at',
        label: '评测时间'
      },
    ] // 设置表头信息
    this.operate = [{
        name: '评测详情',
        func: 'handleDetail',
        type: 'primary'
      },
      {
        name: '下载',
        func: 'handleDownload',
        type: 'danger'
      },
    ]
    console.log('getEvaRecord')
    this.getEvaRecord()
  },
}