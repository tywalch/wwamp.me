type Sprites = {
    urls: string[];
    src: string[];
    sprite: Record<string, [start: number, end: number]>;
}

type WWamp = {
    id: string;
    danger: number;
    volume: number;
    sound: string;
}

const defaultSprites: Sprites = {
    urls: [
        "/audio/audio.pack.webm",
        "/audio/audio.pack.mp3"
    ],
    src: [
        "/audio/audio.pack.webm",
        "/audio/audio.pack.mp3"
    ],
    sprite: {
        "300": [0,2536.0090702947846 ],
        "applause-lite": [4000,3551.201814058957 ],
        "applause-more": [9000,7540.861678004536 ],
        "awww": [18000,1344.0136054421785 ],
        "bwamp-2": [21000,2886.8707482993195 ],
        "bwamp-3": [25000,2959.4104308390038 ],
        "bwamp": [29000,3030.204081632654 ],
        "cha-ching": [34000,1666.6666666666642 ],
        "cheers": [37000,1655.9863945578215 ],
        "cowpaths": [40000,2377.1428571428573 ],
        "drum-roll": [44000,1388.6621315192756 ],
        "fire": [47000,2196.9841269841268 ],
        "goose": [51000,359.99999999999943 ],
        "ham-horn-multi": [53000,2856.054421768704 ],
        "ham-horn": [57000,1973.6961451247198 ],
        "horse": [60000,2106.6666666666692 ],
        "lots-of-laughs": [64000,2194.285714285712 ],
        "mindblown": [68000,1524.9659863945624 ],
        "minecraft-death": [71000,417.9591836734744 ],
        "no": [73000,804.9659863945635 ],
        "nonono-cat": [75000,3636.9841269841318 ],
        "oooh": [80000,2545.6916099773252 ],
        "power-on": [84000,4153.469387755109 ],
        "powerful": [90000,612.0181405895693 ],
        "sad-trombone": [92000,4017.052154195014 ],
        "twinkle": [98000,3138.3673469387786],
        "yes": [103000,924.9659863945539]
    }
}

const defaultWwamps: WWamp[] = [
    {
      id: "👏",
      danger: 0, volume: 1,
      sound: "applause-lite",
    },
    {
      id: "👍",
      danger: 0, volume: 1,
      sound: "yes",
    },
    {
      id: "👏👏👏",
      danger: 0, volume: 0.8,
      sound: "applause-more",
    },
    {
      id: "👎",
      danger: 0, volume: 1,
      sound: "no",
    },
    {
      id: "😮",
      danger: 0, volume: 0.8,
      sound: "oooh",
    },
    {
      id: "😻",
      danger: 0, volume: 1,
      sound: "awww",
    },

    {
      id: "🥁🥁🥁",
      danger: 0, volume: 1,
      sound: "drum-roll",
    },
    {
      id: "✨",
      danger: 0, volume: 0.5,
      sound: "twinkle",
    },

    {
      id: "💪",
      danger: 1, volume: 1,
      sound: "powerful",
    },
    {
      id: "💰",
      danger: 1, volume: 1,
      sound: "cha-ching",
    },

    {
      id: "🎉",
      danger: 1, volume: 0.7,
      sound: "bwamp",
    },
    {
      id: "😰🎺",
      danger: 1, volume: 1,
      sound: "sad-trombone",
    },

    {
      id: "🎉🎉",
      danger: 1, volume: 0.7,
      sound: "bwamp-2",
    },
    {
      id: "🥂🍻",
      danger: 1, volume: 1,
      sound: "cheers",
    },

    {
      id: "🎉🎉🎉",
      danger: 1, volume: 0.7,
      sound: "bwamp-3",
    },
    {
      id: "🦢",
      danger: 1, volume: 1,
      sound: "goose",
    },

    {
      id: "🔥🔥🔥",
      danger: 2, volume: 1,
      sound: "fire",
    },
    {
      id: "🤯🤯🤯",
      danger: 2, volume: 1,
      sound: "mindblown",
    },    

    {
      id: "😂🤭😂",
      danger: 2, volume: 1,
      sound: "lots-of-laughs",
    },
    {
      id: "🐴🐴🐴",
      danger: 2, volume: 1,
      sound: "horse",
    },

    {
      id: "⛏💀",
      danger: 2, volume: 1,
      sound: "minecraft-death",
    },
    {
      id: "🐄🐄🐄",
      danger: 2, volume: 1,
      sound: "cowpaths",
    },

    {
      id: "🍖📯🔁",
      danger: 2, volume: 1,
      sound: "ham-horn-multi",
    },
    {
      id: "🐈👎👎",
      danger: 2, volume: 1,
      sound: "nonono-cat",
    },
  ]

