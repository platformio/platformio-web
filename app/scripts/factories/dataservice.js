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
        type: 'mbed',
        name: 'MBED'
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
          contents: '<code>Arduino</code> Wiring-based Framework (AVR Core, 1.6)'
        },
        'framework-arduinosam': {
          contents: '<code>Arduino</code> Wiring-based Framework (SAM Core, 1.6)'
        },
        'framework-cmsis': {
          contents: 'Vendor-independent hardware abstraction layer for the Cortex-M processor series'
        },
        'framework-spl': {
          contents: 'Standard Peripheral Library for STM32 MCUs'
        },
        'framework-opencm3': {
          contents: '<code>libOpenCM3</code>  Framework'
        },
        'framework-arduinoteensy': {
          contents: '<code>Arduino</code>  Wiring-based Framework'
        },
        'framework-energiamsp430': {
          contents: '<code>Energia</code>  Wiring-based Framework (MSP430 Core)'
        },
        'framework-energiativa': {
          contents: '<code>Energia</code>  Wiring-based Framework (LM4F Core)'
        },
        'framework-mbed': {
          contents: (
            '<code>MBED</code> Framework for internet-connected devices ' +
            'based on 32-bit ARM Cortex-M microcontrollers'
          )
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
        type: 'freescalekinetis',
        name: 'Freescale Kinetis',
        description: (
          '<a href="http://docs.platformio.org/en/latest/platforms/freescalekinetis.html" target="_blank">' +
          'Freescale Kinetis Microcontrollers</a> is family of multiple hardware- and software-compatible ' +
          'ARM® Cortex®-M0+, Cortex-M4 and Cortex-M7-based MCU series. Kinetis MCUs offer exceptional ' +
          'low-power performance, scalability and feature integration.'
        ),
        packages: ['toolchain-gccarmnoneeabi', 'framework-mbed']
      }, {
        type: 'ststm32',
        name: 'ST STM32',
        description: (
          '<a href="http://docs.platformio.org/en/latest/platforms/ststm32.html" target="_blank">' +
          'STM32 family of 32-bit Flash MCUs</a> based on the ARM® Cortex®-M processor ' +
          'is designed to offer new degrees of freedom to MCU users. It offers a 32-bit ' +
          'product range that combines very high performance, real-time capabilities, ' +
          'digital signal processing, and low-power, low-voltage operation, while ' +
          'maintaining full integration and ease of development. '
        ),
        packages: ['toolchain-gccarmnoneeabi', 'tool-stlink',
          'framework-cmsis', 'framework-spl', 'framework-opencm3',
          'framework-mbed'
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
      }, {
        type: 'nordicnrf51',
        name: 'Nordic nRF51',
        description: (
          '<a href="http://docs.platformio.org/en/latest/platforms/nordicnrf51.html" target="_blank">' +
          'Nordic nRF51</a> Series is a family of highly flexible, multi-protocol ' +
          'system-on-chip (SoC) devices for ultra-low power wireless applications. ' +
          'nRF51 Series devices support a range of protocol stacks including Bluetooth Smart ' +
          '(previously called Bluetooth low energy), ANT and proprietary 2.4GHz protocols.'
        ),
        packages: ['toolchain-gccarmnoneeabi', 'framework-mbed']
      }, {
        type: 'nxplpc',
        name: 'NXP LPC',
        description: (
          '<a href="http://docs.platformio.org/en/latest/platforms/nxplpc.html" target="_blank">' +
          'NXP LPC</a> is a family of 32-bit microcontroller integrated circuits by NXP. ' +
          'The LPC chips are grouped into related series that are based around the same ' +
          '32-bit ARM processor core, such as the Cortex-M4F, Cortex-M3, Cortex-M0+,' +
          'or Cortex-M0. Internally, each microcontroller consists of the processor core, ' +
          'static RAM memory, flash memory, debugging interface, and various peripherals.'
        ),
        packages: ['toolchain-gccarmnoneeabi', 'framework-mbed']
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
          name: 'Arduino Due (Programming Port)',
          mcu: 'AT91SAM3x8e',
          fCPU: 84,
          rom: 512,
          ram: 32
        }, {
          type: 'dueUSB',
          name: 'Arduino Due (USB Native Port)',
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
        freescale: [{
          type: 'frdm_kl05z',
          name: 'Freescale Kinetis FRDM-KL05Z',
          mcu: 'MKL05Z32VFM4',
          fCPU: 48,
          rom: 32,
          ram: 4
        }, {
          type: 'frdm_kl25z',
          name: 'Freescale Kinetis FRDM-KL25Z',
          mcu: 'MKL25Z128VLK4',
          fCPU: 48,
          rom: 128,
          ram: 16
        }, {
          type: 'frdm_kl46z',
          name: 'Freescale Kinetis FRDM-KL46Z',
          mcu: 'MKL46Z256Vll4',
          fCPU: 48,
          rom: 256,
          ram: 32
        }, {
          type: 'frdm_k22f',
          name: 'Freescale Kinetis FRDM-K22F',
          mcu: 'MK22FN512VLH12',
          fCPU: 120,
          rom: 512,
          ram: 128
        }, {
          type: 'frdm_k64f',
          name: 'Freescale Kinetis FRDM-K64F',
          mcu: 'MK64fN1M0VLL12',
          fCPU: 120,
          rom: 1024,
          ram: 256
        }, {
          type: 'frdm_k20d50m',
          name: 'Freescale Kinetis FRDM-K20D50M',
          mcu: 'MK20DX128VLH5',
          fCPU: 48,
          rom: 128,
          ram: 16
        }],
        nordic: [{
          type: 'nrf51_mkit',
          name: 'Nordic nRF51822-mKIT',
          mcu: 'NRF51822',
          fCPU: 16,
          rom: 128,
          ram: 16
        }, {
          type: 'nrf51_dongle',
          name: 'Nordic nRF51-Dongle',
          mcu: 'NRF51822/NRF51422',
          fCPU: 32,
          rom: 256,
          ram: 16
        }, {
          type: 'nrf51_dk',
          name: 'Nordic nRF51-DK',
          mcu: 'NRF51822/NRF51422',
          fCPU: 32,
          rom: 256,
          ram: 16
        }, {
          type: 'redBearLab',
          name: 'RedBearLab nRF51822',
          mcu: 'NRF51822',
          fCPU: 16,
          rom: 256,
          ram: 16
        }, {
          type: 'redBearLabBLENano',
          name: 'RedBearLab BLE Nano',
          mcu: 'NRF51822',
          fCPU: 16,
          rom: 256,
          ram: 16
        }, {
          type: 'wallBotBLE',
          name: 'JKSoft Wallbot BLE',
          mcu: 'NRF51822',
          fCPU: 16,
          rom: 128,
          ram: 16
        }, {
          type: 'hrm1017',
          name: 'Switch Science mbed HRM1017',
          mcu: 'NRF51822',
          fCPU: 16,
          rom: 128,
          ram: 16
        }],
        nxp: [{
          type: 'lpc1549',
          name: 'NXP LPCXpresso1549',
          mcu: 'LPC1549',
          fCPU: 72,
          rom: 256,
          ram: 36
        }, {
          type: 'lpc1768',
          name: 'mbed LPC1768',
          mcu: 'LPC1768',
          fCPU: 96,
          rom: 512,
          ram: 32
        }, {
          type: 'seeeduinoArchPro',
          name: 'Seeeduino-Arch-Pro',
          mcu: 'LPC1768',
          fCPU: 96,
          rom: 512,
          ram: 32
        }, {
          type: 'ubloxc027',
          name: 'U-blox C027',
          mcu: 'LPC1768',
          fCPU: 96,
          rom: 512,
          ram: 32
        }, {
          type: 'lpc1114fn28',
          name: 'mbed LPC1114FN28',
          mcu: 'LPC1114FN28',
          fCPU: 48,
          rom: 32,
          ram: 4
        }, {
          type: 'lpc11u24',
          name: 'mbed LPC11U24',
          mcu: 'LPC11U24',
          fCPU: 48,
          rom: 32,
          ram: 8
        }, {
          type: 'dipcortexm0',
          name: 'DipCortex M0',
          mcu: 'LPC11U24',
          fCPU: 50,
          rom: 32,
          ram: 8
        }, {
          type: 'blueboard_lpc11u24',
          name: 'BlueBoard-LPC11U24',
          mcu: 'LPC11U24',
          fCPU: 48,
          rom: 32,
          ram: 8
        }, {
          type: 'mbuino',
          name: 'Outrageous Circuits mBuino',
          mcu: 'LPC11U24',
          fCPU: 50,
          rom: 32,
          ram: 8
        }, {
          type: 'lpc11u35',
          name: 'EA LPC11U35 QuickStart Board',
          mcu: 'LPC11U35',
          fCPU: 48,
          rom: 64,
          ram: 10
        }, {
          type: 'lpc11u35_501',
          name: 'TG-LPC11U35-501 QuickStart Board',
          mcu: 'LPC11U35',
          fCPU: 48,
          rom: 64,
          ram: 10
        }, {
          type: 'lpc4088',
          name: 'EA LPC4088 QuickStart Board',
          mcu: 'LPC4088',
          fCPU: 120,
          rom: 512,
          ram: 96
        }, {
          type: 'lpc4088_dm',
          name: 'EA LPC4088 Display Module',
          mcu: 'LPC4088',
          fCPU: 120,
          rom: 512,
          ram: 96
        }],
        st: [{
          type: 'disco_l152rb',
          name: 'ST STM32LDISCOVERY',
          mcu: 'STM32L152rbt6',
          fCPU: 32,
          rom: 128,
          ram: 16
        }, {
          type: 'disco_f303vc',
          name: 'ST STM32F3DISCOVERY',
          mcu: 'STM32F303vct6',
          fCPU: 72,
          rom: 256,
          ram: 48
        }, {
          type: 'disco_f407vg',
          name: 'ST STM32F4DISCOVERY',
          mcu: 'STM32F407vgt6',
          fCPU: 168,
          rom: 1024,
          ram: 192
        }, {
          type: 'disco_f100rb',
          name: 'ST STM32VLDISCOVERY',
          mcu: 'STM32F100rbt6',
          fCPU: 24,
          rom: 128,
          ram: 8
        }, {
          type: 'disco_f051r8',
          name: 'ST STM32F0DISCOVERY',
          mcu: 'STM32F051r8t6',
          fCPU: 48,
          rom: 64,
          ram: 8
        }, {
          type: 'disco_f334c8',
          name: 'ST 32F3348DISCOVERY',
          mcu: 'STM32F334c8t6',
          fCPU: 72,
          rom: 64,
          ram: 16
        }, {
          type: 'disco_f401vc',
          name: 'ST 32F401CDISCOVERY',
          mcu: 'STM32F401vct6',
          fCPU: 84,
          rom: 256,
          ram: 64
        }, {
          type: 'disco_f429zi',
          name: 'ST 32F429IDISCOVERY',
          mcu: 'STM32F429zit6',
          fCPU: 180,
          rom: 2048,
          ram: 256
        }, {
          type: 'nucleo_f030r8',
          name: 'ST Nucleo F030R8',
          mcu: 'STM32F030r8t6',
          fCPU: 48,
          rom: 64,
          ram: 8
        }, {
          type: 'nucleo_f070rb',
          name: 'ST Nucleo F070RB',
          mcu: 'STM32F070rbt6',
          fCPU: 48,
          rom: 128,
          ram: 16
        }, {
          type: 'nucleo_f072rb',
          name: 'ST Nucleo F072RB',
          mcu: 'STM32F072rbt6',
          fCPU: 48,
          rom: 128,
          ram: 16
        }, {
          type: 'nucleo_f091rc',
          name: 'ST Nucleo F091RC',
          mcu: 'STM32F091rct6',
          fCPU: 48,
          rom: 256,
          ram: 32
        }, {
          type: 'nucleo_f103rb',
          name: 'ST Nucleo F103RB',
          mcu: 'STM32F103rbt6',
          fCPU: 72,
          rom: 128,
          ram: 20
        }, {
          type: 'nucleo_f302r8',
          name: 'ST Nucleo F302R8',
          mcu: 'STM32F302r8t6',
          fCPU: 72,
          rom: 64,
          ram: 16
        }, {
          type: 'nucleo_f334r8',
          name: 'ST Nucleo F334R8',
          mcu: 'STM32F334r8t6',
          fCPU: 72,
          rom: 64,
          ram: 16
        }, {
          type: 'nucleo_f401re',
          name: 'ST Nucleo F401RE',
          mcu: 'STM32F401ret6',
          fCPU: 84,
          rom: 512,
          ram: 96
        }, {
          type: 'nucleo_f411re',
          name: 'ST Nucleo F411RE',
          mcu: 'STM32F411ret6',
          fCPU: 100,
          rom: 512,
          ram: 128
        }, {
          type: 'nucleo_l053r8',
          name: 'ST Nucleo L053R8',
          mcu: 'STM32L053r8t6',
          fCPU: 48,
          rom: 64,
          ram: 8
        }, {
          type: 'nucleo_l152re',
          name: 'ST Nucleo L152RE',
          mcu: 'STM32L152ret6',
          fCPU: 32,
          rom: 512,
          ram: 80
        }],
        raspduino: [{
          type: 'raspduino',
          name: 'Raspduino',
          mcu: 'ATmega328P',
          fCPU: 16,
          rom: 32,
          ram: 2
        }],
        sainsmart: [{
          type: 'sainSmartDue',
          name: 'SainSmart Due (Programming Port)',
          mcu: 'AT91SAM3x8e',
          fCPU: 84,
          rom: 512,
          ram: 32
        }, {
          type: 'sainSmartDueUSB',
          name: 'SainSmart Due (USB Native Port)',
          mcu: 'AT91SAM3x8e',
          fCPU: 84,
          rom: 512,
          ram: 32
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
        ti: [{
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
        }, {
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
