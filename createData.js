const fs = require("fs")
const userAgents = require("./result.json");
let filterData = userAgents.map(ele => ele.userAgent)
console.log(filterData)
fs.writeFile("data.js", `module.exports = ${JSON.stringify(filterData)}`, "utf8", () => {
    console.log("done")
})