# YAML format.  UTF8.  English provides a default for all messages.
# Other langauge files are able to replace english messages.
# "%1" and such may be used as placeholders in some of the strings.
# If you don't know YAML:  indentation matters; follow the examples.

#
#  JAVASCRIPT
#

builtin:
  v4is: Vaše IPv4 adresa ve veřejném internetu je 
  v6is: Vaše IPv6 adresa ve veřejném internetu je 
  v6service: "Vaše IPv6 služba je: "
  started: Start
  using: protokolem
  test_rigged: (Přeskočeno odesílání výsledků; test byl pozměněn)
  test_posting: (Aktualizace stavu připravenosti na IPv6 na serveru )
  test_posted: (Aktualizace stavu připravenosti na IPv6 na serveru dokončena)
  test_postfail: (Odeslání výsledků selhalo. Výše uvedené informace jsou správné, ale nejsou zaznamenány.) 
  more_info: "[víc]"
  readiness_scores: Vaše skóre
  readiness_score: Vaše skóre
  readiness_ipv4: stabilita a připravenost pro IPv4, když poskytovatelé obsahu poskytnou IPv4 i IPv6  
  readiness_ipv6: stabilita a připravenost pro IPv6, když poskytovatelé obsahu poskytnou obsah jen skrz IPv6
  click_to_see: Klikněte pro zobrazení 
  test_data: testovacích dat
  your_faq: FAQ
  faq: Časté dotazy
  loading: načítám...
  failed_to_load: nepovedlo se načíst
  go_back: "[Zpět]"
  permalink: "[permalink]"
  versions: "%app: Používáte verzi %found; doporučujeme %suggest nebo novější."
  ok: ok
  bad: špatné
  slow: pomalé
  timeout: timeout
checkresults:
  unknown_expansion: neznámá hodnota
  rig_text: "nesprávný parametr testu.  Očekává se 9 znaků. o/s/b/t pro open/slow/bad/timeout.  Jeden pro každý typ: a aaaa ds4 ds6 dsmtu ipv4 ipv6 v6mtu v6ns"
  unknown_result_code: neznámy návratový kód
form:
  solicit: Zaujímají nás Vaše nastavení, protože bylo zjištěno, že <b>Vaše IPv6 konektivita</b> je špatná, nebo alespoň z naší strany nepochopena. Nepovažujeme to za standardní situaci; chtěli by ste se s nami podělit o výsledky?
  share: sdílejte výsledky
  retest: znova otestovat
  confused: Celkem nerozumíme tímto výsledkům. Prosím obnovte stránku a spustěte testy znova. Když dostanete stejný výsledek, prosím %share aby sme mohli tento test zlepšit.
  result_code: Kód výsledku
  missing_contact: "Poznámka: Nemůžeme Vás kontaktovat kdýž neuvedete kontaktní adresu. Když chcete výsledky odeslat anonymně, Klikněte znova na Odeslat."
symptoms:
  browser_blocked: Váš prohlížeč zablokoval
messages:
  "No Direct IP": "Zdá se, že máte blokována spojení na URL obsahující IP adresy; možná se jedná o webový filter jako je 'NoScript' nebo 'RequestPolicy' nainstalovaný v prohlížeči, případně taková URL může blokovat proxy server.  Toto blokování limituje některé funkce této webové stránky."
  "No Direct IPv4": "IPv4 spojení přes DNS fungují, ale prosté IP adresy v URL nikoli.  Nicméně toto se v dnešní době již tak často na webu nepoužívá."
  "No Direct IPv6": "IPv6 spojení přes DNS fungují, ale prosté IP adresy v URL nikoli.  Nicméně toto se v dnešní době již tak často na webu nepoužívá."
  "6to4": "Zdá se, že používáte veřejnou 6to4 bránu (například tu, kterou provozuje <a href='http://www.nic.cz/6to4'>CZ.NIC</a>); váš směrovač toto může poskytovat automaticky bez Vašeho vědomí.  Tyto veřejné brány nemají garantovanou kvalitu; a výkon takového připojení tím <i>může</i> utrpět. Požádejte svého poskytovatele o nativní IPv6 konektivitu."
  "teredo": "Zdá se, že Vaše IPv6 spojení funguje přes Teredo, což je typ překladu IPv4/IPv6 adres pomocí veřejné brány.  Kvalita takové připojení <i>může</i> být horší, protože používáte veřejnou bránu pro přístup k IPv6 serverům."
  "teredo-minimum": "Zdá se, že Vaše IPv6 spojení funguje přes Teredo, což je způsob překladu IPv4/IPv6 adres pomocí veřejné brány; a v současné době toto připojení funguje pouze na explicitně zadané IP adresy.  To znamená, že současná konfigurace není použitelná pro prohlížení IPv6 webových stránek."
  "teredo-v4pref": "Your IPv6 connection appears to be using Teredo, a type of IPv4/IPv6 gateway.  Your particular teredo configuration is only used as a protocol of last resort. When visiting a site with both IPv4 and IPv6, IPv4 will be preferred."
  "IPv6 MTU": "Pozor, nebezpečí! IPv6 vám sice funguje, ale selhává doručování velkých paketů, což způsobuje zdání rozbitých webových stránek.  Pokud budou webové stránky zobrazeny přes IPv6, budete si myslet, že jsou nefunkční.  Požádejte svého poskytovatele připojení o vyřešení problémů s MTU; problém také může být v použitém tunelu."
  "confused:ASK": "Test results inconclusive; they were not consistent with expectations.  Please rerun the test, and if the results are the same, please fill out the contact form."
