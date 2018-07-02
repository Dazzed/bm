import { readToken } from './tokenUtility';
import { API_URL } from '../config';

const rootApiCall = (path, method, body) => {
    return new Promise((resolve) => {

        const req = new XMLHttpRequest();

        ////////////////////////////////////////////////////////////////////////////////
        // handle responses here

        req.onreadystatechange = () => {
            if (req.readyState !== 4) {
                // handle other states here
                return;
            }

            const logData = {
                status: req.status,
                headers: undefined,
                resText: req.responseText,
                fullReq: req
            };

            console.log('respose -------- ', logData);

            // set up response formatting
            const formattedRes = {
                ok: false,
                status: req.status,
                json: undefined
            };

            // extract json from response
            if (req.response && req.getResponseHeader('Content-Type') === 'application/json; charset=utf-8') {
                formattedRes.json = JSON.parse(req.responseText);
            }

            if (req.status >= 200 && req.status < 400) {
                formattedRes.ok = true;
                // console.log('=== formattedRes', formattedRes)
                // cookie saved, finally return response
                resolve(formattedRes);
            } else {
                console.log('XMLHttpRequest error', req.status, req);
                // resolve through then each time
                resolve(formattedRes);
            }
        };



        //////////////////////////////////////////////////////////////////////////////////
        // handle requests here

        //////////////////////////////////////////////////
        // Deal with tokens async grabber

        let attachToken = true;
        readToken()
        .then((token) => {


            ///////////////////////////////////////////////////////
            // Setup Url

            let url = [API_URL, 'api', path].join('/');

            ///////////////////////////////////////////////////////
            // Add Token

            console.log('token read', token)
            if(token) {
                // block token on certain paths
                if(path === 'login') {
                    attachToken = false;
                };

                if(attachToken) {
                    url = url + `?access_token=${token}`
                    // req.setRequestHeader('Authorization', 'Token ' + token);
                }
            }

            ///////////////////////////////////////////////////////
            // Open Request

            req.open(method, url);

            ///////////////////////////////////////////////////////
            // Append Headers

            if(method === 'POST') {
                req.setRequestHeader('Accept', 'application/json');
                req.setRequestHeader('Content-Type', 'application/json');
            } else {
                req.setRequestHeader('Content-Type', 'text/plain');
            }


            ///////////////////////////////////////////////////////
            // Append Body

            let sendBody;
            if ( typeof body === 'object' ) {
                sendBody = JSON.stringify(body);
            }


            ///////////////////////////////////////////////////////
            // Log Request

            const logRequest = {
                // token: token,
                method: method,
                url: url,
                body: sendBody,
                fullReq: req
            };
            console.log('===== - - -  request', logRequest, body);


            ///////////////////////////////////////////////////////
            // finally send it!

            req.send(sendBody);
        })
    });
};
const querify = (obj = {}, needsEncoding = false) => {
    const encode = (value) => needsEncoding ? encodeURIComponent(value) : value;
    const keys = Object.keys(obj);
    return keys.length
        ? '?' + keys
        .filter((key) => obj[key] !== undefined)
        .map((key) => encode(key) + '=' + encode(obj[key])).join('&')
        : '';
};

const get =  (path, ...querifyArgs) => rootApiCall(path + querify(...querifyArgs), 'GET', undefined);
const post =  (path, body) => rootApiCall(path, 'POST', body);
const put =  (path, body) => rootApiCall(path, 'PUT', body);

export {
    get,
    post,
    put,
}