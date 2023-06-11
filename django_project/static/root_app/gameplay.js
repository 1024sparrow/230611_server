
'use strict';

var ss__Traliva;
if (ss__Traliva)
	console.log('epic fail');
else {
    (function(){
	ss__Traliva = {
        ss__history: history
    };
    // ---- begin of states block ----
    //(function(){
    /***** class StatePublisher **************************
     *
     * Не допускайте подписывания одного и того же подписчика более одного раза!
     *
     * PREVENT MORE THEN ONCE SUBSCRIBING THE SAME SUBSCRIBER!
     *****************************************************
     */
    var ss__StatePublisher = function(){
    	this.ss____state = {};//empty state by default untill be set
    	this.ss____subscribers = [];
        this.ss____recursionLevel = 0;// <-- количество вложенных вызовов processStateChanges.
        //                      фиксируем для того, чтобы остановить гонку состояний раньше,
        //                      чем это сделает браузер
    };
    ss__StatePublisher.prototype.ss__state = function(){
    	return this.ss____state;
    };
    ss__StatePublisher.prototype.ss__setState = function(ss__0){//parameter is an Object
        //ss__0 - state
        //ss__1 - i
        //ss__2 - subscr
        //ss__3 - s
    	this.ss____state = ss__0;
        //if (!this.ss___nodebug)
        //    console.log('set state: '+JSON.stringify(ss__0));
    	for (var ss__1 = 0 ; ss__1 < this.ss____subscribers.length ; ss__1++){
    		var ss__2 = this.ss____subscribers[ss__1];
            ss__2.ss____d.ss__state = ss__0;
            //console.log('%csetState: '+JSON.stringify(this.ss____state), 'color: #f00');//<--
            var ss__3 = ss__2.ss____getSubstate(ss__0);
    		ss__2.ss___state = ss__3;
            if (ss__Traliva.ss__debug && ss__Traliva.ss__debug.ss__state)
                this.ss____debugState(ss__2, ss__3);
    		ss__2.ss__processStateChanges(ss__3, true);
            //console.log('%c> setState: '+JSON.stringify(this.ss____state), 'color: #f00');//<--
    	}
    };
    ss__StatePublisher.prototype.ss__registerSubscriber = function(ss__0){
        //ss__0 - state
        //ss__1 - e
        //ss__2 - s
        /*if (ss__Traliva.ss__debug && ss__Traliva.ss__debug.ss__state)
            console.log('%cregister '+ss__0.constructor.name, 'color:#ffa');*/
    	ss__0.ss____m_publisher = this;
        try{
            ss__0.ss____d.ss__state = this.ss____state;
        }
        catch(ss__1){
            console.error('В конструкторе класса подписчика \'' + ss__0.constructor.name + '\'вы забыли вызвать конструктор базового класса');
        }
        //console.log('%csetState: '+JSON.stringify(this.ss____state), 'color: #f00');//<--
        var ss__2 = ss__0.ss____getSubstate(this.ss____state);
    	ss__0.ss___state = ss__2;
        if (ss__Traliva.ss__debug && ss__Traliva.ss__debug.ss__state)
            this.ss____debugState(ss__0, ss__2);
    	ss__0.ss__processStateChanges(ss__2, true);
    	this.ss____subscribers.push(ss__0);
        //console.log('%c> setState: '+JSON.stringify(this.ss____state), 'color: #f00');//<--
    };
    ss__StatePublisher.prototype.ss__unregisterSubscriber = function(ss__0){
        //ss__0 - state
        //ss__1 - index
        if (ss__Traliva.ss__debug && ss__Traliva.ss__debug.ss__state)
            console.log('%cunregister '+ss__0.constructor.name, 'color:#ffa');
    	var ss__1 = this.ss____subscribers.indexOf(ss__0);
    	if (ss__1 > -1)
    		this.ss____subscribers.splice(ss__1, 1);
    	else
    		console.log("epic fail");
    };
    ss__StatePublisher.prototype.ss___processStateChanges = function(ss__0, ss__1){
        //ss__0 - sender
        //ss__1 - p_fromProcessStateChanges
        //ss__2 - i
        //ss__3 - subscr
        //ss__4 - s
    	this.ss____state = ss__0.ss____d.ss__state;
        var ss__2, ss__3, ss__4, ss__5 = ss__0.ss____d.ss__changeFlags, ss__6;
        if (ss__1){
            if (this.ss____recursionLevel > 128){
                throw 'Предотвращена гонка состояний.';
            }
            this.ss____recursionLevel++;
        }
        else {
            this.ss____recursionLevel = 0;
        }
    	for (ss__2 = 0 ; ss__2 < this.ss____subscribers.length ; ss__2++){
    		ss__3 = this.ss____subscribers[ss__2];
    		if (ss__3 == ss__0)
    			continue;
            ss__3.ss____d.ss__state = this.ss____state;
            //console.log('%csetState: '+JSON.stringify(this.ss____state), 'color: #f00');//<--
            ss__4 = ss__3.ss____getSubstate(this.ss____state);
    		ss__3.ss___state = ss__4;
            if (ss__Traliva.ss__debug && ss__Traliva.ss__debug.ss__state)
                this.ss____debugState(ss__3, ss__4);
            //console.log('%c> setState: '+JSON.stringify(this.ss____state), 'color: #f00');//<--
    		ss__3.ss__processStateChanges(ss__4, false);
    	}
        // Удаляем свойства, зарегистрированные как changeFlags
        if (!ss__1){
            if (ss__2 = ss__0.ss____d.ss__changeFlags){
                for (ss__3 in ss__2){
                    if (typeof ss__2[ss__3] === 'function')
                        ss__2[ss__3](this.ss___state);
                    delete this.ss___state[ss__3];
                }
            }
        }
        //if (ss__Traliva.ss__debug && ss__Traliva.ss__debug.ss__state){
        //    console.log('--');
        //}
    };
    ss__StatePublisher.prototype.ss____debugState = function(ss__0, ss__1, ss__2){
        //ss__0 - p_subscriber
        //ss__1 - p_state
        //ss__2 - p_action
        if (this.ss___nodebug)
            return;
        if (ss__2){
            //console.log('%c' + ss__2 + ' ' + ss__0.constructor.name + ': ' + JSON.stringify(ss__1), 'color:#ffa');
        }
        else{
            //console.log('%cprocess ' + ss__0.constructor.name + ': ' + JSON.stringify(ss__1), 'color:#ffa');
            ss__Traliva.ss____d.ss____debug.ss__debugStatesStatesWidget.ss__processState(ss__0, this.ss____state);
        }
    };
    function ss__StatePublisherNoDebug(){
        ss__StatePublisher.call(this);
        this.ss___nodebug = true;
    };
    ss__StatePublisherNoDebug.prototype = Object.create(ss__StatePublisher.prototype);
    ss__StatePublisherNoDebug.prototype.constructor = ss__StatePublisherNoDebug;
    
    // -- end of class ss__StatePublisher --
    ss__Traliva.ss__StatePublisher = ss__StatePublisher;
    
    /****** class StateSubscriber ************************
     */
    
    var ss__StateSubscriber = function(ss__1){
        // ss__1 - changeFlags
    	//this._state = {};//empty state by default untill be set
        this.ss____d = {
            ss__substateMapper: undefined,
            ss__substateMapperType: undefined,
            ss__state: {},
            ss__changeFlags: ss__1
        };
        this._state = this.ss____d.ss__state;//undefined untill be set
    };
    
    /*
    Этот метод будет вызываться при любом изменении объекта состояния (не только косающихся подсостояния данного подписчика, если такое задано). Реализация данного метода должна начинаться с проверки, изменились ли те элементы объекта состояния, которые используются в данном подписчике.
    */
    
    
    ss__StateSubscriber.prototype.ss___registerStateChanges = function(){
    	if (this.ss____m_publisher)
    	{
    		this.ss____m_publisher.ss___processStateChanges(this, true);
    		//console.log("xml subscriber : ss___registerStateChanges -> ok");
    	}
    	//else
    	//	console.log("xml subscriber : ss___registerStateChanges -> aborted");
    };
    
    ss__StateSubscriber.prototype.ss__useSubstate = function(ss__0){
        //ss__0 - substateMapper
        /*
            Ссылаться можно только на объект! Или на массив. Но не на число или строку.
            Предполагается, что этот метод будет вызван до регистрации у издателя, так что обработчик изменения состояния не вызывается.
            substateMapper - функция, строка или объект.
            * функция - принимает параметром объект Состояния, должна вернуть объект подсостояния (или undefined). Будет вызываться при каждом изменении состояния (всего).
            * строка - путь до объекта подсостояния в объекте состояния, с разделением '/'. Применимо только в том случае, если 1) путь неизменен и 2) вся цепочка родителей от подсостояния к состоянию состоит из Объектов (без массивов). Тем не менее, это самый удобный путь при быстром клепании GUI из готовых блоков.
            * объект - самый вычислительно эффективный способa. Такая вот статическая привязка. Применим только если объект не перезадаётся (мы указываем ссылку на конкретный объект - если в то же место будет установлен другой объект (а не модифицирован предыдущий), то подписчик перестанет получать события об изменении соотв. подсостояния)
        */
        this.ss____d.ss__substateMapper = ss__0;
        this.ss____d.ss__substateMapperType = typeof ss__0;
        return this;
    };
    
    ss__StateSubscriber.prototype.ss____getSubstate = function(ss__0){
        //ss__0 - state
        //ss__1 - retVal
        //ss__2 - tmp
        //ss__3 - t
        if (!this.ss____d.ss__substateMapper)
            return this.ss____d.ss__state;
        //Здесь ни в коем случае нельзя создавать объект. Мы должны вернуть или ссылку на объект, или undefined.
        var ss__1;//undefined
        if (this.ss____d.ss__substateMapperType === 'string'){
            ss__1 = this.ss____d.ss__state;
            var ss__2 = this.ss____d.ss__substateMapper.split('/');
            while (ss__2.length){
                var ss__3 = ss__2.shift();
                if (!ss__1.hasOwnProperty(ss__3))
                    return undefined;
                ss__1 = ss__1[ss__3];
            }
        }
        else if (this.ss____d.ss__substateMapperType === 'object'){
            ss__1 = this.ss____d.ss__substateMapper;
        }
        else if (this.ss____d.ss__substateMapperType === 'function'){
            ss__1 = this.ss____d.ss__substateMapper(this.ss____d.ss__state);
        }
        return ss__1;
    };
    
    // -- end of class ss__StateSubscriber
    ss__Traliva.ss__StateSubscriber = ss__StateSubscriber;
    
    
    //})();
    // ---- begin of widgets block ----
    //(function(){
    /*
    p_scroll - (ориг. p_ifCutTails"обрубать концы" - bool-флаг; обрезать ли содержимое, если не умещается в отведённой области; если false, то в случае, когда контент не умещается, появляются полосы прокрутки)
    p_sroll - политика скрола. Строка. Возможные значения - 'v', 'h', 'vh' и ''(или undefined, по умолчанию)
    Если в каком-то направлении нет автопрокрутки, в том направлении вступает в силу подгон размеров содержимого под размер виджета.
    //
    */
    // -- class ss___WidgetBase --
    function ss___WidgetBase(ss__0){
        //ss__0 - p_parentWidget
    
        this.ss____onscrollOkFunc;
        this.ss____isVisible = true;
        this.ss____isMouseEventsBlocked = false;
        this.ss____wParent = ss__0;
        //this.ss____planedResize = undefined;
    
        this.ss___div = document.createElement('div');
        /* сейчас врйчную запускать _WidgetBase не предполагается - только через ss__Traliva.ss__WidgetStateSubscriber */
    	/*if (ss__0 && ss__0 instanceof HTMLDivElement)
    		this.ss___div = ss__0;
    	else{
    		this.ss___div = document.createElement('div');
            this.ss____wParent = ss__0;
        }*/
    
        this.ss___div.style.overflow = 'hidden';
        /* сейчас этим занимается ss__Traliva.ss__WidgetStateSubscriber */
        /*if ((!p_scroll) || (p_scroll === ''))
            this.ss___div.style.overflow = 'hidden';
        else if (p_scroll === 'vh')
            this.ss___div.style.overflow = 'auto';
        else if (p_scroll === 'v'){
            this.ss___div.style.overflowX = 'hidden';
            this.ss___div.style.overflowY = 'auto';
        }
        else if (p_scroll === 'h'){
            this.ss___div.style.overflowX = 'auto';
            this.ss___div.style.overflowY = 'hidden';
        }
        else
            console.log('error: incorrect \'p_scroll\' passed: '+p_scroll);*/
    
    	this.ss___div.onscroll = (function(ss__self){
    		return function(ss__2){
                //console.log(ss__2.target);
                //console.log(ss__self.ss___div);
                //if (ss__self.ss___div.scrollHeight > ss__self.ss___div.offsetHeight)
        		//	ss__self.ss___onScrolled(ss__self.ss___div.scrollTop);
                ss__self.ss___onScrolled(ss__self.ss___div.scrollTop);
    		};
    	})(this);
        this.ss___div.style.padding = '0px';
    
    	this.ss___content = this.ss___createContentElem();
    	this.ss___div.appendChild(this.ss___content);
    	if (!this.ss___content)
    		console.log('epic fail');
        
        if (ss__0){
    		if (!(ss__0 instanceof ss___WidgetBase)){
    			console.log('class ' + this.constructor.name +
    				': incorrect parent passed to constructor: ' + ss__0.constructor.name +
    				'. Available type to use: ss__Traliva.ss___WidgetBase.');
            }
        }
        
    	if (!ss__0){
    		var ss__eBody = document.getElementsByTagName('body')[0];
    		ss__eBody.style.overflow = "hidden";
    		ss__eBody.style.margin = '0';
    		//this.ss___div.style.background='#444';
    		this.ss___div.style.margin = '0';
    		ss__eBody.appendChild(this.ss___div);
    
    		(function(ss__self){
    			var ss__0 = function(){
    				var ss__w = window.innerWidth;
    				var ss__h = window.innerHeight;
    				ss__self.ss__resize(ss__w,ss__h);
    			};
    			if(window.attachEvent) {
    				window.attachEvent('onresize', ss__0);
    				window.attachEvent('onload', ss__0);
    	 		}
    			else if(window.addEventListener) {
    				window.addEventListener('resize', ss__0, true);
    				window.addEventListener('load', ss__0, true);
    			}
    			else{
    				console.log('epic fail.')
    			}
    		})(this);
    	}
    	this.ss___divInitialDisplayProperty = this.ss___div.style.display;
    };
    ss___WidgetBase.prototype.ss__isMouseEventsBlocked = function(){
        return this.ss____isMouseEventsBlocked;
    };
    ss___WidgetBase.prototype.ss____blockScrollHandler = function(ss__e){
        ss__e.preventDefault();
    };
    ss___WidgetBase.prototype.ss__setMouseEventsBlocked = function(ss__b){
        if (ss__b != this.ss____isMouseEventsBlocked){
            if (ss__b){
                this.ss____onscrollOkFunc = this.ss___div.onscroll;
                this.ss___div.onscroll = this.ss____blockScrollHandler;
            }
            else{
                this.ss___div.onscroll = this.ss____onscrollOkFunc;
                this.ss____onscrollOkFunc = undefined;
                //за то время, что виджет был отключен, у него могли быть определены обработчики.
                //сейчас те обработчики будут потеряны - используйте onScrolled вместо подписывания на событие скроллинга
            }
            //this.ss___div.style.pointerEvents = ss__b ? 'none' : 'auto';
            this.ss____isMouseEventsBlocked = ss__b;
        }
    };
    ss___WidgetBase.prototype.ss___createContentElem = function(){
    	console.log('this method must be reimplemented');
    	var ss__retVal = document.createElement('div');
    	ss__retVal.style.background = '#f00';
    	return ss__retVal;
    };
    ss___WidgetBase.prototype.ss__resize = function(ss__w, ss__h){
        if (!this.ss____isVisible){
            this.ss____planedResize = (ss__w === this.ss____w && ss__h === this.ss____h)?
                                        undefined :
                                        {
                                            ss__w: ss__w,
                                            ss__h: ss__h
                                        };
            return;
        }
        this.ss____w = ss__w;
        this.ss____h = ss__h;
        var ss__1 = ss__h + 'px', ss__2 = ss__w + 'px', ss__0 = this.ss___div.style;
    	ss__0.height = ss__1;
    	ss__0.maxHeight = ss__1;
    	ss__0.minHeight = ss__1;
    	ss__0.width = ss__2;
    	ss__0.maxWidth = ss__2;
    	ss__0.minWidth = ss__2;
    
    	//Это была очень крупная ошибка. Оставил закомментированным, чтобы напоминало о том, что так нельзя.
    	/*this.ss___content.style.height = ss__h + 'px';
    	this.ss___content.style.maxHeight = ss__h + 'px';
    	this.ss___content.style.minHeight = ss__h + 'px';
    	this.ss___content.style.width = ss__w + 'px';
    	this.ss___content.style.maxWidth = ss__w + 'px';
    	this.ss___content.style.minWidth = ss__w + 'px';*/
    	if (ss__1 = this.ss___onResized(ss__w, ss__h)){
            if (ss__1.ss__w){
                ss__0.width = ss__2.ss__w + 'px';
                ss__0.maxWidth = ss__2.ss__w + 'px';
                ss__0.minWidth = ss__2.ss__w + 'px';
            }
            if (ss__1.ss__h){
                ss__0.height = ss__1.ss__h + 'px';
                ss__0.maxHeight = ss__1.ss__h + 'px';
                ss__0.minHeight = ss__1.ss__h + 'px';
            }
        }
        //if (this.ss___div.scrollHeight > this.ss___div.clientHeight){
        /*if (this.ss___content.scrollHeight > ss__h){
            this.ss___div.onscroll = (function(ss__self){
                return function(e){
                    console.log(e.target);
                    console.log(ss__self.ss___div);
                    if (ss__self.ss___div.scrollHeight > ss__self.ss___div.offsetHeight)
                        ss__self.ss___onScrolled(ss__self.ss___div.scrollTop);
                };
            })(this);
        }*/
    };
    ss___WidgetBase.prototype.ss__setVisible = function(ss__p_visible){
        var ss__1;
        if (ss__p_visible !== this.ss____isVisible){
        	this.ss___div.style.display = ss__p_visible ? this.ss___divInitialDisplayProperty : 'none';
            if (this.ss____isVisible !== ss__p_visible){
                this.ss____isVisible = ss__p_visible;
                this.ss___onVisibilityChanged(ss__p_visible);
                if (ss__1 = this.ss____planedResize){
                    this.ss__resize(ss__1.ss__w, ss__1.ss__h);
                    this.ss____planedResize = undefined;
                }
                //должны оповерстить родительские элементы об изменении видимости дочернего элемента
                if (this.ss____wParent)
                    this.ss____wParent.ss___onChildVisibilityChanged(this);
            }
        }
    };
    ss___WidgetBase.prototype.ss___onChildVisibilityChanged = function(ss__wChild){};
    ss___WidgetBase.prototype.ss__isVisible = function(){return this.ss____isVisible;};
    ss___WidgetBase.prototype.ss___onResized = function(ss__w, ss__h){
    	//console.log('this method must be reimplemented: update content or child elements sizes for <this.ss___content> for given in parameters new size');
        // В ходе переопределения данного метода не забудьте вызвать реализацию базового класса.
        this.ss____w = ss__w;
        this.ss____h = ss__h;
    };
    ss___WidgetBase.prototype.ss___onScrolled = function(ss__pos){
    	// reimplement this method if you need
    };
    ss___WidgetBase.prototype.ss___onVisibilityChanged = function(ss__p_visible){
    };
    // -- end class ss___WidgetBase --
    ss__Traliva.ss___WidgetBase = ss___WidgetBase;
    
    // -- class ss__Widget --
    //=========== WIDGET ==============
    //Если собираетесь устанавливать Виджет, а не DOM-элемент, в качестве содержимого,
    //не указывайте второй параметр (или указывайте true), чтобы не получилось скрола внутри скрола
    function ss__Widget(ss__p_parentWidget, ss__p_attr){
    	this.ss___contentDiv = document.createElement('div');
    	this.ss____w;
    	this.ss____h;
    	this.ss____contentWidget;
    	ss___WidgetBase.call(this, ss__p_parentWidget, ss__p_attr);
        if (ss__Traliva.hasOwnProperty('ss__debug') && ss__Traliva.ss__debug.ss__uninitialized_colored){
            (function(ss__self){
                ss__StubWidget__stubWidgetCount++;
                var ss__e = document.createElement('div');
                ss__e.className = 'ss__traliva__stub_widget ' + ss__StubWidget__getBgByNum(ss__StubWidget__stubWidgetCount);
                ss__e.style.height = '100%';
                ss__self.ss__setContent(ss__e);
            })(this);
        }
    
        //this._div.className = 'widget_div';//
    };
    ss__Widget.prototype = Object.create(ss___WidgetBase.prototype);
    ss__Widget.prototype.constructor = ss__Widget;
    ss__Widget.prototype.ss__cleanInlineStyles = function(){
        var ss__0 = this.ss___div, ss__background, ss__overflow, ss__display;
        ss__background = ss__0.style.background;
        ss__overflow = ss__0.style.overflow;
        ss__display = ss__0.style.display;
        ss__0.removeAttribute('style');
        ss__0.style.background = ss__background;
        ss__0.style.overflow = ss__overflow;
        ss__0.style.display = ss__display;
    };
    ss__Widget.prototype.ss___onResized = function(ss__w, ss__h){
    	if (this.ss____contentWidget)
    		this.ss____contentWidget.ss__resize(ss__w,ss__h);
        // boris here: вызвать родительскую реализацию этого метода
        //ss___WidgetBase.ptototype.
    
    //{{ Подгон размера под содержимое, если не указан автоскроллинг
        var ss__v, ss__h;
        ss__h = ss__v = true;
        /*if (this._scroll === 'v')
            ss__h = true;
        if (this._scroll === 'h')
            v = true;
        if (this._scroll === 'vh')
            ss__h = ss__v = false;*/
        if (ss__v){
            this.ss___content.style.height = ss__h + 'px';
            this.ss___content.style.maxHeight = ss__h + 'px';
            this.ss___content.style.minHeight = ss__h + 'px';
        }
        if (ss__h){
            this.ss___content.style.width = ss__w + 'px';
            this.ss___content.style.maxWidth = ss__w + 'px';
            this.ss___content.style.minWidth = ss__w + 'px';
        }
    //}} Подгон размера под содержимое, если не указан автоскроллинг
    };
    ss__Widget.prototype.ss___createContentElem = function(){
    	return this.ss___contentDiv;
    };
    ss__Widget.prototype.ss__setContent = function(ss__p_div, ss__p_bgColor){
    	this.ss____contentWidget = undefined;
    	if (ss__p_div && (typeof ss__p_div == 'object')){
    		this.ss___div.removeChild(this.ss___contentDiv);//здесь мы должны убрать предыдущий DIV
    		if (ss__p_div instanceof HTMLElement){//dom element
    			ss__p_div.style.margin = '0';
    			this.ss___contentDiv = ss__p_div;
    
    			this.ss___content = this.ss___contentDiv;
    			this.ss___div.appendChild(this.ss___content);
    			if (this.ss____w)
    				this.ss___onResized(this.ss____w, this.ss____h);
    		}
    		else if (ss__p_div instanceof ss___WidgetBase){//widget
    			this.ss___contentDiv = ss__p_div.ss___div;
    			this.ss___content = this.ss___contentDiv;
    			this.ss___div.appendChild(this.ss___content);
    			this.ss____contentWidget = ss__p_div;
    			if (this.ss____w)
    				ss__p_div.ss__resize(this.ss____w, this.ss____h);
    		}
    		else{
    			console.log('epic fail: '+ss__p_div.constructor.name);
    			console.log(ss__p_div);
    		}	
    	}
    	//this.ss___div.style.background = ss__p_bgColor ? ss__p_bgColor : 'rgba(0,0,0,0)';
    	if (ss__p_bgColor)
    		this.ss___div.style.background = ss__p_bgColor;
    };
    /*ss__Widget.prototype.ss__setContent = function(content){
    	if (typeof content == 'string'){//color
    		this.ss___div.style.background = content;
    	}
    	else if (typeof content == 'object'){
    		if (content.constructor.name == 'HTMLParagraphElement'){//dom element
    			content.style.margin = '0';
    			this.ss___contentDiv = content;
    
    			this.ss___content = this.ss___contentDiv;
    			this.ss___div.appendChild(this.ss___content);
    			if (this.ss____w)
    				this.ss___onResized(this.ss____w, this.ss____h);
    		}
    		else if (content instanceof ss___WidgetBase){//widget
    		}
    		else
    			console.log('epic fail');
    	}
    	else{
    		console.log('epic fail');
    	}
    }*/
    // -- end class ss__Widget --
    ss__Traliva.ss__Widget = ss__Widget;
    
    
    //=========== STRIP ==============
    // -- class ss__Strip --
    ss__Traliva.ss__Strip__Orient__hor = 1;
    ss__Traliva.ss__Strip__Orient__vert = 2;
    function ss__Strip(ss__p_orient, ss__p_parentWidget, ss__p_attr){
    	this.ss____orient = ss__p_orient;
    	this.ss____items = [];
    	this.ss____sizes = [];
    	this.ss____w;
    	this.ss____h;
    
    	this.ss___eTable = document.createElement('table');
    	this.ss___eTable.style.border = 'none';
    	this.ss___eTable.cellSpacing = '0';
    	if (this.ss____orient == ss__Traliva.ss__Strip__Orient__hor){
    		this.ss___eRowSingle = this.ss___eTable.insertRow(0);
    	}
    	ss___WidgetBase.call(this, ss__p_parentWidget, ss__p_attr);
    };
    ss__Strip.prototype = Object.create(ss___WidgetBase.prototype);
    ss__Strip.prototype.constructor = ss__Strip;
    ss__Strip.prototype.ss___createContentElem = function(){
    	return this.ss___eTable;
    };
    ss__Strip.prototype.ss___onResized = function(ss__w,ss__h){
    	this.ss____w = ss__w;
    	this.ss____h = ss__h;
    	this.ss____updateSizes();
    };
    ss__Strip.prototype.ss___onChildVisibilityChanged = function(ss__wChild){
    	this.ss____updateSizes();
    };
    ss__Strip.prototype.ss____updateSizes = function(){
    	var ss__totalForParts = (this.ss____orient == ss__Traliva.ss__Strip__Orient__hor) ? this.ss____w : this.ss____h;
    	if (ss__totalForParts < 0)
    		return;
    	var ss__totalParts = 0;
    	for (var ss__0 = 0 ; ss__0 < this.ss____items.length ; ss__0++){
            if (!this.ss____items[ss__0].ss__isVisible())
                continue;
    		if (this.ss____sizes[ss__0].ss__unit == 'px'){
    			ss__totalForParts -= this.ss____sizes[ss__0].ss__value;
    		}
    		else if (this.ss____sizes[ss__0].ss__unit == 'part'){
    			ss__totalParts += this.ss____sizes[ss__0].ss__value;
    		}
    	}
    	for (var ss__0 = 0 ; ss__0 < this.ss____items.length ; ss__0++){
            if (!this.ss____items[ss__0].ss__isVisible())
                continue;
    		var ss__tmpSize = undefined;
    		if (this.ss____sizes[ss__0].ss__unit == 'px'){
    			ss__tmpSize = this.ss____sizes[ss__0].ss__value;
    		}
    		else if (this.ss____sizes[ss__0].ss__unit == 'part'){
    			ss__tmpSize = this.ss____sizes[ss__0].ss__value * ss__totalForParts / ss__totalParts;
    		}
    		if (!ss__tmpSize){
    			console.log('epic fail');
    			continue;
    		}
    
    		var ss__1 = this.ss____items[ss__0];
    		if (this.ss____orient == ss__Traliva.ss__Strip__Orient__hor)
    			ss__1.ss__resize(ss__tmpSize,this.ss____h);
    		else
    			ss__1.ss__resize(this.ss____w, ss__tmpSize);
    	}
    };
    ss__Strip.prototype.ss__addItem = function(ss__p_itemWidget, ss__p_size){
    	if (typeof ss__p_itemWidget != 'object'){
    		console.log('epic fail');
    		return;
    	}
    	if (!(ss__p_itemWidget instanceof ss___WidgetBase)){
    		console.log('epic fail');
    		return;
    	}
    	var ss__size = this.ss___transformStringSize(ss__p_size);
    
    	var ss__eCell;
    	if (this.ss____orient == ss__Traliva.ss__Strip__Orient__hor){
    		ss__eCell = this.ss___eRowSingle.insertCell(this.ss___eRowSingle.cells.length);
    	}
    	else {
    		var ss__eRow = this.ss___eTable.insertRow(this.ss___eTable.rows.length);
    		ss__eCell = ss__eRow.insertCell(0);
    	}
    	ss__eCell.appendChild(ss__p_itemWidget.ss___div);
    	ss__eCell.style.padding = '0';
    	this.ss____items.push(ss__p_itemWidget);
    	this.ss____sizes.push(ss__size);
    };
    var ss__Strip__reSize = /^(\d+)(\s*)((px)|(part))/;
    ss__Strip.prototype.ss___transformStringSize = function(ss__str){
    	//Почему невалидное значение по умолчанию - чтобы для программиста не прошло незамеченным.
    	var ss__retVal = {ss__value:undefined, ss__unit:undefined};
    	if (ss__str){
    		//работа с регулярными выражениями
    		var ss__0 = ss__str.match(ss__Strip__reSize);
    		if (ss__0){
    			ss__retVal.ss__value = parseInt(ss__0[1]);
    			ss__retVal.ss__unit = ss__0[3];
    		}
    		else{
    			console.log('error: incorrect size parameter (incorrect string)');
    		}
    	}
    	else{
    		ss__retVal.ss__value = 1;
    		ss__retVal.ss__unit = 'part';
    	}
    	//console.log(JSON.stringify(ss__retVal));
    	return ss__retVal;
    };
    
    ss__Strip.prototype.ss__addSplitter = function(){
    	if (!this.ss____sizes.length){
    		//Проверка сильно усложнится, когда будет добавлена поддержка сокрытия элементов
    		console.log('impossible insert splitter into the start of a strip');
    		return;
    	}
    	var splitter = new ss__Traliva.Widget(this);
    	//Если стиль не установлен, то будет цвета подложки (сейчас это тёмно-серый #444)
    	splitter._content.className = 'b__splitter';
    	splitter._content.style.cursor =
    		(this.ss____orient == ss__Traliva.ss__Strip__Orient__hor) ? 'col-resize' : 'row-resize';
    	splitter._content.addEventListener('mousedown', onMouseDown);
    	var splitterItemIndex = this.ss____sizes.length;
    	this.ss__addItem(splitter, '8px');
    	splitter._splitterClientPos;
    	
    	var strip = this;
    	splitter.__lastPos;
    	function onMouseDown(e){
    		splitter._content.removeEventListener('mousedown', onMouseDown);
    		if (strip.ss____sizes.length < (splitterItemIndex + 2)){
    			console.log('impossible insert splitter into the end of a strip');
    			return;
    		}
    		splitter._splitterClientPos = (strip.ss____orient == ss__Traliva.ss__Strip__Orient__hor) ?
    			e.clientX : e.clientY;
    		strip._content.addEventListener('mousemove', onMouseMove);
    		strip._content.addEventListener('mouseup', onMouseUp);
    		splitter.__lastPos =
    			(strip.ss____orient == ss__Traliva.ss__Strip__Orient__hor) ? e.clientX : e.clientY;
    		splitter.__lastPos -= splitter._splitterClientPos;
    		splitter.__prevInitSize = Object.create(strip.ss____sizes[splitterItemIndex - 1]);
    		splitter.__nextInitSize = Object.create(strip.ss____sizes[splitterItemIndex + 1]);
    	}
    	function onMouseUp(e){
    		strip._content.removeEventListener('mousemove', onMouseMove);
    		strip._content.removeEventListener('mouseup', onMouseUp);
    		splitter._content.addEventListener('mousedown', onMouseDown);
    		applyPosition(splitter.__lastPos);
    	}
    	function onMouseMove(e){
    		var nowPos = (strip.ss____orient == ss__Traliva.ss__Strip__Orient__hor) ? e.clientX : e.clientY;
    		nowPos = nowPos - splitter._splitterClientPos;
    		applyPosition(nowPos);
    		splitter.__lastPos = nowPos;
    	}
    	function applyPosition(nowPos){
    		//var dx = nowPos - splitter.__lastPos;
    		console.log(nowPos);
    		// копируем, потому что после изменений, возможно, придётся отказаться от них
    		//var prevSize = Object.create(strip.ss____sizes[splitterItemIndex - 1]);
    		//var nextSize = Object.create(strip.ss____sizes[splitterItemIndex + 1]);
    		var prevSize = strip.ss____sizes[splitterItemIndex - 1];
    		var nextSize = strip.ss____sizes[splitterItemIndex + 1];
    		console.log(JSON.stringify(prevSize));
    		
    		var a = prevSize.ss__unit == 'px';
    		var b = nextSize.ss__unit == 'px';
    		/*
    		Если слева в пикселях, а справа нет, то меняем размер только у левого
    		Если справа в пикселях, а слева нет, то
    			из общего размера вычитаем 
    		Если с обоих сторон в пикселях, то меняем оба значения
    		Если с обоих сторон в частях, то меняем оба значения
    		*/
    		if (a != b){
    			//var target = a ? prevSize : nextSize;
    			var targetInit = a ? splitter.__prevInitSize : splitter.__nextInitSize;
    			var candidate = nowPos - targetInit.ss__value;
    			if (a){
    				var candidate = splitter.__prevInitSize.ss__value + nowPos;
    				if (candidate >= 50){
    					var i = {};
    					i[splitterItemIndex - 1] = candidate + 'px';
    					strip.ss__setItemSize(i);
    				}
    			}
    			else{
    				//console.log(1);//boris here
    			}
    		}
    	}
    };
    ss__Strip.prototype.ss__setItemSize = function(ss__sizeMap){//usage example: wRoot.ss__setItemSize({0:'2part'});
    	for (var ss__0 in ss__sizeMap){
    		if (ss__0 >= this.ss____sizes){
    			console.log('epic fail');
    			continue;
    		}
    		var ss__1 = this.ss___transformStringSize(ss__sizeMap[ss__0]);
    		this.ss____sizes[ss__0] = ss__1;
    	}
    	this.ss____updateSizes();
    };
    // -- end class ss__Strip --
    ss__Traliva.ss__Strip = ss__Strip;
    
    // -- class ss__Stack --
    function ss__Stack(ss__p_parentWidget, ss__p_attr){
    	this.ss____items = [];
    	this.ss____zIndexCounter = 1;
        this.ss___w = undefined;
        this.ss___h = undefined;
    
    	this.ss___eStack = document.createElement('div');
    	this.ss___eStack.style.position = 'relative';
    	ss___WidgetBase.call(this, ss__p_parentWidget, ss__p_attr);
    };
    ss__Stack.prototype = Object.create(ss___WidgetBase.prototype);
    ss__Stack.prototype.constructor = ss__Stack;
    ss__Stack.prototype.ss___createContentElem = function(){
    	return this.ss___eStack;
    };
    ss__Stack.prototype.ss___onResized = function(ss__w,ss__h){
        this.ss___w = ss__w;
        this.ss___h = ss__h;
    	for (var ss__0 = 0 ; ss__0 < this.ss____items.length ; ss__0++){
    		var ss__item = this.ss____items[ss__0];
    		ss__item.ss__resize(ss__w,ss__h);
    	}
    };
    ss__Stack.prototype.ss__addItem = function(ss__p_itemWidget){
    	if (typeof ss__p_itemWidget != 'object'){
    		console.log('epic fail');
    		return;
    	}
    	if (!(ss__p_itemWidget instanceof ss___WidgetBase)){
    		console.log('epic fail');
    		return;
    	}
    	ss__p_itemWidget.ss___div.style.position = 'absolute';
    	ss__p_itemWidget.ss___div.style.zIndex = this.ss____zIndexCounter;
    	ss__p_itemWidget.ss___div.style.left = '0';
    	ss__p_itemWidget.ss___div.style.top = '0';
    	this.ss___eStack.appendChild(ss__p_itemWidget.ss___div);
    	this.ss____items.push(ss__p_itemWidget);
        if (this.ss___w)
            ss__p_itemWidget.ss__resize(this.ss___w, this.ss___h);
    
    	this.ss____zIndexCounter++;
    };
    ss__Stack.prototype.ss__removeItem = function(ss__p_index){
        if (ss__p_index >= this.ss____items.length){
            console.log('epic fail');
            return;
        }
        this.ss___eStack.removeChild(this.ss____items[ss__p_index].ss___div);
        this.ss____items.splice(ss__p_index, 1);
    };
    ss__Stack.prototype.ss___onChildVisibilityChanged = function(ss__wChild){
        var ss__0, ss__1, ss__2;//ss__1 - top level widget index
        for (ss__0 = 0 ; ss__0 < this.ss____items.length ; ss__0++){
            if (this.ss____items[ss__0].ss__isVisible())
                ss__1 = ss__0;
        }
        for (ss__0 = 0 ; ss__0 < this.ss____items.length ; ss__0++){
            ss__2 = this.ss____items[ss__0];
            ss__2.ss__setMouseEventsBlocked(ss__0 !== ss__1);
        }
    };
    // -- end class ss__Stack --
    ss__Traliva.ss__Stack = ss__Stack;
    
    
    //})();
    // ---- begin of init block ----
    //ss__Traliva.pixelPerInch
    /*(function(){
        var ss__0, ss__1, ss__3;
        try{ // этот скрипт, помимо того как из браузера, вызывается также и из генератора серверного кода на NodeJS, а там нет document.
            ss__1 = document.createElement('div');
            ss__1.style.height = '1in';
            ss__1.style.width = '1in';
            document.body.appendChild(ss__1);
            ss__0 = ss__1.clientHeight;
            ss__3 = ss__1.clientWidth;
            ss__Traliva.pixelPerInch = (ss__0 && ss__3) ? {
                hor: ss__3,
                vert: ss__0
            } : {
                hor: 0,
                vert: 0
            };
            document.body.removeChild(ss__1);
        }
        catch(e){
        }
    })();*/
    
    //'---------------init/history.js---------------';
    /*function HistorySubstitute(){
        this._initState = JSON.parse(JSON.stringify(p_initState));
        this.__copy = function(ss__o){return JSON.parse}
    };*/
    
    // Альтернативная версия Истории, используемая только в случае режима отладки 'url'
    if (ss__Traliva.ss__debug && ss__Traliva.ss__debug.ss__url){
        ss__Traliva.ss__history = {
            ss____paths: ['/'],
            ss____currentIndex: 0,
            replaceState: function(ss__p_a, ss__p_b, ss__p_path){
                console.log('%creplaceState(url) --> '+ss__p_path, 'color: #faa');
                if (ss__Traliva.ss__debug.ss__url){
                    this.ss____paths[this.ss____currentIndex] = ss__p_path;
                    this.ss____aa(ss__p_path);
                }
                else{
                    history.replaceState(ss__p_a, ss__p_b, ss__p_path);
                }
            },
            pushState: function(ss__p_a, ss__p_b, ss__p_path){
                console.log('%cpushState(url) --> '+ss__p_path, 'color: #faa');
                if (ss__Traliva.ss__debug.ss__url){
                    this.ss____currentIndex++;
                    if (this.ss____currentIndex < this.ss____paths.length)
                        this.ss____paths[this.ss____currentIndex] = ss__p_path;
                    else
                        this.ss____paths.push(ss__p_path);
                    this.ss____aa(ss__p_path)
                }
                else{
                    history.pushState(ss__p_a, ss__p_b, ss__p_path);
                }
            },
            ss___goNext: function(){
                if ((this.ss____currentIndex + 1) < this.ss____paths.length){
                    this.ss____currentIndex++;
                    this.ss____aa(this.ss____paths[this.ss____currentIndex])
                }
            },
            ss___goBack: function(){
                if (this.ss____currentIndex > 0){
                    this.ss____currentIndex--;
                    this.ss____aa(this.ss____paths[this.ss____currentIndex])
                }
            },
            ss___goCurrent: function(){
                this.ss____aa(this.ss____paths[this.ss____currentIndex]);
            },
            ss___current: function(){
                return this.ss____paths[this.ss____currentIndex];
            },
            ss____aa: function(p){
                this.ss___updateUrl(p);
                if (ss__Traliva.ss____d.hasOwnProperty('ss__stateToUrlMapper'))
                    ss__Traliva.ss____d.ss__stateToUrlMapper.ss__updateForUrl(p);
            },
            // сюда в классе виджета,отображающего URL в отладочной панели, должна быть записана функция, обновляющая URL в отладочной панели.
            ss___updateUrl: function(){console.log('oops..');}
        };
    }
    //'---------------init/history.js---------------';
    //'---------------init/debug.js---------------';
    function ss__DebugConsole(){
        ss__StateSubscriber.call(this);
    };
    ss__DebugConsole.prototype = Object.create(ss__StateSubscriber.prototype);
    ss__DebugConsole.prototype.constructor = ss__DebugConsole.prototype;
    ss__DebugConsole.prototype.ss__processStateChanges = function(ss__s){
    
        console.log('%cDEBUG:%c ' + JSON.stringify(ss__s), 'color: #afa', 'color: #f80');
    
    };
    
    function ss__Button(ss__p_wContainer, ss__p_options){// ss__options: ss__title, color('#f00'), valueVarName - имя свойства, в которое сохранять значение
        ss__StateSubscriber.call(this);
        var ss__e = ss__Traliva.ss__createElement('<div class="ss__traliva__debug_panel__bn" traliva="ss__bnStates">' + ss__p_options.ss__title + '</div>', this);
        /*ss__p_wContainer.ss___onResized = (function(ss__e){function(ss__w,ss__h){
            ss__e.style.width = ss__w + 'px';
            ss__e.style.height = ss__h + 'px';
        };})(this.ss__bnStates);*/
        //ss__e.className = 'ss__traliva__debug_panel__bn';
        //ss__e.style.margin = '6px';
        this.ss__bnStates.style.border = '1px solid ' + ss__p_options.ss__color;
        this.ss__bnStates.style.color = ss__p_options.ss__color;
        this.ss__bnStates.addEventListener('click', function(ss__self, ss__opt){return function(){
            ss__self.ss___state[ss__opt.ss__valueVarName] = !ss__self.ss___state[ss__opt.ss__valueVarName];
            ss__self.ss___registerStateChanges();
        };}(this, ss__p_options));
        ss__p_wContainer.ss__setContent(ss__e);
        //ss__p_wContainer.ss___div.style.margin = '6px 2px';
    };
    ss__Button.prototype = Object.create(ss__Traliva.ss__StateSubscriber.prototype);
    ss__Button.prototype.constructor = ss__Button;
    ss__Button.prototype.ss__processStateChanges = function(ss__s){
    };
    
    function ss__DebugPanelUrlWidget(ss__p_wContainer){
        ss__p_wContainer.ss___div.className = 'ss__debug_panel';
        ss__StateSubscriber.call(this);
        //ss__p_wContainer.ss___div.style.background = '#f00';
        this.ss___bnBack = new ss__Widget(ss__p_wContainer);
        this.ss___bnBack.ss___div.className = 'ss__traliva__debug_panel__bn_back';
        this.ss___bnBack.ss___div.addEventListener('click', (function(ss__h){return function(){
            ss__h.ss___goBack();
        };})(ss__Traliva.ss__history));
        this.ss___bnForward = new ss__Widget(ss__p_wContainer);
        this.ss___bnForward.ss___div.className = 'ss__traliva__debug_panel__bn_forward';
        this.ss___bnForward.ss___div.addEventListener('click', (function(ss__h){return function(){
            ss__h.ss___goNext();
        };})(ss__Traliva.ss__history));
        this.ss___leUrl = new ss__Widget(ss__p_wContainer);
        var ss__scope = {};
        var ss__leUrl = ss__Traliva.ss__createElement('<input type="text" traliva="ss__le"></input>', ss__scope, 'ss____debug_panel_url');//boris here
        this.ss___leUrl.ss___onResized = function(ss__w, ss__h){
            ss__scope.ss__le.style.width = (ss__w - 12) + 'px';
            ss__scope.ss__le.style.height = (ss__h - 12) + 'px';
        };
        var ss__0 = 'http://' + ss__Traliva.ss__debug.ss__url;
        ss__scope.ss__le.value = ss__0 + '/';
        ss__Traliva.ss__history.ss___updateUrl = (function(ss__p_prefix, ss__p_le){return function(ss__p_url){
            //console.log('%cURL изменён: ' + ss__p_prefix + ss__p_url, 'color: #ffa');
            console.log('%cURL изменён: ' + ss__p_url, 'color: #ffa');
            //ss__p_le.value = ss__p_prefix + ss__p_url;
            ss__p_le.value = ss__p_url;
        };})(ss__0, ss__scope.ss__le);
        this.ss___leUrl.ss__setContent(ss__leUrl);
        this.ss___bnEnter = new ss__Widget(ss__p_wContainer);
        this.ss___bnEnter.ss___div.className = 'ss__traliva__debug_panel__bn_enter';
        this.ss___bnEnter.ss___div.addEventListener('click', (function(ss__h, ss__le, ss__p_prefix){return function(){
            var ss__cand = ss__le.value;
            if (ss__cand[ss__cand.length - 1] !== '/')
                ss__cand += '/';
            if (ss__cand.indexOf(ss__p_prefix) < 0)
                ss__h.ss___goCurrent();
            else{
                //ss__h.pushState({}, '', ss__cand.slice(ss__p_prefix.length));
                ss__h.pushState({}, '', ss__cand);
            }
        };})(ss__Traliva.ss__history, ss__scope.ss__le, ss__0));
    
        this.ss___layout = new ss__Strip(ss__Traliva.ss__Strip__Orient__hor, ss__p_wContainer);
        this.ss___layout.ss__addItem(this.ss___bnBack, '32px');
        this.ss___layout.ss__addItem(this.ss___bnForward, '32px');
        this.ss___layout.ss__addItem(this.ss___leUrl);
        this.ss___layout.ss__addItem(this.ss___bnEnter, '32px');
        ss__p_wContainer.ss__setContent(this.ss___layout);
    };
    ss__DebugPanelUrlWidget.prototype = Object.create(ss__StateSubscriber.prototype);
    ss__DebugPanelUrlWidget.prototype.constructor = ss__DebugPanelUrlWidget;
    ss__DebugPanelUrlWidget.prototype.ss__processStateChanges = function(ss__s){
    };
    
    function ss__DebugStatesWidget(ss__p_wContainer, ss__p_wExtender, ss__p_wStates){
        ss__p_wContainer.ss___div.className = 'ss__debug_states';
        ss__StateSubscriber.call(this);
        this.ss___wContainer = ss__p_wContainer;
        this.ss___wContainer.ss__setVisible(false);
        this.ss___enabled = false;
        ss__p_wContainer.ss___div.className = 'ss__traliva__debug_panel__states';
    
        this.ss__DebugStatesWidget = {
            ss__publisher: new ss__StatePublisherNoDebug()
        };
        this.ss__DebugStatesWidget.ss__publisher.ss__registerSubscriber(new ss__DebugStatesExtenderWidget(ss__p_wExtender));
        var ss__0 = new ss__DebugStatesStatesWidget(ss__p_wStates);
        ss__Traliva.ss____d.ss____debug.ss__debugStatesStatesWidget = ss__0;
        this.ss__DebugStatesWidget.ss__publisher.ss__registerSubscriber(ss__0);
    };
    ss__DebugStatesWidget.prototype = Object.create(ss__StateSubscriber.prototype);
    ss__DebugStatesWidget.prototype.constructor = ss__DebugStatesWidget;
    ss__DebugStatesWidget.prototype.ss__processStateChanges = function(ss__s){
        if (ss__s.ss__show_states !== this.ss___enabled){
            this.ss___wContainer.ss__setVisible(ss__s.ss__show_states);
            this.ss___enabled = ss__s.ss__show_states;
        }
        this.ss__DebugStatesWidget.ss__publisher.ss__setState(ss__s);
    };
    
    function ss__DebugStatesStatesWidget(ss__p_wContainer){
        ss__p_wContainer.ss___div.className = 'ss__debug_states_states';
        ss__StateSubscriber.call(this);
        ss__p_wContainer.ss___div.className = 'ss__traliva__debug_panel__states_states';
        var ss__wStrip = new ss__Strip(ss__Traliva.ss__Strip__Orient__hor, ss__p_wContainer);
        var ss__wLeft = new ss__Widget(ss__p_wContainer);
        this.ss__eState = document.createElement('textarea');
        this.ss__eState.spellcheck = false;
        this.ss__eState.style.resize = 'none';
        this.ss__eState.style.background = 'rgba(0,0,0,0.1)';
        this.ss__eState.style.border = 'none';
        this.ss__eState.style.color = '#48f';
        this.ss__eState.value = JSON.stringify(ss__Traliva.ss____d.ss__publisher.ss__state(), undefined, 2);
        ss__wLeft.ss__setContent(this.ss__eState);
        ss__wLeft.ss___onResized = (function(ss__e){return function(ss__w,ss__h){
            ss__e.style.width = ss__w + 'px';
            ss__e.style.height = ss__h + 'px';
        };})(this.ss__eState);
        var ss__wRight = new ss__Strip(ss__Traliva.ss__Strip__Orient__vert, ss__wStrip);
        var ss__wBnApply = new ss__Widget(ss__wRight);
        //ss__wBnApply.ss___div.className = 'traliva__debug_panel__apply_state_button';
        ss__wBnApply.ss__setContent(ss__Traliva.ss__createElement('<div class="ss__traliva__debug_panel__apply_state_button">Применить</div>'));
        ss__wBnApply.ss___div.addEventListener('click', (function(ss__self){return function(){
            var ss__s;
            try{
                ss__s = JSON.parse(ss__self.ss__eState.value);
                ss__self.ss__lastValidState = ss__s;
            }
            catch(ss__e){
                alert('Ошибка: '+ss__e);
                if (confirm('Откатить изменения?'))
                    ss__self.ss__eState.value = JSON.stringify(ss__self.ss__lastValidState, undefined, 2);
            }
            if (ss__s)
                ss__Traliva.ss____d.ss__publisher.ss__setState(ss__s);
        }})(this));
        ss__wRight.ss__addItem(ss__wBnApply, '48px');
        ss__wRight.ss__addItem(new ss__Widget(ss__wRight));
        ss__wStrip.ss__addItem(ss__wLeft);
        ss__wStrip.ss__addItem(ss__wRight, '128px');
        ss__p_wContainer.ss__setContent(ss__wStrip);
    };
    ss__DebugStatesStatesWidget.prototype = Object.create(ss__StateSubscriber.prototype);
    ss__DebugStatesStatesWidget.prototype.constructor = ss__DebugStatesStatesWidget;
    ss__DebugStatesStatesWidget.prototype.ss__processStateChanges = function(ss__s){
        //this.ss__eState.value = JSON.stringify(ss__s, undefined, 2);
    };
    ss__DebugStatesStatesWidget.prototype.ss__processState = function(ss__p_subscriber, ss__p_state){
        this.ss__lastValidState = ss__p_state;
        this.ss__eState.value = JSON.stringify(ss__p_state, undefined, 2);
    };
    
    function ss__DebugStatesExtenderWidget(ss__p_wContainer){
        ss__p_wContainer.ss___div.className = 'ss__debug_states_extender';
        ss__StateSubscriber.call(this);
        ss__p_wContainer.ss___div.className = 'ss__traliva__debug_panel__states_extender';
    };
    ss__DebugStatesExtenderWidget.prototype = Object.create(ss__StateSubscriber.prototype);
    ss__DebugStatesExtenderWidget.prototype.constructor = ss__DebugStatesExtenderWidget;
    ss__DebugStatesExtenderWidget.prototype.ss__processStateChanges = function(ss__s){
    };
    //'---------------init/debug.js---------------';
    
    /*
    Виджет-подписчик.
    Принимаемые параметры:
    ss__p_wContainer - виджет, в который будем встраивать контент этого виджета
    ss__p_options - опции. Они определяются либо в секции ss__layouts, либо в секции ss__widgets
    ss__p_descr - если виджет-подписчик, создаётся по секции ss__widgets, сам описывающий объект передётся сюда (со свойствами ss__constructor, ss__options, optionsFromState и т.д.)
    */
    
    
    /*****
    set:
    один параметр (массив) - полная замена массива
    два параметра (индекс, значение) - замена отдельного элемента массива. Предполагается, что элемент изменился, и мы должны применить эти изменения.
    *****/
    Array.prototype.set = function(ss__0, ss__1){
        if (ss__0 instanceof Array){
            Array.prototype.splice.apply(this, [0, this.length].concat(ss__0));
        }
        else{
            this[ss__0] = ss__1;
        }
        return this;
    };
    var ss__WidgetStateSubscriber__makeArrayReportable = function(ss__p_reportTaker, ss__p_arr, ss__p_id){
        if (ss__p_arr === undefined){
            // boris here
        }
        else{
            ss__p_arr.set = function(ss__p_0, ss__p_1){
                var ss__tmp, ss__cand, ss__w, ss__0, ss__1, ss__2;
                if (ss__p_0 instanceof Array){
                    // boris here
                    // убираем старых детей
                    for (ss__1 = ss__p_0.length ; ss__1 < ss__p_reportTaker.ss____WidgetStateSubscriber.ss__childrenWidgets[ss__p_id].length ; ++ss__1){
                        console.log('-- removing child WSS --');
                        ss__tmp = ss__p_reportTaker.ss____WidgetStateSubscriber.ss__childrenWidgets[ss__1];
                        ss__tmp.ss__destroy();
                        ss__Traliva.ss____d.ss__publisher.ss__unregisterSubscriber(ss__tmp);
                    }
                    ss__2 = ss__p_reportTaker.ss____WidgetStateSubscriber.ss__childrenWidgets[ss__p_id].length - ss__p_0.length;
                    if (ss__2 > 0)
                        ss__p_reportTaker.ss____WidgetStateSubscriber.ss__childrenWidgets[ss__1].splice(ss__p_0.length, ss__2);
                    // добавляем новых детей
                    for (ss__1 = ss__p_reportTaker.ss____WidgetStateSubscriber.ss__childrenWidgets[ss__p_id].length ; ss__1 <= ss__p_0.length ; ++ss__1){
                        console.log('-- adding child WSS --');
                        ss__tmp = ss__p_reportTaker.ss____WidgetStateSubscriber.ss__descr.ss__children[ss__p_id];
                        ss__w = new ss__Widget(ss__p_reportTaker.ss____WidgetStateSubscriber.ss__wContainer, undefined);// кстати, про второй параметр p_attr ...
                        ss__cand = new ss__tmp.ss__constructor(ss__w, ss__tmp.ss__options, ss__tmp);
                        ss__cand.ss__useSubstate((ss__tmp.ss__substate || '') + '/' + (ss__1 - 1));
                        ss__p_reportTaker.ss____WidgetStateSubscriber.ss__childrenWidgets[ss__p_id].push(ss__cand);
                        ss__Traliva.ss____d.ss__publisher.ss__registerSubscriber(ss__cand);
                    }
                    ss__p_reportTaker.ss____WidgetStateSubscriber.ss__childrenChanged[ss__p_id] = 1;
                }
                else{
                    // boris here
                }
            };
            ss__p_arr.push = function(ss__0){
                //boris here
            };
            ss__p_arr.pop = function(ss__0){
                //boris here
            };
            ss__p_arr.shift = function(ss__0){
                //boris here
            };
            ss__p_arr.unshift = function(ss__0){
                //boris here
            };
            ss__p_arr.splice = function(ss__p_0, ss__p_1){
                //boris here
            };
        }
    };
    
    function ss__WidgetStateSubscriber(ss__p_wContainer, ss__p_options, ss__p_descr, ss__p_changeFlags){
        ss__StateSubscriber.call(this, ss__p_changeFlags);
        var ss__0, ss__1, ss__2, ss__3, ss__4;
        this.ss____WidgetStateSubscriber = {
            ss__wContainer: ss__p_wContainer,
            ss__descr: ss__p_descr,
            ss__childrenChanged: {}, // set: все значения - 1
            ss__childrenWidgets: {} // массивы дочерних виджетов (как { ss__w: <ss__Widget>, ss__o: <ss__WidgetStateSubscriber> })
        };
        if (ss__p_options){
            if (ss__p_options.hasOwnProperty('ss__bg'))
                ss__p_wContainer.ss___div.style.background = ss__p_options.ss__bg;
            if (ss__p_options.hasOwnProperty('ss__scroll')){
                //#USAGE_BEGIN#debug##
                if (typeof ss__p_otions.ss__scroll !== 'number' || (ss__p_otions.ss__scroll & 0xff !== 0x1))
                    console.log('error: опция ss__scroll должна иметь тип маски {ss__Traliva$scroll:v,h}');
                //#USAGE_END#debug##
                ss__1 = ss__p_options.ss__scroll & 0x101;
                if (ss__1 === (ss__p_options.ss__scroll & 0x201))
                    ss__p_wContainer.ss___div.style.overflow = ss__1 ? 'auto' : 'hidden';
                else{
                    ss__p_wContainer.ss___div.style.overflowY = ss__1 ? 'auto' : 'hidden';
                    ss__p_wContainer.ss___div.style.overflowX = ss__1 ? 'hidden' : 'auto';
                }
            }
        }
        if (ss__p_descr){
            console.log('DESCR:', ss__p_descr);
            this.ss____WidgetStateSubscriber.ss__children = ss__p_descr.ss__children || {}; // подсостояния-массивы
        }
        else{
            if (ss__p_options){
                if (ss__1 = ss__p_options.ss___children){
                    for (ss__2 in ss__1){
                        for (ss__3 = 0 ; ss__3 < ss__1[ss__2].length ; ++ss__3){
                            ss__1[ss__2][ss__3].ss___widget.ss__cleanInlineStyles();
                        }
                    }
                }
                return ss__1;
                //return ss__p_options.ss___children;
            }
        }
        // return undefined;
    };
    ss__WidgetStateSubscriber.prototype = Object.create(ss__StateSubscriber.prototype);
    ss__WidgetStateSubscriber.prototype.constructor = ss__WidgetStateSubscriber;
    ss__WidgetStateSubscriber.prototype.ss__container = function(){
        return this.ss____WidgetStateSubscriber.ss__wContainer;
    };
    ss__WidgetStateSubscriber.prototype.ss__processStateChanges = function(s){
        /*вызовите этот базовый метод в начале своей реализации этого метода*/
        if (!s){
            console.error('epic fail');
            return;
        }
        //boris here
        console.log('ТИПА ОБНОВЛЯЕМ СОДЕРЖИМОЕ КОНТЕЙНЕРА');
        if (this.ss____WidgetStateSubscriber.ss__children){
        }
    
        var ss__0, ss__1, ss__2, ss__3,ss__4,
            ss__descr = this.ss____WidgetStateSubscriber.ss__descr,
            ss__arrSubstate,
            ss__cand, /*=undefined*/
            ss__tmp;
        ;
        if (ss__descr && ss__descr.ss__children){
            console.log('-------- children detected:', JSON.stringify(ss__descr.ss__children), ss__descr.ss__children);//
            ss__0 = ss__descr;
            for (ss__1 in ss__descr.ss__children){
                ss__arrSubstate = s;
                if (ss__descr.ss__children[ss__1].ss__substate){
                    ss__0 = ss__descr.ss__children[ss__1].ss__substate.split('/');
                    while ((ss__arrSubstate !== undefined) && ss__0.length){
                        ss__arrSubstate = ss__arrSubstate[ss__0.shift()];
                    }
                }
                if (ss__arrSubstate === this.ss____WidgetStateSubscriber.ss__children[ss__1]){
                    console.log('ссылка на массив сохранилась');//
                    if (this.ss____WidgetStateSubscriber.ss__childrenChanged[ss__1]){
                        if (!ss__cand)
                            ss__cand = {};
                        ss__cand[ss__1] = ss__arrSubstate;
                    }
                }
                else{
                    console.log('ссылка на массив изменилась');//
                    ss__WidgetStateSubscriber__makeArrayReportable(this, ss__arrSubstate, ss__1);
                    //this.ss____WidgetStateSubscriber.ss__children[ss__1] = ss__arrSubstate;
                    if (!ss__cand)
                        ss__cand = {};
                    ss__cand[ss__1] = ss__arrSubstate;
                    if (!(ss__arrSubstate instanceof Array))console.log('epic fail');
                }
            }
            console.log('%%%%%%%%% cand:', ss__cand);//
            /*
                сейчас в cand находится массив в объектами, которые в объекте состояния описывают дочерние виджеты
                мы должны вызват _updateLayout и передать туда объект со свойствами- изменившимися массивами детей ss__0
                ss__0:{
                    items:{
                        _widget: <ссылка на виджет>,
                        ... (опции из descr.options)
                    }
                }
            */
    
            if (ss__cand){
                ss__0 = {};
                for (ss__1 in ss__cand){
                    ss__0[ss__1] = [];
                    console.log('%%%', JSON.stringify(ss__cand));//
                    if (!this.ss____WidgetStateSubscriber.ss__childrenWidgets[ss__1])
                        this.ss____WidgetStateSubscriber.ss__childrenWidgets[ss__1] = [];
                    // убираем лишние
                    for (ss__2 = ss__cand[ss__1].length ; ss__2 < this.ss____WidgetStateSubscriber.ss__childrenWidgets[ss__1].length ; ++ss__2){
                    }
                    // добавляем новые
                    for (ss__2 = this.ss____WidgetStateSubscriber.ss__childrenWidgets[ss__1].length ? this.ss____WidgetStateSubscriber.ss__childrenWidgets[ss__1].length - 1 : 0 ; ss__2 < ss__cand[ss__1].length ; ++ss__2){
                        ss__tmp = Object.create(ss__descr.ss__children[ss__1].ss__options || null);
                        console.log('@@', this.ss____WidgetStateSubscriber.ss__wContainer);//
                        ss__tmp.ss___widget = new ss__Widget(this.ss____WidgetStateSubscriber.ss__wContainer);
                        ss__3 = new ss__descr.ss__children[ss__1].ss__constructor(ss__tmp.ss___widget, ss__descr.ss__children[ss__1].ss__itemOptions || {}); // boris here: надо хранить, чтоб потом удалять. А ещё надо зарегистрировать этого подписчика.
                        ss__4 = this.ss____d.ss__substateMapper ? this.ss____d.ss__substateMapper : '';
                        if (ss__descr.ss__children[ss__1].ss__substate){
                            if (ss__4.length)
                                ss__4 += '/';
                            ss__4 += ss__descr.ss__children[ss__1].ss__substate;
                        }
                        ss__4 += '/' + ss__2;
                        console.log('USE SUBSTATE: ', ss__4);//
                        ss__3.ss__useSubstate(ss__4);
                        ss__Traliva.ss____d.ss__publisher.ss__registerSubscriber(ss__3);
                        this.ss____WidgetStateSubscriber.ss__childrenWidgets[ss__1].push({
                            ss__w: ss__tmp.ss___widget,
                            ss__o: ss__3
                        });
                        ss__0[ss__1].push(ss__tmp);
                    }
                }
                console.log('XX:', ss__0);
                this.ss___updateLayout(ss__0);
            }
        }
        console.log('WSS::processStateChanges finished: ', this);//
    };
    ss__WidgetStateSubscriber.prototype.ss__destroy = function(){};//уничтожить созданный ранее DOM-элемент, вызывается перед отписыванием от издателя
    //ss__WidgetStateSubscriber.prototype._increaseChildrenSize
    ss__WidgetStateSubscriber.prototype.ss___updateLayout = function(ss__p){
    };
    var ss__WidgetStateSubscriber__reSize = /^(\d+)(\s*)((px)|(part))/;
    ss__WidgetStateSubscriber.prototype.ss___transformStringSize = function(ss__str){
    	//Почему невалидное значение по умолчанию - чтобы для программиста не прошло незамеченным.
    	var ss__retVal = {ss__value:undefined, ss__unit:undefined};
    	if (ss__str){
    		//работа с регулярными выражениями
    		var ss__0 = ss__str.match(ss__WidgetStateSubscriber__reSize);
    		if (ss__0){
    			ss__retVal.ss__value = parseInt(ss__0[1]);
    			ss__retVal.ss__unit = ss__0[3];
    		}
    		else{
    			console.log('error: incorrect size parameter (incorrect string)');
    		}
    	}
    	else{
    		ss__retVal.ss__value = 1;
    		ss__retVal.ss__unit = 'part';
    	}
    	//console.log(JSON.stringify(ss__retVal));
    	return ss__retVal;
    };
    ss__Traliva.ss__WidgetStateSubscriber = ss__WidgetStateSubscriber;
    
    function ss__LogicsStateSubscriber(ss__p_changeFlags){
        ss__StateSubscriber.call(this, ss__p_changeFlags);
    };
    ss__LogicsStateSubscriber.prototype = Object.create(ss__StateSubscriber.prototype);
    ss__LogicsStateSubscriber.prototype.constructor = ss__LogicsStateSubscriber;
    ss__LogicsStateSubscriber.prototype.ss__initializeGui = function(ss__p_target, ss__p_layout){
    };
    ss__Traliva.ss__LogicsStateSubscriber = ss__LogicsStateSubscriber;
    
    function ss__StubWidget__getBgByNum(ss__N){
        var ss__colorCount = 7;
        var ss__directionCount = 5;
        var ss__imageCount = 6;
    
        var ss__c, // color index
            ss__d, // direction index
            ss__i; // image index
        ss__c = ss__N % ss__colorCount;
        ss__N -= ss__c;
        ss__d = ss__N % ss__directionCount;
        ss__N -= ss__d;
        ss__i = ss__N % ss__imageCount;
        return 'bg-'+ss__c+'-'+ss__d+'-'+ss__i;
    };
    
    var ss__StubWidget__stubWidgets = {};//stubWidgetId's set
    var ss__StubWidget__stubWidgetCount = 0;
    function ss__StubWidget(ss__p_wContainer, ss__p_id){
        ss__WidgetStateSubscriber.call(this, ss__p_wContainer);
        var ss__e = document.createElement('div');
        ss__e.innerHTML = '<div class="ss__traliva__stub_widget__text">id: "'+ss__p_id+'"</div>';
        ss__p_wContainer.ss__setContent(ss__e);
    
        var ss__bg;
        if (ss__StubWidget__stubWidgets.hasOwnProperty(ss__p_id))
            ss__bg = ss__StubWidget__stubWidgets[ss__p_id];
        else{
            ss__bg = ss__StubWidget__getBgByNum(ss__StubWidget__stubWidgetCount);
            ss__StubWidget__stubWidgets[ss__p_id] = ss__bg;
            ss__StubWidget__stubWidgetCount++;
        }
        ss__p_wContainer.ss___div.className = 'ss__traliva__stub_widget ' + ss__bg;
    };
    ss__StubWidget.prototype = Object.create(ss__WidgetStateSubscriber.prototype);
    ss__StubWidget.prototype.constructor = ss__StubWidget;
    ss__StubWidget.prototype.ss__processStateChanges = function(){};
    ss__WidgetStateSubscriber.prototype.ss__destroy = function(){};//уничтожить созданный ранее DOM-элемент
    ss__Traliva.ss__StubWidget = ss__StubWidget;
    
    //'---------------init/slot_widget.js---------------';
    /*function SlotWidget(ss__p_parentWidget, ss__p_attr){
    	ss__Stack.call(this, ss__p_parentWidget, ss__p_attr);
        this._layerMap = {};
    };
    SlotWidget.prototype = Object.create(ss__Stack.prototype);
    SlotWidget.prototype.constructor = SlotWidget;
    
    //{{ Защита от вызова методов, которые вызывать не нужно
    SlotWidget.prototype.ss__addItem = function(){
    #USAGE_BEGIN#debug##
        console.log('epic fail');
    #USAGE_END#debug##
    };
    SlotWidget.prototype.ss__removeItem = function(){
    #USAGE_BEGIN#debug##
        console.log('epic fail');
    #USAGE_END#debug##
    };
    //}}
    
    SlotWidget.prototype.ss__setContent = function(ss__p_id, p_wContent){
        if (this._layerMap.hasOwnProperty(ss__p_id)){
    #USAGE_BEGIN#debug##
            console.log('epic fail');// перезапись виджетов этот виджет не предполагает
    #USAGE_END#debug##
            return;
        }
        ss__Stack.prototype.ss__addItem.call(this, p_wContent);
        this._layerMap[ss__p_id] = {
            index: this.ss____items.length - 1,
            widget: p_wContent
        };
    };
    SlotWidget.prototype.removeContent = function(ss__p_id){
        if (!this._layerMap.hasOwnProperty(ss__p_id)){
    #USAGE_BEGIN#debug##
            console.log('epic fail');
    #USAGE_END#debug##
            return;
        }
        var index = this._layerMap[ss__p_id].index;
        delete this._layerMap[ss__p_id];
        ss__Stack.prototype.ss__removeItem.call(this, index);
        var ss__0, ss__1;
        for (ss__0 in this._layerMap){
            ss__1 = this._layerMap[ss__0];
            if (ss__1.index > index){
                ss__1.index--;
            }
        }
    };
    SlotWidget.prototype.widget = function(ss__p_id){
        if (!this._layerMap.hasOwnProperty(ss__p_id)){
    #USAGE_BEGIN#debug##
            console.log('epic fail');
    #USAGE_END#debug##
            return;
        }
        return this._layerMap[ss__p_id].widget;
    };*/
    //'---------------init/slot_widget.js---------------';
    //ss__Traliva.SlotWidget = SlotWidget;
    
    //'---------------init/construct_layout.js---------------';
    // ss__p_widgets - конструкторы виджетов
    // ss__p_widgetScope - здесь мы сохраняем наши виджеты
    // в случае аварийного выхода (некорректные параметры) мы заботимся о корректном освобождении памяти и о снятии ненужных подписчиков
    function ss__construct_layout(ss__p_wParent, ss__p_oLayout, ss__p_defaultBackground, ss__p_widgets, ss__p_widgetScope, ss__p_context,ss__p_innerCall){
        
        //console.log('ss__construct_layout: ' + JSON.stringify(ss__p_oLayout));
        
    
        var ss__0, ss__cand, ss__w, ss__type = typeof ss__p_oLayout, ss__tmp,
            ss__options, ss__children, ss__childrenFields,
            ss__1, ss__2, ss__3, ss__4, ss__5,
            ss__retVal,
            ss__used = ss__p_innerCall || {},// множество использованных в новом лэйауте id-шников
            ss__context = ss__p_context;
        ;
        if (!ss__p_innerCall){
            if (!ss__p_widgetScope._)
                ss__p_widgetScope._ = [];
            if (!ss__context){
                ss__context = {
                    ss__statePublisher: ss__Traliva.ss____d.ss__publisher,
                    ss__visibilityMap: ss__Traliva.ss____d.ss__visibilityMap = {},
                    ss__widgets: ss__Traliva.ss__widgets
                };
            }
            for (ss__1 = 0 ; ss__1 < ss__p_widgetScope._.length ; ++ss__1){
                ss__0 = ss__p_widgetScope._[ss__1];
                ss__context.ss__statePublisher.ss__unregisterSubscriber(ss__0);
                ss__0.ss__destroy();
            }
            ss__p_widgetScope._ = [];
            //ss__Traliva.ss____d.ss__visibilityMap = {}; // связь виджетов с подсостояниями, в которых описывается их видимость (для тех виджетов, у которых видимость устанавливается в лейауте)
        }
        if (!ss__p_oLayout){
            // (пружинка)
        }
        if (ss__type === 'string'){
            
            /*
            формируем ss__retVal (виджет)
            ss__p_widgetScope[ss__p_oLayout] - виджет-подписчик
            */
            
            /*if (ss__p_widgetScope.hasOwnProperty(ss__p_oLayout)){
                console.log('error: идентификаторы пользовательских виджетов должны иметь уникальные значения');
                return;// возможно, это зря. Особо не думал.
            }*/
            
            if (ss__p_oLayout.hasOwnProperty('ss__id')){
                //if (ss__Traliva.ss__widgets.hasOwnProperty(ss__p_oLayout.ss__id))
                if (ss__context.ss__widgets.hasOwnProperty(ss__p_oLayout.ss__id))
                    console.error('Обнаружено дублирование идентификаторов виджетов. Идентификатор конфликта - ' + ss__p_oLayout.ss__id);
            }
            
            if (ss__p_widgetScope.hasOwnProperty(ss__p_oLayout)){
                ss__retVal = ss__p_widgetScope[ss__p_oLayout].ss____WidgetStateSubscriber.ss__wContainer;
                ss__retVal.ss__cleanInlineStyles();
            }
            else{
                ss__retVal = new ss__Widget(ss__p_wParent);
                if (ss__p_widgets.hasOwnProperty(ss__p_oLayout)){
                    // вызываем конструктор..
                    ss__0 = ss__p_widgets[ss__p_oLayout];
                    if (typeof ss__0 === 'function')
                        ss__cand = new ss__0(ss__retVal);
                    else{
                        //boris here
                        ss__tmp = ss__0.ss__options || {};
                        if (ss__tmp){
                            if (ss__tmp.ss__bg === '')
                                ss__tmp.ss__bg = ss__p_defaultBackground;
                        }
                        ss__cand = new ss__0.ss__constructor(ss__retVal, ss__tmp, ss__0);
                        if (ss__0.hasOwnProperty('ss__substate'))
                            ss__cand = ss__cand.ss__useSubstate(ss__0.ss__substate);
                        //ss__3.ss___widget = ss__construct_layout(ss__retVal, ss__3.ss___widget, ss__p_oLayout.ss__bg || ss__p_defaultBackground, ss__p_widgets, ss__p_widgetScope, ss__context, ss__p_innerCall || ss__used);
                    }
                }
                else{
                    // создаём виджет-заглушку
                    //console.log('создаётся виджет-заглушка для элемента лейаута с ss__id = \''+ss__p_oLayout+'\'');
                    ss__cand = new ss__StubWidget(ss__retVal, ss__p_oLayout);
                }
                //ss__retVal.setContent(ss__cand);ss__cand - не виджет, а его представитель из мира Подписчиков
                //ss__Traliva.ss____d.ss__widgets[ss__p_oLayout] = ss__retVal;
                ss__context.ss__widgets[ss__p_oLayout] = ss__retVal;
                ss__p_widgetScope[ss__p_oLayout] = ss__cand;
                ss__context.ss__statePublisher.ss__registerSubscriber(ss__cand);
            }
            ss__used[ss__p_oLayout] = 1;
        }
        else if (ss__type === 'object'){ // пользовательский контейнер
            
            /*
            формируем ss__retVal (виджет)
            ss__p_widgetScope[ss__p_oLayout] - виджет-подписчик
            */
            
            //if (!ss__p_oLayout.hasOwnProperty('ss__type'))
            if (typeof ss__p_oLayout.ss__type !== 'function'){
                console.error('error: incorrect layout description: \'type\' should be and should be as function');
            }
            
            ss__retVal = new ss__Widget(ss__p_wParent);
            ss__childrenFields = ss__p_oLayout.ss__type.ss__widgetsFields;
            ss__children = {};
            ss__options = {};
            
            for (ss__1 in ss__p_oLayout){
                if (ss__1 === 'ss___visibleSubstate' || ss__1 === 'ss___visibleValue')
                    continue;
                if ((ss__childrenFields === undefined) || (ss__childrenFields.indexOf(ss__1) < 0))
                    ss__options[ss__1] = ss__p_oLayout[ss__1];
                else{
                    ss__0 = ss__p_oLayout[ss__1];
                    
                    if (!(ss__0 instanceof Array)){
                        console.log('error');
                        return;
                    }
                    
                    ss__children[ss__1] = [];
                    for (ss__2 = 0 ; ss__2 < ss__0.length ; ++ss__2){
                        ss__3 = ss__0[ss__2];
                        if (typeof ss__3 === 'string')
                            ss__3 = {ss___widget: ss__3};
                        else{
                            ss__3 = Object.create(ss__3); // само исходное описание лейаута нам нужно оставить немодифицированным, чтоб по нему можно было ещё раз сгенерировать
                            
                            if (!ss__3.ss___widget){
                                console.log('error');
                                return;
                            }
                            
                        }
                        ss__3.ss___widget = ss__construct_layout(ss__retVal, ss__3.ss___widget, ss__p_oLayout.ss__bg || ss__p_defaultBackground, ss__p_widgets, ss__p_widgetScope, ss__context, ss__used);
                        if (ss__3.ss___visibleSubstate){
                            if (!ss__context.ss__visibilityMap.hasOwnProperty(ss__3.ss___visibleSubstate))
                                ss__context.ss__visibilityMap[ss__3.ss___visibleSubstate] = {};
                            ss__4 = ss__context.ss__visibilityMap[ss__3.ss___visibleSubstate];
                            ss__5 = ss__3.ss___visibleValue || '_';
                            if (!ss__4.hasOwnProperty(ss__5))
                                ss__4[ss__5] = [];
                            ss__4 = ss__4[ss__5];
                            ss__4.push(ss__3.ss___widget);
                        }
                        ss__children[ss__1].push(ss__3);
                    }
                }
            }
            ss__options.ss___children = ss__children;
            ss__cand = new ss__p_oLayout.ss__type(ss__retVal, ss__options);
            if (ss__p_oLayout.ss___substate){
                ss__cand.ss__useSubstate(ss__p_oLayout.ss___substate);
            }
            ss__p_widgetScope._.push(ss__cand);
            ss__context.ss__statePublisher.ss__registerSubscriber(ss__cand);
            
            
            //ss__p_widgetScope[ss__p_oLayout.ss__id] = ss__cand;
            
            
            /*ss__tmp = ss__type.ss__options;
            if (ss__tmp && ss__tmp.hasOwnProperty('ss__bg') && (ss__tmp.ss__bg.length === 0))
                ss__tmp.ss__bg = ss__p_defaultBackground;
            ss__cand = new ss__type.ss__constructor(ss__retVal, ss__tmp);
            ss__0 = ss__type.ss__widgetsFields || [];*/
            
            /*else if (typeof ss__type === 'function'){
                ss__0 = ss__type.ss__widgetsFields || [];
                ss__cand = [];
                for (ss__1 = 0 ; ss__1 < ss__0.length ; ++ss__1){
                    ss__2 = ss__0[ss__1];
                    if (ss__p_oLayout[ss__2]){
                        ss__w = ss__construct_layout();
                        ss__cand.push(ss__p_oLayout[ss__2]); // должны вставить конструкцию виджета по лейауту
                    }
                    else{
                        //
                    }
                }
            }*/
            
            /*if (ss__type === 'strip'){
                #USAGE_BEGIN#debug##
                if (!ss__p_oLayout.hasOwnProperty('ss__orient'))
                    console.error('error: layout must have property \'ss__orient\'');
                #USAGE_END#debug##
                var ss__orient;
                if (ss__p_oLayout.ss__orient === 'h')
                    ss__orient = ss__Traliva.ss__Strip__Orient__hor;
                else if (ss__p_oLayout.ss__orient === 'v')
                    ss__orient = ss__Traliva.ss__Strip__Orient__vert;
                #USAGE_BEGIN#debug##
                else
                    console.error('error: incorrect value of a strip orientation. Possible values: \'h\',\'v\'.');
                #USAGE_END#debug##
                ss__retVal = new ss__Strip(ss__orient, ss__p_wParent, ss__p_oLayout.ss__scroll);
                if (ss__p_oLayout.hasOwnProperty('ss__items')){
                    for (ss__0 = 0 ; ss__0 < ss__p_oLayout.ss__items.length ; ss__0++){
                        //console.log('item '+ss__0);
                        ss__cand = ss__p_oLayout.ss__items[ss__0];
                        if (typeof ss__cand === 'string'){
                            ss__cand = {widget: ss__cand};
                        }
                        if (ss__cand.widget){
                            ss__w = ss__construct_layout(ss__retVal, ss__cand.widget, ss__p_oLayout.ss__bg || ss__p_defaultBackground, ss__p_widgets, ss__p_widgetScope, ss__p_innerCall || ss__used);
                        }
                        else{
                            ss__w = new ss__Widget(ss__retVal);
                        }
                        #USAGE_BEGIN#debug##
                        if (!ss__w)
                            console.error('oops');// error ocurred in internal self calling
                        console.log('widget added to layout');
                        #USAGE_END#debug##
                        ss__retVal.ss__addItem(ss__w, ss__cand.ss__size);
                    }
                }
            }
            else if (ss__type === 'ss__stack'){
                ss__retVal = new ss__Stack(ss__p_wParent, ss__p_oLayout.ss__scroll);
                for (ss__0 = 0 ; ss__0 < ss__p_oLayout.ss__items.length ; ss__0++){
                    ss__cand = ss__p_oLayout.ss__items[ss__0];
                    if (typeof ss__cand === 'string' || ss__cand.hasOwnProperty('ss__type'))
                        ss__cand = {widget: ss__cand};
                    ss__w = ss__construct_layout(ss__retVal, ss__cand.widget, ss__p_oLayout.ss__bg || ss__p_defaultBackground, ss__p_widgets, ss__p_widgetScope, ss__p_innerCall || ss__used);
                    #USAGE_BEGIN#debug##
                    if (!ss__w)
                        console.error('oops'); // error ocurred in internal self calling
                    #USAGE_END#debug##
                    ss__retVal.ss__addItem(ss__w);
                }
            }
            #USAGE_BEGIN#debug##
            else{
                console.error('error: incorrect type of a layout item');
            }
            #USAGE_END#debug##
            */
        }
        if (ss__p_oLayout.hasOwnProperty('ss__bg')){
            ss__cand = (ss__p_oLayout.ss__bg.length) ? ss__p_oLayout.ss__bg : ss__p_defaultBackground;
            if (ss__cand)
                ss__retVal.ss___div.style.background = ss__cand;
        }
    
        if (!ss__p_innerCall){
            // уничтожаем те виджеты, ss__id которых не попали в ss__used
            for (ss__0 in ss__p_widgetScope){
                if (ss__0 === '_') // здесь у нас массив виджетов-контейнеров. Они всегда уничтожаются при смене лейаута.
                    continue;
                if (!ss__used.hasOwnProperty(ss__0)){
                    ss__context.ss__statePublisher.ss__unregisterSubscriber(ss__p_widgetScope[ss__0]);
                    ss__w = ss__p_widgetScope[ss__0].ss__destroy(); // ss__w - DOM-элемент...
                    delete ss__p_widgetScope[ss__0];
                }
            }
        }
        if (ss__p_oLayout.hasOwnProperty('ss__id')){
            //ss__Traliva.ss__widgets[ss__p_oLayout.ss__id] = ss__retVal;
            ss__context.ss__widgets[ss__p_oLayout.ss__id] = ss__retVal;
        }
        return ss__retVal; // возврат из функции должен быть здесь
    };
    ss__Traliva.ss___constructLayout = ss__construct_layout;
    //'---------------init/construct_layout.js---------------';
    //'---------------init/догрузчик.js---------------';
    /* Предполагается, что использоваться будет с подсостоянием */
    //function Догрузчик(p_getUrl, p_parent, p_scope){
    function ss__Extender(ss__p_getUrl, ss__p_scope){
        ss__StateSubscriber.call(this);
        this.ss___extId = undefined;
        this.ss___getUrl = ss__p_getUrl;
        this.ss___scope = ss__p_scope;
    };
    ss__Extender.prototype = Object.create(ss__StateSubscriber.prototype);
    ss__Extender.prototype.constructor = ss__Extender;
    ss__Extender.prototype.ss__processStateChanges = function(ss__s){
        if (ss__s === this.ss___extId)
            return;
        console.log('Меняю id на ' + ss__s);
    
        if (this.ss___extId){
            // деинициализация старого "продолжения"
        }
    
        var ss__url = this.ss___getUrl(ss__s);
    
        (function(ss__self, ss__url){
        ss__Traliva.ss__ajax({
            ss__sourcePath: ss__url,
            ss__readyFunc: function(ss__result){
                console.log('loaded ok');
                var ss__EXTERNAL = {};
                try{
                    eval(ss__result);
                }
                catch(ss__e){
                    var ss__err = ss__e.constructor('Ошибка возникла во время исполнения загруженного скрипта (ss__url=\''+ ss__url + '\'): ' + ss__e.message);
                    ss__err.lineNumber = ss__e.lineNumber + 4 - ss__err.lineNumber; // 4 - количество строк, прошедших от вызова eval()
                    throw ss__err;
                    return;
                }
                ss__self.ss__ok(ss__EXTERNAL);
            },
            ss__errorFunc: function(ss__isNetworkProblem){
                console.log('loaded not ss__ok');
            }
        });
        })(this, ss__url);
    
        this.ss___extId = ss__s;
    };
    ss__Extender.prototype.ss__ok = function(ss__o){
        console.log(JSON.stringify(ss__o));
        //if (ss__Traliva.ss____d.w.hasOwnProperty())
        var ss__0, ss__content,ss__d = ss__Traliva.ss____d, ss__slotWidget;
        for (ss__0 in ss__d.ss__w){
            console.log(ss__0 + '-- '+ss__d.ss__w[ss__0]);//
        }
        for (ss__0 in ss__o.ss__layouts){
            console.log('downloaded layout id: '+ss__0);//
            //continue;//
    
            ss__slotWidget = ss__d.ss__widgets[ss__0];
            if (!ss__slotWidget){
                console.log('epic fail: ' + ss__0);
                continue;
            }
            ss__content = ss__construct_layout(ss__slotWidget, ss__o.ss__layouts[ss__0], ss__o.ss__widgets, this.ss___scope);// boris here: неполный набор параметров
            if (ss__content){
                ss__slotWidget.ss__setContent(ss__content);
            }
            console.log('test: ' + typeof ss__content);//
        }
    
        //states
        if (ss__o.hasOwnProperty('ss__states')){
            this.ss___scope.ss__states = ss__o.ss__states;
        }
    
        //extender
        if (ss__o.hasOwnProperty('ss__extender')){
            this.ss___scope.ss__extender = ss__o.ss__extender;
        }
    };
    ss__Extender.prototype.ss__fail = function(ss__p_reason){
        console.log('error: ' + ss__p_reason);
    };
    //'======================================';
    //'---------------init/fill_param.js---------------';
    function ss__checkConstructorForInheritance(ss__p_validating, ss__p_validatingFor){
    	//return (new ss__p_validating()) instanceof ss__p_validatingFor;
    
    	var ss__0;
    	for (ss__0 = ss__p_validating.prototype ; ss__0 ; ss__0 = ss__0.constructor.prototype.__proto__){
    		if (ss__0.constructor === ss__p_validatingFor)
    			return true;
    	}
    	return false;
    };
    
    // Функция, разворачивающая сокращённую форму записи в полную
    function ss__fillParam(ss__0){
    	var ss__1, ss__2, ss__3;
    
    	// сначала проверим корректность ss__Traliva.debug
    	if (ss__Traliva.hasOwnProperty('ss__debug')){
    		if (typeof ss__Traliva.ss__debug !== 'object')
    			return '';
    	}
    
    	if (typeof ss__0 !== 'object'){
    		return 'В ss__Traliva.ss__init() необходимо передать объект. Для начала укажите свойство "ss__get_layout"(функция) или "ss__layouts"(объект)';
    	}
    	if (!ss__0.hasOwnProperty('ss__get_layout')){
    		ss__0.ss__get_layout = function(){return 'ss__0'};
    		ss__2 = ss__0.ss__layouts;
    		if (!(typeof ss__2 === 'string' || ((typeof ss__2 === 'object') && (ss__2.hasOwnProperty('ss__type')))))
    			return 'Если свойство "ss__get_layout" опущено, то в свойстве "ss__layouts" ожидается лэйаут - либо строковый идентификатор виджета, либо объект с обязательным свойством "ss__type"';
    		ss__0.ss__layouts = {ss__0:ss__2};
    	}
    	if (!ss__0.hasOwnProperty('ss__states')){
    		ss__0.ss__states = {
    			ss__initState: {}
    		}
    	}
    	if (ss__0.ss__states.hasOwnProperty('ss__stateSubscribers')){
    		for (ss__1 = 0 ; ss__1 < ss__0.ss__states.ss__stateSubscribers.length ; ss__1++){
    			if (!ss__checkConstructorForInheritance(ss__0.ss__states.ss__stateSubscribers[ss__1], ss__Traliva.ss__LogicsStateSubscriber))
    				return 'Класс "' + ss__0.ss__states.ss__stateSubscribers[ss__1].name + '", указанный в ss__states.ss__stateSubscribers, не наследуется от ss__Traliva.ss__LogicsStateSubscriber';
    		}
    	}
    	else
    		ss__0.ss__states.ss__stateSubscribers = [];
    	if (!ss__0.ss__states.hasOwnProperty('ss__initState'))
    		ss__0.ss__states.ss__initState = {};
    	if (ss__0.ss__states.hasOwnProperty('ss__tree')){
    		/*if (!ss__0.ss__states.ss__initPath || !ss__0.ss__states.ss__stringifyState)
    			return 'Если вы указали свойство "ss__tree", то должны также указать и свойства "ss__initPath" и "ss__stringifyState"';*/
    	}
    
    	if (ss__0.hasOwnProperty('ss__widgets')){
    		for (ss__1 in ss__0.ss__widgets){
    			if (typeof ss__0.ss__widgets[ss__1] === 'function'){//конструктор
    				ss__2 = ss__0.ss__widgets[ss__1];
    				ss__3 = 'ss__widgets.' + ss__1;
    			}
    			else if ((typeof ss__0.ss__widgets[ss__1] !== 'object') || (!(ss__0.ss__widgets[ss__1].ss__constructor))){
    				return 'Объект, указанный в ss__widgets.' + ss__1 + ', должен содержать свойство "ss__constructor"';
    			}
    			else{
    				ss__2 = ss__0.ss__widgets[ss__1].ss__constructor;
    				ss__3 = 'ss__widgets.ss__constructor.' + ss__1;
    			}
    			if (!ss__checkConstructorForInheritance(ss__2, ss__Traliva.ss__WidgetStateSubscriber))
    				return 'Класс "' + ss__0.ss__widgets[ss__1].name + '", указанный в ' + ss__3 + ', не наследуется от ss__Traliva.ss__WidgetStateSubscriber';
    		}
    	}
    	else{
    		ss__0.ss__widgets = {};
    	}
    };
    //'---------------init/fill_param.js---------------';
    // если ss__o.ss__tree не существует, то экземпляр и не создаётся
    function ss__StateToUrlMapper(ss__p_statesObj){
        ss__Traliva.ss__StateSubscriber.call(this);
        this.ss___statesObj = ss__p_statesObj;
        this.ss___ajax = new ss__Traliva.ss__Ajax();
        var ss__uri = window.location.href,
            ss__0, ss__tmp, ss__stack,
            ss__1,
            ss__2 = 2,//два слэша
            ss__3
        ;
        ss__1 = ss__uri.indexOf('//');
        if (ss__uri[0] == '/'){
            ss__1++;
            ss__2++;
        }
        ss__3 = ss__uri.indexOf('/', ss__1 + ss__2) + 1;// '/' тоже является частью URL
        //ss__3 += ss__p_statesObj.initPath.length;//<--
        this.ss__used = 0;
        this.ss__initPath = ss__uri.substr(0, ss__3);
        console.log('INIT PATH: ', this.ss__initPath);//
        //this.ss__initPathLength = ss__3 + 1; 
        this.ss__initPathLength = ss__3 - 1; 
        this.ss___tree = ss__Traliva.ss____d.ss__o.ss__states.ss__tree;
        this.ss___debugMode = ss__Traliva.ss__debug && ss__Traliva.ss__debug.ss__url;
        this.ss__urlUpdating = false;
        if ((this.ss__initPath.substr(0, 7) === 'file://') && !(ss__Traliva.ss__debug && ss__Traliva.ss__debug.ss__url)){
            console.error('Запуск маппера URL в состояние из файловой системы возможен только при активированном режиме отладки \'url\'');
        }
        if (this.ss___debugMode){
            this.ss__initPath = 'http://' + ss__Traliva.ss__debug.ss__url; // без '/' на конце
            this.ss__initPathLength = this.ss__initPath.length;
        }
        this.ss__prevAr = [];//
        this.ss__isVirgin = true;
        //console.log('%%% initPath:', this.ss__initPath);
    
        // в массивах (корневой и d-свойства (дети)) - свойство __list: список предков, начиная от самого себя
        ss__stack = [this.ss___tree];
        this.ss___tree.__list = [this.ss___tree];
        while (ss__stack.length){
            ss__0 = ss__stack.shift();
            for (ss__1 = 0 ; ss__1 < ss__0.length ; ++ss__1){
                for (ss__2 in ss__0[ss__1]){
                    //console.log('+', ss__0[ss__1][ss__2]);//----
                    if (ss__0[ss__1][ss__2].ss__d){
                        ss__3 = ss__0[ss__1][ss__2].ss__d;
                        ss__3.__list = ss__0.__list.slice();
                        ss__3.__list.unshift(ss__3);
                        ss__stack.unshift(ss__3);
                    }
                    else{
                        ss__0[ss__1][ss__2].__list = ss__0.__list;
                    }
                }
            }
        }
        console.log('TREE: ', this.ss___tree);//----
        /*ss__stack = [this.ss___tree];
        ss__tmp = [this.ss___tree];
        // наполняем ss__tmp
        var counter = 0;//
        while (ss__stack.length){
            console.log('tick ', counter++);//
            if (counter > 200){
                console.error('FATAL');
                return;
            }
            ss__0 = ss__stack.shift();
            for (ss__1 = 0 ; ss__1 < ss__0.length ; ++ss__1){
                for (ss__2 in ss__0[ss__1]){
                    if (ss__0[ss__1][ss__2].ss__d){
                        ss__3 = ss__0[ss__1][ss__2].ss__d;
                        ss__tmp.push(ss__3);
                        ss__stack.unshift(ss__3);
                        //ss__stack.push(ss__3);//
                    }
                }
            }
        }
        console.log('TMP: ', ss__tmp.slice());//----
        // второй проход по стеку тем же маршрутом с постепенно тающим содержимым ss__tmp
        while (ss__tmp.length){
            //ss__1 = ss__tmp.slice();
            ss__2 = ss__tmp.shift();
            ss__1 = ss__tmp.slice();//
            ss__2.__list = ss__1;
        }
        console.log('TREE: ', this.ss___tree);//----
        //return;//
        */
    
    
        console.log('StateToUrlMapper: debugMode ' + (this.ss___debugMode ? 'enabled' : 'disabled'));
    };
    ss__StateToUrlMapper.prototype = Object.create(ss__StateSubscriber.prototype);
    ss__StateToUrlMapper.prototype.constructor = ss__StateToUrlMapper;
    /*
    URL changed --> state --> URL corrected
    state changed --> url
    */
    ss__StateToUrlMapper.prototype.ss__processStateChanges = function(s){
    	console.group('processStateChanges');
    	if (this.ss__isVirgin){
    		this.ss__isVirgin = false;
    		if (this.ss___debugMode){
    			this.ss__updateForUrl(this.ss__initPath, true);
    		}
    		else{
    			window.onpopstate = (function(ss__0){
    				return function(){ss__0(document.location.href);};
    			})(this.ss__updateForUrl);
    			this.ss__updateForUrl(window.location.href, true);
    		}
    	}
    	// обойти дерево и составить url. Если совпадает, то ничего не делаем. Если не совпадает - просто заменяем текущий URL.
    	var ss__0, ss__1, ss__2, ss__3, ss__4, ss__5;
    	var ss__cand = this.ss__initPath;
    	if (ss__Traliva.ss__debug && ss__Traliva.ss__debug.ss__url)
    		ss__cand += '/';
    	console.log('init path: ', ss__cand);
    	var ss__stack = this.ss___tree.slice();
    	//console.log('**', this.ss___tree);//
    	var ss__title;
    	while (ss__stack.length){
    		ss__0 = ss__stack.shift();
    		console.log('----', ss__0);
    		ss__for_2: for (ss__2 in ss__0){
    			ss__1 = ss__0[ss__2];
    			//console.log('debugName: ', ss__1.debugName);//
    			console.log('state tree item name: ', ss__2);//
    			ss__3 = this.ss__getSubstate(ss__1.ss__substate);
    			//console.log('ss__3 = ' + ss__3);
    			if (ss__1.hasOwnProperty('ss__name'))
    				ss__3 = ss__3 === ss__1.ss__name;
    			if (ss__3 && ss__1.ss__params){
    				ss__3 = '';
    				console.log('params: ', ss__1.ss__params);//
    				for (ss__4 = 0 ; ss__4 < ss__1.ss__params.length ; ++ss__4){
    					ss__5 = this.ss__getSubstate(ss__1.ss__params[ss__4]);
    					if (ss__5 === undefined){
    						console.log('ERROR: подсостояние параметра не доступно: ' + ss__1.ss__params[ss__4]);
    						break ss__for_2;
    					}
    					ss__3 += ss__5.toString() + '/';
    				}
    			}
    			if (ss__3){
    				ss__title = ss__1.ss__title;
    				ss__cand += ss__2 + '/';
    				if (ss__1.ss__params){
    					ss__cand += ss__3;
    				}
    				if (ss__1.ss__d){
    					for (ss__4 = ss__1.ss__d.length - 1 ; ss__4 >= 0 ; --ss__4){
    						ss__stack.unshift(ss__1.ss__d[ss__4]);
    					}
    				}
    				break ss__for_2;
    			}
    		}
    	}
    	console.log('test URL: ', ss__cand);
    	/*if (ss__Traliva.ss__debug && ss__Traliva.ss__debug.ss__url) // boris stub 230515
    		ss__0 = ss__Traliva.ss__history.ss___current();
    	else
    		ss__0 = location.href;
    	//console.log('current URL:', ss__Traliva.ss__history.ss___current());
    	if (ss__cand !== ss__0){
    		if (typeof ss__title === 'function'){
    			ss__title = ss__title(s);
    		}
    		document.title = ss__title || '';
    		this.ss__urlUpdating = true;
    		ss__Traliva.ss__history.replaceState({}, '', ss__cand);
    		this.ss__urlUpdating = false;
    	}*/
    	console.groupEnd();
    };
    ss__StateToUrlMapper.prototype.ss__updateForUrl = function(ss__p_url, ss__p_ifInit){
        if (this.ss__urlUpdating)
            return;
        console.group('update for URL:', ss__p_url, 'init:', ss__p_ifInit);
        //console.log('--', ss__p_url, '-- initPath:', this.ss__initPath);
        //this.ss___tree, this.ss__initPath, this.ss__initPathLength
        var ss__0, ss__1, ss__2, ss__3, ss__4, ss__5, ss__roots,
            ss__tmp, ss__cand,
            ss__ar = [], ss__stateChanged = ss__p_ifInit,
            ss__eTree
        ;
        ss__0 = ss__p_url.slice(this.ss__initPathLength); // boris here
        if (ss__0[ss__0.length - 1] !== '/')
            ss__0 += '/';
        console.log('##', ss__0, this.ss__initPathLength);//
        //var i, ii, cand, o, tmp;
        for (ss__1 = ss__0.indexOf('/', 1) ; ss__1 >= 0 ; ss__1 = ss__0.indexOf('/', 1)){
            ss__cand = ss__0.slice(1, ss__1);
            if (ss__cand.length) // встречающиеся двойные слеши трактуем как одинарные
                ss__ar.push(ss__cand);
            ss__0 = ss__0.slice(ss__1);
            console.log('*', ss__1, ss__ar, ss__0);
        }
        console.log('*-*', ss__ar, ss__0);
        //bTree = (ss__i === 0) ? bTree[ss__ar[ss__i]] : bTree.ss__d[ss__ar[ss__i]];
    
        if (ss__p_ifInit){
            this.ss___state = ss__Traliva.ss____d.ss__o.ss__states.ss__initState || {};
        }
        /*else{ // Выставляем в 'undefined' (или '', если указано свойство 'name') по prevAr
            ss__eTree = this.ss___tree.slice();
            for (ss__1 = 0 ; ss__1 < this.ss__prevAr.length ; ++ss__1){
                ss__0 = this.ss__prevAr[ss__1];
            }
        }*/
    
        // выставляем новые значения
        // ...
    
        /*
            Сохраняем roots для this.ss__prevAr и для ss__ar:
                пересечения - переустановить значения параметров
                есть в prevAr, но нет в ar - деструкция
                есть в ar, но нет в prevAr - конструкция
            roots - список ссылок на узлы this.ss___tree. Под именем roots - два такизх roots - для this._prevAr и для ss__ar.
            roots хранит объекты со свойствами url (один элемент из ar) и eTree
        */
        var ss__fCleanUsed = function(ss__p_arr){
            var ss__1;
            for (ss__1 = 0 ; ss__1 < ss__p_arr.length ; ++ss__1){
                delete ss__p_arr[ss__1]['__used'];
            }
        };
        ss__roots = [[],[]];// для this.ss__prevAr и для ss__ar
        var ss__ars = [this.ss__prevAr, ss__ar];
        console.log('PRELIMINAR ARS:\n', JSON.stringify(ss__ars));
        var ss__iArs, ss__oAr;
        var ss__used;
        var ss__appliedAr;//та часть ar, что была обработана и является корректной. Используется в случае некорректного URL для генерации корректного URL.
        var ss__title;
        ss__for_iArs: for (ss__iArs = 0 ; ss__iArs < 2 ; ++ss__iArs){
            ss__oAr = ss__ars[ss__iArs];
            ss__tmp = this.ss___tree;
            ss__appliedAr = [];
            ss__for_1: for (ss__1 = 0 ; ss__1 < ss__oAr.length ; ++ss__1){
                console.log('-- 1 --', ss__oAr[ss__1]);
                //console.log('ss__tmp:', JSON.stringify(ss__tmp));
                ss__used = false;
                if (ss__tmp){
                    ss__for_2: for (ss__2 = 0 ; ss__2 < ss__tmp.__list.length ; ++ss__2){
                    console.log('-- 2 --', ss__tmp.__list[ss__2]);//
                        for (ss__3 = 0 ; ss__3 < ss__tmp.__list[ss__2].length ; ++ss__3){
                        console.log('-- 3 --');
                            for (ss__4 in ss__tmp.__list[ss__2][ss__3]){
                                console.log('-- 4 --');
                                console.log('ss__1, ss__2, ss__3, ss__4', ss__1, ss__2, ss__3, ss__4, 'tmp:', ss__tmp);//
                                if (ss__4 === ss__oAr[ss__1]){
                                    ss__cand = {
                                        ss__url: ss__4,
                                        ss__eTree: ss__tmp.__list[ss__2],
                                    };
                                    //console.log('&*%*&%*&%&*^%&*^%', ss__tmp.__list[ss__2][ss__3]);//
                                    if (ss__tmp.__list[ss__2][ss__3][ss__4].ss__params){
                                        console.log('parameters detected');
                                        if (ss__tmp.__list[ss__2][ss__3][ss__4].ss__params.length >= (ss__oAr.length - ss__1)){
                                            // отображаем текущий узел - не указано необходимых параметров
                                            console.log('error: не указано необходимое количество параметров');
                                            break ss__for_2;
                                        }
                                        else{
                                            for (ss__5 = 0 ; ss__5 <= ss__tmp.__list[ss__2][ss__3][ss__4].ss__params.length ; ++ss__5){
                                                ss__appliedAr.push(ss__oAr[ss__1 + ss__5]);
                                            }
                                            ss__5 = ss__tmp.__list[ss__2][ss__3][ss__4].ss__params.length;
                                            ss__cand.ss__params = ss__oAr.slice(ss__1 + 1, ss__1 + 1 + ss__5);
                                            ss__tmp.__list[ss__2][ss__3][ss__4].ss__paramValues = ss__oAr.slice(ss__1 + 1, 1 + ss__tmp.__list[ss__2][ss__3][ss__4].ss__params.length + 1);
                                            ss__1 += ss__5;
                                            //console.log('===', JSON.stringify(ss__appliedAr), ss__oAr);//
                                        }
                                    }
                                    else{
                                        console.log('no parameters');
                                        ss__appliedAr.push(ss__oAr[ss__1]);
                                        ss__title = ss__tmp.__list[ss__2][ss__3][ss__4].ss__title;
                                    }
                                    ss__used = true;
                                    console.log('PUSHING:', ss__cand);
                                    ss__roots[ss__iArs].push(ss__cand);
                                    ss__tmp.__list[ss__2][ss__3][ss__4].__used = true;
                                    ss__tmp = ss__tmp.__list[ss__2][ss__3][ss__4];
                                    if (ss__tmp.ss__d)
                                        ss__tmp = ss__tmp.ss__d;
                                    continue ss__for_1;
                                }
                            } // for ss__4
                        } // for ss__3
                    } // for ss__2
                }
                if (!ss__used){
                    //console.log(ss__iArs, '=================');
                    console.log('ERROR!!', ss__appliedAr); // Если индекс нулевой, то это EPIC FAIL.
                    // заменяем текущий URL на обрезанный, соответствующий текущей позиции в ss__oAr. При этом не должны ещё раз свалиться в обработчик смены URL-а.
                    if (this.ss___debugMode){
                        ss__cand = this.ss__initPath + '/' + ss__appliedAr.join('/');
                        if (ss__appliedAr.length)
                            ss__cand += '/';
                        ss__Traliva.ss__history.ss___updateUrl(ss__cand);
                    }
                    else{
                        // ...
                    }
                    ss__ar = ss__appliedAr;
                    break ss__for_iArs;
                }
            } // for ss__1
            ss__fCleanUsed(ss__roots[ss__iArs]);
        } // for ss__iArs
        //console.log('roots: ', JSON.stringify(ss__roots, undefined, 2));
        if (typeof ss__title === 'function'){
            ss__title = ss__title(this.ss___state);
        }
        document.title = ss__title || '';
    
        //console.log('==============================');
        if (!this.ss___fContains){
            this.ss___fContains = function(ss__pArray, ss__pTarget){
                var ss__1, ss__2;
                if (ss__pTarget){
                    for (ss__1 = 0 ; ss__1 < ss__pArray.length ; ++ss__1){
                        ss__2 = ss__pArray[ss__1];
                        if (ss__2.ss__eTree === ss__pTarget.ss__eTree && ss__2.ss__url === ss__pTarget.ss__url)
                            return true;//return ss__pTarget.ss__eTree[ss__pTarget.ss__url];
                    }
                }
                return false;
            };
            this.ss___fGetTreeObject = function(ss__pArItem){
                var iss__0, ss__1;
                for (ss__1 = 0 ; ss__1 < ss__pArItem.ss__eTree.length ; ++ss__1){
                    ss__0 = ss__pArItem.ss__eTree[ss__1][ss__pArItem.ss__url];
                    if (ss__0)
                        return ss__0;
                }
            };
        }
    
        for (ss__1 = 0 ; ss__1 < ss__roots[0].length ; ++ss__1){
            ss__3 = ss__roots[0][ss__1];
            ss__2 = this.ss___fContains(ss__roots[1], ss__3);
            ss__3 = this.ss___fGetTreeObject(ss__3);
            if (!ss__2){
                // есть в prevAr, но нет в ar - деструкция
                //console.log('деструкция: ', JSON.stringify(ss__3, undefined, 2));
                this.ss__setSubstate(ss__3.ss__substate);
                ss__stateChanged = true;
                if (ss__3.ss__extender){
                    //boris here 2
                }
            }
        }
        if (ss__stateChanged)
            this.ss___registerStateChanges();
        ss__stateChanged = false;
        for (ss__1 = 0 ; ss__1 < ss__roots[1].length ; ++ss__1){
            ss__3 = ss__roots[1][ss__1];
            ss__2 = this.ss___fContains(ss__roots[0], ss__3);
            ss__3 = this.ss___fGetTreeObject(ss__3);
            if (ss__2){
                // есть и в ar, и в prevAr - обновляем параметры
                //console.log('обновляем параметры: ', JSON.stringify(ss__3, undefined, 2));
                if (ss__3.ss__params){
                    for (ss__4 = 0 ; ss__4 < ss__3.ss__params.length ; ++ss__4){
                        console.log(ss__3.ss__params[ss__4] + ' -- ' + ss__3.ss__paramValues[ss__4]);
                        this.ss__setSubstate(ss__3.ss__params[ss__4], ss__3.ss__paramValues[ss__4]);
                    }
                }
            }
            else{
                // есть в ar, но нет в prevAr - конструкция
                //console.log('конструкция: ', JSON.stringify(ss__3, undefined, 2));
                this.ss__setSubstate(ss__3.ss__substate, ss__3.ss__name || true);
                if (ss__3.ss__params){
                    for (ss__4 = 0 ; ss__4 < ss__3.ss__params.length ; ++ss__4){
                        console.log(ss__3.ss__params[ss__4] + ' -- ' + ss__3.ss__paramValues[ss__4]);
                        this.ss__setSubstate(ss__3.ss__params[ss__4], ss__3.ss__paramValues[ss__4]);
                    }
                }
                if (ss__3.ss__extender){
                    //this.ss___ajax.ss__request(ss__p_url, ss__p_paramObject, ss__p_okFunc, ss__p_errorFunc, ss__p_ignoreOkFunc, ss__p_ignoreErrorFunc); // boris here 1
                    /*(function(){
                        this.ss___ajax.ss__request(
                            ss__3.ss__extender.ss__url,
                            {},
                            function(){},
                            function(){},
                            function(){},
                            function(){}
                        ); // boris here 1
                    })(this);*/
                }
            }
            ss__stateChanged = true;
        }
        this.ss__prevAr = ss__ar;
    
        if (ss__stateChanged)
            this.ss___registerStateChanges();
        console.groupEnd();
    };
    
    // в соответствии с текущим URL устанавливаем нужные значения в state
    /*ss__StateToUrlMapper.prototype.updateState = function(){
        console.log('---');
        var url = window.location.href.slice(this.ss__initPathLength);
        console.log('#############', this.ss__initPathLength, this.ss__initPath, url);
        var urlArr = [];
        var i;
        while ((i = url.indexOf('/'), i) >= 0){
            console.log('::', i);
        }
        this.ss___registerStateChanges();
    }*/
    ss__StateToUrlMapper.prototype.ss__setSubstate = function(ss__p_substate, ss__p_value){ // подсостояние здесь может задаваться только в строковом виде
        console.log('setSubstate: ', ss__p_substate, ss__p_value);
        if (ss__p_substate.length === 0){
            console.log('ошибка. указано некорректное подсостояние');
            return;
        }
        var ss__0 = this.ss___state,
            ss__1 = ss__p_substate.split('/'),
            ss__2;
        while (ss__1.length > 1){
            ss__2 = ss__1.shift();
            if (ss__0.hasOwnProperty(ss__2)){
                ss__0 = ss__0[ss__2];
            }
            else{
                if (ss__p_value === undefined)
                    return;
                else{
                    ss__0[ss__2] = {};
                    ss__0 = ss__0[ss__2];
                }
            }
        }
        ss__0[ss__1[0]] = ss__p_value;
    };
    ss__StateToUrlMapper.prototype.ss__getSubstate = function(ss__p_substate){
        console.log('-- getSubstate --');//
        var ss__0 = ss__p_substate.split('/'), ss__1 = this.ss___state, ss__2;
        for (ss__2 = 0 ; ss__2 < ss__0.length ; ++ss__2){
            if (!(ss__1 = ss__1[ss__0[ss__2]]))
                return ss__1;
        }
        return ss__1;
    };
    function ss__VisibilitySwitcher(){
        ss__Traliva.ss__StateSubscriber.call(this);
        this.ss___currentMap = {};// а надо ли как-то дестроить после смены лейаута?
    };
    ss__VisibilitySwitcher.prototype = Object.create(ss__StateSubscriber.prototype);
    ss__VisibilitySwitcher.prototype.constructor = ss__StateToUrlMapper;
    ss__VisibilitySwitcher.prototype.ss__processStateChanges = function(s){
        // visibility map - at ss__Traliva.ss____d.ss__visibilityMap
        var ss__0 = ss__Traliva.ss____d.ss__visibilityMap;
        if (!ss__0)
            return;
        this.ss___update();
    };
    ss__VisibilitySwitcher.prototype.ss___update = function(){
        var ss__0 = ss__Traliva.ss____d.ss__visibilityMap,
            ss__1, ss__2, ss__3, ss__4, ss__5
        ;
        //console.log('^^ visibilityMap:', ss__0);//
        for (ss__1 in ss__0){
            // ss__1 - substate
            //console.log('^^ substate: ', ss__1);//
            ss__2 = ss__0[ss__1];
            for (ss__2 in ss__0[ss__1]){
                // ss__2 - требуемое значение подсостояния
                ss__3 = ss__0[ss__1][ss__2]; // ss__3 - массив виджетов
                for (ss__4 = 0 ; ss__4 < ss__3.length ; ++ss__4){
                    ss__5 = ss__StateToUrlMapper.prototype.ss__getSubstate.call(this, ss__1);
                    console.log('*** curent substate value: ', ss__5);//
                    ss__3[ss__4].ss__setVisible(ss__2 === '_' ? ss__5 : ss__5 ===  ss__2);//
                }
            }
        }
    };
    //'---------------init/init.js---------------';
    // Функция переключения лэйаутов
    function ss__switchToLayout(ss__layId){
        //console.log('switch to ss__layout ' + ss__layId);
        var ss__d = ss__Traliva.ss____d;
        if (ss__d.ss__layout === ss__layId)
            return;
        
        if (!ss__d.ss__o.ss__layouts.hasOwnProperty(ss__layId)){
            console.log('Указанный лэйаут не описан');
            ss__layId = undefined;
        }
        
        //if (ss__d.ss__layout){ // чистим за старым лэйаутом
            // если при этом не валиден ss__layId (который подчищает за предыдущим виджеты),
            // то это косяк разработчика - оставляем последний валидный лэйаут
    
            // а если ss__layId валиден, то construct_layout подчищает за предыдущим лэйаутом
    
            // итого: здесь мы ничего не делаем
        //}
        //отписываем все текущие виджеты
        var ss__0;
        if (ss__layId){ // создаём новый лэйаут
            for (ss__0 in ss__Traliva.ss__widgets){
                delete ss__Traliva.ss__widgets[ss__0];
            }
            var ss__content = ss__construct_layout(ss__d.ss__wRoot, ss__d.ss__o.ss__layouts[ss__layId], undefined, ss__d.ss__o.ss__widgets, ss__d.ss__w);
            if (ss__content){
                ss__d.ss__wRoot.ss__setContent(ss__content);
            }
        }
        ss__d.ss__layout = ss__layId;
        setTimeout(function(){
            ss__d.ss__wRoot.ss__resize(ss__d.ss__wRoot.ss____w, ss__d.ss__wRoot.ss____h);
        }, 20);
    };
    
    ss__Traliva.ss__init = function(ss__o){
        
        if (ss__Traliva.hasOwnProperty('ss____d')){
            console.log('Пресечена попытка повторного вызова ss__Traliva.ss__init().');
            return;
        }
        
    
        var ss__0, ss__1, ss__3;
        //ss__0 - i
        //ss__1 - tmp
        //ss__3 - cand
    
        
        console.log('начинаю инициализацию');
        
        ss__1 = ss__fillParam(ss__o);
        
        if (typeof ss__1 === 'string'){
            console.error('В ss__Traliva.ss__init() передан некорректный объект: ' + ss__1);
            return;
        }
        
        ss__Traliva.ss__widgets = {};//сюда будут записываться указатели на сгенерированые виджеты для доступа из кода, описанного в ss__o.states.ss__stateSubscribers, по идентификатору виджета
        var ss__d = ss__Traliva.ss____d = {};
        ss__d.ss__o = ss__o;
        ss__d.ss__w = {};//widgets (WidgetStateSubscriber)
        ss__d.ss__widgets = {};//key: widgetId, value: widget (_WidgetBase)
        if (ss__o.hasOwnProperty('ss__initApi')){
            ss__Traliva.ss__api = {};
            ss__o.ss__initApi(ss__o.ss__target, ss__Traliva.ss__api);
        }
        ss__d.ss__logics = [];//сюда будут сохраняться экземпляры LogicsStateSubscriber, чтобы у них вызывать метод ss__initializeGui()
    
        ss__d.ss__publisher = new ss__StatePublisher();
        ss__d.ss__publisher.ss__setState(ss__o.ss__states.ss__initState);
        if (ss__Traliva.ss__debug){
            ss__d.ss____debug = {
                ss__publisher: new ss__StatePublisherNoDebug()
            };
            ss__3 = {
                ss__show_states: false
            };
            if (ss__Traliva.ss__debug.hasOwnProperty('ss__url')){
                ss__3.ss__url = ss__Traliva.ss__debug.ss__url;
            }
            ss__d.ss____debug.ss__publisher.ss__setState(ss__3);
    
            ss__d.ss____debug.ss__wRoot = new ss__Strip(ss__Traliva.ss__Strip__Orient__vert);
            var ss____wDebugPanel = new ss__Strip(ss__Traliva.ss__Strip__Orient__hor, ss__d.ss____debug.ss__wRoot);
                ss____wDebugPanel.ss___div.className = 'ss__traliva__debug_panel';
                var ss____wDebugPanelBnStates = new ss__Widget(ss____wDebugPanel);
                ss____wDebugPanel.ss__addItem(ss____wDebugPanelBnStates, '128px');
                ss__d.ss____debug.ss__publisher.ss__registerSubscriber(new ss__Button(ss____wDebugPanelBnStates, {ss__valueVarName: 'ss__show_states', ss__color: '#48f', ss__title: 'Состояние'}));
                if (ss__Traliva.ss__debug.hasOwnProperty('ss__url')){
                    var ss____wDebugPanelUrl = new ss__Widget(ss____wDebugPanel);
                    ss____wDebugPanel.ss__addItem(ss____wDebugPanelUrl);
                    if (ss__o.hasOwnProperty('ss__states') && ss__o.ss__states.hasOwnProperty('ss__tree'))
                        ss__d.ss____debug.ss__publisher.ss__registerSubscriber(new ss__DebugPanelUrlWidget(ss____wDebugPanelUrl));
                    else
                        ss____wDebugPanelUrl.ss__setContent(ss__Traliva.ss__createElement('<p class="ss__traliva__debug_panel__error">URL: дерево переходов не задано</p>'));
                }
            ss__d.ss____debug.ss__wRoot.ss__addItem(ss____wDebugPanel, '32px');
            var ss____wDebugCanvas = new ss__Stack(ss__d.ss____debug.ss__wRoot);
            ss__d.ss____debug.ss__wRoot.ss__addItem(ss____wDebugCanvas);
            ss__3 = new ss__Widget(ss____wDebugCanvas);
            ss____wDebugCanvas.ss__addItem(ss__3);
            ss__d.ss__wRoot = ss__3;
            if (ss__Traliva.ss__debug.hasOwnProperty('ss__state')){
                var ss____wDebugStates = new ss__Strip(ss__Traliva.ss__Strip__Orient__vert, ss____wDebugCanvas);
                var ss____wDebugStatesExtender = new ss__Widget(ss____wDebugStates);
                ss____wDebugStates.ss__addItem(ss____wDebugStatesExtender, '64px');
                var ss____wDebugStatesStates = new ss__Widget(ss____wDebugStates);
                ss____wDebugStates.ss__addItem(ss____wDebugStatesStates);
                ss__d.ss____debug.ss__publisher.ss__registerSubscriber(new ss__DebugStatesWidget(ss____wDebugStates, ss____wDebugStatesExtender, ss____wDebugStatesStates));
                ss____wDebugCanvas.ss__addItem(ss____wDebugStates);
            }
            ss__d.ss____debug.ss__publisher.ss__registerSubscriber(new ss__DebugConsole());
        }
        else
            ss__d.ss__wRoot = new ss__Widget();
        if (ss__o.ss__states.hasOwnProperty('ss__tree')){
            ss__d.ss__stateToUrlMapper = new ss__StateToUrlMapper({
                ss__initPath: ss__o.ss__states.ss__initPath,
                ss__initState: ss__o.ss__states.ss__initState,
                ss__tree: ss__o.ss__states.ss__tree,
                ss__stringifyState: ss__o.ss__states.ss__stringifyState
            });
            ss__d.ss__publisher.ss__registerSubscriber(ss__d.ss__stateToUrlMapper);
        }
        
        ss__d.ss__wRoot.ss___div.className = 'ss__wRoot';//
        ss__d.ss__curLayout = undefined;
        ss__1 = new ss__VisibilitySwitcher();
        ss__d.ss__publisher.ss__registerSubscriber(ss__1);
        ss__d.ss__wRoot.ss___onResized = function(ss__d, ss__f, ss__visibilitySwitcher){return function(ss__w,ss__h){
            var ss__0, ss__lay = ss__d.ss__o.ss__get_layout(ss__w,ss__h,ss__d.ss__o.ss__target);
            ss__Widget.prototype.ss___onResized.call(ss__d.ss__wRoot, ss__w, ss__h);
            ss__f(ss__lay);
            ss__visibilitySwitcher.ss___update();
            for (ss__0 = 0 ; ss__0 < ss__d.ss__logics.length ; ss__0++){
                ss__d.ss__logics[ss__0].ss__initializeGui(ss__d.ss__o.ss__target, ss__lay);
            }
        };}(ss__d, ss__switchToLayout, ss__1);
    
        for (ss__0 = 0 ; ss__0 < ss__o.ss__states.ss__stateSubscribers.length ; ss__0++){
            ss__1 = ss__o.ss__states.ss__stateSubscribers[ss__0];
            
            console.log('Создаётся экземпляр подписчика ' + ss__1.name);
            
            if (typeof ss__1 === 'function')
                ss__3 = new ss__1();
            else
                ss__3 = (new ss__1[0]()).ss__substate(ss__1[1]);
            ss__d.ss__logics.push(ss__3);
            ss__d.ss__publisher.ss__registerSubscriber(ss__3);
        }
        if (ss__o.hasOwnProperty('ss__extender')){
            ss__d.ss__extender = {
                ss__o: undefined,
                ss__w: {}, // WidgetStateSubscriber
                ss__widgets: {}, // _WidgetBase
                ss__extender: undefined
            };
            var ss__3 = new ss__Догрузчик(ss__o.ss__extender.ss__getUrl, ss__d.ss__extender);
            if (ss__o.ss__extender.hasOwnProperty('ss__substate'))
                ss__3 = ss__3.ss__useSubstate(ss__o.ss__extender.ss__substate);
            ss__d.ss__publisher.ss__registerSubscriber(ss__3);
        }
    };
    //'---------------init/init.js---------------';
    // ---- begin of utils block ----
    (function(){
    /*
    function ss__ajax - take data from server (always asynchroniusly!). Realized partially (just simplest realization).
    return value - none
    if called without parameter will be printed short help in console
    parameter is an object with the following fields:
    	type		name		description
    	+===		+===		+==========
    	string		ss__sourcePath	network path to load data from
    	function	ss__readyFunc(result) take result in this function
    	function	ss__errorFunc(isNetworkProblem)
    					parameter of this function is Boolean
    					("true" if caused of ss__timeout or network connection breakup)
    					default is write error to console
    	int		ss__timeout		timeout in milliseconds. default is 3000.
    	string		ss__dataToPost	if set, method is "post" instead of default "get". This data will be sent to server.
    	string		ss__mimetype	ss__mimetype of content. default is "text/plain"
    Caution: if some fields in parameter "ss__p" absense, it will be added as undefined. Take this into account if you would use that object later.
    */
    function ss__ajax(ss__p){
        
    	if (!ss__p){
    		console.log("Traliva.ss__ajax(ss__p). Available fileds for ss__p: ss__sourcePath, ss__readyFunc(result), ss__errorFunc(isNetworkProblem), ss__timeout, ss__dataToPost, ss__mimetype*.");
    		return;
    	}
        
    	var ss__sourcePath = ss__p.ss__sourcePath;
    	var ss__readyFunc = ss__p.ss__readyFunc;
    	var ss__errorFunc = ss__p.ss__errorFunc;
    	var ss__timeout = ss__p.ss__timeout;
    	var ss__dataToPost = ss__p.ss__dataToPost;
    	var ss__mimetype = ss__p.ss__mimetype;//unsupported yet: only text
    	var ss__addonHttpHeaders = ss__p.ss__addonHttpHeaders;
    /*
    ss__xhttp.setRequestHeader("Content-Type", "application/json");
    ss__xhttp.setRequestHeader('Content-Type', 'text/plain')
    */
    
    	var ss__xhttp=new XMLHttpRequest();
    	ss__xhttp.addEventListener(
    		'load',
    		function(e){
    			if (ss__readyFunc)
    				ss__readyFunc(ss__xhttp.responseText);
    		}
    	);
    	ss__xhttp.addEventListener(
    		'error',
    		function(e){
    			if (ss__errorFunc)
    				ss__errorFunc(true);//
    		}
    	);
    	ss__xhttp.addEventListener(
    		'abort',
    		function(){
    			if (ss__errorFunc)
    				ss__errorFunc(false);
    		}
    	);
    	ss__xhttp.addEventListener(
    		'timeout',
    		function(){
    			if (ss__errorFunc)
    				ss__errorFunc(true);
    		}
    	);
    	if (ss__dataToPost)
    		ss__xhttp.open("POST", ss__sourcePath, true);
    	else
    		ss__xhttp.open("GET", ss__sourcePath, true);
    //	ss__xhttp.setRequestHeader('Content-Type', 'text/plain');
    	if (ss__addonHttpHeaders){
    		for (var ss__0 in ss__addonHttpHeaders){
    			ss__xhttp.setRequestHeader(ss__0, ss__addonHttpHeaders[ss__0]);
    		}
    	}
    	if (ss__timeout)
    		ss__xhttp.timeout = ss__timeout;
    	ss__xhttp.send(ss__dataToPost);
    };
    ss__Traliva.ss__ajax = ss__ajax;
    /*
    Эта функция устанавливает переданному DOM-элементу p_e CSS-стиль исходя из параметра p_o.
    Параметр p_o - строка, содержащая путь (сетевой!) до картинки, или объект, описывающий картинку в спрайте.
    В случае строки, содержащей путь до картинки, элементу p_e будет установлен встроенный стиль CSS "background".
    В случае использования спрайта элементу p_e будут установлены встроенные стили CSS "background", "width" и "height".
    Формат описания картинки в спрайте:
    {
        ss__path: 'путь/до/описателя/спрайта',
        ss__id: 'идентификатор картинки в описателе спрайта'
    }.
    Описатель спрайта представляет собой JSON-файл. У файла пишется расширение ".sprite". Этот файл имеет следующий формат:
    {
        "ss__image": "путь/до/картинки",
        "ss__rows": [
            {
                "ss__h": высота_строки_спрайта_в_пикселях,
                "ss__items":[
                    {
                        "ss__id": "идентификатор_первой_картинки",
                        "ss__w": ширина_в_пикселях,
                        "ss__h": высота_в_пикселях(если отличается от высоты строки)
                    },
                    ...
                  ]
            },
            {...},
            ...
        ]
    }
    */
    var ss__background__cache = {};
    function ss__background(ss__p_e, ss__p_o){
        //#USAGE_BEGIN#debug##
        if (typeof ss__p_o === 'string'){
            ss__p_e.style.background = 'url("' + ss__p_o + '") 0 0 no-repeat';
        }
        else{
            var ss__apply = function(ss__p_e, ss__p_o, ss__p_id){ // ss__p_o - содержимое файла .sprite в виде JS-объекта
                var ss__iX, ss__iY, ss__x, ss__y = 0, ss__row, ss__item;
                for (ss__iY = 0 ; ss__iY < ss__p_o.ss__rows.length ; ss__iY++){
                    ss__row = ss__p_o.ss__rows[ss__iY];
                    ss__x = 0;
                    for (ss__iX = 0 ; ss__iX < ss__row.ss__items.length ; ss__iX++){
                        ss__item = ss__row.ss__items[ss__iX];
                        if (ss__item.ss__id === ss__p_id){
                            if (ss__x > 0)
                                ss__x = '-' + ss__x + 'px';
                            if (ss__y > 0)
                                ss__y = '-' + ss__y + 'px';
                            ss__p_e.style.ss__background = 'url("' + ss__p_o.ss__image + '") ' + ss__x + ' ' + ss__y;
                            ss__p_e.style.width = ss__item.ss__w + 'px';
                            ss__p_e.style.height = (ss__item.ss__h || ss__row.ss__h) + 'px';
                            return;
                        }
                        ss__x += ss__item.ss__w;
                    }
                    ss__y += ss__row.ss__h;
                }
            };
            if (ss__background__cache.hasOwnProperty(ss__p_o.ss__path)){
                ss__apply(ss__p_e, ss__background__cache[ss__p_o.ss__path], ss__p_o.ss__id);
            }
            else{
                ss__ajax({
                    ss__sourcePath: ss__p_o.ss__path,
                    ss__readyFunc: (function(ss__cache, ss__spritePath, ss__elem, ss__applyFunc, ss__id){return function(ss__result){
                        var ss__0 = JSON.parse(ss__result); // здесь не перехватывается исключение в случае некорректного JSON
                        ss__cache[ss__spritePath] = ss__0;
                        ss__applyFunc(ss__elem, ss__0, ss__id);
                    };})(ss__background__cache, ss__p_o.ss__path, ss__p_e, ss__apply, ss__p_o.ss__id),
                    ss__errorFunc: function(){
                        console.error('не удалось установить фон для элемента - не найден файл "' + ss__p_o.ss__path + '"');
                    }
                });
            }
        }
        //#USAGE_END#debug##
    };
    ss__Traliva.ss__background = ss__background;
    
    ss__Traliva.ss__checkVisible = function(ss__e) {
    	var ss__rect = ss__e.getBoundingClientRect();
    	var ss__viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    	return !(ss__rect.bottom < 0 || ss__rect.top - ss__viewHeight >= 0);
    };
    ss__Traliva.ss__createElement = function(ss__p_html, ss__p_variables, ss__p_classname){
        var ss__retVal = document.createElement('div');
        if (ss__p_classname)
            ss__retVal.className = ss__p_classname;
        ss__retVal.innerHTML = ss__p_html;
    
        var ss__0, ss__parent, ss__list, ss__stack;
        if (ss__p_variables){
            ss__stack = [ss__retVal];
            while (ss__stack.length){
                ss__parent = ss__stack.pop();
                ss__list = ss__parent.attributes;
                for (ss__0 = 0 ; ss__0 < ss__list.length ; ss__0++){
                    if (ss__list[ss__0].name === 'traliva'){
                        ss__p_variables[ss__list[ss__0].value] = ss__parent;
                        
                        break;
                    }
                }
                ss__list = ss__parent.children;
                for (ss__0 = 0 ; ss__0 < ss__list.length ; ss__0++){
                    ss__stack.push(ss__list[ss__0]);
                }
            }
        }
        return ss__retVal;
    };
    })();
    // ---- begin of network block ----
    
    /*
     * Обёртка над Traliva.ajax
     * Обеспечивает получение ответов от сервера в том же порядке, как посылались запросы. Только для GET-запросов.
     * Запросы выполнять методом  request().
     * Метод break() "отменяет" все ранее сделанные запросы (ответы игнорируются) и возвращает число "отменённых" запросов.
     * Если в качестве URL передать '_fake', то объект, переданный на вход, будет выдан на выход без каких-либо запросов на сервер.
     * По приходу ответа от "отменённых" запросов, вызывается метод *ignore*, если он определён.
     *
     * Требования к серверному коду (python):
     * 1. На выход должен всегда выдаваться объект (dict), редиректы неприемлимы. Если на сервере произошли ошибки, этот объект должен содержать свойство '_errors' - текстовое описание ошибки или массив текстовых описаний ошибок.
     * 2.
        retval = {
            'ss___request_id': request.get('ss___request_id'), <-- необходимо пробрасывать на выход входной параметр 'ss___request_id'
            'filters': filters,
            'data': data
        }
        return retval
     */
    var ss__Ajax__MAX_ID = 0x7ffc, ss__Ajax__MAX_ID_HALF = 0x3ffe; // 32764, половина - 16382
    function ss__Ajax(){
        this.ss___id = 1; // id запроса на сервер
        this.ss___pending = [];
        this.ss___cache = {};
        this.ss___inverted = false;
    }
    ss__Ajax.prototype.ss____invertId = function(ss__0){
        if (this.ss___inverted){
            if (ss__0 > ss__Ajax__MAX_ID_HALF)
                return ss__0 - ss__Ajax__MAX_ID_HALF;
            else
                return ss__0 + ss__Ajax__MAX_ID_HALF;
        }
        return ss__0;
    };
    ss__Ajax.prototype.ss__request = function(ss__p_url, ss__p_paramObject, ss__p_okFunc, ss__p_errorFunc, ss__p_ignoreOkFunc, ss__p_ignoreErrorFunc){
        //App.backend.callMethod(ss__p_url, ss__p_paramObject).then(ss__p_okFunc).catch(ss__p_errorFunc);
        var ss__0, ss__1, ss__url = ss__p_url;
        this.ss___id = ++this.ss___id;// % ss__Ajax__MAX_ID;
        if (this.ss___id > ss__Ajax__MAX_ID_HALF){
            // меняем половинки местами, инвертируем this.ss___inverted
            for (ss__1 = 0 ; ss__1 < this.ss___pending.length ; ++ss__1){
                this.ss___pending[ss__1] = this.ss____invertId(this.ss___pending[ss__1]);
            }
            for (ss__1 in this.ss___cache){
                ss__0 = this.ss___cache[ss__1];
                delete this.ss___cache[ss__1];
                this.ss___cache[this.ss____invertId(ss__1)] = ss__0;
            }
            this.ss___inverted = !this.ss___inverted;
            this.ss___id -= ss__Ajax__MAX_ID_HALF;
        }
        ss__p_paramObject.ss___request_id = this.ss___id;
        ss__0 = false;
        for (ss__1 in ss__p_paramObject){
            ss__url.push(ss__0 ? '&' : '?');
            ss__url.push(ss__1 + '=' + ss__p_paramObject[ss__1]);
            ss__0 = true;
        }
        (function(ss__self, ss__p_url, ss__p_okFunc, ss__p_errorFunc, ss__p_ignoreOkFunc, ss__p_ignoreErrorFunc, ss__p_request_id){
            var ss__requestId = this.ss____invertId(ss__p_request_id);
            var ss__common = function(ss__p_func, ss__p_ignoreFunc, ss__p_paramObj){// ss__p_func и ss__p_paramObj - функция и параметр обратного вызова
                var ss__1, ss__2 = ss__self.ss___pending.indexOf(ss__requestId);
                var ss__ifIgnore = false;
                if (ss__2 < 0){ // запрос был снят
                    if (!ss__p_ignoreFunc)
                        return;
                    ss__ifIgnore = true;
                }
                else{
                    ss__self.ss___pending.splice(ss__2, 1);
                }
                ss__self.ss___cache[ss__requestId] = {ss__func: ss__p_func, ss__ignoreFunc: ss__p_ignoreFunc, ss__param: ss__p_paramObj};
                // если все id в ss___pending больше ss__requestId, то проходим циклом по ss___cache и если request_id <= ss__requestId, то вызываем соответствующие фунции и убираем эти свйоства из ss___cache
                ss__2 = true;
                for (ss__1 = 0 ; ss__1 < ss__self.ss___pending.length ; ++ss__1){
                    if (ss__self.ss___pending[ss__1] > ss__requestId)
                        ss__2 = false;
                }
                if (ss__2){
                    ss__2 = [];
                    for (ss__1 in ss__self.ss___cache){
                        if (ss__1 <= ss__requestId){
                            ss__self.ss___cache[ss__1][ss__ifIgnore ? 'ss__ignoreFunc' : 'ss__func'](ss__self.ss___cache[ss__1].ss__param);
                            ss__2.push(ss__1);
                        }
                    }
                    while (ss__2.length){
                        ss__1 = ss__2.pop();
                        delete ss__self.ss___cache[ss__1];
                    }
                }
                //else
                //    console.log('Ещё не все пришли. Ожидаю.');
            };
            var ss__fOk = function(ss__p_data){
                delete ss__p_data['ss___request_id'];
                if (ss__p_data._errors)
                    ss__common(ss__p_errorFunc, ss__p_ignoreErrorFunc, {ss__error: ss__p_data._errors});
                else
                    ss__common(ss__p_okFunc, ss__p_ignoreOkFunc, ss__p_data);
            };
            var ss__fError = function(ss__p_error){
                ss__common(ss__p_errorFunc, ss__p_ignoreErrorFunc, {ss__error: ss__p_error});
            };
            if (ss__p_url === '_fake'){
                ss__fOk(ss__p_paramObject);
            }
            else{
                ss__self.ss___pending.push(ss__requestId);
                ss__Traliva.ss__ajax({
                    ss__sourcePath: ss__p_url,
                    ss__readyFunc: ss__fOk,
                    ss__errorFunc: ss__fError,
                    //ss__timeout: 123,
                    //ss__addonHttpHeaders: 123
                });
            }
        })(this, ss__url, ss__p_okFunc, ss__p_errorFunc, ss__p_ignoreOkFunc, ss__p_ignoreErrorFunc, this.ss___id);
    };
    ss__Ajax.prototype.break = function(){
        var i, retVal = this.ss___pending.length;
        this.ss___pending = [];
        for (i in this.ss___cache){
            delete this.ss___cache[i];
            //this.ss___pending.push(i);
        }
        console.log('--- отменено запросов: ', retVal,  ' ---');
        return retVal;
    };
    ss__Traliva.ss__Ajax = ss__Ajax;
    })(); // end of "ss__Traliva = {..."
}
'use strict';
var ss__TralivaKit;
if (ss__TralivaKit)
    console.log('epic fail: ss__TralivaKit is not empty');
