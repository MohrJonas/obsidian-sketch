import { filter, map } from "lodash";

export class Statement {

	public readonly command: string | undefined;
	public readonly args: Array<string>;

	constructor(public readonly line: number, public readonly text: string, public readonly isAnnotation: boolean) {
		const parts = map(text.substring(isAnnotation ? 2 : 1, text.length - 1).split(" "), (part) => {return part.trim(); });
		this.command = parts.shift();
		this.args = parts;
	}
}

export function lex(text: string): Array<Statement> {
	const lines = map(filter(text.split("\n"), (line) => { return line.trim().length != 0; }), (line) => { return line.trim(); });
	const tokens: Array<Statement> = [];
	const annotationRegex = /@\(.+\)/;
	const statementRegex = /\(.+\)/;
	lines.forEach((line, index) => {
		if(annotationRegex.test(line))
			tokens.push(new Statement(index, line, true));
		else if(statementRegex.test(line))
			tokens.push(new Statement(index, line, false));
		else
			console.log(`Unknown statement ${line}`);
			
	});
	return tokens;
}
