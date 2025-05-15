#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to run shell commands
function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error running command: ${command}`);
    process.exit(1);
  }
}

// Sentry CLI setup
function setupSentry() {
  console.log('🚀 Setting up Sentry...');
  
  // Install Sentry CLI
  runCommand('npm install -g @sentry/cli');
  
  // Create Sentry project (interactive)
  console.log('Please follow the prompts to create a Sentry project:');
  runCommand('sentry-cli login');
  
  // Create project configuration
  runCommand('sentry-cli projects create --org=legends-of-cocktails --name=legends-frontend');
}

// Mixpanel setup
function setupMixpanel() {
  console.log('📊 Setting up Mixpanel...');
  
  console.log('Steps to set up Mixpanel:');
  console.log('1. Go to https://mixpanel.com/');
  console.log('2. Create a new project named "Legends of Cocktails"');
  console.log('3. Copy the project token');
  console.log('4. Update .env.local with the token');
}

// Main setup function
function main() {
  console.log('🔧 Monitoring Services Setup');
  
  setupSentry();
  setupMixpanel();
  
  console.log('✅ Setup complete! Please update .env.local with your project tokens.');
}

main();
