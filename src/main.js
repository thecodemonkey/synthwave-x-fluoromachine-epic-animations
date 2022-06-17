const path = require('path');
const fs = require('fs');
const vscode = require('vscode');


function activate(context) {
	this.extensionName = 'TheCodemonkey.synthwave-x-fluoromachine-epic-animations';
	this.cntx = context;


	const isWin = /^win/.test(process.platform);
	const appDir = path.dirname(require.main.filename);
	const base = appDir + (isWin ? "\\vs\\code" : "/vs/code");

	const htmlFile =
		base +
		(isWin
			? "\\electron-browser\\workbench\\workbench.html"
			: "/electron-browser/workbench/workbench.html");

	const templateFile =
			base +
			(isWin
				? "\\electron-browser\\workbench\\syntfluoramations.js"
				: "/electron-browser/workbench/syntfluoramations.js");

	try {

		// generate production theme JS
		const chromeStyles = fs.readFileSync(__dirname +'/css/synthwave-x-fluoromachine.css', 'utf-8');
		const jsTemplate = fs.readFileSync(__dirname +'/theme_template.js', 'utf-8');
		const finalTheme = jsTemplate.replace(/\[CHROME_STYLES\]/g, chromeStyles);	
		fs.writeFileSync(templateFile, finalTheme, "utf-8");

		
		console.log('#### js template: ', templateFile)
		
		// modify workbench html
		const html = fs.readFileSync(htmlFile, "utf-8");

		// check if the tag is already there
		const isEnabled = html.includes("syntfluoramations.js");

		if (!isEnabled) {
			// delete synthwave script tag if there
			let output = html.replace(/^.*(<!-- SYNTHWAVE x Fluoromachine --><script src="syntfluoramations.js"><\/script><!-- EPIC ANIMATIONS -->).*\n?/mg, '');
			// add script tag
			output = html.replace(/\<\/html\>/g, `	<!-- SYNTHWAVE x Fluoromachine --><script src="syntfluoramations.js"></script><!-- EPIC ANIMATIONS -->\n`);
			output += '</html>';

			fs.writeFileSync(htmlFile, output, "utf-8");
			
			vscode.window
				.showInformationMessage("'Synthwave x Fluoromachine & epic animations' enabled. VS code must reload for this change to take effect. Code may display a warning that it is corrupted, this is normal. You can dismiss this message by choosing 'Don't show this again' on the notification.", { title: "Restart editor to complete" })
				.then(function(msg) {
					vscode.commands.executeCommand("workbench.action.reloadWindow");
				});

		} else {

			console.log('vs code already enabled...');

			// vscode.window
			// 	.showInformationMessage('Neon dreams is already enabled. Reload to refresh JS settings.', { title: "Restart editor to refresh settings" })
			// 	.then(function(msg) {
			// 		vscode.commands.executeCommand("workbench.action.reloadWindow");
			// 	});
		}
	} catch (e) {
		console.log('errors: ', e);


		if (/ENOENT|EACCES|EPERM/.test(e.code)) {
			vscode.window.showInformationMessage("You must run VS code with admin privileges in order to enable 'Synthwave x Fluoromachine & epic animations'");
			return;
		} else {
			vscode.window.showErrorMessage('Something went wrong when starting "Synthwave x Fluoromachine & epic animations"');
			return;
		}
	}	

}
exports.activate = activate;

function deactivate() {}


module.exports = {
	activate,
	deactivate
}