<!--
  목적 : 컴포넌트
  Detail :
  *
  examples:
  *
  -->
<template>
  <div>
    <div class="caption grey--text">{{title}}</div>
    <v-card>
      <v-card-title class="pa-0 ma-0">
      <v-toolbar color="primary" flat  dark>
        <v-toolbar-side-icon>
          <v-icon v-if="editable">{{icon}}</v-icon>
          <v-icon v-else>https</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title class="hidden-sm-and-down">{{controlTitle}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <y-select
          v-if="editable"
          ref="select"
          color="grey lighten-3"
          :is-clear-text="true"
          :placeholder="controlTitle"
          :item-search-key="selectItemKey"
          :name="selectItemKey"
          :editable="editable"
          v-model="selectValue"
        >
        </y-select>
        <span v-else>
          {{$t('title.readOnlyMode')}}
        </span>
      </v-toolbar>
      </v-card-title>
      <v-card flat>
        <v-card-title class="caption grey--text">{{$t('title.selectedItems')}}</v-card-title>
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
                      v-if="itemTitle"
                    >
                      {{itemTitle}} : {{item.itemTitle}}
                    </span>
                    <v-text-field
                      :editable="editable"
                      custom-class="pt-0"
                      name="workTitle"
                      placeholder="여기에 비용을 입력하세요."
                      :hint="item.hint"
                      v-model="item.cost"
                      hide-details
                      class="ma-0 pa-0"
                      @input="(_value) => {
                        item.cost = Number(_value)
                        setTotalCost()
                      }"
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
          <div class="caption indigo--text">{{titleOfTotal}} : {{totalCost}}</div>
        </v-card-actions>
      </v-card>
  </v-card>
  </div>
</template>

<script>
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
    items: Array,
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
    }
  },
  data: () => ({
    selectValue: null,
    selectedList: [],
    selectCount: 0,
    totalCost: 0,
    height: baseHeight,
    baseHeight: baseHeight,
    twoLine: true,   
    hint: null
  }),
  watch: {
    // 선택값이 변경되면 중복여부를 확인후 없으면 추가 있으면 추가하지 않음
    selectValue() {
      if (this.selectValue) this.addDataToList()
    },
    items() {
      if (this.items) {
        this.selectedList = this.$comm.clone(this.items)
        this.height = this.selectedList.length * baseHeight
        this.selectCount = this.selectedList.length;
        this.setTotalCost()
      }
    },
    threeLine() {
      if (this.threeLine) this.twoLine = false
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  //* methods */
  methods: {
    addDataToList() {
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
      var hint = ''
      if (this.hintKey && item.hasOwnProperty(this.hintKey)) hint = item[this.hintKey]
      var item = {
        pk: this.selectValue,
        name: name,
        hint: hint.toString(),
        cost: null,
        isCancel: false // 취소선 표시여부
      };
      this.selectedList.unshift(item)
      this.height = this.selectedList.length * baseHeight
      this.selectCount = this.getSelectedItems().length
    },
    // 추가한 내용을 취소할 경우
    setCancel(_item) {
      _item.isCancel = !_item.isCancel
      this.setTotalCost()
      this.selectCount = this.getSelectedItems().length
    },
    // 선택한 내용을 부모에게 반환(취소된 것 제외)
    getSelectedItems() {
      return this.selectedList.filter((_item) => {
        return !_item.isCancel
      })
    },
    // 총 합계 비용 계산
    setTotalCost() {
      var totalCost = this.selectedList.reduce(function (sum, _item) {
          if (!_item.isCancel) return sum + (_item.cost ? _item.cost : 0)
          else return sum
      }, 0);
      this.totalCost = this.$comm.setNumberSeperator(isNaN(totalCost) ? 0 : totalCost)
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
