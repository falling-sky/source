# YAML format.  UTF8.  English provides a default for all messages.
# Other langauge files are able to replace english messages.
# "%1" and such may be used as placeholders in some of the strings.
# If you don't know YAML:  indentation matters; follow the examples.

#
#  JAVASCRIPT
#

builtin:
  v4is: Uw IPv4 adres op het publieke Internet is (waarschijnlijk)
  v6is: Uw Ipv6 adres op het publieke Internet is (waarschijnlijk)
  v6service: Uw IPv6 service is vermoedelijk
  started: Gestart
  using: gebruik makend van
  test_rigged: (Opslaan van statistieken overgeslagen, test was beïnvloed)
  test_posting: (Bezig met opslaan van statistieken op de server)
  test_posted: (Statistieken opgeslagen op de server)
  test_postfail: (Opslaan van survey resultaten mislukt; bovenstaande informatie is correct maar niet weggeschreven.)
  more_info: "[meer info]"
  readiness_scores: Uw score
  readiness_score: Uw score
  readiness_ipv4: voor je IPv4 stabiliteit en gereedheid als websites op zowel IPv4 als IPv6 bereikbaar zijn.
  readiness_ipv6: voor je IPv6 stabiliteit en gereedheid als websites enkel op IPv6 bereikbaar zijn.
  click_to_see: bekijk
  test_data: test data
  your_faq: Uw FAQ
  faq: Veelgestelde vragen
  loading: laden...
  failed_to_load: Laden mislukt
  go_back: "[ga terug]"
  permalink: "[permalink]"
  versions: "%app: U draait versie %found; wij bevelen %suggest of nieuwer aan."
  ok: goed
  bad: slecht
  slow: traag
  timeout: timeout
checkresults:
  unknown_expansion: onbekende expansie
  rig_text: "Foute test parameter, zou 9 karakters moeten zijn. o/s/b/t voor open/slow/bad/timeout.  Een nodig per: a aaaa ds4 ds6 dsmtu ipv4 ipv6 v6mtu v6ns"
  unknown_result_code: onbekende resultaatcode
form:
  solicit: We zouden graag de inrichting van uw netwerk willen bespreken, omdat vastgesteld is dat <B>uw IPv6 verbinding defect is</B>, of minimaal niet goed getest wordt. Dit is niet normaal, zou u uw resultaten willen %share?
  share: delen
  retest: test nogmaals
  confused: We begrijpen de resultaten van uw test niet goed. Herlaad aub deze pagina en %retest. Als de resultaten hetzelfde zijn, wilt u deze dan %share zodat we de test kunnen verbeteren?
  result_code: Resultaat code
  missing_contact: "Let op: we kunnen geen contact met u opnemen als u geen emailadres invult. Als u zeker weet dat u dit bericht anoniem achter wilt laten moet u het formulier nogmaals verzenden."
symptoms:
  browser_blocked: Uw browser blokkeert
