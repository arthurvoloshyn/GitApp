import Modernizr from 'modernizr';

const { userAgent, appVersion } = navigator;

const BrowserDetect = {
  init() {
    this.browser = this.searchString(this.dataBrowser) || 'Other';
    this.version = this.searchVersion(userAgent) || this.searchVersion(appVersion) || 'Unknown';
  },
  searchString(data) {
    for (let i = 0; i < data.length; i++) {
      const dataString = data[i].string;
      const dataSubString = data[i].subString;

      this.versionSearchString = dataSubString;

      if (dataString.indexOf(dataSubString) !== -1) {
        return data[i].identity;
      }
    }

    return '';
  },
  searchVersion(dataString) {
    const index = dataString.indexOf(this.versionSearchString);
    if (index === -1) {
      return '';
    }

    const rv = dataString.indexOf('rv:');
    if (this.versionSearchString === 'Trident' && rv !== -1) {
      return parseFloat(dataString.substring(rv + 3));
    }

    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
  },

  dataBrowser: [
    { string: userAgent, subString: 'Edge', identity: 'MS Edge' },
    { string: userAgent, subString: 'MSIE', identity: 'Explorer' },
    { string: userAgent, subString: 'Trident', identity: 'Explorer' },
    { string: userAgent, subString: 'Firefox', identity: 'Firefox' },
    { string: userAgent, subString: 'Opera', identity: 'Opera' },
    { string: userAgent, subString: 'OPR', identity: 'Opera' },
    { string: userAgent, subString: 'Chrome', identity: 'Chrome' },
    { string: userAgent, subString: 'Safari', identity: 'Safari' },
  ],
};

BrowserDetect.init();

const { ipad, ipod, iphone } = Modernizr;
const { browser } = BrowserDetect;

Modernizr.addTest('ipad', Boolean(userAgent.match(/iPad/i)));

Modernizr.addTest('iphone', Boolean(userAgent.match(/iPhone/i)));

Modernizr.addTest('ipod', Boolean(userAgent.match(/iPod/i)));

Modernizr.addTest('ios', ipad || ipod || iphone);

Modernizr.addTest('ie', Boolean(browser === 'Explorer'));

require('expose?MobileDetect!mobile-detect');
require('mobile-detect/mobile-detect-modernizr');
