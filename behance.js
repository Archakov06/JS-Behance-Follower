function loadCSS(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

function randomTimer(callback,minmax){
	var rand = Math.floor(Math.random() * (minmax[1] - minmax[0] + 1)) + minmax[0];
	setTimeout(function() {
        callback();
    }, rand);
}

function isBlocked(){
	if ($('.blocking-div')[0]) return true; else return false;
}

function init(){
	loadCSS('https://rawgit.com/Archakov06/JS-Behance-Follower/master/styles.css');
}