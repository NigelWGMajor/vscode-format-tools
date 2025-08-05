# caser README

This is the README for extension "caser" 

## Building

Update version in `package.json`

manual build: `npm run compile`
build and package: `npx vsce package`

## Features

This is a text editor extension providing enhanced text editing. Multiple selections are usually accepted: where noted, defaults will be applied when there is no selection: w: defaults to current word l: defaults to current line 

Suggested keybindings:

|---|--------------|------------|----------------------------------|
|cs | ctrl + shift |      common|most simple formatting changes    |
|as | alt  + shift |      alt   |more complex changes, some undos  | 
|ac | alt  + ctrl  |  organizing| marking, cycling and moving      |

## caser Properties

**dimmableMatches** defines whether to dim lines matching tag definitions in the current language. This is used by the `to-Dimmed` command. This is an array of strings: each string starts with the target language id (e.g. `markdown` or `sql`) followed by one or more regex expressions, all seperated with colons. For example, to dim lines with `<pre` or `pre>` tags in markdown, you would set the property to: `markdown:<pre:pre>`. To dim lines with `--` in SQL, you would set the property to: `sql:--`. Only one string per language, but multiple regex expressions are supported.

**regexPatterns** lists useful regex patterns for use by the `Select by Regex` function.

**dotIcons, squareIcons, numberIcons, stepIcons, queryIcons, refIcons, warnIcons, linkIcons, userIcons**

These define the symbols or icons to be used by the various marking functions.

### Exchange

`cs X`   to-Swap     Is context driven:

|Context| Effect|
|--|--|
Cursor between words, no selection| Exchanges the surrounding words if on the same line
Selected word(s)| Exchanges the word before and the word after
In a word, no selection| Exchanges the letters before and after the cursor
In a word, letters selected| Exchanges the start of the word and the end, eaving the selected portion intact

### Casing/pathing:

`cs U`   to-UpperCase  (w) `UPPER CASE`
`cs L`   to-LowerCase  (w) `lower case`
`cs T`   to-TitleCase  (w) `Title Case`
`cs C`   to-CamelCase  (w) `camelCase`
`cs S`   to-SnakeCase  (w) `snake_case`
`cs K`   to-KebabCase  (w) `kebab-case`
`cs P`   to-PascalCase (w) `PascalCase`
`cs ' '` to-SpaceCase  (l) `space case`
`cs \`   to-Dos-Slash  (l) `.\path\`   
`cs /`   to-Unix-Slash (l) `./path/`

### Quoting and wrapping
    
`cs "`   to-Quoted      (l) 
`cs '`   to-SQuoted     (l) 
`c bt `  to-BackTick    (l) 
`as "`   to-UnQuoted    (l) 
`as '`   to-UnSQuoted   (l) 
`as bt`  to-UnBackTick  (l)
`cs {`   to-Curly       (l) { 
`cs }`   to-NoCurly     (l)   }
`cs <`   to-Angle       (w) < 
`cs >`   to-NoAngle     (w)   >
`cs (`   to-Parens      (l) ( 
`cs )`   to-NoParens    (l)   )
`cs [`   to-Square      (l) [ 
`cs ]`   to-NoSquare    (l)   ]
`cs *`   to-Star        (w) * *
`cs _`   to-UnderScore  (w) _ _
`cs ~`   to-Tilde       (l) ~ ~
`as sp`  to-None        (l)

### Formatting and selection   
    
`cs E` to-Escaped       (l) 
`as E` to-UnEscaped     (l) 
`as P` to-Pad           (l) Pads with spaces to widest part of selection and selects each line
`as |` to-Pipe-or-Comma     Toggles pipes or commas based on first in first line
`as T` to-Trim          (l) Trims trailing spaces and selects each line
`as C` to-Compact       (l) removes most white space including newlines
`as <` to-leading       (l) pushes a comma-separated list to leading commas multiline
`as >` to-trailing      (l) pushes a comma-separated list to training commas multiline
`as R` to-Select-by-Regex  selects based on regex
`as N` as New Line      (w) place each selection on a new line
`as D` to-Dimmed            toggles dimming on any line matched in the dimmableMatches setting for the current language
                          

### Dummy text

`as L`  LoremIpsum

### Encryption

`cs ?`   to-Flip  (uses local environment variable VSCODE_KEY as seed) 
- Switches bwteen encrypted and clear

### Organization and marking (Markdown only!)

The symbol sets can be edited in the settings.json file. When a symbol is placed, subsequent uses of the same key will cycle through the symbols in that set. 

- Query, Line and Step marking is typically used to show status of lines and will step over indents.
- Ref, Warn and User symbols can be used anywhere in a line for emphasis or clarification 
- Numbers can be inserted anywhere, usiually for traige or organization
- Link symbols insert templates for file, heading or url links

`ac Q` markQuery    ❓⁉️❌❗‼️🛑                 | 
`ac M` markline     🟥🟨🟩🟦✅❎ <-- if a header | These are bound to
`ac M` Markline     🔴🟡🟢🔵✔️✖️ <-- otherwise   | the start of a line 
`ac S` markStep     💭🔎👋💡🚧🎁                 | (state markers)
 
`ac R` markRef      🎟️🔀⚗️📚📆🔒                 | 
`ac W` markWarn     💥⚠️🪲🩹⏳📌                 | These can be placed anywhere    
`ac U` markUser     👬😁😞🤷‍♂️🕊️🎗️                 | (landmarks)
`ac N` markNumber:  0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟       
 
`ac L` markLink     [🔗]() [🔖](#)  [🎟️]()  [🔀]()  [ℹ️]()  [⏪]()  [⏩]()
 
`ac P` to-End      pushes content to end. If starts with a header, that is moved and a link inserted.
  
`ac F` to-File      Top line must have file link [a](./filename.md) (this remains)

- the rest moves to that file, link remains. 
- Repeat to append to file. File is opened and updated.

`acs enter` to Terminal - pushes the one line at a time to the shell.
- is wrapped in `cmd /k` and `exit`
- all forward slashes are converted to backslashes.
- surrounding backticks are removed
