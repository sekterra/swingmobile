<template>
  <v-container fluid>
        <v-layout column>
          <!-- for debug-->
              <div class="text-xs-center">
                <!-- <p>
                  <img v-if="imgData" id="photo" :src="imgData" style="width:50%;height:50%;"/>
                </p>
                <p style="width:300px;">Image path : {{imgLog}}</p> -->
                <v-btn large round color="primary" @click="init">
                  <v-icon>camera_alt</v-icon>
                </v-btn>
              </div>
              <!-- <div id="debug">
                <div><strong><h2>::::: DEBUG :::::</h2></strong></div>
                <div>{{debug}}</div>
              </div> -->
              <!-- /for debug -->
          </v-layout>
        <v-slide-y-transition mode="out-in">
          <v-layout column>
            <!-- lazy속성을 true로 줘야 카메라에 찍힌 사진이 표시가 됨 -->
            <v-carousel hide-controls :cycle="false" :lazy="true">
              <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src">
              </v-carousel-item>
            </v-carousel>
          </v-layout>
        </v-slide-y-transition>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      imgData: null,
      imgLog: '',
      debug: '',
      items: [
        // {
        //   src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        // },
        // {
        //   src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        // },
        // {
        //   src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        // },
        // {
        //   src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        // }
      ]
    }
  },
  methods: {
    init() {
      this.takePhoto();
    },
    dateChanged(_date) {
      this.debug = '[parent datepicker]:' + _date;
    },
    takePhoto() {
      try {
        let opts = {
          quality: 80,
          // destinationType: Camera.DestinationType.FILE_URI,
          // sourceType: Camera.PictoureSourceType.Camera,
          // mediaType: Camera.MediaType.PICTURE,
          // encodingType: Camera.EncodingType.JPEG,
          // cameraDirection: Camera.Direction.BACK,
          targetWidth: 300,
          targetHeight: 400
        };
        navigator.camera.getPicture(this.ftw, this.wtf, opts);
      } catch (e) {
        this.debug = '[Error]' + e.message;
      }
    },
    ftw(_imageData) {
      try {
        this.imgData = _imageData;
        this.imgLog = _imageData;
        this.items.unshift({'src': this.imgData});
        this.$forceUpdate()
      } catch (e) {
        window.alert(e.message);
      }
    },
    wtf(_error) {
      this.imgLog = '[ERROR] : ' + _error;
    }
  }
}
</script>