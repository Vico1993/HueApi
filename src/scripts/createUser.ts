import { config } from "dotenv";
import { v3 } from "node-hue-api";
import { CreatedUser } from "node-hue-api/dist/esm/api/http/endpoints/configuration";

// Load .env variables
config();

const appName = "HueApi";
const deviceName = "HueApi-server";
const { HUE_BRIDGE_IP, npm_config_ip } = process.env;

async function discoverAndCreateUser(): Promise<void> {
    const ipAddress = HUE_BRIDGE_IP || npm_config_ip;

    // Create an unauthenticated instance of the Hue API so that we can create a new user
    const unauthenticatedApi = await v3.api.createLocal(ipAddress).connect();

    let createdUser: CreatedUser;
    try {
        createdUser = await unauthenticatedApi.users.createUser(
            appName,
            deviceName
        );
        console.log(
            "*******************************************************************************\n"
        );
        console.log(
            "User has been created on the Hue Bridge. The following username can be used to\n" +
                "authenticate with the Bridge and provide full local access to the Hue Bridge.\n" +
                "YOU SHOULD TREAT THIS LIKE A PASSWORD\n"
        );
        console.log(`Hue Bridge User: ${createdUser.username}`);
        console.log(`Hue Bridge User Client Key: ${createdUser.clientkey}`);
        console.log(
            "*******************************************************************************\n"
        );
    } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        if (err.getHueErrorType() === 101) {
            console.error(
                "The Link button on the bridge was not pressed. Please press the Link button and try again."
            );
        } else {
            console.error(`Unexpected Error: ${(err as Error).message}`);
        }
    }
}

if (!HUE_BRIDGE_IP && npm_config_ip) {
    console.log(
        "*******************************************************************************\n"
    );
    console.log(
        "I need your bridge IP, please add your IP to the .env with the KEY: HUE_BRIDGE_IP"
    );
    console.log("Or run this command with the parameter: --ip=YOUR_IP");
    console.log(
        "*******************************************************************************\n"
    );
}

void discoverAndCreateUser();
