/*
`{
	"buildings": {
		"e": [
			{
				"price": 1000000000000,
				"name": "Quantum photon simulator",
				"perSecond": 100000,
				"id": "quPhotonSimulator"
			}
		],
		"en": [
			{
				"price": 1000000000000,
				"name": "Quantum computer",
				"perSecond": 100000,
				"id": "quComputer"
			}
		],
		"u": [
			{
				"price": 1000,
				"name": "Up-quark simulator",
				"perSecond": 1000,
				"id": "upQuarkSimulator"
			}
		]
	},
	"subsidies": [
		{
			"price":100000000,
			"name":"Construction project contribution",
			"id":"constructionProjectContribution",
			"amount":100000000
		}
	]
}`
*/
var crs = 17;
function parseToJs(jsonStr) {
	var j;
	try {
		j = JSON.parse(localStorage.getItem("jtopia"));
		j.push(JSON.parse(jsonStr));
		localStorage.setItem("jtopia", JSON.stringify(j));
	} catch {
		localStorage.setItem("jtopia", "[]");
		return [];
	}
	var jsond = JSON.parse(jsonStr);
	var li = [];
	j.forEach((json) => {
		var b = json.buildings == null ? {e:[], en:[]} : json.buildings;
		var cb = json.customBehaviors;
		eval(cb);
		var eb = b.e;
		var enb = b.en;
		var ub = b.u;
		try{eb.forEach((i) => {
			console.log("adding modded eb "+i.id);
			var x=new BuildingE(i.price, i.name, i.perSecond, i.id, crs);
			hooks.push(x);
			li.push(x);
			crs++;
		});}catch{console.log("no modded eb found")}
		try{enb.forEach((i) => {
			console.log("adding modded enb "+i.id);
			var x=new BuildingEN(i.price, i.name, i.perSecond, i.id, crs);
			hooks.push(x);
			li.push(x);
			crs++;
		});}catch{console.log("no modded enb found")}
		try{ub.forEach((i) => {
			console.log("adding modded ub "+i.id);
			var x=new BuildingU(i.price, i.name, i.perSecond, i.id, crs);
			hooks.push(x);
			li.push(x);
			crs++;
		});}catch{console.log("no modded ub found")}
	})
	addItems();
	return li;
}
