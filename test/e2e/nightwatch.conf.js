
const Services = {};

loadServices();

const chromeConfiguration = {
    test_workers: false,
    desiredCapabilities: {
        screenshots: {
            enabled: false,
            path: 'screens',
            on_failure: true,
        },
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        acceptInsecureCerts: true,
        chromeOptions: {
            args: [
                '--ignore-certificate-errors',
            ]
        },
    },
    webdriver: {
        start_process: true,
        port: 9515,
        server_path: (Services.chromedriver ? Services.chromedriver.path : ''),
        cli_args: []
    }
};

module.exports = {
    src_folders: ['./test/e2e/tests'],
    page_objects_path: './test/e2e/components',
    custom_commands_path: '',
    custom_assertions_path: '',
    globals_path: './globalsModule.js',
    test_settings: {
        default: {
            disable_error_log: false,
            launch_url: 'http://localhost:3000/',
            ...chromeConfiguration,
        }
    },
};

function loadServices() {
    try {
        Services.chromedriver = require('chromedriver');
    } catch (err) {}
}