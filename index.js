var elncn,elnncn,upcn,bch,cph,lpc,ph,gl,wf,wf2,taucn,tuncn,muocn,muncn,cphc,lepc,radx,rady,timesdone;
function init(){
    // clickable
     elncn = 0;
     elnncn = 0;
     upcn = 0;
     bch = 0;
     cph = 0;
     lpc = 0;
    //unclickable
     ph = 0;
     gl = 0;
     wf = 0;
     wf2 = 0;
     taucn = 0;
     tuncn = 0;
     muocn = 0;
     muncn = 0;
    //costs
     cphc = 500;
     lepc = 1000;
    //canvas
     radx = 400;
     rady = 400;
     timesdone = 0;
}
init();
var ele = document.getElementById("bcham");
var ctx = ele.getContext('2d');
var tosave = [];
var toload = [""];
var ran=false;
var beatenGame = false;

// funcs
// saving/loading
function save() {
	localStorage.setItem("ucc", [elncn,elnncn,upcn]);
	localStorage.setItem("upg", [cph,lpc,tosave]);
	localStorage.setItem("cst", [cphc,lepc]);
	localStorage.setItem("tl", "[" + JSON.stringify(toload) + "]");
	localStorage.setItem("beaten_game", beatenGame ? "true" : "false");
}
function b64Encode( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function b64Decode( str ) {
  return decodeURIComponent(escape(window.atob( str )));
}
function exportSave() {
	return b64Encode(JSON.stringify([[elncn, elnncn, upcn], [cph, lpc, tosave], "[" + JSON.stringify(toload) + "]"]));
}
function importSave(b64) {
	var db64 = JSON.parse(b64Decode(b64));
	localStorage.setItem("ucc", db64[0]);
	localStorage.setItem("upg", db64[1]);
	localStorage.setItem("tl", db64[2]);
	try{load();}catch{console.log("load error")}
	update();
}
function load() {
	var ucc = JSON.parse("[" + localStorage.getItem("ucc") + "]");
	var upg = JSON.parse("[" + localStorage.getItem("upg").slice(0,-1) + "]");
	var cst = JSON.parse("[" + localStorage.getItem("cst") + "]");
	beatenGame = localStorage.getItem("beaten_game") == "true"; // just in case
	elncn = ucc[0];
	elnncn = ucc[1];
	upcn = ucc[2];
	ph = ucc[3];
	gl = ucc[4];
	wf = ucc[5];
	wf2 = ucc[6];
	taucn = ucc[7];
	tuncn = ucc[8];
	muocn = ucc[9];
	muncn = ucc[10];

	cph = upg[0];
	lpc = upg[1];
	
	cphc = cst[0];
	lepc = cst[1];
	//make the vars work

	try {toload = JSON.parse(JSON.parse(JSON.parse(localStorage.getItem("tl").substring(1)))[0])[0];
		for(var i=0; i<toload.length; i++) {
				try {
					var tlR = eval(toload[i+1]);
					tlR.interval();
                	tlR.buildUI();
					tlR.refreshCount();
				} catch(e) {
					//console.log("interval+buildui error")
					console.log(e.message);
				}
		}}catch(e){console.log(e.message);console.log("toload error")}
	hooks = parseToJs(localStorage.getItem("jtopia"));
	addItems();
	ran=true;
	update();
}
function ellipse(context, cx, cy, rx, ry){
        context.save(); // save state
        context.beginPath();

        context.translate(cx-rx, cy-ry);
        context.scale(rx, ry);
        context.arc(1, 1, 1, 0, 2 * Math.PI, false);

        context.restore(); // restore to original state
        context.stroke();
}
function electronn(amt) {
	if(bch <= 16) {
		window.setTimeout(function() {
			if(radx && rady <= 0) {
				ctx.fillStyle = "#FFFFFF"
				ctx.strokeStyle = "#FFFFFF"
				ctx.clearRect(0, 0, 500, 500);
				radx = 450;
				rady = 450;
				timesdone++;
			} else {
				ctx.fillStyle = ""
				ctx.strokeStyle = "#0000FF"
				radx-=25;
				rady-=25;
			}
			ellipse(ctx, 250, 250, radx, rady);
		},1000);
	}
	elnncn+=amt;
	update();
}
function electron(amt) {
	elncn+=amt;
	update();
}
function upq(amt) {
	upcn+=amt;
	update();
}
var runners = [];
function update() {
	document.getElementById("elnncnt").innerHTML = elnncn;
	document.getElementById("elncnt").innerHTML = elncn;
	document.getElementById("upqcnt").innerHTML = upcn;
    for(var i=0; i<runners.length; i++) {
        runners[i]();
    }
	if(elnncn >= 1.95694716243) {
		document.getElementById("adde").removeAttribute("disabled");
	}
	if(elncn >= 4.30528375734) {
		document.getElementById("addup").removeAttribute("disabled");
	}
	if(elnncn >= 1e+22 && !beatenGame) {
		setTimeout(() => {
			document.querySelectorAll(".game").forEach((e) => {
				e.style.display = "none";
			})
			document.body.style.backgroundColor = "black";
			document.querySelectorAll(".end").forEach((e) => {
				e.style.display = "block";
			})
		}, 200);
	}
}
window.onload = function() {
	// let's do this!
	// format: (price, name, ps, id, rspot) increment rspot each one
	beatenGame = localStorage.getItem("beaten_game") == "true"; // just in case
    var to;
    var x = 0;
    if(!ran) {
        var ucc = JSON.parse("[" + localStorage.getItem("ucc") + "]");
        elncn = ucc[0];
        try {
            var tmp = [];
            var ucc = JSON.parse("[" + localStorage.getItem("ucc") + "]");
            elnncn = ucc[1];
            toload = eval(eval(localStorage.getItem("tl"))[0])
            for(var i=0; i<toload.length; i++) {
                    if(toload[0] == ",") {
                        toload=toload.substring(1);
                    }
                    try {
                        eval(toload[i+1]).interval();
                        tmp.push(eval(toload[i+1]).name);
                    } catch {
                        
                    }
            }
            let unique = [...new Set(tmp)];
            console.log(unique);
            for(var n=0; n<tmp.length; n++) {
                eval(toload[tmp.lastIndexOf(unique[n])]).buildUI()
            }
        } catch {
        }
        addItems();
    }
    if(elnncn==null) {
        elnncn = 0;
    }
    update();
}
function addEnItems() {
	new BuildingU(10, "Quark generator", 10, "quarkGenerator", 12).buildUI();
	new BuildingU(1000, "Matter converter", 1000, "matterConverter", 13).buildUI();
	new BuildingU(100000, "Quark simulator", 100000, "quarkSimulator", 14).buildUI();
	new BuildingU(1000000, "Quark fusor", 10000000000, "quarkFusor", 15).buildUI();
	/*parseToJs(JSON.parse(`{
    "buildings": {
		"u": [
			{
                "price": 10,
                "name": "Quark generator",
                "perSecond": 10,
                "id": "quarkGenerator"
            },
			{
                "price": 1000,
                "name": "Matter converter",
                "perSecond": 1000,
                "id": "rBDM"
            },
			{
                "price": 100000,
                "name": "Quark simulator",
                "perSecond": 100000,
                "id": "rBDM"
            },
			{
                "price": 1000000,
                "name": "Quark fusor",
                "perSecond": 10000000000,
                "id": "quarkFusor"
            }
		],
        "e": [
            {
                "price": 100,
                "name": "Radioactive beta decay machine",
                "perSecond": 1,
                "id": "rBDM"
            },
			{
                "price": 1000,
                "name": "Oudin coil",
                "perSecond": 10,
                "id": "oudinCoil"
            },
			{
                "price": 10000,
                "name": "Tesla coil",
                "perSecond": 1000,
                "id": "teslaCoil"
            },
			{
                "price": 100000,
                "name": "Marx generator",
                "perSecond": 500000,
                "id": "marxGen"
            }
        ],
        "en": [
            {
                "price": 100,
                "name": "Bubble chamber",
                "perSecond": 1,
                "id": "bubbleChamber"
            },
			{
                "price": 5000,
                "name": "Upgraded laboratory",
                "perSecond": 50,
                "id": "upgradedLab"
            },
			{
                "price": 50000,
                "name": "Fume hood",
                "perSecond": 5000,
                "id": "fumeHood"
            },
			{
				"price": 50000000,
                "name": "Extraterrestrial research facility",
                "perSecond": 100000000000,
                "id": "eTRF"
			},
			{
				"price": 500000000000000,
                "name": "Microcellular automata",
                "perSecond": 1000000000000000,
                "id": "mCA"
			},
			{
				"price": 50000000000000000,
                "name": "Hawking radiation simulation chamber",
                "perSecond": 1000000000000000000,
                "id": "hRSC"
			},
			{
				"price": 500000000000000000000,
                "name": "Black hole simulation chamber",
                "perSecond": 100000000000000000000,
                "id": "bHSC"
			}
        ]
    }
}
`))*/
new BuildingEN(100, "Bubble chamber", 1, "bubbleChamber", 0).buildUI();
    new BuildingEN(500, "Particle accelerator", 5, "particleAccel", 1).buildUI();
    new BuildingEN(5000, "Upgraded laboratory", 50, "upgradedLab", 2).buildUI();
    new BuildingEN(50000, "Fume hood", 5000, "fumeHood", 3).buildUI();
	new BuildingEN(50000000, "Extraterrestrial research facility", 100000000000, "eTRF", 8).buildUI();
    new BuildingEN(500000000000000, "Microcellular automata", 1000000000000000, "mCA", 9).buildUI();
	new BuildingEN(50000000000000000, "Hawking radiation simulation chamber", 1000000000000000000, "hRSC", 10).buildUI();
    new BuildingEN(500000000000000000000, "Black hole simulation chamber", 100000000000000000000, "bHSC", 11).buildUI();
}
function addEItems() {
	new BuildingE(100, "Radioactive beta decay machine", 1, "rBDM", 4).buildUI();
    new BuildingE(1000, "Oudin coil", 10, "oudinCoil", 5).buildUI();
    new BuildingE(10000, "Tesla coil", 1000, "teslaCoil", 6).buildUI();
    new BuildingE(100000, "Marx generator", 500000, "marxGen", 7).buildUI();
}
function addUItems() {
	new BuildingU(10, "Quark generator", 10, "quarkGenerator", 12).buildUI();
	new BuildingU(1000, "Matter converter", 1000, "matterConverter", 13).buildUI();
	new BuildingU(100000, "Quark simulator", 100000, "quarkSimulator", 14).buildUI();
	new BuildingU(1000000, "Quark fusor", 10000000000, "quarkFusor", 15).buildUI();
}
function addSubsidies() {
    new Subsidy(100000000, "Automation setup", "autoSetup", 10000000000).buildUI();
}
var hooks = [];
function addItems() {
	addEnItems();
	addEItems();
	addUItems();
	addSubsidies();
	for(var i=0; i<hooks.length; i++) {
		hooks[i].buildUI();
	}
    update();
}
function confirmReset() {
	if(confirm("Are you sure you want to reset the game? This is irreversible.")) {
		localStorage.setItem("ucc", [0,0,0]);
		localStorage.setItem("upg", [0,0,[]]);
		localStorage.setItem("cst", [0,0]);
		localStorage.setItem("tl", "[[\"\"]]");
		localStorage.setItem("jtopia", "[]")
		location.reload();
	}
}