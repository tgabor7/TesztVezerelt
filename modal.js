import { StateManager, State } from "./StateManager.js";

export class Modal extends State {
    constructor(text){
        super();
        this.text = text;
    }
    draw(){
        this.context.fillStyle = "#000000";
        
        let lines = this.text.split('|');
        
        let height = document.getElementById('canvas').height;
        let width = document.getElementById('canvas').width;
        this.context.fillRect(width/2 - (this.maxchar(lines)*30)/2,height/2 - (lines.length*100)/2,this.maxchar(lines)*30,lines.length*100);

        this.context.fillStyle = "#ffffff";
        this.context.font ="30px serif";

        for(var i = 0;i<lines.length;i++){
            this.context.fillText(lines[i], width/2 - ((this.maxchar(lines)*30)/4),height/2 - ((lines.length*100)/4) + i*50);
        }
    }
    maxchar(lines){
        let m = 0;
        for(var i = 0;i<lines.length;i++){
            if(lines[i].length > m){
                m = lines[i].length;
            }
        }
        return m;
    }
    update(){
        if(this.isKeyPressed("e")){
            StateManager.pop();
        }
    }
}