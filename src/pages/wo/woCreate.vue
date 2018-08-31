<template>
  <div id="page-text-fields">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Basic Usage">
            <div slot="widget-content">
              <v-container>
                <v-layout row wrap>
                  <v-flex xs12 sm6>
                    <v-text-field
                      value=""
                      label="WO No."
                      placeholder="WO는 자동생성됩니다."
                      disabled
                    ></v-text-field>
                  </v-flex>
                </v-layout>                
                <v-layout row wrap>
                  <v-flex xs12 sm6>
                    <v-text-field
                      label="설비"
                      v-model="email"
                      placeholder="관련 설비를 선택하세요."
                      :rules="[$rules.required]"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <Datepicker @dateChanged="dateChanged" label="보증만료일"></Datepicker>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 sm6>
                    <v-text-field
                      name="input-2"
                      label="작업제목"
                      value=""
                      :counter="25"
                      :rules="[$rules.maxCount = 25, $rules.maxLength, $rules.required]"
                      append-outer-icon="info"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6>
                    <v-select
                      :items="items"
                      label="작업부서">
                    </v-select>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-textarea
                        label="작업내역"
                        rows="3"
                        value=""
                        hint="0 / 4000">
                    </v-textarea>
                  </v-flex>
                </v-layout>
                 <v-layout row wrap>
                     <v-flex xs12>
                      <div class="text-xs-center">
                        <y-btn
                          type="save"
                          title="save"
                          action-url="test"
                          @btnClicked="btnSaveClicked" 
                          @btnClickedError="btnClickedError"
                        ></y-btn>
                        <y-btn
                          type="delete"
                          title="delete"
                        ></y-btn>
                        <y-btn
                          type="cancel"
                          title="cancel"
                        ></y-btn>
                        <y-btn
                          type="canc"
                          title="canc"
                        ></y-btn>
                      </div>
                     </v-flex>
                 </v-layout>       
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from '@/components/VWidget';
export default {
  components: {
    VWidget
  },
  data () {
    return {
      email: '',
      date: null,
      items: ['foo', 'bar', 'fizz', 'buzz'],
      // rules: {
      //   required: (value) => !!value || 'Required.',
      //   email: (value) => {
      //     const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //     return pattern.test(value) || 'Invalid e-mail.';
      //   }    
      // }  
    };
  },
  methods: {
    dateChanged(_date) {
      console.log('[debug]' + _date)
      this.date = _date
    },
    btnSaveClicked(_result) {
      console.log('btn save clicked')
    },
    btnClickedError(_result) {
      console.log('btn error')
    }
  }
};
</script>