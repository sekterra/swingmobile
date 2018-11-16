<!--
목적 : v-date-picker기반 datepicker 컴포넌트
Detail :
 * 주의사항 :
  - vee-validate를 사용하여 유효성 검사
  - 여기서는 컴포넌트 자체에서 발생하는 유효성을 검사
  - 부모에서는($validator.validateAll 함수 호출 시) 별도로 추가해야 함
  - 즉, 유효성 검사를 2중 체크를 하고 있으며 이는 나중에 개선해야 할 사항임
examples: 
 *  <YDatepicker 
      label="요청일*"
      name="rqstDt"
      v-model="saveData.workOrder.rqstDt"
      defaultType="today"
      validate-type="required"
      :parentValidateCheck="validateCheck"
      >
    </YDatepicker>
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
      <v-date-picker
        v-model="vValue"
        @input="input"
        :name="name"
        :locale="locale"
        no-title
        scrollable
        autosave>
      </v-date-picker>
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
// require("moment/min/locales.min");
export default {
   /* attributes: name, components, props, data */
  name: 'y-datepicker',
  // TODO : veeValidate error를 처리하기 위해 선언해야 하는 부분
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
    value: {
      type: [String, Date],
      default: null
    }
  },
  data() {
    return {
      datePickerMenu: null,
      vValue: null, // TODO : datepicker 내부 값, YYYY-MM-DD(ISO 표준) 형태의 값
      localFormattedDate: null, // TODO : 날짜 값을 표시하는 v-text-field에 표시되는 값으로 local date format 형태의 값(언어 설정 변경시 같이 변경됨)
      locale: window.getApp.locale.datepicker
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
    vValue() {
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
    console.log('LOCALE_CHANGE :::: ' + this.locale + ' : ' + this.vValue + ' : ' + this.$comm.moment().locale())
    if (!this.defaultType) return
    if (this.defaultType === 'today') {
      if (this.value) this.vValue = this.value
      else this.vValue = this.$comm.getToday()
    } else {
      this.vValue = this.$comm.getPrevDate(this.defaultType)
    }
  },
  /* methods */
  methods: {
    input() {
      this.$refs.datePickerMenu.save(this.vValue);
      this.$emit('input', this.vValue);
    },
    /**
     * delete icon 클릭시 값 초기화
     */
    clearValue() {
      this.vValue = null
      this.localFormattedDate = null
      this.$refs.datePickerMenu.save(this.vValue);
      this.$emit('input', this.vValue);
    },
    // locale이 변경되었을 경우 datepicker의 값 변경
    setLocalFormattedDate() {
      var dateFormat = 'L'
      if (this.locale.toLowerCase() === 'ko-kr') dateFormat = 'YYYY-MM-DD'
      this.localFormattedDate = this.$comm.moment(this.vValue).format(dateFormat);
      this.$emit('input', this.vValue);
    },
  }
}
</script>

<style>
::-webkit-input-placeholder {
   font-style: italic;
   font-size: 1rem;
}
:-moz-placeholder {
   font-style: italic;
   font-size: 1rem;  
}
::-moz-placeholder {
   font-style: italic;
   font-size: 1rem;  
}
:-ms-input-placeholder {  
   font-style: italic;
   font-size: 1rem; 
}
</style>