messages:
  "No Direct IP": "verbindingen naar URLs met IP-adressen lijken geblokkeerd te worden, misschien door een webfilter als 'NoScript' of 'RequestPolicy' in uw browser, of door filtering in uw proxyserver. Dit beperkt een deel van de functionaliteit van deze test site."
  "No Direct IPv4": "IPv4 verbindingen gebruik makend van DNS werken, maar verbindingen direct naar IP-adressen in URL's werken niet. Deze worden tegenwoordig zelden gebruikt op het Internet."
  "No Direct IPv6": "IPv6 verbindingen gebruik makend van DNS werken, maar verbindingen direct naar IP-adressen in URL's werken niet. Deze worden tegenwoordig zelden gebruikt op het Internet."
  "6to4": "Het lijkt erop dat u een publieke 6to4 gateway gebruikt. Het is mogelijk dat uw router dit automatisch doet. Dergelijke gateways hebben geen service level agreements, u kunt daardoor problemen met de beschikbaarheid en kwaliteit. Native IPv6 via uw ISP werkt beter."
  "teredo": "Het lijkt erop dat u voor uw IPv6-verbinding gebruik maakt van Teredo, een IPv4/IPv6 gateway. Op dit moment kunt u alleen direct op IP verbinden, uw browser kan websites niet op naam via IPv6 benaderen. Dit houdt in dat uw huidige configuratie niet bruikbaar is om IPv6 websites te browsen."
  "teredo-minimum": "Het lijkt erop dat u voor uw IPv6-verbinding gebruik maakt van Teredo, een IPv4/IP6 gateway. Op dit moment kunt u alleen direct op IP verbinden, uw browser kan websites niet op naam via IPv6 benaderen. Dit houdt in dat uw huidige configuratie niet bruikbaar is om IPv6 websites te browsen."
  "teredo-v4pref": "Het lijkt erop dat u voor uw IPv6-verbiding gebruik maakt van Teredo, een IPv4/IPv6 gateway. Uw specifieke Teredo-configuratie is gebruikt als 'protocol of last resort': als u een site bezoekt die zowel IPv4 als IPv6 ondersteunt, krijgt IPv4 de voorkeur."
  "IPv6 MTU": "LET OP! IPv6 werkt een beetje, maar grote pakketten lijken niet aan te komen, waardoor websites stuk kunnen lijken te zijn als deze IPv6 gebruiken. Vraag uw ISP over MTU problemen, mogelijk gerelateerd aan uw tunnel."
  "confused:ASK": "Op basis van de tests kunnen wij geen zekere uitspraken doen, ze zijn niet overeenkomstig onze verwachtingen. Voer de test aub nogmaals uit, en vul het contactformulier in als deze dezelfde resultaten oplevert."
