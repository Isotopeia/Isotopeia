var intervals = [];
var prestigeCalc = (eln, elnn, up) => Math.max(Math.floor(eln/1e20+elnn/1.5e21+up/1e22),0);
const calculatePriceIter = price => Math.floor(1.25 * price);
const clearForReset = () => intervals.forEach(window.clearInterval);
const clearUpgrades = () => document.getElementById("upgr").innerHTML = `<h1>Upgrades</h1><input type="number" placeholder="Buy #" id="buyAmount" class="blackcol oxygen buy-number" value="1" />`;
/**
 * @function
 * @param{number} initPrice - The starting the price of the building (as defined in the .json file)
 * @param{number} purchased - The number of buildings to purchase for the resulting price.
 */
const calculatePrice = (initPrice, purchased) => { // run floor(1.25*initPrice) purchased times, we can't do 1.25^initPrice since I want it to be floor'd every time.
	let newPrice = initPrice;
	for (let _ = 0; _ < purchased; _++) newPrice = calculatePriceIter(newPrice);
	return newPrice;
}
/**
 * @function
 * Confirms if you want to prestige, and then does it if you click Yes. This resets most things!
 */
function confirmPrestige() {
	save();
	clearForReset();
	clearUpgrades();
	actuallySave = false;
	localStorage.setItem("ucc", JSON.stringify([0, 0, 0]));
	localStorage.setItem("upg", JSON.stringify([0, 0, []]));
	localStorage.setItem("cst", JSON.stringify([0, 0]));
	localStorage.setItem("tl", '[[""]]');
	localStorage.setItem("counts", "{}");
	localStorage.setItem("jtopia",stockBuildingsJsonStr);
	localStorage.setItem("prestige", (localStorage.getItem("prestige") == null ? prestigeCalc(elncn, elnncn, upcn) : parseInt(localStorage.getItem("prestige")) + prestigeCalc(elncn, elnncn, upcn)).toLocaleString('fullwide', {
		useGrouping: false
	}));
	parseToJs(stockBuildingsJsonStr);
	load();
	prestigeLevel = JSON.parse(localStorage.getItem("prestige"));
	document.getElementById("prestigeval").innerHTML = toUnitName(prestigeLevel);

}
var prestigeLevel = localStorage.getItem("prestige") == null ? 0 : parseInt(localStorage.getItem("prestige"));
/*
document.getElementById("statsid").innerHTML += `
	<h2>Prestige</h2>
 	Positrons: 
  	<span id='prestigeval'>0</span> <br />
   	<input type='checkbox' onclick='if(this.checked) { prestigeButton.removeAttribute("disabled"); } else { prestigeButton.setAttribute("disabled", ""); }' />
    	<button disabled class='oxygen blackcol' id='prestigeButton' onclick='confirmPrestige();'>Prestige for poistrons</button>`;
*/
onloadHooks.push(() => { document.getElementById("prestigeval").innerHTML = `${toUnitName(prestigeLevel)} (+${toUnitName(prestigeLevel)}% boost)`; });

const getCounts = id => buildingCounts[id] == undefined ? 0 : buildingCounts[id];

