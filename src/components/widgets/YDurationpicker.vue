<!--
  목적 : 기간 선택 컴포넌트
  Detail :
  *
  examples:
  *
  -->
<template>
  <div>
      <v-menu
      v-if="editable"
      ref="datePickerMenu"
      :close-on-content-click="false"
      v-model="datePickerMenu"
      :nudge-right="40"
      :return-value.sync="vValue"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="100px"
      class="mb-0"
      >
      <v-text-field
        slot="activator"
        ref="date"
        v-model="localFormattedDate"
        :label="label"
        prepend-icon="event"
        readonly
        clearable
        @click:clear="clearValue"
        :error="error"
        :error-messages="errorMsg"
        >
      </v-text-field>
      <template>
        <v-card>
          <v-container fluid grid-list-sm text-xs-center>
            <v-layout row wrap fill-height>
            <v-flex xs12 sm6>
              <v-layout column>
                <div class="text-xs-left title">
                  <v-icon color="indigo">date_range</v-icon>From
                </div>
                <v-date-picker
                  ref="from"
                  v-model="vValueFrom"
                  @input="inputFrom"
                  :name="name"
                  :locale="locale"
                  :min="fromMin"
                  :max="fromMax"
                  full-width
                  no-title
                  scrollable
                  autosave>
                </v-date-picker>
              </v-layout>
            </v-flex>
            <v-flex xs12 sm6>
              <v-layout column>
              <div class="text-xs-left title">
                <v-icon color="indigo">date_range</v-icon>To
              </div>
              <v-date-picker
                ref="to"
                v-model="vValueTo"
                @input="inputTo"
                :name="name"
                :locale="locale"
                :min="toMin"
                :max="toMax"
                full-width
                no-title
                scrollable
                autosave>
              </v-date-picker>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <div>
              <v-btn 
                dark
                round
                color="indigo lighten-1"
                @click="durationSelect">
                <v-icon color="indigo darken-3">
                  done
                </v-icon>
                 {{localFormattedDate}}
              </v-btn>
              </div>
            </v-flex>
          </v-layout>
          </v-container>
        </v-card>
    </template>
    </v-menu>
    <v-text-field
      v-else
      v-model="vValue"
      :placeholder="vValue ? null : $t('message.noData')"
      :label="label"
      readonly
      ></v-text-field>
  </div>
</template>

<script>
let localeMapper = require('@/locale/localeMapper.json');
export default {
  /* attributes: name, components, props, data */
  name: 'y-durationpicker',
  $_veeValidate: {
    name() {
      return this.name;
    },
    value() {
      return this.vValue;
    }
  },
  props: {
    label: {
      type: String,
      default: '날짜를 선택하세요.'
    },
    name: {
      type: String,
      default: 'date'
    },
    defaultType: {
      type: String,
      default: ''
    },
    childValidateType: {
      type: [String, Object],
      default: null
    },
    // TODO : 부모로 부터 에러 메시지를 받아옴
    errorMsg: {
      type: String,
      required: false,
    },
    // 쓰기 권한 여부
    editable: {
      type: Boolean,
      default: true
    },
    // TODO : 부모의 v-model의 값을 받아오는 속성
    // ex) value = { fromDate: 2018-01-01 ~ toDate: 2018-01-10 }
    value: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      datePickerMenu: null,
      vValueFrom: null, // TODO : datepicker 내부 값, YYYY-MM-DD(ISO 표준) 형태의 값
      vValueTo: null,
      vValue: {
        fromDate: null,
        toDate: null
      },
      localFormattedDate: null,
      fromMin: null,
      fromMax: null,
      toMin: null,
      toMax: null,
      locale: window.getApp.locale.datepicker,
      isoDateFormat: 'YYYY-MM-DD' // TODO : 날짜 값을 표시하는 v-text-field에 표시되는 값으로 local date format 형태의 값(언어 설정 변경시 같이 변경됨)
    }
  },
  watch: {
    // todo : 부모의 v-model 변경을 감시
    value() {
      this.vValue = this.value
    }
  },
  computed: {
    // 현재 컨트롤에 에러가 존재하는지 여부
    error() {
      return this.errorMsg && this.errorMsg.length > 0
    }
  },
  watch: {
    errorMsg() {
      console.log(':::::::::: debug:' + this.errorMsg)
    },
    vValue () {
      this.setLocalFormattedDate();
    },
    vValueFrom() {
      this.setLocalFormattedDate();
    },
    vValueTo() {
      this.setLocalFormattedDate();
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount() {
    window.getApp.$on('LOCALE_CHANGE', (_localeCode) => {
      // datepicker의 언어설정
      this.locale = localeMapper[_localeCode].datepicker;
      this.setLocalFormattedDate()
    });
  },
  mounted() {
    console.log('Duration LOCALE_CHANGE :::: ' + this.locale + ' : ' + this.vValue + ' : ' + this.$comm.moment().locale())
    if (this.defaultType === 'today') {
      if (this.value) {
        this.vValueFrom = this.value.fromDate
        this.vValueTo = this.value.toDate
      }
      else {
        this.vValueFrom = this.$comm.getToday()
        this.vValueTo = this.$comm.getToday()
        this.setLocalFormattedDate()
      }
    }
  },
  /* methods */
  methods: {
    inputFrom() {
      this.toMin = this.vValueFrom
      this.toMax = null
    },
    inputTo() {
      this.fromMin = null
      this.fromMax = this.vValueTo
    },
    /**
     * delete icon 클릭시 값 초기화
     */
    clearValue() {
      // this.vValue = null
      this.vValueFrom = null
      this.vValueTo = null
      this.vValue = {
        fromDate: null,
        toDate: null
      }
      this.$refs.datePickerMenu.save(this.vValue);
      this.$emit('input', this.vValue);
    },
    // locale이 변경되었을 경우 datepicker의 값 변경
    setLocalFormattedDate() {
      if (!this.vValueFrom || !this.vValueTo) return
      var dateFormat = 'L'
      if (this.locale.toLowerCase() === 'ko-kr') dateFormat = this.isoDateFormat;
      this.localFormattedDate = this.$comm.moment(this.vValueFrom).format(dateFormat) + ' ~ ' + this.$comm.moment(this.vValueTo).format(dateFormat);
    },
    durationSelect() {
      this.vValue.fromDate = this.vValueFrom;
      this.vValue.toDate = this.vValueTo;
      this.$refs.datePickerMenu.save(this.vValue);
      this.$emit('input', this.vValue);
    }
  }
}
</script>