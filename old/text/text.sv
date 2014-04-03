# YAML format.  UTF8.  English provides a default for all messages.
# Other langauge files are able to replace english messages.
# "%1" and such may be used as placeholders in some of the strings.
# If you don't know YAML:  indentation matters; follow the examples.

#
#  JAVASCRIPT
#

builtin:
  v4is: Din publika IPv4-adress ser ut att vara
  v6is: Din publika IPv6 adress ser ut att vara  
  isp: Din Internetleverantör (ISP) verkar vara 
  v6service: Din IPv6-tjänst ser ut att vara
  proxied_capitalized: Genom proxy
  started: Startad
  tests_run: tester körda
  using: använder
  test_rigged: (Uppdatering av statistik skippades; testet var riggat)
  test_posting: (Uppdaterar statistik om IPv6-beredskap på servern)
  test_posted: (Statistik om IPv6-beredskap uppdaterades på servern)
  test_postfail: (Uppdatering av statistik misslyckades; informationen ovan är korrekt, men sparades inte.) 
  more_info: "[mer information]"
  readiness_scores: Dina poäng är
  readiness_score: Din poäng är
  readiness_ipv4: för IPv4 stabilitet och beredskap, om både IPv4 och IPv6 används för publicering
  readiness_ipv6: för IPv6 stabilitet och beredskap, om bara IPv6 används för publicering
  click_to_see: Klicka för att se
  test_data: testresultat
  your_faq: Din FAQ
  faq: Vanliga frågor (FAQ)
  loading: laddar...
  failed_to_load: kunde inte ladda
  go_back: "[tillbaka]"
  permalink: "[permalänk]"
  versions: "%app: Du använder version %found; vi rekommenderar %suggest eller nyare."
  ok: ok
  bad: dålig
  slow: långsam
  timeout: timeout
  proxied: genom proxy
  provider: Denna spegelsida tillhandahålls av
checkresults:
  unknown_expansion: okänt värde
  rig_text: "felaktiga testparametrar.  borde vara 9 bokstäver. o/s/b/t for öppen/långsam/dålig/timeout.  behöver en per: a aaaa ds4 ds6 dsmtu ipv4 ipv6 v6mtu v6ns"
  unknown_result_code: okänd resultkod
form:
  solicit: Jag är intresserad av att diskutera dina inställningar med dig, då testet visar att <B>din IPv6-uppsättning är trasig</b>, eller åtminstone inte helt förstådd av oss. Detta är inte normalt, är du villiga att %share?
  share: dela med dig av dina resultat
  retest: testa igen
  confused: Vi förstår inte riktigt dessa resultat.  Vad god tryck på Ladda om en gång i din webbläsaren för att %retest. Om resulten är samma, vad god och %share med mig för att förbättra detta test.
  result_code: Resultatkod
  missing_contact: "OBS: Jag kan inte kontakta dig om du inte anger någon kontaktinformation. Om du verkligen skicka detta anonymt, tryck på Skicka resultat igen"
symptoms:
  browser_blocked: Din webbläsare blockerade
messages:
  "No Direct IP": "Anslutningar mot URL:er med IP-adress ser ut att vara blockerad; kanske av en webbfilter så som 'NoScript' eller 'RequestPolicy' installerat i din webbläsare, eller filtrering gjord av din proxyserver. Detta begränsar en del av funktionaliteten på denna testsida."
  "No Direct IPv4": "IPv4-anslutning via DNS fungerar medan anslutning direkt mot IP-adress fungerar inte."
  "No Direct IPv6": "IPv6-anslutning via DNS fungerar medan anslutning direkt mot IP-adress fungerar inte."
  "6to4": "Du använder 6to4 via en publik 6to4 gateway. 6to4 ger inga garantier och du kan uppleva instabilitet, Fråga din internetleverantör om de kan leverera riktigt IPv6."
  "teredo": "Du använder Teredo, det är en IPv6 över IPv4-tunnel via en publik gateway. Fråga din Internetleveramtör om de kan leverera riktig IPv6 istället."
  "teredo-minimum": "Du använder Teredo och det är en IPv6 över IPv4-tunnel via en publik gateway. Fråga din Internetleveramtör om de kan leverera riktig IPv6 istället."
  "teredo-v4pref": "Du använder Teredo och det är en IPv6 över IPv4-tunnel via en publik gateway. Fråga din Internetleveramtör om de kan leverera riktig IPv6 istället."
  "IPv6 MTU": "Problem! IPv6 fungerar men stora paket stoppas och då får du problem med att nå sidor som aktiverat IPv6. Fråga din Internet eller tunnelleverantör om råd."
  "confused:ASK": "Testresultaten ger inget entydigt svar, prova igen och om problemet uppstår kontakta oss via kontaktformuläret."
