# mailify
Formats a downloaded HTML page for emailing

##Installation
You will need a recent version of node.js installed (tested on v0.12.7)
```
npm install -g https://github.com/freakent/mailify.git
```

##What does it do?
mailify fixes problems in html pages that mess up formatting of rich html messages in Mozilla Thunderbird

1. Removes moz-do-not-send="true" attributes
1. Adds file extensions to image files that don't have them
1. Changes all image URLs to be fully qualified instead of relative
1. Calcuates image height attributes when not specified based on ratio of width 

##Getting started
1. View the page you want to email in your browser
1. Right-click, choose Save as...
1. Provide a filename (something short and simple is probably safest) and choose Save as type: Webpage, Complete
1. From the command line type `mailify <path/to/filename>`
  Mailify will do it's work and create a new version of the filename provided. The original file will be kept as a backup (.sav)
1. Open the new file in your browser (or press refresh on the file you had open originally)
1. Type Ctrl-A to Select-All, then Ctrl-C to copy
1. Switch to Mozilla Thunderbird and create a new email message
1. Type Ctrl-V to paste the formatted message text into the body of the message
1. Press Send

##Known Issues
1. If you try to re-run mailify against a filename that has already been processed it 
will give an error. Just copy your .sav file over the .html file to re-run.
