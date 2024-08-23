[ref](N:\_NixNotes\HowEye\vscode-extension-tutorials.md)

[deep ref](..\vsc-extension-quickstart.md)

To regenerate the vsix package:

1. Bump the version in the package.json file
2. From the `caser` folder, run `vsce package` in the termninal

To install in another instance:

Install the vsix from the extensions tab, menu ite, "install from vsix"

To debug right here:

Set a breakpoint wherever you want to test (typically in the extension.ts file)
From the Debug tab, `Run Extension` will open a new window with the extension running in it!

## To add a new endpoint 

1. The extension.js file holds the extension! 

2. the function `activate` near l:8 defines the functions that do the work (e.g. l:28 `function snakeCase(str:string)`)

3. later there will be a constant that defines a command handler that uses that function, and maybe others, e.g. l:227

```ts
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
);
```

4. Below this, we push the command substription, e.g. line 419
    `context.subscriptions.push(toSnakeCase);`
    This registers the commands to the context.subscriptions array, which ensures that these are properly disposed when the extension is deactivated. This is a standard VSCode pattern, especially important for event listeners.

5. The package.json file defines the commands as related to their names in the command palette. e.g. l:41

```json
{
   "command": "caser.toSnakeCase",
   "title": "to-Snake"
},
```

Note how the command matches the command registered in part 3, while the title is what shows in the command pallete.

6. To make the command useful, it should be bound to a keystroke in which case the key-cheatsheet might need to be updated. This may vary environment to environmemnt so is not strictly part of the code, just a reccomendataion.

### Repair

Had issues running in debug mode

- running with F5 srtarted but then died
- extensions file was unable to resolve vscode reference

Solution:

- version of VScode has changed, but no the entries in Package.json / Package_lock.json
- tried to get @latest, which is 1.92.2
- needed to roll back to 1.92.0 as the .2 version is a beta.
- evidence:

=> npm list @types/vscode
caser@1.0.2 N:\_NixNotes\caser
└── (empty)

=> npm install vscode@1.92.2       
npm ERR! code ETARGET
npm ERR! notarget No matching version found for @types/vscode@^1.92.2.
npm ERR! notarget In most cases you or one of your dependencies are requesting
npm ERR! notarget a package version that doesn't exist. +

=>npm install @types/vscode@1.92.0
npm ERR! Invalid Version: ^1.92.2

Solutionn:
=>npm uninstall @types/vscode
=>npm install @types/vscode@1.92.0
=>npm list @types/vscode          
caser@1.0.2 N:\_NixNotes\caser
└── @types/vscode@1.92.0
=>npm install

Then F5 works.

### Updates needed

Install crypto using 


=>npm install crypto-js

=>npm i --save-dev @types/crypto-js