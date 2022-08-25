// alert('Client side JavaScript file is loaded');

const address = document.getElementById('address');
const submit = document.getElementById('submit');
const output = document.getElementById('weather-output');
const outputPar1 = document.querySelector('#weather-output p:first-child');
const outputPar2 = document.querySelector('#weather-output p:nth-child(2)');
const outputPar3 = document.querySelector('#weather-output p:nth-child(3)');

submit.addEventListener('click', (event) => {
  event.preventDefault();
  messageHtml('Loading...');
  getWeatherData(address.value);
  resetInput(address);
});

function getWeatherData(address) {
  fetch(`http://localhost:3000/weather?address=${address}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        messageHtml(data.error);
        return;
      }
      outputPar1.textContent = `${data.location}`;
      outputPar2.textContent = `Temperature: ${data.temperature}℃`;
      outputPar3.textContent = `Feels Like: ${data.feelslike}℃`;
    });
}

function messageHtml(message) {
  outputPar1.textContent = message;
  outputPar2.textContent = '';
  outputPar3.textContent = '';
}

function resetInput(input) {
  input.value = '';
  input.focus();
}
