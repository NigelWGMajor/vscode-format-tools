# caser README

This is the README for extension "caser" version 1.0.2.

## Features

This is a text editor extension providing enhanced text editing. Multiple selections are accepted: where noted, defaults will be applied when there is no selection:

w: defaults to current word 
l: defaults to current line 

### Casing:

    to-UpperCase  (w) UPPER CASE 
    to-LowerCase  (w) lower case
    to-TitleCase  (w) Title Case
    
    to-CamelCase  (w) camelcase
    to-SnakeCase  (w) snake_case
    to-KebabCase  (w) kebab-case
    to-PascalCase (w) PascalCase
    to-SpaceCase  (l) space case

### Formatting    
    
    to-Escaped     (l) 
    to-UnEscaped   (l) 
    to-Compact     (l) (removes most white space including newlines)

### Quoting
    
    to-Quoted      (l) ""
    to-SQuoted     (l) ''
    to-BackTick    (l) ``
    to-UnQuoted    (l) 
    to-UnSQuoted   (l) 
    to-UnBackTick  (l)

### Wrapping

    to-Curly       (l) { }
    to-Angle       (w) < >
    to-Parens      (l) ( )
    to-Square      (l) [ ]
    to-Star        (w) * *
    to-UnderScore  (w) _ _
    to-Tilde       (l) ~ ~
    to-None        (l)

### Dummy text

    LoremIpsum

### Encryption

    to-Clear    decrypt
    to-Secure   encrypt
    to-Flip  (uses local environment variable VSCODE_KEY as seed) (l)

### Misc

    to-Pad      Pads with spaces to widest part of selection
                Mark with icon (may customize in settings)
    mark-Dot    🔴🟠🟡🟢🔵🟣⚪⚫
    mark-Square 🟥🟧🟨🟩🟦🟪⬜🔳
    mark-Numbers0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣
    mark-Action 🤔📚💬💡🚧🛠️⚗️⚠️🎗️
    mark-State  ❓⁉️‼️❗✖️✔️❎✅🎟️⌛    

### Exchange

    to-Swap     Is context driven.

    Cursor between words, no selection: exchanges the surrounding words if on the same line
    Selected word(s): exchanges the word before and the word after
    In a word, no selection: exchanges the letters before and after the cursor
    in a word, letters selected: exchanges the start of the word and the end, leaving the seected portion intact