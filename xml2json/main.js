// Go to https://github.com/enkidootech/xml2json 
// to get the awesome converter !

window.convert = function() {
  
  // Get the XML in a string
  var xmlInput = document.getElementById('xmlInput').value;
  
  // Call the xml2json function
  var jsonOutput = xml2json(xmlInput);
  
  // Beautify the JSON if needed
  var beautifiedJson = JSON.stringify(jsonOutput, undefined, 4);
  
  // Show the json output in a textarea
  document.getElementById('jsonOutput').innerHTML = beautifiedJson;
}