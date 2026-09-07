/**
 * research-map.js
 * Une seule scène SVG (transparent), 5 projets = 5 mini-réseaux indépendants.
 * - Pas de liens entre projets
 * - Fond transparent (tu gardes le fond du site via CSS)
 * - Tailles variables par projet
 * - Placement non-aligné (anchors + jitter déterministe)
 * - Bonus : titres alternent gauche/droite (et s’alignent correctement)
 */

const projects = [
  {
    id: "p1",
    title: "French economists",
    subtitle: "PhD thesis, 2019 – 2025",
    size: 1.15, // taille planète relative
    satellites: [
      "A. Labrousse", "J.-Y. Pranchère", "J.-L. De Meulemeester",
      "É. Ollion", "L. Scialom", "M. Hauchecorne", "A. Jatteau"
    ],
    href: "#economists"
  },
  {
    id: "p2",
    title: "Public intellectuals",
    subtitle: "Collective project",
    size: 0.95,
    satellites: ["J. Boelaert", "Y. Chitour", "É. Ollion"],
    href: "#intellectuals"
  },
  {
    id: "p3",
    title: "Academic inbreeding",
    subtitle: "Collective project",
    size: 1.05,
    satellites: ["O. Godechot", "R. Issiakou", "Y. Renisio", "W. Aboucaya", "D. Jasim"],
    href: "#localism"
  },
  {
    id: "p4",
    title: "Regulation school",
    subtitle: "Individual project",
    size: 0.90,
    satellites: ["Revue de la Régulation", "colloque² RESET"],
    href: "#regulation"
  },
  {
    id: "p5",
    title: "Computer vision",
    subtitle: "Collective project",
    size: 1.10,
    satellites: ["F. Colonna", "meSSH 2026"],
    href: "#vision"
  },
];

const svg = document.getElementById("researchMap");
const NS = "http://www.w3.org/2000/svg";

function setViewBox() {
  const rect = svg.getBoundingClientRect();
  const w = Math.max(620, rect.width);
  const h = Math.max(420, rect.height);
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
  return { w, h };
}

function clearSvg() {
  while (svg.firstChild) svg.removeChild(svg.firstChild);
}

/**
 * Layout général : anchors (positions) + jitter déterministe
 * (donc organique, pas “aligné”, mais stable d’un refresh à l’autre)
 */
function draw() {
  clearSvg();
  const { w, h } = setViewBox();

  // Composition "organique" (tu peux modifier ces valeurs à la main)
  // (x,y en proportions du viewport)
  const anchors = [
    { x: 0.23, y: 0.30 },
    { x: 0.70, y: 0.25 },
    { x: 0.27, y: 0.63 },
    { x: 0.73, y: 0.58 },
    { x: 0.48, y: 0.86 },
  ];

  projects.forEach((p, i) => {
    const a = anchors[i % anchors.length];

    // jitter léger (±5%) stable
    const rand = mulberry32(hash(p.id));
    const jx = (rand() - 0.5) * 0.05;
    const jy = (rand() - 0.5) * 0.05;

    const cx = (a.x + jx) * w;
    const cy = (a.y + jy) * h;

    // taille variable : base sur viewport + multiplicateur par projet
    const baseR = Math.min(w, h) * 0.105;   // ajuste ici si trop gros/petit
    const planetR = baseR * (p.size || 1.0);

    drawProjectCluster(p, cx, cy, planetR, w);
  });
}

