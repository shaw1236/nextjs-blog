import Net from 'net';
import { getCallerIP, ipLookUp } from '../../lib/tools';

// Ping the self or an IP 
export default async function ping(req, res) {
    try {
        const IPAddress = getCallerIP(req);
        const { ip } = req.query; 
        if (!ip) {
            return res.send(await ipLookUp(IPAddress) || { message: "Local run or no data found" });
        }
        
        const isIP = Net.isIP(ip); 
        if (isIP) {
            const IPAddr = isIP? ip : IPAddress;  
            res.send(await ipLookUp(IPAddr) || { message: "No data found" });         
        }
        else { 
            res.send(`My IP Address is: ${IPAddress}`);
        }
    }
    catch (ex) {
        res.send({ result: false, message: ex.message || ex });
    }
}