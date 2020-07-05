export enum FieldType {
    inputText,
    textarea,
    inputDate,
    inputEmail,
    inputCheckbox,
    select
    // "inputText" = "Pole tekstowe",
    // "textarea" = "Obszar tesktowy",
    // "inputDate" = "Pole daty",
    // "inputEmail" = "Pole email",
    // "inputCheckbox" = "Pole zaznaczenie",
    // "select" = "Pole wyboru",
}

const FieldTypeTranslations  = {
    
    [FieldType.inputText] : "Pole tesktowe",
    [FieldType.textarea] : "Obszar tesktowy",
    [FieldType.inputDate] : "Pole daty",
    [FieldType.inputEmail] : "Pole email",
    [FieldType.inputCheckbox] : "Pole wyboru",
    
}


export default FieldTypeTranslations;

