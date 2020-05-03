import { Vector2D } from "./maths.js";
import { Player } from "./player.js";
import { Map } from "./map.js";
import { Menu } from "./menu.js";
import { TutNPC } from "./TutNPC.js";
import { Dialog } from "./dialog.js";
import { StateManager } from "./StateManager.js";
import { FightScene } from "./fightScene.js";
import { MainState } from "./MainState.js";
import { MenuState } from "./MenuState.js";

var player = new Player();
var dialog = new Dialog();

var context = null;
var canvas = null;
var keys_down = {};
var key_down = '';

var npcs = [];
var initialized = false;


setInterval(loop, 16);

var init = function() {
}

function loop() {
	if(!context) return;
	context.clearRect(0, 0, canvas.width, canvas.height);
	StateManager.init(context);
	if(!initialized){
		new MenuState(player,npcs, dialog);	
		initialized = true;
	}
	key_down = '';
	StateManager.draw(context);
}
var isKeyDown = function(key) {
	return keys_down[key];
}
function isKeyPressed(key){
	return (key_down==key);
}
document.addEventListener('keydown', function(event){
	keys_down[event.key] = true;
});
document.addEventListener('keypress', function(event){
	key_down = event.key;
});
document.addEventListener('keyup', function(event){
	delete keys_down[event.key];
});

window.onload = function() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
};
init();