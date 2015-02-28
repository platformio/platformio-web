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
      getPackages: getPackages,
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
        type: 'arduino',
        name: 'Arduino'
      }, {
        type: 'energia',
        name: 'Energia'
      }, {
        type: 'opencm3',
        name: 'OpenCM3'
      }];
    }

    function getPackages() {
      return {
        'toolchain-atmelavr': {
          alias: 'toolchain',
          contents: 'avr-gcc, GDB, AVaRICE, SimulAVR'
        },
        'toolchain-gccarmnoneeabi': {
          alias: 'toolchain',
          contents: 'gcc-arm-embedded, GDB'
        },
        'toolchain-timsp430': {
          alias: 'toolchain',
          contents: 'msp-gcc, GDB'
        },
        'tool-avrdude': {
          alias: 'uploader',
          contents: 'AVRDUDE'
        },
        'tool-micronucleus': {
          alias: 'uploader',
          contents: 'Micronucleus'
        },
        'tool-bossac': {
          alias: 'uploader',
          contents: 'BOSSA CLI'
        },
        'tool-stlink': {
          alias: 'uploader',
          contents: 'STLink'
        },
        'tool-teensy': {
          alias: 'uploader',
          contents: 'Teensy Loader'
        },
        'tool-mspdebug': {
          alias: 'uploader',
          contents: 'MSPDebug'
        },
        'tool-lm4flash': {
          alias: 'uploader',
          contents: 'Flash Programmer'
        },
        'framework-arduinoavr': {
          contents: 'Arduino Wiring-based Framework (AVR Core, 1.6)'
        },
        'framework-arduinosam': {
          contents: 'Arduino Wiring-based Framework (SAM Core, 1.6)'
        },
        'framework-cmsis': {
          contents: 'Vendor-independent hardware abstraction layer for the Cortex-M processor series'
        },
        'framework-spl': {
          contents: 'Standard Peripheral Library for STM32 MCUs'
        },
        'framework-opencm3': {
          contents: 'libOpenCM3 Framework'
        },
        'framework-arduinoteensy': {
          contents: 'Arduino Wiring-based Framework'
        },
        'framework-energiamsp430': {
          contents: 'Energia Wiring-based Framework (MSP430 Core)'
        },
        'framework-energiativa': {
          contents: 'Energia Wiring-based Framework (LM4F Core)'
        }
      };
    }

    function getPlatforms() {
      return [{
        type: 'atmelavr',
        name: 'Atmel AVR',
        description: (
          '<a href="http://docs.platformio.org/en/latest/platforms/atmelavr.html" target="_blank">' +
          'Atmel AVR® 8- and 32-bit MCUs</a> deliver a unique combination of performance, ' +
          'power efficiency and design flexibility. Optimized to speed time to market—and ' +
          'easily adapt to new ones—they are based on the industry\'s most code-efficient ' +
          'architecture for C and assembly programming.'
        ),
        packages: ['toolchain-atmelavr', 'tool-avrdude',
          'tool-micronucleus', 'framework-arduinoavr'
        ]
      }, {
        type: 'atmelsam',
        name: 'Atmel SAM',
        description: (
          '<a href="http://docs.platformio.org/en/latest/platforms/atmelsam.html" target="_blank">' +
          'Atmel® | SMART</a> offers Flash- based ARM® products based on the ARM Cortex-®M0+, ' +
          'Cortex-M3 and Cortex-M4 architectures, ranging from 8KB to 2MB of Flash including ' +
          'a rich peripheral and feature mix.'
        ),
        packages: ['toolchain-gccarmnoneeabi', 'tool-bossac',
          'framework-arduinosam'
        ]
      }, {
        type: 'stm32',
        name: 'STM32',
        description: (
          '<a href="http://docs.platformio.org/en/latest/platforms/stm32.html" target="_blank">' +
          'The STM32 family of 32-bit Flash MCUs</a> based on the ARM® Cortex®-M processor ' +
          'is designed to offer new degrees of freedom to MCU users. It offers a 32-bit ' +
          'product range that combines very high performance, real-time capabilities, ' +
          'digital signal processing, and low-power, low-voltage operation, while ' +
          'maintaining full integration and ease of development. '
        ),
        packages: ['toolchain-gccarmnoneeabi', 'tool-stlink',
          'framework-cmsis', 'framework-spl', 'framework-opencm3'
        ]
      }, {
        type: 'teensy',
        name: 'Teensy',
        description: (
          '<a href="http://docs.platformio.org/en/latest/platforms/teensy.html" target="_blank">' +
          'Teensy</a> is a complete USB-based microcontroller development system, in a very ' +
          'small footprint, capable of implementing many types of projects. All programming ' +
          'is done via the USB port. No special programmer is needed, only a standard "Mini-B" ' +
          'USB cable and a PC or Macintosh with a USB port.'
        ),
        packages: ['toolchain-gccarmnoneeabi', 'toolchain-atmelavr',
          'tool-teensy', 'framework-arduinoteensy'
        ]
      }, {
        type: 'timsp430',
        name: 'TI MSP430',
        description: (
          '<a href="http://docs.platformio.org/en/latest/platforms/timsp430.html" target="_blank">' +
          'MSP430 microcontrollers (MCUs) from Texas Instruments (TI)</a> are 16-bit, RISC-based, ' +
          'mixed-signal processors designed for ultra-low power. These MCUs offer the lowest power ' +
          'consumption and the perfect mix of integrated peripherals for thousands of applications.'
        ),
        packages: ['toolchain-timsp430', 'tool-mspdebug',
          'ramework-energiamsp430'
        ]
      }, {
        type: 'titiva',
        name: 'TI TIVA',
        description: (
          '<a href="http://docs.platformio.org/en/latest/platforms/titiva.html" target="_blank">' +
          'Texas Instruments TM4C12x MCUs</a> offer the industry’s most popular ARM® Cortex®-M4 ' +
          'core with scalable memory and package options, unparalleled connectivity peripherals, ' +
          'advanced application functions, industry-leading analog integration, and extensive ' +
          'software solutions.'
        ),
        packages: ['toolchain-gccarmnoneeabi', 'tool-lm4flash',
          'framework-energiativa', 'framework-opencm3'
        ]
      }];
    }

    function getBoards() {
      return {
        arduino: [{
          type: 'atmegangatmega168',
          name: 'Arduino NG or older (ATmega168)',
          mcu: 'ATmega168',
          fCPU: 16,
          rom: 16,
          ram: 1
        }, {
          type: 'atmegangatmega8',
          name: 'Arduino NG or older (ATmega8)',
          mcu: 'ATmega8',
          fCPU: 16,
          rom: 8,
          ram: 1
        }, {
          type: 'btatmega168',
          name: 'Arduino BT (ATmega168)',
          mcu: 'ATmega168',
          fCPU: 16,
          rom: 16,
          ram: 1
        }, {
          type: 'btatmega328',
          name: 'Arduino BT (ATmega328)',
          mcu: 'ATmega328',
          fCPU: 16,
          rom: 32,
          ram: 2
        }, {
          type: 'diecimilaatmega168',
          name: 'Arduino Diecimila or Duemilanove (ATmega168)',
          mcu: 'ATmega168',
          fCPU: 16,
          rom: 16,
          ram: 1
        }, {
          type: 'diecimilaatmega328',
          name: 'Arduino Diecimila or Duemilanove (ATmega328)',
          mcu: 'ATmega328',
          fCPU: 16,
          rom: 32,
          ram: 2
        }, {
          type: 'esplora',
          name: 'Arduino Esplora',
          mcu: 'ATmega32u4',
          fCPU: 16,
          rom: 32,
          ram: 2.5
        }, {
          type: 'fio',
          name: 'Arduino Fio',
          mcu: 'ATmega328P',
          fCPU: 8,
          rom: 32,
          ram: 2
        }, {
          type: 'leonardo',
          name: 'Arduino Leonardo',
          mcu: 'ATmega32u4',
          fCPU: 16,
          rom: 32,
          ram: 2.5
        }, {
          type: 'LilyPadUSB',
          name: 'Arduino LilyPad USB',
          mcu: 'ATmega32u4',
          fCPU: 8,
          rom: 32,
          ram: 2.5
        }, {
          type: 'lilypadatmega168',
          name: 'Arduino LilyPad (ATmega168)',
          mcu: 'ATmega168',
          fCPU: 8,
          rom: 16,
          ram: 1
        }, {
          type: 'lilypadatmega328',
          name: 'Arduino LilyPad (ATmega328)',
          mcu: 'ATmega328P',
          fCPU: 8,
          rom: 32,
          ram: 2
        }, {
          type: 'megaADK',
          name: 'Arduino Mega ADK',
          mcu: 'ATmega2560',
          fCPU: 16,
          rom: 256,
          ram: 8
        }, {
          type: 'megaatmega1280',
          name: 'Arduino Mega (ATmega1280)',
          mcu: 'ATmega1280',
          fCPU: 16,
          rom: 128,
          ram: 8
        }, {
          type: 'megaatmega2560',
          name: 'Arduino Mega (ATmega2560)',
          mcu: 'ATmega2560',
          fCPU: 16,
          rom: 256,
          ram: 8
        }, {
          type: 'micro',
          name: 'Arduino Micro',
          mcu: 'ATmega32u4',
          fCPU: 16,
          rom: 32,
          ram: 2.5
        }, {
          type: 'miniatmega168',
          name: 'Arduino Mini (ATmega168)',
          mcu: 'ATmega168',
          fCPU: 16,
          rom: 16,
          ram: 1
        }, {
          type: 'miniatmega328',
          name: 'Arduino Mini (ATmega328P)',
          mcu: 'ATmega328P',
          fCPU: 16,
          rom: 32,
          ram: 2
        }, {
          type: 'nanoatmega168',
          name: 'Arduino Nano (ATmega168)',
          mcu: 'ATmega168',
          fCPU: 16,
          rom: 16,
          ram: 1
        }, {
          type: 'nanoatmega328',
          name: 'Arduino Nano (ATmega328P)',
          mcu: 'ATmega328P',
          fCPU: 16,
          rom: 32,
          ram: 2
        }, {
          type: 'pro8MHzatmega168',
          name: 'Arduino Pro or Pro Mini (ATmega168, 3.3V)',
          mcu: 'ATmega168',
          fCPU: 8,
          rom: 16,
          ram: 1
        }, {
          type: 'pro16MHzatmega168',
          name: 'Arduino Pro or Pro Mini (ATmega168, 5V)',
          mcu: 'ATmega168',
          fCPU: 16,
          rom: 16,
          ram: 1
        }, {
          type: 'pro8MHzatmega328',
          name: 'Arduino Pro or Pro Mini (ATmega328P, 3.3V)',
          mcu: 'ATmega328P',
          fCPU: 8,
          rom: 32,
          ram: 2
        }, {
          type: 'pro16MHzatmega328',
          name: 'Arduino Pro or Pro Mini (ATmega328P, 5V)',
          mcu: 'ATmega328P',
          fCPU: 16,
          rom: 32,
          ram: 2
        }, {
          type: 'robotControl',
          name: 'Arduino Robot Control',
          mcu: 'ATmega32u4',
          fCPU: 16,
          rom: 32,
          ram: 2.5
        }, {
          type: 'robotMotor',
          name: 'Arduino Robot Motor',
          mcu: 'ATmega32u4',
          fCPU: 16,
          rom: 32,
          ram: 2.5
        }, {
          type: 'uno',
          name: 'Arduino Uno',
          mcu: 'ATmega328P',
          fCPU: 16,
          rom: 32,
          ram: 2
        }, {
          type: 'yun',
          name: 'Arduino Yun',
          mcu: 'ATmega32u4',
          fCPU: 16,
          rom: 32,
          ram: 2.5
        }, {
          type: 'due',
          name: 'Arduino Due',
          mcu: 'AT91SAM3x8e',
          fCPU: 84,
          rom: 512,
          ram: 32
        }],
        adafruit: [{
          type: 'flora8',
          name: 'Adafruit Flora',
          mcu: 'ATmega32u4',
          fCPU: 8,
          rom: 32,
          ram: 2.5
        }, {
          type: 'trinket3',
          name: 'Adafruit Trinket 8MHz 3.3V LOGIC',
          mcu: 'ATtiny85',
          fCPU: 8,
          rom: 8,
          ram: 0.5
        }, {
          type: 'trinket5',
          name: 'Adafruit Trinket 16MHz 5V LOGIC',
          mcu: 'ATtiny85',
          fCPU: 16,
          rom: 8,
          ram: 0.5
        }, {
          type: 'protrinket3',
          name: 'Adafruit Pro Trinket 3V/12MHz (USB)',
          mcu: 'ATmega328P',
          fCPU: 12,
          rom: 32,
          ram: 2
        }, {
          type: 'protrinket3ftdi',
          name: 'Adafruit Pro Trinket 3V/12MHz (FTDI)',
          mcu: 'ATmega328P',
          fCPU: 12,
          rom: 32,
          ram: 2
        }, {
          type: 'protrinket5',
          name: 'Adafruit Pro Trinket 5V/16MHz (USB)',
          mcu: 'ATmega328P',
          fCPU: 16,
          rom: 32,
          ram: 2
        }, {
          type: 'protrinket5ftdi',
          name: 'Adafruit Pro Trinket 5V/16MHz (FTDI)',
          mcu: 'ATmega328P',
          fCPU: 16,
          rom: 32,
          ram: 2
        }],
        digistump: [{
          type: 'digispark-tiny',
          name: 'Digispark USB Development Board',
          mcu: 'ATtiny85',
          fCPU: 16,
          rom: 8,
          ram: 0.5
        }, {
          type: 'digispark-pro',
          name: 'Digispark Pro (Default 16 Mhz)',
          mcu: 'ATtiny167',
          fCPU: 16,
          rom: 16,
          ram: 0.5
        }, {
          type: 'digispark-pro32',
          name: 'Digispark Pro (16 Mhz) (32 byte buffer)',
          mcu: 'ATtiny167',
          fCPU: 16,
          rom: 16,
          ram: 0.5
        }, {
          type: 'digix',
          name: 'Digistump DigiX',
          mcu: 'AT91SAM3x8e',
          fCPU: 84,
          rom: 512,
          ram: 32
        }],
        engduino: [{
          type: 'engduinov1',
          name: 'Engduino 1',
          mcu: 'ATmega32u4',
          fCPU: 16,
          rom: 32,
          ram: 2.5
        }, {
          type: 'engduinov2',
          name: 'Engduino 2',
          mcu: 'ATmega32u4',
          fCPU: 16,
          rom: 32,
          ram: 2.5
        }, {
          type: 'engduinov3',
          name: 'Engduino 3',
          mcu: 'ATmega32u4',
          fCPU: 16,
          rom: 32,
          ram: 2.5
        }],
        microduino: [{
          type: '168pa8m',
          name: 'Microduino Core (ATmega168P, 3.3V)',
          mcu: 'ATmega168P',
          fCPU: 8,
          rom: 16,
          ram: 1
        }, {
          type: '168pa16m',
          name: 'Microduino Core (ATmega168P, 5V)',
          mcu: 'ATmega168P',
          fCPU: 16,
          rom: 16,
          ram: 1
        }, {
          type: '328p8m',
          name: 'Microduino Core (ATmega328P, 3.3V)',
          mcu: 'ATmega328P',
          fCPU: 8,
          rom: 32,
          ram: 2
        }, {
          type: '328p16m',
          name: 'Microduino Core (ATmega328P, 5V)',
          mcu: 'ATmega328P',
          fCPU: 16,
          rom: 32,
          ram: 2
        }, {
          type: '644pa8m',
          name: 'Microduino Core+ (ATmega644PA, 3.3V)',
          mcu: 'ATmega644PA',
          fCPU: 8,
          rom: 64,
          ram: 4
        }, {
          type: '644pa16m',
          name: 'Microduino Core+ (ATmega644PA, 5V)',
          mcu: 'ATmega644PA',
          fCPU: 16,
          rom: 64,
          ram: 4
        }, {
          type: '1284p8m',
          name: 'Microduino Core+ (Atmega1284P, 3.3V)',
          mcu: 'Atmega1284P',
          fCPU: 8,
          rom: 128,
          ram: 16
        }, {
          type: '1284p16m',
          name: 'Microduino Core+ (Atmega1284P, 5V)',
          mcu: 'Atmega1284P',
          fCPU: 16,
          rom: 128,
          ram: 16
        }, {
          type: '32u416m',
          name: 'Microduino-Core USB',
          mcu: 'ATmega32u4',
          fCPU: 16,
          rom: 32,
          ram: 2.5
        }],
        stm32: [{
          type: 'stm32ldiscovery',
          name: 'Discovery kit for STM32L151/152 line',
          mcu: 'STM32L152rbt6',
          fCPU: 32,
          rom: 128,
          ram: 16
        }, {
          type: 'stm32f3discovery',
          name: 'Discovery kit for STM32F303xx microcontrollers',
          mcu: 'STM32F303vct6',
          fCPU: 72,
          rom: 256,
          ram: 48
        }, {
          type: 'stm32f4discovery',
          name: 'Discovery kit for STM32F407/417 lines',
          mcu: 'STM32F407vgt6',
          fCPU: 168,
          rom: 1024,
          ram: 192
        }],
        raspduino: [{
          type: 'raspduino',
          name: 'Raspduino',
          mcu: 'ATmega328P',
          fCPU: 16,
          rom: 32,
          ram: 2
        }],
        teensy: [{
          type: 'teensy20',
          name: 'Teensy 2.0',
          mcu: 'ATmega32u4',
          fCPU: 16,
          rom: 32,
          ram: 2.5
        }, {
          type: 'teensy20pp',
          name: 'Teensy++ 2.0',
          mcu: 'AT90USB1289',
          fCPU: 16,
          rom: 128,
          ram: 8
        }, {
          type: 'teensy30',
          name: 'Teensy 3.0',
          mcu: 'MK20DX128',
          fCPU: 48,
          rom: 128,
          ram: 16
        }, {
          type: 'teensy31',
          name: 'Teensy 3.1',
          mcu: 'MK20DX256',
          fCPU: 72,
          rom: 256,
          ram: 64
        }],
        timsp430: [{
          type: 'lpmsp430g2231',
          name: 'MSP430G2231 LaunchPad',
          mcu: 'MSP430G2231',
          fCPU: 16,
          rom: 2,
          ram: 0.128
        }, {
          type: 'lpmsp430g2452',
          name: 'MSP430G2452 LaunchPad',
          mcu: 'MSP430G2452',
          fCPU: 16,
          rom: 8,
          ram: 0.256
        }, {
          type: 'lpmsp430g2553',
          name: 'MSP430G2553 LaunchPad',
          mcu: 'MSP430G2553',
          fCPU: 16,
          rom: 16,
          ram: 0.512
        }, {
          type: 'lpmsp430f5529',
          name: 'MSP430F5529 LaunchPad (16 Mhz)',
          mcu: 'MSP430F5529',
          fCPU: 16,
          rom: 128,
          ram: 8
        }, {
          type: 'lpmsp430f5529_25',
          name: 'MSP430F5529 LaunchPad (25 Mhz)',
          mcu: 'MSP430F5529',
          fCPU: 25,
          rom: 128,
          ram: 8
        }, {
          type: 'lpmsp430fr5739',
          name: 'MSP430FR5739 Experimenter Board',
          mcu: 'MSP430FR5739',
          fCPU: 16,
          rom: 16,
          ram: 1
        }, {
          type: 'lpmsp430fr5969',
          name: 'MSP430FR5969 LaunchPad',
          mcu: 'MSP430FR5969',
          fCPU: 16,
          rom: 64,
          ram: 2
        }],
        titiva: [{
          type: 'lplm4f120h5qr',
          name: 'Stellaris LM4F120 LaunchPad',
          mcu: 'LM4F120H5QR',
          fCPU: 80,
          rom: 256,
          ram: 32
        }, {
          type: 'lptm4c1230c3pm',
          name: 'Tiva C Series TM4C123G LaunchPad',
          mcu: 'TM4C123GH6PM',
          fCPU: 80,
          rom: 256,
          ram: 32
        }, {
          type: 'lptm4c1294ncpdt',
          name: 'Tiva C Series TM4C1294 Connected LaunchPad',
          mcu: 'TM4C1294NCPDT',
          fCPU: 120,
          rom: 1,
          ram: 256
        }]
      };
    }
  }

})();
