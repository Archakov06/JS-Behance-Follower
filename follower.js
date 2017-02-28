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
		// Подгружаем шаблон панельки
		loadView('https://rawgit.com/Archakov06/JS-Behance-Follower/master/views/followView.html');
			
	    }

   	}();
   	
   	function textStatus(){
   	    var str;
   	    switch (this.status) {
   	        case 'following': str = 'Подписываемся'; break;
   	        case 'searching': str = 'Идёт сбор'; break;
   	        case 'finished': 
   	        	str = 'Готово'; 
   	        	buttonsDisabled(true);
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

		}, 500);
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

	function buttonsDisabled(b){
		if (!b) {
			$('#bf-stop-btn').attr('disabled','disabled');
			$('#bf-start-btn').removeAttr('disabled');
		} else {
			$('#bf-start-btn').attr('disabled','disabled');
			$('#bf-stop-btn').removeAttr('disabled');
		}
	}

	this.Stop = function(){
		buttonsDisabled(true);
		clearInterval(this.timer);
		setStat('finished');
	}

	this.Start = function(){
		buttonsDisabled(false);
		clearInterval(this.timer);
		setStat('started');
		this.scrollToBottom(function(){ self.followAction(); });
	}

}

var follower = new BehanceFollower();
