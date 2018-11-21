class JQueryHelper {
  static pageCenter() {
    $(function() {
      $('.page-center').matchHeight({
        target: $('html')
      });

      $(window).resize(function(){
          setTimeout(function(){
              $('.page-center').matchHeight({ remove: true });
              $('.page-center').matchHeight({
                target: $('html')
              });
          },100);
      });
    });
  }
}

export default JQueryHelper;
