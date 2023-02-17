import Command from "../Command";

export default class LineCommand extends Command {

	private readonly x1: number;
	private readonly y1: number;
	private readonly x2: number;
	private readonly y2: number;

	constructor(args: Array<string>, env: Record<string, string>) {
		super(args, env);
		try {
			this.x1 = parseInt(args[0]);
			this.y1 = parseInt(args[1]);
			this.x2 = parseInt(args[2]);
			this.y2 = parseInt(args[3]);
		}
		catch {
			console.log("Malformed command");
		}
	}



	draw(context: CanvasRenderingContext2D): void {
		super.applyEnvironment(context);
		if ("arrow" in this.environment) {
			//From https://stackoverflow.com/questions/808826/draw-arrow-on-canvas-tag
			const headlen = 10;
			const dx = this.x2 - this.x1;
			const dy = this.y2 - this.y1;
			const angle = Math.atan2(dy, dx);
			context.moveTo(this.x1, this.y1);
			context.lineTo(this.x2, this.y2);
			context.lineTo(this.x2 - headlen * Math.cos(angle - Math.PI / 6), this.y2 - headlen * Math.sin(angle - Math.PI / 6));
			context.moveTo(this.x2, this.y2);
			context.lineTo(this.x2 - headlen * Math.cos(angle + Math.PI / 6), this.y2 - headlen * Math.sin(angle + Math.PI / 6));
		}
		else {
			context.moveTo(this.x1, this.y1);
			context.lineTo(this.x2, this.y2);
		}
		context.stroke();
	}
}
