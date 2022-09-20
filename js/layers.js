addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		prestige: new Decimal(0),
		pprestige: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade("p", 13)) mult = mult.times(upgradeEffect("p", 13)) 
		if (hasUpgrade("p", 21)) mult = mult.times(upgradeEffect("p", 21)) 
		if (hasUpgrade("p", 23)) mult = mult.times(4) 
		if (hasUpgrade("p", 54)) mult = mult.times(upgradeEffect("p", 54)) 
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
		    effect() {
        if (!hasUpgrade("p", 41) && (hasUpgrade("p", 31)))
            return new Decimal(0.1);
        let eff = Decimal.pow(1);
		if (hasUpgrade("p", 42)) eff = eff.times(upgradeEffect("p", 42))
		if (hasUpgrade("p", 43)) eff = eff.times(upgradeEffect("p", 43))
		if (hasUpgrade("p", 44)) eff = eff.times(upgradeEffect("p", 44))
		if (hasUpgrade("p", 51)) eff = eff.add(upgradeEffect("p", 51))
		if (hasUpgrade("p", 52)) eff = eff.times(upgradeEffect("p", 52))
		if (hasUpgrade("p", 53)) eff = eff.times(upgradeEffect("p", 53))
		if (hasUpgrade("p", 61)) eff = eff.times(upgradeEffect("p", 61))
		if (hasUpgrade("p", 62)) eff = eff.times(upgradeEffect("p", 62))
		if (hasUpgrade("p", 63)) eff = eff.times(upgradeEffect("p", 63))
		if (hasUpgrade("p", 64)) eff = eff.times(upgradeEffect("p", 64))
        return eff;
    },
			    effect2() {
        if (!player.p.buyables[11].gte(1) && (hasUpgrade("p", 32)))
            return new Decimal(0.1);
        let eff = Decimal.pow(1);
	 if (player.p.buyables[11].gte(1)) eff = eff.times(buyableEffect("p", 11));
	 if (player.p.buyables[12].gte(1)) eff = eff.times(buyableEffect("p", 12));
	 if (player.p.buyables[13].gte(1)) eff = eff.times(buyableEffect("p", 13));
	 if (player.p.buyables[14].gte(1)) eff = eff.times(buyableEffect("p", 14));
	 if (player.p.buyables[15].gte(1)) eff = eff.times(buyableEffect("p", 15));
	 if (player.p.buyables[16].gte(1)) eff = eff.times(buyableEffect("p", 16));
	 if (player.p.buyables[17].gte(1)) eff = eff.times(buyableEffect("p", 17));
	 if (player.p.buyables[18].gte(1)) eff = eff.times(buyableEffect("p", 18));
        return eff;
    },
	        tabFormat: [
        "main-display",
        "prestige-button",
        ["microtabs", "stuff"],
        ["blank", "25px"],
    ],
	microtabs: {
    stuff: {
                    "Prestige": {
                content: [
                    ["blank", "15px"],
                    ["upgrades", [1,2,3,7,8]]
                ]
            },
			                    "Prestige-Prestige": {
									unlocked() {return (hasUpgrade("p", 31))},
                content: [ 
                    ["blank", "15px"],
					["display-text", () => "You have " + format(player.p.prestige) + " Prestige-Prestige. <br> You are gaining " + formatWhole(tmp.p.effect) + " Prestige-Prestige/s"],
                    ["upgrades", [4,5,6]]	
				]		
            },
						                    "Prestige-Prestige-Prestige-Prestige": {
									unlocked() {return (hasUpgrade("p", 32))},
                content: [ 
                    ["blank", "15px"],
					["display-text", () => "You have " + format(player.p.pprestige) + " Prestige-Prestige-Prestige-Prestige. <br> You are gaining " + format(tmp.p.effect2) + " Prestige-Prestige-Prestige-Prestige/s"],
                    ["buyables", [1,2]]	
				]		
            },
	},
	},
	upgrades: {
        11: {
            title: "The First Upgrade",
            description: "Double point gain",
            cost: new Decimal(1),
            unlocked() { return true },// Add formatting to the effect
        },
		        12: {
            title: "Powerness",
            description: "Prestige Point boosts point gain",
            cost: new Decimal(5),
            unlocked() { return true },// Add formatting to the effect
			effect() {return player.p.points.pow(0.65).max(1).min(100)},
			effectDisplay() {return format(upgradeEffect("p", 12)) + "x"},
        },
				        13: {
            title: "Limit Break",
            description: "Points boosts prestige gain",
            cost: new Decimal(20),
            unlocked() { return true },// Add formatting to the effect
			effect() {return player.points.pow(0.25).max(1).min(10)},
			effectDisplay() {return format(upgradeEffect("p", 13)) + "x"},
        },
						        21: {
            title: "Evolution 2★",
            description: "Each upgrade boost prestige point gain",
            cost: new Decimal(80),
            unlocked() { return true },// Add formatting to the effect
			effect() {let ret = Decimal.pow(1.4, player.p.upgrades.length).max(1)
			return ret},
			effectDisplay() {return  format(upgradeEffect("p", 21)) + "x"},
        },
								        22: {
            title: "Evolution 3★",
            description: "Apply <b>Powerness</b> effect to point gain at reduced rate.",
            cost: new Decimal(600),
            unlocked() { return true },// Add formatting to the effect
			effectDisplay() {return format(upgradeEffect("p", 12).div(3.5).max(1)) + "x"},
        },
										        23: {
            title: "Evolution 4★",
            description: "Boost Prestige point gain by amount of Evolution stars on this upgrade.",
            cost: new Decimal(36000),
            unlocked() { return true },// Add formatting to the effect
			effectDisplay() {return "4.00x"},
        },
				31: {
            title: "Evolution 5★",
            description: "Unlock new tab",
            cost: new Decimal(240000),
            unlocked() { return true },// Add formatting to the effect
        },
						32: {
            title: "Evolution 1✪",
            description: "Unlock a new tab",
            cost: new Decimal(1e24),
            unlocked() { return true },
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
                currencyLayer: "p",// Add formatting to the effect// Add formatting to the effect
        },
								33: {
            title: "Evolution 2✪",
            description: "Unlock a new layer",
            cost: new Decimal(1e175),
            unlocked() { return true },
				currencyDisplayName: "P-P-P-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "pprestige", // Use if using a nonstandard currency
                currencyLayer: "p",// Add formatting to the effect// Add formatting to the effect
        },
						41: {
            title: "★",
            description: "Boost Prestige-Prestige gain up to 1/s",
            cost: new Decimal(2.5),
            unlocked() { return true },
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
                currencyLayer: "p",// Add formatting to the effect
        },
								42: {
            title: "★★",
            description: "Self-boost Prestige-Prestige gain at reduced rate",
            cost: new Decimal(20),
						effect() {return player.p.prestige.pow(0.85).max(1).min(5)},
            unlocked() { return true },
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
                currencyLayer: "p",
							effectDisplay() {return  format(upgradeEffect("p", 42)) + "x"},// Add formatting to the effect
        },
										43: {
            title: "★★★",
            description: "Self-boost Prestige-Prestige gain at reduced rate",
            cost: new Decimal(340),
						effect() {return player.p.prestige.pow(1.35).max(1).min(15)},
            unlocked() { return true },
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
                currencyLayer: "p",
							effectDisplay() {return  format(upgradeEffect("p", 43)) + "x"},// Add formatting to the effect
        },
												44: {
            title: "★★★★",
            description: "Self-boost Prestige-Prestige by all P-P upgrades effects at once",
            cost: new Decimal(3375),
						effect() {return player.p.prestige.pow(1.35).max(1).min(75)},
            unlocked() { return true },
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
                currencyLayer: "p",
							effectDisplay() {return  format(upgradeEffect("p", 44)) + "x"},// Add formatting to the effect
        },
														51: {
            title: "☆",
            description: "Self-boost Prestige-Prestige by Prestige points amount",
            cost: new Decimal(196875),
						effect() {return player.p.points.max(1)},
            unlocked() { return true },
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
                currencyLayer: "p",
							effectDisplay() {return  "+" + format(upgradeEffect("p", 51)) },// Add formatting to the effect
        },
														52: {
            title: "☆☆",
            description: "Self-boost Prestige-Prestige by Prestige points amount",
            cost: new Decimal(34e6),
						effect() {return player.p.points.pow(0.21).max(1)},
            unlocked() { return true },
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
                currencyLayer: "p",
							effectDisplay() {return  format(upgradeEffect("p", 52)) + "x" },// Add formatting to the effect
        },
																53: {
            title: "☆☆☆",
            description: "Self-boost Prestige-Prestige by all effects at once",
            cost: new Decimal(.8e9),
			effect() {let ret = Decimal.pow(1.2, player.p.upgrades.length).max(1)
			return ret},
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
                currencyLayer: "p",
							effectDisplay() {return  format(upgradeEffect("p", 53)) + "x" },// Add formatting to the effect
        },
																		54: {
            title: "☆☆☆☆",
            description: "Boost Prestige point gain by Prestige-Prestige/s",
            cost: new Decimal(1e10),
			effect() {return tmp.p.effect.pow(0.15).max(1)},
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
                currencyLayer: "p",
							effectDisplay() {return  format(upgradeEffect("p", 54)) + "x" },// Add formatting to the effect
        },
				61: {
            title: "✦",
            description: "Self-boost Prestige-Prestige gain by Prestige-Prestige/s",
            cost: new Decimal(5e12),
			effect() {return tmp.p.effect.pow(0.03).max(1)},
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
                currencyLayer: "p",
							effectDisplay() {return  format(upgradeEffect("p", 61)) + "x" },// Add formatting to the effect
        },
						62: {
            title: "✦✦",
            description: "Self-boost Prestige-Prestige gain by Points",
            cost: new Decimal(2e13),
			effect() {return player.points.pow(0.22).max(1)},
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
                currencyLayer: "p",
							effectDisplay() {return  format(upgradeEffect("p", 62)) + "x" },// Add formatting to the effect
        },
							63: {
            title: "✦✦✦",
            description: "Self-boost Prestige-Prestige gain by Points and Prestige-Prestige/s",
            cost: new Decimal(2e15),
			effect() {return player.points.pow(0.22).add(tmp.p.effect.pow(0.15)).max(1)},
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
                currencyLayer: "p",
							effectDisplay() {return  format(upgradeEffect("p", 63)) + "x" },// Add formatting to the effect
        },
									64: {
            title: "✵",
            description: "Self-boost Prestige-Prestige gain by Points * Prestige-Prestige/s",
            cost: new Decimal(8e17),
			effect() {return player.points.pow(0.12).times(tmp.p.effect.pow(0.18)).max(1)},
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
                currencyLayer: "p",
							effectDisplay() {return  format(upgradeEffect("p", 64)) + "x" },// Add formatting to the effect
        },
	},
	buyables: {
				    11: {
        cost(x) { return new Decimal(1).times(x.pow(2)) },
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>11</b></h2> <br><br><br>" + "Requirement: " + format(data.cost) + " P-P-P-Prestige <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Effect: " + format(data.effect) + "x to P-P-P-P-Prestige"},
        canAfford() { return player.p.pprestige.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player.p.pprestige = player.p.pprestige.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {return x = x.pow(1.5)},
    },
					    12: {
        cost(x) { return new Decimal(1000).times(x.pow(3)) },
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>12</b></h2> <br><br><br>" + "Requirement: " + format(data.cost) + " P-P-P-Prestige <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Effect: " + format(data.effect) + "x to P-P-P-P-Prestige"},
        canAfford() { return player.p.pprestige.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player.p.pprestige = player.p.pprestige.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {return x = x.pow(3)},
    },
						    13: {
        cost(x) { return new Decimal(2e7).times(x.pow(10)) },
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>13</b></h2> <br><br><br>" + "Requirement: " + format(data.cost) + " P-P-P-Prestige <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Effect: " + format(data.effect) + "x to P-P-P-P-Prestige"},
        canAfford() { return player.p.pprestige.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player.p.pprestige = player.p.pprestige.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {return x = x.pow(6)},
    },
							    14: {
        cost(x) { return new Decimal(2e19).times(x.pow(10)) },
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>14</b></h2> <br><br><br>" + "Requirement: " + format(data.cost) + " P-P-P-Prestige <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Effect: " + format(data.effect) + "x to P-P-P-P-Prestige"},
        canAfford() { return player.p.pprestige.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player.p.pprestige = player.p.pprestige.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {return x = x.pow(7)},
    },
								    15: {
        cost(x) { return new Decimal(2e42).times(x.pow(10)) },
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>21</b></h2> <br><br><br>" + "Requirement: " + format(data.cost) + " P-P-P-Prestige <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Effect: " + format(data.effect) + "x to P-P-P-P-Prestige"},
        canAfford() { return player.p.pprestige.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player.p.pprestige = player.p.pprestige.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {return x = x.pow(3)},
    },
									    16: {
        cost(x) { return new Decimal(2e50).times(x.pow(10)) },
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>22</b></h2> <br><br><br>" + "Requirement: " + format(data.cost) + " P-P-P-Prestige <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Effect: " + format(data.effect) + "x to P-P-P-P-Prestige"},
        canAfford() { return player.p.pprestige.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player.p.pprestige = player.p.pprestige.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {return x = x.pow(5)},
    },
										    17: {
        cost(x) { return new Decimal(2e57).times(x.pow(10)) },
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>23</b></h2> <br><br><br>" + "Requirement: " + format(data.cost) + " P-P-P-Prestige <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Effect: " + format(data.effect) + "x to P-P-P-P-Prestige"},
        canAfford() { return player.p.pprestige.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player.p.pprestige = player.p.pprestige.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {return x = x.pow(15)},
    },
										    18: {
        cost(x) { return new Decimal(2e110).times(x.pow(10)) },
        display() {
                let data = tmp[this.layer].buyables[this.id]
				return "<h2><b>24</b></h2> <br><br><br>" + "Requirement: " + format(data.cost) + " P-P-P-Prestige <br>" + "Level: " + formatWhole(player[this.layer].buyables[this.id]) + " <br> Effect: " + format(data.effect) + "x to P-P-P-P-Prestige"},
        canAfford() { return player.p.pprestige.gte(this.cost()) },
        buy() {
			                cost = tmp[this.layer].buyables[this.id].cost
            player.p.pprestige = player.p.pprestige.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {return x = x.pow(20)},
    },
	},
	    update(diff) { 
	 if (hasUpgrade("p", 32)) {
player.p.prestige = player.p.prestige.add(tmp.p.effect.times(diff))
player.p.pprestige = player.p.pprestige.add(tmp.p.effect2.times(diff))
}		
	 if (hasUpgrade("p", 31)) {
player.p.prestige = player.p.prestige.add(tmp.p.effect.times(diff))
}
		},
	
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true}
})
