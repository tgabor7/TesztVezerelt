import { NPC } from "./npc.js";
import { Dialog } from "./dialog.js";
import { FightScene } from "./fightScene.js";

export class TutNPC extends NPC {
    constructor(x,y, dialog){
        super(x,y,"GuideNPC");
        this.dialog = dialog;
        
    }
    interact(context, player) {
        if(this.dialog.show){
            this.dialog.step();
            return;
        }
        this.dialog.drawName(context, "Guide");
        this.dialog.drawText(context, "Hello " + player.name + "!|Please choose a class!");      
    }
}