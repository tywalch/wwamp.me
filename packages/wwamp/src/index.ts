import type { Howl, Howler, HowlOptions } from "howler";
import type { Socket } from 'socket.io';

function newHowl(options: HowlOptions) {
    // @ts-ignore
    return new Howl(options);
}

function getHowler(): Howler {
    // @ts-ignore
    return Howler;
};

function getSocket(): Socket {
    // @ts-ignore
    return io;
}

export const Events = {
    join: "join",
    leave: "leave",
    sound: "sound",
    suppressed: "suppressed",
    reconnect: "reconnect",
    reconnect_attempt: "reconnect_attempt",
    connect_error: "connect_error",
    connect: "connect",
    disconnect: "disconnect",
    ping: "ping",
    pong: "pong",
    broadcast: "broadcast",
    error: "error",
    message: "message",
} as const

type Event = keyof typeof Events;

/* ============================================================================
   Helpers
============================================================================ */
const $ = <T extends HTMLElement>(sel: string, root: Document = document): T | null => root.querySelector(sel) as T | null;

/** Create an element from an HTML string. */
function htmlToElement(html: string): ChildNode {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  const node = template.content ? template.content.firstChild : template.firstChild;
  if (!node) {
    throw new Error("Failed to create element from HTML string");
  }
  return node;
}

/** Get the content of a <meta name="..."> tag (empty string if missing). */
function getMeta(name: string): string {
  const metas = document.getElementsByTagName("meta");
  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute("name") === name) {
      return metas[i].getAttribute("content") || "";
    }
  }
  return "";
}

/* ============================================================================
   Audio sprites (Howler config)
   NOTE: we set `src` below from `urls` (the original code generated needs that).
============================================================================ */
const Sounds = {
    "300": "300",
    "applause-lite": "applause-lite",
    "applause-more": "applause-more",
    awww: "awww",
    "bwamp-2": "bwamp-2",
    "bwamp-3": "bwamp-3",
    bwamp: "bwamp",
    "cha-ching": "cha-ching",
    cheers: "cheers",
    cowpaths: "cowpaths",
    "drum-roll": "drum-roll",
    fire: "fire",
    goose: "goose",
    "ham-horn-multi": "ham-horn-multi",
    "ham-horn": "ham-horn",
    horse: "horse",
    "lots-of-laughs": "lots-of-laughs",
    mindblown: "mindblown",
    "minecraft-death": "minecraft-death",
    no: "no",
    "nonono-cat": "nonono-cat",
    oooh: "oooh",
    "power-on": "power-on",
    powerful: "powerful",
    "sad-trombone": "sad-trombone",
    twinkle: "twinkle",
    yes: "yes",
} as const;

type Sound = keyof typeof Sounds;

type Sprites = {
    urls: string[];
    sprite: Record<Sound, [start: number, end: number]>;
    src: string[];
}

const spriteUrls = [
    "/audio/bwamp.pack.webm",
    "/audio/bwamp.pack.mp3",
];

const sprites: Sprites = {
  // Howler expects `src`, not `urls`
  src: spriteUrls,
  urls: spriteUrls,
  sprite: {
    "300": [0, 2536.0090702947846],
    "applause-lite": [4000, 3551.201814058957],
    "applause-more": [9000, 7540.861678004536],
    awww: [18000, 1344.0136054421785],
    "bwamp-2": [21000, 2886.8707482993195],
    "bwamp-3": [25000, 2959.4104308390038],
    bwamp: [29000, 3030.204081632654],
    "cha-ching": [34000, 1666.6666666666642],
    cheers: [37000, 1655.9863945578215],
    cowpaths: [40000, 2377.1428571428573],
    "drum-roll": [44000, 1388.6621315192756],
    fire: [47000, 2196.9841269841268],
    goose: [51000, 360],
    "ham-horn-multi": [53000, 2856.054421768704],
    "ham-horn": [57000, 1973.6961451247198],
    horse: [60000, 2106.6666666666692],
    "lots-of-laughs": [64000, 2194.285714285712],
    mindblown: [68000, 1524.9659863945624],
    "minecraft-death": [71000, 417.9591836734744],
    no: [73000, 804.9659863945635],
    "nonono-cat": [75000, 3636.9841269841318],
    oooh: [80000, 2545.6916099773252],
    "power-on": [84000, 4153.469387755109],
    powerful: [90000, 612.0181405895693],
    "sad-trombone": [92000, 4017.052154195014],
    twinkle: [98000, 3138.3673469387786],
    yes: [103000, 924.9659863945539],
  },
};

