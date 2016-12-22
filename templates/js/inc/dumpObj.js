// Original source:
// http://geekswithblogs.net/svanvliet/archive/2006/03/23/simple-javascript-object-dump-function.aspx
// Modified for:
//  GIGO name space
//  Wrapper function
/*global GIGO, jQuery, window, top */
/*jslint nomen: true */
/*jslint browser: true */




GIGO.dumpObj = function (obj, name) {
    var s = GIGO._dumpObj(obj, name, "  ", 0);
    s = jQuery('<div/>').text(s).html();
    GIGO.writeConsole("<pre>" + s + "</pre>");
};


GIGO._dumpObj_MAX_DUMP_DEPTH = 3;

GIGO._dumpObj = function (obj, name, indent, depth) { /*jslint forin: false */

    var s = JSON.stringify(obj,null,"  ");
    return s;
    
  // The rest of this is obsolete
  // (needs to be proven)
    var child, output, item;
    if (depth > GIGO._dumpObj_MAX_DUMP_DEPTH) {
        return indent + name + ": <Maximum Depth Reached>\n";
    }
    if (typeof obj === "object") {
        child = null;
        output = indent + name + "\n";
        indent += "\t";
        for (item in obj) {
            if (obj.hasOwnProperty(item)) {


                try {
                    child = obj[item];
                } catch (e) {
                    child = "<Unable to Evaluate>";
                }
                if (typeof child === "object") {
                    output += GIGO._dumpObj(child, item, indent, depth + 1);
                } else {
                    output += indent + item + ": " + child + "\n";
                }
            }
        }
        return output;
    }
    return obj;
};

// From http://www.javascripter.net/faq/writingt.htm
// Use this instead of "alert"; you can scroll the window this produces.
// It also sucks a bit less CPU generating this output, since
// a real browser window was designed for large output.
GIGO.writeConsole = function (content) {
    top.consoleRef = window.open('', 'myconsole', 'width=550,height=450' + ',menubar=1' + ',toolbar=1' + ',status=1' + ',scrollbars=1' + ',resizable=1');
    top.consoleRef.document.writeln('<html><head><title>Console</title></head>' + '<body bgcolor=white onLoad="self.focus()">' + content + '</body></html>');
    top.consoleRef.document.close();
};
