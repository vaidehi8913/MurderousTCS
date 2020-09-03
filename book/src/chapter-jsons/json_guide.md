Help! What attributes does our JSON expect? And why did we
design it this way? Great questions! You have come to the 
right document :)


HOME PAGE
    The top level of the home page should look like this:

    {
        "key": "homePage",
        "type": "home",
        "navigationBar": {...}
    }

    The navigationBar object is explained in the Chapter 
    section of this document.


CHAPTER
    The top level of a chapter should look like this:

    { 
        "key": "chapterx",
        "type": "chapter",
        "navigationBar": {...},
        "content": [...]
    }

    All of the JSON objects have the key attribute.  This is 
    required by the language (I think).  Also, we use them to 
    key objects in the react itself. It's actually nice, because
    JSON doesn't have the ability to add comments, so we can use 
    them to annotate the code.

    NAVIGATION BAR
        The attributes of the navigation bar are 
        {
            "chapterNumber": 1,
            "chapterTitle": "The Unanswerable Question",
            "navBarElements": {...}
        }

        chapterNumber and chapterTitle are redundant with the heading
        object in the content box.  As of right now, they aren't 
        actually used for anything.

        The navBarElements are where the magic happens.  They are 
        displayed in a vertical column in the specified order. 
        Each element can have one of two forms.

            SPACER

            This is a vertical space.  It looks like this:

            {
                "key": "descriptiveKeyGoesHere",
                "type": "spacer",
                "size": ...
            }

            The size can be either "small", "medium", or "large".
            Anything else will render as no space, and will print
            a warning in debug level 3.

            IMAGE ELEMENT

            These are the clickable elements used to link things.
            Actually, they don't have to link things...

            A basic image element looks like this:

            {
                "key": "descriptiveKeyGoesHere",
                "type": "imageElement",
                "basicImage": "path/to/image",
                "imageDescription": "This is our example picture"
                
                ... other attributes are optional ...
            }

            As always, the image path is assumed to start from 
            src/images.  Most likely, your basicImage attribute
            will start with "navbar/".

                HOVER BEHAVIOR

                If you want the image element to have hover behavior,
                then you can include the following attributes as well

                    "hoverImage": "path/to/hover/image",
                    "hoverText": "Text to display by the cursor on hover"
                
                That is: if the mouse is over this imageElement, we
                display hoverImage instead of basicImage
                
                IMPORTANT: because we are agnostic to the size of the 
                images that are passed in, it would be best to make
                sure basicImage and hoverImage are the same dimensions!
                Otherwise, the whole navbar will shift on every hover.

                As of right now, hoverText is not used for anything.
                However, you should probably include it, because the
                check for whether or not an imageElement has hover
                behaviour is if it includes the "hoverImage" attribute.
                So, not including hoverText might lead to annoying
                issues in the future.

                LINK BEHAVIOR

                If you want the imageElement to link to a different 
                page on click, then you can include the following
                attribute.

                    "linkOnClick": "/chapter1"

                This should be a path from our home page.  

                IMPORTANT: In general, it's not great to link to the 
                page that you are currently on.  This could trigger 
                an unnecessary rerender.  Actually, idk if this is 
                really true, but I was running into some issues with
                this in the previous iteration of the navbar.  This 
                might be fixed now, but hey! why bother linking to 
                the current page anyway?

    CONTENT 
        Content is made up of an ordered list of objects.  There are 
        many different kinds of content objects, however they all 
        have one thing in common: they can have "extras".  Extras
        are content that are anchored at the the object they are
        specified in, and appear in the right-hand-side "extras bar".
        Because they are in the extras bar, they automatically resize
        on window resizing.  This section starts with describing the
        different kinds of content objects.  It ends with describing
        extras, as extras are the same for every content object.

        CHAPTER HEADING 

        ...has 4 required attributes.

        Example:
        {
            "key": "chapterXHeading",
            "type": "heading",
            "number" : 1,
            "title": "The Unanswerable Question",
            "extras": [optional]
        }

        The title should be the exact string we want displayed. 
        Right now, we don't have any way to add formatting to the 
        text (bold, italics, underline, etc.).  It shouldn't be too 
        important for the heading hopefully...

        COMIC IMAGES

        To display a comic image, use the following template:

        {
            "key": "chap1image1",
            "type": "image",
            "source": "001.png",
            "description": "Vaidehi and Parmita are flying a kite, but the kite gets loose and floats into a nearby cave!",
            "extras": [optional]
        }

        Important: the image path should be from src/images/ . 
        Right now we do that because of some hacky thing where
        we append a string to these paths to get a string literal
        which is the only way we can get these stupid pictures to
        render (grrrrr...)  

        If we want to put in abosolute paths later, we will have 
        to work around this. (Maybe by concetenating it with the 
        empty string or something?)

        DIALOGUE

        The dialogue object looks like this:
        {
            "key": "chap1dialogue1",
            "type": "dialogue",
            "chibiImage": "path/to/chibi/image",
            "chibiDescription": "this is used as alt text for the chibi image",
            "line": "what is your character saying?",
            "extras": [optional]
        }

        Similarly to the Comic Images, the image file paths for 
        chibi images should be assumed to come from src/images/ .

        Also similary to Comic Images, chibiDescription is used 
        as alternate text, should the image not render.  

        One functionality that we have not yet implemented is the
        ability to format the text in the line (e.g. bold, 
        italics, underline).  Hopefully in the future, we can use
        html-like tags directly in the JSON, and have it show up
        in the rendered site.

        History: we used to call this a DialogueLine, and group
        multiple together into one Dialogue object, but that 
        wasn't really getting us anything.  Actually instead of
        making margins simpler, it made them more complicated.
        We ended up taking out the middle man when adding the 
        extras functionality.

        EXTRAS

        Extra describe things that should show up in the right bar of 
        the window.  

        Any of the content elements can have the optional attribute

            "extras": [...]

        This expects an ordered list of extra objects.  Extra objects
        can be the following kinds.

            TEXT EXTRA

            This displays text to the right of it's anchor element.  
            It looks like this:

            {
                "key": "extra1",
                "type": "text",
                "text": "text goes here"
            }

            IMAGE EXTRA

            This displays an image.  The basic imageExtra looks like
            this:

            {
                "key": "extra2",
                "type": "image",
                "imgSource": "path/to/image",
                "description": "this is used as alt text for the image"
            }

            This will display the image at the full width of the extras 
            bar.  The width of the extras bar depends on your window size.
            The width of the main content is fixed by a constant (in 
            src/Constats.js).  The remaining horizontal window space is 
            evenly divided between the NavigationBar on the left, and the 
            ExtrasBar on the right.  This is so that the content is centered.

            Optionally, if you want to provide a maximum width for the 
            image, you can provide the attribute

                "widthMultiplier": 0.5

            This will make it such that your image will scale up with the
            extrasBar until a maximum width of 
            (widthMultipler * Constants.CONTENT_WIDTH).