#  "ORIGINAL:dualstack:ipv4_preferred": "Gefeliciteerd! U lijkt een werkende IPv4- en IPv6-verbinding te hebben. Als een website via IPv6 bereikbaar is, zal uw webbrowser via IPv6 verbinden. Let op: uw browser lijkt IPv4 de voorkeur te geven boven IPv6 als beiden mogelijk zijn. Dit zou in de toekomst invloed kunnen hebben op de correctheid van websites die uw locatie proberen te gokken."
#  "ORIGINAL:dualstack:ipv6_preferred": "Gefeliciteerd! U lijkt een werkende IPv4- en IPv6-verbinding te hebben. Als een website via IPv6 bereikbaar is, zal uw webbrowser via IPv6 verbinden. Uw webbrowser geeft de voorkeur aan IPv6 boven IPv4 als beiden mogelijk zijn (dit is zoals het hoort)."
  "dualstack:ipv4_preferred": "-"
  "dualstack:ipv6_preferred": "-"
  "dualstack:slow": "Om onduidelijke redenen lijkt uw browser langzaam te werken als deze zelf mag kiezen tussen IPv4 en IPv6. Voer aub de test nogmaals uit en vul het contactformulier in als hier dezelfde resultaten uit komen."
  "ipv4_only": "U lijkt alleen toegang te hebben tot het IPv4-deel van het Internet. U kunt geen IPv6-only websites benaderen."
  "ipv4_only:ds_good": "Als een website via zowel IPv4 als IPv6 beschikbaar is, kiest uw webbrowser IPv4 zonder vertraging."
  "ipv4_only:ds_slow": "Als een website via zowel IPv4 als IPv6 beschikbaar is, lijkt uw webbrowser langzaam te verbinden, vergeleken met een IPv4-only website. U zou hierdoor kunnen denken dat de betreffende website stuk is. Dit probleem kan door configuratiefouten veroorzaakt zijn."
  "ipv4_only:ds_timeout": "Als een website via zowel IPv4 als IPv6 beschikbaar is, geeft uw browser een timeout bij het verbinden. U zou hierdoor kunnen denken dat de betreffende website stuk is. Overweeg om IPv6 uit te schakelen of om ondersteuning te vragen."
  "ipv4_slow": "Verbindingen via IPv4 zijn traag maar werken. Misschien dat u uw of ISP achter een langzaam NAT-apparaat zit."
  "ipv6_only": "Het lijkt erop dat u alleen het IPv6-Internet kunt benaderen. U heeft geen toegang tot IPv4. Dat is vrij gedurfd!"
  "ipv6_slow": "Verbindingen via IPv6 zijn langzaam maar werken. Misschien gebruikt u een publieke IPv6 tunnel die langzaam of ver van u verwijderd is."
  "ipv6_timeout": "Verbindingen naar websites met alleen IPv6 geven een timeout. Alle websites met alleen IPv6 zullen daarom stuk lijken voor u."
  "broken_ipv6": "Verbindingen naar websites die IPv6 ondersteunen blijven hangen. Iedere website die beschikbaar wordt via IPv6 lijkt voor u onbereikbaar. Zoek ondersteuning als u uw IPv6 routering of verbinding niet kunt corrigeren. Overweeg om IPv6 uit te zetten op uw machine als dit allemaal niet lukt."
  "webfilter:blocked": "We kunnen uw systeem niet testen, het lijkt erop dat u een firewall of browser filter hebt die de tests blokkeren. Noodzakelijke tests mislukken. Probeer om browser plugins, extensies en add-ons (zoals ad blockers) uit te schakelen en de pagina te herladen. Als de test dan nog mislukt kunt u een verzoek om hulp achterlaten."
  "webfilter:dsboth": "We kunnen uw systeem niet testen, het lijkt erop dat u een firewall of browser filter hebt die de tests blokkeren. De dual-stack tests mislukken. Probeer om browser plugins, extensies en add-ons (zoals ad blockers) uit te schakelen en de pagina te herladen. Als de test dan nog mislukt kunt u een verzoek om hulp achterlaten."
  "webfilter:addons": "Uw browser blokkeert de test URL's. We zullen alternatieve testmethodes proberen, maar deze kunnen mogelijk uw IP-adres niet tonen en kunnen de kwaliteit van het gegeven advies beinvloeden."
  "webfilter:firefox": "De meest waarschijnlijke oorzaak is NoScript of Adblock+. NoScript kan verteld worden om alle scripts op deze pagina toe te staan (het is mogelijk dat u dit meer dan eens moet aangeven). Laat minimaal de hieronder genoemde URL's toe."
  "NAT64": "Gefeliciteerd! U lijkt IPv6 te hebben. Let op: uw IPv6 toegang is beperkt tot verbindingen op naam via de DNS server van uw ISP, niet op IP-adres. Uw ISP heeft waarschijnlijk een appaaraat om IPv4 sites op naam te benaderen (NAT64+DNS64). Deze oplossing werkt meestal."
  "v6ns:ok": "Uw DNS server (waarschijnlijk beheerd door uw ISP) lijkt werkende IPv6 internettoegang te hebben."
  "v6ns:bad": "Uw DNS server (mogelijk beheerd door uw ISP) lijkt geen toegang tot het IPv6-Internet te hebben, of is zo geconfigureerd dat daar geen gebruik gemaakt van wordt. Dit kan in de toekomst uw bereikbaarheid naar IPv6-only websites beperken."
  "ip_timeout:firefox": "U gebruikt waarschijnlijk een FireFox plugin als RequestPolicy die ervoor zorgt dat IP-tests mislukken. Zet deze plugin aub uit als u deze site bezoekt."
  "confused:obbo": "Een opzoeking voor een IPv6-only naam is mislukt, terwijl er wel een verbinding via IPv6 gemaakt kon worden. Er lijkt iets mis te zijn met DNS opzoekingen."
  "apple:dnsbug_aaaa": "Het opzoeken van een IPv6-only naam is mislukt, terwijl de opzoeking en verbinding voor dual-stack via IPv6 verbond. Deze IPv6-only opzoeking zou hebben moeten lukken. Apple heeft een bug die in sporadische gevallen IPv6 opzoekingen laat mislukken. We hebben dit bij deze test eerder gezien. U kunt proberen de pagina te herladen en de test opnieuw uit te voeren. Voor meer details kunt u kijken op <a href=\"http://openradar.appspot.com/7333104\">http://openradar.appspot.com/7333104</a>."
  "apple:dnsbug_ds": "Het opzoeken van een dualstack IPv4 en IPv6 naam is mislukt (minimaal zou het via IPv4 gelukt moeten zijn). Apple heeft een bug die in sporadische gevallen IPv6 opzoekingen laat mislukken. We hebben dit bij deze test eerder gezien. U kunt proberen de pagina te herladen en de test opnieuw uit te voeren. Voor meer details kunt u kijken op <a href=\"http://openradar.appspot.com/7333104\">http://openradar.appspot.com/7333104</a>."
  "ipv4:no_address": "Geen IPv4 adres gedetecteerd"
  "ipv6:no_address": "Geen IPv6 adres gedetecteerd"
  "no_address": "Uw IP-adres(sen) kon(den) niet gedetecteerd worden vanwege verstoring door browser add-ons."
  "opera": "De Opera webbrowser heeft regelmatig problemen met deze website. <b>Als u problemen blijft houden, probeer dan te testen met een andere webbrowser.</b>"
  "opera:turbo": "<b>Schakel 'turbo mode' in Opera uit en probeer het nogmaals.</b>  Turbo mode werkt niet in combinatie met deze website." 
  "dualstack:safe": "De <a href=\"ipv6launch.html\">World IPv6 Launch</a> dag is 6 juni 2012. <b>Goed nieuws!</b> We verwachten geen problemen met deze browser op deze lokatie en met deze verbinding na de Launch."
  "dualstack:unsafe": "De <a href=\"ipv6launch.html\">World IPv6 Launch</a> dag is 6 juni 2012.  <b>Onze tests tonen aan dat u een kapotte of foutief geconfigureerde IPv6 setup heeft en dat u problemen kunt verwachten als websites via IPv6 bereikbaar gemaakt worden.</b>"
  "dualstack:mtu": "De <a href=\"ipv6launch.html\">World IPv6 Launch</a> dag is 6 juni 2012.  <b>Onze tests tonen aan dat u MTU problemen kunt ondervinden met IPv6. Dit kan ertoe leiden dat websites langzaam of helemaal niet laden als deze IPv6 aanzetten.</b>"
  "buggydns1": "We hebben een IPv6-adres opgevraagd, maar uw DNS-server (mogelijk uw thuisrouter) heeft het antwoord veranderd en behandeld als een kapotte IPv4."
  "proxy_via": "We hebben gedetecteerd dat u een proxyserver gebruikt. Dit betekent dat we de proxyserver testen en niet uw computer. Proxy details (gerapporteerd door uw proxy door middel van de 'Via' header): %details"
  "proxy_via_dumb": "We hebben gedetecteerd dat u een proxyserver gebruikt. Dit betekent dat we de proxyserver testen en niet uw computer."
  "ipv6:nodns": "IPv6 verbindingen werken maar verbindingen op basis van DNS namen gebruiken geen IPv6. Om een of andere reden voert uw browser of OS geen IPv6 DNS 'AAAA' opzoekingen uit."
  "broken": "We hebben suggesties om u te helpen uw systeem te repareren."
  "sites": "Aangezien u een werkende IPv6-verbinding heeft hebben wij een tabblad toegevoegd met informatie over hoe goed u andere IPv6-sites kunt bereiken.  %sites"
  "avoids_ipv6": "Uw browser heeft goed werkende IPv6 maar weigert dit te gebruiken. Dit baart ons zorgen."

