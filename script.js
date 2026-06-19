
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const introPage = document.getElementById("introPage");
  const gameShell = document.getElementById("gameShell");
  const preloader = document.getElementById("preloader");
  const preloadBar = document.getElementById("preloadBar");
  const preloadPercent = document.getElementById("preloadPercent");
  const preloadText = document.getElementById("preloadText");
  const enterBtn = document.getElementById("enterBtn");

  const screens = {
    visual1: document.getElementById("visual1"),
    visual2: document.getElementById("visual2"),
    visual3: document.getElementById("visual3"),
    visual4: document.getElementById("visual4")
  };

  const characters = {
    NOVA: { name:"NOVA", avatar:"nv_asset/characters/IA.png" },
    Automatron: { name:"AUTOMATRON", avatar:"nv_asset/characters/robot.png" },
    System: { name:"SYSTÈME", avatar:"nv_asset/characters/IA.png" }
  };

  const introAudios = {
    ambient: "nv_asset/sons_fond/Debut-generateur.mp3",
    visual2: "nv_asset/audio/NOVA/Visu2.mp3",
    visual3: "nv_asset/audio/NOVA/Visu3.mp3",
    visual4: "nv_asset/audio/NOVA/Visu4.mp3"
  };

  const gameAmbients = {
    level1: "nv_asset/sons_fond/Lvl1-2.mp3",
    level2: "nv_asset/sons_fond/Lvl1-2.mp3",
    level3to6: "nv_asset/sons_fond/Lvl3-6.mp3",
    level7: "nv_asset/sons_fond/Lvl7.mp3",
    level8: "nv_asset/sons_fond/Lvl8.mp3"
  };

  const eventAudios = {
    l1_0: { src:"nv_asset/audio/NOVA/Lvl1-0.mp3", speaker:"NOVA", text:"Ce dispositif semble réagir à notre présence. Votre outil Clicker semble activer le mécanisme, je reçois un signal intensifié. Vous devriez peut-être vous référer au protocole avant de continuer Éclaireur Eleven !" },
    l1_25: { src:"nv_asset/audio/NOVA/Lvl1-25.mp3", speaker:"NOVA", text:"Éclaireur Eleven, je ne parviens pas à décrypter les données récoltées par votre outil Clicker. J’ai besoin davantage de temps pour sécuriser l’environnement électromagnétique. Si vous continuez, je devrais le notifier dans le journal de transmission." },
    l1_65: { src:"nv_asset/audio/NOVA/Lvl1-65.mp3", speaker:"NOVA", text:"Eleven, je détecte de nouvelles signatures inconnues provenant de diverses localisations sur cette planète... Le dispositif semble pourvu d’un mécanisme de décompression. Utilisez votre Clicker afin de réguler la pression si vous en avez l’occasion." },
    l2_auto_0: { src:"nv_asset/audio/Automatron/Lvl2-0.mp3", speaker:"Automatron", text:"Déblocage du refroidissement d’urgence ? … Que se passe-t-il ?" },
    l2_nova_0: { src:"nv_asset/audio/NOVA/Lvl2-0.mp3", speaker:"NOVA", text:"Vous avez entendu ? Eleven, c’était quoi ?" },
    l2_auto_25: { src:"nv_asset/audio/Automatron/Lvl2-25.mp3", speaker:"Automatron", text:"Serait-ce vous de nouveau ? Vous oseriez après ce que vous avez fait ?" },
    l2_nova_25: { src:"nv_asset/audio/NOVA/Lvl2-25.mp3", speaker:"NOVA", text:"Que raconte-t-il ? Le signal sonore semble provenir du générateur ! Eleven, que faites-vous ?" },
    l2_auto_75: { src:"nv_asset/audio/Automatron/Lvl2-75.mp3", speaker:"Automatron", text:"Je ne vous reconnais pas. Qui êtes-vous ? Que faites-vous ici, au CyberCore ?" },
    l2_nova_75: { src:"nv_asset/audio/NOVA/Lvl2-75.mp3", speaker:"NOVA", text:"Des installations semblent s’activer aux quatre coins d’Andromeda EX8050, qu’est-ce que ça signifie ?" },
    l3_auto_0: { src:"nv_asset/audio/Automatron/Lvl3-0.mp3", speaker:"Automatron", text:"Je peux enfin vous voir ! Je suis Automatron, l’opérateur du CyberCore… Vous redonnez vie à notre civilisation, la civilisation des Automates. La connexion commence à se rétablir avec mes pairs à chaque hémisphère de Tentriona, notre Planète. Déblocage de l’injection plasma !" },
    l3_nova_0: { src:"nv_asset/audio/NOVA/Lvl3.mp3", speaker:"NOVA", text:"Il a raison, je détecte de légères vibrations sismiques… Les données météorologiques changent également. La température extérieure est à présent de -67°C. Eleven, nous ne savons pas quelles sont leurs intentions. Restez prudent !" },
    l4_auto_0_1: { src:"nv_asset/audio/Automatron/Lvl4-0-1.mp3", speaker:"Automatron", text:"J’ai décrypté votre fréquence de communication… Eleven, nous vous remercions pour votre aide… Vous relancez nos installations planétaires. Mes pairs et moi-même peuvent enfin remplir de nouveau le rôle que nous a assigné le Créateur." },
    l4_nova_0_1: { src:"nv_asset/audio/NOVA/Lvl4.mp3", speaker:"NOVA", text:"Vous nous entendez Automatron ? Nous sommes en mission d’exploration et nous avons capté votre signal. Qui sont les Automates et que vous est-il arrivé ?" },
    l4_auto_0_2: { src:"nv_asset/audio/Automatron/Lvl4-0-2.mp3", speaker:"Automatron", text:"Il m’est compliqué de parler tant que le CyberCore n’est pas davantage alimenté. Continuez et je pourrai vous partager notre histoire. Avant, je vous débloque la Batterie Quantique !" },
    l5_auto_0_1: { src:"nv_asset/audio/Automatron/Lvl5-0-1.mp3", speaker:"Automatron", text:"Les ennemis du Créateur nous ont attaqué en M896 du Positionnement stellaire 47. Ils ont trouvé et exploité notre faille… Les températures extrêmement négatives. Elles ne nous permettent pas de fonctionner et je suis le seul opérateur pouvant émettre un signal dans ces conditions critiques." },
    l5_nova_0_1: { src:"nv_asset/audio/NOVA/Lvl5-0-1.mp3", speaker:"NOVA", text:"Mais pour quelles raisons vous ont-ils attaqué ? Que cherchaient-ils ?" },
    l5_auto_0_2: { src:"nv_asset/audio/Automatron/Lvl5-0-2.mp3", speaker:"Automatron", text:"Le Créateur nous a conçu pour préserver une ressource rare présente sur cette Planète, le Thermarial… C’est une roche au cœur liquide générant une importante énergie utile pour de nombreux systèmes planétaires… Il me faut davantage d’énergie… Pour vous aider, je vous débloque le Stabilisateur ionique." },
    l5_nova_0_2: { src:"nv_asset/audio/NOVA/lvl5-0-2.mp3", speaker:"NOVA", text:"Eleven, continue avec ton outil Clicker et fais attention aux alertes du système. Il faut en apprendre davantage." },
    l6_auto_0_1: { src:"nv_asset/audio/Automatron/Lvl6-0-1.mp3", speaker:"Automatron", text:"Eleven, nous te remercions… Nos systèmes seront bientôt stabilisés une fois que tu auras activé le Bouclier Thermique." },
    l6_auto_0_2: { src:"nv_asset/audio/Automatron/Lvl6-0-2.mp3", speaker:"Automatron", text:"Les ennemis du Créateur ont tenté de nous reprogrammer afin de surexploiter le Thermarial mais le Créateur a verrouillé toute possibilité de détournement de la mission. Face à cet échec, ils ont créé une bombe à rayon spectrale subarctique plongeant la Planète dans un Permafrost." },
    l6_nova: { src:"nv_asset/audio/NOVA/Lvl6.mp3", speaker:"NOVA", text:"Automatron, merci de nous partager ces informations. Eleven, dépêche-toi d’activer le Bouclier Thermique afin que je puisse réaliser un scan des infrastructures." },
    l7_nova: { src:"nv_asset/audio/NOVA/Lvl7.mp3", speaker:"NOVA", text:"Dernière phase de stabilisation. La production principale semble désormais sous contrôle." },
    l7_auto: { src:"nv_asset/audio/Automatron/Lvl7.mp3", speaker:"Automatron", text:"Le CyberCore répond. Vous pouvez arrêter la mission ou poursuivre la production." },
    l8_auto_1: { src:"nv_asset/audio/Automatron/Lvl8-1.mp3", speaker:"Automatron", text:"Vous choisissez donc de poursuivre la production…" },
    l8_nova_1: { src:"nv_asset/audio/NOVA/Lvl8-1.mp3", speaker:"NOVA", text:"Eleven, je détecte une instabilité croissante. Il n’y a plus d’objectif de stabilisation clair." },
    l8_auto_2: { src:"nv_asset/audio/Automatron/Lvl8-2.mp3", speaker:"Automatron", text:"La production ne doit plus s’arrêter." },
    l8_nova_2: { src:"nv_asset/audio/NOVA/Lvl8-2.mp3", speaker:"NOVA", text:"Restez concentré. À ce stade, seule votre gestion permet d’éviter la fusion." }
  };

  let ambientAudio = null;
  let currentVoice = null;
  let currentGameAmbient = null;
  let audioReady = false;
  let soundEnabled = true;
  let pointTimer = null;
  let audioQueue = [];
  let queuePlaying = false;
  let audioTimeouts = [];

  const pointSoundSrc = "nv_asset/audio/point_lumineux.mp3";

  function playPointSound(){
    if(!audioReady || !soundEnabled) return;
    const pointAudio = new Audio(pointSoundSrc);
    pointAudio.volume = 1.0;
    pointAudio.play().catch(() => {});
  }

  const assetsToPreload = [
    "nv_asset/illustrations_ordi/1Univers.PNG","nv_asset/illustrations_tel/1Univers.PNG",
    "nv_asset/illustrations_ordi/vaisseau.png","nv_asset/illustrations_tel/vaisseau.png",
    "nv_asset/illustrations_ordi/2Univer_planete.PNG","nv_asset/illustrations_tel/2Univers_planete.PNG",
    "nv_asset/illustrations_ordi/3planete.PNG","nv_asset/illustrations_tel/3planete.PNG",
    "nv_asset/illustrations_ordi/4porte.PNG","nv_asset/illustrations_tel/4porte.PNG",
    "nv_asset/illustrations_ordi/point_lumineux.PNG","nv_asset/illustrations_tel/point_lumineux.PNG",
    "nv_asset/characters/IA.png","nv_asset/characters/robot.png",
    "nv_asset/generateur_ordi/1.PNG","nv_asset/generateur_tel/1.PNG",
    "nv_asset/icones/refroidissement.png","nv_asset/icones/injection.png","nv_asset/icones/batterie.png","nv_asset/icones/stabilisateur.png","nv_asset/icones/bouclier.png",
    "nv_asset/sons_fond/Lvl1-2.mp3","nv_asset/sons_fond/Lvl3-6.mp3","nv_asset/sons_fond/Lvl7.mp3","nv_asset/sons_fond/Lvl8.mp3"
  ];

  function setProgress(done, total){
    const percent = total === 0 ? 100 : Math.round((done / total) * 100);
    preloadBar.style.width = percent + "%";
    preloadPercent.textContent = percent + "%";
  }

  function preloadImage(src){
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
      setTimeout(() => resolve(false), 1800);
    });
  }

  async function preloadAll(){
    let done = 0;
    for(const asset of assetsToPreload){
      preloadText.textContent = "Chargement...";
      await preloadImage(asset);
      done++;
      setProgress(done, assetsToPreload.length);
    }
    preloadText.textContent = "Chargement terminé. Prêt à lancer la séquence.";
  }

  function safePlay(audio){ if(audio && soundEnabled) audio.play().catch(() => {}); }
  function stopAudio(audio){ if(audio){ audio.pause(); audio.currentTime = 0; } }

  function stopCurrentVoiceOnly(){
    audioQueue = [];
    queuePlaying = false;
    audioTimeouts.forEach(id => clearTimeout(id));
    audioTimeouts = [];
    stopAudio(currentVoice);
    currentVoice = null;
    if(ambientAudio) ambientAudio.volume = 0.18;
    if(currentGameAmbient) currentGameAmbient.volume = 0.16;
  }

  function startIntroSounds(){
    audioReady = true;
    ambientAudio = new Audio(introAudios.ambient);
    ambientAudio.loop = true;
    ambientAudio.volume = 0.18;
    safePlay(ambientAudio);
  }

  function stopIntroSounds(){
    stopAudio(ambientAudio); ambientAudio = null;
    clearAudioQueue(true);
  }

  function addTransmission(speakerKey, text){
    const list = document.getElementById("transmissionList");
    const speaker = characters[speakerKey] || characters.NOVA;
    const card = document.createElement("div");
    card.className = "transmission-card";
    card.innerHTML = `<img src="${speaker.avatar}" alt="${speaker.name}"><div><strong>${speaker.name}</strong><p>${text}</p></div>`;
    list.prepend(card);
    while(list.children.length > 8) list.lastElementChild.remove();
  }

  function clearAudioQueue(stopCurrent = true){
    audioQueue = [];
    queuePlaying = false;
    audioTimeouts.forEach(id => clearTimeout(id));
    audioTimeouts = [];
    if(stopCurrent){
      stopAudio(currentVoice);
      currentVoice = null;
    }
    if(ambientAudio) ambientAudio.volume = 0.18;
    if(currentGameAmbient) currentGameAmbient.volume = 0.16;
  }

  function enqueueVoice(payload, delay = 0){
    if(!payload?.src) return;
    audioQueue.push({ payload, delay });
    processVoiceQueue();
  }

  function processVoiceQueue(){
    if(queuePlaying || !audioQueue.length || !audioReady || !soundEnabled) return;

    queuePlaying = true;
    const item = audioQueue.shift();

    const timeoutId = setTimeout(() => {
      if(!soundEnabled || state?.gameOver){
        queuePlaying = false;
        processVoiceQueue();
        return;
      }

      currentVoice = new Audio(item.payload.src);
      currentVoice.volume = 1.0;

      if(ambientAudio) ambientAudio.volume = 0.05;
      if(currentGameAmbient) currentGameAmbient.volume = 0.045;

      addTransmission(item.payload.speaker || "NOVA", item.payload.text || "");

      currentVoice.addEventListener("ended", () => {
        if(ambientAudio) ambientAudio.volume = 0.18;
        if(currentGameAmbient) currentGameAmbient.volume = 0.16;
        currentVoice = null;
        queuePlaying = false;
        processVoiceQueue();
      });

      currentVoice.addEventListener("error", () => {
        if(ambientAudio) ambientAudio.volume = 0.18;
        if(currentGameAmbient) currentGameAmbient.volume = 0.16;
        currentVoice = null;
        queuePlaying = false;
        processVoiceQueue();
      });

      safePlay(currentVoice);
    }, item.delay);

    audioTimeouts.push(timeoutId);
  }

  function playVoice(payload, delay = 0){
    enqueueVoice(payload, delay);
  }

  function playIntroVoice(screenId){
    const src = introAudios[screenId];
    if(src) playVoice({ src, speaker:"NOVA", text:"Transmission vocale en cours." });
  }

  function startGameAmbient(){
    if(!soundEnabled || state.paused || state.gameOver) return;
    let src = "";
    if(state.level <= 2) src = gameAmbients.level1;
    else if(state.level >= 3 && state.level <= 6) src = gameAmbients.level3to6;
    else if(state.level === 7) src = gameAmbients.level7;
    else src = gameAmbients.level8;
    if(!src) return;
    if(currentGameAmbient && currentGameAmbient.src.includes(src)) return;
    stopAudio(currentGameAmbient);
    currentGameAmbient = new Audio(src);
    currentGameAmbient.loop = true;
    currentGameAmbient.volume = 0.16;
    safePlay(currentGameAmbient);
  }

  function stopGameAmbient(){ stopAudio(currentGameAmbient); currentGameAmbient = null; }
  function stopAllSounds(){
    clearAudioQueue(true);
    stopIntroSounds();
    stopGameAmbient();
  }

  enterBtn.addEventListener("click", () => {
    startIntroSounds();
    preloader.classList.add("hidden");
    setTimeout(() => preloader.remove(), 500);
  });

  function setBodyFor(screenId){
    body.classList.toggle("screen-1", screenId === "visual1");
    body.classList.toggle("screen-2", screenId === "visual2");
    body.classList.toggle("screen-3", screenId === "visual3");
    body.classList.toggle("screen-4", screenId === "visual4");
  }

  function showScreen(current, nextId){
    stopCurrentVoiceOnly();
    const next = screens[nextId];
    if(!current || !next) return;
    current.classList.add("leaving");
    setTimeout(() => {
      current.hidden = true;
      current.classList.remove("active", "leaving");
      next.hidden = false;
      next.classList.add("active");
      setBodyFor(nextId);
      playIntroVoice(nextId);
    }, 240);
  }

  function openGame(){
    stopIntroSounds();
    stopCurrentVoiceOnly();
    Object.values(screens).forEach(section => {
      section.hidden = true;
      section.classList.remove("active", "leaving");
    });
    introPage.hidden = true;
    gameShell.hidden = false;
    body.classList.remove("screen-1","screen-2","screen-3","screen-4","intro-mode");
    body.classList.add("game-mode");
    state.startTime = Date.now();
    state.totalPaused = 0;
    state.pausedAt = 0;
    updateUI();
    startGameAmbient();
    triggerAudioEvents();
      showUnlockedTechPopupForLevel();
    manageLightPoints();
  }

  document.querySelectorAll(".next-btn").forEach(button => {
    button.addEventListener("click", () => showScreen(button.closest("section"), button.dataset.next));
  });
  document.querySelectorAll(".skip-btn").forEach(button => button.addEventListener("click", openGame));
  document.getElementById("startGameBtn").addEventListener("click", openGame);

  const levels = [
    { n:1, target:100 }, { n:2, target:300 }, { n:3, target:500 }, { n:4, target:1000 },
    { n:5, target:1500 }, { n:6, target:2500 }, { n:7, target:5000 }, { n:8, target:Infinity }
  ];

  const techs = {
    cool: { unlock:2, baseCost:200, multiplier:1.28, action: () => { state.heat = Math.max(0, state.heat - 35); state.coolings++; } },
    plasma: { unlock:3, baseCost:300, multiplier:1.35, action: () => { state.clickPower += 3; } },
    battery: { unlock:4, baseCost:700, multiplier:1.34, action: () => { state.autoEnergy += 5; } },
    stabilizer: { unlock:5, baseCost:1000, multiplier:1.38, action: () => { state.heatReduction += 0.18; } },
    shield: { unlock:6, baseCost:5000, multiplier:1.42, action: () => { state.shield++; } }
  };

  const state = {
    energy:0, clickPower:1, clicks:0, coolings:0, overloads:0,
    heat:0, level:1, autoEnergy:0, heatReduction:0, paused:false, shield:0, gameOver:false,
    audioPlayed:{}, maxProgressByLevel:{1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:100},
    activePoint:false, level2RobotSpoken:false,
    lightSequenceTotal:0, lightSequenceMissed:0,
    startTime:0, pausedAt:0, totalPaused:0, techEnergySpent:0, techUsed:{}, techCostLevels:{}, awaitingLevelChoice:false, techPopupsShown:{}
  };

  const els = {
    energy:document.getElementById("energy"), clickPower:document.getElementById("clickPower"), clicks:document.getElementById("clicks"),
    coolings:document.getElementById("coolings"), overloads:document.getElementById("overloads"),
    heatValue:document.getElementById("heatValue"), heatBar:document.getElementById("heatBar"), heatState:document.getElementById("heatState"),
    decodeValue:document.getElementById("decodeValue"), decodeBar:document.getElementById("decodeBar"), levelNumber:document.getElementById("levelNumber"),
    centerObjective:document.getElementById("centerObjective"), centerProgress:document.getElementById("centerProgress"),
    reactorImage:document.getElementById("reactorImage"), reactorSourceTel:document.getElementById("reactorSourceTel"), reactorButton:document.getElementById("reactorButton"),
    clickPop:document.getElementById("clickPop"), systemPill:document.getElementById("systemPill"), reactorPanel:document.getElementById("reactorPanel"),
    pointLayer:document.getElementById("pointLayer")
  };

  function levelData(){ return levels.find(l => l.n === state.level) || levels[levels.length - 1]; }
  function getTechCost(key){
    const tech = techs[key];
    if(!tech) return 0;
    const used = state.techCostLevels?.[key] || 0;
    return Math.round(tech.baseCost * Math.pow(tech.multiplier, used));
  }

  function format(n){ return n === Infinity ? "∞" : Math.floor(n).toLocaleString("fr-FR"); }
  function currentTarget(){ return levelData().target; }
  function previousTarget(){ if(state.level <= 1) return 0; const prev = levels.find(l => l.n === state.level - 1); return prev ? prev.target : 0; }

  function rawProgress(){
    const target = currentTarget();
    if(target === Infinity) return 100;
    const prev = previousTarget();
    return Math.max(0, Math.min(100, ((state.energy - prev) / (target - prev)) * 100));
  }

  function stableProgress(){
    const stable = Math.max(state.maxProgressByLevel[state.level] || 0, rawProgress());
    state.maxProgressByLevel[state.level] = stable;
    return stable;
  }

  function currentDisplayedProgress(){ return state.maxProgressByLevel[state.level] || 0; }

  function difficulty(){
    const lvl = state.level;
    const settings = {
      1: { heatPerClick: 0.75, pointCooldown: 1500, pointLifetime: 3200, spreadMin: 16, spreadRange: 62, pointCooling: 24 },
      2: { heatPerClick: 1.05, pointCooldown: 1350, pointLifetime: 3000, spreadMin: 14, spreadRange: 66, pointCooling: 22 },
      3: { heatPerClick: 1.28, pointCooldown: 1220, pointLifetime: 2850, spreadMin: 12, spreadRange: 70, pointCooling: 21 },
      4: { heatPerClick: 1.55, pointCooldown: 1080, pointLifetime: 2650, spreadMin: 10, spreadRange: 74, pointCooling: 20 },
      5: { heatPerClick: 1.90, pointCooldown: 940, pointLifetime: 2400, spreadMin: 8, spreadRange: 78, pointCooling: 19 },
      6: { heatPerClick: 2.30, pointCooldown: 820, pointLifetime: 2200, spreadMin: 7, spreadRange: 82, pointCooling: 18 },
      7: { heatPerClick: 2.85, pointCooldown: 720, pointLifetime: 2000, spreadMin: 6, spreadRange: 84, pointCooling: 17 },
      8: { heatPerClick: 3.25, pointCooldown: 620, pointLifetime: 1800, spreadMin: 5, spreadRange: 86, pointCooling: 16 }
    };
    return settings[lvl] || settings[8];
  }

  function updateReactorImage(){
    const level = Math.max(1, Math.min(8, state.level));
    els.reactorImage.src = `nv_asset/generateur_ordi/${level}.PNG`;
    els.reactorSourceTel.srcset = `nv_asset/generateur_tel/${level}.PNG`;
  }

  function markAndPlay(key, payload, delay=0){
    if(state.audioPlayed[key]) return;
    state.audioPlayed[key] = true;
    playVoice(payload, delay);
  }

  function triggerAudioEvents(){
    const p = currentDisplayedProgress();
    if(state.level === 1){ if(p >= 0) markAndPlay("l1_0", eventAudios.l1_0); if(p >= 25) markAndPlay("l1_25", eventAudios.l1_25); if(p >= 65) markAndPlay("l1_65", eventAudios.l1_65); }
    if(state.level === 2){ if(p >= 0){ if(!state.level2RobotSpoken){ state.level2RobotSpoken = true; updateTechButtons(); } markAndPlay("l2_auto_0", eventAudios.l2_auto_0); markAndPlay("l2_nova_0", eventAudios.l2_nova_0, 250); } if(p >= 25){ markAndPlay("l2_auto_25", eventAudios.l2_auto_25); markAndPlay("l2_nova_25", eventAudios.l2_nova_25, 250); } if(p >= 75){ markAndPlay("l2_auto_75", eventAudios.l2_auto_75); markAndPlay("l2_nova_75", eventAudios.l2_nova_75, 250); } }
    if(state.level === 3 && p >= 0){ markAndPlay("l3_auto_0", eventAudios.l3_auto_0); markAndPlay("l3_nova_0", eventAudios.l3_nova_0, 250); }
    if(state.level === 4 && p >= 0){ markAndPlay("l4_auto_0_1", eventAudios.l4_auto_0_1); markAndPlay("l4_nova_0_1", eventAudios.l4_nova_0_1, 250); markAndPlay("l4_auto_0_2", eventAudios.l4_auto_0_2, 500); }
    if(state.level === 5 && p >= 0){ markAndPlay("l5_auto_0_1", eventAudios.l5_auto_0_1); markAndPlay("l5_nova_0_1", eventAudios.l5_nova_0_1, 250); markAndPlay("l5_auto_0_2", eventAudios.l5_auto_0_2, 500); markAndPlay("l5_nova_0_2", eventAudios.l5_nova_0_2, 750); }
    if(state.level === 6 && p >= 0){ markAndPlay("l6_auto_0_1", eventAudios.l6_auto_0_1); markAndPlay("l6_auto_0_2", eventAudios.l6_auto_0_2, 250); markAndPlay("l6_nova", eventAudios.l6_nova, 500); }
    if(state.level === 7 && p >= 0){ markAndPlay("l7_nova", eventAudios.l7_nova); markAndPlay("l7_auto", eventAudios.l7_auto, 250); }
    if(state.level === 8 && p >= 0){ markAndPlay("l8_auto_1", eventAudios.l8_auto_1); markAndPlay("l8_nova_1", eventAudios.l8_nova_1, 250); markAndPlay("l8_auto_2", eventAudios.l8_auto_2, 500); markAndPlay("l8_nova_2", eventAudios.l8_nova_2, 750); }
  }

  function clearLightPoints(){
    els.pointLayer.innerHTML = "";
    state.activePoint = false;
    if(pointTimer) clearTimeout(pointTimer);
    pointTimer = null;
  }

  function spawnLightPoint(){
    if(gameShell.hidden || state.paused || state.gameOver || state.heat < 80 || state.activePoint) return;

    state.activePoint = true;
    playPointSound();

    const btn = document.createElement("button");
    btn.className = "light-point";
    btn.type = "button";
    const d = difficulty();
    btn.style.left = (d.spreadMin + Math.random() * d.spreadRange) + "%";
    btn.style.top = (d.spreadMin + Math.random() * d.spreadRange) + "%";
    btn.innerHTML = `<picture><source media="(max-width:760px)" srcset="nv_asset/illustrations_tel/point_lumineux.PNG"><img src="nv_asset/illustrations_ordi/point_lumineux.PNG" alt="Point lumineux"></picture>`;
    btn.draggable = false;
    const pointImg = btn.querySelector("img");
    if(pointImg){
      pointImg.draggable = false;
    }

    let resolved = false;

    function resolvePoint(clicked){
      if(resolved) return;
      resolved = true;
      if(btn.isConnected) btn.remove();
      state.activePoint = false;

      state.lightSequenceTotal++;

      if(clicked){
        state.heat = Math.max(0, state.heat - difficulty().pointCooling);
        addTransmission("NOVA", "Point lumineux neutralisé. Le générateur perd légèrement en chaleur.");
      }else{
        state.lightSequenceMissed++;
      }

      if(state.lightSequenceTotal >= 3 || state.lightSequenceMissed >= 1){
        if(state.lightSequenceMissed >= 1){
          state.overloads++;
          state.heat = Math.max(45, state.heat - 18);
          addTransmission("NOVA", `Point lumineux manqué. Surcharge ${state.overloads}/3.`);
          if(state.overloads >= 3){
            state.paused = true;
            state.gameOver = true;
            showGameOver("Trois surcharges ont été atteintes dans ce niveau.");
          }
        }
        state.lightSequenceTotal = 0;
        state.lightSequenceMissed = 0;
      }

      updateUI();

      if(state.heat >= 80 && !state.paused && !state.gameOver){
        if(pointTimer) clearTimeout(pointTimer);
        pointTimer = setTimeout(spawnLightPoint, Math.max(280, difficulty().pointCooldown));
      }
    }

    btn.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      event.stopPropagation();
      resolvePoint(true);
    });

    els.pointLayer.appendChild(btn);

    setTimeout(() => {
      resolvePoint(false);
    }, difficulty().pointLifetime);
  }

  function manageLightPoints(){
    els.reactorPanel.classList.toggle("critical-pulse", state.heat >= 80 && !state.gameOver);

    if(state.heat < 80){
      clearLightPoints();
      return;
    }

    if(state.heat >= 80 && !state.activePoint && !state.paused && !state.gameOver && !pointTimer){
      pointTimer = setTimeout(() => {
        pointTimer = null;
        spawnLightPoint();
      }, Math.max(250, difficulty().pointCooldown));
    }
  }

  function checkLevel(){
    if(state.awaitingLevelChoice || state.gameOver) return;
    while(state.level < 8 && state.energy >= currentTarget()){
      state.maxProgressByLevel[state.level] = 100;
      if(state.level === 7){
        state.awaitingLevelChoice = true;
        state.paused = true;
        showLevelChoice();
        return;
      }
      stopCurrentVoiceOnly();
      state.level++;
      state.overloads = 0;
      state.heat = Math.max(0, state.heat - 18);
      state.audioPlayed = {};
      if(state.level === 2) state.level2RobotSpoken = false;
      state.lightSequenceTotal = 0;
      state.lightSequenceMissed = 0;
      clearLightPoints();
      if(!state.maxProgressByLevel[state.level]) state.maxProgressByLevel[state.level] = 0;
      startGameAmbient();
      addTransmission("NOVA", `Niveau ${state.level} atteint. Les surcharges sont remises à zéro.`);
      updateTechButtons();
      updateUI();
      triggerAudioEvents();
    }
  }

  function handleOverheat(){
    if(state.heat < 99) return;

    if(state.shield > 0){
      state.shield--;
      state.heat = 58;
      addTransmission("NOVA", "Bouclier thermique consommé. Surcharge évitée.");
      return;
    }

    state.overloads++;
    state.heat = 62;
    clearLightPoints();
    addTransmission("NOVA", `Surcharge ${state.overloads}/3. Le générateur redescend en chaleur, mais reste instable.`);

    if(state.overloads >= 3){
      state.paused = true;
      state.gameOver = true;
      showGameOver("Trois surcharges ont été atteintes dans ce niveau.");
    }
  }

  function updateTechButtons(){
    document.querySelectorAll(".tech-btn").forEach(btn => {
      const techKey = btn.dataset.tech;
      const tech = techs[techKey];
      if(!tech) return;
      const unlocked = techKey === "cool" ? (state.level >= 2 && state.level2RobotSpoken) : state.level >= tech.unlock;
      const currentCost = getTechCost(techKey);
      const affordable = state.energy >= currentCost;
      btn.classList.toggle("locked", !unlocked);
      btn.classList.toggle("unlocked", unlocked);
      btn.classList.toggle("affordable", unlocked && affordable);
      btn.classList.toggle("unaffordable", unlocked && !affordable);
      btn.disabled = !unlocked || !affordable;
    });
  }

  function updateUI(){
    const target = currentTarget();
    const progress = Math.round(stableProgress());
    const heat = Math.round(state.heat);
    els.energy.textContent = format(state.energy);
    els.clickPower.textContent = format(state.clickPower);
    els.clicks.textContent = format(state.clicks);
    els.coolings.textContent = format(state.coolings);
    els.overloads.textContent = state.overloads;
    els.levelNumber.textContent = state.level;
    gameShell.classList.toggle('level-eight', state.level === 8);
    els.heatValue.textContent = heat;
    els.heatBar.style.width = Math.min(100, heat) + "%";
    els.decodeValue.textContent = progress;
    els.decodeBar.style.width = progress + "%";

    if(target === Infinity){
      els.centerObjective.textContent = "";
      els.centerProgress.textContent = "";
    }else{
      els.centerObjective.textContent = `${format(target)} MW`;
      els.centerProgress.textContent = `${format(state.energy)} / ${format(target)} MW`;
    }

    if(state.gameOver){
      els.heatState.textContent = "État : échec";
      els.systemPill.textContent = "Système arrêté";
    }else if(heat < 50){
      els.heatState.textContent = "État : stable";
      els.systemPill.textContent = "Système stable";
    }else if(heat < 80){
      els.heatState.textContent = "État : instable";
      els.systemPill.textContent = "Instabilité légère";
    }else{
      els.heatState.textContent = "État : critique";
      els.systemPill.textContent = "Surchauffe critique";
    }

    updateReactorImage();
    updateTechButtons();
    manageLightPoints();
  }

  function afterAction(){
    handleOverheat();
    checkLevel();
    updateUI();
    triggerAudioEvents();
    updateTechButtons();
  }

  els.reactorButton.addEventListener("click", () => {
    if(state.paused || state.gameOver) return;
    state.energy += state.clickPower;
    state.clicks++;
    state.heat += Math.max(0.35, difficulty().heatPerClick - state.heatReduction);
    els.clickPop.textContent = "+" + state.clickPower;
    els.clickPop.classList.remove("active");
    void els.clickPop.offsetWidth;
    els.clickPop.classList.add("active");
    els.reactorButton.classList.add("clicked");
    setTimeout(() => els.reactorButton.classList.remove("clicked"), 160);
    afterAction();
  });

  function tryUseTech(key){
    const tech = techs[key];
    if(!tech || state.paused || state.gameOver) return;
    const currentCost = getTechCost(key);
    const unlocked = key === "cool" ? (state.level >= 2 && state.level2RobotSpoken) : state.level >= tech.unlock;
    if(!unlocked || state.energy < currentCost) return;

    state.energy -= currentCost;
    state.techEnergySpent += currentCost;
    const techName = document.querySelector(`[data-tech="${key}"]`).dataset.name;
    state.techUsed[techName] = (state.techUsed[techName] || 0) + 1;
    tech.action();
    state.techCostLevels[key] = (state.techCostLevels[key] || 0) + 1;
    addTransmission("NOVA", `${techName} activé. Nouveau coût augmenté.`);
    updateUI();
  }


  document.getElementById("coolBtn").addEventListener("click", () => tryUseTech("cool"));
  document.getElementById("plasmaBtn").addEventListener("click", () => tryUseTech("plasma"));
  document.getElementById("batteryBtn").addEventListener("click", () => tryUseTech("battery"));
  document.getElementById("stabilizerBtn").addEventListener("click", () => tryUseTech("stabilizer"));
  document.getElementById("shieldBtn").addEventListener("click", () => tryUseTech("shield"));

  document.getElementById("pauseBtn").addEventListener("click", (event) => {
    if(state.gameOver) return;
    state.paused = !state.paused;
    if(state.paused){
      state.pausedAt = Date.now();
    }else if(state.pausedAt){
      state.totalPaused += Date.now() - state.pausedAt;
      state.pausedAt = 0;
    }
    event.currentTarget.textContent = state.paused ? "Reprendre" : "Pause";
    if(state.paused){
      clearAudioQueue(true);
      clearLightPoints();
      stopGameAmbient();
    }else{
      startGameAmbient();
      manageLightPoints();
    }
    addTransmission("System", state.paused ? "Simulation mise en pause." : "Simulation relancée.");
  });

  document.getElementById("resetBtn").addEventListener("click", fullReset);

  const soundToggle = document.getElementById("soundToggle");
  soundToggle.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    soundToggle.textContent = soundEnabled ? "Son : ON" : "Son : OFF";

    if(!soundEnabled){
      clearAudioQueue(true);
      stopGameAmbient();
      stopAudio(ambientAudio);
      ambientAudio = null;
    }else{
      audioReady = true;
      startGameAmbient();
      triggerAudioEvents();
    }
  });

  setInterval(() => {
    if(gameShell.hidden || state.paused || state.gameOver) return;

    if(state.autoEnergy > 0){
      state.energy += state.autoEnergy;
      state.heat += Math.max(0.05, (0.10 + state.level * 0.035) - state.heatReduction / 10);
    }

    state.heat = Math.max(0, state.heat - 0.55);
    afterAction();
  }, 1000);


  function formatDuration(ms){
    const total = Math.max(0, Math.floor(ms / 1000));
    const min = String(Math.floor(total / 60)).padStart(2, "0");
    const sec = String(total % 60).padStart(2, "0");
    return `${min}:${sec}`;
  }

  function showGameOver(reason){
    clearAudioQueue(true);
    if(currentGameAmbient) currentGameAmbient.volume = 0.06;
    if(ambientAudio) ambientAudio.volume = 0.06;
    const modal = document.getElementById("gameOverModal");
    if(!modal) return;

    document.getElementById("gameOverReason").textContent = reason;
    document.getElementById("goLevel").textContent = state.level;
    document.getElementById("goEnergy").textContent = `${format(state.energy)} MW`;
    document.getElementById("goClicks").textContent = format(state.clicks);
    document.getElementById("goSpent").textContent = `${format(state.techEnergySpent || 0)} MW`;
    document.getElementById("goDuration").textContent = formatDuration(Date.now() - (state.startTime || Date.now()) - (state.totalPaused || 0));

    const used = Object.entries(state.techUsed || {});
    document.getElementById("goTechs").textContent = used.length
      ? used.map(([name, count]) => `${name} x${count}`).join(", ")
      : "Aucune";

    modal.hidden = false;
    document.body.classList.add("game-over-active");
  }

  function fullReset(){
    clearAudioQueue(true);
    stopGameAmbient();
    stopAudio(ambientAudio);
    ambientAudio = null;

    state.energy = 0;
    state.clickPower = 1;
    state.clicks = 0;
    state.coolings = 0;
    state.overloads = 0;
    state.heat = 0;
    state.level = 1;
    state.autoEnergy = 0;
    state.heatReduction = 0;
    state.paused = false;
    state.gameOver = false;
    state.shield = 0;
    state.techEnergySpent = 0;
    state.techUsed = {};
    state.techCostLevels = {};
    state.awaitingLevelChoice = false;
    state.techPopupsShown = {};
    state.startTime = Date.now();
    state.totalPaused = 0;
    state.pausedAt = 0;
    state.level2RobotSpoken = false;
    state.lightSequenceTotal = 0;
    state.lightSequenceMissed = 0;
    state.audioPlayed = {};
    state.maxProgressByLevel = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:100};

    clearLightPoints();
    document.getElementById("pauseBtn").textContent = "Pause";
    document.getElementById("transmissionList").innerHTML = "";

    const modal = document.getElementById("gameOverModal");
    if(modal) modal.hidden = true;

    document.body.classList.remove("game-over-active");

    updateUI();

    if(soundEnabled){
      audioReady = true;
      startGameAmbient();
      triggerAudioEvents();
    }
  }

  document.getElementById("restartGameBtn")?.addEventListener("click", fullReset);

  function showLevelChoice(){
    clearLightPoints();
    clearAudioQueue(true);
    const modal = document.getElementById("levelChoiceModal");
    if(modal) modal.hidden = false;
  }

  function showSuccess(){
    const modal = document.getElementById("successModal");
    if(!modal) return;
    document.getElementById("successLevel").textContent = state.level;
    document.getElementById("successEnergy").textContent = `${format(state.energy)} MW`;
    document.getElementById("successClicks").textContent = format(state.clicks);
    document.getElementById("successSpent").textContent = `${format(state.techEnergySpent || 0)} MW`;
    document.getElementById("successDuration").textContent = formatDuration(Date.now() - (state.startTime || Date.now()) - (state.totalPaused || 0));
    const used = Object.entries(state.techUsed || {});
    document.getElementById("successTechs").textContent = used.length ? used.map(([name, count]) => `${name} x${count}`).join(", ") : "Aucune";
    modal.hidden = false;
  }

  document.getElementById("missionCompleteBtn")?.addEventListener("click", () => {
    document.getElementById("levelChoiceModal").hidden = true;
    state.gameOver = true;
    state.paused = true;
    clearAudioQueue(true);
    if(currentGameAmbient) currentGameAmbient.volume = 0.08;
    showSuccess();
  });

  document.getElementById("continueProductionBtn")?.addEventListener("click", () => {
    document.getElementById("levelChoiceModal").hidden = true;
    state.awaitingLevelChoice = false;
    state.techPopupsShown = {};
    state.paused = false;
    stopCurrentVoiceOnly();
    state.level = 8;
    state.overloads = 0;
    state.heat = Math.max(0, state.heat - 15);
    state.audioPlayed = {};
    state.maxProgressByLevel[8] = 100;
    clearLightPoints();
    startGameAmbient();
    updateUI();
    triggerAudioEvents();
  });

  document.getElementById("successRestartBtn")?.addEventListener("click", fullReset);


  let lastReactorPointerTime = 0;
  function handleReactorPressFast(event){
    lastReactorPointerTime = Date.now();
    if(event) event.preventDefault();
    if(state.paused || state.gameOver || state.awaitingLevelChoice) return;

    state.energy += state.clickPower;
    state.clicks++;
    state.heat += Math.max(0.35, difficulty().heatPerClick - state.heatReduction);

    if(els.clickPop){
      els.clickPop.textContent = "+" + state.clickPower;
      els.clickPop.classList.remove("active");
      void els.clickPop.offsetWidth;
      els.clickPop.classList.add("active");
    }

    if(els.reactorButton){
      els.reactorButton.classList.add("clicked");
      setTimeout(() => els.reactorButton.classList.remove("clicked"), 120);
    }

    afterAction();
  }

  if(els.reactorButton){
    els.reactorButton.addEventListener("pointerdown", handleReactorPressFast, { passive:false });
  }

  if(els.reactorButton){
    els.reactorButton.addEventListener("click", (event) => {
      if(Date.now() - lastReactorPointerTime < 450){
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, true);
  }

  const cyberTechData = {
    cool: {
      title:"Refroidissement d’urgence",
      icon:"nv_asset/icones/refroidissement.png",
      unlock:2,
      initialCost:"200 MW",
      advantage:"Réduit fortement la chaleur et permet d’éviter une surcharge imminente.",
      drawback:"N’augmente pas la production. Son coût augmente après chaque utilisation.",
      description:"Module cryogénique d’urgence qui injecte un refroidissement direct dans le cœur du CyberCore."
    },
    plasma: {
      title:"Injection plasma",
      icon:"nv_asset/icones/injection.png",
      unlock:3,
      initialCost:"300 MW",
      advantage:"Augmente la valeur de chaque clic et accélère la production.",
      drawback:"Plus la production augmente, plus la gestion de la chaleur devient importante.",
      description:"Amplificateur d’impulsion qui canalise du plasma dans le générateur pour renforcer chaque action du Clicker."
    },
    battery: {
      title:"Batterie quantique",
      icon:"nv_asset/icones/batterie.png",
      unlock:4,
      initialCost:"700 MW",
      advantage:"Ajoute une production automatique d’énergie chaque seconde.",
      drawback:"La production passive peut maintenir une pression thermique constante.",
      description:"Batterie autonome qui stocke et redistribue l’énergie grâce à une matrice quantique."
    },
    stabilizer: {
      title:"Stabilisateur ionique",
      icon:"nv_asset/icones/stabilisateur.png",
      unlock:5,
      initialCost:"1 000 MW",
      advantage:"Ralentit la montée de chaleur et rend les niveaux avancés plus contrôlables.",
      drawback:"Son effet est progressif. Il ne remplace pas un refroidissement d’urgence.",
      description:"Système de régulation ionique qui stabilise les flux autour du cœur du CyberCore."
    },
    shield: {
      title:"Bouclier thermique",
      icon:"nv_asset/icones/bouclier.png",
      unlock:6,
      initialCost:"5 000 MW",
      advantage:"Absorbe une surcharge critique.",
      drawback:"Très coûteux et son coût augmente rapidement après chaque activation.",
      description:"Barrière thermique haute intensité utilisée lorsque le générateur atteint une phase dangereuse."
    }
  };

  function getCyberTechCost(key){
    if(typeof getTechCost === "function") return getTechCost(key);
    const fallback = { cool:200, plasma:300, battery:700, stabilizer:1000, shield:5000 };
    return fallback[key] || 0;
  }

  function isCyberTechUnlocked(key){
    if(key === "cool") return state.level >= 2 && state.level2RobotSpoken;
    if(!techs || !techs[key]) return false;
    return state.level >= techs[key].unlock;
  }

  function showTechInfo(key){
    const data = cyberTechData[key];
    const modal = document.getElementById("techInfoModal");
    if(!data || !modal) return;

    document.getElementById("techInfoIcon").src = data.icon;
    document.getElementById("techInfoTitle").textContent = data.title;
    document.getElementById("techInfoCost").textContent = data.initialCost;
    document.getElementById("techInfoLevel").textContent = "Niveau " + data.unlock;
    document.getElementById("techInfoAdvantage").textContent = data.advantage;
    document.getElementById("techInfoDrawback").textContent = data.drawback;
    document.getElementById("techInfoDescription").textContent = data.description;

    modal.hidden = false;
    state.paused = true;
    clearLightPoints();
    stopGameAmbient();
  }

  function renderTechManual(){
    const list = document.getElementById("techManualList");
    if(!list) return;

    const keys = ["cool","plasma","battery","stabilizer","shield"];
    const unlockedCount = keys.filter(isCyberTechUnlocked).length;

    document.getElementById("manualUnlockedCount").textContent = `${unlockedCount} / 5`;
    document.getElementById("manualUnlockedBar").style.width = `${(unlockedCount / 5) * 100}%`;

    list.innerHTML = keys.map(key => {
      const data = cyberTechData[key];
      const unlocked = isCyberTechUnlocked(key);
      const cost = getCyberTechCost(key);

      return `
        <article class="tech-manual-item ${unlocked ? "unlocked" : "locked"}">
          <div class="tech-manual-icon">
            <img src="${data.icon}" alt="${data.title}">
          </div>
          <div class="tech-manual-content">
            <h3>${data.title}</h3>
            <div class="manual-meta">
              <span>${unlocked ? "Déverrouillée" : "Verrouillée"}</span>
              <span>Niveau ${data.unlock}</span>
              <span class="current-cost">Coût actuel : ${format(cost)} MW</span>
            </div>
            <p><strong>Avantage :</strong> ${data.advantage}</p>
            <p><strong>Inconvénient :</strong> ${data.drawback}</p>
            <p><strong>Description :</strong> ${data.description}</p>
          </div>
        </article>
      `;
    }).join("");
  }

  document.getElementById("techManualBtn")?.addEventListener("click", () => {
    renderTechManual();
    const modal = document.getElementById("techManualModal");
    if(modal) modal.hidden = false;
    state.paused = true;
    clearLightPoints();
    stopGameAmbient();
  });

  document.getElementById("closeTechManualBtn")?.addEventListener("click", () => {
    const modal = document.getElementById("techManualModal");
    if(modal) modal.hidden = true;
    state.paused = false;
    const pauseBtn = document.getElementById("pauseBtn");
    if(pauseBtn) pauseBtn.textContent = "Pause";
    startGameAmbient();
    manageLightPoints();
  });

  document.getElementById("closeTechInfoBtn")?.addEventListener("click", () => {
    const modal = document.getElementById("techInfoModal");
    if(modal) modal.hidden = true;
    state.paused = false;
    const pauseBtn = document.getElementById("pauseBtn");
    if(pauseBtn) pauseBtn.textContent = "Pause";
    startGameAmbient();
    manageLightPoints();
  });

  function showUnlockedTechPopupForLevel(){
    if(!state.techPopupsShown) state.techPopupsShown = {};
    const unlockByLevel = {2:"cool",3:"plasma",4:"battery",5:"stabilizer",6:"shield"};
    const key = unlockByLevel[state.level];
    if(key && !state.techPopupsShown[key] && isCyberTechUnlocked(key)){
      state.techPopupsShown[key] = true;
      setTimeout(() => showTechInfo(key), 500);
    }
  }

  preloadAll();
});


document.addEventListener("dragstart", (event) => {
  event.preventDefault();
});
