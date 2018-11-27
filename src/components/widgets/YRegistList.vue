<!--
  목적 : 컴포넌트
  Detail :
  *
  examples:
  *
  -->
<template>
  <div>
    <div class="caption mb-2">{{title}}</div>
    <v-card>
      <v-card-title class="pa-0 ma-0">
      <!-- <v-toolbar color="primary" flat  dark> -->
      <v-toolbar color="white" white flat dense cad>
        <v-toolbar-side-icon>
          <v-icon v-if="editable" color="indigo">{{icon}}</v-icon>
          <v-icon v-else>https</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title class="hidden-sm-and-down theme--light">{{controlTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <y-select
          v-show="editable"
          ref="select"
          color="indigo"
          :is-clear-text="true"
          :placeholder="controlTitle"
          :item-search-key="selectItemKey"
          :name="selectItemKey"
          :editable="editable"
          v-model="selectValue"
        >
        </y-select>
        <span v-show="!editable">
          {{$t('title.readOnlyMode')}}
        </span>
      </v-toolbar>
      </v-card-title>
      <v-divider></v-divider>
      <v-card flat>
        <v-card-title class="caption grey--text">
          {{$t('title.selectedItems')}}
        </v-card-title>
        <v-card-media max-height="300" class="vscroll">
          <v-list 
            subheader
            three-line
          >
            <template 
              v-for="(item, i) in selectedList">
            <v-list-tile 
              :key="item.pk"
              :class="{'grey lighten-5': (i > 1 && i % 2 === 0), 'indigo lighten-5': (i === 0)}"
            >
              <v-list-tile-content >
                <v-list-tile-title :class="{'strikethrough': item.isCancel}">
                  {{item.name}}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  <div style="width:100%;">
                    <span
                      v-if="item.hint"
                      class="body-2"
                    >
                      {{hintTitle}}: {{item.hintDisplay}}
                    </span>
                    <v-text-field
                      v-if="editable"
                      custom-class="pt-0"
                      name="workTitle"
                      :placeholder="comboPlaceholder"
                      :hint="item.hint ? item.hint.toString() : null"
                      v-model="item.value"
                      :clearable="editable"
                      hide-details
                      class="ma-0 pa-0"
                      @input="(_value) => {
                        item.value = Number(_value)
                        setSummary()
                      }"
                    />
                    <v-text-field
                      v-else
                      custom-class="pt-0"
                      name="workTitle"
                      :value="$comm.setNumberSeperator(item.value)"
                      hide-details
                      readonly
                      class="ma-0 pa-0"
                    />
                  </div>
                </v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn
                  v-if="editable"
                  icon
                  @click.stop="setCancel(item)"
                >
                  <v-icon color="indigo">highlight_off</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            </template>
            <div v-if="!selectedList.length"
                class="text-xs-center indigo--text">
                {{$t('message.noData')}}
              </div>
          </v-list>
        </v-card-media>
        <v-divider></v-divider>
        <v-card-actions>
          <div class="caption indigo--text">{{subTitle}} : {{selectCount}} {{$t('title.things')}}</div>
          <v-spacer></v-spacer>
          <div class="caption indigo--text">{{titleOfTotal}} : {{summary}}</div>
        </v-card-actions>
      </v-card>
  </v-card>
  </div>
</template>

<script>
import comboConfig from '@/js/comboConfig'
import $ from 'jquery'

var baseHeight=88
export default {
  /* attributes: name, components, props, data */
  name: 'y-regist-list',
  props: {
    title: String,  // 컴포넌트 메인 타이틀
    subTitle: String, // 컴포넌트 서브 타이틀(요약 영역 chip에 표시되는 타이틀)
    controlTitle: String, // 선택용 컨트롤에 표시되는 타이틀(화면크기가 sm이상 일 경우 표시))
    selectItemKey: String,  // select 컨트롤의 키
    itemTitle: String,
    rowCount: {
      type: Number,
      default: 5
    },
    items: {
      type: Array,
      default: null
    },
    // grid 항목 정보
    itemInfo: {
      type: Object,
      default: null
    },
    editable: { // 수정 가능여부
      type: Boolean,
      default: true
    },
    // // 등록된 개수
    // selectCount: {
    //   type: Number,
    //   default: 0
    // },
    titleOfTotal: {
      type: String
    },
    // 힌트에 사용할 키
    hintKey: {
      type: String
    },
    hintUnit: {
      type: String
    },
    threeLine: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: 'create'
    },
    comboPlaceholder: {
      type: String,
      default: ''
    },
    // 임금계산등 hint에 표시할 내용이 있을 경우 기준정보 조회
    hintItemKey: {
      type: String,
      default: ''
    },
    // hint 내용을 비교할 pk
    hintPk: {
      type: String,
      default: ''
    },
    // hint와 함께 표시되는 타이틀
    hintTitle: {
      type: String,
      default: ''
    },
    isHintNumber: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    selectValue: null,
    selectedList: [],
    selectCount: 0,
    summary: 0,
    height: baseHeight,
    baseHeight: baseHeight,
    twoLine: true,   
    hintItems: [],
    hint: null
  }),
  watch: {
    // 선택값이 변경되면 중복여부를 확인후 없으면 추가 있으면 추가하지 않음
    selectValue() {
      var hint = null
      
      if (this.selectValue) {
        var selectItem = this.$refs.select.getSelectItem()
        // 다른 기준정보에서 데이터를 가져와야 할 경우
        if (this.hintItemKey) {
          if (selectItem) hint = this.setHint(selectItem.item)
        } else if (this.hintKey) {  // 현재 정보에서 데이터를 가져와야 할 경우
          if (selectItem) {
            hint = selectItem.item[this.hintKey]
          }
        }
        this.addDataToList(hint)
      }
    },
    items() {
      if (this.items) {
        console.log('------------> YRegist Init')
        this.init()
        this.height = this.selectedList.length * baseHeight
        this.selectCount = this.selectedList.length;
        this.setSummary()
      }
    },
    threeLine() {
      if (this.threeLine) this.twoLine = false
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount() {
    // 힌트에 사용할 키가 있다면 조회해서 hintItems에 담아둔다.
    if (this.hintItemKey) this.getHintItems()
  },
  mounted() {
    console.log('------------> mounted' + this.items)
    if (!this.selectedList.length) this.init()
  },
  //* methods */
  methods: {
    // 초기화 : 기존 등록된 정보를 가져옴
    init() {
      var selectedList = []
      var hint = null
      $.each(this.items, (_i, _item) => {
        var selectItem = this.$refs.select.getSelectItem(_item.pk)
        // 다른 기준정보에서 데이터를 가져와야 할 경우
        if (this.hintItemKey) {
          if (selectItem) hint = this.setHint(selectItem.item)
          _item.hint = hint
          _item.hintDisplay = this.isHintNumber ? this.$comm.setNumberSeperator(hint) : hint
        }
        selectedList.push(_item)
      })
      this.$set(this, 'selectedList', selectedList)
    },
    addDataToList(_hint) {
      // 중복여부 확인
      var filter = []
      if (this.selectedList.length) {
        filter = this.selectedList.filter((_item) => {
          return this.selectValue === _item.pk
        })
      }
      // 기존에 추가되었으면 추가 안함
      if (filter.length > 0) return
      var selectedItem = this.$refs.select.getSelectItem()
      var item = selectedItem.item
      var itemInfo = selectedItem.itemInfo
      var name = item[itemInfo.key]

      var hintDisplay = this.isHintNumber ? this.$comm.setNumberSeperator(_hint) : _hint
      
      var item = {
        pk: this.selectValue,
        name: name,
        hint: _hint,
        hintDisplay: hintDisplay,
        value: null,
        workHr: null,
        isCancel: false // 취소선 표시여부
      };
      this.selectedList.unshift(item)
      this.height = this.selectedList.length * baseHeight
      this.selectCount = this.getSelectedItems().length
    },
    // 추가한 내용을 취소할 경우
    setCancel(_item) {
      _item.isCancel = !_item.isCancel
      this.setSummary()
      this.selectCount = this.getSelectedItems().length
    },
    // 선택한 내용을 부모에게 반환(취소된 것 제외)
    getSelectedItems() {
      return this.selectedList.filter((_item) => {
        return !_item.isCancel
      })
    },
    // 요약 설정
    setSummary() {
      var summary = this.selectedList.reduce(function (sum, _item) {
          if (!_item.isCancel) return sum + (_item.value ? _item.value : 0)
          else return sum
      }, 0);
      this.summary = this.$comm.setNumberSeperator(isNaN(summary) ? 0 : summary)
      this.$emit('registListChanged')
    },
    // 콤보박스의 전체 정보를 가져오는 함수
    getAllInfoOfCombo() {
      return this.$refs.select.getItems()
    },
    // 힌트에 사용할 키가 있다면 조회해서 hintItems에 담아둔다.
    getHintItems() {
      this.$ajax.url = comboConfig[this.hintItemKey].url
      this.$ajax.param = null
      let self = this
      this.$ajax.requestGet((_result) => {
        self.hintItems = typeof _result.content !== 'undefined' ? _result.content : _result
      })
    },
    // 힌트 정보를 가져와서 세팅
    setHint(_currentSelectInfo) {
      var filter = this.hintItems.filter((_item) => {
        return _item[this.hintPk] === _currentSelectInfo[this.hintPk]
      })
      var hint = filter.length > 0 ? filter[0][this.hintKey].toString() : null
      return hint
    }
  }
}
</script>

<style>
.strikethrough {
  text-decoration: line-through;
  font-style: oblique;
}
.vscroll {
  overflow-y:auto;
}

</style>
