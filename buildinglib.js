var prestigeCalc = (eln,elnn,up) => Math.max(Math.floor(Math.log(1+Math.pow(10,-5*Math.E)*elnn)+Math.log(1+Math.pow(10,-2.5*Math.E)*eln)+Math.log(1+Math.pow(10,-7*Math.E)*up)),0);

const calculatePriceIter = price => Math.floor(1.25*price);
const calculatePrice = (initPrice,purchased) => {
	let newPrice = initPrice;
	for(let _ =0; _<purchased; _++) newPrice = calculatePriceIter(newPrice);
	return newPrice;
}
function confirmPrestige() {
    if(confirm("Are you sure you want to prestige? This is irreversible and you will gain "+prestigeCalc(elncn,elnncn,upcn).toString()+" prestige points.")) {
        actuallySave=false;
        localStorage.setItem("ucc", [0,0,0])
        localStorage.setItem("upg", [0, 0, []])
        localStorage.setItem("cst", [0, 0])
        localStorage.setItem("tl", '[[""]]')
        localStorage.setItem("jtopia", stockBuildingsJsonStr);
	localStorage.setItem("counts", "{}")
        localStorage.setItem("prestige", (localStorage.getItem("prestige") == null ? prestigeCalc(elncn,elnncn,upcn) :  parseInt(localStorage.getItem("prestige"))+prestigeCalc(elncn,elnncn,upcn)).toLocaleString('fullwide', {useGrouping:false}));
        location.reload();
    }
    
}
var prestigeLevel = localStorage.getItem("prestige") == null ? 0 : parseInt(localStorage.getItem("prestige"));

document.getElementById("statsid").innerHTML+="<h2>Prestige</h2> Positrons: <span id='prestigeval'>0</span><br /><button class='oxygen blackcol' onclick='confirmPrestige();'>Prestige for poistrons</button>";

document.getElementById("prestigeval").innerHTML=prestigeLevel;

const getCounts = id => buildingCounts[id] == undefined ? 0 : buildingCounts[id];

