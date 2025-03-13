## Check Polish citizenship script

### Description
This script automates checking whether a person has Polish citizenship.
It opens the [Mobywatel](https://www.mobywatel.gov.pl/twoje-dane/pesel) page, checks the citizenship status,
and then closes the page. It plays the Polish national anthem and, optionally, sends a push notification using
[Pushover](https://pushover.net) upon success.

### Push notifications
For enabling push notifications, you need to:
- Create an account on [Pushover](https://pushover.net) and get the `User Key` and `API Token/Key` from there.
- Copy `.env.dist` to `.env` file and fill in the `PUSHOVER_USER` and `PUSHOVER_TOKEN` with the values from the
Pushover account.
- Install the Pushover app on your phone and login with the same account.

### Steps to run the script
- Clone the repository.
- Install [nodejs](https://nodejs.org/en/download) and [pnpm](https://pnpm.io/installation#using-npm).
- Install dependencies using `pnpm i`.
- Make sure `Chrome` browser is installed but NOT running.
- Start Chrome in the remote debugging mode. Execute following command in the terminal.
  - MacOS: ```Open -a "Google Chrome" --args --remote-debugging-port=9222```
  - Windows: ```"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222```, please adjust the path to the Chrome installation.
  - Linux: ```google-chrome --remote-debugging-port=9222``` or ```chromium --remote-debugging-port=9222``` depending on the browser.
- Login to [mobywatel](https://www.mobywatel.gov.pl/twoje-dane/pesel) page in opened `Chrome` browser.
- Execute ```pnpm start``` in terminal to start the script