<template>
<v-app>
    <!--
      xs : small to large cellphone, 화면크기 600px 이하
      sm : small to medium tablent, 화면크기 601px ~ 959px
      md : large tablet to laptop, 화면크기 960px ~ 1263px
      lg: desktop, 화면크기 1264px ~ 1903px
      xl : 4k and ultra-wides, 1904px 초과
      suffix(1~12) : vuetify는 화면크기별로 가로를 유동적으로 12개로 나누는 미디어 breakpoint가 있음, 
      예) 겔럭시 s5의 portrait 화면크기는 360X640 인데(xs에 속함), breakpoint틀 3으로 지정(xs3)할경우에 영역의 크기는 (360 / 12) * 3 = 90 이됨
     
     기본적으로 작은 것을 지정하면 큰 것들은 그대로 따라감
     예) xs12 만 지정해두면 sm, md, lg 등의 큰 device도 breakpoint 12 크기만큼 영역을 가짐
     하지만, image파일 처럼 이미지 크기를 너무 확장해 버리면 보기가 싫어지는 현상이 발생할 수도 있기 때문에
     image 크기에 맞게 아래와 같이 화면 크기에 따라 다양한 breakpoint를 지정하여,
     적정 image 품질을 유지할 수 있도록 해주는게 좋음
     
     offset-XXXX 는 좌측 여백을 의미하는데,
     offset도 breakpoint와 마찬가지로, 12개의 유동적 영역으로 나누어져 있음
     offset을 잘 활용하면 속성값만으로 가운데 정렬이 가능함
     예) xs10 offset-xs1을 지정하면, 왼쪽 여백을 breakpoint 1만큼 잡은 후 미디어 영역(10만큼)을 잡는데, 이때 남은 영역은 1이됨(12 - 1 - 10 = 1)
          남은 영역 1이 우측영역을 차지 하므로 결과적으로 가운데 정렬 처럼 보이게 됨
          ※ breakpoint 값과 offset의 값을 더한 값이 12가 넘지 않아야 한다. (넘길 경우 초과된 영역만큼 우측 화면이 보이지 않게 됨)

     <v-flex xs10 sm8 offset-xs1 offset-sm2>
     위 태그에 대한 설명 : 
        겔럭시 s5 device를 portrait 형식으로 볼 경우 이미지를 breakpoint 10영역 만큼 할당
        breakpoint 1 크기 만큼 좌측 여백 부여(offset-xs1) 결과적으로 가운데 정렬됨

        landscape형식으로 볼 경우 breakpoint 8 크기만큼 영역을 잡은 후,
        breakpoint 2 크기 만큼 좌측 여백 부여(offset-sm2) 결과적으로 가운데 정렬됨
    -->
     <v-container>
       <v-layout align-center="true" fill-height>
        <v-container grid-list-xs class="pa-0">
          <v-layout d-block align-center="true">
            <v-flex>
              <v-card flat>
                <v-card-media
                  :src="require('./images/swing.png')"
                  :height="productLogoHeight">
                </v-card-media>
                <v-card-text>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex>
              <v-container class="pa-0">
                  <v-layout v-bind="binding" fill-height>
                    <v-flex>
                      <v-card flat>
                        <div :class="{'text-xs-center': true, 'subheading': $vuetify.breakpoint.xs, 'title': $vuetify.breakpoint.sm, 'headline': $vuetify.breakpoint.mdAndUp}">
                          Smart Work Information & Navigation Gear
                        </div>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </v-container>
            </v-flex>
            <v-flex>
              <v-card flat>
                <v-card-text>
                    <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                    <v-text-field id="password" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
              </v-card-text>
              <div class="text-xs-center">
                <v-btn color="success" @click.prevent="login">Login</v-btn>
              </div>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card flat>
                <v-flex xs6 offset-xs3>
                  <v-card  flat>
                    <v-card-media
                    :src="require('./images/yullin_logo.png')"
                    :height="companyLogoHeight">
                  </v-card-media>
                  </v-card>
                </v-flex>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
       </v-layout>
     </v-container>
</v-app>
</template>

<script>
import config from './js/config.js';

export default {
  mounted() {
    try {
      var physicalScreenWidth = window.screen.width * window.devicePixelRatio;
      var physicalScreenHeight = window.screen.height * window.devicePixelRatio;
      console.log('physicalScreenWidth:' + physicalScreenWidth + ' physicalScreenHeight:' + physicalScreenHeight);
      console.log('width:' + window.screen.width + ' height:' + window.screen.height + ' devicePixelRatio:' + window.devicePixelRatio + 'config:' + JSON.stringify(config));

      // window.addEventListener('orientationchange', function(){
      //   try {
      //     console.log(screen.orientation.type); // e.g. portrait  
      //   } catch (error) {
      //     console.log(error.message); // e.g. portrait
      //   }
      // });
    }
    catch(e) {
      console.log('Error:' + e.message)
    }
  },
  computed: {
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.mdAndUp) binding.column = true
      return binding
    },
    productLogoHeight () {
      var productLogoHeight = 0
      if (this.$vuetify.breakpoint.xs) {
        console.log('this screen size is xs');
        productLogoHeight = '100';
      } else if (this.$vuetify.breakpoint.sm) {
        console.log('this screen size is smAndUp');
        productLogoHeight = '180';
      } else if (this.$vuetify.breakpoint.smAndUp) {
        console.log('this screen size is smAndUp');
        productLogoHeight = '200';
      }
       else {
        console.log('this screen size is nothing');
      }
      return productLogoHeight
    },
    companyLogoHeight () {
      var companyLogoHeight = 0
      if (this.$vuetify.breakpoint.xs) {
        console.log('this screen size is xs');
        companyLogoHeight = '20';
      } else if (this.$vuetify.breakpoint.sm) {
        console.log('this screen size is smAndUp');
        companyLogoHeight = '40';
      } else if (this.$vuetify.breakpoint.smAndUp) {
        console.log('this screen size is smAndUp');
        companyLogoHeight = '60';
      }
       else {
        console.log('this screen size is nothing');
      }
      return companyLogoHeight
    }
  },
  data() {
    return {
    }
  },
  methods: {
    login() {
      console.log('move main Page')
      try {
        var pathname = '/summary/dashboard'
        this.$router.push({ path: pathname })
        console.log('move Page2')
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style>
.subtitle {
  color: #5491f2;
  font-weight: bold;
}
.border {
  border: 1px dashed #0000ff;
}
</style>

