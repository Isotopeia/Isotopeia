var elncn, elnncn, upcn, bch, cph, lpc, ph, gl, wf, wf2, timesdone, dark = !1, cphc, lpc, buildingCounts, verboseLogging, LoggerIso;
const mostRecentVersion = "v1.12.1";
const stockBuildingsJsonStr = JSON.stringify([{"buildings":{"en":[{"price":100,"name":"Bubble chamber","perSecond":1,"id":"bubbleChamber"},{"price":500,"name":"Particle accelerator","perSecond":5,"id":"particleAccelerator"},{"price":5000,"name":"Upgraded laboratory","perSecond":50,"id":"upgradedLaboratory"},{"price":50000,"name":"Fume hood","perSecond":5000,"id":"fumeHood"},{"price":50000000,"name":"Extraterrestiral research facility","perSecond":100000000000,"id":"extraTerraResearchFacility"},{"price":500000000000000,"name":"Microcellular automata","perSecond":1000000000000000,"id":"microAutomata"},{"price":50000000000000000,"name":"Hawking radiaton simulation chamber","perSecond":1000000000000000000,"id":"hawkingSimChamber"},{"price":500000000000000000000,"name":"Black hole simulation chamber","perSecond":100000000000000000000,"id":"blackHoleSimChamber"}],"e":[{"price":100,"name":"Radioactive beta decay machine","perSecond":1,"id":"radioactiveBetaDecayMachine"},{"price":1000,"name":"Oudin coil","perSecond":10,"id":"oudinCoil"},{"price":10000,"name":"Tesla coil","perSecond":1000,"id":"teslaCoil"},{"price":100000,"name":"Marx generator","perSecond":500000,"id":"marxGenerator"},{"price":200000000,"name":"Nuclear reactor","perSecond":10000000,"id":"nuclearReactor"},{"price":30000000000,"name":"Tokamak fusion reactor","perSecond":50000000000,"id":"tokamakFusionReactor"},{"price":5000000000000,"name":"Gravity extractor","perSecond":50000000000000,"id":"gravityExtractor"},{"price":800000000000000,"name":"Artificial universe","perSecond":50000000000000000,"id":"artificialUniverse"}],"u":[{"price":10,"name":"Quark generator","perSecond":10,"id":"quarkGenerator"},{"price":1000,"name":"Matter converter","perSecond":1000,"id":"matterConverter"},{"price":100000,"name":"Quark simulator","perSecond":100000,"id":"quarkSimulator"},{"price":1000000,"name":"Quark fusor","perSecond":10000000000,"id":"quarkFusor"},{"price":200000000000000,"name":"Quark collision chamber","perSecond":10000000000000000,"id":"quarkCollider"},{"price":500000000000000000000,"name":"Cyclotron","perSecond":1000000000000000000,"id":"cyclotron"}]},"customBehaviors":""}]);

function init() {
    elncn = 0, elnncn = 0, upcn = 0, bch = 0, cph = 0, lpc = 0, ph = 0, gl = 0, wf = 0, wf2 = 0, rady = 400, timesdone = 0, buildingCounts = {}, cphc = 500, lpc = 0, verboseLogging = true;
    LoggerIso = new Logger(verboseLogging ? Levels.VERBOSE : Levels.ERROR, loggingClass="Isotopeia");
}
init();
var ele = document.getElementById("bcham"),
    ctx = ele.getContext("2d"),
    tosave = [],
    toload = [""],
    ran = !1,
    beatenGame = !1;

function save() { // localStorage `tl` is deprecated, don't use, replaced with buildingCounts
    localStorage.setItem("ucc", JSON.stringify([elncn, elnncn, upcn])), localStorage.setItem("upg", JSON.stringify(["","", tosave])), localStorage.setItem("beaten_game", beatenGame ? "true" : "false"), localStorage.setItem("dark_mode", dark ? "true" : "false"), localStorage.setItem("counts", JSON.stringify(buildingCounts)), localStorage.setItem("verboseLogging", verboseLogging);
}

