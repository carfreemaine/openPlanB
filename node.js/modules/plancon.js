var planUtils = require('./plan_utils.js');

// Noch nicht fertig
function decodePlanCON(filename, outputFile) {
	var header = {unknown:[]};
	
	var f = new planUtils.PlanFile(filename);
	
	header.size = f.readInteger(2);
	header.version = f.readInteger(2) + '.' + f.readInteger(2);
	header.creationDate = f.readTimestamp();
	
	header.unknown.push(f.readInteger(4));
	header.listLength1 = f.readInteger(4);
	header.unknown.push(f.readInteger(4));
	header.unknown.push(f.readInteger(2));
	header.unknown.push(f.readInteger(4));
	header.unknown.push(f.readInteger(4));
	header.unknown.push(f.readInteger(2));
	header.unknown.push(f.readInteger(2));
	header.unknown.push(f.readInteger(2));
	header.unknown.push(f.readInteger(2));
	
	header.unknown.push(f.readHexDump(4));
	
	header.description = f.readString(header.size - f.pos);
	
	var
		data1 = [],
		data2 = [];
	
	
	for (var i = 0; i < header.listLength1; i++) {
		data1[i] = [];
		data1[i][0] = f.readInteger(4);
		data1[i][1] = f.readHexDump(1);
		data1[i][2] = f.readHexDump(1);
		data1[i][3] = f.readInteger(4);
	}
	
	/*
	var i = 0;
	var v;
	do {
		data2[i] = []; 
		data2[i][0] = (v = f.readInteger(-4));
		data2[i][1] = f.readInteger(-4);
		console.log(v);
		i++;
	} while (v >= 0);
	*/
	header.bytesLeft = f.check(outputFile);
	
	planUtils.exportHeader(outputFile, header);
	planUtils.exportTSV(outputFile, '1', data1);
	planUtils.exportTSV(outputFile, '2', data2);
}

exports.decodePlan = decodePlanCON;
