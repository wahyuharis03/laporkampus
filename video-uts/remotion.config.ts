import {Config} from '@remotion/cli/config';

// Pakai Chrome yang sudah terpasang, supaya tidak mengunduh Chrome Headless Shell.
Config.setBrowserExecutable('C:/Program Files/Google/Chrome/Application/chrome.exe');

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