#  "ORIGINAL:dualstack:ipv4_preferred": "Gratulerar!  Det ser ut som du har fungerande IPv4 och IPv6.  Om en webbsida publiceras med IPv6 kommer du kunna nå den över IPv6. Observera: Din webbläsare föredrar IPv4 framför IPv6. Detta kan i framtiden påverka sidor som försöker gissa din position."
#  "ORIGINAL:dualstack:ipv6_preferred": "Gratulerar!  Det ser ut som du har fungerande IPv4 och IPv6.  Om en webbsida publiceras med IPv6 kommer du kunna nå den över IPv6. Din webbläsare föredrar IPv6 framför IPv4 (detta är det förväntade resultatet)."
  "dualstack:ipv4_preferred": "-"
  "dualstack:ipv6_preferred": "-"
  "dualstack:slow": "Av okänd anledning går det långsamt när när du använder både IPv4 och IPv6. Gör om testen och om resultatet blir samma fyll i kontaktformuläret med detaljer om din dator och anslutning"
  "ipv4_only": "Du använder IPv4 bara och du kommer inte att kunna nå sidor som bara använder IPv6."
  "ipv4_only:ds_good": "När en sida har både IPv4 och IPv6 använder din webbläsare IPv4 utan problem."
  "ipv4_only:ds_slow": "När en webbsida använder både IPv4 och IPv6 blir din webbläsare långsammare än när du går mot en webbsida med bara IPv4. Du kan uppleva det som att webbsidan med IPv4 och IPv6 är nere och problemet kan bero på din IPv6-uppsättning."
  "ipv4_only:ds_timeout": "När en webbsida använder både IPv4 och IPv6 har du problem att nå den och du tror webbsidan är nere. Detta problem kan bero på problem med din IPv6 så fundera på att inaktivera IPv6 eller ring en kompis om hjälp."
  "ipv4_slow": "Anslutning med IPv4 är långsam men den fungerar. Du kanske har låg bandbredd eller sitter bakom någon adressöversättande utrustning som du inte känner till?."
  "ipv6_only": "Det ser ut som att du bara har IPv6 i din dator och du har ingen IPv4-anslutning mot Internet. Det är en ganske tråkig anslutning!"
  "ipv6_slow": "Din IPv6-ansltuning fungerar men är långsdam. Du kanske använder en IPv6-tunnel som är långsam eller tunnel-endpunkten kanske är långt borta."
  "ipv6_timeout": "Anslutningar mot sidor med bara IPv6 har stor fördröjning. Alla sidor med bara IPv6 upplevs som nere för dig "
  "broken_ipv6": "Anslutningar mot sidor med IPv6 hänger sig och du når dem inte. Det ser ut som att du har IPv6 uppsatt och din dator tror att du har IPv6 men det fungerar inte alls. Alla sidor som aktiverar IPv6 blir onåbara för dig och om du inte kan lösa problemet försök få hjälp alternativt inaktivera IPv6."
  "webfilter:blocked": "Vi kan inte testa din dator. Det ser ut som att en brandvägg eller filter i webbläsaren stoppar oss från att göra testerna. Prova att inaktivera plugins och tillägg ( som reklamstoppare etc. ) till webbläsaren och ladda om sidan. Om problemet kvarstår, lämna gärna en kommentar så kanske vi kan hjälpa dig."
  "webfilter:dsboth": "Vi kan inte testa din dator med både IPv4 och IPv6. Det ser ut som att en brandvägg eller filter i webbläsaren stoppar oss från att göra testerna. Prova att inaktivera plugins och tillägg ( som reklamstoppare etc. ) till webbläsaren och ladda om sidan. Om problemet kvarstår, lämna gärna en kommentar så kanske vi kan hjälpa dig."
  "webfilter:addons": "Din webbläsare blockerar URL'erna för testerna. Vi ska prova alternativa tester men även de kan kan göra fel med att visa din IP-adress och påverka kvaliteten och råden vi ger."
  "webfilter:firefox": "Den mest troliga anledningen är NoScript eller AdBlock+.  NoScript kan tillåta alla script på denna sida. Tillåt URL'erna listade nedan som minsta åtgärd."
  "NAT64": "Gratulerar!  Det ser ut som att du har IPv6.  Notera: Din IPv4-anslutning fungerar endast när du slår upp domännamn via din Internetleverantörs DNS - inte rena numeriska IP-adresser. Din Internetleverantör har förmodligen en tjänst så du kan nå IPv4 via domännamn (NAT64+DNS64). Detta fungerar i de flesta fall."
  "v6ns:ok": "Din DNS (förmodligen hos din Internetleverantör) ser ut att ha IPv6-anslutning."
  "v6ns:bad": "Din DNS (förmodligen hos din Internetleverantör) ser inte ut att ha någon IPv6-anslutning eller är inte uppsatt att använda IPv6. Det kan begränsa dina möjligheter att nå sidor med bara IPv6."
  "ip_timeout:firefox": "Du använder förmodligen plugins till Firefox som begränsar testerna av IPv-adresser. Exampel: RequestPolicy.  Inaktivera de så länga du kör tester på denna sida."
  "confused:obbo": "DNS-frågor på vara IPv6-namn fungerar inte. Någonting är trasigt med DNS-frågorna."
  "apple:dnsbug_aaaa": "DNS-frågor på bara IPv6-namn fungerar inte ändå fungerar anslutningar via IPv6 så det borde ha fungerat.  Apple har en bugg som i sporadiska fall ger detta fel. Du kan ladda om sidan och testa igen.  För mer detaljer se <a href=\"http://openradar.appspot.com/7333104\">http://openradar.appspot.com/7333104</a>."
  "apple:dnsbug_ds": "En DNS-fråga för ett domännamn med både IPv4 och IPv6-namn fungerade inte (minimum borde det fungerar över IPv4).  Apple har en bugg som sporadiskt gör att domänfrågor över IPv6 fallerar. Vi såg antydningar till det i detta test. Du kan ladda om sidan och testa igen.  För mer detaljer se <a href=\"http://openradar.appspot.com/7333104\">http://openradar.appspot.com/7333104</a>."
  "ipv4:no_address": "Ingen IPv4-adress upptäckt"
  "ipv6:no_address": "Ingen IPv6-adress upptäckt "
  "no_address": "Din(a) IP-adress(er) kunda inte detekteras pga. störningar i din webbläsares tillägg."
  "opera": "Webbläsaren Operas har ofta problem med den här sidan. <b>Om du har problem, prova en annan webbläsare</b>."
  "opera:turbo": "<b>Inaktivera turboläga i Opera och försök igen.</b>." 
  "dualstack:safe": "<b>Goda nyheter!</b> Din nuvarande konfiguration kommer fortsätta fungera allteftersom websidor slår på IPv6"
  "dualstack:unsafe": "<b>Våra tester visar att din uppkoppling har IPv6 felaktigt uppsatt, detta kommer ge problem för dig när webbsidor slår på IPv6.</b>"
  "dualstack:mtu": "<b>Våra tester visar att du har MTU-problem med IPv6, detta kan göra att webbsidor laddar långsamt eller inte alls om de också använder IPv6.</b>"
  "buggydns1": " Vi upptäckte en IPv6-adress men din DNS ( Kanske din hemmarouter ) hanterar IPv6 på felsätt och rapporterar det som IPv4."
  "tunnel_dumb": "Det verkar som du använder en tunnelmekanism för antingen IPv4 eller IPv6."
  "tunnel_6rd_dumb": "Det verkar som du använder en hanterad (managed) tunnelmekanism, 6RD, för att transportera IPv6 över IPv4."
  "proxy_via": "Vi detekterade att du använder en proxy.  Detta betyder att det är den som testas och inte din dator. Detaljerad information (som angavs av din proxy i 'Via'-headern): %details"
  "proxy_via_dumb": "Vi detekterade att du använder en proxy.  Detta betyder att det är den som testas och inte din dator."
  "ipv6:nodns": "IPv6 anslutningar fungerar, men anslutningar som använder domännamn använder inte IPv6.  Av någon anledning gör inte din Webbläsare eller ditt operativsystem 'AAAA'-domänuppslagningar."
  "broken": "Vi har tips på hur du kan fixa ditt system."
  "sites": "Eftersom du har IPv6 lägger vi till en flik som visar hur bra du når andra sidor tillgängliga över IPv6.  %sites"
  "avoids_ipv6": "Din webbläsare har en fungerande riktig IPv6-adress - men undviker att använda den.  Vi är oroliga över detta."
  
