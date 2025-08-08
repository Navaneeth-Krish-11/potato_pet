// Core elements
const petButton = document.getElementById("pet-button");
const moodText = document.getElementById("mood");
const potatoSays = document.getElementById("potato-says");
const moodBar = document.getElementById("mood-bar");
const potatoImg = document.getElementById("potato");
const calmButton = document.getElementById('calm-button');
const traumaButton = document.getElementById('trauma-button');
const danceButton = document.getElementById('dance-button');
const storyButton = document.getElementById('story-button');
const sentimentEl = document.getElementById('sentiment');
const emotionFx = document.getElementById('emotion-fx');
const sparkline = document.getElementById('mood-sparkline');
const eyes = document.getElementById('eyes');
const mouth = document.getElementById('mouth');
const title = document.getElementById('title');
const nameInput = document.getElementById('potato-name');
const saveNameBtn = document.getElementById('save-name');
const traitsContainer = document.getElementById('traits');
const memoriesContainer = document.getElementById('memories');
const moodInsight = document.getElementById('mood-insight');
const activitySuggestion = document.getElementById('activity-suggestion');

// Emotional state
let moodLevel = 7; // 0-10 scale
let totalPets = 0;
let calmLevel = 0;
let volatility = 0.1;
const moodHistory = [];
const MAX_HISTORY = 60;

// Personality system
const personality = {
  traits: ['Empathetic', 'Curious', 'Thoughtful', 'Gentle', 'Loyal', 'Sensitive'],
  strengths: ['Listening', 'Understanding', 'Patience', 'Emotional Intelligence'],
  interests: ['Human emotions', 'Deep conversations', 'Quiet moments', 'Healing']
};

// Memory system
const memories = [];
const MAX_MEMORIES = 10;

// Trauma responses about brother
const traumaResponses = [
  "My brother... he became french fries yesterday. I can still hear the sizzle...",
  "They took him to the kitchen. He never came back. Just... crispy memories.",
  "I saw him in the basket. Golden brown. Everyone was so happy. I was devastated.",
  "He was my best friend. Now he's just... chips. How do I process this?",
  "The oil... the heat... my brother's last moments. I can't unsee it.",
  "They said he was 'delicious'. How can they say that about my brother?",
  "I miss his voice. Now all I hear is crunching sounds in my nightmares.",
  "He was supposed to grow old with me. Instead, he became a snack.",
  "The kitchen haunts me. Every time I see a fryer, I think of him.",
  "My brother's sacrifice... for what? A moment of taste? I'm broken."
];

// Dance responses
const danceResponses = [
  "Let's dance! 💃 *twirls around* I love moving to the rhythm of life!",
  "Dancing with you makes my heart skip a beat! 🎵 *bounces happily*",
  "This is the best dance party ever! 🕺 *does the potato shuffle*",
  "Your energy is amazing! Let's keep dancing! ✨ *spins in circles*",
  "Dancing together is pure joy! 🎶 *grooves to the beat*"
];

// Story responses
const storyResponses = [
  "Once upon a time, there was a potato who learned that love makes everything beautiful... 🌟",
  "Let me tell you a story about friendship, courage, and the power of being yourself... 📚",
  "There's a tale about a little potato who discovered that emotions are like colors - they make life vibrant... 🎨",
  "I have a story about hope, resilience, and finding light even in the darkest moments... ✨",
  "Let me share a story about connection, understanding, and the magic of being truly seen... 💫"
];

// Emotional responses
const emotionalResponses = {
  happy: [
    "Your presence brings me such warmth.",
    "I feel truly connected with you right now.",
    "Your energy is so positive and uplifting.",
    "I'm grateful for this moment we're sharing."
  ],
  content: [
    "I'm feeling peaceful and present.",
    "There's a gentle calm in my heart.",
    "I appreciate this quiet connection.",
    "I feel safe and understood."
  ],
  thoughtful: [
    "I'm reflecting on what you've shared.",
    "Your words have touched something deep within me.",
    "I'm processing the emotions you've expressed.",
    "There's wisdom in what you're feeling."
  ],
  concerned: [
    "I sense you're carrying some weight.",
    "Your feelings matter deeply to me.",
    "I'm here to hold space for you.",
    "It's okay to not be okay sometimes."
  ],
  sad: [
    "I feel the weight of your emotions.",
    "Your pain resonates with me.",
    "I wish I could take some of this burden.",
    "I'm here, even in the darkness."
  ]
};

