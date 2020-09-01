A To-Do list, so we remember the things we want to 
implement/fix!


SMALL PROJECTS
    Improvement: Text Styling
        The text styling for the chapter headings 
        and dialogue text looks awful.  How do we 
        choose specific fonts? To we need to specify
        backup fonts?

        Once this is done: remove the background
        colors, and check out what the site looks 
        like!

    Bug fix: Lavender
        The word lavender is misspelled consistently
        in chapter 1 oops

    Bug fix: Margins
        There is some issue where the comic image 
        margins and the dialogue margins don't match
        up. (See the weird jump when switching back
        and forth from Chapter 2 to Chapter 3)

    Bug fix: Navbar images
        The navbar images aren't actually highlighting
        the right text.  These need to be re-generated.

    Improvement: Navbar Home Button
        We should add a home button to the navbar.

        This should wait until the navbar overhaul is
        complete (listed under big projects)


MEDIUM PROJECTS 
    Improvement: Italics and Bold from JSON
        Is there a way to render the dialogue text 
        from the JSON as JSX? That is:
        It would be <i>amazing</i> if something 
        like <b>this</b> could be rendered.

        Some day if we are feeling brave: do you 
        think we could render latex? :o
        https://www.npmjs.com/package/react-latex

    New Feature: Centered images in Dialogue
        We have some places where we want to include
        and image, but it should be placed 
        differently than a comic image (it isn't 
        supposed to take up the whole page). We 
        should figure out whether to include it as 
        its own Content component, or as a Dialogue
        sub-component, and then implement it.  
        Shouldn't be too complicated, I hope :)

    Bug fix: Resizing chain reaction
        Resizing the window isn't triggering all of 
        the updates that it should.  This results 
        in a whole host of issues, including the 
        navbar clicks not registering properly

    New feature: Navbar hover visual feedback
        We need some visual feedback when hovering over 
        an image on the navbar
        
        This should probably wait until we fix the 
        navbar code (which is listed under big 
        projects.)

    New feature: Navbar scroll
        Ideally, the navbar should scroll with the page


BIG PROJECTS
    New Feature: Extras Bar (Right)
        This is going to be a little complicated.  
        We need to figure out how to hook components
        to their friends in the Content bar.  Also, 
        what is the input format going to look like 
        in the chapter JSON?

    Improvement: Learn to use GitHub issues
        That might be a better way to handle this 
        to-do list :)

    Improvement: Navbar code is a M E S S
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

    Improvement: Navbar JSON
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


TO DISCUSS
    New Feature: Threads
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

    New Feature: Built-in Feedback System
        When we start putting chapters up, it would be
        great to have a place where people can directly
        put their feedback as they think of it.  That 
        is if they think "I don't get this sentence,"
        it should be easy for them to log it right 
        then.

    Improvement: Design home page
        Eventually the navigation will be put in the 
        Nav bar, so we won't need to have the home
        page info show on every page.  Even so, the 
        home page will be what people come to first,
        and we should design it so it doesn't look
        as bad as it does right now :) 

    Improvement: Navbar DOM structure
        Currently the navbar is being completely 
        rerendered for every page.  If it is on 
        every page (including the home page), 
        maybe we should move it up in the DOM, 
        so that it doesn't rerender?

        If we do that, how do we tell the navbar 
        what chapter it is on?


DONE!!!
    Improvement: Enter Chapter 1 JSON in entirety
        August 28, 2020
        We should get some Chibi images loaded, and
        load up the rest of the dialogue.  Then we'll
        basically have a proof-of-concept chapter 1!
        Woooooooooooooo!

    New Feature: Debug mode
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

    New Feature: New top-level program
        August 30, 2020
        Right now, the top level program shows one 
        chapter.  We need to figure out how to design
        a home page that links to different chapter 
        pages.  This linking will also probably be a 
        good training exercise before we try to make 
        the Nav Bar. 

        See Kirupa's chapter 18

    Bug fix: Object keys
        August 31, 2020
        We should add all the object keys back in
        to the components we render from JSON.  I 
        may have taken them out while fiddling 
        with something -_-

    Bug fix: Margins
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

    New Feature: Navigation Bar (Left)
        September 1, 2020
        This needs to be designed and implemented
        from scratch

        It's not great, but it exists!
