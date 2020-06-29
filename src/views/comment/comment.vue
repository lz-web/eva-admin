<template>
  <div class="container">
    <div class="header">
      <div class="title">评论列表</div>
    </div>
    <div class="search-wrap">
      <el-input class="search-item" placeholder="姓名关键词" v-model="search_obj.user_name"></el-input>
      <el-input class="search-item" placeholder="手机号" v-model="search_obj.user_phone"></el-input>
      <el-input class="search-item" placeholder="药物名称" v-model="search_obj.medical_name"></el-input>
      <el-select class="search-item" v-model="search_obj.comment_status" clearable placeholder="请选择状态">
        <el-option
          class="search-item"
          v-for="item in status_options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button type="primary" @click="searchBtn">搜索</el-button>
    </div>
    <!-- 表格 -->
    <lin-table
      :tableColumn="tableColumn"
      :tableData="tableData"
      :operate3="operate3"
      @handlePass="handlePass"
      @handleRefuse="handleRefuse"
      @handleStop="handleStop"
      @row-click="rowClick"
      v-loading="loading"
    ></lin-table>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :background="true"
        :page-size="pageCount"
        :current-page="1"
        v-if="refreshPagination"
        layout="prev, pager, next, jumper"
        :total="total_nums"
      ></el-pagination>
    </div>
  </div>
</template>

<script src="./comment.js"></script>

<style lang="scss">
@import './comment.scss';
</style>

