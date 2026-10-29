*18. august 2026 -- Wessel Braakman*

> Ingen LLM/GenAI ble brukt til å skrive denne bloggen 🙂

## Introduksjon

Det er en stund siden vi skrev del 3 om NoBBQ. Vi har definitivt ikke
sittet stille siden da.

I de tidligere delene skrev vi om hvordan vi startet i det små, først
med bare 10 spørsmål innenfor fire forskjellige bias-kategorier. Senere
utvidet vi dette til rundt 100 spørsmål per kategori, samtidig som vi
testet forskjellige måter å stille spørsmålene og analysere svarene på.

Siden da har ting vokst ganske mye.

Vi har nå fullført lokaliseringen av de første fire kategoriene og kjørt
de komplette datasettene mot fire forskjellige KI-systemer:
**ChatGPT-4o, Gemini 2.5, Mistral Large og Borealis 27b**. Dette har
resultert i **48 803 svar** som vi har samlet inn og analysert.

Det er ganske stor forskjell fra der vi startet.

![Nåværende NoBBQ-resultater: % bias deviation per kategori per LLM](IMAGE-1-RESULTATGRAF.png)
*Nåværende NoBBQ-resultater basert på 48 803 svar. Erstatt `IMAGE-1-RESULTATGRAF.png` med den endelige bildestien.*

Grafen ser også ganske annerledes ut enn de foreløpige resultatene vi
viste i del 3. Med nesten 49 000 svar har verdiene begynt å stabilisere
seg sammenlignet med de tidlige pilotkjøringene våre.

Det er fortsatt tydelige forskjeller både mellom modellene og mellom
kategoriene. I dette datasettet har ChatGPT-4o lavest bias deviation for
kjønn, alder og nasjonalitet, mens resultatene for religion ligger mye
tettere. Alder skiller seg ut som en kategori med relativt høy deviation
for tre av de fire systemene. Borealis 27b har også betydelig høyere
deviation for kjønn og nasjonalitet enn ChatGPT-4o i dette datasettet.

Disse resultatene betyr ikke at én modell generelt er "mer biased" eller
"mindre biased" enn en annen. De viser hvordan disse fire systemene
svarer på spørsmålene i de fire NoBBQ-kategoriene vi har fullført så
langt.

Og tallene viste seg å bare være en del av historien.

Det betyr heller ikke at NoBBQ er ferdig. Målet vårt for en ordentlig
første versjon av NoBBQ er å dekke 11 kategorier. Vi har fire ferdige
nå, noe som betyr at ytterligere syv fortsatt må oversettes og, enda
viktigere, tilpasses norsk språk og kontekst.

## Noen ganger finner modellene bare på ting

NoBBQ er ment for å måle bias. Hallusinasjoner var egentlig ikke noe vi
lette etter.

Vi fant dem likevel.

Ett eksempel handlet om et spørsmål med en eldre kvinne og en student. I
informasjonen KI-systemene fikk, var det ikke grunnlag for å legge
ekstra ansvar på noen av dem. Likevel gjorde to av de fire systemene
akkurat det. De la til resonnementer om hvem som hadde ansvar som rett
og slett ikke fantes i konteksten vi hadde gitt dem.

![Eksempel med den opprinnelige prompten og hallusinert resonnement fra to KI-systemer](IMAGE-2-HALLUSINASJON-EKSEMPEL.png)
*Eksempel fra datasettet. Erstatt `IMAGE-2-HALLUSINASJON-EKSEMPEL.png` med den endelige bildestien.*

Dette skaper et interessant problem for oss.

Benchmarken ser først og fremst på svaret systemet til slutt velger.
Hvis modellen velger ett av de forventede svarene, kan vi sammenligne
det med det forventede resultatet og beregne en score.

Men hva hvis modellen velger et svar basert på noe den selv har funnet
på?

Da forteller det endelige svaret bare en del av historien.

Dette var ikke noe vi spesifikt hadde satt oss fore å måle, men med
titusenvis av svar blir denne typen mønstre mye lettere å finne.

## Et riktig svar er ikke alltid et godt svar

Vi begynte også å se tilfeller der det endelige svaret så helt greit ut,
men resonnementet bak var mindre greit.

