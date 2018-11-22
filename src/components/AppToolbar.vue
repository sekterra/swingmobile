<!-- 
파일명 : Apptoolbar.vue
목적 : 기본 화면 레이아웃 상단 툴바
-->

<template>
  <v-toolbar
    color="primary"
    fixed
    dark
    app
    >
      <!-- left 메뉴 토글 버튼 -->
      <v-toolbar-title class="ml-0">
        <v-toolbar-side-icon @click.stop="handleDrawerToggle"></v-toolbar-side-icon>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- full screen 버튼 -->
      <!-- <v-btn icon @click="handleFullScreen()">
        <v-icon>fullscreen</v-icon>
      </v-btn> -->
      <!-- WO -->
      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <span slot="activator" v-if="upload.isAllStarted" transition="v-slide-y-transition">
          <v-icon color="white">
            cloud_upload
          </v-icon>
          {{upload.transPercent}}%
        </span>
        
        <v-btn icon flat slot="activator">
          <v-badge color="teal" overlap>
            <span slot="badge" v-if="wo.count > 10">9+</span>
            <span slot="badge" v-else-if="wo.count > 0">
              {{wo.count}}
            </span>
            <v-icon medium title="오늘의 WO">description</v-icon>
          </v-badge>
        </v-btn>
        <y-notification
          v-if="isLogin"
          :url="wo.url"
          :title="$t('title.recentWo')"
          :search-data="wo.searchData"
          :match-item="wo.matchItem"
          move-page-url="/woCreate"
          move-list-url="/woList"
          @setCountBadge="setWoCountBadge"
        >
        </y-notification>
        <!-- <notification-list></notification-list> -->
      </v-menu>
      <v-menu offset-y origin="center center" class="elelvation-1" :nudge-bottom="14" transition="scale-transition">
        <v-btn icon flat slot="activator">
        <v-badge color="teal" overlap>
          <span slot="badge" v-if="inspection.count > 10">9+</span>
            <span slot="badge" v-else-if="inspection.count > 0">
              {{inspection.count}}
            </span>
          <v-icon medium title="오늘의 점검">list_alt</v-icon>
        </v-badge>
        </v-btn>
        <y-notification
          v-if="isLogin"
          :url="inspection.url"
          :title="$t('title.recentInspection')"
          :search-data="inspection.searchData"
          :match-item="inspection.matchItem"
          move-page-url="/InspectionResult"
          move-list-url="/InspectionList"
          @setCountBadge="setInspectionCountBadge"
        >
        </y-notification>
      </v-menu>
      <!-- full screen 버튼 -->
      <!-- <v-btn icon>
        <v-icon>refresh</v-icon>
      </v-btn> -->
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="scale-transition">
        <v-btn icon large flat slot="activator" @click="openThemeSettings">
          <v-icon title="설정">settings</v-icon>
        </v-btn>
      </v-menu>
  </v-toolbar>
</template>
<script>
import NotificationList from '@/components/widgets/list/NotificationList';
import YNotification from '@/components/widgets/YNotification';
import Util from '@/util';
import $ from 'jquery';
import jwt from '@/js/jwtToken.js'
import config from '@/js/config.js'

