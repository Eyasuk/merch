import { validationResult, matchedData } from 'express-validator';

export function validateInputs(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var errMsg = errors.mapped();
    var inputData = matchedData(req);
    res.json(200, { errors: errMsg, inputData: inputData });
  } else {
    return matchedData(req);
  }
}
