define(["../var/support"],function(e){return function(){var t,a,n,l,u;a=document.createElement("div"),a.setAttribute("className","t"),a.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",l=a.getElementsByTagName("a")[0],n=document.createElement("select"),u=n.appendChild(document.createElement("option")),t=a.getElementsByTagName("input")[0],l.style.cssText="top:1px",e.getSetAttribute="t"!==a.className,e.style=/top/.test(l.getAttribute("style")),e.hrefNormalized="/a"===l.getAttribute("href"),e.checkOn=!!t.value,e.optSelected=u.selected,e.enctype=!!document.createElement("form").enctype,n.disabled=!0,e.optDisabled=!u.disabled,t=document.createElement("input"),t.setAttribute("value",""),e.input=""===t.getAttribute("value"),t.value="t",t.setAttribute("type","radio"),e.radioValue="t"===t.value}(),e});