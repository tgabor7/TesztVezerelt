import { State, StateManager } from "/StateManager.js";
import { Vector2D } from "/maths.js";
import { Map } from "/map.js";
import { FightScene } from "/fightScene.js";
import { StatState } from "/stats.js";
import { FirstScene } from "./firstScene";
import { Boss } from "./boss.js";

export class MainState extends State{
    constructor(player, npcs, dialog){
        super(3);
        this.player = player;
        this.npcs = npcs;
        let coords = [
                     [0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0],
                     [0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0],
                     [1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1],
					 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					 [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
					 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,1,1,1,1,1,1,1,1],
					 [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
					 [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
					 [1,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,1],
					 [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
					 [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
					 [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1]
					 ]
        this.map = new Map(coords);
        this.camera = new Vector2D();
        this.dialog = dialog;
        this.npcs.push(new Boss(64*14,64*8,this.dialog));
        this.npcs.push(new Boss(64*17,64*11,this.dialog));
        this.npcs.push(new Boss(64*6,64*11,this.dialog));
        
    }
    draw(){
        
        this.map.draw(this.context, this.camera);
	
        this.player.draw(this.context, this.camera);
        this.player.update(this.map);
    
        for(let i = 0;i<this.npcs.length;i++){
            this.npcs[i].draw(this.context, this.camera);
        }
        this.dialog.update(this.context);
        for(let i = 0;i<this.npcs.length;i++){
            if(this.npcs[i].health <= 0){
                this.npcs.splice(i, 1);
            }
        } 
        console.log(this.player.position);
    }
    save(){
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "db_update.php", true);
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                alert(this.responseText);
            }
        }
        ajax.send("name=" + this.player.name + '&exp=' + this.player.experience + '&dmg=' + this.player.damage +
         '&x=' + this.player.position.x / 64 + '&y=' + this.player.position.y / 64 + '&state=' + this.id + '&class=' + this.player.class);
    }
    update(){
        if(this.player.health <= 0){
            StateManager.pop();
            this.player.health = this.player.max_health;
            new FirstScene(this.player, this.npcs, this.dialog);
        }
        if(this.player.position.x == 704 && this.player.position.y == 192){
            StateManager.pop();
            this.player.setPosition(640,128);
            new FirstScene(this.player,this.npcs,this.dialog);
        }
        if(this.isKeyPressed('Enter')){
            //StateManager.pop();
            new StatState(this.player);
        }
        if(this.isKeyPressed('e')){
            /*if(this.dialog.show){
                new FightScene(this.player,this.npcs[0]);
                this.dialog.step();
            } else {
                this.player.interact(context,this.npcs);
            } */
            this.save();
            this.player.interact(this.context, this.npcs, this.map);
        }

        if(this.isKeyDown('w')){
            this.player.move(0);
        }
        if(this.isKeyDown('s')){
            this.player.move(1);
        }
        if(this.isKeyDown('a')){
            this.player.move(2);
        }
        if(this.isKeyDown('d')){
            this.player.move(3);
        }
        this.camera = this.player.position;
    }
}