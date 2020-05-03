export class Scene {
    static scenes = [];
    
    constructor(){
        scenes.push(this);
    }
    update(context){
        this.draw(context);
        this.update();
    }
    draw(context){}
}