/* ============================================================================
   “Bwamps” catalog (buttons → sounds) and styling
============================================================================ */
const dangerColors = ["dark-green", "orange", "dark-red"];

type Bwamp = {
    id: string;
    danger: number;
    volume: number;
    sound: Sound;
}

/** Left column options. */
const bwampsLeft: Bwamp[] = [
  { id: "👏", danger: 0, volume: 1, sound: "applause-lite" },
  { id: "👏👏👏", danger: 0, volume: 0.8, sound: "applause-more" },
  { id: "😮", danger: 0, volume: 0.8, sound: "oooh" },
  { id: "🥁🥁🥁", danger: 0, volume: 1, sound: "drum-roll" },
  { id: "💪", danger: 1, volume: 1, sound: "powerful" },
  { id: "🎉", danger: 1, volume: 0.7, sound: "bwamp" },
  { id: "🎉🎉", danger: 1, volume: 0.7, sound: "bwamp-2" },
  { id: "🎉🎉🎉", danger: 1, volume: 0.7, sound: "bwamp-3" },
  { id: "🔥🔥🔥", danger: 2, volume: 1, sound: "fire" },
  { id: "😂🤭😂", danger: 2, volume: 1, sound: "lots-of-laughs" },
  { id: "⛏💀", danger: 2, volume: 1, sound: "minecraft-death" },
  { id: "🍖📯🔁", danger: 2, volume: 1, sound: "ham-horn-multi" },
];

/** Right column options. */
const bwampsRight: Bwamp[] = [
  { id: "👍", danger: 0, volume: 1, sound: "yes" },
  { id: "👎", danger: 0, volume: 1, sound: "no" },
  { id: "😻", danger: 0, volume: 1, sound: "awww" },
  { id: "✨", danger: 0, volume: 0.5, sound: "twinkle" },
  { id: "💰", danger: 1, volume: 1, sound: "cha-ching" },
  { id: "😰🎺", danger: 1, volume: 1, sound: "sad-trombone" },
  { id: "🥂🍻", danger: 1, volume: 1, sound: "cheers" },
  { id: "🦢", danger: 1, volume: 1, sound: "goose" },
  { id: "🤯🤯🤯", danger: 2, volume: 1, sound: "mindblown" },
  { id: "🐴🐴🐴", danger: 2, volume: 1, sound: "horse" },
  { id: "🐄🐄🐄", danger: 2, volume: 1, sound: "cowpaths" },
  { id: "🐈👎👎", danger: 2, volume: 1, sound: "nonono-cat" },
];

/** Lookup by emoji ID (e.g., "👏" → entry). */
const bwampsById = Object.create(null);

/* ============================================================================
   UI wiring (buttons)
============================================================================ */
function makeBwampButton(entry: Bwamp) {
  const title = entry.sound;
  const colorClass = dangerColors[entry.danger];

  const wrapper = htmlToElement(`
    <div class="pv1" style="width:48%">
      <div
        id="${entry.sound}:${entry.id}"
        class="db tc f3 link br-pill ba bw2 ph2 pv2 pv3-ns mb3 mb2-ns hover-bg-moon-gray ${colorClass} bg-white"
        style="user-select:none; white-space:nowrap; cursor:pointer"
        title="${title}"
      >${entry.id}</div>
    </div>
  `);

  wrapper?.firstChild?.addEventListener("click", (ev) => {
    send(entry.id);
    ev.preventDefault();
  });

  return wrapper;
}

function renderButtons() {
  const container = $("#bwamp_container");
  if (!container) return;

  const total = Math.max(bwampsLeft.length, bwampsRight.length);

  for (let i = 0; i < total; i++) {
    const left = bwampsLeft[i];
    const right = bwampsRight[i];
    if (left) {
      bwampsById[left.id] = left;
      const btn = makeBwampButton(left);
      if (btn) {
        container.appendChild(btn);
      }
    }
    if (right) {
      bwampsById[right.id] = right;
      const btn = makeBwampButton(right);
      if (btn) {
        container.appendChild(btn);
      }
    }
  }
}

/* ============================================================================
   Audio setup (Howler) + volume control
============================================================================ */
let sound: Howl | null = null;

/** Set Howler master volume (quadratic curve for nicer feel). */
function setMasterVolume(howler: Howler, vol: number) {
  // Store and reflect in UI
  localStorage.setItem("volume", String(vol));
  const slider = $<HTMLInputElement>("#volume");
  if (slider) {
    slider.value = `${vol}`;
  }
  // perceptual-ish: square the slider value
  howler.volume(vol * vol);
}

