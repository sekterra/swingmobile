<!--
조회 샘플 화면
-->
<template>
  <v-container fluid class="pa-0">
      <v-flex v-scroll="onScroll" id="content">
        <v-slide-y-transition mode="out-in">
          <!-- 기본 검색 영역 -->
          <v-layout column align-center :class="config.themeClasses.search">
            <v-container fluid grid-list-md>
              <v-layout row wrap>
                  <v-flex xs12 sm6>
                      <v-text-field
                        label="WO번호" 
                        class="mr-2"
                        append-icon="search"
                        clearable>
                      </v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                      <v-text-field
                        label="작업제목, 작업내역, 설비코드, 설비명을 입력하세요." 
                        class="mr-2"
                        append-icon="search"
                        clearable>
                      </v-text-field>
                  </v-flex>
              </v-layout>
               
              <!-- 확장 검색 영역-->
              <!-- popout : border 제거 -->
              <v-expansion-panel popout>
                <v-expansion-panel-content :class="config.themeClasses.search">
                  <div slot="header"></div>
                  <v-container fluid grid-list-md>
                    <v-layout row wrap>
                      <v-flex d-flex xs12 sm6 child-flex>
                          <v-select
                            :items="items"
                            label="요청부서">
                          </v-select>
                      </v-flex>
                      <v-flex d-flex xs12 sm6>
                        <v-select
                          :items="items"
                          label="상태">
                        </v-select>
                      </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex d-flex xs12 sm6 child-flex>
                          <v-card flat tile column :class="config.themeClasses.search">
                            <datepicker @dateChanged="dateChanged" label="From"></datepicker>
                          </v-card>
                        </v-flex>
                        <v-flex d-flex xs12 sm6>
                          <v-card flat tile column :class="config.themeClasses.search">
                              <datepicker @dateChanged="dateChanged" label="To"></datepicker>
                            </v-card>                            
                        </v-flex>
                    </v-layout>
                  </v-container>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!--/확장 검색 영역-->
            </v-container>
          </v-layout>
        </v-slide-y-transition>

        <!-- 그리드 영역 -->
        <v-container  fluid>
          <div class="text-xs-right">
            <v-btn color="primary" small>
              <v-icon>add</v-icon>
            </v-btn>
          </div>
          <div>
            <v-data-table
              :headers="headers"
              :items="desserts"
              :search="search"
              :pagination.sync="pagination"
              hide-actions
              class="elevation-1"
            >
              <template slot="headerCell" slot-scope="props">
                <v-tooltip bottom>
                  <span slot="activator">
                    {{ props.header.text }}
                  </span>
                  <span>
                    {{ props.header.text }}
                  </span>
                </v-tooltip>
              </template>
              <template slot="items" slot-scope="props">
                <td class="justify-center layout px-0">
                  <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)"
                  >
                  edit
                  </v-icon>
                </td>
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">
                  <v-switch v-model="check" color="success"></v-switch>
                </td>
                <td class="text-xs-right">
                  <v-text-field
                  :value="price"
                  max="10000"
                  min="1">
                  </v-text-field>
                </td>
              </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
              <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
          </div>
        </v-container>
        <v-layout column class="fab-container" mb-5>
          <v-btn fab small v-show="!btnHidden">
            <v-icon @click="scrollToTop">keyboard_arrow_up</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-container>
</template>

<script>
import datepicker from '../../components/Datepicker';
import config from '../../js/config.js';
export default {
  components: {
    'datepicker': datepicker
  },
  data() {
    return {
      msg: '컨트롤',
      items: ['foo', 'bar', 'fizz', 'buzz'],
      date: null,
      menu2: null,
      landscape: false,
      imgData: null,
      imgLog: '',
      debug: '',
      price: 1000,
      search: '',
      config: config,
        check: true,
        pagination: {},
        selected: [],
        offsetTop: 0,
        btnHidden: true,
        headers: [
          { text: '수정', value: 'name', sortable: false },
          {
            text: 'WO번호',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: '작업제목', value: 'calories' },
          { text: '설비코드', value: 'fat' },
          { text: '설비명', value: 'carbs' },
          { text: '요청일', value: 'protein' },
          { text: '작업부서', value: 'iron' }
        ],
        desserts: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ]
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
  methods: {
    init() {
    },
    dateChanged(_date) {
      this.debug = '[parent datepicker]:' + _date;
    },
    rowDblClick() {
      console.log('row double click');
    },
    editItem() {
      console.log('edit Item')
      this.$emit('edit');
    },
    onScroll (e) {
      this.offsetTop = window.pageYOffset || document.documentElement.scrollTop
      this.btnHidden = this.offsetTop == 0
      console.log('scroll event')
      Keyboard.hide()
    },
    scrollToTop () {
      let container = document.getElementById('content');
      let event = new CustomEvent('scroll', {})
      container.pageYOffset = 0
      setTimeout(() => {
       container.scrollTop = 0
      }, 200)
      container.dispatchEvent(event);
      document.documentElement.scrollTop = 0;
    }
  }
}
</script>

<style>
.border {
  border: 1px dashed #0000ff;
}
.fab-container {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>
