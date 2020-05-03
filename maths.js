export class Maths {
	static collides(amin, amax, bmin, bmax) {
		if(amin.x > bmax.x || amax.x < bmin.x || amin.y > bmax.y || amax.y < bmin.y){
			return false;
		}
		return true;
	}
}
export class Vector2D {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	add(v)  {
		let result = new Vector2D(this.x,this.y);
		result.x += v.x;
		result.y += v.y;

		return result;
	}
	sub(v) {
		let result = new Vector2D(this.x,this.y);
		result.x -= v.x;
		result.y -= v.y;

		return result;
	}
	length() {
		return (Math.sqrt(this.x*this.x+this.y*this.y));
	}
	equals(v) {
		return (this.x == v.x && this.y == v.y);
	}
	toString(){
		return "[" + this.x + "," + this.y + "]";
	}
}