import Command from "src/Command";

export default class EllipsisCommand extends Command {

	private readonly x: number;
	private readonly y: number;
	private readonly radiusX: number;
	private readonly radiusY: number;
	private readonly startAngle: number;
	private readonly endAngle: number;

	constructor(args: Array<string>, env: Record<string, string>) {
		super(args, env);
		try {
			this.x = parseInt(args[0]);
			this.y = parseInt(args[1]);
			this.radiusX = parseInt(args[2]);
			this.radiusY = parseInt(args[3]);
			this.startAngle = parseInt(args[4]) ? parseInt(args[4]) : 0;
			this.endAngle = parseInt(args[5]) ? parseInt(args[5]) : 2 * Math.PI;
		}
		catch {
			console.log("Malformed command");
		}
	}

	draw(context: CanvasRenderingContext2D) {
		super.applyEnvironment(context);
		const path = new Path2D();
		path.ellipse(this.x, this.x, this.radiusX, this.radiusY, 0, this.startAngle, this.endAngle, false);
		if("fill" in this.environment)
			context.fill(path);
		else
			context.stroke(path);
	}
}
