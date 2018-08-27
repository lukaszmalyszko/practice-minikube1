/*! grafana - v2.5.0 - 2015-10-28
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["lodash"],function(a){"use strict";return{metricAggTypes:[{text:"Count",value:"count"},{text:"Average",value:"avg"},{text:"Sum",value:"sum"},{text:"Max",value:"max"},{text:"Min",value:"min"},{text:"Extended Stats",value:"extended_stats"},{text:"Percentiles",value:"percentiles"},{text:"Unique Count",value:"cardinality"}],bucketAggTypes:[{text:"Terms",value:"terms"},{text:"Filters",value:"filters"},{text:"Date Histogram",value:"date_histogram"}],orderByOptions:[{text:"Doc Count",value:"_count"},{text:"Term value",value:"_term"}],orderOptions:[{text:"Top",value:"desc"},{text:"Bottom",value:"asc"}],sizeOptions:[{text:"No limit",value:"0"},{text:"1",value:"1"},{text:"2",value:"2"},{text:"3",value:"3"},{text:"5",value:"5"},{text:"10",value:"10"},{text:"15",value:"15"},{text:"20",value:"20"}],extendedStats:[{text:"Avg",value:"avg"},{text:"Min",value:"min"},{text:"Max",value:"max"},{text:"Sum",value:"sum"},{text:"Count",value:"count"},{text:"Std Dev",value:"std_deviation"},{text:"Std Dev Upper",value:"std_deviation_bounds_upper"},{text:"Std Dev Lower",value:"std_deviation_bounds_lower"}],intervalOptions:[{text:"auto",value:"auto"},{text:"10s",value:"10s"},{text:"1m",value:"1m"},{text:"5m",value:"5m"},{text:"10m",value:"10m"},{text:"20m",value:"20m"},{text:"1h",value:"1h"},{text:"1d",value:"1d"}],getOrderByOptions:function(b){var c=this,d=[];return a.each(b.metrics,function(a){"count"!==a.type&&d.push({text:c.describeMetric(a),value:a.id})}),this.orderByOptions.concat(d)},describeOrder:function(b){var c=a.findWhere(this.orderOptions,{value:b});return c.text},describeMetric:function(b){var c=a.findWhere(this.metricAggTypes,{value:b.type});return c.text+" "+b.field},describeOrderBy:function(b,c){var d=a.findWhere(this.orderByOptions,{value:b});if(d)return d.text;var e=a.findWhere(c.metrics,{id:b});return e?this.describeMetric(e):"metric not found"}}});