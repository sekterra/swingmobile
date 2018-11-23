<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid class="mt-0 pt-0">
      <v-layout row wrap v-scroll="onScroll">
        <v-flex sm12>
          <v-card>
            <v-toolbar color="primary darken-1" dark="" flat dense cad>
              <v-toolbar-title class="subheading">{{$t('menu.woCreate')}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <v-icon
                  slot="activator"
                  color="white"
                  @click="openWoPopup"
                >
                file_copy
                </v-icon>
                <span>Tooltip</span>
              </v-tooltip>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <v-form v-model="isValidForm">
                  <v-layout row wrap fill-height>
                    <v-flex sm6 class="py-0">
                      <v-text-field
                        :label="$t('title.woNo')"
                        v-model="saveData.workOrder.workOrderPk"
                        :placeholder="$t('message.woNo')"
                        disabled
                      ></v-text-field>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <v-text-field
                        :label="$t('title.equipmentName') + '*'"
                        name="equipment"
                        v-model="equipment.equipNm"
                        :placeholder="$t('message.equipmentName')"
                        append-outer-icon="open_in_browser"
                        v-validate="'required'"
                        data-vv-name="equipment"
                        clearable
                        readonly
                        :error-messages="errors.collect('equipment')"
                        @click="openSearchPopup"
                        @click:append-outer="openSearchPopup"
                        @click:clear="equipmentNameChanged"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 class="py-0">
                      <y-equipment-card 
                        v-if="equipment.equipPk"
                        :pk="equipment.equipPk"
                      >
                      </y-equipment-card>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <!-- 작업 제목 -->
                      <y-text
                        :editable="editable"
                        :label="$t('title.woTitle') + '*'"
                        name="workTitle"
                        :counter="200"
                        :maxlength="200"
                        v-model="saveData.workOrder.workTitle"
                        v-validate="'required'"
                        data-vv-name="workTitle"
                        :error-msg="errors.first('workTitle')"
                      >
                      </y-text>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <y-select
                        :label="$t('title.woDepartment')"
                        item-search-key="depart"
                        name="deptPk"
                        v-model="saveData.workOrder.dept"
                      >
                      </y-select>
                    </v-flex>
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
                    <!-- <v-flex sm6 class="py-0">
                      <y-datepicker 
                        :editable="editable"
                        :label="$t('title.woRequestDate') + '*'"
                        name="rqstDt"
                        v-model="saveData.workOrder.workOrderApproval.rqstDt"
                        default-type="today"
                        v-validate="'required'"
                        :error-msg="errors.first('rqstDt')"
                      >
                      </y-datepicker>
                    </v-flex> -->
                    <v-flex sm6 class="py-0">
                      <!-- 작업계획일 -->
                      <y-durationpicker
                      :editable="editable"
                      :label="$t('title.woPlanDate')"
                      name="woPlanDate"
                      default-type="today"
                      v-validate="'required'"
                      v-model="woPlanDate"
                      data-vv-name="woPlanDate"
                      :error-msg="errors.first('woPlanDate')"
                      >
                      </y-durationpicker>
                    </v-flex>
                    <v-flex sm6 class="py-0">
                      <!-- 작업기간 -->
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
                    <v-flex sm6 class="py-0">
                      <!-- 보전유형 -->
                      <y-select
                        :editable="editable"
                        :label="$t('title.maintenanceType') + '*'"
                        name="maintType"
                        item-search-key="maintType"
                        v-model="saveData.workOrder.maintType"
                        v-validate="'required'"
                        data-vv-name="maintType"
                        :error-msg="errors.first('maintType')"
                      >
                      </y-select>
                    </v-flex>
                    <v-flex sm6 class="py-0" v-if="isBreakdown">
                      <!-- 고장일시 -->
                      <y-datepicker
                        v-if="editable"
                        :editable="true"
                        :label="$t('title.equipmentOfDowndate') + '*'"
                        name="breakdownDate"
                        v-model="breakdownDate" 
                        default-type="today"
                        child-validate-type="required"
                        v-validate="'required'"
                        data-vv-name="breakdownDate"
                        :error-msg="errors.first('breakdownDate')"
                      >
                      </y-datepicker>
                      <y-timepicker
                        v-if="editable"
                        :editable="true"
                        :label="$t('title.equipmentOfDowntime') + '*'"
                        name="breakdownTime"
                        v-model="breakdownTime"
                        default-type="current"
                        child-validate-type="required"
                        v-validate="'required'"
                        data-vv-name="breakdownTime"
                        :error-msg="errors.first('breakdownTime')"
                      >
                      </y-timepicker>
                      <v-text-field
                        v-else
                        :value="breakdownDate + ' ' + breakdownTime"
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
                      >
                      </y-regist-list>
                    </v-flex>
                  </v-layout>

                  <!-- 작업 인력 -->
                  <v-layout row wrap fill-height>
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
                      >
                      </y-regist-list>
                    </v-flex>
                  </v-layout>

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
                        icon="business_center"
                        :editable="editable"
                        :items="jobClassList"
                      >
                      </y-regist-list>
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
                        @click="takePicture"
                      >
                        <v-icon>
                          camera
                        </v-icon>
                      </v-btn>
                      </v-subheader>
                      <v-carousel
                        v-if="carouselImageList.length"
                        :cycle="false"
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
                  <!-- <v-layout
                    align-center 
                    justify-center 
                    row
                    fill-height
                  >
                      <v-btn 
                        round
                        color="black" 
                        dark
                        @click="takePicture"
                      >
                        <v-icon>
                          camera
                        </v-icon>
                      </v-btn>
                  </v-layout> -->
                  <!-- <v-flex xs6>
                    <div>{{upload.uploadedImagesCount}}/{{upload.imageList.length}} ({{upload.loaded}})bytes</div>
                    </v-flex> -->
                  <!-- /이미지 파일 업로드 -->
              </v-form>
                <v-flex xs12>
                  <div class="text-xs-center" lazy>
                    <y-btn
                       v-if="woStatusCd !== 'WO_STATUS_X' && woStatusCd !== 'WO_STATUS_C'"
                       type="save"
                      :title="$t('button.save')"
                      :action-url="url"
                      :action-type="requestType"
                      :param="saveData"
                      :is-submit="isSubmit"
                      beforeSubmit = "beforeSubmit"
                      @btnClicked="btnSaveClicked" 
                      @btnClickedError="btnClickedError"
                      @beforeSubmit="beforeSubmit"
                    ></y-btn>
                    <!-- <y-btn
                      v-if="saveData.workOrder.workOrderApproval.woStatusCd === 'WO_STATUS_P'"
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
                    <y-btn
                      v-if="pk"
                      type="delete"
                      :title="$t('button.delete')"
                      @btnClicked="btnDeleteClicked" 
                      @btnClickedError="btnClickedError"
                    ></y-btn>
                    <y-btn
                      v-if="!pk"
                      type="clear"
                      :title="$t('button.clear')"
                      @btnClicked="btnClearClicked" 
                    ></y-btn>
                    
                    <!-- <y-btn
                      type="cancel"
                      :title="$t('button.cancel')"
                      @btnClicked="btnCancelClicked" 
                      @btnClickedError="btnClickedError"
                    ></y-btn> -->
                  </div>
                  </v-flex>
            </v-card-text>     
          </v-card>
        </v-flex>           
      </v-layout>

      <!-- <v-layout row wrap>
        <VuePerfectScrollbar class="scroll-area" v-once :settings="settings" @ps-scroll-y="scrollHanle">
          <img src="/static/background.jpg'" height="720" width="1280" alt="">
        </VuePerfectScrollbar>
      </v-layout> -->

      <y-popup 
        :search-item="popupSearchItem"
        :grid-type="popupGridType"
        :is-open-popup="isOpenPopup"
        :event-for-return="eventForReturn"
        @closePopup="closePopup"
        @bindEquipmentData="bindEquipmentData"
        @bindWoData="bindWoData"
      >
      </y-popup>
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
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

let transaction = transactionConfig.wo.woCreate
export default {
  $_veeValidate: {
    validator: 'new'
  },
  components: {
    VuePerfectScrollbar
  },
  data: () => (
  {
    settings: {
      maxScrollbarLength: 60
    },
    // wo 저장
    saveData: transaction.insert.param,
    url: transaction.insert.url,
    requestType: transaction.insert.requestType,
    completeUrl: transaction.complete.url,
    completeRequestType: transaction.complete.requestType,
    equipment: {
      equipPk: null,
      equipNm: null,
      equipStatusCd: null,
      warrantyDt: null,
    },
    defaultSaveData: {},  // 초기 저장값(저장 값 초기화 시키기 위해 사용)
    // 알림 메시지
    isOpenDialog: false,
    // 검색용 팝업
    isOpenPopup: false,
    // 팝업 검색 결과 타입 설정(single: radio, multi: checkbox)
    popupGridType: 'radio',
    // form 유효성 여부
    isValidForm: true,
    popupSearchItem: '',
    // TODO(중요) : 쓰기 권한 여부이며, 페이지내 컨트롤에 적용됨
    editable: true,
    isSubmit: false,
    breakdownDate: null,
    breakdownTime: null,
    imagePath: '',
    carouselIndex: 0,
    carouselImageList: [],
    upload: {
      imageList: [],
      loaded: 0,
      buffer: 0,
      uploadedImagesCount: 0  
    },
    attachType: 'WO_PRE_PHOTO',
    isShowCarousel: false,
    cameraImageList: [],
    pk: null,  // TODO : 현재 WO PK
    eventForReturn: '', // TODO : 팝업 창의 결과를 받는 함수명
    woPlanDate: null,
    workDate: null,
    // exSupplierTitles: {},
    workerOrOccupationItems: [], // TODO : 작업인력 또는 직종정보를 담고있는 배열
    outsourcingItems: [],
    employeeList: [],
    jobClassList: [],
    woStatusCd: ''
  }),
  watch: {
    breakdownDate() {
      this.mappedBreakdownDt()
    },
    breakdownTime() {
      this.mappedBreakdownDt()
    },
    uploadedImagesCount() {
      if (this.upload.imageList.length && this.upload.uploadedImagesCount === this.upload.imageList.length) {
        this.completeImageUpload()
      }
    },
    woPlanDate() {
      if (!this.woPlanDate) {
        this.saveData.workOrder.planStartDt =  null
        this.saveData.workOrder.planEndDt =  null
      } else {
        this.saveData.workOrder.planStartDt =  this.woPlanDate.fromDate;
        this.saveData.workOrder.planEndDt =  this.woPlanDate.toDate;
      }
    },
    workDate() {
      if (!this.workDate) {
        this.saveData.workOrder.startDt = null;
        this.saveData.workOrder.endDt = null;
      } else {
        this.saveData.workOrder.startDt =  this.workDate.fromDate;
        this.saveData.workOrder.endDt =  this.workDate.toDate;
      }
    }
  },
  computed: {
    isBreakdown() {
      var isBreak = this.saveData.workOrder.maintType === 'MAINT_TYPE_BM'
      if (!isBreak) {
        this.saveData.workOrder.breakdownDt = null
        this.breakdownDate = null
        this.breakdownTime = null
      }
      return isBreak
    }
  },
  beforeMount() {
    Object.assign(this.$data, this.$options.data());
  },
  mounted () {
    // TODO : vue router로 전달된 값이 있으면 별도로 처리한다.
    // 참고 : @/router/path.js의 props 속성에서 설정된 방식으로 처리됨
    if (this.$attrs.query) {
      var pk = this.$attrs.query
      this.pk = pk
      this.url = transaction.update.url + '/' + pk
      this.requestType = transaction.update.requestType // post
      this.saveData = transaction.update.param
      this.onSearch(pk)
      this.getOutsourceList(pk)
      this.getLaborList(pk)
      this.getImagePks(pk)
    }
    this.defaultSaveData = this.$comm.clone(this.saveData)
    // this.getExsupplier()
    
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
    scrollHanle(evt) {
      console.log(evt)
    },
    // 버그 있음 : 수정 필요
    btnClearClicked () {
      this.saveData = this.$comm.clone(this.defaultSaveData);
      this.$validator.reset();

      /** 사용자 입력 요청과 처리 예제 */
      // window.getApp.$emit('APP_CONFIRM', '테스트 하시겠습니까?');
      // window.getApp.$on('APP_CONFIRM_REPLY', (_reply) => {
      //   if (_reply) window.getApp.$emit('APP_REQUEST_SUCCESS', 'YES')
      //   else window.getApp.$emit('APP_REQUEST_ERROR', 'NO')
      // })
    },
    btnClickedError(_error) {
      // console.log('error:' + JSON.stringify(_error))
      this.isSubmit = false
    },
    btnSaveClicked(_result) {
      // TODO : 전역 성공 메시지 처리
      // 이벤트는 ./event.js 파일에 선언되어 있음
      if (!this.isSubmit) return
      this.isSubmit = false
      
      this.uploadImages(_result.returnResult.workOrderPk)
      this.saveData = this.$comm.clone(this.defaultSaveData)
      window.getApp.$emit('APP_REQUEST_SUCCESS', this.$t('message.transactionSuccess'))
      this.$comm.movePage(this.$router, '/woList')
    },
    btnDeleteClicked(_result) {
      console.log('::: delete clicked')
    },
    btnCancelClicked() {
      this.isOpenDialog = true
    },
    dialogResult() {
      // TODO : 반드시 추가할 것(추가하지 않으면 팝업창이 다시 활성화 되지 않음)
      this.isOpenDialog = false
    },
     beforeSubmit() {
      this.mappedSaveData()
      this.checkValidation()
    },
    openSearchPopup() {
      this.popupSearchItem = 'equipment'
      this.popupGridType = 'radio'
      this.isOpenPopup = true
      this.eventForReturn = 'bindEquipmentData'
    },
    equipmentNameChanged() {
      this.equipment.equipNm = null
      this.equipment.equipPk = null
    },
    openWoPopup() {
      this.popupSearchItem = 'wo'
      this.popupGridType = 'radio'
      this.isOpenPopup = true
      this.eventForReturn = 'bindWoData'
    },
    closePopup() {
      this.popupSearchItem = ''
      this.isOpenPopup = false
      this.popupGridType = ''
    },
    /**
     * 저장전 유효성 검사
     */
    checkValidation() {
      this.$validator.validateAll().then((_result) => {
        this.isSubmit = _result
        // TODO : 전역 성공 메시지 처리
        // 이벤트는 ./event.js 파일에 선언되어 있음
        if (!this.isSubmit) window.getApp.$emit('APP_VALID_ERROR', this.$t('error.validError'))
      }).catch(() => {
        this.isSubmit = false
      });
    },
    /**
     * saveData 공급업체, 직원, 직종 목록 설정
     */
    mappedSaveData() {
      this.saveData.workOrderSuppliers = []
      this.saveData.woLabors = []

      var workOrderSuppliers = this.$refs.outsourcing.getSelectedItems()
      var employeeList = this.$refs.employee.getSelectedItems()
      var jobClassList = this.$refs.jobClass.getSelectedItems()

      // 공급업체
      if (workOrderSuppliers.length) {
        $.each(workOrderSuppliers, (_i, _item) => {
          this.saveData.workOrderSuppliers.push({
            // workOrder: Number(pk),
            exSupplier: Number(_item.pk),
            cost: Number(_item.value)
          })
        })
      }

      // 직원 목록
      if (employeeList.length) {
        $.each(employeeList, (_i, _item) => {
          this.saveData.woLabors.push({
            userInfo: Number(_item.pk),
            jobClass: null,
            workHr: Number(_item.value)
          })
        })
      }

      // 직종 목록
      if (jobClassList.length) {
        $.each(jobClassList, (_i, _item) => {
          this.saveData.woLabors.push({
            userInfo: null,
            jobClass: Number(_item.pk),
            workHr: Number(_item.value)
          })
        })
      }
      console.log(':::::::::: mappedSubItems:' + JSON.stringify(this.saveData))
    },
    /**
     * Event Bus로 정보 수신(datatable > woList > popup > woCreate)
     *  _items : array 형식으로 전달됨
     */
    bindEquipmentData(_items) {
      if (_items.length <= 0) return
      var equipment = _items[0]
      if (equipment) {
        this.saveData.workOrder.equipment = equipment.equipPk
        this.equipment.equipPk = equipment.equipPk
        this.equipment.equipNm = '[' + equipment.equipCd + '] ' + equipment.equipNm
        this.equipment.equipStatusCd = equipment.equipStatusCd
        this.equipment.warrantyDt = equipment.warrantyDt

        if (equipment.equipStatusCd === 'EQUIP_STATUS_B') {
          // comm.alert('해당설비는 고장 상태입니다.')
        }
        // 팝업에서 전달된 값에 대한 유효성 재검사
        this.$nextTick(() => {
          this.$validator.validate('equipment', this.equipment.equipNm)
        })
      }
      this.isOpenPopup = false
      this.$forceUpdate()
    },
    bindWoData(_items) {
      this.isOpenPopup = false
      if (_items.length <= 0) return
      this.onSearch(_items[0].workOrderPk, true)
    },
    // 단일 WO 검색
    onSearch(_pk, _isWorkCopy) {
      this.$ajax.url = 'workorder/request/' + _pk
      this.$ajax.requestGet((_result) => {
        this.mappedWoData(_result, _isWorkCopy)
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
        console.log('getOutsourceList:' + JSON.stringify(_result))
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
              value: _item.workHr,
              isCancel: false
            })
          } else if (_item.jobClassPk) {
            jobClassList.push({
              pk: _item.jobClassPk,
              name: _item.jobClassNm,
              hint: _item.wageCost,
              hintDisplay: this.$comm.setNumberSeperator(_item.wageCost),
              value: _item.workHr,
              isCancel: false
            })
          }
        })
        this.$set(this, 'employeeList', employeeList)
        this.$set(this, 'jobClassList', jobClassList)
        console.log('getLaborList' + JSON.stringify(_result))
      })
    },
    /**
     * WO의 조회된 데이터와 저장하는 데이터를 mapping 하는 함수
     */
    mappedWoData(_woData, _isWorkCopy) {
      console.log('_woData:' + JSON.stringify(_woData))
      var workOrder = {}
      for (var key in this.saveData.workOrder) {
        if (_woData.hasOwnProperty(key)) {
          if (!_isWorkCopy) workOrder[key] = _woData[key]
          else if (_isWorkCopy) {
            if (key !== 'planStartDt') workOrder[key] = _woData[key]
            else workOrder[key] = this.$comm.getToday()
          }
        }
      }
      this.equipment.equipPk = _woData.equipPk
      this.equipment.equipNm = '[' + _woData.equipCd + '] ' + _woData.equipNm
      // workOrder.workOrderPk = _woData.workOrderPk
      workOrder.equipment = _woData.equipPk
      workOrder.dept = _woData.deptPk
      workOrder.maintType = _woData.maintTypeCd
      workOrder.project = _woData.prjPk
      workOrder.problem = _woData.problemPk
      workOrder.cause = _woData.causePk
      workOrder.workOrderApproval = {}
      workOrder.workOrderApproval = _woData.workOrderApproval
      if (_isWorkCopy) {
        workOrder.workOrderApproval.rqstDt =  this.$comm.getToday()
        workOrder.workOrderApproval.rqstUser = window.getApp.getUserInfo().userPk
      } else {
        workOrder.workOrderApproval.rqstDt = _woData.workOrderApproval.rqstDt
        workOrder.workOrderApproval.rqstUser = _woData.workOrderApproval.rqstUserPk
      }

      this.woStatusCd = workOrder.workOrderApproval.woStatusCd

      if (workOrder.breakdownDt) {
        var tmpDate = workOrder.breakdownDt.substring(0, 8)
        var tmpTime = workOrder.breakdownDt.substring(8, workOrder.breakdownDt.length)
        var date = this.$comm.moment(tmpDate)
        var time = this.$comm.moment(tmpTime)
        this.breakdownDate = date.format('L')
        this.breakdownTime = time.format('HH:mm')
        this.$forceUpdate()
      }
      
      this.$set(this.saveData, 'workOrder', workOrder)
      // 팝업에서 전달된 값에 대한 유효성 재검사
      this.$validator.validate('equipment', this.equipment.equipNm)
      if (_isWorkCopy) {
        this.getOutsourceList(_woData.workOrderPk)
        this.getLaborList(_woData.workOrderPk)
        this.getImagePks(_woData.workOrderPk)
      }
    },
    mappedBreakdownDt() {
      if (this.breakdownDate && this.breakdownTime) {
        var datetime = this.breakdownDate + ' ' + this.breakdownTime
        this.saveData.workOrder.breakdownDt = this.$comm.moment(datetime).format('YYYYMMDDHHmm')
      } else this.saveData.workOrder.breakdownDt = null
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
      //   this.isShowCarousel = true
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
    // Image 관련 PK를 가져온다.
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
    // getImagePks에서 가져온 이미지 정보(byte array)를 가져와서 localurl 형식으로 변환 후 cameraImageList에 담는다.
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
    onScroll(e) {
      // TODO : text box에서 활성화된 키보드를 스크롤 변경시 숨김
      // window.getApp.$emit('APP_KEYBOARD_HIDE')
    }
  }
};
</script>

</script> 
<style lang="scss">
.scroll-area {
  position: relative;
  margin: auto;
  width: 400px;
  height: 300px;
}
</style> 