/*--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--.
/ .. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \
\ \/\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ \/ /
 \/ /`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'\/ /
 / /\                                                                    / /\
/ /\ \      ,---,.                                                      / /\ \
\ \/ /    ,'  .' |                 ,---,                                \ \/ /
 \/ /   ,---.'   |               ,---.'|                                 \/ /
 / /\   |   |   .'               |   | :                                 / /\
/ /\ \  :   :  :    ,--.--.      |   | |   ,---.                        / /\ \
\ \/ /  :   |  |-, /       \   ,--.__| |  /     \                       \ \/ /
 \/ /   |   :  ;/|.--.  .-. | /   ,'   | /    /  |                       \/ /
 / /\   |   |   .' \__\/: . ..   '  /  |.    ' / |                       / /\
/ /\ \  '   :  '   ," .--.; |'   ; |:  |'   ;   /|                      / /\ \
\ \/ /  |   |  |  /  /  ,.  ||   | '/  ''   |  / |                      \ \/ /
 \/ /   |   :  \ ;  :   .'   \   :    :||   :    |                       \/ /
 / /\   |   | ,' |  ,     .-./\   \  /   \   \  /                        / /\
/ /\ \  `----'    `--`---'     `----'     `----'                        / /\ \
\ \/ /    .--.--.       ___                                   ___       \ \/ /
 \/ /    /  /    '.   ,--.'|_                               ,--.'|_      \/ /
 / /\   |  :  /`. /   |  | :,'   __  ,-.                    |  | :,'     / /\
/ /\ \  ;  |  |--`    :  : ' : ,' ,'/ /|                    :  : ' :    / /\ \
\ \/ /  |  :  ;_    .;__,'  /  '  | |' | ,---.     ,---.  .;__,'  /     \ \/ /
 \/ /    \  \    `. |  |   |   |  |   ,'/     \   /     \ |  |   |       \/ /
 / /\     `----.   \:__,'| :   '  :  / /    /  | /    /  |:__,'| :       / /\
/ /\ \    __ \  \  |  '  : |__ |  | ' .    ' / |.    ' / |  '  : |__    / /\ \
\ \/ /   /  /`--'  /  |  | '.'|;  : | '   ;   /|'   ;   /|  |  | '.'|   \ \/ /
 \/ /   '--'.     /   ;  :    ;|  , ; '   |  / |'   |  / |  ;  :    ;    \/ /
 / /\     `--'---'    |  ,   /  ---'  |   :    ||   :    |  |  ,   /     / /\
/ /\ \                 ---`-'          \   \  /  \   \  /    ---`-'     / /\ \
\ \/ /                                  `----'    `----'                \ \/ /
 \/ /                                                                    \/ /
 / /\.--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--./ /\
/ /\ \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \/\ \
\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `' /
 `--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'

	https://gearfo.itch.io/fade-street

	GB Studio events to create perceptually correct-ish colour fades.

	Multiple Fades with Colour Cycles

 */

const id = "GF_EVENT_FADE_STREET_MULTI_CYCLE";
const groups = ["Fade Street"];
const description = "Like eight Special Fade With Colour Cycle events in one. If you have more than one fade or cycle event running in different script threads, you can combine them all into one Multiple Fade With Colour Cycle event. This has the benefit of keeping the different fades and cycles completely in sync. The event ends when all cycles end at the same time, i.e. it keeps going until they all sync up. This can take a long time and a lot of ROM space if the cycle lengths are different. If there are no cycles selected, the event ends when the longest fade ends.";
const subGroups = {"Fade Street": "Colour Mode - Fade And Colour Cycle"};
const name = "Multiple Fades With Colour Cycles";

const num_tabs = 8; // number of ui tabs / number of simultaneous cycles allowed

const autoLabel = (fetchArg) => {
	// get inputs:
	let start_pal_inputs = Array(num_tabs);
	let end_pal_inputs = Array(num_tabs);
	let checkboxes = Array(num_tabs);
	let fade_steps = [];
	let fade_wait_frames = [];
	let cycle_wait_frames = [];
	for (let tab = 0; tab < 8; ++tab) {
		const t_index = tab + 1;
		fade_steps.push(fetchArg(`tab${t_index}_fade_steps`));
		fade_wait_frames.push(fetchArg(`tab${t_index}_fade_frames`));
		cycle_wait_frames.push(fetchArg(`tab${t_index}_cycle_frames`));
		checkboxes[tab] = []
		start_pal_inputs[tab] = [];
		end_pal_inputs[tab] = [];
		for (let bkg = 0; bkg < 8; ++bkg) {
			start_pal_inputs[tab].push(fetchArg(`tab${t_index}_bkg${bkg}_start`));
			end_pal_inputs[tab].push(fetchArg(`tab${t_index}_bkg${bkg}_end`));
			for (let c = 0; c < 4; ++c) {
				checkboxes[tab].push(fetchArg(`tab${t_index}_bkg${bkg}_use${c}`));
			}
		}
		for (let obj = 0; obj < 8; ++obj) {
			start_pal_inputs[tab].push(fetchArg(`tab${t_index}_obj${obj}_start`));
			end_pal_inputs[tab].push(fetchArg(`tab${t_index}_obj${obj}_end`));
			for (let c = 0; c < 4; ++c) {
				checkboxes[tab].push(fetchArg(`tab${t_index}_obj${obj}_use${c}`));
			}
		}
	}

	// determine colour indices involved in fades and cycles
	let cycle_indices = [];
	let fade_indices = [];
	let fade_total_frames = [];
	for (let tab = 0; tab < num_tabs; ++tab) {
		cycle_indices.push(new Set());
		fade_indices.push(new Set());
		for (let p_index = 0; p_index < 16; ++p_index) { // 8 bkg and 8 obj pals
			const used_pal = !(start_pal_inputs[tab][p_index] === "keep" || end_pal_inputs[tab][p_index] === "keep");
			for (let c_index = 0; c_index < 4; ++c_index) {
				const linear_index = p_index * 4 + c_index;
				if (used_pal) {
					fade_indices[tab].add(linear_index);
					if (checkboxes[tab][linear_index] === "true") {
						cycle_indices[tab].add(linear_index);
					}
				}
			}
		}
		if (fade_indices[tab].size > 0) {
			fade_total_frames.push(fade_steps[tab] * fade_wait_frames[tab]);
		}
	}
	
	for (let tab = 0; tab < num_tabs; ++tab) {
		for (let t2 = tab + 1; t2 < num_tabs; ++t2) {
			cycle_indices[tab].forEach((n) => cycle_indices[t2].delete(n));
		}
		for (let t2 = 0; t2 < num_tabs; ++t2) {
			cycle_indices[tab].forEach((n) => fade_indices[t2].delete(n));
		}
	}
	
	for (let tab = 0; tab < num_tabs; ++tab) {
		for (let t2 = tab + 1; t2 < num_tabs; ++t2) {
			fade_indices[tab].forEach((n) => fade_indices[t2].delete(n));
		}
	}

	// find the total length of the effect in frames:
	let all_cycles_frames = 1;
	for (let tab = 0; tab < num_tabs; ++tab) {
		if (cycle_indices[tab].size > 0) {
			all_cycles_frames = lcm(all_cycles_frames, cycle_indices[tab].size * cycle_wait_frames[tab]);
		}
	}

	const fade_length = fade_total_frames.reduce((a, b) => Math.max(a, b), 0);
	let total_frames = all_cycles_frames;
	if (total_frames == 1) {
		total_frames = fade_length;
	} else {
		while (total_frames < fade_length) {
			total_frames += all_cycles_frames;
		}
	}
	let split_str = "";
	if (fetchArg("banksplit_check") == "true") {
		if (fetchArg("banksplit") == "first") {
			total_frames = Math.floor(total_frames / 2);
			split_str = "pt. 1/2 "; 
		} else {
			total_frames -= Math.floor(total_frames / 2);
			split_str = "pt. 2/2 "; 
		}
	}
	return `Multiple Fades With Colour Cycles ${split_str}(${total_frames} frames)`;
}

