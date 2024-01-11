const fs = require("fs");
const path = require("path");

const results = [];

const src = path.join(__dirname, "../dist/dcs-hot-loader.lua")
const target = path.join(
	process.env.USERPROFILE,
	"Saved Games",
	"DCS.openbeta",
	"Scripts",
	"Hooks",
	"dcs-hot-loader.lua"
)

try {
	fs.unlinkSync(target);
	results.push({ src, target });
} catch (e) {
	results.push({ src, target, err: e.message });
}

console.log(results);
