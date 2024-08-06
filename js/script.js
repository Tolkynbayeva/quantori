let token = '';
let refreshToken = '';

document.getElementById('login__form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const messageElement = document.getElementById('message');
  
  fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password,
      expiresInMins: 30
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      token = data.token;
      refreshToken = data.refreshToken;
      messageElement.style.color = 'green';
      messageElement.textContent = 'Login successful!';
      console.log('User data:', data);
      document.getElementById('get_user_button').style.display = 'block';
      document.getElementById('refresh_token_button').style.display = 'block';
    } else {
      messageElement.style.color = 'red';
      messageElement.textContent = 'Login failed: ' + data.message;
    }
  })
  .catch(error => {
    messageElement.style.color = 'red';
    messageElement.textContent = 'Error: ' + error.message;
  });
});

document.getElementById('get_user_button').addEventListener('click', function() {
  fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Current user:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

document.getElementById('refresh_token_button').addEventListener('click', function() {
  fetch('https://dummyjson.com/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
      expiresInMins: 30
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.token) {
      token = data.token;
      refreshToken = data.refreshToken;
      console.log('Token refreshed:', data);
    } else {
      console.error('Token refresh failed:', data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

const loginMenuMobile = document.getElementById('login__menu--mobile');
const loginNavMobile = document.getElementById('login__nav--mobile');

loginMenuMobile.addEventListener('click', () => {
  loginNavMobile.classList.toggle('active');
});