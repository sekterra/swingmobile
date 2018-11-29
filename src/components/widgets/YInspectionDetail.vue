<!--
목적 : 점검상세 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <div>
      <v-layout row wrap>
        <!-- 점검일정번호 -->
        <v-flex xs12>
          <v-subheader class="pa-0 mt-3">{{$t('title.inspectionSummary')}}</v-subheader>
        </v-flex>
        <v-flex xs12 sm6>
          <v-text-field
            :label="$t('title.inspectionNo')"
            :value="inspectionInfo.chkPlanNo"
            disabled
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <!-- 점검명 -->
          <v-text-field
            :label="$t('title.inspectionTitle')"
            :value="inspectionInfo.chkMastNm"
            disabled
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <!-- 점검상태 -->
          <v-text-field
            :label="$t('title.inspectionStatus')"
            disabled
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <!-- 점검일 -->
          <v-text-field
            :label="$t('title.inspectionDate')"
            :value="inspectionInfo.chkDt"
            disabled
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <!-- 점검부서 -->
          <v-text-field
            :label="$t('title.inspectionDepartment')"
            :value="inspectionInfo.deptNm"
            disabled
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6>
          <!-- 점검부서 -->
          <v-text-field
            :label="$t('title.inspectionPlanDate')"
            :value="inspectionInfo.chkPlanDt"
            disabled
          ></v-text-field>
        </v-flex>
      </v-layout>

      <!-- 점검항목 -->
      <v-layout>
        <v-flex xs12>
          <div v-if="inspectionInfo.chkStatusCd === 'CHK_STATUS_N'">
            <v-subheader class="pa-0 mt-1">
              <!-- {{$t('title.checkList')}} -->
              <v-spacer></v-spacer>
              <v-btn 
                small
                dark
                color="success lighten-1"
                @click.prevent="doInspection"
              >
                <!-- <v-icon>list_alt</v-icon> -->
                {{$t('title.inspectionResult')}}
              </v-btn>
            </v-subheader>
            <y-data-table 
              :title="$t('title.checkList')"
              ref="dataTable"
              :headers="inspectionCheckListHeaderOptions"
              :items="inspectionCheckListData"
              :editable="false"
            >
            </y-data-table>
            <p></p>
            <y-data-table 
              :title="$t('title.inspectionEquipment')"
              ref="equipmentDataTable"
              :headers="inspectionEquipmentHeaderOptions"
              :items="inspectionEquipmentListData"
              :editable="false"
            >
            </y-data-table>
          </div>
          <div v-else>
            <v-subheader class="pa-0 mt-3">점검상세</v-subheader>
            <v-tabs
              dark
              v-model="tabIndex"
              color="indigo lighten-3"
              show-arrows
              flat
            >
              <v-tabs-slider color="yellow lighten-3"></v-tabs-slider>
              <v-tab
                v-for="(item, i) in chkResultData"
                :href="'#tab-' + i"
                :key="item.equipCd"
              >
                {{item.equipCd}}
              </v-tab>

              <v-tabs-items>
                <v-tab-item
                  v-for="(item, i) in chkResultData"
                  :id="'tab-' + i"
                  :key="item.equipCd"
                >
                  <v-card color="grey lighten-5" flat>
                    <v-card-text class="px-2 py-2">
                      <y-data-table 
                        :title="item.equipCd + ' ' + $t('title.checkList')"
                        :headers="inspectionCheckResultHeaderOptions"
                        :items="item.equipChkItemRslts"
                        :editable="false"
                        flat
                      >
                      </y-data-table>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </div>
        </v-flex>
      </v-layout>
        <!-- /점검항목 -->

  </div>
</template>

