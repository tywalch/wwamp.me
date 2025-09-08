// index.ts
var defaultSprites = {
  urls: [
    "/audio/audio.pack.webm",
    "/audio/audio.pack.mp3"
  ],
  src: [
    "/audio/audio.pack.webm",
    "/audio/audio.pack.mp3"
  ],
  sprite: {
    "300": [0, 2536.0090702947846],
    "applause-lite": [4e3, 3551.201814058957],
    "applause-more": [9e3, 7540.861678004536],
    "awww": [18e3, 1344.0136054421785],
    "bwamp-2": [21e3, 2886.8707482993195],
    "bwamp-3": [25e3, 2959.4104308390038],
    "bwamp": [29e3, 3030.204081632654],
    "cha-ching": [34e3, 1666.6666666666642],
    "cheers": [37e3, 1655.9863945578215],
    "cowpaths": [4e4, 2377.1428571428573],
    "drum-roll": [44e3, 1388.6621315192756],
    "fire": [47e3, 2196.9841269841268],
    "goose": [51e3, 359.99999999999943],
    "ham-horn-multi": [53e3, 2856.054421768704],
    "ham-horn": [57e3, 1973.6961451247198],
    "horse": [6e4, 2106.6666666666692],
    "lots-of-laughs": [64e3, 2194.285714285712],
    "mindblown": [68e3, 1524.9659863945624],
    "minecraft-death": [71e3, 417.9591836734744],
    "no": [73e3, 804.9659863945635],
    "nonono-cat": [75e3, 3636.9841269841318],
    "oooh": [8e4, 2545.6916099773252],
    "power-on": [84e3, 4153.469387755109],
    "powerful": [9e4, 612.0181405895693],
    "sad-trombone": [92e3, 4017.052154195014],
    "twinkle": [98e3, 3138.3673469387786],
    "yes": [103e3, 924.9659863945539]
  }
};
var defaultWwamps = [
  {
    id: "\u{1F44F}",
    danger: 0,
    volume: 1,
    sound: "applause-lite"
  },
  {
    id: "\u{1F44D}",
    danger: 0,
    volume: 1,
    sound: "yes"
  },
  {
    id: "\u{1F44F}\u{1F44F}\u{1F44F}",
    danger: 0,
    volume: 0.8,
    sound: "applause-more"
  },
  {
    id: "\u{1F44E}",
    danger: 0,
    volume: 1,
    sound: "no"
  },
  {
    id: "\u{1F62E}",
    danger: 0,
    volume: 0.8,
    sound: "oooh"
  },
  {
    id: "\u{1F63B}",
    danger: 0,
    volume: 1,
    sound: "awww"
  },
  {
    id: "\u{1F941}\u{1F941}\u{1F941}",
    danger: 0,
    volume: 1,
    sound: "drum-roll"
  },
  {
    id: "\u2728",
    danger: 0,
    volume: 0.5,
    sound: "twinkle"
  },
  {
    id: "\u{1F4AA}",
    danger: 1,
    volume: 1,
    sound: "powerful"
  },
  {
    id: "\u{1F4B0}",
    danger: 1,
    volume: 1,
    sound: "cha-ching"
  },
  {
    id: "\u{1F389}",
    danger: 1,
    volume: 0.7,
    sound: "bwamp"
  },
  {
    id: "\u{1F630}\u{1F3BA}",
    danger: 1,
    volume: 1,
    sound: "sad-trombone"
  },
  {
    id: "\u{1F389}\u{1F389}",
    danger: 1,
    volume: 0.7,
    sound: "bwamp-2"
  },
  {
    id: "\u{1F942}\u{1F37B}",
    danger: 1,
    volume: 1,
    sound: "cheers"
  },
  {
    id: "\u{1F389}\u{1F389}\u{1F389}",
    danger: 1,
    volume: 0.7,
    sound: "bwamp-3"
  },
  {
    id: "\u{1F9A2}",
    danger: 1,
    volume: 1,
    sound: "goose"
  },
  {
    id: "\u{1F525}\u{1F525}\u{1F525}",
    danger: 2,
    volume: 1,
    sound: "fire"
  },
  {
    id: "\u{1F92F}\u{1F92F}\u{1F92F}",
    danger: 2,
    volume: 1,
    sound: "mindblown"
  },
  {
    id: "\u{1F602}\u{1F92D}\u{1F602}",
    danger: 2,
    volume: 1,
    sound: "lots-of-laughs"
  },
  {
    id: "\u{1F434}\u{1F434}\u{1F434}",
    danger: 2,
    volume: 1,
    sound: "horse"
  },
  {
    id: "\u26CF\u{1F480}",
    danger: 2,
    volume: 1,
    sound: "minecraft-death"
  },
  {
    id: "\u{1F404}\u{1F404}\u{1F404}",
    danger: 2,
    volume: 1,
    sound: "cowpaths"
  },
  {
    id: "\u{1F356}\u{1F4EF}\u{1F501}",
    danger: 2,
    volume: 1,
    sound: "ham-horn-multi"
  },
  {
    id: "\u{1F408}\u{1F44E}\u{1F44E}",
    danger: 2,
    volume: 1,
    sound: "nonono-cat"
  }
];
function htmlToElement(html) {
  const template = document.createElement("template");
  html = html.trim();
  template.innerHTML = html;
  if (template.content && template.content.firstChild) {
    return template.content.firstChild;
  } else if (template.firstChild) {
    return template.firstChild;
  } else {
    throw new Error("No child node found");
  }
}
function toElementId(wwamp) {
  return `${wwamp.sound}:${wwamp.id}`;
}
var dangerColors = ["dark-green", "orange", "dark-red"];
function getBwampContainer() {
  const el = document.getElementById("bwamp_container");
  if (!el) {
    throw new Error("Bwamp container not found");
  }
  return el;
}
var Components = {
  getBwampContainer() {
    const el = document.getElementById("bwamp_container");
    if (!el) {
      throw new Error("Bwamp container not found");
    }
    return el;
  },
  getVolumeCtl() {
    const el = document.getElementById("volume");
    if (!el) {
      throw new Error("Volume control not found");
    }
    return el;
  },
  getSoundSplash() {
    const el = document.getElementById("sound-splash");
    if (!el) {
      throw new Error("Sound splash not found");
    }
    return el;
  },
  getAccountNameInput() {
    const el = document.getElementById("account");
    if (!el) {
      throw new Error("Account name not found");
    }
    return el;
  },
  getBwampElement(wwamp) {
    const elId = toElementId(wwamp);
    const el = document.getElementById(elId);
    if (!el) {
      throw new Error("Bwamp element not found");
    }
    return el;
  },
  getEphemeralBubbles() {
    const el = document.getElementById("ephermal-bubbles");
    if (!el) {
      throw new Error("Ephemeral bubbles not found");
    }
    return el;
  },
  getStatus() {
    const el = document.getElementById("status");
    if (!el) {
      throw new Error("Status not found");
    }
    return el;
  },
  getUserList() {
    const el = document.getElementById("users");
    if (!el) {
      throw new Error("User list not found");
    }
    return el;
  },
  getAccountNameDisplay() {
    const el = document.getElementById("account-display");
    if (!el) {
      throw new Error("Account name display not found");
    }
    return el;
  }
};
var Services = {
  getHowler() {
    return Howler;
  },
  newHowl(sprites) {
    return new Howl(sprites);
  },
  getIO() {
    return io();
  }
};
var App = {
  play(howl, sound, volume) {
    const id = howl.play(sound);
    howl.volume(volume, id);
  },
  show(wwamp, who) {
    const container = Components.getEphemeralBubbles();
    let rand = Math.random() * 100;
    const hpos = rand < 50 ? `left: ${rand}%;` : `right: ${100 - rand}%;`;
    const animate_ms = 2500 + 1e3 * Math.random();
    const bubble = htmlToElement(
      '<div class="message db tc f3 br-pill ph4 pv3 white bg-' + dangerColors[wwamp.danger] + '"style="position: fixed; ' + hpos + ";animation-name: bubble;animation-duration: " + animate_ms + 'ms;animation-timing-function: linear;animation-fill-mode: forwards;pointer-events: none;"><span style="text-shadow:2px 2px 3px rgba(0,0,0,.3);margin-right:3px;"></span> <span class="nowrap"></span></div>'
    );
    bubble.firstChild.innerText = who;
    bubble.lastChild.innerText = wwamp.id;
    container.appendChild(bubble);
    while (container.childElementCount > 50 && container.firstChild) {
      container.removeChild(container.firstChild);
    }
    window.setTimeout(function() {
      container.removeChild(bubble);
    }, animate_ms);
  },
  getAccountName() {
    return Components.getAccountNameInput().value || "anonymous";
  },
  send(socket, wwamp) {
    socket.emit("sound", JSON.stringify({
      who: this.getAccountName(),
      what: 2,
      sound: wwamp.sound
    }));
  },
  open() {
    const state = Components.getStatus();
    state.className = "green";
    state.innerText = "connected";
  },
  sound(howl, wwamps, event) {
    const wwamp = wwamps.find((w) => w.sound === event.sound);
    if (wwamp) {
      this.show(wwamp, event.who);
      this.play(howl, wwamp.sound, wwamp.volume);
    } else {
      console.error(event.who, "no such bwamp", event.sound);
    }
  },
  reloadPage() {
    window.location.reload();
  },
  error() {
    const state = Components.getStatus();
    state.className = "red";
    state.innerText = "error";
  }
};
function createBwampElement(wwamp) {
  const elId = toElementId(wwamp);
  const linkTitle = wwamp.sound.split(".");
  const inner = htmlToElement(`<div style="user-select: none; white-space: nowrap; cursor: pointer" class="db tc f3 link br-pill ba bw2 ph2 pv2 pv3-ns mb3 mb2-ns hover-bg-moon-gray bg-white"></div>`);
  inner.id = elId;
  inner.title = linkTitle[0] ?? "";
  inner.classList.add(`${dangerColors[wwamp.danger]}`);
  inner.textContent = wwamp.id;
  const outer = htmlToElement(`<div class="pv1" style="width:48%"></div>`);
  outer.appendChild(inner);
  getBwampContainer().appendChild(outer);
  return outer;
}
function addBwampElement(socket, wwamp) {
  let input = Components.getBwampElement(wwamp);
  console.log(!!input, wwamp);
  if (!input) {
    input = createBwampElement(wwamp);
  }
  input.addEventListener("click", (e) => {
    App.send(socket, wwamp);
    e.preventDefault();
  });
}
function setupUI(socket, wwamps) {
  for (const wwamp of wwamps) {
    addBwampElement(socket, wwamp);
  }
}
function setupAudio(sprites) {
  const howl = Services.newHowl(sprites);
  function tryStartAudio(howl2, soundSplash2, click) {
    const howler = Services.getHowler();
    howler.volume(0);
    if (howler.state == "suspended") {
      soundSplash2.style.display = "flex";
    }
    if (howler.state == "running" || click) {
      updateVolume(localStorage.getItem("volume") ?? "0.5");
      if (click) {
        App.play(howl2, "power-on", 0.3);
      }
      soundSplash2.style.display = "none";
    }
  }
  function updateVolume(currentVolume) {
    let vol = 0.5;
    if (currentVolume) {
      const v = parseFloat(currentVolume);
      if (v >= 0 && v <= 1) {
        vol = v;
      }
    }
    Components.getVolumeCtl().value = vol.toString();
    localStorage.setItem("volume", vol.toString());
    Services.getHowler().volume(vol * vol);
  }
  const soundSplash = Components.getSoundSplash();
  soundSplash.addEventListener("click", () => tryStartAudio(howl, soundSplash, true));
  const volumeCtl = Components.getVolumeCtl();
  volumeCtl.addEventListener("input", (ev) => updateVolume(volumeCtl.value));
  tryStartAudio(howl, soundSplash, false);
  return howl;
}
function setupSocket(howl, wwamps) {
  const socket = Services.getIO();
  socket.on("connect", () => App.open());
  socket.on("sound", (evt) => App.sound(howl, wwamps, evt));
  socket.on("error", () => App.error());
}
function setupDisplay() {
  const accountNameInput = Components.getAccountNameInput();
  const accountNameDisplay = Components.getAccountNameDisplay();
  const storedAccount = localStorage.getItem("accountName");
  if (storedAccount) {
    accountNameInput.value = storedAccount;
    accountNameDisplay.innerText = storedAccount;
  }
  accountNameInput.addEventListener("input", () => {
    localStorage.setItem("accountName", accountNameInput.value);
    accountNameDisplay.innerText = accountNameInput.value;
  });
}
(function main() {
  const io2 = Services.getIO();
  const wwamps = defaultWwamps;
  const sprites = defaultSprites;
  const howl = setupAudio(sprites);
  setupUI(io2, wwamps);
  setupSocket(howl, wwamps);
  setupDisplay();
})();
//# sourceMappingURL=wwamp.js.map
