import Command from "src/Command";

export default class CenterRectCommand extends Command {

	private readonly x: number;
	private readonly y: number;
	private readonly width: number;
	private readonly height: number;

	constructor(args: Array<string>, env: Record<string, string>) {
		super(args, env);
		try {
			this.width = parseInt(args[2]);
			this.height = parseInt(args[3]);
			this.x = parseInt(args[0]) - this.width / 2;
			this.y = parseInt(args[1]) - this.height / 2;
		}
		catch {
			console.log("Malformed command");
		}
	}

	draw(context: CanvasRenderingContext2D) {
		super.applyEnvironment(context);
		if("fill" in this.environment)
			context.fillRect(this.x, this.y, this.width, this.height);
		else
			context.strokeRect(this.x, this.y, this.width, this.height);
	}

}
