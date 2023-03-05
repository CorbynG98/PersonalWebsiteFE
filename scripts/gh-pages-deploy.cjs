/* eslint-disable no-console */
import { execa } from 'execa';

const fs = require('fs');
(async () => {
  try {
    const branchName = "gh-pages-test";
    await execa('git', ['checkout', '--orphan', branchName]);
    // eslint-disable-next-line no-console
    console.log('Building started...');
    await execa('npm', ['run', 'build']);
    // Understand if it's dist or build folder
    // Should be dist for VUE, build for REACT
    const folderName = fs.existsSync('dist') ? 'dist' : 'build';
    await execa('cp', ['./CNAME', `./${folderName}/CNAME`]); // Copy the cname data in for custom domains
    await execa('cp', [
      `./${folderName}/index.html`,
      `./${folderName}/404.html`,
    ]); // Copy the index page and rename 404. Take over github 404 when hit
    await execa('git', ['--work-tree', folderName, 'add', '--all']);
    await execa('git', ['--work-tree', folderName, 'commit', '-m', branchName]);
    console.log('Pushing to ' + branchName + '...');
    await execa('git', ['push', 'origin', `HEAD:${branchName}`, '--force']);
    await execa('rm', ['-rf', folderName]);
    await execa('git', ['checkout', '-f', 'main']);
    await execa('git', ['branch', '-D', branchName]);
    console.log('Successfully deployed, check your settings');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    process.exit(1);
  }
})();
