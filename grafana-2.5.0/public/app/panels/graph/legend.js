/*! grafana - v2.5.0 - 2015-10-28
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","kbn","jquery","jquery.flot","jquery.flot.time"],function(a,b,c,d){"use strict";var e=a.module("grafana.panels.graph");e.directive("graphLegend",["popoverSrv",function(a){return{link:function(c,e){function f(a){return a.parents("[data-series-index]").data("series-index")}function g(b){var e=d(b.currentTarget),g=f(e),h=m[g],i=c.$new();i.series=h,a.show({element:e,templateUrl:"app/panels/graph/legend.popover.html",scope:i})}function h(a){var b=d(a.currentTarget),e=f(b),g=m[e];c.toggleSeries(g,a)}function i(a){var b=d(a.currentTarget),c=b.data("stat");return c!==q.legend.sort&&(q.legend.sortDesc=null),q.legend.sortDesc===!1?(q.legend.sort=null,q.legend.sortDesc=null,void k()):(q.legend.sortDesc=!q.legend.sortDesc,q.legend.sort=c,void k())}function j(a){if(!q.legend[a])return"";var b='<th class="pointer" data-stat="'+a+'">'+a;if(q.legend.sort===a){var c=q.legend.sortDesc?"fa fa-caret-down":"fa fa-caret-up";b+=' <span class="'+c+'"></span>'}return b+"</th>"}function k(){if(p&&(e.append(o),o.on("click",".graph-legend-icon",g),o.on("click",".graph-legend-alias",h),o.on("click","th",i),p=!1),m=l,o.empty(),o.toggleClass("graph-legend-table",q.legend.alignAsTable===!0),q.legend.alignAsTable){var a="<tr>";a+='<th colspan="2" style="text-align:left"></th>',q.legend.values&&(a+=j("min"),a+=j("max"),a+=j("avg"),a+=j("current"),a+=j("total")),a+="</tr>",o.append(d(a))}for(q.legend.sort&&(m=b.sortBy(m,function(a){return a.stats[q.legend.sort]}),q.legend.sortDesc&&(m=m.reverse())),n=0;n<m.length;n++){var f=m[n];if((!q.legend.hideEmpty||!f.allIsNull)&&f.legend){var k='<div class="graph-legend-series';if(2===f.yaxis&&(k+=" pull-right"),c.hiddenSeries[f.alias]&&(k+=" graph-legend-series-hidden"),k+='" data-series-index="'+n+'">',k+='<div class="graph-legend-icon">',k+='<i class="fa fa-minus pointer" style="color:'+f.color+'"></i>',k+="</div>",k+='<div class="graph-legend-alias">',k+="<a>"+f.label+"</a>",k+="</div>",q.legend.values){var r=f.formatValue(f.stats.avg),s=f.formatValue(f.stats.current),t=f.formatValue(f.stats.min),u=f.formatValue(f.stats.max),v=f.formatValue(f.stats.total);q.legend.min&&(k+='<div class="graph-legend-value min">'+t+"</div>"),q.legend.max&&(k+='<div class="graph-legend-value max">'+u+"</div>"),q.legend.avg&&(k+='<div class="graph-legend-value avg">'+r+"</div>"),q.legend.current&&(k+='<div class="graph-legend-value current">'+s+"</div>"),q.legend.total&&(k+='<div class="graph-legend-value total">'+v+"</div>")}k+="</div>",o.append(d(k))}}}var l,m,n,o=d('<section class="graph-legend"></section>'),p=!0,q=c.panel;c.$on("render",function(){l=c.seriesList,l&&k()})}}}])});