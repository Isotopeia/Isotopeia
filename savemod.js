var elncn,elnncn,upcn,prestigeLevel = 0;
var tosave = [];
var toload = [[""]];
var b64 = "";
function exportSave() {
	b64 = b64Encode(JSON.stringify([[elncn, elnncn, upcn], [0,0,tosave], "[" + JSON.stringify(toload) + "]",prestigeLevel]));
}

function b64Encode( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64Decode( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}

function loadInfo(b64) {
	var db64 = JSON.parse(b64Decode(b64));
	
	elncn = db64[0][0];
	elnncn = db64[0][1];
	upcn = db64[0][2];
	tosave = db64[1][2];
	toload = db64[2];
}
function updateIds() {
	document.getElementById("elncns").value = elncn;
	document.getElementById("elnncns").value = elnncn;
	document.getElementById("upcns").value = upcn;
	document.getElementById("tosaves").value = tosave;
	document.getElementById("toloads").value = toload;
    document.getElementById("prestiges").value = prestigeLevel;
	document.getElementById("b64s").value = b64;
}
function updateVars() {
	elncn = document.getElementById("elncns").value;
	elnncn = document.getElementById("elnncns").value;
	upcn = document.getElementById("upcns").value;
	tosave = document.getElementById("tosaves").value;
	toload = document.getElementById("toloads").value;
	b64 = document.getElementById("b64s").value;
    prestigeLevel = document.getElementById("prestiges").value;
}