function htmlToElement<T extends ChildNode>(html: string): T {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    if (template.content && template.content.firstChild) {
        return template.content.firstChild as T;
    } else if (template.firstChild) {
        return template.firstChild as T;
    } else {
        throw new Error('No child node found');
    }
}

function getMeta(metaName: string): string {
    const metas = document.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i++) {
        const el = metas[i];
        if (el && el.getAttribute('name') === metaName) {
        return el.getAttribute('content') || '';
        }
    }
    return '';
}

// type GetSpritesResponse = {
//     data: Sprites;
// }

// async function getSprites(): Promise<GetSpritesResponse> {
//     const response = await fetch('/sprites');
//     return response.json();
// }

// type GetWwampsResponse = {
//     data: {
//         wwamps: WWamp[];
//     };
// }

// async function getWwamps(): Promise<GetWwampsResponse> {
//     const response = await fetch('/wwamps');
//     return response.json();
// }

function toElementId(wwamp: WWamp): string {
    return `${wwamp.sound}:${wwamp.id}`;
}

const dangerColors = ["dark-green", "orange", "dark-red"];

function getBwampContainer(): HTMLElement {
    const el = document.getElementById('bwamp_container');
    if (!el) {
        throw new Error('Bwamp container not found');
    }
    return el;
}

const Components = {
    getBwampContainer(): HTMLElement {
        const el = document.getElementById('bwamp_container');
        if (!el) {
            throw new Error('Bwamp container not found');
        }
        return el;
    },
    getVolumeCtl(): HTMLInputElement {
        const el = document.getElementById('volume');
        if (!el) {
            throw new Error('Volume control not found');
        }
        return el as HTMLInputElement;
    },
    getSoundSplash(): HTMLElement {
        const el = document.getElementById('sound-splash');
        if (!el) {
            throw new Error('Sound splash not found');
        }
        return el;
    },
    getAccountNameInput(): HTMLInputElement {
        const el = document.getElementById('account');
        if (!el) {
            throw new Error('Account name not found');
        }
        return el as HTMLInputElement;
    },
    getBwampElement(wwamp: WWamp): HTMLElement | null {
        const elId = toElementId(wwamp);
        const el = document.getElementById(elId);
        if (!el) {
            throw new Error('Bwamp element not found');
        }
        return el;
    },
    getEphemeralBubbles(): HTMLElement {
        const el = document.getElementById('ephermal-bubbles');
        if (!el) {
            throw new Error('Ephemeral bubbles not found');
        }
        return el;
    },
    getStatus(): HTMLElement {
        const el = document.getElementById('status');
        if (!el) {
            throw new Error('Status not found');
        }
        return el;
    },
    getUserList(): HTMLElement {
        const el = document.getElementById('users');
        if (!el) {
            throw new Error('User list not found');
        }
        return el;
    },
    getAccountNameDisplay(): HTMLElement {
        const el = document.getElementById('account-display');
        if (!el) {
            throw new Error('Account name display not found');
        }
        return el;
    }
}

type HowlerService = {
    volume: (volume: number, id?: number) => void;
    state: string;
}

type HowlInstance = {
    play: (sound: string) => number;
    volume: (volume: number, id?: number) => void;
}

type SocketIO = {
    emit: (event: string, data: any) => void;
    on: (event: string, callback: (data: any) => void) => void;
}

const Services = {
    getHowler(): HowlerService {
        // @ts-ignore
        return Howler;
    },
    newHowl(sprites: Sprites): HowlInstance {
        // @ts-ignore
        return new Howl(sprites);
    },
    getIO(): SocketIO {
        // @ts-ignore
        return io();
    }
}

type Event = {
    who: string;
    what: number;
    sound: string;
}

