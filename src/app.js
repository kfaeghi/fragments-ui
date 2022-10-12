
// src/app.js

import { Auth, getUser } from './auth';
import { getUserFragments, postUserFragments } from './api';


async function init() {
  // Get our UI elements
  const userSection = document.querySelector('#user');
  const loginBtn = document.querySelector('#login');
  const logoutBtn = document.querySelector('#logout');
  const Form = document.getElementById('dataform');
  const submitBtn = document.querySelector('#submit');


  function handleForm(event) { event.preventDefault(); }
  Form.addEventListener('submit', handleForm);

  
  // Wire up event handlers to deal with login and logout.
  loginBtn.onclick = () => {
    // Sign-in via the Amazon Cognito Hosted UI (requires redirects), see:
    
    Auth.federatedSignIn();
  };
  logoutBtn.onclick = () => {
    // Sign-out of the Amazon Cognito Hosted UI (requires redirects), see:
  
    Auth.signOut();
  };


  
  // See if we're signed in (i.e., we'll have a `user` object)
  const user = await getUser();
  if (!user) {
    // Disable the Logout button
    logoutBtn.disabled = true;
    return;
  }
  
  
  submitBtn.onclick = () => {
    var data = document.getElementById('data').value
    postUserFragments(user, data);
  }

  

   // Do an authenticated request to the fragments API server and log the result
  getUserFragments(user);

  // Log the user info for debugging purposes
  console.log({ user });

  // Update the UI to welcome the user
  userSection.hidden = false;

  // Show the user's username
  userSection.querySelector('.username').innerText = user.username;

  // Disable the Login button
  loginBtn.disabled = true;
}


// Wait for the DOM to be ready, then start the app
addEventListener('DOMContentLoaded', init);