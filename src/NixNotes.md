[ref](N:\_NixNotes\HowEye\vscode-extension-tutorials.md)

To regenerate the vsix package:

1. Bump the version in the package.json file
2. From the `caser` folder, run `vsce package` in the termninal

To install in anoyther instance:

Install the vsix from the extensinos tab, menu ite, "install from vsix"

To debug right here:

Set a breakpoint wherever you want to test (typically in the extension.ts file)
From the Debug tabm `Run Extension` will open a new window with thextensin running in it!


