var keys_down = {};
var key_down = '';
var old_keys = {};
var key_code = '';

document.addEventListener('keydown', function(event){
    keys_down[event.key] = true;
    key_code = event.keyCode;
});
document.addEventListener('keypress', function(event){
	key_down = event.key;
});
document.addEventListener('keyup', function(event){
	delete keys_down[event.key];
});

export class State {
    constructor(id){
        StateManager.add(this);
        this.id = id;
        this.time = 0;
        this.context = StateManager.context;
        this.delayed_function = null;
        this.secs = 0;

        this.perform_function = null;
        this.psecs = 0;
        this.ptime = 0;

        key_down = '';
    }
    draw(){}
    update(){
    }
    update_timer(){
        if(this.perform_function != null){
            this.ptime++;
            this.perform_function();
            if(this.ptime > this.psecs){
                this.perform_function = null;
                this.ptime = 0;
                this.psecs = 0;
            }
        }
        if(this.delayed_function != null){
            this.time++;
            if(this.time > this.secs){
                this.delayed_function();
                this.delayed_function = null;
                this.secs = 0;
                this.time = 0;
            }
        }
    }
    isKeyDown(key) {
        return keys_down[key];
    }
    getKeyCode(){
        return key_code;
    }
    getKeyDown(){
        return key_down;
    }
    isKeyPressed(key){
        return (key_down==key);
    }
    perform(secs, f){
        this.psecs = secs;
        this.perform_function = f;
    }
    delay(secs, f){
        this.secs = secs;
        this.delayed_function = f;
    }
}
export class StateManager {
    
    static states = [];
    constructor(){}

    static init(context){
        StateManager.context = context;
    }    
    static add(state){
        StateManager.states.push(state);
    }
    static pop(){
        StateManager.states.pop();
    }
    static draw(){
        for(var i = 0;i<StateManager.states.length;i++){
            StateManager.states[i].draw();
        }
        StateManager.states[StateManager.states.length-1].update();
        StateManager.states[StateManager.states.length-1].update_timer();
        
        key_down = '';
        key_code = '';
    }
}