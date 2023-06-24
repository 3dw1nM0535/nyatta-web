const path = require('path')

const buildEslintCommand = filenames => {
  const files = filenames.filter(f => !f.includes('public/')).map(f => path.relative(process.cwd(), f))
  return files?.length > 0
    ? `next lint --fix --file ${filenames
        .filter(f => !f.includes('public/'))
        .map(f => path.relative(process.cwd(), f))
        .join(' --file ')}`
    : `next lint --fix`
}

module.exports = {
  '*.{js,jsx,ts,tsx}': [buildEslintCommand],
}