#  "ORIGINAL:dualstack:ipv4_preferred": "Gratulujeme vám!  Zdá se, že máte funkční IPv4 i IPv6 připojení.  Pokud budou webové stránky publikovány přes IPv6, bude je schopen váš prohlížeč přes tento protokol zobrazit. Poznámka:  Zdá se, že váš prohlížeč preferuje připojení přes IPv4, pokud má možnost volby.  Toto může v budoucnu způsobovat problémy."
#  "ORIGINAL:dualstack:ipv6_preferred": "Gratulujeme vám!  Zdá se, že máte funkční IPv4 i IPv6 připojení.  Pokud budou webové stránky publikovány přes IPv6, bude je schopen váš prohlížeč přes tento protokol zobrazit. Váš prohlížeč preferuje protokol IPv6 před protokolem IPv4, to je předpokládaný výsledek."
  "dualstack:ipv4_preferred": "-"
  "dualstack:ipv6_preferred": "-"
  "dualstack:slow": "Váš prohlížeč z neznámých důvodů funguje pomaleji, pokud má možnost se připojit jak přes IPv4 tak přes IPv6. Zkuste test opakovat a pokud bude problém přetrvávat, vyplňte prosím náš kontaktní formulář."
  "ipv4_only": "Zdá se, že můžete prohlížet pouze stránky připojené přes IPv4. Váš prohlížeč se není schopen spojit se stránkami připojenými pouze přes IPv6."
  "ipv4_only:ds_good": "Pokud jsou zároveň nabídnuty možnosti připojení přes IPv4 i IPv6, váš prohlížeč volí bez prodlení IPv4."
  "ipv4_only:ds_slow": "Pokud jsou zároveň nabídnuty možnosti připojení přes IPv4 i IPv6, Vaše spojení se je výrazně pomalejší v porovnání s pouze IPv4 webovými stránkami. Můžete to dokonce vyvolávat dojem, že příslušná služba je nedostupná. Je to pravděpodobně způsobeno vaším špatným nastavením IPv6."
  "ipv4_only:ds_timeout": "Pokud jsou zároveň nabídnuty možnosti připojení přes IPv4 i IPv6, Vaše spojení po vypršení časového limitu selže. Můžete to dokonce vyvolávat dojem, že příslušná služba je nedostupná. Je to pravděpodobně způsobeno vaším špatným nastavením IPv6. Zvažte vypnutí tohoto protokolu, nebo kontaktování podpory."
  "ipv4_slow": "Připojení přes IPv4 je pomalé, ale funguje.  Možná jste vy nebo váš poskytovatel připojení za zařízením na sdílení IP adres (NAT), které je v současné době přetížené."
  "ipv6_only": "Zdá se, že jste schopný prohlížet pouze IPv6 Internet.  Nemáte přístup k IPv4 připojení.  To je od vás velmi odvážné!"
  "ipv6_slow": "Vaše spojení protokolem IPv6 je velmi pomalé leč funkční. Může to být způsobeno použitím IPv6 tunelu, který je buď pomalý nebo je připojen k velmi vzdálené destinaci."
  "ipv6_timeout": "Připojení ke službám dostupným pouze po IPv6 selže po vypršení časového limitu. Jakékoliv webové stránky využívající pouze IPv6 vám budou nedostupné."
  "broken_ipv6": "Připojení ke stránkám podporujícím IPv6 selhává. Pravděpodobně máte zapnutý protokol IPv6 a váš počítač se domnívá, že IPv6 konektivita funguje, což ale není pravda. Jakékoliv stránky, které přidají podporu IPv6 se vám stanou nedostupné. Pokuste se opravit vaši IPv6 konektivitu a pokud to není možné vypněte protokol IPv6 na vašem počítači."
  "webfilter:blocked": "Váš systém není možné otestovat. Zdá se, že vás firewall nebo prohlížeč testy blokuje. Klíčové testy není možné spustit. Zkuste vypnout všechny doplňky a rozšíření vašeho prohlížeče a znovu otevřete tuto stránku. V případě že testy opět nebude možné spustit, zanechte vzkaz se žádostí o podporu."
  "webfilter:dsboth": "Váš systém není možné otestovat. Zdá se, že vás firewall nebo prohlížeč testy blokuje. Dual-stack testy není možné spustit. Zkuste vypnout všechny doplňky a rozšíření vašeho prohlížeče a znovu otevřete tuto stránku. V případě že testy opět nebude možné spustit, zanechte vzkaz se žádostí o podporu."
  "webfilter:addons": "Váš prohlížeč blokuje testovací URL. Zkusíme alternativní metody, které nemusí ukazovat vaši IP adresu a může být snížena kvalita hodnocení."
  "webfilter:firefox": "Pravděpodobná příčina jsou doplňky NoScript nebo AdBlock+. V doplňku NoScript lze povolit spouštění skriptů na této stránce (bude to možná potřeba více než jednou). Minimálně povolte níže uvedená URL."
  "NAT64": "Gratulujeme!  Vaše připojení podporuje protokol IPv6. Poznámka: Vaše IPv4 konektivita je limitována pouze na spojení realizována pomocí jmen, která jsou vyhledána pomocí DNS serveru vašeho poskytovatele. Přímé připojení na IP adresy není podporováno. Vǎš poskytovatel používá pravděpodobně zařízení, které umožňuje spojení na IPv4 stránky pomocí jmen (NAT64+DNS64). To by mělo vyhovovat ve většině případů."
  "v6ns:ok": "Váš DNS server (možná provozovaný Vaším poskytovatelem připojení) má přístup přes IPv6."
  "v6ns:bad": "Váš DNS server (možná provozovaný Vaším poskytovatelem připojení) nemá přístup do IPv6 internetu nebo není nakonfigurován, aby jej používal.  V budoucnu to může způsobit nedostupnost stránek, které jsou připojeny pouze přes IPv6."
  "ip_timeout:firefox": "You are likely using a FireFox plugin that is causing IP based tests to fail.  Examples: RequestPolicy.  Please disable those while using this site."
  "confused:obbo": "Selhal překlad jména s IPv6 záznamem; taky překlad a připojení k objektu s dual-stack záznamem přes IPv6. Něco je pravděpodobne špatně s DNS překladem."
  "apple:dnsbug_aaaa": "Selhal překlad jména s IPv6 záznamem; taky překlad a připojení k objektu s dual-stack záznamem přes IPv6.  Překlad objektu pouze s IPv6 záznamem by mělo fungovat správně.  Apple obsahuje chybu, která občas způsobí chybu při překladu IPv6.  Viděli jsme důkaz na konc tohto testu. Znovu načtete stránku a otestuje spojení ještě jednou.  Víc na <a href=\"http://openradar.appspot.com/7333104\">http://openradar.appspot.com/7333104</a>."
  "apple:dnsbug_ds": "Selhal překlad objektu s dual-stack záznamem (mělo se fungovat alespoň s protokolem IPv4).  Apple obsahuje chybu, která občas způsobí chybu při překladu IPv6.  Viděli jsme důkaz na konc tohto testu. Znovu načtete stránku a otestuje spojení ještě jednou.  Víc na <a href=\"http://openradar.appspot.com/7333104\">http://openradar.appspot.com/7333104</a>."
  "ipv4:no_address": "Nebyla detekována IPv4 adresa"
  "ipv6:no_address": "Nebyla detekována IPv6 adresa"
  "no_address": "Nebylo možné detekovat Vaše IP adresy kvůli některého z doplňků ve Vašem prohlížeči."
  "opera": "Prohlížeč Opera nemusí na téhle stránce pracovat správně. <b>Když se problém objevuje, zkuste jiný prohlížeč.</b>."
  "opera:turbo": "<b>Zakažte turbo mód v prohlížeči Opera a zkuste znova</b>  Turbo mód není kompatibilní s potřebami stránky." 
  "dualstack:safe": "<a href=\"ipv6day.html\">Celosvětové spuštění IPv6</a> proběhne 6. června 2012. <b>Dobrá zpráva!</b> Po celosvětovém spuštění IPv6 bude váš prohlížeč na tomto počítači v této lokalitě fungovat bez problémů."
  "dualstack:unsafe": "<a href=\"ipv6day.html\">Celosvětové spuštění IPv6</a> proběhne 6. června 2012. <b>Naše testy ukazují, že máte rozbitou nebo špatně nastavenou konfiguraci IPv6.  Kvůli tomu budete mít problémy se připojit na stránky, které zapnou IPv6.</b> Pokud nejste schopni problém odstranit sami, zvažte vypnutí IPv6 konfigurace nebo požádejte svého poskytovatele připojení o pomoc."
  "dualstack:mtu": "<a href=\"ipv6day.html\">Celosvětové spuštění IPv6</a> proběhne 6. června 2012. <b>Naše testy ukazují, že možná máte problém s MTU (Maximal Transfer Unit) při používání IPv6.  Kvůli tomu se vám stránky, které zapnou IPv6, budou natahovat pomalu (nebo vůbec).</b> Pokud nejste schopni problém odstranit sami, zvažte vypnutí IPv6 konfigurace nebo požádejte svého poskytovatele připojení o pomoc."
  "buggydns1": "Povedl se překlad IPv6 adresy, ale Váš DNS server (zřejmě Váš domácí router) poškodil odpověď a považuje IPv6 adresu za (nesprávnou) IPv4."
  "proxy_via": "Zjistili sme, že používáte proxy. To znamená, že testujete proxy, ne Váš počítač. Detaily o proxy (z hlavičky 'Via' ): %details"
  "proxy_via_dumb": "Zjistili sme, že používáte proxy. To znamená, že testujete proxy, ne Váš počítač."
  "ipv6:nodns": "IPv6 spojení funguje, ale spojení, která používají DNS jména nepoužívají IPv6. Z nějakého důvodu váš prohlížeč nebo operační systém nedělá IPv6 DNS dotazy na 'AAAA' záznamy."
  "broken": "Máme doporučení, jak opravit váš systém."
  "sites": "Vzhledem k tomu, že máte IPv6, přikládáme tab, který ukazuje, jak dobře se můžete připojit k dalším IPv6 stránkám.  %sites"
  "avoids_ipv6": "Váš prohlížeč má funkční IPv6 adresu, ale vyhýbá se jejímu použití. To je znepokojující."

