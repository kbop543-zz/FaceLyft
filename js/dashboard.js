

window.onload = () => {
  var data = String($('#hidden').html())
  if(data.includes('https://')){

var parser = new DOMParser;
var dom = parser.parseFromString(
    '<!doctype html><body>' + data,
    'text/html');
var decodedString = dom.body.textContent;

  console.log(unescape(decodedString))

     window.location.replace(decodedString);
  }
}
