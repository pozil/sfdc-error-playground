({
    onTriggerInternalServerError : function(component, event, helper) {
		let action = component.get("c.triggerInternalError");
        action.setCallback(this, function(response) {
            // State is always "ERROR" for this sample action
            let state = response.getState();
            if (state === "ERROR") {
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    console.error(errors[0].message);
                } else {
                    console.error("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
	},
    
    onTriggerBasicServerError : function(component, event, helper) {
		let action = component.get("c.triggerBasicAuraHandledError");
        action.setCallback(this, function(response) {
            // State is always "ERROR" for this sample action
            let state = response.getState();
            if (state === "ERROR") {
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    console.error(errors[0].message);
                } else {
                    console.error("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
	},
    
    onTriggerCustomServerError : function(component, event, helper) {
		let action = component.get("c.triggerCustomAuraHandledError");
        action.setCallback(this, function(response) {
            // State is always "ERROR" for this sample action
            let state = response.getState();
            if (state === "ERROR") {
                let errors = response.getError();
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    // Parse custom error data & report it
                    let errorData = JSON.parse(errors[0].message);
                    console.error(errorData.name +" (code "+ errorData.code +"): "+ errorData.message);
                } else {
                    console.error("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
	},
    
    onTriggerUnhandledClientError : function(component, event, helper) {
        throw new Error('Unhandled client error');
    },
    
    onTriggerBasicClientError : function(component, event, helper) {
        try {
         	// Call a function that throws an Error
	        let value = helper.doSomethingThatFails();
            // Process value it call succeeded (unreachable in this sample)
        } catch (e) {
            console.error(e);
        }
    },
    
    onTriggerCustomClientError : function(component, event, helper) {
        // Declaring a custom error type
        function MyCustomError(name, message, code) {
            this.name = name;
            this.message = message;
            this.code = code;
            this.stack = (new Error()).stack;
        }
        MyCustomError.prototype = Object.create(Error.prototype);
        MyCustomError.prototype.constructor = MyCustomError;
        
        // Throwing and handling error
        try {
            throw new MyCustomError('MyCustomClientError', 'Some message about the error', 456);
        } catch (e) {
            if (e instanceof MyCustomError) {
                // Specific message for MyCustomError
                console.error(e.name +' (code '+ e.code +'): '+ e.message);
            }
            else {
                // Generic message for other types of error (unreachable in this sample)
                console.error(e.message);
            }
        }
    }
})