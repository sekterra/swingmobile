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
      color="grey darken-1"
    >
    <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-text-field
            v-model="keyword"
            hide-details
            prepend-icon="search"
            append-line
        ></v-text-field>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-media height="300" class="pa-0 ma-0 vscroll">
      <v-expansion-panel
      >
        <v-flex
          v-for="(item, i) in titleInfos"
          v-if="titleInfos.length > 0"
          :key="item.pk"
          xs12 
          md6 
          class="pa-0 ma-0">
          <v-expansion-panel-content class="pa-0 ma-0">
            <div slot="header" class="word-break">
              <v-checkbox 
                class="pa-0 ma-0" 
                v-model="checkValues[i]"
                color="indigo"
                hide-details
                :val="item.pk"
                :label="item.title"/>
            </div>
            <v-card flat>
              <v-card-media>
                <v-card>
                  <!-- <v-card-title><h4>{{ props.item.name }}</h4></v-card-title> -->
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-tile v-for="key in itemTitle.cardItems" :key="key">
                      <v-list-tile-content>{{$t('title.' + key)}}</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ items[i][key] }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-card-media>
            </v-card>
          </v-expansion-panel-content>
        </v-flex>
        <v-flex 
          v-else
          xs12>
          <div>
            {{$t('message.noData')}}
          </div>
        </v-flex>
      </v-expansion-panel>
    </v-card-media>
    <v-divider></v-divider>

    <v-card-actions>
      <div>
        <div class="caption grey--text">선택업체</div>
      <v-chip
        v-for="(item, i) in checkValues"
        v-if="checkValues.length"
        :key="i + '_chip'"
        v-model="checkValues[i]"
        close
        color="indigo"
        outline
      >
      {{titleInfos[i].title}}
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
    }
  },
  watch: {
    items: () => {

    }
  },
  data: () => ({
    keyword: null,
    titleInfos: [],
    cardContents: [],
    selection: [],
    checkValues: []
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
      var checkValues = []
      $.each(this.items, (_i, _item) => {
        this.titleInfos.push({
          title: _item[this.itemTitle.title],
          pk: _item[this.itemTitle.pk],
          index: _i
        })
        checkValues.push(false)
      })
      this.$set(this, 'checkValues', checkValues)
    },
    itemClicked(_checkValue, _pk) {
      // if (_checkValue) _checkValue = null
      // else _checkValue = _pk
       _checkValue = _pk
    },
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
