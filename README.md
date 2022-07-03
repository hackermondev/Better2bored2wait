# Better2bored2wait
![repo size badge](https://img.shields.io/github/repo-size/hackermondev/better2bored2wait)
![open issues](https://img.shields.io/github/issues/hackermondev/better2bored2wait)

### Introduction
2bored2wait is a proxy for 2b2t.org's absurdly long queue. Better2bored2wait is based on 2bored2wait but aims to have more features and be faster.


### How To Use
1. Download [latest release](https://github.com/hackermondev/Better2bored2wait/releases)
2. Run executable

### Features
- Anti-Afk-Disconnection system
- Automatic server reconnection 
- Discord webhooks notification system
- Supports Mojang & Microsoft accounts
- Support newer versions of Minecrafts (coming soon) 

Want to suggest any features? Feel free to create a [issue](https://github.com/hackermondev/Better2bored2wait/issues/new)!


### Extra Configuration
To configure Better2bored2wait, you will need to add enviroment variables. There is a probably a way to do this based on your operating system systems, but it is easier to do it this way.

In the folder that contains the better2bored2wait executable, create a file called .env. This file will contain the following variables:
```bash
MINECRAFT_USERNAME=chillydaniel160
LOGGER_WEBHOOK=
```

then change the variables to your liking.

For example:
```bash
MINECRAFT_USERNAME=hackermon
LOGGER_WEBHOOK=https://canary.discord.com/api/webhooks/123456789/43567nsdnfadsfanjdsfanasder4wefwef
```

You can leave the `LOGGER_WEBHOOK` variable empty if you don't want to use webhooks.

#### Mojang Accounts
If you want to use a Mojang account instead of a Microsoft account for the account configuration, you can add the following line to the .env file:
```bash
MINEFLAYER_AUTH=mojang
MINECRAFT_USERNAME=yourminecraftusername
MINECRAFT_PASSWORD=yourminecraftpassword
```

### Issues
If you encounter any issues, please create an issue on [GitHub](https://github.com/hackermondev/Better2bored2wait/issues/new).

If you have ran the program before, there should be a folder called ```2bored2wait-logs``` in the same directory as the executable. If you have any issues with the program, please upload the logs in both of the files in the logs folder to pastebin and attach the link to the issue.


### License
Better2bored2wait is licensed under the [MIT license](LICENSE).