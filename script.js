import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { marked } from "marked";
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'process';
import * as fs from "node:fs";
const prettier = require("prettier");

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
    <link rel="stylesheet" href="../styles/main.css">
    <title>hvadATitleAdVera</title>
</head>
<body>`;

const fasturFotur = `</main>
<footer>
    <div class="heim"><a href="../">til baka</a></div>
    <div class="git-linkur">hægt er að finna allan kóða á <a href="https://github.com/ofurtumi/svindlblod">github</a></div>
</footer>
</body>
</html>`;

let lokaOutput = "";

// býr til interface til að spyrja hvaða file eigi að taka inn
const rl = readline.createInterface({ input, output });

rl.question("Hvaða skrá á að breyta: ", function (file) {
    addHtmlFile(file);
    updateIndex(file);
    rl.close();
});

function addHtmlFile(file) {
    // skráarnafnið nema mínus .md
    let filename = file.substring(0,file.length-3);
    fasturHaus = fasturHaus.replace("hvadATitleAdVera",filename);

    lokaOutput += fasturHaus;

    // aðeins að html-a markdownið meira
    let skra = fs.readFileSync("./markdown/" + file).toString();
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
    marr[n-1] += "</div>";

    // setur fylkið aftur saman og bætir öllu svo inn í lokaoutput
    marr = marr.join("<h2");

    let ass = marr.split("<hr>");
    ass[1] = '<div class="index">' + ass[1] + '</div>';

    ass = ass.join("");

    lokaOutput += ass;
    lokaOutput += fasturFotur;
    lokaOutput = prettier.format(lokaOutput,{parser: "html", tabWidth: 4});

    // skrifar út skrána í tilheyrandi html skrá
    let filenameHTML = filename + ".html";
    fs.writeFile("./builds/"+filenameHTML, lokaOutput, function (err) {
        if (err) return console.log(err);
        console.log("Skrif tókust: " + file + " > " + filenameHTML);
      });


}

function updateIndex(file) {
    let filename = file.substring(0,file.length-3);
    let filenameHTML = filename+ ".html"
    let buildIndex = fs.readFileSync("index.html").toString();
    
    if (!buildIndex.includes(filename)) {
        let BIMain = buildIndex.split("</ul>");
        BIMain[0] += '<li><a href="./builds/'+ filenameHTML + '">Glósur fyrir '+ filename +'</a></li>';
        BIMain = BIMain.join('</ul>');
        BIMain = prettier.format(BIMain,{parser: "html", tabWidth: 4});

    
        fs.writeFile("./builds/index.html", BIMain, function (err) {
            if (err) return console.log(err);
            console.log("Index.html uppfært!");
        });
    }
}

function erLatex (skjal) {
    const regex = /\$.+?\$/g;
    let latexStrengir = skjal.match(regex)
    for (let i = 0; i < latexStrengir.length; i++) {
        const element = array[i];
        
    }
}