# These are not just strings, but arrays,
# #1: url
# #2: link text to show (translate this!)
# Between the first and second string, it must be a comma and a space.
# ie:   "key":  ["url", "text"] 
messages_popups:
  "dualstack:safe": ["faq_ipv6launch.html", "Global lansering av IPv6"]
  "dualstack:unsafe":  ["faq_ipv6launch.html", "Global lansering av IPv6"]
  "dualstack:mtu": ["faq_pmtud.html", "faq: MTU"]
  "IPv6 MTU": ["faq_pmtud.html", "faq: MTU"]
  "ipv4:no_address": ["faq_ipv4_only.html", "faq: Ingen IPv4"]
  "ipv6:no_address": ["faq_no_ipv6.html", "faq: Ingen IPv6"]
  "6to4": ["faq_6to4.html", "faq: 6to4"]
  "teredo-minimum": ["faq_teredo_minimum.html", "faq: Teredo Minimum"]
  "v6ns:bad": ["faq_v6ns_bad.html", "faq: v6ns dålig"] 
  "webfilter:blocked":  ["faq_browser_plugins.html", "faq: Webbläsarplugins"]
  "webfilter:dsboth":   ["faq_browser_plugins.html", "faq: Webbläsarplugins"]
  "webfilter:firefox":  ["faq_firefox_plugins.html", "faq: Firefox-tillägg"]
  "webfilter:addons":   ["faq_browser_plugins.html", "faq: Webbläsarplugins"]
  "ip_timeout:firefox": ["faq_firefox_plugins.html", "faq: Firefox-tillägg"]
  "opera": ["faq_opera.html", "faq: Opera"]
  "buggydns1": ["faq_buggydns1.html", "faq: Buggig DNS"]
  "broken": ["broken.html", "faq: Sönder!"]
  "ipv6:nodns": ["faq_broken_aaaa.html", "faq: DNS-uppslagningar sönder"]
  "avoids_ipv6": ["faq_avoids_ipv6.html", "faq: Undviker IPv6?"]
