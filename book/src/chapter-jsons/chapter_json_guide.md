This is a file for us to put some much needed documentation 
about how our chapter JSON files should look.  

THE TOP LEVEL 

The top level should look like this:

{ 
    "key": "chapterx",

    "heading": {...},

    "content": [...]
}

All of the JSON objects have the key attribute.  This is 
required by the language (I think).  Also, we use them to 
key objects in the react itself. It's actually nice, because
JSON doesn't have the ability to add comments, so we can use 
them to annotate the code.


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

