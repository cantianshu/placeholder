  //原生 placeholder 还没有实现， 有待完成  遇到壁垒 无法实现后绑定
  (function (dwin) {

    var placeholder =  function placeholder(ele,config){
        var that = this;
        this.addHandler =function(ele, type, handler){
            if (!ele) return false;
    　　　　if (ele.addEventListener) {
    　　　　　　ele.addEventListener(type, handler, false);
    　　　　} else  if ( ele.attachEvent) {
    　　　　　　ele.attachEvent('on' +type, handler);
    　　　　} else {
    　　　　　　ele['on' +type] =  handler;
    　　　　}
    　　};

    　　this.removeHandler =function (ele, type, handler) {
            if (!ele) return false;
    　　　　if (ele.removeEventListener) {
    　　　　　　ele.removeEventListener(type, handler, false);
    　　　　} else if (ele.detachEvent) {
    　　　　　　ele.detachEvent('on'+type, handler);
    　　　　}else {
    　　　　　　ele['on'+type]=null;
    　　　　}
    　　};

          /*var newEle = [];//ele.parentNode.getElementsByTagName('input')[0];

           console.log( newEle );
            that.addHandler(newEle, 'focus', function (e){
                e.preventDefault&&e.preventDefault();
                e = e || window.event;
                alert(e);
                var ele = e.target || e.srcElement;
                var lb = ele.parentNode.getElementsByTagName('label')[0];
                console.log(lb);
                    lb&&ele.parentNode.removeChild( lb );
                return false;
            });


            that.addHandler(newEle, 'blur', function (e){
                e.preventDefault&&e.preventDefault();
                e = e || window.event;
                var ele = e.target || e.srcElement;
                var val = ele.getAttribute('value');
                //有输入值 不需要添加提示了
                if (val && val.length > 0) { return false; }
                var v = ele.getAttribute('pld');
                //var lb = ele.parentNode.getElementsByTagName('label')[0];
                var lb = document.createElement('label');
                    lb.className = 'placeholder';
                    lb.innerHTML = v;
                ele.parentNode.appendChild( lb );

                return false;
            });*/

        this._init = (function ( ele, config ) {
          var d = document,
            txt = ele.getAttribute('placeholder'),
            div = d.createElement('span'),
            lb = d.createElement('span'),
            styles = 'height:'+config.height+'px;'+'line-height:'+config.height+'px';
            ele.setAttribute('style',styles);
            ele.removeAttribute('placeholder');
            ele.setAttribute('pld', txt);

            lb.className = 'placeholder';
            lb.innerHTML = txt;
            lb.setAttribute('style',styles);

            div.className ='placeholder-wrap';
            div.appendChild(ele.cloneNode(true));
            div.appendChild(lb);

          ele.parentNode.replaceChild( div ,ele);


        })(ele,config);

    };

window.onload = function () {
    var inputs = document.getElementsByTagName('input');

    for (var i=0; i< inputs.length; i++) {
      var ele = inputs[i];
      placeholder( ele,{'height':'26'} );
    }

}

  })(window);
  