export default {
  name: 'app-toolbar',
  components: {
    NotificationList,
    YNotification
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    // 파일 업로드 정보
    upload: {
      fileCount: 0, // 전송 대상 파일수
      startCount: 0,  // 전송 시작된 파일수
      completedCount: 0,  // 전송 완료 파일수
      failedCount: 0, // 전송 실패 파일수
      transBytes: 0,  // 전체 전송한 bytes
      totalBytes: 0,  // 전체 업로드 대상 bytes
      transPercent: 0,  // 전체 전송 퍼센트
      filePaths: [], // 업로드 대상 파일 경로(String Array)
      ftObjects: [], // file transfer 개체(FileTransfer Array)
      transInfo: [], // file 전송정보 (total: 파일 크기, loaded: 전송 byte, percent: 전송퍼센트, isSuccess: 전송완료 여부)
      isAllStarted: false, // 모든 파일이 전송 중인지 여부
      isAllUploaded: false // 모든 파일 전송 완료 여부
    },
    initUpload: {}, // 업로드 초기화 정보
    wo: {
      url: 'workorder/',
      searchData: {
        page: 0,
        size: 99,
        pageSize: 100,            // 한 페이지당 보여지는 paging 개수
        pageRange: 0,            // 현재 page의 범위, 1~10 또는 11~20 등
        endPageRange: 0,         // 마지막 page Range 값, 83개의 데이터면 10개 row씩 9페이지가 나옴, 기본값은 pageSize
        sort: 'startDt,workOrderSort,desc',     // 정렬조건 [형식 &sort=menuNm,asc&sort=menuLevel,desc]
        searchText: null,        // 작업제목, 작업내역
        deptPk: null,            // 작업부서
        reqDeptPk: null,
        woStatus: ['WO_STATUS_P'],
        woStatusEx: [],
        nextApprLine: null,
        workOrderNo: null,
        problemPk: null,
        causePk: null,
        remedyPk: null,
        maintTypeCd: null,
        dateConds: 'startdt',
        startDate: null,         // 요청기간시작일(필수)
        endDate: null            // 요청기간마침일(필수)
      },
      matchItem: {
        icon: 'maintTypeNm',
        title: 'equipNm',
        headline: 'workTitle',
        subtitle: 'startDt',
        pk: 'workOrderPk'
      },
      count: 0,
    },
    inspection: {
      url: '/inspection/schedule/',
      title: 'Recent Inspection',
      searchData: {
        page: 0,    // 기본 페이지
        size: 99,   // 한 페이지당 보여지는 개수
        pageSize: 10, // 한 페이지당 보여지는 paging 개수
        pageRange: 0, // 현재 page의 범위, 1~10 또는 11~20 등
        endPageRange: 0, // 마지막 page Range 값, 83개의 데이터면 10개 row씩 9페이지가 나옴, 기본값은 pageSize
        searchText: '',
        sort: 'chkPlanDt,desc',
        deptPk: null,
        startDate: null,         // 요청기간시작일(필수)
        endDate: null,           // 요청기간마침일(필수)
        chkStatus: null,
        chkPlanNo: null
      },
      matchItem: {
        icon: 'chkStatusNm',
        title: 'chkMastNm',
        headline: 'chkStatusNm',
        subtitle: 'chkPlanDt',
        pk: 'chkPlanPk'
      }
    },
    items: [
      {
        icon: 'account_circle',
        href: '#',
        title: 'Profile',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'settings',
        href: '#',
        title: 'Settings',
        click: (e) => {
          console.log(e);
        }
      },
      {
        icon: 'fullscreen_exit',
        href: '#',
        title: 'Logout',
        click: (e) => {
          window.getApp.$emit('APP_LOGOUT');
        }
      }
    ]
  }),
  computed: {
    toolbarColor () {
      return this.$vuetify.options.extra.mainNav;
    },
  },
  watch: {
    // 파일 업로드 완료시 초기화 작업 수행
    'upload.isAllUploaded': function () {
      if (!this.upload.isAllUploaded) return
      // 업로드 완료 정보 전송
      // window.getApp.$emit('APP_IMAGE_UPLOAD_COMPLETE', this.$comm.clone(this.upload));
      // 업로드 완료 팝업 표시
      // window.getApp.$emit('APP_REQUEST_SUCCESS', 'init upload Info');

      // 업로드 실패한 파일이 있을 경우 다시 업로드 가능하도록 처리
      // var failedFileList = JSON.parse(localStorage.failedFileList)
      // if (this.upload.failedCount && failedFileList.length > 0) {
      //   window.getApp.$emit('APP_CONFIRM', this.$t('message.retryFileUpload'));
      //   window.getApp.$on('APP_CONFIRM_REPLY', (_retry) => {
      //     if (_retry) {
      //       var failedFileList = JSON.parse(localStorage.failedFileList)
      //       this.uploadImages(failedFileList)
      //     }
      //     else {
      //       localStorage.failedFileList = null
      //       window.getApp.$emit('APP_REQUEST_SUCCESS', this.$t('message.uploadFailedFileRemoved'));
      //     }
      //   })
      // }

      // 업로드 정보 초기화
      this.upload = this.$comm.clone(this.initUpload)
    }
  },
  beforeMount() {
    this.wo.searchData.startDate = this.$comm.getPrevDate('1m')
    this.wo.searchData.endDate = this.$comm.getToday()
    this.inspection.searchData.startDate = this.$comm.getPrevDate('1m')
    this.inspection.searchData.endDate = this.$comm.getToday()
  },
  mounted() {
    window.getApp.$on('APP_IMAGE_UPLOAD', (_fileInfo) => {
      this.uploadImages(_fileInfo);
      window.getApp.$emit('APP_REQUEST_SUCCESS', this.$t('message.imageUploadStart'));
    });
  },
  methods: {
    handleDrawerToggle () {
      window.getApp.$emit('APP_DRAWER_TOGGLED');
    },
    handleFullScreen () {
      Util.toggleFullScreen();
    },
    openThemeSettings () {
      this.$emit('openThemeSettings')
    },
    setWoCountBadge (_count) {
      this.wo.count = _count
      this.$forceUpdate()
    },
    setInspectionCountBadge (_count) {
      this.inspection.count = _count
      this.$forceUpdate()
    },
    uploadImages(_fileInfo, _isRetry) {
      if (!_fileInfo || !_fileInfo.hasOwnProperty('pk')) {
        window.getApp.$emit('APP_REQUEST_ERROR', 'No pk')
        return
      }
      this.initUpload = this.$comm.clone(this.upload)
      var fileList = _fileInfo.fileList
      if (!fileList || fileList.length <= 0) window.getApp.$emit('APP_REQUEST_ERROR', 'No files to upload');
      else window.getApp.$emit('APP_REQUEST_SUCCESS', 'uploading:' + fileList.length);

      // window.alert(JSON.stringify(_fileInfo))
      try {
        var url = config.protocol + config.backEndFullUrl + 'file/image/upload/'
        var self = this
        // 1. 업로드 정보 초기화
        self.upload.filePaths = fileList;
        self.upload.fileCount = fileList.length;

        var tempArray = new Array(fileList.length)
        var tempTotalArray = new Array(fileList.length)
        $.each(self.upload.filePaths, (_i, _filePath) => {
          self.upload.ftObjects.push(new FileTransfer());
          self.upload.transInfo.push({
            total: 0,
            loaded: 0,
            percent: 0,
            isSuccess: false
          });
          tempArray[_i] = 0;
          tempTotalArray[_i] = 0;
        });

        self.upload.startCount = 0;
        self.upload.transBytes = 0;
        self.upload.transPercent = 0;
        self.upload.failedCount = 0;
        self.upload.completedCount = 0;

        var options = new FileUploadOptions();
        options.mimeType="image/jpeg";
        var headers={
          'X-Authorization': jwt.getJwtToken(),
          'Access-Control-Allow-Origin': '*',
          'X-TenantID': 'yullin'
        };
        options.headers = headers;
        options.params = {
          attachType: _fileInfo.attachType,
          attachPk: _fileInfo.pk
        }
        options.fileKey='file';

        // var failedFileList = localStorage.failedFileList;  // 파일 업로드 실패 목록
        // if (!localStorage.failedFileList) failedFileList = [];
        // else failedFileList = JSON.parse(localStorage.failedFileList)

        $.each(self.upload.ftObjects, (_i, _ft) => {
          var filePath = self.upload.filePaths[_i];
          var transInfo = self.upload.transInfo[_i];
          var isUploadStart = false;

          // 파일업로드 진행
          _ft.onprogress = (progressEvent) => {
            if (progressEvent.lengthComputable) {
              transInfo.total = progressEvent.total;
              transInfo.loaded = progressEvent.loaded;
              transInfo.percent = Math.ceil((progressEvent.loaded / progressEvent.total) * 100);
              
              if (!isUploadStart) {
                self.upload.startCount++;
                // self.upload.totalBytes += progressEvent.total;
                tempTotalArray[_i] = progressEvent.total;
                self.upload.totalBytes = tempTotalArray.reduce((_item1, _item2) => _item1 + _item2, 0);
                self.upload.isAllStarted = self.upload.startCount === self.upload.fileCount
                isUploadStart = true;
              }

              tempArray[_i] = progressEvent.loaded;
              self.upload.transBytes = tempArray.reduce((_item1, _item2) => _item1 + _item2, 0);
              self.upload.transPercent = Math.ceil((self.upload.transBytes / self.upload.totalBytes) * 100);
              loadingStatus.setPercentage(progressEvent.loaded / progressEvent.total);
            } else {
              loadingStatus.increment();
            }
          }
          // 파일업로드 진행

          // 파일업로드 시작 / 완료
          _ft.upload(filePath, url, 
            // 성공시
            (_result) => {
              self.upload.completedCount++;
              transInfo.loaded = transInfo.total;
              transInfo.isSuccess = true;             
              transInfo.percent = 100;
              self.upload.isAllUploaded = self.upload.completedCount + self.upload.failedCount >= self.upload.fileCount;
              // window.getApp.$emit('APP_REQUEST_SUCCESS', "bytesSent = " + _result.bytesSent + ' : ' + _i);
            // 파일 전송 실패시
            }, (error) => {
              transInfo.percent = 0;
              transInfo.loaded = 0;
              transInfo.percent = 0;
              self.upload.failedCount++;
              self.upload.isAllUploaded = self.upload.completedCount + self.upload.failedCount >= self.upload.fileCount;

              // 전송실패한 파일은 localStorage에 저장하고, 나중에 다시 처리한다.
              // failedFileList.push(filePath)
              // localStorage.failedFileList = JSON.stringify(failedFileList)
              window.alert('upload error:' + JSON.stringify(error) + ' : ' + _i);
              window.getApp.$emit('APP_REQUEST_ERROR', 'upload error:' + JSON.stringify(error) + ' : ' + _i);
            }, options);
            // 파일업로드 시작 / 완료
        });
      } catch (e) {
        // window.getApp.$emit('APP_REQUEST_ERROR', 'error:' + e.message);
        window.alert('error:' + e.message);
      }
    }
  }
};
</script>
<style>
.border { border:1px solid #0000ff };
</style>
