<!--
목적 : 앱 right 검색 팝업 컴포넌트
Detail : 
 * 
examples: 
 *  
-->
<template>
  <wo-list :is-search-popup="true"></wo-list>
</template>

<script>
import woList from '@/pages/wo/woList'
export default {
  /* attributes: name, components, props, data */
  components: {
    'wo-list': woList
  },
  name: 'y-right-popup'
  /* Vue lifecycle: created, mounted, destroyed, etc */
  /* methods */
}
</script>

