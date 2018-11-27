<template>
  <div id="page-forms">
    <v-container grid-list-xs fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-toolbar color="primary darken-1" dark="" flat dense cad>
              <v-toolbar-title class="subheading">{{$t('title.searchOption')}}</v-toolbar-title>
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
                                class="mr-2"
                                lazy
                                clearable
                                v-model="searchData.searchText"
                                @input="onSearch">
                              </v-text-field>
                          </v-flex>
                          <!-- 자재 종류 -->
                          <v-flex sm6 class="py-0">
                            <y-select
                              :label="$t('title.materialType')"
                              item-search-key="mtrlClass"
                              name="mtrlClass"
                              v-model="searchData.mtrlClass"
                            >
                            </y-select>
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
          item-key="mtrlCd"
          >
          </y-data-table>
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
      default: ''
    }
  },
  data() {
    return {
      msg: '컨트롤',
      expandSearchOption: [], // 확장검색 옵션
      isGridEditable: false,  // 그리드 수정 가능여부(권한에 따라 변경됨)
      pagination: {},
      selected: [],
      offsetTop: 0,
      gridUrl: null,
      searchData: null,
      gridLoading: false,
      gridData: [],
      gridHeaderOptions: [],
      item: null  // 그리드에서 선택한 item
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  created() {   
  },
  beforeMount() {
    Object.assign(this.$data, this.$options.data());
    this.searchData = this.$comm.clone(selectConfig.material.materialList.searchData)
    this.gridUrl = selectConfig.material.materialList.url
  },
  mounted() {
    this.expandSearchOption = [ 
      {name: 'mtrlLoc', label: this.$t('title.materialLocation'), type: 'select', key: 'mtrlLoc'}, // selectConfig.js의 key값 입력
      {name: 'supplierNm', label: this.$t('title.exSupplierNm'), type: 'text', key: 'exSupplierNm'}, 
      {name: 'makerNm', label: this.$t('title.manufacturer'), type: 'text', key: 'makerNm'},
      {name: 'mtrlDsc', label: this.$t('title.materialSpec'), type: 'text', key: 'mtrlDsc'},
    ]

    this.gridHeaderOptions = [
      { text: this.$t('title.mtrlCd'), align: 'center', name: 'mtrlCd', width: '15%', columnAlign: 'right' },
      { text: this.$t('title.mtrlNm'), name: 'mtrlNm', width: '20%', align: 'center' },
      { text: this.$t('title.materialType'), name: 'mtrlClassNm', width: '15%', align: 'center' },
      { text: this.$t('title.manufacturer'), name: 'makerNm', width: '20%', align: 'center' },
      { text: this.$t('title.aStockAmt'), name: 'aStockAmt', width: '10%', align: 'center', columnAlign: 'center' },
      { text: this.$t('title.bStockAmt'), name: 'bStockAmt', width: '10%', align: 'center', columnAlign: 'center' },
      { text: this.$t('title.materialLocation'), name: 'mtrlLocNm', width: '10%', align: 'center', columnAlign: 'center' }
    ]
    this.isGridEditable = this.isGridEditableByParent

    this.onSearch()
  },
  /* methods */
  methods: {
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
        self.$refs.dataTable.hideLoading()
      })
    },
    /**
     * datatable에서 선택된 정보를 eventBus로 부모에 넘긴다.
     */
    // selectedData(_item) {
    //   this.item = this.$comm.clone(_item)
    //   this.item.aUseAmt = 0;
    //   this.item.bUseAmt = 0;
    //   // this.$emit('selectedData', _item)
    // },
    /**
     * datatable에서 선택된 정보를 부모에 넘긴다.
     */
    getCheckedData() {
      var checkedItems = this.$refs.dataTable.getCheckedData()
      this.$refs.dataTable.clearSelected()
      return checkedItems
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
