function getVLC(a){if(window.document[a]){return window.document[a]}if(navigator.appName.indexOf("Microsoft Internet")==-1){if(document.embeds&&document.embeds[a]){return document.embeds[a]}}else{return document.getElementById(a)}}function registerIPNCEvent(event,handler){var vlc=getVLC("vlc");if(vlc){if(vlc.tiipnc.attachEvent){vlc.tiipnc.attachEvent(event,handler)}else{if(vlc.tiipnc.addEventListener){vlc.tiipnc.addEventListener(event,handler,true)}else{eval("vlc.on"+event+" = handler")}}}}function unregisterIPNCEvent(event,handler){var vlc=getVLC("vlc");if(vlc){if(vlc.tiipnc.detachEvent){vlc.tiipnc.detachEvent(event,handler)}else{if(vlc.tiipnc.removeEventListener){vlc.tiipnc.removeEventListener(event,handler,true)}else{eval("vlc.on"+event+" = null")}}}}DISABLE_PLUGIN=false;function get_prop(prop){var vlc=getVLC("vlc");if(DISABLE_PLUGIN){return}var subobj="tiipnc.";var retval=eval("vlc."+subobj+prop);return retval}function set_prop_string(prop,val){var vlc=getVLC("vlc");logDebug("vlc",vlc);if(DISABLE_PLUGIN){return}var subobj="tiipnc.";eval("vlc."+subobj+prop+'="'+val+'"')}function set_prop_int(prop,val){var vlc=getVLC("vlc");if(DISABLE_PLUGIN){return}var subobj="tiipnc.";eval("vlc."+subobj+prop+"="+val)}function get_prop_vlc(subobj,val){var vlc=getVLC("vlc");var smodule=subobj+".";document.getElementById(val).value=eval("vlc."+smodule+val)}function set_prop_vlc(subobj,val){var vlc=getVLC("vlc");var smodule=subobj+".";eval("vlc."+smodule+val+"="+document.getElementById(val).value)}function clear_field(a){document.getElementById(a).value=""}function getItemVal(a){return document.getElementById(a).value}function setItemVal(b,a){return document.getElementById(b).value=a}var PLUGIN_UI_MODE={OX:1,ONEX:2,ROI:3,MTN:5,EM:6,TZ:7,IMD:8,OC:9,SM:10,TD:11,SC:12};