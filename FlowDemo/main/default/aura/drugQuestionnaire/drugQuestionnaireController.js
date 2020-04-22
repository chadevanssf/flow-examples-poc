({
	doInit : function(component, event, helper) {
		var action = component.get("c.getQuestionReponsesFromCase");

        action.setParams({
            caseId : component.get("v.recordId")
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var rVal = response.getReturnValue();
                component.set("v.myquestions", rVal);
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
		});
        
        $A.enqueueAction(action);
	},
    
    handleSaveClick : function(component, event, helper) {
        var action = component.get("c.setQuestionResponses");

        action.setParams({
            questionResponses : component.get("v.myquestions")
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                // do something
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " +
                                 errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
		});

        $A.enqueueAction(action);
    }
})