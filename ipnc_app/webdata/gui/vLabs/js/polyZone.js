function polyZoneConstructor(B,v,m,p,a,D,I,o,q){var C="dmva"+v+"zone";var E=C+"enable";var x="dmva"+v+"numzones";var d="Field_of_View";var c=0,n=1,l=2;var t={uiMode:c,activeZone:0};function G(){return map(range(p),function(J){return 0})}var z={actZone:G(),findSlot:function(J){var K=0;for(;K<p;K++){if(this.actZone[K]===J){return K}}return -1},findPluginZone:function(J){return this.findSlot(J)+1},setZone:function(K,J){this.actZone[K]=J},addZone:function(J){this.setZone(this.findSlot(0),J);logDebug("Added zone",J,". New Plugin map:",this.showMap())},deleteZone:function(J){this.actZone[this.findSlot(J)]=0;var K=this.actZone;$.each(range(p),function(L,M){if(K[M]>J){K[M]--}});logDebug("Deleted zone",J,". New Plugin map:",this.showMap())},deleteAll:function(){this.actZone=G()},showMap:function(){return this.actZone.join(", ")}};var j=false;function e(J){if(t.uiMode===n){var K=/^[a-zA-Z][a-zA-Z0-9_]*$/;if(K.test($("#zoneLabelEdit"+J).val())){t.uiMode=c;delayedExec(function(){$("#zoneLabelAnchor"+J).html(y(J))})}else{if(!j){j=true;showOverlaidMessageModal("Message","Zone name should start with an alphabet, optionally followed by alpha numeric characters or underscores.",function(){j=false;$("#zoneLabelEdit"+J).focus()})}}}else{logError("Invalid UI state",t.uiMode)}}function k(J){function K(N){var M=$("#zoneLabelEdit"+J).val();if(M.length===0){$("#zoneLabelEdit"+J).val("zone"+J)}if(N.which===13){e(J)}else{B[L]=M;videoManager.setProperty("updateZoneName",M,q)}}if(t.uiMode===c){if(!h()){logDebug("Started editing zone:",J);var L=C+"_"+J+"_label";$("#zoneLabelAnchor"+J).html(mkInputElem({"class":"input-average",id:"zoneLabelEdit"+J,maxlength:15,change:K,value:B[L]}));validateZoneNameField("#zoneLabelEdit"+J,curry(filterSizeField,"#zoneLabelEdit"+J,15,false));$("#zoneLabelEdit"+J).focus().blur(curry(e,J));t.uiMode=n;videoManager.setProperty("activeZoneNo",z.findPluginZone(J),q)}}else{logError("Invalid UI state",t.uiMode)}}function y(J){var K=C+"_"+J+"_label";return mkElem("span",{id:"zoneLabel"+J},B[K]).click(curry(k,J))}function H(){var J=map(range(p),function(L,M){var K=z.actZone[L];if(K>0){return isBitSet(B[E],K-1)?"1":"0"}else{return"0"}});videoManager.setProperty("enableZones",J.join(","),q)}this.updateZoneEnabledStates=H;function s(J){return map(range(J),function(L){var K=L+1;return[mkCheckButtonElem("","zoneEnable"+K,{checked:isBitSet(B[E],L),change:function(M){if(t.uiMode!==l){B[E]=changeBitOf(B[E],L,M);H()}else{delayedExec(b)}}}),mkElemId("div","zoneLabelAnchor"+K,y(K))]})}this.addZone=curry(A,false);function h(){return(B[x]===1&&B[C+"_1_label"]===d)}function F(L){B[x]+=1;var J=B[x];var M=C+"_"+J+"_label";var K=L?L:"myZone"+J;B[M]=K;B[E]=changeBitOf(B[E],J-1,true);z.addZone(J);return J}function A(L){uncheckModifyBox(q);if(t.uiMode===c){if(B[x]<p){if(h()){showOverlaidMessageModal("Message","Please delete "+d+" to add new zones")}else{t.uiMode=l;var J=F(L);var K=L?L:"myZone"+J;videoManager.setProperty("addZone",K,q);b();H();g(J-1)}}else{showOverlaidMessageModal("Message","You can only add upto "+p+" zones.")}}else{if(t.uiMode===l){if(B[x]<p){showOverlaidMessageModal("Message","Please complete the current zone")}else{showOverlaidMessageModal("Message","Can add maximum of "+p+" zones.")}}}}function f(){return mkTable(["Enable","Zone Label"],s(B[x]),{tableClass:"headerLight headerCentered contentCentered"})}function g(K){var J=K>=0?K+1:-1;logDebug("Selecting zone",J);t.activeZone=J;videoManager.setProperty("activeZoneNo",z.findPluginZone(J),q);if(J!==0){$("#zoneTableAnchor tr").removeClass("selected");$("#zoneLabelAnchor"+J).parents("#zoneTableAnchor tr").addClass("selected")}r(K>=0)}this.deleteZone=function(){uncheckModifyBox(q);function K(N,P){var O=pad2(P+1);B[C+N+"_x"+O]=B[C+(N+1)+"_x"+O];B[C+N+"_y"+O]=B[C+(N+1)+"_y"+O]}var L=t.activeZone;if(L>=1){videoManager.setProperty("deleteZone",z.findPluginZone(L),q);z.deleteZone(L);for(var J=L;J<B[x];J++){B[C+J+"_roi_numsides"]=B[C+(J+1)+"_roi_numsides"];var M=B[C+J+"_roi_numsides"];$.each(range(M),curry(K,J));B[C+"_"+J+"_label"]=B[C+"_"+(J+1)+"_label"]}B[x]--;B[E]=mkBitMap(range(B[x]),function(O){var N=(O<(L-1))?O:O+1;return isBitSet(B[E],N)?1<<O:0});H();t.activeZone=0;b();g(-1);logDebug("Currently active zone:",t.activeZone);t.uiMode=c}};this.deleteAllZones=function(){showOverlaidConfirmationModal("Message","Do you really want to delete all zones?",function(){uncheckModifyBox(q);t.uiMode=c;B[E]=0;B[x]=0;videoManager.setProperty("deleteZone",-1,q);z.deleteAll();b()},null,true)};function r(K){var J=B[x]>0;enableInput(".deleteZoneBtn",J&&K);enableInput(".deleteAllZonesBtn",J)}function u(J){if(t.uiMode!==l){g(J)}else{showOverlaidMessageModal("Message","Please finish adding the current zone first.")}}function b(){$("#zoneTableAnchor").html(f());$.each(range(B[x]),function(K){var J=K+1;$("#zoneLabelAnchor"+J).parents("#zoneTableAnchor tr").click(curry(u,K))})}this.updateZoneTable=b;this.onZoneCompleted=function(J){logDebug("onZoneCompleted",J);if(t.uiMode===l){t.uiMode=c}else{logWarn("Rcvd zone completed while not adding zone.")}};this.checkAndSave=function(J){if(t.uiMode===l){showOverlaidMessageModal("Message","Please finish adding the current zone first.")}else{if(B[x]===0){showOverlaidConfirmationModal("Message",a,function(){var L=F(d);var M=["4;"+d+";"+map(range(0,m),function(N){switch(N){case 0:return"0:0";case 1:return[D,0].join(":");case 2:return[D,I].join(":");case 3:return[0,I].join(":");default:return"0:0"}}).join(";")];logDebug("fovPolyArray",M);i(M);videoManager.setProperty("polyArray",M.join(","),q);videoManager.setProperty("uimode",o,q);b();H();g(L-1);J()},null,true)}else{var K=videoManager.getProperty("polyArray",q);i(K.split(","));J()}}};function i(J){$.each(range(B[x]),function(N){var K=N+1;var M=J[z.findPluginZone(K)-1];var L=M.split(";");B[C+K+"_roi_numsides"]=parseDecimal(L[0]);B[C+"_"+K+"_label"]=L[1];$.each(range(m),function(Q){var P=pad2(Q+1);var O=L[2+Q].split(":");B[C+K+"_x"+P]=parseDecimal(O[0]);B[C+K+"_y"+P]=parseDecimal(O[1])})})}function w(){var J=B[x];$.each(range(J),function(L){var K=L+1;z.setZone(L,K)})}w()}function sendXYSettingsForZone(d,f,b,e,g){if(e<b){var a=e+1;var c=$.map(range(16),function(h,k){var j=pad2(h+1);return["dmva"+f+"zone"+a+"_x"+j,"dmva"+f+"zone"+a+"_y"+j]});sendSettings(d,c,function(){sendXYSettingsForZone(d,f,b,e+1,g)})}else{if(g){g()}}};