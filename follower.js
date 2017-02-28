function BehanceFollower(){

	this.timer = null;
	this.finded = 0;
	this.subscribed = -1;
	this.maxUsers = 50;
	this.status = 'waiting';

	var self = this;

	var __construct = function() {
	    
	    // Подключение и инициализация стилей и прочей ерунды
	    var script = document.createElement("script");
	    script.src = 'https://rawgit.com/Archakov06/JS-Behance-Follower/master/behance.js';
	    document.body.appendChild(script);
	    script.onload = function(){
			init();
			// Подгружаем шаблон панельки
			loadView('https://rawgit.com/Archakov06/JS-Behance-Follower/master/views/followView.html');
	    }

   	}();
   	
   	function textStatus(){
   	    var str;
   	    switch (self.status) {
   	        case 'waiting': str = 'Ожидание'; break;
   	        case 'following': str = 'Подписываемся'; break;
   	        case 'searching': str = 'Идёт сбор'; break;
   	        case 'finished': 
   	        	str = 'Готово'; 
   	        	buttonsDisabled(false);
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
		self.timer = setInterval(function(){
		  var items = $('.js-action-follow:not(.following)');

		  window.scrollTo(0,100000000000);

		  self.finded = items.length;
		  
		  setStat('searching');

		  if (items.length >= self.maxUsers){
		  	clearInterval(self.timer);
		  	window.scrollTo(0,0);
		  	if (callback) callback();
		  }

		}, 500);
	}

	this.followAction = function(){
		var elem = $('.js-action-follow:not(.following)');
		self.subscribed = 0;
		setStat('following');
		self.timer = setInterval(function(){
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

	function buttonsDisabled(b){
		if (b) {
			$('#bf-stop-btn').attr('disabled','disabled');
			$('#bf-start-btn').removeAttr('disabled');
		} else {
			$('#bf-start-btn').attr('disabled','disabled');
			$('#bf-stop-btn').removeAttr('disabled');
		}
		self.status = 'waiting';
	}

	this.Stop = function(){
		buttonsDisabled(true);
		clearInterval(self.timer);
		setStat('finished');
	}

	this.Start = function(){
		self.finded = self.subscribed = 0;
		buttonsDisabled(false);
		clearInterval(self.timer);
		setStat('started');
		self.scrollToBottom(function(){ self.followAction(); });
	}

}

var follower = new BehanceFollower();
