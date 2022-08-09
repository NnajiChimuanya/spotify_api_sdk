"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
const query_string_1 = __importDefault(require("query-string"));
const request_1 = __importDefault(require("request"));
const { post } = request_1.default;
const scope = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state"
];
authRouter.get("/auth", (req, res) => {
    res.redirect('https://accounts.spotify.com/authorize?' +
        query_string_1.default.stringify({
            response_type: 'code',
            client_id: process.env.client_id,
            scope: scope,
            redirect_uri: process.env.callback_url,
            state: process.env.state
        }));
});
authRouter.get("/auth/callback", (req, res) => {
    let code = req.query.code || null;
    let state = req.query.state || null;
    if (state === null) {
        res.redirect('/#' +
            query_string_1.default.stringify({
                error: 'state_mismatch'
            }));
    }
    else {
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: process.env.callback_url,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(process.env.client_id + ':' + process.env.client_secret).toString('base64'))
            },
            json: true
        };
        post(authOptions, (err, data) => {
            if (err)
                console.log(err);
            res.cookie('token', data.body.access_token);
            res.json(data.body);
        });
    }
});
exports.default = authRouter;
