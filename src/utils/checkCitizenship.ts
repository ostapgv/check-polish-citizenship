import puppeteer from 'puppeteer';
import player from 'play-sound';
import { sendPushNotification } from "./sendPushNotification";
import { envVars } from "./envVars";

const ANTHEM_FILE = './assets/polish-anthem.mp3';
const SOMETHING_WENT_WRONG_FILE = './assets/ta-da-da-daaam.mp3';
const audioPlayer = player();

export const checkCitizenship = async () => {
  try {
    // Connect to an already open Chrome instance with remote debugging enabled.
    const browser = await puppeteer.connect({ browserURL: 'http://localhost:9222' });
    const targetPage = await browser.newPage();

    // Optional, set the desired viewport to ensure a consistent width and height. Can be removed.
    await targetPage.setViewport({ width: 1512, height: 776 });

    // Navigate to the target page.
    await targetPage.goto('https://www.mobywatel.gov.pl/twoje-dane/pesel', { waitUntil: 'networkidle2' });
    await new Promise((resolve) => { setTimeout(resolve, 10000); });

    // Parsing the citizenship.
    const citizenship = await targetPage.evaluate(() => {
      return document.evaluate(`//*[contains(text(), 'Obywatelstwo')]/span`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)?.singleNodeValue?.textContent?.trim();
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
      if (envVars.SHOULD_SEND_PUSH_NOTIFICATIONS) {
        await sendPushNotification('Gratulacje!!! Jesteś Polakiem!!! 🇵🇱');
      }
    }

    // Close the target page.
    await targetPage.close();

    // Disconnect from the browser.
    await browser.disconnect();
  } catch (error) {
    console.error('An error occurred:', error);
  }
};