# These are not just strings, but arrays,
# #1: url
# #2: link text to show (translate this!)
# Between the first and second string, it must be a comma and a space.
# ie:   "key":  ["url", "text"] 
messages_popups:
  "dualstack:safe": ["faq_ipv6launch.html", "World IPv6 Launch"]
  "dualstack:unsafe":  ["faq_ipv6launch.html", "World IPv6 Launch"]
  "dualstack:mtu": ["faq_pmtud.html", "faq: MTU"]
  "IPv6 MTU": ["faq_pmtud.html", "faq: MTU"]
  "ipv4:no_address": ["faq_ipv4_only.html", "faq: Geen IPv4"]
  "ipv6:no_address": ["faq_no_ipv6.html", "faq: Geen IPv6"]
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
  "broken": ["broken.html", "faq: Defect!"]
  "ipv6:nodns": ["faq_broken_aaaa.html", "faq: Defecte DNS Opzoekingen"]
  "avoids_ipv6": ["faq_avoids_ipv6.html", "faq: IPv6 Omzeilen?"]

#
#   HTML
#

html:
  h1: Test uw IPv6 verbinding.
  tabnav_index: Test IPv6
  tabnav_faq: FAQ
  tabnav_ipv6day: IPv6 Dag
  tabnav_ipv6launch: World IPv6 Launch
  tabnav_stats: Statistieken
  tabnav_changes: Wijzigingen/ToDo
  summary: Samenvatting
  tests_run: Uitgevoerde tests
  tech_info: Technische Info
  share: Deel resultaten / Contact
  faq_for_you: FAQ voor u
  help_popup: Help Popup
  debug: Debug
  click_to_see: Bekijk
  mirrors: Mirrors
  when: Lokale Tijden
  disclaimer: dit is een mirror van test-ipv6.com. Uitspraken op deze website kunnen maar hoeven niet overeen te komen met de mening van de eigenaar van de mirror.
  more_detail: "meer details"
  less_detail: "minder details"	
  sites: "Andere IPv6 sites"




