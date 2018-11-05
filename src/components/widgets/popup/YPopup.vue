<!--
목적 : 확장검색 기능을 지원하는 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" fullscreen razy hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary darken-3">
          <v-toolbar-title>
            <v-icon>search</v-icon>
            {{title}}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click.native="closePopup">
            <v-icon>close</v-icon>
          </v-btn>
          <!--<v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
          </v-toolbar-items> -->
        </v-toolbar>
        <wo-list 
          v-if="searchItem.toLowerCase() === 'wo'"
          :search-type="searchType" 
          @selectedData="selectedData">
        </wo-list>
        <equipment-list
          v-if="searchItem.toLowerCase() === 'equipment'"
          :search-type="searchType" 
          @selectedData="selectedData"
        >
        </equipment-list>

        <div class="text-xs-center">
          <y-btn
            type="select"
            title="confirm"
            @btnClicked="sendDataToParent"
          >
          </y-btn>
          <y-btn
            type="close"
            title="close"
            @btnClicked="closePopup"
          >
          </y-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import woList from '@/pages/wo/woList'
import equipmentList from '@/pages/equipment/equipmentList'

export default {
  /* attributes: components, props, data */
  name: 'y-popup',
  components: {
    'wo-list': woList,
    'equipment-list': equipmentList,
  },
  props: {
    // 검색용 팝업
    searchType: {
      type: String,
      default: '',
      validator: function (_value) {
        // The value must match one of these strings
        return ['radio', 'checkbox', ''].indexOf(_value) !== -1
      }
    },
    // 팝업 오픈 여부
    isOpenPopup: {
      type: Boolean,
      default: null
    },
    // 팝업 타이틀
    title: {
      type: String,
      default: 'Search Popup'
    },
    searchItem: {
      type: String,
      required:  true
    },
    eventForReturn: {
      type: String,
      required:  true
    }
  },
  data: () => ({
    dialog: false,
    selectedItems: [],
  }),
  watch: {
    isOpenPopup() {
      this.dialog = this.isOpenPopup
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  mounted() {
    this.dialog = this.isOpenPopup
  },
  /* methods */
  methods: {
    closePopup() {
      this.$emit('closePopup')
      this.dialog = false
    },
    /**
     * Event Bus를 통해 수신된 정보를 저장
     */
    selectedData(_item) {
      if (!_item) return
      if (this.searchType === 'radio') {
        this.selectedItems.push(_item)
      }
      else this.$comm.getFilteredArray(this.selectedItems, _item)
    },
    /**
     * 부모에게 선택된 정보 전달
     */
    sendDataToParent() {
      if (!this.selectedItems || this.selectedItems.length <= 0) return
      this.$emit(this.eventForReturn, this.selectedItems)
      this.selectedItems = []
      this.dialog = false
    }
  }
}
</script>

