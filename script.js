const events = {
  "see-you-soon": {
    endTime: Date.parse("26 Oct 2022 6:10 PM EDT"),
    text: "we are together",
    color: "#a978f7",
  },
  "meghans-wedding": {
    endTime: Date.parse("4 March 2023 4:00 PM EDT"),
    text: "Meghan's Wedding",
    color: "#b35c2d",
  },
};
const clockElement = document.getElementById("clock");

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

    clockElement.innerHTML = displayTime;
    clockElement.classList.add(endTime >= now ? "down" : "up");
  };
}

const updateheader = (content, color) => {
  const headerElemnt = document.getElementById("header");

  headerElemnt.innerHTML = content;
  headerElemnt.style.color = color;
};

const searchParams = new URLSearchParams(window.location.search);
const eventKey = searchParams.get("key");
const doesEventExist = events.hasOwnProperty(eventKey);

if (doesEventExist) {
  const { endTime, text, color } = events[eventKey];

  setInterval(getShowTime(endTime), 100);

  updateheader(`Time left until ${text}`, color);
} else {
  updateheader("Upcoming Events", "#f2f2f2");
  const eventList = document.createElement("ul");

  Object.keys(events).forEach((eventKey) => {
    const listItem = document.createElement("li");
    const eventItem = document.createElement("span");
    const eventname = document.createElement("a");
    listItem.style.padding = "8px 0";
    eventname.setAttribute("href", `index.html?key=${eventKey}`);

    const event = events[eventKey];
    eventname.innerHTML = event.text;
    eventname.style.color = event.color;
    eventItem.appendChild(eventname);
    listItem.appendChild(eventItem);
    eventList.appendChild(listItem);
  });
  clockElement.appendChild(eventList);
  clockElement.style.fontSize = "28px";
  clockElement.style.textAlign = "left";
  clockElement.style.width = "400px";
  clockElement.style.color = "#f2f2f2";
}