html_header:
  title: Test uw IPv6.
  description: Deze pagina test uw browser en verbinding op gereedheid voor IPv6 en toont u tevens uw huidige IPv4 en IPv6 adres.


html_mail:
  comments_wanted:  <b>Uw specifieke configuratie is interessant.</b> Wij doen ons best om de code achter deze website te verbeteren. Bent u bereid om meer informatie over uw browser en computerinstellingen te delen? Met uw hulp kunnen we voor anderen documenteren hoe ze hun systemen kunnen corrigeren.
  comments_unwanted: Met behulp van dit formulier kunt u commentaar achterlaten, uw bezorgdheid uitspreken en vragen stellen. Uw testresultaten worden automatisch bijgevoegd.
  comments_faq: <span id="comments_faq_link"></span>(FAQ) pagina is beschikbaar voor <b>uw</b> specifieke set uitslagen.  Lees deze aub door voor u commentaar achterlaat, veel vragen zijn al beantwoord. Als u nog steeds vragen of bezorgdheid hebt, gebruik dan dit formulier.
  comments_delayed: "<b>Een antwoord kan iets langer duren </b>, vanwege het recente persbericht over   <a href=\"http://www.internetsociety.org/worldipv6day\">World IPv6 Day</a>."
  limit_info: Als u een probleem met de test rapporteert of hulp bij uw resultaten vraagt, vul dan aub alle gevraagde informatie in. Als u algemeen commentaar levert, probeer dan in te schatten hoeveel informatie u aanlevert.
  thanks: Bedankt,
  form_purpose: Doel van dit commentaar
  form_pickone: (Kies een)
  form_questions: Vragen over testresultaten
  form_bug: Meld een foute diagnose
  form_suggestion: Suggesties
  form_cheersjeers: Klachten en aanmoedigingen
  form_email: Emailadres indien u toestaat dat we contact opnemen.  <i>Noodzakelijk indien u een antwoord wilt.</i>
  form_submit: Verstuur resultaten
  help_anyinfo: Alle informatie waarvan u denkt dat nuttig is (welk type router u gebruikt, of er een firewall aanwezig is, of u een proxy gebruikt, etc). Ook algemeen commentaar valt hieronder.
  help_plugins: De op javascript gebaseerde test lijkt mislukt te zijn. Dit kan gerelateerd zijn aan browser plugins of extensies. Geef aub aan welke browser plugins en extensies u ingeschakeld heeft in uw browser.
  help_generic: "Als u technisch onderlegd bent kunt u hier de uitvoer van de volgende commando's plakken:"
  help_windows: "Wilt u als u technisch onderlegd bent een \"Command Prompt\" of \"cmd\" venster openen en de volgende drie commando's uitvoeren:"
  help_output:  Kopieer de uitvoer van de volgende commando's in onderstaand veld. Dit helpt ons om theorie&euml;n omtrent uw vragen te bevestigen of ontkrachten.
  comments_english: "Laat uw commentaar achter in het Engels indien mogelijk."

