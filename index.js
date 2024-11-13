const fs = require('fs');
const { program } = require('commander');
program
  .requiredOption('-i, --input <path>', 'path to input JSON file')
  .option('-o, --output <path>', 'path to output file')
  .option('-d, --display', 'display output in console');

program.parse(process.argv);
const options = program.opts();
if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
  }
  
  if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
  }
  const data = JSON.parse(fs.readFileSync(options.input, 'utf-8'));
  const maxRate = Math.max(...data.map(item => item.rate));
  const output = `Максимальний курс: ${maxRate}`;
  if (options.display) {
    console.log(output);
  }
  
  if (options.output) {
    fs.writeFileSync(options.output, output, 'utf-8');
  }
      