function countAll() {
	var count = 0;
	try {
		toload.forEach((e) => {
			var x = e.replace(/(new Building[A-Z]+)?/g, "")
			//console.log("["+x.replace(/\'/g, "\"").substring(1, x.length-1)+"]"
			const id = JSON.parse("[" + x.replace(/\'/g, "\"").substring(1, x.length - 1) + "]")[3];
			if (getCounts(id) == undefined) buildingCounts[id] = 0;
			buildingCounts[id]++;
			count++;
		});
	} catch {}
	return count;
}
class BuildingEN {
	/**
 	 * @constructor
         * Electron neutrino building
   	 * @param {number} price - The starting price of the building.
         * @param {string} name - The sentence-case name of the building (not id!).
	 * @param {string} ps - The per second gain of 1 building (like CPS in Cookie Clicker).
  	 * @param {string} id - The camelCase-formatted version of name.
    	 * @param {number} rspot - INTERNAL: the index of the building in lists. Automatically generated by jtopia.
         */
	constructor(price, name, ps, id, rspot) { 
		this.price = price;
		this.initPrice = price;
		this.name = name;
		this.ps = ps;
		this.id = id;
		this.rspot = rspot;
		this.count = getCounts(this.id);
		runners.push(() => {
			if (elnncn >= this.price - (this.price / 4)) {
				try {
					document.getElementById(id).style.display = "block";
					document.getElementById(id + "2").style.display = "block";
				} catch {

				}
			}
			if (elnncn >= this.price) {
				try {
					document.getElementById(id).removeAttribute("disabled");
				} catch {

				}
			}
		});
		if (buildingCounts[this.id] == undefined) buildingCounts[this.id] = 0;
	}
	/**
         * @method
	 * Buy n buildings of this type, if you have the currency that is.
         * @param {number} [n=1] - How many buildings to buy.
	 */
	buy(n = 1) {
		this.refreshCount();
		var gg = 0;
		for (var i = 0; i < n; i++) {
			if (elnncn >= this.price) {
				elnncn -= this.price;
				this.price = calculatePrice(this.initPrice, this.count);
				document.getElementById(this.id + "uc").innerHTML = `${toUnitName(calculatePrice(this.initPrice,this.count))} V<sub>e</sub> | Count: ${this.count}`;
				document.getElementById(this.id).setAttribute("onclick", `new BuildingEN(${this.initPrice}, '${this.name}', ${this.ps}, '${this.id}').buy(parseInt(buyAmount.value));  update();`);
				this.interval();
				buildingCounts[this.id]++;
				tosave[this.rspot]++;
				this.refreshCount();
				toload.push(`new BuildingEN(${this.initPrice}, '${this.name}', ${this.ps}, '${this.id}')`);
				save();
				gg++;
			} else {
				console.log("not enough");
				return this.refreshCount();
			}
		}
	}
	/**
         * @method
	 * Creates an interval that updates your currency, and adds it to the total counter.
  	 */
	interval() {
		intervals.push(window.setInterval(() => {
			electronn(this.ps * Math.floor(1 + (prestigeLevel/100)));
			update();
		}, 1000));
	}
	/**
         * @method
	 * Creates the UI of a building.
  	 * @param {boolean} [isModded=false] Is this building from a mod? Always true, but defaults to false.
         */
	buildUI(isModded = false) {
		if (!(document.getElementById(this.id) == null || isModded)) return;
		document.getElementById("upgr").innerHTML += `<p>
    <button class="purchasable" id="${this.id}" disabled onclick=" new BuildingEN(${calculatePrice(this.initPrice,this.count)}, '${this.name}', ${this.ps}, '${this.id}').buy(parseInt(buyAmount.value));  update();" style="display: none;">${this.name}</button>
    <p id="${this.id}2" style="display: none;">Cost: <span id="${this.id}uc">${toUnitName(this.price)} V<sub>e</sub> | Count: ${this.count}</span></p>
    </p>`;
	}
	/**
 	 * @method
   	 * Refresh the internal count of how many of this building you have, while also updating the counter in HTML.
         */
	refreshCount() {
		this.count = getCounts(this.id);
		this.price = calculatePrice(this.initPrice, this.count);
		document.getElementById(this.id + "uc").innerHTML = `${toUnitName(calculatePrice(this.initPrice,this.count))} V<sub>e</sub> | Count: ${this.count}`;
	}
	/**
         * @method
	 * Adds an interval for each of this building you have. This method DOES NOT clear existing intervals of this building, or of any type!
         */
	refreshIntervals() {
		this.refreshCount();
		for (var i = 0; i < this.count; i++) this.interval();
	}
}
class BuildingE {
	/**
 	 * @constructor
         * Electron building
   	 * @param {number} price - The starting price of the building.
         * @param {string} name - The sentence-case name of the building (not id!).
	 * @param {string} ps - The per second gain of 1 building (like CPS in Cookie Clicker).
  	 * @param {string} id - The camelCase-formatted version of name.
    	 * @param {number} rspot - INTERNAL: the index of the building in lists. Automatically generated by jtopia.
         */
	constructor(price, name, ps, id, rspot) {
		this.price = price;
		this.initPrice = price;
		this.name = name;
		this.ps = ps;
		this.id = id;
		this.rspot = rspot;
		this.count = getCounts(this.id);
		runners.push(() => {
			if (elncn >= this.price - (this.price / 4)) {
				try {
					document.getElementById(id).style.display = "block";
					document.getElementById(id + "2").style.display = "block";
				} catch {

				}
			}
			if (elncn >= this.price) {
				try {
					document.getElementById(id).removeAttribute("disabled");
				} catch {

				}
			}
		});
		if (buildingCounts[this.id] == undefined) buildingCounts[this.id] = 0;
	}

	/**
         * @method
	 * Buy n buildings of this type, if you have the currency that is.
         * @param {number} [n=1] - How many buildings to buy.
	 */
	buy(n = 1) {
		this.refreshCount();
		var gg = 0;
		for (var i = 0; i < n; i++) {
			if (elncn >= this.price) {
				elncn -= this.price;
				this.price = calculatePrice(this.initPrice, this.count);
				document.getElementById(this.id + "uc").innerHTML = `${toUnitName(calculatePrice(this.initPrice,this.count))} e<sup>-</sup> | Count: ${this.count}`;
				document.getElementById(this.id).setAttribute("onclick", `new BuildingE(${this.initPrice}, '${this.name}', ${this.ps}, '${this.id}').buy(parseInt(buyAmount.value));  update();`);
				this.interval();
				buildingCounts[this.id]++;
				tosave[this.rspot] += 1;
				this.refreshCount();
				toload.push(`new BuildingE(${this.initPrice}, '${this.name}', ${this.ps}, '${this.id}')`);
				gg++;
			} else {
				console.log("not enough");
				return this.refreshCount();

			}
		}
	}
	/**
         * @method
	 * Creates an interval that updates your currency, and adds it to the total counter.
  	 */
	interval() {
		intervals.push(window.setInterval(() => {
			elncn += this.ps * Math.floor(1 + (prestigeLevel/100));
			update();
		}, 1000));
	}
	/**
         * @method
	 * Creates the UI of a building.
  	 * @param {boolean} [isModded=false] Is this building from a mod? Always true, but defaults to false.
         */
	buildUI(isModded = false) {
		if (!(document.getElementById(this.id) == null || isModded)) return;
		document.getElementById("upgr").innerHTML += `<p>
		<button class="purchasable" id="${this.id}" disabled onclick="new BuildingE(${this.initPrice}, '${this.name}', ${this.ps}, '${this.id}').buy(parseInt(buyAmount.value));  update();" style="display: none;">${this.name}</button>
		<p id="${this.id}2" style="display: none;">Cost: <span id="${this.id}uc">${toUnitName(calculatePrice(this.initPrice,this.count))} e<sup>-</sup> | Count: ${this.count}</span></p>
		</p>`;
	}
	/**
 	 * @method
   	 * Refresh the internal count of how many of this building you have, while also updating the counter in HTML.
         */
	refreshCount() {
		this.count = getCounts(this.id);
		this.price = calculatePrice(this.initPrice, this.count);
		document.getElementById(this.id + "uc").innerHTML = `${toUnitName(calculatePrice(this.initPrice,this.count))} e<sup>-</sup> | Count: ${this.count}`;
	}
	/**
         * @method
	 * Adds an interval for each of this building you have. This method DOES NOT clear existing intervals of this building, or of any type!
         */
	refreshIntervals() {
		this.refreshCount();
		for (var i = 0; i < this.count; i++) this.interval();
	}
}
class BuildingU {
	/**
 	 * @constructor
         * Up quark building
   	 * @param {number} price - The starting price of the building.
         * @param {string} name - The sentence-case name of the building (not id!).
	 * @param {string} ps - The per second gain of 1 building (like CPS in Cookie Clicker).
  	 * @param {string} id - The camelCase-formatted version of name.
    	 * @param {number} rspot - INTERNAL: the index of the building in lists. Automatically generated by jtopia.
         */
	constructor(price, name, ps, id, rspot) {
		this.price = price;
		this.initPrice = price;
		this.name = name;
		this.ps = ps;
		this.id = id;
		this.rspot = rspot
		this.count = getCounts(this.id);
		runners.push(() => {
			if (upcn >= this.price - (this.price / 4)) {
				try {
					document.getElementById(id).style.display = "block";
					document.getElementById(id + "2").style.display = "block";
				} catch {

				}
			}
			if (upcn >= this.price) {
				try {
					document.getElementById(id).removeAttribute("disabled");
				} catch {

				}
			}
		});
		if (buildingCounts[this.id] == undefined) buildingCounts[this.id] = 0;
	}
	/**
         * @method
	 * Buy n buildings of this type, if you have the currency that is.
         * @param {number} [n=1] - How many buildings to buy.
	 */
	buy(n = 1) {
		this.refreshCount();
		var gg = 0;
		for (var i = 0; i < n; i++) {
			if (upcn >= this.price) {
				upcn -= this.price;
				this.price = calculatePrice(this.initPrice, this.count);
				document.getElementById(this.id + "uc").innerHTML = `${toUnitName(calculatePrice(this.initPrice,this.count))} u | Count: ${this.count}`;
				document.getElementById(this.id).setAttribute("onclick", `new BuildingU(${this.initPrice}, '${this.name}', ${this.ps}, '${this.id}').buy(parseInt(buyAmount.value));  update();`);
				this.interval();
				buildingCounts[this.id]++;
				tosave[this.rspot] += 1;
				this.refreshCount();
				toload.push(`new BuildingU(${this.initPrice}, '${this.name}', ${this.ps}, '${this.id}')`);
				gg++;
			} else {
				console.log("not enough");
				return this.refreshCount();
			}
		}
	}
	/**
         * @method
	 * Creates an interval that updates your currency, and adds it to the total counter.
  	 */
	interval() {
		intervals.push(window.setInterval(() => {
			upcn += this.ps * Math.floor(1 + (prestigeLevel/100));
			update();
		}, 1000));
	}
	/**
         * @method
	 * Creates the UI of a building.
  	 * @param {boolean} [isModded=false] Is this building from a mod? Always true, but defaults to false.
         */
	buildUI(isModded = false) {
		if (!(document.getElementById(this.id) == null || isModded)) return;
		document.getElementById("upgr").innerHTML += `<p>
		<button class="purchasable" id="${this.id}" disabled onclick=" new BuildingU(${this.initPrice}, '${this.name}', ${this.ps}, '${this.id}').buy(parseInt(buyAmount.value));  update();" style="display: none;">${this.name}</button>
		<p id="${this.id}2" style="display: none;">Cost: <span id="${this.id}uc">${toUnitName(calculatePrice(this.initPrice,this.count))} u | Count: ${this.count}</span></p>
		</p>`;
	}
	/**
 	 * @method
   	 * Refresh the internal count of how many of this building you have, while also updating the counter in HTML.
         */
	refreshCount() {
		this.count = getCounts(this.id);
		this.price = calculatePrice(this.initPrice, this.count);
		document.getElementById(this.id + "uc").innerHTML = `${toUnitName(calculatePrice(this.initPrice,this.count))} u | Count: ${this.count}`;
	}
	/**
         * @method
	 * Adds an interval for each of this building you have. This method DOES NOT clear existing intervals of this building, or of any type!
         */
	refreshIntervals() {
		this.refreshCount();
		for (var i = 0; i < this.count; i++) this.interval();
	}
}
