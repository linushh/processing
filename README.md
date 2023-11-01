# processing
simple web app to show processing data and strongswan logging.
HOW TO:

This server will refresh it self every second to update the cpu-usage and diskspace used.
1. Press "refresh" to manually refresh CPU usage, diskspace used, diskspace left.
2. Press "log" to see strongswan-starter.service journal.
3. Enter name in the textbox to add and or remove users, enter the name of the person you want to add / remove.
4. Press "Restart StrongSwan" to restart the strongswan service
5. Press "Reboot system" to restart the system / machine.
   
Certain features assumes you have admin privlidges so i suggest 
1. Navigate to the programfile (./path/to/your/file) and run the program with the correct privlidge ('sudo')
2. Make sure the program has the right to execute.  chmod +x.

How to make runnable program.
1. Make sure electron and electron-packager --save-dev is installed.
2. run the packager:
   1. navigate to your project
   2. run the packager with correct configurations 
      Linux: electron-packager . myapp-linux --platform=linux --arch=x64 --icon=icon.png --overwrite
      Windows: electron-packager . myapp --platform=win32 --arch=x64 --icon=icon.ico --overwrite
3. Run the program with the correct privileges.
     1. Give privlidge to folder / program with chmod +x
     2. ./path/to/your/file
4. Open http://localhost:3000/ in your browser


First time me writning a "How To" and me first time using javascript/nodejs. Please be gentle.
