define(["../var/strundefined","../var/support"],function(e,t){return function(){var n;t.shrinkWrapBlocks=function(){if(null!=n)return n;n=!1;var t,o,i;return o=document.getElementsByTagName("body")[0],o&&o.style?(t=document.createElement("div"),i=document.createElement("div"),i.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",o.appendChild(i).appendChild(t),typeof t.style.zoom!==e&&(t.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",t.appendChild(document.createElement("div")).style.width="5px",n=3!==t.offsetWidth),o.removeChild(i),n):void 0}}(),t});