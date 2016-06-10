//[% PROCESS "ext/dygraph-combined.js" %]

GIGO.clearCsvMissing = function() {
  $("#csvmissing").hide();
};



GIGO.startGraphs = function() {
  // Go make some graphs!
  
  now = (new Date).getTime();
  prior = now - 180 * 86400 * 1000;
  
  g1=new Dygraph(
    document.getElementById("g1"),
    "/site/graphdata.csv",
    {
     includeZero: true,
     stackedGraph: true,
     fillGraph: true,
     showRangeSelector: true,
     dateWindow: [prior, now],
     visibility: [ true, true, true, true, false, false, false,false ],
     title: "By Protocol",
     legend: "follow",
     labelsSeparateLines: true,
     ylabel: "total, stacked",
     ready: GIGO.clearCsvMissing
    }
  );
  g1.ready(GIGO.clearCsvMissing);

  g2= new Dygraph(
    document.getElementById("g2"),
    "/site/graphdata_100.csv",
    {
     includeZero: true,
     stackedGraph: true,
     fillGraph: true,
     showRangeSelector: true,
     dateWindow: [prior, now],
     visibility: [ true, true, true, true, false, false, false,false ],
     title: "By Protocol",
     legend: "follow",
     labelsSeparateLines: true,
     ylabel: "percentage, stacked",
     ready: GIGO.clearCsvMissing
    }
  );
  g2.ready(GIGO.clearCsvMissing);
  


  g3= new Dygraph(
    document.getElementById("g3"),
    "/site/graphdata_100.csv",
    {
     includeZero: true,
     stackedGraph: true,
     fillGraph: true,
     showRangeSelector: true,
     dateWindow: [prior, now],
     visibility: [false, false,false,false, true, false, false,false ],
     title: "IPv6 Broken (timing out)",
     legend: "follow",
     labelsSeparateLines: true,
     ylabel: "percentage",
     
     rollPeriod: 7,
     showRoller: true,
     ready: GIGO.clearCsvMissing
    }
  );
  g3.ready(GIGO.clearCsvMissing);
  

};
