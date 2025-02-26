import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { fontSize, textcolor, md, background } = (query || {});

    if (Array.isArray(fontSize)) {
        throw new Error('Expected a single fontSize');
    }
    if (Array.isArray(textcolor)) {
        throw new Error('Expected a text color');
    }
    if (Array.isArray(background)) {
        throw new Error('Expected a single background');
    }
    
    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    let text = '';
    if (arr.length === 0) {
        text = '';
    } else if (arr.length === 1) {
        text = arr[0];
    } else {
        extension = arr.pop() as string;
        text = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        textcolor: decodeURIComponent(textcolor || "#000000"),
        md: md === '1' || md === 'true',
        fontSize: fontSize || '96px',
        background: decodeURIComponent(background || "")
    };
    return parsedRequest;
}