const fields = [
	{
		key: "tabs",
		type: "tabs",
		defaultValue: "cycle1",
		values: {
			cycle1: "Cycle 1",
			cycle2: "Cycle 2",
			cycle3: "Cycle 3",
			cycle4: "Cycle 4",
			cycle5: "Cycle 5",
			cycle6: "Cycle 6",
			cycle7: "Cycle 7",
			cycle8: "Cycle 8",
		},
	},
	{
		label: "________________________________________________________",
	},
	
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade from:",
				width: "50%",
				description: "Preset effect to apply to the starting palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab1_startpoint",
				type: "select",
				options: [
					["normal",      "starting palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "starting palettes (desaturated)"],
					["hue", 	"starting palettes (hue shifted)"],
					["night", 	"starting palettes (day for night filter)"],
					["saturated",   "starting palettes (saturated)"],
					["inverted",    "starting palettes (inverted)"],
					["colourised",  "starting palettes (colourised - enter RGB)"],
					["multiply", 	"starting palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
			{
				key: "tab1_startpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab1_starting_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
			{
				key: "tab1_startpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab1_starting_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
			{
				key: "tab1_startpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab1_starting_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
			{
				key: "tab1_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab1_starting_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
			{
				key: "tab1_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab1_starting_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
			{
				key: "tab1_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab1_starting_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
			{
				key: "tab1_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade to:",
				width: "50%",
				description: "Preset effect to apply to the final palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab1_endpoint",
				type: "select",
				options: [
					["normal",      "final palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "final palettes (desaturated)"],
					["hue", 	"final palettes (hue shifted)"],
					["night", 	"final palettes (day for night filter)"],
					["saturated",   "final palettes (saturated)"],
					["inverted",    "final palettes (inverted)"],
					["colourised",  "final palettes (colourised - enter RGB)"],
					["multiply",	"final palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
			{
				key: "tab1_endpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab1_target_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
			{
				key: "tab1_endpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab1_target_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
			{
				key: "tab1_endpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab1_target_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
			{
				key: "tab1_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab1_target_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
			{
				key: "tab1_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab1_target_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
			{
				key: "tab1_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab1_target_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
			{
				key: "tab1_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade from:",
				width: "50%",
				description: "Preset effect to apply to the starting palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab2_startpoint",
				type: "select",
				options: [
					["normal",      "starting palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "starting palettes (desaturated)"],
					["hue", 	"starting palettes (hue shifted)"],
					["night", 	"starting palettes (day for night filter)"],
					["saturated",   "starting palettes (saturated)"],
					["inverted",    "starting palettes (inverted)"],
					["colourised",  "starting palettes (colourised - enter RGB)"],
					["multiply", 	"starting palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
			{
				key: "tab2_startpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab2_starting_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
			{
				key: "tab2_startpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab2_starting_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
			{
				key: "tab2_startpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab2_starting_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
			{
				key: "tab2_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab2_starting_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
			{
				key: "tab2_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab2_starting_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
			{
				key: "tab2_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab2_starting_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
			{
				key: "tab2_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade to:",
				width: "50%",
				description: "Preset effect to apply to the final palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab2_endpoint",
				type: "select",
				options: [
					["normal",      "final palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "final palettes (desaturated)"],
					["hue", 	"final palettes (hue shifted)"],
					["night", 	"final palettes (day for night filter)"],
					["saturated",   "final palettes (saturated)"],
					["inverted",    "final palettes (inverted)"],
					["colourised",  "final palettes (colourised - enter RGB)"],
					["multiply",	"final palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
			{
				key: "tab2_endpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab2_target_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
			{
				key: "tab2_endpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab2_target_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
			{
				key: "tab2_endpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab2_target_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
			{
				key: "tab2_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab2_target_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
			{
				key: "tab2_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab2_target_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
			{
				key: "tab2_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab2_target_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
			{
				key: "tab2_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade from:",
				width: "50%",
				description: "Preset effect to apply to the starting palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab3_startpoint",
				type: "select",
				options: [
					["normal",      "starting palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "starting palettes (desaturated)"],
					["hue", 	"starting palettes (hue shifted)"],
					["night", 	"starting palettes (day for night filter)"],
					["saturated",   "starting palettes (saturated)"],
					["inverted",    "starting palettes (inverted)"],
					["colourised",  "starting palettes (colourised - enter RGB)"],
					["multiply", 	"starting palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
			{
				key: "tab3_startpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab3_starting_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
			{
				key: "tab3_startpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab3_starting_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
			{
				key: "tab3_startpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab3_starting_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
			{
				key: "tab3_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab3_starting_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
			{
				key: "tab3_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab3_starting_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
			{
				key: "tab3_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab3_starting_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
			{
				key: "tab3_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade to:",
				width: "50%",
				description: "Preset effect to apply to the final palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab3_endpoint",
				type: "select",
				options: [
					["normal",      "final palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "final palettes (desaturated)"],
					["hue", 	"final palettes (hue shifted)"],
					["night", 	"final palettes (day for night filter)"],
					["saturated",   "final palettes (saturated)"],
					["inverted",    "final palettes (inverted)"],
					["colourised",  "final palettes (colourised - enter RGB)"],
					["multiply",	"final palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
			{
				key: "tab3_endpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab3_target_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
			{
				key: "tab3_endpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab3_target_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
			{
				key: "tab3_endpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab3_target_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
			{
				key: "tab3_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab3_target_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
			{
				key: "tab3_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab3_target_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
			{
				key: "tab3_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab3_target_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
			{
				key: "tab3_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade from:",
				width: "50%",
				description: "Preset effect to apply to the starting palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab4_startpoint",
				type: "select",
				options: [
					["normal",      "starting palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "starting palettes (desaturated)"],
					["hue", 	"starting palettes (hue shifted)"],
					["night", 	"starting palettes (day for night filter)"],
					["saturated",   "starting palettes (saturated)"],
					["inverted",    "starting palettes (inverted)"],
					["colourised",  "starting palettes (colourised - enter RGB)"],
					["multiply", 	"starting palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
			{
				key: "tab4_startpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab4_starting_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
			{
				key: "tab4_startpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab4_starting_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
			{
				key: "tab4_startpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab4_starting_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
			{
				key: "tab4_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab4_starting_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
			{
				key: "tab4_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab4_starting_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
			{
				key: "tab4_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab4_starting_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
			{
				key: "tab4_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade to:",
				width: "50%",
				description: "Preset effect to apply to the final palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab4_endpoint",
				type: "select",
				options: [
					["normal",      "final palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "final palettes (desaturated)"],
					["hue", 	"final palettes (hue shifted)"],
					["night", 	"final palettes (day for night filter)"],
					["saturated",   "final palettes (saturated)"],
					["inverted",    "final palettes (inverted)"],
					["colourised",  "final palettes (colourised - enter RGB)"],
					["multiply",	"final palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
			{
				key: "tab4_endpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab4_target_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
			{
				key: "tab4_endpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab4_target_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
			{
				key: "tab4_endpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab4_target_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
			{
				key: "tab4_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab4_target_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
			{
				key: "tab4_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab4_target_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
			{
				key: "tab4_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab4_target_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
			{
				key: "tab4_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade from:",
				width: "50%",
				description: "Preset effect to apply to the starting palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab5_startpoint",
				type: "select",
				options: [
					["normal",      "starting palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "starting palettes (desaturated)"],
					["hue", 	"starting palettes (hue shifted)"],
					["night", 	"starting palettes (day for night filter)"],
					["saturated",   "starting palettes (saturated)"],
					["inverted",    "starting palettes (inverted)"],
					["colourised",  "starting palettes (colourised - enter RGB)"],
					["multiply", 	"starting palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
			{
				key: "tab5_startpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab5_starting_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
			{
				key: "tab5_startpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab5_starting_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
			{
				key: "tab5_startpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab5_starting_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
			{
				key: "tab5_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab5_starting_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
			{
				key: "tab5_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab5_starting_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
			{
				key: "tab5_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab5_starting_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
			{
				key: "tab5_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade to:",
				width: "50%",
				description: "Preset effect to apply to the final palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab5_endpoint",
				type: "select",
				options: [
					["normal",      "final palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "final palettes (desaturated)"],
					["hue", 	"final palettes (hue shifted)"],
					["night", 	"final palettes (day for night filter)"],
					["saturated",   "final palettes (saturated)"],
					["inverted",    "final palettes (inverted)"],
					["colourised",  "final palettes (colourised - enter RGB)"],
					["multiply",	"final palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
			{
				key: "tab5_endpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab5_target_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
			{
				key: "tab5_endpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab5_target_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
			{
				key: "tab5_endpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab5_target_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
			{
				key: "tab5_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab5_target_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
			{
				key: "tab5_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab5_target_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
			{
				key: "tab5_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab5_target_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
			{
				key: "tab5_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade from:",
				width: "50%",
				description: "Preset effect to apply to the starting palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab6_startpoint",
				type: "select",
				options: [
					["normal",      "starting palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "starting palettes (desaturated)"],
					["hue", 	"starting palettes (hue shifted)"],
					["night", 	"starting palettes (day for night filter)"],
					["saturated",   "starting palettes (saturated)"],
					["inverted",    "starting palettes (inverted)"],
					["colourised",  "starting palettes (colourised - enter RGB)"],
					["multiply", 	"starting palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
			{
				key: "tab6_startpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab6_starting_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
			{
				key: "tab6_startpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab6_starting_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
			{
				key: "tab6_startpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab6_starting_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
			{
				key: "tab6_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab6_starting_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
			{
				key: "tab6_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab6_starting_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
			{
				key: "tab6_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab6_starting_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
			{
				key: "tab6_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade to:",
				width: "50%",
				description: "Preset effect to apply to the final palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab6_endpoint",
				type: "select",
				options: [
					["normal",      "final palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "final palettes (desaturated)"],
					["hue", 	"final palettes (hue shifted)"],
					["night", 	"final palettes (day for night filter)"],
					["saturated",   "final palettes (saturated)"],
					["inverted",    "final palettes (inverted)"],
					["colourised",  "final palettes (colourised - enter RGB)"],
					["multiply",	"final palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
			{
				key: "tab6_endpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab6_target_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
			{
				key: "tab6_endpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab6_target_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
			{
				key: "tab6_endpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab6_target_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
			{
				key: "tab6_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab6_target_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
			{
				key: "tab6_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab6_target_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
			{
				key: "tab6_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab6_target_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
			{
				key: "tab6_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade from:",
				width: "50%",
				description: "Preset effect to apply to the starting palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab7_startpoint",
				type: "select",
				options: [
					["normal",      "starting palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "starting palettes (desaturated)"],
					["hue", 	"starting palettes (hue shifted)"],
					["night", 	"starting palettes (day for night filter)"],
					["saturated",   "starting palettes (saturated)"],
					["inverted",    "starting palettes (inverted)"],
					["colourised",  "starting palettes (colourised - enter RGB)"],
					["multiply", 	"starting palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
			{
				key: "tab7_startpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab7_starting_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
			{
				key: "tab7_startpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab7_starting_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
			{
				key: "tab7_startpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab7_starting_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
			{
				key: "tab7_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab7_starting_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
			{
				key: "tab7_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab7_starting_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
			{
				key: "tab7_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab7_starting_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
			{
				key: "tab7_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade to:",
				width: "50%",
				description: "Preset effect to apply to the final palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab7_endpoint",
				type: "select",
				options: [
					["normal",      "final palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "final palettes (desaturated)"],
					["hue", 	"final palettes (hue shifted)"],
					["night", 	"final palettes (day for night filter)"],
					["saturated",   "final palettes (saturated)"],
					["inverted",    "final palettes (inverted)"],
					["colourised",  "final palettes (colourised - enter RGB)"],
					["multiply",	"final palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
			{
				key: "tab7_endpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab7_target_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
			{
				key: "tab7_endpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab7_target_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
			{
				key: "tab7_endpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab7_target_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
			{
				key: "tab7_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab7_target_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
			{
				key: "tab7_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab7_target_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
			{
				key: "tab7_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab7_target_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
			{
				key: "tab7_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade from:",
				width: "50%",
				description: "Preset effect to apply to the starting palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab8_startpoint",
				type: "select",
				options: [
					["normal",      "starting palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "starting palettes (desaturated)"],
					["hue", 	"starting palettes (hue shifted)"],
					["night", 	"starting palettes (day for night filter)"],
					["saturated",   "starting palettes (saturated)"],
					["inverted",    "starting palettes (inverted)"],
					["colourised",  "starting palettes (colourised - enter RGB)"],
					["multiply", 	"starting palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
			{
				key: "tab8_startpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab8_starting_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
			{
				key: "tab8_startpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab8_starting_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
			{
				key: "tab8_startpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab8_starting_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
			{
				key: "tab8_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab8_starting_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
			{
				key: "tab8_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab8_starting_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
			{
				key: "tab8_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab8_starting_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
			{
				key: "tab8_startpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		],
		type: "group",
		fields: [
			{
				label: "Fade to:",
				width: "50%",
				description: "Preset effect to apply to the final palettes in this tab.",
			},
			{
				defaultValue: "normal",
				key: "tab8_endpoint",
				type: "select",
				options: [
					["normal",      "final palettes (normal)"],
					["white",       "white"],
					["black",       "black"],
					["rgb",         "solid colour (enter RGB)"],
					["desaturated", "final palettes (desaturated)"],
					["hue", 	"final palettes (hue shifted)"],
					["night", 	"final palettes (day for night filter)"],
					["saturated",   "final palettes (saturated)"],
					["inverted",    "final palettes (inverted)"],
					["colourised",  "final palettes (colourised - enter RGB)"],
					["multiply",	"final palettes (RGB multiply)"],
				],
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
			{
				key: "tab8_endpoint",
				in: ["hue"]
			},
		],
		fields: [
			{
				label: "Hue shift degrees: ",
				width: "50%",
			},
			{
				key: "tab8_target_hue_shift",
				type: "slider",
				min: 0,
				max: 360,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
			{
				key: "tab8_endpoint",
				in: ["desaturated"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab8_target_desaturate_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 100,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
			{
				key: "tab8_endpoint",
				in: ["night"]
			},
		],
		fields: [
			{
				label: "Intensity (%): ",
				width: "50%",
			},
			{
				key: "tab8_target_night_intensity",
				type: "slider",
				min: 0,
				max: 100,
				defaultValue: 75,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
			{
				key: "tab8_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "R: ",
				width: "50%",
			},
			{
				key: "tab8_target_r",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
			{
				key: "tab8_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "G: ",
				width: "50%",
			},
			{
				key: "tab8_target_g",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		type: "group",
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
			{
				key: "tab8_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		fields: [
			{
				label: "B: ",
				width: "50%",
			},
			{
				key: "tab8_target_b",
				type: "slider",
				min: 0,
				max: 31,
				defaultValue: 0,
			},
		],
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
			{
				key: "tab8_endpoint",
				in: ["rgb", "colourised", "multiply"],
			},
		],
		label: " ",
	},
	
	{
		type: "group",
		fields: [
			{
				label: "Fade #1 steps:",
				width: "50%",
				description: "Number of colour steps in the fade for this tab, including the start and end colours.",
			},
			{
				key: "tab1_fade_steps",
				type: "number",
				max: 100,
				min: 2,
				defaultValue: 8,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - fade #1",
				width: "50%",
				description: "Wait for this many steps between each step in the fade for this tab.",
			},
			{
				key: "tab1_fade_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - cycle #1",
				width: "50%",
				description: "Number of frames to wait between each step in the colour cycle for this tab.",
			},
			{
				key: "tab1_cycle_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		],
		type: "group",
		fields: [
			{
				key: "tab1_reverse",
				label: "Reverse cycle #1 direction",
				description: "Checking this box causes the colours of the cycle to run through the palette slots in the reverse order.",
				type: "checkbox",
				defaultValue: false,
			},
			{
				key: "tab1_blend",
				label: "Blend Shift",
				description: "Blend successive colours in the cycle together instead of making discrete jumps. This forces the palettes to update on every frame, and has the potential to greatly increase the ROM space used by this event.",
				type: "checkbox",
				defaultValue: false,
			},
		],
	},
{
		type: "group",
		fields: [
			{
				label: "Fade #2 steps:",
				width: "50%",
				description: "Number of colour steps in the fade for this tab, including the start and end colours.",
			},
			{
				key: "tab2_fade_steps",
				type: "number",
				max: 100,
				min: 2,
				defaultValue: 8,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - fade #2",
				width: "50%",
				description: "Wait for this many steps between each step in the fade for this tab.",
			},
			{
				key: "tab2_fade_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - cycle #2",
				width: "50%",
				description: "Number of frames to wait between each step in the colour cycle for this tab.",
			},
			{
				key: "tab2_cycle_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		],
		type: "group",
		fields: [
			{
				key: "tab2_reverse",
				label: "Reverse cycle #2 direction",
				description: "Checking this box causes the colours of the cycle to run through the palette slots in the reverse order.",
				type: "checkbox",
				defaultValue: false,
			},
			{
				key: "tab2_blend",
				label: "Blend Shift",
				description: "Blend successive colours in the cycle together instead of making discrete jumps. This forces the palettes to update on every frame, and has the potential to greatly increase the ROM space used by this event.",
				type: "checkbox",
				defaultValue: false,
			},
		],
	},
{
		type: "group",
		fields: [
			{
				label: "Fade #3 steps:",
				width: "50%",
				description: "Number of colour steps in the fade for this tab, including the start and end colours.",
			},
			{
				key: "tab3_fade_steps",
				type: "number",
				max: 100,
				min: 2,
				defaultValue: 8,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - fade #3",
				width: "50%",
				description: "Wait for this many steps between each step in the fade for this tab.",
			},
			{
				key: "tab3_fade_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - cycle #3",
				width: "50%",
				description: "Number of frames to wait between each step in the colour cycle for this tab.",
			},
			{
				key: "tab3_cycle_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		],
		type: "group",
		fields: [
			{
				key: "tab3_reverse",
				label: "Reverse cycle #3 direction",
				description: "Checking this box causes the colours of the cycle to run through the palette slots in the reverse order.",
				type: "checkbox",
				defaultValue: false,
			},
			{
				key: "tab3_blend",
				label: "Blend Shift",
				description: "Blend successive colours in the cycle together instead of making discrete jumps. This forces the palettes to update on every frame, and has the potential to greatly increase the ROM space used by this event.",
				type: "checkbox",
				defaultValue: false,
			},
		],
	},
{
		type: "group",
		fields: [
			{
				label: "Fade #4 steps:",
				width: "50%",
				description: "Number of colour steps in the fade for this tab, including the start and end colours.",
			},
			{
				key: "tab4_fade_steps",
				type: "number",
				max: 100,
				min: 2,
				defaultValue: 8,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - fade #4",
				width: "50%",
				description: "Wait for this many steps between each step in the fade for this tab.",
			},
			{
				key: "tab4_fade_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - cycle #4",
				width: "50%",
				description: "Number of frames to wait between each step in the colour cycle for this tab.",
			},
			{
				key: "tab4_cycle_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		],
		type: "group",
		fields: [
			{
				key: "tab4_reverse",
				label: "Reverse cycle #4 direction",
				description: "Checking this box causes the colours of the cycle to run through the palette slots in the reverse order.",
				type: "checkbox",
				defaultValue: false,
			},
			{
				key: "tab4_blend",
				label: "Blend Shift",
				description: "Blend successive colours in the cycle together instead of making discrete jumps. This forces the palettes to update on every frame, and has the potential to greatly increase the ROM space used by this event.",
				type: "checkbox",
				defaultValue: false,
			},
		],
	},
{
		type: "group",
		fields: [
			{
				label: "Fade #5 steps:",
				width: "50%",
				description: "Number of colour steps in the fade for this tab, including the start and end colours.",
			},
			{
				key: "tab5_fade_steps",
				type: "number",
				max: 100,
				min: 2,
				defaultValue: 8,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - fade #5",
				width: "50%",
				description: "Wait for this many steps between each step in the fade for this tab.",
			},
			{
				key: "tab5_fade_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - cycle #5",
				width: "50%",
				description: "Number of frames to wait between each step in the colour cycle for this tab.",
			},
			{
				key: "tab5_cycle_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		],
		type: "group",
		fields: [
			{
				key: "tab5_reverse",
				label: "Reverse cycle #5 direction",
				description: "Checking this box causes the colours of the cycle to run through the palette slots in the reverse order.",
				type: "checkbox",
				defaultValue: false,
			},
			{
				key: "tab5_blend",
				label: "Blend Shift",
				description: "Blend successive colours in the cycle together instead of making discrete jumps. This forces the palettes to update on every frame, and has the potential to greatly increase the ROM space used by this event.",
				type: "checkbox",
				defaultValue: false,
			},
		],
	},
{
		type: "group",
		fields: [
			{
				label: "Fade #6 steps:",
				width: "50%",
				description: "Number of colour steps in the fade for this tab, including the start and end colours.",
			},
			{
				key: "tab6_fade_steps",
				type: "number",
				max: 100,
				min: 2,
				defaultValue: 8,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - fade #6",
				width: "50%",
				description: "Wait for this many steps between each step in the fade for this tab.",
			},
			{
				key: "tab6_fade_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - cycle #6",
				width: "50%",
				description: "Number of frames to wait between each step in the colour cycle for this tab.",
			},
			{
				key: "tab6_cycle_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		],
		type: "group",
		fields: [
			{
				key: "tab6_reverse",
				label: "Reverse cycle #6 direction",
				description: "Checking this box causes the colours of the cycle to run through the palette slots in the reverse order.",
				type: "checkbox",
				defaultValue: false,
			},
			{
				key: "tab6_blend",
				label: "Blend Shift",
				description: "Blend successive colours in the cycle together instead of making discrete jumps. This forces the palettes to update on every frame, and has the potential to greatly increase the ROM space used by this event.",
				type: "checkbox",
				defaultValue: false,
			},
		],
	},
{
		type: "group",
		fields: [
			{
				label: "Fade #7 steps:",
				width: "50%",
				description: "Number of colour steps in the fade for this tab, including the start and end colours.",
			},
			{
				key: "tab7_fade_steps",
				type: "number",
				max: 100,
				min: 2,
				defaultValue: 8,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - fade #7",
				width: "50%",
				description: "Wait for this many steps between each step in the fade for this tab.",
			},
			{
				key: "tab7_fade_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - cycle #7",
				width: "50%",
				description: "Number of frames to wait between each step in the colour cycle for this tab.",
			},
			{
				key: "tab7_cycle_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		],
		type: "group",
		fields: [
			{
				key: "tab7_reverse",
				label: "Reverse cycle #7 direction",
				description: "Checking this box causes the colours of the cycle to run through the palette slots in the reverse order.",
				type: "checkbox",
				defaultValue: false,
			},
			{
				key: "tab7_blend",
				label: "Blend Shift",
				description: "Blend successive colours in the cycle together instead of making discrete jumps. This forces the palettes to update on every frame, and has the potential to greatly increase the ROM space used by this event.",
				type: "checkbox",
				defaultValue: false,
			},
		],
	},
{
		type: "group",
		fields: [
			{
				label: "Fade #8 steps:",
				width: "50%",
				description: "Number of colour steps in the fade for this tab, including the start and end colours.",
			},
			{
				key: "tab8_fade_steps",
				type: "number",
				max: 100,
				min: 2,
				defaultValue: 8,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - fade #8",
				width: "50%",
				description: "Wait for this many steps between each step in the fade for this tab.",
			},
			{
				key: "tab8_fade_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				label: "Frames per step - cycle #8",
				width: "50%",
				description: "Number of frames to wait between each step in the colour cycle for this tab.",
			},
			{
				key: "tab8_cycle_frames",
				type: "number",
				max: 120,
				min: 1,
				defaultValue: 6,
			},
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},
	{
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		],
		type: "group",
		fields: [
			{
				key: "tab8_reverse",
				label: "Reverse cycle #8 direction",
				description: "Checking this box causes the colours of the cycle to run through the palette slots in the reverse order.",
				type: "checkbox",
				defaultValue: false,
			},
			{
				key: "tab8_blend",
				label: "Blend Shift",
				description: "Blend successive colours in the cycle together instead of making discrete jumps. This forces the palettes to update on every frame, and has the potential to greatly increase the ROM space used by this event.",
				type: "checkbox",
				defaultValue: false,
			},
		],
	},

	{
		type: "group",
		fields: [
			{
				label: "BKG start pals:",
				description: "Background palettes at the beginning of the colour fade. These should usually match the palettes that are already loaded. N.B. A single palette slot can only be updated by one on the 8 fade/cycle tabs. If you try to change the same palette in different tabs, the lower number tab will \"win\" and control that slot. However, cycles take precedence over fades. e.g. If background palette 1 is faded in tab 2 and tab 3, the fade in tab 3 is ignored. But if colour 2 of palette 1 is part of a cycle in tab 5, then that colour alone will be controlled by tab 5. The other colours in palette 1 will be controlled by the fade in tab 2.",
			},
			{
				label: "BKG end pals:",
				description: "Background palettes at the end of the colour fade. N.B. A single palette slot can only be updated by one on the 8 fade/cycle tabs. If you try to change the same palette in different tabs, the lower number tab will \"win\" and control that slot. However, cycles take precedence over fades. e.g. If background palette 1 is faded in tab 2 and tab 3, the fade in tab 3 is ignored. But if colour 2 of palette 1 is part of a cycle in tab 5, then that colour alone will be controlled by tab 5. The other colours in palette 1 will be controlled by the fade in tab 2.",
			},
			{
				label: "Cycle Colours:",
				description: "Selected colour slots are part of the colour cycle. That means that the colours in these slots rotate through each slot. At every step of the cycle, the colours move along by one slot. The slots are ordered from top to bottom and left to right in this list. Background palette 1 comes before background palette 8, which comes before sprite palette 1, and within each palette, colour 0 comes before colour 1. N.B. A single palette slot can only be updated by one on the 8 fade/cycle tabs. If you try to change the same palette in different tabs, the lower number tab will \"win\" and control that slot. However, cycles take precedence over fades. e.g. If background palette 1 is faded in tab 2 and tab 3, the fade in tab 3 is ignored. But if colour 2 of palette 1 is part of a cycle in tab 5, then that colour alone will be controlled by tab 5. The other colours in palette 1 will be controlled by the fade in tab 2.",
			},
		]
	},
	
	{
		type: "group",
		fields: [
			{
				key: "tab1_bkg0_start",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_bkg0_start",
						ne: "keep",
					},
				],
				key: "tab1_bkg0_end",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_bkg0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg0_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab1_bkg1_start",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_bkg1_start",
						ne: "keep",
					},
				],
				key: "tab1_bkg1_end",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_bkg1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg1_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab1_bkg2_start",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_bkg2_start",
						ne: "keep",
					},
				],
				key: "tab1_bkg2_end",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_bkg2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg2_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab1_bkg3_start",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_bkg3_start",
						ne: "keep",
					},
				],
				key: "tab1_bkg3_end",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_bkg3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg3_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab1_bkg4_start",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_bkg4_start",
						ne: "keep",
					},
				],
				key: "tab1_bkg4_end",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_bkg4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg4_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab1_bkg5_start",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_bkg5_start",
						ne: "keep",
					},
				],
				key: "tab1_bkg5_end",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_bkg5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg5_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab1_bkg6_start",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_bkg6_start",
						ne: "keep",
					},
				],
				key: "tab1_bkg6_end",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_bkg6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg6_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab1_bkg7_start",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_bkg7_start",
						ne: "keep",
					},
				],
				key: "tab1_bkg7_end",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_bkg7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_bkg7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg7_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_bkg7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab2_bkg0_start",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_bkg0_start",
						ne: "keep",
					},
				],
				key: "tab2_bkg0_end",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_bkg0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg0_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab2_bkg1_start",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_bkg1_start",
						ne: "keep",
					},
				],
				key: "tab2_bkg1_end",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_bkg1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg1_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab2_bkg2_start",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_bkg2_start",
						ne: "keep",
					},
				],
				key: "tab2_bkg2_end",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_bkg2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg2_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab2_bkg3_start",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_bkg3_start",
						ne: "keep",
					},
				],
				key: "tab2_bkg3_end",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_bkg3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg3_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab2_bkg4_start",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_bkg4_start",
						ne: "keep",
					},
				],
				key: "tab2_bkg4_end",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_bkg4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg4_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab2_bkg5_start",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_bkg5_start",
						ne: "keep",
					},
				],
				key: "tab2_bkg5_end",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_bkg5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg5_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab2_bkg6_start",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_bkg6_start",
						ne: "keep",
					},
				],
				key: "tab2_bkg6_end",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_bkg6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg6_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab2_bkg7_start",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_bkg7_start",
						ne: "keep",
					},
				],
				key: "tab2_bkg7_end",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_bkg7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_bkg7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg7_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_bkg7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab3_bkg0_start",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_bkg0_start",
						ne: "keep",
					},
				],
				key: "tab3_bkg0_end",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_bkg0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg0_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab3_bkg1_start",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_bkg1_start",
						ne: "keep",
					},
				],
				key: "tab3_bkg1_end",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_bkg1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg1_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab3_bkg2_start",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_bkg2_start",
						ne: "keep",
					},
				],
				key: "tab3_bkg2_end",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_bkg2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg2_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab3_bkg3_start",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_bkg3_start",
						ne: "keep",
					},
				],
				key: "tab3_bkg3_end",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_bkg3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg3_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab3_bkg4_start",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_bkg4_start",
						ne: "keep",
					},
				],
				key: "tab3_bkg4_end",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_bkg4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg4_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab3_bkg5_start",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_bkg5_start",
						ne: "keep",
					},
				],
				key: "tab3_bkg5_end",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_bkg5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg5_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab3_bkg6_start",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_bkg6_start",
						ne: "keep",
					},
				],
				key: "tab3_bkg6_end",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_bkg6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg6_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab3_bkg7_start",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_bkg7_start",
						ne: "keep",
					},
				],
				key: "tab3_bkg7_end",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_bkg7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_bkg7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg7_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_bkg7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab4_bkg0_start",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_bkg0_start",
						ne: "keep",
					},
				],
				key: "tab4_bkg0_end",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_bkg0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg0_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab4_bkg1_start",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_bkg1_start",
						ne: "keep",
					},
				],
				key: "tab4_bkg1_end",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_bkg1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg1_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab4_bkg2_start",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_bkg2_start",
						ne: "keep",
					},
				],
				key: "tab4_bkg2_end",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_bkg2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg2_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab4_bkg3_start",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_bkg3_start",
						ne: "keep",
					},
				],
				key: "tab4_bkg3_end",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_bkg3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg3_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab4_bkg4_start",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_bkg4_start",
						ne: "keep",
					},
				],
				key: "tab4_bkg4_end",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_bkg4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg4_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab4_bkg5_start",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_bkg5_start",
						ne: "keep",
					},
				],
				key: "tab4_bkg5_end",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_bkg5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg5_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab4_bkg6_start",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_bkg6_start",
						ne: "keep",
					},
				],
				key: "tab4_bkg6_end",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_bkg6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg6_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab4_bkg7_start",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_bkg7_start",
						ne: "keep",
					},
				],
				key: "tab4_bkg7_end",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_bkg7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_bkg7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg7_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_bkg7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab5_bkg0_start",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_bkg0_start",
						ne: "keep",
					},
				],
				key: "tab5_bkg0_end",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_bkg0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg0_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab5_bkg1_start",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_bkg1_start",
						ne: "keep",
					},
				],
				key: "tab5_bkg1_end",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_bkg1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg1_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab5_bkg2_start",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_bkg2_start",
						ne: "keep",
					},
				],
				key: "tab5_bkg2_end",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_bkg2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg2_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab5_bkg3_start",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_bkg3_start",
						ne: "keep",
					},
				],
				key: "tab5_bkg3_end",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_bkg3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg3_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab5_bkg4_start",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_bkg4_start",
						ne: "keep",
					},
				],
				key: "tab5_bkg4_end",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_bkg4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg4_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab5_bkg5_start",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_bkg5_start",
						ne: "keep",
					},
				],
				key: "tab5_bkg5_end",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_bkg5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg5_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab5_bkg6_start",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_bkg6_start",
						ne: "keep",
					},
				],
				key: "tab5_bkg6_end",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_bkg6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg6_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab5_bkg7_start",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_bkg7_start",
						ne: "keep",
					},
				],
				key: "tab5_bkg7_end",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_bkg7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_bkg7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg7_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_bkg7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab6_bkg0_start",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_bkg0_start",
						ne: "keep",
					},
				],
				key: "tab6_bkg0_end",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_bkg0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg0_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab6_bkg1_start",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_bkg1_start",
						ne: "keep",
					},
				],
				key: "tab6_bkg1_end",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_bkg1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg1_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab6_bkg2_start",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_bkg2_start",
						ne: "keep",
					},
				],
				key: "tab6_bkg2_end",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_bkg2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg2_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab6_bkg3_start",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_bkg3_start",
						ne: "keep",
					},
				],
				key: "tab6_bkg3_end",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_bkg3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg3_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab6_bkg4_start",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_bkg4_start",
						ne: "keep",
					},
				],
				key: "tab6_bkg4_end",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_bkg4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg4_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab6_bkg5_start",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_bkg5_start",
						ne: "keep",
					},
				],
				key: "tab6_bkg5_end",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_bkg5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg5_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab6_bkg6_start",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_bkg6_start",
						ne: "keep",
					},
				],
				key: "tab6_bkg6_end",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_bkg6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg6_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab6_bkg7_start",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_bkg7_start",
						ne: "keep",
					},
				],
				key: "tab6_bkg7_end",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_bkg7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_bkg7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg7_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_bkg7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab7_bkg0_start",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_bkg0_start",
						ne: "keep",
					},
				],
				key: "tab7_bkg0_end",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_bkg0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg0_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab7_bkg1_start",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_bkg1_start",
						ne: "keep",
					},
				],
				key: "tab7_bkg1_end",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_bkg1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg1_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab7_bkg2_start",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_bkg2_start",
						ne: "keep",
					},
				],
				key: "tab7_bkg2_end",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_bkg2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg2_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab7_bkg3_start",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_bkg3_start",
						ne: "keep",
					},
				],
				key: "tab7_bkg3_end",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_bkg3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg3_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab7_bkg4_start",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_bkg4_start",
						ne: "keep",
					},
				],
				key: "tab7_bkg4_end",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_bkg4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg4_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab7_bkg5_start",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_bkg5_start",
						ne: "keep",
					},
				],
				key: "tab7_bkg5_end",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_bkg5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg5_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab7_bkg6_start",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_bkg6_start",
						ne: "keep",
					},
				],
				key: "tab7_bkg6_end",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_bkg6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg6_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab7_bkg7_start",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_bkg7_start",
						ne: "keep",
					},
				],
				key: "tab7_bkg7_end",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_bkg7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_bkg7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg7_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_bkg7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab8_bkg0_start",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_bkg0_start",
						ne: "keep",
					},
				],
				key: "tab8_bkg0_end",
				type: "palette",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_bkg0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg0_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab8_bkg1_start",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_bkg1_start",
						ne: "keep",
					},
				],
				key: "tab8_bkg1_end",
				type: "palette",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_bkg1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg1_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab8_bkg2_start",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_bkg2_start",
						ne: "keep",
					},
				],
				key: "tab8_bkg2_end",
				type: "palette",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_bkg2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg2_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab8_bkg3_start",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_bkg3_start",
						ne: "keep",
					},
				],
				key: "tab8_bkg3_end",
				type: "palette",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_bkg3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg3_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab8_bkg4_start",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_bkg4_start",
						ne: "keep",
					},
				],
				key: "tab8_bkg4_end",
				type: "palette",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_bkg4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg4_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab8_bkg5_start",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_bkg5_start",
						ne: "keep",
					},
				],
				key: "tab8_bkg5_end",
				type: "palette",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_bkg5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg5_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab8_bkg6_start",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_bkg6_start",
						ne: "keep",
					},
				],
				key: "tab8_bkg6_end",
				type: "palette",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_bkg6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg6_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				key: "tab8_bkg7_start",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_bkg7_start",
						ne: "keep",
					},
				],
				key: "tab8_bkg7_end",
				type: "palette",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_bkg7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_bkg7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg7_use2",
						label: "2",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_bkg7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},

	{
		type: "group",
		fields: [
			{
				label: "Sprite start pals:",
				description: "Sprite palettes at the beginning of the colour fade. These should usually match the palettes that are already loaded. N.B. A single palette slot can only be updated by one on the 8 fade/cycle tabs. If you try to change the same palette in different tabs, the lower number tab will \"win\" and control that slot. However, cycles take precedence over fades. e.g. If sprite palette 1 is faded in tab 2 and tab 3, the fade in tab 3 is ignored. But if colour 0 of palette 1 is part of a cycle in tab 5, then that colour alone will be controlled by tab 5. The other colours in palette 1 will be controlled by the fade in tab 2.",
			},
			{
				label: "Sprite end pals:",
				description: "Sprite palettes at the end of the colour fade. N.B. A single palette slot can only be updated by one on the 8 fade/cycle tabs. If you try to change the same palette in different tabs, the lower number tab will \"win\" and control that slot. However, cycles take precedence over fades. e.g. If sprite palette 1 is faded in tab 2 and tab 3, the fade in tab 3 is ignored. But if colour 0 of palette 1 is part of a cycle in tab 5, then that colour alone will be controlled by tab 5. The other colours in palette 1 will be controlled by the fade in tab 2.",
			},
			{
				label: "Cycle Colours:",
				description: "Selected colour slots form part of the colour cycle. N.B. A single palette slot can only be updated by one on the 8 fade/cycle tabs. If you try to change the same palette in different tabs, the lower number tab will \"win\" and control that slot. However, cycles take precedence over fades. e.g. If sprite palette 1 is faded in tab 2 and tab 3, the fade in tab 3 is ignored. But if colour 0 of palette 1 is part of a cycle in tab 5, then that colour alone will be controlled by tab 5. The other colours in palette 1 will be controlled by the fade in tab 2.",
			},
		]
	},
	{
		type: "group",
		fields: [
			{
				key: "tab1_obj0_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_obj0_start",
						ne: "keep",
					},
				],
				key: "tab1_obj0_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_obj0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_obj0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab1_obj0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab1_obj1_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_obj1_start",
						ne: "keep",
					},
				],
				key: "tab1_obj1_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_obj1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_obj1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab1_obj1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab1_obj2_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_obj2_start",
						ne: "keep",
					},
				],
				key: "tab1_obj2_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_obj2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_obj2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab1_obj2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab1_obj3_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_obj3_start",
						ne: "keep",
					},
				],
				key: "tab1_obj3_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_obj3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_obj3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab1_obj3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab1_obj4_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_obj4_start",
						ne: "keep",
					},
				],
				key: "tab1_obj4_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_obj4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_obj4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab1_obj4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab1_obj5_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_obj5_start",
						ne: "keep",
					},
				],
				key: "tab1_obj5_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_obj5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_obj5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab1_obj5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab1_obj6_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_obj6_start",
						ne: "keep",
					},
				],
				key: "tab1_obj6_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_obj6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_obj6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab1_obj6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab1_obj7_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab1_obj7_start",
						ne: "keep",
					},
				],
				key: "tab1_obj7_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab1_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab1_obj7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab1_obj7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab1_obj7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab1_obj7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle1",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab2_obj0_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_obj0_start",
						ne: "keep",
					},
				],
				key: "tab2_obj0_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_obj0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_obj0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab2_obj0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab2_obj1_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_obj1_start",
						ne: "keep",
					},
				],
				key: "tab2_obj1_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_obj1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_obj1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab2_obj1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab2_obj2_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_obj2_start",
						ne: "keep",
					},
				],
				key: "tab2_obj2_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_obj2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_obj2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab2_obj2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab2_obj3_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_obj3_start",
						ne: "keep",
					},
				],
				key: "tab2_obj3_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_obj3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_obj3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab2_obj3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab2_obj4_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_obj4_start",
						ne: "keep",
					},
				],
				key: "tab2_obj4_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_obj4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_obj4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab2_obj4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab2_obj5_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_obj5_start",
						ne: "keep",
					},
				],
				key: "tab2_obj5_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_obj5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_obj5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab2_obj5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab2_obj6_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_obj6_start",
						ne: "keep",
					},
				],
				key: "tab2_obj6_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_obj6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_obj6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab2_obj6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab2_obj7_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab2_obj7_start",
						ne: "keep",
					},
				],
				key: "tab2_obj7_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab2_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab2_obj7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab2_obj7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab2_obj7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab2_obj7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle2",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab3_obj0_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_obj0_start",
						ne: "keep",
					},
				],
				key: "tab3_obj0_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_obj0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_obj0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab3_obj0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab3_obj1_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_obj1_start",
						ne: "keep",
					},
				],
				key: "tab3_obj1_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_obj1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_obj1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab3_obj1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab3_obj2_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_obj2_start",
						ne: "keep",
					},
				],
				key: "tab3_obj2_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_obj2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_obj2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab3_obj2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab3_obj3_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_obj3_start",
						ne: "keep",
					},
				],
				key: "tab3_obj3_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_obj3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_obj3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab3_obj3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab3_obj4_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_obj4_start",
						ne: "keep",
					},
				],
				key: "tab3_obj4_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_obj4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_obj4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab3_obj4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab3_obj5_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_obj5_start",
						ne: "keep",
					},
				],
				key: "tab3_obj5_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_obj5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_obj5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab3_obj5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab3_obj6_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_obj6_start",
						ne: "keep",
					},
				],
				key: "tab3_obj6_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_obj6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_obj6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab3_obj6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab3_obj7_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab3_obj7_start",
						ne: "keep",
					},
				],
				key: "tab3_obj7_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab3_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab3_obj7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab3_obj7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab3_obj7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab3_obj7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle3",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab4_obj0_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_obj0_start",
						ne: "keep",
					},
				],
				key: "tab4_obj0_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_obj0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_obj0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab4_obj0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab4_obj1_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_obj1_start",
						ne: "keep",
					},
				],
				key: "tab4_obj1_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_obj1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_obj1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab4_obj1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab4_obj2_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_obj2_start",
						ne: "keep",
					},
				],
				key: "tab4_obj2_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_obj2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_obj2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab4_obj2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab4_obj3_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_obj3_start",
						ne: "keep",
					},
				],
				key: "tab4_obj3_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_obj3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_obj3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab4_obj3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab4_obj4_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_obj4_start",
						ne: "keep",
					},
				],
				key: "tab4_obj4_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_obj4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_obj4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab4_obj4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab4_obj5_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_obj5_start",
						ne: "keep",
					},
				],
				key: "tab4_obj5_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_obj5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_obj5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab4_obj5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab4_obj6_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_obj6_start",
						ne: "keep",
					},
				],
				key: "tab4_obj6_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_obj6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_obj6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab4_obj6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab4_obj7_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab4_obj7_start",
						ne: "keep",
					},
				],
				key: "tab4_obj7_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab4_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab4_obj7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab4_obj7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab4_obj7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab4_obj7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle4",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab5_obj0_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_obj0_start",
						ne: "keep",
					},
				],
				key: "tab5_obj0_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_obj0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_obj0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab5_obj0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab5_obj1_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_obj1_start",
						ne: "keep",
					},
				],
				key: "tab5_obj1_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_obj1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_obj1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab5_obj1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab5_obj2_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_obj2_start",
						ne: "keep",
					},
				],
				key: "tab5_obj2_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_obj2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_obj2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab5_obj2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab5_obj3_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_obj3_start",
						ne: "keep",
					},
				],
				key: "tab5_obj3_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_obj3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_obj3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab5_obj3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab5_obj4_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_obj4_start",
						ne: "keep",
					},
				],
				key: "tab5_obj4_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_obj4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_obj4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab5_obj4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab5_obj5_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_obj5_start",
						ne: "keep",
					},
				],
				key: "tab5_obj5_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_obj5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_obj5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab5_obj5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab5_obj6_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_obj6_start",
						ne: "keep",
					},
				],
				key: "tab5_obj6_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_obj6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_obj6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab5_obj6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab5_obj7_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab5_obj7_start",
						ne: "keep",
					},
				],
				key: "tab5_obj7_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab5_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab5_obj7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab5_obj7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab5_obj7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab5_obj7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle5",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab6_obj0_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_obj0_start",
						ne: "keep",
					},
				],
				key: "tab6_obj0_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_obj0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_obj0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab6_obj0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab6_obj1_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_obj1_start",
						ne: "keep",
					},
				],
				key: "tab6_obj1_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_obj1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_obj1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab6_obj1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab6_obj2_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_obj2_start",
						ne: "keep",
					},
				],
				key: "tab6_obj2_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_obj2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_obj2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab6_obj2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab6_obj3_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_obj3_start",
						ne: "keep",
					},
				],
				key: "tab6_obj3_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_obj3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_obj3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab6_obj3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab6_obj4_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_obj4_start",
						ne: "keep",
					},
				],
				key: "tab6_obj4_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_obj4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_obj4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab6_obj4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab6_obj5_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_obj5_start",
						ne: "keep",
					},
				],
				key: "tab6_obj5_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_obj5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_obj5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab6_obj5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab6_obj6_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_obj6_start",
						ne: "keep",
					},
				],
				key: "tab6_obj6_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_obj6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_obj6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab6_obj6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab6_obj7_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab6_obj7_start",
						ne: "keep",
					},
				],
				key: "tab6_obj7_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab6_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab6_obj7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab6_obj7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab6_obj7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab6_obj7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle6",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab7_obj0_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_obj0_start",
						ne: "keep",
					},
				],
				key: "tab7_obj0_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_obj0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_obj0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab7_obj0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab7_obj1_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_obj1_start",
						ne: "keep",
					},
				],
				key: "tab7_obj1_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_obj1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_obj1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab7_obj1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab7_obj2_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_obj2_start",
						ne: "keep",
					},
				],
				key: "tab7_obj2_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_obj2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_obj2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab7_obj2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab7_obj3_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_obj3_start",
						ne: "keep",
					},
				],
				key: "tab7_obj3_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_obj3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_obj3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab7_obj3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab7_obj4_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_obj4_start",
						ne: "keep",
					},
				],
				key: "tab7_obj4_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_obj4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_obj4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab7_obj4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab7_obj5_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_obj5_start",
						ne: "keep",
					},
				],
				key: "tab7_obj5_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_obj5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_obj5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab7_obj5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab7_obj6_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_obj6_start",
						ne: "keep",
					},
				],
				key: "tab7_obj6_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_obj6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_obj6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab7_obj6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab7_obj7_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab7_obj7_start",
						ne: "keep",
					},
				],
				key: "tab7_obj7_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab7_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab7_obj7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab7_obj7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab7_obj7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab7_obj7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle7",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab8_obj0_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_obj0_start",
						ne: "keep",
					},
				],
				key: "tab8_obj0_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 0,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj0_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj0_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_obj0_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_obj0_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab8_obj0_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab8_obj1_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_obj1_start",
						ne: "keep",
					},
				],
				key: "tab8_obj1_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 1,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj1_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj1_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_obj1_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_obj1_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab8_obj1_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab8_obj2_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_obj2_start",
						ne: "keep",
					},
				],
				key: "tab8_obj2_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 2,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj2_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj2_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_obj2_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_obj2_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab8_obj2_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab8_obj3_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_obj3_start",
						ne: "keep",
					},
				],
				key: "tab8_obj3_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 3,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj3_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj3_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_obj3_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_obj3_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab8_obj3_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab8_obj4_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_obj4_start",
						ne: "keep",
					},
				],
				key: "tab8_obj4_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 4,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj4_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj4_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_obj4_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_obj4_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab8_obj4_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab8_obj5_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_obj5_start",
						ne: "keep",
					},
				],
				key: "tab8_obj5_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 5,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj5_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj5_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_obj5_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_obj5_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab8_obj5_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab8_obj6_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_obj6_start",
						ne: "keep",
					},
				],
				key: "tab8_obj6_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 6,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj6_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj6_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_obj6_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_obj6_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab8_obj6_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},
{
		type: "group",
		fields: [
			{
				key: "tab8_obj7_start",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "keep",
				canKeep: true,
			},
			{
				conditions: [
					{
						key: "tab8_obj7_start",
						ne: "keep",
					},
				],
				key: "tab8_obj7_end",
				type: "palette",
				paletteType: "sprite",
				paletteIndex: 7,
				defaultValue: "dmg",
				canKeep: false,
			},
			{
				conditions: [
					{
						key: "tab8_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj7_start",
						eq: "keep",
					},
				],
				label: "Not modified",
			},
			{
				conditions: [
					{
						key: "tab8_obj7_start",
						ne: "keep",
					},
				],
				type: "group",
				fields: [
					{
						key: "tab8_obj7_use0",
						label: "0",
						type: "checkbox",
						defaultValue: true,
					},
					{
						key: "tab8_obj7_use1",
						label: "1",
						type: "checkbox",
						defaultValue: true,
					},
					{
						label: "  ",
					},
					{
						key: "tab8_obj7_use3",
						label: "3",
						type: "checkbox",
						defaultValue: true,
					}
				],
			}
		],
		conditions: [
			{
				key: "tabs",
				eq: "cycle8",
			},
		]
	},

	{
		label: "________________________________________________________",
	},
	{
		type: "group",
		fields: [
			{
				key: "banksplit_check",
				label: "Bank splitter",
				description: "[Advanced] Split the event across two ROM banks. Make two copies of the event and check this box on both copies. Select 'First half' in one copy, and 'Second half' in the other. Put the two events in two different scripts, called one after the other.",
				type: "checkbox",
				defaultValue: false,
			},
			{
				conditions: [
					{
						key: "banksplit_check",
						eq: true,
					}
				],
				key: "banksplit",
				type: "select",
				defaultValue: "first",
				options: [
					["first", "First half"],
					["second", "Second half"],
				],
			},
		],
	},
];

