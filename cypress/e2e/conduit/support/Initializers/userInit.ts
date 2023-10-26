import { userAPIPayload } from "../API-Helpers/payloads/userAPIPayload";
import genericFunctions from "../GenericFunctions";

export default class userInit{
    static initUser(): userAPIPayload {
        return {
            user: {
                username: `Ayman${genericFunctions.genericRandomNumber()}`,
                email:`Ayman${genericFunctions.genericRandomNumber()}@gmail.com`,
                password: '123456'
            }
        }
    }
}