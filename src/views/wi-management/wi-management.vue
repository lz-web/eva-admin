<template>
  <div class="wi-management-wrap hui-container">
    <!-- <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="date" label="三维评判" sortable width="180"></el-table-column>
      <el-table-column prop="name" label="第一层分类" sortable width="180"></el-table-column>
      <el-table-column prop="address" label="第二层分类"></el-table-column>
      <el-table-column prop="score" label="评分"></el-table-column>
    </el-table>-->
    <!--
      :span-method="objectSpanMethod"  -->
    <el-table
      :size="'mini'"
      :span-method="objectSpanMethod"
      :row-style="{height:'40px'}"
      :data="tableData"
      class="wi-table"
      border
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column prop="type_one" label="三维评判" width="100"></el-table-column>
      <el-table-column prop="score" label="权重1" width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.type_one_percent"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="first_type" label="第一层分类" width="180"></el-table-column>
      <el-table-column prop="first_type_percent" label="权重2" width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.first_type_percent"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="second_type" label="第二层分类" width="280"></el-table-column>
      <el-table-column prop="score" label="权重3" width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.second_type_percent"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="score" label="分值" >
        <template slot-scope="scope">
          <el-input v-model="scope.row.grade_standard"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn-wrap">
      <el-button  size="medium" type="primary" @click="submitFnc">提交</el-button>
    </div>
  </div>
</template>

<script src="./wi-management.js"></script>

<style lang="scss">
@import './wi-management.scss';
</style>

