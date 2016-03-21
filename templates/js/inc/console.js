var dummyConsole = [];
var console = console || {};
if (!console.log) {
  console.log = function (message) {
    dummyConsole.push(message);
  };
}
                