else{
    ss__TralivaKit = {__d:{help:{}}};
(function(ss__p_namespace){



/*
Формат объекта справки:
title(text)
descr(text)
options(object) - Принимаемые опции. object: key - option name value - textual description
stateObj(object) - формат объекта состояния
children(object) - у справки могут быть дочерние страницы (с более подробным описанием тех или иных аспектов).
*/
function registerHelp(p_className, p_o){
    ss__p_namespace.__d.help[p_className] = p_o;
};
//
ss__p_namespace.help = function(o){
    var i, o;
    if (arguments.length === 0){
        console.log('Для справки по контретному классу виджета передайте в help() параметром имя класса. Доступные классы виджетов:');
        for (i in ss__p_namespace.__d.help){
            console.log('* ' + i + ' - ' + ss__p_namespace.__d.help[i].title);
        }
    }
    else{
        for (i = 0 ; i < arguments.length ; i++){
            if (i)
                o = o.children[arguments[i]];
            else{
                o = ss__p_namespace.__d.help[arguments[i]];
                if (!o.hasOwnProperty('options'))
                    o.options = {};
                if (!o.options.hasOwnProperty('ss__bg')){
                    o.options.ss__bg = '(опция от базового класса) цвет фона (подложки). Если не задано, подложки не будет. Если задана пустая строка, фон подложки будет взят такой же, как у ближайшего родителя, у которого фон подложки задан (или не будет задан, если такой родитель найден не будет).';
                }
            }
            if (!o){
                console.log('Некорректный параметр для справки: '+arguments[i]);
                return;
            }
        }
        console.log('%c' + o.title, 'color: #ffa');
        if (o.descr)
            console.log('%c' + o.descr, 'color: #48f');
        if (o.options){
            console.log('%cПринимаемые опции:', 'color: #ffa');
            for (i in o.options){
                console.log('%c* ' + i + ' - ' + o.options[i], 'color: #48f');
            }
        }
        if (o.stateObj){
            console.log('%cФормат объекта состояния:', 'color: #ffa');
            for (i in o.stateObj){
                console.log('%c* ' + i + ' - ' + o.stateObj[i], 'color: #48f');
            }
        }
    }
};






registerHelp('ss__YandexApi', {
    title: 'API Яндекса. Автоподшивка подгружаемых сторонних скриптов.',
    //descr: '',
    //options:{},
    //stateObj:{}
});



(function(){
    if (typeof window !== 'undefined'){ // Проверка на NodeJS
        var ss__1 = document.createElement('script');
        ss__1.src = 'http://api-maps.yandex.ru/2.1/?load=package.full&lang=ru-RU';
        document.head.appendChild(ss__1);
    }
    else{
        //
    }
})();


function ss__YandexApi(ss__p_wContainer, ss__p_options, ss__p_widgets){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
    // ...
};
ss__YandexApi.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__YandexApi.prototype.constructor = ss__YandexApi;
/*ss__YandexApi.prototype.ss__processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};*/
//ss__YandexApi.ss__widgetsFields = [];
ss__p_namespace.ss__YandexApi = ss__YandexApi



registerHelp('ss__Label', {
            title: 'Виджет ss__Label - тупо отображает текст',
            options:{
                ss__text: 'если задано, этот текст будет отображаться, а свойство ss__textVarName будет проигнорировано. По умолч. - не задано (опирается на объект состояния)',
                ss__textVarName: 'имя свойства, в котором записан текст для отображения',
                ss__color: 'цвет текста',
                ss__border: 'если свойство указано, будет добавлена рамочка, false для рамочки без закругления цветом текста, {ss__color: ... , ss__radius: ...}, если хотите задать радиус скругления рамочки и/или цвет рамочки'
            }
        });

function ss__Label(ss__p_wContainer, ss__p_options){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options);
    if (ss__p_options.hasOwnProperty('ss__text')){
        this.ss__textVarName = undefined;
        this.ss__text = ss__p_options.ss__text;
    }
    else{
        this.ss__textVarName = ss__p_options.ss__textVarName || 'ss__text';
        this.ss__text = '';
    }
    //this.e = document.ss__createElement('div');
    var e = ss__Traliva.ss__createElement('<div class="ss__traliva_kit__label" traliva="e">'+this.ss__text+'</div>', this);
    if (ss__p_options.hasOwnProperty('ss__color')){
        this.e.style.color = ss__p_options.ss__color;
        if (ss__p_options.hasOwnProperty('ss__border')){
            this.e.style.border = '1px solid ' + ss__p_options.ss__border.ss__color || ss__p_options.ss__color;
            if (ss__p_options.ss__border && ss__p_options.ss__border.hasOwnProperty('ss__radius')){
                this.e.style.borderRadius = ss__p_options.ss__border.ss__radius;
            }
        }
    }
    //this.e.style.margin = '6px';
    //this.e.style.padding = '10px';
    //this.e.className = 'ss__traliva_kit__label';
    ss__p_wContainer.ss___onResized = (function(e){return function(ss__w,ss__h){
        e.style.width = (ss__w - 32) + 'px';
        e.style.height = (ss__h - 32) + 'px';
    };})(this.e);
    //this.e.innerHTML = this.ss__text;
    this.e.style.textAlign = 'center';
    ss__p_wContainer.ss__setContent(e);
};
ss__Label.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__Label.prototype.constructor = ss__Label;
ss__Label.prototype.ss__processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    if (this.ss__textVarName !== undefined){
        if (s[this.ss__textVarName] !== this.ss__text){
            this.ss__text = s[this.ss__textVarName] || '';
            this.e.innerHTML = this.ss__text;
        }
    }
};
ss__p_namespace.ss__Label = ss__Label



registerHelp('ss__Button', {
            title: 'Виджет ss__Button',
            options:{
                ss__icon: 'если задано (формат задания - см. ss__Traliva.ss__background()), будет установлена иконка. Текст кнопки будет отображаться как тултип (опция ss__title). Размер картинки - фиксированный по размеру картинки.',
                ss__title:'если задано, этот текст будет отображаться, а свойство ss__titleVarName будет проигнорировано. По умолч. - не задано (опирается на объект состояния)',
                ss__titleVarName:'имя свойства, в котором записан текст кнопки (если изменится значение такого свойства у объекта состояния, кнопка изменит свой текст). По умолч. \'ss__title\'',
                ss__autoremoveActiveProperty: 'boolean(строго). записывать ли свойство о \'нажатости\' кнопки в changeFlags. По умолчанию, true.',
                ss__activeVarName:'имя свойства(boolean), значение которого будет меняться при нажатии на кнопку. По умолч. \'ss__active\'',
                ss__color: 'цвет текста',
                ss__bgColor: 'цвет фона кнопки (в отличие от "bg", относится не ко всей прямоугольной области, а лишь к нажимаемой части)',
                ss__hover_color: 'цвет фона при наведении мышью',
                ss__hover_icon: 'иконка при наведении мышью. Работает только, если указана опция \'ss__icon\'',
                ss__active_icon: 'иконка, которая устанавливается в случае, коогда кнопка нажата',
                ss__active_color: 'цвет текста в случае, когда кнопка "нажата"',
                ss__activeBgColor: 'цвет фона в случае, когда кнопка "нажата"',
                ss__activeHoverBgColor: 'цвет "нажатой" кнопки при наведении мышью',
                ss__border: 'если свойство указано, будет заданы специфические параметры рамочки, false для рамочки без закругления цветом текста, {ss__color: ... , ss__radius: ...}, если хотите задать радиус скругления рамочки и/или цвет рамочки',
                //disabled_color:
                ss__disabled_icon: 'иконка на случай, когда кнопка "выключена" ("серая")'
            },
            stateObj:{
                ss__enabled: 'Если false, то кнопка "серая" и не реагирует на наведение и клики мышью. По умолчанию - true.'
            }
        });

function ss__Button(ss__p_wContainer, ss__p_options){
    var ss__1;
    this.ss__activeVarName = ss__p_options.ss__activeVarName || 'ss__active';
    if (ss__p_options.ss__autoremoveActiveProperty !== false){
        ss__1 = {};
        ss__1[this.ss__activeVarName] = true;
        this.ss__notFixed = true;
    }
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__1);
    this.ss__options = ss__p_options;
    if (ss__p_options.hasOwnProperty('ss__icon')){
        this.ss__icon = true;
    }
    if (ss__p_options.hasOwnProperty('ss__title')){
        this.ss__titleVarName = undefined;
        this.ss__title = ss__p_options.ss__title;
    }
    else{
        this.ss__titleVarName = (ss__p_options.hasOwnProperty('ss__titleVarName')) ? ss__p_options.ss__titleVarName : 'ss__title';
        this.ss__title = '';
    }
    this.ss__active = false;
    this.ss__hovered = false;
    ss__1 = ss__Traliva.ss__createElement('<div traliva="e"></div>', this);
    if (this.ss__icon){
        this.e.style.border = 'none';
        ss__Traliva.ss__background(this.e, ss__p_options.ss__icon);
        if (this.ss__title)
            this.e.ss__title = this.ss__title;
        if (typeof ss__p_options.ss__icon === 'string'){
            ss__p_wContainer.ss___onResized = (function(ss__elem){return function(ss__w, ss__h){
                ss__elem.style.width = ss__w + 'px';
                ss__elem.style.height = ss__h + 'px';
            };})(this.e);
        }
    }
    else{
        if (this.ss__title)
            this.e.innerHTML = this.ss__title;
        if (ss__p_options.hasOwnProperty('ss__bgColor')){
            this.e.style.background = ss__p_options.ss__bgColor;
        }
        this.e.className = 'ss__traliva_kit__bn';
        if (ss__p_options.hasOwnProperty('ss__color')){
            this.e.style.color = ss__p_options.ss__color;
            this.e.style.border = '1px solid '+ss__p_options.ss__color;
            if (ss__p_options.hasOwnProperty('ss__border')){
                this.e.style.border = '1px solid ' + ss__p_options.ss__border.ss__color || ss__p_options.ss__color;
                this.e.style.borderRadius = (ss__p_options.ss__border && ss__p_options.ss__border.hasOwnProperty('ss__radius')) ? ss__p_options.ss__border.ss__radius : 0;
            }
        }
    }
    if (ss__p_options.hasOwnProperty(this.ss__icon ? 'ss__hover_icon' : 'ss__hover_color')){
        this.e.addEventListener('mouseover', (function(ss__1){return function(){ss__1.ss__hovered = true;ss__1.ss___updateGui();};})(this));//this.fUpdateBgHovered);
        this.e.addEventListener('mouseleave', (function(ss__1){return function(){ss__1.ss__hovered = false;ss__1.ss___updateGui();};})(this));//this.fUpdateBgUnhovered);
    }
    this.e.addEventListener('click', function(ss__self){return function(){
        ss__self.ss___onClicked();
    };}(this));
    ss__1.style.cursor = 'pointer';
    ss__p_wContainer.ss__setContent(ss__1);
};
ss__Button.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__Button.prototype.constructor = ss__Button;
ss__Button.prototype.ss__processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    if (this.ss__titleVarName !== undefined){
        if (s[this.ss__titleVarName] !== this.ss__title){
            this.ss__title = s[this.ss__titleVarName] || '';
            if (this.ss__icon)
                this.e.ss__title = this.ss__title;
            else
                this.e.innerHTML = this.ss__title;
        }
    }
    if (s[this.ss__activeVarName] !== this.ss__active){
        this.ss__active = s[this.ss__activeVarName];
        this.ss___updateGui();
    }
    this.ss___updateGui();
};
ss__Button.prototype.ss___onClicked = function(){
    if (this.ss__notFixed)
        this.ss___state[this.ss__activeVarName] = true;
    else{
        this.ss__active = !this.ss__active;
        this.ss___state[this.ss__activeVarName] = this.ss__active;
        this.ss___updateGui();
    }
    this.ss___registerStateChanges();
};
ss__Button.prototype.ss___updateGui = function(){
    if (this.ss__icon){
        if (this.ss__options.hasOwnProperty('ss__hover_icon')){
            ss__Traliva.ss__background(this.e, this.ss__options.ss__hover_icon);
        }
    }
    else{
        if (this.ss__options.hasOwnProperty('ss__hover_color')){
            var ss__1 = 'rgba(0,0,0,0)';
            if (this.ss__options.ss__bgColor){
                if (this.ss__hovered){
                    this.e.style.background = this.ss___state[this.ss__activeVarName] ? (this.ss__options.ss__activeHoverBgColor || this.ss__options.ss__hover_color || this.ss__options.ss__bgColor) : (this.ss__options.ss__hover_color || this.ss__options.ss__bgColor);
                }
                else{
                    this.e.style.background = this.ss___state[this.ss__activeVarName] ? (this.ss__options.ss__activeBgColor || this.ss__options.ss__bgColor) : (this.ss__options.ss__bgColor);
                }
            }
            else
                this.e.style.background = ss__1;
        }
        this.e.className = this.ss__active ? 'ss__traliva_kit__bn ss__active' : 'ss__traliva_kit__bn';
    }
};
ss__p_namespace.ss__Button = ss__Button



