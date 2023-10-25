const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
import * as path from 'path';
import * as XLSX from 'xlsx'
import { writeFileSync } from 'fs';

module.exports = defineConfig({
  projectId: "afqxok",
  e2e: {
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    setupNodeEvents(on:any, config:any) {
      on('task', {
        convertXlsxToJSON(xlsxPath: any){
          const workbook = XLSX.readFile(xlsxPath)
          const worksheet = workbook.Sheets[workbook.SheetNames[0]]
          const jsonData = XLSX.utils.sheet_to_json(worksheet)

          const fileName = path.basename(xlsxPath, '.xlsx');
          const jsonFilePath = `cypress/fixtures/${fileName}.json`;
          writeFileSync(jsonFilePath, JSON.stringify(jsonData,null,1));
          
          return null;
        }
      })

      allureWriter(on, config);
      require('@cypress/grep/src/plugin')(config);
      return config;
    },
    env: {
      allure: true,
      allureResultsPath: "allure-results",
      download_dir: './cypress/downloads',
      // allureReuseAfterSpec: true
    },
    reporter: 'mochawesome',
    reporterOptions: {
      mochaFile: 'cypress-results/cypress-report.xml',
      reportDir: 'cypress/results/mochawesome',
      overWrite: false,
      html: false,
      json: true,
      toConsole: true
    },
    videosFolder: 'allure-results/',
    screenshotOnRunFailure: true,  
    allureAttachRequests:true
  },
});