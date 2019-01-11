
import { InstitutionModel, UserModel } from '../models/models';

export class AppSettings {

	//public static URL_BASE = "http://192.168.43.47:8080/kabinpro/kabinpro";	  
	public static URL_BASE = "http://localhost:8080/kabinpro/kabinpro";
	public static LANGUAGE = "ENG";
	public static CURENCY_CHANGE = "HTG";
	public static INSTITUTION = new InstitutionModel();
	public static CLASS_DATA_MODE: number = 0;
	public static IS_LOGIN: boolean = false;
	public static IS_REGISTERED: boolean = true;

	public static EMPLOYEE_TYPE: string = "";
	public static EMPLOYEE_TYPE_URI: string = "";
	public static EMPLOYEE_ID: number = 0;

	public static count: number;
	public static CLASS_ID: string = "";

	public static DEFAULT_USER: UserModel = new UserModel(
		"100",
		1,
		"Tizon",
		"Dife",
		"Default",
		"F",
		"0000",
		"info@lae.ht",
		"TizonDife",
		"12344321",
		"509",
		"../../assets/img/user.png",
		"ZeroAccess",
		true,
		"TizonDife",
		"2017-10-10",
		"None",
		"2017-10-10"
	);

	//public static MONTH_MAP = [{"Jan": 1}, {"Feb": 2}, {"Mar": 3}, {"Apr": 4}, {"May": 5}, {"Jun": 6}, {"Jul": 7}, {"Aug": 8}, {"Sep": 9}, {"Oct": 10}, {"Nov": 11}, {"Dec": 12}]

}