const compile = (input, helpers) => {
	const { palettes, _addComment, appendRaw } = helpers;

	const dmg_pal = [
		"E8F8E0",
		"B0F088",
		"509878",
		"202850"
	];

	const start_pal_inputs = [
		[
			input.tab1_bkg0_start,
			input.tab1_bkg1_start,
			input.tab1_bkg2_start,
			input.tab1_bkg3_start,
			input.tab1_bkg4_start,
			input.tab1_bkg5_start,
			input.tab1_bkg6_start,
			input.tab1_bkg7_start,
			input.tab1_obj0_start,
			input.tab1_obj1_start,
			input.tab1_obj2_start,
			input.tab1_obj3_start,
			input.tab1_obj4_start,
			input.tab1_obj5_start,
			input.tab1_obj6_start,
			input.tab1_obj7_start,
		],
		[
			input.tab2_bkg0_start,
			input.tab2_bkg1_start,
			input.tab2_bkg2_start,
			input.tab2_bkg3_start,
			input.tab2_bkg4_start,
			input.tab2_bkg5_start,
			input.tab2_bkg6_start,
			input.tab2_bkg7_start,
			input.tab2_obj0_start,
			input.tab2_obj1_start,
			input.tab2_obj2_start,
			input.tab2_obj3_start,
			input.tab2_obj4_start,
			input.tab2_obj5_start,
			input.tab2_obj6_start,
			input.tab2_obj7_start,
		],
		[
			input.tab3_bkg0_start,
			input.tab3_bkg1_start,
			input.tab3_bkg2_start,
			input.tab3_bkg3_start,
			input.tab3_bkg4_start,
			input.tab3_bkg5_start,
			input.tab3_bkg6_start,
			input.tab3_bkg7_start,
			input.tab3_obj0_start,
			input.tab3_obj1_start,
			input.tab3_obj2_start,
			input.tab3_obj3_start,
			input.tab3_obj4_start,
			input.tab3_obj5_start,
			input.tab3_obj6_start,
			input.tab3_obj7_start,
		],
		[
			input.tab4_bkg0_start,
			input.tab4_bkg1_start,
			input.tab4_bkg2_start,
			input.tab4_bkg3_start,
			input.tab4_bkg4_start,
			input.tab4_bkg5_start,
			input.tab4_bkg6_start,
			input.tab4_bkg7_start,
			input.tab4_obj0_start,
			input.tab4_obj1_start,
			input.tab4_obj2_start,
			input.tab4_obj3_start,
			input.tab4_obj4_start,
			input.tab4_obj5_start,
			input.tab4_obj6_start,
			input.tab4_obj7_start,
		],
		[
			input.tab5_bkg0_start,
			input.tab5_bkg1_start,
			input.tab5_bkg2_start,
			input.tab5_bkg3_start,
			input.tab5_bkg4_start,
			input.tab5_bkg5_start,
			input.tab5_bkg6_start,
			input.tab5_bkg7_start,
			input.tab5_obj0_start,
			input.tab5_obj1_start,
			input.tab5_obj2_start,
			input.tab5_obj3_start,
			input.tab5_obj4_start,
			input.tab5_obj5_start,
			input.tab5_obj6_start,
			input.tab5_obj7_start,
		],
		[
			input.tab6_bkg0_start,
			input.tab6_bkg1_start,
			input.tab6_bkg2_start,
			input.tab6_bkg3_start,
			input.tab6_bkg4_start,
			input.tab6_bkg5_start,
			input.tab6_bkg6_start,
			input.tab6_bkg7_start,
			input.tab6_obj0_start,
			input.tab6_obj1_start,
			input.tab6_obj2_start,
			input.tab6_obj3_start,
			input.tab6_obj4_start,
			input.tab6_obj5_start,
			input.tab6_obj6_start,
			input.tab6_obj7_start,
		],
		[
			input.tab7_bkg0_start,
			input.tab7_bkg1_start,
			input.tab7_bkg2_start,
			input.tab7_bkg3_start,
			input.tab7_bkg4_start,
			input.tab7_bkg5_start,
			input.tab7_bkg6_start,
			input.tab7_bkg7_start,
			input.tab7_obj0_start,
			input.tab7_obj1_start,
			input.tab7_obj2_start,
			input.tab7_obj3_start,
			input.tab7_obj4_start,
			input.tab7_obj5_start,
			input.tab7_obj6_start,
			input.tab7_obj7_start,
		],
		[
			input.tab8_bkg0_start,
			input.tab8_bkg1_start,
			input.tab8_bkg2_start,
			input.tab8_bkg3_start,
			input.tab8_bkg4_start,
			input.tab8_bkg5_start,
			input.tab8_bkg6_start,
			input.tab8_bkg7_start,
			input.tab8_obj0_start,
			input.tab8_obj1_start,
			input.tab8_obj2_start,
			input.tab8_obj3_start,
			input.tab8_obj4_start,
			input.tab8_obj5_start,
			input.tab8_obj6_start,
			input.tab8_obj7_start,
		],
	];

	const end_pal_inputs = [
		[
			input.tab1_bkg0_end,
			input.tab1_bkg1_end,
			input.tab1_bkg2_end,
			input.tab1_bkg3_end,
			input.tab1_bkg4_end,
			input.tab1_bkg5_end,
			input.tab1_bkg6_end,
			input.tab1_bkg7_end,
			input.tab1_obj0_end,
			input.tab1_obj1_end,
			input.tab1_obj2_end,
			input.tab1_obj3_end,
			input.tab1_obj4_end,
			input.tab1_obj5_end,
			input.tab1_obj6_end,
			input.tab1_obj7_end,
		],
		[
			input.tab2_bkg0_end,
			input.tab2_bkg1_end,
			input.tab2_bkg2_end,
			input.tab2_bkg3_end,
			input.tab2_bkg4_end,
			input.tab2_bkg5_end,
			input.tab2_bkg6_end,
			input.tab2_bkg7_end,
			input.tab2_obj0_end,
			input.tab2_obj1_end,
			input.tab2_obj2_end,
			input.tab2_obj3_end,
			input.tab2_obj4_end,
			input.tab2_obj5_end,
			input.tab2_obj6_end,
			input.tab2_obj7_end,
		],
		[
			input.tab3_bkg0_end,
			input.tab3_bkg1_end,
			input.tab3_bkg2_end,
			input.tab3_bkg3_end,
			input.tab3_bkg4_end,
			input.tab3_bkg5_end,
			input.tab3_bkg6_end,
			input.tab3_bkg7_end,
			input.tab3_obj0_end,
			input.tab3_obj1_end,
			input.tab3_obj2_end,
			input.tab3_obj3_end,
			input.tab3_obj4_end,
			input.tab3_obj5_end,
			input.tab3_obj6_end,
			input.tab3_obj7_end,
		],
		[
			input.tab4_bkg0_end,
			input.tab4_bkg1_end,
			input.tab4_bkg2_end,
			input.tab4_bkg3_end,
			input.tab4_bkg4_end,
			input.tab4_bkg5_end,
			input.tab4_bkg6_end,
			input.tab4_bkg7_end,
			input.tab4_obj0_end,
			input.tab4_obj1_end,
			input.tab4_obj2_end,
			input.tab4_obj3_end,
			input.tab4_obj4_end,
			input.tab4_obj5_end,
			input.tab4_obj6_end,
			input.tab4_obj7_end,
		],
		[
			input.tab5_bkg0_end,
			input.tab5_bkg1_end,
			input.tab5_bkg2_end,
			input.tab5_bkg3_end,
			input.tab5_bkg4_end,
			input.tab5_bkg5_end,
			input.tab5_bkg6_end,
			input.tab5_bkg7_end,
			input.tab5_obj0_end,
			input.tab5_obj1_end,
			input.tab5_obj2_end,
			input.tab5_obj3_end,
			input.tab5_obj4_end,
			input.tab5_obj5_end,
			input.tab5_obj6_end,
			input.tab5_obj7_end,
		],
		[
			input.tab6_bkg0_end,
			input.tab6_bkg1_end,
			input.tab6_bkg2_end,
			input.tab6_bkg3_end,
			input.tab6_bkg4_end,
			input.tab6_bkg5_end,
			input.tab6_bkg6_end,
			input.tab6_bkg7_end,
			input.tab6_obj0_end,
			input.tab6_obj1_end,
			input.tab6_obj2_end,
			input.tab6_obj3_end,
			input.tab6_obj4_end,
			input.tab6_obj5_end,
			input.tab6_obj6_end,
			input.tab6_obj7_end,
		],
		[
			input.tab7_bkg0_end,
			input.tab7_bkg1_end,
			input.tab7_bkg2_end,
			input.tab7_bkg3_end,
			input.tab7_bkg4_end,
			input.tab7_bkg5_end,
			input.tab7_bkg6_end,
			input.tab7_bkg7_end,
			input.tab7_obj0_end,
			input.tab7_obj1_end,
			input.tab7_obj2_end,
			input.tab7_obj3_end,
			input.tab7_obj4_end,
			input.tab7_obj5_end,
			input.tab7_obj6_end,
			input.tab7_obj7_end,
		],
		[
			input.tab8_bkg0_end,
			input.tab8_bkg1_end,
			input.tab8_bkg2_end,
			input.tab8_bkg3_end,
			input.tab8_bkg4_end,
			input.tab8_bkg5_end,
			input.tab8_bkg6_end,
			input.tab8_bkg7_end,
			input.tab8_obj0_end,
			input.tab8_obj1_end,
			input.tab8_obj2_end,
			input.tab8_obj3_end,
			input.tab8_obj4_end,
			input.tab8_obj5_end,
			input.tab8_obj6_end,
			input.tab8_obj7_end,
		],
	];

	const checkboxes = [
		[
			input.tab1_bkg0_use0,
			input.tab1_bkg0_use1,
			input.tab1_bkg0_use2,
			input.tab1_bkg0_use3,
			input.tab1_bkg1_use0,
			input.tab1_bkg1_use1,
			input.tab1_bkg1_use2,
			input.tab1_bkg1_use3,
			input.tab1_bkg2_use0,
			input.tab1_bkg2_use1,
			input.tab1_bkg2_use2,
			input.tab1_bkg2_use3,
			input.tab1_bkg3_use0,
			input.tab1_bkg3_use1,
			input.tab1_bkg3_use2,
			input.tab1_bkg3_use3,
			input.tab1_bkg4_use0,
			input.tab1_bkg4_use1,
			input.tab1_bkg4_use2,
			input.tab1_bkg4_use3,
			input.tab1_bkg5_use0,
			input.tab1_bkg5_use1,
			input.tab1_bkg5_use2,
			input.tab1_bkg5_use3,
			input.tab1_bkg6_use0,
			input.tab1_bkg6_use1,
			input.tab1_bkg6_use2,
			input.tab1_bkg6_use3,
			input.tab1_bkg7_use0,
			input.tab1_bkg7_use1,
			input.tab1_bkg7_use2,
			input.tab1_bkg7_use3,
			input.tab1_obj0_use0,
			input.tab1_obj0_use1,
			input.tab1_obj0_use2,
			input.tab1_obj0_use3,
			input.tab1_obj1_use0,
			input.tab1_obj1_use1,
			input.tab1_obj1_use2,
			input.tab1_obj1_use3,
			input.tab1_obj2_use0,
			input.tab1_obj2_use1,
			input.tab1_obj2_use2,
			input.tab1_obj2_use3,
			input.tab1_obj3_use0,
			input.tab1_obj3_use1,
			input.tab1_obj3_use2,
			input.tab1_obj3_use3,
			input.tab1_obj4_use0,
			input.tab1_obj4_use1,
			input.tab1_obj4_use2,
			input.tab1_obj4_use3,
			input.tab1_obj5_use0,
			input.tab1_obj5_use1,
			input.tab1_obj5_use2,
			input.tab1_obj5_use3,
			input.tab1_obj6_use0,
			input.tab1_obj6_use1,
			input.tab1_obj6_use2,
			input.tab1_obj6_use3,
			input.tab1_obj7_use0,
			input.tab1_obj7_use1,
			input.tab1_obj7_use2,
			input.tab1_obj7_use3,
		],
		[
			input.tab2_bkg0_use0,
			input.tab2_bkg0_use1,
			input.tab2_bkg0_use2,
			input.tab2_bkg0_use3,
			input.tab2_bkg1_use0,
			input.tab2_bkg1_use1,
			input.tab2_bkg1_use2,
			input.tab2_bkg1_use3,
			input.tab2_bkg2_use0,
			input.tab2_bkg2_use1,
			input.tab2_bkg2_use2,
			input.tab2_bkg2_use3,
			input.tab2_bkg3_use0,
			input.tab2_bkg3_use1,
			input.tab2_bkg3_use2,
			input.tab2_bkg3_use3,
			input.tab2_bkg4_use0,
			input.tab2_bkg4_use1,
			input.tab2_bkg4_use2,
			input.tab2_bkg4_use3,
			input.tab2_bkg5_use0,
			input.tab2_bkg5_use1,
			input.tab2_bkg5_use2,
			input.tab2_bkg5_use3,
			input.tab2_bkg6_use0,
			input.tab2_bkg6_use1,
			input.tab2_bkg6_use2,
			input.tab2_bkg6_use3,
			input.tab2_bkg7_use0,
			input.tab2_bkg7_use1,
			input.tab2_bkg7_use2,
			input.tab2_bkg7_use3,
			input.tab2_obj0_use0,
			input.tab2_obj0_use1,
			input.tab2_obj0_use2,
			input.tab2_obj0_use3,
			input.tab2_obj1_use0,
			input.tab2_obj1_use1,
			input.tab2_obj1_use2,
			input.tab2_obj1_use3,
			input.tab2_obj2_use0,
			input.tab2_obj2_use1,
			input.tab2_obj2_use2,
			input.tab2_obj2_use3,
			input.tab2_obj3_use0,
			input.tab2_obj3_use1,
			input.tab2_obj3_use2,
			input.tab2_obj3_use3,
			input.tab2_obj4_use0,
			input.tab2_obj4_use1,
			input.tab2_obj4_use2,
			input.tab2_obj4_use3,
			input.tab2_obj5_use0,
			input.tab2_obj5_use1,
			input.tab2_obj5_use2,
			input.tab2_obj5_use3,
			input.tab2_obj6_use0,
			input.tab2_obj6_use1,
			input.tab2_obj6_use2,
			input.tab2_obj6_use3,
			input.tab2_obj7_use0,
			input.tab2_obj7_use1,
			input.tab2_obj7_use2,
			input.tab2_obj7_use3,
		],
		[
			input.tab3_bkg0_use0,
			input.tab3_bkg0_use1,
			input.tab3_bkg0_use2,
			input.tab3_bkg0_use3,
			input.tab3_bkg1_use0,
			input.tab3_bkg1_use1,
			input.tab3_bkg1_use2,
			input.tab3_bkg1_use3,
			input.tab3_bkg2_use0,
			input.tab3_bkg2_use1,
			input.tab3_bkg2_use2,
			input.tab3_bkg2_use3,
			input.tab3_bkg3_use0,
			input.tab3_bkg3_use1,
			input.tab3_bkg3_use2,
			input.tab3_bkg3_use3,
			input.tab3_bkg4_use0,
			input.tab3_bkg4_use1,
			input.tab3_bkg4_use2,
			input.tab3_bkg4_use3,
			input.tab3_bkg5_use0,
			input.tab3_bkg5_use1,
			input.tab3_bkg5_use2,
			input.tab3_bkg5_use3,
			input.tab3_bkg6_use0,
			input.tab3_bkg6_use1,
			input.tab3_bkg6_use2,
			input.tab3_bkg6_use3,
			input.tab3_bkg7_use0,
			input.tab3_bkg7_use1,
			input.tab3_bkg7_use2,
			input.tab3_bkg7_use3,
			input.tab3_obj0_use0,
			input.tab3_obj0_use1,
			input.tab3_obj0_use2,
			input.tab3_obj0_use3,
			input.tab3_obj1_use0,
			input.tab3_obj1_use1,
			input.tab3_obj1_use2,
			input.tab3_obj1_use3,
			input.tab3_obj2_use0,
			input.tab3_obj2_use1,
			input.tab3_obj2_use2,
			input.tab3_obj2_use3,
			input.tab3_obj3_use0,
			input.tab3_obj3_use1,
			input.tab3_obj3_use2,
			input.tab3_obj3_use3,
			input.tab3_obj4_use0,
			input.tab3_obj4_use1,
			input.tab3_obj4_use2,
			input.tab3_obj4_use3,
			input.tab3_obj5_use0,
			input.tab3_obj5_use1,
			input.tab3_obj5_use2,
			input.tab3_obj5_use3,
			input.tab3_obj6_use0,
			input.tab3_obj6_use1,
			input.tab3_obj6_use2,
			input.tab3_obj6_use3,
			input.tab3_obj7_use0,
			input.tab3_obj7_use1,
			input.tab3_obj7_use2,
			input.tab3_obj7_use3,
		],
		[
			input.tab4_bkg0_use0,
			input.tab4_bkg0_use1,
			input.tab4_bkg0_use2,
			input.tab4_bkg0_use3,
			input.tab4_bkg1_use0,
			input.tab4_bkg1_use1,
			input.tab4_bkg1_use2,
			input.tab4_bkg1_use3,
			input.tab4_bkg2_use0,
			input.tab4_bkg2_use1,
			input.tab4_bkg2_use2,
			input.tab4_bkg2_use3,
			input.tab4_bkg3_use0,
			input.tab4_bkg3_use1,
			input.tab4_bkg3_use2,
			input.tab4_bkg3_use3,
			input.tab4_bkg4_use0,
			input.tab4_bkg4_use1,
			input.tab4_bkg4_use2,
			input.tab4_bkg4_use3,
			input.tab4_bkg5_use0,
			input.tab4_bkg5_use1,
			input.tab4_bkg5_use2,
			input.tab4_bkg5_use3,
			input.tab4_bkg6_use0,
			input.tab4_bkg6_use1,
			input.tab4_bkg6_use2,
			input.tab4_bkg6_use3,
			input.tab4_bkg7_use0,
			input.tab4_bkg7_use1,
			input.tab4_bkg7_use2,
			input.tab4_bkg7_use3,
			input.tab4_obj0_use0,
			input.tab4_obj0_use1,
			input.tab4_obj0_use2,
			input.tab4_obj0_use3,
			input.tab4_obj1_use0,
			input.tab4_obj1_use1,
			input.tab4_obj1_use2,
			input.tab4_obj1_use3,
			input.tab4_obj2_use0,
			input.tab4_obj2_use1,
			input.tab4_obj2_use2,
			input.tab4_obj2_use3,
			input.tab4_obj3_use0,
			input.tab4_obj3_use1,
			input.tab4_obj3_use2,
			input.tab4_obj3_use3,
			input.tab4_obj4_use0,
			input.tab4_obj4_use1,
			input.tab4_obj4_use2,
			input.tab4_obj4_use3,
			input.tab4_obj5_use0,
			input.tab4_obj5_use1,
			input.tab4_obj5_use2,
			input.tab4_obj5_use3,
			input.tab4_obj6_use0,
			input.tab4_obj6_use1,
			input.tab4_obj6_use2,
			input.tab4_obj6_use3,
			input.tab4_obj7_use0,
			input.tab4_obj7_use1,
			input.tab4_obj7_use2,
			input.tab4_obj7_use3,
		],
		[
			input.tab5_bkg0_use0,
			input.tab5_bkg0_use1,
			input.tab5_bkg0_use2,
			input.tab5_bkg0_use3,
			input.tab5_bkg1_use0,
			input.tab5_bkg1_use1,
			input.tab5_bkg1_use2,
			input.tab5_bkg1_use3,
			input.tab5_bkg2_use0,
			input.tab5_bkg2_use1,
			input.tab5_bkg2_use2,
			input.tab5_bkg2_use3,
			input.tab5_bkg3_use0,
			input.tab5_bkg3_use1,
			input.tab5_bkg3_use2,
			input.tab5_bkg3_use3,
			input.tab5_bkg4_use0,
			input.tab5_bkg4_use1,
			input.tab5_bkg4_use2,
			input.tab5_bkg4_use3,
			input.tab5_bkg5_use0,
			input.tab5_bkg5_use1,
			input.tab5_bkg5_use2,
			input.tab5_bkg5_use3,
			input.tab5_bkg6_use0,
			input.tab5_bkg6_use1,
			input.tab5_bkg6_use2,
			input.tab5_bkg6_use3,
			input.tab5_bkg7_use0,
			input.tab5_bkg7_use1,
			input.tab5_bkg7_use2,
			input.tab5_bkg7_use3,
			input.tab5_obj0_use0,
			input.tab5_obj0_use1,
			input.tab5_obj0_use2,
			input.tab5_obj0_use3,
			input.tab5_obj1_use0,
			input.tab5_obj1_use1,
			input.tab5_obj1_use2,
			input.tab5_obj1_use3,
			input.tab5_obj2_use0,
			input.tab5_obj2_use1,
			input.tab5_obj2_use2,
			input.tab5_obj2_use3,
			input.tab5_obj3_use0,
			input.tab5_obj3_use1,
			input.tab5_obj3_use2,
			input.tab5_obj3_use3,
			input.tab5_obj4_use0,
			input.tab5_obj4_use1,
			input.tab5_obj4_use2,
			input.tab5_obj4_use3,
			input.tab5_obj5_use0,
			input.tab5_obj5_use1,
			input.tab5_obj5_use2,
			input.tab5_obj5_use3,
			input.tab5_obj6_use0,
			input.tab5_obj6_use1,
			input.tab5_obj6_use2,
			input.tab5_obj6_use3,
			input.tab5_obj7_use0,
			input.tab5_obj7_use1,
			input.tab5_obj7_use2,
			input.tab5_obj7_use3,
		],
		[
			input.tab6_bkg0_use0,
			input.tab6_bkg0_use1,
			input.tab6_bkg0_use2,
			input.tab6_bkg0_use3,
			input.tab6_bkg1_use0,
			input.tab6_bkg1_use1,
			input.tab6_bkg1_use2,
			input.tab6_bkg1_use3,
			input.tab6_bkg2_use0,
			input.tab6_bkg2_use1,
			input.tab6_bkg2_use2,
			input.tab6_bkg2_use3,
			input.tab6_bkg3_use0,
			input.tab6_bkg3_use1,
			input.tab6_bkg3_use2,
			input.tab6_bkg3_use3,
			input.tab6_bkg4_use0,
			input.tab6_bkg4_use1,
			input.tab6_bkg4_use2,
			input.tab6_bkg4_use3,
			input.tab6_bkg5_use0,
			input.tab6_bkg5_use1,
			input.tab6_bkg5_use2,
			input.tab6_bkg5_use3,
			input.tab6_bkg6_use0,
			input.tab6_bkg6_use1,
			input.tab6_bkg6_use2,
			input.tab6_bkg6_use3,
			input.tab6_bkg7_use0,
			input.tab6_bkg7_use1,
			input.tab6_bkg7_use2,
			input.tab6_bkg7_use3,
			input.tab6_obj0_use0,
			input.tab6_obj0_use1,
			input.tab6_obj0_use2,
			input.tab6_obj0_use3,
			input.tab6_obj1_use0,
			input.tab6_obj1_use1,
			input.tab6_obj1_use2,
			input.tab6_obj1_use3,
			input.tab6_obj2_use0,
			input.tab6_obj2_use1,
			input.tab6_obj2_use2,
			input.tab6_obj2_use3,
			input.tab6_obj3_use0,
			input.tab6_obj3_use1,
			input.tab6_obj3_use2,
			input.tab6_obj3_use3,
			input.tab6_obj4_use0,
			input.tab6_obj4_use1,
			input.tab6_obj4_use2,
			input.tab6_obj4_use3,
			input.tab6_obj5_use0,
			input.tab6_obj5_use1,
			input.tab6_obj5_use2,
			input.tab6_obj5_use3,
			input.tab6_obj6_use0,
			input.tab6_obj6_use1,
			input.tab6_obj6_use2,
			input.tab6_obj6_use3,
			input.tab6_obj7_use0,
			input.tab6_obj7_use1,
			input.tab6_obj7_use2,
			input.tab6_obj7_use3,
		],
		[
			input.tab7_bkg0_use0,
			input.tab7_bkg0_use1,
			input.tab7_bkg0_use2,
			input.tab7_bkg0_use3,
			input.tab7_bkg1_use0,
			input.tab7_bkg1_use1,
			input.tab7_bkg1_use2,
			input.tab7_bkg1_use3,
			input.tab7_bkg2_use0,
			input.tab7_bkg2_use1,
			input.tab7_bkg2_use2,
			input.tab7_bkg2_use3,
			input.tab7_bkg3_use0,
			input.tab7_bkg3_use1,
			input.tab7_bkg3_use2,
			input.tab7_bkg3_use3,
			input.tab7_bkg4_use0,
			input.tab7_bkg4_use1,
			input.tab7_bkg4_use2,
			input.tab7_bkg4_use3,
			input.tab7_bkg5_use0,
			input.tab7_bkg5_use1,
			input.tab7_bkg5_use2,
			input.tab7_bkg5_use3,
			input.tab7_bkg6_use0,
			input.tab7_bkg6_use1,
			input.tab7_bkg6_use2,
			input.tab7_bkg6_use3,
			input.tab7_bkg7_use0,
			input.tab7_bkg7_use1,
			input.tab7_bkg7_use2,
			input.tab7_bkg7_use3,
			input.tab7_obj0_use0,
			input.tab7_obj0_use1,
			input.tab7_obj0_use2,
			input.tab7_obj0_use3,
			input.tab7_obj1_use0,
			input.tab7_obj1_use1,
			input.tab7_obj1_use2,
			input.tab7_obj1_use3,
			input.tab7_obj2_use0,
			input.tab7_obj2_use1,
			input.tab7_obj2_use2,
			input.tab7_obj2_use3,
			input.tab7_obj3_use0,
			input.tab7_obj3_use1,
			input.tab7_obj3_use2,
			input.tab7_obj3_use3,
			input.tab7_obj4_use0,
			input.tab7_obj4_use1,
			input.tab7_obj4_use2,
			input.tab7_obj4_use3,
			input.tab7_obj5_use0,
			input.tab7_obj5_use1,
			input.tab7_obj5_use2,
			input.tab7_obj5_use3,
			input.tab7_obj6_use0,
			input.tab7_obj6_use1,
			input.tab7_obj6_use2,
			input.tab7_obj6_use3,
			input.tab7_obj7_use0,
			input.tab7_obj7_use1,
			input.tab7_obj7_use2,
			input.tab7_obj7_use3,
		],
		[
			input.tab8_bkg0_use0,
			input.tab8_bkg0_use1,
			input.tab8_bkg0_use2,
			input.tab8_bkg0_use3,
			input.tab8_bkg1_use0,
			input.tab8_bkg1_use1,
			input.tab8_bkg1_use2,
			input.tab8_bkg1_use3,
			input.tab8_bkg2_use0,
			input.tab8_bkg2_use1,
			input.tab8_bkg2_use2,
			input.tab8_bkg2_use3,
			input.tab8_bkg3_use0,
			input.tab8_bkg3_use1,
			input.tab8_bkg3_use2,
			input.tab8_bkg3_use3,
			input.tab8_bkg4_use0,
			input.tab8_bkg4_use1,
			input.tab8_bkg4_use2,
			input.tab8_bkg4_use3,
			input.tab8_bkg5_use0,
			input.tab8_bkg5_use1,
			input.tab8_bkg5_use2,
			input.tab8_bkg5_use3,
			input.tab8_bkg6_use0,
			input.tab8_bkg6_use1,
			input.tab8_bkg6_use2,
			input.tab8_bkg6_use3,
			input.tab8_bkg7_use0,
			input.tab8_bkg7_use1,
			input.tab8_bkg7_use2,
			input.tab8_bkg7_use3,
			input.tab8_obj0_use0,
			input.tab8_obj0_use1,
			input.tab8_obj0_use2,
			input.tab8_obj0_use3,
			input.tab8_obj1_use0,
			input.tab8_obj1_use1,
			input.tab8_obj1_use2,
			input.tab8_obj1_use3,
			input.tab8_obj2_use0,
			input.tab8_obj2_use1,
			input.tab8_obj2_use2,
			input.tab8_obj2_use3,
			input.tab8_obj3_use0,
			input.tab8_obj3_use1,
			input.tab8_obj3_use2,
			input.tab8_obj3_use3,
			input.tab8_obj4_use0,
			input.tab8_obj4_use1,
			input.tab8_obj4_use2,
			input.tab8_obj4_use3,
			input.tab8_obj5_use0,
			input.tab8_obj5_use1,
			input.tab8_obj5_use2,
			input.tab8_obj5_use3,
			input.tab8_obj6_use0,
			input.tab8_obj6_use1,
			input.tab8_obj6_use2,
			input.tab8_obj6_use3,
			input.tab8_obj7_use0,
			input.tab8_obj7_use1,
			input.tab8_obj7_use2,
			input.tab8_obj7_use3,
		],
	];

	let start_colours = [];
	let final_colours = [];
	let gb_gradients  = [];
	let OK_gradients  = [];
	let cycle_indices = [];
	let fade_indices  = [];
	let fade_total_frames = Array(num_tabs).fill(0);

	for (let tab = 0; tab < num_tabs; ++tab) {
		start_colours.push(Array(64));
		final_colours.push(Array(64));
		gb_gradients.push(Array(64));
		OK_gradients.push(Array(64));
		cycle_indices.push(new Set());
		fade_indices.push(new Set());
	}

	function palette_equal(palette_index) {
		const p1 = next_palette.slice(12 * palette_index, 12 * palette_index + 12);
		const p2 = last_palette.slice(12 * palette_index, 12 * palette_index + 12);
		for (let n = 0; n < p1.length; ++n) {
			if (p1[n] != p2[n]) {
				return false;
			}
		}
		return true;
	}

	// Get options
	const fade_steps = [
		input.tab1_fade_steps,
		input.tab2_fade_steps,
		input.tab3_fade_steps,
		input.tab4_fade_steps,
		input.tab5_fade_steps,
		input.tab6_fade_steps,
		input.tab7_fade_steps,
		input.tab8_fade_steps,
	];

	const fade_wait_frames = [
		input.tab1_fade_frames,
		input.tab2_fade_frames,
		input.tab3_fade_frames,
		input.tab4_fade_frames,
		input.tab5_fade_frames,
		input.tab6_fade_frames,
		input.tab7_fade_frames,
		input.tab8_fade_frames,
	];

	const cycle_wait_frames = [
		input.tab1_cycle_frames,
		input.tab2_cycle_frames,
		input.tab3_cycle_frames,
		input.tab4_cycle_frames,
		input.tab5_cycle_frames,
		input.tab6_cycle_frames,
		input.tab7_cycle_frames,
		input.tab8_cycle_frames,
	];

	const startpoints = [
		input.tab1_startpoint,
		input.tab2_startpoint,
		input.tab3_startpoint,
		input.tab4_startpoint,
		input.tab5_startpoint,
		input.tab6_startpoint,
		input.tab7_startpoint,
		input.tab8_startpoint,
	];

	const endpoints = [
		input.tab1_endpoint,
		input.tab2_endpoint,
		input.tab3_endpoint,
		input.tab4_endpoint,
		input.tab5_endpoint,
		input.tab6_endpoint,
		input.tab7_endpoint,
		input.tab8_endpoint,
	];

	const reverse = [
		input.tab1_reverse,
		input.tab2_reverse,
		input.tab3_reverse,
		input.tab4_reverse,
		input.tab5_reverse,
		input.tab6_reverse,
		input.tab7_reverse,
		input.tab8_reverse,
	];

	const starting_r = [
		input.tab1_starting_r,
		input.tab2_starting_r,
		input.tab3_starting_r,
		input.tab4_starting_r,
		input.tab5_starting_r,
		input.tab6_starting_r,
		input.tab7_starting_r,
		input.tab8_starting_r,
	];

	const starting_g = [
		input.tab1_starting_g,
		input.tab2_starting_g,
		input.tab3_starting_g,
		input.tab4_starting_g,
		input.tab5_starting_g,
		input.tab6_starting_g,
		input.tab7_starting_g,
		input.tab8_starting_g,
	];

	const starting_b = [
		input.tab1_starting_b,
		input.tab2_starting_b,
		input.tab3_starting_b,
		input.tab4_starting_b,
		input.tab5_starting_b,
		input.tab6_starting_b,
		input.tab7_starting_b,
		input.tab8_starting_b,
	];
	
	const starting_desaturate_intensity = [
		input.tab1_starting_desaturate_intensity,
		input.tab2_starting_desaturate_intensity,
		input.tab3_starting_desaturate_intensity,
		input.tab4_starting_desaturate_intensity,
		input.tab5_starting_desaturate_intensity,
		input.tab6_starting_desaturate_intensity,
		input.tab7_starting_desaturate_intensity,
		input.tab8_starting_desaturate_intensity,
	];

	const starting_hue_shift = [
		input.tab1_starting_hue_shift,
		input.tab2_starting_hue_shift,
		input.tab3_starting_hue_shift,
		input.tab4_starting_hue_shift,
		input.tab5_starting_hue_shift,
		input.tab6_starting_hue_shift,
		input.tab7_starting_hue_shift,
		input.tab8_starting_hue_shift,
	];
	
	const starting_night_intensity = [
		input.tab1_starting_night_intensity,
		input.tab2_starting_night_intensity,
		input.tab3_starting_night_intensity,
		input.tab4_starting_night_intensity,
		input.tab5_starting_night_intensity,
		input.tab6_starting_night_intensity,
		input.tab7_starting_night_intensity,
		input.tab8_starting_night_intensity,
	];

	const target_desaturate_intensity = [
		input.tab1_target_desaturate_intensity,
		input.tab2_target_desaturate_intensity,
		input.tab3_target_desaturate_intensity,
		input.tab4_target_desaturate_intensity,
		input.tab5_target_desaturate_intensity,
		input.tab6_target_desaturate_intensity,
		input.tab7_target_desaturate_intensity,
		input.tab8_target_desaturate_intensity,
	];

	const target_hue_shift = [
		input.tab1_target_hue_shift,
		input.tab2_target_hue_shift,
		input.tab3_target_hue_shift,
		input.tab4_target_hue_shift,
		input.tab5_target_hue_shift,
		input.tab6_target_hue_shift,
		input.tab7_target_hue_shift,
		input.tab8_target_hue_shift,
	];
	
	const target_night_intensity = [
		input.tab1_target_night_intensity,
		input.tab2_target_night_intensity,
		input.tab3_target_night_intensity,
		input.tab4_target_night_intensity,
		input.tab5_target_night_intensity,
		input.tab6_target_night_intensity,
		input.tab7_target_night_intensity,
		input.tab8_target_night_intensity,
	];

	const target_r = [
		input.tab1_target_r,
		input.tab2_target_r,
		input.tab3_target_r,
		input.tab4_target_r,
		input.tab5_target_r,
		input.tab6_target_r,
		input.tab7_target_r,
		input.tab8_target_r,
	];

	const target_g = [
		input.tab1_target_g,
		input.tab2_target_g,
		input.tab3_target_g,
		input.tab4_target_g,
		input.tab5_target_g,
		input.tab6_target_g,
		input.tab7_target_g,
		input.tab8_target_g,
	];

	const target_b = [
		input.tab1_target_b,
		input.tab2_target_b,
		input.tab3_target_b,
		input.tab4_target_b,
		input.tab5_target_b,
		input.tab6_target_b,
		input.tab7_target_b,
		input.tab8_target_b,
	];
	
	const blend = [
		input.tab1_blend,
		input.tab2_blend,
		input.tab3_blend,
		input.tab4_blend,
		input.tab5_blend,
		input.tab6_blend,
		input.tab7_blend,
		input.tab8_blend,
	];

	// eight separate fades:
	for (let tab = 0; tab < num_tabs; ++tab) {
		// Get start and end palettes:
		for (let p_index = 0; p_index < 16; ++p_index) {
			const used_pal = !(start_pal_inputs[tab][p_index] === "keep" || end_pal_inputs[tab][p_index] === "keep");
			const in_pal  = palettes.find((p) => p.id === start_pal_inputs[tab][p_index]);
			const out_pal = palettes.find((p) => p.id === end_pal_inputs[tab][p_index]);
			for (let c_index = 0; c_index < 4; ++c_index) {
				const linear_index = p_index * 4 + c_index;
				start_colours[tab][linear_index] = in_pal && in_pal.colors ? in_pal.colors[c_index] : dmg_pal[c_index];
				final_colours[tab][linear_index] = out_pal && out_pal.colors ? out_pal.colors[c_index] : dmg_pal[c_index];
				if (used_pal) {
					fade_total_frames[tab] = fade_steps[tab] * fade_wait_frames[tab];
					fade_indices[tab].add(linear_index);
					if (checkboxes[tab][linear_index]) {
						cycle_indices[tab].add(linear_index);
					}
				}
			}
		}
	}

	// colour can only belong to one cycle: give preference to lower number tabs:

	for (let tab = 0; tab < num_tabs; ++tab) {
		for (let t2 = tab + 1; t2 < num_tabs; ++t2) {
			cycle_indices[tab].forEach((n) => cycle_indices[t2].delete(n));
		}
		for (let t2 = 0; t2 < num_tabs; ++t2) {
			cycle_indices[tab].forEach((n) => fade_indices[t2].delete(n));
		}
	}

	for (let tab = 0; tab < num_tabs; ++tab) {
		for (let t2 = tab + 1; t2 < num_tabs; ++t2) {
			fade_indices[tab].forEach((n) => fade_indices[t2].delete(n));
		}
	}
	
	// create fade indices along with cycle_indices
	// remove cycle indices from fade indices
	function gt(a,b) {
		return a - b;
	}

	let cycle_steps = [];
	for (let tab = 0; tab < num_tabs; ++tab) {
		cycle_steps.push(cycle_indices[tab].size);
	}
	// find the total length of the effect in frames:
	let all_cycles_frames = 1;
	for (let tab = 0; tab < num_tabs; ++tab) {
		cycle_indices[tab] = Array.from(cycle_indices[tab]).sort(gt);
		fade_indices[tab] = Array.from(fade_indices[tab]).sort(gt);
		if (cycle_indices[tab].length > 0) {
			all_cycles_frames = lcm(all_cycles_frames, cycle_steps[tab] * cycle_wait_frames[tab]);
		}
	}

	const fade_length = fade_total_frames.reduce((a, b) => Math.max(a, b), 0);
	let total_frames = all_cycles_frames;
	let cycle_iterations = 1;
	if (total_frames == 1) {
		total_frames = fade_length;
		cycle_iterations = 0;
	} else {
		while (total_frames < fade_length) {
			total_frames += all_cycles_frames;
			++cycle_iterations;
		}
	}

	let unused_tab = [];
	for (let tab = 0; tab < num_tabs; ++tab) {
		unused_tab.push(cycle_indices[tab].length + fade_indices[tab].length == 0);
	}
	for (let tab = 0; tab < num_tabs; ++tab) {
		if (unused_tab[tab]) {
			continue;
		}
		// Create gradients for the palette fade:
		const steps_arr = [...Array(fade_steps[tab]).keys()];
		const used_colours = cycle_indices[tab].concat(fade_indices[tab]);

		used_colours.forEach((i) => { // 4 colours * 16 palettes
			const [r0, g0, b0] = components(start_colours[tab][i]);

			let [OK_L0, OK_a0, OK_b0] = linear_RGB_to_OKLab(r0, g0, b0);
			switch(startpoints[tab]) {
				case "multiply":
					[r2, g2, b2] = [starting_r[tab] / 31.0, starting_g[tab] / 31.0, starting_b[tab] / 31.0];
					[OK_L0, OK_a0, OK_b0] = linear_RGB_to_OKLab(r0 * r2, g0 * g2, b0 * b2);
					break;
				case "night":
					[L,C,h] = OKLab_to_OKLCh(OK_L0, OK_a0, OK_b0);
					// desaturate reds and greens:
					C = 0.9 * C * Math.pow((1 - Math.abs(-1.6746081505015078 - h) / 6.283185), 1.5);
					// lower brightnes
					L = 0.94 * Math.pow(L, 1.9);
					[OK_L2, OK_a2, OK_b2] = OKLCh_to_OKLab(L, C, h);
					// hue shift towards blue:
					[blue_l, blue_a, blue_b] = linear_RGB_to_OKLab(0, 0, 1);
					OK_a2 = OK_a2 + 0.08 * (blue_a - OK_a2);
					OK_b2 = OK_b2 + 0.08 * (blue_b - OK_b2);
					// mix with original colours:
					OK_L2 = OK_L0 + (starting_night_intensity[tab] / 100.0) * (OK_L2 - OK_L0);
					OK_a2 = OK_a0 + (starting_night_intensity[tab] / 100.0) * (OK_a2 - OK_a0);
					OK_b2 = OK_b0 + (starting_night_intensity[tab] / 100.0) * (OK_b2 - OK_b0);
					[OK_L0, OK_a0, OK_b0] = [OK_L2, OK_a2, OK_b2];
					break;
				case "hue":
					[L,C,h] = OKLab_to_OKLCh(OK_L0, OK_a0, OK_b0);
					[OK_L0, OK_a0, OK_b0] = OKLCh_to_OKLab(L,C,h + (starting_hue_shift[tab] / 360) * 6.28318);
					break;
				case "desaturated":
					[L,C,h] = OKLab_to_OKLCh(OK_L0, OK_a0, OK_b0);
					C = C * (1 - starting_desaturate_intensity[tab] / 100.0);
					[OK_L0, OK_a0, OK_b0] = OKLCh_to_OKLab(L, C, h);
					break;
				case "inverted":
					[OK_L0, OK_a0, OK_b0] = linear_RGB_to_OKLab(1 - r0, 1 - g0 , 1 - b0);
					break;
				case "saturated":
					// search for highest C inside rgb gamut
					[L,C,h] = OKLab_to_OKLCh(OK_L0, OK_a0, OK_b0);
					left = 0;  // bracket inside
					right = 1; // bracket outside
					epsilon = 0.001;
					while (right - left > epsilon) {
						mid = left + (right - left) / 2;
						[r2, g2, b2] = OKLCh_to_linear_RGB(L, mid, h);
						if (r2 > 1 || g2 > 1 || b2 > 1) {
							// outside gamut, move bracket down
							right = mid;
						} else {
							// inside gamut, move bracket up
							left = mid;
						}
					}
					[OK_L0, OK_a0, OK_b0] = OKLCh_to_OKLab(L, left, h);
					break;
				case "colourised":
					[, OK_a0, OK_b0] = linear_RGB_to_OKLab(starting_r[tab] / 31, starting_g[tab] / 31, starting_b[tab] / 31);
					break;
				case "black":
					[OK_L0, OK_a0, OK_b0] = [0, 0, 0];
					break;
				case "white":
					[OK_L0, OK_a0, OK_b0] = linear_RGB_to_OKLab(1, 1, 1);
					break;
				case "rgb":
					[OK_L0, OK_a0, OK_b0] = linear_RGB_to_OKLab(starting_r[tab] / 31, starting_g[tab] / 31, starting_b[tab] / 31);
					break;
			}

			const [r1, g1, b1] = components(final_colours[tab][i]);
			let [OK_L1, OK_a1, OK_b1] = linear_RGB_to_OKLab(r1, g1, b1);
			switch(endpoints[tab]) {
				case "multiply":
					[r2, g2, b2] = [target_r[tab] / 31.0, target_g[tab] / 31.0, target_b[tab] / 31.0];
					[OK_L1, OK_a1, OK_b1] = linear_RGB_to_OKLab(r2 * r1, g2 * g1, b2 * b1);
					break;
				case "night":
					[L,C,h] = OKLab_to_OKLCh(OK_L1, OK_a1, OK_b1);
					// desaturate reds and greens:
					C = 0.9 * C * Math.pow((1 - Math.abs(-1.6746081505015078 - h) / 6.283185), 1.5);
					// lower brightnes
					L = 0.94 * Math.pow(L, 1.9);
					[OK_L2, OK_a2, OK_b2] = OKLCh_to_OKLab(L, C, h);
					// hue shift towards blue:
					[blue_l, blue_a, blue_b] = linear_RGB_to_OKLab(0, 0, 1);
					OK_a2 = OK_a1 + 0.08 * (blue_a - OK_a2);
					OK_b2 = OK_b1 + 0.08 * (blue_b - OK_b2);
					// mix with original colours:
					OK_L2 = OK_L1 + (target_night_intensity[tab] / 100.0) * (OK_L2 - OK_L1);
					OK_a2 = OK_a1 + (target_night_intensity[tab] / 100.0) * (OK_a2 - OK_a1);
					OK_b2 = OK_b1 + (target_night_intensity[tab] / 100.0) * (OK_b2 - OK_b1);
					[OK_L1, OK_a1, OK_b1] = [OK_L2, OK_a2, OK_b2];
					break;
				case "hue":
					[L,C,h] = OKLab_to_OKLCh(OK_L1, OK_a1, OK_b1);
					[OK_L1, OK_a1, OK_b1] = OKLCh_to_OKLab(L, C, h + (target_hue_shift[tab] / 360) * 6.28318);
					break;
				case "desaturated":
					[L,C,h] = OKLab_to_OKLCh(OK_L1, OK_a1, OK_b1);
					C = C * (1 - target_desaturate_intensity[tab] / 100.0);
					[OK_L1, OK_a1, OK_b1] = OKLCh_to_OKLab(L, C, h);
					break;
				case "inverted":
					[OK_L1, OK_a1, OK_b1] = linear_RGB_to_OKLab(1 - r1, 1 - g1 , 1 - b1);
					break;
				case "saturated":
					// search for highest C inside rgb gamut
					[L,C,h] = OKLab_to_OKLCh(OK_L1, OK_a1, OK_b1);
					left = 0;  // bracket inside
					right = 1; // bracket outside
					epsilon = 0.001;
					while (right - left > epsilon) {
						mid = left + (right - left) / 2;
						[r2, g2, b2] = OKLCh_to_linear_RGB(L, mid, h);
						if (r2 > 1 || g2 > 1 || b2 > 1) {
							// outside gamut, move bracket down
							right = mid;
						} else {
							// inside gamut, move bracket up
							left = mid;
						}
					}
					[OK_L1, OK_a1, OK_b1] = OKLCh_to_OKLab(L, left, h);
					break;
				case "colourised":
					[, OK_a1, OK_b1] = linear_RGB_to_OKLab(target_r[tab] / 31, target_g[tab] / 31, target_b[tab] / 31);
					break;
				case "black":
					[OK_L1, OK_a1, OK_b1] = [0, 0, 0];
					break;
				case "white":
					[OK_L1, OK_a1, OK_b1] = linear_RGB_to_OKLab(1, 1, 1);
					break;
				case "rgb":
					[OK_L1, OK_a1, OK_b1] = linear_RGB_to_OKLab(target_r[tab] / 31, target_g[tab] / 31, target_b[tab] / 31);
					break;
			}
			const OK_L_gradient =  steps_arr.map((x) => OK_L0 + ((OK_L1 - OK_L0) / (fade_steps[tab] - 1)) * x);
			const OK_a_gradient =  steps_arr.map((x) => OK_a0 + ((OK_a1 - OK_a0) / (fade_steps[tab] - 1)) * x);
			const OK_b_gradient =  steps_arr.map((x) => OK_b0 + ((OK_b1 - OK_b0) / (fade_steps[tab] - 1)) * x);
			gb_gradients[tab][i] = steps_arr.map((x) => OKLab_to_GB(OK_L_gradient[x], OK_a_gradient[x], OK_b_gradient[x]));
			OK_gradients[tab][i] = steps_arr.map((x) => [OK_L_gradient[x], OK_a_gradient[x], OK_b_gradient[x]]);
		});
	}

	// Generate GBVM output:
	let gbvm = "";
	let carried_wait = 0; // carry-over frames if we want to skip an step entirely
	let last_palette = [];
	let current_gradient_step = Array(num_tabs).fill(-1);
	let current_cycle_step = Array(num_tabs).fill(-1);
	let waited = 0;
	let next_palette = [];
	let blendshift_counter = Array(num_tabs).fill(0);
	let blendshift_gradient = []
	let blendshift_tabs = [];
	for (let tab = 0; tab < num_tabs; ++tab) {
		blendshift_gradient.push(Array(cycle_steps[tab]));
		if (blend[tab] && cycle_indices[tab].length > 0) {
			blendshift_tabs.push(tab);
		}
	}

	let t0 = 0;
	let t1 = total_frames
	if (input.banksplit_check) {
		if (input.banksplit == "first") {
			t1 = Math.floor(total_frames / 2);
		} else {
			t0 = Math.floor(total_frames / 2);
		}
	}
	let last_t = t0;

	for (let t = 0; t < t1; ++t) { // time 
		/*
			Decide which cycles or fades need to be updated this frame
			(FizzBuzz)
		 */
		let fade_frame = Array(num_tabs);
		let cycle_frame = Array(num_tabs);


		for (let tab = 0; tab < num_tabs; ++tab) {
			fade_frame[tab] = (t < fade_steps[tab] * fade_wait_frames[tab]) && ((t % fade_wait_frames[tab]) == 0);
			cycle_frame[tab] = (t % cycle_wait_frames[tab]) == 0;
		}

		if (!fade_frame.some((x)=>(x)) && !cycle_frame.some((x)=>(x))) {
			// blend frame only
			if (blendshift_tabs.length == 0) {
				continue;
			}
		} 

		// advance through fades and cycles:
		for (let tab = 0; tab < num_tabs; ++tab) {
			let new_blend_gradient = false; // do we need to update the blendshift gradients?
			if (fade_frame[tab] && (current_gradient_step[tab] < fade_steps[tab] - 1)) {
				// advance the fade by one step
				new_blend_gradient = true;
				++current_gradient_step[tab];
			}
			if (cycle_frame[tab]) {
				// advance to the next step in the colour cycle
				new_blend_gradient = true;
				blendshift_counter[tab] = 0;
				if (reverse[tab]) { 
					--current_cycle_step[tab];
					if (current_cycle_step[tab] < 0) {
						current_cycle_step[tab] = cycle_steps[tab] - 1;
					}
				} else {
					++current_cycle_step[tab];
					if (current_cycle_step[tab] == cycle_steps[tab]) {
						current_cycle_step[tab] = 0;
					}
				}
			}
			if (new_blend_gradient) {
				for (let n = 0; n < cycle_steps[tab]; ++n) { // steps in cycle
					let c0;
					let c1;
					if (reverse[tab]) {
						c0 = cycle_indices[tab][n]; // colour slot for current step
						c1 = (n == cycle_steps[tab] - 1) ? cycle_indices[tab][0] : cycle_indices[tab][n + 1]; // colour slot for next step
					} else {
						if (n == 0) {
							c0 = cycle_indices[tab][0]; // colour slot for current step
							c1 = cycle_indices[tab][cycle_steps[tab] - 1];
						} else {
							c0 = cycle_indices[tab][n]; // colour slot for current step
							c1 = cycle_indices[tab][n-1];
						}
					}
					const fade_step = current_gradient_step[tab];
					const blend_steps = cycle_wait_frames[tab] + 1;
					[OK_L0, OK_a0, OK_b0] = OK_gradients[tab][c0][fade_step];
					[OK_L1, OK_a1, OK_b1] = OK_gradients[tab][c1][fade_step];
					const steps_arr = [...Array(blend_steps).keys()];
					const OK_L_gradient = steps_arr.map((x) => OK_L0 + ((OK_L1 - OK_L0) / (blend_steps - 1)) * x);
					const OK_a_gradient = steps_arr.map((x) => OK_a0 + ((OK_a1 - OK_a0) / (blend_steps - 1)) * x);
					const OK_b_gradient = steps_arr.map((x) => OK_b0 + ((OK_b1 - OK_b0) / (blend_steps - 1)) * x);
					blendshift_gradient[tab][n] = steps_arr.map((x) => OKLab_to_GB(OK_L_gradient[x], OK_a_gradient[x], OK_b_gradient[x]));
				}
			} else {
				blendshift_counter[tab] += 1;
			}
		}

		if (t < t0) {
			continue;
		}

		// get colours from current step in gradient:
		next_palette = Array(64).fill([0,0,0]);
		for (let tab = 0; tab < num_tabs; ++tab) {
			fade_indices[tab].forEach((c) => {
				next_palette[c] = gb_gradients[tab][c][current_gradient_step[tab]];
			});
			cycle_indices[tab].forEach((c) => {
				next_palette[c] = gb_gradients[tab][c][current_gradient_step[tab]];
			});
		}


		// cycle colours:
		for (let tab = 0; tab < num_tabs; ++tab) {
			// isolate colours to cycle:
			let cycle_colours = Array(cycle_steps[tab]);
			for (let n = 0; n < cycle_steps[tab]; ++n) {
				if (blend[tab]) {
					cycle_colours[n] = blendshift_gradient[tab][n][blendshift_counter[tab]];
				} else {
					cycle_colours[n] = next_palette[cycle_indices[tab][n]];
				}
			}

			// copy colours in cycle:
			let base_index = 0;
			for (let n = current_cycle_step[tab]; n < cycle_steps[tab]; ++n) { // palette slots
				next_palette[cycle_indices[tab][n]] = cycle_colours[base_index];
				++base_index;
			}
			for (let n = 0; n < current_cycle_step[tab]; ++n) { // palette slots
				next_palette[cycle_indices[tab][n]] = cycle_colours[base_index];
				++base_index;
			}
		}

		let update_pal = Array(16).fill(false);
		function set_using(c) {
			const p = Math.floor(c / 4);
			update_pal[p] = true;
		}

		for (let tab = 0; tab < num_tabs; ++tab) {
			cycle_indices[tab].forEach((c) => set_using(c));
			fade_indices[tab].forEach((c) => set_using(c));
		}
		next_palette = next_palette.flat();

		// check if this palette is identical to the previous - if so, skip it
		/*
			Create the bitmasks to indicate which palettes are
			update this step. We recalculate the masks every 
			step because we want to omit redundant palette 
			updates. It's possible for zero palettes to be
			updated at a given step in the gradient.
		 */
		let used_this_frame = Array(16); // palettes used this frame
		let bkg_mask = "";
		for (let p = 0; p < 8; ++p) {
			let bit = 1;
			if (t > t0) {
				bit = palette_equal(p) ? 0 : 1;
			}
			bit = update_pal[p] ? bit : 0;
			bkg_mask = bit + bkg_mask;
			used_this_frame[p] = bit;
		}
		bkg_mask = "0b" + bkg_mask;

		let obj_mask = "";
		for (let p = 8; p < 16; ++p) {
			let bit = 1;
			if (t > t0) {
				bit = palette_equal(p) ? 0 : 1;
			}
			bit = update_pal[p] ? bit : 0;
			obj_mask = bit + obj_mask;
			used_this_frame[p] = bit;
		}
		obj_mask = "0b" + obj_mask;

		let type_string;

		if (t > t0) {
			if ((bkg_mask !== "0b00000000" || obj_mask !== "0b00000000")) {
				// about to write palettes, so add a wait:
				gbvm += "VM_PUSH_CONST " + (t - last_t) +  "\nVM_INVOKE b_wait_frames, _wait_frames, 1, .ARG0\n";
				last_t = t;
			}
		}


		// If no palettes are updated at this step, we want to skip to
		// the next step, but carry over the wait frames so the timing
		// remains the same.
		if ((bkg_mask == "0b00000000" && obj_mask == "0b00000000")) {
			continue;
		}
		gbvm += `\n;     Frame ${t}:`;

		let cycle_tabs = [];
		let fade_tabs = [];
		for (let tab = 0; tab < num_tabs; ++tab) {
			if(cycle_frame[tab] && cycle_indices[tab].length > 0) {
				cycle_tabs.push(tab);
			}
			if(fade_frame[tab] && !unused_tab[tab]) {
				fade_tabs.push(tab);
			}
		}

		if(cycle_tabs.length > 0 && fade_tabs.length > 0) {
			gbvm += ` colour fade [${fade_tabs}] & colour cycle [${cycle_tabs}]\n`;
		} else if (cycle_tabs.length > 0) {
			gbvm += ` colour cycle [${cycle_tabs}]\n`;
		} else if (fade_tabs.length > 0) {
			gbvm += ` colour fade [${fade_tabs}]\n`;
		} else {
			gbvm += ` blend shift [${blendshift_tabs}]\n`;
		}

		if (bkg_mask != "0b00000000") { // 1+ bkg palettes to load this frame
			gbvm += "VM_LOAD_PALETTE " + bkg_mask + ", .PALETTE_BKG\n";
			gbvm += ";          GBS White     GBS LightG    GBS DarkG     GBS Black   ; Pal #\n";
			for (let p = 0; p < 8; ++p) {
				if (!used_this_frame[p]) {
					continue;
				}
				const [r0,g0,b0,r1,g1,b1,r2,g2,b2,r3,g3,b3] = next_palette.slice(p * 12, p * 12 + 12);
				const pals =  String(r0).padStart(2, ' ') + ", " +  String(g0).padStart(2, ' ') + ", " +  String(b0).padStart(2, ' ') + ",   " +  String(r1).padStart(2, ' ') + ", " +  String(g1).padStart(2, ' ') + ", " +  String(b1).padStart(2, ' ') + ",   " +  String(r2).padStart(2, ' ') + ", " +  String(g2).padStart(2, ' ') + ", " +  String(b2).padStart(2, ' ') + ",   " +  String(r3).padStart(2, ' ') + ", " +  String(g3).padStart(2, ' ') + ", " +  String(b3).padStart(2, ' ') + `  ; BKG ${p}`;
				gbvm += ".CGB_PAL   " + pals + "\n";
			}
		}
		if (obj_mask != "0b00000000") { // 1+ obj palettes to load this frame
			gbvm += "VM_LOAD_PALETTE " + obj_mask + ", .PALETTE_SPRITE\n";
			gbvm += ";          GBS Transp.   GBS White     GBS LightG    GBS Black   ; Pal #\n";
			for (let p = 8; p < 16; ++p) {
				if (!used_this_frame[p]) {
					continue;
				}
				const [r0,g0,b0,r1,g1,b1,r2,g2,b2,r3,g3,b3] = next_palette.slice(p * 12, p * 12 + 12);
				const pals = ubh(p) + String(r0).padStart(2, ' ') + ", " +  String(g0).padStart(2, ' ') + ", " +  String(b0).padStart(2, ' ') + ",   " +  String(r1).padStart(2, ' ') + ", " +  String(g1).padStart(2, ' ') + ", " +  String(b1).padStart(2, ' ') + ",   " +  String(r3).padStart(2, ' ') + ", " + String(g3).padStart(2, ' ') + ", " +  String(b3).padStart(2, ' ') + `  ; OBJ ${p - 8}`;
				gbvm += ".CGB_PAL   " + pals + "\n";
			}
		}
		last_palette = next_palette;
	}
	gbvm += "VM_PUSH_CONST " + (t1 - last_t) +  "\nVM_INVOKE b_wait_frames, _wait_frames, 1, .ARG0\n\n";
	gbvm += `;     ~~~ End of Multiple Fades with Colour Cycles block ~~~\n`;

	let wait_str = "";

	// Write GBVM output:
	_addComment("");
	_addComment(`      ___      ___        _____        ___`);
	_addComment(`     /  /\\    /  /\\      /  /::\\      /  /\\`);
	_addComment(`    /  /:/_  /  /::\\    /  /:/\\:\\    /  /:/_`);
	_addComment(`   /  /:/ /\\/  /:/\\:\\  /  /:/  \\:\\  /  /:/ /\\`);
	_addComment(`  /  /:/ /:/  /:/~/::\\/__/:/ \\__\\:|/  /:/ /:/_`);
	_addComment(` /__/:/ /:/__/:/ /:/\\:\\  \\:\\ /  /:/__/:/ /:/ /\\`);
	_addComment(` \\  \\:\\/:/\\  \\:\\/:/__\\/\\  \\:\\  /:/\\  \\:\\/:/ /:/`);
	_addComment(`  \\  \\::/  \\  \\::/      \\  \\:\\/:/  \\  \\::/ /:/`);
	_addComment(`   \\  \\:\\   \\  \\:\\       \\  \\::/    \\  \\:\\/:/`);
	_addComment(`    \\  \\:\\   \\  \\:\\       \\__\\/      \\  \\::/`);
	_addComment(`     \\___/    \\__\\/       ___         ___\\/       ___`);
	_addComment(`     /  /\\        ___    /  /\\       /  /\\       /  /\\        ___`);
	_addComment(`    /  /:/_      /  /\\  /  /::\\     /  /:/_     /  /:/_      /  /\\`);
	_addComment(`   /  /:/ /\\    /  /:/ /  /:/\\:\\   /  /:/ /\\   /  /:/ /\\    /  /:/`);
	_addComment(`  /  /:/ /::\\  /  /:/ /  /:/~/:/  /  /:/ /:/_ /  /:/ /:/_  /  /:/`);
	_addComment(` /__/:/ /:/\\:\\/  /::\\/__/:/ /:/__/__/:/ /:/ //__/:/ /:/ /\\/  /::\\`);
	_addComment(` \\  \\:\\/:/~/:/__/:/\\:\\  \\:\\/:::::\\  \\:\\/:/ /:\\  \\:\\/:/ /:/__/:/\\:\\`);
	_addComment(`  \\  \\::/ /:/\\__\\/  \\:\\  \\::/~~~~ \\  \\::/ /:/ \\  \\::/ /:/\\__\\/  \\:\\`);
	_addComment(`   \\__\\/ /:/      \\  \\:\\  \\:\\      \\  \\:\\/:/   \\  \\:\\/:/      \\  \\:\\`);
	_addComment(`     /__/:/        \\__\\/\\  \\:\\      \\  \\::/     \\  \\::/        \\__\\/`);
	_addComment(`     \\__\\/               \\__\\/       \\__\\/       \\__\\/`);
	_addComment(`     `);
	_addComment(`                Multiple Fades with Colour Cycles`);
	_addComment(`                [GF_EVENT_FADE_STREET_MULTI_CYCLE]`);
	_addComment(`     `);
	_addComment(`    Parameters:`);
	_addComment(`        Palette fade steps:           ${fade_steps}`);
	_addComment(`        Palette fade frames per step: ${fade_wait_frames}`);
	_addComment(`        Colour cycle steps:           ${cycle_steps}`);
	_addComment(`        Colour cycle frames per step: ${cycle_wait_frames}`);
	_addComment(`        Reverse cycle:                ${reverse.map((x) => x ? 1 : 0)}`);
	_addComment(`        Blend shift:                  ${blend.map((x) => x ? 1 : 0)}`);
	_addComment(`        Bank Split:                   ${input.banksplit_check ? input.banksplit : "None"}`);
	if (num_tabs == 8) {
		for (let tab = 0; tab  < 8; tab += 2) {
			_addComment("");
			_addComment(`    Fade/Cycle ${tab}: ${unused_tab[tab] ? "[unused]" : "        "}            Fade/Cycle ${tab + 1}: ${unused_tab[tab + 1] ? "[unused]" : ""}`); 
			_addComment(`        ${unused_tab[tab] ? "n/a        " : startpoints[tab].padEnd(11, ' ')} -> ${unused_tab[tab] ? "n/a        " : endpoints[tab].padEnd(11, ' ')}        ${unused_tab[tab + 1] ? "n/a        " : startpoints[tab + 1].padEnd(11, ' ')} -> ${unused_tab[tab + 1] ? "n/a" : endpoints[tab + 1].padEnd(11, ' ')}`); 
			_addComment(`        Fade length:  ${String(fade_total_frames[tab]).padStart(4, ' ')} frames`
				      + `         Fade length:  ${String(fade_total_frames[tab + 1]).padStart(4, ' ')} frames`);
			_addComment(`        Cycle length: ${String(cycle_indices[tab].length * cycle_wait_frames[tab]).padStart(4, ' ')} frames`
			              + `         Cycle length: ${String(cycle_indices[tab + 1].length * cycle_wait_frames[tab + 1]).padStart(4, ' ')} frames`);
		}
	}
	_addComment("");
	_addComment(`    Longest fade length:     ${fade_length} frames`);
	_addComment(`    Combined cycle length:   ${all_cycles_frames} frames`);
	_addComment(`    Cycle iterations:        ${cycle_iterations} times`);
	_addComment(``);
	if (input.banksplit_check) {
		let split_frames = (input.banksplit == "first" ? Math.floor(total_frames / 2) : total_frames - Math.floor(total_frames / 2))
		_addComment(`    Total wait (both parts): ${total_frames} frames`);
		_addComment(`    Total wait (this part):  ${split_frames} frames`);
	} else {
		_addComment(`    Total wait:              ${total_frames} frames`);
	}
	appendRaw(gbvm);
};

