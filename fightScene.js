import { State, StateManager } from "./StateManager.js";
import { Vector2D } from "./maths.js";
import { Dialog } from "./dialog.js";
import { Modal } from "./modal.js";
import { FirstScene } from "./firstScene.js";

class FightOption {
    constructor(text, x, y){
        this.text = text;
        this.selected = false;
        this.position = 0;
        this.x = x;
        this.y = y;
    }
    draw(context) {
        
        context.font ="30px serif";

        if(this.selected) {
            context.fillStyle = "red";
            context.fillText(this.text, this.x, this.y);
        }else{
            context.fillStyle = "white";
            context.fillText(this.text, this.x, this.y);
        }
    }
}

export class FightScene extends State {
    constructor(player, enemy, map) {
        super(1);
        this.map = map;
        this.selected = 0;
        this.options = [];
        this.can_attack = true;
        for(var i = 0;i<player.skills.length;i++){
            this.options.push(new FightOption(player.skills[i].name, 10+(i*100), 600));
        }
        this.player = player;
        this.enemy = enemy;
        this.player_position = new Vector2D(10, 200);
        this.enemy_position = new Vector2D(600, 200);
    }
    animate(pos){
        pos.x += Math.random()*2;
        pos.x -= Math.random()*2;

        pos.y += Math.random()*2;
        pos.y -= Math.random()*2;
    }
    draw(){
        
        //background
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(0,0,document.getElementById('canvas').width,document.getElementById('canvas').height);
        

        //draw players
        this.context.drawImage(this.player.img, this.player_position.x, this.player_position.y, 128, 128);
        
        this.context.font ="60px serif";
        this.context.fillStyle = "black";
        this.context.fillText((this.player.health.toString() + "/" + this.player.max_health.toString()), 10, 400);
        this.context.fillText(this.player.name, 10, 100);

        //draw enemy
        this.context.drawImage(this.enemy.img, this.enemy_position.x, this.enemy_position.y, 128, 128);
        this.context.fillText((this.enemy.health.toString() + "/" + this.enemy.max_health.toString()), 600, 400);
        this.context.fillText(this.enemy.name, 600, 100);
        
        //draw options
        this.context.fillStyle = "#000000";
        this.context.fillRect(0,document.getElementById('canvas').height-200,document.getElementById('canvas').width,200);
        for(let i = 0;i<this.options.length;i++){
            this.options[i].draw(this.context);
        }
    }
    update(){
        this.selected = this.selected % this.options.length;
        for(let i = 0;i<this.options.length;i++){
            if(i == this.selected) this.options[i].selected = true;
            else this.options[i].selected = false;
        }
        console.log(this.selected);
        if(this.selected<0) this.selected = this.options.length-1;

        
        if(this.isKeyPressed('a')){
           this.selected--;
        }
        if(this.isKeyPressed('d')){
            this.selected++;
        }
        /*if(this.isKeyDown("e") && this.selected == 1){
            StateManager.pop();
        }
        if(this.isKeyPressed("e") && this.selected == 0){
            //enemy choose action


            this.player.skills[0].attack(this.enemy);

            }*/
        if(this.isKeyPressed("e")){
            if(this.can_attack){
                this.player.skills[this.selected].attack(this.enemy);
                this.can_attack = false;
                this.perform(30, function(){this.animate(this.enemy_position);});
            }
            this.delay(50, function(){
                this.player.health -= 10;
                this.can_attack = true;
                this.perform(30, function(){this.animate(this.player_position);});
            });
        }
        if(this.enemy.health <= 0){
            this.enemy.die(this.map);
            if(this.enemy.respawn){
                this.enemy.health = this.enemy.max_health;
            }
            this.player.experience += this.enemy.experience;
            StateManager.pop();
            new Modal("Gained " + this.enemy.experience + " experience| |Press e to continue");
        }
        
        if(this.player.health <= 0){
            StateManager.pop();
        }
    }
}