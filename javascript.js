document.getElementById('btn').addEventListener('click', loadJson);

function loadJson() {
    fetch('names.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            for (let index = 0; index < data.length; index++) {
                console.log(data[index].Id)
            }

            var tbl = document.createElement('table');
            tbl.setAttribute('id', 'tabel');
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
                document.getElementById("result").appendChild(tbl);
            }
        })
        .catch((err) => {
            // Do something for an error here
        })
}