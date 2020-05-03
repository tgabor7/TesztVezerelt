import { Vector2D } from "./maths.js";

export class NPC {
    constructor(x, y, sprite){
        this.position = new Vector2D(x,y);
        this.name = "Generic NPC";
        this.canvas_width = document.getElementById("canvas").width / 2;
        this.canvas_height = document.getElementById("canvas").height / 2;
        this.img = document.getElementById(sprite);
        this.max_health = 100;
        this.health = 100;
        this.damage = 10;
        this.respawn = true;
        this.experience = 0;
    }
    interact() {
        alert("NO");
    }
    draw(context, camera) {
        context.drawImage(this.img, this.position.x - camera.x + this.canvas_width, this.position.y - camera.y + this.canvas_height, 64, 64);
    }
    die(map){
        
    }
}