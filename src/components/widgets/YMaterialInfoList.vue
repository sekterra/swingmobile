<!--
  목적 : WO 자재등 다양한 정보를 list에서 보여주는 컴포넌트
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
      <v-toolbar color="white" flat white>
        <v-toolbar-side-icon>
          <v-icon v-if="editable" color="indigo lighten-3">{{icon}}</v-icon>
          <v-icon v-else color="indigo lighten-3">https</v-icon>
        </v-toolbar-side-icon>
        <v-toolbar-title class="indigo--text subheading">
          {{controlTitle}}
        </v-toolbar-title>
        <v-spacer></v-spacer>
          <v-btn 
            v-if="editable"
            icon
            small
            color="indigo lighten-3"
            @click.prevent="openSearchPopup"
            >
            <v-icon color="white">add</v-icon>
          </v-btn>
          <span v-else>
            {{$t('title.readOnlyMode')}}
          </span>
      </v-toolbar>
      </v-card-title>
      <v-divider></v-divider>
      <v-card flat>
        <v-card-title class="caption grey--text">{{$t('title.selectedItems')}}</v-card-title>
        <v-card-media max-height="300" class="vscroll">
            <v-container 
              fluid 
              grid-list-xs 
              py-0 
              px-1>
              <div
              v-if="selectedList.length > 0"
              v-for="(item, i) in selectedList"
              :key="item.materialPk">
                <v-layout 
                  row 
                  wrap 
                  px-2
                  :class="{'grey lighten-5': (i > 1 && i % 2 === 0), 'blue-grey lighten-5': (i % 2 === 1), 'indigo lighten-5': (i === 0)}"
                  >
                  <v-flex xs12>
                    <v-layout align-center justify-space-between row pt-2 pb-0>
                      <span :class="{'title indigo--text pl-2': true, 'strikethrough': item.isCancel}">{{item.mtrlCd}}</span>
                      <v-btn
                        icon
                        @click.prevent="setCancel(item)">
                        <v-icon color="indigo">highlight_off</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12 sm6 md3 class="py-1">
                      <v-icon color="black">turned_in</v-icon> {{$t('title.mtrlNm')}}: {{item.mtrlNm}}
                    </v-flex>
                    <v-flex xs12 sm6 md3 class="py-1">
                      <v-icon color="black">local_atm</v-icon> {{$t('title.unitPrice')}}: {{$comm.setNumberSeperator(item.unitPrice)}}
                    </v-flex>                  
                    <v-flex xs12 sm6 md3 class="py-1">
                      <v-icon color="black">view_agenda</v-icon> {{$t('title.aStockAmt')}}: {{$comm.setNumberSeperator(item.aStockAmt)}}
                    </v-flex>
                    <v-flex xs12 sm6 md3 class="py-1">
                        <v-icon color="grey">view_agenda</v-icon> {{$t('title.bStockAmt')}}: {{$comm.setNumberSeperator(item.bStockAmt) }}
                    </v-flex>
                </v-layout>
                <v-layout row wrap pl-2 mb-2>
                  <v-flex xs12 py-1>
                    <span class="subheading indigo--text">{{$t('title.inputMaterialUsage')}}</span>
                  </v-flex>
                  <v-flex xs6 pt-0>
                      <v-text-field
                        v-if="editable"
                        :label="$t('message.aAmountInput')"
                        name="aStockAmt"
                        :placeholder="$t('message.inputAmount')"
                        type="number"
                        hide-details
                        v-model="item.aAmt"
                        @input="(_value) => {
                          validateAvalue(item, _value)
                        }"
                      />
                      <v-text-field
                        v-else
                        :label="$t('message.aAmountInput')"
                        name="aStockAmt"
                        hide-details
                        readonly
                        :value="$comm.setNumberSeperator(item.aAmt)"
                     />
                    </v-flex>
                    <v-flex xs6 pt-0>
                      <v-text-field
                        v-if="editable"
                        :label="$t('message.bAmountInput')"
                        name="bStockAmt"
                        :placeholder="$t('message.inputAmount')"
                        type="number"
                        hide-details
                        v-model="item.bAmt"
                        @input="(_value) => {
                          validateBvalue(item, _value)
                        }"
                      />
                      <v-text-field
                        v-else
                        :label="$t('message.bAmountInput')"
                        name="bStockAmt"
                        hide-details
                        readonly
                        :value="$comm.setNumberSeperator(item.bAmt)"
                     />
                  </v-flex>
                </v-layout>
              </div>
              <div v-if="selectedList.length <= 0"
                class="text-xs-center indigo--text">
                {{$t('message.noData')}}
              </div>
          </v-container>
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
var baseHeight = 200
export default {
  /* attributes: name, components, props, data */
  name: 'y-material-info-list',
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
    editable: { // 수정 가능여부
      type: Boolean,
      default: true
    },
    titleOfTotal: {
      type: String
    },
    hintKey: {
      type: String
    },
    hintUnit: {
      type: String
    },
    icon: {
      type: String,
      default: 'create'
    }
  },
  data: () => ({
    selectedList: [],
    selectCount: 0,
    totalCost: 0,
    height: baseHeight,
    baseHeight: baseHeight,
    hint: null
  }),
  watch: {
    // 선택값이 변경되면 중복여부를 확인후 없으면 추가 있으면 추가하지 않음
    // selectValue() {
    //   if (this.selectValue) this.addDataToList()
    // },
    items() {
      if (this.items) {
        this.init()
      }
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  mounted() {
    if (!this.selectedList.length) this.init()
  },
  //* methods */
  methods: {
    init() {
      this.selectedList = this.$comm.clone(this.items)
      this.height = this.selectedList.length * baseHeight
      this.selectCount = this.selectedList.length;
      this.setTotalCost()
    },
    // 추가한 내용을 취소할 경우
    setCancel(_item) {
      _item.isCancel = !_item.isCancel
      this.setTotalCost()
      this.selectCount = this.getSelectedItems().length
      this.$emit('materialInfoListChanged', this.selectedList)
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
          if (!_item.isCancel) return sum + ((_item.aAmt ? _item.aAmt : 0) * Number(_item.unitPrice))
          else return sum
      }, 0);
      this.totalCost = this.$comm.setNumberSeperator(isNaN(totalCost) ? 0 : totalCost)
      this.$emit('registListChanged')
    },
    /**
     * 자재 검색 팝업창 호출
     */
    openSearchPopup() {
      this.$emit('openSearchPopup')
    },
    validateAvalue(_item, _value) {
      if (_item.aStockAmt >= _value) {
        _item.aAmt = Number(_value)
        this.setTotalCost()
      } else {
        _item.aAmt = null
      }
      this.$forceUpdate()
    },
    validateBvalue(_item, _value) {
      if (_item.bStockAmt >= _value) {
        _item.bAmt = Number(_value)
      } else {
        _item.bAmt = null
      }
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
