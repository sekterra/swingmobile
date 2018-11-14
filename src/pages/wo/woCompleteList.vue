<!--
목적 : WO 완료목록
Detail :
 * 
examples: 
 *  
-->
<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid class="mt-0 pt-0">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-toolbar color="primary darken-1" dark="" flat dense cad>
              <v-toolbar-title class="subheading">{{$t('menu.woCompleteList')}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <v-flex id="content">
                <v-slide-y-transition mode="out-in">
                  <!-- 기본 검색 영역 -->
                  <v-layout column align-center>
                    <v-container fluid grid-list-xs  class="pa-0">
                      <v-layout row wrap>
                          <v-flex sm6 class="py-0">
                              <v-text-field
                                :label="$t('title.woNo')" 
                                class="mr-2"
                                clearable
                                v-model="searchData.workOrderNo"
                                @input="onSearch">
                              </v-text-field>
                          </v-flex>
                          <v-flex sm6 class="py-0">
                              <v-text-field
                                :label="$t('message.woSearchInfo')" 
                                class="mr-2"
                                clearable
                                v-model="searchData.searchText"
                                @input="onSearch">
                              </v-text-field>
                          </v-flex>
                      </v-layout>
                      
                      <!-- 확장 검색 영역-->
                      <y-expand-search 
                        :title="$t('message.moreSearch')"
                        :search-option="expandSearchOption"
                        :given-search-data="searchData"
                        @searchDataChanged="actionSearch"
                        >
                      </y-expand-search>
                      <!--/확장 검색 영역-->
                    </v-container>
                  </v-layout>
                </v-slide-y-transition>
              </v-flex>
            </v-card-text>       
          </v-card>
        </v-flex>           
      </v-layout>
      <v-layout>
        <!-- 그리드 영역 -->
        <v-flex xs12>
          <y-data-table 
            :title="$t('title.woCompleteList')"
            grid-type="edit"
            ref="dataTable"
            :headers="gridHeaderOptions"
            :items="gridData"
            :loading="gridLoading"
            :editable="isGridEditable"
            @selectedData="selectedData"
            @editItem="editItem"
          >
          </y-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import selectConfig from '@/js/selectConfig'
import $ from 'jquery'

export default {
  /* attributes: name, components, props, data */
  props: {
    // 그리드 수정 가능여부를 부모로 부터 받아 옴(예. 팝업)
    isGridEditableByParent: {
      type: Boolean,
      default: true
    },
    gridType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      msg: '컨트롤',
      expandSearchOption: [ 
        {name: 'startDate', label: this.$t('title.woRequestFromDate'), type: 'datepicker', defaultType: '3m'},
        {name: 'endDate', label: this.$t('title.woRequestToDate'), type: 'datepicker', defaultType: 'today'},
        {name: 'deptPk', label: this.$t('title.RequestDepartment'), type: 'select', key: 'depart'}, // selectConfig.js의 key값 입력
        {name: 'woStatus', label: this.$t('title.woStatus'), type: 'select', key: 'woStatus'}, // selectConfig.js의 key값 입력
      ],
      isGridEditable: false,  // 그리드 수정 가능여부(권한에 따라 변경됨)
      date: null,
      menu2: null,
      landscape: false,
      imgData: null,
      imgLog: '',
      debug: '',
      price: 1000,
      search: '',
      check: true,
      pagination: {},
      selected: [],
      offsetTop: 0,
      gridUrl: selectConfig.woList[0].url,
      searchData: this.$comm.clone(selectConfig.woList[0].searchData),
      gridLoading: false,
      gridData: [],
      gridHeaderOptions: []
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  created() {
    this.onSearch()
    this.isGridEditable = this.isGridEditableByParent
    this.gridHeaderOptions = [
        // { text: this.$t('title.edit'), name: 'name', sortable: false, type: 'edit', width: '10%', align: 'center', columnAlign: 'center' },
        { text: this.$t('title.woNo'), align: 'center', name: 'workOrderNo', width: '15%', columnAlign: 'right' },
        { text: this.$t('title.woTitle'), name: 'workTitle', width: '20%', align: 'center' },
        { text: this.$t('title.equipmentCode'), name: 'equipCd', width: '15%', align: 'center' },
        { text: this.$t('title.equipmentName'), name: 'equipNm', width: '20%', align: 'center' },
        { text: this.$t('title.woRequestDate'), name: 'rqstDt', width: '10%', align: 'center', columnAlign: 'center' },
        { text: this.$t('title.woDepartment'), name: 'deptNm', width: '20%', align: 'center' },
        { text: this.$t('title.woStatus'), name: 'woStatusProcess', type: 'process', width: '20%', align: 'center' }
      ]
  },
  /* methods */
  methods: {
    init() {
    },
    dateChanged(_date) {
      this.debug = '[parent datepicker]:' + _date;
    },
    rowDblClick() {
      console.log('row double click');
    },
    editItem(_item) {
      var url = '/woComplete?pk=' + _item.workOrderPk
      this.$comm.movePage(this.$router, url)
    },
    actionSearch(_searchData) {
      this.searchData = _searchData
      this.onSearch()
    },
    onSearch() {
      let self = this
      this.searchData.woStatus = ['WO_STATUS_P', , 'WO_STATUS_C']
      this.searchData.woStatusEx = ['WO_STATUS_X']
      this.$ajax.url = this.gridUrl
      this.$ajax.param = this.searchData
      this.$ajax.param.startDate = this.searchData.startDate
      this.$ajax.param.endDate = this.searchData.endDate
      if(!this.searchData.startDate || !this.searchData.endDate) return
      this.gridLoading = true
      this.$ajax.requestGet((_result) => {
        var gridData = typeof _result.content !== 'undefined' ? _result.content : _result
        $.each(gridData, (_i, _item) => {
          if (_item.woStatusCd === 'WO_STATUS_R') _item.color = 'grey'
          if (_item.woStatusCd === 'WO_STATUS_A') _item.color = 'blue'
          if (_item.woStatusCd === 'WO_STATUS_P') _item.color = 'indigo'
          if (_item.woStatusCd === 'WO_STATUS_X') _item.color = 'success'
          if (_item.woStatusCd === 'WO_STATUS_C') _item.color = 'red'
          _item.colorTitle = _item.woStatusNm
        })
        self.gridData = gridData
        self.$refs.dataTable.hideLoading()
      }, (_error) => {
        self.gridLoading = false
        self.$refs.dataTable.hideLoading()
      })
    },
    /**
     * eventBus로 선택된 정보를 부모로 넘긴다.
     */
    selectedData(_item) {
      console.log(':::::::::::: [woList] select item ::::::::::::' + JSON.stringify(_item))
      this.$emit('selectedData', _item)
    }
  }
}
</script>

<style>
.border {
  border: 1px dashed #0000ff;
}
.fab-container {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>