/** Initialize Howler + sprite, respecting autoplay restrictions. */
function initAudio(howler: Howler, { powerOnOnClick = true } = {}) {
  const splash = $("#sound-splash");

  // Start muted; we’ll restore saved volume when allowed.
  howler.volume(0);

  // Try to construct the Howl only when allowed to play.
  const tryStart = (viaClick) => {
    // If ctx is suspended, show splash to prompt user interaction.
    if (howler.state === "suspended") {
      if (splash) splash.style.display = "flex";
    }

    if (howler.state === "running" || viaClick) {
      const saved = parseFloat(localStorage.getItem("volume") || "0.5");
      setMasterVolume(howler, isFinite(saved) ? saved : 0.5);

      sound = newHowl(sprites);

      if (viaClick && powerOnOnClick) {
        // little “boop” to confirm audio is ready
        play({ sound: "power-on", volume: 0.3 });
      }

      if (splash) splash.style.display = "none";
    }
  };

  if (splash) {
    splash.addEventListener("click", () => tryStart(true));
  }

  tryStart(false);

  // Wire the volume slider
  const volumeCtl = $<HTMLInputElement>("#volume");
  if (volumeCtl) {
    volumeCtl.addEventListener("input", () => {
      const v = parseFloat(volumeCtl.value);
      if (!isFinite(v) || v < 0 || v > 1) return;
      setMasterVolume(howler, v);
    });

    // Initialize slider with saved or default value
    const saved = parseFloat(localStorage.getItem("volume") || "0.5");
    volumeCtl.value = isFinite(saved) ? `${saved}` : "0.5";
  }
}

/** Play a sprite entry: { sound: string, volume: number } */
function play(entry: { sound: string, volume: number }) {
  if (!sound) return;
  const id = sound.play(entry.sound);
  sound.volume(entry.volume, id);
}

/* ============================================================================
   Ephemeral “bubble” notifications
============================================================================ */
function showBubble(danger, name, text) {
  const container = $("#ephermal-bubbles");
  if (!container) return;

  // random horizontal position (left or right)
  let hpos = Math.random() * 100;
  const side = hpos < 50 ? "left" : "right";
  const style = `${side}: ${side === "left" ? hpos : 100 - hpos}%`;

  const ms = 2500 + Math.random() * 1000; // 2.5–3.5s
  const color = dangerColors[danger];

  const bubble = htmlToElement(`
    <div
      class="message db tc f3 br-pill ph4 pv3 white bg-${color}"
      style="
        position:fixed; ${style};
        animation-name:bubble;
        animation-duration:${ms}ms;
        animation-timing-function:linear;
        animation-fill-mode:forwards;
        pointer-events:none;
      "
    >
      <span style="text-shadow:2px 2px 3px rgba(0,0,0,.3);margin-right:3px;"></span>
      <span class="nowrap"></span>
    </div>
  `);

  if (bubble.firstChild) {
    bubble.firstChild.textContent = name;
  }
  if (bubble.lastChild) {
    bubble.lastChild.textContent = text;
  }

  container.appendChild(bubble);

  // cap at 50 children
  while (container.childElementCount > 50) {
    if (container.firstChild) {
        container.removeChild(container.firstChild);
    }
  }

  window.setTimeout(() => container.removeChild(bubble), ms);
}

/* ============================================================================
   Networking (Socket.IO)
   Events used:
     - client → server: "sound", { sound: string }
     - server → client: "join" | "leave" | "sound" | "suppressed"
       payloads:
         { who: string } // join/leave
         { who: string, sound: string, me?: boolean } // sound
         { who: string, sound: string, cooldown: number } // suppressed
============================================================================ */
let send = (_text: string) => {}; // redefined below

