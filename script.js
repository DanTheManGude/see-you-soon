const END_TIME = Date.parse("6 Oct 2022 11:30 PM EDT");
// Make sure the date is formated correctly

function zeroPad(num) {
  if (num >= 10) {
    return num;
  }
  return `0${num}`;
}

function showTime() {
  let now = Date.now();
  let difference = Math.abs(END_TIME - now);

  let days = Math.floor(difference / (24 * 60 * 60 * 1000));
  difference = difference - days * 24 * 60 * 60 * 1000;

  let hours = Math.floor(difference / (60 * 60 * 1000));
  difference = difference - hours * 60 * 60 * 1000;

  let min = Math.floor(difference / (60 * 1000));
  difference = difference - min * 60 * 1000;

  let seconds = Math.floor(difference / 1000);
  difference = difference - seconds * 1000;

  let tenths = Math.floor(difference / 100);

  const displayTime = `${days}:${zeroPad(hours)}:${zeroPad(min)}:${zeroPad(
    seconds
  )}.${tenths}`;
  const clockElement = document.getElementById("clock");

  clockElement.innerHTML = displayTime;
  clockElement.classList.add(END_TIME >= now ? "down" : "up");
}

setInterval(showTime, 100);
