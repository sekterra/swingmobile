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
      <v-card color="grey lighten-5">
        <v-toolbar 
          dark 
          color="indigo darken-4"
          flat
          >
          <v-toolbar-title>
            <v-btn icon @click.stop="">
              <v-icon>open_in_browser</v-icon>
            </v-btn>
            {{title}}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click.native="closePopup">
            <v-icon>close</v-icon>
          </v-btn>
          <!--<v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
          </v-toolbar-items> -->
        </v-toolbar>
        <wo-list 
          v-if="searchItem.toLowerCase() === 'wo'"
          :grid-type="gridType" 
          @selectedData="selectedData">
        </wo-list>
        <equipment-list
          v-if="searchItem.toLowerCase() === 'equipment'"
          :grid-type="gridType" 
          @selectedData="selectedData"
        >
        </equipment-list>
        <material-list 
          v-if="searchItem.toLowerCase() === 'material'"
          ref="checkboxList"
          :grid-type="gridType"
          @selectedData="selectedData"
        />
        <slot name="body">
        </slot>
        <div class="text-xs-center">
          <y-btn
            v-if="gridType !== 'radio'"
            type="select"
            :title="$t('button.confirm')"
            @btnClicked="sendDataToParent"
          >
          </y-btn>
          <y-btn
            type="close"
            :title="$t('button.close')"
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
import materialList from '@/pages/material/materialList'

export default {
  /* attributes: components, props, data */
  name: 'y-popup',
  components: {
    'wo-list': woList,
    'equipment-list': equipmentList,
    'material-list': materialList
  },
  props: {
    // 검색용 팝업
    gridType: {
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
      default: ''
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
      if (this.isOpenPopup) this.selectedItems = []
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
      if (this.gridType === 'radio') {
        this.selectedItems.push(_item)
      }
      this.sendDataToParent()
    },
    /**
     * 부모에게 선택된 정보 전달
     */
    sendDataToParent() {
      if (this.gridType === 'checkbox') {
        this.selectedItems = this.$refs.checkboxList.getCheckedData()
      }

      if (!this.selectedItems || this.selectedItems.length <= 0) return
      this.$emit(this.eventForReturn, this.selectedItems)
      this.selectedItems = []
      this.dialog = false
    }
  }
}
</script>

