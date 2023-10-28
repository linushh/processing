const si = require('systeminformation');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

let cpuUsageData = {};

setInterval(async () => {
    cpuUsageData = await si.currentLoad();
}, 3000);

app.get('/data', async (req, res) => {
    try {
        const cpuUsage = await si.currentLoad();
        const diskInfo = await si.fsSize();
        const osInfo = await si.osInfo();
        const users = await si.users();
        // const logData = await si.processes(); // Exempel på hur du kan hämta loggdata

        console.log('CPU-användning:', cpuUsage);
        console.log('Disk information:', diskInfo);
        // console.log('Loggdata:', logData); // Se till att loggdata loggas korrekt

        let cpuUsagePercentage = cpuUsage.currentLoad.toFixed(2);
        let diskUsed = 'N/A';
        let diskFree = 'N/A';
        let computerName = osInfo.hostname;
        let userNames = users.map(user => user.user);
        

        if (cpuUsage && cpuUsage.currentload) {
            cpuUsagePercentage = cpuUsage.currentload.toFixed(2);
        }

        if (diskInfo && diskInfo[0] && diskInfo[0].size && diskInfo[0].used) {
            diskUsed = (diskInfo[0].size / 1024 / 1024 / 1024 - diskInfo[0].used / 1024 / 1024 / 1024).toFixed(2);
            diskFree = (diskInfo[0].size / 1024 / 1024 / 1024).toFixed(2);
        }

        const data = {
            cpuUsage: cpuUsagePercentage,
            diskUsed: diskUsed,
            diskFree: diskFree,
            osInfo: computerName,
            userNames: userNames 
           // logData: logData // Se till att loggdata inkluderas i responsobjektet
        };

        res.send(data);
        
    } catch (error) {
        console.error('Ett fel uppstod:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/processing-html.html'));
});

app.listen(port, () => {
    console.log(`Servern körs på http://localhost:${port}`);
});