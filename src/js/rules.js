/**
 * 컴포넌트에 사용되는 validation checking rule을 정의하는 js 파일
 */

 var rules = {
  required: (value) => !!value || 'Required.',
  email: (value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Invalid e-mail.';
  },
  maxCount: 0,
  maxLength: (value) => value.length <= rules.maxCount || 'Max ' + maxCount + ' characters'
}

export default rules