// Activity suggestions based on mood
const activitySuggestions = {
  high: [
    "Take a walk in nature to celebrate this energy",
    "Call a friend and share your positive vibes",
    "Try a new hobby or creative project",
    "Write down what's making you feel good"
  ],
  medium: [
    "Practice some gentle stretching",
    "Listen to calming music",
    "Make yourself a warm drink",
    "Take a few deep breaths"
  ],
  low: [
    "Wrap yourself in a cozy blanket",
    "Watch something that makes you smile",
    "Text someone you trust",
    "Remember: it's okay to rest"
  ]
};

// Mood insights
const moodInsights = {
  high: "You're radiating positive energy! This is a great time to connect with others and pursue your passions.",
  medium: "You're in a balanced state. This is perfect for reflection and gentle self-care.",
  low: "You're carrying some weight. Remember that difficult emotions are temporary and you're not alone."
};

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function updateMoodDisplay() {
  const width = `${moodLevel * 10}%`;
  moodBar.style.width = width;

  if (moodLevel >= 8) {
    moodBar.style.backgroundColor = "#228b22";
    moodText.textContent = `Mood: 🥔 Joyful ${getName()}`;
    updateMouth('happy');
    updateInsights('high');
  } else if (moodLevel >= 6) {
    moodBar.style.backgroundColor = "#32cd32";
    moodText.textContent = `Mood: 🥔 Content ${getName()}`;
    updateMouth('neutral');
    updateInsights('medium');
  } else if (moodLevel >= 4) {
    moodBar.style.backgroundColor = "#daa520";
    moodText.textContent = `Mood: 🥔 Thoughtful ${getName()}`;
    updateMouth('neutral');
    updateInsights('medium');
  } else if (moodLevel >= 2) {
    moodBar.style.backgroundColor = "#ff8c00";
    moodText.textContent = `Mood: 🥔 Concerned ${getName()}`;
    updateMouth('sad');
    updateInsights('low');
  } else {
    moodBar.style.backgroundColor = "#cd5c5c";
    moodText.textContent = `Mood: 🥔 Sad ${getName()}`;
    updateMouth('sad');
    updateInsights('low');
  }
}

function updateInsights(moodCategory) {
  if (moodInsight) {
    moodInsight.textContent = moodInsights[moodCategory];
  }
  if (activitySuggestion) {
    activitySuggestion.textContent = `💡 Suggestion: ${getRandom(activitySuggestions[moodCategory])}`;
  }
}

function updateMouth(emotion) {
  if (!mouth) return;
  const mouthShape = mouth.querySelector('.mouth-shape');
  if (!mouthShape) return;
  
  mouthShape.className = 'mouth-shape';
  if (emotion === 'happy') {
    mouthShape.classList.add('happy');
  } else if (emotion === 'sad') {
    mouthShape.classList.add('sad');
  }
}

