/*
 * Welcome to the Isotopeia source code!
 * This is a passion project of mine that I work on from time to time.
 * It's a real neat project (neat as in fun to work on, not as in good code)
 * Have fun tinkering!
 * ~ matthy.dev
 */
console.log("%cWelcome to the Isotopeia console!\nIf you wanna cheat, use the mod in the IsotopeiaMods repo.","font-size:18pt;"); // lil hint at how to cheat 

// RANDOM VARIABLES TIME!
// similar things have been merged into one line
const mostRecentVersion = "v1.12.3"; // latest version constant, don't change 
var elncn = 0, elnncn = 0, upcn = 0; // main currency counters
var elnpc = 1, elnnpc = 1, uppc = 1; // gain per click for each currency
var elnps = 0, elnnps = 0, upps = 0; // per second gain for each currency
var verboseLogging = true; // verbose logging? true = VERBOSE or higher, false = WARN or higher
var bch = 0, cph = 0, lpc = 0, ph = 0, gl = 0, wf = 0, wf2 = 0, cphc = 500, lpc = 0, timesdone = 0; // unused
var LoggerIso = new Logger(verboseLogging ? Levels.VERBOSE : Levels.ERROR, loggingClass="Isotopeia"); // see logging.js, simple logger for JS I made for fun
var ele = document.getElementById("bcham"), ctx = ele.getContext("2d"); // unused  
var tosave = [], toload = [""], hooks = [], runners = [], buildingCounts = {}; // jtopia shenanigans
var ran = false; // has load() been ran yet?
var beatenGame = false; // have you beaten the game yet? If so, you won't get the "congrats" message again
const unitList = [
	"",
	"thousand",
	"million",
	"billion",
	"trillion",
	"quadrillion",
	"quintillion",
	"sextillion",
	"septillion",
	"octillion",
	"nonillion",
	"decillion",
	"undecillion",
	"duodecillion",
	"tredecellion",
	"quattuordecillion",
	"quindecillion",
	"sexdecillion",
	"septendecillion",
	"octodecillion",
	"novemdecillion",
	"vigintillion",
	"unvigintillion",
	"duovigintillion",
	"trevigintillion",
	"quattuorvigintillion",
	"quinvigintillion",
	"sexvigintillion",
	"septenvigintillion",
	"octovigintillion",
	"nonvigintillion",
	"trigintillion",
	"untringintillion",
	"duotrigintillion",
	"tretrigintillion"]; // i'll add more if anyone makes a PR for above 10^102 lol
function save() { // localStorage `tl` is deprecated, don't use, replaced with buildingCounts
    	localStorage.setItem("ucc", JSON.stringify([elncn, elnncn, upcn])); // currency counters
	localStorage.setItem("pc", JSON.stringify([elnpc, elnnpc, uppc])); // per click
	localStorage.setItem("upg", JSON.stringify(["","", tosave])); // upgrade storage stuff
	localStorage.setItem("beaten_game", JSON.stringify(beatenGame)); 
	localStorage.setItem("dark_mode", JSON.stringify(dark));
	localStorage.setItem("counts", JSON.stringify(buildingCounts));
	localStorage.setItem("verboseLogging", JSON.stringify(verboseLogging));
}
const b64Encode = e => window.btoa(unescape(encodeURIComponent(e)));
const b64Decode = e => decodeURIComponent(escape(window.atob(e)));
const tryOrLog = (toRun, message, level=Levels.ERROR) => {
	if(typeof message === "string") message = (err) => message;
	try {
		toRun();
	} catch(e) {
		message(e);
	}
};
 
function exportSave() { // export to base64
    return b64Encode(JSON.stringify([
        [elncn, elnncn, upcn],
        [cph, lpc, tosave], [],
        localStorage.getItem("prestige"),
	localStorage.getItem("counts"),
	localStorage.getItem("verboseLogging"),
	localStorage.getItem("pc")
    ]))
}

function importSave(e) { // import from base64
    var $ = JSON.parse(b64Decode(e)); // base64 --> JSON as string --> JSON
    // save all to localStorage first...
    localStorage.setItem("ucc", $[0]), localStorage.setItem("upg", $[1]);
    localStorage.setItem("prestige", $[3].toLocaleString('fullwide', {useGrouping:false}));
    localStorage.setItem("counts", $[4]);
    localStorage.setItem("verboseLogging", $[5])
    localStorage.setItem("pc", $[6]);
    // *then* update the current instance to localStorage
    prestigeLevel = parseInt(localStorage.getItem("prestige"));
    verboseLogging = JSON.parse(localStorage.getItem("verboseLogging"));
    tryOrLog(load, "B64 load error!");
    update();
}

