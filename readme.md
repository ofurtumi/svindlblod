# glósubankinn

tilgangur verkefnisins er að geta skrifað einfaldar glósur og svindlblöð í markdown sem hægt er að breyta í html sem er formattað þannig að auðvelt sé að prenta út

## notkun
ef þú villt fá html útgáfu er hægt er að clona þetta repo og ef nodejs og npm eru til staðar er hægt að keyra 

    npm install
    npm run gen

þá poppar upp á consolið

    Hvaða skrá á að breyta:

skrifa þarf nafnið á skránni sem á að breyta úr .md yfir í .html, nafnið á að vera allt skráarnafnið þ.e. **readme.md** en ekki bara **readme**

## skrif
ef þú af einhverjum ástæðum vilt nota þetta til þess að skrifa þínar eigin glósur þá eru aðeins fáeinar reglur sem hafa þarf í huga.
- bara nota eitt level 1 heading
    - þ.e. ekki nota fleiri en eina fyrirsögn merkta með einu #
    - ég laga kannski kóðann þannig það verði í lagi ehv daginn en það verður langt þangað til

- hópar af glósum afmarkast af level 2 headings
    - allt á milli tveggja h2 verður sett saman inn í div
    - fyrsta div er skilgreint beint eftir h1
    - seinasta div er skilgreint í rétt á undan main

- það er hægt að nota inline latex stærðfræði formúlur
    - til þess að þær birtist rétt í bæði md og html þarf að hafa þær innan dollaramerkja
    - dæmi \$f(x)=\frac{y^2}{9}\$ myndi birtast sem $f(x)=\frac{y^2}{9}$
---