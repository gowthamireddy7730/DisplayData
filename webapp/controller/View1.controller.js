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

        // Show image + Back button
        onShowImage: function () {
            this.byId("img").setVisible(true);       // Show image
            this.byId("btnBack").setVisible(true);   // Show back button
        },

        // Back button pressed
        onBackFromImage: function () {
            this.byId("img").setVisible(false);      // Hide image
            this.byId("btnBack").setVisible(false);  // Hide back button
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
        // Ask user confirmation
        MessageBox.confirm("Successfully Registered! Do you want to display data?", {
            actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
            onClose: function (sAction) {
                if (sAction === MessageBox.Action.OK) {
                // Show the mountains panel
                var oPanel = this.byId("mountainsPanel");
                oPanel.setVisible(true);

                // Optional success toast
                MessageToast.show("Mountains data displayed!");
                }
            }.bind(this) // important to keep 'this' pointing to controller
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