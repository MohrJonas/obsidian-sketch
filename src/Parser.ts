import Command from "./Command";
import { Statement } from "./Lexer";
import LineCommand from "./command/LineCommand";
import RectCommand from "./command/RectCommand";
import CenterRectCommand from "./command/CenterRectCommand";
import CircleCommand from "./command/CircleCommand";
import EllipsisCommand from "./command/EllipsisCommand";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const COMMAND_LIST: Record<string, any> = {
	"line": LineCommand,
	"rect": RectCommand,
	"crect": CenterRectCommand,
	"circle": CircleCommand,
	"ellip": EllipsisCommand,
};

export function parse(statements: Array<Statement>): Array<Command> {
	const commands: Array<Command> = [];
	let environment: Record<string, unknown> = {};
	statements.forEach((statement, index) => {
		if (!statement.isAnnotation && statement.command) {
			const annotations: Record<string, unknown> = {};
			for (let i = index - 1; i >= 0; i--) {
				if (statements[i].isAnnotation && statements[i].command)
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					annotations[statements[i].command!] = statements[i].args[0];
				else break;
			}
			if(statement.command == "begin-region")
				environment = annotations;
			else if(statement.command == "end-region")
				environment = {};
			else
				commands.push(new COMMAND_LIST[statement.command](statement.args, Object.assign({}, environment, annotations)));
		}
	});
	return commands;
} 
