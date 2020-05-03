export class Map {
	constructor(map){
		this.tiles = map;
		
		
		this.images = [];
		this.images.push(document.getElementById("img_0"));
		this.images.push(document.getElementById("img_1"));
		this.images.push(document.getElementById("img_2"));
		this.images.push(document.getElementById("img_3"));
		this.images.push(document.getElementById("img_4"));
		this.images.push(document.getElementById("img_0"));

		this.images.push(document.getElementById("img_2"));
		this.images.push(document.getElementById("img_2"));

		this.canvas_width = document.getElementById("canvas").width / 2;
		this.canvas_height = document.getElementById("canvas").height / 2;
	}
	draw(context, camera) {
		context.fillStyle = "white";
		context.fillRect(0,0,document.getElementById("canvas").width,document.getElementById("canvas").height);
		for(let i = this.tiles.length-1;i>=0;i--){
			for(let j = 0;j<this.tiles[0].length;j++){
				
				let img = this.images[this.tiles[i][j]];
				
				context.drawImage(img, j * 64 - camera.x + this.canvas_width,i * 64 - camera.y + this.canvas_height, 64, 64);
			}
		}
	}
}