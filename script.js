// Registration Page Start Here

let storageXML;
if (localStorage.getItem('storageXML') === null) { 
    storageXML = document.implementation.createDocument(null, 'users');
    localStorage.setItem('storageXML', new XMLSerializer().serializeToString(storageXML));
} else {
    let parser = new DOMParser();
    storageXML = parser.parseFromString(localStorage.getItem('storageXML'), 'application/xml');
}

function resetForm() {
    document.getElementById('fullname').value = '';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('confirm-password').value = '';
}

function resetLogin() {
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
}
    
function regisForm() {
   try {
    // Get input values
    let fullname = document.getElementById('fullname').value.trim();
    let username = document.getElementById('username').value.trim();
    let password = document.getElementById('password').value.trim();
    let c_password = document.getElementById('confirm-password').value;

    // Check for empty fields
    if (fullname === '' || username === '' || password === '' || c_password === '') {
        document.getElementById('alertReg').innerHTML = 'Please fill out all the fields';
        resetForm();
        return
    }

    // Check password match
    if (password !== c_password) {
        resetForm();
        document.getElementById('alertReg').innerHTML = 'Password did not match';
        return
    }

    // Check if username already exists
    let accounts = storageXML.getElementsByTagName('account');
    for (let i = 0; i < accounts.length; i++) {
        let existingUsername = accounts[i].getElementsByTagName('username')[0].textContent;
        if (username === existingUsername) {
            document.getElementById('alertReg').innerHTML = 'Username already exists';
            resetForm();
            return
        }
    }

    // Insert new account into XML
    let newAccount = storageXML.createElement('account');
    newAccount.innerHTML = `<fullname>${fullname}</fullname><username>${username}</username><password>${password}</password>`;
    storageXML.documentElement.appendChild(newAccount);

    // Save XML to localStorage
    localStorage.setItem('storageXML', new XMLSerializer().serializeToString(storageXML));

    // Success message
    alert('Registration Complete');
    resetForm();
    document.getElementById('fullname').focus();
   } catch (error) {
        alert(error)
   }
}

// Registration Page End Here

// Login Page Start Here

function loginIt() {
    try {
        // Get input values
        let username = document.getElementById('login-username').value.trim();
        let password = document.getElementById('login-password').value.trim();

        // if the admin is logging in
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('admin', username)
            window.location.href = 'admin.html'
            return
        }

        if (username === '' || password === '') {
            document.getElementById('alert').innerHTML = 'Please fill up all the fields';
            resetLogin();
        } else {
            let accounts = storageXML.getElementsByTagName('account');
            for (let i = 0; i < accounts.length; i++) {
                let acc = accounts[i];
                let acc_username = acc.getElementsByTagName('username')[0].textContent;
                let acc_password = acc.getElementsByTagName('password')[0].textContent;
                let acc_name = acc.getElementsByTagName('fullname')[0].textContent;

                if (username === acc_username && password === acc_password) {
                    localStorage.setItem('login', true);
                    localStorage.setItem('user', acc_name);
                    resetLogin();
                    document.getElementById('alert').innerHTML = '';
                    window.location.href = 'plant.html'
                } else {
                    document.getElementById('alert').innerHTML = 'Invalid username or password';
                }
            }
        }
    } catch (error) {
        alert(error);
    }
}

function logout() {
    localStorage.setItem('login', 'false');
    localStorage.setItem('user', '');
    window.location.href = 'login.html';
}
// Login Page End Here

// User Page Start Here
function activeAcc() {
    var user = localStorage.getItem('user');
    document.getElementById('user').innerHTML = user;
}
// User Page End Here