function load() { // load from localStorage
    var ucc = JSON.parse(localStorage.getItem("ucc")),
        upg = JSON.parse(localStorage.getItem("upg")),
	bcs = JSON.parse(localStorage.getItem("counts")),
	verboseLogging = JSON.parse(localStorage.getItem("verboseLogging")),
	pc = JSON.parse(localStorage.getItem("pc"));
    beatenGame = JSON.parse(localStorage.getItem("beaten_game"));
    dark = JSON.parse(localStorage.getItem("dark_mode"));
    dark ? document.body.classList.add("dark") : document.body.classList.remove("dark");
    elncn = blankToZero(ucc[0]);
    elnncn = blankToZero(ucc[1]);
    upcn = blankToZero(ucc[2]);
    ph = ucc[3];
    gl = ucc[4];
    wf = ucc[5];
    wf2 = ucc[6]
    cph = upg[0];
    elnpc = pc[0];
    elnnpc = pc[1];
    uppc = pc[2];
    buildingCounts = bcs != null ? bcs : {};
    tryOrLog(() => {
        toload = JSON.parse(localStorage.getItem("tl"))[0];
        for (var i = 1; i < toload.length; i++) tryOrLog(() => {
            var tlR = eval(toload[i]);
            tlR.buildUI();
	    tlR.refreshCount();
        }, e.message);
    }, e => `toload error: ${e.message}`);
    hooks = parseToJs(localStorage.getItem("jtopia"));
    addItems();
    ran = true;
    update();
}

const electronn = e => { elnncn += e; update(); }; // add e electron neutrinos to count
const electron = e => { elncn += e; update(); }; // add e electrons to count
const upq = e => { upcn += e; update(); }; // add e upquarks to count

function update() { // update all the matter counters!
    document.getElementById("elnncnt").innerHTML = toUnitName(elnncn), document.getElementById("elncnt").innerHTML = toUnitName(elncn), document.getElementById("upqcnt").innerHTML = toUnitName(upcn);
    for (var e = 0; e < runners.length; e++) runners[e]();
    if(elnncn >= 2) document.getElementById("adde").removeAttribute("disabled");
    if(elncn >= 5) document.getElementById("addup").removeAttribute("disabled")
    if(prestigeLevel >= 500 && !beatenGame) setTimeout(() => {
        document.querySelectorAll(".game").forEach(e => e.style.display = "none");
	document.body.style.backgroundColor = "black", document.querySelectorAll(".end").forEach(e => e.style.display = "block");
    }, 200);
    updatePerSecond();
    document.getElementById("prestigeButton").innerHTML = `Prestige for ${toUnitName(prestigeCalc(elncn, elnncn, upcn))} positrons`;
}
window.onload = () => { // once all the other things are ready
    beatenGame = "true" == localStorage.getItem("beaten_game");
    var to, x = 0;
    var warnings = 0;
    if (!ran) {
        var ucc = JSON.parse(localStorage.getItem("ucc"));
        elncn = blankToZero(ucc[0]);
	elnncn = blankToZero(ucc[1]);
	upcn = blankToZero(ucc[2]);
        tryOrLog(() => {
            var tmp = [];
            
	    toload = JSON.parse(localStorage.getItem("tl"))[0];
            for (var i = 0; i < toload.length; i++) {
                try {
                    eval(toload[i + 1]).interval();
		    tmp.push(eval(toload[i + 1]).name);
                } catch { warnings++; }
            }
            let unique = [...new Set(tmp)];
            for (var n = 0; n < tmp.length; n++) eval(toload[tmp.lastIndexOf(unique[n])]).buildUI();
        }, "weird error in onload !ran loop, this is probably fine", Levels.VERBOSE);
        addItems();
	load();
    }
    LoggerIso.logInfo(`${warnings} error(s) in try/catch, almost certainly fine`);
    if(elnncn === null) elnncn = 0;
    update();
    migrationProcessor(localStorage.getItem("version"));
    document.getElementById("titleHTML").innerHTML=`Isotopeia - ${mostRecentVersion}`;
    uniqueItems.forEach(e => e.refreshIntervals());
};
function addItems() { // load the jtopia upgrades
    for (var e = 0; e < hooks.length; e++) hooks[e].buildUI();
    update();
}
var actuallySave = true; // flag to actually save it
const confirmReset = () => { if(document.getElementById("resetcheckbox").checked) resetNoconfirm(); }
function resetNoconfirm() { // reset but don't ask for confirmation!
	actuallySave = false;
	localStorage.setItem("ucc", JSON.stringify([0, 0, 0]));
	localStorage.setItem("upg", JSON.stringify([0, 0, []])); 
	localStorage.setItem("cst", JSON.stringify([0, 0]));
	localStorage.setItem("tl", '[[""]]');
	localStorage.setItem("jtopia", stockBuildingsJsonStr); 
	localStorage.setItem("prestige", "0"); 
	localStorage.setItem("counts", "{}");
	localStorage.setItem("version", "v1.12.1");
	LoggerIso.logWarn("Resetting! This is irreversible without a save backup in Base64.");
	location.reload();
}
// autosaving!
window.onbeforeunload = () => {
   if(actuallySave) save();
}
function migrationProcessor(version) { // migrate from older versions
	if(version == null || version == undefined) { // oldest/pre-v1.10.0-->v1.11.0+ migration, these versions are really old, the commented solution works but can cause issues with NaN Ve counts
		LoggerIso.logWarn("Migrating from pre-v1.10.0 (resetting!)");
		resetNoconfirm();
		/*LoggerIso.logInfo("Migrating from v1.10.0...");
		countAll();
		LoggerIso.logInfo("Done!");*/
		return;
	}
	localStorage.setItem("version", mostRecentVersion);
	if(!buildingUpdateNeeded()) return;
	localStorage.setItem("jtopia", stockBuildingsJsonStr);
	return location.reload();
}

