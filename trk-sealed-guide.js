// Opracowanie dostarczonych przewodników z 06.11.2026, nie ranking z danych meczowych.
// Numery odnoszą się do bazowych wydań TRK; h = Handout, g = Guide, liczba = strona.
const sealedArchetypes = [
  {id:'GW', tier:'A', label:'Doctors / Counters', plan:'Rozkładaj countery szeroko, chroń stół i dobieraj z Phloxa.', cards:[250,234,216], signposts:[250,234]},
  {id:'WU', tier:'A', label:'Spacecraft', plan:'Tania załoga i ETB value, potem przewaga w powietrzu. Licz prawdziwe creatures, nie same statki.', cards:[239,230,90,83], signposts:[239,230]},
  {id:'BR', tier:'A', label:'Klingons / Dies', plan:'Atakuj tokenami i zamieniaj ich śmierć w karty lub obrażenia. Potrzebujesz fodderu oraz payoffów.', cards:[247,235,136], signposts:[247,235]},
  {id:'BG', tier:'A-', label:'Archaeology', plan:'Surveil, recursion i karty opuszczające graveyard budują przewagę w długiej grze.', cards:[255,232,202], signposts:[255,232]},
  {id:'UB', tier:'A-', label:'Dilemma Control', plan:'Modalne spelle kontrolują tempo. Dla Seven of Nine przewodnik zaleca co najmniej 6 modalnych spelli lub zdolności.', cards:[252,246,116], signposts:[252,246]},
  {id:'WB', tier:'A-', label:'Borg Artifacts', plan:'Anthem Locutusa i sacrifice wymagają dużej gęstości artifact creatures — około 8 lub więcej.', cards:[245,258,4,133], signposts:[245,258]},
  {id:'RW', tier:'B+', label:'Command 8+', plan:'Niska krzywa i szeroki stół pozwalają osiągnąć 8 power. Usuwaj blockery i wygrywaj tempem.', cards:[243,256,38,141], signposts:[243,256]},
  {id:'RG', tier:'B+', label:'Away Team Landfall', plan:'Dodatkowe land dropy napędzają presję. Najpierw zapewnij właściwe źródła many.', cards:[229,231,198], signposts:[229,231]},
  {id:'GU', tier:'B+', label:'Strange New Worlds', plan:'Różne nazwy lądów skalują payoffy. Nie psuj kolorów i tempa dla kolejnego tapped landu.', cards:[254,236,223], signposts:[254,236]},
  {id:'UR', tier:'B', label:'Scientists / Noncreatures', plan:'Pogódź 8–10 noncreature spells z 13–15 creatures/Spacecraft. Sam zestaw enablerów nie wystarczy.', cards:[253,238,137], signposts:[253,238]}
];

const sealedEntries = new Map();
function addSealedCard(number, category, purpose, sources, grade = '—', removal = '') {
  const key = String(number);
  const entry = sealedEntries.get(key) || {collector_number:key, category:[], purpose:'', sources:[], archetypes:[], grade:'—'};
  if (!entry.category.includes(category)) entry.category.push(category);
  if (purpose && !entry.purpose.includes(purpose)) entry.purpose += (entry.purpose ? ' ' : '') + purpose;
  entry.sources = [...new Set([...entry.sources, ...sources])];
  if (grade !== '—') entry.grade = grade;
  if (removal) entry.removal = removal;
  sealedEntries.set(key, entry);
}

