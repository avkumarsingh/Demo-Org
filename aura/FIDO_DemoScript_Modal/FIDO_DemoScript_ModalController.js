({
    init: function(component, event, helper) {
        var sid = component.get("v.currentScript");
        var endpoint = '/api/content?id=' + sid;
        var callout = component.get("c.getCalloutResponseContents");
        callout.setParams({
            endpoint: endpoint
        });
		callout.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                console.log("Demo Script: " + JSON.parse(response.getReturnValue()));
                component.set("v.DemoScripts",JSON.parse(response.getReturnValue()));
            }
        });
		$A.enqueueAction(callout); 
    },
    OpenDialog: function(component, event, helper) {
        var whichOne = event.currentTarget.id;
        component.set("v.setScriptId",whichOne);
        
        var cmpTarget = component.find('scriptModal');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
		$A.util.removeClass(cmpTarget, 'slds-fade-in-closed');
        
        var cmpTarget2 = component.find('overlay');
        $A.util.addClass(cmpTarget2, 'slds-backdrop_open');
		$A.util.removeClass(cmpTarget2, 'slds-backdrop_closed');
    },
    CloseDialog : function(component, event, helper) {
        component.set("v.setScriptId",'');
        var cmpTarget = component.find('scriptModal');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpTarget, 'slds-fade-in-closed');
            
        var cmpTarget2 = component.find('overlay');
        $A.util.removeClass(cmpTarget2, 'slds-backdrop_open');
        $A.util.addClass(cmpTarget2, 'slds-backdrop_closed');
    },
    toScript : function(component, event, helper) {
        var whichOne = event.currentTarget.id;
        window.open(whichOne);
    },
    toContent : function(component, event, helper) {
        var whichOne = event.currentTarget.id;
        window.open('/lightning/r/Demo_Content__c/' + whichOne + '/view');
    }
})