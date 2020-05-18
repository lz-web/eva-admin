import Utils from '@/lin/utils/util'
import Admin from '@/lin/models/admin'

export default {
  name: 'wi',
  data() {
    return {
      isEditObj: [],
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    submitFnc() {
      console.log(this.tableData)
      let stu = this.tableData.some(item => {
        if (!item.grade_standard) {
          this.$message({
            type: 'error',
            message: '您好,' + item.first_type + '==>' + item.second_type + '==> 分值不能为空!'
          })
          return true;
        }
      })
      if (!stu) {

        this.$confirm('此操作将会改变评分权重,请确认修改值符合要求规定, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let arr = []
          let arr2 = []
          this.tableData.forEach((item, i) => {
            if (arr.indexOf(item.type_one) == -1) {
              arr.push(item.type_one)
            } else {
              this.tableData[i].type_one_percent = this.tableData[i - 1].type_one_percent
            }
            if (arr2.indexOf(item.first_type) == -1) {
              arr2.push(item.first_type)
            } else {
              this.tableData[i].first_type_percent = this.tableData[i - 1].first_type_percent
            }
          })
          console.log(this.tableData)
          Admin.putEvaRule({
            eva_data: this.tableData
          }).then((res) => {
            console.log(res)
            if (res.code == 10000) {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.getEvaluation()
            } else {
              this.$message({
                type: 'error',
                message: res.msg
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    },
    // 权重 立项 获取
    async getEvaluation() {
      await Admin.getEvaluation().then((res) => {
        console.log(res)
        if (res.code == 10000) {
          this.tableData = res.result;
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
    objectSpanMethod({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (columnIndex === 0 || columnIndex === 1) {
        if (rowIndex === 0) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else if (rowIndex === 5) {
          return {
            rowspan: 18,
            colspan: 1
          };
        } else if (rowIndex === 23) {
          return {
            rowspan: 7,
            colspan: 1
          };
        } else if (rowIndex === 30) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      } else if (columnIndex === 2 || columnIndex === 3) {
        if (rowIndex === 0 || rowIndex === 3 || rowIndex === 20) {
          return {
            rowspan: 2,
            colspan: 1
          };
        } else if (rowIndex === 2 || rowIndex === 22) {
          return {
            rowspan: 1,
            colspan: 1
          };
        } else if (rowIndex === 5 || rowIndex === 8 || rowIndex === 11 || rowIndex === 14 || rowIndex === 17 || rowIndex === 30) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else if (rowIndex === 23) {
          return {
            rowspan: 7,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    }
  },
  created() {
    this.getEvaluation()
  },
  components: {},
}