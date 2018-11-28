<template>
    <v-app>
        <v-navigation-drawer fixed :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" app>
            <v-list>
                <v-list-tile value="true" v-for="(item, i) in items" :key="i" @click.prevent="linkto(item.linkpath)">
                    <v-list-tile-action>
                        <v-icon v-html="item.icon"></v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar fixed app :clipped-left="clipped">
            <v-toolbar-side-icon @click.prevent="drawer = !drawer"></v-toolbar-side-icon>
            <v-btn icon @click.prevent="miniVariant = !miniVariant">
                <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
            </v-btn>
            <v-btn icon @click.prevent="clipped = !clipped">
                <v-icon>web</v-icon>
            </v-btn>
            <v-btn icon @click.prevent="fixed = !fixed">
                <v-icon>remove</v-icon>
            </v-btn>
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click.prevent="rightDrawer = !rightDrawer">
                <v-icon>menu</v-icon>
            </v-btn>
        </v-toolbar>
        <v-content color="#FAFBFE">
            <router-view></router-view>
        </v-content>
        <v-navigation-drawer temporary :right="right" v-model="rightDrawer" fixed>
            <v-list>
                <v-list-tile @click.native="right = !right">
                    <v-list-tile-action>
                        <v-icon>compare_arrows</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-footer :fixed="fixed" app>
            <span>&copy; 2017</span>
        </v-footer>
    </v-app>
</template>
<script>
export default {
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: [
                { icon: 'home', title: 'DashBoard', linkpath: '/summary/dashboard' },
                { icon: 'star', title: 'Hello Vue', linkpath: '/helloworld' },
                { icon: 'build', title: 'Controls', linkpath: '/samples/Controls'},
                { icon: 'build', title: 'Grid', linkpath: '/samples/Grid'},
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js'
        }
    },
    methods: {
        linkto(pathname) {
            this.$router.push({ path: pathname })
        },
    }
}

</script>
