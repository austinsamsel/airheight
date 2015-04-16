if(jQuery.fn.width){module("dimensions",{teardown:moduleTeardown});var pass=function(e){return e},fn=function(e){return function(){return e}},testWidth=function(e){expect(9);var t=jQuery("#nothiddendiv");t.width(e(30)),equal(t.width(),30,"Test set to 30 correctly"),t.hide(),equal(t.width(),30,"Test hidden div"),t.show(),t.width(e(-1)),equal(t.width(),0,"Test negative width normalized to 0"),t.css("padding","20px"),equal(t.width(),0,"Test padding specified with pixels"),t.css("border","2px solid #fff"),equal(t.width(),0,"Test border specified with pixels"),t.css({display:"",border:"",padding:""}),jQuery("#nothiddendivchild").css({width:20,padding:"3px",border:"2px solid #fff"}),equal(jQuery("#nothiddendivchild").width(),20,"Test child width with border and padding"),jQuery("#nothiddendiv, #nothiddendivchild").css({border:"",padding:"",width:""});var i=jQuery("blah");equal(i.width(e(10)),i,"Make sure that setting a width on an empty set returns the set."),equal(i.width(),null,"Make sure 'null' is returned on an empty set"),equal(jQuery(window).width(),document.documentElement.clientWidth,"Window width is equal to width reported by window/document."),jQuery.removeData(t[0],"olddisplay",!0)};test("width()",function(){testWidth(pass)}),test("width(Function)",function(){testWidth(fn)}),test("width(Function(args))",function(){expect(2);var e=jQuery("#nothiddendiv");e.width(30).width(function(e,t){return equal(t,30,"Make sure previous value is corrrect."),t+1}),equal(e.width(),31,"Make sure value was modified correctly.")});var testHeight=function(e){expect(9);var t=jQuery("#nothiddendiv");t.height(e(30)),equal(t.height(),30,"Test set to 30 correctly"),t.hide(),equal(t.height(),30,"Test hidden div"),t.show(),t.height(e(-1)),equal(t.height(),0,"Test negative height normalized to 0"),t.css("padding","20px"),equal(t.height(),0,"Test padding specified with pixels"),t.css("border","2px solid #fff"),equal(t.height(),0,"Test border specified with pixels"),t.css({display:"",border:"",padding:"",height:"1px"}),jQuery("#nothiddendivchild").css({height:20,padding:"3px",border:"2px solid #fff"}),equal(jQuery("#nothiddendivchild").height(),20,"Test child height with border and padding"),jQuery("#nothiddendiv, #nothiddendivchild").css({border:"",padding:"",height:""});var i=jQuery("blah");equal(i.height(e(10)),i,"Make sure that setting a height on an empty set returns the set."),equal(i.height(),null,"Make sure 'null' is returned on an empty set"),equal(jQuery(window).height(),document.documentElement.clientHeight,"Window width is equal to width reported by window/document."),jQuery.removeData(t[0],"olddisplay",!0)};test("height()",function(){testHeight(pass)}),test("height(Function)",function(){testHeight(fn)}),test("height(Function(args))",function(){expect(2);var e=jQuery("#nothiddendiv");e.height(30).height(function(e,t){return equal(t,30,"Make sure previous value is corrrect."),t+1}),equal(e.height(),31,"Make sure value was modified correctly.")}),test("innerWidth()",function(){expect(6);var e=jQuery(window).width(),t=jQuery(document).width();equal(jQuery(window).innerWidth(),e,"Test on window"),equal(jQuery(document).innerWidth(),t,"Test on document");var i=jQuery("#nothiddendiv");i.css({margin:10,border:"2px solid #fff",width:30}),equal(i.innerWidth(),30,"Test with margin and border"),i.css("padding","20px"),equal(i.innerWidth(),70,"Test with margin, border and padding"),i.hide(),equal(i.innerWidth(),70,"Test hidden div"),i.css({display:"",border:"",padding:"",width:"",height:""});var n=jQuery("<div>");equal(n.innerWidth(),0,"Make sure that disconnected nodes are handled."),n.remove(),jQuery.removeData(i[0],"olddisplay",!0)}),test("innerHeight()",function(){expect(6);var e=jQuery(window).height(),t=jQuery(document).height();equal(jQuery(window).innerHeight(),e,"Test on window"),equal(jQuery(document).innerHeight(),t,"Test on document");var i=jQuery("#nothiddendiv");i.css({margin:10,border:"2px solid #fff",height:30}),equal(i.innerHeight(),30,"Test with margin and border"),i.css("padding","20px"),equal(i.innerHeight(),70,"Test with margin, border and padding"),i.hide(),equal(i.innerHeight(),70,"Test hidden div"),i.css({display:"",border:"",padding:"",width:"",height:""});var n=jQuery("<div>");equal(n.innerHeight(),0,"Make sure that disconnected nodes are handled."),n.remove(),jQuery.removeData(i[0],"olddisplay",!0)}),test("outerWidth()",function(){expect(11);var e=jQuery(window).width(),t=jQuery(document).width();equal(jQuery(window).outerWidth(),e,"Test on window without margin option"),equal(jQuery(window).outerWidth(!0),e,"Test on window with margin option"),equal(jQuery(document).outerWidth(),t,"Test on document without margin option"),equal(jQuery(document).outerWidth(!0),t,"Test on document with margin option");var i=jQuery("#nothiddendiv");i.css("width",30),equal(i.outerWidth(),30,"Test with only width set"),i.css("padding","20px"),equal(i.outerWidth(),70,"Test with padding"),i.css("border","2px solid #fff"),equal(i.outerWidth(),74,"Test with padding and border"),i.css("margin","10px"),equal(i.outerWidth(),74,"Test with padding, border and margin without margin option"),i.css("position","absolute"),equal(i.outerWidth(!0),94,"Test with padding, border and margin with margin option"),i.hide(),equal(i.outerWidth(!0),94,"Test hidden div with padding, border and margin with margin option"),i.css({position:"",display:"",border:"",padding:"",width:"",height:""});var n=jQuery("<div>");equal(n.outerWidth(),0,"Make sure that disconnected nodes are handled."),n.remove(),jQuery.removeData(i[0],"olddisplay",!0)}),test("child of a hidden elem (or unconnected node) has accurate inner/outer/Width()/Height()  see #9441 #9300",function(){expect(16);var e=jQuery("<div>").css({width:"100px",height:"100px",border:"10px solid white",padding:"2px",margin:"3px"}),t=e.clone(),i=e.clone(),n=jQuery("<div>").css("display","none").append(t).appendTo("body");e.appendTo("body"),equal(t.width(),e.width(),"child of a hidden element width() is wrong see #9441"),equal(t.innerWidth(),e.innerWidth(),"child of a hidden element innerWidth() is wrong see #9441"),equal(t.outerWidth(),e.outerWidth(),"child of a hidden element outerWidth() is wrong see #9441"),equal(t.outerWidth(!0),e.outerWidth(!0),"child of a hidden element outerWidth( true ) is wrong see #9300"),equal(t.height(),e.height(),"child of a hidden element height() is wrong see #9441"),equal(t.innerHeight(),e.innerHeight(),"child of a hidden element innerHeight() is wrong see #9441"),equal(t.outerHeight(),e.outerHeight(),"child of a hidden element outerHeight() is wrong see #9441"),equal(t.outerHeight(!0),e.outerHeight(!0),"child of a hidden element outerHeight( true ) is wrong see #9300"),equal(i.width(),e.width(),"unconnected element width() is wrong see #9441"),equal(i.innerWidth(),e.innerWidth(),"unconnected element innerWidth() is wrong see #9441"),equal(i.outerWidth(),e.outerWidth(),"unconnected element outerWidth() is wrong see #9441"),equal(i.outerWidth(!0),e.outerWidth(!0),"unconnected element outerWidth( true ) is wrong see #9300"),equal(i.height(),e.height(),"unconnected element height() is wrong see #9441"),equal(i.innerHeight(),e.innerHeight(),"unconnected element innerHeight() is wrong see #9441"),equal(i.outerHeight(),e.outerHeight(),"unconnected element outerHeight() is wrong see #9441"),equal(i.outerHeight(!0),e.outerHeight(!0),"unconnected element outerHeight( true ) is wrong see #9300"),n.remove(),e.remove()}),test("getting dimensions shouldnt modify runtimeStyle see #9233",function(){expect(1);var e=jQuery("<div>").appendTo("#qunit-fixture"),t=e.get(0),i=t.runtimeStyle;i&&(t.runtimeStyle.marginLeft="12em",t.runtimeStyle.left="11em"),e.outerWidth(!0),i?equal(t.runtimeStyle.left,"11em","getting dimensions modifies runtimeStyle, see #9233"):ok(!0,"this browser doesnt support runtimeStyle, see #9233"),e.remove()}),test("table dimensions",2,function(){var e=jQuery("<table><colgroup><col/><col/></colgroup><tbody><tr><td></td><td>a</td></tr><tr><td></td><td>a</td></tr></tbody></table>").appendTo("#qunit-fixture"),t=e.find("tr:eq(0) td:eq(0)"),i=e.find("col:eq(1)").width(300);e.find("td").css({margin:0,padding:0}),equal(t.width(),t.width(),"width() doesn't alter dimension values of empty cells, see #11293"),equal(i.width(),300,"col elements have width(), see #12243")}),test("box-sizing:border-box child of a hidden elem (or unconnected node) has accurate inner/outer/Width()/Height()  see #10413",function(){expect(16);var e=jQuery("<div>").css({boxSizing:"border-box",width:"100px",height:"100px",border:"10px solid white",padding:"2px",margin:"3px"}),t=e.clone(),i=e.clone(),n=jQuery("<div>").css("display","none").append(t).appendTo("body");e.appendTo("body"),equal(t.width(),e.width(),"child of a hidden element width() is wrong see #10413"),equal(t.innerWidth(),e.innerWidth(),"child of a hidden element innerWidth() is wrong see #10413"),equal(t.outerWidth(),e.outerWidth(),"child of a hidden element outerWidth() is wrong see #10413"),equal(t.outerWidth(!0),e.outerWidth(!0),"child of a hidden element outerWidth( true ) is wrong see #10413"),equal(t.height(),e.height(),"child of a hidden element height() is wrong see #10413"),equal(t.innerHeight(),e.innerHeight(),"child of a hidden element innerHeight() is wrong see #10413"),equal(t.outerHeight(),e.outerHeight(),"child of a hidden element outerHeight() is wrong see #10413"),equal(t.outerHeight(!0),e.outerHeight(!0),"child of a hidden element outerHeight( true ) is wrong see #10413"),equal(i.width(),e.width(),"unconnected element width() is wrong see #10413"),equal(i.innerWidth(),e.innerWidth(),"unconnected element innerWidth() is wrong see #10413"),equal(i.outerWidth(),e.outerWidth(),"unconnected element outerWidth() is wrong see #10413"),equal(i.outerWidth(!0),e.outerWidth(!0),"unconnected element outerWidth( true ) is wrong see #10413"),equal(i.height(),e.height(),"unconnected element height() is wrong see #10413"),equal(i.innerHeight(),e.innerHeight(),"unconnected element innerHeight() is wrong see #10413"),equal(i.outerHeight(),e.outerHeight(),"unconnected element outerHeight() is wrong see #10413"),equal(i.outerHeight(!0),e.outerHeight(!0),"unconnected element outerHeight( true ) is wrong see #10413"),n.remove(),e.remove()}),test("outerHeight()",function(){expect(11);var e=jQuery(window).height(),t=jQuery(document).height();equal(jQuery(window).outerHeight(),e,"Test on window without margin option"),equal(jQuery(window).outerHeight(!0),e,"Test on window with margin option"),equal(jQuery(document).outerHeight(),t,"Test on document without margin option"),equal(jQuery(document).outerHeight(!0),t,"Test on document with margin option");var i=jQuery("#nothiddendiv");i.css("height",30),equal(i.outerHeight(),30,"Test with only width set"),i.css("padding","20px"),equal(i.outerHeight(),70,"Test with padding"),i.css("border","2px solid #fff"),equal(i.outerHeight(),74,"Test with padding and border"),i.css("margin","10px"),equal(i.outerHeight(),74,"Test with padding, border and margin without margin option"),equal(i.outerHeight(!0),94,"Test with padding, border and margin with margin option"),i.hide(),equal(i.outerHeight(!0),94,"Test hidden div with padding, border and margin with margin option"),i.css({display:"",border:"",padding:"",width:"",height:""});var n=jQuery("<div>");equal(n.outerHeight(),0,"Make sure that disconnected nodes are handled."),n.remove(),jQuery.removeData(i[0],"olddisplay",!0)}),test("passing undefined is a setter #5571",function(){expect(4),equal(jQuery("#nothiddendiv").height(30).height(void 0).height(),30,".height(undefined) is chainable (#5571)"),equal(jQuery("#nothiddendiv").height(30).innerHeight(void 0).height(),30,".innerHeight(undefined) is chainable (#5571)"),equal(jQuery("#nothiddendiv").height(30).outerHeight(void 0).height(),30,".outerHeight(undefined) is chainable (#5571)"),equal(jQuery("#nothiddendiv").width(30).width(void 0).width(),30,".width(undefined) is chainable (#5571)")}),test("getters on non elements should return null",function(){expect(8);var e=jQuery("notAnElement");strictEqual(e.width(),null,".width() is not null (#12283)"),strictEqual(e.innerWidth(),null,".innerWidth() is not null (#12283)"),strictEqual(e.outerWidth(),null,".outerWidth() is not null (#12283)"),strictEqual(e.outerWidth(!0),null,".outerWidth(true) is not null (#12283)"),strictEqual(e.height(),null,".height() is not null (#12283)"),strictEqual(e.innerHeight(),null,".innerHeight() is not null (#12283)"),strictEqual(e.outerHeight(),null,".outerHeight() is not null (#12283)"),strictEqual(e.outerHeight(!0),null,".outerHeight(true) is not null (#12283)")}),test("setters with and without box-sizing:border-box",function(){expect(20);var e=jQuery("<div style='width:114px;height:114px;margin:5px;padding:3px;border:4px solid white;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;'>test</div>").appendTo("#qunit-fixture"),t=jQuery("<div style='width:100px;height:100px;margin:5px;padding:3px;border:4px solid white;'>test</div>").appendTo("#qunit-fixture"),i=100;equal(e.width(101).width(),i+1,"test border-box width(int) by roundtripping"),equal(e.innerWidth(108).width(),i+2,"test border-box innerWidth(int) by roundtripping"),equal(e.outerWidth(117).width(),i+3,"test border-box outerWidth(int) by roundtripping"),equal(e.outerWidth(118,!1).width(),i+4,"test border-box outerWidth(int, false) by roundtripping"),equal(e.outerWidth(129,!0).width(),i+5,"test border-box innerWidth(int, true) by roundtripping"),equal(e.height(101).height(),i+1,"test border-box height(int) by roundtripping"),equal(e.innerHeight(108).height(),i+2,"test border-box innerHeight(int) by roundtripping"),equal(e.outerHeight(117).height(),i+3,"test border-box outerHeight(int) by roundtripping"),equal(e.outerHeight(118,!1).height(),i+4,"test border-box outerHeight(int, false) by roundtripping"),equal(e.outerHeight(129,!0).height(),i+5,"test border-box innerHeight(int, true) by roundtripping"),equal(t.width(101).width(),i+1,"test border-box width(int) by roundtripping"),equal(t.innerWidth(108).width(),i+2,"test border-box innerWidth(int) by roundtripping"),equal(t.outerWidth(117).width(),i+3,"test border-box outerWidth(int) by roundtripping"),equal(t.outerWidth(118,!1).width(),i+4,"test border-box outerWidth(int, false) by roundtripping"),equal(t.outerWidth(129,!0).width(),i+5,"test border-box innerWidth(int, true) by roundtripping"),equal(t.height(101).height(),i+1,"test border-box height(int) by roundtripping"),equal(t.innerHeight(108).height(),i+2,"test border-box innerHeight(int) by roundtripping"),equal(t.outerHeight(117).height(),i+3,"test border-box outerHeight(int) by roundtripping"),equal(t.outerHeight(118,!1).height(),i+4,"test border-box outerHeight(int, false) by roundtripping"),equal(t.outerHeight(129,!0).height(),i+5,"test border-box innerHeight(int, true) by roundtripping")}),testIframe("dimensions/documentSmall","window vs. small document",function(e,t,i){i.body.offsetWidth>=i.documentElement.offsetWidth?(expect(2),equal(e(i).height(),e(t).height(),"document height matches window height"),equal(e(i).width(),e(t).width(),"document width matches window width")):(expect(1),ok(!0,"skipping test (conditions not satisfied)"))}),testIframe("dimensions/documentLarge","window vs. large document",function(e,t,i){expect(2),ok(e(i).height()>e(t).height(),"document height is larger than window height"),ok(e(i).width()>e(t).width(),"document width is larger than window width")})}