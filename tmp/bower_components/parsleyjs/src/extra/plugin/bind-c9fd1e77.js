window.ParsleyConfig=$.extend(!0,window.ParsleyConfig,{autoBind:!1}),window.ParsleyExtend=window.ParsleyExtend||{},window.ParsleyExtend=$.extend(window.ParsleyExtend,{_bindFields:function(){if("ParsleyForm"!==this.__class__)throw new Error("`_bindFields` must be called on a form instance");if("undefined"==typeof this.options.fields)throw new Error("bind-c9fd1e77.js plugin needs to have Parsley instantiated with fields");var e;this.fields=[];for(var t in this.options.fields)if(0!==$(t).length){e=$(t).parsley();for(var n in this.options.fields[t])"object"!=typeof this.options.fields[t][n]||this.options.fields[t][n]instanceof Array?e.addConstraint(n.toLowerCase(),this.options.fields[t][n]):e.addConstraint(n.toLowerCase(),this.options.fields[t][n].requirements,this.options.fields[t][n].priority||32)}return this.fields.push(e),this},_bindConstraints:function(){return this}});