[
  [22,'Exile nonland permanentu; artifact removal może uwolnić cel.'],
  [8,'Odpowiedź na power 4+ lub wymiana na kartę.'],
  [34,'Elastyczny stun albo obrażenia w atakującego.'],
  [19,'Top-end z team pumpem i basic landcycling.'],
  [60,'Creature lub Spacecraft na górę/dół biblioteki; taniej w atakującego.'],
  [51,'Kontra albo stun z doborem karty.'],
  [83,'Cantrip i późniejszy latający finisher po station.'],
  [66,'Ciało oraz bounce na ETB pomagają odwrócić tempo.'],
  [114,'Bezwarunkowy destroy z surveil.'],
  [105,'Tani removal, mocniejszy po poświęceniu fodderu.'],
  [97,'Dwa ciała i presja za pięć many.'],
  [123,'Selekcja kart, graveyard setup i ponowne użycie przez beam me up.'],
  [164,'Obrażenia w dowolny cel i opcjonalny loot.'],
  [162,'Tani burn, mocniejszy po śmierci stwora.'],
  [139,'Token z haste i drugi cast: materiał do sacrifice.'],
  [172,'Reach, solidne ciało i karta impulsowa.'],
  [190,'Dwa własne stwory składają obrażenia na jeden cel.'],
  [194,'Vigilance, graveyard hate lub surveil.'],
  [198,'Ramp i fixing do basic/Planet, ponowne użycie przez beam me up.'],
  [219,'Mill i odzyskanie landu lub Treasure.']
].forEach(([n,note]) => addSealedCard(n,'Top common',note,['h2','g7'],'Top common'));

[
  [1,'Tani exile creature lub Spacecraft.'],[44,'Removal na ETB i późniejszy latający finisher.'],
  [20,'Flyer i blink własnego permanentu.'],[40,'Selekcja z pięciu kart i drugi cast z graveyardu.'],
  [58,'Stun na ETB i stosunkowo niski próg station.'],[54,'Kopia najlepszego artifact/creature wraz z counterami.'],
  [56,'Bounce z ponownym castem przez beam me up.'],[90,'Artefakty z topu i przyspieszanie station.'],
  [116,'Kill lub draw 2; zasila Dilemma.'],[125,'Kill nonartifact albo reanimacja małego artifact creature.'],
  [101,'Osłabienie szerokiego stołu albo edict.'],[94,'Removal na ETB, potem Equipment.'],
  [178,'Obrażenia w dowolny cel i możliwość drugiego castu.'],[155,'Duże ciało z trample i jednostronne obrażenia w stół.'],
  [170,'Anthem, countery z dies i późniejszy flyer.'],[154,'Skalowalne obrażenia z exile.'],
  [222,'Dwa lądy na ETB i późniejszy latający finisher.'],[208,'Duże ciało z reach, vigilance i deathtouch.'],
  [202,'Odzyskanie permanentu i token Illusion.'],[216,'Rosnąca wartość kolejnych creatures dzięki counterom.']
].forEach(([n,note]) => addSealedCard(n,'Top uncommon',note,['h2','g8'],'Top uncommon'));

[45,50,131,171,224,270].forEach(n => addSealedCard(n,'Glue','Pomaga połączyć krzywą, manę lub synergie talii.',['h2','g7']));
sealedArchetypes.forEach(a => a.cards.forEach(n => {
  const signpost = a.signposts.includes(n);
  addSealedCard(n,signpost ? 'Signpost' : 'Synergy payoff',a.plan,signpost ? ['g6','g8'] : ['g6']);
  sealedEntries.get(String(n)).archetypes.push(a.id);
}));

[
  [7,'S','Anthem i Officer za creature/Spacecraft spell.'],
  [43,'S','Tokeny na ETB, ward i latający finisher z lifelink.'],
  [221,'S','Discover na ETB oraz przy ataku.'],
  [135,'S','Reanimacja na ETB i po combat damage.'],
  [74,'A+','Podwajanie doboru; wymaga przeżycia do kolejnej tury.'],
  [261,'A+','Duży flyer i sweeper nonartifact creatures; uważaj na artefakty.'],
  [227,'A+','Exile/assimilate; affinity zyskuje przy dużej liczbie artefaktów.'],
  [103,'A+','Sweeper skalowany liczbą różnych nazw lądów.'],
  [68,'A','Bounce, draw i tokeny; zaplanuj wygraną przed czwartym upkeepem.'],
  [181,'A','Removal, threaten, loot i wymuszony sacrifice.'],
  [273,'A','Bezkolorowy silnik kart impulsowych i latający finisher.']
].forEach(([n,grade,note]) => addSealedCard(n,'Bomb',note,n === 273 ? ['g9'] : ['h3','g9'],grade));
[222,208,202,44,155].forEach(n => addSealedCard(n,'Ukryta bomba','W przewodnikach wyróżniona jako wyjątkowo mocny uncommon.',['h3','g9']));