# These are not just strings, but arrays,
# #1: url
# #2: link text to show (translate this!)
# Between the first and second string, it must be a comma and a space.
# ie:   "key":  ["url", "text"] 
messages_popups:
  "dualstack:safe": ["faq_ipv6launch.html", "Celosvětové spuštění IPv6"]
  "dualstack:unsafe":  ["faq_ipv6launch.html", "Celosvětové spuštění IPv6"]
  "dualstack:mtu": ["faq_pmtud.html", "faq: MTU"]
  "IPv6 MTU": ["faq_pmtud.html", "faq: MTU"]
  "ipv4:no_address": ["faq_ipv4_only.html", "faq: Bez IPv4"]
  "ipv6:no_address": ["faq_no_ipv6.html", "faq: Bez IPv6"]
  "6to4": ["faq_6to4.html", "faq: 6to4"]
  "teredo-minimum": ["faq_teredo_minimum.html", "faq: Teredo Minimum"]
  "v6ns:bad": ["faq_v6ns_bad.html", "faq: v6ns Bad"] 
  "webfilter:blocked":  ["faq_browser_plugins.html", "faq: Browser Plugins"]
  "webfilter:dsboth":   ["faq_browser_plugins.html", "faq: Browser Plugins"]
  "webfilter:firefox":  ["faq_firefox_plugins.html", "faq: Firefox Add-Ons"]
  "webfilter:addons":   ["faq_browser_plugins.html", "faq: Browser Plugins"]
  "ip_timeout:firefox": ["faq_firefox_plugins.html", "faq: Firefox Add-Ons"]
  "opera": ["faq_opera.html", "faq: Opera"]
  "buggydns1": ["faq_buggydns1.html", "faq: Buggy DNS"]
  "broken": ["broken.html", "faq: Nefunkční!"]
  "ipv6:nodns": ["faq_broken_aaaa.html", "faq: Nefunkční DNS dotazy"]
  "avoids_ipv6": ["faq_avoids_ipv6.html", "faq: Vyhýbání se IPv6?"]

