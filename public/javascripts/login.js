


window.onload = function(){
  var facebook = document.getElementById('fb');
  facebook.addEventListener('click', facebooksignin)
  var gmail = document.getElementById('gm');
  gmail.addEventListener('click', gmailsignin);

 
var config = {
    apiKey: "AIzaSyDMP_eY7gzyhID57TwHQXBAhZSTSEXF38Y",
    authDomain: "project-b69b1.firebaseapp.com",
    databaseURL: "https://project-b69b1.firebaseio.com",
    projectId: "project-b69b1",
    storageBucket: "",
    messagingSenderId: "340912358863"
  };
  
  
 
  firebase.initializeApp(config);

  
 const auth = firebase.auth();
 
 var socket = io.connect('/');
        function facebooksignin() {
      
            console.log('hhh');      
            var provider = new firebase.auth.FacebookAuthProvider();
            
            firebase.auth().signInWithPopup(provider).then(function(result) {
              firebase.auth().onAuthStateChanged(user => {
                if(user) {
                  var token = result.credential.accessToken;
              
              var user = result.user;
            
              var username = user.displayName;
            // console.log(username)
            socket.emit("userfacebook", username);
            
            window.location.href = '/user';
                }
              });
              
            
            }).catch(function(error) {
              
              var errorCode = error.code;
              var errorMessage = error.message;
              
              var email = error.email;
              
              var credential = error.credential;
              
            });
            
            }
            socket.on('userfacebook', function(data){
              console.log(data)
            });
            
            // google sign in
            
            function gmailsignin() {
      
            console.log('hhh');      
            var provider = new firebase.auth.GoogleAuthProvider();
            
            firebase.auth().signInWithPopup(provider).then(function(result) {
              firebase.auth().onAuthStateChanged(user => {
                if(user) {
                  var token = result.credential.accessToken;
              
              var user = result.user;
            
              var username = user.displayName;
            // console.log(username)
            // socket.emit("userfacebook", username);
            
            window.location.href = '/user';
                }
              });
              
            
            }).catch(function(error) {
              
              var errorCode = error.code;
              var errorMessage = error.message;
              
              var email = error.email;
              
              var credential = error.credential;
              
            });
            
            }
            // socket.on('userfacebook', function(data){
            //   console.log(data)
            // });
            
            
          }
        