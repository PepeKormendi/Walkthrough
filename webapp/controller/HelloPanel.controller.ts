import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import Dialog from "sap/m/Dialog";

/**
 * @namespace walkthrough.controller
 */
export default class HelloPanel extends Controller {

    private dialog: Dialog;

    onShowHello(): void {

        const recipient = (<JSONModel>this.getView()?.getModel()?.getProperty("/recipient/name"));
        // const resourceBundle = <ResourceBundle>(<ResourceModel>this.getView()?.getModel("i18n"))?.getResourceBundle();
        const resourceBundle = (this.getView()?.getModel("i18n") as ResourceModel)?.getResourceBundle() as ResourceBundle;

        const msg = resourceBundle.getText("helloMsg", [recipient]) || "no text defined";
        MessageToast.show(msg);

    }

    async onOpenDialog(): Promise<void> {
        this.dialog ??= await this.loadFragment({
            name: "walkthrough.view.HelloDialog"
        }) as Dialog;
        this.dialog.open();
    }

    onCloseDialog(): void {
        (this.byId("helloDialog") as Dialog )?.close();
    }
};