#
#   HTML
#

html:
  h1: Testuje vaše IPv6 připojení.
  tabnav_index: Test IPv6
  tabnav_faq: Často kladené dotazy
  tabnav_ipv6day: Světový den IPv6
  tabnav_ipv6launch: Celosvětové spuštění IPv6
  tabnav_stats: Statistiky
  tabnav_changes: Změny/ToDo
  summary: Souhrn
  tests_run: Spuštěné testy
  tech_info: Technické informace
  share: Sdílejte výsledky / Kontakt
  faq_for_you: Často kladené dotazy 
  help_popup: Pomoc
  debug: Debug
  click_to_see: Klikněte pro
  mirrors: Mirrory
  when: Místní časy
  disclaimer: Toto je mirror stránek test-ipv6.com. Výsledky prezentované zde můžou ale nemusí být stejné jako na původních stránkách.
  more_detail: "více detailů"
  less_detail: "méně detailů"
  sites: Další IPv6 stránky


html_header:
  title: Otestuje připojení k IPv6.
  description: Tato stránka otestuje, zdali jsou váš prohlížeč a připojení připraveny na IPv6. Ukáže vaši současnou IPv4 i IPv6 adresu.


html_mail:
  comments_wanted:  <b>Zaujímá nás Vaše konfigurace</b> Chceme zlepšit test-ipv6.com.  Poskytnete nám víc informací o nastavení Vašeho prohlížeče a počítače? S Vaší pomocí můžeme pomoct jiným užívatelům pomoct vyřešit problémy s IPv6.
  comments_unwanted: Formulář Vám umožní vložit komentář nebo se na něco zeptat. Automaticky se uchovají výsledky Vašeho testu.  
  comments_faq: <span id="comments_faq_link"></span>Existuje (FAQ) stránka pro <b>Vaši</b> množinu výsledků.  Prosím přečtete si ji předtým než napíšete komentář; mnoho dotazů již bylo zodpovězeno.  Když máte další dotazy, použijte formulář.
  comments_delayed: "<b>Odpověd se může chvíli zdržet</b>, kvůli nedávným mediálním zprávám o <a href=\"http://www.internetsociety.org/worldipv6day\">World IPv6 Day</a>."
  limit_info: Pokud reportujete problém nebo žádáte o pomoc, vyplňte prosím všechny požadované informace. 
  thanks: Děkujeme,
  form_purpose: Účel vaší zprávy
  form_pickone: (Zvolte jednu možnost)
  form_questions: Dotaz týkající se výsledků testů
  form_bug: Nahlášení chyby
  form_suggestion: Doporučení
  form_cheersjeers: Libovolný vzkaz
  form_email: Vyplňte, pokud vyžadujete odpověď.
  form_submit: Pošli výsledky
  help_anyinfo: Jakékoliv informace, o kterých si myslíte, že jsou relevantní (například jaký používáte router, firewall proxy a podobně).
  help_plugins: Testy založené na javascriptu selhaly. Může to být způsobeno instalovánými doplňky a rozšířeními, vložte prosím jejich seznam.
  help_generic: "Pokud máte dostatečné technické znalosti, zkopírujte výstup příkazů"
  help_windows: "Pokud máte dostatečné technické znalosti, otevřete \"Příkazovou řádku\" nebo program \"cmd\" a spusťte následující příkazy:"
  help_output:  Vložte výstup příkazů. Pomůže nám to potvrdit nebo vyvrátit různé teorie týkající se Vašho dotazu
  comments_english: "Prosíme Vás (pokud možno) o komentáře v angličtině."

