A To-Do list, so we remember the things we want to 
implement/fix!

# Small projects
## Improvement: Text Styling
The text styling for the chapter headings 
and dialogue text looks awful.  How do we 
choose specific fonts? To we need to specify
backup fonts?

Once this is done: remove the background
colors, and check out what the site looks 
like! (lol this comment is from before
I implemented debug mode)

## Note: Clickable sample
Not sure where to leave this note, so I'll 
put it here. 

It's not in the code base anymore, but the 
original navbar has an example of how to 
get the absolute position of a component
and calculate the relative position of a 
click.  This can be found in commit 
f3feb62df111e93de68de8b885f1f20b8c0fc842

## Improvement: Vertically center dialogue
Update the Dialogue components so that 
text vertically centers with it's chibi
image





# Medium projects 
## Improvement: Italics and Bold from JSON
Is there a way to render the dialogue text 
from the JSON as JSX? That is:
It would be <i>amazing</i> if something 
like <b>this</b> could be rendered.

Some day if we are feeling brave: do you 
think we could render latex? :o
https://www.npmjs.com/package/react-latex

## New Feature: Centered images in Dialogue
We have some places where we want to include
and image, but it should be placed 
differently than a comic image (it isn't 
supposed to take up the whole page). We 
should figure out whether to include it as 
its own Content component, or as a Dialogue
sub-component, and then implement it.  
Shouldn't be too complicated, I hope :)

## Improvement: Extra pause flag
Add a flag for a list of extras that affects
whether the extras make the dialogue pause 
until they are over, or the dialogue continues
even if the extras are too tall.

## New Feature: Line numbers in debug mode
Content should have line numbers

## Improvement: Content-width minimum 
The minimum content width should be a constant
but in general, the content width could be 
based on the window size





# Big projects

## Improvement: Learn to use GitHub issues
That might be a better way to handle this 
to-do list :)





# To Discuss
## New Feature: Threads
Having a nested thread display for dialogue  
(just one level) might punctuate jokes, and 
stop the real content from being lost.  I 
imagine it looking something like: 

P: We're just here to get our kite.  One
moment and we'll be out of your hair!
    V: Which is probably a good thing...
    it looks like he hasn't washed his hair
    in months!
    I: Actually, experts say that it's 
    healthier to only wash your hair every
    two months.
    V: That doesn't sound right...
I: So you being here doesn't have anything
to do with me putting the finishing touches 
on a computer that can answer... ANY 
QUESTION?

## New Feature: Built-in Feedback System
When we start putting chapters up, it would be
great to have a place where people can directly
put their feedback as they think of it.  That 
is if they think "I don't get this sentence,"
it should be easy for them to log it right 
then.

Even before we do this, we should have a 
document or something to start logging feedback.
I have to write down this stuff before I 
forget the notes my family gives me :)

## Improvement: Design home page
Eventually the navigation will be put in the 
Nav bar, so we won't need to have the home
page info show on every page.  (done!)

Even so, the 
home page will be what people come to first,
and we should design it so it doesn't look
as bad as it does right now :) 

## Improvement: Navbar DOM structure
Currently the navbar is being completely 
rerendered for every page.  If it is on 
every page (including the home page), 
maybe we should move it up in the DOM, 
so that it doesn't rerender?

If we do that, how do we tell the navbar 
what chapter it is on?

(I don't actually think this is relevant
anymore.  It looks fine now that the margins 
don't jump around, and it can't really be 
changed in this way.)

## Improvement: Webframe is too big
Right now you have to zoom out A LOT 
to see the website.  We should set our 
constants to make the size more reasonable

For example, looking at it on an ipad is 
impossible.





# Done!!! Woot Woot!!!
## Improvement: Enter Chapter 1 JSON in entirety
August 28, 2020
We should get some Chibi images loaded, and
load up the rest of the dialogue.  Then we'll
basically have a proof-of-concept chapter 1!
Woooooooooooooo!

## New Feature: Debug mode
August 29, 2020
We should have a top level flag somewhere 
that sets whether all of the debugging 
background colors come on or not.  

This should NOT be passed down in the main 
component structure.  Maybe we can set an 
environment variable?

Ideally, it should have two or three settings
of intensity.

(The flag is in src/Constants.js)

## New Feature: New top-level program
August 30, 2020
Right now, the top level program shows one 
chapter.  We need to figure out how to design
a home page that links to different chapter 
pages.  This linking will also probably be a 
good training exercise before we try to make 
the Nav Bar. 

See Kirupa's chapter 18

