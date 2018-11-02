/**
 * ajax에서 binary, arraybuffer를 처리하기 위한 소스
 * 참고 url : 
 *    http://blog.naver.com/PostView.nhn?blogId=eks020&logNo=220767408724&parentCategoryNo=&categoryNo=31&viewDate=&isShowPopularPosts=false&from=postView
 *    https://artandlogic.com/2013/11/jquery-ajax-blobs-and-array-buffers/
 */
import $ from 'jquery'
$.ajaxTransport("+binary", function(options, originalOptions, jqXHR) {
  if (window.FormData && ((options.dataType && (options.dataType == 'binary')) 
      || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) 
      || (window.Blob && options.data instanceof Blob))))){
      return {
          send: function(headers, callback) {
              var xhr = new XMLHttpRequest(),
              url = options.url,
              type = options.type,
              async = options.async || true,
              dataType = options.responseType || "blob",
              data = options.data || null;

              xhr.addEventListener('load', function() {
                  var data = {};
                  data[options.dataType] = xhr.response;
                  callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
              });

              xhr.open(type, url, async);

              for (var i in headers) {
                  xhr.setRequestHeader(i, headers[i]);
              }

              xhr.responseType = dataType;
              xhr.send(data);
          },
          abort: function() {}
      };
  }
});