#  "tunnel_dumb": ["faq_tunnel.html", "faq: tunnel"] 
  "tunnel_6rd_dumb": ["faq_tunnel_6rd.html", "faq: 6RD-tunnel"] 
#  "he_tunnel_dumb": ["faq_tunnel_he.html", "faq: HE-tunnel"] 

#
#   HTML
#

html:
  h1: Testa din IPv6-anslutning 
  tabnav_index: Testa IPv6
  tabnav_faq: FAQ
  tabnav_ipv6day: IPv6-dagen
  tabnav_ipv6launch: Global lansering av IPv6
  tabnav_stats: Statistik
  tabnav_changes: Ändringar/Att göra
  summary: Summering
  tests_run: Tester körda
  tech_info: Teknisk information
  share: Dela resultat / Kontakt
  faq_for_you: FAQ relevant för dig
  help_popup: Hjälp-popup
  debug: Avlusning
  click_to_see: Klicka för att se
  mirrors: Spegelsidor
  when: Lokala klockslag
  disclaimer: Det här är en spegelsida av test-ipv6.com. Åsikter uttryckta här kanske inte överensstämmer med ägaren av denna sidan.
  more_detail: "fler detaljer"
  less_detail: "färre detaljer"
  sites: Andra IPv6-sidor



html_header:
  title: Testa din IPv6.
  description: Detta kommer testa din webbläsares och din uppkopplings beredskap för IPv6, och dessutom visa din nuvarande IPv4 och IPv6-adress


