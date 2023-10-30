const si = require('systeminformation');
const express = require('express');
const util = require("util");
const exec = util.promisify(require('child_process').exec);
const path = require('path');
const app = express();
const port = 3000;
// test
// test two
let cpuUsageData = {};

app.get("/addUser", async(req, res) => {
    const { username } = req.query;
    try{
        const {stdout, stderr} = await exec(`sudo useradd ${username}`);
        if(stderr){
            throw new Error(stderr);
        }
        res.send(`Användare ${username} har lagts till.`)
    } catch (error){
        console.error("Ett fel uppstod: ", error);
        res.status(500).send("Internal Server Error");
    }

});

app.get("/removeUser", async(req, res) => {
    const {username} = req.query;
    try {
        const {stdout, stderr} = await exec(`sudo userdel ${username}`);
        if(stderr){
            throw new Error(stderr);
        }
        res.send(`Användare ${username} har tagits bort.`)
    } catch(error){
        console.error("Ett fel uppstod: ", error);
        req.status(500).send("Internal Server Error");
    };
});

app.get("/log", async(req, res) => {
    try {
        const { stdout, stderr } = await exec('sudo ipsec statusall');  
        if (stderr) {
            throw new Error(stderr);
        }
        res.send(stdout);
    } catch (error){
        console.error("Ett fel uppstod:", error);
        res.status(500).send("Internal Server Error");
    }
});

setInterval(async () => {
    cpuUsageData = await si.currentLoad();
}, 1000);

app.get('/data', async (req, res) => {
    try {
        const cpuUsage = await si.currentLoad();
        const cpuData = await si.cpu();
        const diskInfo = await si.fsSize();
        const osInfo = await si.osInfo();
        const users = await si.users();
        // const logData = await si.processes();
        // console.log('CPU-användning:', cpuUsage);
        // console.log('Disk information:', diskInfo);
        // console.log('Loggdata:', logData);
        

        let cpuUsagePercentage = cpuUsage.currentLoad.toFixed(2);
        let cpuCores = cpuData.cores;
        let cpuPhysicalCores = cpuData.physicalCores;
        let cpuBrand = cpuData.manufacturer;
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
            cpuData: cpuCores,
            cpuBrand: cpuBrand,
            cpuPhysicalCores: cpuPhysicalCores,

            diskUsed: diskUsed,
            diskFree: diskFree,

            osInfo: computerName,

            userNames: userNames, 
            
           // logData: logData
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