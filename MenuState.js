import { State, StateManager } from "/StateManager.js";
import { FirstScene } from "./firstScene.js";
import { Player } from "./player.js";
import { MainState } from "./MainState.js";

export class MenuState extends State {
    constructor(player, npcs, dialog){
        super(0);
        this.selected = 0;
        this.text = "";
        this.player = player;
        this.npcs = npcs;
        this.dialog = dialog;
    }
    
    draw(){
        this.context.font ="60px serif";
        this.context.fillStyle = "black";
        
        this.context.fillText("Username: ",40,300);
        this.context.fillText(this.text,335,300);
        this.context.beginPath();
        this.context.rect(330, 245, 400, 80);
        this.context.stroke();
        
        
    }
    update(){
        if(this.getKeyCode() == 8){
            this.text = this.text.substring(0, this.text.length - 1);
        }
        if(this.isKeyPressed("Enter")){

            /*var ajax = new XMLHttpRequest();
            ajax.open("GET", "db_connect.php", true);
            ajax.send();

            ajax.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    alert(this.responseText);
                    
                }
            };*/
            
            var ajax = new XMLHttpRequest();
            ajax.open("POST", "db_insert.php", true);
            ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            
            var t = this.text;
            var p = this.player;
            var n = this.npcs;
            var d = this.dialog;
            var t = this.text;
            ajax.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    if(this.responseText == "ok"){
                        p.name = this.text;
                        p.damage = 1000;
                        if(t.length > 0) new FirstScene(p,n,d);
                    }else{
                        var gajax = new XMLHttpRequest();
                        gajax.open("POST", "db_get.php", true);
                        gajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        gajax.onreadystatechange = function(){
                            if(this.readyState == 4 && this.status == 200){
                                let params = this.responseText.split(" ");
                                let pl = new Player();
                                pl.experience = params[0];
                                pl.damage = params[1];
                                pl.name = t;
                                pl.setPosition(params[3]*64,params[4]*64);
                              

                                alert(pl.position);
                                alert(params[2]);
                                switch(params[2]){
                                    case("2"):
                                        new FirstScene(pl,n,d);
                                        break;
                                    case("3"):
                                        new MainState(pl, n, d);
                                        break;
                                    default:
                                        new FirstScene(pl,n,d);
                                        break;
                                }
                                
                            }
                        }
                        gajax.send("name=" + t);
                    }
                }
            };
            ajax.send("name=" + this.text);
            this.player.name = this.text;
        }
        if(this.isKeyPressed("a")){
            this.selected++;
        }
        if(this.isKeyPressed("d")){
            this.selected--;
        }
        if(this.text.length < 10 && !this.isKeyPressed("Enter")) this.text += this.getKeyDown();
        console.log(this.selected);
    }
}