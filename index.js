var elncn, elnncn, upcn, bch, cph, lpc, ph, gl, wf, wf2, taucn, tuncn, muocn, muncn, cphc, lepc, radx, rady, timesdone, dark = !1;

function init() {
    elncn = 0, elnncn = 0, upcn = 0, bch = 0, cph = 0, lpc = 0, ph = 0, gl = 0, wf = 0, wf2 = 0, taucn = 0, tuncn = 0, muocn = 0, muncn = 0, cphc = 500, lepc = 1e3, radx = 400, rady = 400, timesdone = 0
}
init();
var ele = document.getElementById("bcham"),
    ctx = ele.getContext("2d"),
    tosave = [],
    toload = [""],
    ran = !1,
    beatenGame = !1;

function save() {
    localStorage.setItem("ucc", [elncn, elnncn, upcn]), localStorage.setItem("upg", [cph, lpc, tosave]), localStorage.setItem("cst", [cphc, lepc]), localStorage.setItem("tl", "[" + JSON.stringify(toload) + "]"), localStorage.setItem("beaten_game", beatenGame ? "true" : "false"), localStorage.setItem("dark_mode", dark ? "true" : "false")
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
        [cph, lpc, tosave], "[" + JSON.stringify(toload) + "]",
        localStorage.getItem("prestige")
    ]))
}

function importSave(e) {
    var $ = JSON.parse(b64Decode(e));
    localStorage.setItem("ucc", $[0]), localStorage.setItem("upg", $[1]), localStorage.setItem("tl", $[2]);
    localStorage.setItem("prestige", $[3]);
    try {
        load()
    } catch {
        console.log("load error")
    }
    update()
}

function load() {
    var ucc = JSON.parse("[" + localStorage.getItem("ucc") + "]"),
        upg = JSON.parse("[" + localStorage.getItem("upg").slice(0, -1) + "]"),
        cst = JSON.parse("[" + localStorage.getItem("cst") + "]");
    beatenGame = "true" == localStorage.getItem("beaten_game"), (dark = "true" == localStorage.getItem("dark_mode")) ? document.body.classList.add("dark") : document.body.classList.remove("dark"), elncn = ucc[0], elnncn = ucc[1], upcn = ucc[2], ph = ucc[3], gl = ucc[4], wf = ucc[5], wf2 = ucc[6], taucn = ucc[7], tuncn = ucc[8], muocn = ucc[9], muncn = ucc[10], cph = upg[0], lpc = upg[1], cphc = cst[0], lepc = cst[1];
    try {
        toload =  JSON.parse(localStorage.getItem("tl"))[0];
        for (var i = 1; i < toload.length; i++) try {
            var tlR = eval(toload[i]);
            tlR.interval(), tlR.buildUI(), tlR.refreshCount()
        } catch (e) {
            console.log(e.message)
        }
    } catch (e) {
        console.log(e.message), console.log("toload error")
    }
    hooks = parseToJs(localStorage.getItem("jtopia")), addItems(), ran = !0, update()
}

function ellipse(e, $, t, n, a) {
    e.save(), e.beginPath(), e.translate($ - n, t - a), e.scale(n, a), e.arc(1, 1, 1, 0, 2 * Math.PI, !1), e.restore(), e.stroke()
}

function electronn(e) {
    bch <= 16 && window.setTimeout(function() {
        radx && rady <= 0 ? (ctx.fillStyle = "#FFFFFF", ctx.strokeStyle = "#FFFFFF", ctx.clearRect(0, 0, 500, 500), radx = 450, rady = 450, timesdone++) : (ctx.fillStyle = "", ctx.strokeStyle = "#0000FF", radx -= 25, rady -= 25), ellipse(ctx, 250, 250, radx, rady)
    }, 1e3), elnncn += e, update()
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

function addEnItems() {
    new BuildingEN(100, "Bubble chamber", 1, "bubbleChamber", 0).buildUI(), new BuildingEN(500, "Particle accelerator", 5, "particleAccel", 1).buildUI(), new BuildingEN(5e3, "Upgraded laboratory", 50, "upgradedLab", 2).buildUI(), new BuildingEN(5e4, "Fume hood", 5e3, "fumeHood", 3).buildUI(), new BuildingEN(5e7, "Extraterrestrial research facility", 1e11, "eTRF", 8).buildUI(), new BuildingEN(5e14, "Microcellular automata", 1e15, "mCA", 9).buildUI(), new BuildingEN(5e16, "Hawking radiation simulation chamber", 1e18, "hRSC", 10).buildUI(), new BuildingEN(5e20, "Black hole simulation chamber", 1e20, "bHSC", 11).buildUI()
}

function addEItems() {
    new BuildingE(100, "Radioactive beta decay machine", 1, "rBDM", 4).buildUI(), new BuildingE(1e3, "Oudin coil", 10, "oudinCoil", 5).buildUI(), new BuildingE(1e4, "Tesla coil", 1e3, "teslaCoil", 6).buildUI(), new BuildingE(1e5, "Marx generator", 5e5, "marxGen", 7).buildUI()
}

function addUItems() {
    new BuildingU(10, "Quark generator", 10, "quarkGenerator", 12).buildUI(), new BuildingU(1e3, "Matter converter", 1e3, "matterConverter", 13).buildUI(), new BuildingU(1e5, "Quark simulator", 1e5, "quarkSimulator", 14).buildUI(), new BuildingU(1e6, "Quark fusor", 1e10, "quarkFusor", 15).buildUI(), new BuildingU(2e14, "Quark collision chamber", 1e16, "bQCC", 17).buildUI()
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
            elnncn = ucc[1], toload = JSON.parse(localStorage.getItem("tl"))[0];
            for (var i = 0; i < toload.length; i++) {
                "," == toload[0] && (toload = toload);
                try {
                    eval(toload[i + 1]).interval(), tmp.push(eval(toload[i + 1]).name)
                } catch {}
            }
            let unique = [...new Set(tmp)];
            console.log(unique);
            for (var n = 0; n < tmp.length; n++) eval(toload[tmp.lastIndexOf(unique[n])]).buildUI()
        } catch {}
        addItems()
    }
    null == elnncn && (elnncn = 0), update()
};
var hooks = [];

function addItems() {
    addEnItems(), addEItems(), addUItems();
    for (var e = 0; e < hooks.length; e++) hooks[e].buildUI();
    update()
}
var actuallySave = true;
function confirmReset() {
    actuallySave = false;
    confirm("Are you sure you want to reset the game? This is irreversible.") && (localStorage.setItem("ucc", [0, 0, 0]), localStorage.setItem("upg", [0, 0, []]), localStorage.setItem("cst", [0, 0]), localStorage.setItem("tl", '[[""]]'), localStorage.setItem("jtopia", "[]"), localStorage.setItem("prestige", "0"), location.reload())
}
// autosaving!
window.onbeforeunload = function(){
   if(actuallySave) save();
}
