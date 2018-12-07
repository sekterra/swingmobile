<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid class="mt-0 pt-0">
      <v-layout row wrap v-scroll="onScroll">
        <v-flex sm12>
          <v-card v-if="requestData.equipCd">
            <v-toolbar color="primary darken-1" dark="" flat dense cad>
              <v-toolbar-title class="subheading">{{$t('menu.woCompleteList')}}</v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-media>
              <!-- 요청내역 -->
              <v-container grid-list-xl fluid>
              <v-layout row>
                <v-flex xs12>
                  <v-card>
                    <v-img v-if="woImage"
                      :src="woImage"
                      height="200px"
                    />
                    <v-img 
                      v-else 
                      src="static/no-image-icon.png"
                      height="200px"
                    />
                    <v-card-title primary-title>
                      <div>
                        <div class="headline">{{ '[' + requestData.equipCd + '] ' + requestData.equipNm }}</div>
                      </div>
                    </v-card-title>
                      <v-card-media>
                          <v-container py-0>
                            <v-layout row wrap>
                              <v-flex xs12 sm6>
                                <v-icon small>chevron_right</v-icon> {{$t('title.woNo')}} : {{ requestData.workOrderNo }}
                              </v-flex>
                            </v-layout>
                            <v-slide-y-transition>
                            <v-layout row wrap  v-show="show">
                                <v-flex xs12 sm6>
                                  <v-icon small>chevron_right</v-icon> {{$t('title.warrantyDate')}} : {{ requestData.warrantyDt}}
                                </v-flex>
                                <v-flex xs12 sm6>
                                  <v-icon small>chevron_right</v-icon> {{$t('title.woPlanDate')}} : {{ requestData.planStartDt + ' ~ ' + requestData.planEndDt }}
                                </v-flex>
                                <v-flex xs12 sm6>
                                  <v-icon small>chevron_right</v-icon> {{$t('title.maintenanceType')}} : {{ requestData.maintTypeNm }}
                                </v-flex>
                                <v-flex xs12 sm6>
                                  <v-icon small>chevron_right</v-icon> {{$t('title.woTitle')}} : {{ requestData.workTitle }}
                                </v-flex>
                                <v-flex xs12 sm6>
                                  <v-icon small>chevron_right</v-icon> {{$t('title.requestUser')}} : {{ requestData.workOrderApproval.rqstUserNm }}
                                </v-flex>
                                <v-flex xs12 sm6>
                                  <v-icon small>chevron_right</v-icon> {{$t('title.woRequestDate')}} : {{ requestData.workOrderApproval.rqstDt }}
                                </v-flex>
                                <!-- 고장 일시 -->
                                <v-flex 
                                  v-if="requestData.maintTypeCd === 'MAINT_TYPE_BM'"
                                  xs12 
                                  sm6
                                >
                                  <v-icon small>domain_disabled</v-icon> {{$t('title.woRequestDate')}} : {{ breakdownDateTime }}
                                </v-flex>
                                <!-- <v-flex 
                                  v-if="woStatusCd === 'WO_STATUS_C'"
                                  xs12>
                                  <v-alert
                                    :value="woStatusCd === 'WO_STATUS_C'"
                                    type="success"
                                  >
                                    {{$t('message.woComplete')}}
                                  </v-alert>
                                </v-flex>
                                <v-flex 
                                  v-if="woStatusCd === 'WO_STATUS_X'"
                                  xs12>
                                  <v-alert
                                    :value="woStatusCd === 'WO_STATUS_X'"
                                    type="error"
                                  >
                                    {{$t('message.woCancel')}}
                                  </v-alert>
                                </v-flex> -->
                            </v-layout>
                            </v-slide-y-transition>
                        </v-container>
                      </v-card-media>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn icon @click.prevent="show = !show">
                        <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                      </v-btn>
                    </v-card-actions>
                    </v-card>
                </v-flex>
              </v-layout>
              </v-container>
              <!-- /요청내역 -->
            </v-card-media>
            <v-card-text class="">
              <!-- WO내용 -->
              <v-form v-model="isValidForm">
                  <v-layout row wrap fill-height>
                    <v-flex 
                      xs12 
                      class="py-0"
                      v-if="woStatusCd === 'WO_STATUS_X' || woStatusCd === 'WO_STATUS_C'"
                      >
                      <v-alert
                        v-if="woStatusCd === 'WO_STATUS_C'"
                        :value="true"
                        type="success"
                      >
                        {{$t('message.woComplete')}}
                      </v-alert>
                      <v-alert
                        v-if="woStatusCd === 'WO_STATUS_X'"
                        :value="true"
                        type="info"
                      >
                        {{$t('message.woCancel')}}
                      </v-alert>
                    </v-flex>
                    <!-- 작업 내용 -->
                    <v-flex sm12 class="py-0">
                      <y-textarea
                        :editable="editable"
                        :label="$t('title.woDescription')"
                        :counter="2000"
                        :maxlength="2000"
                        name="workText"
                        :error-msg="errors.first('workText')"
                        v-model="saveData.workOrder.workText"
                      >
                      </y-textarea>
                    </v-flex>
                    <!-- 작업기간 -->
                    <v-flex sm6 class="py-0">
                      <y-durationpicker
                      :editable="editable"
                      :label="$t('title.workDate')"
                      name="workDate"
                      default-type="today"
                      v-validate="'required'"
                      v-model="workDate"
                      data-vv-name="workDate"
                      :error-msg="errors.first('workDate')"
                      >
                      </y-durationpicker>
                    </v-flex>
                    <!-- 작업 부서 -->
                    <v-flex sm6 class="py-0">
                      <y-select
                        :editable="editable"
                        :label="$t('title.woDepartment')"
                        item-search-key="depart"
                        name="deptPk"
                        v-model="saveData.workOrder.dept"
                      >
                      </y-select>
                    </v-flex>
                    <!-- 작업종료 일자 -->
                    <v-flex xs12 sm6 
                      v-if="editable"
                      class="py-0">
                      <y-datepicker
                        :editable="editable"
                        :label="$t('title.woEndDate') + '*'"
                        name="finishDate"
                        v-model="finishDate" 
                        default-type="today"
                        child-validate-type="required"
                        v-validate="'required'"
                        data-vv-name="finishDate"
                        :error-msg="errors.first('finishDate')"
                      >
                      </y-datepicker>
                      {{finishDate}} : {{saveData.workOrder.finishDt}} : {{finishTime}}
                    </v-flex>
                    <!-- 작업종료 시간 -->
                    <v-flex 
                      v-if="editable"
                      xs12 
                      sm6 
                      class="py-0">
                      <y-timepicker
                        v-if="editable"
                        :editable="editable"
                        :label="$t('title.woEndTime') + '*'"
                        name="finishTime"
                        v-model="finishTime"
                        default-type="current"
                        child-validate-type="required"
                        v-validate="'required'"
                        data-vv-name="finishTime"
                        :error-msg="errors.first('finishTime')"
                      >
                      </y-timepicker>
                    </v-flex>
                    <v-flex xs12
                      v-if="!editable"
                    >
                      <v-text-field
                        :value="finishDateTime"
                        :label="$t('title.equipmentOfDowndatetime')"
                        readonly
                      ></v-text-field>
                    </v-flex>
                 
                    <v-flex sm6 class="py-0">
                      <!-- 현상코드 -->
                      <y-select
                        :editable="editable"
                        :label="$t('title.conditionType')"
                        name="problemPk"
                        item-search-key="woProblem"
                        v-model="saveData.workOrder.problem"
                      >
                      </y-select>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <!-- 원인코드 -->
                      <y-select
                        :editable="editable"
                        :label="$t('title.causeType')"
                        name="causePk"
                        item-search-key="woCause"
                        v-model="saveData.workOrder.cause"
                      >
                      </y-select>
                    </v-flex>
                                        
                    <v-flex sm6 class="py-0">
                      <!-- 프로젝트 -->
                      <y-select
                        :editable="editable"
                        :label="$t('title.project')"
                        name="prjPk"
                        item-search-key="project"
                        v-model="saveData.workOrder.project"
                      >
                      </y-select>
                    </v-flex>
                    <!-- 조치코드 -->
                    <v-flex sm6 class="py-0">
                      <y-select
                        :editable="editable"
                        :label="$t('title.remedy')"
                        name="woRemedy"
                        item-search-key="woRemedy"
                        v-model="saveData.workOrder.remedy"
                      >
                      </y-select>
                    </v-flex>

                  </v-layout>
                  <!-- 외주업체 -->
                  <v-layout row wrap fill-height>
                    <v-flex xs12>
                      <y-regist-list
                        ref="outsourcing"
                        :title="$t('title.outsourcingList')"
                        :sub-title="$t('title.numberOfSelects')"
                        :controlTitle="$t('title.searchForOutsourcing')"
                        :title-of-total="$t('title.totalCost')"
                        :combo-placeholder="$t('message.enterCost')"
                        selectItemKey="exSupplier"
                        icon="location_city"
                        :editable="editable"
                        :items="outsourcingItems"
                        @registListChanged="outsourceListChanged"
                      >
                      </y-regist-list>
                    </v-flex>
                  </v-layout>

                  <!-- 작업 인력 -->
                  <!-- <v-layout row wrap fill-height>
                    <v-flex xs12>
                      <y-regist-list
                        ref="employee"
                        :title="$t('title.employee')"
                        :sub-title="$t('title.numberOfSelects')"
                        :controlTitle="$t('title.searchForOutsourcing')"
                        :title-of-total="$t('title.totalHours')"
                        :combo-placeholder="$t('message.workHour')"
                        select-item-key="employee"
                        hint-item-key="jobClass"
                        hint-pk="jobClassPk"
                        hint-key="wageCost"
                        :hint-title="$t('title.wageUnitPrice')"
                        :is-hint-number="true"
                        icon="people"
                        :editable="editable"
                        :items="employeeList"
                        @registListChanged="employListChanged"
                      >
                      </y-regist-list>
                    </v-flex>
                  </v-layout> -->

                  <!-- 작업 직종 -->
                  <v-layout row wrap fill-height>
                    <v-flex xs12>
                      <y-regist-list
                        ref="jobClass"
                        :title="$t('title.jobClass')"
                        :sub-title="$t('title.numberOfSelects')"
                        :controlTitle="$t('title.searchForOutsourcing')"
                        :title-of-total="$t('title.totalHours')"
                        :combo-placeholder="$t('message.workHour')"
                        selectItemKey="jobClass"
                        hint-key="wageCost"
                        :hint-title="$t('title.wageUnitPrice')"
                        :is-hint-number="true"
                        icon="people"
                        :editable="editable"
                        :items="jobClassList"
                        @registListChanged="jobClassListChanged"
                      >
                      </y-regist-list>
                    </v-flex>
                  </v-layout>

                  <!-- 작업 자재 -->
                  <v-layout row wrap fill-height>
                    <v-flex xs12>
                      <y-material-info-list
                        ref="materialList"
                        :items="materialList"
                        :title="$t('title.woMaterial')"
                        :controlTitle="$t('title.woMaterialInput')"
                        :sub-title="$t('title.numberOfSelects')"
                        :title-of-total="$t('title.cost')"
                        icon="people"
                        :editable="editable"
                        @openSearchPopup="openSearchPopup"
                        @registListChanged="materialListAdd"
                        @materialInfoListChanged="materialInfoListChanged"
                      >
                      </y-material-info-list>
                    </v-flex>
                  </v-layout>
                  <!-- 요약 -->
                  <v-layout row wrap fill-height>
                    <v-flex xs12>
                      <v-card>
                        <v-card-title class="pa-0 ma-0">
                          <v-toolbar color="white" flat white>
                            <v-toolbar-side-icon>
                              <v-icon v-if="editable" color="indigo lighten-3">event_note</v-icon>
                              <v-icon v-else color="indigo lighten-3">https</v-icon>
                            </v-toolbar-side-icon>
                            <v-toolbar-title class="indigo--text subheading">{{$t('title.summary')}}</v-toolbar-title>
                          </v-toolbar>
                          </v-card-title>
                          <v-divider></v-divider>
                          <v-card-text>
                            <v-layout row wrap align-center justify-start>
                              <v-flex xs12 sm6>
                                <div>
                                  <v-icon>location_city</v-icon> {{$t('title.outsourcingCost')}}: {{$comm.setNumberSeperator(saveData.workOrder.outsideCost)}}
                                </div>
                              </v-flex>
                              <v-flex xs12 sm6>
                                <div>
                                  <v-icon>people</v-icon> {{$t('title.laborCost')}}: {{$comm.setNumberSeperator(laborCost)}}
                                </div>
                              </v-flex>
                              <v-flex xs12 sm6>
                                <div>
                                  <v-icon>category</v-icon> {{$t('title.materialCost')}}: {{$comm.setNumberSeperator(saveData.workOrder.mtrlCost)}}
                                </div>
                              </v-flex>
                              <v-flex xs12 sm6>
                                <div>
                                  <v-text-field
                                  v-if="editable"
                                  prepend-icon="scatter_plot"
                                  :label="$t('title.etcCost')"
                                  hide-detail
                                  v-model="saveData.workOrder.etcCost"
                                  />
                                  <span v-else>
                                    {{$comm.setNumberSeperator(saveData.workOrder.etcCost)}}
                                  </span>
                                </div>
                              </v-flex>
                            </v-layout>
                          </v-card-text>
                          <v-divider></v-divider>
                          <v-card-actions>
                            <div class="body-1 indigo--text">
                              {{$t('title.totalCost')}}: {{$comm.setNumberSeperator(totCost)}}
                            </div>
                          </v-card-actions>
                      </v-card>
                    </v-flex>
                  </v-layout>
                  
                  <!-- 이미지 파일 업로드 -->
                  <v-layout>
                    <v-flex xs12>
                      <v-subheader class="pa-0 mt-3">
                        {{$t('title.woImageFileUpload')}}
                        <v-spacer></v-spacer>
                        <v-btn 
                        round
                        color="black" 
                        dark
                        @click.prevent="takePicture"
                      >
                        <v-icon>
                          camera
                        </v-icon>
                      </v-btn>
                      </v-subheader>
                      <v-carousel
                        v-if="carouselImageList.length"
                      >
                        <v-carousel-item
                          v-for="(item, i) in carouselImageList"
                          :key="i"
                          :src="item"
                          lazy
                        ></v-carousel-item>
                    </v-carousel>
                    <v-card
                      v-else
                      tile 
                      class="d-flex">
                      <v-img
                        src="static/no-image-icon.png"
                      >
                      </v-img>
                    </v-card>
                    </v-flex>
                  </v-layout>
              </v-form>
                <v-flex xs12>
                  <div class="text-xs-center">
                    <y-btn
                       v-if="editable"
                       type="save"
                      :title="$t('button.save')"
                      :action-url="url"
                      :action-type="requestType"
                      :param="saveData"
                      :is-valid-by-parent = "isValid"
                      :is-submit="isSubmit"
                      beforeSubmit = "beforeSubmit"
                      @btnClicked="btnSaveClicked" 
                      @btnClickedError="btnClickedError"
                      @beforeSubmit="beforeSubmit"
                    ></y-btn>
                    <!-- <y-btn
                      v-if="workOrderApproval.woStatusCd === 'WO_STATUS_P'"
                      type="save"
                      :title="$t('button.complete')"
                      :action-url="completeUrl"
                      :action-type="completeRequestType"
                      :param="saveData"
                      :is-valid-by-parent = "isValid"
                      @btnClicked="btnCompleteClicked"
                      @btnClickedError="btnClickedError"
                      @checkValidation="checkValidation"
                    >
                    </y-btn> -->
                    <!-- <y-btn
                      v-if="saveData.workOrder.workOrderApproval.woStatusCd === 'WO_STATUS_P'"
                       lazy
                       type="complete"
                      :title="$t('button.complete')"
                      :action-url="completeUrl"
                      :action-type="completeRequestType"
                      :param="saveData"
                      :is-valid-by-parent = "isValid"
                      btn-click-callback="btnCompleteClicked"
                      btn-clicked-error-callback="btnClickedError"
                      comunication-parent-callback="checkValidationComplete"
                      @btnCompleteClicked="btnCompleteClicked" 
                      @btnClickedError="btnClickedError"
                      @checkValidationComplete="checkValidation"
                    ></y-btn> -->
                     <y-btn
                      v-if="pk && editable"
                      type="delete"
                      :title="$t('button.woCancel')"
                      :action-url="transactionCancel.url + pk"
                      :action-type="transactionCancel.requestType"
                      :param="woCancel"
                      :is-submit="woCancel.isSubmit"
                      before-submit="getCancelRequest"
                      @btnClicked="btnCancelClicked"
                      @btnClickedError="btnClickedError"
                      @getCancelRequest="getCancelRequest"
                    ></y-btn>
                  </div>
                  </v-flex>
            </v-card-text>
            <!-- /WO내용 -->
          </v-card>
        </v-flex>           
      </v-layout>
      <y-popup 
        :search-item="popupSearchItem"
        :grid-type="popupGridType"
        :is-open-popup="isOpenPopup"
        :event-for-return="eventForReturn"
        :title="$t('title.materialSearchPopup')"
        @closePopup="closePopup"
        @bindMaterialData="bindMaterialData"
      >
      </y-popup>
      <y-dialog
        v-if="pk && editable"
        :title="$t('title.cancelReason')"
        :is-open-dialog="isOpenDialog"
        type="confirm"
        @dialogResult="dialogResult"
        >
        <y-textarea
          :label="$t('title.cancelReason')"
          :editable="editable"
          :counter="1000"
          :autofocus="true"
          slot="body"
          name="cancelReason"
          v-model="woCancel.cancelReason"
          :error-msg="errors.first('cancelReason')"
        />
      </y-dialog>
    </v-container>
    <!-- <div>
      <v-btn v-on:click="takePicture">{{$t("takePhoto")}}</v-btn>
    </div> -->
  </div>