<script>
import selectConfig from '@/js/selectConfig.js'
let inspectionConfig = selectConfig.inspection
export default {
  /* attributes: name, components, props, data */
  name: 'y-inspection-detail',
  props: {
    pk: {
      type: [Number, String]
    }
  },
  data: () => ({
    inspectionInfo: inspectionConfig.inspectionInfo.data,
    inspectionCheckListHeaderOptions: [],
    inspectionCheckResultHeaderOptions: [],
    inspectionEquipmentHeaderOptions: [],
    inspectionCheckListData: [],
    inspectionEquipmentListData: [],
    chkResultData: [],
    isCheckListLoading: false,
    tabIndex: 'tab-0'
  }),
  watch: {
    pk() {
      this.getInspectionData()
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount () {
    // this.getInspectionData()
    console.log('::::::::' + this.$t('title.searchNo'))
    this.inspectionCheckListHeaderOptions = [
      { text: this.$t('title.searchNo'), name: 'itemIdx', width: '10%', align: 'center', columnAlign: 'center' },
      { text: this.$t('title.checkItemName'), name: 'chkItemNm', width: '20%', align: 'center' },
      { text: 'LCL', name: 'lcl', width: '15%', align: 'center' },
      { text: 'UCL', name: 'ucl', width: '20%', align: 'center' }
    ]
    this.inspectionCheckResultHeaderOptions = [
      { text: this.$t('title.searchNo'), name: 'itemIdx', width: '10%', align: 'center', columnAlign: 'center' },
      { text: this.$t('title.checkItemName'), name: 'chkItemNm', width: '20%', align: 'center' },
      { text: 'LCL', name: 'lcl', width: '15%', align: 'center' },
      { text: 'UCL', name: 'ucl', width: '20%', align: 'center' },
      { text: this.$t('title.inspectionResult'), name: 'okYn', width: '20%', align: 'center' }
    ]
    this.inspectionEquipmentHeaderOptions = [
      { text: this.$t('title.equipmentCode'), name: 'equipCd', width: '10%', align: 'center', columnAlign: 'center' },
      { text: this.$t('title.equipmentName'), name: 'equipNm', width: '20%', align: 'center' },
      { text: this.$t('title.location'), name: 'locNm', width: '15%', align: 'center' },
      { text: this.$t('title.equipmentType'), name: 'equipTypeNm', width: '20%', align: 'center' },
      { text: this.$t('title.equipmentStatus'), name: 'equipStatusNm', width: '20%', align: 'center' },
      { text: this.$t('title.remark'), name: 'equipDsc', width: '20%', align: 'center' }
    ]

    if (this.pk) this.getInspectionData()
  },
  /* methods */
  methods: {
    getInspectionData() {
      if (!this.pk) return
      this.$ajax.url = inspectionConfig.inspectionInfo.url + this.pk
      var self = this
      this.isCheckListLoading = true
      this.$ajax.requestGet((_result) => {
        self.inspectionInfo = _result
        setTimeout(() => {self.isCheckListLoading = false}, 1000) 
        if (this.inspectionInfo.chkStatusCd === 'CHK_STATUS_N') {
          this.getInspectionCheckList()
          this.getInspectionEquipmentList()
        }
        else this.getInspectionResult(this.inspectionInfo.chkRsltPks)
      }, () => {
        setTimeout(() => {self.isCheckListLoading = false}, 1000) 
      })
    },
    getInspectionCheckList() {
      this.$ajax.url = inspectionConfig.inspectionCheckList.url + this.pk
      this.$ajax.requestGet((_result) => {
        this.inspectionCheckListData = _result
        this.$refs.dataTable.hideLoading()
      }, () => {
        this.$refs.dataTable.hideLoading()
      })
    },
    getInspectionEquipmentList() {
      this.$ajax.url = inspectionConfig.inspectionEquipmentList.url + this.pk
      this.$ajax.requestGet((_result) => {
        this.inspectionEquipmentListData = _result
        this.$refs.equipmentDataTable.hideLoading()
      }, () => {
        this.$refs.equipmentDataTable.hideLoading()
      })
    },
    getInspectionResult(_chkRsltPks) {
      var url = inspectionConfig.inspectionCheckResultList.url
      var self = this
      this.chkResultData = []
      for (var key in _chkRsltPks) {
        this.$ajax.url = url + _chkRsltPks[key]
        this.$ajax.requestGet((data) => {
          this.chkResultData.push(data)
          // this.$refs.itemDataTable.hideLoading()
        }, () => {
          // this.$refs.itemDataTable.hideLoading()
        })
      }
    },
    doInspection() {
      this.$comm.movePage(this.$router, '/inspectionResult?pk=' + this.pk)
    }
  }
}
</script>

<style>
.border {
  border: 1px solid #3F51B5;
}
</style>