function b64Encode(e) {
    return window.btoa(unescape(encodeURIComponent(e)))
}

function b64Decode(e) {
    return decodeURIComponent(escape(window.atob(e)))
}
 
function exportSave() {
    return b64Encode(JSON.stringify([
        [elncn, elnncn, upcn],
        [cph, lpc, tosave], [],
        localStorage.getItem("prestige"),
		localStorage.getItem("counts"),
		localStorage.getItem("verboseLogging")
    ]))
}

function importSave(e) {
    var $ = JSON.parse(b64Decode(e));
    localStorage.setItem("ucc", $[0]), localStorage.setItem("upg", $[1]); // , localStorage.setItem("tl", $[2]);
    localStorage.setItem("prestige", $[3].toLocaleString('fullwide', {useGrouping:false}));
    localStorage.setItem("counts", $[4]);
    prestigeLevel = parseInt(localStorage.getItem("prestige"));
    verboseLogging = $[5];
    try {
        load()
    } catch {
        LoggerIso.logError("Load error!");
    }
    update()
}

function load() {
    var ucc = JSON.parse(localStorage.getItem("ucc")),
        upg = JSON.parse(localStorage.getItem("upg")),
		bcs = JSON.parse(localStorage.getItem("counts")),
		verboseLogging = JSON.parse(localStorage.getItem("verboseLogging"));
    beatenGame = "true" == localStorage.getItem("beaten_game"), (dark = "true" == localStorage.getItem("dark_mode")) ? document.body.classList.add("dark") : document.body.classList.remove("dark"), elncn = ucc[0], elnncn = ucc[1], upcn = ucc[2], ph = ucc[3], gl = ucc[4], wf = ucc[5], wf2 = ucc[6], cph = upg[0];
    buildingCounts = bcs != null ? bcs : {};
    try {
        toload = JSON.parse(localStorage.getItem("tl"))[0];
        for (var i = 1; i < toload.length; i++) try {
            var tlR = eval(toload[i]);
           tlR.buildUI(), tlR.refreshCount();
        } catch (e) {
            LoggerIso.logError(e.message);
        }
    } catch (e) {
        LoggerIso.logError(`toload error: ${e.message}`);
    }
    hooks = parseToJs(localStorage.getItem("jtopia")), addItems(), ran = !0, update()
}


function electronn(e) {
    elnncn += e, update()
}

function electron(e) {
    elncn += e, update()
}

function upq(e) {
    upcn += e, update()
}
var runners = [];

function update() {
    document.getElementById("elnncnt").innerHTML = elnncn, document.getElementById("elncnt").innerHTML = elncn, document.getElementById("upqcnt").innerHTML = upcn;
    for (var e = 0; e < runners.length; e++) runners[e]();
    elnncn >= 1.95694716243 && document.getElementById("adde").removeAttribute("disabled"), elncn >= 4.30528375734 && document.getElementById("addup").removeAttribute("disabled"), elnncn >= 1e22 && !beatenGame && setTimeout(() => {
        document.querySelectorAll(".game").forEach(e => {
            e.style.display = "none"
        }), document.body.style.backgroundColor = "black", document.querySelectorAll(".end").forEach(e => {
            e.style.display = "block"
        })
    }, 200)
}
window.onload = function() {
    beatenGame = "true" == localStorage.getItem("beaten_game");
    var to, x = 0;
    if (!ran) {
        var ucc = JSON.parse("[" + localStorage.getItem("ucc") + "]");
        elncn = ucc[0];
        try {
            var tmp = [],
                ucc = JSON.parse("[" + localStorage.getItem("ucc") + "]");
            elnncn = ucc[1] === undefined ? 0 : ucc[1], toload = JSON.parse(localStorage.getItem("tl"))[0];
            for (var i = 0; i < toload.length; i++) {
                "," == toload[0] && (toload = toload);
                try {
                    eval(toload[i + 1]).interval(), tmp.push(eval(toload[i + 1]).name)
                } catch {}
            }
            let unique = [...new Set(tmp)];
            for (var n = 0; n < tmp.length; n++) eval(toload[tmp.lastIndexOf(unique[n])]).buildUI()
        } catch {LoggerIso.logVerbose("weird error @ L106-118, this is probably fine")}
        addItems();
	load();
    }
    null == elnncn && (elnncn = 0), update()
    migrationProcessor(localStorage.getItem("version"));
    document.getElementById("titleHTML").innerHTML=`Isotopeia - ${mostRecentVersion}`;
    uniqueItems.forEach(e => e.refreshIntervals());
};
var hooks = [];