[
  ['Premium',[1,22,44,114,116]],['Mocne',[105,125,190,154,178]],
  ['Tempo',[60,56,58,34,72]],['Damage',[164,162,151,146]],
  ['Artifact hate',[161,220,192,243]]
].forEach(([level,numbers]) => numbers.forEach(n => addSealedCard(n,'Removal','',['h3','g9'],'—',level)));

[
  [34,'Stun lub obrażenia w atakującego.'],[35,'Ochrona przez hexproof, indestructible i counter.'],
  [85,'Surveil i draw albo blink własnego creature.'],[51,'Kontra albo stun z draw.'],
  [105,'Fodder otwiera mocniejszy tryb removalu.'],[111,'Zwiększenie power i karta po śmierci creature.'],
  [161,'Pump lub destroy artifact: elastyczny slot w mainie.'],[164,'Burn z opcjonalnym lootem.'],
  [203,'Pump, counter i untap.'],[192,'Pump z trample lub edict artifact/enchantment.'],
  [169,'Przy ataku rywala możliwy tani team pump.']
].forEach(([n,note]) => addSealedCard(n,'Combat trick',note,n === 169 ? ['g10'] : ['h4','g10']));

[224,198,223,222,303].forEach(n => addSealedCard(n,'Fixing','Wsparcie many; splash wymaga odpowiedniej liczby źródeł.',['g4']));
[161,220,192].forEach(n => addSealedCard(n,'Sideboard','Przeciw Spacecraft/Borg; artifact removal jest także grywalny w mainie.',['h5','g11']));
[134,100,194].forEach(n => addSealedCard(n,'Sideboard','Przeciw graveyardowi UB/BG, najlepiej z szybszym clockiem.',['h5','g11']));
[
  [27,'Rywal otrzymuje wybór i karty; bardzo odległy warunek zwycięstwa.'],
  [41,'Nie blokują; potrzebują czasu lub team pumpu.'],
  [153,'Wysoki koszt i zależność od graveyardu/Federation.'],
  [102,'Wysoki koszt; potrzebuje wolnej talii i dobrego graveyardu.'],
  [175,'Każdy atak kosztuje nonland permanent; wymaga fodderu.']
].forEach(([n,note]) => addSealedCard(n,'Build-around',note,n === 175 ? ['g9'] : ['h3','g9']));


