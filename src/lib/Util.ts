import { basename } from 'path';

class Util {
    static isHTMLFile(file: string): Boolean {
        let isHTML: Boolean = false;

        const filename = basename(file);

        if (filename.indexOf('.html') > -1) {
            isHTML = true;
        }

        return isHTML;
    }
}

export default Util;
