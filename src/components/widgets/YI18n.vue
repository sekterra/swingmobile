<!--
목적 : 다국어 지원 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <span>
    <span 
      v-for="item in nationList"
      :key="item"
      @click.prevent="changeLocale(item)" >
      <country-flag :country='item' :size='size' />
    </span>
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
    locale: ''
  }),
  /* Vue lifecycle: created, mounted, destroyed, etc */
  created() {
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

