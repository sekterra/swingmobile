<!--
목적 :  설비 요약 카드 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <div id="page-alerts">
    <v-container grid-list-xl fluid class="pa-0">
      <v-layout row wrap>
        <!-- <v-flex lg12>
          <v-widget 
            :title="equipment.equipNm" 
            :icon="titleIcon"
            >
            <div slot="widget-header-action">
              <v-fab-transition>
                <v-btn
                  :color="activeFab.color"
                  :key="activeFab.icon"
                  v-model="fab"
                  small
                  fab
                  depressed
                  @click="isOpen = !isOpen"
                >
                  <v-icon>{{ activeFab.icon }}</v-icon>
                </v-btn>
              </v-fab-transition>
            </div>
            <v-container slot="widget-content" transition="slide-y-transition" class="ma-0">
              <v-layout wrap v-if="isOpen && equipment">
                <v-layout column>
                  <y-chip type="code" :text="`[` + equipment.equipPk + `]` + equipment.equipNm"></y-chip>
                  <y-chip type="warranty" :text="equipment.warrantyDt" v-if="!equipment.isExpired"></y-chip>
                  <y-chip type="expired" :text="equipment.warrantyDt" v-if="equipment.isExpired"></y-chip>
                  <y-chip type="location" :text="equipment.locNm"></y-chip>
                  <y-chip type="costs" :text="equipment.buyCost"></y-chip>
                </v-layout>
                <v-layout row>
                    <v-flex sm12>
                      <y-chip type="maint_type_pm" text="3"></y-chip>
                      <y-chip type="maint_type_bm" text="5"></y-chip>
                      <y-chip type="maint_type_cm" text="5"></y-chip>
                      <y-chip type="maint_type_no" text="5"></y-chip>
                    </v-flex>
                  </v-layout>
              </v-layout>
              <v-layout wrap v-else-if="equipment">
                  <v-spacer></v-spacer>
                  <v-btn flat small dark color="primary" @click="isOpen = !isOpen">
                  <v-icon dark>list</v-icon>
                  <span>more</span>
                  <v-spacer></v-spacer>
                  </v-btn>
              </v-layout>
              <v-layout wrap v-else>
                <span>Choose a Equipment</span>
              </v-layout>
            </v-container>
          </v-widget>
        </v-flex> -->
        <v-flex lg12>
          <v-widget title="Equipment">
            <v-layout slot="widget-content" v-if="equipment">
              <v-layout justify-center column>
                <v-expansion-panel inset v-model="isExpanded">
                  <v-expansion-panel-content>
                    <v-layout align-center row spacer slot="header">
                      <v-flex>
                        <h3>
                          <y-loading-button v-if="equipment.equipStatusCd === 'EQUIP_STATUS_O'" ></y-loading-button>
                          <v-icon v-else-if="equipment.equipStatusCd === 'EQUIP_STATUS_B'">cached</v-icon>
                          <v-icon v-else-if="equipment.equipStatusCd === 'EQUIP_STATUS_D'" color="error">not_interested</v-icon>
                          <span>{{equipment.equipNm}}</span>
                        </h3>
                      </v-flex>
                    </v-layout>
                    <!-- 본문 -->
                    <v-flex xs12 sm6>
                      <v-card flat tile>
                        <v-card-text class="content">
                          <v-layout>
                            <v-flex layout column>
                              <!-- <span class="body-2"><h3>{{equipment.equipNm}}</h3></span> -->
                              <div>
                                <v-icon class="mr-3" :color="equipment.color">local_offer</v-icon>
                                <span>{{equipment.equipCd}}</span>
                              </div>
                              <div>
                              <v-icon class="mr-3" :color="equipment.color">room</v-icon>
                                <span>{{equipment.locNm}}</span>
                              </div>
                              <div>
                                <v-icon class="mr-3" :color="equipment.color">event</v-icon>
                                <span :class="{'expired': equipment.isExpired}">2018-09-11</span>
                              </div>
                            </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex xs12>
                      <v-widget title="WO발행" content-bg="white">
                        <div slot="widget-content">
                          <e-chart 
                            v-if="woData.length > 0"
                            ref="woChart"
                            :path-option="[
                              ['dataset.source', woData],
                              ['legend.bottom', '0'],
                              ['color', [color.lightBlue.base, color.indigo.base, color.pink.base, color.green.base, color.cyan.base, color.teal.base]],
                              ['xAxis.show', false],
                              ['yAxis.show', false],
                              ['series[0].type', 'pie'],
                              ['series[0].avoidLabelOverlap', true],
                              ['series[0].labelLine.show', false],
                              ['series[0].label.show', false],
                              ['series[0].radius', ['50%', '70%']],
                            ]"
                            height="300px"
                            width="100%"
                          >
                          </e-chart>
                        </div>
                      </v-widget>
                    </v-flex>
                    <!-- /본문 -->
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-layout>
            </v-layout>
          </v-widget>         
        </v-flex>
        <v-flex lg12>
          <v-widget title="Advance usage">
            <div slot="widget-content">
              <v-layout justify-center column class="ma-0">
                <v-subheader>
                  <v-icon color="success">autorenew</v-icon> [T-0001] EQUIP
                </v-subheader>
                <v-expansion-panel popout>
                  <v-expansion-panel-content
                    hide-actions
                    v-for="(message, i) in messages"
                    :key="i"
                  >
                    <v-layout align-center row spacer slot="header">
                      <v-flex xs4 sm2 md1>
                        <v-avatar
                          size="36px"
                          slot="activator"
                        >
                          <img
                            src="/static/avatar/me.jpeg"
                            alt=""
                            v-if="message.avatar"
                          >
                          <v-icon :color="message.color" v-else>{{ message.icon }}</v-icon>
                        </v-avatar>aaa
                      </v-flex>
                      <v-flex sm5 md3 hidden-xs-only>
                        <strong v-html="message.name"/>
                        <span class="grey--text" v-if="message.total">&nbsp;({{ message.total }})</span>
                      </v-flex>
                      <v-flex no-wrap xs5 sm3>
                        <v-chip
                          label
                          small
                          :color="`${message.color} lighten-4`"
                          class="ml-0"
                          v-if="message.new"
                        >{{ message.new }} new</v-chip>
                        <strong v-html="message.title"/>
                      </v-flex>
                      <v-flex
                        class="grey--text"
                        ellipsis
                        hidden-sm-and-down
                        v-if="message.excerpt"
                      >
                        &mdash;
                        {{ message.excerpt }}!!!!!!!
                      </v-flex>
                    </v-layout>
                    <!-- 본문 -->
                    <v-card>
                      <v-divider></v-divider>
                      <v-card-text v-text="lorem"></v-card-text>
                    </v-card>
                    <!-- /본문 -->
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-layout>
            </div>
          </v-widget>
        </v-flex>
        <v-flex lg12>
          <v-widget title="Resizable">
            <div slot="widget-content">
              <v-container grid-list-md>
                <v-layout row wrap>
                  <v-flex xs12 sm6 md4>
                    <v-slider
                      v-model="slider"
                      :min="16"
                      :max="256"
                      label="Size"
                      thumb-label
                    ></v-slider>
                    <v-switch
                      label="Tile"
                      v-model="tile"
                    ></v-switch>
                  </v-flex>
                  <v-flex
                    xs12
                    sm6
                    md8
                    text-xs-center
                    layout
                    align-center
                    justify-center
                  >
                    <v-avatar
                      :tile="tile"
                      :size="avatarSize"
                      class="grey lighten-4"
                    >
                      <img src="/static/avatar/me.jpeg" alt="avatar">
                    </v-avatar>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from '@/components/VWidget';
