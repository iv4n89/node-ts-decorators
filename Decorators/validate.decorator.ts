import { check } from "express-validator";
import { MetadataKeys } from "../Meta/metadata.keys";
import { BaseModel } from "../Models/BaseMode";


enum ValidationKeys {
    IsNotEmpty = 'isNotEmpty',
    IsEmpty = 'isEmpty',
    IsOptional = 'isOptional',
    Contains = 'contains',
    Min = 'min',
    Max = 'max',
    MinLength = 'minLength',
    MaxLength = 'maxLength',
    Equals = 'equals',
    IsBoolean = 'isBoolean',
    IsEmail = 'isEmail',
    IsNumeric = 'isNumeric',
    IsInt = 'isInt',
    IsFloat = 'isFloat',
    IsString = 'isString',
    In = 'in',
    IsDate = 'isDate',
    IsBefore = 'isBefore',
    IsAfter = 'isAfter',
    Matches = 'matches',
    IsMobilePhone = 'isMobilePhone',
    IsStrongPassword = 'isStrongPassword',
    IsFile = 'isFile',
    IsImage = 'isImage',
    IsPDF = 'isPDF',
    IsJson = 'isJson',
    IsIBAN = 'isIBAN',
    IsBIC = 'isBIC',
    IsCreditCard = 'isCreditCard',
    IsAlpha = 'isAlpha',
    IsAlphanumeric = 'isAlphanumeric',
    Not = 'not'
}

type Validations = {
    isNotEmpty?: | { value: boolean, message?: string } | boolean;
    isEmpty?: | { value: boolean, message?: string } | boolean;
    isOptional?: | { value: boolean, message?: string } | boolean;
    contains?: | { value: string, message?: string } | string;
    min?: | { value: number, message?: string } | number;
    max?: | { value: number, message?: string } | number;
    minLength?: | { value: number, message?: string } | number;
    maxLength?: | { value: number, message?: string } | number;
    equals?: | { value: string, message?: string } | string;
    isBoolean?: | { value: boolean, message?: string } | boolean;
    isEmail?: | { value: boolean, message?: string } | boolean;
    isNumeric?: | { value: boolean, message?: string } | boolean;
    isInt?: | { value: boolean, message?: string } | boolean;
    isFloat?: | { value: boolean, message?: string } | boolean;
    isString?: | { value: boolean, message?: string } | boolean;
    in?: | { value: string[] | string | number[] | number, message?: string } | string[] | string | number[] | number;
    isDate?: | { value: boolean, message?: string } | boolean;
    isBefore?: | { value: string, message?: string } | string;
    isAfter?: | { value: string, message?: string } | string;
    matches?: | { value: RegExp | string, message?: string } | RegExp | string;
    isMobilePhone?: | { value: boolean, message?: string } | boolean;
    isStrongPassword?: | { value: boolean, minLength?: number, minLowerCase?: number, minUpperCase?: number, minNumbers?: number, minSymbols?: number, message?: string } | boolean;
    isFile?: | { value: boolean, message?: string } | boolean;
    isImage?: | { value: boolean, message?: string } | boolean;
    isPDF?: | { value: boolean, message?: string } | boolean;
    isJson?: | { value: boolean, message?: string } | boolean;
    isIBAN?: | { value: boolean, message?: string } | boolean;
    isBIC?: | { value: boolean, message?: string } | boolean;
    isCreditCard?: | { value: boolean, message?: string } | boolean;
    isAlpha?: | { value: boolean, message?: string } | boolean;
    isAlphanumeric?: | { value: boolean, message?: string } | boolean;
}

type ValidationType<T> = Partial<keyof T & keyof BaseModel>;

type ValidationsKeys<T> = {
    [keyName in keyof ValidationType<T>]: Validations
}

