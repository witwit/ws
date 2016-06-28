import os from 'os';

export default function getIpAddress() {
  const addresses = [];

  // get all public IPv4 address
  // see http://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
  const interfaces = os.networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
        // addresses.push(alias.address);
      }
    }
  }

  return '0.0.0.0';

  // a little bit ugly, but we need to find an address that can be accessed by our grid
  // 1) we look for our internal VPN address, which we know begins with '172.20.200.x'
  // 2) if we can't find one, search for '172.x.x.x' which should be LAN, but not WLAN
  // 3) return any found address
  // 4) if we can't find one, return '0.0.0.0'
  // const vpnAddresses = addresses.filter(address => address.match(/^172.20.200./));
  // const lanAddresses = addresses.filter(address => address.match(/^172./));

  // if (vpnAddresses.length) {
  //   return vpnAddresses[0];
  // } else if (lanAddresses.length) {
  //   return lanAddresses[0];
  // } else if (addresses.length) {
  //   return addresses[0];
  // } else {
  //   return '0.0.0.0';
  // }
}
