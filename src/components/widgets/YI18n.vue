<!--
목적 : 다국어 지원 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <!-- <span>
    <span 
      v-for="item in nationList"
      :key="item"
      @click.prevent="changeLocale(item)" >
      <country-flag :country='item' :size='size' />
    </span>
  </span> -->
  <!-- 아래 소스는 메뉴 형식의 다국어 선택인데 ios에서 작동하지 않음 -->
  <!-- <v-menu 
    v-model="locale">
      <v-text-field></v-text-field>
      <v-list>
        <v-list-tile
          v-for="item in nationList"
          :key="item"
        >
          <v-list-tile>
            <country-flag :country='item' :size='size' />
          </v-list-tile>
        </v-list-tile>
      </v-list>
    </v-menu> -->
    <span>
      <v-menu 
        lazy
        bottom
        origin="center center"
        transition="scale-transition"
        v-model="isOpen">
        <!-- <country-flag slot="activator" :country="locale" :size='size' /> -->
        <v-btn
        slot="activator"
        small
        dark
        icon
        color="indigo"
      >
          <v-icon>
            language
          </v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="item in nationList"
            :key="item"
            class="ma-0 pa-0"
          >
            <v-list-tile-text @click.prevent="changeLocale(item)">
              <country-flag :country="item" :size='size' />
            </v-list-tile-text>
          </v-list-tile>
      </v-list>
      </v-menu>
    </span>
</template>

<script>
import CountryFlag from 'vue-country-flag'
export default {
  /* attributes: name, components, props, data */
  name: 'y-i18n',
  components: {
    'country-flag': CountryFlag
  },
  props: {
    size: {
      type: String,
      default: 'normal'
    }
  },
  data: () => ({
    nationList: [],
    locale: '',
    isOpen: false
  }),
  watch: {
    locale() {
      window.getApp.$emit('LOCALE_CHANGE', this.locale)
    }
  },
  /* Vue lifecycle: created, mounted, destroyed, etc */
  beforeMount() {
     this.nationList = [] 
     for(var key in this.$i18n.messages) {
       this.nationList.push(key)
     }
     this.locale = localStorage.locale
  },
  /* methods */
  methods: {
    changeLocale(_locale) {
      window.getApp.$emit('LOCALE_CHANGE', _locale)
      localStorage.locale = _locale
      this.locale = _locale
    }
  }
}
</script>

<style>
.border {
  border-color: #3949AB;
}
</style>

