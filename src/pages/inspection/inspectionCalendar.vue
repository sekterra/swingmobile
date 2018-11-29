<template>
  <div id="page-forms">
    <v-container>
      <v-layout column>
        <v-flex xs12>
          <v-card>
            <v-toolbar color="indigo lighten-3" dark flat dense cad>
              <v-toolbar-title class="subheading">{{$t('title.inspectionCalendar')}}</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text>
              <full-calendar 
                ref="calendar" 
                :config="config" 
                :events="events" 
                @view-render="getInspectionData" 
                @event-selected="openInspectionDetail"/>
            </v-card-text>
          </v-card>
        </v-flex>           
      </v-layout>
    </v-container>
    <y-dialog
      :is-open-dialog="isOpenDialog"
      :is-popup="true"
      :is-fullscreen="true"
      :title="config.popupTitle"
      type="info"
      @dialogResult="dialogResult"
    >
      <y-inspection-detail
        :pk="selectedPk"
        slot="body"
      >
      </y-inspection-detail>
    </y-dialog>
  </div>
</template>

<script>
import selectConfig from '@/js/selectConfig';
import $ from 'jquery'

export default {
  /* attributes: name, components, props, data */
  props: {
  },
  data() {
    return {
      events: [],
			config: {
        defaultView: 'month',
        height: 'auto',
        locale: null,
        defaultDate: null,
        eventLimit: true,
        popupTitle: '',
        header: {
          left:   'title',
          center: '',
          right:  'today prev,next'
        },
				eventRender(event, element) {
    		}
      },
      selectedPk: null,
      isOpenDialog: false,
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount() {
    Object.assign(this.$data, this.$options.data());
  },
  mounted() {
    window.getApp.$on('LOCALE_CHANGE', (_localeCode) => {
      this.locale = this.$comm.moment().locale()
      this.defaultDate = this.$comm.moment()
      $('#calendar').fullCalendar('option', 'locale', this.locale);
    });
  },
  beforeDestroy () {
    // TODO : remove event listener, 삭제 하지 않으면 이벤트가 중복 발생됨
    window.getApp.$off('LOCALE_CHANGE')
 },
  /* methods */
  methods: {
    getInspectionData(_view) {
      var currentYearMon = this.$comm.moment(_view.intervalStart).format('YYYYMM')
      this.$ajax.url = selectConfig.inspection.inspectionCalendar.url + currentYearMon
      var self = this
      self.events = []
      this.$ajax.requestGet((_result) => {
        $.each(_result, function (_i, _item) {
          var event = {}
          event.pk = _item.chkPlanPk
          event.mastPk = _item.chkMastPk
          event.mastName = _item.chkMastNm
          event.title = '[' + _item.chkPlanNo + '] ' + _item.chkMastNm
          event.start = _item.chkPlanDt.substr(0, 4) + '-' + _item.chkPlanDt.substr(4, 2) + '-' + _item.chkPlanDt.substr(6, 2)
          event.color = _item.chkStatus === 'Y' ? '#66BB6A' : '#5C6BC0'
          // event.color = _item.chkPlanPk === null ? '#BDBDBD' : '#D88168'
          self.events.push(event)
        })
      })
    },
    dialogResult() {
      this.isOpenDialog = false
    },
    openInspectionDetail(_event, _jsEvent, _view) {
      this.selectedPk = _event.pk
      this.isOpenDialog = true
      this.config.popupTitle = _event.mastName + ' ' + this.$t('title.inspection')
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

.border {
  border: 1px solid #0000ff;
}
</style>