</template>

<script>
import transactionConfig from '@/js/transactionConfig.js'
import selectConfig from '@/js/selectConfig.js'
import comboConfig from '@/js/comboConfig'
import jwt from '@/js/jwtToken.js'
import config from '@/js/config.js'
import $ from 'jquery'
import ajaxFile from '@/js/ajaxFile'
import YMaterialInfoList from '@/components/widgets/YMaterialInfoList'

let transaction = transactionConfig.wo.woCreate
export default {
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    YMaterialInfoList
  },
  data: () => (
  {
    // wo 저장
    saveData: {},
    url: null,
    requestType: null,
    isSubmit: false,
    // completeUrl: transaction.complete.url,
    // completeRequestType: transaction.complete.requestType,
    // WO 요청정보
    requestData: {
      workOrderApproval: []
    },  
    defaultSaveData: {},  // 초기 저장값(저장 값 초기화 시키기 위해 사용)
    // 검색용 팝업
    isOpenPopup: false,
    // 팝업 검색 결과 타입 설정(single: radio, multi: checkbox)
    popupGridType: '',
    // form 유효성 여부
    isValidForm: true,
    popupSearchItem: '',
    // TODO(중요) : 쓰기 권한 여부이며, 페이지내 컨트롤에 적용됨
    isValid: false,
    breakdownDateTime: null,  // 고장 일시
    imagePath: '',
    carouselIndex: 0,
    carouselImageList: [],
    upload: {
      imageList: [],
      loaded: 0,
      buffer: 0,
      uploadedImagesCount: 0  
    },
    attachType: 'WO_AFTER_PHOTO',
    // isShowCarousel: false,
    cameraImageList: [],
    pk: null,  // TODO : 현재 WO PK
    eventForReturn: '', // TODO : 팝업 창의 결과를 받는 함수명
    workDate: null,
    jobClassItems: [],  // 직종 정보(임금 단가 계산시 사용)
    // exSupplier: [], // 외주업체 서비스
    // exSupplierTitles: {},
    outsourcingItems: [],
    employeeList: [],
    jobClassList: [],
    materialList: [],
    show: true,
    finishDate: null,
    finishTime: null,
    woStatusCd: '',
    // outsourcingTotalCost: 0,
    employeeTotalCost: 0,
    jobClassTotalCost: 0,
    // materialTotalCost: 0,
    // etcCost: 0,
    woImage: null,  // WO 이미지 정보
    woCancel: {
      cancelReason: '',
      isSubmit: false
    },
    transactionCancel: transactionConfig.wo.cancel,
    // 알림 메시지
    isOpenDialog: false
  }),
  watch: {
    uploadedImagesCount() {
      if (this.upload.imageList.length && this.upload.uploadedImagesCount === this.upload.imageList.length) {
        this.completeImageUpload()
      }
    },
    workDate() {
      if (!this.workDate) {
        this.saveData.workOrder.startDt = null;
        this.saveData.workOrder.endDt = null;
      } else {
        this.saveData.workOrder.startDt =  this.workDate.fromDate;
        this.saveData.workOrder.endDt =  this.workDateworkDate.toDate;
      }
    }
  },
  computed: {
    laborCost() {
      this.saveData.workOrder.laborCost = this.employeeTotalCost + this.jobClassTotalCost
      return this.saveData.workOrder.laborCost
    },
    totCost() {
      this.saveData.workOrder.totCost = this.saveData.workOrder.outsideCost + this.saveData.workOrder.laborCost + this.saveData.workOrder.mtrlCost +  Number(this.saveData.workOrder.etcCost)
      return this.saveData.workOrder.totCost
    },
    finishDateTime() {
      return this.finishDate + ' ' + this.finishTime
    },
    editable() {
      return this.woStatusCd !== 'WO_STATUS_X' && this.woStatusCd !== 'WO_STATUS_C'
    }
  },
  watch: {
    
  },
  beforeMount() {
    Object.assign(this.$data, this.$options.data());
    this.saveData = this.$comm.clone(transaction.complete.param)
    this.url = transaction.complete.url
    this.requestType = transaction.complete.requestType
  },
  mounted () {
    // TODO : vue router로 전달된 값이 있으면 별도로 처리한다.
    // 참고 : @/router/path.js의 props 속성에서 설정된 방식으로 처리됨
    if (this.$attrs.query) {
      var pk = this.$attrs.query
      this.pk = pk
      this.$nextTick(() => {
        this.url += this.pk
        this.onSearch(pk)
        this.getOutsourceList(pk)
        this.getLaborList(pk)
        this.getImagePks(pk)
        this.getMaterialList(pk)
      })
    }
    this.defaultSaveData = this.$comm.clone(this.saveData)
    // this.getExsupplier()

    // TODO : 직종 정보 가져오기 사용할 것
    // this.jobClassItems = this.$refs.jobClass.getAllInfoOfCombo()
    
    // 업로드가 완료되면 업로드 이미지 정보 초기화
    window.getApp.$on('APP_IMAGE_UPLOAD_COMPLETE', (_upload) => {
      this.upload.imageList = []
    });
  },
  beforeDestroy () {
    // TODO : remove event listener, 삭제 하지 않으면 이벤트가 중복 발생됨
    window.getApp.$off('APP_IMAGE_UPLOAD_COMPLETE')
 },
  methods: {
    // 단일 WO 검색
    onSearch(_pk) {
      this.$ajax.url = 'workorder/request/' + _pk
      this.$ajax.requestGet((_result) => {
        this.requestData = _result
        this.woStatusCd = this.requestData.woStatusCd
        this.mappedWoData(_result)
        this.getWoImagePk(_result.equipPk)
      })
    },
    /**
     * 외주 업체 목록
     */
    getOutsourceList(_pk) {
      this.$ajax.url = selectConfig.wo.outsource.url + _pk
      var self = this
      this.$ajax.requestGet((_result) => {
        var outsourcingItems = []
        $.each(_result, (_i, _item) => {
          // TODO : 여기에 추가되는 항목은 YRegistList의 addDataToList함수의 item 항목과 동일해야 함
          outsourcingItems.push({
            pk: _item.exSupplierPk,
            name: _item.exSupplierNm,
            hint: null,
            hintDisplay: null,
            value: _item.cost,
            workHr: null,
            isCancel: false
          })
        })
        this.$set(this, 'outsourcingItems', outsourcingItems)
      })
    },
    /**
     * 작업자 목록
     */
    getLaborList(_pk) {
      this.$ajax.url = selectConfig.wo.labors.url + _pk
      var self = this
      this.$ajax.requestGet((_result) => {
        var employeeList = []
        var jobClassList = []
        $.each(_result, (_i, _item) => {
          // TODO : 여기에 추가되는 항목은 YRegistList의 addDataToList함수의 item 항목과 동일해야 함
          if (_item.userPk) {
            employeeList.push({
              pk: _item.userPk,
              name: _item.userNm,
              hint: null,
              hintDisplay: null,
              value: _item.realWorkHr,
              workHr: _item.workHr,
              isCancel: false
            })
          } else if (_item.jobClassPk) {
            jobClassList.push({
              pk: _item.jobClassPk,
              name: _item.jobClassNm,
              hint: _item.wageCost,
              hintDisplay: this.$comm.setNumberSeperator(_item.wageCost),
              value: _item.realWorkHr,
              workHr: _item.workHr,
              isCancel: false
            })
          }
        })       
        this.$set(this, 'employeeList', employeeList)
        this.$set(this, 'jobClassList', jobClassList)
        console.log('------------> employeeList' +  JSON.stringify(_result))
        console.log('------------> employeeList' +  JSON.stringify(employeeList))
        console.log('------------> jobClassList' +  JSON.stringify(jobClassList))
      })
    },
    /**
     * WO의 조회된 데이터와 저장하는 데이터를 mapping 하는 함수
     */
    mappedWoData(_woData) {
      for (var key in this.saveData.workOrder) {
        if (_woData.hasOwnProperty(key)) this.saveData.workOrder[key] = _woData[key]
      }
      this.saveData.workOrder.workOrderPk = this.pk
      this.saveData.workOrder.problem = _woData.problemPk
      this.saveData.workOrder.cause = _woData.causePk
      this.saveData.workOrder.dept = _woData.deptPk
      this.saveData.workOrder.project = _woData.prjPk
      this.saveData.workOrder.remedy = _woData.remedyPk
      
      // YYYYMMDDHHmm 형식 예)201802041500
      // 작업 종료시간 설정
      if (_woData.finishDt) {
        var finishDt = this.$comm.moment(_woData.finishDt, 'YYYYMMDDHHmm')
        this.finishDate = finishDt.format('YYYY-MM-DD')
        this.finishTime = finishDt.format('HH:mm')
      }
      // 고장시간 설정
      // YYYYMMDDHHmm 형식 예)201803010000
      if (_woData.breakdownDt) this.$set(this, 'breakdownDateTime', this.$comm.moment(_woData.breakdownDt, 'YYYYMMDDHHmm').format('YYYY-MM-DD HH:mm'))
    },
    mappedFinishDate() {
      if (this.finishDate && this.finishTime) this.saveData.workOrder.finishDt = this.$comm.moment(this.finishDate + this.finishTime, 'YYYY-MM-DDHH:mm').format('YYYYMMDDHHmm')
      else this.saveData.workOrder.finishDt = null
      console.log('mappedFinishDate:' + this.saveData.workOrder.finishDt)
    },
    btnSaveClicked(_result) {
      // TODO : 전역 성공 메시지 처리
      // 이벤트는 ./event.js 파일에 선언되어 있음
      if (!this.isSubmit) return
      this.isSubmit = false
      
      this.uploadImages(_result.returnResult.workOrderPk)
      this.saveData = this.$comm.clone(this.defaultSaveData)
      window.getApp.$emit('APP_REQUEST_SUCCESS', this.$t('message.transactionSuccess'))
      this.$comm.movePage(this.$router, '/woCompleteList')
    },
    btnDeleteClicked(_result) {
      console.log('::: delete clicked')
    },
    openSearchPopup() {
      this.popupSearchItem = 'material'
      this.popupGridType = 'checkbox'
      this.isOpenPopup = true
      this.eventForReturn = 'bindMaterialData'
    },
    equipmentNameChanged() {
      this.equipment.equipNm = null
      this.equipment.equipPk = null
    },
    closePopup() {
      this.popupSearchItem = ''
      this.isOpenPopup = false
      this.popupGridType = ''
    },
    beforeSubmit() {
      this.mappedSaveData()
      this.checkValidation()
    },
    /**
     * 저장전 유효성 검사
     */
    checkValidation() {
      this.$validator.validateAll().then((_result) => {
        // DELETE : this.isValid = _result
        this.isSubmit = _result // 테스트 용 : 원래 _result가 와야 함.
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.$emit('APP_VALID_ERROR', this.$t('error.validError'))
      }).catch(() => {
        this.isSubmit = false
      });
    },
    /**
     * 저장전 saveData 공급업체, 직원, 직종 목록 설정
     */
    mappedSaveData() {
      this.saveData.workOrderSuppliers = []
      this.saveData.woLabors = []
      this.saveData.woMtrls = []

      this.mappedFinishDate()

      var workOrderSuppliers = this.$refs.outsourcing.getSelectedItems()
      // var employeeList = this.$refs.employee.getSelectedItems()
      var jobClassList = this.$refs.jobClass.getSelectedItems()
      var materialList = this.$refs.materialList.getSelectedItems()

      var pk = Number(this.pk)
      let self = this
      // 공급업체
      if (workOrderSuppliers.length) {
        $.each(workOrderSuppliers, (_i, _item) => {
          self.saveData.workOrderSuppliers.push({
            workOrder: Number(pk),
            exSupplier: Number(_item.pk),
            cost: Number(_item.value)
          })
        })
      }

      // 직원 목록
      // if (employeeList.length) {
      //   $.each(employeeList, (_i, _item) => {
      //     self.saveData.woLabors.push({
      //       workOrder: Number(pk),
      //       userInfo: Number(_item.pk),
      //       jobClass: null,
      //       workHr: Number(_item.workHr),
      //       realWorkHr: Number(_item.value)
      //     })
      //   })
      // }

      // 직종 목록
      if (jobClassList.length) {
        $.each(jobClassList, (_i, _item) => {
          self.saveData.woLabors.push({
            workOrder: pk,
            userInfo: null,
            jobClass: _item.pk,
            workHr: _item.workHr,
            realWorkHr: Number(_item.value)
          })
        })
      }

      // 자재 정보 매핑
      if (materialList.length) {
        $.each(materialList, (_i, _item) => {
          self.saveData.woMtrls.push({
            workOrder: Number(pk),
            material: Number(_item.materialPk),
            planAmt: Number(_item.planAmt),
            aAmt: Number(_item.aAmt),
            bAmt: Number(_item.bAmt),
            unitPrice: Number(_item.unitPrice)
          })
        })
      }
      console.log('save data:' + JSON.stringify(this.saveData))
    },
    /**
     * Event Bus로 정보 수신(datatable > woList > popup > woCreate)
     *  _items : array 형식으로 전달됨
     */
    bindMaterialData(_items) {
      var materialItems = []      
      var item = {}
      var isDuplicated = false; // 중복 데이터 여부
      console.log('this.materialList:' + JSON.stringify(this.materialList))
      $.each(_items, (_i, _item) => {
        var filter = this.materialList.filter((_item2) => {
          return _item.mtrlPk === _item2.materialPk
        })

        if (filter.length) isDuplicated = true
        else {
          item = {
            materialPk: null,
            mtrlNm: null,
            mtrlCd: null,
            planAmt: 0,
            aStockAmt: null,
            bStockAmt: null,
            unitPrice: null,
            physicalInvCount: null,
            physicalInvYn: null
          }
          for (var key in item) {
            item[key] = _item[key]
          }
          item.materialPk = _item.mtrlPk
          item.aAmt = null
          item.bAmt = null
          item.isCancel = false // 선택 취소 여부 별도 추가
          this.materialList.unshift(item)
        }
      })

      if (isDuplicated) window.getApp.$emit('APP_VALID_ERROR', this.$t('error.duplicated'))

      this.isOpenPopup = false
      // console.log('bindMaterialData:' + JSON.stringify(_items))
    },
    // Use the camera plugin to capture image
    takePicture() {
      if (navigator.camera) {
        navigator.camera.getPicture(this.setPicture, this.error, {
          // destinationType: Camera.DestinationType.DATA_URL
          quality: 50,
          mediaType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
          saveToPhotoAlbum: true
        });
      }else{
        // If the navigator.camera is not available display generic error to the user.
        window.getApp.$emit('APP_REQUEST_ERROR', $t('error.noCamera'));
      }
    },
    // Set the picture path in the data of the vue
    // this action will automatically update the view.
    setPicture(imagePath){
      this.imagePath = imagePath;
      // this.isShowCarousel = false;
      this.upload.imageList.push(imagePath)
      this.carouselImageList.unshift(imagePath)
      // TODO : 참고 소스
      // try {
      //   // 사진이미지 local 저장
      //   window.cordova.plugins.imagesaver.saveImageToGallery(imagePath, (_result) => {
      //     window.getApp.$emit('APP_REQUEST_SUCCESS', JSON.stringify(_result));
      //   }, (_error) => {
      //     window.getApp.$emit('APP_REQUEST_ERROR', JSON.stringify(_error));
      //   });
      // } catch(e) {
      //   window.getApp.$emit('APP_REQUEST_SUCCESS', 'error:' + e.message);
      // }
      // this.$nextTick(() => {
        // this.isShowCarousel = true
      // })
    },
    error(_msg){
      window.getApp.$emit('APP_REQUEST_ERROR', _msg);
    },
    uploadImages(_pk) {
      if (this.upload.imageList.length <= 0) return
      var uploadInfo = {
        pk: _pk,
        attachType: this.attachType,
        fileList: this.upload.imageList
      }
      window.getApp.$emit('APP_IMAGE_UPLOAD', uploadInfo);
    },
    completeImageUpload() {
      window.getApp.$emit('APP_REQUEST_SUCCESS', this.upload.uploadedImagesCount + ' files');
      this.upload.uploadedImagesCount = 0;
    },
    getImagePks(_pk) {
      this.$ajax.url = selectConfig.img.fileList.url
      this.$ajax.param = this.$comm.clone(selectConfig.img.fileList.searchData)
      this.$ajax.param.attachType = this.attachType
      this.$ajax.param.attachPk = _pk
      let self = this
      // this.isShowCarousel = false
      this.$ajax.requestGet((_result) => {
        $.each(_result, (_i, _item) => {
          self.getImageFile(_item.filePk)
        })
        // self.carouselImageList = self.cameraImageList
        self.$nextTick(() => {
          // self.isShowCarousel = self.carouselImageList.length > 0
          self.carouselIndex = 0
        })
      })
    },
    getImageFile(_filePk) {
      ajaxFile.url = selectConfig.img.imageDown.url + '?filePk=' + _filePk     
      let self = this
      ajaxFile.requestFileGet((_result) => {
        self.$nextTick(() => {
          self.cameraImageList.unshift(window.URL.createObjectURL(_result))
          self.carouselImageList.unshift(window.URL.createObjectURL(_result))
        })
      })
    },
    getWoImagePk(_pk) {
      this.$ajax.url = selectConfig.img.fileList.url
      this.$ajax.param = this.$comm.clone(selectConfig.img.fileList.searchData)
      this.$ajax.param.attachType = 'EQUIP_PHOTO'
      this.$ajax.param.attachPk = _pk
      let self = this
      this.$ajax.requestGet((_result) => {
        console.log(_result)
        if (_result.length) self.getWogetImageFile(_result[0].filePk)
      })
    },
    getWogetImageFile(_filePk) {
      ajaxFile.url = selectConfig.img.imageDown.url + '?filePk=' + _filePk     
      let self = this
      ajaxFile.requestFileGet((_result) => {
        self.$nextTick(() => {
          self.woImage = window.URL.createObjectURL(_result)
        })   
      })
    },
    // getExsupplier() {
    //   this.$ajax.url = selectConfig.exSupplier.url
    //   this.$ajax.param = selectConfig.exSupplier.searchData
    //   let self = this
    //   this.$ajax.requestGet((_result) => {
    //     self.exSupplier = _result.content
    //   })
    // },
    btnCompleteClicked() {
      // TODO : 전역 성공 메시지 처리
      // 이벤트는 ./event.js 파일에 선언되어 있음
      if (!this.isValid) return
      
      this.uploadImages(_result.returnResult.workOrderPk)
      this.saveData = this.$comm.clone(this.defaultSaveData)
      window.getApp.$emit('APP_REQUEST_SUCCESS', this.$t('message.transactionSuccess'))
      this.$comm.movePage(this.$router, '/woCompleteList')
    },
    /**
     * WO 자재 정보
     */
    getMaterialList(_pk) {
      this.$ajax.url = selectConfig.material.woMaterial.url + _pk
      var self = this
      this.$ajax.requestGet((_result) => {
        for (var idx in _result) {
          _result[idx].aAmt = _result[idx].aStockAmt > 0 ? _result[idx].aStockAmt : 0 // placeholder 용
          this.materialList.push(_result[idx])
        }
        // self.$refs.dataTable.hideLoading()
      }, () => {
        // self.$refs.dataTable.hideLoading()
      })
    },
    outsourceListChanged() {
      if (!this.$refs.outsourcing) return 0
      var list = this.$refs.outsourcing.getSelectedItems()
      var cost = list.reduce(function (sum, _item) {
          return sum + (_item.value ? _item.value : 0)
      }, 0);
      this.$set(this.saveData.workOrder, 'outsideCost', cost)
      // this.saveData.outsideCost = totalCost // outsourcingTotalCost
    },
    employListChanged () {
      if (!this.$refs.employee) return 0
      var list = this.$refs.employee.getSelectedItems()
      var totalCost = list.reduce(function (sum, _item) {
          return sum + ((_item.value ? _item.value : 0) * _item.hint)
      }, 0);
      this.employeeTotalCost = totalCost
    },
    jobClassListChanged () {
      if (!this.$refs.jobClass) return 0
      var list = this.$refs.jobClass.getSelectedItems()
      var totalCost = list.reduce(function (sum, _item) {
          return sum + ((_item.value ? _item.value : 0) * _item.hint)
      }, 0);
      this.jobClassTotalCost = totalCost
    },
    materialListAdd () {
      if (!this.$refs.materialList) return 0
      var list = this.$refs.materialList.getSelectedItems()
      var cost = list.reduce(function (sum, _item) {
          return sum + ((_item.aAmt ? _item.aAmt : 0) * Number(_item.unitPrice))
      }, 0);
      // this.materialTotalCost = totalCost
      this.$set(this.saveData.workOrder, 'mtrlCost', cost)
    },
    materialInfoListChanged(_items) {
      this.materialList = _items
    },
    editItem() {

    },
    btnClickedError(_error) {
      this.isSubmit = false
    },
    btnCancelClicked() {
      // this.isOpenDialog = true
      window.getApp.$emit('APP_REQUEST_SUCCESS', this.$t('message.transactionSuccess'))
      this.$comm.movePage(this.$router, '/woCompleteList')
     },
    dialogResult(_btnResult) {
      if (_btnResult) {
        if (!this.woCancel.cancelReason) {
          window.getApp.$emit('APP_REQUEST_ERROR', this.$t('message.cancelReason'))
          return
        } else {
          this.woCancel.isSubmit  = true
        }
      }
      // TODO : 반드시 추가할 것(추가하지 않으면 팝업창이 다시 활성화 되지 않음)
      this.isOpenDialog = false
    },
    getCancelRequest() {
      this.isOpenDialog = true;
    },
    onScroll(e) {
      // TODO : text box에서 활성화된 키보드를 스크롤 변경시 숨김
      // window.getApp.$emit('APP_KEYBOARD_HIDE')
    }
  }
};
</script>