/* eslint-disable no-console */
const execa = require('execa');
const fs = require('fs');
(async () => {
  try {
    await execa('git', ['checkout', '--orphan', 'gh-pages']);
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
    await execa('git', ['--work-tree', folderName, 'commit', '-m', 'gh-pages']);
    console.log('Pushing to gh-pages...');
    await execa('git', ['push', 'origin', 'HEAD:gh-pages', '--force']);
    await execa('rm', ['-rf', folderName]);
    await execa('git', ['checkout', '-f', 'main']);
    await execa('git', ['branch', '-D', 'gh-pages']);
    console.log('Successfully deployed, check your settings');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    process.exit(1);
  }
})();
