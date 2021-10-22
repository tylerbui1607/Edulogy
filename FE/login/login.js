if(!location.href.includes("localhost")){
  document.location = "http://localhost:5501/FE/login/loginWithGoogle.html";
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

async function onSignIn(googleUser) {
  console.log('login');
  var profile = googleUser.getBasicProfile();
  let data = {};
  data.email = profile.getEmail();
  data.name = profile.getName();
  data.googleID = profile.getId();

  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  await fetch("http://localhost:3000/api/users/login" , {
    method : "POST",//get delete
    headers : {
      'Content-Type' : 'application/json',
    },
    body : JSON.stringify(data)
  })
  .then((response)=>response.json())
  .then(rs => {
    console.log(rs);
    document.getElementById('jwt').innerHTML += rs.token;
  })
  .catch( error => console.log(error));

  await fetch("http://localhost:3000/api/questions")
  .then( res => res.json())
  .then( dt => console.log(dt))
  .catch( err => console.log(err));
}