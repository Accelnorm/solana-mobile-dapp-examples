# Solana Mobile React Native Expo dApp

This is a ready-to-go react native expo mobile app example for building Solana mobile dApps.

# Demo
<table>
  <tr>
    <td align="center">
      <img src="./screenshots/screenshot1.png" alt="Screenshot 1" width=300 />
    </td>
    <td align="center">
      <img src="./screenshots/screenshot2.png" alt="Screenshot 2" width=300 />
    </td>
    <td align="center">
      <img src="./screenshots/screenshot3.png" alt="Screenshot 3" width=300 />
    </td>
  </tr>
</table>

# Support
1. Stuck while building Solana Mobile dApp using this example? - Don't worry, I have created a dedicated support channel in dPU Official Discord server, join to meet other Solana Mobile Developers, ask for support and support others. [dPU Solana Mobile Devs Support Channel](https://dProgrammingUniversity.com/discord).

2. Join mailing list to stay upto to date with what examples and tools am working on and adding next - [Web3 Devs Newsletter](https://dprogramminguniversity.com/newsletter)

3. DONATE: - To help keep this project going, adding new examples codes and updating existing ones. Kindly consider [DONATING](https://dprogrammingUniversity.com/donation) and donation of $50USDC and above will have you added to the donors list on this [Solana Mobile dApp Examples Repo Homepage](https://github.com/dProgrammingUniversity/solana-mobile-dapp-examples) - THANK YOU!


# Guide

## A. Video
Watch the step by step course where I guide on building your first Solana mobile dApp with React Native Expo using this example app code step by step at [Solana Mobile Development Course - Learn React Native Expo To Build Apps on Solana](https://www.youtube.com/watch?v=8R56pwC_Kk0)

## B. Pre-requisites 
- [Solana mobile development enviroment setup](https://docs.solanamobile.com/developers/development-setup)
- React Native Expo knowledge - (Watch above course video to learn the basics even if never built mobile apps before)
- Emulator/Physical Android device - for testing your Solana Mobile dApp (Solana phones like Seeker are Android based, so you should be fine testing your app on Android emulator or real Android phones)
- MWA compatible wallets (Solflare, Phantom etc.)

## C. Techstack
- React Native
- Expo
- Android Emulator
- Solana Mobile Wallet Adapter (MWA)

## D. Steps
1. Ensure you are in the right folder `first-mobile-dapp` in your terminal.
```sh
cd first-mobile-dapp
```

2. Install dependencies. Though am a fan of `PNPM`, it is known to have issues with React Native Expo sometimes. So, I switched to `yarn` when building with react native expo.
```sh
yarn install
```

3. Build this sample app into an Android app apk.
```sh
eas build --profile development --platform android --local
```
NOTE: This could take between `5minutes` to `30minutes`. So, be patient and don't interupt it even if displayng some error messages along the way until its done. Mine took `[RUN_GRADLEW] BUILD SUCCESSFUL in 5m 52s` to completely build the `apk` successfully.

4. Install the `apk` into your Android Emulator or Physical Android device
```sh
To do so, drag and drop the `apk` file into your Android emulator.
```

5. Run the app
```sh
npx expo start
```
OR include the `--dev-client` flag.
```sh
npx expo start --dev-client
```

6. NOTE: When the server client start successfully without errors, then use `a` to auto-launch the previously installed `apk` to connect it to your development and help reflect real time changes from your code in the app as you build live. When no live feedback after updating code, use `r` to reload the app in your emulator/device.

6. You can test and start customizing as desired.


# FAQs
1. Error: ```File 'expo/tsconfig.base' not found.ts
Path to base configuration file to inherit from (requires TypeScript version 2.1 or later), or array of base files, with the rightmost files having the greater priority (requires TypeScript version 5.0 or later).``` or `--jsx not found` in the components and other files.

Fix: Go to `tsconfig.json`, hover mouse on the error `"expo/tsconfig.base"` and click `Follow link`. it will open into the types file `tsconfig.base.json`. Thats the correct file, so add `.json` to correctly link it like so: `expo/tsconfig.base.json`. Save the `tsconfig.json` file and the errors should be fixed across your app.

# Solana Mobile Expo Template
This is built off of version 2.2.1 of the [official Solana Mobile Expo Template](https://github.com/solana-mobile/solana-mobile-expo-template) 