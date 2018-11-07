export default [
  {
    name: 'APP_LOGIN_SUCCESS',
    callback: function (e) {
      this.$router.push({ path: 'dashboard' });
    }
  },
  {
    name: 'APP_LOGOUT',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Logout successfully.'
      };
      this.$router.replace({ path: '/login' });
    }
  },
  {
    name: 'APP_PAGE_LOADED',
    callback: function (e) {
    }
  },
  {
    name: 'APP_AUTH_FAILED',
    callback: function (e) {
      this.$router.push('/login');
      this.$message.error('Token has expired');
    }
  },
  {
    name: 'APP_BAD_REQUEST',
    // @error api response data
    callback: function (msg) {
      this.$message.error(msg);
    }
  },
  {
    name: 'APP_ACCESS_DENIED',
    // @error api response data
    callback: function (msg) {
      this.$message.error(msg);
      this.$router.push('/forbidden');
    }
  },
  {
    name: 'APP_RESOURCE_DELETED',
    // @error api response data
    callback: function (msg) {
      this.$message.success(msg);
    }
  },
  {
    name: 'APP_RESOURCE_UPDATED',
    // @error api response data
    callback: function (msg) {
      this.$message.success(msg);
    }
  },
  //////////////////////////////////////////////////
  // 이하 추가된 이벤트

  // TODO : 전역 ajax 에러처리용 이벤트
  {
    name: 'APP_REQUEST_ERROR',
    callback: function (_message) {
      // snackbar에서 에러 표시
      this.snackbar = {
        show: true,
        color: 'error',
        text: _message
      };

      //  vue dialog에서 에러 표시
      // this.dialog = {
      //   show: true,
      //   type: 'error',
      //   text: _message
      // }
    }
  },
  // ajax 요청 성공
  {
    name: 'APP_REQUEST_SUCCESS',
    callback: function (_message) {
      // snackbar에서 에러 표시
      this.snackbar = {
        show: true,
        color: 'success',
        text: _message
      };

      //  vue dialog에서 에러 표시
      // this.dialog = {
      //   show: true,
      //   type: 'error',
      //   text: _message
      // }
    }
  },
  // 유효성 검사 오류
  {
    name: 'APP_VALID_ERROR',
    callback: function (_message) {
      // snackbar에서 에러 표시
      this.snackbar = {
        show: true,
        color: 'warning',
        text: _message
      };

      //  vue dialog에서 에러 표시
      // this.dialog = {
      //   show: true,
      //   type: 'error',
      //   text: _message
      // }
    }
  },
  // 파일업로드 요청 이벤트
  {
    name: 'APP_IMAGE_UPLOAD',
    callback: function (_fileList) {
      this.fileList = _fileList
    }
  },
  // 파일업로드 완료 이벤트
  {
    name: 'APP_IMAGE_UPLOAD_COMPLETE',
    callback: function (_upload) {
      this.upload = _upload
    }
  },
  // 사용자 입력 요청
  {
    name: 'APP_CONFIRM',
    callback: function (_message) {
      //  vue dialog에서 사용자 입력 요청
      this.dialog = {
        show: true,
        type: 'confirm',
        text: _message
      }
    }
  },
  // 사용자 입력 요청
  {
    name: 'APP_CONFIRM_REPLY',
    callback: function (_reply) {
      _reply
    }
  },
  {
    name: 'USER_LOGIN',
    callback: function () {
    }
  },
  // keyboard 숨김 이벤트
  {
    name: 'APP_KEYBOARD_HIDE',
    callback: function () {
    }
  }
];
