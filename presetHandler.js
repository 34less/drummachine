// Use this presets array inside your presetHandler
const presets = require('./presets');


// Complete this function:
const presetHandler = (reqType, index, newPresetArray) => {

	if (reqType!='GET' && reqType!='PUT')
		{return 400;}

	if (reqType == 'PUT')
	{
		if (index>=0 && index <4)
		{
			presets[index]=newPresetArray;
			return [200,presets[index]];
		}
		else{
			return 404;
		}
	}

	if (reqType == 'GET')
	{
		if (index>=0 && index <4)
		{
			return [200,presets[index]];
		}
		else{
			return 404;
		}
	}	

};

// Leave this line so that your presetHandler function can be used elsewhere:
module.exports = presetHandler;
