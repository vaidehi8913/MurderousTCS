A To-Do list, so we remember the things we want to 
implement/fix!


SHORT-TERM
    Improvement: Text Styling
        The text styling for the chapter headings 
        and dialogue text looks awful.  How do we 
        choose specific fonts? To we need to specify
        backup fonts?

        Once this is done: remove the background
        colors, and check out what the site looks 
        like!

    Bug fix: Margins
        I don't think the top and bottom margins 
        between content components is working the
        way I expected it to... We should look into 
        this.


MEDIUM-TERM 
    Improvement: Italics and Bold from JSON
        Is there a way to render the dialogue text 
        from the JSON as JSX? That is:
        It would be <i>amazing</i> if something 
        like <b>this</b> could be rendered.

    New Feature: Centered images in Dialogue
        We have some places where we want to include
        and image, but it should be placed 
        differently than a comic image (it isn't 
        supposed to take up the whole page). We 
        should figure out whether to include it as 
        its own Content component, or as a Dialogue
        sub-component, and then implement it.  
        Shouldn't be too complicated, I hope :)

    New Feature: New top-level program
        Right now, the top level program shows one 
        chapter.  We need to figure out how to design
        a home page that links to different chapter 
        pages.  This linking will also probably be a 
        good training exercise before we try to make 
        the Nav Bar. 

    New Feature: Debug mode
        We should have a top level flag somewhere 
        that sets whether all of the debugging background colors come on or not.  
        
        This should NOT be passed down in the main 
        component structure.  Maybe we can set an 
        environment variable?

        Ideally, it should have two or three settings
        of intensity.


LONG-TERM
    New Feature: Navigation Bar (Left)
        This needs to be designed and implemented
        from scratch

    New Feature: Extras Bar (Right)
        This is going to be a little complicated.  
        We need to figure out how to hook components
        to their friends in the Content bar.  Also, 
        what is the input format going to look like 
        in the chapter JSON?

    Improvement: Learn to use GitHub issues
        That might be a better way to handle this 
        to-do list :)


DONE!!!
    Improvement: Enter Chapter 1 JSON in entirety
        August 28, 2020
        We should get some Chibi images loaded, and load up the rest of the dialogue.  Then we'll
        basically have a proof-of-concept chapter 1!
        Woooooooooooooo!