## Bug fix: Object keys
August 31, 2020
We should add all the object keys back in
to the components we render from JSON.  I 
may have taken them out while fiddling 
with something -_-

## Bug fix: Margins
August 31, 2020
I don't think the top and bottom margins 
between content components is working the
way I expected it to... We should look into 
this.

This might be easier to fix one we implement 
debug mode. (which is complete!)

It turned out to be an error with the way the 
width of the SpeakerLine component was being
calculated.  Debug mode did help!

## New Feature: Navigation Bar (Left)
September 1, 2020
This needs to be designed and implemented
from scratch

It's not great, but it exists!

## Improvement: Navbar code is a M E S S
September 2, 2020
So the navbar works... technically.  It's 
a total mess, not AT ALL modular, and this
thing of having a separate image for every
navbar state will not scale well.  
Especially when we want to highlight chapters
on hover. 

Actually, if we render each chapter link as 
a different image, it might be waaaay easier
to deal with the navigation, and the clicking.
Prolly should have thought of that in the 
first place -_-.  Live and learn I guess.

## Improvement: Navbar JSON
September 2, 2020
Maybe we in each chapter, we can directly 
include a navbar object that has an ordered 
list of elements.  Each element should have:
    - basicImage
    - optional hoverImage
    - optional hoverText (the thing that 
        shows up by the cursor)
    - optional linkOnClick
    - description

This will have to be included separately for 
each chapter, but actually that might be a 
feature, not a bug.  It takes away ambiguity
and allows us to be more flexible chapter to
chapter

omg someday wouldn't it be cute if the objects
reacted to clicks with a small shrink or something?

## Bug fix: Navbar images
(Obsolete)
The navbar images aren't actually highlighting
the right text.  These need to be re-generated.

## Improvement: Navbar Home Button
September 2, 2020
We should add a home button to the navbar.

This should wait until the navbar overhaul is
complete (listed under big projects)

    
## New feature: Navbar hover visual feedback
September 2, 2020
We need some visual feedback when hovering over 
an image on the navbar

This should probably wait until we fix the 
navbar code (which is listed under big 
projects.)

## Documentation: Update JSON Guide
September 2, 2020
The JSON Guide does not have the navigation
bar or the home page yet

## New feature: Navbar scroll
September 2, 2020
Ideally, the navbar should scroll with the page

Ok, I wasn't expecting that to be a two line fix
lol.

--> Actually the navbar doesn't move on the page
I just made the contentbox a scrollable component

AND THEN IT BROKE EVERYTHING

## Bug fix: Made scrollbar invisible
September 2, 2020
This might sound like an "improvement" not a 
bug fix, but BOY DID THE SCROLLBAR BREAK 
EVERYTHING

It's fixed for WebKit based browsers with a 
little magic in index.css .  If we want to 
get back to it at some point in the future,
I linked the article I used there.

## Bug fix: Margins
September 2, 2020
There is some issue where the comic image 
margins and the dialogue margins don't match
up. (See the weird jump when switching back
and forth from Chapter 2 to Chapter 3)

Not sure what the issue was, but it magically
got fixed when I messed around with the 
margins trying to debug the scrollbar issue.


## Improvement: Window size at top level
September 2, 2020
Currently the code is checking the 
window size at the Chapter level.  This
should probably be done in Main and 
passed down.  


## Bug fix: Resizing chain reaction
September 2, 2020
Resizing the window isn't triggering all of 
the updates that it should.  This results 
in a whole host of issues, including the 
navbar clicks not registering properly

Seems to be fixed.  Maybe because I moved
the window size up. Who knows.


## Improvement: Reorganize content components
September 2, 2020
What is currently known as the content box, 
and what is currently known as the extras
bar need to be reorganized.  Here's some 
thoughts:
- They need to scroll together, so they
    need to be wrapped in one div at the outer
    most level

- Actually, it might be easy to anchor things
    in the content if we just constrict the 
    width of the content, and attach each 
    content chunk to an empty box.  Then if 
    we want, we can put stuff in the empty
    box.  Otherwise, who cares?

The previously existing "extrasBar" component
has been obliterated. Now extras are under 
the ContentBox component (which makes sense, 
after all, the extras are content).  More 
detail is in the JSON docs.

## New Feature: Extras Bar (Right)
September 2, 2020
This is going to be a little complicated.  
We need to figure out how to hook components
to their friends in the Content bar.  Also, 
what is the input format going to look like 
in the chapter JSON?

Before doing this: see the reorg task in 
medium projects

Wooooot!

## Bug fix: Lavender
September 16, 2020
The word lavender is misspelled consistently
in chapter 1 oops