module.exports = {
	id,
	autoLabel,
	name,
	groups,
	description,
	subGroups,
	fields,
	compile,
	waitUntilAfterInitFade: true,
};

function components(rgb) {
	var r = (parseInt(rgb[0] + rgb[1], 16) / 8) / 31;
	var g = (parseInt(rgb[2] + rgb[3], 16) / 8) / 31;
	var b = (parseInt(rgb[4] + rgb[5], 16) / 8) / 31;
	return [r, g, b]
}

function ubh(p) {
	switch (p % 8) {
		case 0:
		case 5:
			return " 3, 19, 12,   ";
		case 1:
		case 6:
			return "31, 31, 31,   ";
		case 2:
		case 7:
			return "31, 17,  8,   ";
		case 3:
			return " 0,  0,  0,   ";
		case 4:
			return " 0,  0,  0,   ";
	}
}

function linear_RGB_to_OKLab(r, g, b)
{
	let l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
	let m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
	let s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
	l = Math.cbrt(l);
	m = Math.cbrt(m);
	s = Math.cbrt(s);
	const OK_L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
	const OK_a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
	const OK_b = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
	return [OK_L, OK_a, OK_b];
}

function lcm(a, b) 
{
	let m = a;
	while (m % b > 0) {
		m += a
	}
	return m;
}

