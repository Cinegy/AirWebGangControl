/*Global variables*/
//var TemplateWindow;

$(document).ready(function () {
	    
	var ViewModel = function () {        
        var self = this;
        
        self.depressedButtons = ko.observableArray();
        
        self.serverMappings = {};
        
        self.serverMappings["NSW"] = "http://localhost:5521";
        self.serverMappings["SYD"] = "http://localhost:5522";
        self.serverMappings["VIC"] = "http://localhost:5523";
       
        //Wire up methods that are exposed via KnockOut
        self.onStartCued = function () {
            onStartCuedHandler(self);
        }; 
        
        self.onGoNormal = function () {
            ChangeOutputStatus(self, "Normal");
        };               
        
        self.onGoLive = function () {
            ChangeOutputStatus(self, "Bypass");
        };
        
        self.onGoClean = function () {
            ChangeOutputStatus(self, "Clean");
        };
        
        self.onGoBlack = function () {
            ChangeOutputStatus(self, "Black");
        };
        
        
        self.onToggleButtons = function (data, event) {
            onToggleButtonHandler(self, data);
        };
                        
        self.CanStartCued = ko.pureComputed(function() {
             return anyEngineButtonsDepressed(self) }, self.depressedButtons);
       
        self.CanGoNormal =  ko.pureComputed(function() {
             return anyEngineButtonsDepressed(self) }, self.depressedButtons);
        
        self.CanGoLive =  ko.pureComputed(function() {
             return anyEngineButtonsDepressed(self) }, self.depressedButtons);
             
        self.CanGoClean =  ko.pureComputed(function() {
             return anyEngineButtonsDepressed(self) }, self.depressedButtons);
             
        self.CanGoBlack =  ko.pureComputed(function() {
             return anyEngineButtonsDepressed(self) }, self.depressedButtons);
        
        self.ButtonIsDepressed = function (buttonId) { 
          return ((self.depressedButtons.indexOf(buttonId) > -1) ?  true : false); };
       
    };
	
	var viewModelObj = new ViewModel()    
    ko.applyBindings(viewModelObj);
    
    function onToggleButtonHandler(engineViewModel, buttonIds) {
        
        for(var n in buttonIds)
        {   
            if(engineViewModel.depressedButtons.indexOf(buttonIds[n]) > -1)
            {
                engineViewModel.depressedButtons.remove(buttonIds[n]);
            }
            else
            {
                engineViewModel.depressedButtons.push(buttonIds[n]);
            }
        }
    }

    
    function onStartCuedHandler(engineViewModel) {
        var cueCmdXml = "<Request><StartCued/><Request>";
        
        engineViewModel.depressedButtons().forEach(function(element) {
            var url = engineViewModel.serverMappings[element] +"/video/command";
            $.ajax({
                url: url,
                type: "POST",
                dataType: 'xml',
                contentType: "text/xml; charset=utf-8",
                data: cueCmdXml,
            });
         }, this);
    }
    
    function ChangeOutputStatus(engineViewModel, newState) {
        var cueCmdXml = '<Request><SetOutput State="' + newState + '"/></Request>';
        
        engineViewModel.depressedButtons().forEach(function(element) {
            var url = engineViewModel.serverMappings[element] +"/video/command";
            $.ajax({
                url: url,
                type: "POST",
                dataType: 'xml',
                contentType: "text/xml; charset=utf-8",
                data: cueCmdXml,
            });
         }, this);
    }
   
    function onCueNextHandler(engineViewModel) {
        alert("Not yet supported - Air Engine API has no 'Cue Next' - need to address new controller API instead!")
    }
    
    function anyEngineButtonsDepressed(engineViewModel)
    {
        if(engineViewModel.depressedButtons().length < 1)
            return false;
    }

	
});