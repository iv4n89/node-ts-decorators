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
    not?: Omit<Validations, 'not'>
}

type ValidationType<T> = Partial<Omit<T, keyof BaseModel>>;

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

        const getCheck = (not: boolean = false, field: string, message: string) => not ? check(field, message).not() : check(field, message);

        Object.keys(validationKeys).forEach((field) => {
            Object.keys(validationKeys[field]).forEach((key) => {

                getValidations(newValidations, validationKeys, field, key, validationKeys[field][key], getCheck);
                
            })
        })

        validations[propertyKey] = [...(validations[propertyKey] ?? []), ...newValidations];

        Reflect.defineMetadata(MetadataKeys.VALIDATE, validations, controller);
    }
}

function getValidations(validations: any[], validationKeys: any, field: any, key: any, element: any, getCheck: Function, not: boolean = false) {
    let message: string;
    switch (key) {
        case ValidationKeys.IsNotEmpty:
            message = typeof element === 'boolean' ? `${ field } must ${ not ? '' : 'not' } be empty` : (element)['message'];
            validations.push(getCheck(not, field, message).custom((value, { req: { body, files } }) => body != undefined && !!body[field] && Object.keys(body).includes(field) || files != undefined && !!files[field] && Object.keys(files).includes(field))) || false;
            break;
        case ValidationKeys.IsEmpty:
            message = typeof element !== 'object' ? `${ field } must ${ not ? 'not' : '' } be empty` : (element)['message'];
            validations.push(getCheck(not, field, message).custom((value, { req: { body, files } }) => Object.keys(body).includes(field) && (body[field] == undefined || body[field] == null) || Object.keys(files).includes(field) && (files[field] == undefined || files[field] == null) || !Object(body).includes(field) || !Object.keys(files).includes(field)));
            break;
        case ValidationKeys.IsOptional:
            message = typeof element !== 'object' ? `${ field } must ${ not ? '' : 'not' } be empty` : (element)['message'];
            validations.push(getCheck(not, field, message).custom((value, { req: { body, files } }) => Object.keys(body).includes(field) && (body[field] == undefined || body[field] == null) || Object.keys(files).includes(field) && (files[field] == undefined || files[field] == null) || !Object(body).includes(field) || !Object.keys(files).includes(field)));
            break;
        case ValidationKeys.Contains:
            message = typeof element === 'string' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } contain ${ !!(element)['value'] && (element)['value'] || element}` : (element)['message'];
            validations.push(getCheck(not, field, message).contains(!!(element)['value'] && (element)['value'] || element));
            break;
        case ValidationKeys.Max:
            message = typeof element === 'number' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be less or equal to ${ !!(element)['value'] && (element)['value'] || element }` : (element)['message'];
            validations.push(getCheck(not, field, message).custom((value, { req }) => req.body[field] ?? 0 <= value));
            break;
        case ValidationKeys.Min:
            message = typeof element === 'number' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be more or equal to ${ !!(element)['value'] && (element)['value'] || element }` : (element)['message'];
            validations.push(getCheck(not, field, message).custom((value, { req }) => req.body[field] ?? 0 >= value));
            break;
        case ValidationKeys.MaxLength:
            message = typeof element === 'string' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } has ${ !!(element)['value'] && (element)['value'] || element } or less characters` : (element)['message'];
            validations.push(getCheck(not, field, message).isLength({ max: !!(element)['value'] && (element)['value'] || element }));
            break;
        case ValidationKeys.MinLength:
            message = typeof element === 'string' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } has ${ !!(element)['value'] && (element)['value'] || element } or more characters`: (element)['message'];
            validations.push(getCheck(not, field, message).isLength({ min: !!(element)['value'] && (element)['value'] || element }));
            break;
        case ValidationKeys.Equals:
            message = typeof element === 'string' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be equal to ${ !!(element)['value'] && (element)['value'] || element }` : (element)['message'];
            validations.push(getCheck(not, field, message).equals(!!(element)['value'] && (element)['value'] || element));
            break;
        case ValidationKeys.IsBoolean:
            message = typeof element === 'boolean' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be boolean` : (element)['message'];
            validations.push(getCheck(not, field, message).toBoolean().isBoolean())
            break;
        case ValidationKeys.IsNumeric:
            message = typeof element === 'number' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be numeric` : (element)['message'];
            validations.push(getCheck(not, field, message).isNumeric());
            break;
        case ValidationKeys.IsInt:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be an integer` : (element)['message'];
            validations.push(getCheck(not, field, message).isInt());
            break;
        case ValidationKeys.IsFloat:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be a float` : (element)['message'];
            validations.push(getCheck(not, field, message).isFloat());
            break;
        case ValidationKeys.IsString:
            message = typeof element === 'string' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be string`: (element)['message'];
            validations.push(getCheck(not, field, message).isString());
            break;
        case ValidationKeys.In:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } value must ${ not ? 'not' : '' } be in ${ !!(element)['value'] && (element)['value'] || element }` : (element)['message'];
            validations.push(getCheck(not, field, message).isIn(!!(element)['value'] && (element)['value'] || element));
            break;
        case ValidationKeys.IsEmail:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be an email` : (element)['message'];
            validations.push(getCheck(not, field, message).isEmail());
            break;
        case ValidationKeys.IsDate:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be a date` : (element)['message'];
            validations.push(getCheck(not, field, message).isDate({ format: 'YYYY-MM-DD' }));
            break;
        case ValidationKeys.IsBefore:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be before ${ !!(element)['value'] && (element)['value'] || element }` : (element)['message'];
            validations.push(getCheck(not, field, message).isBefore(!!(element)['value'] && (element)['value'] || element));
            break;
        case ValidationKeys.IsAfter:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be after ${ !!(element)['value'] && (element)['value'] || element }` : (element)['message'];
            validations.push(getCheck(not, field, message).isAfter(!!(element)['value'] && (element)['value'] || element));
            break;
        case ValidationKeys.Matches:
            message = typeof element !== 'object' && 'value' in <any>element || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } match the provided RegExp` : (element)['message'];
            validations.push(getCheck(not, field, message).matches(!!(element)['value'] && (element)['value'] || element));
            break;
        case ValidationKeys.IsMobilePhone:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be a valid mobile phone number` : (element)['message'];
            validations.push(getCheck(not, field, message).isMobilePhone(!!(element)['locale'] && (element)['locale'] || 'es-ES'));
            break;
        case ValidationKeys.IsStrongPassword:
            message = typeof element !== 'object' || !(element)['message'] 
                ? `${ field } must ${ not ? 'not' : '' } be at least ${ (element)['minLength'] ?? 8 } characters length, contain at least ${ (element)['minLowerCase'] ?? 1 } lower case characters, contain at least ${ (element)['minUpperCase'] ?? 1 } upper case characters, contain at least ${ (element)['minNumbers'] ?? 1 } numbers, contain at least ${ (element)['minSymbols'] ?? 1 } symbols`
                : (element)['message'];
            validations.push(getCheck(not, field, message).isStrongPassword({
                minLength: (element)['minLength'] ?? 8,
                minLowercase: (element)['minLowerCase'] ?? 1,
                minUppercase: (element)['minUpperCase'] ?? 1,
                minNumbers: (element)['minNumbers'] ?? 1,
                minSymbols: (element)['minSymbols'] ?? 1,
            }));
            break;
        case ValidationKeys.IsFile:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be an uploaded file` : (element)['message'];
            validations.push(getCheck(not, field, message).custom(((value, { req: { files } }) => Object.keys(files).includes(field))));
            break;
        case ValidationKeys.IsImage:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be an uploaded image` : (element)['message'];
            validations.push(getCheck(not, field, message).custom((value, { req: { files } }) => !!files[field] && files[field].mimetype.includes('image')));
            break;
        case ValidationKeys.IsPDF:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be an uploaded pdf` : (element)['message'];
            validations.push(getCheck(not, field, message).custom((value, { req: { files } }) => !!files[field] && files[field].mimetype.includes('pdf')));
            break;
        case ValidationKeys.IsJson:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be json` : (element)['message'];
            validations.push(getCheck(not, field, message).isJSON());
            break;
        case ValidationKeys.IsIBAN:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be a valid IBAN` : (element)['message'];
            validations.push(getCheck(not, field, message).isIBAN());
            break;
        case ValidationKeys.IsBIC:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be a valid BIC or SWIFT` : (element)['message'];
            validations.push(getCheck(not, field, message).isBIC());
            break;
        case ValidationKeys.IsCreditCard:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be a valid credit card number` : (element)['message'];
            validations.push(getCheck(not, field, message).isCreditCard());
            break;
        case ValidationKeys.IsAlpha:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be alpha type` : (element)['message'];
            validations.push(getCheck(not, field, message).isAlpha((element)['locale'] ?? 'es-ES'));
            break;
        case ValidationKeys.IsAlphanumeric:
            message = typeof element !== 'object' || !(element)['message'] ? `${ field } must ${ not ? 'not' : '' } be alphanumeric type` : (element)['message'];
            validations.push(getCheck(not, field, message).isAlphanumeric((element)['locale'] ?? 'es-ES'));
            break;
        case ValidationKeys.Not:
            if (typeof element === 'object') {
                Object.keys(element).forEach(notKey => {
                    getValidations(validations, validationKeys, field, notKey, validationKeys[field][key][notKey], getCheck, true);
                })
            }
        default:
            break;
    }
}