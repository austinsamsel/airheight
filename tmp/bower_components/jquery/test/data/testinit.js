function define(e,t,n){amdDefined=n()}function q(){for(var e=[],t=0;t<arguments.length;t++)e.push(document.getElementById(arguments[t]));return e}function t(e,t,n){for(var o=jQuery(t).get(),r="",a=0;a<o.length;a++)r+=(r&&",")+'"'+o[a].id+'"';deepEqual(o,q.apply(q,n),e+" ("+t+")")}function url(e){return e+(/\?/.test(e)?"&":"?")+(new Date).getTime()+parseInt(1e5*Math.random(),10)}var jQuery=this.jQuery||"jQuery",$=this.$||"$",originaljQuery=jQuery,original$=$,hasPHP=!0,isLocal="file:"===window.location.protocol,amdDefined;define.amd={jQuery:!0};var createDashboardXML=function(){var e='<?xml version="1.0" encoding="UTF-8"?> 	<dashboard> 		<locations class="foo"> 			<location for="bar" checked="different"> 				<infowindowtab normal="ab" mixedCase="yes"> 					<tab title="Location"><![CDATA[blabla]]></tab> 					<tab title="Users"><![CDATA[blublu]]></tab> 				</infowindowtab> 			</location> 		</locations> 	</dashboard>';return jQuery.parseXML(e)},createWithFriesXML=function(){var e='<?xml version="1.0" encoding="UTF-8"?> 	<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" 		xmlns:xsd="http://www.w3.org/2001/XMLSchema" 		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"> 		<soap:Body> 			<jsconf xmlns="http://www.example.com/ns1"> 				<response xmlns:ab="http://www.example.com/ns2"> 					<meta> 						<component id="seite1" class="component"> 							<properties xmlns:cd="http://www.example.com/ns3"> 								<property name="prop1"> 									<thing /> 									<value>1</value> 								</property> 								<property name="prop2"> 									<thing att="something" /> 								</property> 								<foo_bar>foo</foo_bar> 							</properties> 						</component> 					</meta> 				</response> 			</jsconf> 		</soap:Body> 	</soap:Envelope>';return jQuery.parseXML(e)},fireNative;fireNative=document.createEvent?function(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}:function(e,t){var n=document.createEventObject();e.fireEvent("on"+t,n)},function(){var e=0,t=0,n=0,o=0;this.moduleTeardown=function(){var r,a=0,i=0;QUnit.reset();for(r in jQuery.cache)++i;jQuery.fragments={};for(r in jQuery.fragments)++a;i!==e&&(equal(i,e,"No unit tests leak memory in jQuery.cache"),e=i),a!==t&&(equal(a,t,"No unit tests leak memory in jQuery.fragments"),t=a),jQuery.timers&&jQuery.timers.length!==n&&(equal(jQuery.timers.length,n,"No timers are still running"),n=jQuery.timers.length),void 0!==jQuery.active&&jQuery.active!==o&&(equal(jQuery.active,0,"No AJAX requests are still active"),o=jQuery.active)},this.testIframe=function(e,t,n){function o(){var t=url("./data/"+e+".html"),n=jQuery("<iframe />").appendTo("body")[0];return n.style.cssText="width: 500px; height: 500px; position: absolute; top: -600px; left: -600px; visibility: hidden;",n.contentWindow.location=t,n}test(t,function(){stop();var e=o(),t=e.contentWindow,r=setInterval(function(){t&&t.jQuery&&t.jQuery.isReady&&(clearInterval(r),start(),n.call(this,t.jQuery,t,t.document),document.body.removeChild(e),e=null)},15)})},this.testIframeWithCallback=function(e,t,n){test(e,function(){var e;stop(),window.iframeCallback=function(){var t=this,o=arguments;setTimeout(function(){window.iframeCallback=void 0,e.remove(),n.apply(t,o),n=function(){},start()},0)},e=jQuery("<div/>").append(jQuery("<iframe/>").attr("src",url("./data/"+t))).appendTo("body")})}}(),function(){var e=window.start;window.start=function(){e()}}();