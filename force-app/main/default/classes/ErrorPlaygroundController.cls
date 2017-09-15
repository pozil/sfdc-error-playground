public with sharing class ErrorPlaygroundController {
    
    @AuraEnabled
    public static void triggerInternalError() {
        // Bad practice: error message is not user-friendly
        integer a = 1 / 0; // Division by zero causes exception
    }
    
    @AuraEnabled
    public static void triggerBasicAuraHandledError() {
        // Best practice: user-friendly error message provided by AuraHandledException
        try {
            integer a = 1 / 0; // Division by zero causes exception
        }
        catch (Exception e) {
        	throw new AuraHandledException('Basic error message. Caused by: '+ e.getMessage());    
        }
    }
    
    @AuraEnabled
    public static void triggerCustomAuraHandledError() {
        // Best practice: user-friendly error message and custom error data
        CustomAuraExceptionData data = new CustomAuraExceptionData('MyCustomServerError', 'Some message about the error', 123);
        throw new AuraHandledException(JSON.serialize(data));
    }
}