registerHelp('ss__LineEdit', {
            title: 'Виджет строка ввода',
            options:{
                placeholder:'строка подсказки вроде "введите ..(что-то)"',
                requireVarName: 'имя свойства(boolean), true которого означает, что нужно записать в объект состояния значение этого текстового поля. Если не задано, в объекте состояния значения будет обновляться при каждом изменении текста',
                textVarName:'текст в поле редактирования. Это значение как для задания предустановленного значения, так и для считывания другими компонентами введённого пользователем текста',
                datatype: 'тип элемента ввода (см. документацию по свойству type HTML5-элемента <input>). По умолчанию, \'text\'.',
                color:'цвет текста и рамочки',
                hover_color:'цвет фона при наведении мышью'
            }
        });

function ss__LineEdit(ss__p_wContainer, ss__p_options){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options);
    this.ss__requireVarName;

    var ss__datatype = ss__p_options.ss__datatype || 'text';
    ss__p_wContainer.ss__setContent(ss__Traliva.ss__createElement('<input type="' + ss__datatype + '" traliva="e" class="ss__traliva_kit__lineedit"></input>', this));
    ss__p_wContainer.ss___onResized = (function(ss__self){
        return function(w,h){
            $self.e.style.width = (w - 32) + 'px';
        }
    })(this);
    if (ss__p_options.hasOwnProperty('ss__placeholder'))
        this.e.placeholder = ss__p_options.ss__placeholder;
    if (ss__p_options.hasOwnProperty('ss__color')){
        this.e.style.color = ss__p_options.ss__color;
        this.e.style.border = '1px solid ' + ss__p_options.ss__color;
    }
    if (ss__p_options.hasOwnProperty('ss__hover_color')){
        this.e.addEventListener('mouseover', (function(ss__1){return function(){this.style.background = ss__1;};})(ss__p_options.ss__hover_color));
        this.e.addEventListener('mouseleave', (function(ss__1){return function(){this.style.background = 'rgba(0,0,0,0)';};})());
    }
    if (ss__p_options.hasOwnProperty('ss__textVarName'))
        this.ss__textVarName = ss__p_options.ss__textVarName;

    else
        console.error('ss__LineEdit: ss__textVarName - обязательное поле для задания в options');

    if (ss__p_options.hasOwnProperty('ss__requireVarName')){
        this.ss__requireVarName = ss__p_options.ss__requireVarName;
    }
    else{
        this.e.addEventListener('input', (function(ss__self){return function(){
            ss__self.ss___state[ss__self.ss__textVarName] = ss__self.e.value;
            ss__self.ss___registerStateChanges();
        }})(this));
        // event 'change' fires only on focus off
    }
};
ss__LineEdit.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__LineEdit.prototype.constructor = ss__LineEdit;
ss__LineEdit.prototype.ss__processStateChanges = function(s){
    if (this.ss__requireVarName){
        // опция выдачи строго по запросу не протестирована.
        // надеюсь, при запуске ошибок не возникнет
        if (s[this.ss__requireVarName]){
            s[this.ss__requireVarName] = false;
            s[this.ss__textVarName] = this.e.value;
            this.ss___registerStateChanges();
        }
    }
    if (this.e.value !== s[this.ss__textVarName])
        this.e.value = s[this.ss__textVarName];
};
ss__p_namespace.ss__LineEdit = ss__LineEdit



