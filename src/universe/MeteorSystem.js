import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js"

export class MeteorSystem{

constructor(scene){

this.scene = scene
this.meteors = []

for(let i=0;i<8;i++){

const geometry = new THREE.SphereGeometry(0.6,12,12)

const material = new THREE.MeshBasicMaterial({
color:0x88ccff
})

const meteor = new THREE.Mesh(geometry,material)

meteor.position.x = Math.random()*200 - 100
meteor.position.y = Math.random()*120
meteor.position.z = -100

scene.add(meteor)

this.meteors.push(meteor)

}

}

update(){

for(let m of this.meteors){

m.position.x += 0.5
m.position.y -= 0.2

if(m.position.x > 150){

m.position.x = -150
m.position.y = Math.random()*120

}

}

}

}