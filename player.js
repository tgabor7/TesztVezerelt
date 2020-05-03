import { Vector2D } from "./maths.js"
import { Bonk, Escape, Heal } from "./skill.js";

var NUMBER_OF_STEPS = 100
var SPEED = .1

export class Player {
	constructor() {
		this.name = "default";
		this.position = new Vector2D(64, 64);
		this.destination = new Vector2D(0, 0);

		this.max_health = 100;
		this.health = 100;
		this.damage = 10;
		this.experience = 0;

		this.skills = [];

		this.canvas_width = document.getElementById("canvas").width / 2;
		this.canvas_height = document.getElementById("canvas").height / 2;
		this.current_tile = new Vector2D(1, 1);
		this.map = null;
		this.moving = false;
		this.img = document.getElementById("g_background");

		this.skills.push(new Bonk(this));
		this.skills.push(new Heal(this));
		this.skills.push(new Escape(this));
	}
	setPosition(x,y){
		this.position = new Vector2D(x,y);
		this.current_tile = new Vector2D(x/64,y/64);
		this.destination = this.current_tile;
		this.moving = false;
	}
	translate(x, y){
		this.position = this.position.add(new Vector2D(x, y));
	}
	draw(context, camera) {
		context.drawImage(this.img, this.position.x - camera.x + this.canvas_width, this.position.y - camera.y + this.canvas_height, 64, 64);
	}
	update(map) {
		let v = this.getTile(map);
		this.map = map;
		this.moveTo(this.destination, map);
	}
	interact(context, npcs, map){
		for(let i = 0;i<npcs.length;i++){
			if(this.position.sub(npcs[i].position).length() <= 64*Math.sqrt(2)){
				npcs[i].interact(context, this, map);
			}
		}
	}
	move(d) {
		if(this.moving) return;
		let current_tile = this.getTile(this.map);
		switch(d){
			case 0:
				if(this.getTileValue(this.current_tile.add(new Vector2D(0,-1))) != null) this.destination = this.current_tile.add(new Vector2D(0,-1));
				break;
			case 1:
				if(this.getTileValue(this.current_tile.add(new Vector2D(0, 1))) != null) this.destination = this.current_tile.add(new Vector2D(0,1));
				break;
			case 2:
				if(this.getTileValue(this.current_tile.add(new Vector2D(-1,0))) != null) this.destination = this.current_tile.add(new Vector2D(-1,0));
				break;
			case 3:
				if(this.getTileValue(this.current_tile.add(new Vector2D(1,0))) != null) this.destination = this.current_tile.add(new Vector2D(1,0));
				break;
		}
	}
	moveTo(v, map) {
		let current_tile = this.getTile(map);
		if(this.getTileValue(this.destination) % 2 == 1){
     		this.destination = this.current_tile;
     		return;
     	}
		for(let i = 0;i<NUMBER_OF_STEPS;i++){
			this.moving = true;
			let next_position = this.getTilePosition(v);
			
			let t = this.position.sub(next_position);
			if(t.length() < 1){
     			this.moving = false;
     			this.position = this.getTilePosition(this.destination);
     			this.current_tile = v;

     		}
			if(current_tile.x < v.x) this.translate(SPEED * (64 / NUMBER_OF_STEPS),0);
		    if(current_tile.x > v.x) this.translate(-SPEED * (64 / NUMBER_OF_STEPS),0);
		    if(current_tile.y < v.y) this.translate(0,SPEED * (64 / NUMBER_OF_STEPS));
		    if(current_tile.y > v.y) this.translate(0,-SPEED * (64 / NUMBER_OF_STEPS));

		     
     		current_tile = this.getTile(map);
     		
			
		}
		
	}
	getTile(map){
		return this.current_tile;
	}
	getTilePosition(v) {
		return new Vector2D(v.x*64,v.y*64);
	}
	getTileValue(v) {
		if(this.map.tiles.length > v.y && this.map.tiles[0].length > v.x){
			return this.map.tiles[v.y][v.x];
		}
		return null;
	}
}