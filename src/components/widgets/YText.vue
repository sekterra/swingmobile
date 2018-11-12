<!--
목적 : 확장검색 기능을 지원하는 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <div>
    <v-text-field
      v-if="editable"
      :label="label"
      :name="name"
      ref="control"
      v-model="vValue"
      :placeholder="placeholder"
      :append-outer-icon="icon"
      clearable
      :hide-details="hideDetail"
      :hint="hint"
      :class="customClass"
      :counter="counter"
      :maxlength="maxlength"
      @input="input"
      :error="error"
      :error-messages="errorMsg"
    ></v-text-field>
    <v-text-field
      v-else
      v-model="value"
      :placeholder="value ? null : $t('message.noData')"
      :label="label"
      readonly
      ></v-text-field>
  </div>
</template>

<script>
export default {
  /* attributes: name, components, props, data */
  name: 'y-text',
  $_veeValidate: {
    name() {
      return this.name;
    },
    value() {
      return this.vValue;
    }
  },
  props: {
    name: {
      type: String
    },
    label: {  // 부모로 부터 받아온 라벨 정보
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    // TODO : 부모로 부터 에러 메시지를 받아옴
    errorMsg: {
      type: String,
      required: false
    },
    // 쓰기 권한 여부
    editable: {
      type: Boolean,
      default: true
    },
    // TODO : 부모의 v-model의 값을 받아오는 속성
    value: {
      type: [Number, String],
      default: null
    },
    counter: {
      type: Number
    },
    maxlength: {
      type: Number
    },
    icon: {
      type: String
    },
    // 커스텀 클래스
    customClass: {
      type: String
    },
    hideDetail: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String
    }
  },
  data() {
    return {
      vValue: null
    }
  },
  computed: {
    // 현재 컨트롤에 에러가 존재하는지 여부
    error() {
      return this.errorMsg && this.errorMsg.length > 0
    }
  },
  watch: {
    // todo : 부모의 v-model 변경을 감시
    value() {
      console.log('y-text:' + this.value)
      this.vValue = this.value
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  /* methods */
  methods: {
    input() {
      // TODO : 부모에게 변경여부 전달
      this.$emit('input', this.vValue)
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

