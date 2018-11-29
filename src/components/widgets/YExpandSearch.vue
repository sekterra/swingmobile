<!--
목적 : 확장검색 기능을 지원하는 컴포넌트
Detail :
 * 가용 컴포넌트 : select, input text, datepicker, radio button, checbox
examples: 
 *  
-->
<template>
<v-expansion-panel expand white>
  <v-expansion-panel-content class="grey lighten-5">
    <div slot="header">{{title}}</div>
    <v-container 
      fluid 
      grid-list-md
      >
      <v-layout row wrap>
        <v-flex 
          d-flex 
          sm6 
          class="py-0"
          v-for="item in searchOption" :key="item.name"
        >
          <y-select
            v-if="item.type.toLowerCase() === 'select'"
            :label="item.label"
            :name="item.name"
            :item-search-key="item.key"
            type="search"
            @input="value => {
              searchData[item.name] = value
              searchDataChanged()
            }">
          </y-select>
          <v-text-field
            v-if="item.type.toLowerCase() === 'text'"
            :label="item.label"
            v-model="searchData[item.name]"
            @input="searchDataChanged"
            >
          </v-text-field>
          <y-datepicker
            v-if="item.type.toLowerCase() === 'datepicker'"
            :label="item.label"
            :name="item.name"
            :default-type="item.defaultType"
            v-model="searchData[item.name]"
            @input="searchDataChanged"
            >
          </y-datepicker>
        </v-flex>
      </v-layout>
    </v-container>
  </v-expansion-panel-content>
</v-expansion-panel>
<!--/확장 검색 영역-->
  
</template>

<script>
import $ from 'jquery'
export default {
  name: 'y-expand-search',  // tag 명칭
  props: {
    // 확장검색에 추가될 컴포넌트와 관련 속성을 JSON object형식으로 부모로 부터 받아 온다.
    // ex) searchOption : [
    //   {name: 'deptPk', label: '요청부서', type: 'select', items: items},
    //   {name: 'woNo', label: 'WO번호', type: 'text'},
    //   {name: 'checkPk', label: '점검여부', type: 'checkbox', items: items},
    //   {name: 'workType', label: '업무종류', type: 'radio', items: items},
    // ]
    // ※ select, checkbox, radio의 items는 {key: '', value: ''} 형식의 JSON Array
    searchOption: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      default : '터치하면 확장검색이 가능합니다.'
    },
    givenSearchData: {
      type: Object,
      defualt: null
    }
  },
  data () {
    return {
      queryString: '',    // 검색문자열
      searchData: {}  // 검색결과
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount() {
    this.initSearchObj()
  },
  methods: {
    /**
     * 검색용 object 초기화
     */
    initSearchObj() {
      this.searchData = this.givenSearchData
    },
    // 부모 컴포넌트가 자식 컴포넌트 결과값을 JSON object 형식으로 가져옴
    getSearchObject() {
      return this.searchData
    },
    // 부모 컴포넌트가 자식 컴포넌트 결과값을 query string 형식으로 가져옴
    getSearchQueryString() {
      return this.queryString
    },
    dateChanged(_item) {
      this.searchData[_item.key] = _item.value
      this.searchDataChanged()
    },
    searchDataChanged() {
      this.$emit('searchDataChanged', this.searchData)
    }
  }
}
</script>

