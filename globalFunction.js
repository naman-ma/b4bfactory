globalConfig = require("./config");

// TE (throw error)
TE = function (err_message, log) {
  
  if(process.env.NODE_ENV === 'local') {
    console.log(log);
  }

  throw new Error(err_message);
};

// Error web response
ReE = function (res, err, code, log) { 

  if (process.env.NODE_ENV === 'local') {
    console.error(`Error logged from API :${log}`);
  }

  if (typeof err == 'object' && typeof err.message != 'undefined') {
    err = err.message;
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json({ success: false, message: err });
};

// Success Web Response
ReS = function (res, data, code) { 
  let send_data = { success: true };
  if (typeof data === 'object') {
    send_data = Object.assign(data, send_data); //merge the objects
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json(send_data)
};
