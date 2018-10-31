<!--
목적 : 확장검색 기능을 지원하는 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <div>
    <v-menu
      v-if="editable"
      ref="menu"
      :close-on-content-click="false"
      v-model="menu"
      :nudge-right="40"
      :return-value.sync="vValue"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      max-width="290px"
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        v-model="vValue"
        :label="label"
        clearable
        readonly
        prepend-icon="access_time"
        @click:clear="clearValue"
        :error="error"
        :error-messages="errorMsg"
      ></v-text-field>
      <v-time-picker
        v-if="menu"
        v-model="vValue"
        @input="input"
        full-width
        :scrollable="false"
        @change="$refs.menu.save(vValue)"
      ></v-time-picker>
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
export default {
  /* attributes: name, components, props, data */
  name: 'y-timepicker',
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
    locale: {
      type: String,
      default: 'kr-ko'
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
  data: () => ({
    vValue: null,
    inputEventCount: 0,
    menu: false
  }),
  computed: {
    // 현재 컨트롤에 에러가 존재하는지 여부
    error() {
      return this.errorMsg && this.errorMsg.length > 0
    }
  },
  watch: {
    // todo : 부모의 v-model 변경을 감시
    value() {
      this.vValue = this.value
    },
    menu() {
      // 값이 있을 경우 input Event 숫자 체크 초기화
      if (this.menu && this.vValue) this.inputEventCount = 0;
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  mounted() {
    if (!this.defaultType) return
    if (this.defaultType === 'current') {
      if (this.value) this.vValue = this.value
      else this.vValue = this.$comm.moment().format('HH:mm')
      this.$emit('input', this.vValue);
    } else {
      this.vValue = this.$comm.getPrevDate(this.defaultType)
      console.log('getPrevDate:' + this.vValue)
      this.$emit('input', this.vValue);
    }
  },
  /* methods */
  methods: {
    input() {
      this.inputEventCount++;
      // 시간과 분을 선택하면, 부모에게 전달
      if (this.inputEventCount === 2) {
        this.$refs.menu.save(this.vValue);
        this.$emit('input', this.vValue);
        console.log('ytimepicker : ' + this.vValue)
      }
    },
    /**
     * delete icon 클릭시 값 초기화
     */
    clearValue() {
      this.vValue = null;
      this.inputEventCount = 1;  // 버그(?) 인지는 모르겠지만 초기화 시키고 input 이벤트가 한번만 발생 됨
      this.$refs.menu.save(this.vValue);
      this.$emit('input', this.vValue);
    }
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