const getPriciestBuilding = (jsonData, type="en") => jsonData.buildings[type].sort((a,b) => b.price-a.price)[0]; // use with combineModBuildings

function combineModBuildings(modsArray) { // combine buildings attributes in JSON into 1 mod
    if(modsArray.length === 1) return modsArray[0];
    const buildings = modsArray.map(e => e.buildings);
    const newObj = {"buildings":{"en":[],"e":[],"u":[]}, "customBehaviors":""};
    Object.keys(buildings[0]).forEach(buildingType => {
        const buildingsOfType = modsArray.reduce((a,b) => [...a.buildings[buildingType],...b.buildings[buildingType]]);
        newObj.buildings[buildingType] = newObj.buildings[buildingType].concat(buildingsOfType.buildings[buildingType])
    });
    return newObj;
}
function buildingUpdateNeeded() { // do we need to migrate buildings to new version?
	if(localStorage.getItem("jtopia") === null) return true;
	const updatedBuildings = JSON.parse(stockBuildingsJsonStr)[0];
	const buildings = JSON.parse(localStorage.getItem("jtopia"))[0];
	const updatedPriciest = {"en": getPriciestBuilding(updatedBuildings, "en"), "e": getPriciestBuilding(updatedBuildings, "e"), "u": getPriciestBuilding(updatedBuildings, "u")}; 
	const priciest = {"en": getPriciestBuilding(buildings, "en"), "e": getPriciestBuilding(buildings, "e"), "u": getPriciestBuilding(buildings, "u")}; 
	return updatedPriciest.en.id != priciest.en.id
	   || updatedPriciest.e.id != priciest.e.id
	   || updatedPriciest.u.id != priciest.u.id; // TODO: add logic for mods which have pricier buildings, which breaks current method
}
const blankToZero = v => [null,undefined,NaN].includes(v) ? 0 : v;
const getPS = (obj,typ) => obj.buildings[typ].reduce((obj, item) => Object.assign(obj, {[item.id]: item.perSecond}), {});
const getGainWithCounts = (prices,counts) => Object.keys(prices).map(pID => blankToZero(prices[pID])*blankToZero(counts[pID])).reduce((a,b) => a+b);
const jtParsed = combineModBuildings(JSON.parse(localStorage.getItem("jtopia")));
const psEach = {
	"e": getPS(jtParsed, "e"),
	"en": getPS(jtParsed, "en"),
	"u": getPS(jtParsed, "u")
};
function updatePerSecond() {
	elnps = getGainWithCounts(psEach.e, buildingCounts)*(1+prestigeLevel);
	elnnps = getGainWithCounts(psEach.en, buildingCounts)*(1+prestigeLevel);
	upps = getGainWithCounts(psEach.u, buildingCounts)*(1+prestigeLevel);
	elnpc = 1+Math.floor(elnps / 15);
	elnnpc = 1+Math.floor(elnnps / 15);
	uppc = 1+Math.floor(upps / 15);
}

const toUnitName = amt => amt === 0 ? "0" : (`${(amt/Math.pow(10,Math.floor(Math.log10(Math.floor(amt))/3)*3)).toFixed(3)} ${unitList[Math.floor(Math.log10(Math.floor(amt))/3)]}`);