registerHelp('ss__FileSelect', {
            title:'Виджет Поле выбора файла из файловой системы пользователя',
            // ss__Traliva.api.get_filepath(p_file) - должна быть, возвращает путь к файлу.
            options:{
                ss__valueVarName:'имя свойства объекта состояния, где хранится значение выбранного файла',
                ss__filter:'по каким расширениям фильтровать. Пример: ".mp3, .mpeg, .wav, .ogg"',
                ss__color:'цвет',
                ss__hover_color:'цвет при наведении мышью'
            }
        });

function ss__FileSelect(ss__p_wContainer, ss__p_options){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options);
    ss__p_wContainer.ss__setContent(ss__Traliva.ss__createElement('<input type="file" traliva="e" class="ss__traliva_kit__fileselect"></input>', this));
//wAddBn.ss__setContent(ss__Traliva.ss__createElement('<input type="file" accept=".mp3, .mpeg, .wav, .ogg" traliva="bn_add" class="bn stage2_bn_add"></input>'));
    this.ss__valueVarName = ss__p_options.ss__valueVarName;
    this.e.addEventListener('change', (function(ss__self){return function(){
        var ss__1 = ss__self.e.files;
        ss__1 = ss__1.length ? ss__1[0] : undefined;
        var ss__2 = window.URL.createObjectURL(ss__1);
        ss__self.ss___state[ss__self.ss__valueVarName] = ss__2;
        ss__self.ss___registerStateChanges();
    };})(this));
    
    if (ss__p_options.hasOwnProperty('ss__filter')){
        this.e.accept = ss__p_options.ss__filter;
    }
    if (ss__p_options.hasOwnProperty('ss__color')){
        this.e.style.color = ss__p_options.ss__color;
        this.e.style.border = '1px solid ' + ss__p_options.ss__color;
    }
    if (ss__p_options.hasOwnProperty('ss__hover_color')){
        this.e.addEventListener('mouseover', (function(ss__1){return function(){this.style.background = ss__1;};})(ss__p_options.ss__hover_color));
        this.e.addEventListener('mouseleave', (function(ss__1){return function(){this.style.background = 'rgba(0,0,0,0)';};})());
    }
    /*ss__p_wContainer._onResized = (function(ss__self){
        return function(w,h){
            ss__self.e.style.width = (w - 18) + 'px';
        }
    })(this);*/
};
ss__FileSelect.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__FileSelect.prototype.constructor = ss__FileSelect;
ss__FileSelect.prototype.processStateChanges = function(s){
    //boris here: применить изменения в выбранном файле
};
ss__p_namespace.ss__FileSelect = ss__FileSelect



