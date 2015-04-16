"use strict";var testSuite=function(){describe("Garlic.js test suite",function(){$("#noGarlicDefault").garlic({conflictManager:{enabled:!0,garlicPriority:!1}}),$("[rel=persist-select]").garlic(),$("#submit13").click(function(e){e.preventDefault()}),$("#form1").garlic({domain:!0}),$("#retrieve-trigger").garlic({onRetrieve:function(e,t){e.attr("storedValue",t)}}),$("#persist-trigger").garlic({onPersist:function(e,t){console.log("Value: ",t),e.attr("storedValue",t)}});var e=$("#form1").garlic("getStorage");$("#custom-get-path-form").garlic({getPath:function(e){return e.attr("id")+"_mypath"}}),$("#conflictedForm").garlic({conflictManager:{enabled:!0}}),describe("Test getPath",function(){it("getPath() for #input1",function(){expect($("#input1").garlic("getPath")).to.be("garlic:"+document.domain+window.location.pathname+">form:eq(0)>input")}),it("getPath() for #div1",function(){expect($("#div1").garlic("getPath")).to.be(!1)}),it("getPath() for #textarea2",function(){expect($("#textarea2").garlic("getPath")).to.be("garlic:"+document.domain+window.location.pathname+">form:eq(8)>textarea")}),it("getPath() for #checkbox1",function(){expect($("#checkbox1").garlic("getPath")).to.be("garlic:"+document.domain+window.location.pathname+">form:eq(3)>input.checkbox[]:eq(0)")}),it("getPath() for #checkbox2",function(){expect($("#checkbox2").garlic("getPath")).to.be("garlic:"+document.domain+window.location.pathname+">form:eq(3)>input.checkbox[]:eq(1)")}),it("getPath() for #radio1",function(){expect($("#radio1").garlic("getPath")).to.be("garlic:"+document.domain+window.location.pathname+">form:eq(4)>input.radio")}),it("getPath() for #radio2, should be same as #radio1",function(){expect($("#radio1").garlic("getPath")).to.be($("#radio1").garlic("getPath"))}),it("getPath() for elements with domain=true",function(){expect($("#input5").garlic("getPath")).to.be("garlic:"+document.domain+"*>form:eq(6)>input")}),it("test custom getPath()",function(){expect($("#custom-get-path-field").garlic("getPath")).to.be("custom-get-path-field_mypath")})}),describe("Test Garlic storage",function(){it("Test has()",function(){expect(e.has("foo")).to.be(!1)}),it("Test set()",function(){e.set("foo","bar"),e.set("garlic","storage"),expect(e.has("foo")).to.be(!0),expect(e.has("garlic")).to.be(!0)}),it("Test get()",function(){expect(e.get("foo")).to.be("bar"),expect(e.get("baz")).to.be(null),expect(e.get("garlic")).to.be("storage"),expect(e.get("baz","bar")).to.be("bar")}),it("Test destroy()",function(){e.destroy("foo"),expect(e.get("foo")).to.be(null)}),it("If custom onPersist function is defined, execute it",function(){$("#persist-input").garlic("persist",function(){expect($("#persist-input").attr("storedValue")).to.be("bar")})})}),describe("Test inputs binding",function(){it("On a simple form with only one input[type=text]",function(){expect($("#input1").hasClass("garlic-auto-save")).to.be(!0)}),it("On a simple form with only one input[type=text] and a textarea",function(){expect($("#input2").hasClass("garlic-auto-save")).to.be(!0),expect($("#textarea1").hasClass("garlic-auto-save")).to.be(!0)}),it("On a div which is obviously not a form",function(){expect($("#div1").hasClass("garlic-auto-save")).to.be(!1)}),it("On a single form element, not the wole form",function(){expect($("#input3").hasClass("garlic-auto-save")).to.be(!0),expect($("#input4").hasClass("garlic-auto-save")).to.be(!1)}),it("On a select input",function(){expect($("#select2").hasClass("garlic-auto-save")).to.be(!0)}),it("On a checkboxes inputs",function(){expect($("#checkbox1").hasClass("garlic-auto-save")).to.be(!0),expect($("#checkbox2").hasClass("garlic-auto-save")).to.be(!0),expect($("#checkbox3").hasClass("garlic-auto-save")).to.be(!0)}),it("On a radio buttons",function(){expect($("#radio1").hasClass("garlic-auto-save")).to.be(!0),expect($("#radio2").hasClass("garlic-auto-save")).to.be(!0)}),it("On a form without data-persist, binded manually in javascript",function(){expect($("#input5").hasClass("garlic-auto-save")).to.be(!0)}),it('On a form that has data-storage="false" inputs',function(){expect($("#input12").hasClass("garlic-auto-save")).to.be(!1),expect($("#input13").hasClass("garlic-auto-save")).to.be(!0)}),it("On a form that is of type number",function(){expect($("#number").hasClass("garlic-auto-save")).to.be(!0)}),it("On a form that is of type tel",function(){expect($("#tel").hasClass("garlic-auto-save")).to.be(!0)}),it("On a form that is of type email",function(){expect($("#email").hasClass("garlic-auto-save")).to.be(!0)}),it("On a form that is of type password",function(){expect($("#password").hasClass("garlic-auto-save")).to.be(!1)}),it("On a file input",function(){expect($("#file").hasClass("garlic-auto-save")).to.be(!1)}),it("On a hidden input",function(){expect($("#hidden").hasClass("garlic-auto-save")).to.be(!1)})}),describe("Test inputs events",function(){var t=["DOMAttrModified","textInput","input","change","keypress","paste","focus"],a=$("#input6").garlic("getPath");it("Data is persisted on supported events: "+t.join(", "),function(){for(var i in t)$("#input6").val("foo"+t[i]),$("#input6").trigger($.Event(t[i])),expect($("#input6").val()).to.be("foo"+t[i]),expect(e.get(a)).to.be("foo"+t[i])})}),describe("Test input data retrieving",function(){e.set($("#input7").garlic("getPath"),"foo"),e.set($("#textarea2").garlic("getPath"),"bar"),e.set($("#radio1").garlic("getPath"),"radio1"),e.set($("#checkbox1").garlic("getPath"),"checkbox1"),e.set($("#checkbox2").garlic("getPath"),"checkbox2"),e.set($("#checkbox3").garlic("getPath"),"wrong_data"),e.set($("#select23").garlic("getPath"),"bar"),e.set($("#retrieve-input").garlic("getPath"),"foo"),it("An input should be populated by its stored data",function(){$("#input7").garlic("retrieve"),$("#textarea2").garlic("retrieve"),expect($("#input7").val()).to.be("foo"),expect($("#textarea2").val()).to.be("bar")}),it("Select must be setted accordingly to storage",function(){$("#select23").garlic("retrieve"),expect($("#select23").val()).to.be("bar")}),it("Radio buttons must be checked accordingly to storage",function(){$("#radio1").garlic("retrieve",function(){expect("checked"==$("#radio1").attr("checked")||"true"==$("#radio1").attr("checked")).to.be(!0)}),$("#radio2").garlic("retrieve",function(){expect(void 0==$("#radio2").attr("checked")||0==$("#radio2").attr("checked")).to.be(!0)})}),it("Checkboxes buttons must be checked accordingly to storage",function(){$("#checkbox1").garlic("retrieve"),$("#checkbox2").garlic("retrieve"),$("#checkbox3").garlic("retrieve"),expect("checked"==$("#checkbox1").attr("checked")||"true"==$("#checkbox1").attr("checked")).to.be(!0),expect("checked"==$("#checkbox2").attr("checked")||"true"==$("#checkbox2").attr("checked")).to.be(!0),expect(void 0==$("#checkbox3").attr("checked")||0==$("#checkbox3").attr("checked")).to.be(!0)}),it("If custom retrieval function is defined, execute it",function(){$("#retrieve-input").garlic("retrieve",function(){expect($("#retrieve-input").attr("storedValue")).to.be("foo")})}),it("When stored data is retrieved, an input event should be triggered",function(e){$("#retrieve-input").on("input",function(){e()}),$("#retrieve-input").garlic("retrieve")})}),describe("Auto expiration feature",function(){$("#auto-expires").val("foo"),$("#auto-expires-2").val("bar"),$("#auto-expires-3").val("baz");var t,a;it("If data auto-expires, data is persisted an expires flag is set in localStorage",function(){$("#auto-expires").bind("change",function(){{var t=e.get("garlic:"+document.domain+window.location.pathname+">form:eq(23)_flag");parseInt(t)-(new Date).getTime()}expect(e.get($("#auto-expires").garlic("getPath"))).to.be("foo"),$("#auto-expires").garlic("retrieve",function(){expect($("#auto-expires").attr("expires-in")).to.be("14")})}),$("#auto-expires-2").bind("change",function(){{var t=e.get("garlic:"+document.domain+window.location.pathname+">form:eq(23)_flag");parseInt(t)-(new Date).getTime()}expect(e.get($("#auto-expires-2").garlic("getPath"))).to.be("bar"),$("#auto-expires-2").garlic("retrieve",function(){expect($("#auto-expires-2").attr("expires-in")).to.be("14")})}),$("#auto-expires-3").bind("change",function(){{var t=e.get($("#auto-expires-3").garlic("getPath")+"_flag");parseInt(t)-(new Date).getTime()}expect(e.get($("#auto-expires-3").garlic("getPath"))).to.be("baz"),$("#auto-expires-3").garlic("retrieve",function(){expect($("#auto-expires-3").attr("expires-in")).to.be("24")})}),$("#auto-expires").trigger("change"),$("#auto-expires-2").trigger("change"),$("#auto-expires-3").trigger("change")}),it("If data-expires is set on a form item, all form fields have the same expiration date, and this date updates each time one of them item is updated",function(){expect(t).to.be(a)}),it("Data is not persisted in localStorage anymore after expiration time",function(){e.set("garlic:"+document.domain+window.location.pathname+">form:eq(23)_flag",((new Date).getTime()-200).toString()),$("#auto-expires").garlic("retrieve",function(){expect(e.has($("#auto-expires").garlic("getPath"))).to.be(!1)}),$("#auto-expires-2").garlic("retrieve",function(){expect(e.has($("#auto-expires-2").garlic("getPath"))).to.be(!1)}),$("#auto-expires-3").garlic("retrieve",function(){expect(e.has($("#auto-expires-3").garlic("getPath"))).to.be(!0)})})}),describe("Test input data change",function(){it("If some text is added / removed in a textarea or an input[type=text], it should be updated in storage",function(){$("#input12").val("hello world!"),$("#input12").trigger("keypress",function(){expect(e.get($("#input12").garlic("getPath"))).to.be("hello world!")})}),it("If a text field is willingly cleared by an user, its storage will also be cleared",function(){$("#input12").val(""),$("#input12").trigger("keypress",function(){expect(e.has($("#input12").garlic("getPath"))).to.be(!1)})}),it("If a select is changed, new value should be stored",function(){$("#select3").val("bar"),$("#select3").trigger("change",function(){expect(e.get($("#select3").garlic("getPath"))).to.be("bar")})}),it("If radio button is selected, value or new value should be stored",function(){$("#radio1").val("foo"),$("#radio1").trigger("change",function(){expect(e.get($("#radio1").garlic("getPath"))).to.be("foo")})}),it("Same, but with radio buttons not at the same DOM level",function(){$("#radio2").val("bar"),$("#radio2").trigger("change",function(){expect(e.get($("#radio2").garlic("getPath"))).to.be("bar")})}),it("If a checkbox is checked, its state should be persisted",function(){$("#checkbox4").val("foo"),$("#checkbox6").val("bar"),$("#checkbox4").trigger("change",function(){expect(e.get($("#checkbox4").garlic("getPath"))).to.be("foo")}),$("#checkbox6").trigger("change",function(){expect(e.get($("#checkbox6").garlic("getPath"))).to.be("bar")})}),it("Same, but with checkboxes not at the same DOM level",function(){$("#checkbox7").val("bar"),$("#checkbox8").val("baz"),$("#checkbox7").trigger("change",function(){expect(e.get($("#checkbox7").garlic("getPath"))).to.be("bar")}),$("#checkbox8").trigger("change",function(){expect(e.get($("#checkbox8").garlic("getPath"))).to.be("baz")})}),it("If a checkbox is unchecked, its state should be removed from storage",function(){$("#checkbox9").trigger("click",function(){expect($("#checkbox9").attr("checked")).to.be("checked"),expect(e.get($("#checkbox9").garlic("getPath"))).to.be("foo")}),$("#checkbox9").trigger("click",function(){expect(void 0==$("#checkbox9").attr("checked")||0==$("#checkbox9").attr("checked")).to.be(!0),expect(e.has($("#checkbox9").garlic("getPath"))).to.be(!1)})})}),describe("Conflicts management",function(){var t=["input","textarea","select"];for(var a in t)e.set($("#"+t[a]+"14").garlic("getPath"),"not default");it("If "+t.join(",")+" fields have default value and conflictManager enabled, detect conflict",function(){for(var e in t)$("#"+t[e]+"14").garlic("retrieve",function(){expect($("#"+t[e]+"14").hasClass("garlic-conflict-detected")).to.be(!0)})}),it("If "+t.join(",")+" fields have default value and conflictManager enabled, display swap handler next to it",function(){for(var e in t)expect($("#"+t[e]+"14").next("span").hasClass("garlic-swap")).to.be(!0)}),it("If garlicPriority is set to true (default), display for "+t.join(",")+" persisted data",function(){for(var e in t)expect($("#"+t[e]+"14").val()).to.be("not default")}),it("If swap action is triggered, change data for "+t.join(",")+" fields",function(){for(var e in t)$("#"+t[e]+"14").next("span").click(function(){expect($("#"+t[e]+"14").val()).to.be("default value")})}),it("If swap action is triggered, again change data again for "+t.join(",")+" fields",function(){for(var e in t)$("#"+t[e]+"14").next("span").click(function(){expect($("#"+t[e]+"14").val()).to.be("not default value")})}),it("If garlicPriority is set to false, display default data and swap with persisted one",function(){e.set($("#input15").garlic("getPath"),"not default value"),$("#input15").garlic("retrieve",function(){expect($("#input15").hasClass("garlic-conflict-detected")).to.be(!0),expect($("#input15").next("span").hasClass("garlic-swap")).to.be(!0),expect($("#input15").val()).to.be("default value"),$("#input15").next("span").click(function(){expect(field.val()).to.be("not default value")})})})}),describe("Test input data destroy",function(){var t=["input","textarea","select","checkbox","radio"],a=["submit","reset"];it(a.join(";")+" button should destroy "+t.join(";")+" fields persisted data",function(){for(var i in a)for(var o in t)e.set($("#"+t[o]+"13").garlic("getPath"),"foo"),$("#"+a[i]+"13").click(function(){expect(e.has($("#"+t[o]+"13").garlic("getPath"))).to.be(!1)})}),it("Reset button should remove both text and localStorage, but only on current form",function(){e.set($("#input8").garlic("getPath"),"foo"),e.set($("#input9").garlic("getPath"),"foo"),expect(e.get($("#input8").garlic("getPath"))).to.be("foo"),expect(e.get($("#input9").garlic("getPath"))).to.be("foo"),$("#reset1").click(),$("#reset1").click(function(){expect($("#input9").val()).to.be(""),expect(e.has($("#input9").garlic("getPath"))).to.be(!1),expect($("#input8").val()).to.be("foo"),expect(e.get($("#input8").garlic("getPath"))).to.be("foo")})}),it("Destroy localStorage when garlic( 'destroy' ) is manually fired on an elem",function(){e.set($("#input10").garlic("getPath"),"foo"),$("#input10").garlic("destroy",function(){expect(e.has($("#input10").garlic("getPath"))).to.be(!1)})}),it("Do not destroy localStorage if data-destroy=false",function(){e.set($("#textarea40").garlic("getPath"),"foo"),$("#reset40").click(function(){expect(e.get($("#textarea40").garlic("getPath"))).to.be("foo")}),$("#submit40").click(function(t){expect(e.get($("#textarea40").garlic("getPath"))).to.be("foo"),t.preventDefault()}),$("#submit40").click(),$("#reset40").click()})}),describe("Final tests that clean/clear localStorage",function(){it("Test clean()",function(){e.set("garlic:test1","bar"),e.set("garlic:test2","bar"),e.set("test3","bar"),e.clean(),expect(e.get("garlic:test1")).to.be(null),expect(e.get("garlic:test2")).to.be(null),expect(e.get("test3")).to.be("bar")}),it("Test clear()",function(){e.clear(),expect(e.get("garlic")).to.be(null)})})})};