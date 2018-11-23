<template>
  <div id="page-forms">
    <v-container grid-list-xs fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-toolbar color="primary darken-1" dark="" flat dense cad>
              <v-toolbar-title class="subheading">{{$route.name}}</v-toolbar-title>
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
                                label="검색 키워드" 
                                class="mr-2"
                                lazy
                                clearable
                                v-model="searchData.searchText"
                                @input="onSearch">
                              </v-text-field>
                          </v-flex>
                          <v-flex sm6 class="py-0">
                              <v-text-field
                                label="설비위치" 
                                class="mr-2"
                                lazy
                                clearable
                                v-model="searchData.equipStatus"
                                @input="onSearch">
                              </v-text-field>
                          </v-flex>
                      </v-layout>
                      
                      <!-- 확장 검색 영역-->
                      <y-expand-search 
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
          ref="dataTable"
          :headers="gridHeaderOptions"
          :items="gridData"
          :loading="gridLoading"
          :editable="isGridEditable"
          :grid-type="gridType"
          @selectedData="selectedData"
          >
          </y-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import selectConfig from '@/js/selectConfig'
// 확장검색 옵션
var expandSearchOption = [ 
  {name: 'equipStatus', label: '설비상태', type: 'select', key: 'equipStatus'}, // selectConfig.js의 key값 입력
  {name: 'locPk', label: '설비위치', type: 'select', key: 'equipLoc'}, // selectConfig.js의 key값 입력
  {name: 'importRankPk', label: '중요도', type: 'select', key: 'equipImptRnk'},
  {name: 'supplierPk', label: '공급업체', type: 'select', key: 'supplier'},
]

var gridHeaderOptions = [
  { text: '설비코드', align: 'center', name: 'equipCd', width: '15%', columnAlign: 'right' },
  { text: '설비명', name: 'equipNm', width: '20%', align: 'center' },
  { text: '위치', name: 'locNm', width: '15%', align: 'center' },
  { text: '설비상태', name: 'equipStatusNm', width: '20%', align: 'center' },
  { text: '설비중요도', name: 'importRankNm', width: '10%', align: 'center', columnAlign: 'center' }
]

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
      expandSearchOption: expandSearchOption,
      isGridEditable: false,  // 그리드 수정 가능여부(권한에 따라 변경됨)
      pagination: {},
      selected: [],
      offsetTop: 0,
      gridUrl: selectConfig.equipmentList[0].url,
      searchData: selectConfig.equipmentList[0].searchData,
      gridLoading: false,
      gridData: [],
      gridHeaderOptions: gridHeaderOptions
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  created() {
    this.isGridEditable = this.isGridEditableByParent
    this.gridHeaderOptions = gridHeaderOptions
  },
  beforeMount() {
    Object.assign(this.$data, this.$options.data());
  },
  mounted() {
    // page rendering 후 조회
    this.$nextTick(() => {
      this.onSearch()
    })
  },
  /* methods */
  methods: {
    init() {
    },
    rowDblClick() {
      console.log('row double click');
    },
    editItem() {
      this.$emit('edit');
    },
    actionSearch(_searchData) {
      this.searchData = _searchData
      this.onSearch()
    },
    onSearch() {
      let self = this
      this.$ajax.url = this.gridUrl
      this.$ajax.param = this.searchData
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
     * datatable에서 선택된 정보를 eventBus로 부모에 넘긴다.
     */
    selectedData(_item) {
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
