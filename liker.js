function BehanceLiker(){

	this.timer = null;
	this.maxLikes = 250;
	this.maxWorks = 100;
	this.liked = 0;
	this.delay = 40;

	var self = this;

	var __construct = function() {
		$('#sidebar-fixed .filter-block').after([
			'<div class="filter-block">',
				'<span class="js-sort-label sort-label followCounter" style="font-size: 18px;">'
					'<label>Ожидание...</label>',
				'</span>',
				'<a class="form-button form-button-green form-button-large followStartBtn" onclick="follower.Stop()" href="javascript://">Start</a>',
				'<a class="form-button form-button-red form-button-large followStopBtn" onclick="follower.Stop()" href="javascript://">Stop</a>',
			'</div>'
		].join(''));
   	}();

   	function bindStatus(likes){
   		console.clear();
   		if (isBlocked()) console.error('Ограничение на подписку.');
   		if (likes) {
			console.info('Лайков: '+ self.liked+' / '+likes + ' | Max: '+ self.maxLikes );
   			$('.followCounter > label').html( '<label>Лайков: <b>'+self.liked+' / '+likes+'</b>&nbsp;&nbsp;|&nbsp;&nbsp;Max: <b>'+self.maxLikes+'</b></label>');
   		} else {
   			$('.followCounter > label').html( 'Готово');
   		}
   	}

	this.scrollToBottom = function(callback){
		this.timer = setInterval(function(){
		  var items = $('.js-project-cover');
		  var I = 0;

		  window.scrollTo(0,100000000000);

		  if (items.length >= self.maxLikes) {
		  	clearInterval(self.timer);
		  	window.scrollTo(0,0);
		  	console.clear();
		  	console.info('Скролл завершен!');
		  	console.info('В списке: '+ $(btns).length ); 
		  	if (callback) callback();
		  }

		},500);
	}

	this.like = function(){
		var items = $('.js-project-cover');
		self.liked = 0;
		this.timer = setInterval(function(){
			randomTimer(function(){
				if (!$('.blocking-div')[0]){
					bindStatus(items.length);
					id = items[self.liked].getAttribute('data-id');
					$.get('https://www.behance.net/c/a?e=project&id='+id);
					self.liked++;
				}
			});
			if ( self.liked >= items.length || self.liked >= self.maxLikes || $('.blocking-div')[0] ) {
				bindStatus(0);
				clearInterval(self.timer);
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
		console.log('Лайкинг началась');
		this.scrollToBottom(function(){ self.like(); });
	}

}

var liker = new BehanceLiker();