// ============================================================
// EverQuest Atlas: The Maps of Myrist — Zone Database
// Compiled by Maelin Starpyre, Grand Librarian of Myrist
// Covers Original EQ through Planes of Power
// ============================================================

const ZONES = [

  // ═══════════════════════════════
  //  ANTONICA
  // ═══════════════════════════════

  {
    id: "befallen",
    name: "Befallen",
    region: "Antonica",
    continent: "Antonica",
    adjacentZones: ["West Commonlands"],
    levelRange: "10–25",
    tags: ["Dungeon", "Undead", "Dark"],
    excerpt: "A crumbling tower haunted by the undead, whose unstable floors have claimed countless adventurers.",
    background: `Rising from the barren sands of the West Commonlands, Befallen is a crumbling tower fortress whose origins have been lost to history. The structure has long since been claimed by undead, and the desert winds carry the scent of decay far across the surrounding plains. The walls sag with age and the floors have grown treacherous from centuries of neglect and sandstorm erosion.

    Few structures on Norrath inspire dread quite like Befallen. Originally it may have served as an outpost or watch-tower, but the records of its construction are silent. What is known is that during the Age of War, a cult of necromancers discovered the site and established their rites within its lower levels, opening gateways to unlife that have never fully closed.`,
    dangers: `Befallen's danger lies not only in the surplus of undead creatures mindlessly lurking around every corner, but also in the irreparable damage done from countless years of desert exposure. The floors are unstable and oftentimes unwary adventurers have fallen to their deaths — or worse. The construction and layout of the area also creates difficulties when traveling from level to level, as each floor is guarded by a door that requires a specific key.

    The most senior residents — shadow knights, mummies of ancient generals, and necromancers who refused death — have claimed the deepest chambers for their own. Those who descend without adequate preparation rarely return.`,
    benefits: `Despite its dreadful reputation, Befallen serves as an excellent training ground for adventurers of moderate experience. The keys required to advance deeper into the structure can sometimes be found on fallen soldiers within the upper levels. Clerics and paladins who face the undead here gain invaluable experience in the art of turning, and the relative proximity to Freeport makes resupply straightforward.`,
    bestiary: [
      { name: "Haunting Presence", level: "10–14", type: "Undead" },
      { name: "Decaying Skeleton", level: "10–16", type: "Undead" },
      { name: "Zombie Guard", level: "14–18", type: "Undead" },
      { name: "Mummified Patriarch", level: "18–22", type: "Undead" },
      { name: "Shadow Knight Initiate", level: "20–24", type: "Humanoid / Undead" },
      { name: "High Priest Narrn", level: "24–27", type: "Boss / Undead" }
    ],
    notableNPCs: [
      { name: "Lord Grimrot", role: "Master of the lower crypts; commands the shadow knight garrison." },
      { name: "High Priest Narrn", role: "Ancient necromancer who became the very undead he once studied; guards the deepest sanctum." }
    ]
  },

  {
    id: "blackburrow",
    name: "Blackburrow",
    region: "Qeynos Hills / Everfrost Peaks",
    continent: "Antonica",
    adjacentZones: ["Qeynos Hills", "Everfrost Peaks"],
    levelRange: "5–18",
    tags: ["Dungeon", "Gnolls", "New Player Zone"],
    excerpt: "A massive gnoll warrens burrowed beneath the hills, connecting Antonica to the frozen north.",
    background: `Blackburrow is an extensive network of tunnels, halls, and chambers carved and burrowed into the earth by generations of gnolls. The warrens stretch beneath the rolling Qeynos Hills and emerge near the frozen wastes of Everfrost Peaks, making Blackburrow a critical passageway between the temperate south and the arctic north. The gnolls claimed this natural series of caverns centuries ago and have expanded it far beyond its original boundaries.

    The gnolls of Blackburrow are organized in a way that surprises most who underestimate them. They maintain a warrior caste, a shaman class, and even a crude military hierarchy. The complex itself is a testament to gnollish industriousness — dozens of rooms, a flooded cave system, and deep warrens that few outside the gnoll society have ever mapped.`,
    dangers: `Blackburrow is a very dangerous place for the young adventurer. Gnolls, when in trouble, will flee to find help. A gnoll that you let escape may return with many of its brethren to finish the fight. Beyond the dangers of the gnoll inhabitants, the terrain itself poses many hazards to unwary travelers. The area has become rather unstable in its layout since the arrival of the gnolls, as they have not upheld the meticulous dwarven construction standards of the tunnels' original builders.

    Deep within the complex live gnoll commanders of formidable power. These warriors are seasoned veterans of countless skirmishes and should not be taken lightly regardless of how crude their weapons may appear.`,
    benefits: `The tunnels of Blackburrow make for a popular training ground among young adventurers from both Qeynos and the northern territories. Gnoll hides, fangs, and patrol schedules can be delivered to the guards of Qeynos for a small reward. Many a warrior and rogue has sharpened their skills in the shallow tunnels before venturing deeper. The natural passage through to Everfrost makes it a necessity for any traveler heading north without access to druidic or wizard teleportation.`,
    bestiary: [
      { name: "Gnoll Pup", level: "5–8", type: "Humanoid" },
      { name: "Gnoll Warrior", level: "8–13", type: "Humanoid" },
      { name: "Gnoll Shaman", level: "10–15", type: "Humanoid / Caster" },
      { name: "Giant Snake", level: "12–16", type: "Beast" },
      { name: "Razorgill", level: "10–14", type: "Beast / Aquatic" },
      { name: "Gnoll Commander", level: "16–20", type: "Humanoid / Elite" }
    ],
    notableNPCs: [
      { name: "Gnoll Commander Rokk", role: "Leads the military garrison deep in the warrens; carries a key to the commander's vault." },
      { name: "High Shaman Brug", role: "The spiritual leader of the Blackburrow gnolls; knows rites lost to other gnoll tribes." }
    ]
  },

  {
    id: "west-commonlands",
    name: "West Commonlands",
    region: "Antonica",
    continent: "Antonica",
    adjacentZones: ["East Commonlands", "Befallen", "Freeport"],
    levelRange: "1–10",
    tags: ["Outdoor", "Travel Route", "Entry Zone"],
    excerpt: "Rolling plains connecting Freeport to the wider world, dotted with ruins and dangerous travelers.",
    background: `The West Commonlands are the broad open plains that stretch between the great city of Freeport and the more distant reaches of Antonica. The grasses grow tall here, and the road that winds through the center of the zone has been worn smooth by the feet of countless travelers, merchants, and adventurers over the centuries.

    These lands take their name from the long-past era when the Combine Empire managed them as common territory — open to all citizens regardless of race. That era of peaceful coexistence is long gone, and today the Commonlands attract a mixture of travelers, bandits, and the restless dead from Befallen to the north. The ruins of an old watchtower sit at the zone's edge, a crumbling reminder of a more orderly age.`,
    dangers: `For experienced adventurers, the West Commonlands present little danger. For the newly arrived, however, the packs of young orcs, skeletons, and opportunistic bandits can prove surprisingly lethal. The Orc Highway — a stretch of the road taken over by organized orc raiding parties — cuts across the eastern portion of the zone and has claimed many a courier and lone traveler.`,
    benefits: `The West Commonlands serve as a vital crossroads for all of Antonica. Merchants travel through daily and the road provides a relatively safe route between Freeport and points west. Newborn adventurers often make their first forays into this region, and several permanent camps of guards and travelers offer a modicum of safety to those who stay near the road.`,
    bestiary: [
      { name: "Orc Pawn", level: "1–5", type: "Humanoid" },
      { name: "Orc Warrior", level: "5–9", type: "Humanoid" },
      { name: "Wandering Skeleton", level: "3–7", type: "Undead" },
      { name: "Hill Giant (rare)", level: "30+", type: "Giant" }
    ],
    notableNPCs: [
      { name: "Felia Goldenwing", role: "A cleric of Tunare who tends to wounded travelers and can direct adventurers to Qeynos." },
      { name: "Kirak Vil", role: "An enigmatic dark elf who camps near the Befallen tower road; his allegiances are unclear." }
    ]
  },

  {
    id: "upper-guk",
    name: "Upper Guk",
    region: "Innothule Swamp",
    continent: "Antonica",
    adjacentZones: ["Innothule Swamp", "Lower Guk"],
    levelRange: "15–30",
    tags: ["Dungeon", "Frogloks", "Undead"],
    excerpt: "The sunlit upper reaches of the great froglok city of Guk, where living and undead frogloks wage eternal war.",
    background: `Guk is an ancient city of the frogloks, built deep within the swamps of Innothule. The upper reaches of the city — known simply as Upper Guk — extend near enough to the surface that faint daylight filters through cracks in the ceiling, casting dappled light on the moss-covered stone. Here, living frogloks maintain a desperate defense against the undead hordes that have corrupted the lower city.

    The frogloks are an ancient race of frog-like humanoids with a proud martial and spiritual tradition. Their city of Guk predates many of the surface settlements of Norrath, and its corridors contain countless artifacts and written records that scholars would pay dearly to access. The ongoing war between the living frogloks above and the undead below keeps most outside visitors in danger from all sides.`,
    dangers: `Adventurers entering Upper Guk should expect to be targeted by both factions — the living frogloks are not welcoming to outsiders, and the undead frogloks that venture up from the lower city are universally hostile. The swampy water that fills many of the lower passages can obscure movement and conceal ambushes. The connection to Lower Guk lies deep within, and the undead that spill through from below grow increasingly powerful as one descends.`,
    benefits: `Upper Guk is rich in loot by the standards of its level range. Living froglok shamans carry potions and reagents of above-average quality. The ruins contain froglok relics that collectors in Freeport and Qeynos pay handsomely for. For adventurers seeking to learn about Guk's history, the murals carved into the deeper passages tell stories of the froglok empire at its height.`,
    bestiary: [
      { name: "Froglok Warrior", level: "15–20", type: "Humanoid" },
      { name: "Froglok Shaman", level: "18–24", type: "Humanoid / Caster" },
      { name: "Undead Froglok", level: "20–28", type: "Undead" },
      { name: "Undead Froglok Knight", level: "25–32", type: "Undead / Elite" }
    ],
    notableNPCs: [
      { name: "King Gragnar", role: "The living king of the frogloks, commanding the defense of the upper city from his crumbling throne room." },
      { name: "Froglok Shin Lord", role: "A veteran warrior who leads sorties against the undead incursions from the lower passages." }
    ]
  },

  {
    id: "qeynos-hills",
    name: "Qeynos Hills",
    region: "Antonica",
    continent: "Antonica",
    adjacentZones: ["Qeynos", "West Karana", "Blackburrow"],
    levelRange: "1–15",
    tags: ["Outdoor", "Entry Zone", "Travel Route"],
    excerpt: "Verdant rolling hills surrounding the city of Qeynos, home to wildlife and roving orc bands.",
    background: `The Qeynos Hills roll gently away from the great city walls of Qeynos in all directions, a landscape of green grass, scattered woodland copses, and quiet streams. The hills have been inhabited by farmers and small communities for generations, and the road to Blackburrow passes through their heart. Despite their pastoral appearance, the hills are far from peaceful.

    The gnolls of Blackburrow send raiding parties into the hills regularly, and bands of orcs have established camps in the outlying areas. The city watch of Qeynos patrols the main roads but cannot cover the full expanse of the hills. Rangers from the city have long used the hills as their training ground and know every trail and hollow.`,
    dangers: `Young adventurers emerging from Qeynos will encounter gnoll scouts and orc raiders within minutes of leaving the city gates if they wander from the main road. Hill wolves and large insects round out the dangers for the unprepared. The pass leading into Blackburrow at the northern edge of the hills is particularly treacherous, as gnolls patrol in force near their entrance.`,
    benefits: `The Qeynos Hills are an ideal first training area for new adventurers. Wildlife such as wolves, bears, and large beetles provide good experience for the newly initiated. The proximity to Qeynos allows for quick trips back to sell goods and restock supplies. Several ranger and druid contacts can be found camping in the hills, willing to trade for animal hides and pelts.`,
    bestiary: [
      { name: "Hill Wolf", level: "1–5", type: "Beast" },
      { name: "Large Beetle", level: "2–6", type: "Beast" },
      { name: "Gnoll Scout", level: "5–10", type: "Humanoid" },
      { name: "Orc Raider", level: "8–14", type: "Humanoid" },
      { name: "Hill Bear", level: "10–15", type: "Beast" }
    ],
    notableNPCs: [
      { name: "Cros Treewind", role: "A half-elf ranger who has mapped every trail in the hills and warns adventurers about gnoll patrol routes." },
      { name: "Borannin", role: "A druid who tends an ancient oak in the center of the hills; will heal injured travelers in exchange for furs." }
    ]
  },

  {
    id: "lavastorm-mountains",
    name: "Lavastorm Mountains",
    region: "Antonica",
    continent: "Antonica",
    adjacentZones: ["Nektulos Forest", "Solusek's Eye"],
    levelRange: "20–40",
    tags: ["Outdoor", "Fire", "Kobolds", "Drake"],
    excerpt: "Smoldering volcanic peaks where fire drakes nest and kobolds worship the primordial flame.",
    background: `The Lavastorm Mountains are a volcanic range that dominates the southern edge of Antonica, their peaks perpetually wreathed in smoke and ash. Lava flows carve glowing rivers down the mountainsides, and the air shimmers with heat. At the heart of the mountains lies Solusek's Eye, the lair of the dragon Lord Nagafen, and the kobolds who dwell in the foothills revere the ancient power of fire as a divine gift.

    The mountains take their name from the primordial fire god Solusek Ro, and the kobolds consider themselves his chosen people, performing rites and sacrifices to the sun's fire at their mountain shrines. Fire drakes wheel overhead and nest in the exposed volcanic vents, and elementals of pure flame roam the higher elevations.`,
    dangers: `The heat alone is a hazard for any who venture into the higher reaches of the Lavastorm Mountains. Those without resistance to fire may find even basic traversal painful. The kobolds are numerous and organized — their shamans direct complex ambushes, and their warriors defend the paths to Solusek's Eye with fanatical conviction. Fire drakes rarely attack unprovoked at lower altitudes, but their territorial instincts make them volatile near their nesting sites.`,
    benefits: `The Lavastorm Mountains are a source of fire-hardened ores found nowhere else on Norrath. Smiths in Freeport pay premium prices for volcanic iron and the heat-fused crystals that form in cooled lava flows. The kobolds, while hostile to most outsiders, trade freely with those who earn their trust — and they possess fire-forging techniques that no surface-dwelling blacksmith has replicated.`,
    bestiary: [
      { name: "Lava Beetle", level: "20–26", type: "Beast" },
      { name: "Kobold Warrior", level: "22–28", type: "Humanoid" },
      { name: "Kobold Shaman", level: "25–32", type: "Humanoid / Caster" },
      { name: "Lava Drake", level: "30–40", type: "Dragon / Drake" },
      { name: "Fire Elemental", level: "35–42", type: "Elemental" }
    ],
    notableNPCs: [
      { name: "King Tranix", role: "The kobold king who rules from the caldera's edge and leads the rites to Solusek Ro." },
      { name: "Efreeti Lord Djarn", role: "An ancient fire entity bound to a lava pool near the passage to Solusek's Eye; parleying with him is possible but perilous." }
    ]
  },

  // ═══════════════════════════════
  //  FAYDWER
  // ═══════════════════════════════

  {
    id: "akanon",
    name: "Ak'Anon",
    region: "Faydwer",
    continent: "Faydwer",
    adjacentZones: ["Steamfont Mountains"],
    levelRange: "City",
    tags: ["City", "Gnome", "Clockwork"],
    excerpt: "The hidden underground city of the gnomes, filled with mechanical wonders and arcane experiments.",
    background: `Hidden deep beneath the Steamfont Mountains lies Ak'Anon, the grand mechanical city of the gnomes. Its discovery by the wider world was a moment of astonishment and wonder; the gnomes had been developing their civilization in secret for generations, crafting an entirely mechanical urban landscape of clockwork guardians, pneumatic transport systems, and alchemical workshops of staggering complexity.

    The gnomes of Ak'Anon remain reclusive, even after decades of being open to the world. They tend to treat other races with tension and at times, hostility. Despite the gnomes' dislike of outsiders, they have been touched by the dark arts of necromancy — a faction within the city has long pursued undead research in its deepest laboratories, a fact that their leadership neither fully acknowledges nor suppresses.`,
    dangers: `The city itself is a deathtrap for those not allied with its various factions. Clockwork guards patrol every major corridor and will eliminate perceived threats without hesitation. The necromantic faction's laboratory wing is particularly dangerous — rumors persist of experimental constructs that have turned on their creators and now roam the sub-basements. Evil-aligned visitors are advised to exercise exceptional caution near the city guard posts.`,
    benefits: `For those accepted by the gnomes, Ak'Anon offers access to some of the finest artificers and enchanters in Norrath. Clockwork components — gears, springs, arcane cells — can be purchased here for mechanical construction projects available nowhere else. All gnomish racial classes have guild trainers present in the city, and the library wing contains technical manuals of extraordinary depth.`,
    bestiary: [
      { name: "Clockwork Guide", level: "10–18", type: "Construct" },
      { name: "Clockwork Cleaner", level: "8–14", type: "Construct" },
      { name: "Mechanical Guardian", level: "20–30", type: "Construct" },
      { name: "Necromancer Apprentice", level: "15–22", type: "Humanoid / Caster" }
    ],
    notableNPCs: [
      { name: "King Ak'Anon", role: "The ancient mechanical king of the gnomes, whose original organic form has long since been replaced by clockwork." },
      { name: "Meldrath the Malignant", role: "A renegade gnome necromancer who commands the experimental wing and answers to no one." }
    ]
  },

  {
    id: "greater-faydark",
    name: "Greater Faydark",
    region: "Faydwer",
    continent: "Faydwer",
    adjacentZones: ["Lesser Faydark", "Felwithe", "Kelethin", "Butcherblock Mountains", "Crushbone"],
    levelRange: "1–20",
    tags: ["Outdoor", "Forest", "Entry Zone", "Elves"],
    excerpt: "The vast magical forest of Faydwer, home to the elven city of Kelethin and an orc empire waiting to rise.",
    background: `The Greater Faydark is one of the most magical and ancient forests on Norrath. Enormous trees — some hundreds of feet tall — dominate the landscape, their canopy so thick that the forest floor exists in perpetual twilight even at midday. Ancient glades and standing stones dot the undergrowth, remnants of rites performed by the elves who have called this forest home since the very first age.

    The wood elves built their city of Kelethin in the treetops of the Faydark, connected by rope bridges and platforms high above the forest floor. The high elves of Felwithe maintain their own separate and grander city at the forest's edge. Between these two elven civilizations and the orc empire of Crushbone — which has grown alarmingly in power — the Greater Faydark is never without tension.`,
    dangers: `The most significant danger in the Greater Faydark is the orcish presence. The Crushbone orcs have grown in strength and regularly send raiding parties deep into the forest. Young adventurers frequently underestimate the orcs' ability to coordinate ambushes. Faerie folk of a less benevolent variety also inhabit the darker glades and can confuse or enchant unwary travelers. At night, the forest takes on a more sinister character and predators grow bolder.`,
    benefits: `The Greater Faydark is an ideal starting zone for many classes and races. Kelethin's merchants and trainers are accessible and reasonably priced. The nearby dungeon of Crushbone provides excellent organized combat experience. The forest itself yields reagents, rare herbs, and spell components sought by enchanters and wizards throughout Norrath.`,
    bestiary: [
      { name: "Young Unicorn", level: "1–6", type: "Beast / Magical" },
      { name: "Faerie", level: "5–12", type: "Fey" },
      { name: "Crushbone Orc Pawn", level: "5–10", type: "Humanoid" },
      { name: "Crushbone Orc Warrior", level: "10–18", type: "Humanoid" },
      { name: "Forest Spider", level: "3–8", type: "Beast" }
    ],
    notableNPCs: [
      { name: "Firiona Vie", role: "A legendary half-elven adventurer and champion of good who is said to walk these forests on her quests. (Rarely encountered)" },
      { name: "Ambassador D'Vinn", role: "The Crushbone orc ambassador who travels between the orcish territories; ambushing him yields valuable intelligence." }
    ]
  },

  {
    id: "crushbone",
    name: "Crushbone",
    region: "Faydwer",
    continent: "Faydwer",
    adjacentZones: ["Greater Faydark"],
    levelRange: "10–25",
    tags: ["Dungeon", "Orcs", "Castle"],
    excerpt: "The fortified castle-stronghold of the Crushbone orc empire, teeming with soldiers, slavers, and a dark patron.",
    background: `The Crushbone Keep is a fortress built by the orcish Crushbone clan to serve as the seat of their growing empire on Faydwer. The structure itself incorporates stone from the ruins of older civilizations — elven carvings can be glimpsed beneath the crude orc murals — and is surrounded by a heavy stockade and earthwork defenses. Within its walls, the Crushbone Empire is organized to a degree that surprises those who dismiss orcs as disorganized savages.

    The orcs maintain a strict military hierarchy, conduct slave operations against the forest elves, and have made a dark pact with a vampire named Laarthik V'Shin who serves as advisor to their warlord. This unholy alliance has given the Crushbone orcs access to dark magic and influence that their neighbors find deeply alarming.`,
    dangers: `Crushbone is never without danger. The orcs patrol in well-organized groups and reinforce each other rapidly when threatened. The central keep houses the most powerful warriors and the vampire advisor, whose charm abilities make him disproportionately deadly against unprepared parties. Slaves held within the complex occasionally break free and become an unexpected hazard in confined spaces.`,
    benefits: `Crushbone is one of the most important training zones in Faydwer and is heavily frequented by mid-tier adventurers. Orc belts and pawn skins are traded to Kelethin merchants for good coin. The warlord's chamber contains some of the finest loot available at the zone's level range, making it a reliable destination for gear upgrades. Experience accumulates rapidly due to the density and organization of the enemy population.`,
    bestiary: [
      { name: "Crushbone Pawn", level: "10–15", type: "Humanoid" },
      { name: "Crushbone Warrior", level: "14–20", type: "Humanoid" },
      { name: "Crushbone Centurion", level: "18–24", type: "Humanoid / Elite" },
      { name: "Crushbone Taskmaster", level: "20–25", type: "Humanoid" },
      { name: "Laarthik V'Shin", level: "26–30", type: "Undead / Vampire" }
    ],
    notableNPCs: [
      { name: "Emperor Crush", role: "The warlord-emperor of the Crushbone clan; his death is the goal of many adventuring parties." },
      { name: "Laarthik V'Shin", role: "A vampire advisor and practitioner of dark magic who has elevated the orcs' capabilities far beyond their natural limits." }
    ]
  },

  {
    id: "butcherblock-mountains",
    name: "Butcherblock Mountains",
    region: "Faydwer",
    continent: "Faydwer",
    adjacentZones: ["Greater Faydark", "Dagnor's Cauldron", "Ocean of Tears"],
    levelRange: "10–25",
    tags: ["Outdoor", "Dwarves", "Goblins", "Travel"],
    excerpt: "Rugged dwarven mountain territory connecting Faydwer's forest to the ocean docks, home to ancient druid rings.",
    background: `Rising from the shores of the Ocean of Tears and towering high above Dagnor's Cauldron and the Greater Faydark Forest are the peaks of the Butcherblock Mountains. The dwarves of Kaladim have called these mountains home since time immemorial, carving their great underground city directly into the stone. The mountain passes connecting the ocean docks to the forest interiors are maintained by the dwarven mountain patrol, though the goblins who have surfaced from the mountains' core engage in an ageless rivalry that keeps those roads dangerous.

    The mountains are named for an ancient giant battle — a conflict whose survivors became the first dwarves, according to the oldest dwarven sagas. Whether the etymology is literal or mythic, the Butcherblock Mountains bear the scars of enormous violence in their geology: fissures, upthrust rock formations, and deep rifts that speak to catastrophic upheaval in ages past.`,
    dangers: `The natural beasts that roam Butcherblock pose little real threat to inhabitants and travelers. However, the goblins that have surfaced from the depths have viciously ended many a traveler's life. Goblins are rarely seen alone due to their preference for group hunting. Travelers of evil persuasion are advised to avoid the dwarven mountain patrol routes, as the dwarves of Kaladim offer no mercy to those they consider enemies.`,
    benefits: `Many druids use the ancient ruins that dot the mountains as focal points for their teleportations, making Butcherblock a major transit hub for druidic travel. For non-druids, great ships regularly sail to Freeport and Antonica from the ocean docks, as well as to Firiona Vie on the continent of Kunark. The dwarven city of Kaladim within the mountains provides all standard city services.`,
    bestiary: [
      { name: "Emerald Drake", level: "12–18", type: "Dragon / Drake" },
      { name: "Basilisk", level: "14–20", type: "Beast / Magical" },
      { name: "Mountain Goblin", level: "10–16", type: "Humanoid" },
      { name: "Scarab", level: "8–14", type: "Beast / Insect" },
      { name: "Brownie", level: "6–12", type: "Fey" }
    ],
    notableNPCs: [
      { name: "Captain Tillin", role: "Dwarven patrol captain who hires adventurers to clear goblin incursions from the mountain roads." },
      { name: "Merchant Gazugi", role: "A gnome trader who runs a supply depot near the ocean docks and deals in travel essentials." }
    ]
  },

  {
    id: "castle-mistmoore",
    name: "Castle Mistmoore",
    region: "Faydwer",
    continent: "Faydwer",
    adjacentZones: ["Lesser Faydark"],
    levelRange: "30–50",
    tags: ["Dungeon", "Undead", "Vampire", "Castle"],
    excerpt: "The ancient vampire lord Mistmoore's gothic estate, sprawling across the Lesser Faydark in eternal darkness.",
    background: `Lurking at the edge of the Lesser Faydark, Castle Mistmoore is the most infamous residence on the continent of Faydwer. The castle is the domain of Mayong Mistmoore, a vampire of immeasurable age whose origins predate the current age of mortals. The structure itself is a testament to dark architecture — towers of black stone, gargoyle-lined parapets, and gardens of thorned plants that bloom only in moonlight.

    Mistmoore's court is populated by vampires, undead servitors, and dark elves who have sworn fealty to the ancient lord. The vampire nobles who attend his court have accumulated centuries of experience and power, making them far more dangerous than the typical undead adversary. Mistmoore himself is rarely encountered and is widely considered to be among the most powerful individual entities on Norrath.`,
    dangers: `Every room in Castle Mistmoore presents danger. The vampire guests are cunning, quick, and capable of draining life with supernatural speed. Mistmoore's servants include dark elf retainers who supplement the undead forces with their own considerable combat and magical abilities. The geometry of the castle is confusing by design — new visitors frequently become lost, a vulnerability that Mistmoore's guardians exploit ruthlessly.`,
    benefits: `Despite its dangers, Mistmoore Castle contains treasures from across centuries of accumulated wealth. The vampire lord's personal collection of magical items is legendary, and fragments of it occasionally reach the hands of adventurers who survive long enough to loot the inner chambers. The dark elf retainers carry equipment of superior quality, and rare crafting components from the gardens are sought by alchemists.`,
    bestiary: [
      { name: "Mistmoore Bat", level: "30–36", type: "Beast / Undead" },
      { name: "Vampire Noble", level: "36–44", type: "Undead / Vampire" },
      { name: "Dark Elf Retainer", level: "38–46", type: "Humanoid / Elite" },
      { name: "Gargoyle Sentry", level: "40–48", type: "Construct / Undead" },
      { name: "Lord Mayong Mistmoore", level: "55+", type: "Boss / Vampire" }
    ],
    notableNPCs: [
      { name: "Lord Mayong Mistmoore", role: "The ancient vampire lord, perhaps the oldest individual creature in Norrath; his true goals remain opaque even to his own court." },
      { name: "Chiana", role: "Mistmoore's consort and the keeper of the castle's social order; she receives petitioners on the lord's behalf." }
    ]
  },

  // ═══════════════════════════════
  //  KUNARK
  // ═══════════════════════════════

  {
    id: "burning-woods",
    name: "Burning Woods",
    region: "Kunark",
    continent: "Kunark",
    adjacentZones: ["Skyfire Mountains", "Dreadlands", "Frontier Mountains"],
    levelRange: "45–60",
    tags: ["Outdoor", "Forest Giants", "Sarnaks", "Fire"],
    excerpt: "A perpetually smoldering forest on Kunark where forest giants and sarnaks wage endless war among burning trees.",
    background: `The Burning Woods are exactly what their name suggests — a vast forest on the continent of Kunark where enormous fires have burned for so long that the ecology has adapted to a state of permanent semi-combustion. The trees here are fire-hardened giants whose bark repels ordinary flame, and the air is thick with smoke and ash year-round.

    The forest is home to many creatures of significant prowess. Forest giants are the dominant species — immense humanoids who have lived among these burning trees for millennia and have developed an immunity to fire. The Sarnaks, a race of serpentine-draconian beings created by the Iksar as warriors, have also established a presence in the region, engaged in their perpetual conflict with anyone and anything that crosses their path.`,
    dangers: `This territory is infamous for claiming the lives of many unwary travelers who wander into the area. Native beasts such as the extremely aggressive giant wasps, forest giants, and gorillas defend their territory without bias. Unnatural abominations — undead gorillas and the tortured remnants of fallen Iksar — share this region with the living residents. Sarnaks are particularly dangerous due to their disciplined combat formations and innate magical abilities.`,
    benefits: `For high-level adventurers, the Burning Woods yield exceptional rewards. Forest giant pelts and bones are components in large-scale construction projects. Sarnak armor, while heavy, is valued for its fire resistance. The forest itself contains fire-hardened lumber and rare amber resin that ignites at a controlled rate — components in high-level alchemy that alchemists pay extraordinary prices to acquire.`,
    bestiary: [
      { name: "Forest Giant Warrior", level: "45–52", type: "Giant" },
      { name: "Forest Giant Shaman", level: "48–55", type: "Giant / Caster" },
      { name: "Sarnak Berserker", level: "46–54", type: "Draconian" },
      { name: "Giant Wasp", level: "42–50", type: "Beast / Insect" },
      { name: "Undead Gorilla", level: "50–58", type: "Undead" },
      { name: "Travenro the Skygazer", level: "60+", type: "Boss / Giant" }
    ],
    notableNPCs: [
      { name: "Travenro the Skygazer", role: "A forest giant elder who watches the sky for omens; he possesses an ancient Iksar star chart of considerable value." },
      { name: "Sarnak High Commander Vrex", role: "Commands the Sarnak garrison in the eastern portion of the Burning Woods and directs raids into the Dreadlands." }
    ]
  },

  {
    id: "city-of-mist",
    name: "City of Mist",
    region: "Kunark",
    continent: "Kunark",
    adjacentZones: ["Emerald Jungle"],
    levelRange: "35–55",
    tags: ["Dungeon", "Undead", "Iksar", "Ruins"],
    excerpt: "The fog-shrouded ruins of a great Iksar city, its dead emperor's ghost still holding court over an undead empire.",
    background: `Buried within the jungle of Kunark, the City of Mist is one of the most haunting locations on Norrath. Once a proud city of the Iksar Empire, it was destroyed in the cataclysm that ended the Iksar's golden age — but its emperor, Ganak, refused to let death end his reign. His ghost anchors a massive undead infestation that preserves the city in a perpetual fog, the mists serving as both concealment and conduit for the spiritual energy that animates the dead.

    The city's architecture is a marvel even in ruin — soaring Iksar-style towers, wide ceremonial plazas, and intricate drainage systems that once served a population of tens of thousands. The undead who inhabit it now maintain the motions of city life: guard patrols, market gatherings, even crude bureaucratic functions — all performed by beings that no longer breathe.`,
    dangers: `The fog that fills the City of Mist disorients visitors and masks the presence of undead until they are within striking distance. Undead iksar monks are especially dangerous — they retain the martial art techniques they had in life and use them with tireless precision. The further one ventures into the central districts, the more powerful the undead become. Emperor Ganak himself, if confronted, is one of the most powerful spectral entities known to adventurers.`,
    benefits: `The City of Mist is one of the great treasure vaults of Kunark. Iksar artifacts buried during the empire's peak are scattered throughout the ruins. Certain ghost-touched items found here have enchantment properties not replicable by living crafters. Historians and wizards from across Norrath seek transcriptions of the city's stone tablets, which describe Iksar history in a level of detail found nowhere else.`,
    bestiary: [
      { name: "Undead Iksar Monk", level: "35–45", type: "Undead" },
      { name: "Mist Specter", level: "40–50", type: "Undead / Spectral" },
      { name: "Iksar Ghost", level: "42–52", type: "Undead / Spectral" },
      { name: "Undead Iksar Warlord", level: "48–58", type: "Undead / Elite" },
      { name: "Emperor Ganak", level: "62+", type: "Boss / Spectral" }
    ],
    notableNPCs: [
      { name: "Emperor Ganak", role: "The undead ruler of the City of Mist, whose refusal to accept death has sustained the city's haunting for centuries." },
      { name: "Chief Archaeologist Flayne", role: "A living gnome who has camped on the outskirts for years, paying adventurers to recover artifacts from the inner city." }
    ]
  },

  {
    id: "cabilis-east",
    name: "Cabilis, Eastern",
    region: "Kunark",
    continent: "Kunark",
    adjacentZones: ["Field of Bone", "Cabilis West"],
    levelRange: "City",
    tags: ["City", "Iksar", "Starting City"],
    excerpt: "The eastern half of the great Iksar city, home to warrior and shaman guilds serving the lizard-folk empire.",
    background: `Cabilis is the reborn capital of the Iksar people, risen from the ashes of their ancient empire. Built on the bones of the old civilization, Cabilis is a city of raw determination — its architecture functional and militaristic, its streets patrolled by Iksar militia who tolerate no dissent. The city has expanded rapidly since its reestablishment, with entire districts still under construction.

    The eastern wing of Cabilis houses the warrior guilds, the merchant districts, and much of the residential population. Large statues of Iksar heroes and generals from the old empire line the main boulevards, their stone faces frozen in expressions of grim command. The east gate opens onto the Field of Bone — a vast graveyard-battlefield that serves as a constant reminder of the price the Iksar paid for their current territory.`,
    dangers: `Cabilis is a death trap for those not allied with the various sects of the xenophobic Iksar. Those who have not been accepted are advised to avoid the city gates at all costs, as the militia shows no mercy to unauthorized visitors. Even allied visitors may find navigating Iksar politics treacherous — the various guilds and noble houses maintain feuds with one another that occasionally spill into violence.`,
    benefits: `For Iksar characters, Cabilis East provides access to warrior and shaman trainers of the highest quality. The merchant district offers standard supplies plus specialized Iksar military equipment unavailable elsewhere. The guild halls maintain libraries of Iksar historical texts that are invaluable for understanding Kunark's complex history. Non-Iksar who earn faction standing here gain access to one of the most comprehensive military training programs on the continent.`,
    bestiary: [
      { name: "Iksar Guard", level: "15–25", type: "Humanoid" },
      { name: "Froglok Slave (escaped)", level: "10–18", type: "Humanoid" },
      { name: "Iksar Militia Enforcer", level: "25–35", type: "Humanoid / Elite" }
    ],
    notableNPCs: [
      { name: "Haggle Baron Dalnir", role: "The head of Cabilis's merchant council, who controls trade quotas for all non-Iksar goods entering the city." },
      { name: "Warlord Skollo", role: "Commander of the eastern gate garrison; notoriously hostile to outsiders but will hire adventurers to deal with froglok incursions." }
    ]
  },

  {
    id: "charasis",
    name: "Charasis (Howling Stones)",
    region: "Kunark",
    continent: "Kunark",
    adjacentZones: ["Emerald Jungle"],
    levelRange: "50–65",
    tags: ["Dungeon", "Undead", "Iksar", "Elite"],
    excerpt: "The ruins of an Iksar prison fortress, its undead inmates still incarcerated in eternal torment.",
    background: `Charasis, called the Howling Stones by adventurers for the perpetual moaning wind that passes through its shattered towers, was once the most feared prison in the Iksar Empire. The empire's most dangerous criminals and political prisoners were sent here — and when the empire fell, the prison fell with it, its guards dead and its inmates left to starve. Many of the prisoners were practitioners of dark magic, and their deaths created a spiritual resonance that has persisted for centuries.

    The "howling" that gives the ruins their common name is the literal sound of souls caught between death and release — a consequence of the spiritual containment wards that the Iksar built into the prison's foundations, wards that continue to function even in the absence of their creators. The undead here are not merely reanimated — they are trapped, which makes them furious.`,
    dangers: `Charasis is one of the most dangerous zones on Kunark. The undead Iksar within are not mindless wanderers — they retain the combat ability, magical knowledge, and vicious will of the living prisoners they once were. The prison's layout is deliberately confusing, designed to prevent mass escapes, and this makes navigation hazardous even for experienced adventurers. Multiple wings of the prison are accessible only by specific keys or by defeating wing guardians.`,
    benefits: `For the most experienced adventurers, Charasis is a trove of exceptional equipment. The former Iksar nobles and warlords imprisoned here carried weapons and armor of the highest quality into captivity, and those items remain with their undead forms. Certain magical seals found within the prison can be sold to Cabilis historians for substantial sums.`,
    bestiary: [
      { name: "Undead Iksar Noble", level: "50–58", type: "Undead" },
      { name: "Skeletal Warlord", level: "54–62", type: "Undead" },
      { name: "Revenant of Charasis", level: "58–65", type: "Undead / Spectral" },
      { name: "Prison Warden Garyx", level: "66+", type: "Boss / Undead" }
    ],
    notableNPCs: [
      { name: "Prison Warden Garyx", role: "The undead chief warden whose spirit remains bound to his post; defeating him is the key to accessing the deepest prison wing." }
    ]
  },

  // ═══════════════════════════════
  //  VELIOUS
  // ═══════════════════════════════

  {
    id: "great-divide",
    name: "Great Divide",
    region: "Velious",
    continent: "Velious",
    adjacentZones: ["Eastern Wastes", "Crystal Caverns", "Kael Drakkal", "Thurgadin"],
    levelRange: "35–50",
    tags: ["Outdoor", "Snow", "Giants", "Dwarves"],
    excerpt: "A vast arctic plain bisected by a mountain range where giant factions and dwarven refugees clash in the frozen wilderness.",
    background: `The Great Divide is the central region of Velious — a massive arctic plain that separates the Eastern Wastes from the more temperate (by Velious standards) western regions. The divide refers both to the physical geography of the mountain range that bisects the plain and to the factional divisions that dominate the region's politics. The dwarven city of Thurgadin lies embedded in the mountains to the south, while the giant city of Kael Drakkal dominates the northern range.

    Velious was largely unknown to the civilizations of Antonica and Kunark until relatively recently. The continent had been isolated by magical storms for centuries, a barrier created by the dragons of the Ring of Scale to prevent outside interference with their domain. When those barriers finally weakened, adventurers discovered a land of ice and stone inhabited by creatures — giants, dwarves, and dragons — who had developed in complete isolation.`,
    dangers: `The Great Divide is unforgiving. The cold alone can kill an unprepared traveler, and the distances between safe zones are enormous. Giants from Kael Drakkal patrol extensively and attack without provocation. The terrain hides crevasses and unstable ice sheets that can give way without warning. Storms roll in from the eastern wastes with little notice and can reduce visibility to near zero.`,
    benefits: `The Great Divide serves as the primary crossroads of Velious. The dwarven city of Thurgadin provides services, and the Coldain dwarves are among the most skilled gem-cutters and cold-forgers in Norrath. Giant-crafted weapons, while crude in appearance, are among the heaviest-hitting melee options available. The Crystal Caverns accessible from the divide's depths offer rare crystalline materials for enchanters and wizards.`,
    bestiary: [
      { name: "Coldain Dwarf Scout", level: "35–42", type: "Humanoid" },
      { name: "Kromrif Giant Warrior", level: "40–50", type: "Giant" },
      { name: "Velious Bear", level: "35–45", type: "Beast" },
      { name: "Ice Goblin", level: "32–40", type: "Humanoid" },
      { name: "Velium Mephit", level: "38–46", type: "Elemental" }
    ],
    notableNPCs: [
      { name: "Dain Frostreaver IV", role: "The Coldain dwarven king who rules Thurgadin; his political relationships with adventurers are complex and faction-dependent." },
      { name: "King Tormax", role: "The ruler of the giants of Kael Drakkal; a warlord of terrible power who sees all non-giants as prey or pawns." }
    ]
  },

  {
    id: "temple-of-veeshan",
    name: "Temple of Veeshan",
    region: "Velious",
    continent: "Velious",
    adjacentZones: ["Western Wastes"],
    levelRange: "55–70",
    tags: ["Dungeon", "Dragons", "Elite", "Raid"],
    excerpt: "The greatest stronghold of dragonkind on Norrath, carved into the ice cliffs of Velious by the Wurmqueen herself.",
    background: `The Temple of Veeshan is the sanctum of the Ring of Scale — the governing body of dragonkind on Norrath. It was carved into the ice cliffs of western Velious by Veeshan herself at the dawn of creation, marking the continent as the domain of her children. The temple is not merely a structure but a statement: Velious belongs to the dragons, and any civilization that arises there does so at the sufferance of the Wurmqueen's progeny.

    The Ring of Scale dragons who inhabit the temple are among the oldest and most powerful entities in existence. They have accumulated magical knowledge over centuries of uninterrupted study, and their hoard chambers contain artifacts from civilizations that no longer exist. The temple is not actively hostile to all visitors — the dragons maintain a rigid social protocol, and those who approach correctly may gain audience with beings of extraordinary knowledge.`,
    dangers: `The Temple of Veeshan is the most dangerous location on Velious and one of the most dangerous on Norrath. The dragons here — Ancient Dragons, Elders, and Primes — represent the pinnacle of the Ring of Scale hierarchy. Their breath weapons alone can level an unprepared party. The wards and traps within the temple were designed by draconic intellects working over centuries, and they remain fully functional. Only the most coordinated and powerful groups of adventurers have any hope of surviving deep incursions.`,
    benefits: `For those capable of reaching and surviving the Temple of Veeshan's depths, the rewards are unparalleled. Dragon treasure hoards contain artifacts and magical equipment that no living craftsperson can reproduce. Draconic scales, claws, and essence components are ingredients in the most powerful alchemical and magical formulas known. The knowledge contained in the draconic libraries — accessible only to those the dragons choose to honor with access — represents the greatest repository of magical theory on Norrath.`,
    bestiary: [
      { name: "Guardian Drake", level: "55–62", type: "Dragon" },
      { name: "Ancient Dragon Kin", level: "60–68", type: "Dragon / Elite" },
      { name: "Ring of Scale Elder", level: "65–72", type: "Dragon / Raid" },
      { name: "Vulak'Aerr", level: "75+", type: "Boss / Dragon / Raid" }
    ],
    notableNPCs: [
      { name: "Vulak'Aerr", role: "The acting leader of the Ring of Scale in the physical plane; an ancient dragon whose patience has been worn thin by repeated adventurer incursions." },
      { name: "Dozekar the Cursed", role: "A Ring of Scale dragon under a peculiar curse that makes him semi-cooperative with visitors, though the nature of the curse is not widely understood." }
    ]
  },

  // ═══════════════════════════════
  //  LUCLIN
  // ═══════════════════════════════

  {
    id: "acrylia-caverns",
    name: "Acrylia Caverns",
    region: "Luclin",
    continent: "Luclin (The Moon)",
    adjacentZones: ["Grimling Forest"],
    levelRange: "35–50",
    tags: ["Dungeon", "Grimlings", "Vah Shir", "Undead"],
    excerpt: "Deep mines beneath Luclin's surface where grimlings have enslaved the undead remnants of the Vah Shir.",
    background: `The Acrylia Caverns are a series of tunnels and shafts that extend deep into the surface of Luclin. Named for the acrylia mineral — a substance unique to the moon that resonates with arcane energy — the mines were initially worked by the Vah Shir cat-people before the grimlings seized control of the deeper operations. Sharp twists, narrow alleys, and dark passageways make the mines difficult to navigate and favor smaller-sized adventuring parties.

    Twisted, gnarly creatures known as "grimlings" inhabit the deeper areas. Although not especially powerful individually, grimlings operate in coordinated swarms directed by shamans of considerable ability. More disturbing are the undead Vah Shir that the grimlings have raised from the remains of those who died in the mines — workers whose spirits are now enslaved by grimling necromantic practices.`,
    dangers: `The mines' narrow confines make large group formations difficult to maintain. Grimlings' preference for ambush means that seemingly clear passages may conceal dozens of them waiting in crevices. The undead Vah Shir are particularly unsettling to Vah Shir player characters, who may feel a cultural horror at facing the animated remains of their kin. Deeper in the mines, summoned entities of unclear origin guard the grimling shamans' ritual chambers.`,
    benefits: `Acrylia ore is one of the most valuable materials on Luclin. Smiths and enchanters in Shadow Haven pay substantial sums for raw acrylia and refined acrylia bars. Grimling shamanic components recovered from the deeper chambers are ingredients in Luclin-specific magical formulas. The Vah Shir faction may offer rewards for recovering artifacts looted from Vah Shir dead by the grimlings.`,
    bestiary: [
      { name: "Grimling Scout", level: "35–42", type: "Humanoid" },
      { name: "Grimling Warrior", level: "38–46", type: "Humanoid" },
      { name: "Grimling Shaman", level: "40–50", type: "Humanoid / Caster" },
      { name: "Undead Vah Shir", level: "42–52", type: "Undead" },
      { name: "Summoned Grimling Entity", level: "48–56", type: "Summoned" }
    ],
    notableNPCs: [
      { name: "High Shaman Grixak", role: "The grimling shaman lord who oversees the necromantic operations within the caverns; defeating him collapses the undead Vah Shir's binding." }
    ]
  },

  {
    id: "akheva-ruins",
    name: "Akheva Ruins",
    region: "Luclin",
    continent: "Luclin (The Moon)",
    adjacentZones: ["The Grey", "Umbral Plains"],
    levelRange: "52–68",
    tags: ["Dungeon", "Akheva", "Undead", "Elite"],
    excerpt: "The shattered city of the Akheva — servants of Luclin herself — where ancient rites continue in timeless shadow.",
    background: `The Akheva are beings of shadow and devotion, created or elevated by the goddess Luclin to serve her directly. Their ruined city — the Akheva Ruins — lies in one of the most desolate regions of the moon, a place where the ambient light of Norrath far below never penetrates. The city was once a center of religious and arcane activity, but something went catastrophically wrong, and today its ruins are inhabited by the echoes of what once was: undead akheva still performing rites to their goddess, and more dangerous entities that arose in the wake of the disaster.

    Adventurers who have survived ventures into the ruins report large varieties of strange creatures. Most notable are the "centi" — beings of tangible shadow and life, constructed from the physical forms of Tegi prisoners and the enchanted blood of the Akheva priests. These creatures obey every command given by their masters and are among the most unnerving adversaries on Luclin.`,
    dangers: `The Akheva Ruins are among the most challenging areas on Luclin. The centi beings are difficult to damage by conventional means due to their partial shadow nature. Mind Burrowers — creatures that attack psychic faculties rather than physical ones — can incapacitate spellcasters without warning. The Shaded Stones, golems of solidified shadow, are nearly immune to physical damage and require magical strikes to harm. Powerful priests of the Akheva itself occupy the innermost sanctum and possess abilities that combine clerical healing with offensive shadow magic.`,
    benefits: `Shadow-touched equipment recovered from the Akheva Ruins has properties that enhance stealth, shadow-based magic, and illusion capabilities beyond what can be crafted on the surface of Norrath. Akheva historical texts, when decipherable, provide insight into the nature of the goddess Luclin and the moon's early history that is unavailable elsewhere. Shadow Haven scholars pay handsomely for verified Akheva artifacts.`,
    bestiary: [
      { name: "Centi Shade", level: "52–60", type: "Shadow / Construct" },
      { name: "Mind Burrower", level: "54–62", type: "Aberration" },
      { name: "Shaded Stone", level: "56–64", type: "Construct / Shadow" },
      { name: "Akheva Priest", level: "58–68", type: "Undead / Caster" },
      { name: "Itraer Vius", level: "70+", type: "Boss / Akheva" }
    ],
    notableNPCs: [
      { name: "Itraer Vius", role: "A high priest of the Akheva who survived the catastrophe by transformation; he now guards the innermost sanctum with fanatical purpose." }
    ]
  },

  {
    id: "bazaar",
    name: "The Bazaar",
    region: "Luclin",
    continent: "Luclin (The Moon)",
    adjacentZones: ["Shadow Haven", "Nexus"],
    levelRange: "Trade Zone",
    tags: ["City", "Trade", "Safe Zone"],
    excerpt: "The great marketplace of Luclin where travelers of all races meet to barter — the only place on the moon where all prejudices are set aside.",
    background: `The Bazaar is one of three main parts that belong to the region known as Fordel Mist in Shadow Haven on Luclin. It is the common place where travelers of all race, religious persuasion, and profession may meet to exchange goods and barter for prized crafts of tradesmen. The only prejudice that resides in the Bazaar is that of the individual, though these prejudices are not upheld by the native residents.

    The Bazaar emerged naturally as Luclin became more populated by visitors from Norrath. As the Nexus spire transported adventurers from across the world to the moon's surface, they brought their goods with them, and an informal trading post evolved into the most cosmopolitan market in known history. Items from Original EQ zones, Kunark relics, Velious dragon-forged gear, and Luclin's own unique materials all circulate through the Bazaar's stalls.`,
    dangers: `There are no inherent dangers in the Bazaar itself. The native residents enforce a strict no-combat policy and have powerful magical wards to back it up. Price gouging and trade fraud are the most significant risks a visitor faces — novice traders should verify item values before purchasing.`,
    benefits: `The Bazaar provides access to equipment, reagents, and trade goods from every region of Norrath. Experienced traders can accumulate significant wealth here by arbitraging price differences between zones. The trading infrastructure — merchant stalls, price boards, and auction systems — makes the Bazaar the economic center of Luclin and one of the most important commercial hubs in the known world.`,
    bestiary: [],
    notableNPCs: [
      { name: "Bazaar Treasurer Mavin", role: "The gnome treasurer who maintains the Bazaar's exchange rates and arbitrates trade disputes." },
      { name: "Merchant Selindra", role: "A Wood Elf trader who specializes in rare Velious goods and can direct buyers to specific stall locations." }
    ]
  },

  // ═══════════════════════════════
  //  PLANES OF POWER
  // ═══════════════════════════════

  {
    id: "plane-of-knowledge",
    name: "Plane of Knowledge",
    region: "Planes of Power",
    continent: "The Planes",
    adjacentZones: ["All major zones via portals"],
    levelRange: "Hub Zone",
    tags: ["City", "Hub", "Safe Zone", "Library"],
    excerpt: "The great nexus of all knowledge and travel, home to the Library of Myrist and portals to every corner of Norrath.",
    background: `The Plane of Knowledge is unlike any other location in existence — it is a plane designed not for habitation but for connection and learning. Its central feature is the Library of Myrist, an impossibly vast repository of knowledge curated by Maelin Starpyre, the grand librarian whose very existence is tied to the preservation of all recorded wisdom.

    The plane serves as the primary travel hub for all of Norrath. Teleportation stones and magical spires connect to every major zone on every continent, making the Plane of Knowledge the crossroads of the world. Scholars, adventurers, traders, and travelers from every race and faction pass through its halls daily. The plane is governed by an absolute peace — violence within its borders is simply impossible, suppressed by divine mandate.`,
    dangers: `Within the Plane of Knowledge, there are no physical dangers. The plane is absolutely safe from violence. The only risks are those of information — powerful knowledge here can attract the attention of entities who would prevent its dissemination, and certain restricted wings of the library contain knowledge that has driven scholars to madness.`,
    benefits: `The Plane of Knowledge is the single most important location for high-level adventurers. All guild trainers for all classes maintain offices here, teaching advanced techniques to those ready to receive them. The library contains quest information, historical context, and magical formulas unavailable anywhere else. The extensive teleportation network saves enormous amounts of travel time.`,
    bestiary: [],
    notableNPCs: [
      { name: "Maelin Starpyre", role: "Grand Librarian of Myrist; an ancient gnome whose body has been sustained by magic far beyond its natural lifespan to tend the library's infinite volumes." },
      { name: "Zebuxoruk", role: "The Ungod — a being of power equal to the gods who was stripped of his divinity and imprisoned in the Plane of Knowledge for attempting to share forbidden knowledge with mortals." }
    ]
  },

  {
    id: "plane-of-fire",
    name: "Plane of Fire",
    region: "Planes of Power",
    continent: "The Planes",
    adjacentZones: ["Plane of Knowledge (via portal)"],
    levelRange: "62–70",
    tags: ["Raid", "Elemental", "Elite", "Fire"],
    excerpt: "The elemental realm of Solusek Ro, a landscape of ash, magma, and fire elemental armies beyond mortal comprehension.",
    background: `The Plane of Fire is the domain of Solusek Ro, the Burning Prince, one of Norrath's most powerful deities. It is a realm of unending inferno — lava seas, volcanic islands, and skies perpetually lit by solar flares. The fire elementals that dwell here are not mere magical constructs but true citizens of their plane, beings of pure energy and will who serve their god with devotion and attack outsiders with absolute fury.

    The architecture of the plane is organic — towers of hardened lava, bridges of cooled obsidian, and open plazas where the ambient heat would ignite the clothing of any visitor not protected by powerful magical wards. Efreeti — ancient fire djinn of immense power — serve as Solusek Ro's generals and administrators, commanding the elemental forces that defend the plane's inner sanctum.`,
    dangers: `The Plane of Fire is accessible only to the most powerful adventuring groups in Norrath. The ambient heat alone requires continuous magical protection to survive. Fire elementals here are of a caliber that dwarfs their counterparts in the Lavastorm Mountains — they are intelligent, organized, and capable of coordinating large-scale tactical responses to incursions. The Efreeti generals are near-deity in their power and possess both physical and magical abilities that can eliminate entire groups.`,
    benefits: `The treasures of the Plane of Fire are the finest fire-aspected equipment available anywhere. Weapons forged in the heart of the plane carry fire damage properties that no Norrathian forge can replicate. The materials recovered here — efreeti ichor, elemental fire crystals, and fragments of Solusek Ro's divine investiture — are ingredients in the most powerful fire-magic formulas known.`,
    bestiary: [
      { name: "Fire Elemental Warrior", level: "62–68", type: "Elemental" },
      { name: "Efreeti Lord", level: "65–72", type: "Elemental / Elite" },
      { name: "Lava Spider", level: "60–67", type: "Beast / Elemental" },
      { name: "Fennin Ro (Avatar)", level: "75+", type: "Boss / God / Raid" }
    ],
    notableNPCs: [
      { name: "Fennin Ro", role: "The Tyrant of Fire, avatar of Solusek Ro's power within the plane; among the most powerful bosses accessible to adventurers in the Planes of Power campaign." }
    ]
  },

  {
    id: "plane-of-air",
    name: "Plane of Air (Xegony's Realm)",
    region: "Planes of Power",
    continent: "The Planes",
    adjacentZones: ["Plane of Knowledge (via portal)"],
    levelRange: "60–68",
    tags: ["Raid", "Elemental", "Elite", "Flying"],
    excerpt: "The realm of Xegony, Queen of Air, where floating islands hang in an infinite sky and elemental winds carry whispers of the gods.",
    background: `The Plane of Air is an endless sky — there is no ground, no horizon, only clouds, wind, and floating islands of varying sizes connected by bridges of crystallized air. Xegony, the Queen of Air, rules here with serene authority, her elemental subjects ranging from gentle zephyrs to storm titans capable of shattering mountains. The plane operates by its own logic: gravity is optional, and the wind carries messages, memories, and the will of the goddess with equal ease.

    The floating islands are arranged in tiers of increasing importance, with the outermost tier accessible first and the inner sanctum where Xegony herself resides accessible only after proving one's worth against the outer guardians. Each island is a self-contained ecosystem shaped by the wind — some are frozen in perpetual storm, others are places of impossible calm where the air itself feels sacred.`,
    dangers: `The most fundamental danger in the Plane of Air is falling — a misstep on any island's edge sends one into an infinite plummet. Air elementals of the size and power found here use their movement capabilities to knock adventurers from platforms into the void. The wind itself can be weaponized, and Xegony's elemental generals command gales that strip protective spells from those they target. Navigation is disorienting for surface-dwellers unused to operating in three dimensions.`,
    benefits: `Air-aspected equipment from the Plane of Air carries flight enhancement properties unavailable elsewhere. Windwalking materials and essences of air recovered here are components in the most powerful levitation and teleportation magic available. Xegony's chamber contains magical texts describing the nature of elemental air that are of extraordinary scholarly value.`,
    bestiary: [
      { name: "Air Elemental Sentinel", level: "60–67", type: "Elemental" },
      { name: "Storm Warden", level: "63–70", type: "Elemental / Elite" },
      { name: "Tempest Titan", level: "66–72", type: "Elemental / Raid" },
      { name: "Xegony the Queenmother", level: "75+", type: "Boss / God / Raid" }
    ],
    notableNPCs: [
      { name: "Xegony the Queenmother", role: "Queen of the elemental air; she is distant and serene but devastatingly powerful when roused to combat." }
    ]
  },

  {
    id: "plane-of-time",
    name: "Plane of Time",
    region: "Planes of Power",
    continent: "The Planes",
    adjacentZones: ["Plane of Knowledge (final portal)"],
    levelRange: "65–70",
    tags: ["Raid", "Elite", "End Game", "Gods"],
    excerpt: "The timeless realm beyond the gods, where the greatest adventurers challenge the fabric of divine order itself.",
    background: `The Plane of Time is the final destination of the Planes of Power journey — a realm outside of normal temporal flow where the essence of Norrath's history is preserved in crystalline stasis. It is here that Quarm, a being of terrible power who has been accumulating divine essence, has established his dominion.

    The plane is not a place in any conventional sense. It is a convergence of all timelines — past battles, future possibilities, and the echoes of gods who have risen and fallen playing out simultaneously in an environment that defies mortal comprehension. Only those who have proven their capabilities by defeating the elemental planes' guardians and assembling the required flags of passage can even reach its threshold.`,
    dangers: `The Plane of Time represents the absolute pinnacle of adventuring danger in this era of Norrath. Quarm is a composite entity drawing power from multiple divine sources and is capable of defeating entire armies of experienced adventurers. The temporal distortions within the plane affect spells and abilities in unpredictable ways. The entities that serve Quarm are themselves gods stripped of their full power — still vastly more dangerous than any mortal adversary.`,
    benefits: `The loot from the Plane of Time is the most powerful equipment available to mortals in the current age. Weapons and armor recovered here carry divine enchantments that represent the pinnacle of Norrathian equipment. The experience of defeating Quarm is transformative — those who accomplish it are numbered among the greatest heroes in Norrath's history.`,
    bestiary: [
      { name: "Temporal Sentry", level: "65–70", type: "Construct / Divine" },
      { name: "Divine Guardian", level: "68–72", type: "Elemental / Divine / Raid" },
      { name: "Quarm", level: "75+", type: "Boss / God / Raid" }
    ],
    notableNPCs: [
      { name: "Quarm", role: "The final adversary of the Planes of Power journey; a composite entity of divine power whose defeat signals the end of the current age of planar threat." }
    ]
  }
];

// Region groupings for navigation
const REGIONS = {
  "Antonica": {
    description: "The original continent of Norrath, birthplace of civilization and home to Freeport and Qeynos.",
    color: "#4a7a4a"
  },
  "Faydwer": {
    description: "The continent of elves and dwarves, dominated by the great Faydark forest and the Butcherblock Mountains.",
    color: "#7a5a20"
  },
  "Odus": {
    description: "Remote continent home to the erudite sages of Erudin and the dark city of Paineel.",
    color: "#4a4a7a"
  },
  "Kunark": {
    description: "Ancient continent of the Iksar lizard-folk, rich in ruins and danger, across the Timorous Deep.",
    color: "#7a3a20"
  },
  "Velious": {
    description: "The frozen continent of the far south, dominated by dragons, giants, and the frozen Coldain dwarves.",
    color: "#5a7a8a"
  },
  "Luclin (The Moon)": {
    description: "The moon of Norrath, home to the Vah Shir cat-people and the ancient Akheva servants of the moon goddess.",
    color: "#6a4a7a"
  },
  "The Planes": {
    description: "The divine realms beyond the mortal world, domains of gods and elemental powers accessible only to the mightiest adventurers.",
    color: "#8a6a1a"
  }
};
