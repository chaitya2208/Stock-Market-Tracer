import React, { useEffect } from "react";

const GoogleSignInButton = ({ onSuccess }) => {
  useEffect(() => {
    /* global google */
    const initializeGoogle = () => {
      if (window.google) {
        google.accounts.id.initialize({
          client_id: "115452196162-sdggb726rtif8ghoefet2rlmgg6m1gp9.apps.googleusercontent.com",
          callback: handleCredentialResponse,
        });

        google.accounts.id.renderButton(
          document.getElementById("google-signin-div"),
          { theme: "outline", size: "large" }
        );

        // Optional: Auto prompt
        // google.accounts.id.prompt();
      }
    };

    const handleCredentialResponse = (response) => {
      const jwt = response.credential;
      const base64Url = jwt.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const userData = JSON.parse(atob(base64));
      onSuccess(userData);
    };

    initializeGoogle();
  }, [onSuccess]);

  return <div id="google-signin-div"></div>;
};

export default GoogleSignInButton;
