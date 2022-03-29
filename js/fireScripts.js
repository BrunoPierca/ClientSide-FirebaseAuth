const signUpForm = document.getElementById("signUpForm");
const registerModal = document.getElementById("registerModal");
const PassDontMatchDiv = document.getElementById("PassDontMatchDiv");
const wrongPassDiv = document.getElementById("wrongPassDiv");
const loginForm = document.getElementById("loginForm");
const loginModal = document.getElementById("loginModal");

// Show/Hide Password
function show() {
  var p = signUpForm["password"];
  var p2 = signUpForm["password2"];
  var loginP = loginForm["loginPassword"];
  p.setAttribute("type", "text");
  p2.setAttribute("type", "text");
  p.setAttribute("placeholder", "Password");
  p2.setAttribute("placeholder", "Password again :)");
  loginP.setAttribute("type", "text");
  loginP.setAttribute("placeholder", "Your password");
}

function hide() {
  var p = signUpForm["password"];
  var p2 = signUpForm["password2"];
  var loginP = loginForm["loginPassword"];

  p.setAttribute("type", "password");
  p2.setAttribute("type", "password");
  p.setAttribute("placeholder", "●●●●●●●●");
  p2.setAttribute("placeholder", "●●●●●●●●");
  loginP.setAttribute("type", "password");
  loginP.setAttribute("placeholder", "●●●●●●●●");
}

var pwShown = 0;

const switchToggle = function () {
  if (pwShown == 0) {
    pwShown = 1;
    show();
  } else {
    pwShown = 0;
    hide();
  }
};

document.getElementById("eye").addEventListener("click", switchToggle, false);
document
  .getElementById("loginEye")
  .addEventListener("click", switchToggle, false);

// Auth

let isLogged = false;

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user.displayName, user.email);
    isLogged = true;
    $("#loginModal").modal("hide");
    $("#loginModal").hide();
    $("#registerModal").modal("hide");
    $("#registerModal").hide();
  } else {
    isLogged = false;
  }
  toggleElements();
});
// Toggle button visibility
loggedElements = document.querySelectorAll(".isLogged");
notLoggedElements = document.querySelectorAll(".notLogged");
const toggleElements = function () {
  if (isLogged) {
    notLoggedElements.forEach((element) => {
      element.classList.add("d-none");
    });
    loggedElements.forEach((element) => {
      element.classList.remove("d-none");
    });
  } else {
    loggedElements.forEach((element) => {
      element.classList.add("d-none");
    });
    notLoggedElements.forEach((element) => {
      element.classList.remove("d-none");
    });
  }
};

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signUpForm["email"].value;
  const password = signUpForm["password"].value;
  const repeatedPassword = signUpForm["password2"].value;
  console.log(email, password, repeatedPassword);
  if (password != repeatedPassword) {
    PassDontMatchDiv.classList.remove("d-none");
  } else {
    PassDontMatchDiv.classList.add("d-none");
  }
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      signUpForm.reset();
    });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const loginEmail = loginForm["loginEmail"].value;
  const loginPassword = loginForm["loginPassword"].value;
  auth
    .signInWithEmailAndPassword(loginEmail, loginPassword)
    .then((userCredential) => {
      loginForm.reset();
      console.log(loginEmail, loginPassword);
    });
});

// Google login

const googleLogin = document.querySelectorAll(".googleLogin");
googleLogin.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        const userInfo = result;
        console.log("google sign in");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// Facebook login
const fbLogin = document.getElementById("fbLogin");
fbLogin.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new firebase.auth.FacebookAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result);

      console.log("facebook sign in");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Log out

const logOutButtons = document.querySelectorAll(".logOut");
console.log(logOutButtons);
logOutButtons.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      console.log("Loged out :(");
    });
  });
});
