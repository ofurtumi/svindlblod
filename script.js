import { marked } from "marked";
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'process';
import * as fs from "node:fs";

let fasturHaus = `<!DOCTYPE html>
<html lang="is">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="twitter:card" content="description">
    <meta name="twitter:creator" content="@tumi_tigur">
    <meta name="twitter:title" content="glósur">
    <meta name="twitter:description" content="svindlmiði fyrir próf, hvaða próf? veit ekki, stendur á síðunni">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="main.css">
    <title>hvadATitleAdVera</title>
</head>
<body>`;

const fasturFotur = `</main>
<footer>
    hægt er að finna allan kóða á <a href="https://github.com/ofurtumi/svindlblod">github</a>
</footer>
</body>
</html>`;

let lokaOutput = "";

// býr til interface til að spyrja hvaða file eigi að taka inn
const rl = readline.createInterface({ input, output });

rl.question("Hvaða skrá á að breyta: ", function (file) {

    // skráarnafnið nema mínus .md
    let filename = file.substring(0,file.length-3)
    fasturHaus = fasturHaus.replace("hvadATitleAdVera",filename)

    lokaOutput += fasturHaus;

    // aðeins að html-a markdownið meira
    let skra = fs.readFileSync(file).toString();
    let m = marked.parse(skra);
    m = m.replace("<h1","<header><h1");
    m = m.replace("</h1>","</h1></header><main>");


    // splittar htmlinu niður í fylki svo hægt sé að setja div á rétta staði
    let marr = m.split("<h2");
    let n = marr.length;
    marr[0] += "<div>"
    for (let i = 1; i < n-1; i++) {
        marr[i] += "</div><div>";
    }
    marr[n-1] += "</div>"

    // setur fylkið aftur saman og bætir öllu svo inn í lokaoutput
    marr = marr.join("<h2")
    lokaOutput += marr;
    lokaOutput += fasturFotur;

    // skrifar út skrána í tilheyrandi html skrá
    let filenameHTML = filename + ".html";
    fs.writeFile(filenameHTML, lokaOutput, function (err) {
        if (err) return console.log(err);
        console.log("Skrif tókust: " + file + " > " + filenameHTML);
      });
    rl.close();
});