html_mail:
  comments_wanted:  <b>Dina inställningar skulle vara intressanta att undersöka.</b> Vi strävar alltid efter att göra test-ipv6.com:s kod bättre.  Är du villiga att bidra med mer information om din browser och dators inställnigar? Med din hjälp kan vi dokumentera hur andra ska fixa sina system.
  comments_unwanted: I detta formulär kan du lämna kommentarer, ge synpunkter eller ställa frågor. Dina testresultat kommer inkluderas automatiskt.  
  comments_faq: <span id="comments_faq_link"></span> en FAQ-sida är tillgänglig för exakt <b>dina</b> resultat. Var vänligt läs den innan du lämnar kommentarer; många frågor har redan besvarats där. Om du fortfarande har frågor, kommentarer eller synpunkter är du välkommen att använda detta formulär.
  comments_delayed: "<b>Det kommer kanske blir en väntetid på svar</b>, på grund av nyligen publicerat pressmeddelande om <a href=\"http://www.internetsociety.org/worldipv6day\">World IPv6 Day</a>."
  limit_info: Om du rapporerar ett problem med något test, eller vill ha hjälp med dina resultat, var god fyll i all begärd information efter bästa förmåga. Om du lämnar allmänna kommentarer, använd ditt omdöme för att avgöra hur mycket information att inkludera. 
  thanks: Tack,
  form_purpose: Syfte med kommentar
  form_pickone: (Välj en)
  form_questions: Frågor om testresultat
  form_bug: Buggrapport med diagnos
  form_suggestion: Förslag
  form_cheersjeers: Ris eller Ros
  form_email: E-postadress om du ger tillåter mig att kontata dig. <i>Krävs, om du vill ha svar.</i>
  form_submit: Skicka resultat
  help_anyinfo: All typ av information som du tror är användbar (vilken router du använder, brandväggar i vägen, typ av proxy du använder etc.). Detta inkluderar allmän återkoppling.
  help_plugins: Det javascript-baserade testet verkar ha misslyckats. Detta kan ha att göra med plugins eller tillägg i din webbläsare. Var god ange vilka plugins och tillägg du använder.
  help_generic: "Om du är tekniskt kompetent, var god kopiera och klistra in resultatet av följande kommandon:"
  help_windows: "Om du är tekniskt kompetent, öppna en \"kommandoprompt\" eller \"cmd\"-fönster, och kör dessa kommandon:"
  help_output:  Klistra in resultatet av dessa kommandon i rutan nedan. Detta hjälper mig bekräfta/avfärda olika teorier om din fråga.
  comments_english: "Om möjligt, lämna ditt svar på engelska."

