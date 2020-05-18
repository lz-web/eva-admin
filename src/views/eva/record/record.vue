<template>
  <div id="pdfDom" class="wi-management-wrap hui-container">
    <lin-table
      :tableColumn="tableColumn"
      :tableData="tableData"
      :operate="operate"
      @handleDetail="handleDetail"
      @handleDownload="handleDownload"
      v-loading="loading"
    >
    </lin-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        :background="true"
        :page-size="pageCount"
        :current-page="currentPage"
        @current-change="currentPageFnc"
        v-if="refreshPagination" 
        layout="prev, pager, next, jumper"
        :total="total_nums"
      ></el-pagination>
    </div>
    <!-- <el-button type="primary" size="small" @click="getPdf('pdfDom','阿萨德')">点击下载</el-button> -->
  </div>
</template>

<script src="./record.js"></script>

<style lang="scss">
@import "./record.scss";
</style>

