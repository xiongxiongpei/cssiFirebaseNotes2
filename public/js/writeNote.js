let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');
  const noteLabel = document.querySelector('#noteLabel');
  const labelsDelimited = noteLabel.value.split(",").map(e => e.trim());
  // 2. Format the data and write it to our database
  firebase.database().ref(`users/${googleUser.uid}`).push({
    title: noteTitle.value,
    text: noteText.value,
    label: labelsDelimited
  });
  // 3. Clear the form so that we can write a new note
  .then(() => {
    noteTitle.value = "";
    noteText.value = "";
    noteLabel.value = "";
  });
   firebase.database().ref(`users/${googleUser.uid}`).push({})
}