registerHelp('ss__SimpleList', {
			title:'Класс ss__SimpleList',
			descr:'Список элементов, с возможностью выбора какого-то одного элемента(выделяемость настраивается с помощью ss__options)',
			options:{
				ss__selectable: 'по умолчанию false',
				ss__getText: 'если у вас список объектов, то вам потребуется функция, которая даёт текст для отображения в элементе списка. По умолчанию, элементы списка трактуются как строки',
				ss__shared: 'true, если снятие флага ss__changed в объекте состояния не надо делать(пользователь устанавливает данные и флаг ss__changed, затем снимает флаг ss__changed)\n\
	 false, если хотите, чтобы виджет сам снимал флаг ss__changed после того, как изменения данных были отображены в виджете.\n\
	 по умолчанию, true. Так что сами сбрасывайте флаг ss__changed, или задайте опцию "ss__shared: false"',
				ss__color: 'цвет элемента списка',
				ss__selected_color: 'цвет выделенного элемента списка',
				ss__hover_color: 'цвет фона строки при наведении мышью'
			},
			stateObj:{
				ss__current: 'порядковый номер в массиве',
				ss__list: 'массив строк (заголовкой на вывод)',
				ss__changed: 'флаг, сигнализирующий виджету, что отображение данных надо обновить. Если задано, то объект со свойствами \'removed\', \'added\' и \'ss__changed\'(значения - порядковые индексы элементов). Именно в таком порядке и следует обрабатывать изменения. Если изменений нет, то следует писать false или undefined.'
			}
		});

function ss__SimpleList(ss__p_wContainer, ss__p_options){
	ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options);
	ss__p_wContainer.ss__setContent(ss__Traliva.ss__createElement('<table class="ss__traliva_kit__simplelist" traliva="ss__table"></table>', this));
	this.ss__options = ss__p_options;
	this.ss___len = 0;
	this.ss___initialized = false;
	if (ss__p_options.ss__selectable){
		this.ss__table.addEventListener('click', (function(ss__self){return function(ss__e){
			ss__self.ss___onClicked(ss__e.target);
		};})(this));
	}
	if (ss__p_options.hasOwnProperty('ss__color')){
		this.ss__table.style.color = ss__p_options.ss__color;
	}
	this.ss___current = -1;//порядковый индекс
	this.ss___elements = [];
};
ss__SimpleList.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__SimpleList.prototype.constructor = ss__SimpleList;
ss__SimpleList.prototype.ss__processStateChanges = function(s){
	if (!this.ss___initialized){
		this.ss___update();
		this.ss___initialized = true;
	}
	if (s.ss__changed){
		this.ss___update();
		if (this.ss__options.ss__shared === false){
			s.ss__changed = false;
			this.ss___registerStateChanges();
		}
	}
	if (this.ss__options.ss__selectable){
		if (s.ss__current !== this.ss___current){
			this.ss___updateSelection(s.ss__current);
		}
	}
};
ss__SimpleList.prototype.ss___update = function(){
	var ss__1, ss__eRow, ss__eCell, ss__2, ss__rows;

	for (ss__1 = this.ss___state.ss__list.length ; ss__1 < this.ss___len ; ss__1++){
		this.ss__table.deleteRow(-1);
	}
	for (ss__1 = this.ss___len ; ss__1 < this.ss___state.ss__list.length ; ss__1++){
		ss__eRow = this.ss__table.insertRow();
		ss__eRow.insertCell();
	}
	this.ss___len = this.ss___state.ss__list.length;
	ss__rows = this.ss__table.rows;
	this.ss___elements = [];
	for (ss__1 = 0 ; ss__1 < ss__rows.length ; ss__1++){
		//ss__eRow = this.ss___state.ss__list[ss__1];
		ss__eRow = ss__rows[ss__1];
		ss__eCell = ss__eRow.cells[0];
		while (ss__eCell.firstChild){
			ss__eCell.removeChild(ss__eCell.firstChild);
		}
		ss__2 = document.createElement('div');
		ss__2.innerHTML = this.ss__options.ss__getText ?
			this.ss__options.ss__getText(this.ss___state.ss__list[ss__1]) :
			this.ss___state.ss__list[ss__1]
		;
		//ss__eCell.innerHTML = '<div>' + (this.ss__options.ss__getText ? this.ss__options.ss__getText(this.ss___state.ss__list[ss__1]) : this.ss___state.ss__list[ss__1]) + '</div>';
		ss__eCell.appendChild(ss__2);
		this.ss___elements.push(ss__2);
	}
};
ss__SimpleList.prototype.ss___updateSelection = function(ss__p_index){
	var ss__1, ss__e;
	for (ss__1 = 0 ; ss__1 < this.ss___elements.length ; ss__1++){
		if (ss__1 === this.ss___current){
			ss__e = this.ss___elements[ss__1];
			ss__e.className = '';
			if (this.ss__options.hasOwnProperty('ss__color'))
				ss__e.style.color = this.ss__options.ss__color;
			else
				ss__e.style.color = '#48f';
		}
		if (ss__1 === ss__p_index){
			ss__e = this.ss___elements[ss__1];
			ss__e.className = 'selected';
			if (this.ss__options.hasOwnProperty('ss__selected_color'))
				ss__e.style.color = this.ss__options.ss__selected_color;
			else{
				ss__e.style.color = '#f80';
			}
		}
	}
	this.ss___current = ss__p_index;
};
ss__SimpleList.prototype.ss___onClicked = function(ss__p_e){
	var ss__1;
	for (ss__1 = 0 ; ss__1 < this.ss___elements.length ; ss__1++){
		if (ss__p_e === this.ss___elements[ss__1]){
			if (ss__1 === this.ss___current)
				return;
			else{
				this.ss___updateSelection(ss__1);
				this.ss___state.ss__current = ss__1;
				this.ss___registerStateChanges();
				break;
			}
		}
	}
};
ss__p_namespace.ss__SimpleList = ss__SimpleList



registerHelp('ss__TreeList', {
    title: 'Простое дерево, выполненное в виде списка (с элементом "перейти на уровень выше")',
    //descr: '',
    options:{
        ss__selectable: 'должно ли иметь место понятие "текущий элемент"',
        ss__color: 'цвет',
        ss__selected_color: 'цвет текущего элемента',
        ss__hover_color: 'цвет фона при наведении курсора мыши'
    },
    stateObj:{
        data: 'список корневых элементов. Каждый элемент представлен объектом со следующими свойствами: id (если ss__selectable), ss__title(строка), children(список дочерних элементов)',
        current: 'id текущего элемента. Если не указан, но виджет является ss__selectable, текущим устанавливается первый корневой элемент'
    }
});

function ss__TreeList(ss__p_wContainer, ss__p_options){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options);
    this.ss____TreeList = {
        ss__publisher: new ss__Traliva.StatePublisher(),
        ss__state: {ss__list:[{ss__title:'1111'},{$title:'2222'}]}
    };
    this.ss____TreeList.ss__publisher.ss__setState(this.ss____TreeList.ss__state);
    this.ss____TreeList.ss__publisher.ss__registerSubscriber(
        new ss__TralivaKit.ss__SimpleList(
            ss__p_wContainer,
            {
                ss__getText: function(p){return p.ss__title;},
                ss__selectable: ss__p_options.ss__selectable,
                ss__color: ss__p_options.ss__color,
                ss__selected_color: ss__p_options.ss__selected_color,
                ss__hover_color: ss__p_options.ss__hover_color
            }
        )
    );
    // ...
};
ss__TreeList.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__TreeList.prototype.constructor = ss__TreeList;
ss__TreeList.prototype.ss__processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};
ss__p_namespace.ss__TreeList = ss__TreeList



registerHelp('ss__TextEdit', {
    title: 'поле редактирования текста',
    //descr: '',
    options:{
        ss__color: 'Цвет текста. По умолчанию, жёлтый',
        ss__textVarName: 'имя свойства, хранящего текст. По умолчанию, \'ss__text\'',
        ss__changedVarName: 'Если не задано, в режиме реального времени мониторится изменение текста. Если указано значение типа Строка, то свойство с таким именем в объекте состояния трактуется как Boolean, характеризующий, надо ли обновить (т.е. изменился ли) текст на виджете.',
        ss__shared: 'true, если снятие флага changed(или как вы там его назвали?) в объекте состояния не надо делать(пользователь устанавливает данные и флаг changed, затем снимает флаг changed)\n\
     false, если хотите, чтобы виджет сам снимал флаг changed после того, как изменения данных были отображены в виджете.\n\
     по умолчанию, false. Применим только в случае, когда задан ss__changedVarName.'
    },
    //stateObj:{}
});

function ss__TextEdit(ss__p_wContainer, ss__p_options){
    this.ss__text;
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options);
    this.ss___options = ss__p_options;
    if (!ss__p_options.hasOwnProperty('ss__textVarName'))
        this.ss___options.ss__textVarName = 'ss__text';
    ss__p_wContainer.ss__setContent(ss__Traliva.ss__createElement('<textarea spellcheck="false" traliva="e"></textarea>', this));
    this.e.style.resize = 'none';
    this.e.style.border = 'none';//'1px solid #ffa';
    this.e.style.color = ss__p_options.ss__color || '#ffa';
    this.e.addEventListener('change', (function(ss__self, ss__1){return function(){
        ss__self.ss___state[ss__self.ss___options.ss__textVarName] = ss__self.e.value;
        if (ss__1)
            ss__self.ss___state[ss__1] = true;
        ss__self.ss___registerStateChanges();
    };})(this, ss__p_options.ss__changedVarName));
    if (ss__p_options.hasOwnProperty('ss__bg'))
        this.e.style.background = ss__p_options.ss__bg;
    ss__p_wContainer.ss___onResized = (function(e){return function(ss__w, ss__h){
        e.style.width = (ss__w-0) + 'px';
        e.style.height = (ss__h-0) + 'px';
    };})(this.e);
};
ss__TextEdit.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__TextEdit.prototype.constructor = ss__TextEdit;
ss__TextEdit.prototype.processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    if (this.ss___options.hasOwnProperty('ss__changedVarName')){
        if (s[this.ss___options.ss__changedVarName]){
            this.e.value = s[this.ss___options.ss__textVarName] || '';
            if (!this.ss___options.ss__shared){
                delete s[ss__changedVarName];
                this.ss___registerStateChanges();
            }
        }
    }
    else{
        if (this.ss___text !== s[this.ss___options.ss__textVarName]){
            this.e.value = s[this.ss___options.ss__textVarName] || '';
            this.ss___text = s[this.ss___options.ss__textVarName];
        }
    }
    // ...
};
ss__p_namespace.ss__TextEdit = ss__TextEdit



registerHelp('ss__ComboBox', {
    title: 'выпадающий список',
    //descr: '',
    options:{
        ss__variants: 'список вариантов (исходный).'
    },
    stateObj:{
        ss__variants: 'список вариантов. Каждый должен быть представлен объектом с полями ss__id и ss__title',
        ss__variants_changed: '(boolean) флаг о том, что список вариантов изменился, и список отображаемых вариантов необходимо обновить',
        ss__shared: '(boolean) если true, то компонент не будет сам снимать флаг о том, что данные изменились (внешнее снятие флага)',
        ss__current: 'id текущего элемента. Особое значение - \'-1\' - означает, что элемент не выбран.'
    }
});

function ss__ComboBox(ss__p_wContainer, ss__p_options){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options);
    this.ss___options = ss__p_options;
    this.ss___wContainer = ss__p_wContainer;
    if (ss__p_options.hasOwnProperty('ss__variants')){
        this.ss___setupContainer(ss__p_options.ss__variants, -1);
    }
    else{
        // "нет вариантов" - отображаем пустой список (сейчас это просто отсутвие виджета)
    }
};
ss__ComboBox.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__ComboBox.prototype.constructor = ss__ComboBox;
ss__ComboBox.prototype.ss__processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    if (s.ss__variants_changed){
        this.ss___setupContainer(s.ss__variants, (s.ss__current === undefined) ? -1 : s.ss__current);
        if (!this.ss___options.ss__shared){
            s.ss__variants_changed = false;
            this.ss___registerStateChanges();
        }
    }
    else{
        if (this.ss___current !== s.ss__current){
            if (this.e)
                this.e.value = s.ss__current;
            this.ss___current = s.ss__current;
        }
    }
};
ss__ComboBox.prototype.ss___setupContainer = function(ss__p_variants, ss__p_current){
    //элемент select не поддерживает изменение вариантов, поэтому мы полностью заменяем select
    var ss__1, ss__2, ss__3;
    this.ss___wContainer.ss__setContent(ss__Traliva.ss__createElement('<select traliva="e"></select>', this));
    for (ss__1 = 0 ; ss__1 < ss__p_variants.length ; ss__1++){
        ss__2 = document.ss__createElement('ss__option');
        ss__2.value = ss__p_variants[ss__1].ss__id;
        ss__3 = document.createTextNode(ss__p_variants[ss__1].ss__title);
        ss__2.appendChild(ss__3);
        this.e.appendChild(ss__2);
    }
    this.e.value = ss__p_current;
    this.e.addEventListener('change', (function(ss__self){return function(){
        ss__self.ss___state.ss__current = ss__self.e.value;
        ss__self.ss___current = ss__self.e.value;
        ss__self.ss___registerStateChanges();
    };})(this));
    this.ss___current = ss__p_current;
    this.ss___wContainer.ss___onResized = (function(e){return function(ss__w, ss__h){
        e.style.width = ss__w + 'px';
        e.style.height = ss__h + 'px';
    };})(this.e);
};
ss__p_namespace.ss__ComboBox = ss__ComboBox



registerHelp('ss__LargeTextEdit', {
    title: 'Редактор больших текстов (с динамической подгрузкой). Сохранение изменений в тексте - внешнее.',
    descr: 'Указывается API-функции взаимодействия с сервером, отдающим текст частями. Текст запрашивается по идентификатору текста (в один редактор могут быть загружены разные тексты) и идентификатору фрагмента (текст разбивается на фрагменты, чтобы загружаться частями). Каждый фрагмент разбивается на блоки. Когда пользователь редактирует текст, он редактирует лишь один блок (он идентифицируется парой <идентификатор фрагмента>-<идентификатор блока в фрагменте>). И изменения в тексте представляются лишь теми (фрагмент, блок)ами, текст в которых изменился.\nПри изменении текста меняется его размер, всвязи с чем, возможно, понадобится переразбиение по блокам, а может быть, и по фрагментам. Это должен производить внешний "сохраняльщик". Для этого данный компонент предоставляет лишь API внесения изменений, а также функцию запроса данных в фрагменте().\nОтображение текста - отрендеренный HTML, тегов вы не увидете. Редактирование текста - сырой HTML со всеми тегами.',
//\nОжидаемый формат данных на запрашиваемом URL-е:\n<базовый URL>/<номер фрагмента> --GET--> [\'Первый блок (это HTML-код)\', \'Второй блок (это HTML-код)\']\n<базовый URL> --GET--> ... не запрашивается, так что можете здесь выдавать нужный вам данные, или давать ERROR_404, если вам этот адрес не нужен\n<базовый URL> --POST--> {<номер-фрагмента>:{<номер-блока>: \'новое значение (это HTML-код)\', <другой-номер-блока>: \'новое значение\'}, <другой-номер-фрагмента>:{...}}. Эти изменения будут сохранены',
    options:{
        ss__editable: 'флаг редактируемости. Если в процессе работы редактируемость может меняться, то не указывайте в опциях, а управляйте редактируемостью через объект состояния',
        ss__fragmentsApiRequest: '(строка) функция из Traliva.api, которая инициирует запрос на сервер для получения текста (HTML). Принимаемые параметры: идентификатор текста, идентификатор фрагмента.',
        ss__fragmentApiResponse: '(строка) функция из Traliva.api, которая будет вызываться, когда ответ от сервера придёт. Этот компонент переопределит эту функцию, и сам будет получать данные от сервера. Ожидаемый формат ответа:\n[\'Первый блок (это HTML-код)\', \'Второй блок (это HTML-код)\']',
    },
    stateObj:{
        ss__editable: 'флаг редактируемости. Если указано значение соответствующего атрибута в опциях, то будет игнорироваться',
        ss__current: 'текущие текст, фрагмент и блок. при прокрутке пользователем меняется, при внешнем изменении меняется текущая позиция в тексте, при изменении геометрии экрана контент отображается, начиная от начала определённого в этом свойстве блока. Задаётся в виде объекта: {ss__textId: 45, ss__fragment: 0, ss__block: 0} (ss__fragment и ss__block имеют значение 0 по умолчанию).',
        ss__fragmentsCount: 'общее количество фрагментов в тексте',
        ss__textCorrection: 'здесь хранятся изменения в тексте, произведённые пользователем. Эти изменения могут быть считаны внешними компонентами для сохранения на сервер. После успешного сохранения следует соответствующее поле добавить в свойство ss__textCorrectionApplied (см. далее), чтобы данный компонент сам убрал данные об изменённости',
        ss__textRefragmentation: 'сюда записываются команды от внешнего "сохраняльщика" на перефрагментацию текста. Пример команды: D1:',
        ss__textCorrectionApplied: 'сюда следует записывать сохранённые блоки. Этот компонент сравнит, не изменились ли они за время сохранения, и если они не изменилисб, то сведения об изменённости блоков будут подчищены',
        ss__fGetFragmentData: '(функция) Эту функцию добавляет сам данный компонент. Она нужна внешнему компоненту для сохранения изменений. Эта функция даёт данные по идентификатору фрагмента.'
    }
});

function ss__LargeTextEdit(ss__p_wContainer, ss__p_options){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options);
    this.ss__options = ss__p_options;
    // ...
};
ss__LargeTextEdit.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__LargeTextEdit.prototype.constructor = ss__LargeTextEdit;
ss__LargeTextEdit.prototype.ss__processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};
ss__p_namespace.ss__LargeTextEdit = ss__LargeTextEdit



registerHelp('ss__StaticHtml', {
    title: 'Тупо отображатель статического HTML',
    //descr: '',
    options:{
        ss__html: 'HTML, отображаемый данным виджетом.',
        ss__htmlVarName: 'имя переменной в объекте состояния, в которой хранится HTML-код, который данный виджет должен отображать. Если не задано, то отображаемый код будет неизменным. Если значение переменной имеет неопределённое значение, то отображается HTML-код, заданный в опции "html".',
        ss__processor: 'функция преобразования DOM-элемента сразу после установки innerHTML=<значение HTML>. Параметры: 1. DOM-элемент (div), возвращаемое значение не требуется; 2. Объект, в который можно добавить обработчик изменения размеров (добавив свойство _onResized). _onResized принимает три параметра: div, width и height.'
    }
    //stateObj:{}
});

function ss__StaticHtml(ss__p_wContainer, ss__p_options){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options);
    this.ss___options = ss__p_options;
    this.ss___prevVal = '';
    this.ss___wContainer = ss__p_wContainer;
    //this.ss___e;
    //this.ss___fOnResized;
    var ss__1;
    if (ss__p_options.ss__html){
        this.ss___e = ss__Traliva.ss__createElement('<div traliva=ss__container>' + ss__p_options.ss__html + '</div>', ss__1 = {}, 'ss__traliva_kit__static_html');
        if (ss__p_options.ss__processor){
            ss__1 = {};
            ss__p_options.ss__processor(ss__1.ss__container, ss__1);
            if (ss__1.ss___onResized)
                this.ss___fOnResized = ss__1.ss___onResized;
        }
        //this.ss___e.style.margin = 'auto';//
        ss__p_wContainer.ss__setContent(this.ss___e);
        this.ss___prevVal = ss__p_options.ss__html;
        //ss__1.ss__container.style.width = '600px';
    }
    //else
    //    console.log('22 облом');//
    //var ss__1 = this.ss___e;
    (function(ss__p_self){
        ss__p_wContainer.ss___onResized = function(w, h){
            //if (ss__1)
            //    ss__1.style.margin = 'auto';
            //this.ss___div.style.margin = 'auto';//
            //this.ss___contentDiv.style.width = '600px';//'' + ((w > 600) ? 600 : w) + 'px';

            this.ss___contentDiv.style.width = '' + w + 'px';
            //this.ss___contentDiv.style.height = '' + h + 'px';
            if (ss__p_self.ss___fOnResized)
                ss__p_self.ss___fOnResized(ss__p_self.ss___e, w, h);
            return {
                ss__h: this.ss___contentDiv.clientHeight
            };
        };
    })(this);
};
ss__StaticHtml.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__StaticHtml.prototype.constructor = ss__StaticHtml;
ss__StaticHtml.prototype.ss__destroy = function(){
    //this.ss___wContainer.ss___contentDiv.removeAttribute('style');
    //console.log('static html destroy');
    //this.ss___e.removeAttribute('style');
};
ss__StaticHtml.prototype.ss__processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    if (!this.ss___options.ss__htmlVarName)
        return;
    var ss__0 = this.ss___state[this.ss___options.ss__htmlVarName] || this.ss___options.ss__html || '';
    if (ss__0 === this.ss___prevVal)
        return;
    this.ss___e = ss__Traliva.ss__createElement(ss__0, undefined, 'ss__traliva_kit__static_html');
    console.log('----------------------\n', this.ss___options);//
    if (this.ss___options.ss__processor){
        ss__0 = {};
        this.ss___e = this.ss___options.ss__processor(this.ss___e, ss__0) || this.ss___e;
        if (ss__0.ss___onResized){
            this.ss___fOnResized = ss__0.ss___onResized;
            this.ss___fOnResized(this.ss___e, this.ss___w, this.ss___h);
        }
    }
    this.ss___wContainer.ss__setContent(this.ss___e);
    this.ss___prevVal = ss__0;
};
ss__p_namespace.ss__StaticHtml = ss__StaticHtml



registerHelp('ss__Catalogue', {
    title: 'Контейнер для "карточек товаров"',
    //descr: '',
    //options:{},
    //stateObj:{}
});

function ss__Catalogue(ss__p_wContainer, ss__p_options, ss__p_widgets){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
    console.log('Catalogue constrictor: taken p_widgets: ', ss__p_widgets);//
    // ...
};
ss__Catalogue.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__Catalogue.prototype.constructor = ss__Catalogue;
ss__Catalogue.prototype.ss__processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};
ss__Catalogue.widgetsFields = [
    'ss__items'
];
ss__p_namespace.ss__Catalogue = ss__Catalogue



registerHelp('ss__CatalogueBrezentItem', {
    title: 'Карточка товара для категории "брезент"',
    //descr: '',
    //options:{},
    //stateObj:{}
});

function ss__CatalogueBrezentItem(ss__p_wContainer, ss__p_options, ss__p_widgets){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
    ss__p_wContainer.ss__setContent(ss__Traliva.ss__createElement('<img src="'+ss__p_options.ss__image+'"></img>'));
    // ...
};
ss__CatalogueBrezentItem.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__CatalogueBrezentItem.prototype.constructor = ss__CatalogueBrezentItem;
ss__CatalogueBrezentItem.prototype.ss__processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};
ss__p_namespace.ss__CatalogueBrezentItem = ss__CatalogueBrezentItem



registerHelp('ss__Strip', {
    title: 'Линейный лейаут: элементы встроку или встолбец',
    //descr: '',
    options:{
        ss__orient: 'горизонтальный или вертикальный. Перечисление ss__TralivaKit__Strip__orient:v,h'
    },
    //stateObj:{}
});



