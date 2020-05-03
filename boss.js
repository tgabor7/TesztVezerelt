import { NPC } from "./npc.js";
import { Dialog } from "./dialog.js";
import { FightScene } from "./fightScene.js";

export class Boss extends NPC {
    constructor(x,y, dialog){
        super(x,y,"enemy");
        this.dialog = dialog;
        this.damage = 100;
        this.respawn = false;
        this.name = "Thanos";
        this.experience = 5;
    }
    interact(context, player, map) {
        if(this.dialog.show){
            new FightScene(player,this, map);
            this.dialog.step();
            return;
        }
        this.dialog.drawName(context, "Thanos");
        this.dialog.drawText(context, "You want some of this?|Bitch!");
    }
    die(map){
        map.tiles[this.position.y / 64][this.position.x / 64] = 0;
    }
}