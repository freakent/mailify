# mailify
Formats a downloaded HTML page for emailing

##Installation
npm install -g https://github.com/freakent/mailify.git

##Getting started
1) View the page you want to email in your browser
2) Right-click, choose Save as...
3) Provide a filename (something short and simple is probably safest) and choose Save as type: Webpage, Complete
4) From the command line type 
<code>mailify <path/to/filename></code>
Mailify will do it's work and create a new version of the filename provided. The original file will be kept as a backup (.sav)
5) Open the new file in your browser (or press refresh on the file you had open originally)
6) Type Ctrl-A to Select-All, then Ctrl-C to copy
7) Switch to Mozilla Thunderbird and create a new email message
8) Type Ctrl-V to paste the formatted message text into the body of the message
9) Press Send

##Issues
1) If you try to re-run mailify against a filename that has already been processed it 
will give an error. Just copy your .sav file over the .html file to re-run.