import YLoadingButton from '@/components/widgets/YLoadingButton';
import mapper from '@/js/mapper.js';
import EChart from '@/components/chart/echart';
import color from 'vuetify/es5/util/colors';
import locationData from '@/api/chart';
import API from '@/api';
import selectConfig from '@/js/selectConfig'

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
    fab: false,
    hidden: false,
    tabs: null,
    isOpen: true, // delete
    isExpanded: 0,
    color: color,
    icons: ['fa-facebook', 'fa-twitter', 'fa-google-plus', 'fa-linkedin', 'fa-instagram'],
    woData: [],
    dataset: {
      location: locationData
    },
    url: '/equipment/',
    woUrl: '/workorder/',
    equipment: null,
    woStatus: {
      pm: 0,
      bm: 0,
      cm: 0,
      no: 0,
    },
    messages: [
      {
        avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
        name: 'John Leider',
        title: 'Welcome to Vuetify.js!',
        excerpt: 'Thank you for joining our community...'
      },
      {
        color: 'red',
        icon: 'people',
        name: 'Social',
        new: 1,
        total: 3,
        title: 'Twitter'
      },
      {
        color: 'teal',
        icon: 'local_offer',
        name: 'Promos',
        new: 2,
        total: 4,
        title: 'Shop your way',
        exceprt: 'New deals available, Join Today'
      }
    ],
    slider: 56,
    tile: false,    
    lorem: 'Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.'
  }),
  computed: {
    avatarSize () {
      return `${this.slider}px`;
    },
    activeFab () {
      // switch (this.tabs) {
      //   case 'one': return { 'color': 'indigo', icon: 'share' }
      //   case 'two': return { 'color': 'red', icon: 'edit' }
      //   case 'three': return { 'color': 'green', icon: 'keyboard_arrow_up' }
      //   default: return {}
      // }

      if (this.isOpen) return { 'color': 'transparent', icon: 'expand_more' }
      else return { 'color': 'transparent', icon: 'expand_less' }
    },
    locationData () {
      return API.getLocation;
    }
  }, 
  watch: {
    pk() {
      this.getEquipment()
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  mounted() {
    if (this.pk) this.getEquipment()
  },
  /* methods */
  methods: {
    getEquipment() {
      this.$nextTick(() => {
        this.$ajax.url = this.url + this.pk
        this.$ajax.param = null
        let self = this
        this.$ajax.requestGet((_result) => {
          self.equipment = _result
          self.equipment.isExpired = self.$comm.dateCompare(self.equipment.warrantyDt)
          if (_result.equipStatusCd === 'EQUIP_STATUS_O' || _result.equipStatusCd === 'EQUIP_STATUS_B') self.equipment.color = 'success'
          else if (_result.equipStatusCd === 'EQUIP_STATUS_D') self.equipment.color = 'error'
          this.getWoStatus(_result.equipCd)
        }, (_error) => {
          console.log('error:' + JSON.stringify(_error))
        })
      })
    },
    getWoStatus(_equipCd) {
        this.$ajax.url = selectConfig.woList[0].url
        this.$ajax.param = this.$comm.clone(selectConfig.woList[0].searchData)
        this.$ajax.param.searchText = _equipCd
        this.$ajax.param.woStatus = ['WO_STATUS_A','WO_STATUS_P']
        this.$ajax.param.startDate = this.$comm.getFirstDayThisYear()
        this.$ajax.param.endDate = this.$comm.getLastDayThisYear()
        let self = this
        this.$ajax.requestGet((_result) => {
          console.log('_result:' + JSON.stringify(_result))
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
            this.woData = []
            for(var key in this.woStatus) {
              this.woData.push({
                'name': key + ':' + this.woStatus[key],
                'value': this.woStatus[key]
              })
            }
          }
        }, (_error) => {
          console.log('error:' + JSON.stringify(_error))
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