function addItems() {
    for (var e = 0; e < hooks.length; e++) hooks[e].buildUI();
    update();
}
var actuallySave = true;
function confirmReset() {
	if(!confirm("Are you sure you want to reset the game? This is irreversible.")) return;
    	resetNoconfirm();
}
function resetNoconfirm() {
	actuallySave = false;
	localStorage.setItem("ucc", [0, 0, 0]);
	localStorage.setItem("upg", [0, 0, []]); 
	localStorage.setItem("cst", [0, 0]);
	localStorage.setItem("tl", '[[""]]');
	localStorage.setItem("jtopia", stockBuildingsJsonStr); 
	localStorage.setItem("prestige", "0"); 
	localStorage.setItem("counts", "{}");
	localStorage.setItem("version", "v1.12.1");
	LoggerIso.logWarn("Resetting! This is irreversible without a save backup in Base64.");
	location.reload();
}
// autosaving!
window.onbeforeunload = function(){
   if(actuallySave) save();
}
function migrationProcessor(version) {
	if(version == null || version == undefined) { // oldest/pre-v1.10.0-->v1.11.0+ migration, these versions are really old, the commented solution works but can cause issues with NaN Ve counts
		LoggerIso.logWarn("Migrating from pre-v1.10.0 (resetting!)");
		resetNoconfirm();
		/*LoggerIso.logInfo("Migrating from v1.10.0...");
		countAll();
		LoggerIso.logInfo("Done!");*/
		return;
	}
	if(buildingUpdateNeeded()) {
		localStorage.setItem("jtopia", stockBuildingsJsonStr);
		localStorage.setItem("version", mostRecentVersion);
		return location.reload();
	}
	localStorage.setItem("version", mostRecentVersion);
}

const getPriciestBuilding = (jsonData, type="en") => jsonData.buildings[type].sort((a,b) => b.price-a.price)[0]; // use with combineModBuildings

function combineModBuildings(modsArray) {
    const buildings = modsArray.map(e => e.buildings);
    const newObj = {"buildings":{"en":[],"e":[],"u":[]}, "customBehaviors":""};
    Object.keys(buildings[0]).forEach(buildingType => {
        const buildingsOfType = modsArray.reduce((a,b) => [...a.buildings[buildingType],...b.buildings[buildingType]]);
        newObj.buildings[buildingType] = newObj.buildings[buildingType].concat(buildingsOfType)
    });
    return newObj;
}
function buildingUpdateNeeded() {
	const updatedBuildings = JSON.parse(stockBuildingsJsonStr)[0];
	const buildings = JSON.parse(localStorage.getItem("jtopia"))[0];
	const updatedPriciest = {"en": getPriciestBuilding(updatedBuildings, "en"), "e": getPriciestBuilding(updatedBuildings, "e"), "u": getPriciestBuilding(updatedBuildings, "u")}; 
	const priciest = {"en": getPriciestBuilding(buildings, "en"), "e": getPriciestBuilding(buildings, "e"), "u": getPriciestBuilding(buildings, "u")}; 
	if(updatedPriciest.en.id != priciest.en.id
	   || updatedPriciest.e.id != priciest.e.id
	   || updatedPriciest.u.id != priciest.u.id) return true; // TODO: add logic for mods which have pricier buildings, which breaks current method
	return false;
}
