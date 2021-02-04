# What is it?
PureAnim is a dynamic animation library designed for light projects or landing pages. The purpose of this library is to minimize the time spent on writing styles for elements with animations.
# How to use that?
Before starting to work with the library, you need to add the "pure-anim.js" file to a convenient project directory, then include it in the HTML file before <code>&lt;/body&gt;</code>. Done! You have connected the library with animations to your project and you can use it in HTML-element.
# How is it work?
The principle of the script is simple. You enter the instruction, then, at the time of building the DOM tree, the styles provided by the PureAnim library with various available modifiers are compiled inside <code>&lt;style&gt;</code> before <code>&lt;/body&gt;</code>, and the script starts observing the element. When an element is visible to the user, the element is instructed to receive the class <code> "*instruction*"_"*modifier*"_visible </code>, which indicates the start of the appearance animation.


UPD. I came to this principle to avoid inline-styles for the sake of adhering (maybe badly) to the principles of the BEM methodology. Therefore, when building a DOM tree, styles are not assigned to each element, but a CSS container with prescribed styles is created.
# Library CSS-classes in HTML for working
Basic instructions for using animation on elements. By specifying the attributes below, the default animation run duration is 250ms (0.25s):


<code>fade-in</code> - Allows animation to appear without changing its position;<br />
<code>from-left</code> - Allows animation to appear, starting its appearance from the left;<br />
<code>from-top</code> - Allows animation to appear, starting its appearance from the top;<br />
<code>from-right</code> - Allows animation to appear, starting its appearance from the right;<br />
<code>from-bottom</code> - Allows animation to appear, starting its appearance from the bottom;


But you can control the duration of the animation thanks to modifiers that allow you to choose a different animation for each element.


The modifier is used along with the default instruction, added at the end. For example, we need to add a <code>fade-in</code> effect to an element with a duration of 1s rather than 250ms. To do this, write the following code to the element:


<code>&lt;div class='some-block fade-in_1s'&gt;</code> or <code>&lt;div class='some-block fade-in_1ms'&gt;</code>


You can set any duration, but if you specify 0, an error of type "PropertyError" will be thrown.
# Error messages with PureAnim
1. <code>PureAnim SyntaxError</code> - the error is accompanied by the message <code>"You'r HTML-element must have 1 attribute only! You'r wrote: \<\<classes\>\> in \<\<HTML-element\>\>"</code>. This means that when pointing to an HTML element, you have written several instructions from the PureAnim library at once. To avoid this error, you only need to specify 1 attribute of the PureAnim instruction.
<code>\<\<classes\>\></code> - what classes were registered & <code>\<\<HTML-element\>\></code> - which HTML element is the error in.<br />
Example:<br />
<code>\<div class='content-block fade-in from-left'\></code> - is incorrect PureAnim instruction, will be PureAnim SyntaxError, because there are 2 PureAnim classes.<br />
<code>\<div class='content-block from-left'\></code> - is correct PureAnim instruction!
  
2. <code>PureAnim PropertyError</code> - an error that appears when using 0ms or 0s as an instruction modifier to specify the duration of the animation. To solve this problem, you need to use any other positive modifier.


UPD. In future versions of the project there will be a console command "pureAnim.debug()", which will allow you to find logical errors when writing instructions from the PureAnim library. Stay tuned!
# Change logs
v1.3:
- Upgraded CSS-code generator;
- Improved script perfomance a little.

v1.2:
- Removed external CSS\SCSS styles;
- Added modifiers to control animation duration;
- Updated error handler;
- Improved script performance, code optimization and bug fixes.

v1.1:
- Added self-initialization of the library when starting the project;
- Added custom errors from the PureAnim library to avoid incorrect behavior of the elements;
- Optimized some instructions.
  
v1.0:
- Initialized files.
