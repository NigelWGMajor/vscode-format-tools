# caser README

This is the README for extension "caser" 

## Features

This is a text editor extension providing enhanced text editing. Multiple selections are accepted: where noted, defaults will be applied when there is no selection:

w: defaults to current word 
l: defaults to current line 

Keys:   1: ctrl + shift         for typical common case chages
        2: alt + ctrl           for undos and more complex changes
        3: alt   shift          for marking and block ops

### Casing:

U   to-UpperCase  (w) UPPER CASE 
L   to-LowerCase  (w) lower case
T   to-TitleCase  (w) Title Case
    
C   to-CamelCase  (w) camelCase
S   to-SnakeCase  (w) snake_case
K   to-KebabCase  (w) kebab-case
P   to-PascalCase (w) PascalCase
' ' to-SpaceCase  (l) space case

### Formatting    
    
-E  to-Escaped     (l) 
--E to-UnEscaped   (l) 
--P to-Pad         (l) Pads with spaces to widest part of selection
--T to-Trim        (l) Trims leading and trailing spaces
--C to-Compact     (l) (removes most white space including newlines)
--< to-leading     (l) pushes a comma-separated list to leading commas multiline
--> to-trailing    (l) pushes a comma-separated list to training commas multiline

### Quoting
    
"   to-Quoted      (l) ""
'   to-SQuoted     (l) ''
`   to-BackTick    (l) ``
-"  to-UnQuoted    (l) 
-'  to-UnSQuoted   (l) 
-`  to-UnBackTick  (l)

### Wrapping

{   to-Curly       (l) { 
}   to-NoCurly     (l)   }
<   to-Angle       (w) < 
>   to-NoAngle     (w)   >
(   to-Parens      (l) ( 
)   to-NoParens    (l)   )
[   to-Square      (l) [ 
]   to-NoSquare    (l)   ]
*   to-Star        (w) * *
_   to-UnderScore  (w) _ _
~   to-Tilde       (l) ~ ~
' ' to-None        (l)

### Dummy text

-L  LoremIpsum

### Encryption

    to-Clear    decrypt
    to-Secure   encrypt
?   to-Flip  (uses local environment variable VSCODE_KEY as seed) [^l]

### Marking

Q 🟡 markQuery    ❓⁉️❌❗‼️🛑                 | 
M 🟡 markEmphasis 🟥🟨🟩🟦✅❎ <-- if a header |
M 🟡 MarkEmphasis 🔴🟡🟢🔵✔️✖️ <-- otherwise   | These are bound to 
S 🟡 markStep     💭🔎👋💡🚧🎁                 | the start of a line

R 🟡 markRef      🎟️🔀⚗️📚📆🔒 
W 🟡 markWarn     💥⚠️🪲🩹⏳📌
U 🟡 markUser     👬😁😞🤷‍♂️🕊️🎗️

L 🟡 markLink     [🔗]() [🔖](#)  [🎟️]()  [🔀]()  [ℹ️]()  [⏪]()  [⏩]()
N 🟡 markNumber:  0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟

dn🟡 to-push      pushes content
                 - 🟢 if no link in the first line, pushes to the end of the document
                 - 🔴 if a header, places a link to the header and moves to the end
                 - 🔴 if a file link, moves to that file

### Exchange

X   to-Swap     Is context driven:

    Cursor between words, no selection: exchanges the surrounding words if on the same line
    Selected word(s): exchanges the word before and the word after
    In a word, no selection: exchanges the letters before and after the cursor
    in a word, letters selected: exchanges the start of the word and the end, leaving the selected portion intact