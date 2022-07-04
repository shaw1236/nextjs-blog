import Net from 'net';

// return an object or null
export const headers = { 'Content-Type': 'application/json' };

// ip look up
export async function ipLookUp(IPAddress) {
  try {
      if (!IPAddress)
        return {};  // empty object

      if (!Net.isIP(IPAddress))
          throw 'Invalid IP Address';
      const ipLookUpSites = ['https://ip-api.io/json/<IP>', 'https://ipapi.co/<IP>/json'];
      let result = null;
      for (const site of ipLookUpSites) {
          const url = site.replace('<IP>', IPAddress);
          try {
              //const resp = await fetch(url, { method: 'POST', body: JSON.stringify(data), headers });
              //const resp = await fetch(url, { method: 'GET', headers });
              const resp = await fetch(url);
              if (resp.status === 200) {
                  const data = await resp.json();
                  result = { service: url, ...data };
                  break;
              }
          }
          catch(ex) {
              //console.error({ function: "ipLookUp", IPAddress, message: ex.message || ex });
          }
      } 
      return result;
  }
  catch (ex) {
      console.error({ function: "ipLookUp", IPAddress, message: ex.message || ex });
      return null;
  }
}

// Get ip address from a caller 
export function getCallerIP(request) {
    try {
      const option1 = (request.headers['x-forwarded-for'] || '').split(',').pop().trim();
      const option2 = request.socket.remoteAddress || request.connection.remoteAddress;
      // in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
      if (!option1 && !option2)
        throw "No data found from request";
      const ipCombined = (option1 || option2).replace(/::.+:/, "");
      const ip = ipCombined.split(":")[0]; // remove the port
      return ip;
    }

    catch(ex) {
      //console.error("[function::getCallerIP] ex:", ex.message || ex);
      return null;
    }
};