function OKLab_to_GB(OK_L, OK_a, OK_b)
{
	let [r, g, b] =  OKLab_to_linear_RGB(OK_L, OK_a, OK_b);

	r = Math.min(31, Math.round(31 * Math.max(r, 0)));
	g = Math.min(31, Math.round(31 * Math.max(g, 0)));
	b = Math.min(31, Math.round(31 * Math.max(b, 0)));

	return [r, g, b];
}

function OKLCh_to_linear_RGB(L, C, h)
{
	const [OK_L, OK_a, OK_b] = OKLCh_to_OKLab(L, C, h);
	return OKLab_to_linear_RGB(OK_L, OK_a, OK_b);
}


function OKLCh_to_OKLab(L, C, h)
{
	const a = C * Math.cos(h);
	const b = C * Math.sin(h);
	return [L, a, b];
}

function OKLab_to_OKLCh(OK_L, OK_a, OK_b)
{
	const C = Math.sqrt(OK_a * OK_a + OK_b * OK_b);
	const h = Math.atan2(OK_b, OK_a);
	return [OK_L, C, h];
}

function OKLab_to_linear_RGB(OK_L, OK_a, OK_b)
{
	let l = OK_L + 0.3963377774 * OK_a + 0.2158037573 * OK_b;
	let m = OK_L - 0.1055613458 * OK_a - 0.0638541728 * OK_b;
	let s = OK_L - 0.0894841775 * OK_a - 1.2914855480 * OK_b;

	l = l * l * l;
	m = m * m * m;
	s = s * s * s;

	let r =  4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
	let g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
	let b = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;

	return [r, g, b];
}

