# What is it?
PureAnim - basic animation effects for displaying some content to the user with easy use. This library can be useful for light projects, where it is enough to have a basic animation of the appearance of elements on the page.
# How to use that?
First, you need to add 2 files to a convenient project directory for you. The JS script file is the only one, so we just add it to a directory convenient for you.

Then, you may notice that the library repository contains a CSS folder. Inside it there are 2 CSS and SCSS files. This is so that the SCSS developer can embed the SCSS file into his project without mixing up the SCSS file formats and can compile the file (for example, with the Gulp builder). In this folder, you need to select one of several files that are more suitable for your project and put them in a convenient project directory for you.

At the end, you should have 2 files: JS and CSS or JS and SCSS. I can go to use PureAnim library!

You need to add a "class" attribute to the HTML element with an appropriate instruction that will animate the element.<br />
<code>div class='some-block fade-in'</code>, thats and! We added animation to HTML element!
# Library CSS-classes in HTML for working
<code>fade-in</code> - Allows animation to appear without changing its position;<br />
<code>from-left</code> - Allows animation to appear, starting its appearance from the left;<br />
<code>from-top</code> - Allows animation to appear, starting its appearance from the top;<br />
<code>from-right</code> - Allows animation to appear, starting its appearance from the right;<br />
<code>from-bottom</code> - Allows animation to appear, starting its appearance from the bottom;
# Error messages with PureAnim
1. <code>PureAnim SyntaxError</code> - the error is accompanied by the message <code>"You'r HTML-element must have 1 attribute only! You'r wrote: \<\<classes\>\> in \<\<HTML-element\>\>"</code>. This means that when pointing to an HTML element, you have written several instructions from the PureAnim library at once. To avoid this error, you only need to specify 1 attribute of the PureAnim instruction.
<code>\<\<classes\>\></code> - what classes were registered & <code>\<\<HTML-element\>\></code> - which HTML element is the error in.<br />
Example:<br />
<code>\<div class='content-block fade-in from-left'\></code> - is incorrect PureAnim instruction, will be PureAnim SyntaxError, because there are 2 PureAnim classes.<br />
<code>\<div class='content-block from-left'\></code> - is correct PureAnim instruction!
# Change logs
v1.1:
- Added self-initialization of the library when starting the project;
- Added custom errors from the PureAnim library to avoid incorrect behavior of the elements;
- Optimized some instructions.
  
v1.0:
- Initialize files.
