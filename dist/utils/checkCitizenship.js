"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCitizenship = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const play_sound_1 = __importDefault(require("play-sound"));
const sendPushNotification_1 = require("./sendPushNotification");
const envVars_1 = require("./envVars");
const ANTHEM_FILE = './assets/polish-anthem.mp3';
const SOMETHING_WENT_WRONG_FILE = './assets/ta-da-da-daaam.mp3';
const audioPlayer = (0, play_sound_1.default)();
const checkCitizenship = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to an already open Chrome instance with remote debugging enabled.
        const browser = yield puppeteer_1.default.connect({ browserURL: 'http://localhost:9222' });
        const targetPage = yield browser.newPage();
        // Optional, set the desired viewport to ensure a consistent width and height. Can be removed.
        yield targetPage.setViewport({ width: 1512, height: 776 });
        // Navigate to the target page.
        yield targetPage.goto('https://www.mobywatel.gov.pl/twoje-dane/pesel', { waitUntil: 'networkidle2' });
        yield new Promise((resolve) => { setTimeout(resolve, 10000); });
        // Parsing the citizenship.
        const citizenship = yield targetPage.evaluate(() => {
            var _a, _b, _c;
            return (_c = (_b = (_a = document.evaluate(`//*[contains(text(), 'Obywatelstwo')]/span`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)) === null || _a === void 0 ? void 0 : _a.singleNodeValue) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.trim();
        });
        // Log the citizenship and the current date.
        console.log(`Obywatelstwo ${citizenship} (${new Date().toLocaleString()}).`);
        // Play an error sound if the citizenship is not found.
        if (!citizenship) {
            console.log('Something went wrong. Check the auth session.');
            audioPlayer.play(SOMETHING_WENT_WRONG_FILE);
        }
        // Play the Polish national anthem and optionally send a push notification.
        if (citizenship === 'polskie') {
            audioPlayer.play(ANTHEM_FILE);
            if (envVars_1.envVars.SHOULD_SEND_PUSH_NOTIFICATIONS) {
                yield (0, sendPushNotification_1.sendPushNotification)('Gratulacje!!! Jesteś Polakiem!!! 🇵🇱');
            }
        }
        // Close the target page.
        yield targetPage.close();
        // Disconnect from the browser.
        yield browser.disconnect();
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
});
exports.checkCitizenship = checkCitizenship;
