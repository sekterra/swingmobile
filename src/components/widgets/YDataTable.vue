<!--
목적 : v-data-table을 이용한 grid 확장 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
    <v-card>
      <v-toolbar card dense color="grey lighten-5">
        <v-toolbar-title><h4>{{title}}</h4></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn 
          v-if="createUrl"
          icon 
          @click.stop="create">
          <v-icon>add</v-icon>
        </v-btn>
      </v-toolbar>
    <v-divider></v-divider>
      <v-card-text class="pa-0">
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :pagination.sync="pagination"
        :loading="loading"
        hide-actions
        lazy
        class="elevation-0"
      >
        <!-- slot=headerCell 옵션 확인 필요 -->
        <template slot="headers" slot-scope="props">  
          <tr>
            <th
              v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.name === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.name)"
            >
              <v-icon small v-if="header.hasOwnProperty('sortable') ? header.sortable : true">arrow_upward</v-icon>
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template slot="items" slot-scope="props">
          <td
            v-for="header in headers" :key="header.text"
            v-if="items.length > 0"
            :class="header.hasOwnProperty('columnAlign') ? 'text-xs-' + header.columnAlign : ''"
          >
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
              v-model="props.item[header.name]"
              v-if="header.type === 'edit' && editable"
            >
            edit
            </v-icon>
            <input type="radio"
              v-if="header.type === 'radio'"
              :name="header.name"
              @click.stop="selectedData(props.item, $event.target)"
            />
            <span v-else-if="!header.columnEditable" class="shortened">
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
          </td>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-2">
        <v-pagination  
          v-model="pagination.page" 
          :length="pages"
          :total-visible="pagingSize"
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
    // 검색용 팝업
    searchType: {
      type: String,
      default: ''
    },
    createUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      search: '',
      selectedItems: [],
      loading: true,
      pagination: {
        // rowsPerPage: this.rowsPerPage
        sortBy: 'name'
      },
      check: true
    }
  },
  activated() {
    console.log('grid item changed:' + JSON.stringify(this.pagination))
  },
  watch: {
    items() {
      // TODO : totalItems가 업데이트 되지 않는데 bug인지 이유는 잘 모르겠음
      // [bug fix] : 페이지가 처음 로딩시 그리드 데이터가 바인딩되었는데도, pagination이 표현 안되는 현상 발생했으나
      //                  우연히 totalItems를 강제로 할당해주니 표시가 됨(이유는 모름)
      this.pagination.totalItems = this.items.length
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  /* methods */
  methods: {
    editItem(_item) {
      console.log('edit Item')
      this.$emit('editItem', _item);
    },
    hideLoading() {
      var self = this
      // TODO : 1초 후 로딩표시 제거
      setTimeout(() => {self.loading = false}, 1000) 
    },
    create() {
      if (!this.createUrl) return;
      this.$comm.movePage(this.$router, this.createUrl)
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
    selectedData (_item, _obj) {
      var $obj = $(_obj)
      if ($obj.is(':checked')) this.$emit('selectedData', _item)
    }
  }
}
</script>

<style>
.shortened {
  overflow:hidden;white-space:nowrap;text-overflow:ellipsis;
}
</style>
