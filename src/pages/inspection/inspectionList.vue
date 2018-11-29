<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid class="mt-0 pt-0">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-toolbar color="indigo lighten-3" dark flat dense cad>
              <v-toolbar-title class="subheading">{{$t('menu.inspectionList')}}</v-toolbar-title>
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
                                :label="$t('title.searchKeyword')" 
                                :placeholder="$t('message.inspectionPlaceholder')"
                                class="mr-2"
                                clearable
                                v-model="searchData.searchText"
                                @input="onSearch">
                              </v-text-field>
                          </v-flex>
                          <v-flex sm6 class="py-0">
                              <v-text-field
                                :label="$t('title.inspectionNo')"
                                :placeholder="$t('message.inspectionNoPlaceholder')"
                                class="mr-2"
                                clearable
                                v-model="searchData.chkPlanNo"
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
            :title="$t('title.inspectionResult')"
            ref="dataTable"
            :headers="gridHeaderOptions"
            :items="gridData"
            :loading="gridLoading"
            :editable="isGridEditable"
            :grid-type="gridType"
            @selectedData="selectedData"
            @editItem="editItem"
          >
          </y-data-table>
          <div class="caption text-xs-right mt-1 pr-2 grey--text">
            {{$t('title.inspectionPeriod')}}: {{searchData.startDate + ' ~ ' + searchData.endDate}}
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import selectConfig from '@/js/selectConfig'

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
      default: 'edit'
    }
  },
  data() {
    return {
      msg: '컨트롤',
      expandSearchOption: [],
      isGridEditable: true,  // 그리드 수정 가능여부(권한에 따라 변경됨)
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
      gridUrl: null,
      searchData: null,
      gridLoading: false,
      gridData: [],
      gridHeaderOptions: []
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  created() {
  },
  beforeMount() {
    Object.assign(this.$data, this.$options.data());
    this.expandSearchOption = [ 
      {name: 'startDate', label: this.$t('title.inspectionFromDate'), type: 'datepicker', defaultType: '1m'},
      {name: 'endDate', label: this.$t('title.inspectionToDate'), type: 'datepicker', defaultType: 'today'},        
      {name: 'chkStatus', label: this.$t('title.inspectionStatus'), type: 'select', key: 'chkStatus'}, // selectConfig.js의 key값 입력
      {name: 'deptPk', label: this.$t('title.inspectionDepartment'), type: 'select', key: 'depart'}, // selectConfig.js의 key값 입력
    ]
    this.gridHeaderOptions = [
        { text: this.$t('title.inspectionNo'), align: 'center', name: 'chkPlanNo', width: '15%', columnAlign: 'right' },
        { text: this.$t('title.inspectionTitle'), name: 'chkMastNm', width: '20%', align: 'center' },
        { text: this.$t('title.inspectionDepartment'), name: 'deptNm', width: '15%', align: 'center' },
        { text: this.$t('title.inspectionPlanDate'), name: 'chkPlanDt', width: '15%', align: 'center' },
        { text: this.$t('title.inspectionDate'), name: 'chkDt', width: '15%', align: 'center', columnAlign: 'center' },
        { text: this.$t('title.inspectionResult'), name: 'chkResult', width: '20%', align: 'center' },
        { text: this.$t('title.inspectionStatus'), name: 'chkStatusNm', width: '10%', align: 'center' }
    ]
    this.gridUrl = selectConfig.inspectionList[0].url
    this.searchData = this.$comm.clone(selectConfig.inspectionList[0].searchData)

    this.onSearch()
    this.isGridEditable = this.isGridEditableByParent
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
      this.$comm.movePage(this.$router, '/inspectionResult?pk=' + _item.chkPlanPk)
      console.log('::::::::::::: datatable item :' + JSON.stringify(_item))
    },
    actionSearch(_searchData) {
      this.searchData = _searchData
      this.onSearch()
    },
    onSearch() {
      if (!this.searchData.startDate || !this.searchData.endDate) return
      let self = this
      this.$ajax.url = this.gridUrl
      this.$ajax.param = this.searchData
      // this.$ajax.param.startDate = this.
      // this.$ajax.param.endDate = this.$comm.getToday()
      this.gridLoading = true
      this.$ajax.requestGet((_result) => {
        self.gridData = typeof _result.content !== 'undefined' ? _result.content : _result
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
