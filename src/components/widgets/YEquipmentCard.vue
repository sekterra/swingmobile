<!--
목적 :  설비 요약 카드 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <div id="page-alerts">
      <v-layout row wrap>
        <v-flex xs12 v-if="equipment">
          <v-widget :title="equipment.equipNm">
            <div slot="widget-header-action">
              <v-icon>more</v-icon>
            </div>
            <div slot="widget-content">
              <v-card>
                <v-img 
                  v-if="thumbnailUrl"
                  height="200px"
                  :class="equipmentTitleColor"
                  :src="thumbnailUrl">
                  <v-container fill-height fluid>
                    <v-layout fill-height>
                      <v-flex xs12 align-end flexbox>
                        <div class="headline">{{equipment.equipCd}}</div>
                        <div class="subheading">{{equipment.equipNm}}</div>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-img>
                <v-card-text>
                  <v-list 
                    v-for="item in equipInfo"
                    :key="item.content"
                    class="pa-0">
                    <template>
                      <v-list-tile avatar>
                        <v-list-tile-avatar>
                          <y-loading-button v-if="item.icon === 'on'"></y-loading-button>
                          <v-icon v-else :color="equipment.color">{{item.icon}}</v-icon>
                        </v-list-tile-avatar>
                        <v-list-tile-content>
                          {{item.content}}
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-divider inset></v-divider>
                    </template>
                  </v-list>
                </v-card-text>
              </v-card>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
  </div>
</template>

<script>
import VWidget from '@/components/VWidget';
import YLoadingButton from '@/components/widgets/YLoadingButton';
import EChart from '@/components/chart/echart';
import color from 'vuetify/es5/util/colors';
import selectConfig from '@/js/selectConfig'
import $ from 'jquery'
import ajaxFile from '@/js/ajaxFile'
import noImage from '@/static/no-image-icon.png';

