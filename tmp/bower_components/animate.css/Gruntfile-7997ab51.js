module.exports=function(e){require("load-grunt-tasks")(e);var t;e.initConfig({pkg:e.file.readJSON("package.json"),concat:{dist:{src:["source/_base.css","source/**/*.css"],dest:"animate-eb9a51bc.css"}},autoprefixer:{options:{browsers:["last 2 versions","bb 10"]},no_dest:{src:"animate-eb9a51bc.css"}},cssmin:{minify:{src:["animate-eb9a51bc.css"],dest:"animate.min-0a10c6dd.css"}},watch:{css:{files:["source/**/*","animate-config.json"],tasks:["default"]}}}),t=function(){var t,n,i,r=e.file.readJSON("animate-config.json"),o=["source/_base.css"],s=0;for(t in r)if(r.hasOwnProperty(t)){n=r[t];for(i in n)n.hasOwnProperty(i)&&n[i]&&(o.push("source/"+t+"/"+i+".css"),s+=1)}e.log.writeln(s?s+(s>1?" animations":" animation")+" activated.":"No animations activated."),e.config("concat",{"animate-eb9a51bc.css":o}),e.task.run("concat")},e.registerTask("concat-anim","Concatenates activated animations",t),e.registerTask("default",["concat-anim","autoprefixer","cssmin"]),e.registerTask("dev",["watch"])};