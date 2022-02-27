# Hue Api

Quick/Simple Api to Dialog/Manage Hue installation.
Purpose for this API is to be simple enought to support multiple client ( Phone / App / Terminal )

## Setup Project

1. Install dependancies

```Shell
npm run ci
```

2. Get your Hue IP

```Shell
npm run getHueIp
```

3. Create your Username

```Shell
npm run createUser --ip=<YOUR_HUE_IP>
```

4. Copy the .env.example in your .env

```Shell
cp .env.example .env
```

5. Update your .env with your value `HUE_BRIDGE_USERNAME` and `HUE_BRIDGE_IP`

6. Start using your API

```Shell
npm run start
```

## Basic NPM command

1. Build the project:

```Shell
npm run build 
```

2. Use nodemon while coding:

```Shell
npm run watch
```

3. Run your test:

```Shell
npm run test
```

4. Use eslint:

```Shell
npm run lint
```