export default {
  /* attributes: name, components, props, data */
  name: 'y-equipment-card',
  components: {
    VWidget,
    EChart,
    'y-loading-button': YLoadingButton
  },
  props: {
    title: {
      type: String,
      // required: true,
      default: 'Equipment'
    },
    pk: {
      type: [String, Number],
      require: true,
      default: null
    },
    isExpired: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    isOpen: true, // delete
    isExpanded: 0,
    woStatusData: [],
    url: '/equipment/',
    chartColor: color,
    equipment: null,
    equipInfo: [],
    thumbnailUrl: null,
    equipmentTitleColor: 'white--text',
    equipStatusIcon: {
      'EQUIP_STATUS_O': 'on',
      'EQUIP_STATUS_B': 'build',
      'EQUIP_STATUS_D': 'not_interest'
    },
    woStatus: {
      pm: 0,
      bm: 0,
      cm: 0,
      no: 0,
    },
    noImage: noImage
  }),
  watch: {
    pk() {
      this.equipInfo = []
      this.getEquipment()
      this.getEquipmentImage()
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  mounted() {
    if (this.pk) {
      this.getEquipment()
      this.getEquipmentImage()
    }
  },
  /* methods */
  methods: {
    /**
     * 설비정보를 backend로 부터 가져온다.
     */
    getEquipment() {
      this.$nextTick(() => {
        this.$ajax.url = this.url + this.pk
        this.$ajax.param = null
        let self = this
        this.$ajax.requestGet((_result) => {
          this.getWoStatus(_result.equipCd)
          this.setEquipmentInfo(_result)
        }, (_error) => {
          console.log('error:' + JSON.stringify(_error))
        })
      })
    },
    /**
     * backend에서 가져온 설비정보를 화면에 맞게 재가공한다.
     */
    setEquipmentInfo(_equipment) {
      this.equipment = _equipment
      // 보증기간 유효 여부
      this.equipment.isExpired = this.$comm.dateCompare(this.equipment.warrantyDt)
      // 설비 상태에 따른 색상값 설정
      if (_equipment.equipStatusCd === 'EQUIP_STATUS_O' || _equipment.equipStatusCd === 'EQUIP_STATUS_B') this.equipment.color = 'indigo darken-2'
      else if (_equipment.equipStatusCd === 'EQUIP_STATUS_D') this.equipment.color = 'grey darken-2'
      // 설비 정보를 배열형식으로 저장
      this.equipInfo.push({icon: this.equipStatusIcon[_equipment.equipStatusCd], content: _equipment.equipStatusNm})
      this.equipInfo.push({icon: 'local_offer', content: _equipment.equipCd})
      this.equipInfo.push({icon: 'room', content: _equipment.locNm})
      this.equipInfo.push({icon: this.equipment.isExpired ? 'event_busy' : 'event', content: _equipment.warrantyDt ? _equipment.warrantyDt : '-'})
      var installDate = this.$comm.convertStringToDate(_equipment.installDt)
      this.equipInfo.push({icon: 'assignment_returned', content: this.$comm.getDatediff(installDate).toLocaleString() + this.$t('title.date') })
    },
    /**
     * 선택된 설비의 WO정보를 WO종류별로 가져온다.
     */
    getWoStatus(_equipCd) {
        this.$ajax.url = selectConfig.woList[0].url
        this.$ajax.param = this.$comm.clone(selectConfig.woList[0].searchData)
        this.$ajax.param.searchText = _equipCd
        this.$ajax.param.woStatus = ['WO_STATUS_A','WO_STATUS_P']
        this.$ajax.param.startDate = this.$comm.getFirstDayThisYear()
        this.$ajax.param.endDate = this.$comm.getLastDayThisYear()
        let self = this
        this.$ajax.requestGet((_result) => {
          if (_result.size <= 0) {
            for(var key in this.woStatus) {
              this.woStatus[key] = 0
            }
          } else {
            var listPm = _.filter(_result.content, function (_item) {
              return _item.maintTypeCd === 'MAINT_TYPE_PM'
            })
            var listBm = _.filter(_result.content, function (_item) {
              return _item.maintTypeCd === 'MAINT_TYPE_BM'
            })
            var listCm = _.filter(_result.content, function (_item) {
              return _item.maintTypeCd === 'MAINT_TYPE_CM'
            })
            var listNo = _.filter(_result.content, function (_item) {
              return _item.maintTypeCd === 'MAINT_TYPE_NO'
            })
            this.woStatus.pm = listPm.length
            this.woStatus.bm = listBm.length
            this.woStatus.cm = listCm.length
            this.woStatus.no = listNo.length
            this.woStatusData = []
            for(var key in this.woStatus) {
              this.woStatusData.push({
                'name': key + ':' + this.woStatus[key],
                'value': this.woStatus[key]
              })
            }
          }
        }, (_error) => {
          console.log('error:' + JSON.stringify(_error))
        })
    },
    getEquipmentImage() {
      this.$ajax.url = selectConfig.img.fileList.url
      this.$ajax.param = this.$comm.clone(selectConfig.img.fileList.searchData)
      this.$ajax.param.attachType = 'EQUIP_PHOTO'
      this.$ajax.param.attachPk = this.pk // 417

      this.$ajax.requestGet((_result) => {
        if (!_result.length) {
          this.thumbnailUrl = noImage
          this.equipmentTitleColor = 'indigo--text'
          return
        }
        this.getThumbnail(_result[0].filePk)
      })
    },
    getThumbnail(_filePk) {
      ajaxFile.url = selectConfig.img.thumbnail.url + '?filePk=' + _filePk     
      
      let self = this
      ajaxFile.requestFileGet((_result) => {
        self.$nextTick(() => {
          // self.thumbnailUrl = self.$comm.getImgFileAsUrl(_result)
          self.equipmentTitleColor = 'white--text'
          self.thumbnailUrl = window.URL.createObjectURL(_result)
        })       
      }, (_error) => {
        self.thumbnailUrl = null
      })
    }
  }
}
</script>

<style>
.border {
  border: 1px solid #0000ff;
}
.content {
  background-color: #F6F7FB
}
.expired {
  text-decoration-line: line-through;
}
</style>