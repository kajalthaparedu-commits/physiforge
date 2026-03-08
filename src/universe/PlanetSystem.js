import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"

export class PlanetSystem{

constructor(scene){

this.scene = scene
this.planets = []
this.orbits = []

/* ----------------------------- */
/* LIGHT */
/* ----------------------------- */

const light = new THREE.PointLight(0xffffff,1.5)
light.position.set(300,200,200)
scene.add(light)

/* ----------------------------- */
/* PLANET CREATOR */
/* ----------------------------- */

const createPlanet = (size,color,orbitRadius,orbitSpeed,z)=>{

const geo = new THREE.SphereGeometry(size,32,32)

const mat = new THREE.MeshStandardMaterial({
color:color,
roughness:0.8,
metalness:0.1,
emissive:color,
emissiveIntensity:0.15
})

const mesh = new THREE.Mesh(geo,mat)

/* start position */

mesh.position.set(orbitRadius,0,z)

scene.add(mesh)

this.planets.push(mesh)

this.orbits.push({
mesh:mesh,
radius:orbitRadius,
speed:orbitSpeed,
angle:Math.random()*Math.PI*2,
z:z
})

/* glow halo */

const haloGeo = new THREE.SphereGeometry(size*1.4,32,32)

const haloMat = new THREE.MeshBasicMaterial({
color:color,
transparent:true,
opacity:0.12
})

const halo = new THREE.Mesh(haloGeo,haloMat)

mesh.add(halo)

}


/* ----------------------------- */
/* EDGE PLANETS */
/* ----------------------------- */

/* bottom right */

createPlanet(90,0x2233ff,900,0.0002,-1200)

/* top left */

createPlanet(60,0x6633ff,1000,0.00025,-1400)

/* far right */

createPlanet(45,0xaa44ff,1200,0.00018,-1600)

}


/* ----------------------------- */
/* ANIMATION */
/* ----------------------------- */

update(){

this.orbits.forEach(o=>{

o.angle += o.speed

o.mesh.position.x = Math.cos(o.angle)*o.radius
o.mesh.position.y = Math.sin(o.angle)*o.radius*0.2
o.mesh.position.z = o.z

o.mesh.rotation.y += 0.002

})

}

}