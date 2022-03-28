import {errorHandler} from "./error-handler";

describe('errorHandler', () => {
     console.log = jest.fn();
     it('should handle single error', () => {
         const error = new Error('single error');
         errorHandler(error);
         expect(console.log).toHaveBeenCalledWith('Error: single error')
     })

    it('should handle multiple error', () => {
        const error = [new Error('error1'), new Error('error2')];
        errorHandler(error);
        expect(console.log).toHaveBeenCalledWith('Error: error1')
        expect(console.log).toHaveBeenCalledWith('Error: error2')
    })

    it('should handle error as a string', () => {
        const error = 'error string'
        errorHandler(error);
        expect(console.log).toHaveBeenCalledWith('error string')
    })
 })