html_tech:
  how_this_works: "Hoe deze test werkt:"
  how_general: Uw browser probeert om een aantal URL's te benaderen. De combinatie van gelukte en mislukte pogingen vertelt hoe gereed u bent voor het moment dat websites via IPv6 beschikbaar zijn.
  pending: in afwachting
  detail_a:  Benader een object met slechts een A record in DNS. Hierbij wordt naar verwachting gebruik gemaakt van IPv4. Gebruikers met alleen IPv6 kunnen dit record mogelijk bereiken als hun ISP een NAT64/DNS64 of proxy aanbiedt.
  detail_aaaa: Benader een object met slechts een AAAA record in DNS. Hierbij wordt naar verwachting gebruik gemaakt van IPv6. Gebruikers zonder IPv6 zullen deze test naar verwachting zien mislukken. Zo lang als deze test binnen korte tijd mislukt is alles -voor nu- in orde.
  detail_v6ns: Dit is een test van de DNS resolver van uw ISP (in plaats van een test van uw machine). Indien deze test lukt, is uw DNS server (vaak beheerd door uw ISP) in staat om een authoritatieve DNS-server met alleen IPv6 te benaderen. Dit is -voor nu- niet kritiek om websites via IPv6 te benaderen.
  detail_ds: Dit is de belangrijkste test. Deze test controleert of uw browser kan verbinden met een website die zowel IPv4 als IPv6 DNS records aanbiedt. Machines met alleen IPv4 zouden zonder problemen (via IPv4) moeten kunnen verbinden.
  detail_ds_warning: Als deze test mislukt of een timeout geeft kunt u grote problemen verwachten als websites via IPv6 beschikbaar gemaakt worden.
  detail_ipv4: Deze test zal proberen een IPv4-adres direct te benaderen. Deze succes zal slagen voor iedereen, tenzij ze alleen IPv6 gebruiken. Als de eerste test slaagt maar deze mislukt is het waarschijnlijk dat uw provider NAT64/DNS64 gebruikt en moet u proberen alleen te verbinden op hostnamen en niet op IP-adressen.
  detail_ipv6:  Deze test zal proberen een IPv6-adres direct te benaderen. Het belangrijkste doel van deze test is om te bepalen of uw mogelijkheid om via IPv6 te verbinden onafhankelijk is van de mogelijkheid om DNS ervoor op te vragen. Een tweede doel is om te zien of Teredo gebruikt wordt, sommige systemen gebruiken Teredo alleen als er een IPv6-adres in het URL staat.
  detail_v6mtu: Deze test controleert of IPv6 requests met grote pakketten werken. Als deze test een timeout geeft maar andere testen werken duidt dit erop dat er PMTUD problemen zijn, mogelijk veroorzaakt door IP tunnels.
  detail_dsmtu: Deze test controleert of u een dual-stack server kan benaderen en dat u grote pakketten kan verzenden en ontvangen over die verbinding. Indien deze test mislukt, geeft dat problemen aan voor World IPv6 Day.
  summary1: Als de samenvatting aangeeft dat er problemen zijn kunt u (of uw technische ondersteuning) met behulp van de bovenstaande informatie de problemen analyseren. Alle test-URL's en de bijbehorende resultaten zijn aan de linkerzijde te zien. Aan de rechterzijde is beschreven welke test met het URL uitgevoerd wordt.
  summary2: Nadat iedere test uitgevoerd is. De samenvattingspagina probeert de testresultaten te analyseren. Als de uitkomst niet logisch is op basis van de bovenstaande symptomen of als u verdere ondersteuning wilt, neem dan contact op.
  bonus: (Extra test)
  detail_buggydns1: Deze test doet verzoeken voor een fout AAAA record. Sommige routers behandelen deze als "A" records en bewaren alleen de eerste 32 bits. We verwachten dat deze test geen verbinding kan maken.

html_tests:
  test_a: Test met een IPv4 DNS record    
  test_aaaa: Test met een IPv6 DNS record
  test_ds: Test met een Dual Stack DNS record
  test_v6ns: Test of uw ISP's DNS server IPv6 gebruikt
  test_ipv4: Test IPv4 zonder DNS
  test_ipv6: Test IPv6 zonder DNS
  test_v6mtu: Test IPv6 met grote pakketten
  test_buggydns1: Test voor kapotte DNS
  test_dsmtu: Test met een Dual Stack DNS en grote pakketten
  bonus: (Dit is bonus credit)

