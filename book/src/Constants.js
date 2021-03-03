// Following the setup of a constants file from this blog post:
// https://medium.com/@austinpaley32/how-to-add-a-constants-file-to-your-react-project-6ce31c015774

// Compilation constants
export const DEBUG = 3; 
// this can be set to 0, 1, 2, or 3
// 0: no debug settings
// 1: basic background colors for the different bars
// 2: detailed background colors to show components
// 3: detailed colors and detailed console output 

// Chapter formatting constants
export const CONTENT_WIDTH = 500; 
export const FEEDBACK_BUTTON_WIDTH = 50;

// fixed width of the content box

    // Content box formatting constants
    export const CONTENT_MARGIN = 4; 
    export const CHAPTER_NUMBER_SIZE = 72; 
    // width of chapter number in chapter heading
    export const CHAPTER_TITLE_FONT_SIZE = 48; 
    // for chapter heading

        // Dialogue formatting constants
        export const CHIBI_SIZE = 80; 
        // width of chibi sprites
        export const CHIBI_MARGIN = 4; 
        // margin between chibi image and dialogue text
        export const SPEAKER_MARGIN = 4; 
        // bottom margin between one speaker and the next 
        export const DIALOGUE_TEXT_TOP_OFFSET = 0; 
        // gap between top of chibi image and top of dialogue text
        export const DIALOGUE_FONT_SIZE = 18;
        export const DIALOGUE_FONT_FAMILY = "sans-serif";

        // extras formatting constants
        export const EXTRAS_FONT_SIZE = 18;
        export const EXTRAS_FONT_FAMILY = "sans-serif";

    //Navigation bar formatting constants
    export const CHAPTER_NAVIGATOR_WIDTH = 300; 
    // The ChapterNavigator width is the minimum of this 
    // value, and the width of the sideBar

        //Spacer formatting constants
        export const SMALL_SPACER_SIZE = 5;
        export const MEDIUM_SPACER_SIZE = 10;
        export const LARGE_SPACER_SIZE = 20;
