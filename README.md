# caser README

This is the README for extension "caser".

## Features

This is a test extension providing some text editing ability.

### Casing:
    
    to-CamelCase
    to-SnakeCase
    to-KebabCase
    to-PascalCase
    to-SpaceCase

    to-UpperCase
    to-LowerCase
    to-TitleCase

### Escaping quotes    
    
    to-Escaped
    to-UnEscaped

### Quoting
    
    to-Quoted
    to-UnQuoted
    to-SQuoted
    to-UnSQuoted

### Bracketing

    to-Curly
    to-Angle
    to-Parens
    to-Square
    to-None

### Dummy text

    LoremIpsum

[ref](N:\_NixNotes\HowEye\vscode-extension-tutorials.md)

To regenerate the vsix package:

1. Bump the version in the package.json file
2. From the `caser` folder, run `vsce package` in the termninal

To install in anoyther instance:

Install the vsix from the extensinos tab, menu ite, "install from vsix"

To debug right here:

Set a breakpoint wherever you want to test (typically in the extension.ts file)
From the Debug tabm `Run Extension` will open a new window with thextensin running in it!

## Release Notes

Just a basic formatter. Will work with single or multiple selections.

### 1.0.0

Initial release.