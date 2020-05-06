import { NPC } from "./npc.js";
import { Dialog } from "./dialog.js";
import { FightScene } from "./fightScene.js";

export class Guard extends NPC {
    constructor(x,y, dialog){
        super(x,y,"guard");
        this.dialog = dialog;
        this.damage = 20;
        this.respawn = false;
        this.name = "Guard";
        this.experience = 10;
    }
    interact(context, player, map) {
        if(this.dialog.show){
            new FightScene(player,this, map);
            this.dialog.step();
            return;
        }
        this.dialog.drawName(context, "Guard");
        this.dialog.drawText(context, "You|Shall|Not|Pass");
    }
    die(map){
        map.tiles[this.position.y / 64][this.position.x / 64] = 0;
    }
}