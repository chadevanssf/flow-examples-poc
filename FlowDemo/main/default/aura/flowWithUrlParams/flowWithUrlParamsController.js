/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
({
	doInit : function(component, event, helper) {
        // Take all the parameters and pass them into the Flow, assumes all are strings
        var flowName = component.get("v.flowName");
        var flow;
        var flowParams = [];
        var acceptedParamsComma = component.get("v.acceptedUrlParams");
        var acptParams;
        var includeCurrUrl = component.get("v.includeCurrentUrl");
        var currenturl = location.href.replace(location.search, "");
        var currUrlParam;
		var query = location.search.substr(1);
                
        //console.log("Looking for a key to add:");
        //console.log(acceptedParamsComma);
        acptParams = acceptedParamsComma.split(",");
        
        query.split("&").forEach(function(part) {
            var item = part.split("=");
            var i = {
                "name": item[0],
                "type": "String",
                "value": decodeURIComponent(item[1])
            };
            if (i.name !== "" && acptParams.includes(i.name)) {
                //console.log("Found a key to add");
				flowParams.push(i);
            }
        });
        
        if (includeCurrUrl) {
            currUrlParam = {
                "name": "currenturl",
                "type": "String",
                "value": currenturl
            };
            flowParams.push(currUrlParam);
        }
        
        component.set("v.urlParams", flowParams);
        
        component.set("v.loading", false);
        if (flowName && flowName !== "") {
            component.set("v.missingFlow", false);
            flow = component.find("flowId");
            flow.startFlow(flowName, flowParams);
        } else {
            component.set("v.missingFlow", true);
        }
	}
})