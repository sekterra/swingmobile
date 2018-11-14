/**
 * 업무용 데이터 저장정보를 가지고 있는 js
 */

 let transactionConfig = {
  wo: {
    // WO 요청 관련
    request: {
      insert: {
        url: 'workorder/request/',
        param: {
          workOrder: {
            workTitle: null,
            workText: null,
            equipment: null,
            dept: null,
            planStartDt: null,
            planEndDt: null,
            maintType: null,
            project: null,
            problem: null,
            cause: null,
            breakdownDt: null,
            workOrderApproval: {
              rqstDt: null
            }
          }
        },
        requestType: 'POST'
      },
      update: {
        url: 'workorder/request/',
        param: {
          workOrder: {
            workOrderPk: null,
            workTitle: null,
            workText: null,
            equipment: null,
            dept: null,
            planStartDt: null,
            planEndDt: null,
            maintType: null,
            project: null,
            problem: null,
            cause: null,
            breakdownDt: null,
            workOrderApproval: {
              rqstDt: null
            }
          }
        },
        requestType: 'PUT'
      },
      delete: {
        url: '',
        param: null
      }
    },
    woCreate: {
      insert: {
        url: 'workorder/create/',
        param: {
          workOrder: {
            equipment: null,
            workTitle: null,
            workText: null,
            dept: null,
            planStartDt: null,
            planEndDt: null,
            startDt: null, // 요청과 차이점
            endDt: null, // 요청과 차이점
            maintType: null,
            problem: null,
            cause: null,
            project: null,
            breakdownDt: null
          },
          workOrderSuppliers: [],
          woLabors: []
        },
        requestType: 'POST'
      },
      update: {
        url: 'workorder/create/',
        param: {
          workOrder: {
            workOrderPk: null,
            equipment: null,
            workTitle: null,
            workText: null,
            dept: null,
            planStartDt: null,
            planEndDt: null,
            startDt: null, // 요청과 차이점
            endDt: null, // 요청과 차이점
            maintType: null,
            problem: null,
            cause: null,
            project: null,
            breakdownDt: null
          },
          workOrderSuppliers: [],
          woLabors: []
        },
        requestType: 'PUT'
      },
      complete: {
        url: 'workorder/resultfinish/',
        param: {
          workOrder: {
            workOrderPk: null,
            workText: null,
            startDt: null,
            endDt: null,
            dept: null,
            remedy: null,
            problem: null,
            cause: null,
            project: null,
            totCost: 0, // 전체비용
            mtrlCost: 0,  // 자재 비용
            laborCost: 0, // 인건비용
            outsideCost: 0, // 외주 비용
            etcCost: 0,   // 기타 비용
            finishDt: null  // 종료일시
          },
          workOrderSuppliers: [],
          woLabors: [],
          woMtrls: []
        },
        requestType: 'PUT'
      }
    },
  },
  inspection: {
    update: {
      url: 'inspection/result/',
      param: {
        equipChkItems: []
      },
      requestType: 'PUT'
    },
    complete: {
      url: 'inspection/result/finish/',
      param: null,
      requestType: 'PUT'
    },
    issueWo: {
      insert: {
        url: 'inspection/makewo/',
        param: null,
        requestType: 'POST'
      }
    }
  }
 }

 export default transactionConfig;