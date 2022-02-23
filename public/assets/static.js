var jwt = localStorage.getItem('token');
if (jwt == null) {
    window.location.href = 'login.html';
}

function addExpense() {
    var text = document.getElementById('text').value;
    var amount = document.getElementById('amount').value;
    
    // create a post request
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '/expense/add', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader('token', jwt);
    xhttp.send(JSON.stringify({
        'text': text,
        'amount': amount
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            console.log(objects);
            if (objects['status'] == 'ok') {
                Swal.fire({
                    text: 'added',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '../expense.html';
                    }
                });
            } else {
                Swal.fire({
                    text: objects['message'],
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
    return false;

}

function getExpense() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', '/expense/get', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader('token', jwt);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            console.log(objects);
            if (objects['status'] == 'ok') {
                var table = document.getElementById('expenseTable');
                let amount = 0;
                for (var i = 0; i < objects['expenses'].length; i++) {
                    var row = table.insertRow(i+1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);
                    var date = new Date(objects['expenses'][i]['createdAt']);
                    var gmt = date.toGMTString();
                    cell1.innerHTML = objects['expenses'][i]['text'];
                    cell2.innerHTML = `Rs ` + objects['expenses'][i]['amount'];
                    cell3.innerHTML = gmt;
                    var deleteButton = document.createElement('button');
                    deleteButton.innerHTML = 'Delete';
                    deleteButton.setAttribute('onclick', 'deleteExpense(' + `"${objects['expenses'][i]['_id']}"` + ')');
                    cell4.appendChild(deleteButton);

                    amount = amount + objects['expenses'][i]['amount'];
                }
                amount = `Rs ` + amount;
                document.getElementById('totalamount').innerHTML = amount;
            } else {
                console.log(objects['message']);
            }
        }
    };
    return false;
}

function deleteExpense(id) { 
    const xhttp = new XMLHttpRequest();
    xhttp.open('DELETE', '/expense/delete', true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.setRequestHeader('token', jwt);
    xhttp.send(JSON.stringify({
        'id': id
    }));
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            console.log(objects);
            if (objects['status'] == 'ok') {
                Swal.fire({
                    text: 'deleted',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '../expense.html';
                    }
                });
            } else {
                Swal.fire({
                    text: objects['message'],
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
    return false;

}


getExpense();