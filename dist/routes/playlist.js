"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const playlistRouter = express_1.default.Router();
const request_1 = __importDefault(require("request"));
const { post, get } = request_1.default;
playlistRouter.get("/playlists/:id", (req, res) => {
    console.log(req.params);
    get(`${process.env.base_url}/v1/playlists/3cEYpjA9oz9GiPac4AsH4n`, (err, data) => {
        if (err)
            throw err;
        res.json(data);
    });
});
exports.default = playlistRouter;