//#e#ss__TralivaKit__Strip__orient:h##;
function ss__Strip(ss__p_wContainer, ss__p_options, ss__p_descr){
    var ss__children = ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_descr);
	this.ss____orient = ss__p_options.ss__orient;
	this.ss____items = [];
	this.ss____sizes = [];
	this.ss____w;
	this.ss____h;
    this.ss____wContainer = ss__p_wContainer;

	this.ss___eTable = document.createElement('table');
	this.ss___eTable.style.border = 'none';
	this.ss___eTable.cellSpacing = '0';
	if (this.ss____orient === 0x102){
		this.ss___eRowSingle = this.ss___eTable.insertRow(0);
	}
    ss__p_wContainer.ss__setContent(this.ss___eTable);
    (function(self, ss__p_wContainer){
    ss__p_wContainer.ss___onResized = function(ss__w, ss__h){
        self.ss____w = ss__w;
        self.ss____h = ss__h;
        self.ss____updateSizes();
    };
    ss__p_wContainer.ss___onChildVisibilityChanged = function(ss__wChild){
        self.ss____updateSizes();
    };
    })(this, ss__p_wContainer);
    console.log('strip constructor parameters: ', ss__p_wContainer, ss__p_options, ss__p_descr);
    //this.ss___updateItems(ss__p_options.ss___children.ss__items);
    console.log('strip constructor children: ', ss__children);
    if (ss__children)
        this.ss___updateItems(ss__children.ss__items);
	//ss___WidgetBase.call(this, ss__p_parentWidget, ss__p_attr);
    // ...
};
ss__Strip.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__Strip.prototype.constructor = ss__Strip;
ss__Strip.ss__widgetsFields = ['ss__items'];
ss__Strip.prototype.ss__processStateChanges = function(s){
    ss__Traliva.ss__WidgetStateSubscriber.prototype.ss__processStateChanges.call(this, s);
    if (!s){
        console.error('epic fail');
        return;
    }
    console.log('BORIS HERE');
    // ...
};
ss__Strip.prototype.ss____updateSizes = function(){
	var ss__totalForParts = (this.ss____orient === 0x102) ? this.ss____w : this.ss____h;
	if (ss__totalForParts < 0)
		return;
	var ss__totalParts = 0;
	for (var ss__0 = 0 ; ss__0 < this.ss____items.length ; ss__0++){
		if (!this.ss____items[ss__0].ss__isVisible())
			continue;
		if (this.ss____sizes[ss__0].ss__unit == 'px'){
			ss__totalForParts -= this.ss____sizes[ss__0].ss__value;
		}
		else if (this.ss____sizes[ss__0].ss__unit == 'part'){
			ss__totalParts += this.ss____sizes[ss__0].ss__value;
		}
	}
	for (var ss__0 = 0 ; ss__0 < this.ss____items.length ; ss__0++){
		if (!this.ss____items[ss__0].ss__isVisible())
			continue;
		var ss__tmpSize = undefined;
		if (this.ss____sizes[ss__0].ss__unit == 'px'){
			ss__tmpSize = this.ss____sizes[ss__0].ss__value;
		}
		else if (this.ss____sizes[ss__0].ss__unit == 'part'){
			ss__tmpSize = this.ss____sizes[ss__0].ss__value * ss__totalForParts / ss__totalParts;
		}
		if (!ss__tmpSize){
			console.log('epic fail');
			continue;
		}

		var ss__1 = this.ss____items[ss__0];
		if (this.ss____orient == 0x102)
			ss__1.ss__resize(ss__tmpSize,this.ss____h);
		else
			ss__1.ss__resize(this.ss____w, ss__tmpSize);
	}
};
ss__Strip.prototype.ss___updateItems = function(ss__p_content){
    console.log('^^', ss__p_content);//
    var ss__1,
        ss__eCell, ss__itemWidget, ss__size,
        ss__0;
    // убираем лишние
    for (ss__1 = ss__p_content.length ; ss__1 < this.ss____items.length ; ++ss__1){
    }

    // добавляем новые
    for (ss__1 = this.ss____items.length ? this.ss____items.length - 1 : 0 ; ss__1 < ss__p_content.length ; ++ss__1){
        ss__size = this.ss___transformStringSize(ss__p_content[ss__1].ss__size);
        ss__itemWidget = ss__p_content[ss__1].ss___widget;
        if (this.ss____orient == 0x102){
            ss__eCell = this.ss___eRowSingle.insertCell(this.ss___eRowSingle.cells.length);
        }
        else {
            var ss__eRow = this.ss___eTable.insertRow(this.ss___eTable.rows.length);
            ss__eCell = ss__eRow.insertCell(0);
        }
        ss__eCell.appendChild(ss__itemWidget.ss___div);
        ss__eCell.style.padding = '0';
        this.ss____items.push(ss__itemWidget);
        this.ss____sizes.push(ss__size);
    }

	/*var ss__eCell;
	if (this.ss____orient === #e#TralivaKit__Strip__orient:h##){
		//ss__eCell = this.ss___eRowSingle.insertCell(this.ss___eRowSingle.cells.length);
        
	}
	else {
		var ss__eRow = this.ss___eTable.insertRow(this.ss___eTable.rows.length);
		ss__eCell = ss__eRow.insertCell(0);
	}
	ss__eCell.appendChild(ss__p_itemWidget.ss___div);
	ss__eCell.style.padding = '0';
	this.ss____items.push(ss__p_itemWidget);
	this.ss____sizes.push(ss__size);*/
};
ss__Strip.prototype.ss___updateLayout = function(ss__p){
    console.log('strip: update layout: ', ss__p);//
    this.ss___updateItems(ss__p ? (ss__p.ss__items || []) : []);
};
ss__p_namespace.ss__Strip = ss__Strip



registerHelp('ss__Stack', {
    title: 'Многослойный лейаут: элементы один поверх другого',
    //descr: '',
    //options:{},
    //stateObj:{}
});

function ss__Stack(ss__p_wContainer, ss__p_options, ss__p_widgets){
    console.log('Запускается конструктор класса ss__Stack');
	this.ss____items = [];
	this.ss____zIndexCounter = 1;
    this.ss___w = undefined;
    this.ss___h = undefined;

	this.ss___eStack = document.createElement('div');
	this.ss___eStack.style.position = 'relative';
    var ss__children = ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets),
        ss__1;
    ss__p_wContainer.ss___onResized = (function(ss__0){return function(ss__w, ss__h){
        ss__0.ss___w = ss__w;
        ss__0.ss___h = ss__h;
        for (var ss__1 = 0 ; ss__1 < ss__0.ss____items.length ; ss__1++){
            var ss__item = ss__0.ss____items[ss__1];
            ss__item.ss__resize(ss__w,ss__h);
        }
    };})(this);

    ss__p_wContainer.ss__setContent(this.ss___eStack);
    if (ss__p_widgets){ // Содержимое меню формируется динамически
        console.log('ДИНАМИКА:', ss__p_widgets, ss__children, ss__p_options);//
    }
    else if (ss__p_options.ss___children){ // Содержимое меню задано статически
        console.log('СТАТИКА:', ss__p_widgets, ss__children, ss__p_options);//
        for (ss__1 = 0 ; ss__1 < ss__children.length ; ++ss__1){
            this.ss__addItem(ss__children[ss__1]);
        }
    }
    if (ss__children)
        this.ss___updateItems(ss__children.ss__items);
    console.log('----');
};
ss__Stack.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__Stack.prototype.constructor = ss__Stack;
ss__Stack.ss__widgetsFields = ['ss__items'];
ss__Stack.prototype.ss__destroy = function(){
};
ss__Stack.prototype.ss___createContentElem = function(){
	return this.ss___eStack;
};
ss__Stack.prototype.ss___updateLayout = function(ss__p){
    this.ss___updateItems(ss__p ? (ss__p.ss__items || []) : []);
};
ss__Stack.prototype.ss___updateItems = function(ss__p_content){
    var ss__1;
    while (this.ss____items.length){
        this.ss__removeItem(0);
    }
    for (ss__1 = 0 ; ss__1 < ss__p_content.length ; ++ss__1){
        this.ss__addItem(ss__p_content[ss__1].ss___widget);
    }
};
ss__Stack.prototype.ss__addItem = function(ss__p_itemWidget){
	if (typeof ss__p_itemWidget != 'object'){
		console.log('epic fail');
		return;
	}
	ss__p_itemWidget.ss___div.style.position = 'absolute';
	ss__p_itemWidget.ss___div.style.zIndex = this.ss____zIndexCounter;
	ss__p_itemWidget.ss___div.style.left = '0';
	ss__p_itemWidget.ss___div.style.top = '0';
	this.ss___eStack.appendChild(ss__p_itemWidget.ss___div);
	this.ss____items.push(ss__p_itemWidget);
    if (this.ss___w)
        ss__p_itemWidget.ss__resize(this.ss___w, this.ss___h);

	this.ss____zIndexCounter++;
};
ss__Stack.prototype.ss__removeItem = function(ss__p_index){
    if (ss__p_index >= this.ss____items.length){
        console.log('epic fail');
        return;
    }
    this.ss___eStack.removeChild(this.ss____items[ss__p_index].ss___div);
    this.ss____items.splice(ss__p_index, 1);
};
ss__Stack.prototype.ss___onChildVisibilityChanged = function(ss__wChild){
    var ss__0, ss__1, ss__2;//ss__1 - top level widget index
    for (ss__0 = 0 ; ss__0 < this.ss____items.length ; ss__0++){
        if (this.ss____items[ss__0].ss__isVisible())
            ss__1 = ss__0;
    }
    for (ss__0 = 0 ; ss__0 < this.ss____items.length ; ss__0++){
        ss__2 = this.ss____items[ss__0];
        ss__2.ss__setMouseEventsBlocked(ss__0 !== ss__1);
    }
};
ss__Stack.prototype.ss__processStateChanges = function(s){
    ss__Traliva.ss__WidgetStateSubscriber.prototype.ss__processStateChanges.call(this, s);
    if (!s){
        console.error('epic fail');
        return;
    }
    console.log('BORIS HERE');
    // ...
};
ss__p_namespace.ss__Stack = ss__Stack



registerHelp('ss__RollIn', {
    title: 'Выкатывающееся меню для смартфонов',
    //descr: '',
    options:{
        ss__visibleVarName: 'имя свойства, которое в объекте состояния указывает, выкачен виджет или нет должен быть. Значение по умолчанию - \'ss__visible\'.'
    },
    //stateObj:{}
});

function ss__RollIn(ss__p_wContainer, ss__p_options, ss__p_widgets){
    var ss__0,
        ss__children = ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets)
    ;
    //this.ss___rollInState = undefined;
    
    if (typeof ss__p_options.ss__visibleVarName !== 'string'){
        console.log('ERROR: опция ss__visibleVarName должна быть явно указана (тип строка).');
    }
    
    //this.ss___visibilityToChange;
    this.ss___options = ss__p_options;
    this.ss___wContainer = ss__p_wContainer;
    //this.ss__e = ss__Traliva.ss__createElement('<div traliva="ss___eMenuRect"><h1>Hello!</h1></div>', this, 'ss__traliva_kit__roll_inn');
    this.ss__e = ss__Traliva.ss__createElement('<div traliva="ss___eMenuRect"/>', this, 'ss__traliva_kit__roll_inn');
    ss__p_wContainer.ss___onResized = (function(ss__0){return function(ss__w, ss__h){
        ss__0.ss___w = ss__0.ss___getMenuWidth(ss__w);
        if (!ss__0.ss___rollState){
            ss__0.ss___w = ss__0.ss___getMenuWidth(ss__w);
            ss__0.ss___eMenuRect.style.left = '-' + ss__0.ss___w + 'px';
            ss__0.ss___eMenuRect.style.width = '' + ss__0.ss___w + 'px';
        }
    };})(this);
    console.log(this.ss__e);
    if (ss__p_widgets){ // Содержимое меню формируется динамически
        console.log('ДИНАМИКА:', ss__p_widgets, ss__children, ss__p_options);//
    }
    else if (ss__p_options.ss___children){ // Содержимое меню задано статически
        console.log('СТАТИКА:', ss__p_widgets, ss__children, ss__p_options);//
    }
    if (ss__children){
        ss__0 = ss__children.ss__content;
        if (ss__0 && (ss__0 = ss__0.pop())){
            ss__0 = ss__0.ss___widget.ss___div;
            ss__0.style.height = '100%';
            ss__0.style.width = '100%';
            this.ss___eMenuRect.appendChild(ss__0);
        }
    }
    ss__p_wContainer.ss__setContent(this.ss__e);
};
ss__RollIn.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__RollIn.prototype.constructor = ss__RollIn;
ss__RollIn.ss__widgetsFields = ['ss__content'];
ss__RollIn.prototype.ss___getMenuWidth = function(ss__p_width){
    return ss__p_width * 0.8;
};
ss__RollIn.prototype.ss__processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    var ss__0;
    ss__0 = s[this.ss___options.ss__visibleVarName || 'ss__visible'] ? true : false;
    if (this.ss___rollInState !== ss__0){
        console.log(ss__0);
        if (ss__0){
            this.ss___visibilityToChange = true;
            this.ss___wContainer.ss__setVisible(true);
        }
        else{
            this.ss___visibilityToChange = false;
            this.ss___eMenuRect.style.left = '-' + this.ss___w + 'px';
            this.ss__e.style.backgroundColor = 'rgba(0,0,0,0)';
        }
        setTimeout((function(ss__0){return function(){
            ss__0.ss___updateVisibility();
        };})(this), 200); // 200мс. - время действия анимации (см. CSS)

        //this.ss___wContainer.ss__setMouseEventsBlocked(false);//
        //console.log('BLOCKED:', ss__0);//
        this.ss___rollInState = ss__0;
    }
};
ss__RollIn.prototype.ss___updateVisibility = function(){
    var ss__0 = this.ss___state[this.ss___options.ss__visibleVarName || 'ss__visible'] ? true : false;
    if (ss__0 === this.ss___visibilityToChange){
        if (ss__0){
            this.ss___eMenuRect.style.left = '0px';
            this.ss__e.style.backgroundColor = 'rgba(0,0,0,0.5)';
        }
        else{
            this.ss___wContainer.ss__setVisible(ss__0);
        }
    }
};
ss__p_namespace.ss__RollIn = ss__RollIn



registerHelp('90223NavBar', {
    title: 'Переключалка между вкладками (панель)',
    //descr: '',
    options:{
        ss__target: '\'ss__desktop\'или \'ss__mobile\' - для десктопной версии или для мобильной, соответственно. Это влияет на ориентацию списка вкладок.',
        ss__color1: 'основной цвет панели (фоновый). Он же цвет текста для текущей вкладки. По умолчанию - бордовый.',
        ss__color2: 'дополнительный цвет панели (цвет текста). Он же цвет фона для выбранной вкладки. По умолчанию - жёлтый.',
        ss__variants: 'список вариантов: {ss__title: \'...\', ss__id: \'...\'}',
        ss__valueVarName: 'имя свойства в объекте состояния, в котором хранится идентификатор выбранной вкладки'
    },
    //stateObj:{}
});

function ss__90223NavBar(ss__p_wContainer, ss__p_options, ss__p_widgets){
    var ss__eTable,
        ss__eRow,
        ss__0, ss__1, ss__2, ss__3, ss__4,
        ss__color1 = ss__p_options.ss__color1 || '#420',
        ss__color2 = ss__p_options.ss__color2 || '#ffa',
        ss__valueVarName = ss__p_options.ss__valueVarName || 'ss__value',
        ss__variants = ss__p_options.ss__variants || [
            {
                ss__id: 'r1',
                ss__title: 'первая вкладка'
            },
            {
                ss__id: 'r2',
                ss__title: 'Вторая вкладка'
            },
        ],
        ss__target = ss__p_options.ss__target || 'ss__mobile';
    ;
    ss__p_options.ss__bg = ss__color1;
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options);
    this.ss___options = ss__p_options;
    this.ss___buttons = {};
    if (ss__target === 'ss__desktop'){
        ss__eTable = document.createElement('table');
        ss__eTable.className="ss__TralivaKit__90223NavBar__desktop";
        ss__eTable.style.height = '100%';
        ss__eRow = ss__eTable.insertRow(-1);
        //this.ss___current;
        for (ss__1 = 0 ; ss__1 < ss__variants.length ; ++ss__1){
            ss__0 = ss__variants[ss__1];
            ss__2 = ss__eRow.insertCell(-1);
            this.ss___buttons[ss__0.ss__id] = {
                ss__element: ss__2,
                ss__enabled: false // не используется
            };
            ss__2.style.padding = '20px';
            ss__2.innerHTML = ss__0.ss__title;
            ss__2.style.color = ss__color2;
            ss__2.style.cursor = 'pointer';
            ss__2.addEventListener('click', (function(ss__1, ss__2){return function(){
                ss__1.ss___onTabClicked(ss__2);
            };})(this, ss__0.ss__id));
        }
        ss__p_wContainer.ss___onResized = (function(ss__1, ss__2){return function(ss__w, ss__h){
            var ss__0 = ss__2.getBoundingClientRect().width;
            ss__0 = ss__0 < ss__w ? (ss__w - ss__0)/2 : 0;
            ss__1.style.paddingLeft = '' + ss__0 + 'px';
        };})(ss__p_wContainer.ss___div, ss__eTable);
        ss__p_wContainer.ss__setContent(ss__eTable);
    }
    else if (ss__target === 'ss__mobile'){
        ss__eTable = document.createElement('div');
        ss__eTable.className="ss__TralivaKit__90223NavBar__mobile";
        ss__p_wContainer.ss___div.style.overflow = 'auto';
        for (ss__1 = 0 ; ss__1 < ss__variants.length ; ++ss__1){
            ss__0 = ss__variants[ss__1];
            ss__2 = document.createElement('p');
            this.ss___buttons[ss__0.ss__id] = {
                ss__element: ss__2,
                ss__enabled: false // не используется
            };
            ss__2.innerHTML = ss__0.ss__title;
            ss__2.style.padding = '20px';
            ss__2.style.color = ss__color2;
            ss__2.style.cursor = 'pointer';
            ss__2.addEventListener('click', (function(ss__1, ss__2){return function(){
                ss__1.ss___onTabClicked(ss__2);
            };})(this, ss__0.ss__id));
            ss__eTable.appendChild(ss__2);
        }
        ss__p_wContainer.ss__setContent(ss__eTable);
    }
    
    else{
        ss__eTable = document.createElement('p');
        ss__eTable.style.height = '100%';
        ss__eTable.style.textAlign='center';
        ss__eTable.style.color = '#f80';
        ss__eTable.style.background = '#400';
        ss__eTable.innerHTML = 'incorrect target';
        ss__p_wContainer.ss__setContent(ss__eTable);
    }
    
};
ss__90223NavBar.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__90223NavBar.prototype.constructor = ss__90223NavBar;
ss__90223NavBar.prototype.ss__processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    var ss__1;
    if (this.ss___options.ss__target === 'ss__desktop' || this.ss___options.ss__target === 'ss__mobile'){
        ss__1 = s[this.ss___options.ss__valueVarName || 'ss__value'];
        if (ss__1 !== this.ss___current){
            this.ss___setButtonHighlighten(this.ss___current, false);
            this.ss___setButtonHighlighten(ss__1, true);
            this.ss___current = ss__1;
        }
    }
};
//ss__90223NavBar.widgetsFields = [];
ss__90223NavBar.prototype.ss___onTabClicked = function(ss__p_id){
    if (ss__p_id === this.ss___current)
        return;
    if (this.ss___current)
        this.ss___setButtonHighlighten(this.ss___current, false);
    this.ss___setButtonHighlighten(ss__p_id, true);
    this.ss___current = ss__p_id;
    this.ss___state[this.ss___options.ss__valueVarName || 'ss__value'] = ss__p_id;
    this.ss___registerStateChanges();
};
ss__90223NavBar.prototype.ss___setButtonHighlighten = function(ss__p_bnId, ss__p_if){
    var ss__0;
    if (ss__p_bnId)
        ss__0 = this.ss___buttons[ss__p_bnId || '_'];
    if (ss__0){
        if (ss__p_if){
            ss__0.ss__element.style.color = this.ss___options.ss__color1 || '#420';
            ss__0.ss__element.style.background = this.ss___options.ss__color2 || '#ffa';
        }
        else{
            ss__0.ss__element.style.background = this.ss___options.ss__color1 || '#420';
            ss__0.ss__element.style.color = this.ss___options.ss__color2 || '#ffa';
        }
    }
};
ss__p_namespace.ss__90223NavBar = ss__90223NavBar



registerHelp('ss__Bedsheet', {
    title: 'Простыня - это контейнер, который отображает контент на широких (десктопных) экранах не на всю ширину, а лишь на узкой вертикальной полосе по центру',
    descr: 'Используйте конструктор как функцию, чтобы сгенерировать в лейауте описание виджета, обёрнутого этим контейнером',
    options:{
        padding: 'В пикселях. По умолчанию 10.',
        border: '{color: <цвет>, width: <ширина в пикселях>, background: <фон подложки под контентом>}. Если задано, то будет ограничение контента по ширине. Если задано, то ширина линии границы по умолчанию - 1 пиксел.'
        //borderColor: '',
        //borderWidth: ''
    },
    //stateObj:{}
});

function ss__Bedsheet(ss__p_wContainer, ss__p_options, ss__p_widgets){
    var ss__children, ss__content, ss__1, ss__2 = {}, ss__3;
    if (this.constructor !== ss__Bedsheet){ // это не конструктор, а тупо функция
        // сокращённая семантика для сокращения лейаутов.
        // Должны вернуть фрагмент описателя лейаута.
        // p_wContainer - это не ss__Traliva.ss__Widget, а часть описания лейаута (объект или строка).
        return {
            ss__type: ss__Bedsheet,
            ss__content: [{
                ss___widget: ss__p_wContainer
            }]
        };
    }
    ss__children = ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
    ss__content = ss__children.ss__content;
    if (ss__content)
        ss__content = ss__content[0];
    
    if (!ss__content){
        console.log('epic fail');
        return;
    }
    
    ss__1 = ss__Traliva.ss__createElement('<div traliva="ss__1"></div>', ss__2);
    ss__2.ss__1.style.margin = 'auto';
    //ss__2.ss__1.style.background = 'rgba(255,255,255,0.3)';
    ss__2.ss__1.style.padding = '' + (ss__p_options.ss__padding || 10) + 'px';
    if (ss__3 = ss__p_options.ss__border){
        ss__2.ss__1.style.background = ss__3.ss__background || '#888';
        ss__3 = (ss__3.ss__width || 1) + 'px solid ' + (ss__3.ss__color || 'black');
        ss__2.ss__1.style.borderRight = ss__3;
        ss__2.ss__1.style.borderLeft = ss__3;
    }
    ss__1.style.overflow = '';
    ss__p_wContainer.ss___onResized = (function(ss__0, ss__1, ss__p_options){return function(ss__w, ss__h){
        var ss__2, ss__3;
        this.ss___content.style.height = '' + ss__h + 'px';
        ss__3 = ss__p_options.ss__padding || 10;
        ss__0.style.minHeight = '' + (ss__h - 2*ss__3) + 'px';
        if (ss__p_options.ss__border){
            ss__2 = ss__w * 0.9;
            if (ss__2 > 800)
                ss__2 = 800;
        }
        else{
            ss__2 = ss__w - 35;
        }
        ss__0.style.width = '' + ss__2 + 'px';
        console.log('content: ', ss__1);//
        ss__1.ss___widget.ss__resize(ss__2, ss__h); // ss__h может быть "перебито". Раньше вместо ss__h передавался нуль.
    };})(ss__2.ss__1, ss__content, ss__p_options);
    ss__2.ss__1.appendChild(ss__content.ss___widget.ss___div);
    ss__p_wContainer.ss__setContent(ss__1);
    ss__p_wContainer.ss___content.style.overflow = 'auto';
};
ss__Bedsheet.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__Bedsheet.prototype.constructor = ss__Bedsheet;
ss__Bedsheet.prototype.ss__destroy = function(){
};
ss__Bedsheet.prototype.ss__processStateChanges = function(s){
};
ss__Bedsheet.ss__widgetsFields = ['ss__content'];
ss__p_namespace.ss__Bedsheet = ss__Bedsheet


//{"ss__data":{"ss__phone":"+71234567890","ss__address":{"ss__address":"Тутаев, ул. Розы Люксембург.","ss__coordinates":{"ss__lat":57.87855,"ss__lon":39.517897,"ss__popupHtml":"Льнокомбинат Тульма"}}},"ss__callbackCommand":{"ss__number":""},"ss__currentTab":"ss__phone"}


registerHelp('ss__Contacts', {
    title: 'Виджет отображения контактов организации',
    //descr: '',
    options:{
        target: 'enum TralivaKit__Contacts__Target: mobile_h, mobile_v, desktop.',
        dataVarName: 'по умолчанию \'data\'',
        currentTabVarName: 'имя переменной, в которой хранится идентификатор текущей вкладки. По умолчанию, \'currentTab\'.',
        mapCommandVarName: 'имя переменной, в которую писать команду на отображение карты. По умолчанию \'mapCommand\'',
        callbackVarName: 'имя переменной, в которую писать команду на отображение формы обратного звонка. По умолочанию, \'callbackCommand\'.'
    },
    stateObj:{
        //phone: 'контактный номер телефона. Строка вида \'+71234567890\'. При отображении этот номер будет приведён к форме \'+7 (123) 456-78-90\'.',
        //address: 'объект с адресом',
        currentTab: 'идентификатор текущей вкладки',

        data: 'Объект, описывающий контактные данные предприятия:    phone: <контактный номер телефона (строка)>,    address:{        //postIndex: <почтовый индекс (строка)>,        address: <адрес (строка)>,        coordinates:{            lat: <широта (float, градусы)>,            lon: <долгота (float, градусы)>        },    },    requisites:{ // ОКПО, ИНН/КПП, ОГРН, р/с, к/сч, БИК        ИНН: <ИНН (строка)>,        КПП: <КПП (строка)>,        ОКПО: <ОКПО (строка)>,        ОГРН: <ОГРН (строка)>    },    email: <строка с адресом электронной почты. Например, \'user@company.com\'>        ',
        mapCommand: 'объект, описывающий задание на отображение карты. См. документацию по компоненту \'90412MapView\''
    }
});


function ss__Contacts(ss__p_wContainer, ss__p_options, ss__p_widgets){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
    this.ss__dataVarName = ss__p_options.ss__dataVarName || 'ss__data';
    this.ss__curTabVarName = ss__p_options.ss__currentTabVarName || 'ss__currentTab';
    this.ss__prevVal = {};
    this.ss__idSeq = [
        'ss__phone',
        'ss__address',
        'ss__requisites',
        'ss__social',
        'ss__email'
    ];
    //this.ss__currentTab;

    this.ss__eTileContainer;
    this.ss__tiles = {};
    this.ss__icons = {};
    this.ss__target = ss__p_options.ss__target || 'ss__mobile';
    //this.ss__target = ss__p_options.ss__target || 'ss__desktop';
    this.ss__mapCommandVarName = ss__p_options.ss__mapCommandVarName || 'ss__mapCommand';
    this.ss__callbackVarName = ss__p_options.ss__callbackVarName ||'ss__callbackCommand';
    this.ss__tabsPosition = ss__p_options.ss__tabsPosition || 'ss__top';
    //this.eBns
    //this.eTabs,
    var ss__fOnBnClicked, ss__0, ss__1;

    var ss__content;
    if (this.ss__target === 'ss__mobile'){
        ss__content = ss__Traliva.ss__createElement('<div><div traliva="ss__eBnPhone" m_type="ss__phone" class="ss__card_icon_mobile" style="background: url(/static/root_app/res/_traliva_kit/contact_icons/phone_64.png) rgb(255,255,204);"></div><div traliva="ss__eBnAddress" m_type="ss__address" class="ss__card_icon_mobile" style="background: url(/static/root_app/res/_traliva_kit/contact_icons/address_64.png) rgb(255,255,204);"></div><div traliva="ss__eBnRequisites" m_type="ss__requisites" class="ss__card_icon_mobile" style="background:url(requisites_64.png) #ffa;"></div><div traliva="ss__eBnSocial" m_type="ss__social" class="ss__card_icon_mobile" style="background:url(social_64.png) #ffa;"></div><div traliva="ss__eBnEmail" m_type="ss__email" class="ss__card_icon_mobile" style="background: url(/static/root_app/res/_traliva_kit/contact_icons/email_64.png) rgb(255,255,204);"></div></div><div style="position:relative"><div traliva="ss__eTabPhone" class="ss__traliva_kit__contacts__tab"><table><tr><td colspan="2"><h3>Телефон: </h3><p traliva="ss__eTabPhoneNumber"/></td></tr><tr><td><a traliva="ss__eTabPhoneTelLink" href="" style="color:inherit;text-decoration:none;"><div class="ss__bn">Позвонить</div></a></td><td><div class="ss__bn" traliva="ss__eBnOrderCallback">Заказать звонок</div></td></tr></table></div><div traliva="ss__eTabAddress" class="ss__traliva_kit__contacts__tab"><!--<p>Вкладка с адресом</p>--><h3>Адрес: </h3><p traliva="ss__eTabAddressAddress"/><div class="ss__bn" style="width:200px" traliva="ss__eBnShowOnMap">Показать на карте</div></div><div traliva="ss__eTabRequisites" class="ss__traliva_kit__contacts__tab"><p>Вкладка с банковскими реквизитами</p></div><div traliva="ss__eTabSocial" class="ss__traliva_kit__contacts__tab"><p>Вкладка с соц.сетями</p></div><div traliva="ss__eTabEmail" class="ss__traliva_kit__contacts__tab"><h3>Электронная почта: </h3><a traliva="ss__eTabEmailEmail"></a></div></div>', this, 'ss__traliva_kit__contacts');
        ss__p_wContainer.ss__setContent(ss__content);
        this.ss__widgets = {
            ss__phone:{
                ss__bn: this.ss__eBnPhone,
                ss__tab: this.ss__eTabPhone,
                ss__isVisible: false
            },
            ss__address:{
                ss__bn: this.ss__eBnAddress,
                ss__tab: this.ss__eTabAddress,
                ss__isVisible: false
            },
            ss__requisites:{
                ss__bn: this.ss__eBnRequisites,
                ss__tab: this.ss__eTabRequisites,
                ss__isVisible: false
            },
            ss__social:{
                ss__bn: this.ss__eBnSocial,
                ss__tab: this.ss__eTabSocial,
                ss__isVisible: false
            },
            ss__email:{
                ss__bn: this.ss__eBnEmail,
                ss__tab: this.ss__eTabEmail,
                ss__isVisible: false
            }
        };
        ss__fOnBnClicked = this.ss__fOnBnClicked();
        for (ss__1 in this.ss__widgets){
            ss__0 = this.ss__widgets[ss__1].ss__bn;
            ss__0.addEventListener('click', ss__fOnBnClicked);
        }
        ss__p_wContainer.ss___onResized = (function(ss__1){return function(ss__w, ss__h){
            var ss__2,
                ss__3 = ss__h - 130,
                ss__4 = ss__w - 40
            ;
            for (ss__2 in ss__1){
                ss__1[ss__2].ss__tab.style.height = ss__3 + 'px';
                ss__1[ss__2].ss__tab.style.width = ss__4 + 'px';
            }
            return {
                ss__w: ss__4,
                ss__h: ss__h - 20
            };
        };})(this.ss__widgets);
    }
    else if (this.ss__target === 'ss__desktop'){
        ss__content = ss__Traliva.ss__createElement('<div style="margin:auto" traliva="ss__eInnerContainer"><div traliva="ss__eTabPhone" class="ss__card" m_type=="ss__phone"><div class="ss__card_icon" style="background:url(/static/root_app/res/_traliva_kit/contact_icons/phone_64.png) rgb(255,255,204);"></div><!--<p>Вкладка с телефоном</p>--><div class="ss__card_inner" style="height:140px;"><table><tr><td colspan="2"><p><strong>Телефон: </strong> <span traliva="ss__eTabPhoneNumber">+7 (123) 456-78-90</span></p></td></tr><tr><td><div class="ss__bn" traliva="ss__eBnOrderCallback">Заказать звонок</div></td></tr></table></div></div><div traliva="ss__eTabAddress" class="ss__card" m_type="ss__address"><!--<div class="ss__card-icon" style="background:url(phone_64.png) #fca;"></div>--><!--<p>Вкладка с адресом</p>--><div class="ss__card_icon" style="background:url(/static/root_app/res/_traliva_kit/contact_icons/address_64.png) rgb(255,255,204);"></div><div class="ss__card_inner" style="height:140px;"><p><strong>Адрес:</strong><span traliva="ss__eTabAddressAddress">Россия, 152300, Ярославская обл., г. Тутаев, ул. Волжская Набережная, д. 142</span></p><div class="ss__bn" style="width:200px" traliva="ss__eBnShowOnMap">Показать на карте</div></div></div><div traliva="ss__eTabRequisites" class="ss__card" m_type="ss__requisites" style="height:260px;"><p>Вкладка с банковскими реквизитами</p>--><div class="ss__card_icon" style="background:url(requisites_64.png) #ffa;"></div><div class="ss__card_inner" style="height:260px;"><p><strong>ОКПО:</strong> 577759532</p><p><strong>ИНН/КПП:</strong> 7611013528/761101001</p><p><strong>ОГРН:</strong> 1027601273952</p><p><strong>р/с:</strong> 40702810577030160235 в Северном банке СБ РФ г. Ярославль</p><p><strong>к/сч:</strong> 30101810500000000670</p><p><strong>БИК:</strong> 047888670</p></div></div><div traliva="ss__eTabSocial" class="ss__card" m_type="ss__social" style="height:180px"><div class="ss__card_icon" style="background:url(phone_64.png) #fca;"></div><div class="ss__card_inner" style="height:180px;"><p>Вкладка с соц.сетями</p></div></div><div traliva="ss__eTabEmail" class="ss__card" m_type="ss__email" style="height:140px"><div class="ss__card_icon" style="background:url(/static/root_app/res/_traliva_kit/contact_icons/email_64.png) rgb(255,255,204);"></div><div class="ss__card_inner" style="height:140px;"><h3>Электронная почта: </h3><a traliva="ss__eTabEmailEmail"></a></div></div></div>', this, 'ss__traliva_kit__contacts');
        ss__p_wContainer.ss__setContent(ss__content);
        this.ss__widgets = {
            ss__phone:{
                ss__tab: this.ss__eTabPhone,
                ss__isVisible: false
            },
            ss__address:{
                ss__tab: this.ss__eTabAddress,
                ss__isVisible: false
            },
            ss__requisites:{
                ss__tab: this.ss__eTabRequisites,
                ss__isVisible: false
            },
            ss__social:{
                ss__tab: this.ss__eTabSocial,
                ss__isVisible: false
            },
            ss__email:{
                ss__tab: this.ss__eTabEmail,
                ss__isVisible: false
            }
        };
        this.ss__contentDiv = ss__p_wContainer.ss___contentDiv;
        ss__p_wContainer.ss___onResized = (function(ss__1){return function(ss__w, ss__h){
            ss__1.ss__w = ss__w;
            ss__1.ss__h = ss__h;
            return ss__1.ss___updateSizesDesktop();//ss__w, ss__h, this.ss___contentDiv);
        };})(this);
    }
    this.ss__eBnOrderCallback.addEventListener('click', (function(ss__1){return function(){
        ss__1.ss___state[ss__1.ss__callbackVarName] = {
            ss__number: ''
        };
        ss__1.ss___registerStateChanges();
    };})(this));
    this.ss__eBnShowOnMap.addEventListener('click', (function(ss__1){return function(){
        ss__1.ss___state[ss__1.ss__mapCommandVarName] = [ss__1.ss___state[ss__1.ss__dataVarName].ss__address.ss__coordinates];
        ss__1.ss___registerStateChanges();
    };})(this));
};
ss__Contacts.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__Contacts.prototype.constructor = ss__Contacts;
ss__Contacts.prototype.ss___updateSizesDesktop = function(){
    var ss__p_w = this.ss__w, ss__p_h = this.ss__h, ss__p_contentDiv = this.ss__contentDiv;
    var ss__2 = this.ss__widgets,
        ss__pInnerContainer = this.ss__eInnerContainer,
        ss__cardWidth = 512,
        ss__3, ss__4, ss__5, ss__6, ss__7, ss__n, ss__widgets = [];
    for (ss__3 in ss__2){
        console.log('*', ss__3);
        ss__2[ss__3].ss__tab.style.width = '' + ss__cardWidth + 'px';
    }
    // ширина одной плитки с отступами: (512 + 20 + 16)px == 532 px.
    ss__3 = 548;
    ss__n = parseInt(ss__p_w / ss__3);
    ss__3 = ss__n * ss__3;
    ss__pInnerContainer.style.width = '' + ss__3 + 'px';
    //ss__eInnerContainer.style.height = '256px';

    ss__4 = 0; // кандидат на высоту виджета
    ss__5 = 0; // кандидат на высоту строки
    ss__6 = 0; // счётчик плиток
    ss__7 = 0;
    for (ss__3 in ss__2){
        if (!ss__2[ss__3].ss__isVisible)
            continue;
        if (ss__6 === ss__n){
            ss__7 += (ss__5 + 20); // 20 is margin
            while (ss__4 = ss__widgets.pop()){
                ss__6 = ss__5 - ss__4.clientHeight;
                ss__4.style.top = ss__6 ? ('-' + ss__6 + 'px') : '0px';
            }
            ss__5 = 0;
            ss__6 = 0;
        }
        ss__4 = ss__2[ss__3].ss__tab;
        ss__widgets.push(ss__4);
        ss__4 = ss__4.clientHeight;
        if (ss__4 > ss__5)
            ss__5 = ss__4;
        ++ss__6;
    }
    ss__7 += (ss__5 + 40); // 20 is margin
    while (ss__4 = ss__widgets.pop()){
        ss__6 = ss__5 - ss__4.clientHeight;
        ss__4.style.top = ss__6 ? ('-' + ss__6 + 'px') : '0px';
    }

    ss__p_contentDiv.style.width = '' + ss__p_w + 'px';
    return {
        ss__h: ss__7
    };
};
ss__Contacts.prototype.ss__processStateChanges = function(s){
    /*var cand, t1;
    if (!s){
        console.error('epic fail');
        return;
    }
    if (typeof s.phone === 'object'){
    }
    else if (s.phone !== this.currentPhone){
        if (typeof s.phone !== 'string')
            console.log('epic fail');
        if (s.phone){
            t1 = '';
            if (s.phone[0] === '+' && s.phone.length === 12)
                t1 = '+' + s.phone[1] + ' ' + '(' + s.phone.substr(2,3) + ') ' + s.phone.substr(5,3) + '-' + s.phone.substr(8,2) + '-' + s.phone.substr(10,2);
            else
                t1 = s.phone;
            cand = '<div class="traliva_kit__contacts__item traliva_kit__contacts__phone"><h4>Телефон:</h4> <span>' + t1 + '</span><br/><div>';
            cand += '<a href="tel:' + s.phone + '">Позвонить</a>'; // мобильная версия
            t1 = {};
            cand += '<div traliva="eBnOrder">Заказать звонок</div>';
            cand += '</div></div>';
            cand = Traliva.createElement(cand, t1);
            this.wCallbackForm.setContent(cand);
        }
        else
            cand = Traliva.createElement('');
        //cand = Traliva.createElement(s.phone ? ('<div class="traliva_kit__contacts__item traliva_kit__contacts__phone"><h4>Телефон:</h4>' + s.phone + '</div>') : '');
        //this.eContent.replaceChild(cand, this.ePhone);
        //this.ePhone = cand;

        this.currentPhone = s.phone;
    }
    //phone
    //address (info)
    //address (map)
    */
    if (!s){
        console.error('epic fail');
        return;
    }
    var ss__changed = false,
        ss__0 = s[this.ss__dataVarName] || {},
        ss__1, ss__2
    ;
    // Добавление-убирание вкладок
    for (ss__1 = 0 ; ss__1 < this.ss__idSeq.length ; ++ss__1){
        ss__2 = this.ss__idSeq[ss__1];
        console.log('---', ss__2, ':', this.ss__prevVal[ss__2], ss__0[ss__2]);//
        console.log('----', !this.ss__prevVal[ss__2], !ss__0[ss__2]);//
        if (!this.ss__prevVal[ss__2] !== !ss__0[ss__2])
            this.ss___correctTabExisten(ss__2, ss__0[ss__2]);
    }
    if (!this.ss__phone !== !ss__0.ss__phone){
        this.ss___correctTabExisten('ss__phone', ss__0.ss__phone);
        ss__changed = true;
    }
    else if (!this.ss__address !== !ss__0.ss__address){
        this.ss___correctTabExisten('ss__address', ss__0.ss__address);
        ss__changed = true;
    }
    else if (!this.ss__requisites !== !ss__0.ss__requisites){
        this.ss___correctTabExisten('ss__requisites', ss__0.ss__requisites);
        ss__changed = true;
    }
    else if (!this.ss__social !== !ss__0.ss__social){
        this.ss___correctTabExisten('ss__social', ss__0.ss__social);
        ss__changed = true;
    }
    else if (!this.ss__email !== !ss__0.ss__email){
        this.ss___correctTabExisten('ss__email', ss__0.ss__email);
        ss__changed = true;
    }
    // Обновление данных
    if (ss__0.ss__phone){
        if (ss__0.ss__phone !== this.ss__phone){
            ss__1 = '';
            if (ss__0.ss__phone[0] === '+' && ss__0.ss__phone.length === 12)
                ss__1 = '+' + ss__0.ss__phone[1] + ' ' + '(' + ss__0.ss__phone.substr(2,3) + ') ' + ss__0.ss__phone.substr(5,3) + '-' + ss__0.ss__phone.substr(8,2) + '-' + ss__0.ss__phone.substr(10,2);
            else
                ss__1 = ss__0.ss__phone;
            this.ss__eTabPhoneNumber.innerHTML = ss__1;
            if (this.ss__eTabPhoneTelLink)
                this.ss__eTabPhoneTelLink.href = 'tel:' + ss__0.ss__phone;
            this.ss__phone = ss__0.ss__phone;
            ss__changed = true;
        }
    }
    if (ss__0.ss__address){
        if (!this.ss__address)
            this.ss__address = {};
        ss__1 = ss__0.ss__address;
        ss__2 = this.ss__address;
        if (ss__1.ss__address !== ss__2.ss__address){
            this.ss__eTabAddressAddress.innerHTML = ss__1.ss__address;
            ss__2.ss__address = ss__1.ss__address;
            ss__changed = true;
        }
    }
    if (ss__0.ss__email){
        if (ss__0.ss__email !== this.ss__email){
            this.ss__eTabEmailEmail.innerHTML = ss__0.ss__email;
            this.ss__eTabEmailEmail.href = 'mailto:' + ss__0.ss__email;
            this.ss__email - ss__0.ss__email;
            ss__changed = true;
        }
    }
    if (ss__0.ss__requisites){
    }
    if (ss__0.ss__social){
    }
    if (this.ss__target === 'ss__desktop')
        this.ss___updateSizesDesktop();
    ss__0 = s[this.ss__curTabVarName] || '';
    if (ss__0 && !this.ss__prevVal[ss__0]){
        //#USAGE_BEGIN#debug##
        console.log('incorrect current tab identifier');
        //#USAGE_END#debug##
        ss__0 = s[this.ss__curTabVarName] = '';
    }
    if (this.ss__currentTab !== ss__0){
        this.ss__fOnBnClicked()(ss__0);
        this.ss__currentTab = ss__0;
    }
};
//ss__Contacts.ss__widgetsFields = [];
// p_ifExisten - или undefined, или соответвующее значение (новое)
ss__Contacts.prototype.ss___correctTabExisten = function(ss__p_tabId, ss__p_ifExisten){
    console.log('_correctTabExisten:', ss__p_tabId, ss__p_ifExisten);//
    var ss__1 = this.ss__widgets[ss__p_tabId];
    if (ss__p_ifExisten){
        if (!this.ss__prevVal.hasOwnProperty(ss__p_tabId)){
            this.ss__prevVal[ss__p_tabId] = JSON.parse(JSON.stringify(ss__p_ifExisten));
            if (this.ss__target === 'ss__mobile')
                ss__1.ss__bn.style.display = 'inline-block';
            else if (this.ss__target === 'ss__desktop')
                ss__1.ss__tab.style.display = 'inline-block';
            ss__1.ss__isVisible = true;
        }
    }
    else{
        if (this.ss__prevVal.hasOwnProperty(ss__p_tabId)){
            delete this.ss__prevVal[ss__p_tabId];
            if (this.ss__target === 'ss__mobile')
                ss__1.ss__bn.style.display = 'none';
            else if (this.ss__target === 'ss__desktop')
                ss__1.ss__tab.style.display = 'none';
            ss__1.ss__isVisible = false;
        }
    }
};
ss__Contacts.prototype.ss___switchTo = function(ss__p_tab){
};
ss__Contacts.prototype.ss__fOnBnClicked = function(){
    var ss__widgets = this.ss__widgets,
        ss__self = this,
        ss__target = this.ss__target;
    console.log('--------------');//
    return function(ss__p_id){
        console.log('--', ss__p_id);//
        var ss__0, ss__1, ss__2, ss__3,
            ss__4 = typeof ss__p_id === 'string',
            ss__type;
        if (ss__4)
            ss__type = ss__p_id;
        else{
            ss__3 = this.attributes;
            for2: for (ss__2 = 0 ; ss__2 < ss__3.length ; ++ss__2){
                if (ss__3[ss__2].nodeName === 'm_type'){
                    ss__type = ss__3[ss__2].nodeValue;
                    break for2;
                }
            }
        }

        if (ss__target === 'ss__mobile'){
            for (ss__1 in ss__widgets){
                ss__0 = ss__widgets[ss__1];
                if (ss__1 === ss__type){
                    ss__0.ss__bn.style.top = '20px';
                    ss__0.ss__tab.style.display = 'block';
                }
                else{
                    ss__0.ss__bn.style.top = '0';
                    ss__0.ss__tab.style.display = 'none';
                }
            }
        }
        if (!ss__4){
            ss__self.ss___state[ss__self.ss__curTabVarName] = ss__type;
            ss__self.ss___registerStateChanges();
        }
    };
};
ss__p_namespace.ss__Contacts = ss__Contacts


