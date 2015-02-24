/**
 * Copyright (C) Ivan Kravets <me@ikravets.com>
 * See LICENSE for details.
 */

(function() {
  'use strict';

  angular
    .module('siteApp')
    .factory('dataService', dataService);

  function dataService($resource, siteConfig) {
    return {
      getLibSearchResult: getLibSearchResult,
      getLibExamples: getLibExamples,
      getLibInfo: getLibInfo,
      getLibDlUrl: getLibDlUrl,
      getLibStats: getLibStats,
      getFrameworks: getFrameworks,
      getPlatforms: getPlatforms,
      getBoards: getBoards
    };

    function getLibSearchResult(data) {
      return $resource(siteConfig.apiURL + '/lib/search', data).get();
    }

    function getLibExamples(data) {
      return $resource(siteConfig.apiURL + '/lib/examples', data).get();
    }

    function getLibInfo(id) {
      return $resource(siteConfig.apiURL + '/lib/info/' + id).get();
    }

    function getLibDlUrl(id) {
      return $resource(
        siteConfig.apiURL + '/lib/download/' + id).get();
    }

    function getLibStats() {
      return $resource(siteConfig.apiURL + '/lib/stats').get();
    }

    function getFrameworks() {
      return [{
        name: 'arduino',
        title: 'Arduino'
      }, {
        name: 'energia',
        title: 'Energia'
      }];
    }

    function getPlatforms() {
      return [{
        name: 'atmelavr',
        title: 'Atmel AVR'
      }, {
        name: 'atmelsam',
        title: 'Atmel SAM'
      }, {
        name: 'timsp430',
        title: 'TI MSP430'
      }, {
        name: 'titiva',
        title: 'TI TIVA'
      }, {
        name: 'teensy',
        title: 'Teensy'
      }];
    }

    function getBoards() {
      return {
        'arduino': [{
          'type': 'atmegangatmega168',
          'name': 'Arduino NG or older (ATmega168)',
          'url': 'http://arduino.cc/en/main/boards',
          'mcu': 'ATmega168',
          'f_cpu': 16,
          'rom': 16,
          'ram': 1
        }, {
          'type': 'atmegangatmega8',
          'name': 'Arduino NG or older (ATmega8)',
          'url': 'http://arduino.cc/en/main/boards',
          'mcu': 'ATmega8',
          'f_cpu': 16,
          'rom': 8,
          'ram': 1
        }, {
          'type': 'btatmega168',
          'name': 'Arduino BT (ATmega168)',
          'url': 'http://arduino.cc/en/main/boards',
          'mcu': 'ATmega168',
          'f_cpu': 16,
          'rom': 16,
          'ram': 1
        }, {
          'type': 'btatmega328',
          'name': 'Arduino BT (ATmega328)',
          'url': 'http://arduino.cc/en/main/boards',
          'mcu': 'ATmega328',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2
        }, {
          'type': 'diecimilaatmega168',
          'name': 'Arduino Diecimila or Duemilanove (ATmega168)',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardDiecimila',
          'mcu': 'ATmega168',
          'f_cpu': 16,
          'rom': 16,
          'ram': 1
        }, {
          'type': 'diecimilaatmega328',
          'name': 'Arduino Diecimila or Duemilanove (ATmega328)',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardDiecimila',
          'mcu': 'ATmega328',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2
        }, {
          'type': 'esplora',
          'name': 'Arduino Esplora',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardEsplora',
          'mcu': 'ATmega32u4',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2.5
        }, {
          'type': 'fio',
          'name': 'Arduino Fio',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardFio',
          'mcu': 'ATmega328P',
          'f_cpu': 8,
          'rom': 32,
          'ram': 2
        }, {
          'type': 'leonardo',
          'name': 'Arduino Leonardo',
          'url': 'http://arduino.cc/en/Main/arduinoBoardLeonardo',
          'mcu': 'ATmega32u4',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2.5
        }, {
          'type': 'LilyPadUSB',
          'name': 'Arduino LilyPad USB',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardLilyPadUSB',
          'mcu': 'ATmega32u4',
          'f_cpu': 8,
          'rom': 32,
          'ram': 2.5
        }, {
          'type': 'lilypadatmega168',
          'name': 'Arduino LilyPad (ATmega168)',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardLilyPad',
          'mcu': 'ATmega168',
          'f_cpu': 8,
          'rom': 16,
          'ram': 1
        }, {
          'type': 'lilypadatmega328',
          'name': 'Arduino LilyPad (ATmega328)',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardLilyPad',
          'mcu': 'ATmega328P',
          'f_cpu': 8,
          'rom': 32,
          'ram': 2
        }, {
          'type': 'megaADK',
          'name': 'Arduino Mega ADK',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardMegaADK',
          'mcu': 'ATmega2560',
          'f_cpu': 16,
          'rom': 256,
          'ram': 8
        }, {
          'type': 'megaatmega1280',
          'name': 'Arduino Mega (ATmega1280)',
          'url': 'http://arduino.cc/en/Main/arduinoBoardMega',
          'mcu': 'ATmega1280',
          'f_cpu': 16,
          'rom': 128,
          'ram': 8
        }, {
          'type': 'megaatmega2560',
          'name': 'Arduino Mega (ATmega2560)',
          'url': 'http://arduino.cc/en/Main/arduinoBoardMega2560',
          'mcu': 'ATmega2560',
          'f_cpu': 16,
          'rom': 256,
          'ram': 8
        }, {
          'type': 'micro',
          'name': 'Arduino Micro',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardMicro',
          'mcu': 'ATmega32u4',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2.5
        }, {
          'type': 'miniatmega168',
          'name': 'Arduino Mini (ATmega168)',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardMini',
          'mcu': 'ATmega168',
          'f_cpu': 16,
          'rom': 16,
          'ram': 1
        }, {
          'type': 'miniatmega328',
          'name': 'Arduino Mini (ATmega328P)',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardMini',
          'mcu': 'ATmega328P',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2
        }, {
          'type': 'nanoatmega168',
          'name': 'Arduino Nano (ATmega168)',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardNano',
          'mcu': 'ATmega168',
          'f_cpu': 16,
          'rom': 16,
          'ram': 1
        }, {
          'type': 'nanoatmega328',
          'name': 'Arduino Nano (ATmega328P)',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardNano',
          'mcu': 'ATmega328P',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2
        }, {
          'type': 'pro8MHzatmega168',
          'name': 'Arduino Pro or Pro Mini (ATmega168, 3.3V)',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardProMini',
          'mcu': 'ATmega168',
          'f_cpu': 8,
          'rom': 16,
          'ram': 1
        }, {
          'type': 'pro16MHzatmega168',
          'name': 'Arduino Pro or Pro Mini (ATmega168, 5V)',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardProMini',
          'mcu': 'ATmega168',
          'f_cpu': 16,
          'rom': 16,
          'ram': 1
        }, {
          'type': 'pro8MHzatmega328',
          'name': 'Arduino Pro or Pro Mini (ATmega328P, 3.3V)',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardProMini',
          'mcu': 'ATmega328P',
          'f_cpu': 8,
          'rom': 32,
          'ram': 2
        }, {
          'type': 'pro16MHzatmega328',
          'name': 'Arduino Pro or Pro Mini (ATmega328P, 5V)',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardProMini',
          'mcu': 'ATmega328P',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2
        }, {
          'type': 'robotControl',
          'name': 'Arduino Robot Control',
          'url': 'http://arduino.cc/en/Main/Robot',
          'mcu': 'ATmega32u4',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2.5
        }, {
          'type': 'robotMotor',
          'name': 'Arduino Robot Motor',
          'url': 'http://arduino.cc/en/Main/Robot',
          'mcu': 'ATmega32u4',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2.5
        }, {
          'type': 'uno',
          'name': 'Arduino Uno',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardUno',
          'mcu': 'ATmega328P',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2
        }, {
          'type': 'yun',
          'name': 'Arduino Yun',
          'url': 'http://arduino.cc/en/Main/ArduinoBoardYun',
          'mcu': 'ATmega32u4',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2.5
        }, {
          'type': 'due',
          'name': 'Arduino Due',
          'url': 'http://arduino.cc/en/Main/arduinoBoardDue',
          'mcu': 'AT91SAM3x8e',
          'f_cpu': 84,
          'rom': 512,
          'ram': 32
        }],
        'adafruit': [{
          'type': 'flora8',
          'name': 'Adafruit Flora',
          'url': 'http://www.adafruit.com/product/659',
          'mcu': 'ATmega32u4',
          'f_cpu': 8,
          'rom': 32,
          'ram': 2.5
        }, {
          'type': 'trinket3',
          'name': 'Adafruit Trinket 8MHz 3.3V LOGIC',
          'url': 'http://www.adafruit.com/products/1500',
          'mcu': 'ATtiny85',
          'f_cpu': 8,
          'rom': 8,
          'ram': 0.5
        }, {
          'type': 'trinket5',
          'name': 'Adafruit Trinket 16MHz 5V LOGIC',
          'url': 'http://www.adafruit.com/products/1501',
          'mcu': 'ATtiny85',
          'f_cpu': 16,
          'rom': 8,
          'ram': 0.5
        }, {
          'type': 'protrinket3',
          'name': 'Adafruit Pro Trinket 3V/12MHz (USB)',
          'url': 'http://www.adafruit.com/products/2010',
          'mcu': 'ATmega328P',
          'f_cpu': 12,
          'rom': 32,
          'ram': 2
        }, {
          'type': 'protrinket3ftdi',
          'name': 'Adafruit Pro Trinket 3V/12MHz (FTDI)',
          'url': 'http://www.adafruit.com/products/2010',
          'mcu': 'ATmega328P',
          'f_cpu': 12,
          'rom': 32,
          'ram': 2
        }, {
          'type': 'protrinket5',
          'name': 'Adafruit Pro Trinket 5V/16MHz (USB)',
          'url': 'http://www.adafruit.com/products/2000',
          'mcu': 'ATmega328P',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2
        }, {
          'type': 'protrinket5ftdi',
          'name': 'Adafruit Pro Trinket 5V/16MHz (FTDI)',
          'url': 'http://www.adafruit.com/products/2000',
          'mcu': 'ATmega328P',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2
        }],
        'digispark': [{
          'type': 'digispark-tiny',
          'name': 'Digispark USB Development Board',
          'url': 'http://digistump.com/products/1',
          'mcu': 'ATtiny85',
          'f_cpu': 16,
          'rom': 8,
          'ram': 0.5
        }, {
          'type': 'digispark-pro',
          'name': 'Digispark Pro (Default 16 Mhz)',
          'url': 'http://digistump.com/products/109',
          'mcu': 'ATtiny167',
          'f_cpu': 16,
          'rom': 16,
          'ram': 0.5
        }, {
          'type': 'digispark-pro32',
          'name': 'Digispark Pro (16 Mhz) (32 byte buffer)',
          'url': 'http://digistump.com/products/109',
          'mcu': 'ATtiny167',
          'f_cpu': 16,
          'rom': 16,
          'ram': 0.5
        }, {
          'type': 'digix',
          'name': 'Digistump DigiX',
          'url': 'http://digistump.com/products/50',
          'mcu': 'AT91SAM3x8e',
          'f_cpu': 84,
          'rom': 512,
          'ram': 32
        }],
        'engduino': [{
          'type': 'engduinov1',
          'name': 'Engduino 1',
          'url': 'http://www.engduino.org/',
          'mcu': 'ATmega32u4',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2.5
        }, {
          'type': 'engduinov2',
          'name': 'Engduino 2',
          'url': 'http://www.engduino.org/',
          'mcu': 'ATmega32u4',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2.5
        }, {
          'type': 'engduinov3',
          'name': 'Engduino 3',
          'url': 'http://www.engduino.org/',
          'mcu': 'ATmega32u4',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2.5
        }],
        'microduino': [{
          'type': '168pa8m',
          'name': 'Microduino Core (ATmega168P, 3.3V)',
          'url': 'http://www.microduino.cc/wiki/index.php?title=Microduino-Core',
          'mcu': 'ATmega168P',
          'f_cpu': 8,
          'rom': 16,
          'ram': 1
        }, {
          'type': '168pa16m',
          'name': 'Microduino Core (ATmega168P, 5V)',
          'url': 'http://www.microduino.cc/wiki/index.php?title=Microduino-Core',
          'mcu': 'ATmega168P',
          'f_cpu': 16,
          'rom': 16,
          'ram': 1
        }, {
          'type': '328p8m',
          'name': 'Microduino Core (ATmega328P, 3.3V)',
          'url': 'http://www.microduino.cc/wiki/index.php?title=Microduino-Core',
          'mcu': 'ATmega328P',
          'f_cpu': 8,
          'rom': 32,
          'ram': 2
        }, {
          'type': '328p16m',
          'name': 'Microduino Core (ATmega328P, 5V)',
          'url': 'http://www.microduino.cc/wiki/index.php?title=Microduino-Core',
          'mcu': 'ATmega328P',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2
        }, {
          'type': '644pa8m',
          'name': 'Microduino Core+ (ATmega644PA, 3.3V)',
          'url': 'http://www.microduino.cc/wiki/index.php?title=Microduino-Core%2B',
          'mcu': 'ATmega644PA',
          'f_cpu': 8,
          'rom': 64,
          'ram': 4
        }, {
          'type': '644pa16m',
          'name': 'Microduino Core+ (ATmega644PA, 5V)',
          'url': 'http://www.microduino.cc/wiki/index.php?title=Microduino-Core%2B',
          'mcu': 'ATmega644PA',
          'f_cpu': 16,
          'rom': 64,
          'ram': 4
        }, {
          'type': '1284p8m',
          'name': 'Microduino Core+ (Atmega1284P, 3.3V)',
          'url': 'http://www.microduino.cc/wiki/index.php?title=Microduino-Core%2B',
          'mcu': 'Atmega1284P',
          'f_cpu': 8,
          'rom': 128,
          'ram': 16
        }, {
          'type': '1284p16m',
          'name': 'Microduino Core+ (Atmega1284P, 5V)',
          'url': 'http://www.microduino.cc/wiki/index.php?title=Microduino-Core%2B',
          'mcu': 'Atmega1284P',
          'f_cpu': 16,
          'rom': 128,
          'ram': 16
        }, {
          'type': '32u416m',
          'name': 'Microduino-Core USB',
          'url': 'http://www.microduino.cc/wiki/index.php?title=Microduino-CoreUSB',
          'mcu': 'ATmega32u4',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2.5
        }],
        'stm32': [{
          'type': 'stm32ldiscovery',
          'name': 'Discovery kit for STM32L151/152 line',
          'url': (
            'http://www.st.com/web/catalog/tools/FM116/SC959/SS1532/PF250990' +
            '?sc=internet/evalboard/product/250990.jsp'),
          'mcu': 'STM32L152rbt6',
          'f_cpu': 32,
          'rom': 128,
          'ram': 16
        }, {
          'type': 'stm32f3discovery',
          'name': 'Discovery kit for STM32F303xx microcontrollers',
          'url': 'http://www.st.com/web/catalog/tools/FM116/SC959/SS1532/PF254044',
          'mcu': 'STM32F303vct6',
          'f_cpu': 72,
          'rom': 256,
          'ram': 48
        }, {
          'type': 'stm32f4discovery',
          'name': 'Discovery kit for STM32F407/417 lines',
          'url': 'http://www.st.com/web/catalog/tools/FM116/SC959/SS1532/PF252419',
          'mcu': 'STM32F407vgt6',
          'f_cpu': 168,
          'rom': 1024,
          'ram': 192
        }],
        'raspduino': [{
          'type': 'raspduino',
          'name': 'Raspduino',
          'url': 'http://www.bitwizard.nl/wiki/index.php/Raspduino',
          'mcu': 'ATmega328P',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2
        }],
        'teensy': [{
          'type': 'teensy20',
          'name': 'Teensy 2.0',
          'url': 'https://www.pjrc.com/store/teensy.html',
          'mcu': 'ATmega32u4',
          'f_cpu': 16,
          'rom': 32,
          'ram': 2.5
        }, {
          'type': 'teensy20pp',
          'name': 'Teensy++ 2.0',
          'url': 'https://www.pjrc.com/store/teensypp.html',
          'mcu': 'AT90USB1289',
          'f_cpu': 16,
          'rom': 128,
          'ram': 8
        }, {
          'type': 'teensy30',
          'name': 'Teensy 3.0',
          'url': 'https://www.pjrc.com/store/teensy3.html',
          'mcu': 'MK20DX128',
          'f_cpu': 48,
          'rom': 128,
          'ram': 16
        }, {
          'type': 'teensy31',
          'name': 'Teensy 3.1',
          'url': 'https://www.pjrc.com/store/teensy31.html',
          'mcu': 'MK20DX256',
          'f_cpu': 72,
          'rom': 256,
          'ram': 64
        }],
        'timsp430': [{
          'type': 'lpmsp430g2231',
          'name': 'MSP430G2231 LaunchPad',
          'url': 'http://www.ti.com/ww/en/launchpad/launchpads-msp430-msp-exp430g2.html',
          'mcu': 'MSP430G2231',
          'f_cpu': 16,
          'rom': 2,
          'ram': 0.128
        }, {
          'type': 'lpmsp430g2452',
          'name': 'MSP430G2452 LaunchPad',
          'url': 'http://www.ti.com/ww/en/launchpad/launchpads-msp430-msp-exp430g2.html',
          'mcu': 'MSP430G2452',
          'f_cpu': 16,
          'rom': 8,
          'ram': 0.256
        }, {
          'type': 'lpmsp430g2553',
          'name': 'MSP430G2553 LaunchPad',
          'url': 'http://www.ti.com/ww/en/launchpad/launchpads-msp430-msp-exp430g2.html',
          'mcu': 'MSP430G2553',
          'f_cpu': 16,
          'rom': 16,
          'ram': 0.512
        }, {
          'type': 'lpmsp430f5529',
          'name': 'MSP430F5529 LaunchPad (16 Mhz)',
          'url': 'http://www.ti.com/ww/en/launchpad/launchpads-msp430-msp-exp430f5529lp.html',
          'mcu': 'MSP430F5529',
          'f_cpu': 16,
          'rom': 128,
          'ram': 8
        }, {
          'type': 'lpmsp430f5529_25',
          'name': 'MSP430F5529 LaunchPad (25 Mhz)',
          'url': 'http://www.ti.com/ww/en/launchpad/launchpads-msp430-msp-exp430f5529lp.html',
          'mcu': 'MSP430F5529',
          'f_cpu': 25,
          'rom': 128,
          'ram': 8
        }, {
          'type': 'lpmsp430fr5739',
          'name': 'MSP430FR5739 Experimenter Board',
          'url': 'http://www.ti.com/tool/msp-exp430fr5739',
          'mcu': 'MSP430FR5739',
          'f_cpu': 16,
          'rom': 16,
          'ram': 1
        }, {
          'type': 'lpmsp430fr5969',
          'name': 'MSP430FR5969 LaunchPad',
          'url': 'http://www.ti.com/ww/en/launchpad/launchpads-msp430-msp-exp430fr5969.html',
          'mcu': 'MSP430FR5969',
          'f_cpu': 16,
          'rom': 64,
          'ram': 2
        }],
        'titiva': [{
          'type': 'lplm4f120h5qr',
          'name': 'Stellaris LM4F120 LaunchPad',
          'url': 'http://www.ti.com/tool/ek-lm4f120xl',
          'mcu': 'LM4F120H5QR',
          'f_cpu': 80,
          'rom': 256,
          'ram': 32
        }, {
          'type': 'lptm4c1230c3pm',
          'name': 'Tiva C Series TM4C123G LaunchPad',
          'url': 'http://www.ti.com/ww/en/launchpad/launchpads-connected-ek-tm4c123gxl.html',
          'mcu': 'TM4C123GH6PM',
          'f_cpu': 80,
          'rom': 256,
          'ram': 32
        }, {
          'type': 'lptm4c1294ncpdt',
          'name': 'Tiva C Series TM4C1294 Connected LaunchPad',
          'url': 'http://www.ti.com/ww/en/launchpad/launchpads-connected-ek-tm4c1294xl.html',
          'mcu': 'TM4C1294NCPDT',
          'f_cpu': 120,
          'rom': 1,
          'ram': 256
        }]
      };
    }
  }

})();
