

export class InstitutionModel {
    institutionId: number;
    addressId: number;
    institutionName: string;
    institutionDetails: string;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
    schoolBeginDate: string;
    schoolEndDate: string;
}

export class Periode {
    periodeId: number;
    institutionId: number;
    periodeNo: number;
    periodeName: string;
    periodeDstart: string;
    periodeDend: string;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
}

export class EmployeeModel {
    employeeId: number;
    addressId: number;
    employeeFirstname: string;
    employeeLastname: string;
    employeeFunction: string;
    employeeCardId: string;
    employeeType: string;
    employeeDetails: string;
    employeeSex: string;
    employeeTels: string;
    employeeEmail: string;
    employeeActive: boolean;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
    employeeBirthday: string;
}

export class ClientModel {
    clientId: number;
    addressId: number;
    clientFirstname: string;
    clientLastname: string;
    clientFunction: string;
    clientCardId: string;
    clientType: string;
    clientDetails: string;
    clientSex: string;
    clientTels: string;
    clientEmail: string;
    clientActive: boolean;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
    clientBirthday: string;
}

export class EmployeeSalaryModel {
    employeeSalaryId: number;
    employeeId: number;
    employeeSalaryValue: number;
    employeeSalaryPaymentFreq: number;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
}

export class Event {
    eventId: number;
    userId: number;
    eventTitle: string;
    eventDesc: string;
    eventDstart: string;
    eventDend: string;
    eventConcerns: string;
    eventDetails: string;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
}

export class EmployeePaymentModel {
    paymentEmployeeId: number;
    employeeId: number;
    paymentEmployeeValue: number;
    paymentEmployeeDetails: string;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
}


export class UserModel {
    userId: string;
    userPrivilege: number;
    userFirstname: string;
    userLastname: string;
    userTitle: string;
    userSex: string;
    userPhone: string;
    userEmail: string;
    userUsername: string;
    userPassword: string;
    userCode: string;
    userImg: string;
    userDetails: string;
    userActive: boolean;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;

    constructor(
        id: string,
        priv: number,
        fname: string,
        lname: string,
        title: string,
        sex: string,
        phone: string,
        email: string,
        username: string,
        pwd: string,
        code: string,
        img: string,
        details: string,
        act: boolean,
        cBy: string,
        dCreated: string,
        mBy: string,
        dMod: string
    ) {
        this.userId = id;
        this.userPrivilege = priv;
        this.userFirstname = fname;
        this.userLastname = lname;
        this.userTitle = title;
        this.userSex = sex;
        this.userPhone = phone;
        this.userEmail = email;
        this.userUsername = username;
        this.userPassword = pwd;
        this.userCode = code;
        this.userImg = img;
        this.userDetails = details;
        this.userActive = act
        this.createdBy = cBy;
        this.dateCreated = dCreated;
        this.modifiedBy = mBy;
        this.dateModified = dMod;
    }
}

export class Counter {
    stdCounter: number;
    tchCounter: number;
    empCounter: number;
}

export class PaymentPeriodModel {
    paymentPeriodeId: number;
    institutionClassId: number;
    periodeId: number;
    paymentPeriodeValue: number;
    paymentPeriodeDateStart: string;
    paymentPeriodeDateEnd: string;
    paymentPeriodeDetails: string;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
}

export class AddressModel {
    addressId: number;
    addressCountry: string;
    addressState: string;
    addressCity: string;
    addressStreet: string;
    addressZopcode: string;
    addressDetails: string;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
}

export class Affaire {
    affaireId: number;
    clientId: number;
    personAdvId: number;
    advocatAdvId: number;
    affaireLawerId: number;
    affaireQuality: string;
    affaireJuridiction: string;
    affaireNature: string;
    affaireJurDetails: string;
    affaireDate: string;
    affaireComment: string;
    affaireObject: string;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
}

export class Audience {
    audienceId: number;
    affaireId: number;
    folderId: number;
    audienceDate: string;
    audienceFor: string;
    audienceJuridiction: string;
    audienceStatut: string;
    audienceDetails: string;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
}

export class File {
    fileId: number;
    folderId: number;
    fileType: string;
    fileDesc: string;
    fileDetails: string;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
}

export class Folder {
    folderId: number;
    affaireId: number;
    folderDesc: string;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
}

export class Person {
    personId: number;
    personFirstname: string;
    personLastname: string;
    personFunc: string;
    personCardId: string;
    personType: string;
    personDetails: string;
    personSex: string;
    personTels: string;
    personEmail: string;
    personBirthday: string;
    personAddr: string;
    createdBy: string;
    dateCreated: string;
    modifiedBy: string;
    dateModified: string;
}