//State JSON: {"ss__data":[{"ss__lat":57.873608,"ss__lon":39.535165}]}
//{"ss__data":[{"ss__lat":57.87855,"ss__lon":39.517897}]} -- corrected

registerHelp('ss__90412MapView', {
    title: 'Виджет карты (yandex maps)',
    //descr: '',
    options:{
        dataVarName: 'имя переменной, в которой хранятся данные по объектам',
        //mapVarName: 'имя переменной, в которой хранятся настройки самой карты'
        center: 'объект со свойствами lon, lat (в градусах) и popupHtml (html-код всплывающей подсказки). По умолчанию, координаты Тульмы в г.Тутаев Ярославской области.',
        zoom: 'масштаб. По умолчанию, 16.'
    },
    stateObj:{
        data: 'список объектов.\n[{\n  pos:{\n    lat: широта в градусах,\n    lon: долгота в градусах\n  },\n  ...\n}]',
        map: 'объект {  \n}'
    }
});


function ss__90412MapView(ss__p_wContainer, ss__p_options, ss__p_widgets){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
    this.ss__dataVarName = ss__p_options.ss__dataVarName || 'ss__data';
    //this.ss__lat;
    //this.ss__lon;
    //ss__popupHtml

    var ss__content, ss__1 = this,
        ss__zoom = ss__p_options.ss__zoom || 8,
        ss__center = ss__p_options.ss__center || {ss__lat:57.87855,ss__lon:39.517897};
    ss__content = ss__Traliva.ss__createElement('<!--<script src="http://api-maps.yandex.ru/2.0/?load=package.full&lang=ru-RU"></script>--><div traliva="ss__eMap" style="width: 100%; height: 100%; background: #888;">', this);

    ss__p_wContainer.ss___onResized = function(ss__w, ss__h){
        ss__1.ss__eMap.style.width = '' + ss__w + 'px';
        ss__1.ss__eMap.style.height = '' + ss__h + 'px';
    };

    ymaps.ready((function(ss__1){return function(){
        //ss__1.ss__myMap = new ymaps.Map(ss__1.ss__eMap, {center: [57.873608,39.535165],zoom: 16, type: "yandex#map", behaviors: ["default", "scrollZoom"]});
        ss__1.ss__myMap = new ymaps.Map(ss__1.ss__eMap, {center: [ss__center.ss__lat,ss__center.ss__lon],zoom: ss__zoom, type: "yandex#map"});
        // Создаем метку и задаем изображение для ее иконки
        /*ss__1.ss__myMap.controls.add("zoomControl").add("mapTools").add(new ymaps.control.TypeSelector(["yandex#map", "yandex#satellite", "yandex#hybrid", "yandex#publicMap"]));*/
    };})(this));
    ss__p_wContainer.ss__setContent(ss__content);
};
ss__90412MapView.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__90412MapView.prototype.constructor = ss__90412MapView;
ss__90412MapView.prototype.ss__processStateChanges = function(s){
    
    if (!s){
        console.error('epic fail');
        return;
    }
    
    var ss__1, ss__2;
    if (s)
        ss__1 = s[this.ss__dataVarName];
    if (ss__1){
        if (ss__1.length === 1){
            ss__1 = ss__1[0];
            if (ss__1.ss__lat !== this.ss__lat || ss__1.ss__lon !== this.ss__lon || ss__1.ss__popupHtml != this.ss__popupHtml){
                console.log('update...');
                // update
                // ...
                this.ss__myMap.geoObjects.removeAll();
                // doc: https://tech.yandex.com/maps/doc/jsapi/2.1/ref/reference/Placemark-docpage/
                ss__2 = new ymaps.Placemark(
                    [ss__1.ss__lat, ss__1.ss__lon],
                    {
                        //hintContent: 'Тульма <img src="http://brezent-tulma.ru/data/template/images/bottomlogo.jpg"/><a href="https://traliva.ru">ss</a>',
                        hintContent: ss__1.ss__popupHtml,
                        //balloonContent: ss__1.ss__popupHtml // Для мобильной версии - это виджет, отображаемый по клику на бабле
                    },
                    {
                        //iconColor: '#afa'
                    }
                );
                //this.ss__eMap.addEventListener(ss__2.click, function(){console.log('bubble clicked');});
                // https://yandex.ru/blog/mapsapi/14283 - обработка события клика по бабблу
                this.ss__myMap.geoObjects.add(ss__2);
                // ...
                this.ss__lat = ss__1.ss__lat;
                this.ss__lon = ss__1.ss__lon;
                this.ss__popupHtml = ss__1.ss__popupHtml;
            }
        }
        else{
            // ... not implemented: this place reserved for multiple bubbles case
        }
    }
    // ...
};
//ss__90412MapView.ss__widgetsFields = [];
ss__p_namespace.ss__90412MapView = ss__90412MapView



registerHelp('ss__90412DialogFrame', {
    title: 'Контейнер для модальных диалоговых окон. На сером фоне с крестиком в правом верхнем углу',
    descr: 'Используйте конструктор как функцию, чтобы сгенерировать в лейауте описание виджета, обёрнутого этим контейнером',
    options:{
        visibleVarName: 'имя свойства в объекте состояния, определяющего видимость диалогового окна. По умолчанию, visible',
        aboutToCloseVarName: 'если указано, то нажатие на крестик не будет закрывать окно, а будет выставляться указанный changeFlag. Не может совпадать с visibleVarName'
    },
    //stateObj:{}
});

function ss__90412DialogFrame(ss__p_wContainer, ss__p_options, ss__p_widgets){
    var ss__children, ss__content,
        ss__1 = {}, ss__2;
    if (this.constructor !== ss__90412DialogFrame){ // это не конструктор, а тупо функция
        // сокращённая семантика для сокращения лейаутов.
        // Должны вернуть фрагмент описателя лейаута.
        // p_wContainer - это не ss__Traliva.ss__Widget, а часть описания лейаута (объект или строка).
        return {
            ss__type: ss__90412DialogFrame,
            ss__content: [{
                ss___widget: ss__p_wContainer
            }]
        };
    }
    ss__p_wContainer.ss__setVisible(false);
    this.ss__wContainer = ss__p_wContainer;
    this.ss__visibleVarName = ss__p_options.ss__visibleVarName || 'ss__visible';
    
    if (ss__p_options.ss__visibleVarName === ss__p_options.ss__aboutToCloseVarName)
        console.log('error: ss__visibleVarName и ss__aboutToCloseVarName не могут совпадать');
    
    if (ss__p_options.ss__aboutToCloseVarName){
        ss__2 = {};
        ss__2[ss__p_options.ss__aboutToCloseVarName] = true;
    }
    ss__children = ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets, ss__2);
    ss__content = ss__children.ss__content;
    if (ss__content)
        ss__content = ss__content[0];
    
    if (!ss__content){
        console.log('epic fail');
        return;
    }
    

    this.ss__e = ss__Traliva.ss__createElement('<div traliva="ss__cross" class="ss__TralivaKit__90412DialogFrame_cross"></div>', ss__1, 'ss__TralivaKit__90412DialogFrame');
    this.ss__e.appendChild(ss__content.ss___widget.ss___div);
    if (ss__p_options.ss__aboutToCloseVarName){
        ss__1.ss__cross.addEventListener('click', (function(ss__1, ss__2){return function(){
            ss__1.ss___state[ss__2] = false;
            ss__1.ss___registerStateChanges();
        };})(this, ss__p_options.ss__aboutToCloseVarName));
    }
    else{
        //ss__1.ss__cross.addEventListener();
        ss__1.ss__cross.addEventListener('click', (function(ss__1){return function(){
            ss__1.ss__wContainer.ss__setVisible(false);
            ss__1.ss___state[ss__1.ss__visibleVarName] = false;
            ss__1.ss___registerStateChanges();
        };})(this));
    }
    ss__content.ss___widget.ss___div.style.position = 'relative';
    ss__p_wContainer.ss___onResized = function(ss__w, ss__h){
        var ss__5 = ss__w > ss__h ? ss__h : ss__w, ss__6 = 0.1;
        if (ss__5 * ss__6 < 32){
            ss__6 = 32./ss__5;
        }
        ss__5 = ss__content.ss___widget.ss__resize(ss__w * (1. - 2.*ss__6), ss__h * (1. - 2.*ss__6));
        ss__content.ss___widget.ss___div.style.left = '' + ss__w * ss__6 + 'px';
        ss__content.ss___widget.ss___div.style.top = '' + ss__h * ss__6 + 'px';
        ss__1.ss__cross.style.left = '' + (ss__w * (1. - ss__6)) + 'px';
        ss__1.ss__cross.style.top = '' + (ss__h * ss__6) + 'px';
    };
    ss__p_wContainer.ss__setContent(this.ss__e);
};
ss__90412DialogFrame.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__90412DialogFrame.prototype.constructor = ss__90412DialogFrame;
ss__90412DialogFrame.prototype.ss__processStateChanges = function(s){
    this.ss__wContainer.ss__setVisible(s && s[this.ss__visibleVarName]);
};
ss__90412DialogFrame.ss__widgetsFields = ['ss__content'];
ss__p_namespace.ss__90412DialogFrame = ss__90412DialogFrame



registerHelp('ss__90420CallbackForm', {
    title: 'Форма обратного звонка',
    //descr: '',
    options:{
        режимРаботы: 'режим работы',
        mediatorUrl: 'url посредника. На этот URL ожидается POST-запрос об оповещении менеджера, в ответ на POST-запрос ожидается объект с полями descr и status.',
        dataVarName: 'имя переменной, в которой будет храниться информация, введённая пользователем'
    },
    stateObj:{
        data: ' { number: \'+71234567890\' }'
    }
});





 // или StaticHTML
function ss__90420CallbackForm(ss__p_wContainer, ss__p_options, ss__p_widgets){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
    var ss__wContent;
    this.ss__widgetsScope = {};
    this.ss__oWidgets = {};
    this.ss__statePublisher = new ss__Traliva.ss__StatePublisher();
    this.ss__prevVal = false;
    // неизвестен defaultBackground
    ss__wContent = ss__Traliva.ss___constructLayout(
        ss__p_wContainer,
        {
            ss__type: ss__TralivaKit.ss__Stack,
            ss__items:[
                {ss___widget:{
                    ss__type: ss__TralivaKit.ss__Strip,
                    ss__orient: 0x2,
                    ss__bg: '#fff',
                    ss__items:[
                        /*{
                            ss___widget:{
                                ss__type: ss__TralivaKit.ss__Strip,
                                ss__orient: #e#ss__TralivaKit__Strip__orient:h##,
                                ss__items:[
                                    //'num_title',
                                    {ss___widget:{
                                        ss__type: ss__TralivaKit.ss__Button,
                                        ss__title: 'asdf'
                                    }},
                                    'num_lineedit'
                                ]
                            }
                        },*/
                        /*{
                            ss___widget:{
                                ss__id: 'ss__wValidTimeNote',
                                ss__type: ss__TralivaKit.ss__StaticHtml,
                                ss__html:`
        <div style="margin:10px" class="validTimeNote">
        <h2>По какому номеру вам позвонить?</h2>
        <p>Наш специалист свяжется с вами в ближайшее время с 8:00 до 20:00</p>
        </div>
                                `
                            },
                            ss__size: '256px'
                        },*/
                        {
                            ss___widget:{
                                ss__id: 'ss__wValidTimeNote',
                                ss__type: ss__TralivaKit.ss__Label,
                                ss__text: 'Наш специалист свяжется с вами в ближайшее время с 8:00 до 20:00.'
                            },
                            ss__size: '80px'
                        },
                        {
                            ss___widget:{
                                ss__type: ss__TralivaKit.ss__LineEdit,
                                ss__placeholder: 'На какой номер перезвонить',
                                ss__textVarName: 'ss__phoneNumber',
                                ss__datatype: 'tel'
                            },
                            ss__size: '64px'
                        },
                        {
                            ss___widget:{
                                ss__id: 'ss__callbackButton',
                                ss__type: ss__TralivaKit.ss__Button,
                                ss__title: 'Заказать звонок',
                                ss__activeVarName: 'ss__clicked'
                            },
                            ss__size: '86px'
                        },
                        {
                            ss___widget:{
                                ss__type: ss__TralivaKit.ss__StaticHtml,
                                ss__htmlVarName: 'ss__error',
                                //ss___visibleSubstate: 'ss__error'
                            },
                            //ss__size: '80px'
                        }
                    ]
                }},
                //{ss___widget:{
                //}}
            ]
        
        },
        ss__p_options.ss__bg,
        this.ss__oWidgets = {},
        this.ss__widgetsScope = {},
        this.ss__context = {
            ss__statePublisher: this.ss__statePublisher,
            ss__visibilityMap: this.visibilityMap = {},
            ss__widgets: this.ss__widgets = {}
        }
    );
    function ss__Logics(){
        ss__Traliva.ss__StateSubscriber.call(this);
    };
    ss__Logics.prototype = Object.create(ss__Traliva.ss__StateSubscriber.prototype);
    ss__Logics.prototype.constructor = ss__Logics;
    ss__Logics.prototype.ss__processStateChanges = function(s){
        if (s && s.ss__clicked){
            (function(ss__1, ss__2){
                var ss__cand = s.ss__phoneNumber, ss__3, ss__4 = '';
                for (ss__3 = 0 ; ss__3 < ss__cand.length ; ++ss__3){
                    if (ss__cand[ss__3] === '+' && ss__cand[ss__3 + 1] === '7'){
                        ss__4 += '8';
                        ++ss__3;
                        continue;
                    }
                    else if (!isNaN(parseInt(ss__cand[ss__3])))
                        ss__4 += ss__cand[ss__3];
                }
                if (ss__4.length !== 11 || ss__4[0] !== '8'){
                    ss__2.ss__error = '<div class="ss__90420CallbackForm_fail">Введён некорректный номер. Примеры корректных номеров: <nobr>+7 123 456 7890,</nobr> <nobr>8(123)456-78-90,</nobr> <nobr>81234567890.</div>';
                    ss__2.ss__clicked = false;
                    ss__1.ss___registerStateChanges();
                }
                else{
                    ss__2.ss__error = '<div class="ss__90420CallbackForm_ok">Подождите. Производится запрос...</div>';
                    ss__1.ss___registerStateChanges();
                    ss__Traliva.ss__ajax({
                        //ss__sourcePath: '/api/order-callback/7/1234567890/',
                        ss__sourcePath: '/api/order-callback/' + ss__4 + '/',
                        ss__readyFunc: function(){
                            ss__2.ss__error = '<div class="ss__90420CallbackForm_ok">Заказ на звонок принят. В ближайшее время наш специалист свяжется с вами.</div>';
                            ss__2.ss__clicked = false;
                            ss__1.ss___registerStateChanges();
                        },
                        ss__errorFunc: function(){
                            ss__2.ss__error = '<div class="ss__90420CallbackForm_fail">Оповестить менеджера не удалось. Повторите попытку заказать звонок позже.</div>';
                            ss__2.ss__clicked = false;
                            ss__1.ss___registerStateChanges();
                        }
                    });
                }
            })(this, s);
        }
    };
    this.ss__statePublisher.ss__registerSubscriber(new ss__Logics());
    /*ss__p_wContainer.ss___onResized = (function(ss__1){return function(ss__w, ss__h){
        ss__1.ss__resize(ss__w, ss__h);
    };})(ss__wContent);*/
    console.log(this.ss__widgetsScope);
    ss__p_wContainer.ss___onResized = (function(ss__1, ss__2){return function(ss__w, ss__h){
        ss__2.ss__wValidTimeNote.ss__setVisible(ss__h > 256);
        //ss__1.ss___content.className = 'TralivaKit__90420CallbackForm';//
        //ss__2.ss___content.className = (ss__w > 512) ? 'ss__TralivaKit__90420CallbackForm_bigTimeValidNote' : 'ss__TralivaKit__90420CallbackForm_smallTimeValidNote';
        ss__1.ss__resize(ss__w, ss__h);
    };})(ss__wContent, this.ss__context.ss__widgets);
    ss__p_wContainer.ss__setContent(ss__wContent);
};
ss__90420CallbackForm.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__90420CallbackForm.prototype.constructor = ss__90420CallbackForm;
ss__90420CallbackForm.prototype.ss__processStateChanges = function(s){
    if (this.ss__prevVal == !s){
        if (!this.ss__prevVal)
            this.ss__statePublisher.ss__setState({
                ss__phoneNumber: '',
                ss__error: ''
            });
        this.ss__prevVal = !this.ss__prevVal;
    }
};
//ss__90420CallbackForm.ss__widgetsFields = [];
ss__p_namespace.ss__90420CallbackForm = ss__90420CallbackForm



registerHelp('ss__ScreenKeyboard', {
    title: 'Экранная клавиатура.',
    descr: 'Тип клавиатуры - classic, name, phone. Раскладки клавиатуры: русская, английская, китайская. Для каждого типа клавиатуры используется свой спрайт... Определите свою экранную клавиатуру, отнаследовавшись от данного класса. Вам поможет генератор спрайтов для экранных клавиатур: https://github.com/1024sparrow/screenKeyboardImageDrawer .',
    options:{
        ss__layouts: 'объект со списками описателей раскладок, сгруппированными по идентификатору типа клавиатуры. Описатель раскладки - объект со следующими свойствами: ss__orient(ss__v,ss__h), список раскладок ss__layouts (ss__ru,ss__en,ss__ch), ss__width, ss__height(размеры в спрайте, используются также при подборе оптимального варианта для того или иного соотношения сторон экрана у пользователя)'
    },
    stateObj:{
        ss__type: 'тип клавиатуры (ss__classic, ss__name, ss__phone)',
        ss__layout: 'раскладув клавиатуры (ss__ru,ss__en,ss__ch)'
    }
});

function ss__ScreenKeyboard(ss__p_wContainer, ss__p_options, ss__p_widgets){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
    // ...
    //var
    //    ss__1 = document.createElement('div')
    //;
    //ss__1.className = 'ss__TralivaKit__ScreenKeyboard';
    //ss__p_wContainer.ss__setContent(ss__1);

    /*
        Спрайт: по вертикали раскладки клавиатуры ru-en-ch
        ┌───────┬─────┬─────┐ * https://en.wikipedia.org/wiki/Box-drawing_character
        │ 1-ru  │     │     │
        ├───────┤ 2-ru│ 2-en│
        │ 1-en  │     │     │
        └───────┴─────┴─────┘
        ┌───────┬─────┬─────┐ * https://en.wikipedia.org/wiki/Box-drawing_character
        │       │     │     │
        ├───────┼─────┼─────┤
        │       │     │     │
        └───────┴─────┴─────┘
        
    */
    var
        ss__state = { // для копирования текста отсюда в окно отладки (состояние). Реально эта переменная здесь не нужна
            ss__layout: 'ru'
        },
        //ss__1 = ss__Traliva.ss__createElement('<div class="ss__TralivaKit__ScreenKeyboard">', undefined, 'ss__TralivaKit__ScreenKeyboard__Container')
        ss__1 = ss__Traliva.ss__createElement('<div traliva="ss___eLayout">', this, 'ss__TralivaKit__ScreenKeyboard__Container'),
        ss__2
    ;
	if ('ontouchstart' in window){
        ss__2 = function(ss__1, ss__p_eventType){
            return function(ss__2){
                var
                    ss__3 = ss__2.changedTouches,
                    ss__4,
                    ss__5 = []
                ;
                for (ss__4 of ss__3){
                    ss__5.push({
                        ss__x: ss__4.pageX,
                        ss__y: ss__4.pageY
                    });
                }
                //ss__1.ss___hitButton(ss__3.pageX, ss__3.pageY);
                ss__1.ss____processEvent(ss__p_eventType, ss__5, true);
                ss__2.preventDefault(); // we block gestures! Ura!
            };
        };
        this.ss___eLayout.addEventListener('touchstart', ss__2(this, 1));
        this.ss___eLayout.addEventListener('touchmove', ss__2(this, 2));
        this.ss___eLayout.addEventListener('touchend', ss__2(this, 3));

        /*this.ss___eLayout.addEventListener('touchstart', (function(ss__1){return function(ss__2){
            var
                ss__3 = ss__2.changedTouches,
                ss__4,
                ss__5 = []
            ;
            for (ss__4 of ss__3){
                ss__5.push({
                    ss__x: ss__4.pageX,
                    ss__y: ss__4.pageY
                });
            }
            //ss__1.ss___hitButton(ss__3.pageX, ss__3.pageY);
            ss__1.ss____processEvent(1, ss__5, true);
            ss__2.preventDefault(); // we block gestures! Ura!
        };})(this));*/
    }
    else {
        ss__2 = function(ss__1, ss__p_eventType){
            return function(ss__2){
                //ss__1.ss___hitButton(ss__2.clientX, ss__2.clientY);
                ss__1.ss____processEvent(
                    ss__p_eventType,
                    [
                        {ss__x:ss__2.clientX, ss__y:ss__2.clientY}
                    ],
                    false
                );
                ss__2.preventDefault();
            };
        };
        this.ss___eLayout.addEventListener('mousedown', ss__2(this, 1));
        this.ss___eLayout.addEventListener('mousemove', ss__2(this, 2));
        this.ss___eLayout.addEventListener('mouseup', ss__2(this, 3));

        /*this.ss___eLayout.addEventListener('mousedown', (function(ss__1){return function(ss__2){
            //ss__1.ss___hitButton(ss__2.clientX, ss__2.clientY);
            ss__1.ss____processEvent(
                1,
                [
                    {ss__x:ss__2.clientX, ss__y:ss__2.clientY}
                ],
                false
            );
            ss__2.preventDefault();
        };})(this));*/
    }
    window.boris = this.ss___eLayout;//
    //this.ss___options = ss__options;//ss__p_options;
    this.ss___eLayout.className = 'ss__TralivaKit__ScreenKeyboard';
    //this.ss___curLayout = undefined; // 'ss__ru';
    //this.ss___curType = undefined; // 'ss__classic';
    //this.ss___schema = undefined; // pointer to current variant of current type

    ss__p_wContainer.ss___onResized = (function(ss__1, ss__2){return function(ss__p_width, ss__p_height){
        ss__1.ss___width = ss__p_width;
        ss__1.ss___height = ss__p_height;
        if (ss__1.ss___curType)
            ss__1.ss___updateType(ss__1.ss___curType);
    };})(this, ss__p_options.ss__layouts);
    ss__p_wContainer.ss__setContent(ss__1);
    this.ss___catchEvents = false;
};
ss__ScreenKeyboard.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__ScreenKeyboard.prototype.constructor = ss__ScreenKeyboard;
ss__ScreenKeyboard.prototype.ss__processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    var ss__needUpdate = false;
    if (this.ss___curType !== s.ss__type || this.ss___curLayout !== s.ss__layout){
        this.ss___curType = s.ss__type;
        this.ss___curLayout = s.ss__layout;
        this.ss___updateType(s.ss__type);
    }
};
ss__ScreenKeyboard.prototype.ss___types = function(){
    console.error('it is virtual method. You have to reimplement this.');
    return {
        ss__classic: [
            // в порядке убывания соотношения сторон width/height
            // при отрисовке прижимаем к нижнему краю, background не выставляем
            {
                ss__orient: 'ss__v',
                ss__layouts: ['ss__en','ss__ru'],
                ss__width: 541,
                ss__height: 143
            },
            {
                ss__orient: 'ss__v',
                ss__layouts: ['ss__en', 'ss__ru'],
                ss__width: 159,
                ss__height: 143
            }
        ],
        ss__phone: [
            {
                ss__orient: 'ss__v',
                ss__layouts: ['ss__ru'],
                ss__width: 331,
                ss__height: 241,
                // а также могут быть переопределения клавиш
                ss__buttons:{
                    ss__width: 3,
                    ss__height: 4,
                    ss__rows: [
                        {
                            ss__height: 1,
                            ss__buttons:[
                                {
                                    ss__id: 'BN-1',
                                    ss__width: 1
                                },
                                {
                                    ss__id: 'BN-2',
                                    ss__width: 1
                                },
                                {
                                    ss__id: 'BN-3',
                                    ss__width: 1
                                }
                            ]
                        },
                        {
                            ss__height: 1,
                            ss__buttons:[
                                {
                                    ss__id: 'BN-4',
                                    ss__width: 1
                                },
                                {
                                    ss__id: 'BN-5',
                                    ss__width: 1
                                },
                                {
                                    ss__id: 'BN-6',
                                    ss__width: 1
                                }
                            ]
                        },
                        {
                            ss__height: 1,
                            ss__buttons:[
                                {
                                    ss__id: 'BN-7',
                                    ss__width: 1
                                },
                                {
                                    ss__id: 'BN-8',
                                    ss__width: 1
                                },
                                {
                                    ss__id: 'BN-9',
                                    ss__width: 1
                                }
                            ]
                        },
                        {
                            ss__height: 1,
                            ss__buttons:[
                                {
                                    ss__id: 'BN-CLEAR',
                                    ss__width: 1
                                },
                                {
                                    ss__id: 'BN-0',
                                    ss__width: 1
                                },
                                {
                                    ss__id: 'BN-ENTER',
                                    ss__width: 1
                                }
                            ]
                        }
                    ]
                }
            }
        ]
}
/* Process:
1.) Description of buttons positioning. Builds (internal intermediate project file) skeleton-sprite (spriteId + '-skeleton'). spriteId in case of above: classic and phone
2.) Copy skeleton sprite without '-skeleton' and draw buttons
*/

/* In state object 
*/;
};
ss__ScreenKeyboard.prototype.ss___updateType = function(ss__p_type){
    console.log('==== ss__ScreenKeyboard.prototype.ss___updateType(', ss__p_type, ') ====');//
    if (!this.ss___width || !this.ss___height)
        return;

    var
        ss__ratio = this.ss___width / this.ss___height,
        ss__0,
        ss__1,
        ss__2,
        ss__3,
        ss__4,
        ss__5,
        ss__6, // current type variant (object)
        ss__7 = 0,
        ss__width,
        ss__height
    ;

    var ss__types = this.ss___types();
    if (!ss__p_type || !ss__types.hasOwnProperty(ss__p_type)){
        console.log('oops...', ss__p_type, JSON.stringify(ss__types, undefined, 4));
        this.ss___eLayout.className = 'ss__TralivaKit__ScreenKeyboard';
        return;
    }

    this.ss___eLayout.className = 'ss__TralivaKit__ScreenKeyboard ' + ss__p_type;
    this.ss___curTypeVariant = 0; // если ни один вариант не подходит, то первый вариант
    ss__3 = 0;
    for (ss__1 of ss__types[ss__p_type]){
        ss__2 = this.ss___width * ss__1.ss__height / ss__1.ss__width;
        if (this.ss___height >= ss__2){
        //if (ss__3 === 1){//boris stub
            ss__height = ss__2;
            this.ss___curTypeVariant = ss__3;
        }
        ss__7 += ss__1.ss__width; // boris e: учитывать ss__orient ещё надо . Boris here: масштабирование и применение полученного ss__7.
        ++ss__3;
    }
    console.log('current type variant: ', this.ss___curTypeVariant);

    if (ss__height < this.ss___height){
        //this.ss___eLayout.style.background = 'green';
        ss__1 = parseInt(this.ss___height - ss__height);
        if (ss__1 = ss__types[this.ss___curType]){
            ss__0 = 0; // type variant index
            ss__2 = 0; // total width
            ss__4 = 0; // total height (already scaled)
            ss__5 = 0; // horizontal shift
            ss__7 = 0; // vertical shift (layout)
            for (ss__1 of ss__1){
                if (ss__1.ss__orient === 'ss__v'){
                    //
                    ss__2 += ss__1.ss__width;
                    ss__3 = 1;//ss__1.ss__layouts.length; // какую часть занимает по высоте одна раскладка
                }
                else if (ss__1.ss__orient === 'ss__h'){
                    ss__2 += ss__1.ss__width * ss__1.layouts.length;
                    ss__3 = 1;
                }
                else{
                    console.log('ScreenKeyboard: unexpected orient value: ', ss__1[ss__0].ss__orient);
                }
                if (ss__3 > ss__4)
                    ss__4 = ss__3;
                if (ss__0 < this.ss___curTypeVariant){
                    ss__5 += ss__2;
                }
                else if (ss__0 === this.ss___curTypeVariant){
                    ss__6 = ss__1;
                    ss__height = ss__1.ss__height;
                    if (ss__1.ss__orient === 'ss__v'){
                        ss__7 = ss__1.ss__layouts.indexOf(this.ss___curLayout) * ss__1.ss__height;
                    }
                    else{
                        console.error('boris not realized!!');
                    }
                }
                ++ss__0;
            }
            ss__6 = ss__4 * this.ss___width / ss__6.ss__width;
            ss__5 = parseInt(ss__5 * ss__6);
            ss__2 = parseInt(ss__2 * ss__6);
            ss__7 = parseInt(ss__7 * ss__6);
            ss__width = this.ss___width;
            ss__height = parseInt(ss__height * ss__6);
            ss__6 = this.ss___eLayout.style;
            ss__6.minHeight=ss__6.maxHeight=ss__6.height = ss__height + 'px';
            ss__6.backgroundSize = ss__2 + 'px';
            ss__6.backgroundPosition = -ss__5 + 'px -' + ss__7 + 'px';
            ss__6.width = '100%';
            ss__6.marginTop = (this.ss___height - ss__height) + 'px';
        }

        // boris notes:
        // прозрачности пока нет, как и поддержки жестов.
        // через объект состояния подмены изображений клавиш тоже нет. Как и переопределения поведения.
        // Пока клавиатура тупая: если может, отображается. Отображается исключительно предзаданные раскладки клавиатуры.
        //
        // Нажатия клавиш пишутся в объект состояния. Флаг в опциях: при каждом нажатии писать в объект состояния, или по нажатии на Enter.
    }
    else{ // real width is too much
        if (ss__1 = ss__types[this.ss___curType]){
            ss__0 = 0; // type variant index
            ss__2 = 0; // total width
            ss__4 = 0; // total height (already scaled)
            ss__5 = 0; // horizontal shift
            for (ss__1 of ss__1){
                if (ss__1.ss__orient === 'ss__v'){
                    //
                    ss__2 += ss__1.ss__width;
                    ss__3 = 1;//ss__1.ss__layouts.length; // какую часть занимает по высоте одна раскладка
                }
                else if (ss__1.ss__orient === 'ss__h'){
                    ss__2 += ss__1.ss__width * ss__1.layouts.length;
                    ss__3 = 1;
                }
                else{
                    console.log('ScreenKeyboard: unexpected orient value: ', ss__1[ss__0].ss__orient);
                }
                if (ss__3 > ss__4)
                    ss__4 = ss__3;
                if (ss__0 < this.ss___curTypeVariant){
                    ss__5 = -ss__2;
                }
                else if (ss__0 === this.ss___curTypeVariant){
                    ss__6 = ss__1;
                    ss__width = ss__1.ss__width;
                }
                ++ss__0;
            }
            ss__6 = ss__4 * this.ss___height / ss__6.ss__height;
            ss__5 = parseInt(ss__5 * ss__6);
            ss__2 = parseInt(ss__2 * ss__6);
            ss__width = parseInt(ss__width * ss__6);
            ss__height = this.ss___height;
            ss__6 = this.ss___eLayout.style;
            ss__6.minHeight=ss__6.maxHeight=ss__6.height = this.ss___height + 'px';
            ss__6.backgroundSize = ss__2 + 'px';
            ss__6.backgroundPositionX = ss__5 + 'px';
            ss__6.width = ss__width + 'px';
        }
    }
    this.ss___schema = ss__1 = ss__types[this.ss___curType][this.ss___curTypeVariant];
    ss__1.ss__realWidth = ss__width;
    ss__1.ss__realHeight = ss__height;
    ss__1 = ss__1.ss__buttons;
    ss__4 = 0;
    for (ss__2 of ss__1.ss__rows){
        ss__4 += (ss__2.ss__height * ss__height / ss__1.ss__height);
        ss__2.ss__realY = parseInt(ss__4);
        ss__5 = 0;
        for (ss__3 of ss__2.ss__buttons){
            ss__5 += (ss__3.ss__width * ss__width / ss__1.ss__width);
            ss__3.ss__realX = parseInt(ss__5);
        }
    }
};
ss__ScreenKeyboard.prototype.ss___hitButton = function(ss__p_x, ss__p_y){
    var
        ss__1,
        ss__2 = '',
        ss__rcViewport = this.ss___eLayout.getBoundingClientRect()
    ;
    for (ss__1 of this.ss___schema.ss__buttons.ss__rows){
        if (ss__p_y < (ss__1.ss__realY + ss__rcViewport.top)){
            for (ss__1 of ss__1.ss__buttons){
                if (ss__p_x < (ss__1.ss__realX + ss__rcViewport.left)){
                    ss__2 = ss__1.ss__id;
                    break;
                }
            }
            break;
        }
    }
    return ss__2;
};
ss__ScreenKeyboard.prototype.ss____processEvent = function(ss__p_eventType, ss__p, ss__p_takenFromSensorScreen){
    // eventType: 1 - down, 2 - move, 3 - up
    // p: list of {x:3, y:4}
    // takenFromSensorScreen - boolean

    var ss__1;
    for (ss__1 of ss__p){
        ss__1.ss__buttonId = this.ss___hitButton(ss__1.ss__x, ss__1.ss__y);
    }
    this.ss___processEvent(ss__p_eventType, ss__p, ss__p_takenFromSensorScreen);
};
ss__ScreenKeyboard.prototype.ss___processEvent = function(ss__p_eventType, ss__p, ss__p_takenFromSensorScreen){
    if (ss__p_eventType !== 2)
        console.error('it is virtual method. You have to reimplement this.'); // boris stub commented

    // boris here
    if (ss__p_eventType === 2){
    }
    else{
        console.log('debug b11014.1: ', ss__p_eventType, JSON.stringify(ss__p, undefined, 4), ss__p_takenFromSensorScreen);
    }
};
//ss__ScreenKeyboard.ss__widgetsFields = [];
ss__p_namespace.ss__ScreenKeyboard = ss__ScreenKeyboard



