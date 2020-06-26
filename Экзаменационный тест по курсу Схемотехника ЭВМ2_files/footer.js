require(['core/first'],function(){require(['theme_bootstrapbase/bootstrap','core/log'],function(bootstrap,log){log.debug('Bootstrap initialised')})});
function customise_dock_for_theme(dock){dock.on('dock:panelgenerated',function(){dock.get('panel').once('dockpanel:beforeshow',function(){Y.all('.dockeditempanel_content').addClass('block')});dock.get('panel').on('dockpanel:beforeshow',function(){var content=Y.all('.dockeditempanel_content');content.setStyle('maxWidth',content.get('winWidth')-dock.get('dockNode').get('offsetWidth')-10)})});dock.on('dock:initialised',function(){var navbar=Y.one('header.navbar'),navbarbtn=Y.one('header.navbar .btn-navbar'),navcollapse=Y.one('header.navbar .nav-collapse'),container=Y.one('#dock .dockeditem_container'),margintop=null,newmargintop=null,diff=null;if(navbar&&navbarbtn&&container){margintop=parseInt(container.getStyle('marginTop').replace(/px$/,''),10);diff=margintop-parseInt(navbar.get('offsetHeight'),10);navbarbtn.ancestor().on('click',function(){navcollapse.toggleClass('active');if(!this.hasClass('active')){newmargintop=(parseInt(navbar.get('offsetHeight'),10)+diff);container.setStyle('marginTop',newmargintop+'px')}else{container.setStyle('marginTop',margintop+'px')}
navcollapse.toggleClass('active');dock.fire('dock:itemschanged')},navbarbtn)}})};
function customise_dock_for_theme(){var dock=M.core_dock;dock.cfg.position='top';dock.set('orientation','horizontal');dock.on('dock:resizepanelcomplete',function(){resizeDockedItemPanel();activeItemTriangle()});dock.on('dock:itemremoved',function(){is_dock_has_items(dock);theme_opentechnology_handle_resize()});dock.on('dock:itemadded',function(item){is_dock_has_items(dock);var dockeditemtitle=Y.one('html').getAttribute('data-dockeditem-title');if(dockeditemtitle==null)
{dockeditemtitle=0}
if(parseInt(dockeditemtitle)>0)
{var block=Y.one('#inst'+item.get('blockinstanceid'));if(block!==null)
{var iconimage=new Image();iconimage.onload=function(){var dockedtitleh2=item.get('title');var dockedtitle=dockedtitleh2.ancestor();dockedtitle.addClass('prepared').setStyle('background-image','url('+this.src+')');if(parseInt(dockeditemtitle)==1||parseInt(dockeditemtitle)==3)
{dockedtitle.addClass('iconview')}
if(parseInt(dockeditemtitle)==1)
{dockedtitle.addClass('texthide')}};iconimage.onerror=function(){var dockedtitleh2=item.get('title');var dockedtitle=dockedtitleh2.ancestor();dockedtitle.addClass('prepared').addClass('noicon').removeClass('texthide').setStyle('background-image','none')}
iconimage.src=block.getAttribute('data-block-icon')}}else{Y.all('#dock .dockeditem .dockedtitle').each(function(dockedtitle){dockedtitle.addClass('prepared')})}
theme_opentechnology_handle_resize()})}
YUI().use('event',function(Y){Y.on('windowresize',function(){theme_opentechnology_handle_resize()});var collapsiblesectionswitcher=Y.all('.collapsible-section-switcher');if(collapsiblesectionswitcher)
{collapsiblesectionswitcher.on('click',function(){theme_opentechnology_handle_resize()})}});function is_dock_has_items(dock)
{var pageheader=Y.one('#page-header');if(pageheader!==null)
{if(dock.count>0)
{pageheader.addClass('dock-has-items')}else{pageheader.removeClass('dock-has-items')}}}
function theme_opentechnology_handle_resize(){var dockeditemswidth=0;var custommenu=Y.one('#h_custommenu_wrapper label.custom_menu_mobile_label');var headermenuwidth=Y.one("body").get("winWidth")>425?0:(custommenu?custommenu.get('clientWidth'):0);var dockbg=Y.one('#dock_bg');if(headermenuwidth>0)
{if(dockbg!==null)
{dockbg.setStyle('padding-left',headermenuwidth+'px')}}else{if(dockbg!==null)
{dockbg.setStyle('padding-left',null)}}
var header=Y.one('#dock_bg h1');var langmenu=Y.one('#dock_bg .langmenu_wrapper');var dockdiv=Y.one('#dock');var positionX=0;var positionY=0;var dockfullwidth=0;var dockheight=0;if(dockbg!==null)
{positionX=dockbg.getX()+parseFloat(dockbg.getComputedStyle('paddingLeft'))-parseFloat(Y.one('body').getComputedStyle('marginLeft'));positionY=dockbg.getY();dockfullwidth=dockbg.get('clientWidth')-parseFloat(dockbg.getComputedStyle('paddingLeft'))-parseFloat(dockbg.getComputedStyle('paddingRight'));dockheight=dockbg.get('clientHeight')}
var headerwidth=0;if(header!=null)
{header.setStyle('display','inline-block');var headerwidth=header.get('clientWidth')}
var langmenuwidth=0;if(langmenu!=null)
{var langmenuwidth=langmenu.get('clientWidth')}
var dockeditemtitle=Y.one('html').getAttribute('data-dockeditem-title');if(dockeditemtitle==null)
{dockeditemtitle=0}
if(parseInt(dockeditemtitle)==2||parseInt(dockeditemtitle)==4)
{var dockeditemswidth=0;Y.all('#dock .dockeditem').each(function(dockeditem){var dockedtitle=dockeditem.one('.dockedtitle');if(parseInt(dockeditemtitle)==2)
{dockedtitle.removeClass('iconview');dockedtitle.removeClass('texthide')}
if(parseInt(dockeditemtitle)==4)
{dockedtitle.addClass('iconview');dockedtitle.removeClass('texthide')}
dockeditemswidth+=dockeditem.get('clientWidth')});var availableplace=dockfullwidth-headerwidth-(headerwidth>0?10:0)-langmenuwidth;if(availableplace<(dockeditemswidth+10))
{dockeditemswidth=0;Y.all('#dock .dockeditem').each(function(dockeditem){var dockedtitle=dockeditem.one('.dockedtitle');if(dockedtitle!==null)
{if(!dockedtitle.hasClass('noicon'))
{dockedtitle.addClass('iconview');dockedtitle.addClass('texthide')}}
dockeditemswidth+=dockeditem.get('clientWidth')})}}else{Y.all('#dock .dockeditem').each(function(dockeditem){dockeditemswidth+=dockeditem.get('clientWidth')})}
var availableplace=dockfullwidth-headerwidth-(headerwidth>0?10:0)-langmenuwidth;if(availableplace<(dockeditemswidth+10))
{if(header!=null)
{header.setStyle('display','none')}
headerwidth=0}
var left=positionX+headerwidth+(headerwidth>0?10:0);var width=dockfullwidth-headerwidth-(headerwidth>0?10:0)-langmenuwidth;if(dockdiv)
{if(Y.one('body').hasClass('dir-rtl'))
{dockdiv.setStyle('right',(left+langmenuwidth)+'px')}else{dockdiv.setStyle('left',left+'px')}
dockdiv.setStyle('top',positionY+'px');dockdiv.setStyle('width',width+'px');dockdiv.setStyle('height',dockheight+'px')}}
function resizeDockedItemPanel()
{var html=Y.one('html');var body=Y.one('body');var dockdiv=Y.one('#dock');var dpan=Y.one('#dockeditempanel');if(dpan!=null)
{dpan.setStyle('width','auto');var screenheight=parseInt(html.get('clientHeight'))-parseInt(body.getComputedStyle('paddingTop'));var screenwidth=parseInt(html.get('clientWidth'));var offsetX=dpan.getX();var offsetY=dpan.getY();dpan.setStyle('top',parseInt(dockdiv.get('clientHeight'))+5+'px');if((offsetX+dpan.get('clientWidth')+20>screenwidth)){dpan.setStyle('left','auto');dpan.setStyle('right','0')}else{dpan.setStyle('right','auto');dpan.setStyle('left',offsetX-dockdiv.getX()+'px')}
if(offsetX<0){dpan.setStyle('left','0')}
if(screenheight-offsetY>300){dpan.setStyle('max-height',screenheight-offsetY+'px')}else{dpan.setStyle('max-height',body.get('clientHeight')-offsetY+'px')}}}
require(['jquery'],function($){$(function(){$('#dock .buttons_container').scroll(function(){activeItemTriangle()})})});function activeItemTriangle()
{require(['jquery'],function($){var activeitem=$('#dock .activeitem');if(activeitem.length>0)
{var activeitempos=activeitem.position();var triangle=activeitem.parent().find('.triangle');if(triangle.length==0)
{triangle=$('<div>').addClass('triangle').appendTo(activeitem.parent())}
var triangleleft=activeitempos.left+activeitem.outerWidth()/2-5;var dpanstart=$('#dockeditempanel').position().left;var dpanend=dpanstart+$('#dockeditempanel').outerWidth();if(triangleleft+triangle.outerWidth()>dpanend||triangleleft<dpanstart)
{triangle.hide()}else{triangle.show().css('left',triangleleft+'px')}}})};
require(['jquery'],function($){var footerresize=function(){var footerwrapperheight=0;var footerborderheight=$('#page-footer .footerborder').outerHeight();$('#footer_wrapper > *').each(function(){footerwrapperheight+=$(this).outerHeight()});$('#footer_wrapper').css('height',footerwrapperheight+'px');$('#body-inner').css('padding-bottom',footerwrapperheight+footerborderheight+'px')};footerresize();$(function(){footerresize()})
$(window).resize(footerresize)});require(['jquery','core/ajax'],function($,ajax){var getPageLayout=function(){var classes=$('body').attr('class').split(' ');var result='base';$(classes).each(function(index,value){if(value.indexOf("pagelayout-")!==-1){var layout=value.split('-');return result=layout[1]}});return result};$('.collapsible-section-switcher-slideup-label').click(function(){var switcher=$(this).parent().children('.collapsible-section-switcher').attr('checked','checked');var collapsibleSectionTop=$(this).parent().offset().top;if($(document).scrollTop()>collapsibleSectionTop)
{$('html, body').animate({scrollTop:collapsibleSectionTop},400)}
$(this).parent().children('.collapsible-section-switcher-slideup-label').first().slideUp();$(this).parent().children('.collapsible-section-content').slideUp(function(){$(this).parent().removeClass('expanded').addClass('collapsed');switcher.trigger('click').removeAttr('checked');save_cs_state(switcher.parent().data('collapsible-section'),0)})});$('.collapsible-section-switcher-slidedown-label').click(function(){var switcher=$(this).parent().children('.collapsible-section-switcher').removeAttr('checked');$(this).parent().children('.collapsible-section-switcher-slideup-label').first().slideDown();$(this).parent().children('.collapsible-section-content').slideDown(function(){$(this).parent().removeClass('collapsed').addClass('expanded');switcher.trigger('click').attr('checked','checked');save_cs_state(switcher.parent().data('collapsible-section'),1)})});var save_cs_state=function(collapsiblesection,currentstate){var layout=getPageLayout();var requests=ajax.call([{methodname:'theme_opentechnology_set_collapsiblesection_state',args:{'collapsiblesection':collapsiblesection,'state':currentstate,'layout':layout}}])}});require(['jquery'],function($){$('#dock_bg .langmenu_wrapper > label, #dock_bg .langmenu_wrapper select.langmenu').on('mouseleave',function(){var label=$('#dock_bg .langmenu_wrapper > label');label.data('timer',setTimeout(function(){$('#dock_bg .langmenu_wrapper > input').prop('checked',!1)},1200))});$('#dock_bg .langmenu_wrapper > label, #dock_bg .langmenu_wrapper select.langmenu').on('focus mouseover',function(){var label=$('#dock_bg .langmenu_wrapper > label');if(label.data('timer')){clearTimeout(label.data('timer'))}});$('#dock_bg .langmenu_wrapper select.langmenu').on('blur',function(){$('#dock_bg .langmenu_wrapper > input').prop('checked',!1)})});require(['jquery'],function($){var slides=$('.loginpage_slider_images > .loginpage_slider_image');var currentslideindex=0;if(slides.length>1)
{setInterval(function(){slidefrom=slides[currentslideindex];if(slides.length==++currentslideindex)
{currentslideindex=0}
slideto=slides[currentslideindex];slidefrom.style.opacity="0";slideto.style.opacity="1"},5000)}});require(['jquery'],function($)
{var fixElement=function(overflowedElementSelector,sourceElementSelector,cloneElementSelector,fixLeft,fixTop)
{if(overflowedElementSelector==undefined)
{overflowedElementSelector=null}
if(sourceElementSelector==undefined)
{sourceElementSelector=null}
if(cloneElementSelector==undefined)
{cloneElementSelector=null}
if(fixLeft==undefined)
{fixLeft=!1}
if(fixTop==undefined)
{fixTop=!0}
var overflowedElement=$(overflowedElementSelector);var sourceElement=$(sourceElementSelector);var cloneElement=$(cloneElementSelector);if(overflowedElement.length==0||sourceElement.length==0||cloneElement.length==0)
{return}
var scrollTop=overflowedElement.scrollTop();var scrollLeft=overflowedElement.scrollLeft();var sourcePosition=sourceElement.position();var fixedTopPosition=(sourcePosition.top<0?0:sourcePosition.top);var fixedLeftPosition=(sourcePosition.left<0?0:sourcePosition.left);if(fixLeft&&cloneElement.width()>overflowedElement.width()/2)
{fixLeft=!1}
if(fixTop&&cloneElement.height()>overflowedElement.height()/2)
{fixTop=!1}
if(fixLeft&&(sourceElement.width()+sourcePosition.left)<cloneElement.children('div:first').width())
{cloneElement.addClass('otfloating')}
else if(fixTop&&sourcePosition.top<0)
{cloneElement.addClass('otfloating')}
else{cloneElement.removeClass('otfloating')}
cloneElement.css({'left':(fixLeft?fixedLeftPosition:sourcePosition.left)+scrollLeft+'px','top':(fixTop?fixedTopPosition:sourcePosition.top)+scrollTop+'px'})}
$('body.path-grade-report-grader .gradeparent').scroll(function()
{$('body.path-grade-report-grader .floater').each(function()
{$(this).clone().removeClass('floater').removeClass('floating').addClass('otfloater').appendTo('.gradeparent')}).remove();fixElement($(this),'body.path-grade-report-grader #user-grades th.header.cell.user:first','body.path-grade-report-grader .otfloater.sideonly:not(.avg):not(.heading):not(.controls)',!0,!1);var shw=$('body.path-grade-report-grader #user-grades th.header.cell.user:first-child');var shh=$('body.path-grade-report-grader #user-grades th.header.cell#studentheader');$('body.path-grade-report-grader .otfloater.sideonly.heading').css({'width':shw.outerWidth()+'px','height':shh.outerHeight()+'px'});fixElement($(this),'body.path-grade-report-grader #user-grades th.header.cell#studentheader','body.path-grade-report-grader .otfloater.sideonly.heading',!0,!0);fixElement($(this),'body.path-grade-report-grader #user-grades th.header.cell.range','body.path-grade-report-grader .otfloater.sideonly.avg',!0,!0);fixElement($(this),'body.path-grade-report-grader #user-grades tr.heading','body.path-grade-report-grader .otfloater.heading:not(.sideonly)',!1,!0);fixElement($(this),'body.path-grade-report-grader #user-grades td.header.cell.controls','body.path-grade-report-grader .otfloater.sideonly.controls',!0,!1)})});var otsearchable;require(['jquery','jqueryui'],function($){otsearchable=function(){$('table.ot-searchable').each(function(){var table=$(this);var config=table.data('searchable-cells');var container=$('<div>').addClass('ot-filter-wrapper');var switcher=$('<input>').attr('type','checkbox').uniqueId().addClass('ot-filter-display');$('<label>').attr('for',switcher.attr('id')).addClass('ot-filter-header').text('Фильтрация').appendTo(container);switcher.appendTo(container);var hide=table.data('searchable-filter-hide');if(hide===undefined||!hide)
{switcher.attr('checked','checked')}
var filters=$('<div>').addClass('ot-filter-filters').appendTo(container);for(var cellclass in config)
{var filtertitle=config[cellclass];$('<input>').attr('placeholder',filtertitle).data('ot-filter-cellclass',cellclass).keyup(function(){var searchval=$(this).val();var cellclass=$(this).data('ot-filter-cellclass');var filteredcells=table.find('td.'+cellclass);filteredcells.each(function(index){var row=$(this).closest('tr');if($(this).text().toLowerCase().indexOf(searchval.toLowerCase())!==-1||searchval=='')
{var hiders=[];if(row.data('ot-filter')!==undefined)
{var hiders=row.data('ot-filter');var hiderkey=hiders.indexOf(cellclass);if(hiderkey!==-1)
{hiders.splice(hiderkey,1)}
row.data('ot-filter',hiders)}
if(hiders.length==0)
{row.removeClass('ot-filter-discard')}}else{row.addClass('ot-filter-discard');if(row.data('ot-filter')===undefined)
{row.data('ot-filter',[cellclass])}else{var hiders=row.data('ot-filter');if(hiders.indexOf(cellclass)==-1)
{hiders.push(cellclass);row.data('ot-filter',hiders)}}}})}).appendTo(filters)}
var parent=table.data('searchable-filter-parent');if(parent!==undefined)
{container.appendTo($(parent).first())}else{container.insertBefore(table)}})};otsearchable()});var otsortable;require(['jquery'],function($){var ot_sort_table=function(table,cellclass,desc){if(typeof desc=='undefined')
{desc=!1}
var rejected=[];var suitable=[];var header=[];table.find('tr').each(function(index){if($(this).hasClass('ot-sort-fix-top'))
{header.push($(this));return!0}
var suitable_cells=$(this).find('td.'+cellclass);if(suitable_cells.length>0)
{var suitable_cell=suitable_cells.first();var sortablevalue=suitable_cell.data('sort-value');if(sortablevalue===undefined)
{sortablevalue=suitable_cell.text()}
suitable[(''+sortablevalue).toLowerCase()+index]=$(this)}else{rejected.push($(this))}});if(!desc)
{for(var key in header)
{table.append(header[key])}
Object.keys(suitable).sort().forEach(function(key){table.append(suitable[key])});for(var key in rejected)
{table.append(rejected[key])}}else{for(var key=(rejected.length-1);key>=0;key--)
{table.prepend(rejected[key])}
Object.keys(suitable).sort().forEach(function(key){table.prepend(suitable[key])});for(var key=(header.length-1);key>=0;key--)
{table.prepend(header[key])}}}
otsortable=function(){$('table.ot-sortable').each(function(){var table=$(this);var config=table.data('sortable-cells');for(var headercellclass in config)
{var datacellclass=config[headercellclass];table.find('th.'+headercellclass).each(function(){var tools=$('<div>').addClass('ot-sort-tools');$('<div>').addClass('ot-sort-tool-sortup').click(function(){ot_sort_table(table,datacellclass,!0)}).appendTo(tools);$('<div>').addClass('ot-sort-tool-sortdown').click(function(){ot_sort_table(table,datacellclass)}).appendTo(tools);$(this).data('ot-sort-cellclass',datacellclass).append(tools)})}})};otsortable()})