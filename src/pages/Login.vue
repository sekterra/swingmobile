<template>
  <!-- <v-app id="login" class="primary"> -->
  <v-app id="login">
    <v-content>
      <v-container id="login_container" fluid fill-height class="background">
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <!-- <img src="static/v.png" alt="Vue Material Admin"> -->
                  <h1 class="flex my-4 primary--text">swing CMMS mobile</h1>
                </div>                
                <v-form>
                  <v-text-field 
                    append-icon="person" 
                    name="login" 
                    :label="$t('title.id')" 
                    type="text" 
                    v-model="userInfo.username">
                  </v-text-field>
                  <v-text-field 
                    append-icon="lock" 
                    name="password" 
                    :label="$t('title.password')" 
                    id="password" 
                    type="password" 
                    v-model="userInfo.password">
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-layout align-center justify-space-between row fill-height>
                  <y-i18n></y-i18n>
                  <v-spacer></v-spacer>
                  <v-btn block color="success" @click="login" :loading="loading">Login</v-btn>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import jwt from '@/js/jwtToken'
import YI18n from '@/components/widgets/YI18n'
// https://vuejsexamples.com/vue-component-for-country-flags/

export default {
  components: {
    'y-i18n': YI18n
  },
  data: () => ({
    loading: false,
    userInfo: {
      username: 'cmms',
      password: 'cmms'
    },
    locale: null,
    items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' }
      ]
  }),
  mounted() {
    this.locale = localStorage.locale
  },
  methods: {
    login () {
      this.$ajax.isSetHeader = false
      this.$ajax.url = '/auth/login'
      this.$ajax.isAuthCheck = true
      this.$ajax.param = this.userInfo
      let self = this
      this.loading = true
      this.$ajax.requestPost((_result) => {
        try {
          this.$ajax.isSetHeader = true
          jwt.setJwtToken(_result.token)
          jwt.checkValidToken((data) => {
            if (data === '' || data === 'undefined') {
              window.alert('jwt error')
              comm.movePage('/')
              return
            }
            localStorage.userPk = data.userpk
            this.$emit('USER_LOGIN')
            // window.getApp.setUserPk(data.userpk)
          })
          setTimeout(() => { 
            this.loading = false
            this.$ajax.isAuthCheck = false
            this.$ajax.isSetHeader = true
            this.$comm.movePage(self.$router, '/dashboard')
          }, 1000);
        } catch(e) {
          console.log('_success error:' + e.message)
          // window.alert(e.message)
        }
      }, (_error) => {
        console.log('_error:' + JSON.stringify(_error))
        this.loading = false
        // window.alert(JSON.stringify(_error))
      })
      // this.loading = true;
      // setTimeout(() => {
      //   this.$router.push('/dashboard');
      // }, 1000);
    }
  }

};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
  .background::after {
    background-image: url('../static/background.jpg');
    background-repeat: no-repeat;
    opacity:0.3!important;
    content:"";
    width:100%;
    height:100%;
    z-index:-1;
    position:absolute;
    top: 0;
    left: 0;
    background-position:center;
    background-origin:content-box;
  }
  .border {
    border: 1px solid #0000ff;
  }
</style>
