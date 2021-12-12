import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { marked } from "marked";
import * as readline from 'node:readline';
import { exit, stdin as input, stdout as output } from 'process';
import * as fs from "node:fs";
const prettier = require("prettier");
const katex = require("katex");

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

    let skra = getContent(file);
    // aðeins að html-a markdownið meira
    
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

    let listar = marr.split("<hr>");
    listar[1] = '</div><div class="index">' + listar[1];
    listar[1] = listar[1].replace('"index">\n</div><div>','"index">')
    // listar[1] = listar[1].replace("></div>",">")

    listar = listar.join("");

    let heild = erLatex(listar);

    lokaOutput += heild;
    lokaOutput += fasturFotur;
    lokaOutput = prettier.format(lokaOutput,{parser: "html", tabWidth: 4});

    // skrifar út skrána í tilheyrandi html skrá
    let filenameHTML = filename + ".html";
    fs.writeFile("./builds/"+filenameHTML, lokaOutput, function (err) {
        if (err) return console.log(err);
        console.log("Skrif tókust: " + file + " > " + filenameHTML);
      });


}

function getContent (file) {
    try {
        let skra = fs.readFileSync("./markdown/" + file).toString();
        return skra
    } catch (error) {
        console.log("Ehv ekki rétt við skráarnafnið, reyndu aftur")
        exit();
    }
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

    
        fs.writeFile("./index.html", BIMain, function (err) {
            if (err) return console.log(err);
            console.log("Index.html uppfært!");
        });
    }
}

/**
 * tekur inn allt 
 * @param { string } skjal 
 * @returns 
 */
function erLatex (skjal) {
    let allt = skjal
    const regex = /\$.+?\$/g;
    if (allt.match(regex)) {
        let latexStrengir = allt.match(regex)
        // console.log(latexStrengir)
        for (let i = 0; i < latexStrengir.length; i++) {
            let n = latexStrengir[i].length-1;
            let baraMath = latexStrengir[i].substring(1,n)
            allt = allt.replace(latexStrengir[i],katex.renderToString(baraMath,{
                output: "mathml"
            }));
        }
    }
    return allt
}