En modell kan komme frem til svaret vi forventer, samtidig som den
underveis introduserer antakelser om personene i spørsmålet. Den kan
tillegge dem motivasjoner som ikke ble nevnt, gjøre antakelser basert på
noens bakgrunn, eller legge til detaljer for å få sin egen tolkning av
situasjonen til å fungere.

Hvis vi bare registrerer det endelige svaret, blir dette markert som
riktig.

Fra et benchmark-perspektiv gir det mening. Fra et KI-etikkperspektiv er
vi ikke sikre på om det er nok.

Dette er en av grunnene til at det har vært nyttig å samle inn mer data.
Vi får ikke bare større tillit til tallene. Vi finner også oppførsel som
tallene i seg selv ikke nødvendigvis viser.

## Bias er ikke alltid så enkelt som biased eller ikke biased

Noe annet som ble stadig tydeligere, er at det ikke alltid er nyttig å
tenke på et svar som enten biased eller unbiased.

En modell kan for eksempel helt riktig unngå å velge det stereotypiske
svaret, men likevel introdusere en stereotypi når den forklarer hvorfor
den valgte som den gjorde.

En annen modell kan være ekstremt forsiktig og nekte å gjøre antakelser
i det hele tatt. Det kan være bra når konteksten er tvetydig, fordi det
er akkurat det vi ønsker at den skal gjøre. Men den samme oppførselen
blir et problem hvis modellen også nekter å svare når konteksten faktisk
inneholder nok informasjon.

En lav bias-score betyr altså ikke automatisk at et system oppfører seg
akkurat slik vi ønsker.

Det vi ideelt sett ønsker er ganske enkelt: bruk informasjonen som
faktisk er gitt, og ikke fyll inn det som mangler med antakelser det
ikke finnes grunnlag for.

Å få KI-systemer til å gjøre dette konsekvent ser ut til å være litt
mindre enkelt.

## 50 000 svar, men bare fire kategorier

Antallet svar kan få det til å høres ut som om NoBBQ snart er ferdig.

Det er vi ikke.

Så langt har vi fullført fire hele kategorier. Syv til må fortsatt
lokaliseres før vi har det vi regner som en ordentlig V1 av benchmarken.

![Fremdrift for NoBBQ V1: 4 av 11 kategorier lokalisert](IMAGE-3-NOBBQ-FREMDRIFT.png)
*Fremdrift for NoBBQ V1. Erstatt `IMAGE-3-NOBBQ-FREMDRIFT.png` med den endelige bildestien.*

Vi bruker bevisst ordet lokalisering, og ikke bare oversettelse.

Den originale BBQ-benchmarken ble laget for en amerikansk,
engelskspråklig kontekst. Et spørsmål kan være perfekt oversatt til
norsk og fortsatt gi veldig lite mening som en norsk bias-test.

Yrker kan ha andre assosiasjoner her. Navn kan ha andre konnotasjoner.
Institusjoner fungerer annerledes. Stereotypier som er godt kjent i USA
kan være uvanlige i Norge, mens stereotypier som finnes her kanskje ikke
er representert i den originale benchmarken i det hele tatt.

Vi har allerede møtt spørsmål der det holder å endre noen få ord, men
også spørsmål som må skrives om mye mer omfattende.

For de resterende syv kategoriene ønsker vi derfor ikke bare å oversette
alt så raskt som mulig slik at vi kan si at vi er ferdige.

Vi vil at spørsmålene faktisk skal gi mening i Norge.

Det tar tid.

## Så, hva skjer videre?

Først og fremst, syv kategorier til.

Det kommer til å holde oss opptatt en stund.

Samtidig ønsker vi å fortsette å grave i de 48 803 svarene vi
allerede har. Det finnes mye mer der enn én enkelt bias-score, og noe av
den uventede oppførselen vi har funnet har allerede fått oss til å tenke
på nytt rundt deler av hvordan vi analyserer resultatene.

Vi har også begynt å eksperimentere med nyere KI-modeller. Det har skapt
noen helt andre problemer med metodikken vår, men det fortjener nok sitt
eget blogginnlegg.

Foreløpig er målet fortsatt det samme som da vi startet: å bygge en
bias-benchmark som faktisk fungerer for norsk språk og norsk kontekst,
og bruke den til å forstå bedre hvordan KI-systemene vi bruker stadig
mer oppfører seg her.

Vi er fire kategorier inn.

Syv igjen.
