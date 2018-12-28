<!--
파일명 : AppDrawer.vue
목적 : Left Menu
-->
<template>
  <v-navigation-drawer
    id="appDrawer"
    :mini-variant.sync="mini"
    fixed
    :dark="$vuetify.dark"
    app
    v-model="drawer"
    width="260"
    >
    <v-toolbar color="primary darken-1" dark>
      <!-- <img v-bind:src="computeLogo" height="36" alt="Vue Material Admin Template"> -->
      <v-toolbar-title class="ml-0 pl-3">
        <!-- <span class="hidden-sm-and-down">swing</span> -->
        <span>swing CMMS mobile</span>
      </v-toolbar-title>
    </v-toolbar>
    <vue-perfect-scrollbar class="drawer-menu--scroll" :settings="scrollSettings">
      <v-list dense expand>
        <template v-for="(item, i) in menus">
            <!--group with subitems-->
            <v-list-group v-if="item.items" :key="item.menuPk" :group="item.group" :prepend-icon="item.icon" no-action="no-action">
              <v-list-tile slot="activator" ripple="ripple">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}1</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <template v-for="(subItem, i) in item.items">
                <!--sub group-->
                <v-list-group v-if="subItem.items" :key="subItem.menuPk" :group="subItem.group" sub-group="sub-group">
                  <v-list-tile slot="activator" ripple="ripple">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ subItem.title }}2</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile v-for="(grand, i) in subItem.children" :key="i" :to="genChildTarget(item, grand)" :href="grand.href" ripple="ripple">
                    <v-list-tile-content>
                      <v-list-tile-title>{{ grand.title }}3</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list-group>
                <!--child item-->
                <v-list-tile v-else :key="i" :to="genChildTarget(item, subItem)" :href="subItem.href" :disabled="subItem.disabled" :target="subItem.target" ripple="ripple">
                  <v-list-tile-content>
                    <v-list-tile-title><span>{{ subItem.title }}4</span></v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action v-if="subItem.action">
                    <v-icon :class="[subItem.actionClass || 'success--text']">{{ subItem.action }}5</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list-group>
            <v-subheader v-else-if="item.header && item.display" :key="i">{{ item.header }}</v-subheader>
            <v-divider v-else-if="item.divider" :key="i"></v-divider>
            <!--top-level link-->
            <v-list-tile 
              v-else-if="item.display"
              :to="!item.href ? { name: item.name } : null" 
              :href="item.href" 
              :disabled="item.disabled" 
              :target="item.target" 
              ripple="ripple" 
              rel="noopener"
              append
              :key="item.name"
              @click.prevent="linkClicked"
              >
              <v-list-tile-action v-if="item.icon">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{$t('menu.' + item.name)}} : {{item.display}}
                </v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action v-if="item.subAction">
                <v-icon class="success--text">{{ item.subAction }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
        </template>
      </v-list>        
    </vue-perfect-scrollbar>
  </v-navigation-drawer>
</template>
<script>
import menu from '@/api/menu';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import selectConfig from '@/js/selectConfig.js'

export default {
  name: 'app-drawer',
  components: {
    VuePerfectScrollbar,
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: true
    },
  },
  data: () => ({
    mini: false,
    drawer: false,  // left menu 오픈여부
    menus: [],
    scrollSettings: {
      maxScrollbarLength: 160
    },
    routedPath: '',
    swingMenus: []  // swing web의 메뉴
  }),
  computed: {
    computeGroupActive () {
      return true;
    },
    computeLogo () {
      return '/static/m.png';
    },
    sideToolbarColor () {
      return this.$vuetify.options.extra.sideNav;
    }
  },
  watch: {
    // isLogin() {
    //   console.log('isLogin' + this.isLogin);
    //   if (this.isLogin) {
    //     this.setMenuAuth();
    //   }
    // }
  },
  beforeMount() {
    console.log(':::::::::::::::: beforeMount ::::::::::::::::::::::')
    window.getApp.$on('REQUEST_MENU', this.sendMenus)
    // this.menus = this.$_.clone(menu);
    window.getApp.$on('USER_LOGIN', this.setMenuAuth);

    window.getApp.$on('APP_DRAWER_TOGGLED', () => {
      this.drawer = !this.drawer;
      // this.drawer = true;
    });
  },
  mounted() {
    this.setMenuAuth();
  },
  beforeDestroy () {
    // TODO : remove event listener, 삭제 하지 않으면 이벤트가 중복 발생됨
    // 모든 이벤트 제거    
    // window.getApp.$off('APP_DRAWER_TOGGLED');
    window.getApp.$off('REQUEST_MENU', this.sendMenus);
    window.getApp.$off('REQUEST_MENU', this.doAfterLogin);
    window.getApp.$off('USER_LOGIN', this.setMenuAuth);
    Object.assign(this.$data, this.$options.data());
 },
  methods: {
    sendMenus() {
      window.getApp.$emit('MENU_EDITABLE_SET', this.menus);
    },
    genChildTarget (item, subItem) {
      if (subItem.href) return;
      if (subItem.component) {
        return {
          name: subItem.component,
        };
      }
      return { name: `${item.group}/${(subItem.name)}` };
    },
    linkClicked() {
      // if (this.routedPath === window.getApp.$route.fullPath) {
      //   this.routedPath = window.getApp.$route.fullPath
      //   // window.getApp.$router.go(0)
      // } else this.routedPath = window.getApp.$route.fullPath
      // window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    // swing pc 버전의 메뉴를 가져온다.
    setMenuAuth() {
      this.menus = this.$_.clone(menu);
      this.$ajax.url = selectConfig.menu.url;
      this.$ajax.param = null;
      this.$ajax.requestGet((_result) => {
        var swingMenus = this.$_.keyBy(_result, 'progPath');
        /** 1level 메뉴 접근 권한 체크 **/
        // 메뉴 표시 처리
        var filterItems = ['/wo', '/pm', '/inspection', '/report']
        var filter = this.$_.filter(swingMenus, (_item) => {
          return this.$_.includes(filterItems, _item.progPath)
        })

        var headerFilter = this.$_.filter(this.menus, (_item) => {
          return _item.hasOwnProperty('header');
        });
        
        // filter = this.$_.forEach(filter, (_item) => {
        //   return _item.display = typeof this.$_.includes(filterItems, _item.progPath) === 'undefined' ? false : this.$_.includes(filterItems, _item.progPath)
        // })
        /** 1level 메뉴 접근 권한 체크 end **/

        /** 2, 3level 메뉴 접근 권한 체크 **/
        this.getMeusofLevel(filter, headerFilter);
        /** 2, 3level 메뉴 접근 권한 체크 END **/
      })
    },
    getMeusofLevel(_webMenuList, headerFilter) {
      this.$_.forEach(_webMenuList, (_item) => {
        if (_item.menuLevel >= 2) {
          var filter = this.$_.filter(this.menus, (__item) => {
             if (this.$_.isArray(__item.relatePath)) return this.$_.includes(__item.relatePath, _item.progPath);
            else return __item.relatePath === _item.progPath;
          });

          this.$_.forEach(filter, (_menu) => {
            _menu.editable = _item.writeYn;
            _menu.display = true;
            
            var header = this.$_.filter(headerFilter, (_header) => {
              return _header.group === _menu.group;
            });
            if (header.length) header[0].display = true;
          });
          // if (_item.childMenuViews.length > 0) this.getMeusofLevel(_item.childMenuViews)
        }
        
        // 자식이 있으면 자식 노드 조회
        if (_item.childMenuViews.length > 0) this.getMeusofLevel(_item.childMenuViews, headerFilter)
      });
    }
  }
};
</script>


<style lang="stylus">
// @import '../../node_modules/vuetify/src/stylus/settings/_elevations.styl';

#appDrawer
  overflow: hidden
  .drawer-menu--scroll
    height: calc(100vh - 48px)
    overflow: auto
</style>
