var transformer = require('./lib/parser');
var fs = require('fs-extra');
var chalk = require('chalk')

var fileName;

//TODO： handle index out of bounds exception
fileName = process.argv[2];
//  fileName = "test";
fileName = "list";
var data = fs.readFileSync(fileName+'.vue');
var output = generateJson(fileName,data);
saveFile('./'+fileName+'.js',output);

//写文件
function saveFile(filePath, content) {
  fs.createFileSync(filePath);
  fs.writeFileSync(filePath, content, {encoding: 'utf8'});
  console.log(chalk.green.bold('[Success]: ') + filePath);
}

//产生json
function generateJson(fileName,data)
{
	var results = []
	var bootstrapParams = {}
	var thirdPartyJs = {}
	var logs = []

	transformer.parse(fileName,data.toString(),results,bootstrapParams,thirdPartyJs,logs,{},'.');

	console.log('log:\n'+(JSON.stringify(logs)));
	var output = results.reverse().map(function (item) {
		return item.content
	}).join('\n\n// module\n\n')

	return output;
}
