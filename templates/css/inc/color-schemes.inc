/* Light mode */
@media (prefers-color-scheme: light) {
  body {
      background-color: white;
      color: black;
  }

  .tabbox_outside div {border: 1px solid #777777;}

  .tabbox_inside div {border: 0px solid #000000;}

  .tabbox_middle div {border: 0px solid #000000;}

  /* Readiness Score */
  th {
    background-color: #000000;
    color: #ffffff;
  }

  table.tablesorter tbody td {
    color: #3D3D3D;
    background-color: #FFF;
  }
  
  table.tablesorter {background-color: #CDCDCD;}

  .subtle a { color: #000; text-decoration: none; }
  .subtle a:link { color: #000; }
  .subtle a:visited { color: #000; }
  .subtle a:hover { color: #00F; text-decoration: underline;}
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  body {
      background-color: black;
      color: white;
  }

  .tabbox_outside  div {border: 1px solid #ffffff;}
  
  .tabbox_inside div {border: 0px solid #ffffff;}

  .tabbox_middle div {border: 0px solid #ffffff;}

  /* Readiness Score */
  th {
    background-color: #ffffff;
    color: #000000;
  }

  a:link {
    color: white;
  }
  
  a:visited {
    color: #d3d3d3;
  }
  
  a:hover {
    color: #999999;
  }
  
  a:active {
    color: blue;
  }

  table.tablesorter tbody td {
    color: #ffffff;
    background-color: black;
    }

  table.tablesorter {
    background-color: #cfcfcf;
  }

  a.permalink, a.goback, a.help_popup {
    background-color: rgb(0, 4, 68);
  }
}