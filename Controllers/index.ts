import { AuthController } from "./Auth/Auth.controller";
import { CountryController } from "./Country/Country.controller";
import { CountryZoneController } from "./Country/CountryZone.controller";
import { UserController } from "./User/User.controller";


export const controllers = [
    UserController,
    AuthController,
    CountryController,
    CountryZoneController
];