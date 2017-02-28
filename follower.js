function BehanceFollower(){

	this.timer = null;
	this.finded = 0;
	this.subscribed = 0;
	this.delay = 50;
	this.maxUsers = 50;
	this.status = '';

	var self = this;

	var __construct = function() {
	    
	    // Подключение и инициализация стилей и прочей ерунды
	    var script = document.createElement("script");
	    script.src = 'https://rawgit.com/Archakov06/JS-Behance-Follower/master/behance.js';
	    document.body.appendChild(script);
	    script.onload = function(){
	        init();
	    }
	    
	    $.get('https://rawgit.com/Archakov06/JS-Behance-Follower/master/views/');
	    
		// Вставляем блок с панелькой
		$('body').append('<div class="behance-follower"> <ul> <li> <button id="bf-start-btn" onclick="follower.Start()" class="form-button form-button-green">Старт</button> </li> <li> <button id="bf-stop-btn" onclick="follower.Stop()" disabled class="form-button form-button-red">Стоп</button> </li> <li> <span>Найдено: <b id="bf-finded">0</b></span> </li> <li> <span>Подписано: <b id="bf-subscribed">0</b></span> </li> <li> <span>Статус: <b id="bf-status">Ожидание</b></span> </li> </ul> </div> <style> a { text-decoration: none; } ul { list-style: none; margin: 0; padding: 0; } .behance-follower { background: #fff; border: 1px solid #e6e6e6; border-radius: 3px; position: fixed; right: 15px; bottom: 15px; z-index: 99999999; } .behance-follower span { font-size: 16px; } .behance-follower { width: 220px } .behance-follower ul { padding: 15px; } .behance-follower ul li { margin-bottom: 15px; } .behance-follower ul li button { width: 100%; } .form-button-default { background: linear-gradient(#0096ff, #005dff); border-color: #0071e0; color: #fff; text-shadow: 0 1px 0 rgba(0,0,0,0.3); opacity: 1; } .form-button-green { background: linear-gradient(#34c520, #219211); border-color: #1f960f; color: #fff; text-shadow: 0 1px 0 rgba(0,0,0,0.32); } .form-button-red { background: linear-gradient(#f62f2f, #cc0909); border-color: #a70c0c; color: #fff; text-shadow: 0 1px 0 rgba(0,0,0,0.32); } .form-button[disabled] { opacity: 0.4; } .form-button { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; border: 1px solid transparent; border-radius: 3px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; height: 31px; line-height: 29px; padding: 0 15px; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; vertical-align: middle; text-align: center; } </style>');
		
   	}();
   	
   	function textStatus(){
   	    var str;
   	    switch (this.status) {
   	        case 'following': str = 'Подписываемся'; break;
   	        case 'searching': str = 'Идёт сбор'; break;
   	        case 'finished': 
   	        	str = 'Готово'; 
   	        	buttonsEnabled(true);
   	        break;
   	        case 'started': str = 'Начинаем'; break;
   	    }
   	    return str;
   	}
    
   	function setStat(s){
   	    self.status = s;
   	    $('#bf-finded').text(self.finded);
   	    $('#bf-subscribed').text(self.subscribed);
   	    $('#bf-status').text(textStatus(self.status));
   	}
   	
   	function isBlocked(){
   	    if (!$('.blocking-div')[0]) return false; else return true;
   	}

	this.scrollToBottom = function(callback){
		this.timer = setInterval(function(){
		  var items = $('.js-action-follow:not(.following)');

		  window.scrollTo(0,100000000000);

		  self.finded = items.length;
		  
		  setStat('searching');

		  if (items.length >= self.maxUsers){
		  	clearInterval(self.timer);
		  	window.scrollTo(0,0);
		  	if (callback) callback();
		  }

		},500);
	}

	this.followAction = function(){
		var elem = $('.js-action-follow:not(.following)');
		self.subscribed = 0;
		setStat('following');
		this.timer = setInterval(function(){
			if (isBlocked() == false){
				elem[self.subscribed].click();
				self.subscribed++;
				setStat('following');
			}
			if ( self.subscribed >= self.maxUsers || isBlocked() ) {
				clearInterval(self.timer);
				alert('Достигнуто максимальное количество подписок.');
				setStat('finished');
			}
		}, 4000);
	}

	function buttonsEnabled(b){
		if (!b) {
			$('#bf-stop-btn').attr('disabled','disabled');
			$('#bf-start-btn').removeAttr('disabled');
		} else {
			$('#bf-start-btn').attr('disabled','disabled');
			$('#bf-stop-btn').removeAttr('disabled');
		}
	}

	this.Stop = function(){
		buttonsEnabled(true);
		clearInterval(this.timer);
		setStat('finished');
	}

	this.Start = function(){
		buttonsEnabled(false);
		clearInterval(this.timer);
		setStat('started');
		this.scrollToBottom(function(){ self.followAction(); });
	}

}

var follower = new BehanceFollower();