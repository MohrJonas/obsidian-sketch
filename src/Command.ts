export default abstract class Command {

	constructor(public readonly args: Array<string>, public readonly environment: Record<string, string>) { }

	protected resetEnvironment(content: CanvasRenderingContext2D) {
		content.setLineDash([]);
		content.strokeStyle = "black";
		content.fillStyle = "black";
		content.lineWidth = 1;
	}

	protected applyEnvironment(content: CanvasRenderingContext2D) {
		this.resetEnvironment(content);
		Object.keys(this.environment).forEach((key) => {
			switch (key) {
			case "stroke": {
				let stroke: Array<number>;
				switch (this.environment["stroke"]) {
				case "dotted": {
					stroke = [1, 1];
					break;
				}
				case "dashed": {
					stroke = [2, 1];
					break;
				}
				case "long-dashed": {
					stroke = [3, 2];
					break;
				}
				default: {
					stroke = [];
					break;
				}
				}
				content.setLineDash(stroke);
				break;
			}
			case "color": {
				content.strokeStyle = this.environment["color"];
				break;
			}
			case "fill": {
				content.fillStyle = this.environment["fill"];
				break;
			}
			case "line-width": {
				content.lineWidth = parseInt(this.environment["line-width"]);
				break;
			}

			}
		});
	}

	abstract draw(context: CanvasRenderingContext2D): void
}
