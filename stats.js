import { State, StateManager } from "/StateManager.js";

export class StatState extends State {
    constructor(player){
        super();
        this.player = player;
    }
    draw(){
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(0,0,document.getElementById('canvas').width,document.getElementById('canvas').height);

        this.context.font ="30px serif";
        this.context.fillStyle = "#000000";
        this.context.fillText("damage: " + this.player.damage.toString(), 100,100);
        this.context.font ="60px serif";
        this.context.fillText(this.player.name, 50, 50);
        this.context.fillText("health: " + this.player.health.toString() + "/" + this.player.max_health.toString(), 100, 150);
        
        
    }
    update(){
        if(this.isKeyPressed("Enter")){
            StateManager.pop();
        }
    }
}