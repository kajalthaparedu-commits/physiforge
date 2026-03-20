import { UniverseRenderer } from "./universe/UniverseRenderer.js"
import { createWorld } from "./worlds/electrostatics.js"

const universe = new UniverseRenderer()

/* START BACKGROUND */
universe.start()

/* ================= WORLD LOADER ================= */

window.loadWorld = function(name){

  console.log("CLICK DETECTED:", name)

  const hub = document.getElementById("worldHub")
  hub.style.display = "none"

  universe.renderer.domElement.style.display = "none"

  if(name === "electrostatics"){
    createWorld(universe.scene, universe.camera)
  }

  if(name === "modernPhysics"){
    openModernWorld()
  }
}

/* ================= MODERN WORLD ================= */

function openModernWorld(){

  const ui = document.getElementById("ui")

  // remove old instance
  const old = document.getElementById("modernWorld")
  if(old) old.remove()

  const wrap = document.createElement("div")
  wrap.id = "modernWorld"

  Object.assign(wrap.style, {
    position: "absolute",
    top: "80px",
    left: "0",
    right: "0",
    bottom: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    pointerEvents: "auto"
  })

  ui.appendChild(wrap)

  // ===== TITLE =====
  const title = document.createElement("h1")
  title.innerText = "Modern Physics World"

  Object.assign(title.style, {
    color: "#00e5ff",
    textShadow: "0 0 15px #00e5ff"
  })

  wrap.appendChild(title)

  // ===== GRID =====
  const grid = document.createElement("div")

  Object.assign(grid.style, {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    width: "80%",
    maxWidth: "900px"
  })

  wrap.appendChild(grid)

  // ===== CARD FUNCTION =====
  function createCard(titleText, desc, file){

    const card = document.createElement("div")

    Object.assign(card.style, {
      padding: "20px",
      background: "#02121c",
      border: "1px solid #0d3a4f",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.25s ease",
      boxShadow: "0 0 10px rgba(0,229,255,0.1)"
    })

    card.onmouseenter = ()=>{
      card.style.transform = "translateY(-6px)"
      card.style.boxShadow = "0 0 25px rgba(0,229,255,0.5)"
      card.style.border = "1px solid #00e5ff"
    }

    card.onmouseleave = ()=>{
      card.style.transform = "translateY(0)"
      card.style.boxShadow = "0 0 10px rgba(0,229,255,0.1)"
      card.style.border = "1px solid #0d3a4f"
    }

    card.onclick = ()=>{
      if(file !== "#") openSimulation(file)
    }

    const t = document.createElement("div")
    t.innerText = titleText
    t.style.color = "#00e5ff"
    t.style.fontSize = "18px"

    const d = document.createElement("div")
    d.innerText = desc
    d.style.fontSize = "12px"
    d.style.color = "#6fa3b8"

    card.appendChild(t)
    card.appendChild(d)

    return card
  }

  // ===== CARDS =====
  grid.appendChild(
    createCard("⚛ Photoelectric Effect",
    "Investigate Einstein’s equation",
    "simulations/photoelectric.html")
  )

  grid.appendChild(
    createCard("🌈 Atomic Spectra", "Coming soon", "#")
  )

  grid.appendChild(
    createCard("🧪 Wave-Particle Duality", "Coming soon", "#")
  )

  // ===== BACK BUTTON =====
  const back = document.createElement("button")
  back.innerText = "← Back to Worlds"

  Object.assign(back.style, {
    position: "absolute",
    top: "20px",
    left: "20px",
    padding: "10px 16px",
    background: "#111",
    border: "1px solid #6ec6ff",
    color: "white",
    cursor: "pointer"
  })

  back.onclick = () => {
    wrap.remove()

    const hub = document.getElementById("worldHub")
    hub.style.display = "block"
    hub.style.opacity = "1"

    universe.renderer.domElement.style.display = "block"
  }

  ui.appendChild(back)
}

/* ================= SIMULATION ================= */

window.openSimulation = function(file){

  const ui = document.getElementById("ui")

  // remove old sim
  const old = document.getElementById("simWrap")
  if(old) old.remove()

  // hide modern world
  const modern = document.getElementById("modernWorld")
  if(modern) modern.style.display = "none"

  const simWrap = document.createElement("div")
  simWrap.id = "simWrap"

  Object.assign(simWrap.style, {
    position: "absolute",
    top: "80px",
    left: "0",
    right: "0",
    bottom: "40px",
    pointerEvents: "auto"
  })

  ui.appendChild(simWrap)

  // BACK BUTTON
  const back = document.createElement("button")
  back.innerText = "← Back"

  Object.assign(back.style, {
    position: "absolute",
    top: "20px",
    left: "20px",
    padding: "10px 16px",
    background: "#111",
    border: "1px solid #6ec6ff",
    color: "white",
    cursor: "pointer",
    zIndex: "999"
  })

  back.onclick = ()=>{
    simWrap.remove()
    back.remove()

    const modern = document.getElementById("modernWorld")

    if(modern){
      modern.style.display = "flex"
    } else {
      const hub = document.getElementById("worldHub")
      hub.style.display = "block"
      hub.style.opacity = "1"
      universe.renderer.domElement.style.display = "block"
    }
  }

  ui.appendChild(back)

  // IFRAME
  const frame = document.createElement("iframe")
  frame.src = file

  Object.assign(frame.style, {
    width: "100%",
    height: "100%",
    border: "none"
  })

  simWrap.appendChild(frame)
}
