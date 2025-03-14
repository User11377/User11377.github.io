const target = new Date('Dec 24, 2025 0:0:0').getTime();

function countdown() {
  const now = new Date().getTime();
  const distance = target - now;

  if (distance < 0) {
    clearInterval(interval);
    document.getElementById('countdown').innerHTML = 'EXPIRED';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days').innerHTML = days;
  document.getElementById('hours').innerHTML = hours;
  document.getElementById('minutes').innerHTML = minutes;
  document.getElementById('seconds').innerHTML = seconds;
}

const interval = setInterval(countdown, 1000);

countdown();