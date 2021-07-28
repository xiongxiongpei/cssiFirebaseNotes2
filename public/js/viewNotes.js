let googleUser;

window.onload = (event) => {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            console.log('Logged in as: ' + user.displayName);
            googleUser = user;
        } else {
            window.location = 'index.html';
        }
    })
}

function getNotes(userId) {
    const notesRef = firebase.database().ref(`users/${userId}`);
    notesRef.on('value', (db) => {
        const data = db.val();
        renderData(data);
    });
}
function renderData(data) {
    const html = '';
    for (const dataKey in data) {
        const note = data[dataKey];
        const cardHtml = renderCard(note);
        ntml += cardHtml;
    }
    document.querySelector('#app').innerHTML = html;
}

function randomBackground() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    console.log(bgColor);
  
    document.body.style.background = bgColor;
    }


function renderCard(note) {
    const div = document.createElement('div');
    div.classList.add('column', 'is-one-quarter');

    const card = document.createElement('div');
    card.classList.add('card');
    randomBackground();

    div.appendChild(card);
    

    //convert note to html
    // console.log(note);
    
    // return `
    // <div class = "column is one quarter">
    //     <div class="card">
    //         <header class="card header">
    //             <span class="card header title">${note.title }</span>
    //         </header>
    //     </div>
    //     <div class="card content">
    //         <div class="content">${ note.title }</div>
    //     </div>
    // </div>
    // `;
}

