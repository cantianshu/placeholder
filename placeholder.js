//liuflwy@163.com
//2016-07-19
(function ($,window) {
  $.tools = $.tools || {version: '1.0'};
  $.tools.placeholder = {
          height:26,
          left:5,
          top:0,
          isIE:true,//默认只有IE 执行
          wrapDom:'<div>',
          textDom:'<label>'
  };

function Placeholder(allelem, handle, options, fn) {
        var that = allelem,
            self = handle,
            conf = options;
        $.extend(self,{
          _init: function () {
            var t = self.attr('placeholder'),
                $wrapDom = $(conf['wrapDom']),
                $textDom = $(conf['textDom']);
                $wrapDom.addClass('pldtxt-wrap').css({'height':conf.height+'px','*display':'inline','*zoom':'1px', 'visibility':'visible', 'position':'relative'});
                $textDom.addClass('placeholder-txt').text(t).css({ 'height':conf.height+'px', 'lineHeight':conf.height+'px', 'left':conf.left+'px', 'position':'absolute' });
                self.wrap( $wrapDom ).parent().append( $textDom );
                self.attr('pld', t).removeAttr('placeholder');
          }
        });

    that.bind('propertychange input', function (event) {
        if ( $(this).val() ) { $(this).parent().find('.placeholder-txt').hide(); }
        return false;
    });

    that.bind('blur', function (event) {
        if ( $(this).val() ) { return false; }
        $(this).parent().find('.placeholder-txt').text( $(this).attr('pld') ).show();
        return false;
    });

    $('body').on('click','.placeholder-txt', function () {
        $(this).parent().find('input')[0].focus();
        return false;
    });

};

$.fn.placeholder = function(options, fn) {
    //如果配置 isIE:true, 则只有IE 起作用
    if ( options && options.isIE && (navigator.userAgent.indexOf('MSIE') < 0) && (navigator.userAgent.indexOf('Opera') < 0)) { return false;}

    var el = this.data('fn-placeholder'), that = this;
        if (el) {return false;}
        options = $.extend({}, $.tools.placeholder, options);
    this.each(function () {
        var self = $(this);

        el = new Placeholder(that, self, options, fn);

        self._init();

        self.data('fn-placeholder', el);
    });

};


})((typeof(jQuery) != 'undefined' && jQuery) || (typeof(Zepto) != 'undefined' && Zepto) || $, window);
  