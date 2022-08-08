"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
const query_string_1 = __importDefault(require("query-string"));
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
            state: "Heyy"
        }));
    //   res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.client_id}&redirect_uri=${process.env.callback_url}&scope=${scope.join("%20")}&response_type=token&show_dialog=true`);
});
authRouter.get("/auth/callback", (req, res) => {
    res.send("Heyy");
});
exports.default = authRouter;
