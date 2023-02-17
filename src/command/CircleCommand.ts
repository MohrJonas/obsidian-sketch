import Command from "src/Command";

export default class CircleCommand extends Command {

	private readonly x: number;
	private readonly y: number;
	private readonly radius: number;
	private readonly startAngle: number;
	private readonly endAngle: number;

	constructor(args: Array<string>, env: Record<string, string>) {
		super(args, env);
		try {
			this.x = parseInt(args[0]);
			this.y = parseInt(args[1]);
			this.radius = parseInt(args[2]);
			this.startAngle = parseInt(args[3]) ? parseInt(args[3]) : 0;
			this.endAngle = parseInt(args[4]) ? parseInt(args[4]) : 2 * Math.PI;
		}
		catch {
			console.log("Malformed command");
		}
	}

	draw(context: CanvasRenderingContext2D) {
		super.applyEnvironment(context);
		const path = new Path2D();
		path.ellipse(this.x, this.x, this.radius, this.radius, 0, this.startAngle, this.endAngle, false);
		if("fill" in this.environment)
			context.fill(path);
		else
			context.stroke(path);
	}
}