// Dodatkowe przypisania i opisy z notatek użytkownika „Archetypy TRK Limited”.
// Oddzielne od ocen i odnośników do przewodników PDF.
const archetypeNotes = [
  {
    "archetype": "WU",
    "number": 83,
    "note": "statek 3/2; dobiera kartę przy wejściu."
  },
  {
    "archetype": "WU",
    "number": 44,
    "note": "removal na tapnięte stworzenie oraz późniejszy latacz 4/4."
  },
  {
    "archetype": "WU",
    "number": 17,
    "note": "stworzenie do obsługi Station; licznik albo dobranie karty."
  },
  {
    "archetype": "WU",
    "number": 9,
    "note": "tani artifact creature z vigilance; umożliwia jednocześnie atakowanie i używanie Station."
  },
  {
    "archetype": "UB",
    "number": 73,
    "note": "główny payoff; dostaje licznik +1/+1 za każde dilemma."
  },
  {
    "archetype": "UB",
    "number": 51,
    "note": "elastyczne dilemma: counterspell albo tapowanie, stun counter i karta."
  },
  {
    "archetype": "UB",
    "number": 125,
    "note": "removal lub odzyskanie małego artifact creature z grobu."
  },
  {
    "archetype": "UB",
    "number": 96,
    "note": "dodatkowa wartość przy opuszczaniu cmentarza; przede wszystkim karta BG, ale może wspierać kontrolną wersję UB."
  },
  {
    "archetype": "WB",
    "number": 9,
    "note": "daje wszystkim artifact creatures vigilance."
  },
  {
    "archetype": "WB",
    "number": 4,
    "note": "przy wejściu tworzy token 1/1 Borg."
  },
  {
    "archetype": "WB",
    "number": 92,
    "note": "daje wszystkim artifact creatures +1/+0."
  },
  {
    "archetype": "WB",
    "number": 133,
    "note": "po śmierci pozostawia token 1/1 Borg."
  },
  {
    "archetype": "WB",
    "number": 2,
    "note": "może wyszukać z talii pozostałe kopie samego siebie."
  },
  {
    "archetype": "WB",
    "number": 15,
    "note": "tani artifact creature, który daje licznik +1/+1."
  },
  {
    "archetype": "WB",
    "number": 125,
    "note": "może przywrócić artifact creature o MV 3 lub mniejszym."
  },
  {
    "archetype": "WB",
    "number": 105,
    "note": "removal z opcją poświęcenia artefaktu dla efektu −6/−6."
  },
  {
    "archetype": "WB",
    "number": 124,
    "note": "artifact creature i źródło karty z cmentarza."
  },
  {
    "archetype": "BR",
    "number": 173,
    "note": "haste; po śmierci w swojej turze tworzy Clue."
  },
  {
    "archetype": "BR",
    "number": 133,
    "note": "po śmierci tworzy token 1/1 Borg."
  },
  {
    "archetype": "BR",
    "number": 105,
    "note": "wykorzystuje stworzenie lub artefakt jako koszt kickera."
  },
  {
    "archetype": "BR",
    "number": 175,
    "note": "agresywne 5/3 z menace; po ataku poświęca nonland permanent."
  },
  {
    "archetype": "BR",
    "number": 125,
    "note": "usuwa blokera albo odzyskuje małego artifact creature."
  },
  {
    "archetype": "RG",
    "number": 143,
    "note": "główny payoff; każdy landfall zadaje obrażenia, a drugi w turze daje jej licznik."
  },
  {
    "archetype": "RG",
    "number": 193,
    "note": "tworzą tapnięty token lądu New Planet."
  },
  {
    "archetype": "RG",
    "number": 198,
    "note": "wyszukuje basic land albo Planet; może być ponownie zagrany przez Beam me up."
  },
  {
    "archetype": "RG",
    "number": 213,
    "note": "po landfallu staje się 6/5; w późnej grze tworzy New Planet."
  },
  {
    "archetype": "RG",
    "number": 224,
    "note": "dodatkowa rampa i fixing, choć nie uruchamia landfallu samodzielnie."
  },
  {
    "archetype": "GU",
    "number": 49,
    "note": "główny payoff; tworzy dwa tokeny 2/2, dobiera dwie karty i odrzuca jedną."
  },
  {
    "archetype": "GU",
    "number": 193,
    "note": "tworzą ląd New Planet."
  },
  {
    "archetype": "GU",
    "number": 213,
    "note": "tworzy New Planet w późnej grze i korzysta z kolejnych wejść lądów."
  },
  {
    "archetype": "GU",
    "number": 198,
    "note": "wyszukuje basic land albo Planet."
  },
  {
    "archetype": "GU",
    "number": 224,
    "note": "rampa oraz fixing do wielokolorowych kart i drogich payoffów."
  },
  {
    "archetype": "GW",
    "number": 15,
    "note": "tani generator licznika +1/+1."
  },
  {
    "archetype": "GW",
    "number": 17,
    "note": "licznik i vigilance albo dobranie karty, jeśli kontrolujesz permanent z licznikiem."
  },
  {
    "archetype": "GW",
    "number": 195,
    "note": "rozdaje licznik; stworzenia z licznikami mają trample."
  },
  {
    "archetype": "GW",
    "number": 14,
    "note": "daje licznik, a potem może uratować stworzenie z licznikiem przed zniszczeniem."
  },
  {
    "archetype": "GW",
    "number": 73,
    "note": "sam gromadzi liczniki za dilemma."
  },
  {
    "archetype": "GW",
    "number": 21,
    "note": "rozdaje licznik podczas ataku po osiągnięciu łącznej siły 8."
  },
  {
    "archetype": "GW",
    "number": 217,
    "note": "może kłaść liczniki po wygnaniu kart z cmentarza."
  },
  {
    "archetype": "UR",
    "number": 76,
    "note": "dobiera kartę; można zagrać ponownie z grobu."
  },
  {
    "archetype": "UR",
    "number": 178,
    "note": "3 obrażenia w dowolny cel; ma Beam me up."
  },
  {
    "archetype": "UR",
    "number": 52,
    "note": "rośnie za każdym razem, gdy dobierasz kartę."
  },
  {
    "archetype": "UR",
    "number": 51,
    "note": "elastyczny instant oraz dilemma."
  },
  {
    "archetype": "UR",
    "number": 83,
    "note": "dobiera kartę przy wejściu i dobrze współpracuje z bounce."
  },
  {
    "archetype": "UR",
    "number": 198,
    "note": "efekt rampy możliwy do ponownego zagrania z cmentarza."
  },
  {
    "archetype": "UR",
    "number": 49,
    "note": "drogi spell-payoff, ale najlepiej działa dopiero z bazą wielu nazw lądów."
  },
  {
    "archetype": "BG",
    "number": 124,
    "note": "może wygnać się z cmentarza, aby dobrać kartę."
  },
  {
    "archetype": "BG",
    "number": 96,
    "note": "kopiuje małe stworzenie z grobu; drainuje przeciwnika, gdy karty opuszczają twój cmentarz."
  },
  {
    "archetype": "BG",
    "number": 217,
    "note": "surveil 2, a podczas walki może wygnać kartę z grobu i dać licznik."
  },
  {
    "archetype": "BG",
    "number": 125,
    "note": "przywraca małego artifact creature z grobu na pole."
  },
  {
    "archetype": "BG",
    "number": 76,
    "note": "opuszcza cmentarz przez Beam me up."
  },
  {
    "archetype": "BG",
    "number": 198,
    "note": "opuszcza cmentarz przez Beam me up."
  },
  {
    "archetype": "RW",
    "number": 156,
    "note": "po spełnieniu warunku uniemożliwia wybranemu stworzeniu blokowanie."
  },
  {
    "archetype": "RW",
    "number": 21,
    "note": "podczas ataku rozdaje licznik +1/+1."
  },
  {
    "archetype": "RW",
    "number": 28,
    "note": "wydajne 4/3, ale nie może atakować samotnie."
  },
  {
    "archetype": "RW",
    "number": 175,
    "note": "5/3 z menace, bardzo szybko wypełnia próg 8 siły."
  },
  {
    "archetype": "RW",
    "number": 173,
    "note": "tani atakujący z haste, który pozostawia Clue po śmierci."
  },
  {
    "archetype": "RW",
    "number": 143,
    "note": "samodzielne 3/3, które może rosnąć i zadawać obrażenia przez landfall."
  }
];
archetypeNotes.forEach(({archetype, number, note}) => {
  const key = String(number);
  if (!sealedEntries.has(key)) addSealedCard(number, 'Wsparcie archetypu', '', []);
  const entry = sealedEntries.get(key);
  if (!entry.archetypes.includes(archetype)) entry.archetypes.push(archetype);
  (entry.archetypeNotes ||= []).push({archetype, note});
  const group = sealedArchetypes.find(a => a.id === archetype);
  if (!group.cards.includes(number)) group.cards.push(number);
});
