import { State, StateManager } from "/StateManager.js";
import { Vector2D } from "/maths.js";
import { Map } from "/map.js";
import { FightScene } from "/fightScene.js";
import { StatState } from "/stats.js";
import { MainState } from "./MainState";
import { MageChoice, WarriorChoice, TankChoice } from "./class_chooser";
import { TutNPC } from "./TutNPC";


export class FirstScene extends State {
    constructor(player, npcs, dialog){
        super(2);
        this.player = player;
        this.npcs = npcs;
        let coords = [[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
                        [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                        [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                        [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                        [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                        [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3],
                        [3,3,3,3,3,3,3,3,3,7,3,3,3,3,3,3,3]];
        this.map = new Map(coords);
        this.camera = new Vector2D();
        this.dialog = dialog;
        if(this.player.class != 'None'){
            this.map.tiles[6][9] = 2;
            return;
        }
        this.npcs.splice(0,this.npcs.length);

        this.npcs.push(new MageChoice(128,128,dialog, this.map, npcs));
        this.npcs.push(new WarriorChoice(256,128,dialog, this.map, npcs));
        this.npcs.push(new TankChoice(384,128,dialog, this.map, npcs));
        this.npcs.push(new TutNPC(576,384,dialog));
    }
    save(){
        var ajax = new XMLHttpRequest();
        ajax.open("POST", "db_update.php", true);
        ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        ajax.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
            }
        }
        ajax.send("name=" + this.player.name + '&exp=' + this.player.experience + '&dmg=' + this.player.damage +
         '&x=' + this.player.position.x / 64 + '&y=' + this.player.position.y / 64 + '&state=' + this.id + '&class=' + this.player.class);
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
    }
    update(){
        
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
            this.player.interact(this.context, this.npcs);
        }
        console.log(this.player.position)
        if(this.player.position.x == 576 && this.player.position.y == 384){
            StateManager.pop();
            this.player.setPosition(704,256);
            let m = new MainState(this.player,this.npcs,this.dialog);
            m.init();
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