import _ from 'lodash';
import grid from 'selenium-grid-status';
import { project } from '../project';

interface Browser {
  browserName: string;
  version: string;
  id: string;
}

function isNotBlacklisted(browser) {
  return !project.ws.selenium.blacklist.some(id => id === browser.id);
}

function isWhitelisted(browser) {
  if (project.ws.selenium.whitelist.length) {
    return project.ws.selenium.whitelist.some(id => id === browser.id);
  } else {
    // if whitelist is empty, *every* browser is whitelisted
    return true;
  }
}

export function getNodes(): Promise<grid.SeleniumNode[]> {
  const { host, port } = project.ws.selenium;
  return new Promise((resolve, reject) => {
    grid.available({ host, port }, (err, status) => {
      if (err) {
        reject(err);
      } else {
        resolve(status);
      }
    });
  });
}

export async function getBrowsers() {
  // convert status like https://github.com/davglass/selenium-grid-status#usage
  // to a list of unique browsers containing just the `browserName`, `version` and `id`
  const nodes = await getNodes();
  let browsers: Browser[] = _.flatten(nodes.map(node => node.browser))
    .map(({ browserName, version }) => ({
      browserName,
      version,
      id: `${browserName}-${version}`
    }));
  return _.uniqBy(browsers, 'id')
    .filter(isNotBlacklisted)
    .filter(isWhitelisted);
}
