function dictToArray(b){var a=[];$.each(b,function(e,d){var c=$.makeArray(d).slice(0);c.unshift(e);a.push(c)});return a}function mkSearchableView(b){function a(){var d=$("#inputSearchFilter").val();var c=d&&d.length>0?d:null;b.render($("#renderView"),c)}$("#mainbar").append(mkElemClass("div","row-fluid",mkInput({label:"search",id:"inputSearchFilter",change:a,prependIcon:"icon-search"}))).append(mkElem("div",{id:"renderView"}));b.fetch(function(){a()})}function openCMD(){var a=null;this.render=function(d,e){var c=a.split(/\n/g);var b=[];$.each(c,function(g,f){if(f.length>0){if(!e||f.match(e)){var h=f.split(/[. ]+/);b.push(h)}}});d.html(mkTable(["id","key","value"],b,{}))};this.fetch=function(b){$.ajax({url:IPNC.serverURL+"cmdlist.htm",success:function(c){a=c;b()}})};mkSearchableView(this)}function openSDGet(){$.ajax({url:IPNC.serverURL+"sdget.htm",success:function(a){$("#mainbar").html(a)}})}function openINI(){this.data=null;this.render=function(b,d){var a=data.split(/<br>/g);var c={};$.each(a,function(f,e){if(e.length>0){if(!d||e.match(d)){var g=e.split(/\=/);c[g[0]]=g[1]}}});b.html(mkTable(["key","value"],dictToArray(c),{}))};this.fetch=function(a){$.ajax({url:IPNC.serverURL+"ini.htm",success:function(b){data=b;a()}})};mkSearchableView(this)}$(document).ajaxSuccess(function(){$("#divStatus").html("<p>Ajax success</p>")}).ajaxError(function(){$("#divStatus").html("<p>Ajax Error</p>")}).ajaxSend(function(){$("#divStatus").html("<p>Ajax Sending</p>")});function startTest(){$("#divLogin").hide();var a=mkNavigator([{title:"INI",header:true,click:openINI},{title:"CMD",header:true,click:openCMD},{title:"SDGet",header:true,click:openSDGet}]);$("#sidebar").html(a.elem)}$(window).load(function(){$("#inputServerURL").val(IPNC.serverURL);$("#buttonLogin").click(function(){IPNC.serverURL=$("#inputServerURL").val();var b=$("#inputUserName").val(),a=$("#inputPassword").val();$.ajax({url:IPNC.serverURL+"ini.htm",async:false,username:b,password:a,success:startTest})})});