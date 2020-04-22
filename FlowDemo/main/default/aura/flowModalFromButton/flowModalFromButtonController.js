({
    openModel: function(component, event, helper) {
        var recordId = component.get("v.recordId");
        var recIdParam;
        var flowName = component.get("v.flowName");
        var flow;
        var flowParams = [];
        
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isOpen", true);
        component.set("v.loading", true);
        
        if (recordId && recordId !== "") {
            recIdParam = {
                "name": "recordId",
                "type": "String",
                "value": recordId
            };
            flowParams.push(recIdParam);
        }
        
        component.set("v.loading", false);
        if (flowName && flowName !== "") {
            component.set("v.missingFlow", false);
            flow = component.find("flowId");
            flow.startFlow(flowName, flowParams);
        } else {
            component.set("v.missingFlow", true);
        }
    },
    
    closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        component.set("v.isOpen", false);
    },
    
    statusChange: function(component, event, helper) {
        var status = event.getParam("status");
        var recLoader;
        
        if (status === "FINISHED" ||
            status === "FINISHED_SCREEN") {
            // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
            component.set("v.isOpen", false);
            
            if (component.get("v.refreshRecord")) {
                recLoader = component.find("recordLoader");
                setTimeout(function(){
                    recLoader.reloadRecord(true);
                }, component.get("v.refreshRecordDelay"));
            }
        }
    }
})