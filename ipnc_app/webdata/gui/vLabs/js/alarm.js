var origAlarmSettings={};var alarmSettings={};function alarmValidateInputField(){var b=$("#inputNoFiles").val();var a=mkElem("p",{}," The attached file numbers must be between 1 and 20 ");if(alarmSettings.asmtpenable===1){if(b>20){showOverlaidMessageModal("Message",a);return false}}return true}function saveAlarmSettings(a){if(alarmValidateInputField()){sendSettings(alarmSettings,["alarmenable","alarmduration","motionenable","lostalarm","extalarm","alarmlocalstorage","darkblankalarm","exttriggeroutput","aftpenable","ftpfileformat","asmtpenable","attfileformat","asmtpattach","sdaenable","sdfileformat","alarmaudioplay","alarmaudiofile","exttriggerinput"],function(){checkReload(function(c,b){if(c){$("#updateModal").modal({backdrop:"static",keyboard:false});new modalProgress(b,function(){$("#updateModal").modal("hide");delayedExec(a)})}else{delayedExec(a)}})})}}function openAlarm(){var b="control-label control-label-wide control-label-left";function m(){return mkElem("br",{})}function p(){if(alarmSettings.alarmenable===0){return"disabled"}}function g(){if(alarmSettings.extalarm===0||alarmSettings.alarmenable===0){return"disabled"}}function j(){if(alarmSettings.aftpenable===0||alarmSettings.alarmenable===0){return"disabled"}}function d(){if(alarmSettings.asmtpenable===0||alarmSettings.alarmenable===0){return"disabled"}}function c(){if(alarmSettings.alarmaudioplay===0||alarmSettings.alarmenable===0){return"disabled"}}function l(q){return{checked:parseDecimal(origAlarmSettings[q])===1,"class":alarmSettings.alarmenable?"":"control-group-disabled",disabled:p(),change:function(s){var r=s?1:0;logDebug("changed",q,"to",r,"Originally was",origAlarmSettings[q]);alarmSettings[q]=r}}}function o(){var r=mkSelectionInput("Input","selectInput",alarmSettings.exttriggernames,{selectClass:"input-mini",selectedIndex:alarmSettings.exttriggerinput,disabled:g(),change:curry(updateFromCombo,alarmSettings,"exttriggerinput","selectInput")});var q=mkSelectionInput("Output","selectOutPut",alarmSettings.exttriggernames,{selectClass:"input-mini",selectedIndex:alarmSettings.exttriggeroutput,disabled:g(),change:curry(updateFromCombo,alarmSettings,"exttriggeroutput","selectOutPut")});var t=mkElem("div",{id:"panelleft","class":"span4"},r);var v=mkElem("div",{id:"panelRight","class":"span8"},q);var s=mkElemClass("div","form-inline",[t,v]);function u(){return[mkCheckButtonElem("Motion Detection","motiondetection",l("motionenable")),mkCheckButtonElem("Ethernet Lost","ethernetlost",l("lostalarm")),mkCheckButtonElem("Audio Alarm","audioalarm",l("darkblankalarm")),mkCheckButtonElem("External Triggers","externaltriggers",l("extalarm")),s]}return mkControlGroup("Alarm Trigger",u(),"")}function n(){var q=mkInlineSelectionInput("File format ","selectFtpFileFormat",alarmSettings.ftpfileformats,{selectClass:"input-small",selectedIndex:alarmSettings.ftpfileformat,disabled:j(),change:curry(updateFromCombo,alarmSettings,"ftpfileformat","selectFtpFileFormat")});var s=mkInlineSelectionInput("fileformat ","selectSmtpFileFormat",alarmSettings.smtpfileformats,{selectClass:"input-small",selectedIndex:alarmSettings.asmtpileformat,disabled:d(),change:curry(updateFromCombo,alarmSettings,"asmtpileformat","selectSmtpFileFormat")});var t=mkInlineSelectionInput("fileformat ","selectSdFileFormat",alarmSettings.sdfileformats,{selectClass:"input-small",selectedIndex:alarmSettings.asdfileformat,disabled:p(),change:curry(updateFromCombo,alarmSettings,"asdfileformat","selectSdFileFormat")});var x=origAlarmSettings.sdinsert===3;var C=x&&(alarmSettings.alarmenable===1);var r=C&&(alarmSettings.sdaenable===1);var D={callback:function(E){alarmSettings.alarmlocalstorage=E}};if(x){D.selectedIndex=0}var v=mkControlGroupAdvanced(mkCheckButtonElem("Save into Local Storage","checkSaveLocalStorage",{"class":b,disabled:!C,checked:alarmSettings.sdaenable===1,change:function(E){alarmSettings.sdaenable=E?1:0}}),[mkInlineSelectionInput("File Format ","selectSDFileFormat",alarmSettings.sdfileformats,{selectClass:"input-medium",disabled:!r,selectedIndex:alarmSettings.sdfileformat,change:curry(updateFromCombo,alarmSettings,"sdfileformat","selectSDFileFormat")}),mkRadioButtons("Storage Location","radioStorage",[{label:"SD/MMC",disabled:!x},{label:"USB",disabled:true},{label:"NAND",disabled:true}],D)],{"class":x?"":"control-group-disabled"});var y=mkInlineCheckButtonElem("Upload Via FTP ","upLoadViaFtp",l("aftpenable"));var z=mkInlineCheckButtonElem("Upload Via SMTP ","upLoadViaSmtp",l("asmtpenable"));var A=mkInputElem({disabled:p(),id:"inputNoFiles","class":"input-micro",value:alarmSettings.asmtpattach});var w=mkElem("label",{},"No of files");var u=mkInlineCheckButtonElem("Play Audio ","playAudio",l("alarmaudioplay"));var B=mkInlineSelectionInput("Select Alarm audio files ","selectAlarmAudio",alarmSettings.alarmaudiofiles,{selectClass:"input-medium",selectedIndex:alarmSettings.alarmaudiofile,disabled:c(),change:curry(updateFromCombo,alarmSettings,"alarmaudiofile","selectAlarmAudio")});return mkElemClass("div","form-horizontal form-inline",mkControlGroup("On Alarm",[y,q,m(),z,s,w,A,m(),v,u,B]))}function i(q){return $.extend({},q,{audiofiles:q.alarmaudiofilename.split(/;/g),ftpfileformats:q.ftpfileformatname.split(/;/g),alarmdurations:q.recordduration.split(/;/g),smtpfileformats:q.attfileformatname.split(/;/g),sdfileformats:q.sdfileformatname.split(/;/g),alarmaudiofiles:q.alarmaudiofilename.split(/;/g),exttriggernames:q.exttriggername.split(/;/g)})}function k(){var q=alarmSettings.sdinsert===3;if(alarmSettings.extalarm===1){$("#selectInput").removeAttr("disabled");$("#selectOutPut").removeAttr("disabled")}$("#selectAlarmDuration").removeAttr("disabled");$("#motiondetection").removeAttr("disabled");$("#ethernetlost").removeAttr("disabled");$("#audioalarm").removeAttr("disabled");$("#externaltriggers").removeAttr("disabled");$("#upLoadViaFtp").removeAttr("disabled");$("#upLoadViaSmtp").removeAttr("disabled");$("#inputNoFiles").removeAttr("disabled");$("#playAudio").removeAttr("disabled");if(q){$("#checkSaveLocalStorage").removeAttr("disabled")}if(alarmSettings.sdaenable===1&&q){$("#selectSDFileFormat").removeAttr("disabled")}if(alarmSettings.aftpenable===1){$("#selectFtpFileFormat").removeAttr("disabled")}if(alarmSettings.asmtpenable===1){$("#selectSmtpFileFormat").removeAttr("disabled")}if(alarmSettings.alarmaudioplay===1){$("#selectAlarmAudio").removeAttr("disabled")}}function a(){$.each(["#selectInput","#selectOutPut","#selectAlarmDuration","#selectFtpFileFormat","#inputNoFiles","#selectSmtpFileFormat","#selectAlarmAudio","#motiondetection","#ethernetlost","#audioalarm","#externaltriggers","#upLoadViaFtp","#upLoadViaSmtp","#playAudio","#selectSDFileFormat","#checkSaveLocalStorage"],function(q,r){$(r).attr("disabled","disabled")})}function f(){return mkElemClass("div","alarmForm"+(alarmSettings.alarmenable?"":" disabled"),[mkSelectionInput("Alarm Duration","selectAlarmDuration",alarmSettings.alarmdurations,{selectClass:"input-medium",selectedIndex:alarmSettings.alarmduration,disabled:p(),change:curry(updateFromCombo,alarmSettings,"alarmduration","selectAlarmDuration")}),o(),n()])}function h(){$("#externaltriggers").change(function(){if(alarmSettings.extalarm===0){$("#selectInput").removeAttr("disabled");$("#selectOutPut").removeAttr("disabled")}else{$("#selectInput").attr("disabled","disabled");$("#selectOutPut").attr("disabled","disabled")}});$("#upLoadViaFtp").change(function(){if(alarmSettings.aftpenable===0){$("#selectFtpFileFormat").removeAttr("disabled")}else{$("#selectFtpFileFormat").attr("disabled","disabled")}});$("#upLoadViaSmtp").change(function(){if(alarmSettings.asmtpenable===0){$("#selectSmtpFileFormat").removeAttr("disabled")}else{$("#selectSmtpFileFormat").attr("disabled","disabled")}});$("#playAudio").change(function(){if(alarmSettings.alarmaudioplay===0){$("#selectAlarmAudio").removeAttr("disabled")}else{$("#selectAlarmAudio").attr("disabled","disabled")}});$("#checkSaveLocalStorage").change(function(){if(alarmSettings.sdaenable===0){$("#selectSDFileFormat").removeAttr("disabled")}else{$("#selectSDFileFormat").attr("disabled","disabled")}})}function e(r){var q=$("#alarmFormContainer");if(r){q.removeClass("disabled");k();h()}else{a();q.addClass("disabled")}validateIntegerField("#inputNoFiles",0,99,curry(updateFromInput,alarmSettings,"asmtpattach","inputNoFiles"))}$.ajax({url:IPNC.serverURL+"ini.htm",success:function(s){origAlarmSettings=i(parseINI(s));alarmSettings=$.extend({},origAlarmSettings);var r=mkElemClass("div","form-horizontal",[mkPrependedInput("Camera",{id:"inputCamera",value:alarmSettings.title,disabled:"disabled","class":"input-medium"},"icon-camera",""),mkCheckButtonElem("Alarm Enable","alarmEnable",{checked:alarmSettings.alarmenable===1,"class":alarmSettings.alarmenable===1?"":"control-group-disabled",change:function(u){var t=u?1:0;logDebug("changed",alarmSettings.alarmenable,"to",t,"Originally was",origAlarmSettings.alarmenable);alarmSettings.alarmenable=t;e(u)}}),mkElem("div",{id:"alarmFormContainer"},f())]);var q=mkElemClass("div","form-actions",[mkButton("Ok","btn-primary",mkVerboseSaver(saveAlarmSettings,"Alarm settings saved to "+alarmSettings.title,openAlarm))," ",mkButton("Cancel",null,openAlarm)," "]);$("#mainbar").html(mkElem("div",{},[mkElem("h2",{},"Alarm"),r,mkSaveStatusDiv(),q]));adjustSidebarHeight();e(alarmSettings.alarmenable===1);showPendingStatus()}})}function closeAlarm(a){if(isDifferent(origAlarmSettings,alarmSettings)){$(".videoContainer").hide();showConfirmationModal("Message","Do you want to save the changes?",curry(saveAlarmSettings,a),a,true)}else{a()}};