export function Validation<T>(validationKeys: ValidationsKeys<T>): MethodDecorator {
    return (target, propertyKey, descriptor) => {
        const controller = target.constructor;

        const validations = Reflect.hasMetadata(MetadataKeys.VALIDATE, controller)
                            ? Reflect.getMetadata(MetadataKeys.VALIDATE, controller)
                            : {};
        
        const newValidations: any[] = [];

        Object.keys(validationKeys).forEach((field: any) => {
            Object.keys(validationKeys[field]).forEach((key: string) => {
                switch (key) {
                    case ValidationKeys.IsNotEmpty:
                        newValidations.push(check(field, typeof validationKeys[field][key] === 'boolean' ? `${ field } must not be empty` : (validationKeys[field][key] as any)['message']).custom((value, { req: { body, files } }) => body != undefined && !!body[field] && Object.keys(body).includes(field) || files != undefined && !!files[field] && Object.keys(files).includes(field))) || false;
                        break;
                    case ValidationKeys.IsEmpty:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' ? `${ field } must be empty` : (validationKeys[field][key] as any)['message']).custom((value, { req: { body, files } }) => Object.keys(body).includes(field) && (body[field] == undefined || body[field] == null) || Object.keys(files).includes(field) && (files[field] == undefined || files[field] == null) || !Object(body).includes(field) || !Object.keys(files).includes(field)));
                        break;
                    case ValidationKeys.IsOptional:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' ? `${ field } must not be empty` : (validationKeys[field][key] as any)['message']).custom((value, { req: { body, files } }) => Object.keys(body).includes(field) && (body[field] == undefined || body[field] == null) || Object.keys(files).includes(field) && (files[field] == undefined || files[field] == null) || !Object(body).includes(field) || !Object.keys(files).includes(field)));
                        break;
                    case ValidationKeys.Contains:
                        newValidations.push(check(field, typeof validationKeys[field][key] === 'string' || !(validationKeys[field][key] as any)['message'] ? `${ field } must contain ${ !!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key]}` : (validationKeys[field][key] as any)['message']).contains(!!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key]));
                        break;
                    case ValidationKeys.Max:
                        newValidations.push(check(field, typeof validationKeys[field][key] === 'number' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be less or equal to ${ !!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key] }` : (validationKeys[field][key] as any)['message']).custom((value, { req }) => req.body[field] ?? 0 <= value));
                        break;
                    case ValidationKeys.Min:
                        newValidations.push(check(field, typeof validationKeys[field][key] === 'number' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be more or equal to ${ !!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key] }` : (validationKeys[field][key] as any)['message']).custom((value, { req }) => req.body[field] ?? 0 >= value));
                        break;
                    case ValidationKeys.MaxLength:
                        newValidations.push(check(field, typeof validationKeys[field][key] === 'string' || !(validationKeys[field][key] as any)['message'] ? `${ field } must has ${ !!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key] } or less characters` : (validationKeys[field][key] as any)['message']).isLength({ max: !!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key] }));
                        break;
                    case ValidationKeys.MinLength:
                        newValidations.push(check(field, typeof validationKeys[field][key] === 'string' || !(validationKeys[field][key] as any)['message'] ? `${ field } must has ${ !!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key] } or more characters`: (validationKeys[field][key] as any)['message']).isLength({ min: !!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key] }));
                        break;
                    case ValidationKeys.Equals:
                        newValidations.push(check(field, typeof validationKeys[field][key] === 'string' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be equal to ${ !!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key] }` : (validationKeys[field][key] as any)['message']).equals(!!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key]));
                        break;
                    case ValidationKeys.IsBoolean:
                        newValidations.push(check(field, typeof validationKeys[field][key] === 'boolean' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be boolean` : (validationKeys[field][key] as any)['message']).toBoolean().isBoolean())
                        break;
                    case ValidationKeys.IsNumeric:
                        newValidations.push(check(field, typeof validationKeys[field][key] === 'number' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be numeric` : (validationKeys[field][key] as any)['message']).isNumeric());
                        break;
                    case ValidationKeys.IsInt:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be an integer` : (validationKeys[field][key] as any)['message']).isInt());
                        break;
                    case ValidationKeys.IsFloat:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be a float` : (validationKeys[field][key] as any)['message']).isFloat());
                        break;
                    case ValidationKeys.IsString:
                        newValidations.push(check(field, typeof validationKeys[field][key] === 'string' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be string`: (validationKeys[field][key] as any)['message']).isString());
                        break;
                    case ValidationKeys.In:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } value must be in ${ !!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key] }` : (validationKeys[field][key] as any)['message']).isIn(!!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key]));
                        break;
                    case ValidationKeys.IsEmail:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be an email` : (validationKeys[field][key] as any)['message']).isEmail());
                        break;
                    case ValidationKeys.IsDate:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be a date` : (validationKeys[field][key] as any)['message']).isDate({ format: 'YYYY-MM-DD' }));
                        break;
                    case ValidationKeys.IsBefore:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be before ${ !!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key] }` : (validationKeys[field][key] as any)['message']).isBefore(!!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key]));
                        break;
                    case ValidationKeys.IsAfter:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be after ${ !!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key] }` : (validationKeys[field][key] as any)['message']).isAfter(!!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key]));
                        break;
                    case ValidationKeys.Matches:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' && 'value' in <any>validationKeys[field][key] || !(validationKeys[field][key] as any)['message'] ? `${ field } must match the provided RegExp` : (validationKeys[field][key] as any)['message']).matches(!!(validationKeys[field][key] as any)['value'] && (validationKeys[field][key] as any)['value'] || validationKeys[field][key]));
                        break;
                    case ValidationKeys.IsMobilePhone:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be a valid mobile phone number` : (validationKeys[field][key] as any)['message']).isMobilePhone(!!(validationKeys[field][key] as any)['locale'] && (validationKeys[field][key] as any)['locale'] || 'es-ES'));
                        break;
                    case ValidationKeys.IsStrongPassword:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be at least ${ (validationKeys[field][key] as any)['minLength'] ?? 8 } characters length, contain at least ${ (validationKeys[field][key] as any)['minLowerCase'] ?? 1 } lower case characters, contain at least ${ (validationKeys[field][key] as any)['minUpperCase'] ?? 1 } upper case characters, contain at least ${ (validationKeys[field][key] as any)['minNumbers'] ?? 1 } numbers, contain at least ${ (validationKeys[field][key] as any)['minSymbols'] ?? 1 } symbols`
                         : (validationKeys[field][key] as any)['message']).isStrongPassword({
                            minLength: (validationKeys[field][key] as any)['minLength'] ?? 8,
                            minLowercase: (validationKeys[field][key] as any)['minLowerCase'] ?? 1,
                            minUppercase: (validationKeys[field][key] as any)['minUpperCase'] ?? 1,
                            minNumbers: (validationKeys[field][key] as any)['minNumbers'] ?? 1,
                            minSymbols: (validationKeys[field][key] as any)['minSymbols'] ?? 1,
                        }));
                        break;
                    case ValidationKeys.IsFile:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be an uploaded file` : (validationKeys[field][key] as any)['message']).custom(((value, { req: { files } }) => Object.keys(files).includes(field))));
                        break;
                    case ValidationKeys.IsImage:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be an uploaded image` : (validationKeys[field][key] as any)['message']).custom((value, { req: { files } }) => !!files[field] && files[field].mimetype.includes('image')));
                        break;
                    case ValidationKeys.IsPDF:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be an uploaded pdf` : (validationKeys[field][key] as any)['message']).custom((value, { req: { files } }) => !!files[field] && files[field].mimetype.includes('pdf')));
                        break;
                    case ValidationKeys.IsJson:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be json` : (validationKeys[field][key] as any)['message']).isJSON());
                        break;
                    case ValidationKeys.IsIBAN:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be a valid IBAN` : (validationKeys[field][key] as any)['message']).isIBAN());
                        break;
                    case ValidationKeys.IsBIC:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be a valid BIC or SWIFT` : (validationKeys[field][key] as any)['message']).isBIC());
                        break;
                    case ValidationKeys.IsCreditCard:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be a valid credit card number` : (validationKeys[field][key] as any)['message']).isCreditCard());
                        break;
                    case ValidationKeys.IsAlpha:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be alpha type` : (validationKeys[field][key] as any)['message']).isAlpha((validationKeys[field][key] as any)['locale'] ?? 'es-ES'));
                        break;
                    case ValidationKeys.IsAlphanumeric:
                        newValidations.push(check(field, typeof validationKeys[field][key] !== 'object' || !(validationKeys[field][key] as any)['message'] ? `${ field } must be alphanumeric type` : (validationKeys[field][key] as any)['message']).isAlphanumeric((validationKeys[field][key] as any)['locale'] ?? 'es-ES'));
                        break;
                    default:
                        break;
                }
            })
        })

        validations[propertyKey] = [...(validations[propertyKey] ?? []), ...newValidations];

        Reflect.defineMetadata(MetadataKeys.VALIDATE, validations, controller);
    }
}