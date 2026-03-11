/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const notesFile = path.join(__dirname, '../my-logs.txt');

// ✅ Auto-create my-notes.txt if it doesn't exist
if (!fs.existsSync(notesFile)) {
  const template = `A central collection of logs generated from all of your commits. 😀

========= LOGS =========
`;
  fs.writeFileSync(notesFile, template, 'utf8');
  console.log('Created my-notes.txt with default structure.');
}

try {
  const data = fs.readFileSync(notesFile, 'utf8');
  const lines = data.split('\n');

  let logsIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('=== LOGS ===')) {
      logsIndex = i;
      break;
    }
  }

  if (logsIndex === -1) {
    // Fallback behavior
    // We need updatesContent generated first to print it.
  }

  const today = new Date().toISOString().split('T')[0];
  let commitMessagesList = [];

  try {
    const authorName = execSync('git config user.name', {
      encoding: 'utf8',
    }).trim();
    const output = execSync(
      `git log --since="midnight" --author="${authorName}" --pretty=format:"- %s"`,
      { encoding: 'utf8' }
    );

    // Filter out Merge commits and empty lines
    commitMessagesList = output
      .split('\n')
      .map((l) => l.trim())
      .filter(
        (l) =>
          l && !l.startsWith('- Merge') && !l.toLowerCase().startsWith('- test')
      );
  } catch (e) {
    console.warn('Failed to fetch git logs:', e.message);
  }

  let updatesContent = ''; // For console fallback mainly

  // Logic to check if top log entry is today's
  // logsIndex is the line with === LOGS ===
  // The next line should be the start of logs (or empty line then logs)

  // In strict mode as per file content view:
  // 20: === LOGS ===
  // 21: Updates 2026-01-15:

  // There might be empty lines, so let's find the first non-empty line after logsIndex
  let firstLogLineIndex = -1;
  for (let i = logsIndex + 1; i < lines.length; i++) {
    if (lines[i].trim() !== '') {
      firstLogLineIndex = i;
      break;
    }
  }

  const todayHeader = `Updates ${today}:`;
  // ✅ Get project name from Git root
  let projectName = 'Unknown';
  try {
    const gitRoot = execSync('git rev-parse --show-toplevel', {
      encoding: 'utf8',
    }).trim();
    projectName = path.basename(gitRoot);
  } catch (e) {
    console.warn('Failed to get git root, falling back to folder name.');
    projectName = path.basename(path.dirname(notesFile));
  }
  projectName = projectName?.[0]?.toUpperCase() + projectName?.slice(1);

  if (
    logsIndex !== -1 &&
    firstLogLineIndex !== -1 &&
    lines[firstLogLineIndex].trim() === todayHeader
  ) {
    // Same day entry exists!
    // We need to append unique commits to this block.
    // The block structure is:
    // Updates YYYY-MM-DD:
    // [Housebuild]:
    // - commit 1
    // - commit 2
    // <empty line> or Next Updates...

    // Let's find where this block ends (next empty line or end of file)
    let blockEndIndex = firstLogLineIndex;
    while (blockEndIndex < lines.length && lines[blockEndIndex].trim() !== '') {
      blockEndIndex++;
    }

    // Now we have the block from firstLogLineIndex to blockEndIndex (exclusive)
    const existingBlockLines = lines.slice(firstLogLineIndex, blockEndIndex);

    // Extract existing commits to avoid duplicates
    const existingCommits = new Set(
      existingBlockLines.filter((l) => l.startsWith('- '))
    );

    const newCommitsToAdd = [];
    commitMessagesList.forEach((msg) => {
      if (!existingCommits.has(msg)) {
        newCommitsToAdd.push(msg);
      }
    });
    // ✅ Get root folder name dynamically
    if (newCommitsToAdd.length > 0) {
      // Append these to the block
      // We need to insert them before blockEndIndex
      // But wait, the block might end with [Housebuild]: if empty? (Unlikely given logic)
      // Or it might end with the last commit.
      // changing the array directly

      lines.splice(blockEndIndex, 0, ...newCommitsToAdd);
      console.log(
        `Appended ${newCommitsToAdd.length} new commits to existing ${today} logs.`
      );

      const newContent = lines.join('\n');
      fs.writeFileSync(notesFile, newContent, 'utf8');
    } else {
      console.log(`No new unique commits to add for ${today}.`);
    }
  } else {
    // No entry for today, create new one
    updatesContent = `Updates ${today}:\n[${projectName}]:\n`;
    if (commitMessagesList.length > 0) {
      updatesContent += commitMessagesList.join('\n');
    } else {
      updatesContent += '- ';
    }
    updatesContent += '\n';
    if (logsIndex === -1) {
      console.log(
        'Could not find "=== LOGS ===" section in my-notes.txt. Printing results only:\n'
      );
      console.log('\n' + updatesContent);
      process.exit(0);
    } else {
      console.log('\n' + updatesContent);
    }

    const newEntryLines = updatesContent.split('\n');

    // Insert at firstLogLineIndex if it exists, else just append after logsIndex
    // Wait, if we want "latest on top", we should insert right after LOGS (preserving existing logic)
    // My previous logic was splicing at logsIndex + 1.
    // If there are empty lines between LOGS and text, we might want to insert BEFORE them?
    // Or just at logsIndex + 1 and push them down.
    // Let's stick to logsIndex + 1 to be safe and consistent with previous working version.

    lines.splice(logsIndex + 1, 0, ...newEntryLines);

    const newContent = lines.join('\n');
    fs.writeFileSync(notesFile, newContent, 'utf8');

    console.log(`Created new log entry for ${today}`);
  }
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error('Error: my-notes.txt file not found.');
  } else {
    console.error('Error processing file:', err);
  }
  process.exit(1);
}
