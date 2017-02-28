function loadCSS(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

function isBlocked(){
	if ($('.blocking-div')[0]) return true; else return false;
}

function init(){
	loadCSS('https://rawgit.com/Archakov06/JS-Behance-Follower/master/styles.css');
}

function asyncLoadView(url){
	$.get(url + '?' + Math.random(), function(resp){
	    $('body').append(resp);
	});
}