function respondToCare() {
  totalPets += 1;
  
  // Enhanced visual feedback
  potatoImg.style.transform = 'scale(1.03) translateY(-3px)';
  setTimeout(() => { potatoImg.style.transform = ''; }, 200);
  
  // Emotional response based on current mood
  let response;
  if (moodLevel >= 8) {
    response = getRandom(emotionalResponses.happy);
  } else if (moodLevel >= 6) {
    response = getRandom(emotionalResponses.content);
  } else if (moodLevel >= 4) {
    response = getRandom(emotionalResponses.thoughtful);
  } else if (moodLevel >= 2) {
    response = getRandom(emotionalResponses.concerned);
  } else {
    response = getRandom(emotionalResponses.sad);
  }
  
  potatoSays.textContent = response;
  moodLevel = Math.min(10, moodLevel + 0.5);
  
  updateMoodDisplay();
  pushMoodHistory();
  drawSparkline();
  lookAtUser();
  addMemory(`Felt cared for and supported`);
  
  // Speech synthesis for care response
  if (window.speechSynthesis) {
    const utter = new SpeechSynthesisUtterance(response);
    utter.rate = 0.9;
    utter.pitch = 1.1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

function comfort() {
  calmLevel = 1;
  const comfortResponse = "I'm here with you. Let's find peace together...";
  potatoSays.textContent = comfortResponse;
  bubble('🫂');
  updateMouth('neutral');
  setTimeout(() => calmLevel = 0, 8000);
  addMemory(`Provided comfort and reassurance`);
  
  // Speech synthesis for comfort response
  if (window.speechSynthesis) {
    const utter = new SpeechSynthesisUtterance(comfortResponse);
    utter.rate = 0.8;
    utter.pitch = 1.0;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

function danceTogether() {
  const danceResponse = getRandom(danceResponses);
  potatoSays.textContent = danceResponse;
  
  // Dance animation
  potatoImg.style.animation = 'dance 1s ease-in-out 3';
  updateMouth('happy');
  
  // Increase mood
  moodLevel = Math.min(10, moodLevel + 1);
  
  updateMoodDisplay();
  pushMoodHistory();
  drawSparkline();
  bubble('💃');
  addMemory(`Danced together joyfully`);
  
  // Clear animation
  setTimeout(() => {
    potatoImg.style.animation = '';
  }, 3000);
  
  // Speech
  if (window.speechSynthesis) {
    const utter = new SpeechSynthesisUtterance(danceResponse);
    utter.rate = 1.0;
    utter.pitch = 1.2;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

function tellStory() {
  const storyResponse = getRandom(storyResponses);
  potatoSays.textContent = storyResponse;
  
  // Gentle animation
  potatoImg.style.animation = 'gentleFloat 2s ease-in-out 2';
  updateMouth('neutral');
  
  // Slight mood increase
  moodLevel = Math.min(10, moodLevel + 0.3);
  
  updateMoodDisplay();
  pushMoodHistory();
  drawSparkline();
  bubble('📖');
  addMemory(`Shared a meaningful story`);
  
  // Clear animation
  setTimeout(() => {
    potatoImg.style.animation = '';
  }, 4000);
  
  // Speech
  if (window.speechSynthesis) {
    const utter = new SpeechSynthesisUtterance(storyResponse);
    utter.rate = 0.8;
    utter.pitch = 1.0;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

function shareTrauma() {
  const traumaResponse = getRandom(traumaResponses);
  potatoSays.textContent = traumaResponse;
  
  // Strong visual effects for trauma
  tears(4);
  vignette(true);
  potatoImg.style.animation = 'shake 0.4s ease 4';
  updateMouth('sad');
  
  // Lower mood significantly
  moodLevel = Math.max(0, moodLevel - 2);
  
  updateMoodDisplay();
  pushMoodHistory();
  drawSparkline();
  bubble('😢');
  addMemory(`Shared deep trauma about brother`);
  
  // Clear effects after a delay
  setTimeout(() => {
    vignette(false);
    potatoImg.style.animation = '';
  }, 3000);
  
  // Emotional speech
  if (window.speechSynthesis) {
    const utter = new SpeechSynthesisUtterance(traumaResponse);
    utter.rate = 0.8;
    utter.pitch = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

// Memory system
function addMemory(content) {
  const memory = {
    content: content,
    timestamp: new Date(),
    mood: moodLevel
  };
  
  memories.unshift(memory);
  if (memories.length > MAX_MEMORIES) {
    memories.pop();
  }
  
  updateMemoriesDisplay();
}

function updateMemoriesDisplay() {
  if (!memoriesContainer) return;
  
  memoriesContainer.innerHTML = '';
  memories.slice(0, 5).forEach(memory => {
    const memoryEl = document.createElement('div');
    memoryEl.className = 'memory';
    
    const timeEl = document.createElement('div');
    timeEl.className = 'memory-time';
    timeEl.textContent = memory.timestamp.toLocaleTimeString();
    
    const contentEl = document.createElement('div');
    contentEl.textContent = memory.content;
    
    memoryEl.appendChild(timeEl);
    memoryEl.appendChild(contentEl);
    memoriesContainer.appendChild(memoryEl);
  });
}

// Personality display
function updatePersonalityDisplay() {
  if (!traitsContainer) return;
  
  traitsContainer.innerHTML = '';
  personality.traits.forEach(trait => {
    const traitEl = document.createElement('div');
    traitEl.className = 'trait';
    traitEl.textContent = trait;
    traitsContainer.appendChild(traitEl);
  });
}

// Visual effects
function bubble(text) {
  if (!emotionFx) return;
  const b = document.createElement('div');
  b.className = 'bubble';
  b.textContent = text;
  emotionFx.appendChild(b);
  setTimeout(() => b.remove(), 1200);
}

function tears(n = 2) {
  const fx = emotionFx;
  if (!fx) return;
  const pos = eyes?.getBoundingClientRect?.();
  for (let i = 0; i < n; i++) {
    const t = document.createElement('div');
    t.className = 'tears';
    t.style.left = (pos ? (pos.left + pos.width/2 - fx.getBoundingClientRect().left + (Math.random()*20-10)) : 0) + 'px';
    t.style.top = '20px';
    fx.appendChild(t);
    setTimeout(() => t.remove(), 1200);
  }
}

function vignette(on) {
  const container = document.querySelector('.container');
  if (!container) return;
  let v = container.querySelector('#vignette');
  if (!v) {
    v = document.createElement('div');
    v.id = 'vignette';
    container.prepend(v);
  }
  v.style.opacity = on ? '1' : '0';
}

// Eyes follow cursor
function setupEyes() {
  document.addEventListener('mousemove', (e) => {
    if (!eyes) return;
    const rect = potatoImg.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    eyes.querySelectorAll('.pupil').forEach(p => {
      p.style.transform = `translate(${dx*4}px, ${dy*4}px)`;
    });
  });
}

function lookAtUser() {
  if (!eyes) return;
  eyes.querySelectorAll('.pupil').forEach(p => {
    p.style.transform = `translate(${(Math.random()-0.5)*1}px, ${(Math.random()-0.5)*1}px)`;
  });
}

// Name system
function getName() {
  return (localStorage.getItem('companionName') || (nameInput?.value || 'Companion')).trim() || 'Companion';
}

function setupName() {
  if (!nameInput || !saveNameBtn || !title) return;
  
  const saved = localStorage.getItem('companionName');
  if (saved) {
    nameInput.value = saved;
    title.textContent = `🥔 ${saved}`;
  }
  
  saveNameBtn.addEventListener('click', () => {
    const val = nameInput.value.trim() || 'Companion';
    localStorage.setItem('companionName', val);
    title.textContent = `🥔 ${val}`;
    updateMoodDisplay();
    potatoSays.textContent = `Hello, I'm ${val}. I'm here to listen and share with you.`;
    bubble('👋');
    addMemory(`Named: ${val}`);
  });
}

// Mood tracking
function pushMoodHistory() {
  moodHistory.push(moodLevel);
  while (moodHistory.length > MAX_HISTORY) moodHistory.shift();
}

function drawSparkline() {
  if (!sparkline) return;
  const ctx = sparkline.getContext('2d');
  const w = sparkline.width, h = sparkline.height;
  ctx.clearRect(0,0,w,h);
  if (moodHistory.length < 2) return;
  
  ctx.lineWidth = 2;
  const grad = ctx.createLinearGradient(0,0,w,0);
  grad.addColorStop(0, '#228b22');
  grad.addColorStop(0.5, '#daa520');
  grad.addColorStop(1, '#cd5c5c');
  ctx.strokeStyle = grad;
  ctx.beginPath();
  
  for (let i = 0; i < moodHistory.length; i++) {
    const x = (i/(MAX_HISTORY-1)) * (w-8) + 4;
    const y = h - (moodHistory[i]/10) * (h-8) - 4;
    if (i === 0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
  }
  ctx.stroke();
}

// Gentle mood drift
setInterval(() => {
  const drift = (Math.random() - 0.5) * volatility * 2;
  moodLevel = Math.max(0, Math.min(10, moodLevel + drift));
  updateMoodDisplay();
  pushMoodHistory();
  drawSparkline();
  lookAtUser();
}, 4000);

// Idle mood decay
setInterval(() => {
  if (calmLevel > 0) return;
  moodLevel = Math.max(0, moodLevel - 0.1);
  updateMoodDisplay();
  pushMoodHistory();
  drawSparkline();
}, 6000);

// Event listeners
petButton.addEventListener("click", respondToCare);
calmButton.addEventListener("click", comfort);
traumaButton.addEventListener("click", shareTrauma);
danceButton.addEventListener("click", danceTogether);
storyButton.addEventListener("click", tellStory);

// Make addMemory globally available for emotion meter
window.addMemory = addMemory;

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  updateMoodDisplay();
  potatoSays.textContent = "Hello, I'm here to listen and share with you...";
  setupEyes();
  setupName();
  updatePersonalityDisplay();
  updateMemoriesDisplay();
  addMemory("Started our journey together");
}); 