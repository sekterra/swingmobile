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
          <v-icon v-if="editable">create</v-icon>
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
      <v-card flat :height="height" max-height="300" :min-height="baseHeight" class="vscroll">  
        <v-list 
          subheader
          two-line
        >
          <v-subheader>선택 목록</v-subheader>
          <template 
            v-for="(item, i) in selectedList">
          <v-list-tile 
            :key="item.pk"
            :class="{'grey lighten-5': (i > 1 && i % 2 === 0), 'indigo lighten-5': (i === 0)}"
          >
            <v-list-tile-avatar>
                <v-icon :class="{'amber': (i % 2 === 0), 'indigo': (i % 2 === 1), 'white--text': true}">assignment</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title :class="{'strikethrough': item.isCancel}">
                {{item.name}}
              </v-list-tile-title>
              <div>
                <y-text
                  :editable="editable"
                  custom-class="pt-0"
                  name="workTitle"
                  placeholder="여기에 비용을 입력하세요."
                  @input="(_value) => {
                    item.cost = Number(_value)
                    setTotalCost()
                  }"
                >
                </y-text>
              </div>
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
          <v-divider :key="'div_' + item.pk" />
          </template>
          <div v-if="!selectedList.length"
          class="text-xs-center indigo--text">
              {{$t('message.noData')}}
            </div>
        </v-list>  
      </v-card>

      <v-divider></v-divider>

      <v-list two-line subheader class="grey lighten-5">
        <v-subheader>{{$t('title.summary')}}</v-subheader>
      <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title class="indigo--text">{{subTitle}}</v-list-tile-title>
            <v-list-tile-sub-title>
              {{selectedList.length}}{{$t('title.things')}}
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile avatar>
          <v-list-tile-content>
            <v-list-tile-title  class="indigo--text">{{$t('title.totalCost')}}</v-list-tile-title>
            <v-list-tile-sub-title>{{totalCost}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
  </v-card>
  </div>
</template>

<script>
var baseHeight=80
export default {
  /* attributes: name, components, props, data */
  name: 'y-regist-list',
  props: {
    title: String,  // 컴포넌트 메인 타이틀
    subTitle: String, // 컴포넌트 서브 타이틀(요약 영역 chip에 표시되는 타이틀)
    controlTitle: String, // 선택용 컨트롤에 표시되는 타이틀(화면크기가 sm이상 일 경우 표시))
    selectItemKey: String,  // select 컨트롤의 키
    rowCount: {
      type: Number,
      default: 5
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
    // 등록된 개수
    selectCount: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    selectValue: null,
    selectedList: [],
    totalCost: 0,
    height: baseHeight,
    baseHeight: baseHeight
  }),
  watch: {
    // 선택값이 변경되면 중복여부를 확인후 없으면 추가 있으면 추가하지 않음
    selectValue() {
      if (this.selectValue) this.addDataToList()
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
      var item = {
        pk: this.selectValue,
        name: this.$refs.select.getSelectItemName(),
        cost: null,
        isCancel: false // 취소선 표시여부
      };
      this.selectedList.unshift(item)
      this.height = 50 + (this.selectedList.length * 70)
    },
    // 추가한 내용을 취소할 경우
    setCancel(_item) {
      _item.isCancel = !_item.isCancel
      this.setTotalCost()
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
      console.log(JSON.stringify(this.selectedList))
      this.totalCost = this.$comm.setNumberSeperator(isNaN(totalCost) ? 0 : totalCost)
    }
  }
}
</script>

<style>
.strikethrough {
  text-decoration: line-through;
}
</style>
