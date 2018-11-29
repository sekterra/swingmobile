<!--
목적 : v-data-table을 이용한 grid 확장 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
    <v-card :flat=flat>
      <v-toolbar card dense color="grey lighten-3">
        <v-toolbar-title class="subheading">{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn 
          v-if="createUrl || popupCallback"
          icon
          small
          color="indigo lighten-3"
          @click.prevent="moveCreatePage">
          <v-icon color="white">add</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="pa-0">
      <v-data-table
        v-model="selected"
        ref="dataTable"
        :headers="headers"
        :items="items"
        :search="search"
        :pagination.sync="pagination"
        :loading="loading"
        :select-all="gridType === 'checkbox'"
        :item-key="itemKey"
        hide-actions
        class="elevation-0"
      >
        <!-- slot=headerCell 옵션 확인 필요 -->
        <template slot="headers" slot-scope="props">  
          <tr>
            <th v-if="gridType === 'checkbox'">
              <v-checkbox
                :input-value="props.all"
                :indeterminate="props.indeterminate"
                color="indigo"
                hide-details
                @click.native="toggleAll"
              ></v-checkbox>
            </th>
            <th v-else-if="gridType"></th>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.name === pagination.sortBy ? 'active' : '']"
              @click.prevent="changeSort(header.name)"
            >
              <v-icon small v-if="header.hasOwnProperty('sortable') ? header.sortable : true">arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
          <!-- TODO : 아래 props.selected = !props.selected가 들어가야 checkbox가 정상적으로 작동 -->
          <tr :active="props.selected" @click.prevent="gridType === 'checkbox' ? props.selected = !props.selected : ''">
            <td v-if="gridType === 'checkbox'">
              <v-checkbox
                :input-value="props.selected"
                :indeterminate="props.indeterminate"
                color="indigo lighten-3"
                hide-details />
            </td>
            <td v-else-if="gridType === 'edit' && editable">
              <v-btn
                small 
                icon
                outline
                color="indigo lighten-3"
                :loading="props.selected"
                @click.prevent="editItem(props);"
              >
                <v-icon
                  small
                  v-if="!props.selected">
                edit
                </v-icon>
                <v-icon v-else>
                  block
                </v-icon>
              </v-btn>
            </td>
            <td v-else-if="gridType === 'radio'">
              <v-btn
                small 
                icon
                outline
                color="indigo lighten-3"
                @click.prevent="selectedData(props.item)"
              >
                <v-icon small>done</v-icon>
              </v-btn>
            </td>
            <td
              v-for="header in headers" :key="header.text"
              v-if="items.length > 0"
              :class="header.hasOwnProperty('columnAlign') ? 'text-xs-' + header.columnAlign : ''"
            >
              <span v-if="!header.columnEditable" class="shortened">
                {{props.item[header.name]}}
              </span>
              <v-switch 
                color="success"
                v-else-if="header.columnEditable && header.type === 'radio'"
              >
              </v-switch>
              <v-text-field
                v-else-if="header.columnEditable && header.type === 'text'"
              >
              </v-text-field>
              <v-chip 
                v-if="header.type === 'process'"
                label 
                small 
                :color="props.item.color" text-color="white" >
                {{ props.item.colorTitle }}
              </v-chip>
            </td>
          </tr>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination  
          v-model="pagination.page" 
          :length="pages"
          :total-visible="pagingSize"
          color="indigo lighten-3"
          circle
        ></v-pagination>
      </div>
      <v-divider></v-divider>
    </v-card-text>
  </v-card>
</template>

<script>
import $ from 'jquery'
export default {
  /* attributes: name, components, props, data, computed */
  name: 'y-data-table',
  props: {
    title: {
      type: String,
      default: 'Grid'
    },
    // grid 헤더
    headers: {
      type: Array,
      required: true
    },
    // grid item
    items: {
      type: Array
    },
    // grid 수정 여부
    editable: {
      type: Boolean,
      default: true
    },
    rowsPerPage: {
      type: Number,
      default: 10
    },
    pagingSize: {
      type: Number,
      default: 5
    },
    createUrl: {
      type: String,
      default: ''
    },
    popupCallback: {
      type: String,
      default: ''
    },
    // 그리드 타입(radio, checkbox)
    gridType: {
      type: String,
      default: ''
    },
    itemKey: {
      type: String,
      default: ''
    },
    flat: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: '',
      selected: [],
      loading: true,
      pagination: {
        // rowsPerPage: this.rowsPerPage
        sortBy: 'name'
      },
      check: true,
      radioGroup: 1,
    }
  },
  mounted() {
    console.log(':::::::::::: mounted')
  },
  activated() {
    console.log(':::::::::::: activated')
  },
  watch: {
    items() {
      // TODO : totalItems가 업데이트 되지 않는데 bug인지 이유는 잘 모르겠음
      // [bug fix] : 페이지가 처음 로딩시 그리드 데이터가 바인딩되었는데도, pagination이 표현 안되는 현상 발생했으나
      //                  우연히 totalItems를 강제로 할당해주니 표시가 됨(이유는 모름)
      this.pagination.totalItems = this.items.length
      this.hideLoading()
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  /* methods */
  methods: {
    editItem(_prop) {
      this.$emit('editItem', _prop.item);
      _prop.selected = !_prop.selected
    },
    hideLoading() {
      var self = this
      // TODO : 1초 후 로딩표시 제거
      setTimeout(() => {self.loading = false}, 1000) 
    },
    moveCreatePage() {
      if (this.createUrl) this.$comm.movePageReplace(this.$router, this.createUrl)
      else {
        if(this.popupCallback) this.$emit(this.popupCallback)
      }
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending
      } else {
        this.pagination.sortBy = column
        this.pagination.descending = false
      }
    },
    /**
     * datatable에서 선택된 정보를 eventBus로 부모로 넘긴다.
     *  - datatable.vue > list.vue > popup.vue > create.vue
     */
    selectedData (_item) {
      // var $obj = $(_obj)
      // if ($obj.is(':checked')) this.$emit('selectedData', _item)
      this.$emit('selectedData', _item)
    },
    /**
     * datatable에서 선택된 정보를 부모에 넘긴다.
     */
    getCheckedData () {
      return this.selected.slice()
    },
    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.items.slice()
    },
    clearSelected() {
      this.selected = []
    }
  }
}
</script>

<style>
.shortened {
  overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
}
</style>