html_tech:
  how_this_works: "Jak tyto testy fungují:"
  how_general: Váš prohlížeč bude požádán o připojení na sérii URL. Dle výsledné kombinace úspěšných a neúspěšných spojení lze určit jak je připraven váš prohlížeč na nasazování IPv6 u webových stránek.
  pending: čeká na zpracování
  detail_a:  Načte objekt, který má pouze A záznam v DNS. Očekává se použití protokolu IPv4. Uživatel připojený pouze přes IPv6 může tento objekt stáhnout v případě, že jeho poskytovatel podporuje řešení NAT64/DNS64 případně proxy.
  detail_aaaa: Načte objekt, který má pouze AAAA záznam v DNS. Očekává se použití protokolu IPv6. Pro uživatele, kteří nemají IPv6 konektivitu, by měl tento test selhat. Pokud selže rychle, mělo by být vše v pořádku. Tedy zatím.
  detail_v6ns: Toto je test DNS resolveru vašeho poskytovatele (nejde o test vašeho počítače). Pokud tento test úspěšně projde, je váš DNS resolver (často provozován vaším poskytovatelem) schopen dotazů autoritativních DNS serverů připojených pouze po IPv6. V současné době to není nezbytné (zatím). 
  detail_ds: Toto je nejdůležitější test. Tento test ověřuje, zdali je váš prohlížeč schopen připojení ke stránkám, které mají IPv4 i IPv6 adresu. Uživateli připojenému pouze přes IPv4 by měl test problémů projít (po IPv4).
  detail_ds_warning: Pokud tento test selže, můžete očekávat problémy, jakmile provozovatelé webových stránek začnou nabízet obsah po IPv6.
  detail_ipv4: Tento test se pokusí připojit na stránky pouze pomocí číselné IP adresy. To by mělo fungovat pro většinu uživatelů s výjimkou těch připojených pouze k IPv6. Pokud první test prošel a tento selhal, je pravděpodobné, že váš poskytovatel používá NAT64/DNS64. Bude nutné se připojovat pouze pomocí jmen a nikoliv číselných adres. 
  detail_ipv6:  V tomto testu se zkouší připojení na číselnou IPv6 adresu. Hlavním účelem je oddělení testování IPv6 konektivity od testování DNS systému pro ni. Druhým účelem je zjištění, jestli je zapnuto Teredo; některé systémy mohou využívat Teredo jen v případě, že v URL je IPv6 adresa.
  detail_v6mtu: Testuje, zdali fungují IPv6 žádosti s velkými pakety. Pokud tento test selže, ale ostatní IPv6 testy projdou, znamená to, že je pravděpodobně nějaký problém s PMTUD; může to mít spojitost s IP tunely.   
  detail_dsmtu: Testuje, zdali fungují IPv6 žádosti s velkými pakety (podobně jako test s dual-stack záznamem) v kombinaci s velkými IPv6 pakety.
  summary1: Pokud souhrn výsledků indikoval nějaký problém, můžete (vy nebo vaše technická podpora) použít tyto informace k diagnóze problémů. Nalevo jsou zobrazena testovaná URL a výsledky příslušných testů. Napravo je popis toho, co dané URL testuje.
  summary2: "Pokud výsledky testů nedávají smysl s ohledem na předcházející popisy nebo pokud potřebujete nějakou další podporu, neváhejte nás kontaktovat:"
  bonus: (To je bonus)
  detail_buggydns1: Načte objekt, který má AAAA záznam. Některé routery tento objekt špatně interpertují jako A záznam a použijí jenom prvních 32 bitů. Tento test musí selhat.

html_tests:
  test_a: Test s IPv4 DNS záznamem
  test_aaaa: Test s IPv6 DNS záznamem
  test_ds: Test s dual stack DNS záznamem
  test_v6ns: Test zda DNS server vašeho ISP používá IPv6
  test_ipv4: Test IPv4 bez DNS
  test_ipv6: Test IPv6 bez DNS
  test_v6mtu: Test velkých IPv6 paketů
  test_buggydns1: Test chyby DNS
  test_dsmtu: Test s dual stack DNS záznamem a velkým IPv6 paketem
  bonus: (To je bonus)

