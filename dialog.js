import { State } from "./StateManager.js";

export class Dialog {
    constructor() {
        
        this.text = "";
        this.currentText = "";
        this.name = "";
        this.show = false;
        this.index = 0;
    }
    drawText(context, text){
        this.text = text;
        this.show = true;
       
        context.fillStyle = "#ffffff";
    }
    drawName(context,text) {
        this.name = text;
        
    }
    step(){
        this.show = false;
        this.currentText = "";
        this.index = 0;
    }
    update(context){
        if(!this.show) return;
        if(this.index < this.text.length){
            this.currentText += this.text[this.index];
            this.index+=1;
        } 
        context.fillStyle = "#000000";
        context.fillRect(0,document.getElementById('canvas').height-200,document.getElementById('canvas').width,200);
        context.fillStyle = "#ffffff";
        let lines = this.currentText.split('|');
        for(let i = 0;i<lines.length;i++){
            context.font = "30px Arial";
            context.fillText(lines[i], 10, document.getElementById('canvas').height-160+(30*i));
        }
        context.fillStyle = "#000000";
        context.fillText(this.name, 10, document.getElementById('canvas').height-220);
    }
}