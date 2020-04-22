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
    
    handleResponseChange : function(component, event, helper) {
        debugger;
        var rVal = component.get("v.myquestions");
        component.set("v.myquestions", rVal);
    }
})