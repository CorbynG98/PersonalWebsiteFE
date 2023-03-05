/* eslint-disable no-console */
var exec = require('child_process').exec;

const fs = require('fs');
(async () => {
  try {
    await exec('git', ['checkout', '--orphan', 'gh-pages']);
    // eslint-disable-next-line no-console
    console.log('Building started...');
    await exec('npm', ['run', 'build']);
    // Understand if it's dist or build folder
    // Should be dist for VUE, build for REACT
    const folderName = fs.existsSync('dist') ? 'dist' : 'build';
    await exec('cp', ['./CNAME', `./${folderName}/CNAME`]); // Copy the cname data in for custom domains
    await exec('cp', [
      `./${folderName}/index.html`,
      `./${folderName}/404.html`,
    ]); // Copy the index page and rename 404. Take over github 404 when hit
    await exec(`git --work-tree ${folderName} add --all`);
    await exec(`git --work-tree ${folderName} commit -m gh-pages`);
    console.log('Pushing to gh-pages...');
    await exec(`git push origin HEAD:gh-pages --force`);
    await exec('rm', ['-rf', folderName]);
    await exec(`git checkout -f main`);
    await exec(`git branch -D gh-pages`);
    console.log('Successfully deployed, check your settings');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    process.exit(1);
  }
})();
