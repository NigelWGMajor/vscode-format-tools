// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { unescape } from 'querystring';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Caser support is loaded for camelCase, snake_case, kebab-case, PascalCase, UPPER_CASE, lower_case, Title Case, and Space Case, escape and unescape');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// const disposable = vscode.commands.registerCommand('caser.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from Nix Caser!');
	// });
	function camelCase(str: string) {
		// Using replace method with regEx
		return str.replace(/[-_]+/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		}).replace(/\s+/g, '');
	}
	function snakeCase(str:string) {
		return str && (str.match(
			/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) ?? []) 
			 .map(s => s.toLowerCase())
			.join('_');
	}
	function kebabCase(str:string) {
		return str && (str.match(
			/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) ?? [])
			.map(s => s.toLowerCase())
			.join('-');
	}
	function pascallCase(str: string) {
    	return str.replace(/[-_]+/g, ' ').replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
			return index === 0 ? word.toUpperCase() : word.toUpperCase();
		}).replace(/\s+/g, '');
	}
	function upperCase(str: string) {
		return str.toUpperCase();
	}
	function lowerCase(str: string) {
		return str.toLowerCase();
	}
	function titleCase(str: string) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	}
	function spaceCase(str: string) {
		return str.replace(/(?<=[a-z])(?=[A-Z])/g, ' ').replace(/[-_]+/g, ' ');
	};
    function escape(str: string) {
		return str.replace(/[\"]+/g, '\\"');
	}
	function unEscape(str: string) {
		return str.replace(/\\\"/g, '"');
	}

	const toQuoted = vscode.commands.registerCommand('caser.toQuoted', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = '"' + text + '"';
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toUnQuoted = vscode.commands.registerCommand('caser.toUnQuoted', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = text.replace(/\"/g, '');
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toSQuoted = vscode.commands.registerCommand('caser.toSQuoted', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = '\'' + text + '\'';
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toBackTicked = vscode.commands.registerCommand('caser.toBackTicked', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = '`' + text + '`';
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toUnBackTicked = vscode.commands.registerCommand('caser.toUnBackTicked', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = text.replace(/`/g, '');
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toCurly = vscode.commands.registerCommand('caser.toCurly', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = '{' + text + '}';
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toParens = vscode.commands.registerCommand('caser.toParens', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = '(' + text + ')';
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toSquare = vscode.commands.registerCommand('caser.toSquare', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = '[' + text + ']';
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toStarred = vscode.commands.registerCommand('caser.toStarred', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = '*' + text + '*';
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toUnderScored = vscode.commands.registerCommand('caser.toUnderScored', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = '_' + text + '_';
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toTilded = vscode.commands.registerCommand('caser.toTilded', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
			editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = '~' + text + '~';
					builder.replace(selection, newText);
				}
			});
		}
	});

	const toAngle = vscode.commands.registerCommand('caser.toAngle', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = '<' + text + '>';
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toNone = vscode.commands.registerCommand('caser.toNone', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = text.substring(1, text.length - 1);
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toUnSQuoted = vscode.commands.registerCommand('caser.toUnSQuoted', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = text.replace(/\'/g, '');
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toCamelCase = vscode.commands.registerCommand('caser.toCamelCase', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = camelCase(text);
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toSnakeCase = vscode.commands.registerCommand('caser.toSnakeCase', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = snakeCase(text);
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toKebabCase = vscode.commands.registerCommand('caser.toKebabCase', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = kebabCase(text);
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toPascalCase = vscode.commands.registerCommand('caser.toPascalCase', () => {	
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = pascallCase(text);
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toUpperCase = vscode.commands.registerCommand('caser.toUpperCase', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = upperCase(text);
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toLowerCase = vscode.commands.registerCommand('caser.toLowerCase', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = lowerCase(text);
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toTitleCase = vscode.commands.registerCommand('caser.toTitleCase', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = titleCase(text);
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toSpaceCase = vscode.commands.registerCommand('caser.toSpaceCase', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = spaceCase(text);
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toEscaped = vscode.commands.registerCommand('caser.toEscaped', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = escape(text);
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toUnEscaped = vscode.commands.registerCommand('caser.toUnEscaped', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
            editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = unEscape(text);
					builder.replace(selection, newText);
				}
			});
		}
	});
	const loremIpsum = vscode.commands.registerCommand('caser.loremIpsum', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
			editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = text + ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt metus in justo pretium congue. Donec lobortis nunc a sapien tempor, in luctus mi volutpat. Sed convallis lacus dolor, in iaculis purus pharetra id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a bibendum nisi. Aliquam augue urna, commodo a dui pharetra, suscipit laoreet mauris. Aliquam ac orci a neque dignissim hendrerit.';
					builder.replace(selection, newText);
				}
			});
		}
	});

	context.subscriptions.push(toCamelCase);
	context.subscriptions.push(toSnakeCase);
	context.subscriptions.push(toKebabCase);
	context.subscriptions.push(toPascalCase);
	context.subscriptions.push(toUpperCase);
	context.subscriptions.push(toLowerCase);
	context.subscriptions.push(toTitleCase);
	context.subscriptions.push(toSpaceCase);
	context.subscriptions.push(toEscaped);
	context.subscriptions.push(toUnEscaped);
	context.subscriptions.push(toQuoted);
	context.subscriptions.push(toUnQuoted);
	context.subscriptions.push(toSQuoted);
	context.subscriptions.push(toUnSQuoted);
	context.subscriptions.push(toBackTicked);
	context.subscriptions.push(toUnBackTicked);
	context.subscriptions.push(loremIpsum);
	context.subscriptions.push(toCurly);
	context.subscriptions.push(toAngle);
	context.subscriptions.push(toParens);
	context.subscriptions.push(toSquare);
	context.subscriptions.push(toNone);
	context.subscriptions.push(toStarred);
	context.subscriptions.push(toUnderScored);
	context.subscriptions.push(toTilded);
}

// This method is called when your extension is deactivated
export function deactivate() {}