registerHelp('ss__230517List', {
	title: 'Виджет списка элементов с возможностью выбора. Элмент - строка теста.',
	descr: '',
	options:{
	},
	stateObj:{
		//selectionMode: '0 - без выбора, 1 - одиночный выбор, 2 - множественный выбор; побитовое или с 4 - только чтение (выбрано, но поменять нельзя)',
		selectionMultiple: '(bool) - возможно ли выбрать несколько. По умолчанию true - можно выбрать несколько',
		selected: 'список индексов выбранных элементов',
		list: 'список строк с текстами'
	}
});

function ss__230517List(ss__p_wContainer, ss__p_options, ss__p_widgets){
	ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
	// ...
	var
		ss__itemHeight = 24,
		ss__1, ss__2
	;
	this.ss__constItemHeight = 24;
	this.ss___tt = document.createElement('div');
	//this.boris = ss__2;
	this.ss__containers = [];
	this.ss__w = 0;
	this.ss__h = 0;
	this.ss__scrollPos = 0;
	this.ss__options = ss__p_options;

	ss__p_wContainer.ss___onResized = (function(ss__self){
		return function(ss__w, ss__h){
			ss__self.ss__w = ss__w;
			ss__self.ss__h = ss__h;
			ss__self.ss___update();
		}
	})(this);
	this.ss___tt.addEventListener(
		'wheel',
		(function(ss__self){
			return function(ss__event) {
				var
					ss__1 = ss__self.ss__scrollPos + ss__event.deltaY/5,
					ss__2 = ss__self.ss___state.ss__list.length * ss__self.ss__constItemHeight,
					ss__3 = ss__2 - ss__self.ss__h
				;
				if (ss__1 < ss__2){
					ss__self.ss__scrollPos = (ss__1 < ss__3) ? ss__1 : ss__3;
				}
				ss__self.ss___update();
			}
		})(this)
	);
	this.ss___tt.className = 'ss__traliva_kit__230517List';
	ss__p_wContainer.ss__setContent(this.ss___tt);
};
ss__230517List.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__230517List.prototype.constructor = ss__230517List;
ss__230517List.prototype.ss__processStateChanges = function(s){
	if (!s){
		console.error('epic fail');
		return;
	}
	this.ss___update();
};
ss__230517List.prototype.ss___update = function(){
	var ss__1, ss__2, ss__3, ss__4, ss__5;

	if (this.ss__scrollPos > this.ss___state.ss__list.length * this.ss__constItemHeight){
		this.ss__scrollPos = this.ss___state.ss__list.length * this.ss__constItemHeight - this.ss__h;
	}
	if (this.ss__scrollPos < 0){
		this.ss__scrollPos = 0;
	}

	ss__1 = this.ss__h / this.ss__constItemHeight + 1;
	for (ss__2 = this.ss__containers.length ; ss__2 < ss__1 ; ++ss__2){
		ss__3 = {};
		ss__3.ss__root = ss__Traliva.ss__createElement('<table cellspacing="0"><tr><td traliva="ss__1" class="ss__1 ss__off"></td><td traliva="ss__2" class="ss__2"></td></tr></table>', ss__3, 'ss__item');
		ss__3.ss__1.descr = ss__3;
		ss__3.ss__root.addEventListener(
			'click',
			(function(ss__1, ss__p_self){
				return function(ss__event){
					var ss__2;
					if (ss__1.index < ss__p_self.ss___state.ss__list.length){
						if (ss__1.hasOwnProperty('index')){
							ss__2 = ss__p_self.ss___state.ss__selected.lastIndexOf(ss__1.index);
							if (ss__2 < 0){
								ss__1.ss__1.className = 'ss__1 ss__on';
								ss__p_self.ss___state.ss__selected.push(ss__1.index);
							}
							else {
								ss__1.ss__1.className = 'ss__1 ss__off';
								ss__p_self.ss___state.ss__selected.splice(ss__2, 1);
							}
							ss__p_self.ss___registerStateChanges();
						}
					}
				}
			})(ss__3, this)
		);
		this.ss__containers.push(ss__3);
		this.ss___tt.appendChild(ss__3.ss__root);
	}
	for (ss__2 = 0 ; ss__2 < this.ss__containers.length ; ++ss__2){
		this.ss__containers[ss__2].ss__root.style.width = '' + this.ss__w + 'px';
	}

	for (
		ss__1 = 0, ss__2 = parseInt(this.ss__scrollPos / this.ss__constItemHeight);
		ss__1 < this.ss__containers.length;
		++ss__1, ++ss__2
	){
		this.ss__containers[ss__1].index = ss__2;
		this.ss__containers[ss__1].ss__1.className =
			this.ss___state.ss__selected.lastIndexOf(ss__2) >= 0 ?
				(ss__2 < this.ss___state.ss__list.length ? 'ss__1 ss__on' : 'ss__1') :
				(ss__2 < this.ss___state.ss__list.length ? 'ss__1 ss__off' : 'ss__1')
		;
		this.ss__containers[ss__1].ss__root.className = (ss__2 < this.ss___state.ss__list.length ? 'ss__item ss__used' : 'ss__item');
		this.ss__containers[ss__1].ss__2.innerHTML =
			ss__2 < this.ss___state.ss__list.length ?
				this.ss___state.ss__list[ss__2] :
				''
		;
	}
	this.ss___tt.style.marginTop = '-' + this.ss__scrollPos%24 + 'px';
};
//ss__230517List.ss__widgetsFields = [];
ss__p_namespace.ss__230517List = ss__230517List



registerHelp('ss__230522Group', {
	title: 'Рамочка с названием секции (аналог QFrame)',
	//descr: '',
	options:{
		title: 'строка с названием секции'
	},
	//stateObj:{}
});

function ss__230522Group(ss__p_wContainer, ss__p_options, ss__p_widgets){
	if (this.constructor !== ss__230522Group){ // это не конструктор, а тупо функция
		// сокращённая семантика для сокращения лейаутов.
		// Должны вернуть фрагмент описателя лейаута.
		// p_wContainer - это не ss__Traliva.ss__Widget, а часть описания лейаута (объект или строка).
		return {
			ss__type: ss__230522Group,
			ss__content: [{
				ss___widget: ss__p_wContainer
			}]
		};
	}
	var
		ss__children,
		ss__1
	;
	ss__children = ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
	this.ss__e = ss__Traliva.ss__createElement('<div traliva="ss__content" class="ss__TralivaKit__230522Group__content">'+ss__p_options.ss__title+'</div>', this, 'ss__TralivaKit__230522Group');
	ss__1 = ss__children.ss__content[0].ss___widget.ss___div.style;
	ss__1.position = 'relative';
	this.ss__e.appendChild(ss__children.ss__content[0].ss___widget.ss___div);
	ss__children.ss__content[0].ss___widget.ss___div.style.top = '4px';
	ss__p_wContainer.ss___onResized = (function(ss__1, ss__2, ss__3){ return function(ss__w,ss__h){
		ss__1.left = '20px';
		ss__3.style.minHeight = ss__3.style.maxHeight = ss__3.style.height = '' + (ss__h - 2) + 'px';
		ss__2.ss__resize(ss__w - 40, ss__h - 35);
	};})(ss__1, ss__children.ss__content[0].ss___widget, this.ss__e);
	ss__p_wContainer.ss__setContent(this.ss__e);
};
ss__230522Group.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__230522Group.prototype.constructor = ss__230522Group;
ss__230522Group.prototype.ss__processStateChanges = function(s){
	if (!s){
		console.error('epic fail');
		return;
	}
	// ...
};
ss__230522Group.ss__widgetsFields = ['ss__content'];
ss__p_namespace.ss__230522Group = ss__230522Group



registerHelp('ss__230525Chart', {
	title: 'График',
	descr: 'https://www.chartjs.org/',
	options:{
		type: '(строка) bar | line',
		options: 'см. документацию chartjs (объект)'
	},
	stateObj:{
		needUpdate: 'требуется ли обновлять. Во избежание слишком частых проверок предусмотрен флаг, при активности которого только обновление производится. Предагается в разработке всегда держать true, а подыгрывать уже, когда будут проблемы с производительностью',
		data: 'см. документацию chartjs (объект)'
	}
});


(function(){
	if (typeof window !== 'undefined'){ // Проверка на NodeJS
		var ss__1 = document.createElement('script');
		ss__1.src = 'https://cdn.jsdelivr.net/npm/chart.js';
		document.head.appendChild(ss__1);
	}
	else{
		//
	}
})();

function ss__230525Chart(ss__p_wContainer, ss__p_options, ss__p_widgets){
	ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
	this.ss__options = ss__p_options;
	this.ss__wConpainer = ss__p_wContainer;
	
	ss__p_wContainer.ss__setContent(this.ss__e = document.createElement('canvas'));

	this.ss__chart = new Chart(this.ss__e, {
		type: ss__p_options.ss__type,
		options: ss__p_options.ss__options,
		plugins: ss__p_options.ss__plugins
	});
};
ss__230525Chart.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__230525Chart.prototype.constructor = ss__230525Chart;
ss__230525Chart.prototype.ss__processStateChanges = function(s){
	var ss__1;
	if (!s){
		console.error('epic fail');
		return;
	}
	console.log('230525 1: ', s);
	if (s.ss__needUpdate){
		this.ss__chart.data = s.ss__data;
		ss__1 = false; // признак того, что данные хоть какие-то есть
		for (const o of s.ss__data.datasets){
			if (o.data.length){
				ss__1 = true;
				break;
			}
		}
		this.ss__wConpainer.ss__setVisible(ss__1);
		this.ss__chart.update();
	}
};
//ss__230525Chart.ss__widgetsFields = [];
ss__p_namespace.ss__230525Chart = ss__230525Chart



registerHelp('ss__230530SelectMonthInterval', {
	title: 'Элемент выбора диапазона месяцев',
	//descr: '',
	//options:{},
	stateObj:{
		dateStart: '',
		dateEnd: ''
	}
});

function ss__230530SelectMonthInterval(ss__p_wContainer, ss__p_options, ss__p_widgets){
	ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
	ss__p_wContainer.ss__setContent(
		ss__Traliva.ss__createElement('<table><tr><td>c</td><td><input lang="ru-RU" type="month" traliva="ss__1"></input></td></tr><tr><td>по</td><td><input lang="ru-RU" type="month" traliva="ss__2"></input></td></tr></table>', this)
	);

	this.ss__1.addEventListener('input', (function(ss__self){return function(){
		ss__self.ss___state.ss__dateStart = this.value;
		ss__self.ss___registerStateChanges();
	}})(this));
	this.ss__2.addEventListener('input', (function(ss__self){return function(){
		ss__self.ss___state.ss__dateEnd = this.value;
		ss__self.ss___registerStateChanges();
	}})(this));

};
ss__230530SelectMonthInterval.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__230530SelectMonthInterval.prototype.constructor = ss__230530SelectMonthInterval;
ss__230530SelectMonthInterval.prototype.ss__processStateChanges = function(s){
	if (!s){
		console.error('epic fail');
		return;
	}
	// ...
};
//ss__230530SelectMonthInterval.ss__widgetsFields = [];
ss__p_namespace.ss__230530SelectMonthInterval = ss__230530SelectMonthInterval



registerHelp('ss__230531Waiting', {
	title: 'краткого описания нет',
	//descr: '',
	//options:{},
	//stateObj:{}
});

function ss__230531Waiting(ss__p_wContainer, ss__p_options, ss__p_widgets){
	ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
	ss__p_wContainer.ss__setContent(ss__Traliva.ss__createElement('', this, 'ss__230531WaitingContent'));
	ss__p_wContainer.ss___div.className = 'ss__230531Waiting';
};
ss__230531Waiting.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__230531Waiting.prototype.constructor = ss__230531Waiting;
ss__230531Waiting.prototype.ss__processStateChanges = function(s){
	if (!s){
		console.error('epic fail');
		return;
	}
	// ...
};
//ss__230531Waiting.ss__widgetsFields = [];
ss__p_namespace.ss__230531Waiting = ss__230531Waiting



registerHelp('ss__230606Table', {
	title: 'Таблица (с шапками)',
	//descr: '',
	//options:{},
	stateObj:{
		table_changes: 'объект, описывающий изменения в таблице (полная сверка данных таблицы каждый раз не производится - тот, кто вносил изменения, должен отписаться также и о том, какие изменения были произведены). Возможные свойства: reset (полное обновление), reset_body (обновляем всё, кроме горизонтальной шапки), cols, rows, cells',
		table_data: 'содержимое таблицы. Свойства: h - список полей в горизонтальной шапке (поле описывается объектом с полем t, где указывается текст, возможно с "|", если нужна иерархическая шапка);\nrows - список строк. Данные ячеек задаются в свойстве d объекта, описывающего строку (в d список объектов, описывающих ячейки, с текстом ячейки в свойстве t)'
	}
});


/*
Сокращения:
HH - horizontal header
VH - vertical header
*/

//-----------------------------------------------

var ss__230606Table_TableViewWidget__maxColumnWidth = 60;//pixels
function ss__230606Table_TableViewWidget(p_parentWidget){
	this.__w;
	this.__h;
	this._hhElements = [];
	this._eHHTable;
	this._eBodyTable
	ss__Traliva.ss___WidgetBase.call(this, p_parentWidget, true);
};
ss__230606Table_TableViewWidget.prototype = Object.create(ss__Traliva.ss___WidgetBase.prototype);
ss__230606Table_TableViewWidget.prototype.constructor = ss__230606Table_TableViewWidget;
ss__230606Table_TableViewWidget.prototype.ss___createContentElem = function(){
	this._eTable = document.createElement('table');
	this._eTable.style.borderCollapse = 'collapse';
	this._tableData;
	
	this._eTopHalf = this._eTable.insertRow();
	
	this._eCorner = this._eTopHalf.insertCell();
	this._eCorner.style.margin = '0';
	
	var eHHCell = this._eTopHalf.insertCell();
	eHHCell.style.margin = '0';
	eHHCell.style.padding = '0';
	this._eHH = document.createElement('div');
	this._eHH.style.overflow = 'hidden';
	eHHCell.appendChild(this._eHH);
	
	this._eBottomHalf = this._eTable.insertRow();
	
	this._eVH = this._eBottomHalf.insertCell();
	this._eVH.style.margin = '0';
	this._eVH.style.padding = '0';
	
	var eBodyCell = this._eBottomHalf.insertCell();
	eBodyCell.style.margin = '0';
	eBodyCell.style.padding = '0';
	this._eBody = document.createElement('div');
	this._eBody.id="_eBody";
	this._eBody.style.overflow = 'auto';
	eBodyCell.appendChild(this._eBody);
	
	var  eDiv = document.createElement('div');
	eDiv.appendChild(this._eTable);

	return eDiv;
};
ss__230606Table_TableViewWidget.prototype.ss___onResized = function(w,h){
	this.__w = w;
	this.__h = h;
	
	if (true){
		var tmpH = (h - this._eHH.offsetHeight) + 'px';
		var tmpW = w + 'px';
		
		this._eBody.style.height = tmpH;
		this._eBody.style.minHeight = tmpH;
		this._eBody.style.maxHeight = tmpH;
		this._eBody.style.width = tmpW;
		this._eBody.style.minWidth = tmpW;
		this._eBody.style.maxWidth = tmpW;
		
		//this._eHH.style.height = h;
		//this._eHH.style.minHeight = h;
		//this._eHH.style.maxHeight = h;
		this._eHH.style.width = tmpW;
		this._eHH.style.minWidth = tmpW;
		this._eHH.style.maxWidth = tmpW;
	}
};
function removeColItemsFromTable(eTable){
	var itemsToRemove = [];
	var list = eTable.childNodes;
	for (var i = 0 ; i < list.length ; i++){
		var e = list[i];
		if (e.tagName == 'TBODY'){
			var list1 = e.childNodes;
			var itemsToRemove1 = [];
			for (var i1 = 0 ; i1 < list1.length ; i1++){
				var e1 = list1[i1];
				if (e1.tagName == 'COL'){
					itemsToRemove1.push(e1);
				}
			}
			for (var i1 = 0 ; i1 < itemsToRemove1.length ; i1++){
				var e1 = itemsToRemove1[i1];
				console.log(1);//
				e.removeChild(e1);
			}
		}
		else if (e.tagName == 'COL'){
			itemsToRemove.push(e);
		}
	}
	for (var i = 0 ; i < itemsToRemove.length ; i++){
		var e = itemsToRemove[i];
		eTable.removeChild(e);
		console.log(1);//
	}
};
ss__230606Table_TableViewWidget.prototype.ss___updateSizes = function(){
	//synchronize headers and body (header and body cell sizes)
	//здесь должны убрать предыдущие элементы "col" из "table"-ов
	removeColItemsFromTable(this._eHHTable);
	removeColItemsFromTable(this._eBodyTable);
	
	if (this.hasOwnProperty('_eBodyTable') && this.hasOwnProperty('_eHHTable')
		&& this._tableData && this._tableData.hasOwnProperty('h')){
		for (var i = 0 ; i < this._tableData.h.length ; i++){
			var maxWidth = 0;
			if (this._eBodyTable.rows.length){
				var row = this._eBodyTable.rows[0];
				if (row && row.cells.length > i)
					maxWidth = row.cells[i].offsetWidth;
			}
			if (this._hhElements[i]){
				var tmp = this._hhElements[i].offsetWidth;
				if (tmp > maxWidth)
				maxWidth = tmp;
			}
			var eHHCol = document.createElement('col');
			var eBodyCol = document.createElement('col');
			eHHCol.style.width = maxWidth + 'px';
			eBodyCol.style.width = maxWidth + 'px';
			this._eHHTable.appendChild(eHHCol);
			this._eBodyTable.appendChild(eBodyCol);
		}
	}
	else
		console.log(1);
	
	var totalWidth = 0;
	var totalHeight = 0;
	var h = this._eBodyTable.offsetHeight;
	//var w = this._eBodyTable.offsetWidth - this._eBody.offsetWidth;
	var w = this._eHHTable.offsetWidth;
	totalWidth += w;
	totalHeight += h;
	h = h + 'px';
	w = w + 'px';
	this._eBody.style.height = h;
	this._eBody.style.minHeight = h;
	this._eBody.style.maxHeight = h;
	this._eBody.style.width = w;
	this._eBody.style.minWidth = w;
	this._eBody.style.maxWidth = w;
	
	this._eBodyTable.style.height = h;
	this._eBodyTable.style.minHeight = h;
	this._eBodyTable.style.maxHeight = h;
	this._eBodyTable.style.width = w;
	this._eBodyTable.style.minWidth = w;
	this._eBodyTable.style.maxWidth = w;
	
	h = this._eHHTable.offsetHeight;
	w = this._eHHTable.offsetWidth;
	totalWidth += w;
	totalHeight += h;
	h = '' + h + 'px';
	w = '' + w + 'px';
	this._eHH.style.height = h;
	this._eHH.style.minHeight = h;
	this._eHH.style.maxHeight = h;
	this._eHH.style.width = w;
	this._eHH.style.minWidth = w;
	this._eHH.style.maxWidth = w;
	
	this._eHHTable.style.height = h;
	this._eHHTable.style.minHeight = h;
	this._eHHTable.style.maxHeight = h;
	this._eHHTable.style.width = w;
	this._eHHTable.style.minWidth = w;
	this._eHHTable.style.maxWidth = w;
};
ss__230606Table_TableViewWidget.prototype.ss___reset = function(table_data){
	this._tableData = table_data;
	this._hhElements = [];
	if (table_data.hasOwnProperty('h')){ // build horizontal header
	
		if (this._eHHTable)
			this._eHH.removeChild(this._eHHTable);
		var tableWidthMaxLimit = table_data.h.length * ss__230606Table_TableViewWidget__maxColumnWidth;
		this._eBody.style.width = tableWidthMaxLimit + 'px';
		
		this._eHHTable = document.createElement('table');
		this._eHHTable.style.borderCollapse = 'collapse';	
		this._eHHTable.style.background = '#ccc';
		this._eHHTable.style.color = '#1d2435';
		this._eHH.style.width = tableWidthMaxLimit + 'px';
		this._eHH.style.minWidth = tableWidthMaxLimit + 'px';
		this._eHH.style.maxWidth = tableWidthMaxLimit + 'px';
		var srcMatrix = new Array(table_data.h.length);
		var maxDepth = 0;
		for(var columnCounter = 0; columnCounter < table_data.h.length; ++columnCounter) {
			var column = [];
			srcMatrix[columnCounter] = column;
			var text = '  ';
			if (table_data.h[columnCounter].t === null)
				;
			else
				text = table_data.h[columnCounter].t;
		
			var rows = text.split('|');
			srcMatrix[columnCounter] = rows;
			if (rows.length > maxDepth){
				maxDepth = rows.length;
			}
			for (var rowCounter = 0 ; rowCounter < rows.length ; ++rowCounter) {
				srcMatrix[columnCounter][rowCounter] = rows[rowCounter];
			}
		}
		var horSpanCounter = 0;
		for (var rowCounter = 0 ; rowCounter < maxDepth ; ++rowCounter) {
			var row = this._eHHTable.insertRow();
			var prevText = 'no-text';
			var cell;
			for (var columnCounter = 0 ; columnCounter < srcMatrix.length ; ++columnCounter) {
				var rowCount = srcMatrix[columnCounter].length;
				if (rowCounter < rowCount) {
					//здесь идёт вставка ячейки. Возможно со спаном.
					//Возможно, мы должны пропустить вставку ячейки,
					//если она попадает в область горизонтального спана.
					var currentText = srcMatrix[columnCounter][rowCounter];
					//в последней строке шапки никогда не бывает спанов
					if ((rowCounter == (rowCount - 1)) || (currentText != prevText)) {
						if (columnCounter > 0) {
							if (horSpanCounter > 1){
								cell.setAttribute('colspan', horSpanCounter);
							}
						}
						horSpanCounter = 1;
						cell = row.insertCell();
						if (rowCounter == (rowCount - 1)){
							cell.setAttribute('rowspan', maxDepth - rowCount + 1);
						}
						this._hhElements[columnCounter] = cell;
						
						cell.style.margin = '0';
						cell.style.border = '1px solid #313438';
						var contentDiv = document.createElement('div');
						contentDiv.setAttribute('style', 'font-weight:bold; text-align:center;');
						contentDiv.innerHTML = currentText;
						cell.appendChild(contentDiv);
					}
					else {
						++horSpanCounter;
					}
					prevText = currentText;
				}
				else {
					prevText = 'no-text';
				}
			}
		}
		this._eHH.appendChild(this._eHHTable);
	}
	this.ss___resetBody(table_data);
};
ss__230606Table_TableViewWidget.prototype.ss___resetBody = function(table_data){
	if (this._eBodyTable)
		this._eBody.removeChild(this._eBodyTable);

	this._tableData = table_data;
	if (!table_data.hasOwnProperty('rows')) // build table body
		return;
	this._eBodyTable = document.createElement('table');
	this._eBodyTable.id = "_eBodyTable";
	this._eBodyTable.style.background = '#fff';
	this._eBodyTable.style.borderCollapse = 'collapse';

	var tableWidthMaxLimit = table_data.h.length * ss__230606Table_TableViewWidget__maxColumnWidth;
	this._eBody.style.width = tableWidthMaxLimit + 'px';
	this._eBody.style.minWidth = tableWidthMaxLimit + 'px';
	this._eBody.style.maxWidth = tableWidthMaxLimit + 'px';
	
	for (var rowCounter = 0 ; rowCounter < table_data.rows.length ; rowCounter++){
		var eRow = this._eBodyTable.insertRow();
		var rowData = table_data.rows[rowCounter];
		if (rowData.hasOwnProperty('h')){
			// вставляем ячейки, соответствующие вертикальному хидеру
			console.log('vertical header: not implemented');
		}
		if (rowData.hasOwnProperty('d')){
			for (var colCounter = 0 ; colCounter < rowData.d.length ; colCounter++){
				var eCell = eRow.insertCell();
				eCell.style.margin = '0';
				eCell.style.border = '1px solid #313438';
				var cellData = rowData.d[colCounter];
				if (cellData.hasOwnProperty('t')){
					eCell.innerHTML = cellData.t;
				}
			}
		}
	}
	this._eBody.appendChild(this._eBodyTable);
	(function(self){
		self._eBody.addEventListener('scroll', function(){
			self._eHH.scrollLeft = self._eBody.scrollLeft;
		});
	})(this);
};
ss__230606Table_TableViewWidget.prototype.ss___updateCols = function(table_data, changes){
	this._tableData = table_data;
	console.log('not implemented');
};
ss__230606Table_TableViewWidget.prototype.ss___updateRows = function(table_data, changes){
	this._tableData = table_data;
	console.log('not implemented');
};
ss__230606Table_TableViewWidget.prototype.ss___updateCells = function(table_data, changes){
	this._tableData = table_data;
	console.log('not implemented');
};

function ss__230606Table(ss__p_wContainer, ss__p_options, ss__p_widgets){
	ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
	this.ss___view = new ss__230606Table_TableViewWidget(ss__p_wContainer);
	ss__p_wContainer.ss__setContent(this.ss___view);
};
ss__230606Table.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__230606Table.prototype.constructor = ss__230606Table;
ss__230606Table.prototype.ss__processStateChanges = function(s){
	if (!s){
		console.error('epic fail');
		return;
	}
	if (!s.hasOwnProperty('table_changes'))
		return;
	if (!s.hasOwnProperty('table_data')){
		console.log("critical error: state property 'table_data' must be presented.");
		return;
	}

	var ss__hasChanges = false;
	if (s.table_changes.hasOwnProperty('reset')&& s.table_changes.reset){
		this.ss___view.ss___reset(s.table_data);
		ss__hasChanges = true;
	}
	else if (s.table_changes.hasOwnProperty('reset_body') && s.table_changes.reset_body){
		this.ss___view.ss___resetBody(s.table_data);
		ss__hasChanges = true;
	}
	else{
		if (s.table_changes.hasOwnProperty('cols')){
			this.ss___view.ss___updateCols(s.table_data, s.table_changes.cols);
			ss__hasChanges = true;
		}
		if (s.table_changes.hasOwnProperty('rows')){
			this.ss___view.ss___updateRows(s.table_data, s.table_changes.rows);
			ss__hasChanges = true;
		}
		if (s.table_changes.hasOwnProperty('cells')){
			this.ss___view.ss___updateCells(s.table_data, s.table_changes.cells);
			ss__hasChanges = true;
		}
	}
	if (ss__hasChanges){
		this.ss___view.ss___updateSizes();
		this.ss___view.ss___onResized(this.ss___view.__w,this.ss___view.__h);//самому непонятно, зачем это вызывать. Но без этого пропадают скролл-бары после обновления(т.е. повторной установки) содержимого.
		
		//delete s.table_changes;
		//this.ss___registerStateChanges();
	}
};
//ss__230606Table.ss__widgetsFields = [];
ss__p_namespace.ss__230606Table = ss__230606Table



registerHelp('ss__Stub', {
    title: 'краткого описания нет',
    //descr: '',
    //options:{},
    //stateObj:{}
});

function ss__Stub(ss__p_wContainer, ss__p_options, ss__p_widgets){
    ss__Traliva.ss__WidgetStateSubscriber.call(this, ss__p_wContainer, ss__p_options, ss__p_widgets);
    // ...
};
ss__Stub.prototype = Object.create(ss__Traliva.ss__WidgetStateSubscriber.prototype);
ss__Stub.prototype.constructor = ss__Stub;
ss__Stub.prototype.ss__processStateChanges = function(s){
    if (!s){
        console.error('epic fail');
        return;
    }
    // ...
};
//ss__Stub.ss__widgetsFields = [];
ss__p_namespace.ss__Stub = ss__Stub



function checkForInheritance(p_validating, p_validatingFor){
    //return (new p_validating()) instanceof p_validatingFor;

    var i;
    var counter = 0;
    for (i = p_validating.prototype ; i ; i = i.constructor.prototype.__proto__){
        if (i.constructor === p_validatingFor)
            return true;
    }
    return false;
};

ss__p_namespace.list = function(){
    var retVal = [];
    var i, cand;
    for (i in ss__p_namespace){
        cand = ss__p_namespace[i];
        if (checkForInheritance(cand, ss__Traliva.ss__WidgetStateSubscriber))
            retVal.push(cand.name);
    }
    return retVal;
};


})(ss__TralivaKit);
}
//hello from gp.js

ss__Traliva.ss__debug = {
    ss__state: true,
    //ss__url: 'qwe.rty'
};
var ss__o = {
    ss__target: 'web',
    ss__get_layout:function(ss__w, ss__h, ss__target){
        return 'ss__lay_1';
    },
    ss__layouts:{
        ss__lay_1:{
            ss__type: ss__TralivaKit.ss__Strip,
            //ss__orient: #e#ss__TralivaKit__Strip__orient:h##,
            ss__orient: 0x2,
            ss__items:[
                'ss__dd',
                'ss__aa',
                {
                    ss___widget: 'ss__qwe',
                    ss__size: '32px'
                }
            ]
        }
    },
    ss__widgets:{
        /*ss__aa:{
            ss__constructor: ss__TralivaKit.ss__Button,
            ss__options:{
                ss__title: 'Моя красивая кнопка'
            }
        }*/
        ss__aa:{
            ss__constructor: ss__TralivaKit.ss__Strip,
            ss__options:{
                ss__orient: 0x2
            },
            ss__children:{
                ss__items: {
                    //'ss__1', 'ss__2'
                    ss__constructor: ss__TralivaKit.ss__Button,
                    ss__options:{
                        ss__size: '64px'
                    },
                    ss__itemOptions:{
                        ss__title: 'tyu'
                        //ss__titleVarName: 't'
                    },
                    ss__substate: 'ss__books/ss__list'
                }
            }
        }
    },
    ss__states:{
        ss__initState:{
            ss__hello: '123e',
            ss__s1: 'ss__booke',
            //ss__s2: '12',
            //ss__s3: '34',
            ss__p: '84',
            ss__books:{
                ss__list:[
                    {
                        //t: 'кнопка 1'
                    },
                    {
                        t: 'кнопка 2'
                    }
                ]
            }
        },
        ss__tree:[
            {
                book: {
                    ss__d: [
                        {
                            page: {
                                ss__substate: 'ss__s3',
                                ss__name: 'ss__page',
                                ss__params: ['ss__p']
                            }
                        },
                        {
                            contents: {
                                ss__substate: 'ss__s3',
                                ss__name: 'ss__contents'
                            }
                        }
                    ],
                    ss__substate: 'ss__s1',
                    ss__name: 'ss__book',
                    //ss__params: ['ss__p']
                },
                books: {
                    ss__substate: 'ss__s1',
                    ss__name: 'ss__books'
                },
                music: {
                    ss__substate: 'ss__s1',
                    ss__name: 'ss__music'
                }
            },
            {
                auth:{
                    ss__d: [
                        {
                            login: {
                                ss__substate: 'ss__s3',
                                ss__name: 'ss__login'
                            }
                        },
                        {
                            register: {
                                ss__substate: 'ss__s3',
                                ss__name: 'ss__register'
                            }
                        }
                    ],
                    ss__substate: 'ss__s2'
                }
            }
        ]

        /*[
            {
                1:{
                    ss__substate: 'ss__hello',
                    ss__name: '11'
                },
                2:{
                    ss__substate: 'ss__hello',
                    ss__name: '22'
                }
            }
        ]*/
    }
};
ss__Traliva.ss__init(ss__o);

/*#MASK#borisss__hello:a,b,v##
var a = #m#borisss__hello:a,v##;
if (a & #m#borisss__hello:a##)
    ;
if (a & #m#borisss__hello##)
    ;*/




//qwe internals

  
