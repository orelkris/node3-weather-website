const address = document.getElementById('address');
const submit = document.getElementById('submit');
const outputPar1 = document.querySelector('#weather-output p:first-child');
const outputPar2 = document.querySelector('#weather-output p:nth-child(2)');
const outputPar3 = document.querySelector('#weather-output p:nth-child(3)');
const outputPar4 = document.querySelector('#weather-output p:nth-child(4)');

submit.addEventListener('click', (event) => {
  event.preventDefault();
  messageHtml('Loading...');
  getWeatherData(address.value);
  resetInput(address);
});

function getWeatherData(address) {
  fetch(`/weather?address=${address}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        messageHtml(data.error);
        return;
      }
      outputPar1.textContent = `${data.location}`;
      outputPar2.textContent = `Temperature: ${data.temperature}℃`;
      outputPar3.textContent = `Feels Like: ${data.feelslike}℃`;
      outputPar4.textContent = `Precipitation chance is: ${data.precip}%`;
    });
}

function messageHtml(message) {
  outputPar1.textContent = message;
  outputPar2.textContent = '';
  outputPar3.textContent = '';
  outputPar4.textContent = '';
}

function resetInput(input) {
  input.value = '';
  input.focus();
}
