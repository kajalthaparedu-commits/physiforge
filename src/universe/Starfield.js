import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"

export class Starfield{

constructor(scene){

this.scene = scene
this.layers = []
this.time = 0

/* depth layers */

this.createLayer(1200,0.7,-500)
this.createLayer(900,1.1,-900)
this.createLayer(600,1.6,-1400)

}


/* ----------------------------- */
/* STAR LAYER CREATION */
/* ----------------------------- */

createLayer(count,size,z){

const geometry = new THREE.BufferGeometry()

const positions = []

for(let i=0;i<count;i++){

positions.push(
(Math.random()-0.5)*4000,
(Math.random()-0.5)*2000,
z + Math.random()*200
)

}

geometry.setAttribute(
"position",
new THREE.Float32BufferAttribute(positions,3)
)

const material = new THREE.PointsMaterial({
color:0xffffff,
size:size,
transparent:true,
opacity:0.9,
depthWrite:false
})

const stars = new THREE.Points(geometry,material)

this.scene.add(stars)

this.layers.push({
mesh:stars,
material:material,
speed:0.02 + Math.random()*0.02,
twinkleOffset:Math.random()*10
})

}


/* ----------------------------- */
/* ANIMATION */
/* ----------------------------- */

update(){

this.time += 0.01

this.layers.forEach(layer=>{

/* slow space drift */

layer.mesh.rotation.y += layer.speed * 0.0001
layer.mesh.rotation.x += layer.speed * 0.00005

/* twinkle effect */

layer.material.opacity =
0.7 + Math.sin(this.time + layer.twinkleOffset) * 0.25

})

}

}