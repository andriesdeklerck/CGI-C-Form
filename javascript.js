document.getElementById('btn').addEventListener('click', loadJson);
document.getElementById('new').addEventListener('click', checkCookie);

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  function checkCookie() {
    var user=getCookie("username");
    if (user != "") {
    //   alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
         setCookie("username", user, 30);
       }
    }
    loadJson();
  }

function loadJson() {
    var filename = "names";
    var user=getCookie("username");
    if (user != "") {
      filename = "welcomeBack";
    }

    fetch(filename + '.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            for (let index = 0; index < data.length; index++) {
                console.log(data[index].Id)
            }
            document.getElementById("tabel").innerHTML = "";
            var tbl = document.getElementById('tabel');
            var orderArrayHeader = ["ID", "Tree", "Date and Time"];
            var thead = document.createElement('thead');
            tbl.appendChild(thead);
            for (var i = 0; i < orderArrayHeader.length; i++) {
                thead.appendChild(document.createElement("th")).
                    appendChild(document.createTextNode(orderArrayHeader[i]));
            }
            for (var i = 0; i < 50; i++) {
                var tr = tbl.insertRow();
                var td0 = tr.insertCell();
                var td1 = tr.insertCell();
                var td2 = tr.insertCell();
                for (var j = 0; j < 1; j++) {
                    if (i == 2 && j == 1) {
                        break;
                    } else {
                        td0.appendChild(document.createTextNode(data[i].Id));
                        td1.appendChild(document.createTextNode(data[i].TreeType));
                        td2.appendChild(document.createTextNode(data[i].DateTime));
                    }
                }
                //document.getElementById("tabel").appendChild(tbl);
            }
        })
        .catch((err) => {
            // Do something for an error here
        })
}