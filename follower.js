function BehanceFollower(){

	this.timer = null;
	this.maxFollowing = 250;
	this.maxUsers = 250;
	this.subscribed = 0;
	this.delay = 50;

	var self = this;

	var __construct = function() {
		init();
		$('#sorts').hide();
		$('.js-sorts-container').append([
			'<div style="width: 650px;margin: 0 auto;">',
				'<span class="sort sort-location hide-phone" style="float: left;max-width: 70%;">',
					'<span class="js-sort-label sort-label followCounter" style="font-size: 18px;">',
						'<label>Ожидание...</label>'
					'</span>',
				'</span>',
				'<div style="float: right;margin-top: 23px;">',
					'<a tabindex="0" onclick="follower.Start()" unselectable="on" href="javascript://" class="form-button form-button-green form-button-large followStartBtn">Начать подписку</a>',
					'<a class="form-button form-button-red form-button-large followStopBtn" onclick="follower.Stop()" href="javascript://" unselectable="on" tabindex="0" style="opacity: 0.3;margin-left: 10px;">Стоп</a>',
			'</div>'
		].join(''));
   	}();

   	function setStatus(finded){
   		console.clear();
		console.info('Найдено: '+ finded + ' | Подписок: '+self.subscribed+' | Max: '+ self.maxUsers );
   		$('.followCounter > label').html('<label>Найдено: <b>'+finded+'</b>&nbsp;&nbsp;|&nbsp;&nbsp;Подписок: <b>'+self.subscribed+'</b>&nbsp;&nbsp;|&nbsp;&nbsp;Max: <b>'+self.maxFollowing+'</b></label>');
   	}

	this.scrollToBottom = function(callback){
		this.timer = setInterval(function(){
		  var items = $('.js-action-follow:not(.following)');
		  var I = 0;

		  window.scrollTo(0,100000000000);

		  setStatus( items.length );

		  if (items.length >= self.maxUsers) {
		  	clearInterval(self.timer);
		  	window.scrollTo(0,0);
		  	console.clear();
		  	console.info('Скролл завершен!');
		  	console.info('В списке: '+ $(items).length ); 
		  	if (callback) callback();
		  }

		},500);
	}

	this.following = function(){
		var elem = $('.js-action-follow:not(.following)');
		self.subscribed = 0;
		this.timer = setInterval(function(){
			randomTimer(function(){
				if (!$('.blocking-div')[0]){
					console.clear();
					$('.followCounter > label').html( setStatus( $(elem).length ) );
					console.info('Всего подписок: '+self.subscribed);
					elem[self.subscribed].click();
					self.subscribed++;
				}
			});
			if ( self.subscribed >= elem.length || self.subscribed >= self.maxFollowing || $('.blocking-div')[0] ) {
				$('.followCounter > label').text('Готово!');
		  		$('.followCounter > b').text( '' );
				console.clear();
				clearInterval(self.timer);
				if ($('.blocking-div')[0]) console.error('Ограничение на подписку.');
				if ( self.subscribed >= this.maxFollowing ) console.info('Достигнуто максимальное количество подписок.');
				console.info('Всего: '+ self.subscribed);
				console.log('Подписка завершена!');
			}
		},1000);
	}

	this.Stop = function(){
		$('.followStopBtn').css({'opacity':'0.3'});
		$('.followStartBtn').css({'opacity':'1'});
		clearInterval(this.timer);
		$('.followCounter > label').text('Остановлен!');
		$('.followCounter > b').text( '' );
	}

	this.Start = function(){
		$('.followCounter > label').text('Начинаем!');
		$('.followCounter > b').text( '' );
		$('.followStartBtn').css({'opacity':'0.3'});
		$('.followStopBtn').css({'opacity':'1'});
		console.log('Подписка началась');
		this.scrollToBottom(function(){ self.following(); });
	}

}

var follower = new BehanceFollower();