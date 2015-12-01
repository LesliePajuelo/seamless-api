var ref = new Firebase("https://dazzling-fire-2339.firebaseio.com");

var isNewUser = true;

var getName = function(authData){
  return authData.google.displayName;
};

var getUid = function(authData){
  console.log('getUid Auth')
  return authData.uid;
};

var login = function(){
  ref.authWithOAuthPopup("google", function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
      if(authData && isNewUser){
        ref.child("users").child(authData.uid).set({
        provider: authData.provider,
        name: getName(authData)
        });
      }
    };
  });
};

var logout = function(){
  ref.unauth();
};

