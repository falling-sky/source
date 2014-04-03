[% PROCESS "header.inc"  %]
[% PROCESS "list-nav.inc" page = "faq" %]

<div id="content">


  <h1 id="title">test-ipv6.se FAQ</h1>

  <div class="question">
    Q: Vad är dual-stack?
  </div>

  <div class="answer">
    Dual-stack är när du har både IPv4 och IPv6 aktiverat
  </div>

  <div class="question">
    Q: Hur fungerar testet?
  </div>

  <div class="answer">
    Testet körs enbart på klienten med hjälp av javascript. En rad av AJAX förfrågningar som använder olika
    DNS namn som kräver IPv6 eller dual stack körs från web-servern. Sedan används resultatet om dessa förfrågningar
    lyckades eller inte, samt hur lång tid de tog i beräkningen.
  </div>

  <div class="question">
    Q: Varför kan man endast komma åt denna sida med IPv4?
  </div>

  <div class="answer">
    Du har rätt, det finns avsiktligen inga AAAA records. En del av användarna kan inte besöka sidor som
    har dual-stack. Om en användare inte kan ansluta så kan de inte heller använda sidan för att kolla om de
    har något problem. 
  </div>

  <div class="answer">
    Någon gång när antalet "trasiga" användare minskar kraftigt ska jag överväga att göra test-ipv6.se dual-stack.
    Senaste mätningen, maj 2013, ser vi fortfarande 0,5% trasighet för besök till test-ipv6.com.
    Och vi vill fortfarande förstå deras situation.
  </div>

  <div class="question">
    Q: Hur testar jag min IPv6-only host?
  </div>

  <div class="answer">
    Om du frågar den frågan så behöver du troligvis inte den här sidan. Fast om du verkligen vill göra detta, gå in på
  <a href="http://ipv6.test-ipv6.com">http://ipv6.test-ipv6.com</a> med din IPv6-only host.
  </div>

  <div class="question">
    Q: Vad menar du med trasiga?
  </div>

  <div class="answer">
    Ganska många datorer har IPv6 aktiverat idag men använder en publik tunnel med dålig prestanda, kvalitet eller
    så går trafiken långa omvägar för att nå sin destination. Normalt sett ska datorer som försöker nå webbsidor 
    med både IPv4 och IPv6 aktiverat använda IPv4 men ibland används IPv6 istället och då kan de ta över en minut
    innan webbläsaren går över till IPv4. Vid sådana fall väljer användaren oftast att avbryta och gå till en annan 
    sida istället.
  </div>

  <!-- <div class="answer">
    From the perspective of a user with these conditions, a web site offering both A and AAAA DNS records (ie, "dual
    stack") will appear to time out; and the user will move on to another site that offers a similar product. This is
    the quandary content providers have.
  </div> -->
  <div class="answer">
    Om vi detekterar att du kommer ha problem att nå sidor med både IPv4 och IPv6,
    rekommenderar vi att du läser <a href="broken.html">FAQ för trasiga användare</a>.
    Den ger steg för att identifiera felorsaken, eller om det misslyckas,
    instruktioner hur du kan stänga av IPv6 tills din internetleverantör ger dig riktig IPv6.
  </div>

  <div class="question">
    Q: Varför säger din statistik att du redan har användare som bara använder IPv6?
  </div>

  <div class="answer">
    Den har använt <a href="http://ipv6.test-ipv6.com">http://ipv6.test-ipv6.com</a> .
  </div>

  <div class="question">
    Q: Hur tillförlitlig är din statistik?
  </div>

  <div class="answer">
    Den representerar inte en medel-användare av webben. Besök till sidan är självvalda.
    Syftet med denna sida är inte att skapa statistik, utan att informera användare om hur
    redo de är för övergången till IPv6.
    Därför kommer statistiken vara helt annorlunda mot en normal innehållsleverantör.
  </div>

  <div class="question">
    Q: Hur skiljer sig testerna i jämförelse med innehållsleverantörernas?
  </div>

  <div class="answer">
    Innehållsleverantörer samlar statistik från trasiga vs icke-trasiga användare i en samlad form. De ger inte
    användaren någon kritik/hjälp. Dessa resultat kommer i princip göra så att frågan kommer stå emellan att stanna med
    IPv4-only istället för när man ska börja starta sidor över IPv6. IPv4-only för vissa sidor är verkligen ett alternativ,
    det har dock en väldig massa nackdelar, men förväntningarna är att alla kommer alltid kunna nå IPv4 på nåt sätt.
  </div>

  <div class="answer">
    Denns sida är till för att hjälpa användaren att förstå deras nuvarande status och vad den statusen betyder
    för dem.
  </div>

  <div class="question">
    Q: Din sida visar fel IP-adress, hur kan jag komma förbi min proxy-server för att se min publika adress?
  </div>

  <div class="answer">
    För IPv4/IPv6/dual-stack, använd någon av dessa:

    <p><code>telnet ipv4.test-ipv6.com 79</code> för ipv4<br />
    <code>telnet ipv6.test-ipv6.com 79</code> för ipv6<br />
    <code>telnet ds.test-ipv6.com 79</code> för båda</p>

    <p>Notera att det _kanske_ är nödvändigt att ge andra inställningar till ditt telnet-kommando, beroende på operativsystem.
    Till exempel för min mac, behöver jag använda "<code>telnet -6</code>".</p>
  </div>

  <div class="question">
    Q: Läser du verkligen responsen?
  </div>

  <div class="answer">
  <p>Ja det gör jag. Observera att jag endast kan besvara dina frågor om du lämnar dina kontaktuppgifter.
    Även om du inte gör det är jag fortfarande tacksam!</p>
  </div>

  <!-- <div class="question">
    Q: How else can I contact you?
  </div>

  <div class="answer">
    I would prefer you use the form, as it gives details of your connectivity, and bypasses any mail delays (including
    the graylisting on my side). That said, you are welcome to directly email or jabber <a href="mailto:jfesler@test-ipv6.com">jfesler@test-ipv6.com</a>. On FreeNode, I'm simply "jfesler".
  </div> -->

  <div class="question">
    Q: Är det här open-source?
  </div>

  <div class="answer">
    Ja. Se <a href="source.html">source page</a> för detaljer.
  </div>

</div>

[% PROCESS "footer.inc" %]
