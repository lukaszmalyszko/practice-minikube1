/*! grafana - v2.5.0 - 2015-10-28
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","jquery","kbn","lodash","moment"],function(a,b,c,d,e){"use strict";var f=a.module("grafana.services");f.factory("dashboardSrv",function(){function b(a,b){a||(a={}),!a.id&&a.version&&(a.schemaVersion=a.version),this.id=a.id||null,this.title=a.title||"No Title",this.originalTitle=this.title,this.tags=a.tags||[],this.style=a.style||"dark",this.timezone=a.timezone||"browser",this.editable=a.editable===!1?!1:!0,this.hideControls=a.hideControls||!1,this.sharedCrosshair=a.sharedCrosshair||!1,this.rows=a.rows||[],this.time=a.time||{from:"now-6h",to:"now"},this.timepicker=a.timepicker||{},this.templating=this._ensureListExist(a.templating),this.annotations=this._ensureListExist(a.annotations),this.refresh=a.refresh,this.snapshot=a.snapshot,this.schemaVersion=a.schemaVersion||0,this.version=a.version||0,this.links=a.links||[],this._updateSchema(a),this._initMeta(b)}var c=b.prototype;return c._initMeta=function(a){a=a||{},a.canShare=a.canShare===!1?!1:!0,a.canSave=a.canSave===!1?!1:!0,a.canStar=a.canStar===!1?!1:!0,a.canEdit=a.canEdit===!1?!1:!0,this.editable||(a.canEdit=!1,a.canDelete=!1,a.canSave=!1,this.hideControls=!0),this.meta=a},c.getSaveModelClone=function(){var b=a.copy(this);return delete b.meta,b},c._ensureListExist=function(a){return a||(a={}),a.list||(a.list=[]),a},c.getNextPanelId=function(){var a,b,c,d,e=0;for(a=0;a<this.rows.length;a++)for(c=this.rows[a],b=0;b<c.panels.length;b++)d=c.panels[b],d.id>e&&(e=d.id);return e+1},c.forEachPanel=function(a){var b,c,d;for(b=0;b<this.rows.length;b++)for(d=this.rows[b],c=0;c<d.panels.length;c++)a(d.panels[c],c,d,b)},c.getPanelById=function(a){for(var b=0;b<this.rows.length;b++)for(var c=this.rows[b],d=0;d<c.panels.length;d++){var e=c.panels[d];if(e.id===a)return e}return null},c.rowSpan=function(a){return d.reduce(a.panels,function(a,b){return a+b.span},0)},c.addPanel=function(a,b){var c=this.rowSpan(b),d=b.panels.length,e=12-c-a.span;a.id=this.getNextPanelId(),0>=e&&(1===d?(b.panels[0].span=6,a.span=6):2===d&&(b.panels[0].span=4,b.panels[1].span=4,a.span=4)),b.panels.push(a)},c.isSubmenuFeaturesEnabled=function(){return this.templating.list.length>0||this.annotations.list.length>0||this.links.length>0},c.getPanelInfoById=function(a){var b={};return d.each(this.rows,function(c){d.each(c.panels,function(d,e){return d.id===a?(b.panel=d,b.row=c,void(b.index=e)):void 0})}),b.panel?b:null},c.duplicatePanel=function(b,c){var e=d.indexOf(this.rows,c),f=a.copy(b);f.id=this.getNextPanelId(),delete f.repeat,delete f.repeatIteration,delete f.repeatPanelId,delete f.scopedVars;var g=this.rows[e];return g.panels.push(f),f},c.getNextQueryLetter=function(a){var b="ABCDEFGHIJKLMNOPQRSTUVWXYZ";return d.find(b,function(b){return d.every(a.targets,function(a){return a.refId!==b})})},c.addDataQueryTo=function(a,b){var c={refId:this.getNextQueryLetter(a)};b&&(c.datasource=b.name),a.targets.push(c)},c.removeDataQuery=function(a,b){a.targets=d.without(a.targets,b)},c.duplicateDataQuery=function(b,c){var d=a.copy(c);d.refId=this.getNextQueryLetter(b),b.targets.push(d)},c.moveDataQuery=function(a,b,c){d.move(a.targets,b,c)},c.formatDate=function(a,b){return e.isMoment(a)||(a=e(a)),b=b||"YYYY-MM-DD HH:mm:ss","browser"===this.timezone?e(a).format(b):e.utc(a).format(b)},c._updateSchema=function(a){var b,c,e,f=this.schemaVersion,g=[];if(this.schemaVersion=7,7!==f){if(2>f&&(a.services&&(a.services.filter&&(this.time=a.services.filter.time,this.templating.list=a.services.filter.list||[]),delete this.services),g.push(function(a){"graphite"===a.type&&(a.type="graph"),"graph"===a.type&&(d.isBoolean(a.legend)&&(a.legend={show:a.legend}),a.grid&&(a.grid.min&&(a.grid.leftMin=a.grid.min,delete a.grid.min),a.grid.max&&(a.grid.leftMax=a.grid.max,delete a.grid.max)),a.y_format&&(a.y_formats[0]=a.y_format,delete a.y_format),a.y2_format&&(a.y_formats[1]=a.y2_format,delete a.y2_format))})),3>f){var h=this.getNextPanelId();g.push(function(a){a.id||(a.id=h,h+=1)})}if(4>f&&g.push(function(a){"graph"===a.type&&(d.each(a.aliasYAxis,function(b,c){a.seriesOverrides=[{alias:c,yaxis:b}]}),delete a.aliasYAxis)}),6>f){var i=d.findWhere(a.pulldowns,{type:"annotations"});for(i&&(this.annotations={list:i.annotations||[]}),b=0;b<this.templating.list.length;b++){var j=this.templating.list[b];void 0===j.datasource&&(j.datasource=null),"filter"===j.type&&(j.type="query"),void 0===j.type&&(j.type="query"),void 0===j.allFormat&&(j.allFormat="glob")}}if(7>f&&(a.nav&&a.nav.length&&(this.timepicker=a.nav[0],delete this.nav),g.push(function(a){d.each(a.targets,function(b){b.refId||(b.refId=this.getNextQueryLetter(a))},this)})),0!==g.length)for(b=0;b<this.rows.length;b++){var k=this.rows[b];for(c=0;c<k.panels.length;c++)for(e=0;e<g.length;e++)g[e].call(this,k.panels[c])}}},{create:function(a,c){return new b(a,c)},setCurrent:function(a){this.currentDashboard=a},getCurrent:function(){return this.currentDashboard}}})});