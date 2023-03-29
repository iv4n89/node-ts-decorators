import { ActivityController } from "./Activity/Activity.controller";
import { ActivityPartController } from "./Activity/ActivityPart/ActivityPart.controller";
import { ActivitySectionController } from "./Activity/ActivityPart/ActivitySection.controller";
import { ActivitySectionTypeController } from "./Activity/ActivityPart/ActivitySectionType.controller";
import { PossibleResultController } from "./Activity/ActivityPart/PossibleResult.controller";
import { ActivityTypeController } from "./Activity/ActivityType.controller";
import { AuthController } from "./Auth/Auth.controller";
import { CountryController } from "./Country/Country.controller";
import { CountryZoneController } from "./Country/CountryZone.controller";
import { UserController } from "./User/User.controller";


export const controllers = [
    UserController,
    AuthController,
    CountryController,
    CountryZoneController,
    ActivityController,
    ActivityTypeController,
    ActivityPartController,
    ActivitySectionController,
    ActivitySectionTypeController,
    PossibleResultController
];