function setupSocketIOSend() {
  const statusEl = document.querySelector("#status");
  const userListEl = document.querySelector("#users");
  let users: string[] = [];

  const setStatus = (cls: string, text: string) => {
    if (!statusEl) return;
    statusEl.className = cls;
    statusEl.textContent = text;
  };

  const updateUsers = () => {
    if (!userListEl) return;
    userListEl.textContent = users.length < 20 ? users.join(", ") : String(users.length);
  };

  // Pass metadata to the server if you previously required it
//   const ver = encodeURIComponent(getMeta("version"));
//   const csrf = encodeURIComponent(getMeta("csrf"));

  // If you need a custom path or namespace, add `path` or use `io("/ns", { ... })`
  // const socket = io({ path: "/socket.io", auth: { v: ver, csrf } });
  
  const socket = getSocket();

  // Publish
  send = (text: string) => {
    socket.emit(Events.sound, { sound: text });
  };

  // Connection lifecycle
  socket.on(Events.connect, () => setStatus("green", "connected"));
  socket.on(Events.disconnect, () => {
    setStatus("", "disconnected");
    users = [];
    updateUsers();
  });
  socket.on(Events.connect_error, () => setStatus("red", "error"));
  socket.on(Events.reconnect, () => setStatus("green", "connected"));
  socket.on(Events.reconnect_attempt, () => setStatus("", "reconnecting…"));

  // Server events
  socket.on(Events.join, ({ who }: { who: string }) => {
    if (!who) return;
    users.push(who);
    users.sort();
    updateUsers();
  });

  socket.on("leave", ({ who }) => {
    if (!who) return;
    let removed = false;
    users = users.filter((u) => {
      if (!removed && u === who) {
        removed = true;
        return false;
      }
      return true;
    });
    updateUsers();
  });

  socket.on("sound", ({ who, sound: soundKey, me }: { who: string, sound: string, me: boolean }) => {
    const entry = bwampsById[soundKey];
    if (!entry) {
      console.log(who, "no such bwamp", soundKey);
      return;
    }
    showBubble(entry.danger, who, soundKey);
    play(entry);
    // if (window.FS?.event) {
    //   try {
    //     window.FS.event("bwamp", {
    //       id_str: entry.id,
    //       sound_str: entry.sound,
    //       who_str: who,
    //       me_bool: !!me,
    //     });
    //   } catch {}
    // }
  });

  socket.on("suppressed", ({ who, sound: soundKey, cooldown }) => {
    const entry = bwampsById[soundKey];
    if (!entry) {
      console.log(who, "no such bwamp", soundKey);
      return;
    }
    // if (window.FS?.event) {
    //   try {
    //     window.FS.event("suppressed", {
    //       id_str: entry.id,
    //       sound_str: entry.sound,
    //       cooldown_real: cooldown,
    //     });
    //   } catch {}
    // }
    console.log(who, "suppressed", soundKey, cooldown);
  });

  // Backward-compat: if your server still sends the old shape on a single channel
  // { what: 0|1|2|3, who, sound, me, cooldown }
  type Message = {
    what: 0|1|2|3;
    who: string;
    sound: string;
    me: boolean;
    cooldown: number;
  }
  
  socket.on(Events.message, (evt: Message) => {
    const JOIN = 0, LEAVE = 1, SOUND = 2, SUPPRESSED = 3;
    if (!evt || !evt.who && evt.what !== SUPPRESSED) return;

    switch (evt.what) {
      case JOIN:
        socket.emit(Events.join, { who: evt.who }); // (optional echo, or remove)
        socket.emit; // no-op—just to show parity
        users.push(evt.who);
        users.sort();
        updateUsers();
        break;
      case LEAVE: {
        let removed = false;
        users = users.filter((u) => {
          if (!removed && u === evt.who) {
            removed = true;
            return false;
          }
          return true;
        });
        updateUsers();
        break;
      }
      case SOUND: {
        const entry = bwampsById[evt.sound];
        if (!entry) return;
        showBubble(entry.danger, evt.who, evt.sound);
        play(entry);
        // if (window.FS?.event) {
        //   try {
        //     window.FS.event("bwamp", {
        //       id_str: entry.id,
        //       sound_str: entry.sound,
        //       who_str: evt.who,
        //       me_bool: !!evt.me,
        //     });
        //   } catch {}
        // }
        break;
      }
      case SUPPRESSED: {
        const entry = bwampsById[evt.sound];
        if (!entry) return;
        // if (window.FS?.event) {
        //   try {
        //     window.FS.event("suppressed", {
        //       id_str: entry.id,
        //       sound_str: entry.sound,
        //       cooldown_real: evt.cooldown,
        //     });
        //   } catch {}
        // }
        break;
      }
    }
  });
}

/* ============================================================================
   Bootstrap
============================================================================ */
(function main() {
    try {
    renderButtons();
    initAudio({ powerOnOnClick: true });
  
    if (getMeta("sandbox")) {
      // local-only mode (no server)
      send = (text: string) => {
        const entry = bwampsById[text];
        if (!entry) return;
        showBubble(entry.danger, "user", text);
        play(entry);
      };
    } else {
      // Socket.IO version
      setupSocketIOSend();
    }
  } catch (error: unknown) {
    console.error(error);
  } finally {
    console.log("BWAMP loaded");
  }
  })();
  