const App = {
    play(howl: HowlInstance, sound: string, volume: number) {
        const id = howl.play(sound);
        howl.volume(volume, id);
    },
    show(wwamp: WWamp, who: string) {
        const container = Components.getEphemeralBubbles();
        let rand = Math.random() * 100;
        const hpos = rand < 50 ? `left: ${rand}%;` : `right: ${100 - rand}%;`;
        const animate_ms = 2500 + 1000 * Math.random(); // 2.5 - 3.5s
  
        const bubble = htmlToElement<HTMLElement>(
          '<div class="message db tc f3 br-pill ph4 pv3 white bg-' + dangerColors[wwamp.danger] + '"' +
          'style="position: fixed; ' + hpos + ';' +
          'animation-name: bubble;' +
          'animation-duration: ' + animate_ms + 'ms;' +
          'animation-timing-function: linear;' +
          'animation-fill-mode: forwards;' +
          'pointer-events: none;">' +
          '<span style="text-shadow:2px 2px 3px rgba(0,0,0,.3);margin-right:3px;"></span> <span class="nowrap"></span>' +
          '</div>');
        // @ts-ignore
        bubble.firstChild.innerText = who;
        // @ts-ignore
        bubble.lastChild.innerText = wwamp.id;
  
        container.appendChild(bubble);
        while (container.childElementCount > 50 && container.firstChild) {
          container.removeChild(container.firstChild);
        }
        window.setTimeout(function() {
          container.removeChild(bubble)
        }, animate_ms);
    },
    getAccountName() {
        return Components.getAccountNameInput().value || 'anonymous';
    },
    send(socket: SocketIO, wwamp: WWamp) {
        socket.emit('sound', JSON.stringify({
            who: this.getAccountName(),
            what: 2,
            sound: wwamp.sound,
        }));
    },
    open() {
        const state = Components.getStatus();
        state.className = "green";
        state.innerText = "connected";
    },
    sound(howl: HowlInstance, wwamps: WWamp[], event: Event) {
        const wwamp = wwamps.find(w => w.sound === event.sound);
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
}

function createBwampElement(wwamp: WWamp): HTMLElement {
    const elId = toElementId(wwamp);
    const linkTitle = wwamp.sound.split('.');
    const inner = htmlToElement<HTMLElement>(`<div style="user-select: none; white-space: nowrap; cursor: pointer" class="db tc f3 link br-pill ba bw2 ph2 pv2 pv3-ns mb3 mb2-ns hover-bg-moon-gray bg-white"></div>`);
    inner.id = elId;
    inner.title = linkTitle[0] ?? '';
    inner.classList.add(`${dangerColors[wwamp.danger]}`);
    inner.textContent = wwamp.id;
    const outer = htmlToElement<HTMLElement>(`<div class="pv1" style="width:48%"></div>`);
    outer.appendChild(inner);
    getBwampContainer().appendChild(outer);
    return outer;
}

function addBwampElement(socket: SocketIO, wwamp: WWamp) {
    let input = Components.getBwampElement(wwamp);
    console.log(!!input, wwamp);
    if (!input) {
        input = createBwampElement(wwamp);
    }
    input.addEventListener('click', (e) => {
        App.send(socket, wwamp);
        e.preventDefault();
    });   
}

function setupUI(socket: SocketIO, wwamps: WWamp[]) {
    for (const wwamp of wwamps) {
        addBwampElement(socket, wwamp);
    }
}

function setupAudio(sprites: Sprites) {
    const howl = Services.newHowl(sprites);

    function tryStartAudio(howl: HowlInstance, soundSplash: HTMLElement, click: boolean) {
        const howler = Services.getHowler();
        howler.volume(0);
        if (howler.state == "suspended") {
            soundSplash.style.display = 'flex';
        }
        if (howler.state == "running" || click) {
            updateVolume(localStorage.getItem("volume") ?? '0.5');
            if (click) {
                App.play(howl, "power-on", 0.3);
            }
            soundSplash.style.display = 'none';
        }
    }

    function updateVolume(currentVolume: string) {
        let vol = 0.5;
        if (currentVolume) {
            const v = parseFloat(currentVolume);
            if (v >= 0 && v <= 1.0) {
                vol = v;
            }
        }
        Components.getVolumeCtl().value = vol.toString();
        localStorage.setItem("volume", vol.toString());
        Services.getHowler().volume(vol * vol);
    }

    const soundSplash = Components.getSoundSplash();
    soundSplash.addEventListener('click', () => tryStartAudio(howl, soundSplash, true));
    const volumeCtl = Components.getVolumeCtl();
    volumeCtl.addEventListener('input', (ev) => updateVolume(volumeCtl.value));

    tryStartAudio(howl, soundSplash, false);

    return howl;
}

function setupSocket(howl: HowlInstance, wwamps: WWamp[]) {
    const socket = Services.getIO();
    socket.on("connect", () => App.open());
    socket.on("sound", (evt) => App.sound(howl, wwamps, evt));
    socket.on("error", () => App.error())
}

function setupDisplay() {
    const accountNameInput = Components.getAccountNameInput();
    const accountNameDisplay = Components.getAccountNameDisplay();
    const storedAccount = localStorage.getItem('accountName');
    if (storedAccount) {
        accountNameInput.value = storedAccount;
        accountNameDisplay.innerText = storedAccount;
    }
    accountNameInput.addEventListener('input', () => {
        localStorage.setItem('accountName', accountNameInput.value);
        accountNameDisplay.innerText = accountNameInput.value;
    });
}

(function main() {
    const io = Services.getIO();
    const wwamps = defaultWwamps;
    const sprites = defaultSprites;
    const howl = setupAudio(sprites);
    setupUI(io, wwamps);
    setupSocket(howl, wwamps);
    setupDisplay();
})();