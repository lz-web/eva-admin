import Admin from '@/lin/models/admin'
import LinTable from '@/components/base/table/lin-table'
import {
  dateFilter
} from './../../assets/js/comm.fnc'

export default {
  components: {
    LinTable
  },
  inject: ['eventBus'],
  data() {
    return {
      id: 0, // 用户id
      refreshPagination: true, // 页数增加的时候，因为缓存的缘故，需要刷新Pagination组件
      editIndex: null, // 编辑的行
      total_nums: 0, // 分组内的用户总数
      currentPage: 1, // 默认获取第一页的数据
      pageCount: 10, // 每页10条数据
      tableData: [], // 表格数据
      tableColumn: [], // 表头数据
      operate3: [], // 表格按键操作区
      dialogFormVisible: false, // 控制弹窗显示
      selectGroup: '', // 选中的分组Id
      groups: [], // 所有分组
      group_id: undefined,
      activeTab: '修改信息',
      form: {
        // 表单信息
        username: '',
        password: '',
        confirm_password: '',
        email: '',
        group_ids: [],
      },
      loading: false,
      search_obj: {
        user_name: '',
        user_phone: '',
        medical_name: '',
        comment_status: '',
      },
      status_options: [{ // 状态
        label: '待审核',
        value: '待审核'
      }, {
        label: '已通过',
        value: '已通过'
      }]
    }
  },
  methods: {
    // 获取评论列表
    async getCommentList() {
      let res = await Admin.getCommentList({
        page_size: this.pageCount,
        page_no: this.currentPage,
        search_obj: this.search_obj
      })
      res.result.data.forEach((item, i) => {
        item.index = i + 1
        item.create_at = dateFilter(item.create_at, 'yyyy-MM-dd hh:mm')
      })
      this.tableData = res.result.data;
      this.total_nums = res.result.total
      console.log(res)
    },
    // 审核通过
    async handlePass(val) {
      console.log('handlePass')
      console.log(val)
      await Admin.putCommentStatus({
        comment_status: '已通过',
        order_id: val.row.order_id,
      }).then(res => {
        if (res.code == 10000) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getCommentList()
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })

      // this.editIndex = val.index
      // let selectedData
      // // 单击 编辑按键
      // if (val.index >= 0) {
      //   selectedData = val.row
      // } else {
      //   // 单击 table row
      //   selectedData = val
      // }
      // this.id = selectedData.id
      // this.form.username = selectedData.username
      // this.form.email = selectedData.email
      // this.form.group_ids = selectedData.groups
      // this.dialogFormVisible = true
    },
    // 审核拒绝
    async handleRefuse(val) {
      console.log('handleRefuse')
      console.log(val)
      await Admin.putCommentStatus({
        comment_status: '已拒绝',
        order_id: val.row.order_id,
      }).then(res => {
        if (res.code == 10000) {
          this.$message({
            type: 'success',
            message: res.message
          })
          this.getCommentList()
        } else {
          this.$message({
            type: 'error',
            message: res.message
          })
        }
      })
    },
    handleStop(val) {
      let res
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        try {
          this.loading = true
          res = await Admin.deleteComment(val.row.order_id)
        } catch (e) {
          this.loading = false
          console.log(e)
        }
        if (res.code == 10000) {
          this.loading = false
          if (this.total_nums % this.pageCount === 1 && this.currentPage !== 1) {
            // 判断删除的是不是每一页的最后一条数据
            this.currentPage--
          }
          await this.getCommentList()
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        } else {
          this.loading = false
          this.$message.error(`${res.message}`)
        }
      })
    },
    // 切换table页
    async handleCurrentChange(val) {
      this.currentPage = val
      this.loading = true
      await this.getCommentList()
      this.loading = false
    },
    // 提交表单信息
    async confirmEdit() {
      if (this.activeTab === '修改信息') {
        await this.$refs.userInfo.submitForm('form')
      } else {
        await this.$refs.password.submitForm('form')
      }
    },
    // 重置
    resetForm() {
      if (this.activeTab === '修改信息') {
        this.$refs.userInfo.resetForm('form')
      } else {
        this.$refs.password.resetForm('form')
      }
    },
    // 双击 table ro
    rowClick(row) {
      // this.handleEdit(row)
    },
    // 弹框 右上角 X
    handleClose(done) {
      this.dialogFormVisible = false
      done()
    },
    // 切换tab栏
    handleClick(tab) {
      console.log(tab)
      this.activeTab = tab.name
    },
    // 搜索按钮
    searchBtn() {
      this.currentPage = 1
      console.log('点击了searchBtn')
      console.log(this.search_obj)
      this.getCommentList()
    }
  },
  async created() {
    await this.getCommentList()
    // this.getAllGroups()
    this.tableColumn = [{
        prop: 'index',
        label: '序号',
        width: '80'
      },
      {
        prop: 'user_name',
        label: '姓名'
      },
      {
        prop: 'user.user_company',
        label: '公司/单位名称'
      },
      {
        prop: 'user.user_class',
        label: '职位'
      },
      {
        prop: 'user.user_industry',
        label: '所属行业'
      },
      {
        prop: 'user_phone',
        label: '电话'
      },
      {
        prop: 'medical_name',
        label: '药物名称'
      },
      {
        prop: 'comment',
        label: '评论内容'
      },
      {
        prop: 'comment_status',
        label: '状态',
        width: '90'
      },
      {
        prop: 'create_at',
        label: '提交时间',
        width: '135'
      },
      {
        prop: 'examine_time',
        label: '审核时间',
        width: '135'
      },
    ] // 设置表头信息
    this.operate3 = [{
        name: '审核通过',
        func: 'handlePass',
        type: 'primary'
      },
      {
        name: '审核拒绝',
        func: 'handleRefuse',
        type: 'danger'
      },
      {
        name: '删除',
        func: 'handleStop',
        type: 'danger'
      },
    ]
    this.eventBus.$on('addUser', this.addUser)
  },
  beforeDestroy() {
    this.eventBus.$off('addUser', this.addUser)
  },
}