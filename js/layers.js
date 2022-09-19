addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		prestige: new Decimal(0),
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
					["display-text", () => "You have " + format(player.p.prestige) + " Prestige-Prestige"],
                    ["upgrades", [4,5]]	
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
            title: "Evolution 1★★",
            description: "Unlock a new tab",
            cost: new Decimal(1e24),
            unlocked() { return true },
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
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
            title: "★★★★",
            description: "Self-boost Prestige-Prestige by Prestige points amount",
            cost: new Decimal(196875),
						effect() {return player.p.points},
            unlocked() { return true },
				currencyDisplayName: "Prestige-Prestige", // Use if using a nonstandard currency
                currencyInternalName: "prestige", // Use if using a nonstandard currency
                currencyLayer: "p",
							effectDisplay() {return  "+" + format(upgradeEffect("p", 51)) },// Add formatting to the effect
        },
	},
	    update(diff) {  
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
