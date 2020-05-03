export class Menu {
	constructor() {
		Menu.selected = 0;
		this.play_image = document.getElementById("play_button");
		this.selected_play_image = document.getElementById("play_button_selected");
		
		this.load_image = document.getElementById("load_button");
		this.selected_load_image = document.getElementById("load_button_selected");

		this.tmp_play = this.play_image;
		this.tmp_load = this.load_image;

		document.addEventListener('keydown', function(event){
			if(event.key == 'w'){
				if(Menu.selected < 1) Menu.selected += 1;
				else Menu.selected = 0;
			}
			if(event.key == 's'){
				if(Menu.selected > 0) Menu.selected -= 1;
				else Menu.selected = 1;
			}	
		});
	}
	
	draw(context) {
		
		context.drawImage(this.tmp_play, document.getElementById("canvas").width / 2 - 200,document.getElementById("canvas").height / 2 - 200, 400, 200);
		context.drawImage(this.tmp_load, document.getElementById("canvas").width / 2 - 200,document.getElementById("canvas").height / 2 - 100, 400, 200);
			
		switch(Menu.selected){
			case 0:
				this.tmp_play = this.selected_play_image;
				this.tmp_load = this.load_image;
				break;
			case 1:
				this.tmp_load = this.selected_load_image;
				this.tmp_play = this.play_image;
				break;
		}
	}
}