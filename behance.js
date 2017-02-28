function loadCSS(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url + '?r=' + Math.random();
    document.getElementsByTagName("head")[0].appendChild(link);
}

function loadJS(url, callback) {
    var script = document.createElement("script");
    script.src = url + '?r=' + Math.random();
    document.getElementsByTagName("head")[0].appendChild(url);
    script.onload = function(){
        callback();
    }
}

function loadView(url){
	$.get(url + '?r=' + Math.random(), function(resp){
	    $('body').append(resp);
	});
}

function isBlocked(){
	if ($('.blocking-div')[0]) return true; else return false;
}

function init(){
	loadCSS('https://rawgit.com/Archakov06/JS-Behance-Follower/master/styles.css');
}