function countAll() {
	var count = 0;
	try{toload.forEach((e)=>{
		var x = e.replace(/(new Building[A-Z]+)?/g, "")
		//console.log("["+x.replace(/\'/g, "\"").substring(1, x.length-1)+"]"
		const id = JSON.parse("["+x.replace(/\'/g, "\"").substring(1, x.length-1)+"]")[3];
		if(getCounts(id)==undefined) buildingCounts[id]=0;
		buildingCounts[id]++;
		count++;
	});}catch{}
	return count;
}
class BuildingEN {
    constructor(price, name, ps, id, rspot) {
        this.price = price;
		this.initPrice = price;
        this.name = name;
        this.ps = ps;
        this.id = id;
		this.rspot = rspot;
		this.count = getCounts(this.id);
        runners.push(() => {
            if(elnncn >= this.price-(this.price/4)) {
				try {
                	document.getElementById(id).style.display="block";
                	document.getElementById(id+"2").style.display="block";
				} catch {
					
				}
            }
            if(elnncn >= this.price) {
				try {
                	document.getElementById(id).removeAttribute("disabled");
				} catch {
					
				}
	    }
	});
	if(buildingCounts[this.id]==undefined) buildingCounts[this.id]=0;
    }
    buy(n = 1) {
	this.refreshCount();
        var gg=0;
        for(var i=0; i<n; i++) {
            if(elnncn >= this.price) {
                elnncn -= this.price;
                this.price = calculatePrice(this.initPrice,this.count);
                document.getElementById(this.id+"uc").innerHTML = `${calculatePrice(this.initPrice,this.count)} V<sub>e</sub> | Count: ${this.count}`;
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
    interval() {
        window.setInterval(() => {
            electronn(this.ps*Math.floor(1+(prestigeLevel)));
            update();
        },1000);
    }
    buildUI(isModded = false) {
        if(document.getElementById(this.id) == null || isModded) {
            document.getElementById("upgr").innerHTML+=`<p>
            <button id="${this.id}" disabled onclick=" new BuildingEN(${calculatePrice(this.initPrice,this.count)}, '${this.name}', ${this.ps}, '${this.id}').buy(parseInt(buyAmount.value));  update();" style="display: none;">${this.name}</button>
            <p id="${this.id}2" style="display: none;">Cost: <span id="${this.id}uc">${this.price} V<sub>e</sub> | Count: ${this.count}</span></p>
            </p>`;
        }
    }
	refreshCount() {
		this.count = getCounts(this.id);
		this.price = calculatePrice(this.initPrice, this.count);
		document.getElementById(this.id+"uc").innerHTML = `${calculatePrice(this.initPrice,this.count)} V<sub>e</sub> | Count: ${this.count}`;
	}
   refreshIntervals() {
	this.refreshCount();
	for(var i=0; i<this.count; i++) this.interval();
   }
}
class BuildingE {
    constructor(price, name, ps, id, rspot) {
        this.price = price;
		this.initPrice = price;
        this.name = name;
        this.ps = ps;
        this.id = id;
		this.rspot = rspot;
		this.count = getCounts(this.id);
        runners.push(() => {
            if(elncn >= this.price-(this.price/4)) {
				try {
                	document.getElementById(id).style.display="block";
                	document.getElementById(id+"2").style.display="block";
				} catch {
					
				}
            }
            if(elncn >= this.price) {
				try {
                	document.getElementById(id).removeAttribute("disabled");
				} catch {
					
				}
			}
        });
	if(buildingCounts[this.id]==undefined) buildingCounts[this.id]=0;
    }
    buy(n = 1) {
	this.refreshCount();
        var gg=0;
        for(var i=0; i<n; i++) {
            if(elncn >= this.price) {
                elncn -= this.price;
                this.price = calculatePrice(this.initPrice,this.count);
                document.getElementById(this.id+"uc").innerHTML = `${calculatePrice(this.initPrice,this.count)} e<sup>-</sup> | Count: ${this.count}`;
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
    interval() {
        window.setInterval(() => {
            elncn += this.ps*Math.floor(1+(prestigeLevel));
            update();
        },1000);
    }
    buildUI(isModded = false) {
		if(document.getElementById(this.id) == null || isModded) {
			document.getElementById("upgr").innerHTML+=`<p>
			<button id="${this.id}" disabled onclick=" new BuildingE(${this.initPrice}, '${this.name}', ${this.ps}, '${this.id}').buy(parseInt(buyAmount.value));  update();" style="display: none;">${this.name}</button>
			<p id="${this.id}2" style="display: none;">Cost: <span id="${this.id}uc">${calculatePrice(this.initPrice,this.count)} e<sup>-</sup> | Count: ${this.count}</span></p>
			</p>`;
		}
    }
    refreshCount() {
	    this.count = getCounts(this.id);
	    this.price = calculatePrice(this.initPrice, this.count);
	    document.getElementById(this.id+"uc").innerHTML = `${calculatePrice(this.initPrice,this.count)} e<sup>-</sup> | Count: ${this.count}`;
	}	
   refreshIntervals() {
	this.refreshCount();
	for(var i=0; i<this.count; i++) this.interval();
   }
}
class BuildingU {
    constructor(price, name, ps, id, rspot) {
		this.price = price;
		this.initPrice = price;
		this.name = name;
		this.ps = ps;
		this.id = id;
		this.rspot = rspot		
		this.count = getCounts(this.id);        
		runners.push(() => {
				if(upcn >= this.price-(this.price/4)) {
					try {
						document.getElementById(id).style.display="block";
						document.getElementById(id+"2").style.display="block";
					} catch {
						
					}
				}
				if(upcn >= this.price) {
					try {
						document.getElementById(id).removeAttribute("disabled");
					} catch {
						
					}
				}
			});
		if(buildingCounts[this.id]==undefined) buildingCounts[this.id]=0;
    }
    buy(n = 1) {
	this.refreshCount();
        var gg=0;
        for(var i=0; i<n; i++) {
            if(upcn >= this.price) {
                upcn -= this.price;
                this.price = calculatePrice(this.initPrice,this.count);
                document.getElementById(this.id+"uc").innerHTML = `${calculatePrice(this.initPrice,this.count)} u | Count: ${this.count}`;
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
    interval() {
        window.setInterval(() => {
            upcn += this.ps*Math.floor(1+(prestigeLevel));
            update();
        },1000);
    }
    buildUI(isModded = false) {
		if(document.getElementById(this.id) == null || isModded) {
			document.getElementById("upgr").innerHTML+=`<p>
			<button id="${this.id}" disabled onclick=" new BuildingU(${this.initPrice}, '${this.name}', ${this.ps}, '${this.id}').buy(parseInt(buyAmount.value));  update();" style="display: none;">${this.name}</button>
			<p id="${this.id}2" style="display: none;">Cost: <span id="${this.id}uc">${calculatePrice(this.initPrice,this.count)} u | Count: ${this.count}</span></p>
			</p>`;
		}
    }
    refreshCount() {
		this.count = getCounts(this.id);
	    	this.price = calculatePrice(this.initPrice, this.count);
	    document.getElementById(this.id+"uc").innerHTML = `${calculatePrice(this.initPrice,this.count)} u | Count: ${this.count}`;
	}
	refreshIntervals() {
		this.refreshCount();
		for(var i=0; i<this.count; i++) this.interval();
	   }
}
