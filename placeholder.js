//liuflwy@163.com
//2016-07-19
(function ($,window) {
  $.tools = $.tools || {version: '1.0'};
  $.tools.placeholder = {
          height:26,
          left:0,
          top:0,
          right:'auto',
          width:'auto',
          textAlign:'left',
          isIE:true,//默认只有IE 执行
          wrapDom:'<div>',
          textDom:'<label>',
          wrapDomClass:'pldtxt-wrap',
          textDomClass:'placeholder-txt'
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
                $wrapDom.addClass(conf.wrapDomClass).css({'height':conf.height+'px', 'width':conf.width+'px','*display':'inline','*zoom':'1px', 'visibility':'visible', 'position':'relative'});
                $textDom.addClass(conf.textDomClass).text(t).css({ 'height':conf.height+'px','textAlign':conf.textAlign, 'lineHeight':conf.height+'px', 'width':conf.width+'px', 'left':conf.left+'px','right':conf.right+'px', 'position':'absolute' });
                self.wrap( $wrapDom ).parent().append( $textDom );
                self.attr('pld', t).removeAttr('placeholder');
          }
        });

    that.bind('propertychange input', function (event) {
        if ( $(this).val() ) { $(this).parent().find('.'+conf.textDomClass).hide(); }
        return false;
    });

    that.bind('blur', function (event) {
        if ( $(this).val() ) { return false; }
        $(this).parent().find('.'+conf.textDomClass).text( $(this).attr('pld') ).show();
        return false;
    });

    $('body').on('click','.'+conf.textDomClass, function () {
        $(this).parent().find('input')[0].focus();
        return false;
    });

};

$.fn.placeholder = function(options, fn) {
    //如果配置 isIE:true, 则只有IE 起作用
    var isPlaceholder = (function isPlaceholer(){ var input = document.createElement('input'); return 'placeholder' in input; })();
    if (options && options.isIE && isPlaceholder){ return false;}
    //if ( options && options.isIE && (navigator.userAgent.indexOf('MSIE') < 0) && (navigator.userAgent.indexOf('Opera') < 0)) { return false;}

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
  