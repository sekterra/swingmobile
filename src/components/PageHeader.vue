<template>
  <v-layout row class="align-center layout px-4 pt-3  app--page-header">
    <div class="page-header-left">
      <h2 class="breadcrumb">{{title}}</h2>
    </div>
    <v-breadcrumbs divider="/" class="py-2" v-show="isShow">
      <v-breadcrumbs-item>
      <v-icon larg color="grey darken-1">home</v-icon>
      </v-breadcrumbs-item>
      <v-breadcrumbs-item v-for="(item,key) in breadcrumbs" :key="key" class="breadcrumb" color="grey darken-1">
      {{ item }}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
  </v-layout>  
</template>

<script>
import menu from '@/api/menu';
export default {
  data () {
    return {
      title: '',
      isShow: false
    };
  },
  mounted() {

  },
  computed: {
    breadcrumbs: function () {
      let breadcrumbs = [];
      menu.forEach(item => {
        if (item.items) {
          let child =  item.items.find(i => {
            return i.component === this.$route.name;
          });
          if (child) {
            // breadcrumbs.push(item.title);
            // breadcrumbs.push(child.title);
            // this.title = child.title;
            var title = this.$t('menu.' + item.name)
            var childTitle = this.$t('menu.' + child.name)
            breadcrumbs.push(title);
            breadcrumbs.push(childTitle);
            this.title = childTitle;

            console.log('::::::::: item:' + item.name + this.$t('menu.' + item.name))
            console.log('::::::::: child item:' + item.name + this.$t('menu.' + child.name))
          }
        } else {
          if (item.name === this.$route.name) {
            // this.title = item.title;
            // breadcrumbs.push(item.title);
            var title = this.$t('menu.' + item.name)
            this.title = title;
            breadcrumbs.push(title);
            console.log('::::::::: item:' + item.name + this.$t('menu.' + item.name))
          }
        }
      });
      return breadcrumbs;
    },    
  }
};
</script>

<style>
.border {
  border: 1px solid #0000ff;
}
.breadcrumb {
  color: #757575; /*grey darken-1*/
}
</style>
