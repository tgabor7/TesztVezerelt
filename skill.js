import { StateManager } from "./StateManager.js";

class Skill {
    constructor(player){
        this.player = player;
        this. name = "default";
    }
    attack(){}
}

export class Bonk extends Skill {
    constructor(player){
        super(player);
        this.name = "Bonk";
    }
    attack(enemy){
        enemy.health -= this.player.damage;
    }
}
export class Escape extends Skill {
    constructor(player){
        super(player);
        this.name = "Run";
    }
    attack(enemy){
        StateManager.pop();
    }
}
export class Heal extends Skill {
    constructor(player){
        super(player);
        this.name = "Heal";
    }
    attack(enemy){
        this.player.health += 20;
    }
}