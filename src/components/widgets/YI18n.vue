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
  <!-- <v-flex xs4>
    <v-autocomplete
      append-icon=""
      solo
      flat
      color="primary"
      outline
      v-model="locale"
      :items="nationList"
      type="select"
    >
      <template
        slot="selection"
        slot-scope="data"
      >
        <country-flag :country='data.item' :size='size' />
      </template>
      <template
        slot="item"
        slot-scope="data"
      >
        <template>
          <v-list-tile class="pa-0 ma-0" style="border:1px solid #0000ff;">
            <v-layout align-center justify-center>
              <country-flag :country='data.item' :size='size' />
            </v-layout>
          </v-list-tile>
        </template>
      </template>
    </v-autocomplete>
  </v-flex> -->
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
        transition="scale-transition"
        offset-y
        v-model="isOpen">
        <country-flag slot="activator" :country="locale" :size='size' />
        <v-list>
          <v-list-tile
            v-for="item in nationList"
            :key="item"
            class="ma-0 pa-0"
          >
            <v-list-tile-content @click.prevent="changeLocale(item)">
              <country-flag :country="item" :size='size' />
            </v-list-tile-content>
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

