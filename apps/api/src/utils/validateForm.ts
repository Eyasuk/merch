import { validationResult, matchedData } from 'express-validator';

interface ApiResponse {
  success: boolean;
  data: any;
}

export function validateInputs(req): ApiResponse {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var errMsg = errors.mapped();
    return { success: false, data: errMsg };
  }
  return { success: true, data: matchedData(req) };
}
