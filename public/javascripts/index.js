﻿/*
Copyright 2016 Cinegy GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/*Global variables*/
//var TemplateWindow;

$(document).ready(function () {
	    
	var ViewModel = function () {        
        var self = this;
        
        self.depressedButtons = ko.observableArray();
        
        self.serverMappings = {};
        
        //set up your server mappings here, relating button IDs to physical engines and instances
        
        //TODO: Make this into external JSON file
        self.serverMappings["NTH1"] = "http://localhost:5521";
        self.serverMappings["NTH2"] = "http://localhost:5522";
        self.serverMappings["NTH3"] = "http://localhost:5523";
       
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