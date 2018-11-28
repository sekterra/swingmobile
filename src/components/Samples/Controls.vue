<template>
  <v-container fluid>
        <v-slide-y-transition mode="out-in">
            <v-layout column align-center>
                <h1>{{ msg }}1</h1>
                <!-- select -->
                <v-select
                  :items="items"
                  label="select">
                </v-select>
                <!-- /select -->

                <!-- text -->
                <v-text-field
                  label="text" 
                  counter="25"
                  maxlength="25"
                  hint="This field uses maxlength attribute"
                  clearable>
                </v-text-field>
                <!-- /text -->

                <!-- number -->
                
                <v-text-field
                  :value="price"
                  hint="This demo has a maximum of 6 steps"
                  label="Number"
                  max="10000"
                  min="1"
                  persistent-hint
                  type="number">
                  </v-text-field>
                <!-- <number-input v-model="value" :min="1" :max="10" inline controls></number-input>
                <vue-numeric currency="\" separator="," v-model="price" currency-symbol-position="suffix"></vue-numeric> -->
                <!-- /number -->

                <v-text-field mask="###,###,###,###,###" label="천단위 구분">
                </v-text-field>

                <v-text-field mask="### - #### - ####" label="Cellphone">
                </v-text-field>

                <v-text-field mask="time" label="time">
                </v-text-field>

                <!-- slider -->
                <v-slider v-model="duration" min="10" max="100" label="slider" step="10" thumb-label></v-slider>
                <!-- /slider -->

                <!-- datepicker -->
                <v-menu
                ref="menu2"
                :close-on-content-click="false"
                v-model="menu2"
                :nudge-right="40"
                :return-value.sync="date"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="100px">
                <v-text-field
                  slot="activator"
                  v-model="date"
                  label="DatePicker"
                  prepend-icon="event"
                  readonly>
                </v-text-field>
                <v-date-picker v-model="date" @input="$refs.menu2.save(date)" locale="kr-ko"></v-date-picker>
               </v-menu>

               <datepicker @dateChanged="dateChanged"></datepicker>
               <!-- datepciker-->

              <!--확장 검색 영역-->
              <v-expansion-panel>
                <v-expansion-panel-content>
                  <div slot="header">확장검색</div>
                  <v-container fluid grid-list-md>
                    <v-layout row wrap>
                      <v-flex d-flex xs12 sm6 lg6 child-flex>
                        <v-card>
                          <v-text-field
                            label="text" 
                            class="mr-2"
                            clearable>
                          </v-text-field>
                        </v-card>
                      </v-flex>
                      <v-flex d-flex xs12 sm6 lg6>
                        <v-card>
                          <v-select
                            :items="items"
                            label="select">
                          </v-select>
                        </v-card>
                      </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                      <v-flex d-flex xs12 sm6 lg6 child-flex>
                        <v-card tile cloumn>
                          <datepicker @dateChanged="dateChanged" label="From"></datepicker>
                        </v-card>
                      </v-flex>
                      <v-flex d-flex xs12 sm6 lg6>
                        <v-card>
                           <datepicker @dateChanged="dateChanged" label="To"></datepicker>
                        </v-card>
                      </v-flex>
                  </v-layout>
                  </v-container>
                </v-expansion-panel-content>
              </v-expansion-panel>
              <!--/확장 검색 영역-->

              <!-- <v-container fluid grid-list-sm>
                <v-layout row wrap>
                  <v-flex d-flex xs12 order-xs5>
                    <v-layout column>
                      <v-flex d-flex>
                        <v-card color="blue-grey" dark tile flat>
                          <v-card-text>#1</v-card-text>
                        </v-card>
                      </v-flex>
                      <v-flex d-flex>
                        <v-card color="brown" dark tile flat>
                          <v-card-text>#2</v-card-text>
                        </v-card>
                      </v-flex>
                    </v-layout>
                </v-flex>
                  <v-flex d-flex xs12 sm7>
                    <v-layout row wrap>
                      <v-flex d-flex>
                        <v-card color="indigo lighten-2" dark tile flat>
                          <v-card-text>#3</v-card-text>
                        </v-card>
                      </v-flex>
                      <v-flex d-flex>
                        <v-layout row>
                          <v-flex
                            v-for="n in 2"
                            :key="n"
                            d-flex
                          >
                            <v-card
                              color="amber lighten-2"
                              tile
                              flat
                            >
                              <v-card-text>#4</v-card-text>
                            </v-card>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex d-flex xs12 sm2 child-flex>
                    <v-card color="orange lighten-2" tile flat>
                      <v-card-text>#5</v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex d-flex xs12 sm3>
                    <v-card color="red lighten-2" dark tile flat>
                      <v-card-text>#6</v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container> -->

               <!-- for debug-->
               <div>
                 <p>
                  <img v-if="imgData" id="photo" :src="imgData" style="width:60%;height:60%;"/>
                 </p>
                 <p style="width:300px;">Image path : {{imgLog}}</p>
                 <v-btn color="success" @click.prevent="init">take photo</v-btn>
               </div>
               <!-- <div id="debug">
                 <div><strong><h2>::::: DEBUG :::::</h2></strong></div>
                 <div>{{debug}}</div>
               </div> -->
               <!-- /for debug -->
            </v-layout>
        </v-slide-y-transition>
    </v-container>
</template>

<script>
import datepicker from '../DatePicker';
export default {
  components: {
    'datepicker': datepicker
  },
  data() {
    return {
      msg: '컨트롤',
      items: ['foo', 'bar', 'fizz', 'buzz'],
      date: null,
      menu2: null,
      landscape: false,
      imgData: null,
      imgLog: '',
      debug: '',
      price: 1000,
      duration: 1
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
        // var Camera = navigator.camera.Camera;
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

      //  navigator.camera.getPicture(this.ftw, this.wtf, {});
    },
    ftw(_imageData) {
      // this.$refs.img.src = _imageData;
      // this.$refs.imgContent.textContent = _imageData;
      this.imgData = _imageData
      this.imgLog = _imageData
    },
    wtf(_error) {
      // this.$refs.imgContent.textContent = '[ERROR] : ' + _error;
      this.imgLog = '[ERROR] : ' + _error;
    }
  }
}
</script>

