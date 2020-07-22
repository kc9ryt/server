!function(e){var t={};function a(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=t,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/js/",a(a.s=277)}({152:function(e,a,r){r.p=OC.linkTo("files_sharing","js/dist/"),r.nc=btoa(OC.requestToken),window.OCP.Collaboration.registerType("file",{action:function(){return new Promise((function(e,a){OC.dialogs.filepicker(t("files_sharing","Link to a file"),(function(t){OC.Files.getClient().getFileInfo(t).then((function(t,a){e(a.id)})).fail((function(){a(new Error("Cannot get fileinfo"))}))}),!1,null,!1,OC.dialogs.FILEPICKER_TYPE_CHOOSE,"",{allowDirectoryChooser:!0})}))},typeString:t("files_sharing","Link to a file"),typeIconClass:"icon-files-dark"})},221:function(e,t){!function(){"use strict";var e=OC.Backbone.View.extend({tagName:"span",events:{click:"_onClick"},_dirInfo:void 0,render:function(e){if(this._dirInfo=e.dirInfo||null,null===this._dirInfo||"/"===this._dirInfo.path&&""===this._dirInfo.name)this.$el.removeClass("shared icon-public icon-shared"),this.$el.hide();else{var t=e.dirInfo&&e.dirInfo.shareTypes&&e.dirInfo.shareTypes.length>0;this.$el.removeClass("shared icon-public icon-shared"),t?(this.$el.addClass("shared"),-1!==e.dirInfo.shareTypes.indexOf(OC.Share.SHARE_TYPE_LINK)?this.$el.addClass("icon-public"):this.$el.addClass("icon-shared")):this.$el.addClass("icon-shared"),this.$el.show(),this.delegateEvents()}return this},_onClick:function(e){e.preventDefault();var t=new OCA.Files.FileInfoModel(this._dirInfo),a=this;t.on("change",(function(){a.render({dirInfo:a._dirInfo})}));var r=t.attributes.path+"/"+t.attributes.name;OCA.Files.Sidebar.open(r),OCA.Files.Sidebar.setActiveTab("sharing")}});OCA.Sharing.ShareBreadCrumbView=e}()},222:function(e,t,a){var r=a(223);"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,a(49).default)("57e7eec1",r,!0,{})},223:function(e,t,a){(t=a(46)(!1)).push([e.i,"div.crumb span.icon-shared,div.crumb span.icon-public{display:inline-block;cursor:pointer;opacity:0.2;margin-right:6px}div.crumb span.icon-shared.shared,div.crumb span.icon-public.shared{opacity:0.7}\n",""]),e.exports=t},277:function(e,a,r){"use strict";r.r(a);var n=r(50),i=r.n(n);_.extend(OC.Files.Client,{PROPERTY_SHARE_TYPES:"{"+OC.Files.Client.NS_OWNCLOUD+"}share-types",PROPERTY_OWNER_ID:"{"+OC.Files.Client.NS_OWNCLOUD+"}owner-id",PROPERTY_OWNER_DISPLAY_NAME:"{"+OC.Files.Client.NS_OWNCLOUD+"}owner-display-name"}),OCA.Sharing||(OCA.Sharing={}),OCA.Sharing.Util={_REMOTE_OWNER_REGEXP:new RegExp("^(([^@]*)@(([^@^/^\\s]*)@)?)([^[\\s/]*)([/](.*))?$"),attach:function(e){if(OC.Share&&"trashbin"!==e.id&&"files.public"!==e.id){var a=e.fileActions,r=e._createRow;e._createRow=function(e){var t=r.apply(this,arguments),n=OCA.Sharing.Util.getSharePermissions(e);return 0===e.permissions&&(delete a.actions.all.Comment,delete a.actions.all.Details,delete a.actions.all.Goto),t.attr("data-share-permissions",n),e.shareOwner&&(t.attr("data-share-owner",e.shareOwner),t.attr("data-share-owner-id",e.shareOwnerId),"shared-root"===e.mountType&&t.attr("data-permissions",e.permissions|OC.PERMISSION_UPDATE)),e.recipientData&&!_.isEmpty(e.recipientData)&&t.attr("data-share-recipient-data",JSON.stringify(e.recipientData)),e.shareTypes&&t.attr("data-share-types",e.shareTypes.join(",")),t};var n=e.elementToFile;e.elementToFile=function(e){var t=n.apply(this,arguments);if(t.sharePermissions=e.attr("data-share-permissions")||void 0,t.shareOwner=e.attr("data-share-owner")||void 0,t.shareOwnerId=e.attr("data-share-owner-id")||void 0,e.attr("data-share-types")&&(t.shareTypes=e.attr("data-share-types").split(",")),e.attr("data-expiration")){var a=parseInt(e.attr("data-expiration"));t.shares=[],t.shares.push({expiration:a})}return t};var i=e._getWebdavProperties;e._getWebdavProperties=function(){var e=i.apply(this,arguments);return e.push(OC.Files.Client.PROPERTY_OWNER_ID),e.push(OC.Files.Client.PROPERTY_OWNER_DISPLAY_NAME),e.push(OC.Files.Client.PROPERTY_SHARE_TYPES),e},e.filesClient.addFileInfoParser((function(e){var t={},a=e.propStat[0].properties,r=a[OC.Files.Client.PROPERTY_PERMISSIONS];r&&r.indexOf("S")>=0&&(t.shareOwner=a[OC.Files.Client.PROPERTY_OWNER_DISPLAY_NAME],t.shareOwnerId=a[OC.Files.Client.PROPERTY_OWNER_ID]);var n=a[OC.Files.Client.PROPERTY_SHARE_TYPES];return n&&(t.shareTypes=_.chain(n).filter((function(e){return e.namespaceURI===OC.Files.Client.NS_OWNCLOUD&&"share-type"===e.nodeName.split(":")[1]})).map((function(e){return parseInt(e.textContent||e.text,10)})).value()),t})),e.$el.on("fileActionsReady",(function(e){var t=e.$files;_.each(t,(function(e){var t=$(e),a=t.attr("data-share-types")||"",r=t.attr("data-share-owner");if(a||r){var n=!1,i=!1;_.each(a.split(",")||[],(function(e){(e=parseInt(e,10))===OC.Share.SHARE_TYPE_LINK||e===OC.Share.SHARE_TYPE_EMAIL?n=!0:(e===OC.Share.SHARE_TYPE_USER||e===OC.Share.SHARE_TYPE_GROUP||e===OC.Share.SHARE_TYPE_REMOTE||e===OC.Share.SHARE_TYPE_CIRCLE||e===OC.Share.SHARE_TYPE_ROOM)&&(i=!0)})),OCA.Sharing.Util._updateFileActionIcon(t,i,n)}}))})),e.$el.on("changeDirectory",(function(){OCA.Sharing.sharesLoaded=!1})),a.registerAction({name:"Share",displayName:function(e){if(e&&e.$file){var a=parseInt(e.$file.data("share-types"),10),r=e.$file.data("share-owner-id");if(a>=0||r)return t("core","Shared")}return t("core","Share")},altText:t("core","Share"),mime:"all",order:-150,permissions:OC.PERMISSION_ALL,iconClass:function(e,t){var a=parseInt(t.$file.data("share-types"),10);return a===OC.Share.SHARE_TYPE_EMAIL||a===OC.Share.SHARE_TYPE_LINK?"icon-public":"icon-shared"},icon:function(e,t){var a=t.$file.data("share-owner-id");if(a)return OC.generateUrl("/avatar/".concat(a,"/32"))},type:OCA.Files.FileActions.TYPE_INLINE,actionHandler:function(t,a){var r=parseInt(a.$file.data("share-permissions"),10);(isNaN(r)||r>0)&&e.showDetailsView(t,"sharing")},render:function(e,t,r){return 0!=(parseInt(r.$file.data("permissions"),10)&OC.PERMISSION_SHARE)||r.$file.attr("data-share-owner")?a._defaultRenderAction.call(a,e,t,r):null}});var s=new OCA.Sharing.ShareBreadCrumbView;e.registerBreadCrumbDetailView(s)}},_updateFileListDataAttributes:function(e,t,a){if("files"!==e.id)if(_.pluck(a.get("shares"),"share_with_displayname").length){var r=_.mapObject(a.get("shares"),(function(e){return{shareWith:e.share_with,shareWithDisplayName:e.share_with_displayname}}));t.attr("data-share-recipient-data",JSON.stringify(r))}else t.removeAttr("data-share-recipient-data")},_updateFileActionIcon:function(e,t,a){return!!(t||a||e.attr("data-share-recipient-data")||e.attr("data-share-owner"))&&(OCA.Sharing.Util._markFileAsShared(e,!0,a),!0)},_markFileAsShared:function(e,a,r){var n,i,s,o,l=e.find('.fileactions .action[data-action="Share"]'),d=e.data("type"),c=l.find(".icon"),u=e.attr("data-share-owner-id"),h=e.attr("data-share-owner"),p=e.attr("data-mounttype"),f="icon-shared";l.removeClass("shared-style"),"dir"===d&&(a||r||u)?(o=void 0!==p&&"shared-root"!==p&&"shared"!==p?OC.MimeType.getIconUrl("dir-"+p):r?OC.MimeType.getIconUrl("dir-public"):OC.MimeType.getIconUrl("dir-shared"),e.find(".filename .thumbnail").css("background-image","url("+o+")"),e.attr("data-icon",o)):"dir"===d&&("true"===e.attr("data-e2eencrypted")?(o=OC.MimeType.getIconUrl("dir-encrypted"),e.attr("data-icon",o)):p&&0===p.indexOf("external")?(o=OC.MimeType.getIconUrl("dir-external"),e.attr("data-icon",o)):(o=OC.MimeType.getIconUrl("dir"),e.removeAttr("data-icon")),e.find(".filename .thumbnail").css("background-image","url("+o+")")),a||u?(i=e.data("share-recipient-data"),l.addClass("shared-style"),s="<span>"+t("core","Shared")+"</span>",u?(n=t("core","Shared by"),s=OCA.Sharing.Util._formatRemoteShare(u,h,n)):i&&(s=OCA.Sharing.Util._formatShareList(i)),l.html(s).prepend(c),(u||i)&&(l.find(".avatar").each((function(){$(this).avatar($(this).data("username"),32)})),l.find("span[title]").tooltip({placement:"top"}))):l.html('<span class="hidden-visually">'+t("core","Shared")+"</span>").prepend(c),r&&(f="icon-public"),c.removeClass("icon-shared icon-public").addClass(f)},_formatRemoteShare:function(e,t,a){var r=OCA.Sharing.Util._REMOTE_OWNER_REGEXP.exec(e);if(!r||!r[6])return'<span class="avatar" data-username="'+i()(e)+'" title="'+a+" "+i()(t)+'"></span><span class="hidden-visually">'+a+" "+i()(t)+"</span> ";var n=r[2],s=r[4],o=r[5],l=a+" "+n;s&&(l+="@"+s),o&&(l+="@"+o);var d='<span class="remoteAddress" title="'+i()(l)+'">';return d+='<span class="username">'+i()(n)+"</span>",s&&(d+='<span class="userDomain">@'+i()(s)+"</span>"),d+="</span> "},_formatShareList:function(e){var a=this;return(e=_.toArray(e)).sort((function(e,t){return e.shareWithDisplayName.localeCompare(t.shareWithDisplayName)})),$.map(e,(function(e){return a._formatRemoteShare(e.shareWith,e.shareWithDisplayName,t("core","Shared with"))}))},markFileAsShared:function(e,a,r){var n,i,s,o,l=e.find('.fileactions .action[data-action="Share"]'),d=e.data("type"),c=l.find(".icon"),u=e.attr("data-share-owner-id"),h=e.attr("data-share-owner"),p=e.attr("data-mounttype"),f="icon-shared";l.removeClass("shared-style"),"dir"===d&&(a||r||u)?(o=void 0!==p&&"shared-root"!==p&&"shared"!==p?OC.MimeType.getIconUrl("dir-"+p):r?OC.MimeType.getIconUrl("dir-public"):OC.MimeType.getIconUrl("dir-shared"),e.find(".filename .thumbnail").css("background-image","url("+o+")"),e.attr("data-icon",o)):"dir"===d&&("true"===e.attr("data-e2eencrypted")?(o=OC.MimeType.getIconUrl("dir-encrypted"),e.attr("data-icon",o)):p&&0===p.indexOf("external")?(o=OC.MimeType.getIconUrl("dir-external"),e.attr("data-icon",o)):(o=OC.MimeType.getIconUrl("dir"),e.removeAttr("data-icon")),e.find(".filename .thumbnail").css("background-image","url("+o+")")),a||u?(i=e.data("share-recipient-data"),l.addClass("shared-style"),s="<span>"+t("core","Shared")+"</span>",u?(n=t("core","Shared by"),s=this._formatRemoteShare(u,h,n)):i&&(s=this._formatShareList(i)),l.html(s).prepend(c),(u||i)&&(l.find(".avatar").each((function(){$(this).avatar($(this).data("username"),32)})),l.find("span[title]").tooltip({placement:"top"}))):l.html('<span class="hidden-visually">'+t("core","Shared")+"</span>").prepend(c),r&&(f="icon-public"),c.removeClass("icon-shared icon-public").addClass(f)},getSharePermissions:function(e){return e.sharePermissions}},OC.Plugins.register("OCA.Files.FileList",OCA.Sharing.Util);r(221),r(222),r(152);r.p=OC.linkTo("files_sharing","js/dist/"),r.nc=btoa(OC.requestToken),window.OCA.Sharing=OCA.Sharing},46:function(e,t,a){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var a=function(e,t){var a=e[1]||"",r=e[3];if(!r)return a;if(t&&"function"==typeof btoa){var n=(s=r,o=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),"/*# ".concat(l," */")),i=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[a].concat(i).concat([n]).join("\n")}var s,o,l;return[a].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(a,"}"):a})).join("")},t.i=function(e,a,r){"string"==typeof e&&(e=[[null,e,""]]);var n={};if(r)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(n[s]=!0)}for(var o=0;o<e.length;o++){var l=[].concat(e[o]);r&&n[l[0]]||(a&&(l[2]?l[2]="".concat(a," and ").concat(l[2]):l[2]=a),t.push(l))}},t}},49:function(e,t,a){"use strict";function r(e,t){for(var a=[],r={},n=0;n<t.length;n++){var i=t[n],s=i[0],o={id:e+":"+n,css:i[1],media:i[2],sourceMap:i[3]};r[s]?r[s].parts.push(o):a.push(r[s]={id:s,parts:[o]})}return a}a.r(t),a.d(t,"default",(function(){return p}));var n="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!n)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},s=n&&(document.head||document.getElementsByTagName("head")[0]),o=null,l=0,d=!1,c=function(){},u=null,h="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function p(e,t,a,n){d=a,u=n||{};var s=r(e,t);return f(s),function(t){for(var a=[],n=0;n<s.length;n++){var o=s[n];(l=i[o.id]).refs--,a.push(l)}t?f(s=r(e,t)):s=[];for(n=0;n<a.length;n++){var l;if(0===(l=a[n]).refs){for(var d=0;d<l.parts.length;d++)l.parts[d]();delete i[l.id]}}}}function f(e){for(var t=0;t<e.length;t++){var a=e[t],r=i[a.id];if(r){r.refs++;for(var n=0;n<r.parts.length;n++)r.parts[n](a.parts[n]);for(;n<a.parts.length;n++)r.parts.push(C(a.parts[n]));r.parts.length>a.parts.length&&(r.parts.length=a.parts.length)}else{var s=[];for(n=0;n<a.parts.length;n++)s.push(C(a.parts[n]));i[a.id]={id:a.id,refs:1,parts:s}}}}function m(){var e=document.createElement("style");return e.type="text/css",s.appendChild(e),e}function C(e){var t,a,r=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(r){if(d)return c;r.parentNode.removeChild(r)}if(h){var n=l++;r=o||(o=m()),t=g.bind(null,r,n,!1),a=g.bind(null,r,n,!0)}else r=m(),t=S.bind(null,r),a=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else a()}}var O,v=(O=[],function(e,t){return O[e]=t,O.filter(Boolean).join("\n")});function g(e,t,a,r){var n=a?"":r.css;if(e.styleSheet)e.styleSheet.cssText=v(t,n);else{var i=document.createTextNode(n),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(i,s[t]):e.appendChild(i)}}function S(e,t){var a=t.css,r=t.media,n=t.sourceMap;if(r&&e.setAttribute("media",r),u.ssrId&&e.setAttribute("data-vue-ssr-id",t.id),n&&(a+="\n/*# sourceURL="+n.sources[0]+" */",a+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(n))))+" */"),e.styleSheet)e.styleSheet.cssText=a;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(a))}}},50:function(e,t,a){"use strict";var r=/["'&<>]/;e.exports=function(e){var t,a=""+e,n=r.exec(a);if(!n)return a;var i="",s=0,o=0;for(s=n.index;s<a.length;s++){switch(a.charCodeAt(s)){case 34:t="&quot;";break;case 38:t="&amp;";break;case 39:t="&#39;";break;case 60:t="&lt;";break;case 62:t="&gt;";break;default:continue}o!==s&&(i+=a.substring(o,s)),o=s+1,i+=t}return o!==s?i+a.substring(o,s):i}}});
//# sourceMappingURL=additionalScripts.js.map