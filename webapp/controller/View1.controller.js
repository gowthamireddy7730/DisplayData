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

            // Apply style immediately
            oImage.addStyleClass("myColoredImage");
            
        },

        // Nav Back Button → Funny Message
        onNavBack: function () {
            MessageToast.show("Oh no! It's just a NavBack button 😄");
        },

        // Home Button → Show Image
        onHomePress: function () {
         var sDeviceType = "Desktop";

            if (Device.system.phone) {
                sDeviceType = "Phone";
            } else if (Device.system.tablet) {
                sDeviceType = "Tablet";
            }

            MessageToast.show("You are using: " + sDeviceType);
        },

        // Button beside Home → show image
        onShowImage: function () {
           this.byId("img").setVisible(true);
        },
        //Close Image Button
        onCloseImage: function () {
        var oImage = this.byId("img");
        oImage.setVisible(false);
        },  


        // Submit Button → Only show success message
        onSubmit: function () {
                var oModel = this.getView().getModel("userModel");
                 

    oModel.setProperty("/user", {
        name: "",
        email: "",
        city: "",
        phone: ""
    });
       MessageBox.success("Submitted Successfully!");

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
                        MessageToast.show("Deleted Successfully");
                    }
                }
            });
        }

    });
});