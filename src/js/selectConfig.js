var selectConfig = {
  equipmentList: [
    {
      url: 'equipment/',
      searchData: {
        page: 0,
        size: 0,
        sort: 'equipCd,asc',          // 정렬조건 [형식 &sort=menuNm,asc&sort=menuLevel,desc]
        searchText: null,    // 설비명, 설비코드
        equipStatus: null,   // 설비상태
        locPk: null,         // 설비위치
        equipTypePk: null,   // 설비종류
        importRankPk: null,  // 설비종류
        supplierPk: null     // 공급업체
      },
    },
    {
      url: 'stat/equipment/equip/breakdowntime/month',
      searchData: {
        dateType: 'MON',
        startDate: null,
        endDate: null,
        page: 0,
        size: 0,
        pageSize: 10, // 한 페이지당 보여지는 paging 개수
        pageRange: 0, // 현재 page의 범위, 1~10 또는 11~20 등
        endPageRange: 0, // 마지막 page Range 값, 83개의 데이터면 10개 row씩 9페이지가 나옴, 기본값은 pageSize
        sort: null        // 정렬조건 [형식 &sort=menuNm,asc&sort=menuLevel,desc]
      }
    }
  ],
  equipment: {
    maintenanceCost: {
      url: 'stat/equipment/equip/workorder/cost/',
      searchData: {
        dateType: 'MON',
        startDate: null,
        endDate: null,
        page: 0,
        size: 0,
        sort: null        // 정렬조건 [형식 &sort=menuNm,asc&sort=menuLevel,desc]
      },
    },
    mttr: {
      url: 'stat/equipment/equip/mttr',
      searchData: {
        dateType: 'MON',
        startDate: null,
        endDate: null,
        page: 0,
        size: 0,
        sort: null        // 정렬조건 [형식 &sort=menuNm,asc&sort=menuLevel,desc]
      },
    },
    mtbf: {
      url: 'stat/equipment/equip/mtbf',
      searchData: {
        dateType: 'MON',
        startDate: null,
        endDate: null,
        page: 0,
        size: 0,
        sort: null        // 정렬조건 [형식 &sort=menuNm,asc&sort=menuLevel,desc]
      },
    }
  },
  wo: {
    // 비용/시간 총계
    totalCostAndHour: {
      url: 'stat/workorder/top/cost',
      searchData: {
        page: 0,
        size: 0,
        pageSize: 10, // 한 페이지당 보여지는 paging 개수
        pageRange: 0, // 현재 page의 범위, 1~10 또는 11~20 등
        endPageRange: 0, // 마지막 page Range 값, 83개의 데이터면 10개 row씩 9페이지가 나옴, 기본값은 pageSize
        sort: null,
        dateType: 'MON',
        startDate: null,
        endDate: null
      }
    },
    woStatus: {
      url: 'stat/workorder/count',
      searchData: {
        dateType: 'MON',
        startDate: null,
        endDate: null
      }
    },
    // 기간별 작업 준수율
    woCompeteRateByMonth: {
      url: 'stat/workorder/complywith/rate',
      searchData: {
        dateType: 'MON',
        startDate: null,
        endDate: null
      }
    },
    woCostsByMonth: {
      url: 'stat/workorder/cost',
      searchData: {
        dateType: 'MON',
        startDate: null,
        endDate: null
      },
    }
  },
  woList: [
    {
      url: 'workorder/',
      searchData: {
        page: 0,
        size: 0,
        pageSize: 100,            // 한 페이지당 보여지는 paging 개수
        pageRange: 0,            // 현재 page의 범위, 1~10 또는 11~20 등
        endPageRange: 0,         // 마지막 page Range 값, 83개의 데이터면 10개 row씩 9페이지가 나옴, 기본값은 pageSize
        sort: 'rqstDt,workOrderSort,desc',     // 정렬조건 [형식 &sort=menuNm,asc&sort=menuLevel,desc]
        searchText: null,        // 작업제목, 작업내역
        deptPk: null,            // 작업부서
        reqDeptPk: null,
        woStatus: [],
        woStatusEx: [],
        nextApprLine: null,
        workOrderNo: null,
        problemPk: null,
        causePk: null,
        remedyPk: null,
        maintTypeCd: null,
        dateConds: 'rqstdt',
        startDate: null,         // 요청기간시작일(필수)
        endDate: null            // 요청기간마침일(필수)
      }
    },
    {
      url: 'stat/workorder/cause/count',
      searchData: {
        dateType: 'MON',
        startDate: null,
        endDate: null
      }
    },
    {
      url: 'stat/workorder/delay',
      searchData: {
        dateType: 'MON',
        startDate: null,
        endDate: null
      },
    }
  ],
  inspectionList: [
    {
      url: 'inspection/schedule/',
      searchData: {
        page: 0,
        size: 0,
        pageSize: 10, // 한 페이지당 보여지는 paging 개수
        pageRange: 0, // 현재 page의 범위, 1~10 또는 11~20 등
        endPageRange: 0, // 마지막 page Range 값, 83개의 데이터면 10개 row씩 9페이지가 나옴, 기본값은 pageSize
        sort: 'chkPlanDt,desc',         // 정렬조건 [형식 &sort=menuNm,asc&sort=menuLevel,desc]
        searchText: null,   // 점검명, 설비명, 설비코드
        deptPk: null,       // 부서
        startDate: null,    // 점검기간시작일
        endDate: null,      // 점검기간마침일
        chkStatus: null,    // 점검상태
        okYn: null,         // 정상여부
        chkPlanNo: null
      },
    }
  ],
  inspection: {
    inspectionInfo: {
      url: 'inspection/result/',
      data: {
        chkPlanPk: null,
        chkPlanNo: null,
        cycleTypeCd: null,
        cycleTypeNm: null,
        perNumber: null,
        chkMastNm: null,
        chkMastNo: null,
        deptNm: null,
        lastChkDate: null,
        rsltDsc: null,
        failCount: null,
        totCount: null,
        okCount: null,
        chkStatusCd: null,
        chkRsltPks: [],
        chkPlanDt: null,
        chkDt: null
      }
    },
    inspectionCalendar: {
      url: 'inspection/schedule/cal/',
      data: {
        chkMastPk: null,
        chkPlanPk: null,
        chkPlanNo: null,
        chkMastNm: null,
        chkMastNo: null,
        chkPlanDt: null,
        chkStatus: null
      }
    },
    inspectionDetail: {
      url: 'inspection/schedule/'
    },
    inspectionCheckList: {
      url: 'inspection/result/item/'
    },
    inspectionCheckResultList: {
      url: 'inspection/result/equip/'
    },
    inspectionEquipmentList: {
      url: 'inspection/result/result/'
    },
    completeStatus: {
      url: 'stat/inspection/implement',
      searchData: {
        dateType: 'MON',
        startDate: null,
        endDate: null
      }
    },
    detectedErrorStatus: {
      url: 'stat/inspection/unfit',
      searchData: {
        page: 0,
        size: 0,
        sort: null,
        dateType: 'MON',
        startDate: null,
        endDate: null
      }
    }
  },
  pm: {
    completeStatus: {
      url: 'stat/pm/finish/count/month',
      searchData: {
        dateType: 'MON',
        startDate: null,
        endDate: null
      },
    },
    completeStatusYear: {
      url: 'stat/pm/finish/count/year',
      searchData: {
        dateType: 'YEAR',
        startDate: null,
        endDate: null
      },
    }
  },
  img: {
    // 업무별 파일목록
    fileList: {
      url: 'file/',
      searchData: {
        attachType: null,   // 첨부유형 : EQUIP_PHOTO, MTRL_PHOTO, WO_PRE_PHOTO, WO_AFTER_PHOTO
        attachPk: null,   // 업무 PK
      }
    },
    // 썸네일 이미지 조회
    thumbnail: {
      url: 'file/image/down/thumbnail',
      searchData: {
        filePk: null    // 첨부pk
      }
    },
    // 썸네일 이미지 조회
    imageDown: {
      url: 'file/image/down/',
      searchData: {
        filePk: null    // 첨부pk
      }
    },
  },
  userInfo: {
    url: 'member/userinfo/'
  },
}

export default selectConfig