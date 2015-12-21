(function(){$.widget("primeui.puiorderlist",{options:{controlsLocation:"none",dragdrop:true,effect:"fade",caption:null,responsive:false,datasource:null,content:null},_create:function(){this._createDom();
if(this.options.datasource){if($.isArray(this.options.datasource)){this._generateOptionElements(this.options.datasource)
}else{if($.type(this.options.datasource)==="function"){this.options.datasource.call(this,this._generateOptionElements)
}}}this.optionElements=this.element.children("option");
this._createListElement();
this._bindEvents()
},_createDom:function(){this.element.addClass("ui-helper-hidden");
if(this.options.controlsLocation!=="none"){this.element.wrap('<div class="pui-grid-col-10"></div>')
}else{this.element.wrap('<div class="pui-grid-col-12"></div>')
}this.element.parent().wrap('<div class="pui-orderlist pui-grid ui-widget"><div class="pui-grid-row"></div></div>');
this.container=this.element.closest(".pui-orderlist");
if(this.options.controlsLocation!=="none"){this.element.parent().before('<div class="pui-orderlist-controls pui-grid-col-2"></div>');
this._createButtons()
}if(this.options.responsive){this.container.addClass("pui-grid-responsive")
}},_generateOptionElements:function(c){for(var b=0;
b<c.length;
b++){var a=c[b];
if(a.label){this.element.append('<option value="'+a.value+'">'+a.label+"</option>")
}else{this.element.append('<option value="'+a+'">'+a+"</option>")
}}},_createListElement:function(){this.list=$('<ul class="ui-widget-content pui-orderlist-list"></ul>').insertBefore(this.element);
for(var b=0;
b<this.optionElements.length;
b++){var a=this.optionElements.eq(b),d=this.options.content?this.options.content.call(this,a):a.text(),c=$('<li class="pui-orderlist-item ui-corner-all"></li>');
if($.type(d)==="string"){c.html(d)
}else{c.append(d)
}c.data("item-value",a.attr("value")).appendTo(this.list)
}this.items=this.list.children(".pui-orderlist-item");
if(this.options.caption){this.list.addClass("ui-corner-bottom").before('<div class="pui-orderlist-caption ui-widget-header ui-corner-top">'+this.options.caption+"</div>")
}else{this.list.addClass("ui-corner-all")
}},_createButtons:function(){var b=this,a=this.element.parent().prev();
a.append(this._createButton("fa-angle-up","pui-orderlist-button-moveup",function(){b._moveUp()
})).append(this._createButton("fa-angle-double-up","pui-orderlist-button-move-top",function(){b._moveTop()
})).append(this._createButton("fa-angle-down","pui-orderlist-button-move-down",function(){b._moveDown()
})).append(this._createButton("fa-angle-double-down","pui-orderlist-move-bottom",function(){b._moveBottom()
}))
},_createButton:function(d,a,c){var b=$('<button class="'+a+'" type="button"></button>').puibutton({icon:d,click:function(){c();
$(this).removeClass("ui-state-hover ui-state-focus")
}});
return b
},_bindEvents:function(){var a=this;
this.items.on("mouseover.puiorderlist",function(c){var b=$(this);
if(!b.hasClass("ui-state-highlight")){$(this).addClass("ui-state-hover")
}}).on("mouseout.puiorderlist",function(c){var b=$(this);
if(!b.hasClass("ui-state-highlight")){$(this).removeClass("ui-state-hover")
}}).on("mousedown.puiorderlist",function(c){var b=$(this),d=(c.metaKey||c.ctrlKey);
if(!d){b.removeClass("ui-state-hover").addClass("ui-state-highlight").siblings(".ui-state-highlight").removeClass("ui-state-highlight")
}else{if(b.hasClass("ui-state-highlight")){b.removeClass("ui-state-highlight")
}else{b.removeClass("ui-state-hover").addClass("ui-state-highlight")
}}});
if(this.options.dragdrop){this.list.sortable({revert:1,start:function(b,c){},update:function(b,c){a.onDragDrop(b,c)
}})
}},_moveUp:function(){var b=this,d=this.items.filter(".ui-state-highlight"),c=d.length,a=0;
d.each(function(){var e=$(this);
if(!e.is(":first-child")){e.hide(b.options.effect,{},"fast",function(){e.insertBefore(e.prev()).show(b.options.effect,{},"fast",function(){a++;
if(c===a){b._saveState();
b._fireReorderEvent()
}})
})
}else{c--
}})
},_moveTop:function(){var b=this,d=this.items.filter(".ui-state-highlight"),c=d.length,a=0;
d.each(function(){var e=$(this);
if(!e.is(":first-child")){e.hide(b.options.effect,{},"fast",function(){e.prependTo(e.parent()).show(b.options.effect,{},"fast",function(){a++;
if(c===a){b._saveState();
b._fireReorderEvent()
}})
})
}else{c--
}})
},_moveDown:function(){var b=this,d=$(this.items.filter(".ui-state-highlight").get().reverse()),c=d.length,a=0;
d.each(function(){var e=$(this);
if(!e.is(":last-child")){e.hide(b.options.effect,{},"fast",function(){e.insertAfter(e.next()).show(b.options.effect,{},"fast",function(){a++;
if(c===a){b._saveState();
b._fireReorderEvent()
}})
})
}else{c--
}})
},_moveBottom:function(){var b=this,d=this.items.filter(".ui-state-highlight"),c=d.length,a=0;
d.each(function(){var e=$(this);
if(!e.is(":last-child")){e.hide(b.options.effect,{},"fast",function(){e.appendTo(e.parent()).show(b.options.effect,{},"fast",function(){a++;
if(c===a){b._saveState();
b._fireReorderEvent()
}})
})
}else{c--
}})
},_saveState:function(){this.element.children().remove();
this._generateOptions()
},_fireReorderEvent:function(){this._trigger("reorder",null)
},onDragDrop:function(a,b){b.item.removeClass("ui-state-highlight");
this._saveState();
this._fireReorderEvent()
},_generateOptions:function(){var a=this;
this.list.children(".pui-orderlist-item").each(function(){var b=$(this),c=b.data("item-value");
a.element.append('<option value="'+c+'" selected="selected">'+c+"</option>")
})
}})
})();