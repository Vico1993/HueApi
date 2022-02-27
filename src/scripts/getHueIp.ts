import { discovery } from "node-hue-api";
import { BridgeDiscoveryResponse } from "node-hue-api/dist/cjs/api/discovery/discoveryTypes";

const getHueIp = async (): Promise<void> => {
    try {
        const res: BridgeDiscoveryResponse[] = await discovery.nupnpSearch();

        console.log(res[0].config);

        console.log(
            "*******************************************************************************\n"
        );
        console.log(
            "Please not this IP into your .env with the key HUE_BRIDGE_IP"
        );
        console.log("If you don't have an user yet, please run: ");
        console.log(`npm run createUser --ip=${res[0].ipaddress}\n`);
        console.log(
            "*******************************************************************************\n"
        );
    } catch (error) {
        console.error(`Unexpected error: ${(error as Error).message}`);
    }
};

void getHueIp();
