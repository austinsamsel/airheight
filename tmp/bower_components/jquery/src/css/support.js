define(["../core","../var/support"],function(e,t){return function(){function n(){var e,t,n,i;t=document.getElementsByTagName("body")[0],t&&t.style&&(e=document.createElement("div"),n=document.createElement("div"),n.style.cssText="position:absolute;border:0;width:0;height:0;top:0;left:-9999px",t.appendChild(n).appendChild(e),e.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",d=a=!1,r=!0,window.getComputedStyle&&(d="1%"!==(window.getComputedStyle(e,null)||{}).top,a="4px"===(window.getComputedStyle(e,null)||{width:"4px"}).width,i=e.appendChild(document.createElement("div")),i.style.cssText=e.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",e.style.width="1px",r=!parseFloat((window.getComputedStyle(i,null)||{}).marginRight),e.removeChild(i)),e.innerHTML="<table><tr><td></td><td>t</td></tr></table>",i=e.getElementsByTagName("td"),i[0].style.cssText="margin:0;border:0;padding:0;display:none",s=0===i[0].offsetHeight,s&&(i[0].style.display="",i[1].style.display="none",s=0===i[0].offsetHeight),t.removeChild(n))}var i,o,l,d,a,s,r;i=document.createElement("div"),i.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",l=i.getElementsByTagName("a")[0],o=l&&l.style,o&&(o.cssText="float:left;opacity:.5",t.opacity="0.5"===o.opacity,t.cssFloat=!!o.cssFloat,i.style.backgroundClip="content-box",i.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===i.style.backgroundClip,t.boxSizing=""===o.boxSizing||""===o.MozBoxSizing||""===o.WebkitBoxSizing,e.extend(t,{reliableHiddenOffsets:function(){return null==s&&n(),s},boxSizingReliable:function(){return null==a&&n(),a},pixelPosition:function(){return null==d&&n(),d},reliableMarginRight:function(){return null==r&&n(),r}}))}(),t});