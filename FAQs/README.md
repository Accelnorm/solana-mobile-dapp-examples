# Solana Mobile dApp Examples Frequently Asked Questions

This Solana mobile dApp examples FAQs page aim to answer devs questions about challenges faced building Solana mobilde dApps with this examples repo.

You can send your questions via support discord channel below.


# Support
1. Stuck while building Solana mobile apps using any example in this repo? - Don't worry, I have created a dedicated support channel in dPU Official Discord server, join to meet other Solana Mobile Developers, ask for support and support others. [dPU Solana Mobile Devs Support Channel](https://dProgrammingUniversity.com/discord).

2. Join mailing list to stay upto to date with what examples and tools am working on and adding next - [Web3 Devs Newsletter](https://dprogramminguniversity.com/newsletter)

3. DONATE: - To help keep this project going, adding new examples codes and updating existing ones. Kindly consider [DONATING](https://dprogrammingUniversity.com/donation) and donation of $50USDC and above will have you added to the donors list on this [Solana Mobile dApp Examples Repo Homepage](https://github.com/dProgrammingUniversity/solana-mobile-dapp-examples) - THANK YOU!

4. If find this repo helpful PLEASE remember to give it a STAR ⭐️ and share to other devs on social media.



# FAQs
1. ERROR: ```File 'expo/tsconfig.base' not found.ts
Path to base configuration file to inherit from (requires TypeScript version 2.1 or later), or array of base files, with the rightmost files having the greater priority (requires TypeScript version 5.0 or later).``` OR it may include error message `Cannot use JSX unless the '--jsx' flag is provided.ts(17004)` in the components and other files.

- FIX: Go to `tsconfig.json`, hover mouse on the error `"expo/tsconfig.base"` and click `Follow link`. it will open into the types file `tsconfig.base.json`. Thats the correct file, so add `.json` to correctly link it like so: `expo/tsconfig.base.json`. Save the `tsconfig.json` file and the errors should be fixed across your app.

2. ERROR: ```CommandError: No development build (com.dpu.counterdapp) for this project is installed. Please make and install a development build on the device first.``` 
- FIX: You need to build and install the apk first in the Emulator/Android device you want to test with before running the ```npx expo start``` command.

3. ERROR: When run `adb install build-1749804139031.apk` and it returns error message `adb: more than one device/emulator`.
- FIX: This is caused due to having multiple devices connected at same time and `adb` is confused which you want to install the apk into precisely. To Solve this, identify the ID of the device and use `-s` flag to point it there. 

- An example is `adb -s 02602536G0081003 install build-1749804139031.apk` or `adb -s emulator-5554 install build-1749804139031.apk` where `02602536G0081003` represents id of real Android device and `emulator-5554` represents id of opened Emulator. 
Using the `-s id-of-device` help remove confusion and guide `adb` to install the `apk` in the right device you want. After successfully installed into the targeted device, you will get message like `Performing Streamed Install. Success`.

- If you need to reinstall over an existing installation, add the `-r` flag: `adb -s 02602536G0081003 install -r build-1749804139031.apk` or `adb -s emulator-5554 install -r build-1749804139031.apk`.

4. ERROR: 
```sh
(NOBRIDGE) LOG  Bridgeless mode is enabled
 (NOBRIDGE) ERROR  Error: Exception in HostObject::get for prop 'SolanaMobileWalletAdapter': com.facebook.react.internal.turbomodule.core.TurboModuleInteropUtils$ParsingException: Unable to parse @ReactMethod annotation from native module method: SolanaMobileWalletAdapter.endSession(). Details: Unable to parse JNI signature. Detected unsupported return class: kotlinx.coroutines.Job
 ```
 - FIX: Temporal workaround is to disable `"newArchEnabled": true` to false `"newArchEnabled": false` in `app.json` but will lose access to new react native expo architecture. So, its a temporal work around until Solana Mobile Wallet Adapter becomes more compatible with the new RN architecture.