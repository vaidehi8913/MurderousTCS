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
        "contentBox": {...}
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



    CONTENT BOX

        THE HEADING OBJECT 

        It has 2 attributes.

        Example:
        "heading" : {
            "number" : 1,
            "title": "The Unanswerable Question"
        }

        The title should be the exact string we want displayed. 
        Right now, we don't have any way to add formatting to the 
        text (bold, italics, underline, etc.).  It shouldn't be too 
        important for the heading hopefully...


        CONTENT

        Objects in the content box should be in the order you want 
        them to render.  They can come in a few types, described 
        below.

            COMIC IMAGES

            To display a comic image, use the following template:

            {
                "key": "chap1image1",
                "type": "image",
                "source": "001.png",
                "description": "Vaidehi and Parmita are flying a kite, but the kite gets loose and floats into a nearby cave!"
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
                "script": [...]
            }

            The list of objects in the script are each of a type we 
            are calling DialogueObjectLine.  They should look like this:

            {
                "key": "chap1dialogue1line1",
                "chibiImage": "sprites/scientist_sprite.png", "chibiDescription": "angry inventor",
                "line": "Hey! Who on earth are you?"
            }

            Similarly to the Comic Images, the image file paths for 
            chibi images should be assumed to come from src/images/ 

            Also similary to Comic Images, chibiDescription is used 
            as alternate text, should the image not render.  In the 
            future, ma

            One functionality that we have not yet implemented is the
            ability to format the text in the line (e.g. bold, 
            italics, underline).  Hopefully in the future, we can use
            html-like tags directly in the JSON, and have it show up
            in the rendered site.

            Interesting point: Why are multiple dialogue lines bundled 
            in the Dialogue object, rather than being individually 
            added?  As of right now, it's not a particulalry noticeable
            difference.  However, if in the future, we want to mess with
            margins and spacing, we many want the spacing between two 
            lines of dialogue to be different than their spacing with 
            respect to a comic image.  Having the Dialogue object here
            will let us modularly change these things later, as we figure
            out styling details. 

