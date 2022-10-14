const events = {
  "see-you-soon": {
    endTime: Date.parse("26 Oct 2022 1:33 PM EDT"),
    text: "we are together again",
    color: "#a978f7",
  },
};

const defaultEvent = {
  endTime: Date.now(),
  text: "...",
  color: "#f2f2f2",
};

function zeroPad(num) {
  if (num >= 10) {
    return num;
  }
  return `0${num}`;
}

function getShowTime(endTime) {
  return () => {
    let now = Date.now();
    let difference = Math.abs(endTime - now);

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
    clockElement.classList.add(endTime >= now ? "down" : "up");
  };
}

const searchParams = new URLSearchParams(window.location.search);
const eventKey = searchParams.get("key");

const eventObj = events.hasOwnProperty(eventKey)
  ? events[eventKey]
  : defaultEvent;

const { endTime, text, color } = eventObj;

setInterval(getShowTime(endTime), 100);

const headerElemnt = document.getElementById("header");
headerElemnt.style.color = color;
headerElemnt.innerHTML = `Time left until ${text}`;
