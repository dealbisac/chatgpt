import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

// Loader function while AI is thinking
function loader(element) {
  element.textContent = '';
  loadInterval = setInterval(() => {
    element.textContent += '.';


    if (element.textContent.length === '....') {
      element.textContent = '';
    }
  }, 300)
}

// Function to create a new message and append it to the chat container
function typeText(element, text) {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
    }
  }, 20)
}

// Function to create a unique ID for each message
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

// Function to separate the message from the user and the message from the bot
function chatStripe(isAi, value, uniqueId) {
  return (
    `
    <div class="wrapper ${isAi && 'ai'}">
      <div class="chat">
        <div class="profile">
        <img 
          src="${isAi ? bot : user}"
          alt="${isAi ? 'bot' : 'user'}"
          />
          </div>
          <div class="message" id="${uniqueId}">${value}</div>
        </div>
      </div>
    `
  )
}

// Function to create a new message
const handleSubmit = async (e) => {
  e.preventDefault()

  const data = new FormData(form)

  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'))

  // to clear the textarea input 
  form.reset()

  // bot's chatstripe
  const uniqueId = generateUniqueId()
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

  // to focus scroll to the bottom 
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // specific message div 
  const messageDiv = document.getElementById(uniqueId)

  // messageDiv.innerHTML = "..."
  loader(messageDiv)
}

// Event listener for the form
form.addEventListener('submit', handleSubmit)
form.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        handleSubmit(e)
    }
})