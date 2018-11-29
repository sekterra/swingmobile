<!--
목적 : AutoComplete 기반 select 컴포넌트
Detail :
  comboConfig.js 정보를 참고하여 컴포넌트 렌더링시 select 데이터 조회 해서 option 추가
 * 
examples: 
 *  
-->
<template>
  <div>
    <v-autocomplete
      v-if="editable"
      ref="autocomplete"
      :color="color"
      :label="label"
      :name="name"
      :items="items"
      :item-text="itemText"
      :item-value="itemValue"
      v-model="vValue"
      @input="input"
      :hide-selected="hideSelected"
      :error="error"
      :error-messages="errorMsg"
    ></v-autocomplete>
    <v-text-field
      v-else
      v-model="text"
      :placeholder="text ? null : $t('message.noData')"
      :label="label"
      readonly
      ></v-text-field>
  </div>
</template>

<script>
import comboConfig from '@/js/comboConfig'
export default {
  /* attributes: name, components, props, data */
  name: 'y-autocomplete',
  $_veeValidate: {
    name() {
      return this.name;
    },
    value() {
      return this.vValue;
    }
  },
  props: {
    // selectConfig.js에 있는 select 검색용 키
    itemSearchKey: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    label: {  // 부모로 부터 받아온 라벨 정보
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
    // 중복 방지를 위해 선택된 값을 숨겨야 할 경우
    hideSelected: {
      type: Boolean,
      default: false
    },
    // 선택 후 초기화 시켜야 할 경우
    isClearText: {
      type: Boolean,
      default: false
    },
    color: {
      type: String
    }
  },
  data() {
    return {
      items: [],
      item: {},
      itemText: null,
      itemValue: null,
      itemSubValue: null,
      vValue: null,
      text: null,
      orgItems: []
    }
  },
  computed: {
    // 현재 컨트롤에 에러가 존재하는지 여부
    error() {
      return this.errorMsg && this.errorMsg.length > 0
    }
  },
  watch: {
    item() {
      if (!this.item) return
      this.itemText = this.item.itemName
      this.itemValue = this.item.itemKey
    },
    items() {
      this.vValue = this.value
    },
     // todo : 부모의 v-model 변경을 감시(예를 들면, db로부터 데이터를 조회 한 후 값을 바인딩 할 경우)
    value() {
      this.vValue = this.value
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount() {
    this.getSelectItems()
  },
  /* methods */
  methods: {
    getSelectItems() {
       if (!this.itemSearchKey) return
      this.item = comboConfig[this.itemSearchKey]
      this.$ajax.url = this.item.url
      this.$ajax.param = null
      let self = this
      this.$ajax.requestGet((_result) => {
        self.items = typeof _result.content !== 'undefined' ? _result.content : _result
        if (self.items.length > 0) {
          var item = {}
          item[this.item.itemName] = '-'
          item[this.item.itemKey] = null
          self.items.unshift(item)
        }
        if (!this.editable) this.getSelectedText()
      }, (_error) => {
        console.log('_error' + JSON.stringify(_error))
      })
    },
    input() {
      // TODO : 부모에게 변경여부 전달
      this.$emit('input', this.vValue)
      this.$refs.autocomplete.$refs.input.blur()
      window.getApp.$emit('APP_KEYBOARD_HIDE')
      // 선택후 텍스트 값 초기화
      if (this.isClearText) {
        this.$nextTick(() => {
            this.vValue = null
        })
      }
    },
    getSelectItem(_pk) {
      var pk = _pk
      pk = _pk ? _pk : this.vValue
      if (!pk) return null
      var filter = this.items.filter((_item) => {
        return _item[this.item.itemKey] === pk
      })

      if (filter.length <= 0) return null
      var value = {
        item: filter[0],
        itemInfo: {
          key: this.itemText,
          value: this.itemValue
        }
      }
      return value
    },
    getItems() {
      return this.items
    },
    getSelectedText() {
      if (!this.value) this.text = null
      else {
        var filter = this.items.filter((_item) => {
          return _item[this.item.itemKey] === this.value
        })
        if (filter.length > 0) this.text = filter[0][this.item.itemName]
        else this.text = null
      }
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