function drawProjectCluster(p, cx, cy, r, canvasW) {
  const g = document.createElementNS(NS, "g");
  g.setAttribute("data-id", p.id);

  // ----- satellites positions (2 anneaux) -----
  const n = (p.satellites || []).length;
  const ring1 = Math.max(3, Math.ceil(n * 0.55));
  const ring2 = Math.max(0, n - ring1);

  const ring1R = r * 1.15;
  const ring2R = r * 1.75;

  const seed = hash(p.id + "_sats");
  const rand = mulberry32(seed);

  const positions = [];

  // Ring 1
  for (let i = 0; i < Math.min(ring1, n); i++) {
    const ang = (i / ring1) * Math.PI * 2 + rand() * 0.35;
    positions.push({ a: ang, rr: ring1R });
  }

  // Ring 2
  for (let i = 0; i < ring2; i++) {
    const ang = (i / ring2) * Math.PI * 2 + rand() * 0.35 + 0.15;
    positions.push({ a: ang, rr: ring2R });
  }

  // ----- links (internes au projet) -----
  positions.forEach(pos => {
    const x = cx + Math.cos(pos.a) * pos.rr;
    const y = cy + Math.sin(pos.a) * pos.rr;

    const line = document.createElementNS(NS, "line");
    line.setAttribute("x1", cx);
    line.setAttribute("y1", cy);
    line.setAttribute("x2", x);
    line.setAttribute("y2", y);
    line.setAttribute("class", "link");
    g.appendChild(line);
  });

  // ----- satellites (sans labels) -----
  positions.forEach(pos => {
    const x = cx + Math.cos(pos.a) * pos.rr;
    const y = cy + Math.sin(pos.a) * pos.rr;

    const sat = document.createElementNS(NS, "circle");
    sat.setAttribute("cx", x);
    sat.setAttribute("cy", y);
    sat.setAttribute("r", 5.2);
    sat.setAttribute("class", "sat");
    g.appendChild(sat);

    // petites “poussières” vertes
    const dot = document.createElementNS(NS, "circle");
    dot.setAttribute("cx", x + (rand() - 0.5) * 7);
    dot.setAttribute("cy", y + (rand() - 0.5) * 7);
    dot.setAttribute("r", 2.3);
    dot.setAttribute("class", "sat-dot");
    g.appendChild(dot);
  });

  // ----- planète (projet) -----
  const planet = document.createElementNS(NS, "circle");
  planet.setAttribute("cx", cx);
  planet.setAttribute("cy", cy);
  planet.setAttribute("r", r);
  planet.setAttribute("class", "planet");
  g.appendChild(planet);

  const core = document.createElementNS(NS, "circle");
  core.setAttribute("cx", cx - r * 0.18);
  core.setAttribute("cy", cy - r * 0.10);
  core.setAttribute("r", r * 0.55);
  core.setAttribute("class", "planet-core");
  g.appendChild(core);

  // ----- BONUS : label gauche/droite + alignement correct -----
  // Le label pointe toujours vers l'extérieur du canevas (loin du centre),
  // pour éviter que deux planètes proches ne fassent se chevaucher leurs labels.
  const labelSide = (cx < canvasW / 2) ? -1 : 1; // 1 = droite ; -1 = gauche

  let labelX = cx + labelSide * r * 1.3;
  const labelY = cy + r * 0.15;

  // Estimation grossière de la largeur du texte, pour ne jamais dépasser
  // le bord du canevas (même sur un viewport étroit).
  const TITLE_FONT = 21;
  const CHAR_W = 0.56;
  const estWidth = (p.title || "").length * TITLE_FONT * CHAR_W;
  const margin = canvasW * 0.04;
  if (labelSide === -1) {
    const leftEdge = labelX - estWidth;
    if (leftEdge < -margin) labelX += (-margin - leftEdge);
  } else {
    const rightEdge = labelX + estWidth;
    if (rightEdge > canvasW + margin) labelX -= (rightEdge - (canvasW + margin));
  }

  const title = document.createElementNS(NS, "text");
  title.setAttribute("x", labelX);
  title.setAttribute("y", labelY);
  title.setAttribute("class", "proj-label");

  if (labelSide === -1) {
    title.setAttribute("text-anchor", "end");
  }
  title.textContent = p.title;
  g.appendChild(title);

  const sub = document.createElementNS(NS, "text");
  sub.setAttribute("x", labelX);
  sub.setAttribute("y", labelY + 18);
  sub.setAttribute("class", "proj-sub");
  if (labelSide === -1) {
    sub.setAttribute("text-anchor", "end");
  }
  sub.textContent = p.subtitle || "";
  g.appendChild(sub);

  // ----- interactivité : hover = rotation très douce ; click = lien -----
  g.style.cursor = p.href ? "pointer" : "default";

  let raf = null;
  let start = null;

  g.addEventListener("mouseenter", () => {
    if (raf) return;
    start = performance.now();
    const step = (ts) => {
      const dt = (ts - start) / 1000;
      const rot = dt * 8; // degrés/sec (léger)
      g.setAttribute("transform", `rotate(${rot} ${cx} ${cy})`);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  });

  g.addEventListener("mouseleave", () => {
    if (raf) cancelAnimationFrame(raf);
    raf = null;
    g.setAttribute("transform", "");
  });

  g.addEventListener("click", () => {
    if (p.href) window.location.href = p.href;
  });

  svg.appendChild(g);
}

// --- deterministic random helpers ---
function hash(s){
  let h = 2166136261;
  for (let i = 0; i < s.length; i++){
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(a){
  return function(){
    let t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

// redraw on resize
window.addEventListener("resize", () => draw());
draw();