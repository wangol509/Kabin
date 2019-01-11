
import { InstitutionModel } from '../models/models';
import { AppSettings } from '../providers/app-settings';

export class GlobalFunction {

  constructor() {
    console.clear();
  }

  /*
        public  openDialog(title: string, msg: string, color: number): void {
  
          let data:any = {};
  
          data.msg = msg;
          data.title = title;
          data.color = color;
  
          let dialogRef = this.dialog.open(ErrorManagement, {
            width: '300px',
            height: '200px',
            data: data
          });
  
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
    }
    */
  public static printSection(section_id: string): void {
    let printContents, popupWin;
    let inst: InstitutionModel = AppSettings.INSTITUTION;

    printContents = document.getElementById(section_id).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
         <html>
            <head>
              <title>Institution ${inst.institutionName}</title>
              <style>
          			.header-info{
          				padding: 5px 40px;
          				background: #eee;
          				margin: 20px 10px 0;
          			}

          			.lab{
          				padding: 10px 4px;
          			}

          			.lab label{
          				color: #555;
          			}

          			table td, table td * {
          			    vertical-align: top;
                }                  
                                
                .hdr1{
                  padding: 5px 20px;
                  text-align: left;
                }

    		      </style>
            </head>
            <body onload="window.print();window.close()">
            <br/>
            <br/>
              ${printContents}
            </body>
        </html>`
    );
    popupWin.document.close();
  }

  public static getCurrentDate(timezone: boolean): string {
    let now = new Date();
    let temp = now.toString().split(" ");
    let mt = (now.getMonth() + 1) > 9 ? (now.getMonth() + 1) : "0" + (now.getMonth() + 1);

    if (timezone) {
      return temp[3] + "-" + mt + "-" + temp[2] + " " + temp[4];
    } else {
      return temp[3] + "-" + mt + "-" + temp[2]
    }
  }

  public static showMsgError() {
    alert("Operation non reussie")
  }

  public static showMsgSuccess() {
    alert("Operation reussie")
  }

}


/*
@Component({
  selector: 'error-dialog',
  templateUrl: 'global-err.html',
  styleUrls: ['global.css']
})
export class ErrorManagement {

  title: string;
  msg: string;
  color: number;

  constructor(public dialogRef: MdDialogRef<ErrorManagement>, @Inject(MD_DIALOG_DATA) public data: any){
    console.log("dialog opened ... ");
    this.title = this.data.title;
    this.msg = this.data.msg;
    this.color = this.data.color;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

*/
