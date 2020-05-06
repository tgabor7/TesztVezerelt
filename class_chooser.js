import { NPC } from "./npc.js";
import { FireBall } from "./skill.js";


export class MageChoice extends NPC {
    constructor(x, y, dialog, map, npcs){
        super(x,y,"staff");
        this.map = map;
        this.npcs = npcs;
        this.dialog = dialog;
    }
    interact(context, player) {
        if(this.dialog.show){
            this.dialog.step();
            player.class = "Mage";   
            this.npcs.splice(0,this.npcs.length);
            this.map.tiles[6][9] = 2;


            return;
        }
        this.dialog.drawName(context, "Staff");
        this.dialog.drawText(context, "You are a MAGE now!");     
        player.max_health = 50;
        player.health = 50;
        player.damage = 15;
        player.skills.push(new FireBall(player));
    }
}
export class WarriorChoice extends NPC {
    constructor(x, y, dialog, map, npcs){
        super(x,y,"sword");
        this.map = map;
        this.npcs = npcs;
        this.dialog = dialog;
    }
    interact(context, player) {
        if(this.dialog.show){
            this.dialog.step();
            player.class = "Warrior";   
            this.npcs.splice(0,this.npcs.length);
            this.map.tiles[6][9] = 2;

            
            return;
        }
        this.dialog.drawName(context, "Sword");
        this.dialog.drawText(context, "You are a WARRIOR now!");      
        


    }
}
export class TankChoice extends NPC {
    constructor(x, y, dialog, map, npcs){
        super(x,y,"shield");
        this.map = map;
        this.npcs = npcs;
        this.dialog = dialog;
    }
    interact(context, player) {
        if(this.dialog.show){
            this.dialog.step();
            player.class = "Tank";   
            this.npcs.splice(0,this.npcs.length);
            this.map.tiles[6][9] = 2;

            return;
        }
        this.dialog.drawName(context, "Shield");
        this.dialog.drawText(context, "You are a TANK now!");
        player.max_health = 200;
        player.health = 200;
        player.damage = 5;
    }
}