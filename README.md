## Check Polish citizenship script

### Description
This script automates checking whether a person has Polish citizenship. It opens the [Mobywatel](https://www.mobywatel.gov.pl/twoje-dane/pesel) page, checks the citizenship status, and then closes the page. It plays the Polish national anthem and, optionally, sends a push notification using [Pushover](https://pushover.net) upon success.

### Push notifications
For enabling push notifications, you need to:
- Create an account on [Pushover](https://pushover.net) and get the `User Key` and `API Token/Key` from there.
- Copy `.env.dist` to `.env` file and fill in the `PUSHOVER_USER` and `PUSHOVER_TOKEN` with the values from the Pushover account.
- Install the Pushover app on your phone and login with the same account.

### Steps to run the script on MacOS
- Clone the repository.
- Install `node` and `pnpm` using e.g. `brew`.
- Install dependencies using `pnpm i`.
- Make sure `Chrome` browser is installed but NOT running.
- Execute ```Open -a "Google Chrome" --args --remote-debugging-port=9222``` in terminal to start chrome in the remote debugging mode.
- Login to [mobywatel](https://www.mobywatel.gov.pl/twoje-dane/pesel) page in the open `Chrome` browser.
- Execute ```pnpm start``` in terminal to start the script