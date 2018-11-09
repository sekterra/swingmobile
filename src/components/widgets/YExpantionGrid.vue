<!--
  목적 : 확장용 그리드 컴포넌트
  Detail :
  *
  examples:
  *
  -->
<template>
<v-card flat>
  <v-card-title class="pa-0 ma-0">
    <div class="caption grey--text">{{title}}</div>
    <v-toolbar
      dense
      dark
      color="indigo darken-1"
    >
    <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-text-field
            v-model="keyword"
            hide-details
            color="grey lighten-4"
            prepend-icon="search"
            append-line
            @input="search"
        ></v-text-field>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-media :height="height" max-height="300" min-height="50" class="pa-0 ma-0 vscroll">
      <v-expansion-panel
      >
        <v-flex
          v-if="titleInfos.length > 0"
          v-for="(item, i) in titleInfos"
          :key="item.pk"
          xs12 
          md6 
          class="pa-0 ma-0">
          <v-expansion-panel-content 
            :class="{'grey lighten-4': (i % 2 === 0 && !item.isCheck), 'indigo lighten-4': item.isCheck}">
            <div slot="header" class="word-break" @click="itemClicked(i, item.index)">
              <v-icon 
                v-if="!item.isCheck"
                small>
                check_box_outline_blank
              </v-icon>
              <v-icon
                v-else
                small>
                check_box
              </v-icon>
              {{item.title}}
            </div>
            <v-card v-if="isExtend">
              <v-card-media>
                <v-card>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-tile v-for="key in itemTitle.cardItems" :key="key" color="indigo" >
                      <v-list-tile-content>{{$t('title.' + key)}}</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ items[i][key] }}</v-list-tile-content>
                    </v-list-tile>
                    <v-divider v-if="i !== titleInfos.length - 1"></v-divider>
                  </v-list>
                </v-card>
              </v-card-media>
            </v-card>
          </v-expansion-panel-content>
        </v-flex>
        <v-flex 
         v-if="titleInfos.length <= 0"
          xs12>
          <div class="text-xs-center indigo--text">
            {{$t('message.noData')}}
          </div>
        </v-flex>
      </v-expansion-panel>
    </v-card-media>
    <v-divider></v-divider>

    <v-card-actions>
      <div v-if="summaryTitle">
        <div class="caption grey--text">{{summaryTitle}}({{checkCount}}{{$t('title.things')}})</div>
          <v-chip
            v-for="(item, i) in orgInfos"
            v-if="orgInfos"
            :key="i + '_chip'"
            v-model="item.isCheck"
            close
            color="indigo"
            outline
          >
          {{orgInfos[i].title}}
        </v-chip>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import $ from 'jquery'
export default {
  /* attributes: name, components, props, data */
  name: 'y-expantion-grid',
  props: {
    title: String,
    rowCount: {
      type: Number,
      default: 5
    },
    isHideDetail: {
      type: Boolean,
      default: true
    },
    // grid item
    items: {
      type: Array,
      default: null
    },
    itemTitle: {
      type: Object,
      default: null
    },
    // 요약 타이틀, 없을 경우 요약 표시 안함
    summaryTitle: {
      type: String,
      default: null
    },
    isExtend: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    items: () => {
    }
  },
  data: () => ({
    keyword: null,
    titleInfos: [],
    orgInfos: [],
    cardContents: [],
    selection: [],
    checkCount: 0,
    height: 45
  }),
  watch: {
    items() {
      this.mappedData();
    }
  },
  //* Vue lifecycle: created, mounted, destroyed, etc */
  //* methods */
  methods: {
    /**
     * 부모로부터 받아온 items, itemTitle정보를 바탕으로 정보를 mapping 하는 함수
     */
    mappedData() {
      this.titles = []
      this.cardContents = []
      $.each(this.items, (_i, _item) => {
        this.orgInfos.push({
          title: _item[this.itemTitle.title],
          pk: _item[this.itemTitle.pk],
          index: _i,
          isCheck: false
        })
      })
      this.titleInfos = this.$comm.clone(this.orgInfos)
      this.height = this.titleInfos.length * 45
    },
    itemClicked(_i, _index) {
       this.$set(this.orgInfos[_index], 'isCheck', !this.orgInfos[_index].isCheck)
       this.$set(this.titleInfos[_i], 'isCheck', !this.titleInfos[_i].isCheck)
       if(this.orgInfos[_i].isCheck) this.checkCount++
       else {
         if(this.checkCount) this.checkCount--
         else this.checkCount = 0
       }
    },
    search() {
      if (!this.keyword) this.titleInfos = this.$comm.clone(this.orgInfos)
      else if (this.keyword.length <= 1) return
      this.titleInfos = this.orgInfos.filter((_item) => {
        return _item.title.toUpperCase().split(' ').join('').indexOf(this.keyword.toUpperCase().split(' ').join('')) >= 0
      })
    }
  }
}
</script>

<style>
.vscroll {
  overflow-y:auto;
}
.word-break {
  word-break: break-all;
}
</style>