html_tech:
  how_this_works: "Hur detta testet fungerar:"
  how_general: Din webbläsare kommer bli instruerad att försöka nå ett antal URLer. Kombinationen av vad som lyckas och misslyckas berättar vad som kommer att hända för dig när IPv6 börjar användas för publicering.
  pending: ej klart
  detail_a:  Hämtar ett objekt som bara har DNS-post A. Detta förväntas använda IPv4. Användare som bara har IPv6 kan möjligen fortfarande nå detta, om deras leverantör har NAT64/DNS64 eller en proxy.
  detail_aaaa: Hämtar ett objekt som bara har DNS-post AAAA. Detta förväntas använda IPv6. Användare som inte ännu har internetaccess via IPv6 kommer antagligen se detta misslyckas. Om detta fallerar snabbt är det OK - än så länge.
  detail_v6ns: Detta testar den rekursiva resolver du använder (ej ett test av din dator). Om detta test lyckas klarar den DNS-server du använder (oftast din internetleverantörs), att nå auktoritära DNS-serar som endast pratar IPv6. Detta är inte kritiskt (just nu) för att nå sidor via IPv6.
  detail_ds: Detta är det viktigaste testet. Detta verifierar att din webbläsare kan nå sidor som har DNS-poster för både IPv4 och IPv6. Datorer som bara har IPv4 bör klara av att ansluta korrekt (via IPv4).
  detail_ds_warning: Om detta test misslyckas eller får timeout, kommer du får stora problem när IPv6 börjar användas för publicering.
  detail_ipv4: Detta test försöker ansluta via en numerisk IPv4-adress. Detta borde fungera för de flesta, om de inte endast använder IPv6. Om det första testet fungerar, men detta misslyckas, använder din leverantör antagligen NAT64/DNS64; du behöver försöka ansluta via domännamn istället för numeriska IPv4-adresser.
  detail_ipv6:  Detta kommer försöka ansluta via en hexadecimal IPv6-adress. Det primära syftet med detta testet är att separera din förmåga att ansluta via IPv6 och din DNS förmåga att hämta IPv6-poster. Ett sekundärt syfte är att se om du har Teredo påslaget; vissa system använder endast Teredo om det förekommer en IPv6-adress i en URL.
  detail_v6mtu: Verifierar att stora IPv6-paket fungerar. Om detta test får timout, men andra är ok, tyder på att det finns problem PMTUD; eventuellt har det att göra med IP-tunnlar.  
  detail_dsmtu: Verifierar att du kan koppla upp dig mot en Dual Stack server (som Dual Stack-testet); och att du kan skicka och ta emot stora paket på den uppkopplingen.  Om detta testet ger timeout indikerar det problem för dig på World IPv6 Day.
  summary1: Om resultatsummeringen indikerar problem, kan du (eller din support) använda informationen ovan för att diagnostisera problemet. Alla testlänkar och deras resultat visas på vänster sida. På höger sida visas en beskrivning av vad länken ska testa.
  summary2: Efter varje test gått klart försöker summeringssidan läsa resultatet. Om summeringen inte verkar vettig med symtomen ovan, eller om du behöver mer hjälp, är du välkommen att kontakta oss.
  bonus: (Detta är överkurs)
  detail_buggydns1: Frågar efter en felformaterat DNS-post av typ AAAA. Vissa routrar hanterar felaktigt dessa som poster av typ A, och använder endast de första 32 bitarna. Vi vill att detta testet misslyckas.
  detail_asn4: Försöker identifiera vilken Internetleverantör du använder för IPv4.  Namnet kan skilja sig från det som leverantören marknadsförs under lokalt, eller kan vara ett tidigare företagsnamn.  Namnet reflekterar hur leverantören identifieras i nätverksoperatörskretsar.
  detail_asn6: Försöker identifiera vilken Internetleverantör du använder för IPv6.  Om namnet för IPv4- och IPv6-leverantören inte stämmer överens, tyder det på att du använder en tunnel eller någon form av tredjepartsleverantör för IPv6.

html_tests:
  test_a: Test med DNS-post för IPv4
  test_aaaa: Test med DNS-post för IPv6
  test_ds: Test med DNS-poster för Dual Stack
  test_v6ns: Test om din ISPs DNS-server använder IPv6
  test_ipv4: Test med IPv4 utan DNS
  test_ipv6: Test med IPv6 utan DNS
  test_v6mtu: Test för stora IPv6-paket
  test_buggydns1: Test för buggig DNS
  test_dsmtu: Test med DNS-poster för Dual Stack och stora paket
  test_asn4: Hitta leverantör av IPv4
  test_asn6: Hitta leverantör av IPv6
  bonus: (Detta är överkurs)

