define(["template","dialog","constant","report/edit/canvas/edit-comp-model","report/edit/canvas/chart-setting/chart-setting-view","report/edit/canvas/comp-setting-default-template","report/edit/canvas/comp-setting-time-template","report/edit/canvas/comp-setting-liteolap-template","report/edit/canvas/comp-setting-chart-template","report/edit/canvas/comp-setting-caselect-template","report/edit/canvas/vui-setting-select-template","report/edit/canvas/ecui-input-tree-setting-template","report/edit/canvas/default-selected-time-setting-template","report/edit/canvas/default-selected-range-time-setting-template","report/edit/canvas/data-format-setting-template","report/edit/canvas/comp-relation-event-setting-template","common/float-window","report/edit/canvas/chart-icon-list-template","report/edit/canvas/norm-info-depict-template","report/edit/canvas/filter-blank-line-template"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){function u(a,b){var c=a.oLapElementId,d="[data-id="+c+"]",e=b.find(d);if(1==e.length){d="ind"==a.oLapElemenType?".j-line-cand-ind":".j-line-cand-dim";var f=a.$item.clone();f.find(".j-delete").remove(),b.find(d).append(f)}else if(2==e.length){var g=e.eq(1).find(".j-delete");1==g.length&&g.remove()}}function v(a){var b=c.SINGLE_CHART,d=c.COMBINATION_CHART;return $.isInArray(a,b)?0:$.isInArray(a,d)?1:void 0}return Backbone.View.extend({events:{"click .j-comp-setting .j-delete":"deleteCompAxis","click .j-report":"removeCompEditBar","click .j-set-default-time":"openTimeSettingDialog","click .j-set-data-format":"getDataFormatList","click .j-set-relation":"setCompRelationEvent","click .j-norm-info-depict":"getNormInfoDepict","click .item .j-icon-chart":"showChartList","change .select-type":"selectTypeChange","change .select-calendar-type":"selectCalendarTypeChange","click .j-others-operate":"getFilterBlankLine","change .j-select-setAll":"changeSelectAll"},changeSelectAll:function(a){var b=this,c=$(a.target),d=c.attr("data-comp-id"),e=c[0].checked,f=c.attr("value");b.selectSetAll(e,f,d)},setCompRelationEvent:function(){function a(){var a=$(".j-report").width(),b=$(".di-o_o-body").height(),d=$(".comp-realtion-box").width(),e=$(".comp-realtion-box").height();g=d/a,h=e/b;var i=$(".j-report").find(".j-component-item");i.each(function(){f($(this))});var j=$('input[name="comp-thumbnail"]');j.unbind().click(function(){$(this).attr("checked")?$(this).removeAttr("checked"):$(this).attr("checked","checked")});var k=$(".j-comp-relation-event-out-param");c(k),k.unbind().change(function(){c(k)})}function c(a){a.val();var b=a.find("option:selected").attr("dimGroup");"false"===b?($(".span-level").hide(),$(".j-comp-relation-event-out-param-level").hide()):($(".span-level").show(),$(".j-comp-relation-event-out-param-level").show())}function d(c){if(!c.xAxis||!c.yAxis)return b.alert("请先拖入指标和维度"),void 0;if(c.xAxis.length<0||c.yAxis.length<0)return b.alert("请先拖入指标和维度"),void 0;var d={};d.outParamDim=c.xAxis,d.selectDimId=n.outParam?n.outParam.dimId:null,d.selectLevel=n.outParam?n.outParam.level:null,d.selectDimName=n.outParam?n.outParam.dimName:null;var f={1:"当前级",2:"下一级"};d.outParamLevel=f;var g;g=p.render(d),b.showDialog({title:"组件关联关系设置",content:g,dialog:{width:550,height:550,resizable:!1,buttons:[{text:"提交",click:function(){e($(this))}},{text:"取消",click:function(){$(this).dialog("close")}}]}}),a()}function e(a){var b=$('input[name="comp-thumbnail"]'),c=[];b.each(function(){var a=$(this),b={};b.checked=a.attr("checked")?!0:!1,b.id=$(this).val(),c.push(b)});for(var d=0,e=c.length;e>d;d++){var f=$.getTargetElement(c[d].id,m),g={event:{rid:k,name:"rowselect"},action:{name:"sync"}};if(f.interactions){var h=$.hasRelation(k,f);h>-1&&f.interactions.splice(h,1),c[d].checked&&f.interactions.push(g)}else f.interactions=[],f.interactions.push(g)}n.outParam||(n.outParam={});var j=$(".j-comp-relation-event-out-param").val().split("$");n.outParam.dimId=j[0],n.outParam.dimName=j[1],n.outParam.level=$(".j-comp-relation-event-out-param-level").val(),i.model.canvasModel.saveJsonVm(function(){a.dialog("close"),i.canvasView.showReport.call(i.canvasView)})}function f(a){var b=a.width(),c=a.height(),d=parseInt(a.css("left")),e=parseInt(a.css("top")),f=b*g,i=c*h,l=e*h,n=d*g,p=a.attr("data-component-type"),q=a.attr("data-comp-id"),r=a.attr("report-comp-id"),s=$.getTargetElement(q,m);if(s){var t=s.clzType,u="";switch(p){case"CHART":u="chart";break;case"TABLE":u="table"}var v="",w="";if("COMPONENT"===t){if(j!==q&&!$.isInArray(r,o)){var x;s&&(x=$.getEntityInteractionsId(s),$.isInArray(k,x)&&(w=" checked=checked")),v='<input type="checkbox" name="comp-thumbnail" '+w+' value="'+q+'" />'}var y=$(['<div class="comp-thumbnail">',v,'<div class="comp-thumbnail-pic">','<img src="src/css/img/thumbnail-',u,'.png"/>',"</div>","</div>"].join(""));y.css({width:f+"px",height:i+"px",left:n+"px",top:l+"px"}),y.attr("data-component-type",p),y.attr("data-mold",a.attr("data-mold")),y.attr("data-comp-id",q),$(".comp-realtion-box").append(y)}}}var g,h,i=this,j=i.getActiveCompId(),k=i.getActiveReportCompId(),l=this.model.get("canvasModel").reportJson,m=l.entityDefs,n=$.getTargetElement(j,m),o=$.getEntityInteractionsId(n);i.model.getCompAxis(j,d)},selectTypeChange:function(a){var b=$(a.target),c=b.val(),d=this.model.canvasModel.reportJson.entityDefs,e=b.attr("data-comp-id");this.canvasView._component.dispose();for(var f=$.trim(b.parent().parent().find(".j-line-x").find(".j-item-text").text()).split("（")[0],g=0,h=d.length;h>g;g++)e!==d[g].compId||"ECUI_SELECT"!==d[g].clzKey&&"ECUI_MULTI_SELECT"!==d[g].clzKey||!d[g].dataOpt||(d[g].dataOpt.textAll="全部"+f,d[g].dataOpt.selectAllText="全部"+f,d[g].clzKey=c);var i=this.canvasView.model.$reportVm.find("[data-component-type=SELECT]");i.each(function(){var a=$(this);a.attr("data-comp-id")===e&&a.attr("data-mold",c)});var j=this.canvasView.model.$reportVm.find("[data-component-type=SELECT]"),k=b.parent().find(".select-default"),l=k.find(".select-default-value");j.each(function(){var a=$(this);a.attr("data-comp-id")===e&&(a.attr("data-mold",c),"ECUI_SELECT"==c?(k.css("display","inline-block"),$(this).attr("data-set-all",l[0].checked)):($(this).removeAttr("data-set-all"),b.parent().find(".select-default").hide()))}),this.model.canvasModel.saveJsonVm(this.canvasView.showReport.call(this.canvasView))},selectCalendarTypeChange:function(a){function c(a){if(null===a.xAxis||a.xAxis.length<=0)return"CAL_SELECT"===f?e.val("DOUBLE_CAL_SELECT"):e.val("CAL_SELECT"),b.alert("请选维度"),void 0;d.canvasView._component.dispose();for(var c=0,i=g.length;i>c;c++)if(h===g[c].compId){var j=e.attr("data-comp-type"),k=d.model.canvasModel.compBoxModel.getComponentData(j);"CAL_SELECT"===f?g[c].clzKey=k.entityDescription.clzKey:"DOUBLE_CAL_SELECT"===f&&(g[c].clzKey=k.entityDescriptionRangeCalendar.clzKey,g[c].dataSetOpt.rangeTimeTypeOpt=k.entityDescriptionRangeCalendar.dataSetOpt.rangeTimeTypeOpt)}var l=d.canvasView.model.$reportVm.find("[data-component-type=TIME_COMP]");l.each(function(){var a=$(this);a.attr("data-comp-id")===h&&a.attr("data-mold",f)}),d.model.canvasModel.saveJsonVm(d.canvasView.showReport.call(d.canvasView))}var d=this,e=$(a.target),f=e.val(),g=this.model.canvasModel.reportJson.entityDefs,h=e.attr("data-comp-id"),i=d.getActiveCompId();d.model.getCompAxis(i,c)},initialize:function(a){this.model=new d({canvasModel:a.canvasView.model,reportId:a.reportId}),this.canvasView=a.canvasView,this.$conCompSetting=this.$el.find(".j-con-comp-setting")},initCompConfigBar:function(a){var b=this,c=$(a.target),d=c.parents(".j-component-item"),e=d.attr("data-comp-id"),f=d.attr("report-comp-id"),g=d.attr("data-component-type"),h=d.attr("data-mold"),i=d.attr("data-set-all");b.model.compId=e,b.model.compType=g,b.model.compAll=i,b.hideEditBar(),b.model.getCompAxis(e,function(a){a.compId=e;var c=b._adapterEditCompTemplate(g);a.compType=g,a.compAll=i,a.reportCompId=f,h&&(a.compMold=h);var j=c.render(a),k=b.$el.find(".j-con-comp-setting");k.html(j),b.initLineAccept(g),d.addClass("active").mouseout(),b.initSortingItem(),b.canvasView.parentView.ueView.setSize(),b._initChartSettingView(k[0])})},_adapterEditCompTemplate:function(a){var b;switch(a){case"TIME_COMP":b=g;break;case"LITEOLAP":b=h;break;case"CHART":b=i;break;case"SELECT":b=k;break;case"SINGLE_DROP_DOWN_TREE":b=l;break;case"CASCADE_SELECT":b=j;break;default:b=f}return b},initLineAccept:function(a){var b,c=this,d=".j-olap-element",e=".j-time-dim";switch(a){case"TIME_COMP":b=e;break;case"LITEOLAP":b=d;break;default:b=d}$(".j-comp-setting-line",this.el).droppable({accept:b,drop:function(b,d){var e=$(this);c.addCompAxis(d,e,a),e.removeClass("active"),"y"==e.attr("data-axis-type")&&$(".norm-empty-prompt").hide()},out:function(){$(this).removeClass("active")},over:function(){$(this).addClass("active")},helper:"clone"})},initSortingItem:function(){var a=this,b={};$(".j-line-x,.j-line-y",this.el).sortable({items:".j-root-line,.j-cal-ind,.j-group-title",axis:"x",start:function(a,c){c.placeholder.height(0),b.source=c.item.parent().find("[data-id]").index(c.item)},stop:function(c,d){var e=d.item.parent(),f=e.parent().attr("data-comp-id");b.target=e.find("[data-id]").index(d.item),b.type=e.attr("data-axis-type"),b.source!=b.target&&a.model.sortingCompDataItem(f,b,function(){a.canvasView.showReport()})}})},deleteCompAxis:function(a){var b=this,c=$(a.target),d=c.parent().parent(),e=d.parent().attr("data-comp-id");if("SELECT"==d.parent().attr("data-comp-type")){var f=d.parent().find('input[class ^= "select-default-value"]');f.removeAttr("checked");var g=f[0].checked,h=f.attr("value");b.selectSetAll(g,h,e),d.next().find(".select-default-name").text("全部"),d.next().find(".select-default-value").val("全部")}var i,j;i=".j-comp-setting";var k=c.parents(i),e=k.attr("data-comp-id"),l=k.attr("data-comp-type");i=".j-comp-setting-line",j="data-axis-type";var m=c.parents(i).attr(j);j="data-id";var n=c.parent().attr(j);b.model.deleteCompAxis(e,m,n,function(){var a=c.parent(),d=a.attr("data-id");if(c.parent().remove(),b.afterDeleteCompAxis({oLapElementId:d,compType:l,axisType:m,$item:c.parent()}),b.canvasView.showReport(),0==b.$el.find("[data-id="+d+"]").length){var e=" .j-root-line[data-id="+d+"]";$(".j-con-org-ind"+e).addClass("j-can-to-dim"),$(".j-con-org-dim"+e).addClass("j-can-to-ind")}})},afterDeleteCompAxis:function(a){if(void 0!==a.compType){var b=this._switchCompTypeWord(a.compType);this["afterDelete"+b+"CompAxis"](a)}},afterDeleteLiteOlapCompAxis:function(a){var b=this,c=b.$el.find(".j-comp-setting"),d=a.axisType;"xys".indexOf(d)>-1;var e="[data-id="+a.oLapElementId+"]",f=c.find(e);e=".j-delete";var g='<span class="icon-letter j-delete">×</span>';1==f.length&&0==f.find(e).length&&f.append(g)},afterDeleteTimeCompAxis:function(a){for(var b=this.model.canvasModel.compBoxModel,c=b.getComponentData("TIME_COMP"),d=this.getActiveCompId(),e=this.canvasView.editCompView.model,f=e.getCompDataById(d)[0],g=a.$item.attr("data-name"),h=c.switchLetter(g),i=f.dataSetOpt.timeTypeList,j=0,k=i.length;k>j;j++)if(h==i[j].value){i.splice(j,1);break}delete f.dataSetOpt.timeTypeOpt[h],delete f.dateKey[h],this.model.canvasModel.saveReport()},afterDeleteCascadeSelectCompAxis:function(){},afterDeleteChartCompAxis:function(){},afterDeleteTableCompAxis:function(){},afterDeleteSelectCompAxis:function(){},addCompAxis:function(a,d){var e,f,g,h=a.helper,i=this,j=b.alert;e=".j-comp-setting";var k=d.parents(e),l=k.attr("data-comp-id"),m=k.attr("data-comp-type"),n=h.clone().attr("style",""),o=$(".select-default");if("SELECT"===m){var p=$('input[class ^= "select-default-value"]');p.removeAttr("checked");var q=$(".select-default-name"),r=p[0].checked,s=p.attr("value");i.selectSetAll(r,s,l)}if($.isInArray(m,c.DRAG_SINGLE_DIM)){if($(".data-axis-line .item").length>=1)return j("只能拖一个维度"),void 0}else if($.isInArray(m,c.DRAG_SINGLE_DIMGROUP)&&("item-group"!==h.attr("data-group")||$(".data-axis-line .item").length>=1))return j("只能拖一个维度组"),void 0;var t=n.find("span");if(n.hasClass("j-group-title")?n.addClass("item"):t.eq(1).remove(),a.draggable.removeClass("j-can-to-dim j-can-to-ind"),e=".j-data-sources-setting-con-ind",g=a.draggable.parents(e),g=g.length?"ind":"dim",i._addDimOrIndDomToXY(n,g,m)){f=i.canvasView.parentView.model.get("currentCubeId");var u={cubeId:f,oLapElementId:n.attr("data-id"),axisType:d.attr("data-axis-type")};n.removeClass("j-olap-element").addClass("c-m"),i.model.addCompAxis(l,u,function(){if(n.removeClass("j-time-dim"),d.append(n),i.afterAddCompAxis({compType:m,oLapElemenType:g,oLapElementId:u.oLapElementId,axisType:u.axisType,$item:n}),"SELECT"==m&&o.is(":visible")){var a=q.text(),b=d.find("span").eq(1).text().split("（")[0];p.val(a+b),q.text(a+b)}i.canvasView.showReport(),i.canvasView.parentView.ueView.setSize()})}},_addDimOrIndDomToXY:function(a,c,d){b.alert;var e;if("ind"===c&&"CHART"===d){var f=$(".j-line-y").find("div"),g=$(f[0]).find(".icon-chart").attr("chart-type"),h=v(g);0!==h&&(g="column"),e='<span class="icon-chart '+g+' j-icon-chart" chart-type="'+g+'" ></span>',a.prepend(e)}return e='<span class="icon hide j-delete" title="删除">×</span>',a.append(e),$(a.find(".j-item-text")).removeClass("ellipsis").addClass("icon-font"),!0},showChartList:function(a){function b(a,b,c){var d=a.find(".icon-chart"),e=d.attr("chart-type");c?0===v(e)&&(d.removeClass(e).addClass(b),d.attr("chart-type",b)):(d.removeClass(e).addClass(b),d.attr("chart-type",b))}var d=this,e=$(a.target),f=".j-comp-setting",g=e.parents(f),h=g.attr("data-comp-id"),i=e.parent().attr("data-id"),j=e.attr("chart-type"),k=c.CHART_TYPES;for(var l in k)k[l]=!1;k[j]=!0,d.chartList?d.chartList.redraw(r.render(k)):d.chartList=new q({direction:"vertical",content:r.render(k)}),$(".comp-setting-charticons span").unbind(),$(".comp-setting-charticons span").click(function(){var a=$(this),c=a.attr("chart-type");e.parent().siblings("div"),d.model.changeCompItemChartType(h,i,c,function(){var a=$(".j-line-y").find("div"),f=$(".j-line-cand-ind").find("div"),g=v(c);a.each(function(){b($(this),c,g)}),f.each(function(){b($(this),c,g)}),e.removeClass(j).addClass(c),e.attr("chart-type",c),d.chartList.hide(),d.canvasView.showReport()})}),d.chartList.show($(a.target).parent())},afterAddCompAxis:function(a){if(void 0!==a.compType){var b=this._switchCompTypeWord(a.compType);this["afterAdd"+b+"CompAxis"](a)}},afterAddLiteOlapCompAxis:function(a){var b=this,c=b.$el.find(".j-comp-setting"),d="xys".indexOf(a.axisType)>-1;d&&u(a,c)},afterAddChartCompAxis:function(a){var b=this,c=b.$el.find(".j-comp-setting"),d="xys".indexOf(a.axisType)>-1;d&&u(a,c)},afterAddSelectCompAxis:function(a){for(var b=this.getActiveCompId(),c=a.$item.attr("data-id"),d=this.canvasView.editCompView.model,e=d.canvasModel.reportJson.entityDefs,f=$.trim(a.$item.find(".j-item-text").text().split("（")[0]),g=0,h=e.length;h>g;g++)e[g].compId!=b||"ECUI_MULTI_SELECT"!==e[g].clzKey&&"ECUI_SELECT"!==e[g].clzKey||!e[g].dataOpt||(e[g].dimId=c,e[g].dataOpt.textAll="全部"+f,e[g].dataOpt.selectAllText="全部"+f);this.model.canvasModel.saveJsonVm()},afterAddSingleDropDownTreeCompAxis:function(a){for(var b=this.getActiveCompId(),c=a.$item.attr("data-id"),d=this.canvasView.editCompView.model,e=d.canvasModel.reportJson.entityDefs,f=0,g=e.length;g>f;f++)e[f].compId==b&&(e[f].dimId=c);this.model.canvasModel.saveJsonVm()},afterAddCascadeSelectCompAxis:function(a){for(var b=this.getActiveCompId(),c=a.$item.attr("data-id"),d=this.canvasView.editCompView.model,e=d.canvasModel.reportJson.entityDefs,f=window.dataInsight.main.model.attributes.dimList,g=[],h=[],i=0;i<f.length;i++)f[i].id===a.oLapElementId&&(g=f[i].levels);if(0===g.length)j={};else for(var i=0;i<g.length;i++){var j={};j.value=g[i].caption,j.text=j[i+1],h.push(j)}for(var i=0,k=e.length;k>i;i++)e[i].compId==b&&(e[i].dimId=c,e[i].selectAllDim=h);this.model.canvasModel.saveJsonVm()},afterAddTableCompAxis:function(){},afterAddTimeCompAxis:function(a){var b,c,d=this.model.canvasModel.compBoxModel,e=d.getComponentData("TIME_COMP"),f=this.getActiveCompId(),g=this.canvasView.editCompView.model,h=g.getCompDataById(f)[0],i=a.$item.attr("data-name"),j=a.$item.attr("data-id"),k=e.timeTypeConfig,l=e.switchLetter(i);b=k.timeTypeList[l],c=k.timeTypeOpt[l],h.dataSetOpt.timeTypeList.push(b),h.dataSetOpt.timeTypeOpt[l]=c,h.dateKey[l]=j,h.name=h.dateKey[h.dataSetOpt.timeTypeList[0].value],this.model.canvasModel.saveJsonVm()},_switchCompTypeWord:function(a){var b;switch(a){case"LITEOLAP":b="LiteOlap";break;case"TIME_COMP":b="Time";break;case"CHART":b="Chart";break;case"SELECT":b="Select";break;case"TABLE":b="Table";break;case"SINGLE_DROP_DOWN_TREE":b="SingleDropDownTree";break;case"CASCADE_SELECT":b="CascadeSelect"}return b},_getEditBarAndActiveComp:function(){var a,b,c=this.$el.find(".j-comp-setting"),d={};return 0===c.length?d:(d.$compSetting=c,a=c.attr("data-comp-id"),b=".j-component-item[data-comp-id="+a+"]",d.$activeComp=this.$el.find(b),d)},hideEditBar:function(){var a=this._getEditBarAndActiveComp();void 0!==a.$compSetting&&a.$compSetting.remove(),void 0!==a.$activeComp&&a.$activeComp.removeClass("active"),this.canvasView.parentView.ueView.setSize()},activeComp:function(){var a=this._getEditBarAndActiveComp();void 0!==a.$activeComp&&a.$activeComp.addClass("active")},removeCompEditBar:function(a){var b=this;$(a.target).parent().hasClass("j-report")&&b.hideEditBar()},openTimeSettingDialog:function(){function a(a){var b=[],c=a.find(".j-item");return c.each(function(){var a={},c=$(this),d=c.attr("data-type"),e=c.find("select").val(),f=c.find("input").val();a.type=d,a.date=[f+e],a.startDateOpt=c.find('[name="startDateSetting"]').val(),a.endDateOpt=c.find('[name="endDateSetting"]').val(),b.push(a)}),b}var c=this,d=c.model.canvasModel.compBoxModel,e=c.getActiveCompId(),f=c.model.getCompDataById(e);if("RANGE_CALENDAR"===f[0].clzKey){var d=c.model.canvasModel.compBoxModel,g=null;g=void 0!==f[0].dataSetOpt.rangeTimeTypeOpt?{start:f[0].dataSetOpt.rangeTimeTypeOpt.startDateOpt,end:f[0].dataSetOpt.rangeTimeTypeOpt.endDateOpt}:d.getComponentData("TIME_COMP").rangeConfig;var h=n.render({item:g})}else{var d=c.model.canvasModel.compBoxModel,i=d.getComponentData("TIME_COMP").deSwitchConfig,g=i(f[0].dataSetOpt.timeTypeOpt);console.log(g);var h=m.render({list:g})}b.showDialog({title:"默认选中时间设置",content:h,dialog:{width:300,height:249,open:function(){},buttons:[{text:"提交",click:function(){var d=$(this),e=d.find('[name="startDateSetting"]').val(),f=d.find('[name="endDateSetting"]').val();if(void 0!==e&&void 0!==f&&parseInt(f)<parseInt(e))return b.alert("设置的默认结束时间应小于默认开始时间"),void 0;var g=d.find('[name="singleDateSetting"]').val();if(void 0!==g&&parseInt(g)>0)return b.alert("设置的默认的时间点应为负数"),void 0;var h=a(d);c.model.updateCalendarJson(h,function(){d.dialog("close"),c.canvasView.showReport()})}},{text:"取消",click:function(){$(this).dialog("close")}}]}})},getDataFormatList:function(){function a(a){var d;return $.isObjectEmpty(a.dataFormat)?(b.alert("没有指标"),void 0):(d=o.render(a),0!=$(".j-line-y").find("div").length?b.showDialog({title:"数据格式",content:d,dialog:{width:340,height:400,resizable:!1,buttons:[{text:"提交",click:function(){c($(this))}},{text:"取消",click:function(){$(this).dialog("close")}}]}}):$(".norm-empty-prompt").show(),void 0)}function c(a){var b=$(".data-format").find("select"),c={};b.each(function(){var a=$(this),b=a.attr("name");c[b]=a.val()}),d.model.saveDataFormatInfo(e,c,function(){a.dialog("close"),d.canvasView.showReport()})}var d=this,e=d.getActiveCompId();d.model.getDataFormatList(e,a)},getNormInfoDepict:function(){function a(a){var d;return a?(d=s.render(a),0!=$(".j-line-y").find("div").length?b.showDialog({title:"指标信息描述",content:d,dialog:{width:340,height:400,resizable:!1,buttons:[{text:"提交",click:function(){c($(this))}},{text:"取消",click:function(){$(this).dialog("close")}}]}}):$(".norm-empty-prompt").show(),void 0):(b.alert("没有指标"),void 0)}function c(a){var b=$(".data-format").find("input"),c={};b.each(function(){var a=$(this),b=a.attr("name");c[b]=a.val()}),d.model.saveNormInfoDepict(e,c,function(){a.dialog("close"),d.canvasView.showReport()})}var d=this,e=d.getActiveCompId();d.model.getNormInfoDepict(e,a)},getFilterBlankLine:function(){function a(a){var d;return a?(d=t.render(a),b.showDialog({title:"其他操作",content:d,dialog:{width:320,height:170,resizable:!1,buttons:[{text:"提交",click:function(){c($(this))}},{text:"取消",click:function(){$(this).dialog("close")}}]}}),void 0):(b.alert("没有指标"),void 0)}function c(a){var b=$(".data-format-black").find("input").eq(0),c={};c.filterBlank=b.is(":checked")?"true":"false",d.model.saveFilterBlankLine(e,c,function(){a.dialog("close"),d.canvasView.showReport()})}var d=this,e=d.getActiveCompId();d.model.getFilterBlankLine(e,a)},getActiveCompId:function(){var a=this.$conCompSetting.find(".j-comp-setting");return a.attr("data-comp-id")},getActiveReportCompId:function(){var a=this.$conCompSetting.find(".j-comp-setting");return a.attr("report-comp-id")},selectSetAll:function(a,b,c){var d=this.canvasView.model.$reportVm.find("[data-component-type=SELECT]");d.each(function(){var b=$(this);b.attr("data-comp-id")===c&&b.attr("data-set-all",a)});for(var e,f=this.model.canvasModel.reportJson.entityDefs,g=0,h=f.length;h>g;g++)if("VUI"===f[g].clzType&&f[g].compId===c){e=f[g],e.hasAllNode=a,e.hasAllNodeText=b;break}this.model.canvasModel.saveJsonVm()},_initChartSettingView:function(a){this.chartSettingView&&this.chartSettingView.destroy(),this.chartSettingView=new e({el:a,reportId:this.model.reportId,canvasView:this.canvasView})}})});