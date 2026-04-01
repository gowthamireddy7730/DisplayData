sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (Controller, MessageBox, MessageToast, JSONModel, Device) {
    "use strict";

    return Controller.extend("registrationform.controller.View1", {

        onInit: function () {
            var oData = {
                user: {
                    name: "",
                    email: "",
                    city: "",
                    phone: ""
                }
            };
            var sPath = sap.ui.require.toUrl("registrationform/images/Elephant.jpeg");
            var oImage = this.byId("img");

            oImage.setSrc(sPath);

            oImage.addStyleClass("myColoredImage");
            
        },

        onNavBack: function () {
            MessageToast.show("Oh no! It's just a NavBack button 😄");
        },

        onHomePress: function () {
            var sDeviceType = "Desktop";

            if (Device.system.phone) {
                sDeviceType = "Phone";
            } else if (Device.system.tablet) {
                sDeviceType = "Tablet";
            }

            MessageToast.show("You are using: " + sDeviceType);
        },

        onShowImage: function () {
            this.byId("img").setVisible(true);       
            this.byId("btnBack").setVisible(true);   
        },

        onBackFromImage: function () {
            this.byId("img").setVisible(false);      
            this.byId("btnBack").setVisible(false);  
        },

        onSubmit: function () {
            var oModel = this.getView().getModel("userModel");
            oModel.setProperty("/user", {
                name: "",
                email: "",
                city: "",
                phone: ""
        });
       
        MessageBox.confirm("Successfully Registered! Do you want to display data?", {
            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            onClose: function (sAction) {
                if (sAction === MessageBox.Action.OK) {
               
                var oPanel = this.byId("mountainsPanel");
                oPanel.setVisible(true);

                MessageToast.show("Mountains data displayed!");
                }
            }.bind(this) 
        });

        },

        // Delete Button
        onDelete: function () {
            var that = this;

            MessageBox.confirm("Are you sure you want to delete?", {
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                onClose: function (action) {
                    if (action === MessageBox.Action.OK) {
                        // Reset model data
                        var oModel = that.getView().getModel("userModel");
                        oModel.setProperty("/user", {
                            name: "",
                            email: "",
                            city: "",
                            phone: ""
                        });
                         var oPanel = that.byId("mountainsPanel");
                if (oPanel) {
                    oPanel.setVisible(false);
                }

                // Optional: clear mountains model data
                var oMountainModel = that.getView().getModel("mountainModel");
                if (oMountainModel) {
                    oMountainModel.setProperty("/mountains", []);
                }
                        MessageToast.show("Deleted Successfully");
                    }
                }
            });
        }

    });
});