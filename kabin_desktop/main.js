
// run tomcat server
const exec = require("child_process").exec;

function execute(command, callback){
	exec(command, (error, stdout, stderr)=>{
		callback(stdout)
	});
}

//
var os = require('os');

if("linux" == os.platform()){
  console.log("linux platform detected !\n");
  
  // //create postgresql database here

  // //run tomcat server linux
  // execute("cd ../lae_pro/ && mvn -e tomcat7:run ", (output)=>{
  //   console.log("electron s-call: ", output);
  // });
}else if("win32" == os.platform){
  console("windows platform detected !\n");

  // //create postgressql database here if not exist

  // //run tomcat server windows
  // execute("cd ../lae_pro/ && mvn -e tomcat7:run ", (output)=>{
  //   console.log("electron s-call: ", output);
  // });
}

// create electron gui
const {app, Menu, BrowserWindow} = require('electron');

const path = require('path');
const url = require('url');

require('dotenv').config();

let win = null;
let contents = null
function createWindow() {
  // Initialize the window to our specified dimensions
  win = new BrowserWindow(
    {
      width: 1000, 
      height: 600, 
      webPreferences: {
          webSecurity: false,
          nativeWindowOpen: true
      },
      icon: path.join(__dirname, 'dist/assets/icons/linux/logo.png')
  });
  
  //to print content
  contents = win.webContents;

  // Specify entry point
  if (process.env.PACKAGE === 'false'){
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  } else {
    win.loadURL(process.env.HOST);
    win.webContents.openDevTools();
  }  // Show dev tools
  // Remove this line before distributing
  win.webContents.openDevTools();
  //Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });
}



app.on('ready', function () {
  createWindow();
  //createMenu();
  win.setMenu(null);
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
    //createMenu();
    win.setMenu(null);
  }
})
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

function createMenu(){

  const template = [
    {
      label: 'Fichier',
      submenu: [
        {
          label: "Fermer", role: 'close'
        }
      ]
    },
    {
      label: 'Edition',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {label: "Couper", role: 'cut'},
        {label: "Copier", role: 'copy'},
        {label: "Coller", role: 'paste'},
        {label: "Tout Selectioner", role: 'selectall'}
      ]
    },
    {
      label: 'Vue',
      submenu: [
        {label: "Relancer l\'Application", role: 'reload'},
        {label: "Forcer le relancement", role: 'forcereload'},
        {label: "Afficher le console", role: 'toggledevtools'},
        {type: 'separator'},
        {label: "Initialiser Zoom", role: 'resetzoom'},
        {type: 'separator'},
        {label: "Mode Plein d'Ecran", role: 'togglefullscreen'}
      ]
    },
    {
      label: "Fenètre", role: 'window',
      submenu: [
        {label:"Minimiser", role: 'minimize'},
        {label: "Fermer", role: 'close'}
      ]
    },
    {
      label: "Aide", role: 'help',
      submenu: [
        {
          label: 'Visiter notre site',
          click () { require('electron').shell.openExternal('https://levilliard.herokuapp.com/') }
        }
      ]
    }
  ]

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    })

    // Edit menu
    template[1].submenu.push(
      {type: 'separator'},
      {
        label: 'Speech',
        submenu: [
          {role: 'startspeaking'},
          {role: 'stopspeaking'}
        ]
      }
    )

    // Window menu
    template[3].submenu = [
      {role: 'close'},
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {role: 'front'}
    ]
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
