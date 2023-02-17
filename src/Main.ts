import { Plugin } from "obsidian";
import { lex } from "./Lexer";
import { parse } from "./Parser";

export default class ObsidianSketch extends Plugin {
	
	async onload() {
		this.registerMarkdownCodeBlockProcessor("sketch", (src, el) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			const centered = el.createEl("center");
			const canvas = centered.createEl("canvas");
			canvas.style.width = "80%";
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const context = canvas.getContext("2d")!;
			const tokens = lex(src);
			const commands = parse(tokens);
			console.log(canvas.width);
			commands.forEach((command) => { 
				command.draw(context); 
			});
		});
	}
}
