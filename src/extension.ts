// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import { unescape } from 'querystring';
import * as vscode from 'vscode';
import * as crypto from 'crypto-js';
import { getEnvironmentData } from 'worker_threads';
import { writeHeapSnapshot } from 'v8';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// ////////////////////////////////////////////////////////////
	// TODO: 01
	// Add your function in this section then look for TODO: 02
	///////////////////////////////////////////////////////////////

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
	function snakeCase(str: string) {
		return str && (str.match(
			/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) ?? [])
			.map(s => s.toLowerCase())
			.join('_');
	}
	function kebabCase(str: string) {
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
	const head = '<>-<';
	const tail = '>-<>';
	function clear(str: string) {
		if (str.startsWith(head) && str.endsWith(tail)) {
			return crypto.enc.Base64.parse(str.substring(head.length, str.length - tail.length)).toString(crypto.enc.Utf8);
		}
		else {
			return str;
		}
	}
	function clearSafe(str: string) {
		let local = process.env.VSCODE_KEY;
		if (local === undefined) {
			local = 'lbfpjhblfdahpfr';
		}
		const decrypted = crypto.AES.decrypt(str, local);
		return decrypted.toString(crypto.enc.Utf8);
	}
	function secureSafe(str: string) {
		let local = process.env.VSCODE_KEY?.toString();
		if (local === undefined) {
			local = 'lbfpjhblfdahpfr';
		}
		return head + crypto.AES.encrypt(str, local).toString() + tail;
	}
	function flip(str: string) {
		if (str.startsWith(head) && str.endsWith(tail)) {
			return clearSafe(str.substring(head.length, str.length - tail.length));
		}
		else {
			return secureSafe(str);
		}
	}
	function secure(str: string) {
		return head + crypto.enc.Utf8.parse(str).toString(crypto.enc.Base64) + tail;
	}
	function defaultToLineSelected(editor: vscode.TextEditor | undefined) {
		if (!editor) {
			return;
		}
		const selection = editor.selection;
		if (selection.isEmpty) {
			const line = editor.document.lineAt(selection.start.line);
			editor.selection = new vscode.Selection(line.range.start, line.range.end);
		}
	}
	function defaultToWordSelected(editor: vscode.TextEditor | undefined) {
		if (!editor) {
			return;
		}
		const selection = editor.selection;
		if (selection.isEmpty) { // if the current selection is empty, expand it
			const word = editor.document.getWordRangeAtPosition(selection.start);
			if (word) {
				editor.selection = new vscode.Selection(word.start, word.end);
			}
		}
	};
	function stripWhiteSpace(text: string) {
		return text.replace(/\s{2,100}/g, ' ');  
	}
	function FindMarked(editor: vscode.TextEditor | undefined) {
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
			const start = '<>-<';
			const end = '>-<>';
			// if only one selection and it is empty
			// extend the selection to include the whole line
			if (selections.length === 1) {
				const selection = selections[0];
				if (!selection.isEmpty) {
					return;
				}
				const line = document.lineAt(selection.start.line);
				// find if there is a start marker in the line
				const startIndex = line.text.indexOf(start);
				if (startIndex >= 0) {
					// if found, find the end marker
					const endIndex = line.text.indexOf(end, startIndex + start.length);
					if (endIndex >= 0) {
						// if found, extend the selection to include the markers
						editor.selections = [new vscode.Selection(
							line.range.start.translate(0, startIndex),
							line.range.start.translate(0, endIndex + end.length)
						)];
						return;
					}
				}
				// otherwise, select the whole line.
				editor.selections = [new vscode.Selection(
					line.range.start,
					line.range.end
				)];
			}
		}
	}
	function safeChar(str: string) {
		// convert to a codepoint and back
		const code = str.codePointAt(0);
		if (code === undefined) {
			return '';
		}
		const char = String.fromCodePoint(code);
		return char;
	}
	function processSelections(
		editor: vscode.TextEditor,
		setA: string[],
		newSelections: vscode.Selection[]
	) {
		const document = editor.document;
	
		editor.edit(builder => {
			for (const selection of newSelections) {
				const line = document.getText(selection);
				const characters = [...line];
				const firstChar = characters[0];
	
				if (!firstChar) {
					continue; // Skip empty lines
				}
	
				const index = setA.indexOf(firstChar);
				if (index >= 0) {
					const newText = setA[(index + 1) % setA.length] + line.slice(firstChar.length);
					builder.replace(selection, newText);
				} else {
					const newText = setA[0] + ' ' + line;
					builder.replace(selection, newText);
				}
			}
		});
	
		editor.selections = newSelections;
	}
	function processAtSelections(
		editor: vscode.TextEditor,
		setA: string[],
		newSelections: vscode.Selection[]
	) {
		const document = editor.document;
	
		editor.edit(builder => {
			for (const selection of newSelections) {
				const line = document.getText(selection);
				const characters = [...line];
				const firstChar = characters[0];
	
				if (!firstChar) {
					continue; // Skip empty lines
				}
	
				const index = setA.indexOf(firstChar);
				if (index >= 0) {
					const newText = setA[(index + 1) % setA.length] + line.slice(firstChar.length);
					builder.replace(selection, newText);
				} else {
					const newText = setA[0] + ' ' + line;
					builder.replace(selection, newText);
				}
			}
		});
		editor.selections = newSelections;
	}
	const toQuoted = vscode.commands.registerCommand('caser.toQuoted', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			defaultToLineSelected(editor);
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
			defaultToLineSelected(editor);
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
			defaultToLineSelected(editor);
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
			defaultToLineSelected(editor);
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
			defaultToLineSelected(editor);
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
			defaultToLineSelected(editor);
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
			defaultToLineSelected(editor);
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
			defaultToLineSelected(editor);
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
			defaultToWordSelected(editor);
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
			defaultToWordSelected(editor);
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
			defaultToLineSelected(editor);
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
			defaultToWordSelected(editor);
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
			defaultToLineSelected(editor);
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
			defaultToLineSelected(editor);
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
			defaultToWordSelected(editor);
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
			defaultToWordSelected(editor);
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
			defaultToWordSelected(editor);
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
			defaultToWordSelected(editor);
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
			defaultToWordSelected(editor);
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
			defaultToWordSelected(editor);
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
			defaultToWordSelected(editor);
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
			defaultToLineSelected(editor);
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
					const newText = text + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tincidunt metus in justo pretium congue. Donec lobortis nunc a sapien tempor, in luctus mi volutpat. Sed convallis lacus dolor, in iaculis purus pharetra id. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a bibendum nisi. Aliquam augue urna, commodo a dui pharetra, suscipit laoreet mauris. Aliquam ac orci a neque dignissim hendrerit.';
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toClear = vscode.commands.registerCommand('caser.toClear', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
			editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = clear(text);
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toSecure = vscode.commands.registerCommand('caser.toSecure', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
			editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = secure(text);
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toFlip = vscode.commands.registerCommand('caser.toFlip', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			FindMarked(editor);
			const document = editor.document;
			const selections = editor.selections;
			editor.edit(builder => {
				for (const selection of selections) {
					const text = document.getText(selection);
					const newText = flip(text);
					builder.replace(selection, newText);
				}
			});
		}
	});
	const toCompact = vscode.commands.registerCommand('caser.toCompact', () => {
		const editor = vscode.window.activeTextEditor;
		defaultToLineSelected(editor);
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
			editor.edit(builder => {
				for (const selection of selections) {
					const text = stripWhiteSpace(document.getText(selection));
					builder.replace(selection, text);
				}
			});
		}
	});
	const toSwap = vscode.commands.registerCommand('caser.toSwap', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
			if (selections.length === 2) {
				const text1 = document.getText(selections[0]);
				const text2 = document.getText(selections[1]);

				editor.edit(builder => {
					builder.replace(selections[0], text2);
					builder.replace(selections[1], text1);
				});
			}
			else {
				if (selections.length === 1 && selections[0].isEmpty) {
					const line = document.lineAt(selections[0].start.line);
					const text = line.text;
					if (text.charAt(selections[0].start.character) === ' '
						|| // the character before this one is a space
						text.charAt(selections[0].start.character - 1) === ' '
					) {
						// get the word after the space
						const range1 = document.getWordRangeAtPosition(selections[0].start.translate(0, 1));
						const range2 = document.getWordRangeAtPosition(selections[0].start.translate(0, -1));
						// get the text offrom range 1 and range 2
						if (range1 && range2) {
							const word1 = document.getText(range1);
							const word2 = document.getText(range2);

							editor.edit(builder => {
								builder.replace(range1, word2);
								builder.replace(range2, word1);
							});
						}
					}
					else if (selections.length === 1 && selections[0].isEmpty && selections[0].start.character > 0) {
						// exchange the letters at the cursor
						const range1 = new vscode.Range(selections[0].start, selections[0].start.translate(0, 1));
						const range2 = new vscode.Range(selections[0].start.translate(0, -1), selections[0].start);
						const text1 = document.getText(range1);
						const text2 = document.getText(range2);
						editor.edit(builder => {
							builder.replace(range1, text2);
							builder.replace(range2, text1);
						}
						);
					}
				}
				else if (selections.length === 1 && !selections[0].isEmpty) {
					const text = document.getText(selections[0]);
					if (selections[0].start.character > 1) {
						const range1 = document.getWordRangeAtPosition(selections[0].end.translate(0, 1));
						const range2 = document.getWordRangeAtPosition(selections[0].start.translate(0, -1));
						if (range1 && range2) {
							const text1 = document.getText(range1);
							const text2 = document.getText(range2);
							if (text1 === text2) { // we are in the middle of a word!
								//exchange the portin of the word before the selectin with that after the selection
								const rangeL = new vscode.Range(range1.start, selections[0].start);
								const rangeR = new vscode.Range(selections[0].end, range2.end);
								const textL = document.getText(rangeL);
								const textR = document.getText(rangeR);
								editor.edit(builder => {
									builder.replace(rangeL, textR);
									builder.replace(rangeR, textL);
								});
							}
							editor.edit(builder => {
								builder.replace(range1, text2);
								builder.replace(range2, text1);
							});
							//editor.selections = [new vscode.Selection(range1.start, range2.end)];
						}
					}
				}
			}
		}
	});
	const markQuery = vscode.commands.registerCommand('caser.markQuery', () => {
		const editor = vscode.window.activeTextEditor;
		const config = vscode.workspace.getConfiguration('caser');
		const setA = config.get<string[]>('queryIcons', ["❓", "⁉️", "❗", "‼️", "🆎", "🅰️", "🅱️"])
			?.map(safeChar) ?? [];
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
			const newSelections: vscode.Selection[] = [];
			defaultToLineSelected(editor);
			for (const selection of selections) {
				const startLine = selection.start.line;
				const endLine = selection.end.line;
				for (let line = startLine; line <= endLine; line++) {
					const lineRange = document.lineAt(line).range;
					if (lineRange.isEmpty) {
						continue; // skip empty lines
					}
					newSelections.push(new vscode.Selection(lineRange.start, lineRange.end));
				}
			}
			processSelections(editor, setA, newSelections);
		}
	});
	const markLine = vscode.commands.registerCommand('caser.markLine', () => {
		const editor = vscode.window.activeTextEditor;
		const config = vscode.workspace.getConfiguration('caser');
		const setA = config.get<string[]>('squareIcons', ["🟥", "🟨", "🟩", "🟦", "✅", "❎"])
			?.map(safeChar) ?? [];
		const setB = config.get<string[]>('circleIcons', ["🔴", "🟡", "🟢", "🔵", "✔️", "✖️"])
			?.map(safeChar) ?? [];
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
			const newSelections: vscode.Selection[] = [];
			defaultToLineSelected(editor);
			for (const selection of selections) {
				const startLine = selection.start.line;
				const endLine = selection.end.line;
				for (let line = startLine; line <= endLine; line++) {
					const lineRange = document.lineAt(line).range;
					if (lineRange.isEmpty) {
						continue; // skip empty lines
					}
					newSelections.push(new vscode.Selection(lineRange.start, lineRange.end));
				}
			}
			// if line starts with one of the setA characters, replace it with the subsequent character
			editor.edit(builder => {
				for (const selection of newSelections) {
					var line = document.getText(selection);
					var prefix = '';
					const isHeading = line.startsWith('#'); 
					var ix = 0;
					if (isHeading) {
						while (line.charAt(ix) === '#') {
							ix++;
						}
						prefix = line.substring(0, ix) + ' '; 
					}
					if (line[ix] === ' ') {
						ix = ix + 1;
					}
					line = line.substring(ix);
				    const characters = [...line];
					if (!characters) {
						continue; // skip empty lines	
					}
					const firstChar = characters[0];
					if (!firstChar) {
						continue; // skip empty lines
					}
					const firstCharLength = firstChar.length;
					var index = -1;
					if (isHeading) {
						index = setA.indexOf(firstChar);
					}
					else {
						index = setB.indexOf(firstChar);
					}
					if (index >= 0) {
						if (isHeading) {
							characters[0] = setA[(index + 1) % setA.length];
						}
						else {	
							characters[0] = setB[(index + 1) % setB.length];
						}
					const newText = prefix + characters.join('');
					builder.replace(selection, newText);
					}	
					else {
						const newText =
							isHeading ?
								prefix + setA[0] + ' ' + line :
								setB[0] + ' ' + line;
						builder.replace(selection, newText);
					}
				}
			});
			editor.selections = newSelections;
		}
	});
	const markNumber = vscode.commands.registerCommand('caser.markNumber', () => {
		const editor = vscode.window.activeTextEditor;
		const config = vscode.workspace.getConfiguration('caser');
		const setN = config.get<string[]>('numberIcons', [
			"0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"])
			?.map(safeChar) ?? [];
		    if (editor) {
				const document = editor.document;
				const selections = editor.selections;
				const newSelections: vscode.Selection[] = [];
				defaultToLineSelected(editor);
				for (const selection of selections) {
					const startLine = selection.start.line;
					const endLine = selection.end.line;
					for (let line = startLine; line <= endLine; line++) {
						const lineRange = document.lineAt(line).range;
						if (lineRange.isEmpty) {
							continue; // skip empty lines
						}
						newSelections.push(new vscode.Selection(lineRange.start, lineRange.end));
					}
				}
				processAtSelections(editor, setN, newSelections);
			}
		});
	const markFlag = vscode.commands.registerCommand('caser.markFlag', () => {
		const editor = vscode.window.activeTextEditor;
		const config = vscode.workspace.getConfiguration('caser');
		const setA = config.get<string[]>('flagIcons', [
			"📓", "⚠️", "🎗️", "🔒", "⚗️", "🛠️"])
			?.map(safeChar) ?? [];
			if (editor) {
				const document = editor.document;
				const selections = editor.selections;
				const newSelections: vscode.Selection[] = [];
				defaultToLineSelected(editor);
				for (const selection of selections) {
					const startLine = selection.start.line;
					const endLine = selection.end.line;
					for (let line = startLine; line <= endLine; line++) {
						const lineRange = document.lineAt(line).range;
						if (lineRange.isEmpty) {
							continue; // skip empty lines
						}
						newSelections.push(new vscode.Selection(lineRange.start, lineRange.end));
					}
				}
				processSelections(editor, setA, newSelections);
			}
		});
	const markStage = vscode.commands.registerCommand('caser.markStage', () => {
		const editor = vscode.window.activeTextEditor;
		const config = vscode.workspace.getConfiguration('caser');
		const setA = config.get<string[]>('stageIcons', [
			"💭", "🧭", "👋", "💡", "🚧", "🎁"])
			?.map(safeChar) ?? [];
			if (editor) {
				const document = editor.document;
				const selections = editor.selections;
				const newSelections: vscode.Selection[] = [];
				defaultToLineSelected(editor);
				for (const selection of selections) {
					const startLine = selection.start.line;
					const endLine = selection.end.line;
					for (let line = startLine; line <= endLine; line++) {
						const lineRange = document.lineAt(line).range;
						if (lineRange.isEmpty) {
							continue; // skip empty lines
						}
						newSelections.push(new vscode.Selection(lineRange.start, lineRange.end));
					}
				}
				// if line starts with one of the setA characters, replace it with the subsequent character
				editor.edit(builder => {
					//const selections = editor.selections;
					for (const selection of newSelections) {
						const line = document.getText(selection);
						const characters = Array.from(line);
						const firstChar = characters[0];
						const firstCharLength = firstChar.length;
						if (firstCharLength === 0) {
							continue; // skip empty lines
						}
						const index = setA.indexOf(firstChar);
						if (index >= 0) {
							const newText = setA[(index + 1) % setA.length] + line.slice(firstCharLength);
							builder.replace(selection, newText);
						}
						else {
							const newText = setA[0] + line;
							builder.replace(selection, newText);
						}
					}
				});
				editor.selections = newSelections;
			}
		});
	const toPad = vscode.commands.registerCommand('caser.toPad', () => {
		const editor = vscode.window.activeTextEditor;
		// for each selection
		// find the longest line
		// pad all lines to the length of the longest line
		// replace the line with the padded
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
			const newSelections: vscode.Selection[] = [];

			for (const selection of selections) {
				const startLine = selection.start.line;
				const endLine = selection.end.line;
				for (let line = startLine; line <= endLine; line++) {
					const lineRange = document.lineAt(line).range;
					newSelections.push(new vscode.Selection(lineRange.start, lineRange.end));
				}
			}
			editor.selections = newSelections; // Update the editor with the new selections
			var maxLength = 0;
			for (const selection of newSelections) {
				const line = document.getText(selection);
				maxLength = Math.max(line.length, maxLength);
			}
			editor
				.edit(builder => {
					for (const selection of newSelections) {
						const line = document.getText(selection);
						const padded = line.padEnd(maxLength);
						builder.replace(selection, padded);
					}
				}
				);
		}
	}
	);
	const toTrim = vscode.commands.registerCommand('caser.toTrim', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const selections = editor.selections;
			const newSelections: vscode.Selection[] = [];
			// remove spaces from the end of each line in the selection
			for (const selection of selections) {
				const startLine = selection.start.line;
				const endLine = selection.end.line;
				for (let line = startLine; line <= endLine; line++) {
					const lineRange = document.lineAt(line).range;
					newSelections.push(new vscode.Selection(lineRange.start, lineRange.end));
				}
			}
			editor.selections = newSelections; // Update the editor with the new selections
			editor.edit(builder => {
				for (const selection of newSelections) {
					const line = document.getText(selection);
					const trimmed = line.trimEnd();
					builder.replace(selection, trimmed);
				}
			});

		}
	}
	);

	// ////////////////////////////////////////////////////////////
	// TODO: 02
	// Add your subscription in this section then look for 
	// 'command' in package.json and add your command.
	///////////////////////////////////////////////////////////////
	context.subscriptions.push(toCamelCase);
	context.subscriptions.push(toKebabCase);
	context.subscriptions.push(toSnakeCase);
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
	context.subscriptions.push(toClear);
	context.subscriptions.push(toSecure);
	context.subscriptions.push(toFlip);
	context.subscriptions.push(toCompact);
	context.subscriptions.push(toSwap);
	context.subscriptions.push(markLine);
	context.subscriptions.push(markStage);
	context.subscriptions.push(markFlag);
	context.subscriptions.push(markQuery);
	context.subscriptions.push(markNumber);
	context.subscriptions.push(toPad);
	context.subscriptions.push(toTrim);
}

// This method is called when your extension is deactivated
// export function deactivate() {}
