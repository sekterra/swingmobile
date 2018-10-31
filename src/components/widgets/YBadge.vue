<!--
목적 : 확장검색 기능을 지원하는 컴포넌트
Detail :
 * 
examples: 
 *  
-->
<template>
  <v-badge
      color="indigo darken-4"
      overlap
    >
      <span slot="badge">3</span>
      <v-icon
        color="indigo"
        large
      >
        description
      </v-icon>
    </v-badge>
</template>

<script>
export default {
  /* attributes: name, components, props, data */
  name: 'y-badge',
  props: {
  },
  data: () => ({
  }),
  /* Vue lifecycle: created, mounted, destroyed, etc */
  /* methods */
  methods: {
  }
}
</script>

